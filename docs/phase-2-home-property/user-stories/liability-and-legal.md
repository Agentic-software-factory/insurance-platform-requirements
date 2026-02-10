---
sidebar_position: 5
---

# Liability and Legal Expenses Claims — User Stories

User stories for home insurance liability (ansvarsskydd) and legal expenses
(rättsskydd) claims processing. Covers accidental damage to third parties,
liability assessment, settlement negotiation, defense against unfounded claims,
legal dispute applications, lawyer approval, and BRF vs individual liability
boundaries.

## Overview

| ID     | Actor           | Summary                                                                |
| ------ | --------------- | ---------------------------------------------------------------------- |
| HCL-01 | Customer        | Report accidental damage caused to someone else's property             |
| HCL-02 | Claims Handler  | Assess whether the policyholder is legally liable                      |
| HCL-03 | Claims Handler  | Negotiate settlement with the injured party                            |
| HCL-04 | Claims Handler  | Defend the policyholder against unfounded liability claims             |
| HCL-05 | Customer        | Apply for rättsskydd for a legal dispute                               |
| HCL-06 | Claims Handler  | Verify rättsskydd eligibility (dispute type, timing, coverage)         |
| HCL-07 | Claims Handler  | Approve the customer's choice of lawyer and fee estimate               |
| HCL-08 | Customer        | Understand self-retention and coverage cap for legal costs             |
| HCL-09 | Claims Handler  | Identify when a liability claim triggers the injured party's insurance |
| HCL-10 | BRF Board Chair | Determine when BRF liability vs individual liability applies           |

---

## HCL-01: Report Accidental Damage Caused to Third Party

**As a** customer (privatkund),
**I want to** report that I accidentally caused damage to someone else's
property,
**so that** my liability coverage (ansvarsskydd) handles the claim.

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy with liability
  coverage (ansvarsskydd)
  **WHEN** the customer reports accidental damage caused to a third party via
  web, app, or phone
  **THEN** the system creates a liability claim record with claim type
  "Ansvarsskada", records the incident date, location, and description, and
  generates a unique claim number (skadenummer)

- **GIVEN** the customer submits the liability report
  **WHEN** the system processes the initial report
  **THEN** the system captures: description of the incident, identity of the
  injured party (skadelidande), nature and extent of the damage, and whether a
  polisanmälan has been filed

- **GIVEN** the customer has reported the liability incident
  **WHEN** the claim is created
  **THEN** the system sends a confirmation to the customer with the claim
  number, explains the next steps (liability assessment, contact from claims
  handler), and informs the customer not to admit liability or make any
  payments to the injured party

- **GIVEN** the injured party has contacted TryggFörsäkring directly
  **WHEN** the injured party files a claim against the policyholder
  **THEN** the system creates a liability claim linked to the policyholder's
  policy and notifies both the policyholder and the claims handler

### Data Requirements

| Data Element          | Source         | Required |
| --------------------- | -------------- | -------- |
| Incident date/time    | Customer input | Yes      |
| Incident location     | Customer input | Yes      |
| Incident description  | Customer input | Yes      |
| Injured party name    | Customer input | Yes      |
| Injured party contact | Customer input | Yes      |
| Damage description    | Customer input | Yes      |
| Estimated damage cost | Customer input | No       |
| Police report number  | Customer input | No       |
| Policy number         | System lookup  | Yes      |

### External Integrations

- **SMS/Push Gateway** — Customer and injured party notifications

### Regulatory

- **FSA-003** — Timely claims handling; liability claims must be registered
  promptly upon notification
- **FSA-005** — Fair settlement; liability coverage is a core component of
  hemförsäkring
- **GDPR-007** — Personal data of both the policyholder and injured party is
  processed; legal basis is Article 6(1)(b) contract performance and
  Article 6(1)(f) legitimate interest for the injured party's data

---

## HCL-02: Assess Policyholder Legal Liability

**As a** claims handler (skadereglerare),
**I want to** assess whether the policyholder is legally liable for the
reported damage,
**so that** the claim is valid and coverage applies under ansvarsskydd.

### Acceptance Criteria

- **GIVEN** a liability claim has been registered (HCL-01)
  **WHEN** the claims handler opens the claim for assessment
  **THEN** the system displays: the incident details, the policyholder's
  coverage limits (typically up to 5,000,000 SEK), any relevant exclusions,
  and the injured party's damage claim

- **GIVEN** the claims handler assesses liability
  **WHEN** the handler evaluates the evidence
  **THEN** the handler determines one of: (a) policyholder is liable — proceed
  to settlement negotiation, (b) liability is disputed — further investigation
  needed, or (c) policyholder is not liable — reject liability and defend the
  policyholder

- **GIVEN** the claims handler determines the policyholder is liable
  **WHEN** the liability assessment is recorded
  **THEN** the system updates the claim status to "Liability Confirmed",
  records the legal basis for liability (e.g., negligence, strict liability
  under skadeståndslagen), and proceeds to settlement (HCL-03)

- **GIVEN** the claims handler determines the policyholder is not liable
  **WHEN** the liability denial is recorded
  **THEN** the system updates the claim status to "Liability Denied", records
  the rationale, and triggers the defense process (HCL-04) if the injured
  party disputes the denial

- **GIVEN** the liability assessment requires expert investigation
  **WHEN** the claims handler identifies the need for a field inspection or
  expert opinion
  **THEN** the system allows the handler to commission a besiktningsman or
  technical expert and records the referral

### Liability Assessment Factors

| Factor                    | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| Negligence (vårdslöshet)  | Did the policyholder fail to exercise reasonable care?                   |
| Causation (orsakssamband) | Is there a direct link between the act and the damage?                   |
| Strict liability          | Does skadeståndslagen impose liability without negligence?               |
| Contributory negligence   | Did the injured party contribute to the damage?                          |
| Exclusions                | Does the policy exclude this type of liability (e.g., intentional acts)? |

### Data Requirements

| Data Element            | Source               | Required |
| ----------------------- | -------------------- | -------- |
| Liability determination | Claims handler       | Yes      |
| Legal basis             | Claims handler       | Yes      |
| Evidence documents      | Customer/third party | No       |
| Expert opinion          | Besiktningsman       | No       |
| Coverage verification   | System               | Yes      |

### Regulatory

- **FSA-005** — Fair settlement; liability assessment must be objective and
  well-documented
- **FSA-003** — Timely claims handling; assessment must not be unreasonably
  delayed
- **FSA-009** — Complaints handling; the policyholder must be informed of the
  right to complain if they disagree with the assessment
- **IDD-011** — Adequate advice on liability coverage; the customer must
  understand what ansvarsskydd covers

---

## HCL-03: Negotiate Settlement with Injured Party

**As a** claims handler (skadereglerare),
**I want to** negotiate a settlement with the injured party (skadelidande),
**so that** the liability claim is resolved fairly and efficiently.

### Acceptance Criteria

- **GIVEN** the policyholder's liability has been confirmed (HCL-02)
  **WHEN** the claims handler initiates settlement negotiation
  **THEN** the system displays: the injured party's damage claim, supporting
  documentation, the policyholder's coverage limit, and any deductible
  (självrisk) applicable to the policyholder

- **GIVEN** the claims handler evaluates the injured party's claim
  **WHEN** the handler reviews the damage documentation
  **THEN** the handler assesses: whether the claimed amount is reasonable,
  whether supporting evidence substantiates the claim, and whether any
  deductions apply (e.g., betterment, depreciation)

- **GIVEN** the claims handler and injured party reach a settlement agreement
  **WHEN** the settlement amount is agreed
  **THEN** the system records the settlement amount, generates a settlement
  agreement document for the injured party to sign, and calculates the
  policyholder's deductible

- **GIVEN** the settlement amount exceeds a configured threshold (e.g.,
  500,000 SEK)
  **WHEN** the claims handler submits the settlement for approval
  **THEN** the system escalates to a senior claims handler for authorization
  before payment

- **GIVEN** the injured party does not accept the settlement offer
  **WHEN** negotiation fails
  **THEN** the system records the impasse, and the claims handler informs both
  parties of options: further negotiation, mediation, or legal proceedings

### Coverage Limits (Ansvarsskydd)

| Coverage Tier | Liability Limit (SEK) | Deductible (SEK) |
| ------------- | --------------------- | ---------------- |
| Bas           | 5,000,000             | 1,500            |
| Standard      | 5,000,000             | 1,500            |
| Premium       | 10,000,000            | 1,500            |

### Data Requirements

| Data Element         | Source             | Required    |
| -------------------- | ------------------ | ----------- |
| Damage claim amount  | Injured party      | Yes         |
| Damage documentation | Injured party      | Yes         |
| Settlement amount    | Claims handler     | Yes         |
| Settlement agreement | System generated   | Yes         |
| Deductible amount    | System calculation | Yes         |
| Senior approval      | Senior handler     | Conditional |

### External Integrations

- **Payment Provider** — Settlement payment to injured party
- **Document Generation** — Settlement agreement creation

### Regulatory

- **FSA-005** — Fair settlement; the injured party must receive fair
  compensation based on documented losses
- **FSA-003** — Timely claims handling; settlement negotiation must not be
  unreasonably prolonged
- **FSA-009** — Complaints handling; the injured party must be informed of
  the complaints procedure
- **GDPR-007** — Injured party personal and financial data processed under
  Article 6(1)(f) legitimate interest (claims settlement)

---

## HCL-04: Defend Policyholder Against Unfounded Claims

**As a** claims handler (skadereglerare),
**I want to** defend the policyholder against unfounded or exaggerated
liability claims,
**so that** the policyholder is protected from unjustified demands.

### Acceptance Criteria

- **GIVEN** the liability assessment (HCL-02) determines the policyholder is
  not liable or the claim is exaggerated
  **WHEN** the claims handler initiates the defense process
  **THEN** the system records the defense rationale and sends a written denial
  to the injured party with a clear explanation of why liability is rejected

- **GIVEN** the injured party disputes the denial of liability
  **WHEN** the injured party escalates the dispute
  **THEN** the claims handler evaluates whether to engage legal counsel on
  behalf of the policyholder, covered under the ansvarsskydd defense obligation

- **GIVEN** the insurer decides to engage legal counsel for defense
  **WHEN** the defense is initiated
  **THEN** the system records the legal counsel appointment, tracks legal costs
  separately from any potential settlement, and informs the policyholder of the
  defense proceedings

- **GIVEN** the dispute proceeds to court or arbitration
  **WHEN** a judgment or award is rendered
  **THEN** the system records the outcome, processes any ordered payment under
  the liability coverage, and closes the claim

- **GIVEN** the injured party's claim is partially valid
  **WHEN** the claims handler identifies exaggerated elements
  **THEN** the handler negotiates down to the substantiated amount and records
  the adjustment rationale

### Regulatory

- **FSA-005** — Fair settlement; the defense obligation is a core function of
  ansvarsskydd — the insurer must defend the policyholder against unfounded
  claims
- **FSA-009** — Complaints handling; both the policyholder and injured party
  must have access to the complaints process
- **FSA-003** — Timely claims handling; defense proceedings must be conducted
  without unreasonable delay
- **GDPR-007** — Legal proceedings data is processed under Article 6(1)(f)
  legitimate interest

---

## HCL-05: Apply for Rättsskydd for a Legal Dispute

**As a** customer (privatkund),
**I want to** apply for rättsskydd (legal expenses insurance) for a legal
dispute,
**so that** my legal costs are covered under my home insurance policy.

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy with rättsskydd
  coverage
  **WHEN** the customer submits a rättsskydd application via web, app, or phone
  **THEN** the system creates a rättsskydd claim record with claim type
  "Rättsskydd", records the dispute description, opposing party, and generates
  a claim number

- **GIVEN** the customer submits the application
  **WHEN** the system processes the request
  **THEN** the system captures: nature of the dispute, opposing party identity,
  when the dispute arose, whether an attorney has been engaged, and the
  estimated legal costs

- **GIVEN** the customer's application is registered
  **WHEN** the system sends confirmation
  **THEN** the customer receives the claim number, an explanation of
  rättsskydd coverage (percentage covered, cap amount, deductible), and
  expected processing timeline

- **GIVEN** the customer has not yet engaged an attorney
  **WHEN** the customer requests guidance
  **THEN** the system informs the customer of their right to choose their own
  attorney (advokat) and that the attorney's fees must be reasonable and
  approved by the insurer

### Data Requirements

| Data Element          | Source         | Required |
| --------------------- | -------------- | -------- |
| Dispute description   | Customer input | Yes      |
| Opposing party        | Customer input | Yes      |
| Dispute start date    | Customer input | Yes      |
| Attorney name         | Customer input | No       |
| Estimated legal costs | Customer input | No       |
| Policy number         | System lookup  | Yes      |
| Coverage verification | System         | Yes      |

### Regulatory

- **FSA-003** — Timely claims handling; rättsskydd applications must be
  processed promptly
- **FSA-005** — Fair settlement; rättsskydd is a mandatory component of
  hemförsäkring and must be administered per policy terms
- **IDD-011** — Adequate advice; the customer must understand the scope and
  limitations of rättsskydd coverage
- **GDPR-007** — Dispute details and opposing party data processed under
  Article 6(1)(b) contract performance

---

## HCL-06: Verify Rättsskydd Eligibility

**As a** claims handler (skadereglerare),
**I want to** verify that the dispute qualifies for rättsskydd coverage
(dispute type, timing, amount),
**so that** coverage is correctly applied per the policy terms.

### Acceptance Criteria

- **GIVEN** a rättsskydd application has been registered (HCL-05)
  **WHEN** the claims handler opens the application for review
  **THEN** the system displays: the dispute details, policy coverage terms,
  qualifying dispute types, waiting period status, and any prior rättsskydd
  claims

- **GIVEN** the claims handler evaluates eligibility
  **WHEN** the handler checks the dispute type
  **THEN** the system verifies that the dispute falls within covered categories
  (see Qualifying Dispute Types table below) and is not excluded (e.g.,
  disputes arising from criminal proceedings, family law, or business
  activities)

- **GIVEN** the dispute qualifies for rättsskydd
  **WHEN** the handler approves the application
  **THEN** the system updates the claim status to "Rättsskydd Approved",
  records the applicable coverage terms (percentage, cap, deductible), and
  notifies the customer

- **GIVEN** the dispute does not qualify for rättsskydd
  **WHEN** the handler denies the application
  **THEN** the system records the denial reason, sends a written explanation to
  the customer, and informs them of the right to appeal via the complaints
  process

- **GIVEN** the dispute arose before the policy inception or during the
  waiting period (typically 2 years for certain dispute types)
  **WHEN** the handler checks timing
  **THEN** the system flags the timing issue and the handler verifies whether
  the waiting period exclusion applies

### Qualifying Dispute Types

| Category               | Examples                                                  | Covered     |
| ---------------------- | --------------------------------------------------------- | ----------- |
| Property disputes      | Boundary disputes, dolda fel (hidden defects), renovation | Yes         |
| Neighbor disputes      | Noise, tree encroachment, shared facilities               | Yes         |
| Consumer disputes      | Contractor disputes, defective goods above threshold      | Yes         |
| BRF disputes           | Renovation disputes with BRF board, fee disagreements     | Yes         |
| Landlord/tenant        | Eviction disputes, deposit disputes                       | Yes         |
| Employment disputes    | Wrongful termination (if not covered by union)            | Conditional |
| Family law             | Divorce, custody, inheritance                             | No          |
| Criminal proceedings   | Defense in criminal cases                                 | No          |
| Business/commercial    | Disputes arising from business activities                 | No          |
| Disputes under 25k SEK | Minor disputes below the qualifying threshold             | No          |

### Rättsskydd Waiting Period

| Dispute Category    | Waiting Period |
| ------------------- | -------------- |
| Property purchase   | 2 years        |
| Neighbor disputes   | None           |
| Consumer disputes   | None           |
| Employment disputes | 2 years        |

### Regulatory

- **FSA-005** — Fair settlement; eligibility determination must follow
  published policy terms
- **FSA-009** — Complaints handling; the customer must be informed of the
  right to appeal a rättsskydd denial
- **FSA-003** — Timely claims handling; eligibility review must not be
  unreasonably delayed
- **GDPR-007** — Dispute and opposing party data processed under
  Article 6(1)(b) contract performance

---

## HCL-07: Approve Lawyer and Fee Estimate

**As a** claims handler (skadereglerare),
**I want to** approve the customer's choice of lawyer (advokat) and the fee
estimate,
**so that** legal costs are reasonable and within coverage limits.

### Acceptance Criteria

- **GIVEN** the rättsskydd application has been approved (HCL-06)
  **WHEN** the customer submits their chosen lawyer and a fee estimate
  **THEN** the system records the lawyer's name, firm, contact details, and
  the estimated fees (hourly rate, estimated hours, total estimate)

- **GIVEN** the claims handler reviews the fee estimate
  **WHEN** the handler evaluates reasonableness
  **THEN** the handler checks: the hourly rate is within the market range
  (typically 1,500–3,500 SEK/hour excl. VAT), the estimated hours are
  proportionate to the dispute complexity, and the total estimate is within
  the rättsskydd coverage cap

- **GIVEN** the fee estimate is reasonable
  **WHEN** the handler approves the estimate
  **THEN** the system records the approval, notifies the customer, and sets
  the approved budget against which invoices will be checked

- **GIVEN** the fee estimate exceeds the coverage cap or is unreasonably high
  **WHEN** the handler identifies the issue
  **THEN** the handler contacts the customer to discuss alternatives: a
  different lawyer, reduced scope, or partial self-funding for costs exceeding
  the cap

- **GIVEN** the lawyer submits interim invoices during the dispute
  **WHEN** the invoices are received
  **THEN** the system checks each invoice against the approved budget, tracks
  cumulative costs, and alerts the handler when costs approach 80% of the cap

### Rättsskydd Coverage Terms

| Term                | Value                           |
| ------------------- | ------------------------------- |
| Coverage percentage | 75–80% of approved legal costs  |
| Self-retention      | 20–25% of approved legal costs  |
| Base deductible     | 1,500 SEK                       |
| Coverage cap        | Up to 300,000 SEK per dispute   |
| Hourly rate ceiling | Market rate (assessed per case) |

### Data Requirements

| Data Element       | Source         | Required |
| ------------------ | -------------- | -------- |
| Lawyer name        | Customer input | Yes      |
| Lawyer firm        | Customer input | Yes      |
| Hourly rate        | Customer input | Yes      |
| Estimated hours    | Customer input | Yes      |
| Total fee estimate | Customer input | Yes      |
| Approval decision  | Claims handler | Yes      |
| Invoice tracking   | System         | Yes      |

### External Integrations

- **Payment Provider** — Lawyer invoice payments

### Regulatory

- **FSA-005** — Fair settlement; the insurer must assess fee reasonableness
  but cannot unreasonably restrict the customer's choice of lawyer
- **FSA-003** — Timely claims handling; fee approval must not delay the
  customer's access to legal representation
- **IDD-011** — The customer must understand their self-retention obligation
  and coverage cap before incurring costs
- **GDPR-007** — Lawyer and fee data processed under Article 6(1)(b) contract
  performance

---

## HCL-08: Understand Self-Retention and Coverage Cap

**As a** customer (privatkund),
**I want to** understand my self-retention (självrisk) and coverage cap for
legal costs under rättsskydd,
**so that** I can budget for my share of the expenses.

### Acceptance Criteria

- **GIVEN** the customer has an approved rättsskydd claim (HCL-06)
  **WHEN** the customer views the claim details
  **THEN** the system displays: the coverage percentage (75–80%), the
  self-retention percentage (20–25%), the base deductible (1,500 SEK), and the
  coverage cap (up to 300,000 SEK)

- **GIVEN** the customer wants to understand their potential out-of-pocket cost
  **WHEN** the customer accesses the rättsskydd cost calculator
  **THEN** the system provides an estimated breakdown: total estimated legal
  costs, insurer's share, customer's self-retention, and base deductible

- **GIVEN** the legal costs are accumulating during the dispute
  **WHEN** the customer checks the claim status
  **THEN** the system shows: costs incurred to date, insurer's share paid,
  remaining coverage before the cap, and the customer's running self-retention
  balance

- **GIVEN** the estimated legal costs will exceed the coverage cap
  **WHEN** the system projects costs above the cap
  **THEN** the system notifies the customer that costs exceeding the cap are
  the customer's full responsibility and recommends discussing scope with
  their lawyer

### Cost Example

| Element               | Amount (SEK) |
| --------------------- | ------------ |
| Lawyer fees           | 150,000      |
| Court fees            | 5,000        |
| **Total legal costs** | **155,000**  |
| Coverage (80%)        | −124,000     |
| Self-retention (20%)  | 31,000       |
| Base deductible       | 1,500        |
| **Customer pays**     | **32,500**   |
| **Insurer pays**      | **122,500**  |

### Regulatory

- **FSA-012** — Coverage terms including self-retention and caps must be
  clearly disclosed to the customer
- **FSA-005** — Fair settlement; self-retention and cap must be applied per
  the published policy terms
- **IDD-011** — Demands-and-needs; the customer must understand cost-sharing
  before engaging legal representation
- **FSA-004** — Fair treatment; the customer must not be surprised by
  unexpected costs

---

## HCL-09: Identify Cross-Insurance Coordination for Liability Claims

**As a** claims handler (skadereglerare),
**I want to** identify when a liability claim triggers the injured party's own
insurance,
**so that** claims are coordinated between insurers and double payment is
avoided.

### Acceptance Criteria

- **GIVEN** a liability claim has been confirmed (HCL-02)
  **WHEN** the claims handler assesses the injured party's losses
  **THEN** the handler determines whether the injured party has their own
  insurance that covers the same damage (e.g., the injured party's own
  hemförsäkring)

- **GIVEN** the injured party has own insurance covering the damage
  **WHEN** the claims handler identifies the overlap
  **THEN** the system records the injured party's insurer, initiates
  cross-insurer communication, and determines whether the liability insurer
  pays the injured party directly or reimburses the injured party's insurer
  via subrogation

- **GIVEN** both the liability insurer and the injured party's insurer are
  involved
  **WHEN** the claims are coordinated
  **THEN** the system ensures the injured party receives full compensation
  without double payment and records the inter-insurer settlement

- **GIVEN** the injured party's insurer has already paid the injured party
  **WHEN** the injured party's insurer exercises subrogation rights
  **THEN** the system processes the subrogation claim from the other insurer,
  verifies the amount, and settles under the policyholder's liability coverage

- **GIVEN** the liability claim involves multiple injured parties
  **WHEN** the claims handler identifies multiple claimants
  **THEN** the system creates linked sub-claims for each injured party and
  tracks the aggregate against the policyholder's liability limit

### Data Requirements

| Data Element                | Source                | Required    |
| --------------------------- | --------------------- | ----------- |
| Injured party insurer       | Injured party/handler | Conditional |
| Injured party policy number | Injured party         | Conditional |
| Subrogation claim amount    | Other insurer         | Conditional |
| Inter-insurer settlement    | System                | Conditional |
| Aggregate liability         | System calculation    | Yes         |

### External Integrations

- **Other insurers** — Cross-insurer claim coordination and subrogation
- **GSR (Gemensamt Skadeanmälningsregister)** — Shared claims register for
  fraud prevention and claim coordination

### Regulatory

- **FSA-005** — Fair settlement; the injured party must receive full
  compensation regardless of which insurer ultimately bears the cost
- **FSA-003** — Timely claims handling; cross-insurer coordination must not
  unduly delay the injured party's compensation
- **GDPR-007** — Injured party data shared between insurers must be limited
  to what is necessary; legal basis is Article 6(1)(f) legitimate interest

---

## HCL-10: Determine BRF Liability vs Individual Liability

**As a** BRF board chair (BRF-styrelseordförande),
**I want to** understand when BRF liability vs individual member liability
applies,
**so that** the correct insurance policy responds to a liability claim.

### Acceptance Criteria

- **GIVEN** a liability incident occurs in a BRF property (e.g., water leak
  from one apartment damages another)
  **WHEN** the claims handler assesses the claim
  **THEN** the system presents the BRF/individual liability boundary tool
  showing: the BRF's responsibility for common areas and building structure,
  the individual member's responsibility for their own apartment interior, and
  the applicable provisions from bostadsrättslagen and the BRF's stadgar

- **GIVEN** the claims handler uses the boundary tool
  **WHEN** the handler determines responsibility
  **THEN** the system records: which party is liable (BRF or individual), the
  legal basis (bostadsrättslagen chapter 7, BRF stadgar), and which insurance
  policy should respond (BRF's fastighetsförsäkring or member's
  bostadsrättsförsäkring)

- **GIVEN** the damage is caused by a defect in the BRF building structure
  (e.g., shared plumbing, roof, foundation)
  **WHEN** the assessment determines BRF liability
  **THEN** the system routes the claim to the BRF's property insurer and
  informs the BRF board chair of the claim status

- **GIVEN** the damage is caused by the individual member's negligence or
  their apartment's internal installations
  **WHEN** the assessment determines individual liability
  **THEN** the system processes the claim under the member's
  bostadsrättsförsäkring liability coverage

- **GIVEN** the BRF/individual boundary is ambiguous or disputed
  **WHEN** the claims handler cannot determine responsibility
  **THEN** the system escalates to a senior claims handler who reviews the
  BRF stadgar, engages a besiktningsman if needed, and records the
  determination with documented rationale

### BRF vs Individual Liability Boundaries

| Area                          | BRF Responsibility          | Individual Responsibility  |
| ----------------------------- | --------------------------- | -------------------------- |
| Building structure (stomme)   | Yes                         | No                         |
| Common plumbing (stamledning) | Yes                         | No                         |
| Apartment interior            | No                          | Yes                        |
| Apartment plumbing (from tap) | No                          | Yes                        |
| Balcony/patio                 | Shared (per stadgar)        | Shared (per stadgar)       |
| Facade windows                | Yes (unless stadgar differ) | No (unless stadgar differ) |
| White goods (appliances)      | No                          | Yes                        |

### Regulatory

- **FSA-005** — Fair settlement; the correct insurer must respond based on
  the liability determination
- **FSA-009** — Complaints handling; the BRF board and individual member must
  be informed of the complaints process if they disagree with the liability
  determination
- **FSA-003** — Timely claims handling; BRF boundary disputes must not unduly
  delay the injured party's compensation
- **GDPR-007** — BRF member data shared between the BRF insurer and member's
  insurer must be limited to what is necessary; legal basis is Article 6(1)(f)

---

## Data Model

### LiabilityClaimRecord

| Attribute               | Type     | Description                                               |
| ----------------------- | -------- | --------------------------------------------------------- |
| Claim number            | String   | Unique skadenummer                                        |
| Policy number           | String   | Reference to the home insurance policy                    |
| Claim type              | Enum     | Ansvarsskada / Rättsskydd                                 |
| Incident date/time      | DateTime | When the incident occurred                                |
| Incident location       | String   | Where the incident occurred                               |
| Incident description    | String   | Detailed description of the event                         |
| Injured party name      | String   | Name of the third-party claimant                          |
| Injured party contact   | String   | Contact details of the injured party                      |
| Liability determination | Enum     | Confirmed / Denied / Under Investigation                  |
| Legal basis             | String   | Skadeståndslagen reference or other legal basis           |
| Damage claim amount     | Decimal  | Amount claimed by the injured party (SEK)                 |
| Settlement amount       | Decimal  | Agreed settlement amount (SEK)                            |
| Deductible applied      | Decimal  | Självrisk amount (SEK)                                    |
| Defense initiated       | Boolean  | Whether defense proceedings have been started             |
| Cross-insurer flag      | Boolean  | Whether the injured party's insurer is involved           |
| Status                  | Enum     | Reported / Under Assessment / Settled / Defended / Closed |
| Claims handler ID       | String   | Assigned handler identity                                 |
| Created timestamp       | DateTime | When the claim was created                                |

### RättsskyddClaimRecord

| Attribute             | Type     | Description                                             |
| --------------------- | -------- | ------------------------------------------------------- |
| Claim number          | String   | Unique skadenummer                                      |
| Policy number         | String   | Reference to the home insurance policy                  |
| Dispute description   | String   | Nature of the legal dispute                             |
| Opposing party        | String   | Identity of the opposing party                          |
| Dispute category      | Enum     | Property / Neighbor / Consumer / BRF / Employment       |
| Dispute start date    | Date     | When the dispute arose                                  |
| Waiting period check  | Boolean  | Whether the waiting period has been verified            |
| Eligibility status    | Enum     | Approved / Denied / Under Review                        |
| Lawyer name           | String   | Customer's chosen attorney                              |
| Lawyer firm           | String   | Attorney's firm                                         |
| Approved fee estimate | Decimal  | Approved legal cost budget (SEK)                        |
| Costs incurred        | Decimal  | Cumulative legal costs to date (SEK)                    |
| Coverage percentage   | Decimal  | Percentage covered by the insurer (75–80%)              |
| Self-retention amount | Decimal  | Customer's share of costs (SEK)                         |
| Coverage cap          | Decimal  | Maximum insurer payout (SEK)                            |
| Base deductible       | Decimal  | Fixed deductible amount (SEK)                           |
| Status                | Enum     | Applied / Approved / Active / Settled / Denied / Closed |
| Claims handler ID     | String   | Assigned handler identity                               |
| Created timestamp     | DateTime | When the claim was created                              |

---

## Regulatory Traceability Matrix

| Requirement | HCL-01 | HCL-02 | HCL-03 | HCL-04 | HCL-05 | HCL-06 | HCL-07 | HCL-08 | HCL-09 | HCL-10 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-003     | X      | X      | X      | X      | X      | X      | X      |        | X      | X      |
| FSA-004     |        |        |        |        |        |        |        | X      |        |        |
| FSA-005     | X      | X      | X      | X      | X      | X      | X      | X      | X      | X      |
| FSA-009     |        | X      | X      | X      |        | X      |        |        |        | X      |
| FSA-012     |        |        |        |        |        |        |        | X      |        |        |
| GDPR-007    | X      |        | X      | X      | X      | X      | X      |        | X      | X      |
| IDD-011     |        | X      |        |        | X      |        | X      | X      |        |        |
