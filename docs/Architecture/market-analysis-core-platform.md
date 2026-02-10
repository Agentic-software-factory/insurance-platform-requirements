---
sidebar_position: 2
---

# Market Analysis: Core System Platform Evaluation

**Date:** 2026-02-10

**Status:** Draft — Pending Stakeholder Review

**Prepared for:** TryggFörsäkring AB — Core System Replacement Programme

---

## Executive Summary

TryggFörsäkring AB is replacing a 15+ year legacy policy administration system.
This market analysis evaluates commercial platforms, build-vs-buy alternatives,
and hybrid approaches for the core system replacement. The recommendation is a
**hybrid approach** — a commercial core platform (Keylane Axon or Sapiens/TIA)
combined with custom-built Swedish integrations and customer-facing UX.

---

## Swedish Market Landscape

The following table summarizes how comparable Swedish and Nordic insurers have
approached core system modernization:

| Insurer            | Platform                                        | Status                                  |
| ------------------ | ----------------------------------------------- | --------------------------------------- |
| If P&C             | Guidewire InsuranceSuite + Socotra              | Active dual-platform transformation     |
| Trygg-Hansa (Tryg) | Guidewire ClaimCenter                           | Standardizing claims across Scandinavia |
| Folksam            | Sapiens IDITSuite + Kyndryl mainframe migration | Multi-year transformation               |
| Länsförsäkringar   | Legacy + Insurely AI partnership                | Incremental modernization               |
| Hedvig             | Custom-built                                    | Digital-native neoinsurer               |

### Key Observations

- No single platform dominates the Swedish mid-market segment.
- Large carriers (If P&C, Folksam) invest in Tier 1 platforms but face multi-year
  timelines.
- Digital-native entrants (Hedvig) build custom but had greenfield advantage.
- Incremental modernization (Länsförsäkringar) preserves legacy investment but
  limits agility.

---

## Platform Shortlist

### Tier 1 — Recommended for Evaluation

| Rank | Platform              | Key Strength                                                            | Nordic Presence                             |
| ---- | --------------------- | ----------------------------------------------------------------------- | ------------------------------------------- |
| 1    | Sapiens IDITSuite/TIA | Folksam reference, 200+ Nordic staff, approximately 70 Nordic customers | Strong (Copenhagen office)                  |
| 2    | Keylane Axon          | Purpose-built for European non-life, Swedish office, 225+ customers     | Strong (Sweden, Denmark, Norway)            |
| 3    | Socotra               | Best API-first architecture, If P&C reference, lowest entry cost        | Emerging (If P&C embedded insurance launch) |

#### Sapiens IDITSuite / TIA

- Proven in the Nordic market with Folksam as a major reference customer.
- Copenhagen-based Nordic operations with 200+ staff dedicated to the region.
- Approximately 70 Nordic customers across life and non-life segments.
- Full policy lifecycle support including underwriting, claims, and billing.
- Consideration: older architecture may require more customization effort.

#### Keylane Axon

- Purpose-built for European non-life insurance, strong alignment with
  TryggFörsäkring's product portfolio.
- Swedish office provides local support and regulatory understanding.
- 225+ customers across Europe, with strong Scandinavian presence.
- Modern microservices architecture with API-first design.
- Consideration: smaller vendor than Guidewire/Sapiens — evaluate long-term
  viability.

#### Socotra

- Best-in-class API-first, cloud-native architecture.
- If P&C reference validates Nordic applicability (embedded insurance launch
  May 2025).
- Lowest entry cost among Tier 1 candidates.
- Strong fit for digital-first distribution and partner integrations.
- Consideration: emerging Nordic presence — fewer local references and support
  resources.

### Tier 2 — Evaluate If Budget Allows

- **Guidewire InsuranceSuite** — Global market leader with If P&C and
  Trygg-Hansa as Nordic references. Potentially oversized and overpriced for a
  mid-size carrier. Evaluate only if budget allows full enterprise licensing.

### Tier 3 — Dismissed

The following platforms were evaluated and dismissed due to insufficient Nordic
presence or relevance for TryggFörsäkring's requirements:

- Duck Creek
- Majesco
- EIS Group
- Unqork
- Insly
- Genasys
- Open-source frameworks

---

## Build vs Buy vs Hybrid Evaluation

### Total Cost of Ownership Comparison

| Approach                          | 5-Year TCO (EUR) | Timeline (Phase 1) | Risk Level |
| --------------------------------- | ---------------- | ------------------ | ---------- |
| Build custom                      | 24–47M           | 5–10 years         | Very High  |
| Buy platform (Sapiens/Keylane)    | 9–24.5M          | 12–24 months       | Medium     |
| Hybrid (commercial core + custom) | 9.5–21.5M        | 12–18 months       | Medium-Low |

### Approach Analysis

#### Build Custom

- Full control over architecture and feature set.
- No vendor lock-in or licensing costs.
- Requires large, specialized engineering team (estimated 30–50 developers).
- 5–10 year timeline for Phase 1 is incompatible with business urgency.
- Very high risk: internal builds frequently exceed budget and timeline
  (industry failure rates above 50%).
- No reuse of industry-standard insurance logic (rating engines, regulatory
  reporting).

#### Buy Platform

- Fastest path to production for standard insurance workflows.
- Vendor-supported regulatory compliance updates.
- 12–24 month timeline for Phase 1 aligns with business needs.
- Medium risk: implementation success depends on configuration discipline and
  vendor relationship.
- Limitation: Swedish-specific integrations (BankID, Transportstyrelsen, TFF)
  not standard in any global platform — requires custom development regardless.

#### Hybrid (Recommended)

- Commercial core handles standard policy lifecycle (underwriting, claims,
  billing).
- Custom-built components for Swedish integrations and customer-facing UX.
- 12–18 month timeline for Phase 1 — fastest viable approach.
- Medium-low risk: reduces custom development scope while preserving
  differentiation.
- Best cost profile: avoids full build cost while limiting vendor license
  scope.
- Enables phased rollout aligned with TryggFörsäkring's phase plan
  (Motor, Home, Commercial).

---

## Recommendation

### Primary Recommendation: Hybrid Approach

Adopt a **hybrid strategy** using a commercial core platform (Keylane Axon or
Sapiens/TIA) combined with custom-built Swedish integrations and
customer-facing UX.

### Rationale

1. **Cost efficiency** — 5-year TCO of 9.5–21.5M EUR, significantly below
   full custom build.
2. **Time to market** — Phase 1 (Motor) achievable in 12–18 months.
3. **Risk mitigation** — Commercial core reduces the scope of custom
   development, lowering delivery risk.
4. **Regulatory compliance** — Vendor-maintained regulatory updates reduce
   ongoing compliance burden.
5. **Differentiation preserved** — Custom UX and Swedish integrations allow
   competitive differentiation where it matters.
6. **Phased delivery** — Hybrid approach maps naturally to the phased rollout
   plan (Motor first, then Home & Property, then Commercial).

### Next Steps

1. Issue RFP to Keylane and Sapiens for detailed pricing and implementation
   proposals.
2. Conduct proof-of-concept with top candidate (4–6 weeks).
3. Evaluate Socotra for embedded/partner distribution channel (parallel track).
4. Finalize vendor selection and contract negotiation.

---

## Key Risk Factors

| Risk                                     | Impact   | Mitigation                                                                                                                                                   |
| ---------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Data migration failure                   | Critical | 83% of data migration projects fail or exceed budgets (Gartner). Invest in dedicated migration workstream with early proof-of-concept.                       |
| Swedish integration gaps                 | High     | BankID, Transportstyrelsen, and TFF integrations are not standard in any global platform. Budget for custom development and allocate Swedish domain experts. |
| Vendor lock-in                           | Medium   | Negotiate contract terms for data portability and API access. Design custom components with vendor-agnostic interfaces.                                      |
| Implementation timeline overrun          | High     | Phased implementation (motor first) limits blast radius. Establish clear go/no-go gates between phases.                                                      |
| Organizational change management         | Medium   | Legacy system knowledge is tribal. Invest in documentation and knowledge transfer before decommissioning.                                                    |
| Regulatory changes during implementation | Medium   | Select vendor with track record of regulatory update support in Nordic markets.                                                                              |

### Lessons from the Industry

- **Phased implementation is strongly recommended.** Starting with motor
  insurance (Phase 1) limits risk and provides early validation of the chosen
  platform.
- **Data migration is the highest-risk workstream.** Plan for parallel running
  and staged cutover rather than big-bang migration.
- **Swedish-specific integrations are unavoidable custom work.** No global
  platform provides native support for BankID authentication,
  Transportstyrelsen vehicle registry lookups, or TFF (Trafikförsäkringsföreningen)
  data exchange.

---

## Sources

- Guidewire press releases — If P&C partnership (March 2025), Trygg-Hansa
  ClaimCenter deployment (March 2024)
- Sapiens/Folksam IDITSuite implementation announcement (2019)
- Socotra/If P&C embedded insurance launch (May 2025)
- Folksam/Kyndryl mainframe migration deal (January 2026)
- McKinsey & Company — "How P&C Insurers Can Successfully Modernize Core
  Systems"
- Boston Consulting Group — "Three Paths to Modernizing Core IT for Insurers"
- Gartner — Data migration failure rate statistics
