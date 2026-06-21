<div align="center">

  # 🏔️ Nomichi Trip Desk — Travel Operations & Conversion Platform

  **Public Journeys · Lead Pipeline · AI-Assisted Operations · Trip CMS**

  [![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://reactjs.org)
  [![Supabase](https://img.shields.io/badge/Supabase-DB_%26_Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

  <br />

  *A complete end-to-end travel platform. Converts public site visitors into qualified leads and gives the internal team a powerful workspace to track conversations, generate AI replies, and manage trip inventory.*

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Testing & Evaluation Guide](#-testing--evaluation-guide)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Design Decisions](#-design-decisions)
- [Quick Start](#-quick-start)

---

## 🎯 Overview

**Nomichi Trip Desk** bridges the gap between public discovery and backend operations. It replaces scattered spreadsheets and emails with a unified platform where:

- **Travellers** can browse beautifully designed, offbeat, small-group journeys and submit contextual enquiries.
- **The Team** gets a secure dashboard to manage the entire lead pipeline, track conversation history, and publish new trips dynamically.

> **North Star Metric:** Lead Conversion Speed — moving travellers from "New Enquiry" to "Confirmed" smoothly without losing context.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🏔️ **Public Discovery** | Highly aesthetic, modern public interface for browsing open trips. |
| 🧲 **Contextual Enquiries** | Enquiry forms that capture the traveller's vibe, group size, and preferred dates. |
| 📊 **Operations Dashboard** | Real-time overview of new leads, unassigned conversations, and pipeline health. |
| 🔄 **Lead Pipeline CRM** | Kanban-style stage tracking (New → Contacted → Qualified → Vibe Check → Confirmed). |
| 📝 **Activity History** | Immutable ledger tracking every stage change, assignment, and internal note. |
| 🤖 **AI WhatsApp Assistant** | Google Gemini integration to instantly draft personalized WhatsApp follow-ups based on the traveller's enquiry. |
| 🛠️ **Trip CMS** | Full content management system to create, edit, and open/close trip departures. |
| 🔒 **Enterprise Security** | Supabase Authentication and strict PostgreSQL Row Level Security (RLS) protecting team data. |

---

## 🧪 Testing & Evaluation Guide

If you are reviewing this project, here is the recommended flow to test the core functionality:

### 1. The Public Flow (Unauthenticated)
1. Navigate to the **Homepage**.
2. Scroll to the "Open journeys" section to see the dynamically fetched trips.
3. Click on any trip to view its details.
4. Fill out the **Enquiry Form** with some test details (vibe, travelling as, etc.) and submit it. You will be redirected to a success page.

### 2. The Team Flow (Authenticated)
1. Navigate to `/login` and sign in with the provided Admin credentials.
2. Check the **Overview Dashboard** — you should see your new enquiry flagged under "Needs attention".
3. Navigate to **Leads** and find your test enquiry.
4. Click on the lead to open the **Lead Workspace**.

### 3. CRM & AI Assistant Capabilities
1. In the Lead Workspace, change the Pipeline Stage (e.g., from `New` to `Contacted`) and assign it to an owner. Notice how the **Activity History** automatically logs these changes.
2. Click **Draft WhatsApp reply**. The Google Gemini integration will analyze the traveller's original enquiry (their "vibe" and preferences) and generate a personalized, conversational reply ready to be pasted into WhatsApp.
3. Add a manual internal note and see it appear in the timeline.

### 4. Trip CMS
1. Navigate to the **Trips** tab in the sidebar.
2. Create a new trip or edit an existing one. Change its status from "Closed" to "Open" and verify it instantly appears on the public homepage.

---

## 🏗️ System Architecture

### Data Flow

```text
Public Traveller ──▶ Next.js (App Router) ──▶ Server Actions ──▶ Supabase PostgreSQL
                                                                         │
                                                                         ▼
           Team Admin ◀── Authenticated Dashboard ◀── Lead CRM & Trip CMS
               │                                                 │
               ▼                                                 ▼
        WhatsApp Follow-up ◀── Google Gemini AI ◀── Traveller Context
```

---

## 💻 Tech Stack

### Frontend & Core
| Technology | Purpose |
|-----------|---------|
| **Next.js 14 (App Router)** | Server-side rendering, routing, and React Server Actions |
| **React 18** | UI components and client-side interactivity |
| **Tailwind CSS + Framer Motion** | Custom design system, typography, and micro-animations |
| **TypeScript** | Strict type safety across the entire stack |

### Backend & Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Supabase (PostgreSQL)** | Core relational database and Row Level Security |
| **Supabase Auth** | JWT-based team authentication and session management |
| **Supabase Storage** | CDN-backed hosting for trip hero images |
| **Google Gemini AI** | LLM powering the automated WhatsApp reply drafting |
| **Vercel** | Edge-network hosting and CI/CD deployment |

---

## 📁 Project Structure

```text
nomichi-trip-desk/
│
├── 📁 app/                          # Next.js App Router Pages
│   ├── (public)/                    # Public-facing routes (Home, Trip Details)
│   ├── app/                         # Authenticated Team Dashboard routes
│   └── login/                       # Supabase Auth flow
│
├── 📁 components/                   # React Components
│   ├── app/                         # CRM and CMS components (Lead Table, Forms)
│   ├── public/                      # Public site components (Trip Cards, Enquiry)
│   └── ui/                          # Reusable Shadcn-style primitives
│
├── 📁 lib/                          # Core Business Logic
│   ├── supabase/                    # Supabase client (browser, server, middleware)
│   ├── actions/                     # React Server Actions for data mutations
│   ├── pipeline.ts                  # Lead pipeline definitions and constants
│   ├── schema.ts                    # Zod validation schemas
│   └── types.ts                     # TypeScript interfaces
│
├── 📁 supabase/                     # Database Configuration
│   ├── migrations/                  # Sequential SQL migrations (Schema, Functions, RLS)
│   └── seed.sql                     # Demo data for testing (Trips, Leads, Notes)
│
└── tailwind.config.ts               # Design system tokens and custom animations
```

---

## 🧠 Design Decisions

### 1. Server Actions over API Routes
Instead of building a traditional REST API, all data mutations (enquiries, lead updates, trip creation) use **React Server Actions**. This eliminates client-side fetching waterfalls, reduces bundle size, and allows seamless progressive enhancement.

### 2. Row Level Security (RLS)
Security is enforced at the database level, not just the application layer. The public can safely `INSERT` new enquiries and `SELECT` open trips, but all lead data, profiles, and internal notes are strictly locked behind `authenticated` role policies.

### 3. AI as an Assistant, Not an Autopilot
The Google Gemini integration drafts WhatsApp replies based on context, but it **does not send them automatically**. It puts the draft in the clipboard so a human agent can review, tweak, and send it personally—preserving Nomichi's focus on authentic human connection.

### 4. Custom Design System
Avoided generic component libraries in favor of a bespoke, premium Tailwind setup using tailored brand colors (Rust, Olive, Sand, Ink) to match the high-end, offbeat aesthetic of the journeys being sold.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- A Supabase Project
- A Google Gemini API Key

### 1. Clone & Install
```bash
git clone https://github.com/syntaxXayush/NomichiTrip.git
cd NomichiTrip
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and add your keys:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_key
```

### 3. Database Setup
Run the SQL files found in `supabase/migrations/` sequentially in your Supabase SQL Editor, followed by `supabase/seed.sql` to populate demo data.

### 4. Run Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to see the public site, or `/login` to access the admin dashboard.

---

<div align="center">
  <br />
  <sub>Built by Ayush Kumar for the Nomichi Engineering Assignment.</sub>
</div>
