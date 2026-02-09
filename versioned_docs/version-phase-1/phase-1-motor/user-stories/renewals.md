---
sidebar_position: 3
---

# Motor Policy Renewal User Stories

User stories for the motor insurance renewal lifecycle, covering pre-renewal premium recalculation, bonus class adjustments, renewal notices, customer response handling, automatic renewal processing, payment schedule updates, competitor switching at huvudförfallodag, and retention offers.

## US-RN-001: Receive Renewal Notice

**As a** customer,
**I want to** receive a renewal notice at least one month before my huvudförfallodag,
**so that** I have time to review the new terms, compare alternatives, and decide whether to renew.

### Acceptance Criteria

- **GIVEN** my policy's huvudförfallodag is approaching
  **WHEN** the date is at least 30 days before the huvudförfallodag
  **THEN** the system sends me a renewal notice by post and/or digital channel with the new premium, coverage summary, and effective date

- **GIVEN** I receive the renewal notice
  **WHEN** I review it
  **THEN** it clearly shows: current premium, new premium, premium change amount and percentage, bonus class, coverage tier, deductible, and the huvudförfallodag

- **GIVEN** the renewal notice has been sent
  **WHEN** the system records the delivery
  **THEN** it logs the sent date, delivery channel, content version, and delivery confirmation status

- **GIVEN** the renewal notice cannot be delivered (e.g., returned post, bounced email)
  **WHEN** the delivery failure is detected
  **THEN** the system retries via an alternative channel and alerts operations staff if all channels fail

### Business Rules

- Renewal notices must be sent at least 30 days before the huvudförfallodag, per Försäkringsavtalslagen
- The notice must clearly state the customer's right to cancel before the huvudförfallodag without penalty
- If the premium has increased, the notice must explain the reason (e.g., bonus class change, tariff adjustment, risk factor change)
- The notice must include information about how to switch to another insurer
- Notices must be available in Swedish and use plain, clear language (FSA-004)

### Data Requirements

- Policy details: policy number, policyholder name, vehicle registreringsnummer, coverage tier, deductible
- Premium comparison: current annual premium, new annual premium, change amount, change percentage
- Bonus class: current bonus class, new bonus class (if changed), reason for change
- Dates: current policy period end date (huvudförfallodag), new policy period start and end dates
- Delivery tracking: channel, sent timestamp, delivery confirmation

### Regulatory

- **FSA-004** — Renewal notices must use clear, transparent language and present terms fairly
- **FSA-012** — Pre-contractual disclosure obligations apply to renewals with changed terms
- **FSA-013** — The notice must inform the customer of their cancellation rights before the huvudförfallodag
- **GDPR-005** — Renewal communications must comply with data processing rules for marketing and renewal notices
- **IDD-003** — If terms have changed significantly, pre-contractual information must be provided

---

## US-RN-002: View Premium Change Explanation

**As a** customer,
**I want to** see a detailed explanation of why my renewal premium has changed,
**so that** I understand the factors driving the price and can make an informed decision.

### Acceptance Criteria

- **GIVEN** I receive a renewal notice with a premium change
  **WHEN** I view the premium breakdown
  **THEN** I see each contributing factor: bonus class effect, tariff adjustment, vehicle age change, postcode risk zone change, and any other rating factor changes

- **GIVEN** the premium has increased
  **WHEN** the breakdown is displayed
  **THEN** each factor shows whether it contributed to an increase or decrease, with the approximate impact in SEK

- **GIVEN** my bonus class has changed
  **WHEN** I view the bonus class section
  **THEN** I see the old bonus class, the new bonus class, the reason for the change (claim-free year or claims made), and the discount percentage for each class

### Business Rules

- The premium breakdown must show all material factors, not just the net change
- Bonus class changes are the most common driver of premium changes and must be prominently displayed
- Tariff adjustments (market-wide rate changes) must be distinguished from individual risk factor changes
- The breakdown must be understandable to a non-expert customer

### Data Requirements

- Rating factor breakdown: bonus class discount, base rate change, vehicle age factor, postcode factor, mileage factor, driver surcharges
- Bonus class details: old class, new class, progression reason, discount percentages
- Tariff version: current and new tariff identifiers, effective date of tariff change

### Regulatory

- **FSA-004** — Premium calculations must be transparent; the customer must understand why the premium changed
- **IDD-001** — If the premium change is significant, a reassessment of demands and needs may be warranted
- **GDPR-002** — Premium calculation data is part of the policy administration record

---

## US-RN-003: Recalculate Renewal Premium

**As an** underwriter,
**I want the** system to recalculate premiums for upcoming renewals based on updated risk factors and bonus class,
**so that** renewal pricing is accurate and reflects the current risk profile.

### Acceptance Criteria

- **GIVEN** a policy's huvudförfallodag is within the pre-renewal processing window (configurable, e.g., 60 days)
  **WHEN** the renewal batch process runs
  **THEN** the system recalculates the premium using the current tariff, updated bonus class, and latest risk factors

- **GIVEN** the premium recalculation is complete
  **WHEN** the result is stored
  **THEN** the renewal record includes: old annual premium, new annual premium, rating factor breakdown, tariff version, and bonus class applied

- **GIVEN** the recalculated premium triggers a high-risk flag (e.g., premium increase above a configurable threshold)
  **WHEN** the flag is raised
  **THEN** the renewal is routed to an underwriter for manual review before the renewal notice is sent

- **GIVEN** the recalculation completes without flags
  **WHEN** the renewal is approved
  **THEN** the system queues the renewal notice for dispatch

### Business Rules

- Renewal premium uses the tariff version effective on the huvudförfallodag
- Bonus class is updated based on the claims history during the expiring policy period (see US-RN-004)
- All other risk factors (vehicle, address, mileage, named drivers) are taken from the current policy state at the time of recalculation
- Premium recalculation is a batch process that runs daily for policies within the pre-renewal window
- Large premium increases (above a configurable percentage threshold) require underwriter review

### Data Requirements

- Rating factors: vehicle type, vehicle age, vehicle value, postcode risk zone, coverage tier, deductible level, named drivers, mileage band, bonus class
- Tariff: version identifier, effective date, base rates, factor tables
- Claims history: claim count, claim types, and total paid amounts during the expiring period
- Renewal record: old premium, new premium, factor breakdown, tariff version, review status

### Regulatory

- **FSA-004** — Premium recalculation must be transparent and auditable
- **FSA-006** — Premium data must be available for supervisory reporting
- **GDPR-002** — Renewal calculation data stored as part of policy administration
- **IDD-001** — Significant premium changes may trigger a demands-and-needs reassessment

---

## US-RN-004: Update Bonus Class at Renewal

**As the** system,
**I want to** adjust the policyholder's bonus class at renewal based on their claims history during the expiring policy period,
**so that** claim-free customers receive a higher discount and customers with claims are priced according to their risk.

### Acceptance Criteria

- **GIVEN** the policyholder had no claims during the expiring policy period
  **WHEN** the bonus class is updated at renewal
  **THEN** the bonus class increases by one step (up to the maximum bonus class)

- **GIVEN** the policyholder had one or more claims during the expiring policy period
  **WHEN** the bonus class is updated at renewal
  **THEN** the bonus class decreases according to the bonus scale rules (number of steps down depends on claims count and type)

- **GIVEN** the bonus class changes
  **WHEN** the renewal record is created
  **THEN** the system records the old bonus class, new bonus class, claims count, and the progression rule applied

- **GIVEN** the policyholder's bonus class is already at the maximum level
  **WHEN** they have a claim-free year
  **THEN** the bonus class remains at the maximum level

### Business Rules

- Bonus class typically ranges from 1 (lowest, no discount) to 7 (highest, maximum discount), though the exact scale is configurable
- Claim-free year: move up one bonus class step
- One claim: move down a configurable number of steps (e.g., 3 steps)
- Two or more claims: move down to the lowest bonus class (class 1)
- Only claims where the insurer has paid out affect the bonus class; declined claims or claims below the deductible do not affect bonus
- Glass-only claims (glasskada) do not affect the bonus class (industry standard)
- Bonus class is tied to the policyholder, not the vehicle — if the customer changes vehicles mid-term, their bonus transfers
- New customers without prior bonus history start at a configurable default class (e.g., class 3)
- Bonus class from a previous insurer may be transferred if the customer provides proof (försäkringsbesked)

### Data Requirements

- Bonus class scale: class number, discount percentage, step-up rule, step-down rule
- Claims history for the expiring period: claim count, claim types, paid amounts, declined claims
- Bonus transfer: previous insurer, previous bonus class, proof document reference

### Regulatory

- **FSA-004** — Bonus class rules and their impact on premium must be communicated clearly to customers
- **FSA-005** — Bonus system must be monitored as part of product governance
- **GDPR-002** — Bonus class history is part of the policy administration record
- **GDPR-001** — If bonus data is obtained from a previous insurer, the data collection must have a lawful basis

---

## US-RN-005: Automatically Renew Policy

**As the** system,
**I want to** automatically renew policies that are not cancelled before the huvudförfallodag,
**so that** policyholders maintain continuous coverage without requiring manual action.

### Acceptance Criteria

- **GIVEN** the huvudförfallodag has arrived and the customer has not cancelled the policy
  **WHEN** the renewal processing runs
  **THEN** the system creates a new policy period with the recalculated premium, updated bonus class, and current coverage terms

- **GIVEN** the policy is automatically renewed
  **WHEN** the new policy period starts
  **THEN** the system generates an updated policy document reflecting the new terms, premium, and policy period

- **GIVEN** the policy is renewed
  **WHEN** the renewal is processed
  **THEN** the system notifies the customer that the policy has been renewed with a link to the updated policy document

- **GIVEN** the policy is renewed and the coverage includes trafikförsäkring
  **WHEN** the new policy period starts
  **THEN** continuous coverage is maintained with no gap — the old period ends at 00:00 and the new period starts at 00:00 on the huvudförfallodag

### Business Rules

- Automatic renewal is the default behavior for all motor policies unless the customer explicitly cancels
- Renewal creates a new 365-day policy period starting on the huvudförfallodag
- The renewed policy uses the recalculated premium (from US-RN-003) and updated bonus class (from US-RN-004)
- Coverage tier, deductible, named drivers, and vehicle remain unchanged unless the customer requests a change
- Trafikförsäkring must always maintain continuous coverage with no gap (FSA-007)
- If the customer's payment method is invalid or declined, the renewal proceeds but triggers the payment follow-up process (see US-PA-013 for suspension rules)
- A renewal confirmation is sent to the customer within 1 business day of the renewal date

### Data Requirements

- Renewal record: old policy period, new policy period, old premium, new premium, bonus class, coverage tier, vehicle, named drivers
- Policy document: updated policy number or endorsement reference, new policy period dates, new premium
- Notification: renewal confirmation sent date, channel, delivery status

### Regulatory

- **FSA-007** — Trafikförsäkring must remain continuous; automatic renewal prevents coverage gaps
- **FSA-012** — The renewed policy terms must be disclosed to the customer via the renewal notice and updated policy document
- **FSA-013** — Försäkringsavtalslagen governs automatic renewal rules and customer's right to cancel
- **FSA-014** — Renewal records must be retained for the record-keeping period
- **GDPR-002** — Renewal data stored as part of policy administration

---

## US-RN-006: Cancel Policy Before Renewal

**As a** customer,
**I want to** cancel my policy before the huvudförfallodag so that I can switch to a competitor,
**so that** I exercise my right to change insurer at the annual renewal date without penalty.

### Acceptance Criteria

- **GIVEN** I have received my renewal notice
  **WHEN** I submit a cancellation request before the huvudförfallodag
  **THEN** the system records the cancellation effective on the huvudförfallodag and confirms the cancellation to me

- **GIVEN** I cancel my policy before the huvudförfallodag
  **WHEN** the huvudförfallodag arrives
  **THEN** the policy ends at the huvudförfallodag, the automatic renewal does not proceed, and Transportstyrelsen is notified

- **GIVEN** I cancel my policy
  **WHEN** the cancellation is processed
  **THEN** the system sends a cancellation confirmation including the end date, a reminder that trafikförsäkring coverage from another insurer must be in place, and information about TFF default coverage consequences

- **GIVEN** I attempt to cancel my policy after the huvudförfallodag
  **WHEN** the cancellation request is submitted
  **THEN** the system informs me that the policy has already renewed and I must follow the mid-term cancellation process instead

### Business Rules

- Cancellation at huvudförfallodag is a customer right under Försäkringsavtalslagen — no penalty or fee applies
- Cancellation must be received before the huvudförfallodag to prevent automatic renewal
- The system must warn the customer about trafikförsäkring gap consequences if they cancel
- If the customer is switching insurers, the new insurer typically sends the cancellation on the customer's behalf (flyttanmälan)
- Cancellation after the huvudförfallodag follows different rules (mid-term cancellation with potential pro-rata refund)
- The system must notify Transportstyrelsen when coverage ends

### Data Requirements

- Cancellation request: request date, requested effective date, reason (optional), channel
- Notification to Transportstyrelsen: vehicle registreringsnummer, coverage end date
- Confirmation to customer: cancellation date, end date, trafikförsäkring warning

### Regulatory

- **FSA-013** — Customer's right to cancel at huvudförfallodag is protected by Försäkringsavtalslagen
- **FSA-007** — Customer must be warned about trafikförsäkring gap consequences
- **FSA-009** — Transportstyrelsen must be notified when coverage ends
- **GDPR-002** — Cancellation records stored as part of policy administration
- **GDPR-004** — Transportstyrelsen notification transmits only mandated data

---

## US-RN-007: Update Payment Schedule for Renewed Policy

**As the** system,
**I want to** update the payment schedule when a policy is renewed with a new premium,
**so that** the customer is charged the correct amount on the correct dates for the new policy period.

### Acceptance Criteria

- **GIVEN** a policy has been renewed with a new premium
  **WHEN** the payment schedule is generated
  **THEN** the system creates installment dates and amounts based on the new annual premium and the customer's payment frequency (monthly, quarterly, or annual)

- **GIVEN** the renewed premium differs from the previous premium
  **WHEN** the first payment of the new period is due
  **THEN** the payment amount reflects the new premium, not the old premium

- **GIVEN** the customer pays via autogiro
  **WHEN** the renewal is processed
  **THEN** the autogiro mandate is updated with the new installment amount and the customer is notified of the change

- **GIVEN** the customer's payment method is invalid or expired
  **WHEN** the renewal is processed
  **THEN** the system flags the payment issue and sends the customer a request to update their payment details

### Business Rules

- Payment frequency options: monthly, quarterly, or annual (set at policy inception, may be changed at renewal)
- Autogiro customers receive an updated debit notification before the first new-period installment
- Invoice customers receive a new payment schedule with the renewal confirmation
- If the customer does not pay the first installment within the grace period, the standard non-payment process applies (see US-PA-013)
- Monthly payment may include a small administrative surcharge compared to annual payment

### Data Requirements

- Payment schedule: installment dates, installment amounts, payment frequency, payment method
- Payment method: type (autogiro, invoice, card), account/reference details, validity status
- Renewal premium: new annual premium, payment frequency, calculated installment amount

### Regulatory

- **FSA-004** — Payment schedule and any surcharges for installment payment must be communicated transparently
- **GDPR-002** — Payment schedule data stored as part of policy administration
- **FSA-013** — Payment terms at renewal must comply with Försäkringsavtalslagen

---

## US-RN-008: Handle Inbound Insurer Switch (Flyttanmälan)

**As the** system,
**I want to** process an inbound cancellation request from a new insurer (flyttanmälan) when a customer switches to a competitor at huvudförfallodag,
**so that** the policy is cancelled smoothly without requiring direct customer action.

### Acceptance Criteria

- **GIVEN** a competitor insurer sends a flyttanmälan for one of our policyholders
  **WHEN** the system receives the request
  **THEN** it validates the request against the policy's huvudförfallodag and processes the cancellation

- **GIVEN** the flyttanmälan is valid and the effective date matches the huvudförfallodag
  **WHEN** the cancellation is processed
  **THEN** the policy ends on the huvudförfallodag, automatic renewal is suppressed, and Transportstyrelsen is notified

- **GIVEN** the flyttanmälan effective date does not match the huvudförfallodag
  **WHEN** the system validates the request
  **THEN** it rejects the request and responds with the correct huvudförfallodag date

- **GIVEN** the flyttanmälan is processed successfully
  **WHEN** the cancellation takes effect
  **THEN** the system sends the customer a confirmation of the policy ending and a reminder of their bonus class for their records

### Business Rules

- Flyttanmälan is the standard industry process for insurer switching in Sweden
- The cancellation effective date must align with the huvudförfallodag
- The system should provide the customer's current bonus class in the response so the new insurer can apply it (försäkringsbesked)
- If a flyttanmälan arrives for a policy that has already been cancelled, the system responds with the existing cancellation confirmation
- The system must handle flyttanmälan requests received both electronically (industry API) and manually (postal/email)

### Data Requirements

- Flyttanmälan request: requesting insurer, policyholder personnummer, vehicle registreringsnummer, requested effective date
- Response: confirmation/rejection, bonus class certificate, huvudförfallodag date
- Customer notification: cancellation confirmation, bonus class for records

### Regulatory

- **FSA-013** — Insurer switching at huvudförfallodag is governed by Försäkringsavtalslagen
- **FSA-009** — Transportstyrelsen must be notified of the coverage change
- **GDPR-002** — Cancellation and switching records stored as part of policy administration
- **GDPR-004** — Data shared with the new insurer limited to mandated fields (bonus class, coverage dates)

---

## US-RN-009: Offer Retention Pricing

**As an** underwriter,
**I want to** apply retention pricing to customers at risk of switching insurer at renewal,
**so that** we retain profitable customers while maintaining fair pricing practices.

### Acceptance Criteria

- **GIVEN** a customer has been identified as at risk of leaving (e.g., premium increase above a threshold, long tenure, high bonus class)
  **WHEN** the renewal is being processed
  **THEN** the system evaluates the customer against retention eligibility rules and calculates a retention discount

- **GIVEN** a retention discount is applied
  **WHEN** the renewal notice is sent
  **THEN** the notice shows the standard renewal premium and the retention-adjusted premium, clearly labelled

- **GIVEN** the customer accepts the retention offer
  **WHEN** the policy renews
  **THEN** the retention discount is applied for the new policy period

- **GIVEN** the customer has received a retention offer but cancels anyway
  **WHEN** the cancellation is processed
  **THEN** no penalty or claw-back applies to the retention offer

### Business Rules

- Retention pricing is discretionary and subject to underwriter-defined rules
- Retention eligibility criteria are configurable: minimum tenure, minimum bonus class, maximum claims count, premium increase threshold
- Retention discounts are capped at a configurable maximum percentage
- Retention offers must not be misleading — the standard premium and the discounted premium must both be shown
- Retention pricing must comply with fair treatment obligations — similar customers must be treated consistently
- Retention offers are valid only for the upcoming renewal period; they do not carry forward automatically

### Data Requirements

- Retention eligibility: customer tenure, bonus class, claims history, premium change percentage
- Retention offer: standard premium, retention discount amount, adjusted premium, offer expiry date
- Decision audit: eligibility rule version, discount calculation, underwriter approval (if manual)

### Regulatory

- **FSA-004** — Retention offers must be transparent and not misleading; standard and discounted prices both shown
- **FSA-005** — Retention pricing must be monitored as part of product governance to ensure fair treatment
- **IDD-001** — Retention offers should align with the customer's demands and needs
- **GDPR-002** — Retention offer data stored as part of policy administration

---

## US-RN-010: Reassess Demands and Needs at Renewal

**As a** compliance officer,
**I want** the system to flag renewals where a significant change has occurred that warrants a demands-and-needs reassessment,
**so that** we comply with IDD obligations and ensure customers still have appropriate coverage.

### Acceptance Criteria

- **GIVEN** a policy renewal involves a significant premium change (above a configurable threshold)
  **WHEN** the renewal is processed
  **THEN** the system flags the renewal for a demands-and-needs reassessment before the notice is sent

- **GIVEN** a policy renewal involves a customer who has had a major life event (e.g., vehicle change, address change, claims)
  **WHEN** the renewal is processed
  **THEN** the system recommends a reassessment to verify the current coverage still matches the customer's needs

- **GIVEN** a reassessment is required
  **WHEN** the system contacts the customer
  **THEN** the customer is offered the opportunity to review their coverage tier, deductible, and add-ons before the renewal proceeds

- **GIVEN** the reassessment is completed
  **WHEN** the customer confirms their preferences
  **THEN** the system records the reassessment outcome and adjusts the renewal terms if needed

### Business Rules

- Reassessment triggers: premium increase above threshold, coverage tier no longer appropriate for vehicle value, significant life event detected (vehicle change, address change, multiple claims)
- Not all renewals require a reassessment — only those meeting trigger criteria
- The reassessment can be conducted digitally (self-service questionnaire) or via agent contact
- If the customer does not respond to the reassessment request, the renewal proceeds with existing terms (auto-renewal default)

### Data Requirements

- Trigger criteria: premium change threshold, vehicle value threshold, life event indicators
- Reassessment record: trigger reason, customer contact method, customer responses, outcome (terms unchanged, terms adjusted, customer switched)
- Audit trail: reassessment completion date, assessor (system or agent), linked renewal record

### Regulatory

- **IDD-001** — Demands-and-needs assessment must be performed when significant changes occur at renewal
- **IDD-002** — If coverage changes as a result of the reassessment, an updated IPID must be provided
- **FSA-004** — Reassessment communications must be clear and help the customer make an informed decision
- **GDPR-002** — Reassessment data stored as part of policy administration

---

## Data Model

### Renewal Record

| Attribute               | Type     | Description                                               |
| ----------------------- | -------- | --------------------------------------------------------- |
| renewal_id              | String   | Unique identifier for the renewal                         |
| policy_number           | String   | The policy being renewed                                  |
| old_policy_period_start | Date     | Start date of the expiring policy period                  |
| old_policy_period_end   | Date     | End date of the expiring policy period (huvudförfallodag) |
| new_policy_period_start | Date     | Start date of the new policy period                       |
| new_policy_period_end   | Date     | End date of the new policy period                         |
| old_annual_premium      | Decimal  | Premium for the expiring period                           |
| new_annual_premium      | Decimal  | Calculated premium for the new period                     |
| old_bonus_class         | Integer  | Bonus class during the expiring period                    |
| new_bonus_class         | Integer  | Updated bonus class for the new period                    |
| bonus_change_reason     | String   | Reason for bonus class change (claim-free / claims made)  |
| tariff_version          | String   | Tariff version used for recalculation                     |
| renewal_status          | String   | Status: pending, notice_sent, renewed, cancelled          |
| retention_discount      | Decimal  | Retention discount applied (if any)                       |
| reassessment_required   | Boolean  | Whether a demands-and-needs reassessment was triggered    |
| notice_sent_date        | DateTime | When the renewal notice was dispatched                    |
| renewal_processed_date  | DateTime | When the renewal was processed                            |
| cancellation_date       | DateTime | When the customer cancelled (if applicable)               |

### Bonus Class Scale

| Attribute          | Type    | Description                                          |
| ------------------ | ------- | ---------------------------------------------------- |
| bonus_class        | Integer | The bonus class level (e.g., 1-7)                    |
| discount_percent   | Decimal | Premium discount percentage for this class           |
| step_up_rule       | String  | Rule for claim-free progression (e.g., +1 step)      |
| step_down_one      | Integer | Steps down for one claim (e.g., -3 steps)            |
| step_down_multiple | Integer | Steps down for two or more claims (e.g., to class 1) |

## Renewal Process Flow

1. **T-60 days**: Renewal batch identifies policies approaching huvudförfallodag
2. **T-60 to T-45 days**: System recalculates premium (US-RN-003) and updates bonus class (US-RN-004)
3. **T-45 days**: Underwriter reviews flagged renewals (high premium increase, retention candidates)
4. **T-30 days**: Renewal notices dispatched to customers (US-RN-001)
5. **T-30 to T-0 days**: Customer response window — accept, negotiate, or cancel (US-RN-006)
6. **T-0 (huvudförfallodag)**: Automatic renewal for non-cancelled policies (US-RN-005)
7. **T+0 days**: Payment schedule updated (US-RN-007), updated policy document generated
8. **Ongoing**: Process flyttanmälan from competitor insurers (US-RN-008)

## Regulatory Traceability Matrix

| Requirement | US-RN-001 | US-RN-002 | US-RN-003 | US-RN-004 | US-RN-005 | US-RN-006 | US-RN-007 | US-RN-008 | US-RN-009 | US-RN-010 |
| ----------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| FSA-004     | X         | X         | X         | X         |           |           | X         |           | X         | X         |
| FSA-005     |           |           |           | X         |           |           |           |           | X         |           |
| FSA-006     |           |           | X         |           |           |           |           |           |           |           |
| FSA-007     |           |           |           |           | X         | X         |           |           |           |           |
| FSA-009     |           |           |           |           |           | X         |           | X         |           |           |
| FSA-012     | X         |           |           |           | X         |           |           |           |           |           |
| FSA-013     | X         |           |           |           | X         | X         | X         | X         |           |           |
| FSA-014     |           |           |           |           | X         |           |           |           |           |           |
| GDPR-001    |           |           |           | X         |           |           |           |           |           |           |
| GDPR-002    |           | X         | X         | X         | X         | X         | X         | X         | X         | X         |
| GDPR-004    |           |           |           |           |           | X         |           | X         |           |           |
| GDPR-005    | X         |           |           |           |           |           |           |           |           |           |
| IDD-001     |           | X         | X         |           |           |           |           |           | X         | X         |
| IDD-002     |           |           |           |           |           |           |           |           |           | X         |
| IDD-003     | X         |           |           |           |           |           |           |           |           |           |
