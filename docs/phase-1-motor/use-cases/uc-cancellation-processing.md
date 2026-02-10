---
sidebar_position: 20
---

# UC-CAN-001: Policy Cancellation Processing

## Overview

This use case describes the end-to-end policy cancellation process — from the customer initiating a cancellation request through reason determination, replacement coverage verification (for trafikförsäkring), refund calculation, and regulatory notifications. The process must handle all cancellation types: ångerrätt (cooling-off), huvudförfallodag, vehicle sold, vehicle scrapped/deregistered, and insurer-initiated cancellations.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** [System Administrator](../../actors/internal/system-administrator.md), [Underwriter (Riskbedömare)](../../actors/internal/underwriter.md), [Transportstyrelsen](../../actors/external/transportstyrelsen.md), [Trafikförsäkringsföreningen (TFF)](../../actors/external/tff.md), [Payment Provider](../../actors/external/payment-provider.md)

## Preconditions

1. The customer has an active motor insurance policy
2. The customer is authenticated (via BankID for online requests)
3. The policy is not already in a pending cancellation state

## Postconditions

**Success:**

- The policy status is set to "Cancelled" with the correct effective date
- A cancellation record exists with the reason, effective date, and refund details
- Transportstyrelsen has been notified of the policy termination
- The customer has received a cancellation confirmation
- Any applicable refund has been calculated and queued for payment

**Failure:**

- The cancellation is blocked because mandatory trafikförsäkring replacement is missing (customer informed)
- The cancellation is blocked due to an outstanding claim under investigation (customer informed)
- The system is unable to complete the request (customer directed to contact customer service)

## Main Flow (Customer-Initiated Online Cancellation)

| Step | Actor    | Action                                                                          | System Response                                                                                |
| ---- | -------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1    | Customer | Logs in and navigates to the policy management page                             | System displays active policies                                                                |
| 2    | Customer | Selects the policy to cancel and clicks "Cancel my policy" (Säg upp försäkring) | System opens the cancellation wizard                                                           |
| 3    | Customer | Selects the cancellation reason from a predefined list                          | System determines the cancellation type and applicable rules                                   |
| 4    | System   | Evaluates cancellation type (ångerrätt, huvudförfallodag, vehicle sold, etc.)   | System calculates the effective cancellation date based on rules                               |
| 5    | System   | Checks whether the policy includes trafikförsäkring                             | If yes, initiates replacement coverage verification (see Alternative Flow A)                   |
| 6    | System   | Calculates the refund amount based on the cancellation type and effective date  | System displays refund breakdown to the customer                                               |
| 7    | Customer | Reviews the cancellation summary: effective date, refund amount, consequences   | System shows a confirmation screen                                                             |
| 8    | Customer | Confirms the cancellation                                                       | System creates the cancellation record and updates the policy status to "Pending cancellation" |
| 9    | System   | Sends cancellation notification to Transportstyrelsen                           | Transportstyrelsen acknowledges receipt                                                        |
| 10   | System   | Processes the refund via the Payment Provider                                   | Refund is queued for payment to the customer                                                   |
| 11   | System   | Sends cancellation confirmation to the customer (email and/or letter)           | Customer receives confirmation with cancellation details and refund information                |
| 12   | System   | On the effective date, sets policy status to "Cancelled"                        | Policy is terminated                                                                           |

## Alternative Flow A: Trafikförsäkring Replacement Verification

| Step | Actor    | Action                                                                                    | System Response                                     |
| ---- | -------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| A1   | System   | Queries Transportstyrelsen for replacement trafikförsäkring on the vehicle                | System receives coverage status                     |
| A2a  | System   | Replacement coverage confirmed                                                            | Cancellation proceeds to Step 6 of the main flow    |
| A2b  | System   | No replacement coverage found and vehicle is still registered                             | System blocks cancellation and informs the customer |
| A3   | Customer | Provides proof of new coverage (policy number from new insurer) or vehicle deregistration | System validates the proof                          |
| A4   | System   | Proof accepted                                                                            | Cancellation proceeds to Step 6 of the main flow    |

## Alternative Flow B: Ångerrätt (Cooling-Off) Cancellation

| Step | Actor    | Action                                                                                | System Response                                         |
| ---- | -------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| B1   | System   | Detects that the policy is within 14 days of the contract conclusion date             | System flags the cancellation as ångerrätt              |
| B2   | System   | Calculates full refund (minus any days of coverage used if early start was requested) | System displays the ångerrätt refund amount             |
| B3   | Customer | Confirms the ångerrätt cancellation                                                   | System processes the cancellation with immediate effect |
| B4   | System   | Proceeds with Transportstyrelsen notification and refund processing                   | Same as main flow Steps 9–12                            |

## Alternative Flow C: Insurer-Initiated Cancellation (Non-Payment)

| Step | Actor            | Action                                                                             | System Response                                  |
| ---- | ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------ |
| C1   | System           | Detects overdue premium payment beyond the grace period                            | System generates a cancellation warning          |
| C2   | System           | Sends the customer a written cancellation warning with a 14-day remediation period | Customer is notified via registered mail         |
| C3a  | Customer         | Pays the outstanding premium within 14 days                                        | Cancellation is aborted; policy remains active   |
| C3b  | System           | No payment received after 14 days                                                  | System initiates insurer-initiated cancellation  |
| C4   | Operations Staff | Reviews the insurer-initiated cancellation for approval                            | System requires staff approval before finalising |
| C5   | System           | Finalises the cancellation and calculates any refund (minus outstanding premiums)  | Proceeds with notification and refund steps      |

## Alternative Flow D: Death of Policyholder

| Step | Actor                 | Action                                                           | System Response                                         |
| ---- | --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| D1   | Estate Representative | Contacts TryggFörsäkring to report the policyholder's death      | Operations staff opens a death cancellation case        |
| D2   | Operations Staff      | Verifies the death certificate and identifies policies to cancel | System lists all active policies for the deceased       |
| D3   | Operations Staff      | Initiates cancellation with reason "Death of policyholder"       | System calculates pro-rata refund payable to the estate |
| D4   | System                | Processes the cancellation and notifies Transportstyrelsen       | Refund is issued to the estate's designated account     |

## Alternative Flow E: Emigration

| Step | Actor            | Action                                                                | System Response                                           |
| ---- | ---------------- | --------------------------------------------------------------------- | --------------------------------------------------------- |
| E1   | Customer         | Requests cancellation due to permanent emigration from Sweden         | System opens a cancellation case with reason "Emigration" |
| E2   | Operations Staff | Verifies emigration evidence (e.g., deregistration from Skatteverket) | System validates the documentation                        |
| E3   | System           | Processes the cancellation with the emigration date as effective date | Pro-rata refund is calculated and processed               |
| E4   | System           | Notifies Transportstyrelsen and sends confirmation to the customer    | Cancellation is finalised                                 |

## Validation Rules

| Rule       | Description                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| VR-CAN-001 | Ångerrätt is only valid within 14 calendar days of the contract conclusion date                                 |
| VR-CAN-002 | Huvudförfallodag cancellation requires at least 1 month notice                                                  |
| VR-CAN-003 | Trafikförsäkring cannot be cancelled for a registered vehicle without replacement coverage                      |
| VR-CAN-004 | Insurer-initiated cancellation requires a 14-day written warning before execution                               |
| VR-CAN-005 | The cancellation effective date cannot be in the past (except for vehicle sold/scrapped with retroactive proof) |
| VR-CAN-006 | A policy with an active open claim may require claims handler review before cancellation                        |
| VR-CAN-007 | The online "Cancel my contract" function must be accessible per EU 2023/2673 (from June 2026)                   |

## Data Model

### Cancellation Record

| Field                       | Type      | Required       | Description                                                                                                        |
| --------------------------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Cancellation ID             | String    | Auto-generated | Unique identifier for the cancellation                                                                             |
| Policy number               | String    | Yes            | Link to the cancelled policy                                                                                       |
| Cancellation type           | Enum      | Yes            | ångerrätt, huvudförfallodag, vehicle_sold, vehicle_scrapped, emigration, death, insurer_non_payment, insurer_fraud |
| Cancellation reason         | Text      | Yes            | Free-text or structured reason                                                                                     |
| Request date                | Date      | Auto-set       | When the cancellation was requested                                                                                |
| Effective date              | Date      | Yes            | When coverage ends                                                                                                 |
| Refund amount               | Decimal   | Calculated     | Amount to be refunded                                                                                              |
| Refund status               | Enum      | Auto-set       | pending, processed, paid, not_applicable                                                                           |
| Replacement coverage        | String    | Conditional    | New insurer's policy number (for trafikförsäkring)                                                                 |
| Transportstyrelsen notified | Boolean   | Auto-set       | Whether TS notification has been sent                                                                              |
| Supporting documents        | File[]    | Conditional    | Proof of vehicle sale, deregistration, death certificate, etc.                                                     |
| Processed by                | Reference | Conditional    | Operations staff who processed (for manual cases)                                                                  |
| Created date                | Timestamp | Auto-set       | Record creation timestamp                                                                                          |

## Regulatory

- **FSA-013** — Cancellation and cooling-off rights: all cancellation types must follow statutory rules for notice periods, refunds, and consumer protection
- **FSA-007** — Mandatory trafikförsäkring: cancellation of trafikförsäkring requires replacement coverage verification for registered vehicles
- **FSA-009** — Transportstyrelsen notification: all policy terminations must be reported to the Transport Agency
- **FSA-014** — Record keeping: cancellation records must be retained for 10 years
- **FSA-004** — Consumer protection: the cancellation process must be fair, transparent, and accessible
- **GDPR-002** — Policy administration: personal data from cancelled policies must be retained per retention policy; customer may request data portability
- **GDPR-004** — Transportstyrelsen/TFF reporting: data shared with authorities is under legal obligation
- **IDD-003** — Pre-contractual information: cancellation terms and refund rules must have been disclosed before purchase

## Related User Stories

- [US-CAN-001](../user-stories/cancellation-cooling-off.md) — Cancel Policy Within Cooling-Off Period (Ångerrätt)
- [US-CAN-002](../user-stories/cancellation-huvudforfallodag.md) — Cancel at Huvudförfallodag
- [US-CAN-003](../user-stories/cancellation-vehicle-sold.md) — Cancel Due to Vehicle Sold
- [US-CAN-004](../user-stories/cancellation-vehicle-deregistered.md) — Cancel Due to Vehicle Scrapped or Deregistered
- [US-CAN-005](../user-stories/cancellation-replacement-coverage.md) — Verify Replacement Trafikförsäkring Before Cancellation
- [US-CAN-006](../user-stories/cancellation-transportstyrelsen.md) — Notify Transportstyrelsen of Policy Cancellation
- [US-CAN-007](../user-stories/cancellation-refund.md) — Calculate and Process Premium Refund
- [US-CAN-008](../user-stories/cancellation-emigration.md) — Cancel Due to Emigration
- [US-CAN-009](../user-stories/cancellation-death.md) — Cancel Due to Death of Policyholder
- [US-CAN-010](../user-stories/cancellation-insurer-initiated.md) — Insurer-Initiated Cancellation
- [US-CAN-011](../user-stories/cancellation-eu-online-button.md) — EU Online Cancellation Button (EU 2023/2673)
- [US-CAN-012](../user-stories/cancellation-preview-refund.md) — View Refund Amount Before Confirming Cancellation
