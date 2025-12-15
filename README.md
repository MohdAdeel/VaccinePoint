# 📌 Vaccine Portal (Frontend)

A modern, scalable frontend built with **Vite**, **React 19**, and **TailwindCSS 4**, designed for enterprise-level applications.

---

## 🚀 Tech Stack

**Core**

* React 19
* React Router v7
* Vite 6

**State & Data**

* TanStack React Query
* Axios
* Zod

**Authentication**

* Azure AD (MSAL)

**UI & UX**

* TailwindCSS 4
* Radix UI
* Framer Motion
* Lucide Icons
* ShadCN-style utilities

**Utilities**

* Embla Carousel
* React Day Picker
* React Select
* Resizable Panels
* XLSX Export
* FileSaver
* cmdk
* Google Maps API

---

## 📁 Project Structure

```txt
src/
├── assets/        # Static assets
├── components/    # Reusable UI components
├── context/       # Global context providers
├── hooks/         # Custom hooks
├── layouts/       # App layouts
├── pages/         # Route-level pages
├── routes/        # Route definitions
├── services/      # API & external services
├── utils/         # Helpers & utilities
└── main.jsx       # Application entry point
```

---

## 🛠️ Setup

```bash
pnpm install
pnpm dev
```

---

## 🏗️ Build

```bash
pnpm build:dev
pnpm build:prod
pnpm preview
```

---

## 🔐 Authentication (MSAL)

```js
import { MsalProvider } from "@azure/msal-react";

<MsalProvider instance={msalInstance}>
  <App />
</MsalProvider>
```

---

## 🌍 Environment Variables

```env
VITE_API_BASE_URL=
VITE_AZURE_CLIENT_ID=
VITE_AZURE_TENANT_ID=
VITE_GOOGLE_MAPS_API_KEY=
```

---

## 📦 Commands

| Command         | Description              |
| --------------- | ------------------------ |
| pnpm dev        | Start development server |
| pnpm build:dev  | Build for testing        |
| pnpm build:prod | Production build         |
| pnpm preview    | Preview build            |
| pnpm lint       | Run linting              |

---

## ✨ Key Features

* Azure AD authentication
* Fast Vite-based development
* Modern, accessible UI
* API caching with React Query
* Google Maps integration
* Excel export support
* Fully responsive design

---

## 📄 License

Private project – internal development use only.
