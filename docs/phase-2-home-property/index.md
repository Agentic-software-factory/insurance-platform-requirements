---
sidebar_position: 1
---

# Phase 2 — Home & Property Insurance

Home and property insurance policies covering hemförsäkring (home contents),
villahemförsäkring (homeowner), bostadsrättsförsäkring (tenant-owner/BRF),
and fritidshusförsäkring (vacation home).

## Product Types

| Product       | Swedish                | Target Customer       |
| ------------- | ---------------------- | --------------------- |
| Home contents | Hemförsäkring          | Renters (hyresgäster) |
| Homeowner     | Villahemförsäkring     | Villa/house owners    |
| Tenant-owner  | Bostadsrättsförsäkring | BRF apartment owners  |
| Vacation home | Fritidshusförsäkring   | Second home owners    |

## Scope

| Epic                  | Status     | Description                                    |
| --------------------- | ---------- | ---------------------------------------------- |
| Quote and Bind        | Documented | Customer inquiry through policy issuance       |
| Policy Administration | Documented | Mid-term adjustments, endorsements             |
| Claims Handling       | Documented | FNOL through settlement                        |
| Renewals              | Documented | Annual renewal and huvudförfallodag processing |
| Cancellations         | Planned    | Customer and insurer-initiated cancellations   |

## Regulatory Framework

Home and property insurance requirements are subject to the same regulatory
framework as motor insurance. Key regulatory considerations for this phase:

| Regulation | Home & Property Relevance                                                |
| ---------- | ------------------------------------------------------------------------ |
| **FSA**    | Consumer protection, claims handling standards, solvency requirements    |
| **GDPR**   | Property data, tenant/BRF member data, claims documentation, consent     |
| **IDD**    | Demands-and-needs assessment for coverage tiers, product governance, KID |

See the [regulatory section](../regulatory/fsa-requirements.md) for full
requirement details.

## Documentation

### User Stories

- [Quote and Bind](user-stories/quote-and-bind.md) — 10 user stories covering
  the end-to-end quote and bind flow (HQB-01 through HQB-10)
- [Policy Administration](user-stories/policy-administration.md) — 12 user
  stories covering mid-term adjustments, BRF administration, and policy
  lifecycle management (HPA-01 through HPA-12)
- [Water Damage Claims](user-stories/index.md#water-damage-claims-vattenskada) —
  15 user stories covering the water damage claim lifecycle (US-HCW-001
  through US-HCW-015)
- [Fire & Natural Events](user-stories/index.md#fire--natural-events-brandnaturhändelser) —
  12 user stories covering emergency FNOL, structural inspection, total loss
  assessment, rebuild coordination, and subrogation (US-HCF-001 through
  US-HCF-012)
- [Burglary and Theft](user-stories/burglary-and-theft.md) — 12 user stories
  covering burglary claims, stolen property, allrisk/drulle, and crisis
  support (HCB-01 through HCB-12)
- [Liability & Legal Expenses](user-stories/liability-and-legal.md) — 10 user
  stories covering liability claims (ansvarsskydd), legal expenses
  (rättsskydd), settlement negotiation, defense, and BRF boundary
  determination (HCL-01 through HCL-10)
- [Home Renewals](user-stories/home-renewals.md) — 10 user stories covering
  annual renewal, index adjustments, premium recalculation, and coverage
  modifications (HRN-01 through HRN-10)

### Use Cases

- [Quote and Bind Home Insurance](use-cases/quote-and-bind.md) — Complete
  use case (UC-HQB-001) with main success scenario, alternative flows,
  business rules, and regulatory compliance mapping
- [Policy Administration](use-cases/policy-administration.md) — 3 use cases
  covering mid-term modifications (UC-HPA-001), BRF building administration
  (UC-HPA-002), and family member management (UC-HPA-003)
- [Water Damage Claim Lifecycle](use-cases/uc-water-damage-lifecycle.md) —
  Complete use case (UC-HCW-001) covering FNOL through settlement and closure
- [Fire/Natural Event Claim Lifecycle](use-cases/uc-fire-natural-event-lifecycle.md) —
  Complete use case (UC-HCF-001) covering emergency FNOL through structural
  assessment, total/partial loss determination, restoration, and closure
- [Burglary Claim Processing](use-cases/burglary-and-theft.md) — Complete
  use case (UC-HCB-001) covering emergency response, FNOL, fraud screening,
  settlement with åldersavdrag, and allrisk/drulle claims
- [Liability Claim Assessment](use-cases/uc-liability-claim-lifecycle.md) —
  Complete use case (UC-HCL-001) covering liability assessment, settlement
  negotiation, defense against unfounded claims, and cross-insurer coordination
- [Legal Expenses Management](use-cases/uc-legal-expenses-lifecycle.md) —
  Complete use case (UC-HCL-002) covering rättsskydd application, eligibility
  verification, lawyer approval, cost tracking, and dispute resolution
- [Annual Home Insurance Renewal](use-cases/home-renewals.md) — Complete
  use case (UC-HRN-001) covering index adjustments, premium recalculation,
  renewal notices, and customer response handling
