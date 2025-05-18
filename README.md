
# 🔥 CyBurn

**CyBurn** is a modern, full-stack web application built with TypeScript and Python. It leverages containerization for seamless deployment and scalability.

## 🚀 Features

* **Frontend**: Developed using TypeScript, CSS, and HTML for a responsive and interactive user interface.
* **Backend**: Powered by Python, providing robust and efficient server-side operations.
* **Containerization**: Utilizes Docker for consistent development and deployment environments.
* **Deployment**: Configured for deployment on platforms like Koyeb using `docker-compose`.

## 🧱 Project Structure

```
CyBurn/
├── backend
│   ├── app.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── scan.sh
│   └── wordlists.txt
├── docker-compose.yml
├── Dockerfile.koyeb
├── frontend
│   ├── app
│   │   ├── chat
│   │   │   └── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── dboard
│   │   │   └── page.tsx
│   │   ├── decoder
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── lab
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── page.tsx
│   │   ├── profile
│   │   │   └── page.tsx
│   │   ├── register
│   │   │   └── page.tsx
│   │   ├── request
│   │   │   └── page.tsx
│   │   └── scan
│   │       └── page.tsx
│   ├── Dockerfile
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.mjs
│   ├── public
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── README.md
│   ├── tsconfig.json
│   └── yarn.lock
├── labs
│   ├── lab01
│   │   ├── Dockerfile
│   │   ├── index.html
│   │   ├── nginx.conf
│   │   ├── script.js
│   │   └── style.css
│   └── lab02
│       ├── admin
│       ├── Dockerfile
│       ├── index.html
│       └── nginx.conf
├── LICENSE
└── README.md
```



## 🛠️ Getting Started

### Prerequisites

* [Docker](https://www.docker.com/get-started) installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/threalwinky/CyBurn.git
   cd CyBurn
   ```



2. **Build and run the containers**:

   ```bash
   docker-compose up --build
   ```



3. **Access the application**:

   Open your browser and navigate to `http://localhost:3000` to view the frontend.

## 📦 Deployment

CyBurn is configured for deployment on [Koyeb](https://www.koyeb.com/). Use the provided `Dockerfile.koyeb` and `docker-compose.yml` for setting up the production environment.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

For more information, visit the [CyBurn GitHub Repository](https://github.com/threalwinky/CyBurn).

---

