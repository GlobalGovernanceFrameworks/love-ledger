# Love Ledger & Hearts Protocol MVP
## Technical Specification v1.0

**Status**: Draft for Implementation  
**Last Updated**: 2025-12-21  
**Authors**: AI Council Consensus (Claude, Gemini, Grok, DeepSeek)  
**Target Pilot**: Stockholm Archipelago BAZ (Regionens Nervsystem)

---

## 0. Executive Summary

This specification defines the Minimum Viable Product (MVP) for the Love Ledger, a dual-system platform for recognizing both monetized care work (Hearts economy) and non-monetized community contributions (Love Ledger). 

**Core Innovation**: A bioregional economic operating system designed for **systemic resilience and regenerative flow** through:
- Continuous circulation (demurrage-based Hearts currency)
- Community-rooted identity (Web of Trust, no central ID database)
- Distributed validation (Community Weaver network)
- Absolute data sovereignty (BAZ-controlled Holochain instances)

**Design Philosophy**: This is not a "platform" that communities join—it's a **protocol** that communities run. Each Bioregional Autonomous Zone (BAZ) operates its own instance, choosing whether and how to federate with others.

---

## 1. System Architecture

### 1.1 High-Level Architecture Diagram

```mermaid
graph TB
    subgraph "User Layer"
        U[User Device<br/>Web/Mobile]
        W[Community Weaver<br/>Validation Interface]
    end
    
    subgraph "BAZ Instance (Stockholm)"
        subgraph "Frontend"
            SV[SvelteKit App<br/>Port 5173]
        end
        
        subgraph "Backend Services"
            PG[(PostgreSQL<br/>Local Cache)]
            RD[(Redis<br/>Session/Queue)]
        end
        
        subgraph "Holochain Layer"
            HC[Holochain Conductor<br/>Port 8888]
            
            subgraph "DNAs (Zomes)"
                HZ[hearts_zome<br/>Currency Logic]
                WZ[work_zome<br/>Proof of Care]
                IZ[identity_zome<br/>Web of Trust]
                LZ[leaves_zome<br/>Ecological NFTs]
            end
        end
        
        subgraph "Federation Gateway"
            GW[Gateway Node<br/>SQL/Banking API]
            TRS[Hearts Treasury<br/>Fiat Reserves]
        end
    end
    
    subgraph "External Systems"
        BANK[Banking API<br/>SEB/Swish]
        IOT[Municipal APIs<br/>IoT Sensors]
        OTHER[Other BAZ Instances<br/>Federation Protocol]
    end
    
    U --> SV
    W --> SV
    SV --> PG
    SV --> RD
    SV --> HC
    
    HC --> HZ
    HC --> WZ
    HC --> IZ
    HC --> LZ
    
    GW --> TRS
    GW --> BANK
    HC -.->|Read-only Sync| PG
    HC <-.->|Inter-BAZ Bridge| OTHER
    HC --> GW
    SV --> IOT
    
    style HC fill:#e1f5dd
    style GW fill:#fff4e6
    style TRS fill:#ffe6e6
```

### 1.2 Technology Stack

**Decision: Hybrid Architecture** (Gemini's recommendation)

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | SvelteKit 2.x | Existing codebase, excellent UX, SSR for accessibility |
| **Backend Cache** | PostgreSQL 16 | Query performance, municipal API integration |
| **Session/Queue** | Redis 7 | Fast session management, async job processing |
| **Blockchain Core** | Holochain 0.3.x | Agent-centric, offline-first, data sovereignty |
| **Smart Contracts** | Rust (Holochain DNAs) | Memory safety, performance, WebAssembly target |
| **Federation** | Node.js Gateway | Traditional banking API bridge |
| **Auth** | Lucia v3 | Current implementation, DID integration path |

**Migration Path**:
- **Phase 1 (MVP)**: PostgreSQL primary, Holochain read-only audit log (daily sync)
- **Phase 2 (Year 2)**: Holochain primary, PostgreSQL becomes cache
- **Phase 3 (Year 3)**: Full federation, each BAZ runs autonomous instance

---

## 2. Core Economic Mechanics

### 2.1 Hearts Issuance (The Heartbeat)

**Design Decision**: Daily backend drip with monthly frontend display (DeepSeek's flow + Claude's UX)

#### 2.1.1 Mathematical Model

```rust
// Constants (configurable per BAZ)
const MONTHLY_BASELINE_HEARTS: f64 = 360.0; // 30% of $1200 AUBI
const DAILY_DRIP_RATE: f64 = MONTHLY_BASELINE_HEARTS / 30.0; // 12.0 Hearts/day
const PRORATED_FIRST_MONTH: bool = true;

// Daily issuance function
fn calculate_daily_issuance(user: &User, current_date: Date) -> f64 {
    if user.enrolled_this_month(current_date) && PRORATED_FIRST_MONTH {
        let days_remaining = current_date.days_until_month_end();
        return DAILY_DRIP_RATE * (days_remaining as f64 / 30.0);
    }
    DAILY_DRIP_RATE
}

// Batch issuance (runs daily at 00:00 UTC)
async fn daily_heartbeat() {
    let users = get_active_users().await;
    for user in users {
        let amount = calculate_daily_issuance(&user, today());
        mint_hearts(&user, amount).await;
        log_transaction(TransactionType::AUBIAllocation, user.id, amount).await;
    }
}
```

#### 2.1.2 Frontend Display

```typescript
// Display logic - show monthly projection
interface HeartsBalance {
  current: number;              // 156.5
  daily_rate: number;           // 12.0
  monthly_projection: number;   // 360.0
  days_elapsed: number;         // 13
  next_deposit: Date;           // Tomorrow 00:00 UTC
}

// User sees: "You receive ~12 ♥ daily (≈360 ♥/month)"
```

**Rationale**:
- Backend: Continuous flow prevents month-end panic, mimics biological metabolism
- Frontend: Monthly framing aligns with rent/bills cycle, reduces cognitive load
- Compromise: Best of both approaches

### 2.2 Hearts Demurrage (Circulation Pressure)

**Design Decision**: Continuous exponential decay (Grok's mathematical model)

#### 2.2.1 Decay Formula

```rust
// Demurrage configuration
const MONTHLY_DECAY_RATE: f64 = 0.005; // 0.5% per month
const DAILY_DECAY_RATE: f64 = MONTHLY_DECAY_RATE / 30.0; // ~0.0167% per day

// Continuous decay formula
// balance(t) = balance(t0) * e^(-λ * Δt)
// where λ = decay_rate, Δt = days_elapsed

fn apply_demurrage(balance: f64, days_elapsed: f64) -> f64 {
    balance * (-DAILY_DECAY_RATE * days_elapsed).exp()
}

// Example:
// 1000 Hearts held for 30 days:
// 1000 * e^(-0.0167% * 30) = 1000 * e^(-0.005) ≈ 995.0 Hearts
// Effective 0.5% monthly decay

// Transaction-based calculation
#[derive(Debug)]
struct HeartsBalance {
    base_amount: f64,
    last_updated: DateTime<Utc>,
}

impl HeartsBalance {
    fn current_value(&self) -> f64 {
        let days_elapsed = (Utc::now() - self.last_updated).num_days() as f64;
        apply_demurrage(self.base_amount, days_elapsed)
    }
    
    fn settle(&mut self) -> f64 {
        let current = self.current_value();
        self.base_amount = current;
        self.last_updated = Utc::now();
        current
    }
}
```

#### 2.2.2 Demurrage Destination

**Decision**: Burn decayed Hearts (maintain monetary integrity)

```rust
async fn calculate_demurrage_burn(user_id: Uuid) -> f64 {
    let balance = get_hearts_balance(user_id).await;
    let current_value = balance.current_value();
    let burn_amount = balance.base_amount - current_value;
    
    if burn_amount > 0.01 {
        burn_hearts(user_id, burn_amount).await;
        log_transaction(TransactionType::Demurrage, user_id, -burn_amount).await;
    }
    
    burn_amount
}
```

**Rationale**:
- Burning prevents accumulation by non-circulating entities (ensures liquidity)
- Creates gentle deflationary pressure to offset Layer 2 bonus inflation
- No "tax day" gaming—decay happens continuously based on holding duration

**UX Considerations**:
```typescript
// Dashboard displays decay as "freshness"
interface DemurrageDisplay {
  message: "Your Hearts stay fresh by circulating! 🌊";
  current_balance: 850.5;
  decay_rate: "~0.5%/month when held";
  visual: "animated 'flow' indicator showing movement";
}
```

### 2.3 Hearts Treasury Reserve Ratio

**Decision**: Dynamic fractional reserve (Claude's risk management + Gemini's PID controller concept)

#### 2.3.1 Initial Parameters

```rust
const INITIAL_RESERVE_RATIO: f64 = 1.0; // 100% fiat backing (trust-building phase)
const TARGET_RESERVE_RATIO: f64 = 0.5;  // 50% long-term target
const MINIMUM_RESERVE_RATIO: f64 = 0.3; // 30% circuit breaker threshold

const RESERVE_ADJUSTMENT_RATE: f64 = 0.05; // Adjust by 5% quarterly
```

#### 2.3.2 Reserve Monitoring

```rust
#[derive(Debug)]
struct TreasuryMetrics {
    fiat_reserves: f64,           // e.g., 1,800,000 SEK
    hearts_in_circulation: f64,   // e.g., 3,600,000 Hearts
    current_reserve_ratio: f64,   // 0.5 (50%)
    redemption_rate_30d: f64,     // Average daily redemptions
}

async fn check_reserve_health() -> TreasuryStatus {
    let metrics = calculate_treasury_metrics().await;
    
    if metrics.current_reserve_ratio < MINIMUM_RESERVE_RATIO {
        TreasuryStatus::Emergency // Trigger Social Resilience Council review
    } else if metrics.current_reserve_ratio < TARGET_RESERVE_RATIO * 0.9 {
        TreasuryStatus::Warning // Alert but continue operations
    } else {
        TreasuryStatus::Healthy
    }
}

// Quarterly adjustment
async fn adjust_reserve_ratio() {
    let metrics = calculate_treasury_metrics().await;
    let redemption_volatility = calculate_redemption_volatility_30d().await;
    
    if metrics.current_reserve_ratio > TARGET_RESERVE_RATIO * 1.2 
        && redemption_volatility < 0.1 {
        // Excess reserves + stable redemptions = safe to increase Hearts allocation
        increase_aubi_hearts_percentage(RESERVE_ADJUSTMENT_RATE).await;
    }
}
```

### 2.4 Layer 2 Bonuses (Contribution Rewards)

**Decision**: Fresh minting with governance cap (Claude's balance)

```rust
const MONTHLY_BONUS_CAP_MULTIPLIER: f64 = 0.5; // 50% of baseline issuance

async fn calculate_monthly_bonus_cap(baz_id: Uuid) -> f64 {
    let baseline_monthly_issuance = calculate_baseline_issuance(baz_id).await;
    baseline_monthly_issuance * MONTHLY_BONUS_CAP_MULTIPLIER
}

async fn issue_layer2_bonus(
    provider_id: Uuid, 
    contribution_id: Uuid,
    base_value: f64
) -> Result<f64, BonusError> {
    
    let current_month_issued = get_monthly_bonus_total().await;
    let cap = calculate_monthly_bonus_cap(get_baz_id()).await;
    
    if current_month_issued + base_value > cap {
        // Queue for next month instead of rejecting
        queue_bonus_for_next_month(provider_id, contribution_id, base_value).await;
        return Err(BonusError::CapReached);
    }
    
    // Mint fresh Hearts
    mint_hearts(provider_id, base_value).await;
    log_transaction(TransactionType::Layer2Bonus, provider_id, base_value).await;
    
    Ok(base_value)
}
```

---

## 3. Holochain Zome Specifications

### 3.1 hearts_zome (Currency Logic)

```rust
// File: zomes/hearts/src/lib.rs

use hdk::prelude::*;

// ========== ENTRY TYPES ==========

#[hdk_entry_helper]
#[derive(Clone)]
pub struct HeartsAccount {
    pub agent: AgentPubKey,
    pub base_balance: f64,
    pub last_updated: Timestamp,
    pub creation_date: Timestamp,
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct HeartsTransaction {
    pub tx_type: TransactionType,
    pub from_agent: Option<AgentPubKey>,
    pub to_agent: Option<AgentPubKey>,
    pub amount: f64,
    pub timestamp: Timestamp,
    pub contribution_ref: Option<EntryHash>, // Link to work_zome entry
    pub description: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum TransactionType {
    AUBIAllocation,
    Spending,
    Layer2Bonus,
    Redemption,
    Demurrage,
}

// ========== ZOME FUNCTIONS ==========

#[hdk_extern]
pub fn init(_: ()) -> ExternResult<InitCallbackResult> {
    // Create initial account for agent on first call
    let agent = agent_info()?.agent_latest_pubkey;
    create_account(agent)?;
    Ok(InitCallbackResult::Pass)
}

#[hdk_extern]
pub fn create_account(agent: AgentPubKey) -> ExternResult<EntryHash> {
    let account = HeartsAccount {
        agent: agent.clone(),
        base_balance: 0.0,
        last_updated: sys_time()?,
        creation_date: sys_time()?,
    };
    
    create_entry(&account)?;
    let hash = hash_entry(&account)?;
    
    // Create link from agent to account
    create_link(
        agent.into(),
        hash.clone(),
        LinkTypes::AgentToAccount,
        ()
    )?;
    
    Ok(hash)
}

#[hdk_extern]
pub fn get_current_balance(_: ()) -> ExternResult<f64> {
    let agent = agent_info()?.agent_latest_pubkey;
    let account = get_account(agent)?;
    
    let days_elapsed = calculate_days_elapsed(account.last_updated)?;
    let current_balance = apply_demurrage(account.base_balance, days_elapsed);
    
    Ok(current_balance)
}

#[hdk_extern]
pub fn transfer_hearts(input: TransferInput) -> ExternResult<EntryHash> {
    let sender = agent_info()?.agent_latest_pubkey;
    let sender_balance = get_current_balance(())?;
    
    if sender_balance < input.amount {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Insufficient balance".into()
        )));
    }
    
    // Settle sender's account (apply demurrage, update base)
    settle_account(&sender)?;
    
    // Deduct from sender
    update_balance(&sender, -input.amount)?;
    
    // Add to recipient
    update_balance(&input.recipient, input.amount)?;
    
    // Record transaction
    let tx = HeartsTransaction {
        tx_type: TransactionType::Spending,
        from_agent: Some(sender.clone()),
        to_agent: Some(input.recipient.clone()),
        amount: input.amount,
        timestamp: sys_time()?,
        contribution_ref: None,
        description: input.description,
    };
    
    create_entry(&tx)?;
    let tx_hash = hash_entry(&tx)?;
    
    Ok(tx_hash)
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TransferInput {
    pub recipient: AgentPubKey,
    pub amount: f64,
    pub description: String,
}

// ========== HELPER FUNCTIONS ==========

fn apply_demurrage(balance: f64, days_elapsed: f64) -> f64 {
    const DAILY_DECAY_RATE: f64 = 0.005 / 30.0;
    balance * (-DAILY_DECAY_RATE * days_elapsed).exp()
}

fn calculate_days_elapsed(last_updated: Timestamp) -> ExternResult<f64> {
    let now = sys_time()?;
    let micros_elapsed = now.as_micros() - last_updated.as_micros();
    let days = micros_elapsed as f64 / (1_000_000.0 * 86400.0);
    Ok(days)
}

fn settle_account(agent: &AgentPubKey) -> ExternResult<()> {
    let mut account = get_account(agent.clone())?;
    let current_balance = get_current_balance(())?;
    
    account.base_balance = current_balance;
    account.last_updated = sys_time()?;
    
    update_entry(hash_entry(&account)?, &account)?;
    Ok(())
}
```

### 3.2 work_zome (Proof of Care)

```rust
// File: zomes/work/src/lib.rs

use hdk::prelude::*;

// ========== ENTRY TYPES ==========

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Contribution {
    pub contributor: AgentPubKey,
    pub pillar: LMCIPillar,
    pub category: String,
    pub description: String,
    pub evidence_hashes: Vec<String>, // IPFS hashes
    pub location: Option<Location>,
    pub hours_contributed: f64,
    pub estimated_beneficiaries: u32,
    pub validation_tier: ValidationTier,
    pub created_at: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum LMCIPillar {
    Love,      // Care & Relationships
    Meaning,   // Purpose & Growth
    Connection // Human-Land Harmony
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ValidationTier {
    LowStakes,    // Casual help, 1 validator
    MediumStakes, // Organized work, 2 validators + evidence
    HighStakes,   // Professional care, 2 validators + credentials
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Validation {
    pub contribution_hash: EntryHash,
    pub validator: AgentPubKey,
    pub status: ValidationStatus,
    pub reasoning: String,
    pub validated_at: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum ValidationStatus {
    Pending,
    Approved,
    Rejected,
    NeedsMoreInfo,
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct GratitudeToken {
    pub giver: AgentPubKey,
    pub receiver: AgentPubKey,
    pub contribution_hash: EntryHash,
    pub weight: f64, // Calculated from giver's LMCI
    pub given_at: Timestamp,
}

// ========== ZOME FUNCTIONS ==========

#[hdk_extern]
pub fn create_contribution(input: ContributionInput) -> ExternResult<EntryHash> {
    let contributor = agent_info()?.agent_latest_pubkey;
    
    let contribution = Contribution {
        contributor: contributor.clone(),
        pillar: input.pillar,
        category: input.category,
        description: input.description,
        evidence_hashes: input.evidence_hashes,
        location: input.location,
        hours_contributed: input.hours_contributed,
        estimated_beneficiaries: input.estimated_beneficiaries,
        validation_tier: determine_validation_tier(&input),
        created_at: sys_time()?,
    };
    
    create_entry(&contribution)?;
    let hash = hash_entry(&contribution)?;
    
    // Create link for querying
    create_link(
        contributor.into(),
        hash.clone(),
        LinkTypes::ContributorToContribution,
        ()
    )?;
    
    Ok(hash)
}

#[hdk_extern]
pub fn validate_contribution(input: ValidationInput) -> ExternResult<EntryHash> {
    let validator = agent_info()?.agent_latest_pubkey;
    
    // Check validator is certified Community Weaver
    ensure_is_weaver(&validator)?;
    
    let contribution: Contribution = must_get_entry(input.contribution_hash.clone())?.try_into()?;
    
    // Cannot validate own contribution
    if contribution.contributor == validator {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot validate own contribution".into()
        )));
    }
    
    let validation = Validation {
        contribution_hash: input.contribution_hash.clone(),
        validator: validator.clone(),
        status: input.status,
        reasoning: input.reasoning,
        validated_at: sys_time()?,
    };
    
    create_entry(&validation)?;
    let val_hash = hash_entry(&validation)?;
    
    // Create link from contribution to validation
    create_link(
        input.contribution_hash,
        val_hash.clone(),
        LinkTypes::ContributionToValidation,
        ()
    )?;
    
    // If approved and meets threshold, trigger Layer 2 bonus
    if input.status == ValidationStatus::Approved {
        check_validation_threshold(input.contribution_hash)?;
    }
    
    Ok(val_hash)
}

#[hdk_extern]
pub fn give_gratitude_token(input: GratitudeInput) -> ExternResult<EntryHash> {
    let giver = agent_info()?.agent_latest_pubkey;
    
    // Check monthly limit (10 tokens)
    let tokens_given_this_month = count_tokens_given_this_month(&giver)?;
    if tokens_given_this_month >= 10 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Monthly gratitude token limit reached".into()
        )));
    }
    
    // Cannot give to self
    if giver == input.receiver {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Cannot give token to self".into()
        )));
    }
    
    // Calculate weight from giver's LMCI
    let giver_lmci = get_lmci_score(&giver)?;
    let weight = giver_lmci.sqrt(); // Square root to reduce oligarchy
    
    let token = GratitudeToken {
        giver: giver.clone(),
        receiver: input.receiver.clone(),
        contribution_hash: input.contribution_hash.clone(),
        weight,
        given_at: sys_time()?,
    };
    
    create_entry(&token)?;
    let hash = hash_entry(&token)?;
    
    Ok(hash)
}

// ========== VALIDATION HELPERS ==========

fn determine_validation_tier(input: &ContributionInput) -> ValidationTier {
    // Simple heuristic - can be made more sophisticated
    if input.hours_contributed > 8.0 || input.category.contains("medical") {
        ValidationTier::HighStakes
    } else if input.evidence_hashes.len() > 0 {
        ValidationTier::MediumStakes
    } else {
        ValidationTier::LowStakes
    }
}

fn check_validation_threshold(contribution_hash: EntryHash) -> ExternResult<()> {
    let contribution: Contribution = must_get_entry(contribution_hash.clone())?.try_into()?;
    let validations = get_validations_for_contribution(&contribution_hash)?;
    
    let required_validations = match contribution.validation_tier {
        ValidationTier::LowStakes => 1,
        ValidationTier::MediumStakes => 2,
        ValidationTier::HighStakes => 2,
    };
    
    let approved_count = validations.iter()
        .filter(|v| matches!(v.status, ValidationStatus::Approved))
        .count();
    
    if approved_count >= required_validations {
        trigger_layer2_bonus(&contribution)?;
    }
    
    Ok(())
}
```

### 3.3 identity_zome (Web of Trust)

```rust
// File: zomes/identity/src/lib.rs

use hdk::prelude::*;

// ========== ENTRY TYPES ==========

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Identity {
    pub agent: AgentPubKey,
    pub display_name: Option<String>,
    pub created_at: Timestamp,
    pub identity_type: IdentityType,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum IdentityType {
    Email(String),
    Phone(String),
    CommunityAttestation,
    NativeID(String), // Love Ledger Native ID
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Attestation {
    pub attester: AgentPubKey,
    pub attestee: AgentPubKey,
    pub attestation_type: AttestationType,
    pub signature: Signature,
    pub attested_at: Timestamp,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum AttestationType {
    InitialVouching,  // For new member onboarding
    SkillEndorsement, // For specific capabilities
    TrustRenewal,     // Periodic re-attestation
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct CommunityWeaverCertification {
    pub weaver: AgentPubKey,
    pub baz_council: AgentPubKey, // The BAZ council that certified
    pub certified_at: Timestamp,
    pub active: bool,
}

// ========== ZOME FUNCTIONS ==========

#[hdk_extern]
pub fn create_identity(input: CreateIdentityInput) -> ExternResult<EntryHash> {
    let agent = agent_info()?.agent_latest_pubkey;
    
    let identity = Identity {
        agent: agent.clone(),
        display_name: input.display_name,
        created_at: sys_time()?,
        identity_type: input.identity_type,
    };
    
    create_entry(&identity)?;
    let hash = hash_entry(&identity)?;
    
    create_link(
        agent.into(),
        hash.clone(),
        LinkTypes::AgentToIdentity,
        ()
    )?;
    
    Ok(hash)
}

#[hdk_extern]
pub fn vouch_for_new_member(input: VouchInput) -> ExternResult<EntryHash> {
    let attester = agent_info()?.agent_latest_pubkey;
    
    // Check attester is Community Weaver
    ensure_is_weaver(&attester)?;
    
    // Check attester hasn't vouched for >5 people this month (Sybil prevention)
    let vouches_this_month = count_vouches_this_month(&attester)?;
    if vouches_this_month >= 5 {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Monthly vouching limit reached".into()
        )));
    }
    
    // Check attestee has minimum 3 vouches from different weavers
    let existing_vouches = get_vouches_for(&input.attestee)?;
    if existing_vouches.len() < 2 {
        // Need 3 total, this would be the 3rd
        return Ok(create_provisional_vouch(attester, input.attestee)?);
    }
    
    // This is the 3rd vouch - create full attestation
    let attestation = Attestation {
        attester: attester.clone(),
        attestee: input.attestee.clone(),
        attestation_type: AttestationType::InitialVouching,
        signature: sign_attestation(&attester, &input.attestee)?,
        attested_at: sys_time()?,
    };
    
    create_entry(&attestation)?;
    let hash = hash_entry(&attestation)?;
    
    // Create bidirectional links
    create_link(attester.into(), hash.clone(), LinkTypes::VoucherToVouch, ())?;
    create_link(input.attestee.into(), hash.clone(), LinkTypes::VoucheeToVouch, ())?;
    
    // Grant AUBI eligibility
    grant_aubi_eligibility(&input.attestee)?;
    
    Ok(hash)
}

#[hdk_extern]
pub fn certify_community_weaver(weaver: AgentPubKey) -> ExternResult<EntryHash> {
    let baz_council = agent_info()?.agent_latest_pubkey;
    
    // TODO: Implement multi-sig verification that this is actually BAZ council
    // For MVP, trust the call
    
    let certification = CommunityWeaverCertification {
        weaver: weaver.clone(),
        baz_council,
        certified_at: sys_time()?,
        active: true,
    };
    
    create_entry(&certification)?;
    let hash = hash_entry(&certification)?;
    
    create_link(
        weaver.into(),
        hash.clone(),
        LinkTypes::WeaverToCertification,
        ()
    )?;
    
    Ok(hash)
}

// ========== SYBIL RESISTANCE ==========

fn ensure_is_weaver(agent: &AgentPubKey) -> ExternResult<()> {
    let links = get_links(
        agent.clone().into(),
        LinkTypes::WeaverToCertification,
        None
    )?;
    
    if links.is_empty() {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Not a certified Community Weaver".into()
        )));
    }
    
    // Check certification is still active
    let cert: CommunityWeaverCertification = must_get_entry(
        links[0].target.clone()
    )?.try_into()?;
    
    if !cert.active {
        return Err(wasm_error!(WasmErrorInner::Guest(
            "Weaver certification is inactive".into()
        )));
    }
    
    Ok(())
}
```

### 3.4 leaves_zome (Ecological NFTs)

```rust
// File: zomes/leaves/src/lib.rs

use hdk::prelude::*;

// ========== ENTRY TYPES ==========

#[hdk_entry_helper]
#[derive(Clone)]
pub struct Leaf {
    pub nft_id: String,
    pub team_id: AgentPubKey, // Community Provider
    pub action_type: String,
    pub location: Location,
    pub green_job_score: f64,
    pub validation_status: LeafStatus,
    pub minted_at: Timestamp,
    pub verified_at: Option<Timestamp>,
    pub monitoring_commitment: String, // e.g., "5_years"
    pub metadata: LeafMetadata,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Location {
    pub lat: Option<f64>,
    pub lon: Option<f64>,
    pub bioregion: String,
    pub place_name: String,
    pub location_precision: LocationPrecision,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum LocationPrecision {
    Exact,       // GPS coordinates visible
    Fuzzy,       // Only bioregion shown
    Hidden,      // Sacred sites
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum LeafStatus {
    Provisional,  // Just minted, awaiting monitoring
    Verified,     // Confirmed impact
    Abandoned,    // Monitoring not maintained
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct LeafMetadata {
    pub area_m2: Option<f64>,
    pub species_planted: Vec<String>,
    pub carbon_sequestration_estimate_kg: Option<f64>,
    pub evidence_hashes: Vec<String>, // IPFS: photos, sensor logs
    pub narrative: Option<String>,
}

#[hdk_entry_helper]
#[derive(Clone)]
pub struct MonitoringLog {
    pub leaf_hash: EntryHash,
    pub logged_at: Timestamp,
    pub validator: AgentPubKey,
    pub observations: String,
    pub evidence_hashes: Vec<String>,
    pub impact_assessment: String, // JSON blob for flexibility
}

// ========== ZOME FUNCTIONS ==========

#[hdk_extern]
pub fn mint_leaf(input: MintLeafInput) -> ExternResult<EntryHash> {
    let team = agent_info()?.agent_latest_pubkey;
    
    // Check team is certified Community Provider
    ensure_is_provider(&team)?;
    
    // Calculate Green Job Score
    let green_job_score = calculate_green_job_score(&input)?;
    
    let nft_id = format!("{}_{}_LEAF_{:05}", 
        input.location.bioregion,
        current_year()?,
        get_leaf_count()? + 1
    );
    
    let leaf = Leaf {
        nft_id: nft_id.clone(),
        team_id: team.clone(),
        action_type: input.action_type,
        location: input.location,
        green_job_score,
        validation_status: LeafStatus::Provisional,
        minted_at: sys_time()?,
        verified_at: None,
        monitoring_commitment: input.monitoring_commitment,
        metadata: input.metadata,
    };
    
    create_entry(&leaf)?;
    let hash = hash_entry(&leaf)?;
    
    create_link(team.into(), hash.clone(), LinkTypes::TeamToLeaf, ())?;
    
    Ok(hash)
}

#[hdk_extern]
pub fn add_monitoring_log(input: MonitoringInput) -> ExternResult<EntryHash> {
    let validator = agent_info()?.agent_latest_pubkey;
    
    // Ensure validator is Weaver or ecologist
    ensure_can_validate_ecology(&validator)?;
    
    let mut leaf: Leaf = must_get_entry(input.leaf_hash.clone())?.try_into()?;
    
    let log = MonitoringLog {
        leaf_hash: input.leaf_hash.clone(),
        logged_at: sys_time()?,
        validator,
        observations: input.observations,
        evidence_hashes: input.evidence_hashes,
        impact_assessment: input.impact_assessment,
    };
    
    create_entry(&log)?;
    let log_hash = hash_entry(&log)?;
    
    create_link(
        input.leaf_hash.clone(),
        log_hash,
        LinkTypes::LeafToMonitoringLog,
        ()
    )?;
    
    // If this is first successful monitoring, upgrade to Verified
    if leaf.validation_status == LeafStatus::Provisional {
        leaf.validation_status = LeafStatus::Verified;
        leaf.verified_at = Some(sys_time()?);
        update_entry(input.leaf_hash, &leaf)?;
    }
    
    Ok(log_hash)
}

// ========== GREEN JOB SCORE CALCULATION ==========

fn calculate_green_job_score(input: &MintLeafInput) -> ExternResult<f64> {
    let mut score = 1.0;
    
    // Ecosystem multiplier
    score *= get_ecosystem_multiplier(&input.action_type);
    
    // Method quality (determined by evidence and description)
    score *= assess_method_quality(&input.metadata);
    
    // Scale factor (larger area = bonus, but diminishing returns)
    if let Some(area) = input.metadata.area_m2 {
        let scale_bonus = (area / 100.0).log10() * 0.1;
        score *= 1.0 + scale_bonus.min(0.3); // Cap at +30%
    }
    
    // BAZ cultural multiplier (would be pulled from BAZ config)
    // For MVP, hardcode to 1.0
    
    // Cap at 1.5x per framework spec
    Ok(score.min(1.5))
}

fn get_ecosystem_multiplier(action_type: &str) -> f64 {
    match action_type {
        "wetland_restoration" => 1.5,
        "old_growth_protection" => 1.5,
        "native_grassland" => 1.3,
        "urban_greening" => 1.2,
        "reforestation" => 1.3,
        _ => 1.0,
    }
}

fn assess_method_quality(metadata: &LeafMetadata) -> f64 {
    let mut quality = 1.0;
    
    // Bonus for native species
    if metadata.species_planted.iter().any(|s| s.contains("native")) {
        quality *= 1.2;
    }
    
    // Bonus for evidence richness
    if metadata.evidence_hashes.len() >= 3 {
        quality *= 1.1;
    }
    
    // Bonus for narrative (shows thought)
    if metadata.narrative.is_some() {
        quality *= 1.05;
    }
    
    quality.min(1.5)
}
```

---

## 4. PostgreSQL Schema (Cache Layer)

```sql
-- ========== USERS & IDENTITY ==========

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  love_ledger_id VARCHAR(255) UNIQUE NOT NULL,
  holochain_agent_pubkey TEXT UNIQUE NOT NULL,
  
  -- Identity
  identity_type VARCHAR(50) NOT NULL,
  identity_value TEXT,
  display_name VARCHAR(255),
  
  -- AUBI
  aubi_baseline_fiat DECIMAL(10,2) DEFAULT 840.00,
  aubi_baseline_hearts DECIMAL(10,2) DEFAULT 360.00,
  enrollment_date DATE NOT NULL,
  
  -- Hearts (cached from Holochain)
  hearts_base_balance DECIMAL(10,2) DEFAULT 0,
  hearts_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- LMCI (recalculated nightly)
  lmci_score_love DECIMAL(5,2),
  lmci_score_meaning DECIMAL(5,2),
  lmci_score_connection DECIMAL(5,2),
  lmci_score_overall DECIMAL(5,2),
  
  -- Metadata
  baz_id UUID NOT NULL REFERENCES bazs(id),
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(baz_id),
  INDEX(lmci_score_overall),
  INDEX(holochain_agent_pubkey)
);

-- ========== CONTRIBUTIONS (Love Ledger) ==========

CREATE TABLE contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  
  -- Classification
  pillar VARCHAR(20) NOT NULL CHECK (pillar IN ('love', 'meaning', 'connection')),
  category VARCHAR(100) NOT NULL,
  
  -- Content
  description TEXT NOT NULL,
  evidence_urls JSONB DEFAULT '[]',
  location_lat DECIMAL(10,8),
  location_lon DECIMAL(11,8),
  location_bioregion VARCHAR(100),
  location_precision VARCHAR(20) DEFAULT 'bioregion',
  
  -- Validation
  validation_status VARCHAR(20) DEFAULT 'pending',
  validation_tier VARCHAR(20) NOT NULL,
  validators JSONB DEFAULT '[]',
  validated_at TIMESTAMP,
  
  -- Impact
  estimated_beneficiaries INTEGER DEFAULT 1,
  hours_contributed DECIMAL(5,2),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(user_id, validation_status),
  INDEX(pillar, category),
  INDEX(validated_at DESC)
);

-- ========== VALIDATIONS ==========

CREATE TABLE validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE NOT NULL,
  contribution_id UUID NOT NULL REFERENCES contributions(id),
  validator_id UUID NOT NULL REFERENCES users(id),
  
  status VARCHAR(20) NOT NULL,
  reasoning TEXT,
  validated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(contribution_id),
  INDEX(validator_id)
);

-- ========== GRATITUDE TOKENS ==========

CREATE TABLE gratitude_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE NOT NULL,
  giver_id UUID NOT NULL REFERENCES users(id),
  receiver_id UUID NOT NULL REFERENCES users(id),
  contribution_id UUID REFERENCES contributions(id),
  
  weight DECIMAL(5,4) NOT NULL,
  given_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(giver_id, contribution_id),
  CHECK(giver_id != receiver_id),
  
  INDEX(receiver_id, given_at DESC),
  INDEX(giver_id)
);

-- ========== HEARTS TRANSACTIONS (Cache) ==========

CREATE TABLE hearts_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE,
  
  transaction_type VARCHAR(20) NOT NULL,
  from_user_id UUID REFERENCES users(id),
  to_provider_id UUID REFERENCES community_providers(id),
  amount DECIMAL(10,2) NOT NULL,
  
  contribution_id UUID REFERENCES contributions(id),
  service_description TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(from_user_id, created_at DESC),
  INDEX(to_provider_id, created_at DESC),
  INDEX(transaction_type)
);

-- ========== COMMUNITY PROVIDERS ==========

CREATE TABLE community_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_agent_pubkey TEXT UNIQUE NOT NULL,
  
  name VARCHAR(255) NOT NULL,
  baz_id UUID NOT NULL REFERENCES bazs(id),
  
  charter_status VARCHAR(20) DEFAULT 'pending',
  chartered_at TIMESTAMP,
  
  -- Finance (cached)
  hearts_balance DECIMAL(10,2) DEFAULT 0,
  hearts_redeemed_total DECIMAL(12,2) DEFAULT 0,
  
  service_types JSONB DEFAULT '[]',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(baz_id, charter_status)
);

-- ========== LEAVES (Ecological NFTs) ==========

CREATE TABLE leaves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE NOT NULL,
  nft_id VARCHAR(255) UNIQUE NOT NULL,
  
  team_id UUID NOT NULL REFERENCES community_providers(id),
  action_type VARCHAR(100) NOT NULL,
  
  location_lat DECIMAL(10,8),
  location_lon DECIMAL(11,8),
  bioregion VARCHAR(100) NOT NULL,
  location_precision VARCHAR(20) DEFAULT 'bioregion',
  
  green_job_score DECIMAL(3,2) NOT NULL,
  validation_status VARCHAR(20) DEFAULT 'provisional',
  
  minted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP,
  
  monitoring_commitment VARCHAR(50),
  next_monitoring_due DATE,
  
  metadata JSONB NOT NULL,
  
  INDEX(team_id),
  INDEX(bioregion, action_type),
  INDEX(next_monitoring_due)
);

-- ========== MONITORING LOGS ==========

CREATE TABLE monitoring_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  holochain_entry_hash TEXT UNIQUE NOT NULL,
  leaf_id UUID NOT NULL REFERENCES leaves(id),
  validator_id UUID NOT NULL REFERENCES users(id),
  
  observations TEXT NOT NULL,
  evidence_urls JSONB DEFAULT '[]',
  impact_assessment JSONB,
  
  logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(leaf_id, logged_at DESC)
);

-- ========== BAZs (Bioregional Autonomous Zones) ==========

CREATE TABLE bazs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  bioregion VARCHAR(255) NOT NULL,
  
  governance_model JSONB,
  indigenous_led BOOLEAN DEFAULT false,
  
  -- Configuration
  cultural_weights JSONB, -- LMCI adjustments
  custom_categories JSONB, -- Tier 3 taxonomy
  
  -- Demographics
  population INTEGER,
  area_km2 DECIMAL(10,2),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========== COMMUNITY WEAVERS ==========

CREATE TABLE community_weavers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  baz_id UUID NOT NULL REFERENCES bazs(id),
  
  certified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  active_status BOOLEAN DEFAULT true,
  
  -- Performance metrics
  validations_count INTEGER DEFAULT 0,
  avg_validation_time_hours DECIMAL(5,2),
  
  UNIQUE(user_id, baz_id),
  INDEX(baz_id, active_status)
);

-- ========== HOLOCHAIN SYNC LOG ==========

CREATE TABLE holochain_sync_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zome_name VARCHAR(50) NOT NULL,
  entry_type VARCHAR(50) NOT NULL,
  entry_hash TEXT NOT NULL,
  action VARCHAR(20) NOT NULL, -- 'create', 'update', 'delete'
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX(synced_at DESC),
  INDEX(zome_name, entry_type)
);
```

---

## 5. API Endpoints (SvelteKit Server)

### 5.1 Authentication

```typescript
// File: src/routes/api/auth/+server.ts

import { lucia } from '$lib/server/auth';
import { db } from '$lib/server/db';

export const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();
  
  // Validate credentials
  const user = await db.users.findByEmail(email);
  if (!user || !await verifyPassword(user.password_hash, password)) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }
  
  // Create session
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  
  cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes
  });
  
  return json({ 
    user: sanitizeUser(user),
    holochain_agent: user.holochain_agent_pubkey 
  });
};
```

### 5.2 Love Ledger Contributions

```typescript
// File: src/routes/api/contributions/+server.ts

import { holochainClient } from '$lib/server/holochain';
import { db } from '$lib/server/db';

export const POST = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const input = await request.json();
  
  // Validate input
  const validated = contributionSchema.parse(input);
  
  // Upload evidence to IPFS
  const evidenceHashes = await Promise.all(
    validated.evidence_files.map(file => uploadToIPFS(file))
  );
  
  // Create contribution in Holochain
  const result = await holochainClient.callZome({
    role_name: 'love_ledger',
    zome_name: 'work',
    fn_name: 'create_contribution',
    payload: {
      pillar: validated.pillar,
      category: validated.category,
      description: validated.description,
      evidence_hashes: evidenceHashes,
      location: validated.location,
      hours_contributed: validated.hours,
      estimated_beneficiaries: validated.beneficiaries
    }
  });
  
  // Cache in PostgreSQL
  const contribution = await db.contributions.create({
    holochain_entry_hash: result,
    user_id: user.id,
    ...validated
  });
  
  return json({ 
    id: contribution.id,
    holochain_hash: result,
    status: 'pending_validation'
  });
};

export const GET = async ({ locals, url }) => {
  const user = locals.user;
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const status = url.searchParams.get('status') || 'all';
  
  // Query from cache (faster than Holochain)
  const contributions = await db.contributions.findMany({
    where: {
      user_id: user.id,
      ...(status !== 'all' && { validation_status: status })
    },
    orderBy: { created_at: 'desc' },
    limit: 50
  });
  
  return json({ contributions });
};
```

### 5.3 Community Weaver Validation

```typescript
// File: src/routes/api/validations/+server.ts

export const POST = async ({ request, locals }) => {
  const weaver = locals.user;
  if (!weaver) return json({ error: 'Unauthorized' }, { status: 401 });
  
  // Check weaver certification
  const certification = await db.community_weavers.findOne({
    user_id: weaver.id,
    active_status: true
  });
  if (!certification) {
    return json({ error: 'Not a certified Community Weaver' }, { status: 403 });
  }
  
  const { contribution_id, status, reasoning } = await request.json();
  
  // Get contribution
  const contribution = await db.contributions.findById(contribution_id);
  if (!contribution) {
    return json({ error: 'Contribution not found' }, { status: 404 });
  }
  
  // Cannot validate own contribution
  if (contribution.user_id === weaver.id) {
    return json({ error: 'Cannot validate own contribution' }, { status: 400 });
  }
  
  // Call Holochain
  const result = await holochainClient.callZome({
    role_name: 'love_ledger',
    zome_name: 'work',
    fn_name: 'validate_contribution',
    payload: {
      contribution_hash: contribution.holochain_entry_hash,
      status,
      reasoning
    }
  });
  
  // Update cache
  const validation = await db.validations.create({
    holochain_entry_hash: result,
    contribution_id,
    validator_id: weaver.id,
    status,
    reasoning
  });
  
  // Update contribution status if approved
  if (status === 'Approved') {
    await checkValidationThreshold(contribution_id);
  }
  
  // Send notification to contributor
  await notifyUser(contribution.user_id, {
    type: 'validation_update',
    contribution_id,
    status
  });
  
  return json({ validation });
};

// Get pending validations for weaver dashboard
export const GET = async ({ locals }) => {
  const weaver = locals.user;
  if (!weaver) return json({ error: 'Unauthorized' }, { status: 401 });
  
  const pending = await db.contributions.findMany({
    where: {
      validation_status: 'pending',
      user_id: { not: weaver.id } // Exclude own contributions
    },
    include: {
      user: { select: { display_name: true } }
    },
    orderBy: { created_at: 'asc' },
    limit: 20
  });
  
  return json({ pending_validations: pending });
};
```

### 5.4 Hearts Balance

```typescript
// File: src/routes/api/hearts/balance/+server.ts

export const GET = async ({ locals }) => {
  const user = locals.user;
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  
  // Get current balance from Holochain (source of truth)
  const current_balance = await holochainClient.callZome({
    role_name: 'love_ledger',
    zome_name: 'hearts',
    fn_name: 'get_current_balance',
    payload: null
  });
  
  // Calculate daily rate and monthly projection
  const daily_rate = user.aubi_baseline_hearts / 30;
  const days_in_month = new Date().getDate();
  const days_remaining = daysInMonth(new Date()) - days_in_month;
  
  return json({
    current: current_balance,
    daily_rate,
    monthly_projection: user.aubi_baseline_hearts,
    days_elapsed: days_in_month,
    days_remaining,
    next_deposit: tomorrow(),
    demurrage_rate: "~0.5%/month when held"
  });
};
```

### 5.5 LMCI Dashboard

```typescript
// File: src/routes/api/lmci/+server.ts

export const GET = async ({ locals }) => {
  const user = locals.user;
  if (!user) return json({ error: 'Unauthorized' }, { status: 401 });
  
  // Get cached LMCI scores (updated nightly)
  const scores = {
    love: user.lmci_score_love,
    meaning: user.lmci_score_meaning,
    connection: user.lmci_score_connection,
    overall: user.lmci_score_overall
  };
  
  // Get contribution breakdown
  const breakdown = await db.contributions.aggregate({
    where: {
      user_id: user.id,
      validation_status: 'approved'
    },
    groupBy: ['pillar'],
    _count: { id: true },
    _sum: { hours_contributed: true }
  });
  
  // Get recent gratitude tokens
  const recent_gratitude = await db.gratitude_tokens.findMany({
    where: { receiver_id: user.id },
    orderBy: { given_at: 'desc' },
    limit: 10,
    include: {
      giver: { select: { display_name: true } },
      contribution: { select: { description: true } }
    }
  });
  
  return json({
    scores,
    breakdown,
    recent_gratitude,
    percentile: await calculatePercentile(user.id, scores.overall)
  });
};
```

---

## 6. Security & Failure Modes

### 6.1 Authentication Security

```typescript
// Multi-factor approach for sensitive operations

// Email/password (standard)
async function loginWithEmail(email: string, password: string) {
  // Argon2 password verification
  // Rate limiting: 5 attempts per 15 minutes
  // Session expires after 30 days inactivity
}

// Community attestation (for undocumented)
async function loginWithAttestation(attestationProof: AttestationProof) {
  // Verify 3 Community Weaver signatures
  // Check signatures are from active weavers
  // Ensure attestation is recent (<30 days)
}

// DID-based (future)
async function loginWithDID(did: string, proof: DIDProof) {
  // Verify DID signature
  // Check Web of Trust
  // Validate against Holochain identity_zome
}
```

### 6.2 Sybil Attack Prevention

**Multi-layered Defense**:

1. **Entry Control**: Require 3 Community Weaver vouches
2. **Reputation Staking**: Weavers lose reputation if vouched users are banned
3. **Rate Limiting**: Weavers can vouch max 5 people/month
4. **Behavioral Analysis**: AI flags suspicious patterns
5. **Skin in the Game**: Bad actors cause sponsor penalties

```typescript
// Sybil detection algorithm
async function detectSybilCluster(user_id: string) {
  const vouchers = await getVouchersForUser(user_id);
  
  // Check if vouchers form a tight cluster (all vouch each other)
  const mutual_vouching_rate = calculateMutualVouchingRate(vouchers);
  if (mutual_vouching_rate > 0.7) {
    flagForReview(user_id, 'Suspicious voucher cluster');
  }
  
  // Check contribution patterns (all same type, similar timestamps)
  const contributions = await getContributions(user_id);
  const pattern_similarity = analyzePatternsimilarity(contributions);
  if (pattern_similarity > 0.8) {
    flagForReview(user_id, 'Robotic contribution patterns');
  }
  
  // Check Hearts spending (never spent, or only to related accounts)
  const spending_pattern = analyzeSpendingPattern(user_id);
  if (spending_pattern.diversity < 0.3) {
    flagForReview(user_id, 'Suspicious spending pattern');
  }
}
```

### 6.3 Hearts Inflation Control

```typescript
// Automatic circuit breakers

const INFLATION_THRESHOLDS = {
  WARNING: 0.07,    // 7% monthly growth
  CRITICAL: 0.10,   // 10% monthly growth
  EMERGENCY: 0.15   // 15% monthly growth
};

async function monitorInflation() {
  const current_supply = await getTotalHeartsSupply();
  const last_month_supply = await getSupplyFromMonthAgo();
  const growth_rate = (current_supply - last_month_supply) / last_month_supply;
  
  if (growth_rate > INFLATION_THRESHOLDS.EMERGENCY) {
    // Halt all Layer 2 bonus issuance
    await pauseLayer2Bonuses();
    
    // Increase demurrage rate temporarily
    await setDemurrageRate(0.01); // Double to 1%/month
    
    // Alert Social Resilience Council
    await notifyGovernance({
      type: 'EMERGENCY_INFLATION',
      growth_rate,
      actions_taken: ['pause_bonuses', 'increase_demurrage']
    });
  } else if (growth_rate > INFLATION_THRESHOLDS.CRITICAL) {
    // Reduce Layer 2 bonus cap by 50%
    await adjustBonusCap(0.5);
    
    // Alert governance
    await notifyGovernance({
      type: 'CRITICAL_INFLATION',
      growth_rate
    });
  } else if (growth_rate > INFLATION_THRESHOLDS.WARNING) {
    // Just log and monitor
    logger.warn(`Inflation at ${growth_rate}, approaching threshold`);
  }
}
```

### 6.4 Community Weaver Burnout Prevention

**The Most Critical Failure Mode** (Claude's emphasis)

```typescript
// Weaver workload dashboard

interface WeaverMetrics {
  pending_validations: number;
  validations_this_week: number;
  avg_time_to_validate_hours: number;
  burnout_risk_score: number; // 0-100
}

async function calculateBurnoutRisk(weaver_id: string): Promise<number> {
  const metrics = await getWeaverMetrics(weaver_id);
  
  let risk_score = 0;
  
  // Too many pending (>20 = overloaded)
  if (metrics.pending_validations > 20) {
    risk_score += 30;
  }
  
  // Working too much (>20 validations/week = burning out)
  if (metrics.validations_this_week > 20) {
    risk_score += 40;
  }
  
  // Slowing down (fatigue indicator)
  if (metrics.avg_time_to_validate_hours > 48) {
    risk_score += 20;
  }
  
  // Check feedback sentiment
  const recent_feedback = await getWeaverFeedback(weaver_id, 'last_30_days');
  if (recent_feedback.avg_sentiment < 3.0) { // Scale 1-5
    risk_score += 10;
  }
  
  return risk_score;
}

// Auto-intervention
async function preventBurnout(weaver_id: string) {
  const risk = await calculateBurnoutRisk(weaver_id);
  
  if (risk > 70) {
    // CRITICAL: Force sabbatical
    await db.community_weavers.update(weaver_id, {
      active_status: false,
      sabbatical_reason: 'Automatic burnout prevention',
      sabbatical_ends: addDays(new Date(), 14) // 2 week break
    });
    
    // Notify weaver
    await sendEmail(weaver_id, {
      subject: 'You deserve rest 💚',
      body: `Our system detected you might be overworked. We've given you a 2-week sabbatical with full Layer 2 bonus compensation. Your wellbeing matters more than validations.`
    });
    
    // Redistribute pending validations
    await redistributeValidations(weaver_id);
    
  } else if (risk > 50) {
    // WARNING: Offer support
    await notifyWeaver(weaver_id, {
      type: 'BURNOUT_WARNING',
      message: 'Your workload looks heavy. Consider taking a break or requesting backup.',
      actions: ['request_backup', 'take_sabbatical', 'adjust_schedule']
    });
  }
}
```

### 6.5 Data Loss Prevention

```typescript
// Holochain-PostgreSQL sync reliability

// Every hour: Sync new entries from Holochain to PostgreSQL
async function syncHolochainToPostgres() {
  const last_sync = await getLastSyncTimestamp();
  
  // Get all entries created since last sync
  const new_entries = await holochainClient.callZome({
    role_name: 'love_ledger',
    zome_name: 'work',
    fn_name: 'get_entries_since',
    payload: { timestamp: last_sync }
  });
  
  for (const entry of new_entries) {
    try {
      await db.contributions.upsert({
        where: { holochain_entry_hash: entry.hash },
        update: mapHolochainEntry(entry),
        create: mapHolochainEntry(entry)
      });
      
      await logSync(entry.hash, 'success');
    } catch (error) {
      await logSync(entry.hash, 'failed', error);
      // Retry later
      await queueForRetry(entry.hash);
    }
  }
  
  await updateLastSyncTimestamp(Date.now());
}

// Daily: Verify consistency
async function verifyDataIntegrity() {
  // Sample 100 random contributions
  const sample = await db.contributions.sample(100);
  
  for (const contribution of sample) {
    const holochain_entry = await holochainClient.callZome({
      role_name: 'love_ledger',
      zome_name: 'work',
      fn_name: 'get_contribution',
      payload: { hash: contribution.holochain_entry_hash }
    });
    
    if (!deepEqual(contribution, mapHolochainEntry(holochain_entry))) {
      logger.error(`Data mismatch for ${contribution.id}`);
      await reconcileEntry(contribution.id, holochain_entry);
    }
  }
}
```

### 6.6 Privacy Breach Prevention

```typescript
// Layer-based access control

enum AccessLayer {
  PUBLIC = 1,        // Anyone can see
  COMMUNITY = 2,     // BAZ members only
  CONTRIBUTORS = 3,  // People in same contribution
  SELF = 4,          // User only
  GOVERNANCE = 5     // Weavers + councils
}

async function filterDataByAccessLayer(
  data: any,
  requesting_user_id: string,
  data_owner_id: string
): Promise<any> {
  
  const user_layer = await determineAccessLayer(
    requesting_user_id,
    data_owner_id
  );
  
  // Apply filters based on layer
  if (user_layer <= AccessLayer.PUBLIC) {
    return {
      lmci_score: data.lmci_score_overall,
      contribution_count: data.contribution_count,
      gratitude_tokens: data.gratitude_token_count
    };
  }
  
  if (user_layer <= AccessLayer.COMMUNITY) {
    return {
      ...filterPublic(data),
      lmci_breakdown: data.lmci_breakdown,
      recent_contributions: data.contributions.map(c => ({
        title: c.description.substring(0, 50),
        category: c.category,
        date: c.created_at
      }))
    };
  }
  
  // ... progressively reveal more
}

// Prevent location tracking
function fuzzyLocation(lat: number, lon: number, precision: string) {
  if (precision === 'hidden') return null;
  if (precision === 'bioregion') return { bioregion_only: getBioregion(lat, lon) };
  if (precision === 'fuzzy') return addNoise(lat, lon, 5000); // ±5km
  return { lat, lon }; // exact
}
```

---

## 7. Deployment Architecture

### 7.1 MVP Deployment (Single BAZ)

```yaml
# docker-compose.yml

version: '3.8'

services:
  # SvelteKit frontend + API
  web:
    build: ./packages/web
    ports:
      - "5173:5173"
    environment:
      - DATABASE_URL=postgresql://love_ledger:${DB_PASSWORD}@postgres:5432/love_ledger
      - REDIS_URL=redis://redis:6379
      - HOLOCHAIN_URL=ws://holochain:8888
    depends_on:
      - postgres
      - redis
      - holochain
    volumes:
      - ./packages/web:/app
      - node_modules:/app/node_modules

  # PostgreSQL cache
  postgres:
    image: postgres:16-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=love_ledger
      - POSTGRES_USER=love_ledger
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql

  # Redis for sessions/queues
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # Holochain conductor
  holochain:
    build: ./holochain
    ports:
      - "8888:8888"
    environment:
      - RUST_LOG=info
    volumes:
      - holochain_data:/holochain/data
      - ./holochain/dnas:/holochain/dnas

  # Federation gateway (hearts treasury bridge)
  gateway:
    build: ./gateway
    ports:
      - "3000:3000"
    environment:
      - BANK_API_URL=${BANK_API_URL}
      - BANK_API_KEY=${BANK_API_KEY}
      - HOLOCHAIN_URL=ws://holochain:8888
    depends_on:
      - holochain

volumes:
  postgres_data:
  redis_data:
  holochain_data:
  node_modules:
```

### 7.2 Scaling Path (Multiple BAZs)

```
Year 1 (MVP):
  Stockholm BAZ
    ├─ Single server (DigitalOcean Droplet)
    ├─ PostgreSQL primary, Holochain audit log
    └─ ~3,000 users

Year 2 (Growth):
  Stockholm BAZ
    ├─ Kubernetes cluster
    ├─ Holochain primary, PostgreSQL cache
    └─ ~10,000 users
  
  Nunavut BAZ
    ├─ Satellite-optimized deployment
    ├─ Offline-first mobile app
    └─ ~2,000 users
  
  Federation Bridge
    └─ Cross-BAZ Hearts translation

Year 3 (Federation):
  10+ BAZs
    ├─ Each runs autonomous Holochain instance
    ├─ Opt-in federation protocol
    └─ ~50,000 total users
```

---

## 8. Development Roadmap

### 8.1 Phase 1: Core Loop (Months 1-6)

**Sprint 1-2: Foundation**
- [ ] Set up monorepo structure
- [ ] Deploy Holochain conductor
- [ ] Initialize hearts_zome, work_zome, identity_zome
- [ ] Set up PostgreSQL schema
- [ ] Build basic SvelteKit app structure

**Sprint 3-4: Identity & Onboarding**
- [ ] Implement Love Ledger Native ID
- [ ] Build Community Weaver certification flow
- [ ] Create Web of Trust vouching system
- [ ] Design onboarding UX for undocumented users

**Sprint 5-8: Love Ledger Core**
- [ ] Build contribution submission form
- [ ] Implement IPFS evidence upload
- [ ] Create Community Weaver validation dashboard
- [ ] Build multi-tier validation logic
- [ ] Implement Gratitude Token system

**Sprint 9-12: Hearts Display**
- [ ] Implement AUBI daily drip backend
- [ ] Build Hearts balance UI
- [ ] Create demurrage calculation engine
- [ ] Design "monthly projection" display
- [ ] Build LMCI basic dashboard

### 8.2 Phase 2: Polish & Pilot (Months 7-12)

**Sprint 13-16: UX Refinement**
- [ ] Multi-language support (English, Swedish)
- [ ] Mobile-responsive design
- [ ] Accessibility audit (screen readers, keyboard nav)
- [ ] Email/SMS notifications
- [ ] Dark mode (Cosmic Night theme)

**Sprint 17-20: Pilot Preparation**
- [ ] Community Weaver training materials
- [ ] Deploy to Stockholm Archipelago
- [ ] Onboard first 50 users (invitation-only)
- [ ] Monitor metrics, iterate

**Sprint 21-24: Full Launch**
- [ ] Open registration within BAZ
- [ ] Scale to 1,000+ users
- [ ] Implement automated monitoring
- [ ] Burnout prevention systems active

### 8.3 Phase 3: Advanced Features (Year 2)

- [ ] Hearts spending at Community Providers
- [ ] Hearts Treasury fiat redemption
- [ ] Leaves NFT minting (simplified)
- [ ] IoT integration for objective validation
- [ ] Cross-BAZ federation (experimental)
- [ ] Native mobile app (iOS/Android)

---

## 9. Success Metrics

### 9.1 Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Uptime** | 99.5% | Holochain conductor + web app |
| **Sync Lag** | <1 hour | Holochain → PostgreSQL |
| **API Latency** | <200ms | p95 response time |
| **Validation Time** | <48 hours | Median time from submission to approval |
| **Data Integrity** | 100% | Holochain-PostgreSQL consistency checks |

### 9.2 User Engagement Metrics

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Contribution Rate** | 70% users log ≥1/month | Shows active participation |
| **Validation Completion** | 90% within 7 days | Weaver responsiveness |
| **Return Rate** | 60% weekly active | Sticky engagement |
| **Hearts Circulation** | 80% spent within 30 days | Velocity indicator |
| **Gratitude Tokens** | 50% users give ≥1/month | Social cohesion |

### 9.3 Community Health Metrics

| Metric | Target | Red Flag |
|--------|--------|----------|
| **LMCI Growth** | +15% year 1 | Stagnant or declining |
| **Weaver Burnout** | <10% high-risk | >30% risk score >50 |
| **Sybil Detection** | <1% flagged accounts | >5% suspicious patterns |
| **User Satisfaction** | 80% positive | <60% satisfaction |
| **Privacy Incidents** | 0 | Any data breach |

---

## 10. Open Questions for Council Review

1. **Demurrage Rate**: Is 0.5%/month too gentle? Should we start at 1% and adjust?

2. **Validation Threshold**: Should high-stakes contributions require expert validation (ecologist, medical professional) or trust Community Weavers fully?

3. **LMCI Weighting**: Should all three pillars be equal (33.3% each) or should we weight Connection higher for ecological urgency?

4. **Cross-BAZ Trading**: Should Hearts be transferable between BAZs from day 1, or keep each BAZ isolated initially?

5. **Leaves Utility**: What should Leaves actually grant access to? Seeds from restored areas? Priority in land access? Voting power?

6. **Holochain Migration**: When exactly should we switch from PostgreSQL-primary to Holochain-primary? Year 2 or wait until Year 3?

---

## Appendices

### A. Glossary

| Term | Definition |
|------|------------|
| **BAZ** | Bioregional Autonomous Zone - a geographic community running its own Love Ledger instance |
| **Community Weaver** | Certified validator of contributions, trained in cultural sensitivity and LMCI principles |
| **Demurrage** | Continuous decay of Hearts balance to encourage circulation |
| **Hearts** | Currency earned through validated care, cultural, and ecological work |
| **Leaves** | NFTs representing verified ecological restoration acts |
| **LMCI** | Love, Meaning, and Connection Index - wellbeing metric replacing GDP |
| **Love Ledger** | Non-monetized system for tracking informal community contributions |
| **Layer 0** | Relational wealth - unmonetized contributions honored via Love Ledger |
| **Layer 1** | AUBI baseline - 70% fiat, 30% Hearts |
| **Layer 2** | Contribution bonuses in Hearts for validated work |
| **Proof of Care** | Verification protocol for validating community contributions |
| **Web of Trust** | Decentralized identity system where Community Weavers vouch for new members |

### B. File Structure

```
love-ledger/
├── holochain/
│   ├── dnas/
│   │   ├── hearts/
│   │   │   ├── zomes/
│   │   │   │   └── hearts/
│   │   │   │       └── src/
│   │   │   │           └── lib.rs
│   │   │   └── dna.yaml
│   │   ├── work/
│   │   ├── identity/
│   │   └── leaves/
│   └── Dockerfile
├── packages/
│   ├── web/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── server/
│   │   │   │   │   ├── db/
│   │   │   │   │   ├── holochain.ts
│   │   │   │   │   └── auth.ts
│   │   │   │   └── components/
│   │   │   ├── routes/
│   │   │   │   ├── api/
│   │   │   │   └── (app)/
│   │   │   └── app.html
│   │   ├── static/
│   │   ├── tests/
│   │   └── package.json
│   └── gateway/
│       └── src/
│           └── index.ts
├── docs/
│   └── TECHNICAL_SPECIFICATION.md (this file)
├── docker-compose.yml
└── README.md
```

### C. References

- **Holochain Documentation**: https://developer.holochain.org
- **SvelteKit Documentation**: https://kit.svelte.dev
- **AUBI Framework v7.0**: `/mnt/project/35-gemini-revision.md`
- **Financial Systems Framework v3.1**: `/mnt/project/33-gemini-revision.md`
- **Work in Liberation Framework v3.0**: `/mnt/project/30-grok-revision.md`
- **Freicoin (Demurrage Currency)**: https://freico.in
- **Bernard Lietaer on Complementary Currencies**: "The Future of Money" (2001)

---

**END OF TECHNICAL SPECIFICATION**

*This document synthesizes contributions from Claude, Gemini, Grok, and DeepSeek. It represents the AI Council's consensus on the optimal architecture for the Love Ledger MVP, balancing theoretical purity with practical implementation constraints.*

*Next step: Developer review and estimation for 6-12 month build timeline.*
