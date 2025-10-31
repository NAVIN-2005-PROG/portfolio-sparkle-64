# PortfolioBuilder - Professional Digital Portfolio Creator

A modern, responsive web application for creating beautiful digital portfolios and resumes. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Key Features

- **Beautiful Landing Page** with animated particle effects
- **User Authentication** system ready for integration
- **Interactive Dashboard** with portfolio analytics
- **Template Library** with customizable designs
- **Collapsible Sidebar Navigation** for seamless browsing
- **Fully Responsive Design** optimized for all devices
- **Professional UI Components** powered by shadcn/ui

## 📦 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with semantic design tokens
- **Routing**: React Router v6
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React
- **Animations**: Particles.js for engaging effects
- **Build Tool**: Vite for fast development

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui component library
│   ├── AppSidebar.tsx  # Main navigation sidebar
│   ├── DashboardLayout.tsx
│   ├── Navigation.tsx
│   ├── HeroSection.tsx
│   └── ...
├── pages/              # Application pages
│   ├── Landing.tsx     # Public landing page
│   ├── Auth.tsx        # Authentication page
│   ├── Dashboard.tsx   # User dashboard
│   ├── Portfolios.tsx  # Portfolio management
│   ├── Templates.tsx   # Template library
│   ├── History.tsx     # Edit history
│   ├── Profile.tsx     # User profile
│   └── Settings.tsx    # App settings
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── App.tsx             # Root component with routing
├── main.tsx            # Application entry point
└── index.css           # Global styles & design tokens
```

## 🎨 Design System

Professional blue and white color scheme using HSL semantic tokens:
- **Primary**: Brand blue colors
- **Secondary**: Supporting UI colors
- **Accent**: Highlight and interactive elements
- **Muted**: Subtle backgrounds and borders
- **Destructive**: Error and warning states

All components use the design system tokens from `src/index.css` - no hardcoded colors.

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## 📱 Application Routes

- `/` - Landing page with features and templates
- `/auth` - Sign in / Sign up page
- `/dashboard` - Main user dashboard with stats
- `/portfolios` - Portfolio management interface
- `/templates` - Browse available templates
- `/history` - View editing history
- `/profile` - User profile management
- `/settings` - Application settings

## 🧩 Core Components

### AppSidebar
Collapsible navigation sidebar with:
- Active route highlighting
- User profile section
- AI Assistant (coming soon)
- Smooth collapse/expand animations

### DashboardLayout
Wrapper for authenticated pages providing:
- Sidebar integration
- Sticky header with toggle
- Consistent page structure

### Landing Sections
- **Navigation**: Header with CTA buttons
- **HeroSection**: Animated hero with particles
- **FeaturesSection**: Key features showcase
- **ComparisonSection**: Traditional vs digital
- **TemplatesSection**: Template previews

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint checks

## 🌐 Deployment

### Deploy with Lovable
1. Open your [Lovable Project](https://lovable.dev/projects/bdb95ebf-e559-49a2-ab98-69b3d6452f98)
2. Click Share → Publish
3. Your app will be live instantly

### Connect Custom Domain
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the [custom domain setup guide](https://docs.lovable.dev/features/custom-domain#custom-domain)

## 💻 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Functional components with hooks
- Small, focused components
- JSDoc comments for complex logic
- Semantic HTML elements
- Design system tokens (no hardcoded colors)

### Component Pattern
```typescript
/**
 * Component description
 */
import { Component } from "react";

interface Props {
  // Type definitions
}

const MyComponent = ({ prop }: Props) => {
  // Logic here
  return (
    // JSX here
  );
};

export default MyComponent;
```

## 🔧 How to Edit This Code

**Use Lovable (Recommended)**
- Visit the [Lovable Project](https://lovable.dev/projects/bdb95ebf-e559-49a2-ab98-69b3d6452f98)
- Changes are auto-committed to this repo

**Use Your IDE**
- Clone the repo and work locally
- Push changes to sync with Lovable
- Requires Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

**Edit in GitHub**
- Click the "Edit" button (pencil icon) on any file
- Make changes and commit directly

**Use GitHub Codespaces**
- Click "Code" → "Codespaces" → "New codespace"
- Edit in a full VS Code environment

## 🎯 Roadmap

- [ ] Backend integration with authentication
- [ ] Database integration for portfolios
- [ ] AI-powered content suggestions
- [ ] Drag-and-drop portfolio editor
- [ ] PDF export functionality
- [ ] Analytics dashboard
- [ ] Collaboration features
- [ ] Multi-language support

## 📄 License

© 2024 PortfolioBuilder. All rights reserved.

---

Built with ❤️ using React, TypeScript, and Lovable
