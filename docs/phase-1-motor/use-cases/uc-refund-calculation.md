---
sidebar_position: 21
---

# UC-CAN-002: Premium Refund Calculation

## Overview

This use case details the premium refund calculation and payment process following a policy cancellation. The refund amount varies by cancellation type — from full refund (ångerrätt) to pro-rata refund (vehicle sold/scrapped) to no refund (huvudförfallodag). The customer must see the refund amount before confirming the cancellation.

## Actors

- **Primary:** System
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md), [System Administrator](../../actors/internal/system-administrator.md), [Payment Provider](../../actors/external/payment-provider.md)

## Preconditions

1. A cancellation request has been submitted and the cancellation type has been determined
2. The policy's premium payment history is available
3. The cancellation effective date has been calculated

## Postconditions

**Success:**

- The refund amount has been calculated and displayed to the customer
- Upon cancellation confirmation, the refund has been issued to the original payment method
- A refund record exists with full calculation details and audit trail
- The customer has received a refund confirmation

**Failure:**

- The refund calculation cannot be completed (e.g., missing premium data)
- The Payment Provider rejects the refund (operations staff alerted for manual processing)

## Process Flow

```mermaid
flowchart TD
    subgraph System
        A[Cancellation confirmed]
        B{Cancellation type}
        C[Full refund of premium paid]
        D{Early coverage start?}
        E[Deduct days of coverage used]
        F[Full amount refunded]
        G[No refund - coverage runs to end]
        H[Calculate pro-rata refund]
        I["(Remaining days / 365) x Annual premium"]
        J{Outstanding balance?}
        K[Offset: net refund = gross - outstanding]
        L[Net refund = gross refund]
        M{Net refund positive?}
        O[No refund - inform customer]
    end
    subgraph Payment Provider
        N[Process refund to customer]
        P[Send refund confirmation]
    end

    A --> B
    B -->|"Cooling-off (Angerratt)"| C
    C --> D
    D -->|Yes| E
    D -->|No| F
    B -->|Huvudforfallodag| G
    B -->|Mid-term with reason| H
    H --> I
    I --> J
    E --> J
    F --> J
    J -->|Yes| K
    J -->|No| L
    K --> M
    M -->|Yes| N
    M -->|No| O
    L --> N
    N --> P

    style A fill:#e1f5fe
    style P fill:#e8f5e9
    style G fill:#fff3e0
    style O fill:#fff3e0
```

## State Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Calculated : Refund amount determined
    Calculated --> Approved : Customer confirms cancellation
    Calculated --> NotApplicable : No refund due (huvudforfallodag)
    Approved --> Disbursed : Payment provider processes refund
    Approved --> Failed : Payment provider rejects refund
    Failed --> Disbursed : Alternative payment method used
    Disbursed --> [*]
    NotApplicable --> [*]

    note right of Calculated
        Pro-rata or full refund computed.
        Outstanding balance offset applied.
    end note

    note right of Approved
        Refund breakdown shown to customer.
        Confirmation received.
    end note

    note right of Disbursed
        Refund issued within 30 days.
        Confirmation sent to customer.
    end note
```

## Main Flow (Pro-Rata Refund Calculation)

| Step | Actor    | Action                                                                                                | System Response                                                   |
| ---- | -------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1    | System   | Retrieves the policy's annual premium and payment history                                             | System loads premium amount, payment dates, and amounts paid      |
| 2    | System   | Determines the cancellation effective date and the policy period end date                             | System calculates the number of remaining days in the paid period |
| 3    | System   | Calculates the pro-rata refund: (remaining days / total days in period) × premium paid for the period | System generates the refund amount                                |
| 4    | System   | Checks for any outstanding balance or deductions                                                      | System subtracts unpaid premiums or applicable fees               |
| 5    | System   | Displays the refund breakdown to the customer: premium paid, days used, days remaining, refund amount | Customer reviews the calculation                                  |
| 6    | Customer | Confirms the cancellation and refund                                                                  | System records the refund details                                 |
| 7    | System   | Sends refund instruction to the Payment Provider for the original payment method                      | Payment Provider processes the refund                             |
| 8    | System   | Updates the refund status to "Processed" and sends confirmation to the customer                       | Customer receives refund confirmation with expected payment date  |

## Alternative Flow A: Ångerrätt Full Refund

| Step | Actor  | Action                                                          | System Response                                                   |
| ---- | ------ | --------------------------------------------------------------- | ----------------------------------------------------------------- |
| A1   | System | Detects cancellation type is ångerrätt                          | System applies full refund rules                                  |
| A2   | System | Checks whether the customer requested early coverage start      | If yes, deducts proportional amount for days of coverage provided |
| A3   | System | Calculates refund: full premium minus any early-start deduction | System displays the refund amount                                 |
| A4   | System | Proceeds with refund processing (main flow Steps 6–8)           | Refund issued within 30 days                                      |

## Alternative Flow B: No Refund (Huvudförfallodag)

| Step | Actor  | Action                                                                       | System Response                           |
| ---- | ------ | ---------------------------------------------------------------------------- | ----------------------------------------- |
| B1   | System | Detects cancellation type is huvudförfallodag                                | System identifies no refund is applicable |
| B2   | System | Displays confirmation that no refund is due (coverage runs to end of period) | Customer acknowledges                     |
| B3   | System | Skips refund processing; proceeds to cancellation confirmation               | Cancellation confirmed without refund     |

## Alternative Flow C: Refund With Outstanding Balance Offset

| Step | Actor  | Action                                                                                             | System Response                                          |
| ---- | ------ | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| C1   | System | Detects outstanding premium balance on the policy                                                  | System calculates net refund                             |
| C2   | System | Offsets the refund against the outstanding amount: net refund = gross refund − outstanding balance | System displays the net amount                           |
| C3a  | System | Net refund is positive                                                                             | Refund issued for the net amount                         |
| C3b  | System | Net refund is zero or negative                                                                     | No refund; customer is informed of the remaining balance |

## Alternative Flow D: Payment Provider Rejection

| Step | Actor            | Action                                                     | System Response                                      |
| ---- | ---------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| D1   | System           | Sends refund instruction to Payment Provider               | Payment Provider rejects (e.g., closed bank account) |
| D2   | System           | Marks refund as "Failed" and alerts operations staff       | Operations staff investigates                        |
| D3   | Operations Staff | Contacts the customer to arrange alternative refund method | System updates the refund record                     |
| D4   | System           | Reprocesses the refund with the new payment method         | Refund completed                                     |

## Refund Calculation Formula

| Parameter             | Description                             |
| --------------------- | --------------------------------------- |
| Annual premium (P)    | The total annual premium for the policy |
| Period start date (S) | Start of the current policy period      |
| Cancellation date (C) | Effective cancellation date             |
| Period end date (E)   | End of the current policy period        |
| Days used             | C − S                                   |
| Days remaining        | E − C                                   |
| Total days            | E − S                                   |
| Gross refund          | (Days remaining / Total days) × P       |
| Net refund            | Gross refund − outstanding balance      |

## Validation Rules

| Rule       | Description                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| VR-REF-001 | Refund amount must not exceed the total premium paid for the current period                           |
| VR-REF-002 | Refund calculation must use calendar days (not business days)                                         |
| VR-REF-003 | No administrative fees may be deducted from the refund amount                                         |
| VR-REF-004 | Refund must be issued within 30 calendar days of cancellation confirmation                            |
| VR-REF-005 | The refund breakdown must be displayed to the customer before confirmation                            |
| VR-REF-006 | Monthly-payment customers: refund is calculated only for prepaid amounts beyond the cancellation date |

## Regulatory

- **FSA-013** — Cancellation and cooling-off rights: refund calculations must follow statutory rules for each cancellation type
- **FSA-004** — Consumer protection and fair treatment: transparent calculations, no hidden deductions, refund displayed before confirmation
- **GDPR-002** — Policy administration: refund and payment records are retained per data retention policy
- **IDD-003** — Pre-contractual information: refund rules must have been disclosed to the customer before policy purchase

## Related User Stories

- [US-CAN-007](../user-stories/cancellation-refund.md) — Calculate and Process Premium Refund
- [US-CAN-001](../user-stories/cancellation-cooling-off.md) — Cancel Policy Within Cooling-Off Period (Ångerrätt)
- [US-CAN-003](../user-stories/cancellation-vehicle-sold.md) — Cancel Due to Vehicle Sold
- [US-CAN-004](../user-stories/cancellation-vehicle-deregistered.md) — Cancel Due to Vehicle Scrapped or Deregistered
- [US-CAN-012](../user-stories/cancellation-preview-refund.md) — View Refund Amount Before Confirming Cancellation
