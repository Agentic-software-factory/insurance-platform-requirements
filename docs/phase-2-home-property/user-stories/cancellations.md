---
sidebar_position: 5
---

# Home Insurance Cancellations — User Stories

User stories for home insurance cancellation (uppsägning) processing. Covers
customer-initiated cancellations (ångerrätt, property sale, address change,
insurer switch, EU online cancellation button), insurer-initiated cancellations
(non-payment, material misrepresentation), pro-rata refund calculation, and
coverage gap prevention when switching insurers.

## Overview

| ID     | Actor                  | Summary                                                      |
| ------ | ---------------------- | ------------------------------------------------------------ |
| HCA-01 | Customer               | Cancel home insurance within 14-day ångerrätt period         |
| HCA-02 | Customer               | Cancel when property is sold (försäljning)                   |
| HCA-03 | Customer               | Cancel when moving to a new address                          |
| HCA-04 | Customer               | Switch to a competitor insurer at renewal                    |
| HCA-05 | Customer               | Cancel using the EU online cancellation button               |
| HCA-06 | Underwriter            | Cancel a policy due to non-payment after statutory reminders |
| HCA-07 | Underwriter            | Cancel a policy due to material misrepresentation            |
| HCA-08 | System                 | Calculate pro-rata refund for remaining policy period        |
| HCA-09 | System                 | Ensure no coverage gap when customer switches insurer        |
| HCA-10 | Customer Service Agent | Preview refund amount before confirming cancellation         |

---

## HCA-01: Cancel Within 14-Day Ångerrätt Period

**As a** customer (privatkund),
**I want to** cancel my home insurance within the 14-day ångerrätt
(cooling-off) period,
**so that** I receive a full refund with no penalty.

### Acceptance Criteria

- **GIVEN** the customer purchased a home insurance policy via a distance
  channel (web, phone, app)
  **WHEN** the customer requests cancellation within 14 calendar days of the
  contract conclusion date
  **THEN** the system processes an immediate cancellation with a full premium
  refund and no cancellation fee

- **GIVEN** the customer requests cancellation within the ångerrätt period
  **WHEN** the system processes the cancellation
  **THEN** the system records the cancellation reason as "Ångerrätt" and marks
  the cancellation effective immediately

- **GIVEN** the customer has made a claim during the ångerrätt period
  **WHEN** the customer requests cancellation
  **THEN** the system deducts the cost of any claims paid from the refund
  amount per Försäkringsavtalslagen and informs the customer of the adjusted
  refund

- **GIVEN** the ångerrätt period has expired (>14 days from contract conclusion)
  **WHEN** the customer attempts to use ångerrätt cancellation
  **THEN** the system informs the customer that the cooling-off period has
  expired and offers ordinary cancellation with pro-rata refund instead

- **GIVEN** the customer cancels within ångerrätt
  **WHEN** the cancellation is confirmed
  **THEN** the system sends a cancellation confirmation to the customer via
  email/post with the refund amount and expected payment date

### Data Requirements

| Data Element              | Source         | Required |
| ------------------------- | -------------- | -------- |
| Contract conclusion date  | System record  | Yes      |
| Cancellation request date | Customer input | Yes      |
| Sales channel             | System record  | Yes      |
| Claims paid during period | System record  | Yes      |
| Refund amount             | System calc    | Yes      |

### Regulatory

- **FSA-013** — Ångerrätt; 14-day cooling-off period for distance and
  off-premises contracts with full refund
- **IDD-002** — IPID must describe how to cancel the contract, including
  ångerrätt
- **GDPR-007** — Cancellation records retained per FSA-014 retention rules

---

## HCA-02: Cancel When Property Is Sold

**As a** customer (privatkund),
**I want to** cancel my home insurance when I sell my property,
**so that** I stop paying for coverage I no longer need and receive a refund
for the unused period.

### Acceptance Criteria

- **GIVEN** the customer has sold their insured property
  **WHEN** the customer submits a cancellation request with proof of sale
  (överlåtelsehandling or signed purchase agreement)
  **THEN** the system processes cancellation effective from the property
  transfer date (tillträdesdag) and calculates a pro-rata refund

- **GIVEN** the customer requests cancellation due to property sale
  **WHEN** the customer provides the property transfer date
  **THEN** the system validates that the transfer date is in the future or
  within the last 30 days and sets the cancellation effective date accordingly

- **GIVEN** the customer has an active claim on the policy
  **WHEN** the customer requests cancellation due to property sale
  **THEN** the system warns the customer that the active claim will continue
  to be processed but no new claims can be filed after the cancellation
  effective date

- **GIVEN** the property sale cancellation is processed
  **WHEN** the system confirms the cancellation
  **THEN** the system sends the customer a cancellation confirmation including
  the effective date, pro-rata refund amount, and information about active
  claim handling

- **GIVEN** the buyer of the property wants to continue the policy
  **WHEN** the customer or buyer requests policy transfer
  **THEN** the system provides information about the buyer applying for their
  own policy (home insurance is not automatically transferable in Sweden)

### Data Requirements

| Data Element           | Source         | Required |
| ---------------------- | -------------- | -------- |
| Proof of sale          | Customer input | Yes      |
| Property transfer date | Customer input | Yes      |
| Active claims status   | System record  | Yes      |
| Pro-rata refund        | System calc    | Yes      |
| Policy number          | System record  | Yes      |

### Regulatory

- **FSA-013** — Cancellation rights; policyholder may cancel upon change of
  insurable interest (property sold)
- **FSA-005** — Fair refund calculation; pro-rata for unused coverage period
- **GDPR-007** — Proof of sale documents are personal data; retained per
  FSA-014 retention period

---

## HCA-03: Cancel When Moving to a New Address

**As a** customer (privatkund),
**I want to** cancel my home insurance when I move to a new address,
**so that** I avoid double coverage and can arrange insurance for my new home.

### Acceptance Criteria

- **GIVEN** the customer is moving to a new address
  **WHEN** the customer submits a cancellation request with the move date
  **THEN** the system processes cancellation effective from the move date and
  calculates a pro-rata refund for the remaining period

- **GIVEN** the customer is moving to a new address within TryggFörsäkring's
  coverage area
  **WHEN** the customer requests cancellation
  **THEN** the system offers the option to transfer the policy to the new
  address instead of cancelling, with a premium recalculation based on the
  new property's risk profile

- **GIVEN** the customer transfers the policy to a new address
  **WHEN** the premium changes due to the new address
  **THEN** the system presents the updated premium and coverage terms and
  requires the customer's confirmation before applying the transfer

- **GIVEN** the customer is moving and wants to cancel
  **WHEN** the system processes the cancellation
  **THEN** the system sends a reminder that the customer should arrange home
  insurance for their new address to avoid a coverage gap

- **GIVEN** the customer moves to a BRF apartment from a villa (or vice versa)
  **WHEN** the customer requests a policy transfer
  **THEN** the system identifies that the product type must change
  (villahemförsäkring to bostadsrättsförsäkring or vice versa) and initiates
  a new quote for the appropriate product

### Data Requirements

| Data Element    | Source         | Required    |
| --------------- | -------------- | ----------- |
| Current address | Policy record  | Yes         |
| New address     | Customer input | Yes         |
| Move date       | Customer input | Yes         |
| Housing type    | Customer input | Yes         |
| New premium     | System calc    | Conditional |

### Regulatory

- **FSA-013** — Cancellation rights; address change that alters risk
- **FSA-004** — Fair treatment; offer policy transfer where possible
- **FSA-015** — Product suitability; correct product type for new housing type
- **GDPR-007** — Address data processed for policy administration; retained
  per FSA-014

---

## HCA-04: Switch to a Competitor Insurer at Renewal

**As a** customer (privatkund),
**I want to** cancel my home insurance at renewal to switch to a competitor
insurer,
**so that** I can get better terms or pricing.

### Acceptance Criteria

- **GIVEN** the customer's policy is approaching renewal
  **WHEN** the customer submits a cancellation request effective at the
  renewal date
  **THEN** the system processes the cancellation effective at the end of the
  current policy period with no pro-rata refund (full period served)

- **GIVEN** the customer wants to switch insurer mid-term
  **WHEN** the customer submits a cancellation request with an effective date
  before renewal
  **THEN** the system calculates a pro-rata refund for the remaining period
  and coordinates the cancellation effective date

- **GIVEN** the customer is switching to a new insurer
  **WHEN** the system processes the cancellation
  **THEN** the system asks the customer for the new insurer's name and the
  new policy start date to verify there is no coverage gap

- **GIVEN** the system detects a potential coverage gap (new policy starts
  after current policy ends)
  **WHEN** the cancellation is being processed
  **THEN** the system warns the customer about the gap and recommends
  adjusting either the cancellation date or the new policy start date

- **GIVEN** the customer cancels at renewal
  **WHEN** the renewal date arrives
  **THEN** the system does not auto-renew the policy and sends a final
  confirmation that coverage has ended

### Data Requirements

| Data Element                | Source         | Required    |
| --------------------------- | -------------- | ----------- |
| Renewal date                | System record  | Yes         |
| Cancellation effective date | Customer input | Yes         |
| New insurer name            | Customer input | Conditional |
| New policy start date       | Customer input | Conditional |
| Pro-rata refund             | System calc    | Conditional |

### Regulatory

- **FSA-013** — Cancellation rights; policyholder can cancel at renewal
- **FSA-004** — Fair treatment; customer informed about coverage gap risk
- **IDD-002** — IPID describes cancellation procedure including at renewal
- **GDPR-007** — New insurer name stored only for gap verification; deleted
  after cancellation is processed

---

## HCA-05: Cancel Using the EU Online Cancellation Button

**As a** customer (privatkund),
**I want to** cancel my home insurance using the EU online cancellation button
(ångerknapp),
**so that** I can cancel digitally without needing to call or write.

### Acceptance Criteria

- **GIVEN** the customer is logged in to the TryggFörsäkring self-service
  portal or app
  **WHEN** the customer navigates to their active home insurance policy
  **THEN** a clearly visible cancellation button is displayed, compliant with
  the EU Consumer Rights Directive online cancellation requirement

- **GIVEN** the customer clicks the cancellation button
  **WHEN** the system presents the cancellation flow
  **THEN** the system displays the cancellation terms: effective date options,
  estimated refund amount, and any impact on active claims

- **GIVEN** the customer completes the online cancellation flow
  **WHEN** the customer confirms the cancellation
  **THEN** the system requires BankID authentication to verify the
  customer's identity before processing the cancellation

- **GIVEN** the cancellation is confirmed via BankID
  **WHEN** the system processes the cancellation
  **THEN** the system immediately sends a cancellation confirmation via email
  with the effective date, refund amount, and reference number

- **GIVEN** the customer initiates cancellation via the online button
  **WHEN** the customer does not complete the flow (abandons before
  confirmation)
  **THEN** the system does not process the cancellation and the policy
  remains active

### Data Requirements

| Data Element        | Source         | Required |
| ------------------- | -------------- | -------- |
| BankID verification | BankID         | Yes      |
| Cancellation reason | Customer input | No       |
| Effective date      | Customer input | Yes      |
| Confirmation email  | System         | Yes      |
| Session audit trail | System         | Yes      |

### External Integrations

- **BankID** — Identity verification for cancellation confirmation
- **Email/SMS Gateway** — Cancellation confirmation delivery

### Regulatory

- **EU Consumer Rights Directive** — Online cancellation button requirement;
  must be clearly accessible and functional
- **FSA-013** — Cancellation rights; online cancellation is a valid channel
- **GDPR-007** — Cancellation session data retained per FSA-014 retention
  rules

---

## HCA-06: Cancel Policy Due to Non-Payment

**As an** underwriter (skadereglerare/försäkringsspecialist),
**I want to** cancel a policy due to non-payment after the legally required
reminder process,
**so that** credit risk is managed and the statutory process is followed.

### Acceptance Criteria

- **GIVEN** a premium payment is overdue
  **WHEN** the system detects the missed payment
  **THEN** the system sends a first payment reminder (betalningspåminnelse)
  to the customer with a 14-day grace period to pay

- **GIVEN** the first reminder grace period has expired without payment
  **WHEN** the system processes the overdue account
  **THEN** the system sends a formal cancellation warning
  (uppsägningsvarning) stating that the policy will be cancelled if payment
  is not received within 14 additional days per Försäkringsavtalslagen

- **GIVEN** the cancellation warning period has expired without payment
  **WHEN** the system processes the non-payment
  **THEN** the system cancels the policy effective on the date stated in the
  cancellation warning and records the cancellation reason as "Non-payment"

- **GIVEN** the customer pays the overdue premium before cancellation takes
  effect
  **WHEN** the payment is received
  **THEN** the system reinstates the policy with no gap in coverage and
  sends a confirmation to the customer

- **GIVEN** the policy is cancelled due to non-payment
  **WHEN** the cancellation is processed
  **THEN** the system calculates any refund or outstanding balance: if
  premium was paid in advance, a pro-rata refund for the post-cancellation
  period is issued; if premium is owed, the outstanding amount is sent to
  collections

### Non-Payment Timeline

| Step | Action                                    | Deadline                   |
| ---- | ----------------------------------------- | -------------------------- |
| 1    | Payment due date passes                   | Day 0                      |
| 2    | First reminder (betalningspåminnelse)     | Within 7 days of due date  |
| 3    | Grace period for first reminder           | 14 days from reminder      |
| 4    | Cancellation warning (uppsägningsvarning) | After grace period expires |
| 5    | Final grace period                        | 14 days from warning       |
| 6    | Policy cancellation effective             | After final grace expires  |

### Regulatory

- **FSA-013** — Insurer-initiated cancellation; must follow
  Försäkringsavtalslagen statutory reminder and notice requirements
- **FSA-004** — Fair treatment; customer must receive clear communication at
  each step of the non-payment process
- **FSA-014** — Record keeping; all reminders, warnings, and cancellation
  notices must be retained for 10 years
- **GDPR-007** — Payment and collection data processed under Article 6(1)(b)
  contract performance

---

## HCA-07: Cancel Policy Due to Material Misrepresentation

**As an** underwriter (försäkringsspecialist),
**I want to** cancel a policy due to material misrepresentation (e.g.,
undisclosed prior claims, incorrect property details),
**so that** the risk is correctly managed and the insurance pool is protected.

### Acceptance Criteria

- **GIVEN** the underwriter discovers that the customer provided materially
  incorrect information at policy inception (e.g., undisclosed water damage
  history, incorrect building type, false BRF membership status)
  **WHEN** the underwriter reviews the policy
  **THEN** the system allows the underwriter to initiate cancellation for
  material misrepresentation with documented evidence

- **GIVEN** the underwriter initiates cancellation for misrepresentation
  **WHEN** the system processes the cancellation
  **THEN** the system requires the underwriter to document: the specific
  misrepresentation, the evidence discovered, how the misrepresentation
  affected the risk assessment, and whether the policy would have been
  issued or priced differently with correct information

- **GIVEN** the misrepresentation is determined to be intentional (fraud)
  **WHEN** the underwriter records the finding
  **THEN** the system cancels the policy immediately with no refund, records
  the fraud determination, and flags the customer for future underwriting
  review

- **GIVEN** the misrepresentation is determined to be unintentional (honest
  mistake)
  **WHEN** the underwriter records the finding
  **THEN** the system offers two options: cancel with pro-rata refund, or
  adjust the policy terms and premium to reflect the correct information

- **GIVEN** a cancellation for misrepresentation is processed
  **WHEN** the system finalizes the cancellation
  **THEN** the system sends the customer a formal notice explaining the
  reason for cancellation, the effective date, any refund or outstanding
  balance, and the customer's right to dispute the decision via
  Allmänna reklamationsnämnden (ARN)

### Data Requirements

| Data Element              | Source          | Required |
| ------------------------- | --------------- | -------- |
| Misrepresentation details | Underwriter     | Yes      |
| Evidence documentation    | Underwriter     | Yes      |
| Risk impact assessment    | Underwriter     | Yes      |
| Fraud determination       | Underwriter     | Yes      |
| Customer notification     | System          | Yes      |
| ARN dispute information   | System template | Yes      |

### Regulatory

- **FSA-013** — Insurer-initiated cancellation; misrepresentation grounds per
  Försäkringsavtalslagen Chapter 4
- **FSA-004** — Fair treatment; customer must be informed of the reason and
  their right to dispute
- **FSA-014** — Record keeping; all misrepresentation evidence and decisions
  retained for 10 years
- **GDPR-007** — Misrepresentation investigation data processed under
  Article 6(1)(f) legitimate interest (fraud prevention)

---

## HCA-08: Calculate Pro-Rata Refund for Remaining Period

**As the** system,
**I want to** calculate a pro-rata refund for the remaining policy period
upon cancellation,
**so that** the customer receives a fair repayment for unused coverage.

### Acceptance Criteria

- **GIVEN** a policy is cancelled before the end of the policy period
  **WHEN** the system calculates the refund
  **THEN** the refund is calculated as: (remaining days / total policy days)
  x annual premium, rounded to the nearest whole SEK

- **GIVEN** the cancellation is within the ångerrätt period (HCA-01)
  **WHEN** the system calculates the refund
  **THEN** the refund is the full premium paid, minus any claims costs
  incurred during the coverage period

- **GIVEN** the cancellation is insurer-initiated for fraud (HCA-07)
  **WHEN** the system calculates the refund
  **THEN** no refund is issued and the system records the reason

- **GIVEN** the customer has paid via monthly instalments
  **WHEN** the system calculates the refund
  **THEN** the system accounts for months already paid: if overpaid, a refund
  is issued; if underpaid, the outstanding amount is collected

- **GIVEN** the refund calculation is complete
  **WHEN** the system processes the refund
  **THEN** the refund is paid to the customer's original payment method
  within 14 business days and the customer receives a refund confirmation
  with the calculation breakdown

### Refund Calculation Formula

```text
Pro-Rata Refund = (Remaining Days / Total Policy Days) × Annual Premium

Ångerrätt Refund = Full Premium Paid − Claims Costs During Period

Monthly Payment Adjustment:
  If Total Paid > Pro-Rata Premium Used → Refund = Total Paid − Premium Used
  If Total Paid < Pro-Rata Premium Used → Outstanding = Premium Used − Total Paid
```

### Data Requirements

| Data Element        | Source        | Required |
| ------------------- | ------------- | -------- |
| Policy start date   | System record | Yes      |
| Cancellation date   | System record | Yes      |
| Policy end date     | System record | Yes      |
| Annual premium      | System record | Yes      |
| Payments made       | System record | Yes      |
| Claims costs        | System record | Yes      |
| Cancellation reason | System record | Yes      |

### Regulatory

- **FSA-005** — Fair settlement; refund must be calculated transparently per
  Försäkringsavtalslagen
- **FSA-013** — Cancellation; refund rules depend on cancellation type
  (ångerrätt vs ordinary vs insurer-initiated)
- **FSA-004** — Fair treatment; refund calculation must be communicated
  clearly to the customer

---

## HCA-09: Ensure No Coverage Gap When Switching Insurer

**As the** system,
**I want to** verify that the customer has replacement coverage when switching
insurer,
**so that** the customer is always protected and aware of any gap risk.

### Acceptance Criteria

- **GIVEN** the customer is cancelling to switch insurer (HCA-04)
  **WHEN** the system processes the cancellation
  **THEN** the system prompts the customer to enter the new insurer name and
  the new policy start date

- **GIVEN** the customer provides the new policy start date
  **WHEN** the system compares it to the cancellation effective date
  **THEN** the system validates that the new policy start date is on or
  before the cancellation effective date (no gap)

- **GIVEN** there is a gap between the cancellation effective date and the
  new policy start date
  **WHEN** the system detects the gap
  **THEN** the system displays a prominent warning explaining the risk of
  being uninsured during the gap period and recommends adjusting dates

- **GIVEN** the customer acknowledges the coverage gap warning
  **WHEN** the customer confirms they want to proceed despite the gap
  **THEN** the system records the customer's acknowledgement and proceeds
  with the cancellation, logging the gap period for audit purposes

- **GIVEN** the customer is switching insurer at renewal (no gap)
  **WHEN** the new policy starts on the renewal date
  **THEN** the system confirms seamless transition and processes the
  cancellation without a gap warning

### Data Requirements

| Data Element             | Source         | Required    |
| ------------------------ | -------------- | ----------- |
| Cancellation date        | System record  | Yes         |
| New insurer name         | Customer input | Conditional |
| New policy start date    | Customer input | Conditional |
| Gap warning shown        | System record  | Yes         |
| Customer acknowledgement | System record  | Conditional |

### Regulatory

- **FSA-004** — Fair treatment; customer must be informed of the risk of
  being uninsured
- **FSA-013** — Cancellation; system must support coordinated insurer
  switching
- **IDD-002** — IPID describes coverage start and end dates

---

## HCA-10: Preview Refund Amount Before Confirming Cancellation

**As a** customer service agent (kundtjänstmedarbetare),
**I want to** preview the refund amount before confirming a cancellation,
**so that** the customer can make an informed decision.

### Acceptance Criteria

- **GIVEN** a customer requests cancellation (any reason)
  **WHEN** the customer service agent initiates the cancellation flow
  **THEN** the system displays a cancellation preview showing: cancellation
  effective date, remaining coverage period, pro-rata refund amount, and any
  deductions (claims costs, outstanding payments)

- **GIVEN** the agent presents the refund preview to the customer
  **WHEN** the customer reviews the cancellation terms
  **THEN** the customer can choose to proceed with cancellation, adjust the
  effective date (and see an updated refund), or cancel the cancellation
  request and keep the policy

- **GIVEN** the customer adjusts the cancellation effective date
  **WHEN** the agent updates the date in the system
  **THEN** the system recalculates the refund in real-time and displays the
  updated preview

- **GIVEN** the customer confirms the cancellation after reviewing the
  preview
  **WHEN** the agent submits the cancellation
  **THEN** the system processes the cancellation with the previewed amounts
  and sends confirmation to the customer

- **GIVEN** the customer decides not to cancel after reviewing the preview
  **WHEN** the agent cancels the cancellation request
  **THEN** the policy remains active with no changes and the system logs
  the retention event

### Data Requirements

| Data Element           | Source        | Required    |
| ---------------------- | ------------- | ----------- |
| Policy details         | System record | Yes         |
| Cancellation date      | Agent input   | Yes         |
| Refund preview amount  | System calc   | Yes         |
| Deductions breakdown   | System calc   | Yes         |
| Customer decision      | Agent input   | Yes         |
| Retention event logged | System        | Conditional |

### Regulatory

- **FSA-004** — Fair treatment; customer must have complete information to
  make an informed cancellation decision
- **FSA-005** — Fair refund; the previewed amount must match the actual
  refund processed
- **FSA-013** — Cancellation; the process must be transparent and
  customer-friendly

---

## Data Model

### CancellationRecord

| Attribute                  | Type     | Description                                                                                        |
| -------------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| Cancellation ID            | String   | Unique identifier for the cancellation                                                             |
| Policy number              | String   | Reference to the home insurance policy                                                             |
| Cancellation type          | Enum     | Ångerrätt / Ordinary / Non-payment / Misrepresentation / Fraud                                     |
| Cancellation reason        | Enum     | Property sold / Moving / Switching insurer / Cooling-off / Non-payment / Misrepresentation / Other |
| Request date               | DateTime | When the cancellation was requested                                                                |
| Effective date             | DateTime | When the policy coverage ends                                                                      |
| Initiator                  | Enum     | Customer / Insurer / System                                                                        |
| Channel                    | Enum     | Web / App / Phone / EU-button / Letter                                                             |
| Refund amount              | Decimal  | Calculated refund (SEK)                                                                            |
| Refund method              | Enum     | Original payment method / Bank transfer                                                            |
| Refund status              | Enum     | Pending / Processed / Not applicable                                                               |
| Outstanding balance        | Decimal  | Amount owed by customer (SEK)                                                                      |
| Claims costs deducted      | Decimal  | Claims costs deducted from ångerrätt refund (SEK)                                                  |
| Coverage gap warning       | Boolean  | Whether a gap warning was shown                                                                    |
| Gap acknowledged           | Boolean  | Whether the customer acknowledged the gap                                                          |
| New insurer name           | String   | Name of the replacement insurer (if switching)                                                     |
| New policy start date      | Date     | Start date of replacement policy (if switching)                                                    |
| Proof of sale              | Boolean  | Whether proof of sale was provided                                                                 |
| BankID verified            | Boolean  | Whether cancellation was verified via BankID                                                       |
| Non-payment reminders      | Integer  | Number of reminders sent before cancellation                                                       |
| Misrepresentation evidence | String   | Description of misrepresentation (if applicable)                                                   |
| Status                     | Enum     | Requested / Previewed / Confirmed / Processed / Reversed                                           |
| Processed by               | String   | Agent or system identifier                                                                         |
| Created timestamp          | DateTime | When the record was created                                                                        |

---

## Regulatory Traceability Matrix

| Requirement | HCA-01 | HCA-02 | HCA-03 | HCA-04 | HCA-05 | HCA-06 | HCA-07 | HCA-08 | HCA-09 | HCA-10 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-004     |        |        | X      | X      |        | X      | X      | X      | X      | X      |
| FSA-005     |        | X      |        |        |        |        |        | X      |        | X      |
| FSA-013     | X      | X      | X      | X      | X      | X      | X      | X      | X      | X      |
| FSA-014     |        |        |        |        |        | X      | X      |        |        |        |
| FSA-015     |        |        | X      |        |        |        |        |        |        |        |
| GDPR-007    | X      | X      | X      | X      | X      | X      | X      |        |        |        |
| IDD-002     | X      |        |        | X      |        |        |        |        | X      |        |
| EU CRD      |        |        |        |        | X      |        |        |        |        |        |
