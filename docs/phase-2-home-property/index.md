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
| Policy Administration | Planned    | Mid-term adjustments, endorsements             |
| Claims Handling       | Planned    | FNOL through settlement                        |
| Renewals              | Planned    | Annual renewal and huvudförfallodag processing |
| Cancellations         | Planned    | Customer and insurer-initiated cancellations   |

## Documentation

### User Stories

- [Quote and Bind](user-stories/quote-and-bind.md) — 10 user stories covering
  the end-to-end quote and bind flow (HQB-01 through HQB-10)
- [Water Damage Claims](user-stories/index.md#water-damage-claims-vattenskada) —
  15 user stories covering the water damage claim lifecycle (US-HCW-001
  through US-HCW-015)
- [Burglary and Theft](user-stories/burglary-and-theft.md) — 12 user stories
  covering burglary claims, stolen property, allrisk/drulle, and crisis
  support (HCB-01 through HCB-12)

### Use Cases

- [Quote and Bind Home Insurance](use-cases/quote-and-bind.md) — Complete
  use case (UC-HQB-001) with main success scenario, alternative flows,
  business rules, and regulatory compliance mapping
- [Water Damage Claim Lifecycle](use-cases/uc-water-damage-lifecycle.md) —
  Complete use case (UC-HCW-001) covering FNOL through settlement and closure
- [Burglary Claim Processing](use-cases/burglary-and-theft.md) — Complete
  use case (UC-HCB-001) covering emergency response, FNOL, fraud screening,
  settlement with åldersavdrag, and allrisk/drulle claims
