# 🌳 Vanadhikar — AI-Powered Forest Rights Decision Support System

**Vanadhikar** is an AI-driven Decision Support System built to streamline and modernize the implementation of the **Forest Rights Act (FRA), 2006** in India.
The platform assists government officials and administrative bodies in managing tribal land claims, analyzing supporting documents, answering policy-related queries, and improving transparency in the protection of indigenous forest rights.

🔗 **Live Demo:** https://vanadhikar-azure.vercel.app/

---

# 🚀 Features

### 🤖 AI-Powered Policy Assistant

* Conversational AI chatbot for FRA-related queries
* Real-time responses using Groq LLM APIs
* Context-aware legal and policy assistance

### 📄 Intelligent Document Analysis

* Analyze uploaded claim documents
* Extract and summarize relevant information
* Assist officers in claim verification workflows

### 🌐 Multilingual Translation

* Translate policy explanations and claim-related content
* Improve accessibility for regional and tribal communities

### 📊 Analytics Dashboard

* Interactive visualizations and charts
* Claim trends, approval insights, and administrative analytics

### 🗂️ Case Management System

* Organize and track forest rights claims
* Centralized administrative workflow management

### ⚡ Modern Full-Stack Architecture

* Built with Next.js App Router
* Serverless API architecture
* Fully responsive UI with TypeScript support

---

# 🏗️ Tech Stack

| Category               | Technologies                  |
| ---------------------- | ----------------------------- |
| Frontend               | Next.js 14, React, TypeScript |
| Styling                | Tailwind CSS                  |
| Backend                | Next.js API Routes            |
| AI Integration         | Groq API                      |
| Deployment             | Vercel                        |
| Charts & Visualization | Recharts                      |
| State & Utilities      | React Hooks, Utility Modules  |

---

# 📁 Project Structure

```bash
vanadhikar/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts
│   │   │   ├── analyze/route.ts
│   │   │   └── translate/route.ts
│   │   ├── dashboard/page.tsx
│   │   ├── claims/page.tsx
│   │   ├── cases/page.tsx
│   │   ├── policy/page.tsx
│   │   ├── analytics/page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   └── chat/
│   │       └── ChatPanel.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── mock-data.ts
│   │   └── fra-knowledge.ts
│   │
│   └── types/index.ts
│
├── .env.local
└── README.md
```

---

# 🧠 System Architecture

```text
User Interface (Next.js + React)
            │
            ▼
    API Route Layer
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Chat API  Analyze API  Translate API
            │
            ▼
        Groq LLM API
            │
            ▼
 FRA Knowledge Base + Mock Claim Data
```

---

# ⚙️ Local Development Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/PranoyRoy2004/AI-ForestRights_DSS-.git
cd AI-ForestRights_DSS-
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env.local` file:

```env
GROQ_API_KEY=your_groq_api_key
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Visit:

```bash
http://localhost:3000
```

---

# 🎯 Core Objectives

* Simplify the implementation of the Forest Rights Act (2006)
* Improve transparency in tribal land claim processing
* Reduce administrative workload using AI assistance
* Enable faster policy interpretation and document analysis
* Build accessible technology for governance and social impact

---

# 🔐 Future Enhancements

* OCR-based document extraction
* GIS and satellite mapping integration
* Role-based authentication system
* Real-time case collaboration
* Advanced analytics and reporting
* Offline-first support for remote regions
* RAG-based legal knowledge retrieval

---

# 📸 Key Modules

| Module    | Purpose                            |
| --------- | ---------------------------------- |
| Dashboard | Administrative overview & insights |
| Claims    | Claim filing and verification      |
| Cases     | Case tracking and management       |
| Policy    | FRA policy Q&A assistant           |
| Analytics | Visual data intelligence           |
| AI Chat   | Real-time governance assistant     |

---

# 🌍 Impact

Vanadhikar is designed as a technology-first governance platform focused on empowering institutions responsible for protecting tribal and indigenous rights.
By combining AI, policy intelligence, and modern full-stack engineering, the platform aims to reduce friction in public administration while improving accessibility, transparency, and efficiency in FRA claim processing.

---

# 👨‍💻 Author

**Pranoy Roy**

* LinkedIn: https://www.linkedin.com/in/pranoy-roy-112ab41b9/

---

# 📄 License

This project is licensed under the MIT License.
