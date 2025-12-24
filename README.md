# Vaccine Portal (Frontend)

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

## 📸 Screenshots

### Homepage

<img width="1897" height="925" alt="Screenshot 2025-12-24 at 3 43 56 PM" src="https://github.com/user-attachments/assets/c6cd79e2-6116-4bcf-b6e5-d89c0d04b6d3" />
<img width="1897" height="927" alt="Screenshot 2025-12-24 at 3 44 26 PM" src="https://github.com/user-attachments/assets/faa56c04-c426-49f9-86a9-7d926e8cf7d8" />
<img width="1897" height="927" alt="Screenshot 2025-12-24 at 3 44 36 PM" src="https://github.com/user-attachments/assets/f73934bf-0827-42f5-af17-abc4d1c8e2c0" />
<img width="1897" height="577" alt="Screenshot 2025-12-24 at 3 44 52 PM" src="https://github.com/user-attachments/assets/9bc8e67e-3c33-41a5-948f-8753770523c0" />

### Contactus

<img width="1897" height="922" alt="Screenshot 2025-12-24 at 3 45 09 PM" src="https://github.com/user-attachments/assets/10a0bc34-777a-4b03-94f1-be57cd985ae0" />

### Aboutus

<img width="1897" height="922" alt="Screenshot 2025-12-24 at 3 45 24 PM" src="https://github.com/user-attachments/assets/0c1550e0-75c9-489c-93fc-9aaebefd3ee2" />
<img width="1897" height="844" alt="Screenshot 2025-12-24 at 3 45 33 PM" src="https://github.com/user-attachments/assets/8871e7e2-43b5-489f-8e5e-642a85f6abac" />

### FilterScreen

<img width="1897" height="792" alt="Screenshot 2025-12-24 at 3 50 10 PM" src="https://github.com/user-attachments/assets/46557d51-46e8-4e8c-95d9-af054c0d8ad9" />
<img width="1897" height="903" alt="Screenshot 2025-12-24 at 3 50 32 PM" src="https://github.com/user-attachments/assets/e9171c83-bfea-4de3-a5ea-12b91bd5a5e2" />

### Vaccine Point Screen

<img width="1897" height="876" alt="Screenshot 2025-12-24 at 3 51 43 PM" src="https://github.com/user-attachments/assets/1317b094-3673-4514-9c0f-5c0d764783b8" />
<img width="1897" height="502" alt="Screenshot 2025-12-24 at 3 51 52 PM" src="https://github.com/user-attachments/assets/7f3e3a14-04d5-4c20-9980-cd56e7ba56de" />



