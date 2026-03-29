# Nimish Bordiya | Portfolio & Resume

A high-end, minimalist portfolio website built with modern web technologies. This project showcases my technical arsenal, projects, and a print-ready resume.

🔗 **Live Site:** [my-portfolio-liard-six-46.vercel.app](https://my-portfolio-liard-six-46.vercel.app)

---

## 🚀 Features

- **Minimalist Design** — Elegant dark-themed UI with glassmorphism and high-density typography.
- **Smooth Interactions** — Powered by Lenis for smooth scrolling and GSAP for magnetic buttons and scroll-reveal animations.
- **Real-time Contact** — Integrated with Firebase Firestore to receive messages directly.
- **Print-Ready Resume** — A dedicated resume page with a custom print engine that handles layout alignment and browser iframe restrictions.
- **Responsive** — Fully optimized for all screen sizes.
- **Vercel Optimized** — Configured for clean URLs and multi-page builds.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, Tailwind CSS, TypeScript |
| Animations | GSAP (ScrollTrigger), Lenis (Smooth Scroll), Motion |
| Backend/Database | Firebase Firestore |
| Icons | Lucide React |
| Build Tool | Vite |
| Deployment | Vercel |

---

## 📦 Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/nimishbordiyajain-cpu/My-Portfolio.git
cd My-Portfolio
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Firebase:**

Create a `firebase-applet-config.json` in the root directory with your Firebase credentials:

```json
{
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "projectId": "YOUR_PROJECT_ID",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
  "appId": "YOUR_APP_ID"
}
```

4. **Run development server:**

```bash
npm run dev
```

5. **Build for production:**

```bash
npm run build
```

---

## 📄 Resume Printing

The resume page includes a specialized script to handle printing. If accessed within an iframe (like a preview window), it will automatically open in a new tab with a `?print=true` parameter to trigger the browser's print dialog reliably.

---

## 🛡️ Security Rules

The project includes a `firestore.rules` file to protect the `messages` collection, ensuring only valid data is submitted and preventing unauthorized access.

---

## ⚖️ License

MIT License © 2026 Nimish Bordiya
