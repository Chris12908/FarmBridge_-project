-- Farm-Bridge initial PostgreSQL setup
-- Run AFTER `npx prisma migrate dev` or `npx prisma db push`

-- ─── Extensions ─────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS cube;
CREATE EXTENSION IF NOT EXISTS earthdistance;
CREATE EXTENSION IF NOT EXISTS pg_trgm;   -- for ILIKE performance

-- ─── Full-text search vector on products ────────────────────────────────────

-- Function to build tsvector from product fields
CREATE OR REPLACE FUNCTION update_product_search_vector() RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector(
    'english',
    COALESCE(NEW.name, '') || ' ' ||
    COALESCE(NEW.description, '') || ' ' ||
    COALESCE(array_to_string(NEW.tags, ' '), '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: auto-update searchVector on insert/update
DROP TRIGGER IF EXISTS products_search_vector_update ON products;
CREATE TRIGGER products_search_vector_update
  BEFORE INSERT OR UPDATE OF name, description, tags ON products
  FOR EACH ROW EXECUTE FUNCTION update_product_search_vector();

-- GIN index for fast full-text search (Prisma schema also creates this via @@index)
CREATE INDEX IF NOT EXISTS idx_products_search_vector
  ON products USING GIN ("searchVector");

-- ─── Geo indexes for earthdistance nearest-farmer queries ───────────────────

-- Functional index on (lat, lng) using Earth as a point
-- Used with: earth_box(ll_to_earth(lat, lng), radius) @> ll_to_earth(fp.latitude, fp.longitude)
CREATE INDEX IF NOT EXISTS idx_farmer_profiles_location
  ON farmer_profiles (latitude, longitude)
  WHERE latitude IS NOT NULL AND longitude IS NOT NULL;

-- ─── Performance indexes ─────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_created
  ON chat_messages ("sessionId", "createdAt" ASC);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON notifications ("userId", "isRead")
  WHERE "isRead" = false;

CREATE INDEX IF NOT EXISTS idx_orders_farmer_status
  ON orders ("farmerId", status);

CREATE INDEX IF NOT EXISTS idx_orders_buyer_status
  ON orders ("buyerId", status);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_active
  ON refresh_tokens ("userId", "revokedAt")
  WHERE "revokedAt" IS NULL;
