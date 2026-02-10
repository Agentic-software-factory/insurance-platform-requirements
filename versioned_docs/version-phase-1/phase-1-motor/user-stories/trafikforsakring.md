---
sidebar_position: 3
---

# Trafikforsakring — User Stories

User stories for mandatory third-party liability insurance (trafikforsakring)
under Trafikskadelagen (1975:1410). Trafikforsakring is legally required for all
registered motor vehicles in Sweden and forms the base coverage tier of every
motor insurance policy.

## Overview

| ID         | Actor              | Summary                                        |
| ---------- | ------------------ | ---------------------------------------------- |
| US-TRF-001 | System             | Ensure continuous mandatory coverage           |
| US-TRF-002 | System             | Report to TFF                                  |
| US-TRF-003 | System             | Handle TFF data exchange                       |
| US-TRF-004 | Claims Handler     | Process personal injury under Trafikskadelagen |
| US-TRF-005 | Customer           | Issue Green Card for EU travel                 |
| US-TRF-006 | System             | Handle trafikforsakringsavgift notification    |
| US-TRF-007 | Compliance Officer | Verify TFF membership compliance               |

For trafikforsakring content in other epics, see the
[cross-reference index](trafikforsakring-cross-references.md).

---

## US-TRF-001: Ensure Continuous Mandatory Coverage

### User Story

**As the** system,
**I want to** monitor that no insured vehicle has a gap in trafikforsakring
coverage,
**so that** TryggForsakring fulfils its regulatory obligation to prevent
uninsured periods.

### Actors

- **Primary:** System (automated processes)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md), [Transportstyrelsen](../../actors/external/transportstyrelsen.md)

### Priority

**Must Have** — Preventing coverage gaps is a core regulatory obligation under
Trafikskadelagen.

### Acceptance Criteria

- **GIVEN** a motor insurance policy has been bound (any tier: trafik, halv,
  or hel)
  **WHEN** the system processes the binding event
  **THEN** a trafikforsakring registration notification is sent to
  Transportstyrelsen within 1 hour containing:
  - Registreringsnummer
  - Policy number
  - Insurance company identifier (TryggForsakring)
  - Coverage start date and time
  - Coverage type (trafikforsakring)

- **GIVEN** the registration notification is sent
  **WHEN** Transportstyrelsen acknowledges receipt
  **THEN** the system records the acknowledgement reference, timestamp, and
  confirmation that the vehicle registry has been updated

- **GIVEN** the registration notification fails
  **WHEN** the system detects the failure
  **THEN** the notification is queued for automatic retry with exponential
  backoff, and an alert is raised for operations staff after 3 consecutive
  failures

- **GIVEN** a policyholder requests cancellation of their motor insurance
  **WHEN** the system processes the cancellation request
  **THEN** the system checks whether replacement trafikforsakring is in
  place by querying Transportstyrelsen for the vehicle's current insurance
  status

- **GIVEN** no replacement trafikforsakring is verified
  **WHEN** the cancellation request is processed
  **THEN** the system:
  - Warns the policyholder that cancelling without replacement coverage
    will result in a trafikforsakringsavgift (penalty fee) from TFF
  - Requires the policyholder to explicitly acknowledge the consequences
  - Records the acknowledgement with timestamp

- **GIVEN** replacement trafikforsakring is confirmed via Transportstyrelsen
  **WHEN** the system processes the cancellation
  **THEN** the cancellation is approved and the coverage end date is aligned
  with the replacement policy's start date to prevent any gap

- **GIVEN** a vehicle is being scrapped or exported
  **WHEN** the policyholder provides proof of deregistration
  **THEN** the system allows cancellation without replacement coverage,
  provided Transportstyrelsen confirms the vehicle is deregistered

- **GIVEN** any motor policy is created in the system
  **WHEN** the system validates the policy configuration
  **THEN** the system rejects any motor policy that does not include
  trafikforsakring as a base coverage component

### Data Requirements

| Data Element              | Source             | Required |
| ------------------------- | ------------------ | -------- |
| Registreringsnummer       | Policy data        | Yes      |
| Policy number             | System             | Yes      |
| Insurance company ID      | System config      | Yes      |
| Coverage start date/time  | Policy data        | Yes      |
| Coverage type             | Policy data        | Yes      |
| Acknowledgement reference | Transportstyrelsen | Yes      |
| Replacement insurance     | Transportstyrelsen | Yes      |
| Vehicle deregistration    | Transportstyrelsen | No       |

### External Integrations

- **Transportstyrelsen** — Insurance status registration API (real-time) and
  vehicle registry verification
- **TFF** — Uninsured vehicle reporting

### Regulatory

- **FSA-007** — Every registered vehicle must have valid trafikforsakring;
  the platform must enforce continuous coverage
- **FSA-009** — Insurers must notify Transportstyrelsen of policy changes
  within regulated timeframes
- **FSA-013** — Cooling-off cancellations must still follow coverage gap
  prevention rules
- **GDPR-004** — Data sharing with Transportstyrelsen is based on legal
  obligation under Trafikskadelagen

---

## US-TRF-002: Report to TFF

### User Story

**As the** system,
**I want to** submit statutory reports to TFF (new policies, cancellations,
claims data) per membership obligations,
**so that** TryggForsakring maintains compliance with TFF membership
requirements.

### Actors

- **Primary:** System (automated processes)
- **Supporting:** [Compliance Officer](../../actors/internal/compliance-officer.md)

### Priority

**Must Have** — TFF reporting is a mandatory condition of selling
trafikforsakring in Sweden.

### Acceptance Criteria

- **GIVEN** the reporting period end date has been reached
  **WHEN** the system initiates TFF report generation
  **THEN** the system produces the required TFF reports covering:
  - Number of active trafikforsakring policies
  - Premium income from trafikforsakring
  - Claims paid under trafikforsakring (personal injury and property damage)
  - Claims reserves for open trafikforsakring claims
  - Number and value of claims involving uninsured vehicles referred to TFF

- **GIVEN** the TFF report has been generated
  **WHEN** the compliance officer reviews the report
  **THEN** all data is reconciled with the platform's policy and claims
  records, and any discrepancies are flagged for investigation

- **GIVEN** TFF requires data in a specific format and schema
  **WHEN** the report is exported
  **THEN** the system generates the report in the format required by TFF's
  data exchange specifications

- **GIVEN** inter-company claims settlement data is available
  **WHEN** the report includes regressratt (subrogation) data
  **THEN** the system includes claims where TryggForsakring has subrogation
  rights against other insurers or TFF

- **GIVEN** TFF reporting is a recurring obligation
  **WHEN** the system approaches a reporting deadline
  **THEN** the system sends a reminder to the compliance team with the
  reporting due date and status of data readiness

### Data Requirements

| Data Element             | Source           | Required |
| ------------------------ | ---------------- | -------- |
| Active policy count      | Policy database  | Yes      |
| Premium income           | Financial system | Yes      |
| Claims paid              | Claims database  | Yes      |
| Claims reserves          | Claims database  | Yes      |
| Uninsured vehicle claims | Claims database  | Yes      |
| Subrogation data         | Claims database  | No       |

### External Integrations

- **[TFF](../../actors/external/tff.md)** —
  Data exchange for statutory reporting

### Regulatory

- **FSA-008** — TFF membership requires regular statutory reporting
- **FSA-006** — Supervisory reporting obligations include trafikforsakring
  data
- **GDPR-004** — TFF reporting involves personal data shared under legal
  obligation; data minimization applies
- **FSA-014** — Reporting data must be retained for audit purposes

---

## US-TRF-003: Handle TFF Data Exchange

### User Story

**As the** system,
**I want to** exchange claims data with TFF in the required format for
uninsured, unknown, and foreign vehicle claims,
**so that** victims are compensated and TryggForsakring meets its cooperative
obligations.

### Actors

- **Primary:** System (automated processes)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md), [TFF](../../actors/external/tff.md)

### Priority

**Must Have** — TFF data exchange is required for handling uninsured vehicle
claims under Trafikskadelagen.

### Acceptance Criteria

- **GIVEN** a traffic accident claim involves an uninsured vehicle
  **WHEN** the claims handler confirms the vehicle is uninsured via
  Transportstyrelsen
  **THEN** the system:
  - Flags the claim as an uninsured vehicle claim
  - Generates a TFF referral with all required claim details
  - Records the referral reference and timestamp
  - Notifies the claims handler that TFF will handle the claim against
    the uninsured vehicle

- **GIVEN** a claim involves a foreign-registered vehicle
  **WHEN** the claims handler identifies the vehicle as foreign-registered
  **THEN** the system:
  - Checks whether the vehicle has a valid Green Card or equivalent
    EU motor insurance coverage
  - If no valid coverage is found, generates a TFF referral for
    handling under the Green Card system
  - Records the vehicle's country of origin and any available insurance
    details

- **GIVEN** the responsible vehicle has fled the scene (hit-and-run)
  **WHEN** the claims handler registers the claim
  **THEN** the system generates a TFF referral for unidentified vehicle
  claims, attaching the police report reference

- **GIVEN** TryggForsakring's policyholder is the victim
  **WHEN** the claim is referred to TFF
  **THEN** the system tracks the TFF claim progress and records any
  compensation received by the victim through TFF

- **GIVEN** TFF has settled a claim
  **WHEN** TFF communicates the settlement decision
  **THEN** the system records the TFF settlement details and closes the
  claim accordingly

### Data Requirements

| Data Element              | Source             | Required    |
| ------------------------- | ------------------ | ----------- |
| Responsible vehicle reg.  | Claimant/police    | Yes         |
| Insurance status          | Transportstyrelsen | Yes         |
| Vehicle country of origin | Claimant/police    | Conditional |
| Green Card details        | Claimant           | Conditional |
| Police report reference   | Police             | Yes         |
| TFF referral reference    | TFF                | Yes         |
| TFF settlement details    | TFF                | Yes         |

### External Integrations

- **[Transportstyrelsen](../../actors/external/transportstyrelsen.md)** —
  Vehicle insurance status verification
- **[TFF](../../actors/external/tff.md)** —
  Uninsured and foreign vehicle claim referral and settlement
- **[Police (Polis)](../../actors/external/police.md)** — Accident
  reports for hit-and-run and liability determination

### Regulatory

- **FSA-007** — TFF provides trafikforsakring for uninsured vehicles as
  required by Trafikskadelagen
- **FSA-008** — TFF membership requires cooperation on uninsured vehicle
  claims
- **FSA-010** — Victims must be compensated fairly regardless of the
  responsible vehicle's insurance status
- **GDPR-003** — Claims data processing; personal data shared with TFF
  under legal obligation
- **GDPR-004** — Data exchange with TFF for claims handling

---

## US-TRF-004: Process Personal Injury Under Trafikskadelagen

### User Story

**As a** claims handler (skadereglerare),
**I want to** process personal injury claims following Trafikskadelagen strict
liability rules (driver liable regardless of fault),
**so that** all injured persons receive fair compensation as required by law.

### Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Medical Provider (Vardgivare)](../../actors/external/medical-provider.md), [Customer (Privatkund)](../../actors/internal/customer.md)

### Priority

**Must Have** — Personal injury under strict liability is the core purpose of
trafikforsakring.

### Acceptance Criteria

- **GIVEN** a traffic accident has been reported
  **WHEN** the claims handler registers the claim
  **THEN** the system allows the claim to be classified as:
  - Personal injury claim (personskada) — under Trafikskadelagen strict
    liability
  - Property damage claim (sakskada) — standard liability rules
  - Combined claim (both personal injury and property damage)

- **GIVEN** a personal injury claim is registered
  **WHEN** the system processes the claim
  **THEN** the system applies strict liability rules (Trafikskadelagen):
  - The vehicle owner/driver is liable for personal injuries regardless of
    fault
  - All persons injured in or by the vehicle are covered, including the
    driver
  - Compensation covers medical costs, lost income, pain and suffering, and
    permanent disability

- **GIVEN** a personal injury claim requires medical documentation
  **WHEN** the claims handler requests medical records
  **THEN** the system supports:
  - Requesting medical certificates from healthcare providers
  - Recording injury severity classification
  - Tracking treatment progress and expected recovery timeline
  - Documenting permanent disability assessments

- **GIVEN** a personal injury claim involves multiple injured persons
  **WHEN** the claims handler processes the claim
  **THEN** the system creates a separate compensation record for each
  injured person, each with their own medical documentation and settlement
  calculation

- **GIVEN** a personal injury claim is under trafikforsakring
  **WHEN** the claims handler determines liability
  **THEN** the system enforces that strict liability applies to personal
  injuries (no fault determination required for personal injury
  compensation under Trafikskadelagen)

- **GIVEN** a personal injury claim exceeds the insurer's retention limit
  **WHEN** the claims handler reviews the claim
  **THEN** the system flags the claim for reinsurance notification

### Compensation Components

| Component            | Swedish Term            | Calculation Basis                                          |
| -------------------- | ----------------------- | ---------------------------------------------------------- |
| Medical costs        | Sjukvardskostnader      | Receipts and invoices from healthcare providers            |
| Income loss          | Inkomstforlust          | Employer certificate of absence; tax records               |
| Pain and suffering   | Sveda och vark          | Trafikskadenamden tables based on injury type and duration |
| Permanent disability | Invaliditet             | Medical certificate of permanent impairment percentage     |
| Loss of amenity      | Lyte och men            | Medical assessment of functional limitations               |
| Future income loss   | Framtida inkomstforlust | Actuarial calculation based on age, profession, disability |

### Data Requirements

| Data Element             | Source            | Required |
| ------------------------ | ----------------- | -------- |
| Claim type               | Claims handler    | Yes      |
| Injured person(s)        | Claimant/police   | Yes      |
| Medical certificates     | Medical providers | Yes      |
| Injury severity          | Medical providers | Yes      |
| Police report reference  | Police            | No       |
| Treatment timeline       | Medical providers | No       |
| Disability assessment    | Medical providers | No       |
| Compensation calculation | System/handler    | Yes      |

### External Integrations

- **[Medical Provider (Vardgivare)](../../actors/external/medical-provider.md)** —
  Injury documentation and medical certificates
- **[Police (Polis)](../../actors/external/police.md)** — Accident
  reports for multi-vehicle incidents
- **[TFF](../../actors/external/tff.md)** —
  Claims data reporting for industry statistics

### Regulatory

- **FSA-007** — Trafikforsakring must cover personal injuries per
  Trafikskadelagen
- **FSA-010** — Claims must be handled fairly and promptly; personal injury
  claims require particular care due to vulnerability of injured parties
- **GDPR-003** — Claims processing involves personal data; medical data is
  special category data requiring legal obligation basis under
  Trafikskadelagen
- **GDPR-004** — Claims data shared with TFF under legal obligation

---

## US-TRF-005: Issue Green Card for EU Travel

### User Story

**As a** customer traveling in the EU,
**I want to** receive a Green Card certificate proving my trafikforsakring is
valid abroad,
**so that** I can drive legally in other EU/EEA and Green Card countries.

### Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal/customer.md)
- **Supporting:** System (automated processes), [TFF](../../actors/external/tff.md)

### Priority

**Should Have** — Cross-border coverage is included automatically, but the
physical Green Card document is needed for proof in some countries.

### Acceptance Criteria

- **GIVEN** a customer has an active motor insurance policy with
  TryggForsakring
  **WHEN** the customer views their policy details
  **THEN** the system displays that trafikforsakring includes coverage in
  all EU/EEA member states and Green Card system countries as standard

- **GIVEN** a customer requests a Green Card (internationellt
  motorforsakringskort)
  **WHEN** the system processes the request
  **THEN** the system generates a Green Card document containing:
  - Policy number and validity period
  - Vehicle registration number
  - Countries covered
  - TryggForsakring's details as the issuing insurer
  - Bureau of the country of visit as contact point

- **GIVEN** the customer is involved in an accident abroad
  **WHEN** the customer reports the claim
  **THEN** the system supports claim registration with:
  - Country where the accident occurred
  - Foreign police report reference (if available)
  - Details of the other party and their insurer
  - Local claim representative information via the Green Card bureau
    network

- **GIVEN** a foreign insurer submits a claim against TryggForsakring's
  policyholder
  **WHEN** the claim is received via the Green Card bureau system
  **THEN** the system routes the claim to the appropriate claims handler
  with all documentation from the foreign bureau

- **GIVEN** the customer's policy is cancelled or expires
  **WHEN** the system processes the cancellation
  **THEN** any active Green Card is invalidated and the customer is
  informed that cross-border coverage has ended

### Data Requirements

| Data Element             | Source         | Required    |
| ------------------------ | -------------- | ----------- |
| Policy validity period   | Policy data    | Yes         |
| Green Card document      | System         | Yes         |
| Countries covered        | System config  | Yes         |
| Foreign accident details | Customer input | Conditional |
| Foreign police report    | Customer       | Conditional |
| Green Card bureau claim  | TFF/bureau     | Conditional |

### External Integrations

- **[TFF](../../actors/external/tff.md)** —
  Green Card coordination and bureau network
- **Foreign insurers/bureaus** — Cross-border claim handling via the Green
  Card system

### Regulatory

- **FSA-007** — Trafikforsakring must provide the minimum coverage required
  in each country visited, per the EU Motor Insurance Directive
- **FSA-008** — TFF membership includes participation in the Green Card
  system
- **IDD-002** — IPID must describe geographic coverage scope, including
  cross-border coverage
- **GDPR-003** — Cross-border claims involve international data transfers;
  EU/EEA transfers are permitted under GDPR
- **EU Motor Insurance Directive** — Mandates mutual recognition of motor
  insurance across EU member states

---

## US-TRF-006: Handle Trafikforsakringsavgift Notification

### User Story

**As the** system,
**I want to** notify vehicle owners about the uninsured vehicle fee
(trafikforsakringsavgift) when coverage lapses,
**so that** policyholders understand the financial consequences of being
uninsured.

### Actors

- **Primary:** System (automated processes)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md), [TFF](../../actors/external/tff.md)

### Priority

**Must Have** — Notifying vehicle owners about penalty fees is required to
support the mandatory insurance regime.

### Acceptance Criteria

- **GIVEN** a policyholder's motor insurance has been cancelled
  **WHEN** no replacement trafikforsakring is detected
  **THEN** the system sends a notification to the vehicle owner warning
  that TFF will charge a trafikforsakringsavgift for each day the vehicle
  remains uninsured

- **GIVEN** the system detects that a vehicle has been uninsured for more
  than 24 hours
  **WHEN** the system queries Transportstyrelsen for the vehicle's
  insurance status
  **THEN** the system records the uninsured period start date and sends a
  reminder notification to the vehicle owner

- **GIVEN** the vehicle owner has received a trafikforsakringsavgift
  warning
  **WHEN** the owner contacts TryggForsakring to reinstate coverage
  **THEN** the system supports immediate policy issuance and sends a new
  registration notification to Transportstyrelsen

- **GIVEN** a previously uninsured vehicle obtains new trafikforsakring
  **WHEN** the system processes the new policy binding
  **THEN** the system notifies Transportstyrelsen and records the coverage
  start date, ending the uninsured period

- **GIVEN** TFF has levied a trafikforsakringsavgift
  **WHEN** the vehicle owner inquires about the fee
  **THEN** the system displays information about TFF's fee structure and
  directs the owner to TFF for fee-related inquiries (the fee is TFF's
  responsibility, not TryggForsakring's)

### Data Requirements

| Data Element           | Source             | Required |
| ---------------------- | ------------------ | -------- |
| Policy cancellation    | System             | Yes      |
| Replacement insurance  | Transportstyrelsen | Yes      |
| Uninsured period start | System             | Yes      |
| Notification history   | System             | Yes      |
| Reinstatement date     | System             | Yes      |

### External Integrations

- **[Transportstyrelsen](../../actors/external/transportstyrelsen.md)** —
  Insurance status verification and registration
- **[TFF](../../actors/external/tff.md)** —
  Uninsured vehicle fee administration (external to TryggForsakring)

### Regulatory

- **FSA-007** — Every registered vehicle must have trafikforsakring; the
  system must actively support coverage reinstatement
- **FSA-009** — Transportstyrelsen must be notified of all insurance
  status changes
- **GDPR-004** — Data sharing with Transportstyrelsen under legal
  obligation
- **FSA-004** — Fair treatment of customers includes clear communication
  about financial consequences of being uninsured

---

## US-TRF-007: Verify TFF Membership Compliance

### User Story

**As a** compliance officer (regelefterlevnadsansvarig),
**I want to** verify that TryggForsakring maintains its TFF membership and
meets all reporting obligations,
**so that** we remain authorized to sell trafikforsakring.

### Actors

- **Primary:** [Compliance Officer](../../actors/internal/compliance-officer.md)
- **Supporting:** System (automated processes)

### Priority

**Must Have** — TFF membership is a prerequisite for selling trafikforsakring
in Sweden.

### Acceptance Criteria

- **GIVEN** TryggForsakring is a TFF member
  **WHEN** the compliance officer reviews the membership status
  **THEN** the system displays:
  - Current TFF membership status and renewal date
  - List of all mandatory reporting obligations and their deadlines
  - Status of each reporting obligation (submitted, pending, overdue)
  - History of past submissions with TFF acknowledgement references

- **GIVEN** a TFF reporting deadline is approaching
  **WHEN** the system detects that a report is due within 30 days
  **THEN** the system sends an automated reminder to the compliance team
  with the reporting type, deadline, and data readiness status

- **GIVEN** a TFF report has not been submitted by the deadline
  **WHEN** the system detects the overdue report
  **THEN** the system escalates the alert to the compliance officer and
  the head of operations, recording the overdue event for audit purposes

- **GIVEN** TFF updates its reporting requirements or data exchange format
  **WHEN** the compliance officer is notified of the change
  **THEN** the system supports updating the report templates and data
  mappings to match the new TFF specifications

- **GIVEN** a compliance audit is conducted
  **WHEN** the auditor requests evidence of TFF compliance
  **THEN** the system generates a compliance report showing all TFF
  interactions, submissions, acknowledgements, and any overdue events
  for the audit period

### Data Requirements

| Data Element             | Source         | Required |
| ------------------------ | -------------- | -------- |
| TFF membership status    | TFF            | Yes      |
| Reporting obligations    | TFF/regulatory | Yes      |
| Submission history       | System         | Yes      |
| Acknowledgement refs     | TFF            | Yes      |
| Overdue event records    | System         | Yes      |
| Compliance audit reports | System         | Yes      |

### External Integrations

- **[TFF](../../actors/external/tff.md)** —
  Membership verification and reporting obligation management

### Regulatory

- **FSA-008** — TFF membership is mandatory for all insurers selling
  trafikforsakring; compliance must be continuously monitored
- **FSA-006** — Supervisory reporting obligations include demonstrating
  TFF compliance
- **FSA-014** — All TFF compliance evidence must be retained for audit
  purposes
- **GDPR-004** — TFF data exchange under legal obligation

---

## Data Model

The following data entities are central to the trafikforsakring process.

### Trafikforsakring Coverage Record

| Attribute                    | Type     | Description                                         |
| ---------------------------- | -------- | --------------------------------------------------- |
| Coverage ID                  | String   | Unique identifier for the trafikforsakring coverage |
| Policy number                | String   | Parent policy reference                             |
| Registreringsnummer          | String   | Insured vehicle                                     |
| Coverage start date          | DateTime | When mandatory coverage begins                      |
| Coverage end date            | DateTime | When coverage ends (nullable if active)             |
| Transportstyrelsen ref       | String   | Registration acknowledgement reference              |
| Transportstyrelsen timestamp | DateTime | When registration was confirmed                     |
| Status                       | Enum     | Active / Cancelled / Replaced                       |
| Replacement policy           | String   | Reference to replacement policy (nullable)          |

### Transportstyrelsen Notification Record

| Attribute              | Type     | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| Notification ID        | String   | Unique identifier                       |
| Policy number          | String   | Related policy                          |
| Registreringsnummer    | String   | Vehicle                                 |
| Notification type      | Enum     | New / Cancellation / Modification       |
| Sent timestamp         | DateTime | When the notification was sent          |
| Acknowledgement ref    | String   | Transportstyrelsen response reference   |
| Acknowledged timestamp | DateTime | When acknowledgement was received       |
| Status                 | Enum     | Sent / Acknowledged / Failed / Retrying |
| Retry count            | Integer  | Number of retry attempts                |
| Error details          | Text     | Error message if failed (nullable)      |

### TFF Reporting Record

| Attribute              | Type     | Description                                |
| ---------------------- | -------- | ------------------------------------------ |
| Report ID              | String   | Unique identifier                          |
| Reporting period start | Date     | Period start date                          |
| Reporting period end   | Date     | Period end date                            |
| Report type            | Enum     | Periodic / Ad-hoc / Claims                 |
| Active policy count    | Integer  | Number of active trafikforsakring policies |
| Premium income         | Decimal  | Trafikforsakring premium for the period    |
| Claims paid            | Decimal  | Total claims paid in the period            |
| Claims reserved        | Decimal  | Outstanding claims reserves                |
| Generated timestamp    | DateTime | When the report was generated              |
| Submitted timestamp    | DateTime | When the report was sent to TFF            |
| Status                 | Enum     | Draft / Submitted / Acknowledged           |

### Green Card Record

| Attribute           | Type     | Description                       |
| ------------------- | -------- | --------------------------------- |
| Green Card ID       | String   | Unique identifier                 |
| Policy number       | String   | Parent policy reference           |
| Registreringsnummer | String   | Vehicle                           |
| Validity start      | Date     | Green Card valid from             |
| Validity end        | Date     | Green Card valid until            |
| Countries covered   | List     | List of covered countries         |
| Issued timestamp    | DateTime | When the Green Card was generated |
| Status              | Enum     | Active / Expired / Invalidated    |

### Personal Injury Claim Record

| Attribute               | Type    | Description                                  |
| ----------------------- | ------- | -------------------------------------------- |
| Claim ID                | String  | Unique claim identifier                      |
| Policy number           | String  | Related trafikforsakring policy              |
| Injured person ID       | String  | Identity of the injured person               |
| Claim type              | Enum    | Personal Injury / Property / Combined        |
| Liability basis         | Enum    | Strict (Trafikskadelagen) / Standard         |
| Injury severity         | Enum    | Minor / Moderate / Severe / Permanent        |
| Medical certificates    | List    | References to medical documentation          |
| Compensation components | List    | Medical costs, lost income, pain, disability |
| Total compensation      | Decimal | Total compensation amount in SEK             |
| Police report ref       | String  | Police report reference (nullable)           |
| Accident date           | Date    | When the accident occurred                   |
| Accident location       | String  | Where the accident occurred                  |
| Settlement status       | Enum    | Open / Under Review / Settled / Denied       |
| Settlement date         | Date    | When the claim was settled (nullable)        |
| Reinsurance flag        | Boolean | Whether the claim exceeds retention limits   |

---

## Process Flows

### Trafikforsakring Registration Flow

1. **Policy binding** — Motor insurance policy is bound (any tier)
2. **Validation** — System confirms trafikforsakring is included as base
   coverage
3. **Notification** — System sends registration to Transportstyrelsen
   (US-TRF-001)
4. **Acknowledgement** — System receives and records Transportstyrelsen
   confirmation
5. **Monitoring** — System monitors for failed notifications and retries

### Coverage Gap Prevention Flow

1. **Cancellation request** — Policyholder or insurer initiates cancellation
2. **Replacement check** — System queries Transportstyrelsen for replacement
   coverage (US-TRF-001)
3. **Decision point:**
   - Replacement confirmed: proceed with cancellation, align dates
   - No replacement: warn policyholder, require acknowledgement
     (US-TRF-006)
   - Vehicle deregistered: proceed with cancellation
4. **Notification** — System notifies Transportstyrelsen of coverage end
   date
5. **Records** — System records cancellation details and any
   acknowledgements

### Personal Injury Claims Flow

1. **Claim registration** — Claims handler classifies the claim type
   (US-TRF-004)
2. **Liability determination** — System applies strict liability for
   personal injuries under Trafikskadelagen
3. **Medical documentation** — Claims handler obtains medical evidence
4. **Compensation calculation** — System calculates compensation per
   Trafikskadelagen rules
5. **Settlement** — Claims handler approves and processes payment
6. **TFF reporting** — System includes claim data in TFF reports
   (US-TRF-002)

---

## Regulatory Traceability Matrix

| Requirement             | US-TRF-001 | US-TRF-002 | US-TRF-003 | US-TRF-004 | US-TRF-005 | US-TRF-006 | US-TRF-007 |
| ----------------------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- | ---------- |
| FSA-004                 |            |            |            |            |            | X          |            |
| FSA-006                 |            | X          |            |            |            |            | X          |
| FSA-007                 | X          |            | X          | X          | X          | X          |            |
| FSA-008                 |            | X          | X          |            | X          |            | X          |
| FSA-009                 | X          |            |            |            |            | X          |            |
| FSA-010                 |            |            | X          | X          |            |            |            |
| FSA-013                 | X          |            |            |            |            |            |            |
| FSA-014                 |            | X          |            |            |            |            | X          |
| GDPR-003                |            |            | X          | X          | X          |            |            |
| GDPR-004                | X          | X          | X          | X          |            | X          | X          |
| IDD-002                 |            |            |            |            | X          |            |            |
| EU Motor Insurance Dir. |            |            |            |            | X          |            |            |

---

## External System Integration Summary

| System             | Integration Point                   | Stories                |
| ------------------ | ----------------------------------- | ---------------------- |
| Transportstyrelsen | Insurance registration notification | US-TRF-001, US-TRF-006 |
| Transportstyrelsen | Insurance status verification       | US-TRF-001, US-TRF-003 |
| TFF                | Statutory reporting                 | US-TRF-002, US-TRF-007 |
| TFF                | Uninsured vehicle claim referral    | US-TRF-003             |
| TFF                | Green Card coordination             | US-TRF-005             |
| TFF                | Membership compliance               | US-TRF-007             |
| Medical Providers  | Injury documentation                | US-TRF-004             |
| Police             | Accident reports                    | US-TRF-003, US-TRF-004 |
| Foreign Bureaus    | Cross-border claims via Green Card  | US-TRF-005             |
