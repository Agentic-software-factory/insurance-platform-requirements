---
sidebar_position: 21
---

# US-HCW-012: View Deductible (Självrisk) for Claim

## User Story

**As a** customer (privatkund),
**I want to** understand what my deductible (självrisk) is for this water damage claim,
**so that** I know my out-of-pocket cost before the settlement is processed.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)

## Priority

**Must Have** — Deductible transparency is required for fair claims handling and reduces post-settlement complaints.

## Acceptance Criteria

- **GIVEN** a customer has an active water damage claim
  **WHEN** the customer views the claim details in the web portal or mobile app
  **THEN** the system displays the applicable deductible amount based on the policy terms and the claim type

- **GIVEN** a customer's policy has a variable deductible (valbar självrisk)
  **WHEN** the system determines the deductible for a water damage claim
  **THEN** the system applies the deductible level selected at policy purchase (e.g., SEK 1,500, SEK 3,000, SEK 5,000)

- **GIVEN** the water damage claim involves both the BRF building insurance and the individual's policy
  **WHEN** the customer views the deductible information
  **THEN** the system shows the deductible applicable to the individual's policy only (the BRF's deductible is the BRF's responsibility)

- **GIVEN** the claims handler presents the settlement offer to the customer
  **WHEN** the customer reviews the settlement breakdown
  **THEN** the deductible is clearly itemized as a separate line, showing how it reduces the net settlement amount

## Deductible Structure

| Policy Type            | Typical Deductible Range | Notes                           |
| ---------------------- | ------------------------ | ------------------------------- |
| Hemförsäkring (rental) | SEK 1,500 -- 3,000       | Fixed or selectable at purchase |
| Bostadsrättsförsäkring | SEK 1,500 -- 5,000       | Selectable at purchase          |
| Villahemförsäkring     | SEK 3,000 -- 10,000      | Selectable at purchase          |
| BRF building insurance | SEK 10,000 -- 50,000     | Set by BRF board                |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the deductible must be correctly applied and clearly communicated
- **FSA-004** — Consumer protection: the customer must understand their out-of-pocket cost before settlement
- **FSA-012** — Insurance contract disclosure: deductible terms must be clearly stated in the policy and IPID

## Dependencies

- Depends on US-HCW-001 (Water Damage FNOL) — claim must be registered
- Policy terms and deductible configuration

## Notes

- Some policies offer a reduced deductible for water damage caused by sudden and unforeseen events vs. gradual damage
- The deductible is typically deducted from the settlement payment, not paid separately by the customer
- For direct repair billing, the customer pays the deductible directly to the contractor
