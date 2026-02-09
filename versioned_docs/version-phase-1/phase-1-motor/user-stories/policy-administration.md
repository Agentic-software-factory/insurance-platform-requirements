---
sidebar_position: 2
---

# Policy Administration User Stories

User stories for mid-term policy adjustments (MTAs) and post-bind policy lifecycle management. These cover all changes a customer or internal actor may make to an active motor insurance policy.

## US-PA-001: Change Vehicle on Policy

**As a** customer,
**I want to** change the vehicle on my motor insurance policy when I sell my old car and buy a new one,
**so that** I maintain continuous insurance coverage without a gap.

### Acceptance Criteria

- **GIVEN** I have an active motor insurance policy
  **WHEN** I submit a vehicle change request with the new vehicle's registreringsnummer
  **THEN** the system looks up the new vehicle data from Transportstyrelsen and displays the vehicle details for confirmation

- **GIVEN** the new vehicle data is confirmed
  **WHEN** the system recalculates the premium based on the new vehicle's risk profile
  **THEN** I see the old premium, the new premium, and the pro-rata adjustment amount with the effective date

- **GIVEN** I accept the vehicle change and premium adjustment
  **WHEN** the amendment is processed
  **THEN** the system notifies Transportstyrelsen of the insurance status change for both the old and new vehicles

- **GIVEN** the vehicle change is completed
  **WHEN** I view my policy
  **THEN** the policy shows the new vehicle and an updated policy document is available for download

### Business Rules

- The new vehicle must be registered in the fordonsregistret (Transportstyrelsen vehicle registry)
- Trafikförsäkring coverage must transfer immediately — no coverage gap is permitted (FSA-007)
- If the new vehicle has a higher risk profile, additional underwriting review may be required
- Bonus class (bonusklass) transfers with the policyholder, not the vehicle
- The old vehicle's trafikförsäkring must be cancelled or transferred to another insurer; if not, TFF default coverage applies

### Data Requirements

- New vehicle: registreringsnummer, make, model, year, VIN, vehicle type, engine power, weight
- Old vehicle: registreringsnummer (for Transportstyrelsen de-registration notification)
- Premium adjustment: old premium, new premium, effective date, pro-rata calculation

### Regulatory

- **FSA-007** — Mandatory trafikförsäkring must be maintained without gaps
- **FSA-009** — Transportstyrelsen must be notified of the vehicle change
- **GDPR-002** — Vehicle and policy data updates must follow data minimization principles
- **GDPR-004** — Transportstyrelsen notification must transmit only mandated data fields
- **IDD-001** — If the vehicle change significantly alters risk, reassess demands and needs

---

## US-PA-002: Update Address

**As a** customer,
**I want to** update my registered address on my policy when I move,
**so that** my policy reflects my current situation and my premium is correctly calculated.

### Acceptance Criteria

- **GIVEN** I have an active motor insurance policy
  **WHEN** I submit a new address
  **THEN** the system validates the address format and postcode

- **GIVEN** the new address is in a different postcode area
  **WHEN** the premium is recalculated based on the new postcode's risk zone
  **THEN** I see the premium adjustment (increase or decrease) with the effective date

- **GIVEN** the address change does not affect the premium
  **WHEN** the change is processed
  **THEN** the policy is updated immediately without a premium adjustment step

- **GIVEN** identity verification is required for address changes
  **WHEN** I confirm the change via BankID
  **THEN** the system records the verified identity and processes the change

### Business Rules

- Address changes require BankID verification (identity-sensitive field)
- Postcode affects premium through geographic risk zones — certain areas have higher theft or accident rates
- The new address must be a valid Swedish postcode
- Address changes take effect immediately; premium adjustments are pro-rata from the effective date
- An audit trail must record the old address, new address, timestamp, and verification method

### Data Requirements

- New address: street, postcode, city
- Risk zone mapping: postcode-to-risk-zone lookup table
- Premium adjustment: old premium, new premium, effective date

### Regulatory

- **GDPR-002** — Address is personal data; updates must be logged with an audit trail
- **GDPR-006** — Right to rectification — customers may correct inaccurate address data
- **FSA-004** — Premium recalculation must be transparent and communicated clearly

---

## US-PA-003: Upgrade Coverage Tier

**As a** customer,
**I want to** upgrade my coverage from halvförsäkring to helförsäkring,
**so that** I get collision damage protection (vagnskadeförsäkring) for my vehicle.

### Acceptance Criteria

- **GIVEN** I have an active policy with halvförsäkring
  **WHEN** I request an upgrade to helförsäkring
  **THEN** the system displays the additional coverage included and the new premium

- **GIVEN** I review the coverage comparison
  **WHEN** the system presents the upgrade
  **THEN** it shows a clear side-by-side comparison of halvförsäkring vs. helförsäkring benefits, exclusions, and pricing

- **GIVEN** I accept the upgrade
  **WHEN** the amendment is processed
  **THEN** the new coverage tier takes effect immediately and an updated policy document is generated

- **GIVEN** the upgrade constitutes a significant change
  **WHEN** the system processes the upgrade
  **THEN** an updated IPID for helförsäkring is provided before confirmation

### Business Rules

- Coverage upgrades take effect immediately upon confirmation
- Premium adjustment is pro-rata for the remaining policy period
- An upgraded IPID must be provided before the customer confirms (IDD-002)
- If the vehicle is older than a configurable threshold (e.g., 15 years), helförsäkring may not be offered due to low vehicle value
- Vagnskadegaranti (collision damage warranty) status should be checked — if active, vagnskadeförsäkring component may be redundant

### Data Requirements

- Current coverage tier and premium
- New coverage tier, additional coverages, and new premium
- IPID document version for the new tier
- Vehicle age and current market value (for eligibility check)

### Regulatory

- **IDD-001** — Reassess demands and needs for significant coverage changes
- **IDD-002** — Provide updated IPID for the new coverage tier
- **IDD-007** — If add-ons are offered with the upgrade, present them separately with individual pricing
- **FSA-004** — Coverage comparison must be clear and transparent
- **FSA-012** — Pre-contractual disclosure for the new coverage tier

---

## US-PA-004: Downgrade Coverage Tier

**As a** customer,
**I want to** downgrade my coverage from helförsäkring to halvförsäkring,
**so that** I reduce my premium while maintaining essential protections.

### Acceptance Criteria

- **GIVEN** I have an active policy with helförsäkring
  **WHEN** I request a downgrade to halvförsäkring
  **THEN** the system clearly shows which coverages I will lose (vagnskadeförsäkring)

- **GIVEN** I acknowledge the reduced coverage
  **WHEN** I confirm the downgrade
  **THEN** the coverage change takes effect from the next day and a premium refund is calculated for the remaining period

- **GIVEN** my vehicle has an outstanding claim
  **WHEN** I request a downgrade
  **THEN** the system warns that the downgrade does not affect the pending claim but future incidents will not be covered under the removed coverage

### Business Rules

- Downgrade takes effect from the start of the next day (not immediately, to prevent same-day claim-then-downgrade scenarios)
- Premium refund is calculated pro-rata for the remaining policy period
- Downgrade below trafikförsäkring is never permitted (FSA-007)
- If the customer has a financed vehicle, the finance company may require helförsäkring — the system should warn if applicable
- The customer must explicitly acknowledge the lost coverages before confirmation

### Data Requirements

- Current and new coverage tiers
- Coverages being removed with descriptions
- Premium refund calculation
- Outstanding claims status

### Regulatory

- **FSA-007** — Trafikförsäkring must always remain as the minimum coverage
- **FSA-004** — Customer must receive clear information about what coverage is lost
- **IDD-001** — Reassess demands and needs for significant coverage changes
- **GDPR-002** — Policy amendment recorded in the policy administration record

---

## US-PA-005: Adjust Deductible Level

**As a** customer,
**I want to** change my deductible (självrisk) level,
**so that** I can balance my premium cost against my out-of-pocket risk.

### Acceptance Criteria

- **GIVEN** I have an active motor insurance policy
  **WHEN** I request a deductible change
  **THEN** the system displays available deductible levels with the corresponding premium for each

- **GIVEN** I select a new deductible level
  **WHEN** the premium is recalculated
  **THEN** I see the premium difference (higher deductible = lower premium, lower deductible = higher premium)

- **GIVEN** I confirm the new deductible
  **WHEN** the amendment is processed
  **THEN** the new deductible applies from the effective date and the premium is adjusted pro-rata

### Business Rules

- Available deductible levels are defined per coverage tier (e.g., 1 500 SEK, 3 000 SEK, 5 000 SEK, 7 000 SEK)
- Different coverage types may have different deductible options (e.g., glass damage has a separate deductible)
- The deductible change takes effect from the start of the next day
- Premium adjustment is pro-rata for the remaining policy period

### Data Requirements

- Current deductible level and premium
- Available deductible options with corresponding premiums
- Premium adjustment calculation

### Regulatory

- **FSA-004** — Deductible options and their impact on premium must be presented transparently
- **IDD-001** — Ensure the chosen deductible aligns with the customer's financial situation
- **GDPR-002** — Amendment recorded in policy administration

---

## US-PA-006: Add Named Driver

**As a** customer,
**I want to** add a named driver to my motor insurance policy,
**so that** another person can regularly drive my insured vehicle with full coverage.

### Acceptance Criteria

- **GIVEN** I have an active motor insurance policy
  **WHEN** I request to add a named driver and provide their personnummer
  **THEN** the system validates the personnummer and retrieves the driver's age and driving license status

- **GIVEN** the new driver is under 25 years old
  **WHEN** the premium is recalculated
  **THEN** the system applies a young driver surcharge and the premium increase is displayed for confirmation

- **GIVEN** the new driver is flagged as high risk (e.g., under 25, recently licensed)
  **WHEN** the amendment is submitted
  **THEN** the system routes the request to an underwriter for manual review before processing

- **GIVEN** the named driver is added successfully
  **WHEN** I view my policy
  **THEN** the named driver appears on the policy and an updated policy document is generated

### Business Rules

- Named driver's personnummer must be valid and the person must hold a valid Swedish driving license (or equivalent)
- Drivers under 25 or with less than 2 years of driving experience trigger a young driver surcharge
- High-risk driver additions (e.g., age under 20, prior claims history) require underwriter approval
- Adding a named driver does not change the policyholder or the bonus class — bonus follows the policyholder
- The personnummer of named drivers is sensitive personal data requiring careful handling

### Data Requirements

- Named driver: personnummer, name, date of birth, driving license date, license category
- Risk assessment: age, driving experience, claims history (if available from previous insurer)
- Premium adjustment calculation with surcharge breakdown

### Regulatory

- **GDPR-001** — Personal data collection for the named driver requires a lawful basis (contract performance)
- **GDPR-002** — Named driver data stored as part of policy administration
- **FSA-004** — Young driver surcharges must be transparently communicated
- **IDD-001** — If adding a high-risk driver significantly changes the risk profile, reassess demands and needs

---

## US-PA-007: Remove Named Driver

**As a** customer,
**I want to** remove a named driver from my motor insurance policy,
**so that** my premium reflects only the drivers who actually use the vehicle.

### Acceptance Criteria

- **GIVEN** I have a named driver on my policy
  **WHEN** I request to remove them
  **THEN** the system recalculates the premium without the removed driver's risk factors

- **GIVEN** the removal results in a premium decrease
  **WHEN** the amendment is processed
  **THEN** the premium adjustment is applied pro-rata and the named driver is removed from the policy

- **GIVEN** the named driver is removed
  **WHEN** I view my policy
  **THEN** the driver no longer appears and an updated policy document is available

### Business Rules

- Removing a named driver takes effect immediately
- Premium reduction (if any) is applied pro-rata
- The removed driver's personal data is retained for the policy administration retention period (GDPR-002)
- At least one driver (the policyholder) must remain on the policy

### Data Requirements

- Named driver to remove: personnummer, name
- Premium adjustment calculation

### Regulatory

- **GDPR-002** — Removed driver's data retained per retention schedule; not actively processed
- **FSA-004** — Premium adjustment must be communicated transparently

---

## US-PA-008: Update Annual Mileage Estimate

**As a** customer,
**I want to** update my estimated annual mileage (körsträcka),
**so that** my premium reflects my actual driving pattern.

### Acceptance Criteria

- **GIVEN** I have an active motor insurance policy
  **WHEN** I update my annual mileage estimate
  **THEN** the system recalculates the premium based on the new mileage band

- **GIVEN** the new mileage is significantly higher than the original estimate
  **WHEN** the premium increases
  **THEN** the system displays the new premium and explains that higher mileage increases risk exposure

- **GIVEN** I confirm the mileage change
  **WHEN** the amendment is processed
  **THEN** the premium adjustment is applied pro-rata from the effective date

### Business Rules

- Mileage is categorized into bands (e.g., 0–1 000 mil, 1 001–1 500 mil, 1 501–2 000 mil, 2 001+ mil)
- Higher mileage increases premium; lower mileage decreases premium
- Customers have a duty to report material changes in driving pattern
- Misrepresentation of mileage may affect claims settlement (material fact)
- Mileage changes take effect immediately

### Data Requirements

- Current mileage estimate and band
- New mileage estimate and band
- Premium adjustment calculation

### Regulatory

- **FSA-004** — Mileage impact on premium must be communicated clearly
- **GDPR-002** — Mileage data recorded as part of policy administration

---

## US-PA-009: View Amendment History

**As a** claims handler,
**I want to** see the complete policy amendment history,
**so that** I can verify what coverage was active at the time of a claim.

### Acceptance Criteria

- **GIVEN** I am investigating a claim on a motor policy
  **WHEN** I view the policy amendment history
  **THEN** I see a chronological list of all amendments with effective dates, amendment types, and details

- **GIVEN** the amendment history is displayed
  **WHEN** I select a specific amendment
  **THEN** I see the full details including what changed, the old and new values, the effective date, and who authorized the change

- **GIVEN** a claim date falls between two amendments
  **WHEN** I check the coverage at the claim date
  **THEN** the system shows the exact coverage tier, deductible, named drivers, and vehicle that were active on that date

### Business Rules

- Amendment history is an immutable audit trail — entries cannot be modified or deleted
- Each amendment record includes: amendment type, effective date, old values, new values, timestamp of processing, user/channel that initiated the change
- Point-in-time coverage reconstruction must be possible for any date in the policy's history
- Amendment history is accessible to claims handlers, underwriters, and compliance officers

### Data Requirements

- Amendment record: type, effective date, processing timestamp, old values, new values, initiator (customer/agent/system), authorization method
- Coverage snapshot at any point in time: tier, deductible, vehicle, named drivers, premium

### Regulatory

- **FSA-010** — Claims settlement requires verifying coverage at the time of loss
- **FSA-014** — Amendment records must be retained for the full record-keeping period
- **GDPR-002** — Amendment history contains personal data; subject to access rights and retention rules

---

## US-PA-010: Recalculate Premium After Amendment

**As the** system,
**I want to** recalculate premiums whenever a policy amendment changes risk factors,
**so that** the customer pays the correct amount for their current coverage and risk profile.

### Acceptance Criteria

- **GIVEN** a policy amendment changes a risk factor (vehicle, address, coverage tier, deductible, named drivers, mileage)
  **WHEN** the amendment is being processed
  **THEN** the system calculates the new annual premium using the updated risk factors

- **GIVEN** the premium has changed
  **WHEN** the pro-rata adjustment is calculated
  **THEN** the system computes the difference between the old and new premium for the remaining policy period

- **GIVEN** the adjustment results in an additional premium
  **WHEN** the customer confirms the amendment
  **THEN** the additional amount is collected via the existing payment method

- **GIVEN** the adjustment results in a premium refund
  **WHEN** the amendment is processed
  **THEN** the refund is credited to the customer's payment method or applied to the next premium installment

### Business Rules

- Premium recalculation uses the current rating factors and tariff at the time of amendment
- Pro-rata calculation: `adjustment = (new_daily_premium - old_daily_premium) × remaining_days`
- Minimum premium thresholds may apply — very small adjustments (below a configurable threshold) may be waived
- Premium recalculation does not change the bonus class — bonus changes only at renewal
- All premium calculations must be auditable with a clear breakdown of rating factors

### Data Requirements

- Rating factors: vehicle type, vehicle age, vehicle value, postcode risk zone, coverage tier, deductible level, named drivers (age, experience), mileage band, bonus class
- Premium calculation: old annual premium, new annual premium, effective date, remaining days, pro-rata adjustment amount
- Payment: adjustment amount, payment method, collection/refund date

### Regulatory

- **FSA-004** — Premium calculation must be transparent; the customer must understand why the premium changed
- **FSA-006** — Premium data must be available for supervisory reporting
- **GDPR-002** — Premium calculation data is part of the policy administration record

---

## US-PA-011: Notify Transportstyrelsen of Policy Changes

**As the** system,
**I want to** notify Transportstyrelsen when a vehicle change or policy status change occurs,
**so that** the national vehicle registry reflects the current insurance status.

### Acceptance Criteria

- **GIVEN** a vehicle change amendment is processed
  **WHEN** the old vehicle's coverage ends and the new vehicle's coverage begins
  **THEN** the system sends a de-registration notification for the old vehicle and a registration notification for the new vehicle to Transportstyrelsen

- **GIVEN** a policy is suspended or lapses
  **WHEN** the status change takes effect
  **THEN** the system notifies Transportstyrelsen that the vehicle no longer has active coverage

- **GIVEN** a notification fails to deliver
  **WHEN** the system detects the failure
  **THEN** it retries according to the configured retry policy and alerts operations staff if retries are exhausted

- **GIVEN** notifications are sent
  **WHEN** an acknowledgement is received from Transportstyrelsen
  **THEN** the system logs the acknowledgement with timestamp and reference number

### Business Rules

- Notifications must be sent within the timeframe prescribed by Trafikskadelagen
- Notification content must follow the Transportstyrelsen API specification — no additional data beyond the mandated schema
- Failed notifications must be retried with exponential backoff
- All notification attempts, responses, and failures must be logged for audit
- The system must handle Transportstyrelsen downtime gracefully with queuing and retry

### Data Requirements

- Notification payload: registreringsnummer, policy number, policyholder personnummer, coverage start/end date, notification type (new, change, cancellation)
- Response tracking: acknowledgement ID, timestamp, status (success, failure, pending)

### Regulatory

- **FSA-009** — Transportstyrelsen notification is a legal obligation
- **FSA-007** — Ensures the vehicle registry reflects current trafikförsäkring status
- **GDPR-004** — Only mandated data fields are transmitted to Transportstyrelsen

---

## US-PA-012: Reissue Policy Document

**As a** customer,
**I want to** receive an updated policy document after any amendment to my policy,
**so that** I have a current record of my coverage, terms, and conditions.

### Acceptance Criteria

- **GIVEN** a policy amendment has been processed
  **WHEN** the amendment takes effect
  **THEN** the system generates an updated policy document reflecting all current policy details

- **GIVEN** the updated document is generated
  **WHEN** it is available
  **THEN** I receive a notification (email or in-app) with a link to download the document

- **GIVEN** I access the document
  **WHEN** I review it
  **THEN** it clearly shows the current coverage tier, vehicle, named drivers, deductible, premium, and effective dates

### Business Rules

- A new policy document is generated for every material amendment (vehicle change, coverage change, named driver change)
- Minor amendments (mileage update, address change with no premium impact) may generate a confirmation letter rather than a full reissue
- Documents must use clear, plain language (FSA-004)
- Previous versions of the policy document remain accessible in the document history
- Documents must be generated in Swedish

### Data Requirements

- Policy summary: policy number, policyholder details, vehicle details, coverage tier, deductible, named drivers, premium, payment schedule
- Document metadata: version number, generation date, amendment reference

### Regulatory

- **FSA-004** — Policy documents must be clear, transparent, and in plain language
- **FSA-012** — Contractual information must be provided after binding and after amendments
- **FSA-014** — Policy documents must be retained for the record-keeping period
- **GDPR-002** — Documents contain personal data subject to retention rules

---

## US-PA-013: Manage Policy Status

**As an** underwriter,
**I want to** manage policy status transitions (active, suspended, lapsed),
**so that** the policy reflects the correct operational state and coverage availability.

### Acceptance Criteria

- **GIVEN** a policyholder has failed to pay the premium within the grace period
  **WHEN** the payment deadline passes
  **THEN** the policy status changes to "suspended" and the customer is notified

- **GIVEN** a policy is suspended
  **WHEN** the policyholder pays the outstanding premium within the reinstatement period
  **THEN** the policy is reinstated to "active" with continuous coverage (no gap)

- **GIVEN** a suspended policy reaches the end of the reinstatement period without payment
  **WHEN** the reinstatement period expires
  **THEN** the policy status changes to "lapsed" and Transportstyrelsen is notified

- **GIVEN** a policy transitions to any new status
  **WHEN** the transition is processed
  **THEN** the system records the status change with timestamp, reason, and authorization in the amendment history

### Business Rules

- Policy statuses: **Active** (coverage in force), **Suspended** (coverage temporarily inactive due to non-payment), **Lapsed** (coverage terminated due to prolonged non-payment)
- Suspension grace period and reinstatement period are configurable per product
- A suspended trafikförsäkring policy triggers Transportstyrelsen notification — the vehicle owner risks trafikförsäkringsavgift (penalty fee)
- Reinstatement may require underwriter review if the suspension exceeded a configurable threshold
- Status changes are irreversible through the standard flow — reversals require underwriter override with documented justification

### Data Requirements

- Policy status: current status, effective date of status change, reason
- Payment status: outstanding balance, last payment date, grace period end date, reinstatement deadline
- Notification records: customer notification sent, Transportstyrelsen notification sent

### Regulatory

- **FSA-007** — Lapsed trafikförsäkring means the vehicle is uninsured; Transportstyrelsen must be notified
- **FSA-009** — Status changes that affect coverage must be reported to Transportstyrelsen
- **FSA-004** — Customers must be clearly informed about suspension consequences
- **FSA-013** — Cancellation and suspension rules must comply with Försäkringsavtalslagen
- **GDPR-002** — Status change history is part of the policy administration record

---

## US-PA-014: Review High-Risk Amendments

**As an** underwriter,
**I want to** review amendments that significantly change the risk profile of a policy,
**so that** I can approve, adjust terms, or decline the change.

### Acceptance Criteria

- **GIVEN** an amendment triggers a high-risk flag (e.g., adding a driver under 20, changing to a high-performance vehicle)
  **WHEN** the amendment is submitted
  **THEN** the system routes the amendment to the underwriter queue for manual review

- **GIVEN** the amendment is in the underwriter queue
  **WHEN** I review the amendment details
  **THEN** I see the current policy, the proposed change, the risk assessment, and the premium impact

- **GIVEN** I approve the amendment
  **WHEN** I authorize it
  **THEN** the amendment is processed and the customer is notified of the updated terms and premium

- **GIVEN** I decline the amendment or adjust the terms
  **WHEN** I record my decision with a rationale
  **THEN** the customer is notified of the decision and the reasons for any modifications

### Business Rules

- High-risk triggers are configurable: driver age thresholds, vehicle type categories, vehicle value thresholds, claims history thresholds
- Underwriter decisions must be recorded with rationale for audit purposes
- SLA for underwriter review: decision within 2 business days of submission
- If the underwriter adjusts terms (e.g., higher deductible, exclusion), the customer must accept the adjusted terms before the amendment proceeds

### Data Requirements

- Amendment details: type, proposed changes, risk factors affected
- Risk assessment: risk score change, flagged triggers, historical claims data
- Underwriter decision: approve/decline/adjust, rationale, adjusted terms (if any), decision date

### Regulatory

- **FSA-004** — Fair treatment — decisions must be justified and communicated to the customer
- **FSA-005** — Product governance — high-risk amendments must be monitored
- **IDD-001** — Significant changes may require a fresh demands-and-needs assessment
- **FSA-014** — Underwriting decisions and rationales must be retained
