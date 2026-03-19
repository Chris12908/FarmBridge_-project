import {
  PrismaClient,
  Role,
  ProductCategory,
  ListingStatus,
  NegotiationStatus,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding Farm-Bridge database...');

  const PASSWORD_HASH = await bcrypt.hash('Password123!', 12);

  // ─────────────────────────────────────────────
  // Create Farmers
  // ─────────────────────────────────────────────

  const farmer1 = await prisma.user.upsert({
    where: { email: 'sunrise@farmbridge.com' },
    update: {},
    create: {
      email: 'sunrise@farmbridge.com',
      passwordHash: PASSWORD_HASH,
      role: Role.FARMER,
      name: 'Sunrise Harvest',
      phoneNumber: '+254700000001',
      isVerified: true,
      farmerProfile: {
        create: {
          farmName: 'Sunrise Harvest Farm',
          farmLocation: 'Nakuru, Kenya',
          bio: 'Family-run farm specializing in fresh tomatoes and kale since 1998.',
          crops: ['tomatoes', 'kale'],
          tags: ['organic', 'fresh', 'local'],
          rating: 4.8,
          reviewCount: 24,
          completedOrderCount: 30,
          profileComplete: true,
          verificationStatus: 'VERIFIED',
        },
      },
    },
  });

  const farmer2 = await prisma.user.upsert({
    where: { email: 'greenvalley@farmbridge.com' },
    update: {},
    create: {
      email: 'greenvalley@farmbridge.com',
      passwordHash: PASSWORD_HASH,
      role: Role.FARMER,
      name: 'Green Valley Farms',
      phoneNumber: '+254700000002',
      isVerified: true,
      farmerProfile: {
        create: {
          farmName: 'Green Valley Farms',
          farmLocation: 'Eldoret, Kenya',
          bio: 'Premium quality peppers and spinach, grown with sustainable practices.',
          crops: ['peppers', 'spinach'],
          tags: ['sustainable', 'pesticide-free', 'premium'],
          rating: 4.6,
          reviewCount: 18,
          completedOrderCount: 22,
          profileComplete: true,
          verificationStatus: 'VERIFIED',
        },
      },
    },
  });

  const farmer3 = await prisma.user.upsert({
    where: { email: 'heirloom@farmbridge.com' },
    update: {},
    create: {
      email: 'heirloom@farmbridge.com',
      passwordHash: PASSWORD_HASH,
      role: Role.FARMER,
      name: 'Heirloom Grains Co.',
      phoneNumber: '+254700000003',
      isVerified: true,
      farmerProfile: {
        create: {
          farmName: 'Heirloom Grains Co.',
          farmLocation: 'Kisumu, Kenya',
          bio: 'Traditional grain farming with heritage seeds — maize and wheat.',
          crops: ['maize', 'wheat'],
          tags: ['heirloom', 'heritage', 'grain'],
          rating: 4.5,
          reviewCount: 12,
          completedOrderCount: 15,
          profileComplete: true,
          verificationStatus: 'VERIFIED',
        },
      },
    },
  });

  const farmer4 = await prisma.user.upsert({
    where: { email: 'meadowbrook@farmbridge.com' },
    update: {},
    create: {
      email: 'meadowbrook@farmbridge.com',
      passwordHash: PASSWORD_HASH,
      role: Role.FARMER,
      name: 'Meadow Brook Dairy',
      phoneNumber: '+254700000004',
      isVerified: true,
      farmerProfile: {
        create: {
          farmName: 'Meadow Brook Dairy',
          farmLocation: 'Nanyuki, Kenya',
          bio: 'Award-winning dairy farm producing fresh milk and artisan cheese.',
          crops: ['milk', 'cheese'],
          tags: ['dairy', 'artisan', 'award-winning'],
          rating: 4.9,
          reviewCount: 35,
          completedOrderCount: 45,
          profileComplete: true,
          verificationStatus: 'VERIFIED',
        },
      },
    },
  });

  // ─────────────────────────────────────────────
  // Create Buyer
  // ─────────────────────────────────────────────

  const buyer = await prisma.user.upsert({
    where: { email: 'alex@buyer.farmbridge.com' },
    update: {},
    create: {
      email: 'alex@buyer.farmbridge.com',
      passwordHash: PASSWORD_HASH,
      role: Role.BUYER,
      name: 'Alex Thompson',
      phoneNumber: '+254711000001',
      isVerified: true,
      buyerProfile: {
        create: {
          preferences: ['organic', 'fresh', 'local'],
        },
      },
      addresses: {
        create: [
          {
            label: 'Home',
            street: '42 Ngong Road',
            city: 'Nairobi',
            state: 'Nairobi County',
            country: 'Kenya',
            postalCode: '00100',
            isDefault: true,
          },
          {
            label: 'Office',
            street: '15 Upper Hill Close',
            city: 'Nairobi',
            state: 'Nairobi County',
            country: 'Kenya',
            postalCode: '00200',
            isDefault: false,
          },
        ],
      },
    },
    include: { addresses: true },
  });

  const buyerAddress = buyer.addresses[0];

  // ─────────────────────────────────────────────
  // Create Products
  // ─────────────────────────────────────────────

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 30);

  const product1 = await prisma.product.upsert({
    where: { id: 'seed-product-1-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-1-00000000-0000-0000-0000',
      farmerId: farmer1.id,
      name: 'Fresh Roma Tomatoes',
      description:
        'Vine-ripened Roma tomatoes, perfect for cooking and salads.',
      category: ProductCategory.VEGETABLES,
      pricePerUnit: 120,
      unit: 'kg',
      quantityAvailable: 500,
      minimumOrder: 10,
      images: [
        'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?w=400',
      ],
      tags: ['tomatoes', 'fresh', 'roma'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  const product2 = await prisma.product.upsert({
    where: { id: 'seed-product-2-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-2-00000000-0000-0000-0000',
      farmerId: farmer1.id,
      name: 'Organic Kale Bundle',
      description: 'Crispy, dark green kale grown without pesticides.',
      category: ProductCategory.VEGETABLES,
      pricePerUnit: 80,
      unit: 'bundle',
      quantityAvailable: 200,
      minimumOrder: 5,
      images: [
        'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400',
      ],
      tags: ['kale', 'organic', 'greens'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: 'seed-product-3-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-3-00000000-0000-0000-0000',
      farmerId: farmer2.id,
      name: 'Sweet Bell Peppers (Mixed)',
      description: 'Colorful mix of red, yellow, and green bell peppers.',
      category: ProductCategory.VEGETABLES,
      pricePerUnit: 200,
      unit: 'kg',
      quantityAvailable: 300,
      minimumOrder: 5,
      images: [
        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400',
      ],
      tags: ['peppers', 'bell pepper', 'colorful'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  const product4 = await prisma.product.upsert({
    where: { id: 'seed-product-4-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-4-00000000-0000-0000-0000',
      farmerId: farmer2.id,
      name: 'Baby Spinach Leaves',
      description: 'Tender baby spinach, harvested at peak freshness.',
      category: ProductCategory.VEGETABLES,
      pricePerUnit: 150,
      unit: 'kg',
      quantityAvailable: 150,
      minimumOrder: 3,
      images: [
        'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      ],
      tags: ['spinach', 'baby', 'greens'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  const product5 = await prisma.product.upsert({
    where: { id: 'seed-product-5-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-5-00000000-0000-0000-0000',
      farmerId: farmer3.id,
      name: 'Heritage White Maize',
      description: 'Traditional white maize grown from heirloom seeds.',
      category: ProductCategory.GRAINS,
      pricePerUnit: 60,
      unit: 'kg',
      quantityAvailable: 2000,
      minimumOrder: 50,
      images: [
        'https://images.unsplash.com/photo-1601661281695-8c1ff82d8f05?w=400',
      ],
      tags: ['maize', 'corn', 'heritage'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  await prisma.product.upsert({
    where: { id: 'seed-product-6-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-6-00000000-0000-0000-0000',
      farmerId: farmer3.id,
      name: 'Whole Wheat Flour',
      description: 'Stone-ground whole wheat flour, perfect for baking.',
      category: ProductCategory.GRAINS,
      pricePerUnit: 90,
      unit: 'kg',
      quantityAvailable: 1000,
      minimumOrder: 25,
      images: [
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      ],
      tags: ['wheat', 'flour', 'wholegrain'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  const product7 = await prisma.product.upsert({
    where: { id: 'seed-product-7-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-7-00000000-0000-0000-0000',
      farmerId: farmer4.id,
      name: 'Fresh Whole Milk',
      description: 'Creamy, farm-fresh whole milk from grass-fed cows.',
      category: ProductCategory.DAIRY,
      pricePerUnit: 80,
      unit: 'liter',
      quantityAvailable: 1000,
      minimumOrder: 10,
      images: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400',
      ],
      tags: ['milk', 'fresh', 'grass-fed'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  await prisma.product.upsert({
    where: { id: 'seed-product-8-00000000-0000-0000-0000' },
    update: {},
    create: {
      id: 'seed-product-8-00000000-0000-0000-0000',
      farmerId: farmer4.id,
      name: 'Artisan Gouda Cheese',
      description: 'Handcrafted Gouda cheese aged for 3 months.',
      category: ProductCategory.DAIRY,
      pricePerUnit: 1200,
      unit: 'wheel',
      quantityAvailable: 50,
      minimumOrder: 1,
      images: [
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400',
      ],
      tags: ['cheese', 'gouda', 'artisan', 'aged'],
      status: ListingStatus.ACTIVE,
      expiresAt: tomorrow,
    },
  });

  // ─────────────────────────────────────────────
  // Create Negotiation Sessions
  // ─────────────────────────────────────────────

  const session1 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer1.id,
        productId: product1.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer1.id,
      productId: product1.id,
      status: NegotiationStatus.NEGOTIATING,
      lastMessagePreview: 'Can you do 100 per kg for 50kg?',
      lastMessageAt: new Date(),
    },
  });

  const session2 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer2.id,
        productId: product3.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer2.id,
      productId: product3.id,
      status: NegotiationStatus.NEGOTIATING,
      lastMessagePreview: 'Interested in 20kg of your bell peppers',
      lastMessageAt: new Date(),
    },
  });

  // ─────────────────────────────────────────────
  // Sessions for completed orders (BUYER_APPROVED → CHECKED_OUT)
  // ─────────────────────────────────────────────

  const session3 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer3.id,
        productId: product5.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer3.id,
      productId: product5.id,
      status: NegotiationStatus.CHECKED_OUT,
      agreedPrice: 55,
      agreedQuantity: 100,
    },
  });

  const session4 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer4.id,
        productId: product7.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer4.id,
      productId: product7.id,
      status: NegotiationStatus.CHECKED_OUT,
      agreedPrice: 75,
      agreedQuantity: 50,
    },
  });

  // ─────────────────────────────────────────────
  // Create Orders
  // ─────────────────────────────────────────────

  const deliveredOrder1 = await prisma.order.upsert({
    where: { orderNumber: '#ORD-2024-001' },
    update: {},
    create: {
      orderNumber: '#ORD-2024-001',
      sessionId: session3.id,
      buyerId: buyer.id,
      farmerId: farmer3.id,
      addressId: buyerAddress?.id,
      deliveryAddressSnapshot: {
        label: 'Home',
        street: '42 Ngong Road',
        city: 'Nairobi',
        state: 'Nairobi County',
        country: 'Kenya',
        postalCode: '00100',
      },
      quantity: 100,
      pricePerUnit: 55,
      subtotal: 5500,
      platformFee: 275,
      totalAmount: 5775,
      status: OrderStatus.DELIVERED,
      paymentMethod: PaymentMethod.STRIPE,
      paymentStatus: PaymentStatus.PAID,
      confirmedAt: new Date('2024-01-15'),
      dispatchedAt: new Date('2024-01-16'),
      deliveredAt: new Date('2024-01-18'),
    },
  });

  const deliveredOrder2 = await prisma.order.upsert({
    where: { orderNumber: '#ORD-2024-002' },
    update: {},
    create: {
      orderNumber: '#ORD-2024-002',
      sessionId: session4.id,
      buyerId: buyer.id,
      farmerId: farmer4.id,
      addressId: buyerAddress?.id,
      deliveryAddressSnapshot: {
        label: 'Home',
        street: '42 Ngong Road',
        city: 'Nairobi',
        state: 'Nairobi County',
        country: 'Kenya',
        postalCode: '00100',
      },
      quantity: 50,
      pricePerUnit: 75,
      subtotal: 3750,
      platformFee: 187.5,
      totalAmount: 3937.5,
      status: OrderStatus.DELIVERED,
      paymentMethod: PaymentMethod.FLUTTERWAVE_MPESA,
      paymentStatus: PaymentStatus.PAID,
      confirmedAt: new Date('2024-01-20'),
      dispatchedAt: new Date('2024-01-21'),
      deliveredAt: new Date('2024-01-23'),
    },
  });

  // Sessions for pending/confirmed orders
  const session5 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer1.id,
        productId: product2.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer1.id,
      productId: product2.id,
      status: NegotiationStatus.CHECKED_OUT,
      agreedPrice: 70,
      agreedQuantity: 20,
    },
  });

  const session6 = await prisma.negotiationSession.upsert({
    where: {
      buyerId_farmerId_productId: {
        buyerId: buyer.id,
        farmerId: farmer2.id,
        productId: product4.id,
      },
    },
    update: {},
    create: {
      buyerId: buyer.id,
      farmerId: farmer2.id,
      productId: product4.id,
      status: NegotiationStatus.CHECKED_OUT,
      agreedPrice: 140,
      agreedQuantity: 10,
    },
  });

  await prisma.order.upsert({
    where: { orderNumber: '#ORD-2024-003' },
    update: {},
    create: {
      orderNumber: '#ORD-2024-003',
      sessionId: session5.id,
      buyerId: buyer.id,
      farmerId: farmer1.id,
      addressId: buyerAddress?.id,
      deliveryAddressSnapshot: {
        label: 'Home',
        street: '42 Ngong Road',
        city: 'Nairobi',
        state: 'Nairobi County',
        country: 'Kenya',
      },
      quantity: 20,
      pricePerUnit: 70,
      subtotal: 1400,
      platformFee: 70,
      totalAmount: 1470,
      status: OrderStatus.CONFIRMED,
      paymentMethod: PaymentMethod.STRIPE,
      paymentStatus: PaymentStatus.PAID,
      confirmedAt: new Date(),
    },
  });

  await prisma.order.upsert({
    where: { orderNumber: '#ORD-2024-004' },
    update: {},
    create: {
      orderNumber: '#ORD-2024-004',
      sessionId: session6.id,
      buyerId: buyer.id,
      farmerId: farmer2.id,
      addressId: buyerAddress?.id,
      deliveryAddressSnapshot: {
        label: 'Home',
        street: '42 Ngong Road',
        city: 'Nairobi',
        state: 'Nairobi County',
        country: 'Kenya',
      },
      quantity: 10,
      pricePerUnit: 140,
      subtotal: 1400,
      platformFee: 70,
      totalAmount: 1470,
      status: OrderStatus.PENDING,
      paymentMethod: PaymentMethod.FLUTTERWAVE_MTN,
      paymentStatus: PaymentStatus.PENDING,
    },
  });

  // ─────────────────────────────────────────────
  // Create Reviews
  // ─────────────────────────────────────────────

  await prisma.review.upsert({
    where: { orderId: deliveredOrder1.id },
    update: {},
    create: {
      orderId: deliveredOrder1.id,
      reviewerId: buyer.id,
      farmerId: farmer3.id,
      rating: 5,
      comment:
        'Excellent quality maize! Fresh and well-packaged. Will order again.',
    },
  });

  await prisma.review.upsert({
    where: { orderId: deliveredOrder2.id },
    update: {},
    create: {
      orderId: deliveredOrder2.id,
      reviewerId: buyer.id,
      farmerId: farmer4.id,
      rating: 5,
      comment:
        'The milk was incredibly fresh and creamy. Best dairy I have found on the platform!',
    },
  });

  // Update farmer profiles with accurate review data
  await prisma.farmerProfile.updateMany({
    where: { userId: farmer3.id },
    data: { rating: 5.0, reviewCount: 13, completedOrderCount: 16 },
  });

  await prisma.farmerProfile.updateMany({
    where: { userId: farmer4.id },
    data: { rating: 5.0, reviewCount: 36, completedOrderCount: 46 },
  });

  // ─────────────────────────────────────────────
  // Add chat messages to active sessions
  // ─────────────────────────────────────────────
  const { Role: RoleEnum, MessageType } =
    await import('../generated/prisma/client');

  await prisma.chatMessage.create({
    data: {
      sessionId: session1.id,
      senderId: buyer.id,
      senderRole: RoleEnum.BUYER,
      type: MessageType.TEXT,
      text: 'Hi! I am interested in buying 50kg of Roma tomatoes. Can you do KES 100 per kg?',
      readByRecipient: true,
    },
  });

  await prisma.chatMessage.create({
    data: {
      sessionId: session1.id,
      senderId: farmer1.id,
      senderRole: RoleEnum.FARMER,
      type: MessageType.TEXT,
      text: 'Hello! The best I can do is KES 110/kg for that quantity. They are perfectly ripe right now.',
      readByRecipient: false,
    },
  });

  await prisma.chatMessage.create({
    data: {
      sessionId: session2.id,
      senderId: buyer.id,
      senderRole: RoleEnum.BUYER,
      type: MessageType.TEXT,
      text: 'Interested in 20kg of your bell peppers. What is your best price?',
      readByRecipient: true,
    },
  });

  console.log('✅ Seed complete!');
  console.log(`  Created 4 farmers, 1 buyer`);
  console.log(`  Created 8 products`);
  console.log(`  Created 6 negotiation sessions`);
  console.log(`  Created 4 orders (2 DELIVERED, 1 CONFIRMED, 1 PENDING)`);
  console.log(`  Created 2 reviews`);
  console.log(`  Credentials: any user email + Password: Password123!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
