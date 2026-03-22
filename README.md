# 👨‍💻 Prashant Jaybhaye

Welcome to my personal portfolio and digital playground! This repository houses my professional portfolio website, an interactive 3D experience, and a high-end editorial blog.

---

## 🌟 Vision & Purpose

This project is built to showcase my journey as a developer, highlighting my technical skills in modern web development, my design aesthetic, and my thoughts on technology through an integrated blog platform.

---

## 🚀 Key Highlights

- **✨ Modern & Aesthetic UI**: A premium, high-contrast dark theme with glassmorphism and smooth motion design.
- **🌍 3D Spatial Experience**: An interactive 3D globe and immersive elements built with **React Three Fiber**.
- **📝 High-End Editorial Blog**: A custom-built, magazine-style blog platform for sharing knowledge and insights.
- **🔒 Secure Admin CMS**: A restricted dashboard to manage my projects, blog posts, and site metrics.
- **🛠️ Robust Architecture**: Optimized for performance and SEO using **Next.js 15** and **React 19**.

---

## 🛠️ Technical Arsenal

### **Frontend & Design**

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4 & Vanilla CSS
- **Animations:** Framer Motion & React Three Fiber
- **Icons:** Lucide React & Material UI Icons

### **Backend & Infrastructure**

- **Authentication:** Next-Auth (Credentials based)
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Analytics:** Vercel Analytics

---

## 📸 Project Showcase

The portfolio includes several key sections:

- **Hero Section:** Featuring my personal brand and identity.
- **Projects Grid:** A curated list of my best work with interactive cards.
- **Tech Stack:** A visual representation of my current skills and tools.
- **The Archive (Blog):** A dedicated space for my technical writing.

---

## ⚙️ Setting Up Locally

If you'd like to explore the code or run this project on your machine:

### 1. Prerequisite

Ensure you have **Node.js 18+** and a **PostgreSQL** instance ready.

### 2. Installation

```bash
git clone https://github.com/prashantjaybhaye/Portfolio-new.git
cd Portfolio-new
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
NEXTAUTH_SECRET="your-32-char-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Launch

```bash
npm run dev
```

---

## 📜 Available Commands

- `npm run dev` – Launch development server.
- `npm run build` – Create production-ready build.
- `npm run lint` – Run linting checks.
- `npm run create-admin` – Script to generate an admin user for the CMS.

---

## 📫 Connect with Me

- **LinkedIn:** [Prashant Jaybhaye](https://www.linkedin.com/in/prashant-jaybhaye/)
- **GitHub:** [@prashantjaybhaye](https://github.com/prashantjaybhaye)
- **Instagram:** [@prashanttt\_\_214](https://www.instagram.com/prashanttt__214)

---

<div align="center">
  <p>© 2026 Developed by <b>Prashant Jaybhaye</b>. Built with Next.js, PlanetScale & Vercel.</p>
</div>
