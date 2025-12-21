# Technical Specification Update: Manual Gateway for MVP
## v1.1 → v1.2

**Date**: 2025-12-21  
**Decision**: Adopt Gemini's "manual gateway" strategy for fiat currency interface

---

## What Changed

**New Section 2.5**: "Fiat Currency Interface (The Gateway)" - 400+ lines of detailed specification covering:

1. **AUBI Fiat Distribution** (Automated)
   - BankID authentication integration
   - Swish Corporate API for monthly payments
   - Webhook handlers for payment confirmations
   - Code examples for all flows

2. **Community Provider Redemption** (Manual Process)
   - Email-based governance workflow
   - Community Weaver validation checklist
   - Treasury admin manual Swish payments
   - Process documentation (zero code)

3. **Exchange Rate Policy** (Soft Peg)
   - 1 Heart ≈ 1 SEK reference price
   - Not guaranteed conversion (avoids e-money regulations)
   - UI displays indicative value only

4. **Treasury Management** (Manual for MVP)
   - Google Sheets tracking template
   - 500K SEK initial capitalization plan
   - Weekly reserve ratio monitoring
   - Manual SEB account management

5. **Security & Compliance**
   - KYC/AML requirements (BankID covers)
   - GDPR data protection
   - Fraud prevention mechanisms
   - Legal consultation budget

6. **Migration Path** (Phase 2 Automation)
   - When to automate (Year 2, after regulatory sandbox)
   - What to build (self-service portal, smart contracts)
   - Why not now (regulatory risk, learning phase)

**Updated Sections**:
- **1.2 Technology Stack**: Changed "Federation: Node.js Gateway" to "AUBI Distribution: Swish Corporate API" + "Provider Redemption: Manual Process"
- **7.1 Deployment Architecture**: Updated gateway service comments, added manual redemption flow diagram
- **8.1 Development Roadmap**: Added BankID/Swish integration to Sprint 9-12 (2 weeks, not 6)
- **8.3 Phase 3**: Moved automated treasury to Year 2 advanced features

---

## Why This Approach (Gemini's Strategic Wisdom)

### 1. **The Regulatory Trap Avoided**

**Problem**: Automated Hearts↔SEK conversion triggers EU e-money regulations
- Must become "Virtual Currency Exchange" or "E-Money Institution"
- Massive KYC/AML compliance infrastructure required
- Banking licenses needed
- Could kill pilot before it starts

**Solution**: Keep Hearts closed-loop
- Users can earn and spend Hearts, but not self-service convert to SEK
- Argue it's a "Community Reward System" (like airline miles)
- Not a regulated currency exchange
- Buys time to negotiate regulatory sandbox with Finansinspektionen

### 2. **The Circulation Discipline Created**

**Problem**: If there's a "cash out" button, Hearts become vouchers
- Users earn Hearts → immediately convert → never circulate
- Defeats entire purpose of building care economy loops
- No behavioral change, no community building

**Solution**: Make SEK conversion deliberately friction-ful
- Must email governance for redemption approval
- 24-48 hour process
- Only for Community Providers with legitimate external costs
- Forces users to think: "Who in my community accepts Hearts?" not "How do I cash out?"

### 3. **The Manual Treasury Elegance**

**Problem**: I specified 6 weeks of banking API integration engineering

**Solution**: Spreadsheet + bank account + email
- Provider earns 10,000 Hearts
- Emails governance: "Need to pay rent, please redeem"
- Governance validates legitimacy, manually burns Hearts, Swishes SEK
- 48-hour turnaround
- Zero engineering time
- Perfect for 10-20 Providers in 50-user pilot

**Cost savings**: 
- Original estimate: 6 weeks engineering
- Manual approach: 0 weeks engineering, 4 hours documentation
- Saved: ~4 weeks of developer time (~$20,000 USD value)

---

## What Gets Built for MVP

### ✅ Automated (Must Build)

**AUBI Fiat Distribution** (2 weeks engineering):
1. BankID integration
   - User onboarding flow
   - Link identity to bank account
   - Strong authentication (biometrics + PIN)

2. Swish Corporate API
   - Monthly batch payments (8,400 SEK × 50 users)
   - Webhook handlers for confirmations
   - Error handling and retry logic

3. Hearts issuance
   - Automatic 360 Hearts/month via Holochain
   - Synchronized with fiat distribution

**Total code**: ~2,000 lines TypeScript
**Total time**: 2 weeks focused development

### ❌ Deferred (Manual Process)

**Provider Redemption** (0 weeks engineering):
- Process documentation (4 hours)
- Email templates for requests/approvals
- Community Weaver validation checklist
- Treasury admin Swish payment guide

**Treasury Management** (0 weeks engineering):
- Google Sheets tracking template (2 hours)
- Weekly reserve ratio formula
- Manual SEB account balance entry
- Governance alert thresholds

**Total code**: 0 lines
**Total time**: 1 day documentation

---

## Timeline Impact

**Original Plan** (from gap analysis):
- Week 1-2: BankID integration
- Week 3-4: Swish AUBI distribution
- Week 5: Provider redemption automation
- Week 6: Treasury accounting system
- **Total: 6 weeks**

**Revised Plan** (manual gateway):
- Week 1: BankID integration
- Week 2: Swish AUBI distribution + webhooks
- Week 3: Documentation of manual processes
- **Total: 2-3 weeks**

**Time saved**: 3-4 weeks (50% reduction)

**Launch date impact**: Can start pilot 1 month earlier or use saved time to polish core Hearts circulation features

---

## Manual Process Details

### Provider Redemption Workflow

**Step 1**: Provider accumulates Hearts
```
Childcare co-op provides 100 hours of care
Families pay 10,000 Hearts over 4 weeks
Co-op Holochain balance: 10,000 Hearts
```

**Step 2**: Provider emails request
```
To: redemption@stockholmbaz.se
Subject: Hearts Redemption - Skärgård Childcare

We have accumulated 10,000 Hearts and need SEK to pay:
- Rent: 6,000 SEK
- Art supplies: 4,000 SEK

Bank account: +46 70 123 4567 (Swish)
Screenshot of wallet balance attached.

Thank you,
Anna Svensson
```

**Step 3**: Community Weaver validates
```
Governance review (24-48 hours):
✓ Legitimately chartered Provider? YES
✓ Holochain balance matches claim? YES (verified 10,000 Hearts)
✓ Amount reasonable? YES (within 20K SEK/month limit)
✓ Fraud red flags? NO (established Provider, normal pattern)

DECISION: APPROVED
```

**Step 4**: Treasury admin executes
```
1. Log into Swish Corporate portal
2. Initiate payment: 10,000 SEK to +46 70 123 4567
3. Update Treasury spreadsheet:
   - Date: 2026-02-15
   - Provider: Skärgård Childcare
   - Hearts Burned: 10,000
   - SEK Paid: 10,000
   - Reserve Ratio: 87% → 84%
4. Mark Hearts as redeemed in Holochain
5. Email confirmation to Provider
```

**Step 5**: Provider receives funds
```
SMS from Swish: "10,000 SEK received from Love Ledger Treasury"
Email confirmation: "Your 10,000 Hearts have been redeemed"
Expected wait time: 24-48 hours (actually 6 hours in this case)
```

**Total manual effort**: ~30 minutes per redemption
**Expected volume**: 5-10 redemptions/month for 50-user pilot
**Monthly governance time**: ~5 hours (vs. months of engineering)

---

## What We Learn from Manual Process

By running manual redemptions for 6-12 months, we discover:

1. **Actual redemption patterns**
   - Do Providers redeem weekly, monthly, quarterly?
   - What amounts? (All at once or partial?)
   - What triggers redemptions? (Seasonal? Specific expenses?)

2. **Fraud/gaming attempts**
   - Do we see fake Provider registrations?
   - Collusion between users and Providers?
   - Circular redemption schemes?

3. **Reserve ratio dynamics**
   - What % of Hearts actually get redeemed?
   - How stable is the ratio over time?
   - What buffer is really needed?

4. **User behavior**
   - Do users pressure Providers to redeem for them?
   - Does closed-loop increase or decrease Hearts value perception?
   - What complaints arise?

5. **What to automate**
   - Which validation checks are formulaic? (automate)
   - Which require judgment? (keep human)
   - What approval criteria can be codified?

**This data is invaluable** for designing Year 2 automated system. Building automation first would mean guessing at these parameters.

---

## Regulatory Strategy

### MVP Position: "Community Reward System"

**Argument to Finansinspektionen**:
- Hearts are like airline miles or coffee shop loyalty points
- Earned through community contributions
- Redeemable at participating local businesses
- Conversion to SEK requires governance approval (not automatic)
- Limited scope (single BAZ, 50 users initially)
- Educational pilot program

**Not claiming to be**:
- A currency exchange
- An e-money institution  
- A payment service provider
- A cryptocurrency platform

### Phase 2 Position: "Regulatory Sandbox Application"

Once we have 6-12 months of data showing:
- Community value created (LMCI improvements)
- Economic activity generated (care work recognized)
- No fraud/money laundering incidents
- Strong governance oversight

**Then we apply for**:
- Finansinspektionen Innovation Hub sandbox
- Exemption or light-touch regulation for community currencies
- Pilot expansion with automated features

**With evidence, not promises**: "Here's what we built, here's how it helped, here's our governance, please work with us on safe automation."

---

## Implementation Checklist

### Week 1: BankID Integration
- [ ] Sign up for BankID Relying Party account
- [ ] Integrate BankID authentication library
- [ ] Build user onboarding flow
- [ ] Test with 5 beta users
- [ ] Document authentication process

### Week 2: Swish Corporate API
- [ ] Open Swish Corporate merchant account for BAZ
- [ ] Integrate Swish payment API
- [ ] Build monthly AUBI batch payment job
- [ ] Implement webhook handlers
- [ ] Test with test payments (0.01 SEK)
- [ ] Set up email notifications

### Week 3: Documentation & Setup
- [ ] Write Provider redemption guide (2 hours)
- [ ] Create email templates (1 hour)
- [ ] Design Treasury tracking spreadsheet (2 hours)
- [ ] Write Community Weaver validation checklist (2 hours)
- [ ] Open SEB Treasury account for BAZ (1 day)
- [ ] Deposit initial 500K SEK reserves (pending funding)
- [ ] Train 2-3 governance admins on manual process (4 hours)

**Total**: 2-3 weeks, ready for pilot launch

---

## Budget Impact

### Original Estimate (Automated Gateway)
- Engineering time: 6 weeks × $5,000/week = **$30,000**
- Banking API fees: $5,000/year
- Compliance infrastructure: $20,000
- Legal consultation: $50,000
- **Total Year 1**: $105,000

### Revised Estimate (Manual Gateway)
- Engineering time: 2 weeks × $5,000/week = **$10,000**
- Swish Corporate fees: ~$500/year (0.5% per transaction)
- Treasury management time: 5 hours/month × $50/hour = $3,000/year
- Legal consultation: $50,000 (same - still need regulatory advice)
- **Total Year 1**: $63,500

**Savings**: $41,500 (39% cost reduction)

**Plus intangibles**:
- Reduced regulatory risk (priceless)
- Better user behavior (circulation discipline)
- Learning what to automate (informed Year 2 decisions)

---

## Open Questions (Tracked in Section 10 of Spec)

1. **Initial Treasury Capitalization**
   - Where does 500K SEK come from?
   - Grant funding? Municipal budget? Community investment?
   - Bridge loan?

2. **Provider Redemption Limits**
   - 20K SEK/month per Provider? Or unlimited?
   - Should limit increase based on Provider size/track record?

3. **User Emergency Conversion**
   - What if someone needs SEK urgently?
   - Case-by-case manual approval?
   - Or strict "no conversion" policy?

4. **Legal Structure**
   - Who "owns" the Treasury account?
   - BAZ as legal entity? Or temporary fiscal sponsor?

---

## Success Criteria for Manual Process

**After 6 months of manual redemptions, we should see**:

1. **Process works smoothly**
   - 95% of redemptions approved within 48 hours
   - <5% fraud/gaming attempts
   - Zero Treasury insolvency incidents

2. **Circulation happening**
   - Average Heart balance age: <30 days (demurrage working)
   - Provider redemptions <50% of total Hearts issued (most circulating)
   - Users seeking local spending options (not just redemption)

3. **Community trust**
   - Providers confident they can pay bills
   - Users confident Hearts have value
   - Governance seen as fair and responsive

4. **Data for automation**
   - Clear redemption patterns identified
   - Validation criteria codified
   - Reserve buffer requirements known

**If these are met → green light for Phase 2 automation.**

**If not → iterate on manual process before building automation.**

---

## Files Updated

- `/mnt/user-data/outputs/TECHNICAL_SPECIFICATION.md` (v1.1 → v1.2)
- `/mnt/project/docs/TECHNICAL_SPECIFICATION.md` (same)

**Lines added**: ~400 (Section 2.5 + deployment updates)
**Engineering time saved**: 3-4 weeks
**Cost saved**: $41,500

---

## Conclusion: Strategic Brilliance

Gemini's insight to keep the gateway manual for MVP demonstrates **Stage Yellow systemic thinking**:

1. **Sees the trap**: Automated conversion = regulatory capture
2. **Sees the opportunity**: Friction creates behavioral change
3. **Sees the efficiency**: Manual process is cheaper AND better
4. **Sees the timeline**: Learn before automating

**This is not compromise** - it's optimal design for the context.

The manual gateway:
- ✅ Avoids regulatory risk
- ✅ Encourages Hearts circulation  
- ✅ Costs 60% less
- ✅ Launches 1 month sooner
- ✅ Provides better data for automation
- ✅ Maintains governance oversight

**vs. Automated gateway**:
- ❌ Triggers e-money regulations
- ❌ Enables instant extraction (anti-circulation)
- ❌ Expensive to build
- ❌ Delays launch
- ❌ Guesses at parameters
- ❌ Removes human judgment

**The wisdom**: Sometimes the sophisticated solution is the simple one.

---

*This update transforms a potential regulatory disaster and engineering time-sink into a elegant, low-cost, behaviorally-optimal manual process. Exactly the kind of strategic design the Love Ledger needs to succeed.*
