# 🍔 SLOOZE Food Ordering System (Frontend)

A role-based food ordering web application for Nick Fury's business.  
This project is built with **Next.js 15+ (App Router)**, **TypeScript**, **TailwindCSS**, and **React Query (TanStack Query)**.

It implements **RBAC (Role-Based Access Control)** with three roles:

- **Admin**
- **Manager**
- **Member**

Managers and Members can only access features and data limited to their assigned country.

---

## ✨ Features

- 🔒 Role-based access (Admin, Manager, Member)
- 🍴 View restaurants & menu items
- 🛒 Create orders (add food items to cart)
- 💳 Checkout and pay with existing payment methods
- ❌ Cancel orders
- 🛠️ Update payment method (Admin only)
- 🌍 Relational access: Managers & Members restricted by country

---

## 📦 Tech Stack

- **Next.js 15+ (App Router)**
- **TypeScript**
- **TailwindCSS**
- **TanStack Query (React Query)**
- **Shadcn/UI** components

---

## ⚙️ Local Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/muhammad-bilal452/slooze-careers-frontend
cd slooze-frontend
```

## 2. Install dependencies

npm install

# or

yarn install

# or

pnpm install

## 3. Create environment variables

Create a `.env.local` file in the root directory and add:

NEXT_PUBLIC_API_URL=http://localhost:8080/
NEXT_PUBLIC_APP_NAME=slooze-api

## 4. Run the development server

npm run dev
or
yarn dev
or
pnpm dev

Now open http://localhost:3000
