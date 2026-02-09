---
sidebar_position: 3
---

# Trafikforsakring — User Stories

User stories for mandatory third-party liability insurance (trafikforsakring)
under Trafikskadelagen (1975:1410). Trafikforsakring is legally required for all
registered motor vehicles in Sweden and forms the base coverage tier of every
motor insurance policy.

## Overview

| ID    | Actor              | Summary                                                  |
| ----- | ------------------ | -------------------------------------------------------- |
| TF-01 | System             | Register trafikforsakring with Transportstyrelsen        |
| TF-02 | Customer           | Automatic trafikforsakring inclusion in any motor policy |
| TF-03 | Claims Handler     | Process personal injury claims under Trafikskadelagen    |
| TF-04 | System             | Prevent policy cancellation without replacement coverage |
| TF-05 | Compliance Officer | Generate TFF statutory reports                           |
| TF-06 | Claims Handler     | Route uninsured/foreign vehicle claims to TFF            |
| TF-07 | Customer           | Cross-border coverage via Green Card system              |

---

## TF-01: Register Trafikforsakring with Transportstyrelsen

**As the** system,
**I want to** register new trafikforsakring with Transportstyrelsen immediately
upon binding,
**so that** the vehicle is legally covered and the vehicle registry reflects
the current insurance status.

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

- **GIVEN** a policy is modified (e.g., coverage tier change from halv to hel)
  **WHEN** the modification is processed
  **THEN** no new trafikforsakring notification is required because the
  mandatory base coverage has not changed

- **GIVEN** a vehicle changes ownership
  **WHEN** the new owner binds a policy with TryggForsakring
  **THEN** the system sends a new registration notification to
  Transportstyrelsen linking the new policy to the vehicle

### Data Requirements

| Data Element              | Source             | Required |
| ------------------------- | ------------------ | -------- |
| Registreringsnummer       | Policy data        | Yes      |
| Policy number             | System             | Yes      |
| Insurance company ID      | System config      | Yes      |
| Coverage start date/time  | Policy data        | Yes      |
| Coverage type             | Policy data        | Yes      |
| Acknowledgement reference | Transportstyrelsen | Yes      |

### External Integrations

- **Transportstyrelsen** — Insurance status registration API (real-time)

### Regulatory

- **FSA-009** — Insurers must notify Transportstyrelsen of policy changes
  within regulated timeframes
- **FSA-007** — Every registered vehicle must have valid trafikforsakring;
  notification ensures the registry reflects this
- **GDPR-004** — Data sharing with Transportstyrelsen is based on legal
  obligation under Trafikskadelagen

---

## TF-02: Automatic Trafikforsakring Inclusion

**As a** private customer (privatkund),
**I want** my trafikforsakring to be automatically included in any motor
insurance policy,
**so that** I always meet the legal requirement without having to select it
separately.

### Acceptance Criteria

- **GIVEN** a customer initiates a motor insurance quote
  **WHEN** the system presents coverage tier options
  **THEN** trafikforsakring is always included as the base coverage in every
  tier (trafik, halv, hel) and cannot be removed or deselected

- **GIVEN** a customer selects halvforsakring or helforsakring
  **WHEN** the policy is bound
  **THEN** the policy record explicitly includes trafikforsakring as the
  mandatory base component of the selected tier

- **GIVEN** a customer selects trafikforsakring only (mandatory minimum)
  **WHEN** the system presents the binding summary
  **THEN** the system displays a clear explanation that this provides
  third-party liability coverage only (personal injury to all parties and
  property damage to third parties) and does not cover damage to the
  policyholder's own vehicle

- **GIVEN** any motor policy is created in the system
  **WHEN** the system validates the policy configuration
  **THEN** the system rejects any motor policy that does not include
  trafikforsakring as a base coverage component

- **GIVEN** the IPID for trafikforsakring has been generated
  **WHEN** a customer is presented with coverage options
  **THEN** the trafikforsakring IPID is accessible from all tier options,
  clearly explaining mandatory coverage scope

### Data Requirements

| Data Element              | Source          | Required |
| ------------------------- | --------------- | -------- |
| Coverage tier             | Customer choice | Yes      |
| Trafikforsakring included | System (forced) | Yes      |
| IPID per tier             | Document store  | Yes      |

### Regulatory

- **FSA-007** — Trafikforsakring is mandatory for all registered vehicles;
  the platform must enforce this
- **IDD-002** — IPID must be available for trafikforsakring specifically
- **IDD-001** — Demands-and-needs assessment must explain the mandatory
  nature of trafikforsakring
- **FSA-004** — Clear communication about coverage scope supports fair
  treatment
- **FSA-012** — Mandatory coverage disclosure is part of pre-contractual
  information

---

## TF-03: Process Personal Injury Claims Under Trafikskadelagen

**As a** claims handler (skadereglerare),
**I want to** process personal injury claims under trafikforsakring separately
from property damage claims,
**so that** compensation follows the strict liability rules of
Trafikskadelagen.

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
  **THEN** the system applies strict liability rules (trafikskadelagen):
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

- **Medical Provider** — Injury documentation and medical certificates
- **Police** — Accident reports for multi-vehicle incidents
- **TFF** — Claims data reporting for industry statistics

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

## TF-04: Prevent Coverage Gaps

**As the** system,
**I want to** prevent policy cancellation without verified replacement
trafikforsakring,
**so that** no vehicle is left without mandatory insurance coverage.

### Acceptance Criteria

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

- **GIVEN** a policyholder's motor insurance is being cancelled by the
  insurer (e.g., non-payment of premium)
  **WHEN** the cancellation takes effect
  **THEN** the system:
  - Notifies Transportstyrelsen of the coverage end date
  - Sends a warning to the policyholder that the vehicle will be uninsured
  - The system records the insurer-initiated cancellation reason

- **GIVEN** a vehicle is being scrapped or exported
  **WHEN** the policyholder provides proof of deregistration
  **THEN** the system allows cancellation without replacement coverage,
  provided Transportstyrelsen confirms the vehicle is deregistered

- **GIVEN** the 14-day cooling-off period (angerratt) applies
  **WHEN** the policyholder exercises angerratt within the first 14 days
  **THEN** the system processes the cancellation but still warns about
  coverage gap consequences and checks for replacement insurance

### Data Requirements

| Data Element                 | Source             | Required |
| ---------------------------- | ------------------ | -------- |
| Cancellation reason          | Policyholder       | Yes      |
| Replacement insurance flag   | Transportstyrelsen | Yes      |
| Vehicle deregistration       | Transportstyrelsen | No       |
| Policyholder acknowledgement | System             | Yes      |
| Coverage end date            | System             | Yes      |

### External Integrations

- **Transportstyrelsen** — Verify replacement insurance status and vehicle
  registration status
- **TFF** — Uninsured vehicle reporting

### Regulatory

- **FSA-007** — Every registered vehicle must have trafikforsakring; the
  platform must prevent coverage gaps where possible
- **FSA-009** — Transportstyrelsen must be notified of coverage end dates
- **FSA-013** — Cooling-off cancellations must still follow coverage gap
  prevention rules
- **GDPR-004** — Cancellation data shared with Transportstyrelsen under
  legal obligation

---

## TF-05: Generate TFF Statutory Reports

**As a** compliance officer (regelefterlevnadsansvarig),
**I want to** generate statutory reports for Trafikforsakringsforeningen (TFF),
**so that** TryggForsakring meets its TFF membership obligations.

### Acceptance Criteria

- **GIVEN** the reporting period end date has been reached
  **WHEN** the compliance officer initiates TFF report generation
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

- **TFF** — Data exchange for statutory reporting

### Regulatory

- **FSA-008** — TFF membership requires regular statutory reporting
- **FSA-006** — Supervisory reporting obligations include trafikforsakring
  data
- **GDPR-004** — TFF reporting involves personal data shared under legal
  obligation; data minimization applies
- **FSA-014** — Reporting data must be retained for audit purposes

---

## TF-06: Route Uninsured and Foreign Vehicle Claims to TFF

**As a** claims handler (skadereglerare),
**I want to** identify and route claims involving uninsured or foreign vehicles
to TFF,
**so that** victims are compensated even when the responsible vehicle lacks
valid Swedish trafikforsakring.

### Acceptance Criteria

- **GIVEN** a traffic accident claim is reported
  **WHEN** the claims handler looks up the responsible vehicle's insurance
  status
  **THEN** the system queries Transportstyrelsen to verify whether the
  vehicle has valid trafikforsakring

- **GIVEN** the responsible vehicle has no valid trafikforsakring
  **WHEN** the system confirms the vehicle is uninsured
  **THEN** the system:
  - Flags the claim as an uninsured vehicle claim
  - Generates a TFF referral with all required claim details
  - Records the referral reference and timestamp
  - Notifies the claims handler that TFF will handle the claim against
    the uninsured vehicle

- **GIVEN** the responsible vehicle is registered in another country
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

### Data Requirements

| Data Element              | Source             | Required |
| ------------------------- | ------------------ | -------- |
| Responsible vehicle reg.  | Claimant/police    | Yes      |
| Insurance status          | Transportstyrelsen | Yes      |
| Vehicle country of origin | Claimant/police    | No       |
| Green Card details        | Claimant           | No       |
| Police report reference   | Police             | Yes      |
| TFF referral reference    | TFF                | Yes      |

### External Integrations

- **Transportstyrelsen** — Vehicle insurance status verification
- **TFF** — Uninsured and foreign vehicle claim referral
- **Police** — Accident reports for hit-and-run and liability determination

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

## TF-07: Cross-Border Coverage via Green Card System

**As a** customer (privatkund),
**I want** my trafikforsakring to provide coverage when I travel in the EU and
Green Card countries,
**so that** I am legally insured while driving abroad.

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

| Data Element             | Source         | Required |
| ------------------------ | -------------- | -------- |
| Policy validity period   | Policy data    | Yes      |
| Green Card document      | System         | Yes      |
| Countries covered        | System config  | Yes      |
| Foreign accident details | Customer input | No       |
| Foreign police report    | Customer       | No       |
| Green Card bureau claim  | TFF/bureau     | No       |

### External Integrations

- **TFF** — Green Card coordination and bureau network
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
   (TF-01)
4. **Acknowledgement** — System receives and records Transportstyrelsen
   confirmation
5. **Monitoring** — System monitors for failed notifications and retries

### Coverage Gap Prevention Flow

1. **Cancellation request** — Policyholder or insurer initiates cancellation
2. **Replacement check** — System queries Transportstyrelsen for replacement
   coverage (TF-04)
3. **Decision point:**
   - Replacement confirmed: proceed with cancellation, align dates
   - No replacement: warn policyholder, require acknowledgement
   - Vehicle deregistered: proceed with cancellation
4. **Notification** — System notifies Transportstyrelsen of coverage end
   date
5. **Records** — System records cancellation details and any
   acknowledgements

### Personal Injury Claims Flow

1. **Claim registration** — Claims handler classifies the claim type
   (TF-03)
2. **Liability determination** — System applies strict liability for
   personal injuries under Trafikskadelagen
3. **Medical documentation** — Claims handler obtains medical evidence
4. **Compensation calculation** — System calculates compensation per
   Trafikskadelagen rules
5. **Settlement** — Claims handler approves and processes payment
6. **TFF reporting** — System includes claim data in TFF reports (TF-05)

---

## Regulatory Traceability Matrix

| Requirement             | TF-01 | TF-02 | TF-03 | TF-04 | TF-05 | TF-06 | TF-07 |
| ----------------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| FSA-004                 |       | X     |       |       |       |       |       |
| FSA-006                 |       |       |       |       | X     |       |       |
| FSA-007                 | X     | X     | X     | X     |       | X     | X     |
| FSA-008                 |       |       |       |       | X     | X     | X     |
| FSA-009                 | X     |       |       | X     |       |       |       |
| FSA-010                 |       |       | X     |       |       | X     |       |
| FSA-012                 |       | X     |       |       |       |       |       |
| FSA-013                 |       |       |       | X     |       |       |       |
| FSA-014                 |       |       |       |       | X     |       |       |
| GDPR-003                |       |       | X     |       |       | X     | X     |
| GDPR-004                | X     |       | X     | X     | X     | X     |       |
| IDD-001                 |       | X     |       |       |       |       |       |
| IDD-002                 |       | X     |       |       |       |       | X     |
| EU Motor Insurance Dir. |       |       |       |       |       |       | X     |

---

## External System Integration Summary

| System             | Integration Point                   | Stories      |
| ------------------ | ----------------------------------- | ------------ |
| Transportstyrelsen | Insurance registration notification | TF-01, TF-04 |
| Transportstyrelsen | Insurance status verification       | TF-04, TF-06 |
| TFF                | Statutory reporting                 | TF-05        |
| TFF                | Uninsured vehicle claim referral    | TF-06        |
| TFF                | Green Card coordination             | TF-07        |
| Medical Providers  | Injury documentation                | TF-03        |
| Police             | Accident reports                    | TF-03, TF-06 |
| Foreign Bureaus    | Cross-border claims via Green Card  | TF-07        |
