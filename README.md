# 📌 Vaccine Portal (Frontend)

A modern, high-performance frontend built with **Vite**, **React 19**, **TailwindCSS 4**, **React Query**, **MSAL Authentication**, **Radix UI**, and **Framer Motion**.  
This project is structured for scalability and enterprise-level development.

---

## 🚀 Tech Stack

### **Frontend Framework**
- **React 19**
- **React Router v7**

### **Build Tool**
- **Vite 6**

### **State & Data**
- **React Query (TanStack Query)**
- **Zod** (schema validation)
- **Axios** for HTTP requests

### **Authentication**
- **Microsoft MSAL** (`@azure/msal-browser`, `@azure/msal-react`)

### **UI Libraries**
- **Radix UI Components**
- **Lucide Icons**
- **ShadCN-style utilities**
- **Framer Motion** (animations)
- **Embla Carousel**
- **React Day Picker**
- **React Select**
- **Resizable Panels**

### **Styling**
- **TailwindCSS 4**
- **tailwind-merge**
- **class-variance-authority**
- **tw-animate-css**

### **Utilities**
- **FileSaver**
- **XLSX Export**
- **cmdk** (command menu)
- **Google Maps API**

---

## 📁 Project Structure (Recommended)


src/
 ├── components/
 ├── hooks/
 ├── pages/
 ├── context/
 ├── utils/
 ├── services/
 ├── assets/
 ├── layouts/
 ├── routes/
 └── main.jsx
```



## 🛠️ Setup Instructions

### **1. Install Dependencies**
```bash
pnpm install
```

### **2. Start Development Server**
```bash
pnpm dev
```

This will run the project in **development mode**.

### **3. Build for Production**
```bash
pnpm run build:prod
```

### **4. Build for Testing / Dev Deployment**
```bash
pnpm run build:dev
```

### **5. Preview Production Build**
```bash
pnpm preview
```

---

## 🔐 MSAL Authentication Setup

This project uses Azure AD authentication.

Basic example:

```js
import { MsalProvider } from "@azure/msal-react";

<MsalProvider instance={msalInstance}>
  <App />
</MsalProvider>
```

---

## 🌍 Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=https://your-api-url.com
VITE_AZURE_CLIENT_ID=your-client-id
VITE_AZURE_TENANT_ID=your-tenant-id
VITE_GOOGLE_MAPS_API_KEY=your-key
```

---

## 📦 Commands Overview

| Command | Description |
|--------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build:dev` | Build for development/testing |
| `pnpm build:prod` | Build optimized production output |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

---

## ✨ Features

- 🔐 **Azure AD Authentication**
- 🚀 **Vite-powered blazing-fast dev environment**
- 🎨 **Modern UI with Radix & Tailwind**
- 📊 **React Query for API caching & fetching**
- 🌍 **Google Maps Integration**
- 📥 **Excel export (XLSX)**
- ⚡ **Framer Motion animations**
- 🧩 **Reusable component architecture**
- 📱 **Fully responsive layout**

---

## 📘 Guidelines & Recommendations

- Use **React Query** for all API calls.
- Use **Zod** schemas for input validation.
- Keep components reusable and atomic.
- Prefer **Radix UI** + **Tailwind** instead of custom unstructured CSS.
- Keep `.env` safe — never commit it.

---

## 📄 License

This project is private and for development use only.

---

If you want, I can also generate:

✅ Folder structure  
✅ API documentation  
✅ Component documentation  
✅ Screenshots section  

Just tell me!
