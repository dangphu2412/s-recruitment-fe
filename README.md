# 🧑‍💼 User Management Frontend App

This is the frontend interface for the User Management Platform, built with **Next.js**, styled using **Chakra UI**, and powered by **React Query** and **Zustand** for data fetching and state management. It connects to the [NestJS-based Backend API](https://github.com/dangphu2412/s-recruitment-be) and supports domain-driven feature breakdown for scalability and collaboration.

---

## ⚙️ Tech Stack

| Tech        | Purpose                             |
|-------------|-------------------------------------|
| [Next.js](https://nextjs.org/)        | React framework with SSR/ISR support |
| [Chakra UI](https://chakra-ui.com/)   | Component-based design system        |
| [React Query](https://tanstack.com/query) | Data fetching and caching             |
| [Zustand](https://zustand-demo.pmnd.rs/) | Global state management (minimal)    |
| TypeScript   | Static typing                     |

---

## 🗂️ Feature Overview

This frontend matches the backend’s domain-driven structure:

### 🔐 Account Service
- **Login/Register UI**
- **User Profile**
- **Role-based UI rendering**

### 📋 Activities
- View & request **activity logs**
- Submit **absence / work requests**

### 🧾 Billing
- Visualize **operation fee status**
- View **payment history**
- Reminder alerts for pending dues

### 📊 Dashboard
- KPI cards & charts (on-time %, trends)
- Personal performance summary

### 🧱 Shared UI
- Reusable form controls, buttons, tables
- Notifications & modals
- Chakra-based responsive layouts

---

## 🚀 Getting Started

### 📥 Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recommended)

### 🔧 Setup

```bash
pnpm install
pnpm run dev
```