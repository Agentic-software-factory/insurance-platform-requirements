---
sidebar_position: 20
---

# US-HCW-011: Calculate Settlement With Age Deduction

## User Story

**As a** claims handler (skadereglerare),
**I want to** calculate the settlement amount considering åldersavdrag (age deduction) for affected materials and fixtures,
**so that** the payment reflects fair value based on the age and condition of the damaged property.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Age deduction is a standard element of Swedish home insurance settlement calculations and must be applied correctly.

## Acceptance Criteria

- **GIVEN** a water damage claim has been approved and the repair scope is defined
  **WHEN** the claims handler calculates the settlement
  **THEN** the system applies åldersavdrag (age deduction) based on the age and type of damaged materials, using the insurer's published deduction tables

- **GIVEN** the settlement calculation includes age deduction
  **WHEN** the system calculates the net settlement
  **THEN** the calculation follows the formula: Replacement cost − Age deduction − Deductible (självrisk) = Net settlement amount

- **GIVEN** the settlement has been calculated
  **WHEN** the claims handler presents the settlement to the customer
  **THEN** the system generates a clear breakdown showing replacement cost, age deduction per item category, deductible, and the net settlement amount

- **GIVEN** a customer disputes the age deduction applied
  **WHEN** the customer provides evidence that the materials were newer than assumed
  **THEN** the claims handler can override the default age deduction with documented justification

- **GIVEN** the claim involves both BRF building insurance and individual bostadsrättsförsäkring
  **WHEN** the settlement is calculated
  **THEN** the system calculates separate settlement amounts for the BRF portion and the individual portion, each with their own deductibles and age deductions

## Age Deduction (Åldersavdrag) Tables

| Material/Fixture                  | Deduction Start | Annual Deduction | Maximum Deduction |
| --------------------------------- | --------------- | ---------------- | ----------------- |
| Bathroom waterproofing (tätskikt) | Year 6          | 2% per year      | 50%               |
| Kitchen appliances                | Year 3          | 5% per year      | 70%               |
| Flooring (wood/laminate)          | Year 5          | 3% per year      | 60%               |
| Pipes (visible)                   | Year 10         | 2% per year      | 50%               |
| Pipes (concealed)                 | Year 15         | 1% per year      | 40%               |
| Interior walls/ceilings           | Year 5          | 2% per year      | 50%               |

## Settlement Formula

```text
Replacement Cost (per item category)
− Åldersavdrag (age deduction per category)
= Adjusted Replacement Value

Total Adjusted Replacement Value
+ Drying Costs (approved)
+ Temporary Housing Costs (if applicable)
− Självrisk (deductible)
= Net Settlement Amount
```

## Regulatory

- **FSA-010** — Fair and timely claims settlement: settlement amounts must be fair, transparently calculated, and paid without undue delay
- **FSA-004** — Consumer protection: the age deduction calculation must be explained to the customer in plain language
- **FSA-014** — Record keeping: settlement calculations and all supporting documentation must be retained for 10 years

## Dependencies

- Depends on US-HCW-009 (Approve Repair Scope and Contractor) — repair scope defines settlement items
- Depends on US-HCW-008 (Submit Drying Protocol) — drying costs are part of the settlement
- Depends on US-HCW-010 (Temporary Housing) — housing costs included if applicable
- Age deduction tables maintained in system configuration

## Notes

- Age deduction tables are product-specific and may vary between insurers; TryggFörsäkring's tables must be published in the policy terms
- Customers often find age deductions surprising — clear communication at settlement is essential to reduce complaints
- For newly renovated bathrooms, the customer should be advised to save receipts as proof of renovation date
