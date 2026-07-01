# Gatherly 🌿

Gatherly is a premium event planning, browsing, and booking web application tailored for curated gatherings, festivals, and summits in Bangladesh. The application is built using a modern monorepo setup, featuring a Next.js client and an Express.js backend.

## 🚀 Quick Start

Follow these steps to set up and run the application locally.

### 1. Install Dependencies

From the project root, install all package dependencies:
```bash
pnpm install
```

### 2. Configure Environment Variables

#### Backend (`apps/server/.env`)
Create an `.env` file in `apps/server/` and fill in your Firebase and Better Auth configurations:
```env
PORT=3001
BETTER_AUTH_SECRET=your_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
FIREBASE_PROJECT_ID=your_firebase_project_id
IMGBB_API_KEY=your_imgbb_api_key
```

#### Frontend (`apps/web/.env.local`)
Create an `.env.local` file in `apps/web/`:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 3. Seed the Database
Populate your Firestore database with **24 premium Bangladeshi-based events** (prices are configured in BDT):
```bash
pnpm db:seed
```

### 4. Run Development Servers
Start both the Next.js frontend and Express backend concurrently:
```bash
pnpm dev
```
* The frontend will be running at [http://localhost:3000](http://localhost:3000)
* The backend API server will be running at [http://localhost:3001](http://localhost:3001)

---

## 🏗️ Project Architecture

This repository is managed as a monorepo using **pnpm workspaces** and **Turborepo**:

*   📁 **`apps/web`**: Next.js client built with React 19, custom CSS typography and grids, Framer Motion animations, and `better-auth/react` client integration.
*   📁 **`apps/server`**: Express server utilizing TypeScript (`tsx`), Firestore database, and `better-auth` for authentication.

---

## ✨ Features

### 👤 User Capabilities
*   **Authentication & Redirection:** Seamless email registration and login powered by Better Auth. Redirects users directly to their dashboard upon account creation.
*   **Explore Events:** Find local gatherings in Dhaka, Cox's Bazar, Sylhet, Chittagong, etc., with dynamic keyword, location, and category filtering.
*   **Secure Checkout:** Fully responsive mock checkout panel supporting Card, Mobile Banking (bKash/Nagad/Rocket/Upay), and Net Banking gateways displaying prices in BDT.
*   **Lakeside Member Space:** Active user dashboard detailing points balance, active reservations (bookings list with status tabs), and a personal wishlist.

### 🛠️ Admin Capabilities
*   **Admin Console:** Access controlled `/admin` portal displaying weekly booking trend charts and platform statistics.
*   **Management Sections:** Operations to demote/promote users, confirm or cancel active customer bookings, and edit/delete/create events.
*   **Responsive Sidebars:** Unified, mobile-drawer-supported sticky navigation menu across all admin areas.

---

## 📋 Available Commands

Execute these scripts from the project root directory:

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts development servers for both `web` and `server` concurrently using Turborepo. |
| `pnpm db:seed` | Runs the database cleanup and seeds **24 Bangladeshi events** with BDT pricing. |
| `pnpm build` | Builds both applications for production. |
| `pnpm build:web` | Builds the Next.js client for production. |
| `pnpm build:server` | Compiles the TypeScript Express backend into JavaScript. |
| `pnpm start:web` | Runs the production build of the Next.js web application. |
| `pnpm start:server` | Launches the compiled production Express backend. |
