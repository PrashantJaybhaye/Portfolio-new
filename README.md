# 👨‍💻 Prashant Jaybhaye | Full Stack Developer

Welcome to my personal portfolio! This project is a curated showcase of my journey as a Full Stack Developer, featuring interactive experiences, modern design, and a custom editorial blog.

---

## 🌟 Vision & Purpose

This portfolio is built to demonstrate high-end web performance, responsive motion design, and a robust technical foundation. It serves as both a professional business card and a digital playground where I experiment with new technologies like **AI integration**, **3D spatial UI**, and **scalable architectures**.

---

## 🚀 Key Highlights

- **✨ Premium UI/UX**: Built with a "dark-mode first" aesthetic, featuring glassmorphism, smooth Framer Motion transitions, and a customized grid layout.
- **🌍 Immersive 3D**: Features an interactive 3D globe and spatial elements built with **Three.js** and **React Three Fiber**.
- **📋 Project Portfolio**: Showcases my major projects including **Sidvia**, **AI Agent**, and the **Smart Allocation System**.
- **📝 Editorial Blog**: A custom-built blog platform for sharing insights, with support for Markdown and high-contrast typography.
- **🔒 Secure Admin CMS**: A full-featured admin dashboard (Prisma + Auth) to manage content, projects, and contacts in real-time.

---

## 🛠️ Technical Stack

### **Frontend & Motion**
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4, shadcn/ui, & Magic UI
- **Animations:** Framer Motion (Motion 12) & Aceternity UI
- **3D Graphics:** React Three Fiber & Three.js

### **Backend & Storage**
- **Database:** PostgreSQL (with Prisma ORM)
- **Authentication:** Next-Auth.js
- **CMS Integration:** Custom Prisma-based CMS
- **Deployment:** Vercel

---

## ⚙️ Local Development

### Prerequisites
- **Node.js 18+**
- **PostgreSQL** instance

### 1. Installation
```bash
git clone https://github.com/prashantjaybhaye/Portfolio-new.git
cd Portfolio-new
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
NEXTAUTH_SECRET="your-32-character-secret"
NEXTAUTH_URL="http://localhost:3000"

# Optional Cloudinary for blog images
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

### 3. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 4. Running the Dev Server
```bash
npm run dev
```

---

## 📜 Available Commands

- `npm run dev` – Launch development server.
- `npm run build` – Prepare project for production.
- `npm run create-admin` – Custom script to generate an admin account for the CMS.
- `npx prisma studio` – Open the Prisma UI to explore your local database.

---

## 📫 Connect with Me

- **LinkedIn:** [Prashant Jaybhaye](https://www.linkedin.com/in/prashant-jaybhaye/)
- **GitHub:** [@prashantjaybhaye](https://github.com/prashantjaybhaye)
- **Instagram:** [@prashanttt\_\_214](https://www.instagram.com/prashanttt__214)

---

<div align="center">
  <p>© 2026 Developed by <b>Prashant Jaybhaye</b>. Built with ❤️ and Next.js.</p>
</div>
