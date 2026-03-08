-- Users
INSERT INTO users (name, email, password, role) VALUES
('John Farmer','john@example.com','password123','farmer'),
('Alice Customer','alice@example.com','password123','customer');

-- Products
INSERT INTO products (farmer_id, product_name, description, price, quantity) VALUES
(1, 'Tomatoes', 'Fresh red tomatoes', 1.50, 100),
(1, 'Carrots', 'Organic carrots', 2.00, 50);

-- Orders
INSERT INTO orders (product_id, buyer_id, quantity) VALUES
(1, 2, 10);

-- Messages
INSERT INTO messages (sender_id, receiver_id, text_message) VALUES
(2,1,'Hi John, I want 10 tomatoes');
