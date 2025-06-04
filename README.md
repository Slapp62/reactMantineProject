# 📘 React Mantine School Project

A modern React frontend application built with **React**, **Vite**, **TypeScript**, and **Mantine UI**. This project interfaces with the school's API to display and manage a collection of cards, featuring search, sorting, animations, and pagination. It allows a user to create basic account, as well as a business account with card creating capabilities. There is also built-in account management features for users and admins.

---

## 🚀 Features

- 🔧 **Built with Vite** for lightning-fast development
- 🎨 **UI powered by Mantine** – clean, responsive, and accessible
- 🔎 **Search functionality** by title, subtitle, or description
- ↕️ **Sorting** by title (A–Z or Z–A) and date created (newest/oldest)
- 📄 **Pagination** (12 cards per page)
- 💫 **Framer Motion animations** for smooth UI transitions
- 🗂️ **Redux state management** for search and sort control
- 🧠 **TypeScript** for strict type safety and developer experience

---

## 🏗️ Project Structure

```
reactMantineProject/
├── public/
├── src/
│   ├── components/
│   │   ├── Cards/
│   │   │   └── MiniCard.tsx
│   │   └── Hero.tsx
│   ├── hooks/
│   │   └── useGetCards.ts
│   ├── store/
│   │   ├── cardSlice.ts
│   │   ├── searchSlice.ts
│   │   └── store.ts
│   ├── types/
│   │   └── index.ts
│   ├── pages/
│   │   └── HomePage.tsx
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Slapp62/reactMantineProject.git
cd reactMantineProject
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm run preview` – Preview the production build locally

---

## 📄 Public Site

The site is currently deployed live at `https://reactMantineProject.onrender.com`

---

## 📄 License

This project is for academic purposes only and not intended for production use.

---

## 🙌 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Mantine UI](https://mantine.dev/)
- [Redux](https://redux.js.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)

---

_Developed by Elazar Lapp._
