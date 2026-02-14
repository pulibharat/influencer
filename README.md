# InfluMatch — India's #1 Influencer Marketing Platform

<p align="center">
  <strong>Connect brands with India's top influencers for impactful collaborations.</strong>
</p>

---

## 📖 Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Functionality](#pages--functionality)
- [Data & Mock API](#data--mock-api)
- [Authentication](#authentication)
- [Running the Project](#running-the-project)
- [Environment & API Keys](#environment--api-keys)
- [Deployment](#deployment)
- [License](#license)

---

## 🚀 Project Overview

**InfluMatch** is a full-stack-ready influencer marketing web application built for the Indian market. It allows **Clients** (brands/businesses) to discover, filter, and connect with **Influencers** (content creators) across India. The platform supports role-based dashboards, real-time messaging, notifications, profile management, and influencer discovery with advanced filtering.

The application currently runs with **mock data** (100 auto-generated influencer profiles) and does not require any external API keys or backend services to function locally.

---

## ✨ Key Features

### 🏠 Landing Page
- Animated hero section with gradient effects and floating feature cards
- Platform statistics (10K+ Influencers, 2K+ Brands, 50K+ Campaigns)
- "How It Works" — 5-step visual flow (Registration → Search → Matching → Collaboration → Feedback)
- Responsive header with mobile hamburger menu
- Footer with company links and contact info

### 🔐 Authentication (Mock)
- Sign In / Sign Up modal with role selection (**Client** or **Influencer**)
- Google & Facebook OAuth buttons (mock — triggers demo login)
- Role-based profile creation on signup
- Protected dashboard routes — redirects unauthenticated users to landing page

### 📊 Dashboard Home
- Personalized welcome message based on logged-in user
- Role-specific statistics cards:
  - **Client**: Influencers Found, Active Chats, Pending Requests, Campaign Reach
  - **Influencer**: Rating, Messages, Collab Requests, Profile Views
- Recent Activity feed with color-coded status dots
- Quick Actions grid linking to Influencers, Messages, Notifications, and Analytics

### 👥 Influencer Directory (`/dashboard/influencers`)
- Browse **100 auto-generated influencer profiles**
- **Search** by name (real-time filtering)
- **Filter** by City (20 Indian cities) and Niche (17 categories)
- Card grid layout with gradient headers, avatars, city, niche badge, follower count, and rating
- Click any card to view full influencer profile

### 👤 Influencer Profile (`/dashboard/influencer/:id`)
- Detailed profile view with:
  - Avatar, name, city, rating, review count
  - Follower count and brand collaboration count
  - Social links (Instagram, YouTube, Twitter) with handles
  - About section with bio
  - Info grid: Niche, Audience Type, Region, Languages
  - Past Brand Collaborations (3–7 brands per influencer)
  - Client Reviews section with ratings and comments
- Action buttons: **Send Collaboration Request** and **Send Email**

### 💬 Messages (`/dashboard/messages`)
- Chat thread list with participant avatars, last message preview, timestamps, and unread badges
- Full chat view with message bubbles (gradient for sent, muted for received)
- Real-time message input with Enter-to-send
- Mobile-responsive: list/chat toggle on small screens
- 3 pre-populated sample conversations

### 🔔 Notifications (`/dashboard/notifications`)
- Notification list with type-based icons and color coding:
  - 🟣 Collaboration requests
  - 🔵 Messages
  - 🟡 Reviews
  - ⚪ System alerts
- Unread indicator (blue left border + dot)
- 6 sample notifications with timestamps

### 👤 My Profile (`/dashboard/profile`)
- View and edit profile information:
  - Avatar, name, role badge
  - Full Name, Email, City fields
  - **Client-specific**: Company field
  - **Influencer-specific**: Niche, Instagram Handle, YouTube Channel fields
  - Bio textarea
- Save Changes button

### ⚙️ Settings (`/dashboard/settings`)
- **Account Settings**: Email, password change
- **Notifications**: Toggle switches for email notifications, collab alerts, marketing emails, weekly digest
- **Privacy**: Public profile toggle, online status toggle
- **Danger Zone**: Delete account button with destructive styling

### 🧭 Sidebar Navigation
- Persistent sidebar on desktop, slide-out drawer on mobile
- Menu items: Home, Influencers, Notifications (with unread badge), Messages, Profile, Settings
- Sign Out button at bottom
- Active route highlighting with gradient styling

### 📱 Top Navigation Bar
- Search bar for influencers and campaigns
- Notification bell with dropdown (latest 4 notifications + "View All" link)
- Profile dropdown with quick links to Profile, Settings, and Sign Out

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + tailwindcss-animate |
| **UI Components** | shadcn/ui (Radix UI primitives) |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM v6 |
| **State Management** | React Context API |
| **Data Fetching** | TanStack React Query |
| **Charts** | Recharts |
| **Forms** | React Hook Form + Zod validation |
| **Icons** | Lucide React |
| **Notifications** | Sonner toast library |
| **Testing** | Vitest |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthModal.tsx          # Sign In / Sign Up modal
│   ├── dashboard/
│   │   └── DashboardLayout.tsx    # Sidebar + top bar + outlet
│   ├── landing/
│   │   ├── Footer.tsx             # Landing page footer
│   │   ├── Hero.tsx               # Hero section with CTA
│   │   ├── HowItWorks.tsx         # 5-step process flow
│   │   ├── LandingHeader.tsx      # Landing page navbar
│   │   └── Stats.tsx              # Platform statistics
│   └── ui/                        # shadcn/ui components (40+ components)
├── contexts/
│   └── AuthContext.tsx             # Auth state, login/signup/logout
├── data/
│   └── mockData.ts                # Types, mock data generators, sample data
├── hooks/
│   ├── use-mobile.tsx             # Mobile breakpoint detection
│   └── use-toast.ts               # Toast notification hook
├── pages/
│   ├── DashboardHome.tsx          # Dashboard overview
│   ├── Index.tsx                  # Landing page
│   ├── InfluencerProfile.tsx      # Individual influencer view
│   ├── InfluencersPage.tsx        # Influencer directory with filters
│   ├── MessagesPage.tsx           # Chat/messaging interface
│   ├── NotFound.tsx               # 404 page
│   ├── NotificationsPage.tsx      # Notifications list
│   ├── ProfilePage.tsx            # User profile editor
│   └── SettingsPage.tsx           # App settings
├── lib/
│   └── utils.ts                   # Utility functions (cn helper)
├── App.tsx                        # Root component with routes
├── App.css                        # Global styles
├── index.css                      # Tailwind + custom design tokens
└── main.tsx                       # Entry point
```

---

## 📦 Data & Mock API

The application uses **client-side mock data** defined in `src/data/mockData.ts`:

### Auto-Generated Influencers (100 profiles)
Each influencer is procedurally generated with:
- **Name**: Random combination from 50 first names × 20 last names
- **City**: Rotated through 20 major Indian cities
- **Niche**: Rotated through 20 content categories
- **Followers**: Random between 100K – 5M
- **Rating**: Random between 3.5 – 5.0
- **Languages**: 2–3 random from 10 Indian languages
- **Audience Type**: Random from 8 demographic segments
- **Social Links**: Instagram, YouTube, Twitter (auto-generated handles)
- **Past Brands**: 3–7 random from 15 major brands
- **Reviews**: 2 client reviews per influencer

### Static Sample Data
- **6 Notifications**: Collaboration requests, messages, reviews, system alerts
- **3 Chat Threads**: Pre-populated conversations with message history

### Key Types
```typescript
UserRole = 'client' | 'influencer'
User { id, name, email, role, avatar, bio, company, city, niche, followers, rating, languages, socialLinks, audienceType, region }
Influencer { id, name, avatar, city, niche, followers, rating, bio, languages, audienceType, region, socialLinks, pastBrands, reviews }
ChatThread { id, participantName, participantAvatar, participantRole, lastMessage, lastTimestamp, unread, messages }
Notification { id, type, title, description, timestamp, read }
```

---

## 🔐 Authentication

Authentication is **fully mocked** (no real backend):

- **Login**: Creates a demo user profile based on the selected role
  - Client login → "Arjun Mehta" (TechStart India, Bangalore)
  - Influencer login → "Priya Kapoor" (Fashion creator, Mumbai, 520K followers)
- **Signup**: Creates a user with the provided name/email and selected role
- **Logout**: Clears user state, redirects to landing page
- **Route Protection**: `ProtectedRoute` component redirects unauthenticated users to `/`

**No API keys, tokens, or external auth services are required.**

---

## 🏃 Running the Project

### Prerequisites

- **Node.js** >= 18.x (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** >= 9.x (comes with Node.js)

### Installation & Development

```bash
# 1. Clone the repository
git clone <YOUR_GIT_URL>

# 2. Navigate to the project
cd <YOUR_PROJECT_NAME>

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port).

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

### Run Tests

```bash
npm run test
```

---

## 🔑 Environment & API Keys

### Current State: **No API keys required**

The application runs entirely on **client-side mock data**. There are:
- ❌ No `.env` file needed
- ❌ No external API calls
- ❌ No database connections
- ❌ No third-party service integrations

### External Services Used (No Keys Required)

| Service | Purpose | Key Required? |
|---|---|---|
| [UI Avatars](https://ui-avatars.com) | Auto-generated avatar images | ❌ No (free public API) |

### Future Integration (When Backend is Added)

When connecting to a real backend (e.g., Lovable Cloud / Supabase), the following would be needed:
- `SUPABASE_URL` — Database endpoint
- `SUPABASE_ANON_KEY` — Public anonymous key (safe to include in client code)
- Google OAuth credentials (for real Google sign-in)
- Facebook OAuth credentials (for real Facebook sign-in)
- SMTP credentials (for email notifications)

These would be stored as **Cloud secrets** (not in code) and accessed via edge functions.

---

## 🚀 Deployment

### Via Lovable
1. Open the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
2. Click **Share → Publish**

### Via Custom Domain
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS configuration instructions

### Manual Deployment
The `npm run build` output in the `dist/` folder can be deployed to any static hosting:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

---

## 📄 License

© 2026 InfluMatch. All rights reserved.
