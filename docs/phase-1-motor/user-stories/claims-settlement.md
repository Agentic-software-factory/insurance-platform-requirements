---
sidebar_position: 17
---

# US-CLM-008: Calculate and Process Settlement

## User Story

**As a** claims handler (skadereglerare),
**I want to** calculate the correct settlement amount including deductibles, depreciation, and applicable rules,
**so that** the customer receives a fair and accurate payment.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Payment Provider (Betalningsleverantör)](../../actors/external-actors.md#payment-provider)

## Priority

**Must Have** — Settlement calculation and payment are the core outcome of the claims process.

## Acceptance Criteria

- **GIVEN** a claim has been approved
  **WHEN** the system calculates the settlement
  **THEN** the calculation includes: repair cost (or market value for total loss), minus the applicable deductible (självrisk), minus depreciation if applicable, adjusted for the liability split

- **GIVEN** a customer wants to know their deductible before proceeding
  **WHEN** the customer views claim details
  **THEN** the system displays the applicable deductible amount (självrisk) based on the claim type and policy terms

- **GIVEN** a claim is for vehicle repair
  **WHEN** the settlement is calculated
  **THEN** the system uses the approved repair estimate from the damage assessment (US-CLM-005) and subtracts the deductible

- **GIVEN** a claim is for a total loss (totalförlust)
  **WHEN** the settlement is calculated
  **THEN** the system calculates: vehicle market value at time of loss, minus deductible, minus salvage value (if the customer retains the vehicle)

- **GIVEN** a settlement has been calculated
  **WHEN** the claims handler approves the payment
  **THEN** the system initiates payment to the designated payee (customer bank account, repair shop, or third party) via the payment provider

- **GIVEN** a settlement payment is for direct repair shop billing
  **WHEN** the claims handler authorizes the repair
  **THEN** the system sends a repair authorization to the repair shop with the approved repair scope and amount, and the customer pays only the deductible to the shop

- **GIVEN** a settlement is paid
  **WHEN** the payment is confirmed by the payment provider
  **THEN** the system updates the claim status to "Settled" (Reglerad) and records the payment details (amount, date, payee, payment reference)

## Settlement Calculation Rules

| Claim Type            | Calculation                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Repair (vagnskada)    | Approved repair cost − deductible                                                                                  |
| Total loss            | Market value − deductible − salvage value                                                                          |
| Glass (glasskada)     | Repair/replacement cost − glass deductible (often lower)                                                           |
| Theft (stöld)         | Market value at time of theft − deductible (if not recovered); repair cost − deductible (if recovered with damage) |
| Third-party liability | Actual damage to third party (no deductible for trafikförsäkring injury claims)                                    |
| Personal injury       | Per Trafikskadelagen compensation schedule (medical costs, income loss, pain and suffering)                        |

## Deductible (Självrisk) Structure

| Coverage                           | Typical Deductible Range | Notes                                           |
| ---------------------------------- | ------------------------ | ----------------------------------------------- |
| Collision (vagnskada)              | SEK 3,000–10,000         | Selected at policy purchase                     |
| Theft (stöld)                      | SEK 1,500–3,000          | May vary by policy                              |
| Fire (brand)                       | SEK 1,500–3,000          | May vary by policy                              |
| Glass (glasskada)                  | SEK 500–2,000            | Often a lower deductible                        |
| Trafikförsäkring (personal injury) | No deductible            | Mandatory coverage, no excess for injury claims |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: settlement amounts must be fair and calculated transparently; payment must be made without undue delay
- **FSA-004** — Consumer protection: the settlement calculation must be explained to the customer in plain language
- **FSA-014** — Record keeping: settlement calculations, payment records, and all supporting documentation must be retained for 10 years
- **GDPR-003** — Claims processing: payment data (bank account details) must be handled securely and retained per GDPR requirements

## Dependencies

- Depends on US-CLM-007 (Claims Decision) — claim must be approved before settlement
- Depends on US-CLM-005 (Damage Assessment) — for repair cost or total loss valuation
- Payment provider integration for disbursement

## Notes

- For multi-party claims where liability is shared, the settlement amount is adjusted according to the liability split (e.g., if the policyholder is 30% at fault, they bear 30% of their own damage)
- VAT handling on repair costs must follow applicable rules
- Customers may dispute settlement amounts through the complaints procedure (FSA-011)
