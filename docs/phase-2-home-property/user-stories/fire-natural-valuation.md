---
sidebar_position: 36
---

# US-HCF-007: Explain Rebuild Cost vs Market Value Settlement

## User Story

**As a** customer (privatkund),
**I want to** understand the difference between nybyggnadsvärde (rebuild cost) and marknadsvärde (market value),
**so that** I know what settlement amount I will receive.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Settlement basis (rebuild cost vs market value) is the most common source of confusion and disputes in total loss claims. Clear communication reduces complaints.

## Acceptance Criteria

- **GIVEN** a fire/natural event claim has been determined as total loss
  **WHEN** the claims handler presents the settlement options to the customer
  **THEN** the system generates a clear explanation of the two settlement bases: nybyggnadsvärde (what it costs to rebuild the same property) and marknadsvärde (what the property is worth on the open market)

- **GIVEN** the customer's policy is fullvärdesförsäkring (full value insurance)
  **WHEN** the system calculates the settlement
  **THEN** the settlement is based on nybyggnadsvärde (rebuild cost) without a fixed sum cap, and the system displays: estimated rebuild cost, any applicable deductions, deductible (självrisk), and net settlement amount

- **GIVEN** the customer's policy specifies a fixed sum insured (försäkringsbelopp)
  **WHEN** the system calculates the settlement
  **THEN** the settlement is the lesser of the actual rebuild cost and the sum insured, and the system checks for underinsurance (underförsäkring) per FSA-016

- **GIVEN** the rebuild cost exceeds the sum insured (underinsurance scenario)
  **WHEN** the system detects underinsurance
  **THEN** the system calculates the proportional settlement (proportional settlement = claim amount x sum insured / rebuild cost), displays a clear explanation of underinsurance to the customer, and records the underinsurance finding

- **GIVEN** the customer chooses not to rebuild at the same location
  **WHEN** the customer opts for a cash settlement instead
  **THEN** the system calculates the settlement based on marknadsvärde or rebuild cost (per policy terms), minus site clearance costs if the insurer bears those, and presents the settlement to the customer

- **GIVEN** the settlement explanation has been presented
  **WHEN** the customer reviews the settlement
  **THEN** the system records the customer's acknowledgment or dispute and provides the FSA complaints procedure reference if the customer disagrees

## Settlement Basis Comparison

| Settlement Basis        | Swedish Term             | Description                                            | When Applied                         |
| ----------------------- | ------------------------ | ------------------------------------------------------ | ------------------------------------ |
| Rebuild cost            | Nybyggnadsvärde          | Cost to rebuild the same property at the same location | Fullvärdesförsäkring, rebuild chosen |
| Market value            | Marknadsvärde            | Current market sale price of the property              | Cash settlement, older policies      |
| Sum insured             | Försäkringsbelopp        | Fixed coverage amount stated in the policy             | Fixed-sum policies                   |
| Proportional settlement | Proportionell ersättning | Reduced settlement due to underinsurance               | When sum insured < rebuild cost      |

## Regulatory

- **FSA-016** — Building valuation: the insurer must ensure adequate sum insured and apply underinsurance rules correctly; the customer must be informed of underinsurance implications
- **FSA-010** — Fair and timely claims settlement: the settlement must be fair and based on transparent calculations
- **FSA-004** — Consumer protection: the settlement explanation must be in clear, plain language so the customer can understand the basis
- **FSA-011** — Complaints handling: the customer must be informed of the complaints procedure if they dispute the settlement basis
- **FSA-014** — Record keeping: settlement calculations and customer communications must be retained for 10 years

## Dependencies

- Depends on US-HCF-004 (Assess Total Loss vs Partial Loss)
- Building valuation data (rebuild cost estimate from Lantmäteriet or valuation tool)
- Policy terms specifying settlement basis

## Notes

- Nybyggnadsvärde (rebuild cost) is typically the more favorable basis for the customer and is standard in modern fullvärdesförsäkring policies
- Marknadsvärde may be lower than rebuild cost in rural areas where property values are below construction costs, or higher in urban areas
- Underinsurance disputes are among the most common complaints in total loss claims — clear pre-loss communication (at policy inception and renewal) is the best prevention
- The customer may choose to rebuild at a different location; policy terms determine whether this affects the settlement amount
