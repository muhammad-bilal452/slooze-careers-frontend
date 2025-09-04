import {
  type Restaurant,
  type MenuItem,
  type PaymentMethod,
  PaymentType,
  type Order,
  type OrderItem,
  type User,
  OrderStatus,
  UserRole,
} from "./types"

export const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    country: "India",
    menuItems: [],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Mumbai Delights",
    country: "India",
    menuItems: [],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    name: "American Diner",
    country: "America",
    menuItems: [],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "4",
    name: "Brooklyn Burgers",
    country: "America",
    menuItems: [],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "5",
    name: "Curry House",
    country: "India",
    menuItems: [],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "6",
    name: "Liberty Grill",
    country: "America",
    menuItems: [],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
]

export const mockMenuItems: MenuItem[] = [
  // Spice Garden (India)
  {
    id: "1",
    name: "Butter Chicken",
    price: 18.99,
    restaurant: mockRestaurants[0],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Biryani",
    price: 16.99,
    restaurant: mockRestaurants[0],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "Naan Bread",
    price: 4.99,
    restaurant: mockRestaurants[0],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "4",
    name: "Mango Lassi",
    price: 5.99,
    restaurant: mockRestaurants[0],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },

  // Mumbai Delights (India)
  {
    id: "5",
    name: "Tandoori Chicken",
    price: 19.99,
    restaurant: mockRestaurants[1],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "6",
    name: "Samosas (4 pcs)",
    price: 8.99,
    restaurant: mockRestaurants[1],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "7",
    name: "Dal Makhani",
    price: 14.99,
    restaurant: mockRestaurants[1],
    createdAt: new Date("2024-01-16"),
    updatedAt: new Date("2024-01-16"),
  },

  // American Diner (America)
  {
    id: "8",
    name: "Classic Cheeseburger",
    price: 12.99,
    restaurant: mockRestaurants[2],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "9",
    name: "French Fries",
    price: 6.99,
    restaurant: mockRestaurants[2],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "10",
    name: "Chocolate Milkshake",
    price: 7.99,
    restaurant: mockRestaurants[2],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },
  {
    id: "11",
    name: "Apple Pie",
    price: 5.99,
    restaurant: mockRestaurants[2],
    createdAt: new Date("2024-01-17"),
    updatedAt: new Date("2024-01-17"),
  },

  // Brooklyn Burgers (America)
  {
    id: "12",
    name: "BBQ Bacon Burger",
    price: 15.99,
    restaurant: mockRestaurants[3],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "13",
    name: "Veggie Burger",
    price: 11.99,
    restaurant: mockRestaurants[3],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },
  {
    id: "14",
    name: "Onion Rings",
    price: 7.99,
    restaurant: mockRestaurants[3],
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-18"),
  },

  // Curry House (India)
  {
    id: "15",
    name: "Chicken Tikka Masala",
    price: 17.99,
    restaurant: mockRestaurants[4],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "16",
    name: "Vegetable Curry",
    price: 13.99,
    restaurant: mockRestaurants[4],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },
  {
    id: "17",
    name: "Garlic Naan",
    price: 5.99,
    restaurant: mockRestaurants[4],
    createdAt: new Date("2024-01-19"),
    updatedAt: new Date("2024-01-19"),
  },

  // Liberty Grill (America)
  {
    id: "18",
    name: "Grilled Salmon",
    price: 22.99,
    restaurant: mockRestaurants[5],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "19",
    name: "Caesar Salad",
    price: 9.99,
    restaurant: mockRestaurants[5],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "20",
    name: "Steak & Fries",
    price: 28.99,
    restaurant: mockRestaurants[5],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
]

// Update restaurants with their menu items
mockRestaurants[0].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "1")
mockRestaurants[1].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "2")
mockRestaurants[2].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "3")
mockRestaurants[3].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "4")
mockRestaurants[4].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "5")
mockRestaurants[5].menuItems = mockMenuItems.filter((item) => item.restaurant.id === "6")

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: PaymentType.CREDIT_CARD,
    details: "Visa ending in 4242",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "2",
    type: PaymentType.DEBIT_CARD,
    details: "MasterCard ending in 8888",
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
  {
    id: "3",
    type: PaymentType.DIGITAL_WALLET,
    details: "PayPal - john@example.com",
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
]

// Mock users for order data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Nick Fury",
    email: "nick.fury@shield.com",
    role: UserRole.ADMIN,
    country: "USA",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Captain Marvel",
    email: "captain.marvel@shield.com",
    role: UserRole.MANAGER,
    country: "India",
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
  },
  {
    id: "3",
    name: "Captain America",
    email: "captain.america@shield.com",
    role: UserRole.MANAGER,
    country: "America",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    id: "4",
    name: "Thanos",
    email: "thanos@shield.com",
    role: UserRole.MEMBER,
    country: "India",
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-04"),
  },
  {
    id: "5",
    name: "Thor",
    email: "thor@shield.com",
    role: UserRole.MEMBER,
    country: "India",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "6",
    name: "Travis",
    email: "travis@shield.com",
    role: UserRole.MEMBER,
    country: "America",
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-06"),
  },
]

// Mock orders
export const mockOrders: Order[] = [
  {
    id: "order-1",
    user: mockUsers[3], // Thanos
    restaurant: mockRestaurants[0], // Spice Garden
    items: [],
    paymentMethod: mockPaymentMethods[0],
    status: OrderStatus.DELIVERED,
    createdAt: new Date("2024-01-20T10:30:00"),
    updatedAt: new Date("2024-01-20T12:15:00"),
  },
  {
    id: "order-2",
    user: mockUsers[4], // Thor
    restaurant: mockRestaurants[1], // Mumbai Delights
    items: [],
    paymentMethod: mockPaymentMethods[1],
    status: OrderStatus.PREPARING,
    createdAt: new Date("2024-01-21T14:20:00"),
    updatedAt: new Date("2024-01-21T14:45:00"),
  },
  {
    id: "order-3",
    user: mockUsers[5], // Travis
    restaurant: mockRestaurants[2], // American Diner
    items: [],
    paymentMethod: mockPaymentMethods[0],
    status: OrderStatus.CONFIRMED,
    createdAt: new Date("2024-01-21T18:10:00"),
    updatedAt: new Date("2024-01-21T18:15:00"),
  },
  {
    id: "order-4",
    user: mockUsers[1], // Captain Marvel
    restaurant: mockRestaurants[4], // Curry House
    items: [],
    paymentMethod: mockPaymentMethods[2],
    status: OrderStatus.READY,
    createdAt: new Date("2024-01-22T12:00:00"),
    updatedAt: new Date("2024-01-22T12:30:00"),
  },
  {
    id: "order-5",
    user: mockUsers[2], // Captain America
    restaurant: mockRestaurants[3], // Brooklyn Burgers
    items: [],
    paymentMethod: mockPaymentMethods[1],
    status: OrderStatus.PENDING,
    createdAt: new Date("2024-01-22T19:45:00"),
    updatedAt: new Date("2024-01-22T19:45:00"),
  },
  {
    id: "order-6",
    user: mockUsers[0], // Nick Fury
    restaurant: mockRestaurants[5], // Liberty Grill
    items: [],
    paymentMethod: mockPaymentMethods[0],
    status: OrderStatus.CANCELLED,
    createdAt: new Date("2024-01-23T13:20:00"),
    updatedAt: new Date("2024-01-23T13:25:00"),
  },
]

// Mock order items
export const mockOrderItems: OrderItem[] = [
  // Order 1 items (Thanos - Spice Garden)
  {
    id: "item-1",
    menuItem: mockMenuItems[0], // Butter Chicken
    quantity: 2,
    price: 18.99,
    createdAt: new Date("2024-01-20T10:30:00"),
    updatedAt: new Date("2024-01-20T10:30:00"),
  },
  {
    id: "item-2",
    menuItem: mockMenuItems[2], // Naan Bread
    quantity: 3,
    price: 4.99,
    createdAt: new Date("2024-01-20T10:30:00"),
    updatedAt: new Date("2024-01-20T10:30:00"),
  },

  // Order 2 items (Thor - Mumbai Delights)
  {
    id: "item-3",
    menuItem: mockMenuItems[4], // Tandoori Chicken
    quantity: 1,
    price: 19.99,
    createdAt: new Date("2024-01-21T14:20:00"),
    updatedAt: new Date("2024-01-21T14:20:00"),
  },
  {
    id: "item-4",
    menuItem: mockMenuItems[5], // Samosas
    quantity: 2,
    price: 8.99,
    createdAt: new Date("2024-01-21T14:20:00"),
    updatedAt: new Date("2024-01-21T14:20:00"),
  },

  // Order 3 items (Travis - American Diner)
  {
    id: "item-5",
    menuItem: mockMenuItems[7], // Classic Cheeseburger
    quantity: 1,
    price: 12.99,
    createdAt: new Date("2024-01-21T18:10:00"),
    updatedAt: new Date("2024-01-21T18:10:00"),
  },
  {
    id: "item-6",
    menuItem: mockMenuItems[8], // French Fries
    quantity: 1,
    price: 6.99,
    createdAt: new Date("2024-01-21T18:10:00"),
    updatedAt: new Date("2024-01-21T18:10:00"),
  },

  // Order 4 items (Captain Marvel - Curry House)
  {
    id: "item-7",
    menuItem: mockMenuItems[14], // Chicken Tikka Masala
    quantity: 1,
    price: 17.99,
    createdAt: new Date("2024-01-22T12:00:00"),
    updatedAt: new Date("2024-01-22T12:00:00"),
  },

  // Order 5 items (Captain America - Brooklyn Burgers)
  {
    id: "item-8",
    menuItem: mockMenuItems[11], // BBQ Bacon Burger
    quantity: 2,
    price: 15.99,
    createdAt: new Date("2024-01-22T19:45:00"),
    updatedAt: new Date("2024-01-22T19:45:00"),
  },

  // Order 6 items (Nick Fury - Liberty Grill)
  {
    id: "item-9",
    menuItem: mockMenuItems[17], // Grilled Salmon
    quantity: 1,
    price: 22.99,
    createdAt: new Date("2024-01-23T13:20:00"),
    updatedAt: new Date("2024-01-23T13:20:00"),
  },
]

// Assign order items to orders
mockOrders[0].items = mockOrderItems.slice(0, 2) // Order 1: 2 items
mockOrders[1].items = mockOrderItems.slice(2, 4) // Order 2: 2 items
mockOrders[2].items = mockOrderItems.slice(4, 6) // Order 3: 2 items
mockOrders[3].items = mockOrderItems.slice(6, 7) // Order 4: 1 item
mockOrders[4].items = mockOrderItems.slice(7, 8) // Order 5: 1 item
mockOrders[5].items = mockOrderItems.slice(8, 9) // Order 6: 1 item
