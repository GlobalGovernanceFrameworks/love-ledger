# Love Ledger 💚

Welcome to the Love Ledger project\!

## What is Love Ledger?

Love Ledger is a community-driven platform for recognizing, tracking, and rewarding care, ecological stewardship, and meaningful contributions to our communities. It serves as the technical foundation for the **Hearts** (💚) and **Leaves** (🍃) currency systems described in the [Global Governance Frameworks](https://globalgovernanceframeworks.org).

### Core Concepts

  - **Hearts** (💚): Recognition for care work, community support, cultural preservation, and social contributions.
  - **Leaves** (🍃): Recognition for ecological restoration, environmental stewardship, and planetary health activities.
  - **Love Ledger**: The distributed system that tracks and validates these contributions while protecting community autonomy.

## Framework Integration

This project implements key components from several interconnected frameworks:

  - **[Work in Liberation Framework](https://globalgovernanceframeworks.org/frameworks/work-in-liberation)** - Organizing meaningful work and Community Work Teams.
  - **[Financial Systems Framework](https://globalgovernanceframeworks.org/frameworks/financial-systems)** - Hearts/Leaves currency mechanics and the Love Ledger system.
  - **[AUBI Framework](https://globalgovernanceframeworks.org/frameworks/aubi)** - Adaptive Universal Basic Income integration with contribution bonuses.
  - **[Indigenous & Traditional Knowledge Governance](https://globalgovernanceframeworks.org/frameworks/indigenous-governance-and-traditional-knowledge)** - Bioregional Autonomous Zones (BAZs) and traditional stewardship principles.

## Project Status

✅ **MVP Foundation Built, Core Logic Next** ✅

The foundational infrastructure for the MVP web app is complete as of Sun Jul 27 2025. This includes a full authentication system, a database backend, internationalization, and adaptive theming.

The current focus is on implementing the core economic engine: the functionality for logging care acts and integrating the Hearts and Leaves calculation engine.

## The Web Application

This repository contains the official web application for the Love Ledger. It is a modern, full-stack application built to be accessible, secure, and culturally sensitive.

### Tech Stack

  * **Framework**: SvelteKit 2.x
  * **Language**: TypeScript
  * **Styling**: Tailwind CSS v4
  * **Database ORM**: Drizzle ORM with SQLite (local dev) and PostgreSQL (production)
  * **Authentication**: Lucia Auth v3 with Argon2 for password hashing
  * **Validation**: Zod for form and data validation
  * **Testing**: Vitest (Unit/Component) & Playwright (End-to-End)

### Key MVP Features (Roadmap)

The initial version of the web app will focus on three core user journeys:

1.  **📝 Log Care Acts**: A simple, accessible form for community members to submit their contributions for validation.
2.  **✅ Community Validation**: A secure interface for designated Community Weavers to review and validate submissions based on community-defined protocols.
3.  **📊 User Dashboard**: A personal dashboard for users to track their 💚 **Hearts** and 🍃 **Leaves** balances and view their contribution history.

### ✅ Current Implemented Features

  * **Authentication System**: Complete user registration, login, and session management with protected routes.
  * **Database & Backend**: SQLite database is set up with Drizzle ORM, including user schemas and a query abstraction layer.
  * **Internationalization (i18n)**: A custom, route-based i18n system supporting English and Swedish is operational.
  * **Adaptive Theming System**: Dual themes ('Living Earth' and 'Cosmic Night') with persistence and accessibility support are implemented.
  * **UI Foundation**: The responsive SvelteKit app includes a dashboard mockup with placeholder components for Hearts/Leaves balances and care act cards.

## 🚀 Getting Started (Local Development)

Interested in running the app locally or contributing? Follow these steps:

1.  **Prerequisites:**

      * Node.js (v18 or higher)
      * npm

2.  **Installation:**

    ```bash
    # Clone the repository
    git clone https://github.com/GlobalGovernanceFrameworks/love-ledger.git

    # Navigate to the project directory
    cd love-ledger

    # Install dependencies
    npm install
    ```

3.  **Environment Setup:**

    ```bash
    # Copy the example environment file
    cp .env.example .env
    ```

    *You'll need to fill in the variables in the `.env` file as instructed within it.*

4.  **Run the Development Server:**

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:5173`.

## Getting Involved

### For Communities

  - Review the [Work in Liberation Framework](https://globalgovernanceframeworks.org/frameworks/work-in-liberation) to understand Community Work Teams.
  - Explore the [Indigenous Sovereignty Starter Kit](https://globalgovernanceframeworks.org/frameworks/tools/indigenous-governance-and-traditional-knowledge/indigenous-sovereignty-starter-kit-en.zip) for BAZ formation.
  - Connect with us if you are interested in becoming a pilot community.

### For Developers

  - Check out our tech stack above and review the code.
  - Read our `CONTRIBUTING.md` file to understand our workflow and code standards.
  - Find an issue to work on\! We have issues tagged `good first issue` that are perfect for new contributors.

### For Researchers

  - Access comprehensive documentation at [globalgovernanceframeworks.org](https://globalgovernanceframeworks.org).
  - Review the technical implementation in this repository and provide feedback.
  - Contribute to ongoing research and validation efforts for the pilot programs.

## Community Guidelines

Love Ledger operates under the principles of **Right Relationship** - recognizing the interconnected web of human, non-human, and planetary flourishing. All participation should:

  - Honor Indigenous sovereignty and traditional knowledge.
  - Support community self-determination.
  - Protect ecological integrity.
  - Foster mutual care and reciprocity.
  - Resist extractive or exploitative practices.

## Contact & Resources

  - **Website**: [globalgovernanceframeworks.org](https://globalgovernanceframeworks.org)
  - **Email**: globalgovernanceframeworks@gmail.com

## License

This project operates under principles of community ownership and Indigenous data sovereignty. Specific licensing details will be developed in collaboration with participating communities and Indigenous governance protocols.
