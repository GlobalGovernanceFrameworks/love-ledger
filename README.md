# Love Ledger 💚

**A Bioregional Economic Operating System for Right Relationship**

Love Ledger is the technical foundation for a dual-system platform that both recognizes non-monetized community contributions (Love Ledger) and enables a regenerative care economy (Hearts currency). It implements key components of the [Global Governance Frameworks](https://globalgovernanceframeworks.org) with absolute data sovereignty for Bioregional Autonomous Zones (BAZs).

---

## 🌍 What is Love Ledger?

Love Ledger is not a "platform" you join—it's a **protocol** you run. Each community operates its own autonomous instance, choosing whether and how to federate with others.

### The Dual System

**1. Love Ledger (Non-Monetized Recognition)**
- Tracks informal contributions: spontaneous caregiving, mentoring, cultural preservation
- Uses **Gratitude Tokens** for social recognition (not currency)
- Feeds the **Love, Meaning, and Connection Index (LMCI)** - a wellbeing metric replacing GDP
- Explicitly kept separate from the Hearts economy to prevent commodification of relationships

**2. Hearts Economy (Monetized Care)**
- **Hearts** (💚): Currency earned by chartered **Community Providers** for care, cultural, and social work
- Community members spend their AUBI (Adaptive Universal Basic Income) Hearts at providers
- Providers redeem accumulated Hearts for fiat at the **Hearts Treasury**
- Features 0.5% monthly demurrage to encourage circulation, not hoarding

**3. Leaves (Ecological NFTs)**
- **Leaves** (🍃): Non-fungible tokens for verified ecological restoration
- Each Leaf contains metadata: GPS, photos, sensor data, monitoring commitments
- Represents specific restoration acts (wetland restoration, reforestation, soil regeneration)
- Access tokens for resources, not tradeable commodities

### Core Principles

This system addresses **root causes of systemic fragility** identified in regenerative economic theory:

1. **Liquidity Design** (vs. Centralized Scarcity)
   - AUBI baseline ensures material security for all
   - Demurrage prevents hoarding and ensures circulation
   - Transparent issuance rules prevent arbitrary constraints

2. **Intrinsic Value Recognition** (vs. Extrinsic Measurement) 
   - Love Ledger validates contributions beyond market metrics
   - Multiple value pathways, not single productivity scores
   - All care work recognized as equally valuable

3. **Distributed Authority** (vs. Centralized Control)
   - Governance via BAZ sovereignty
   - Web of Trust identity (no central ID database)
   - Community Weavers validate, not centralized authorities

---

## 🏗️ Architecture Overview

### Technology Stack

**MVP Foundation (Year 1)**
- **Frontend**: SvelteKit 2.x + TypeScript
- **Backend Cache**: PostgreSQL 16 + Redis 7
- **Blockchain**: Holochain 0.3.x (agent-centric, offline-first)
- **Smart Contracts**: Rust (Holochain DNAs)
- **Auth**: Lucia v3 with Web of Trust integration

**Migration Path**
- **Phase 1 (MVP)**: PostgreSQL primary, Holochain audit log
- **Phase 2 (Year 2)**: Holochain primary, PostgreSQL cache
- **Phase 3 (Year 3)**: Full federation, each BAZ autonomous

### Four Holochain Zomes

1. **hearts_zome**: Currency logic, AUBI issuance, demurrage calculation
2. **work_zome**: Proof of Care validation, LMCI calculation, Gratitude Tokens
3. **identity_zome**: Web of Trust, Community Weaver certification, vouching
4. **leaves_zome**: Ecological NFT minting, Green Job Score, monitoring logs

### Strategic Positioning vs. CBDCs

With the Digital Euro launching 2027-2029, Hearts occupies the **sanctuary currency** niche:

**Hearts' Key Advantages**:
- **True offline capability**: Local mesh network IS the ledger (not delayed sync to central authority)
- **No holding limits**: Demurrage handles circulation naturally (vs. Digital Euro's €3,000 cap protecting banks)
- **Privacy by architecture**: 5 visibility layers built into code (vs. policy-based promises)
- **Community governance**: BAZ councils set rules (vs. ECB bureaucrats)
- **Complementary, not competitive**: Use Digital Euro for taxes/global trade, Hearts for care economy

**Timeline Pressure**: Hearts must be operational in Stockholm by 2027 to be the **incumbent alternative** when Digital Euro launches, not the challenger.

**See**: [Section 1.3 of Technical Specification](docs/TECHNICAL_SPECIFICATION.md#13-strategic-positioning-hearts-vs-cbdcs) for detailed comparison.

---

## 📋 Project Status

**Status**: Technical specification complete, implementation starting January 2026

**AI Council Consensus** (December 2025)
- Architecture designed by Claude, Gemini, Grok, and DeepSeek
- Synthesizes biomimetic flow (DeepSeek), mathematical rigor (Grok), strategic architecture (Gemini), and safety focus (Claude)
- Ready for developer handoff

**Current Phase**: Foundation setup
- [x] Framework documents reviewed (AUBI, Financial Systems, Work in Liberation)
- [x] AI Council consensus architecture
- [x] Technical specification written
- [ ] Holochain zomes implementation
- [ ] SvelteKit integration with Holochain
- [ ] Community Weaver training materials
- [ ] Stockholm Archipelago pilot preparation

---

## 🚀 Getting Started

### For Developers

**Prerequisites**
- Node.js 18+
- Rust (latest stable)
- Holochain Launcher 0.3.x
- PostgreSQL 16
- Docker & Docker Compose (recommended)

**Quick Start**

```bash
# Clone repository
git clone https://github.com/GlobalGovernanceFrameworks/love-ledger.git
cd love-ledger

# Install dependencies
npm install

# Start development environment
docker-compose up -d

# Run migrations
npm run db:migrate

# Start dev server
npm run dev
```

The application will be available at `http://localhost:5173`.

**Development Workflow**

1. **Holochain Zomes**: Code in `holochain/dnas/*/zomes/*/src/lib.rs`
2. **Web Frontend**: Code in `packages/web/src/`
3. **API Routes**: Code in `packages/web/src/routes/api/`
4. **Tests**: Run `npm test` for unit tests, `npm run test:e2e` for integration

**Key Documentation**
- [Technical Specification](docs/TECHNICAL_SPECIFICATION.md) - Complete implementation guide
- [Holochain Setup](docs/holochain-setup.md) - Setting up the conductor
- [API Reference](docs/api-reference.md) - REST endpoints
- [Database Schema](docs/schema.md) - PostgreSQL tables and relationships

### For Communities

**Becoming a Pilot BAZ**

We're seeking communities for pilot implementations. Ideal candidates:
- Population: 1,000-10,000 people
- Strong community ties or Indigenous governance
- Active ecological restoration projects
- Tech readiness: 60%+ smartphone penetration
- Institutional support (municipality, university, or NGO partnership)

**Review these frameworks first**:
- [Work in Liberation Framework](https://globalgovernanceframeworks.org/frameworks/work-in-liberation) - Community Work Teams and Work With Purpose
- [AUBI Framework](https://globalgovernanceframeworks.org/frameworks/aubi) - Four-layered payout architecture
- [Indigenous Sovereignty Starter Kit](https://globalgovernanceframeworks.org/frameworks/tools/indigenous-governance-and-traditional-knowledge/indigenous-sovereignty-starter-kit-en.zip) - BAZ formation guide

**Contact**: globalgovernanceframeworks@gmail.com

### For Researchers

**Contributing to Design**
- Review [framework documents](https://globalgovernanceframeworks.org)
- Analyze the technical specification for theoretical soundness
- Participate in validation studies once pilot launches
- Contribute to LMCI metric refinement

**Research Questions**
1. How does demurrage affect circulation velocity across different cultural contexts?
2. What validation threshold prevents gaming while maintaining accessibility?
3. How do communities adapt LMCI weighting to reflect local values?
4. What are the long-term effects of separating Love Ledger from Hearts economy?

---

## 🎯 Roadmap

### Phase 1: Core Loop (Months 1-6, Q1-Q2 2026)

**Sprint 1-4: Foundation**
- Set up Holochain conductor and PostgreSQL
- Implement hearts_zome, work_zome, identity_zome
- Build basic SvelteKit structure
- Create Love Ledger Native ID system

**Sprint 5-8: Love Ledger Core**  
- Contribution submission form with IPFS uploads
- Community Weaver validation dashboard
- Multi-tier validation logic
- Gratitude Token implementation

**Sprint 9-12: Hearts Display**
- AUBI daily drip backend
- Demurrage calculation engine
- Hearts balance UI with monthly projections
- Basic LMCI dashboard

### Phase 2: Polish & Pilot (Months 7-12, Q3-Q4 2026)

**Sprint 13-16: UX Refinement**
- Multi-language support (English, Swedish, +2)
- Mobile-responsive design
- Accessibility audit (WCAG 2.1 AA)
- Email/SMS notifications

**Sprint 17-20: Stockholm Archipelago Pilot**
- Deploy to pilot BAZ
- Onboard Community Weavers (training + certification)
- Invite-only launch (50 users)
- Monitor, iterate, scale to 1,000 users

**Sprint 21-24: Full BAZ Launch**
- Open registration within BAZ
- Automated monitoring and burnout prevention
- Data collection for LMCI validation studies

### Phase 3: Advanced Features (Year 2, 2027)

- Hearts spending at Community Providers
- Hearts Treasury fiat redemption (bank API integration)
- Simplified Leaves NFT minting
- IoT integration for objective validation
- Second BAZ pilot (Nunavut or Global South)
- Cross-BAZ federation (experimental)

---

## 🔍 Key Concepts

### AUBI (Adaptive Universal Basic Income)

Four-layered payout structure:
- **Layer 0**: Relational wealth (unmonetized, honored via Love Ledger)
- **Layer 1**: Universal baseline (70% fiat, 30% Hearts monthly)
- **Layer 2**: Contribution bonuses in Hearts (validated care/culture work)
- **Layer 3**: Equity & needs-based supplements (reparations, disability support)

### Community Weavers

The most critical role in the system:
- Validate contributions on Love Ledger
- Certify new Community Providers
- Vouch for new members (Web of Trust)
- Compensated via Layer 2 AUBI bonuses
- **Burnout prevention is a system design priority**

### LMCI (Love, Meaning, and Connection Index)

Wellbeing metric with three pillars:
- **Love (33%)**: Care hours, mentorship, social cohesion
- **Meaning (33%)**: Cultural preservation, knowledge sharing
- **Connection (34%)**: Ecological stewardship, human-land relationships

Replaces GDP as the measure of community flourishing.

### Web of Trust

Decentralized identity without central databases:
- New members require 3 Community Weaver vouches
- Weavers stake reputation when vouching (skin in the game)
- Prevents Sybil attacks while enabling undocumented participation
- Portable across BAZs via cryptographic attestation

---

## 🤝 Contributing

We welcome contributions from developers, designers, researchers, and community organizers.

**Development**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your fork (`git push origin feature/amazing-feature`)
6. Open a Pull Request

**Coding Standards**
- Rust: Follow [Holochain style guide](https://developer.holochain.org/style-guide/)
- TypeScript: ESLint + Prettier (config included)
- Tests: Required for all new features
- Accessibility: WCAG 2.1 AA minimum

**Community Guidelines**

All participation should embody **Right Relationship**:
- Honor Indigenous sovereignty and traditional knowledge
- Support community self-determination
- Protect ecological integrity
- Foster mutual care and reciprocity
- Resist extractive or exploitative practices

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

---

## 📚 Framework Integration

This project implements components from multiple interconnected frameworks:

| Framework | Implementation |
|-----------|----------------|
| [AUBI Framework v7.0](docs/frameworks/35-gemini-revision.md) | Four-layer payout architecture, Hearts/Leaves currencies, Hearts Treasury |
| [Financial Systems v3.1](docs/frameworks/33-gemini-revision.md) | Demurrage mechanics, Inter-Currency Translation Layer, reserve ratios |
| [Work in Liberation v3.0](docs/frameworks/30-grok-revision.md) | Community Work Teams as Providers, Proof of Care validation |
| [Nested Economies v3.0](docs/frameworks/22-grok-revision.md) | BAZ sovereignty, federated architecture, local customization |
| [Indigenous Governance](https://globalgovernanceframeworks.org/frameworks/indigenous-governance) | FPIC 2.0, Red Lines Clause, traditional knowledge protocols |

---

## 🔒 Security & Privacy

**Data Sovereignty**
- Each BAZ controls its own Holochain instance
- No central database of user data
- Can disconnect from federation anytime
- Can export all data in standard format

**Privacy Layers**
1. **Public**: LMCI scores, contribution counts
2. **Community**: Category breakdowns, recent activity
3. **Contributors**: Full details for co-participants
4. **Self**: Hearts balance, validation status
5. **Governance**: Weaver tools, fraud detection

**Security Measures**
- End-to-end encryption for sensitive data
- Post-quantum cryptography ready
- Regular security audits
- Sybil attack prevention via Web of Trust
- No single point of failure (federated architecture)

---

## 📊 Success Metrics

**Technical Health**
- 99.5% uptime (Holochain + web app)
- <1 hour sync lag (Holochain → PostgreSQL)
- <200ms API latency (p95)
- 100% data integrity (consistency checks)

**User Engagement**  
- 70% users log ≥1 contribution/month
- 90% validations completed within 7 days
- 60% weekly active users
- 80% Hearts spent within 30 days

**Community Health**
- +15% LMCI growth year 1
- <10% Community Weavers at high burnout risk
- <1% Sybil attacks detected
- 80%+ user satisfaction
- 0 privacy breaches

---

## 📞 Contact & Resources

- **Website**: [globalgovernanceframeworks.org](https://globalgovernanceframeworks.org)
- **Email**: globalgovernanceframeworks@gmail.com
- **Technical Docs**: [TECHNICAL_SPECIFICATION.md](docs/TECHNICAL_SPECIFICATION.md)
- **AI Council Consensus**: See [docs/ai-council/](docs/ai-council/)

---

## 📄 License & Sovereignty

**Current License: AGPLv3 (Transitional)**

To ensure this codebase remains a global commons and is not enclosed or extracted by private interests, the Love Ledger is currently licensed under the **GNU Affero General Public License v3 (AGPLv3)**.

**What this means for now:**
* ✅ **You have the absolute right** to fork, run, and modify this software for your community (BAZ).
* ✅ **You are protected** from liability (software is provided "as is").
* 🛑 **Reciprocity is required:** If you modify this code and run it as a service, you **must** share your improvements back to the commons. Closing the source code is prohibited.

**Future Licensing Roadmap:**
This project operates under principles of **Indigenous Data Sovereignty**. As we launch pilot communities, we will evolve this license into a custom **"Treaty-Based License"** that explicitly codifies:
1.  FPIC 2.0 (Free, Prior, and Informed Consent) for data usage.
2.  The rights of Bioregional Autonomous Zones to self-determination.
3.  Protocols preventing the weaponization of this technology.

*Until that Treaty is ratified by the initial pilot communities, the AGPLv3 serves as our legal shield against co-option.*

---

## 🙏 Acknowledgments

**AI Council Contributors**
- Claude (Anthropic) - Safety focus, failure mode analysis, technical writing
- Gemini (Google) - Strategic architecture, biomimetic optimization
- Grok (xAI) - Mathematical rigor, Holochain expertise
- DeepSeek - Continuous flow mechanics, daily drip design

**Framework Architects**
- Björn Kenneth Holmström - Global Governance Frameworks
- Indigenous knowledge keepers and elders (acknowledged with respect for protocols)
- Community organizers and activists who informed the design

**Inspirations**
- Bernard Lietaer (complementary currencies)
- Elinor Ostrom (commons governance)  
- Kate Raworth (doughnut economics)
- Indigenous gift economies worldwide
- The protocol is theirs; any flaws are ours.

---

*"This is not technology for control. This is technology for liberation."*
