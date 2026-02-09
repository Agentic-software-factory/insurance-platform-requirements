---
sidebar_position: 12
---

# UC-CLM-003: Settlement Calculation and Payment

## Overview

This use case describes the settlement calculation and payment process for approved motor insurance claims. It covers the rules for calculating settlement amounts across different claim types (repair, total loss, glass, theft, personal injury) and the payment execution flow.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Claims Adjuster (Värderare)](../../actors/internal-actors.md#claims-adjuster-värderare), [Payment Provider (Betalningsleverantör)](../../actors/external-actors.md#payment-provider), [Repair Shop (Verkstad)](../../actors/external-actors.md#repair-shop-verkstad)

## Preconditions

1. The claim has been approved (status: "Approved" / Godkänd)
2. Damage assessment is complete (for vehicle damage claims)
3. Liability determination is complete (for multi-party claims)

## Postconditions

**Success:**

- Settlement amount has been calculated and documented
- Payment has been issued and confirmed
- Claim status is updated to "Settled" (Reglerad)
- Payment records are stored for audit and regulatory compliance

**Failure:**

- Payment fails (e.g., invalid bank details, payment provider error)
- Claims handler is notified and payment is retried or alternative payment method is used

## Main Flow: Vehicle Repair Settlement

| Step | Actor          | Action                                              | System Response                                                                      |
| ---- | -------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1    | Claims Handler | Opens the approved claim for settlement             | System displays the damage assessment with approved repair estimate                  |
| 2    | System         | Calculates settlement: repair cost minus deductible | System displays the calculated settlement amount with breakdown                      |
| 3    | Claims Handler | Verifies the calculation and selects payment method | System presents options: direct payment to customer or direct billing to repair shop |
| 4a   | Claims Handler | Selects direct billing to repair shop               | System sends repair authorization to the shop; customer pays deductible to shop      |
| 4b   | Claims Handler | Selects payment to customer                         | System initiates bank transfer to customer's registered account                      |
| 5    | System         | Processes the payment via payment provider          | System records payment status and updates claim status                               |
| 6    | System         | Confirms payment completion                         | Claim status changes to "Settled" (Reglerad)                                         |

## Alternative Flow: Total Loss Settlement

| Step | Actor           | Action                                                                        | System Response                                                       |
| ---- | --------------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1    | Claims Adjuster | Declares the vehicle a total loss (repair cost > threshold % of market value) | System flags the claim for total loss processing                      |
| 2    | System          | Calculates vehicle market value using industry valuation data                 | System displays the market value with valuation methodology           |
| 3    | Claims Handler  | Reviews the total loss valuation                                              | Handler may adjust within guidelines or request independent valuation |
| 4    | System          | Calculates settlement: market value − deductible − salvage value              | System displays the total loss settlement breakdown                   |
| 5    | Claims Handler  | Confirms the settlement and initiates payment                                 | System processes payment to the customer                              |
| 6    | System          | Records the settlement and updates claim status                               | Claim status changes to "Settled"                                     |

## Alternative Flow: Liability-Split Settlement

| Step | Actor          | Action                                                  | System Response                                                                               |
| ---- | -------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 1    | Claims Handler | Opens a claim with shared liability (e.g., 70/30 split) | System displays the liability determination and damage assessment                             |
| 2    | System         | Calculates the policyholder's share of the damage       | Settlement = (total damage × policyholder's non-fault percentage) − deductible                |
| 3    | Claims Handler | Reviews and confirms the adjusted settlement            | System processes payment for the adjusted amount                                              |
| 4    | Claims Handler | Initiates subrogation for the at-fault party's share    | System creates a subrogation record (see [US-CLM-009](../user-stories/claims-subrogation.md)) |

## Alternative Flow: Trafikförsäkring Personal Injury Settlement

| Step | Actor          | Action                                                   | System Response                                                                        |
| ---- | -------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 1    | Claims Handler | Opens a personal injury claim with medical documentation | System displays injury details and compensation components                             |
| 2    | Claims Handler | Enters compensation amounts per component                | System calculates total: medical costs + income loss + pain and suffering + disability |
| 3    | Claims Handler | Reviews the total compensation                           | No deductible applies to trafikförsäkring personal injury claims                       |
| 4    | System         | Processes interim or final payment to the injured party  | System records the payment and tracks remaining compensation if applicable             |

## Settlement Calculation Rules

### Repair Settlement

```text
Settlement = Approved Repair Cost − Applicable Deductible (självrisk)
```

- Repair cost is based on the approved damage assessment estimate
- Deductible is determined by the policy terms and claim type
- If the policyholder is partially at fault in a multi-party incident, the settlement is adjusted by the non-fault percentage

### Total Loss Settlement

```text
Settlement = Vehicle Market Value − Deductible − Salvage Value
```

- Market value is the vehicle's fair market value at the time of loss
- Salvage value is deducted if the customer retains the damaged vehicle
- Total loss threshold: repair cost exceeds a configurable percentage (typically 75%) of market value

### Glass Settlement

```text
Settlement = Glass Repair/Replacement Cost − Glass Deductible
```

- Glass claims typically have a lower deductible than other claim types
- Repair (if possible) is preferred over full replacement

### Theft Settlement

```text
If vehicle not recovered:
  Settlement = Vehicle Market Value at Time of Theft − Deductible

If vehicle recovered with damage:
  Settlement = Repair Cost − Deductible
```

- A waiting period may apply before settling a theft claim (to allow for recovery)

## Payment Methods

| Method                        | Use Case                               | Details                                       |
| ----------------------------- | -------------------------------------- | --------------------------------------------- |
| Bank transfer to customer     | Standard settlement payment            | Uses customer's registered bank account       |
| Direct billing to repair shop | Network shop repair                    | Shop invoices TryggFörsäkring directly        |
| Bank transfer to third party  | Third-party liability settlement       | Payment to the injured party or their insurer |
| Interim payment               | Personal injury with ongoing treatment | Partial payments while claim remains open     |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: settlement must be calculated fairly and paid promptly; the customer must receive a clear explanation of the calculation
- **FSA-004** — Consumer protection: settlement breakdowns must be transparent and in plain language
- **FSA-014** — Record keeping: all settlement calculations, payment records, and supporting documentation must be retained for 10 years
- **GDPR-003** — Claims processing: payment data (bank accounts) must be handled securely with purpose limitation
- **GDPR-001** — Customer bank details must be collected and stored securely; used only for claim payments

## Related User Stories

- [US-CLM-005](../user-stories/claims-damage-assessment.md) — Assess Vehicle Damage
- [US-CLM-007](../user-stories/claims-decision.md) — Approve or Deny a Claim
- [US-CLM-008](../user-stories/claims-settlement.md) — Calculate and Process Settlement
- [US-CLM-014](../user-stories/claims-repair-authorization.md) — Authorize Repairs at Network Shops
