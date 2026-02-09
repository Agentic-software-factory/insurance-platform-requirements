---
sidebar_position: 2
---

# Policy Administration Use Cases

Detailed interaction flows for motor policy mid-term adjustments (MTAs) and policy lifecycle management. Each use case describes the step-by-step process, preconditions, postconditions, and exception flows.

## UC-PA-001: Process Mid-Term Vehicle Change

Handles the end-to-end flow when a customer replaces the insured vehicle on an active policy.

### Actors

- **Primary:** Customer (Privatkund)
- **Supporting:** Transportstyrelsen, Payment Provider, Underwriter (for high-risk vehicles)

### Preconditions

- The customer has an active motor insurance policy
- The customer has the registreringsnummer of the new vehicle
- The customer is authenticated via BankID

### Main Flow

1. The customer selects "Change vehicle" from their policy management page
2. The customer enters the new vehicle's registreringsnummer
3. The system looks up the vehicle in Transportstyrelsen's vehicle registry and retrieves: make, model, year, engine power, weight, vehicle type, VIN
4. The system displays the vehicle details and asks the customer to confirm the vehicle is correct
5. The customer confirms the vehicle
6. The system evaluates the new vehicle against underwriting rules:
   - If the vehicle is within standard risk parameters → continue to step 7
   - If the vehicle triggers a high-risk flag → **Exception Flow A**
7. The system recalculates the premium using the new vehicle's risk factors (vehicle type, value, engine power) while retaining the customer's existing bonus class, address, and coverage tier
8. The system displays: current premium, new premium, pro-rata adjustment amount, and effective date
9. The customer reviews and accepts the premium adjustment
10. The system processes the amendment:
    a. Updates the policy record with the new vehicle
    b. Sends a de-registration notification to Transportstyrelsen for the old vehicle
    c. Sends a registration notification to Transportstyrelsen for the new vehicle
    d. Creates an amendment record in the policy history
    e. Triggers premium adjustment via the payment provider (collection or refund)
11. The system generates an updated policy document
12. The customer receives confirmation with a link to the updated policy document

### Exception Flows

#### A. High-risk vehicle requires underwriter review

1. The system notifies the customer that the vehicle change requires manual review
2. The system routes the amendment request to the underwriter queue with the vehicle data and risk assessment
3. The underwriter reviews the request (see UC-PA-006)
4. If approved: resume main flow at step 7 with any adjusted terms
5. If declined: notify the customer with the reason; the original policy remains unchanged

#### B. Vehicle not found in Transportstyrelsen registry

1. The system displays an error: "Vehicle not found in the vehicle registry"
2. The customer is advised to verify the registreringsnummer
3. If the vehicle is newly registered, the customer is advised to wait 24 hours for registry propagation and retry

#### C. Transportstyrelsen notification fails

1. The system queues the notification for retry (exponential backoff)
2. The amendment proceeds — the policy is updated regardless of notification delivery status
3. Operations staff are alerted after retry exhaustion
4. Manual intervention sends the notification when the integration is restored

#### D. Customer declines premium adjustment

1. The customer cancels the vehicle change
2. The original policy remains unchanged
3. No notifications are sent to Transportstyrelsen

### Postconditions

- The policy record reflects the new vehicle
- Transportstyrelsen has been notified (or notification is queued)
- The amendment is recorded in the policy history with full audit trail
- An updated policy document is available
- The premium adjustment has been initiated

### Business Rules

- Trafikförsäkring must transfer with the policy — no coverage gap (FSA-007)
- Bonus class remains with the policyholder, not the vehicle
- The old vehicle's trafikförsäkring status in the registry is updated

### Regulatory

- **FSA-007** — Continuous trafikförsäkring coverage
- **FSA-009** — Transportstyrelsen notification
- **GDPR-002** — Policy data update
- **GDPR-004** — Transportstyrelsen data exchange

---

## UC-PA-002: Process Coverage Tier Change

Handles upgrades and downgrades between motor insurance coverage tiers (trafikförsäkring, halvförsäkring, helförsäkring).

### Actors

- **Primary:** Customer (Privatkund)
- **Supporting:** Payment Provider

### Preconditions

- The customer has an active motor insurance policy
- The customer is authenticated via BankID
- The target coverage tier is different from the current tier

### Main Flow

1. The customer selects "Change coverage" from their policy management page
2. The system displays the available coverage tiers with a comparison:

   | Feature                      | Trafikförsäkring | Halvförsäkring | Helförsäkring |
   | ---------------------------- | ---------------- | -------------- | ------------- |
   | Third-party liability        | Included         | Included       | Included      |
   | Fire and theft               | —                | Included       | Included      |
   | Glass damage                 | —                | Included       | Included      |
   | Roadside assistance          | —                | Included       | Included      |
   | Legal expenses               | —                | Included       | Included      |
   | Collision damage (vagnskada) | —                | —              | Included      |

3. The customer selects the desired coverage tier
4. The system checks eligibility:
   - Downgrade to trafikförsäkring → always permitted
   - Upgrade to helförsäkring → check vehicle age and value thresholds
5. The system provides the updated IPID for the new tier (IDD-002)
6. The system recalculates the premium and displays: current tier and premium, new tier and premium, pro-rata adjustment, effective date
7. The customer acknowledges the IPID and coverage changes
8. The customer confirms the tier change
9. The system processes the amendment:
   a. Updates the coverage tier on the policy record
   b. Creates an amendment record in the policy history
   c. Triggers premium adjustment via the payment provider
   d. For upgrades: new coverage effective immediately
   e. For downgrades: new coverage effective from start of next day
10. The system generates an updated policy document
11. The customer receives confirmation

### Exception Flows

#### A. Helförsäkring not available for vehicle

1. The system informs the customer that helförsäkring is not available for their vehicle (e.g., vehicle too old or value too low)
2. The customer is shown alternative options (halvförsäkring if currently on trafikförsäkring only)

#### B. Customer has financed vehicle requiring helförsäkring

1. The system detects that the vehicle is subject to a finance agreement requiring comprehensive coverage
2. The system warns the customer that their finance agreement may require helförsäkring
3. The customer may proceed at their own risk or cancel the downgrade

### Postconditions

- The policy record reflects the new coverage tier
- An updated IPID was provided and acknowledged (for the new tier)
- The amendment is recorded in the policy history
- An updated policy document is available
- Premium adjustment has been initiated

### Regulatory

- **FSA-007** — Trafikförsäkring must remain as minimum coverage
- **FSA-004** — Clear comparison of coverage tiers
- **FSA-012** — Pre-contractual disclosure for new coverage
- **IDD-001** — Demands-and-needs reassessment for significant changes
- **IDD-002** — Updated IPID provided before confirmation

---

## UC-PA-003: Process Named Driver Change

Handles adding or removing named drivers from a motor insurance policy.

### Actors

- **Primary:** Customer (Privatkund)
- **Supporting:** Underwriter (for high-risk drivers)

### Preconditions

- The customer has an active motor insurance policy
- The customer is authenticated via BankID
- For adding: the customer has the new driver's personnummer

### Main Flow — Add Named Driver

1. The customer selects "Add driver" from their policy management page
2. The customer enters the new driver's personnummer
3. The system validates the personnummer format
4. The system retrieves the driver's age from the personnummer
5. The system assesses the risk impact:
   - Driver age ≥ 25 and no risk flags → continue to step 6
   - Driver age < 25 or other risk flags → **Exception Flow A**
6. The system recalculates the premium with the additional driver's risk factors
7. The system displays: current premium, new premium, adjustment amount, and a description of any surcharges applied
8. The customer confirms the addition
9. The system processes the amendment:
   a. Adds the named driver to the policy record
   b. Creates an amendment record in the policy history
   c. Triggers premium adjustment
10. The system generates an updated policy document
11. The customer receives confirmation

### Main Flow — Remove Named Driver

1. The customer selects "Remove driver" from their policy management page
2. The system displays the list of named drivers on the policy (excluding the policyholder)
3. The customer selects the driver to remove
4. The system recalculates the premium without the removed driver
5. The system displays the premium adjustment
6. The customer confirms the removal
7. The system processes the amendment:
   a. Removes the named driver from the active policy record
   b. Creates an amendment record in the policy history
   c. Triggers premium adjustment (refund if applicable)
8. The system generates an updated policy document
9. The customer receives confirmation

### Exception Flows

#### A. High-risk driver requires underwriter review

1. The system notifies the customer that the driver addition requires review
2. The system routes the request to the underwriter queue with the driver's risk profile
3. The underwriter reviews (see UC-PA-006):
   - Approve with standard terms → resume main flow at step 6
   - Approve with adjusted terms (e.g., higher deductible) → customer must accept adjusted terms
   - Decline → customer notified; policy unchanged

#### B. Invalid personnummer

1. The system displays: "Invalid personnummer format"
2. The customer is asked to re-enter

#### C. Attempting to remove the only driver (policyholder)

1. The system prevents removal: "The policyholder cannot be removed as a named driver"

### Postconditions

- The policy record reflects the updated driver list
- The amendment is recorded in the policy history
- An updated policy document is available
- Premium adjustment has been initiated

### Regulatory

- **GDPR-001** — Named driver personnummer collection must have lawful basis
- **GDPR-002** — Driver data stored under policy administration
- **FSA-004** — Surcharges communicated transparently
- **IDD-001** — Reassess demands and needs if risk profile changes significantly

---

## UC-PA-004: Manage Policy Status Transitions

Handles the lifecycle of policy status changes: active → suspended → lapsed, and reinstatement.

### Actors

- **Primary:** System (automated), Underwriter (for reinstatement review)
- **Supporting:** Customer, Transportstyrelsen, Payment Provider

### Preconditions

- The policy exists in the system with a known current status

### Main Flow — Suspension Due to Non-Payment

1. The premium payment due date passes without payment
2. The system sends a payment reminder to the customer with the outstanding amount and a grace period deadline
3. The grace period expires without payment
4. The system changes the policy status from "Active" to "Suspended"
5. The system sends a suspension notification to the customer explaining:
   - Coverage is no longer active
   - The reinstatement period and deadline
   - Consequences for trafikförsäkring (vehicle may incur trafikförsäkringsavgift)
6. The system notifies Transportstyrelsen that the vehicle's insurance coverage is suspended
7. The system records the status change in the amendment history

### Main Flow — Reinstatement

1. The customer pays the outstanding premium within the reinstatement period
2. The payment provider confirms receipt
3. The system evaluates reinstatement eligibility:
   - Suspension ≤ configurable threshold → automatic reinstatement (step 4)
   - Suspension > configurable threshold → **Exception Flow A**
4. The system changes the policy status from "Suspended" to "Active"
5. The system notifies Transportstyrelsen that coverage is reinstated
6. The system sends a reinstatement confirmation to the customer
7. The system records the reinstatement in the amendment history

### Main Flow — Lapse

1. The reinstatement period expires without payment
2. The system changes the policy status from "Suspended" to "Lapsed"
3. The system sends a lapse notification to the customer explaining:
   - The policy is terminated
   - The vehicle is now uninsured
   - TFF may assign default trafikförsäkring with a penalty fee
   - How to obtain new coverage
4. The system confirms Transportstyrelsen notification of coverage termination
5. The system records the lapse in the amendment history

### Exception Flows

#### A. Extended suspension requires underwriter review

1. The system routes the reinstatement request to the underwriter queue
2. The underwriter reviews the policy's claims history during the suspension period
3. If approved: resume reinstatement flow at step 4
4. If declined: the customer is notified that they must apply for a new policy

#### B. Transportstyrelsen notification failure during suspension

1. The system queues the notification for retry
2. Operations staff are alerted
3. The status change proceeds on the policy record regardless

### Postconditions

- The policy status reflects the current state
- Transportstyrelsen has been notified of coverage changes
- The customer has been notified of the status change and consequences
- All status transitions are recorded in the amendment history

### Regulatory

- **FSA-007** — A lapsed trafikförsäkring means the vehicle is uninsured
- **FSA-009** — Transportstyrelsen notified of all coverage status changes
- **FSA-004** — Customer clearly informed of consequences
- **FSA-013** — Suspension and lapse procedures comply with Försäkringsavtalslagen
- **GDPR-002** — Status changes recorded in policy administration

---

## UC-PA-005: Recalculate Premium After Amendment

Handles the premium recalculation triggered by any mid-term policy amendment that changes risk factors.

### Actors

- **Primary:** System (automated)
- **Supporting:** Payment Provider

### Preconditions

- A policy amendment has been submitted that changes one or more rating factors
- The current premium and rating factors are known

### Main Flow

1. The system identifies which rating factors have changed:
   - Vehicle: type, age, value, engine power
   - Address: postcode risk zone
   - Coverage tier: trafikförsäkring / halvförsäkring / helförsäkring
   - Deductible level
   - Named drivers: count, ages, experience
   - Mileage band
2. The system retrieves the current tariff and rating tables
3. The system calculates the new annual premium using:
   - Base rate for the vehicle type and coverage tier
   - Bonus class discount (unchanged by mid-term amendments)
   - Postcode risk zone factor
   - Driver surcharges (age, experience)
   - Mileage factor
   - Deductible adjustment factor
4. The system calculates the pro-rata adjustment:
   - `remaining_days = policy_end_date - amendment_effective_date`
   - `old_daily_premium = old_annual_premium / 365`
   - `new_daily_premium = new_annual_premium / 365`
   - `adjustment = (new_daily_premium - old_daily_premium) × remaining_days`
5. If the absolute adjustment is below the minimum threshold (configurable) → waive the adjustment
6. The system returns the calculation result: new annual premium, pro-rata adjustment, effective date, rating factor breakdown
7. After customer confirmation:
   - If adjustment > 0 (additional premium): initiate collection via payment provider
   - If adjustment < 0 (refund): initiate refund or credit to next installment
8. The system records the premium calculation details in the amendment record

### Exception Flows

#### A. Tariff data unavailable

1. The system logs the error and alerts operations
2. The amendment is paused; the customer is informed of a temporary delay
3. When tariff data is available, the system resumes calculation

### Postconditions

- The new premium is calculated and recorded
- The pro-rata adjustment has been initiated with the payment provider
- The premium calculation breakdown is stored for audit

### Business Rules

- Bonus class does not change mid-term — it changes only at renewal
- All premium calculations use the tariff version effective at the amendment date
- Minimum adjustment threshold prevents micro-transactions

### Regulatory

- **FSA-004** — Premium calculation must be transparent
- **FSA-006** — Premium data available for regulatory reporting
- **GDPR-002** — Calculation data retained as part of policy record

---

## UC-PA-006: Underwriter Review of High-Risk Amendment

Handles the manual review process when a policy amendment triggers a high-risk flag.

### Actors

- **Primary:** Underwriter (Riskbedömare)
- **Supporting:** Customer, System

### Preconditions

- A policy amendment has been flagged as high-risk by the automated risk assessment
- The amendment is in the underwriter queue

### Main Flow

1. The underwriter opens the amendment request from the queue
2. The system displays:
   - Current policy details (coverage, vehicle, drivers, premium)
   - Proposed amendment details
   - Risk assessment: flagged triggers, risk score change, historical data
   - Customer's claims history
3. The underwriter evaluates the risk and decides:
   - **Approve** — the amendment proceeds with standard terms
   - **Approve with adjusted terms** — the underwriter specifies adjustments (e.g., higher deductible, additional exclusion, premium loading)
   - **Decline** — the amendment is rejected
4. The underwriter records the decision with a written rationale
5. The system processes the decision:
   - Approved: triggers the standard amendment flow (premium recalculation, policy update)
   - Approved with adjustments: the customer is presented with the adjusted terms and must accept before the amendment proceeds
   - Declined: the customer is notified with the reason; the original policy remains unchanged
6. The system records the underwriting decision in the amendment history

### Exception Flows

#### A. Customer rejects adjusted terms

1. The customer declines the underwriter's adjusted terms
2. The amendment is cancelled; the original policy remains unchanged
3. The system records the customer's rejection

#### B. SLA breach — review not completed within 2 business days

1. The system escalates the amendment to a senior underwriter
2. The customer is notified of the delay

### Postconditions

- The underwriter decision is recorded with rationale
- The amendment is either processed, adjusted, or declined
- The customer has been notified of the outcome

### Regulatory

- **FSA-004** — Fair treatment; decisions justified and communicated
- **FSA-005** — Product governance; high-risk amendments monitored
- **FSA-014** — Underwriting decisions retained for record-keeping period
- **IDD-001** — Demands-and-needs reassessment if significant risk change
