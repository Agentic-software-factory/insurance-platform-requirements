---
sidebar_position: 2
---

# Quote and Bind — User Stories

User stories for the motor insurance quote-and-bind process. This is the primary
sales flow where a customer (or agent/broker) provides vehicle and personal
details, receives a premium quote, and binds a policy.

## Overview

| ID     | Actor            | Summary                                   |
| ------ | ---------------- | ----------------------------------------- |
| QNB-01 | Private Customer | Get a quick quote by registration number  |
| QNB-02 | Insurance Agent  | Create a quote on behalf of a customer    |
| QNB-03 | System           | Perform demands-and-needs assessment      |
| QNB-04 | Private Customer | Compare coverage tiers side by side       |
| QNB-05 | Private Customer | Sign policy with BankID                   |
| QNB-06 | Private Customer | Receive insurance certificate immediately |
| QNB-07 | Underwriter      | Apply bonus class rules automatically     |
| QNB-08 | System           | Notify Transportstyrelsen of new policy   |

---

## QNB-01: Get a Quick Quote

**As a** private customer (privatkund),
**I want to** get a motor insurance quote by entering my registration number
(registreringsnummer) and personnummer,
**so that** I can see pricing quickly without manual data entry.

### Acceptance Criteria

- **GIVEN** the customer enters a valid registreringsnummer
  **WHEN** the system looks up the vehicle via Transportstyrelsen
  **THEN** vehicle details (make, model, year, owner) are pre-populated
  automatically

- **GIVEN** the customer enters a valid personnummer
  **WHEN** the system verifies identity
  **THEN** the customer's existing bonus class (bonusklass) is retrieved from
  the internal claims database

- **GIVEN** vehicle and customer data are available
  **WHEN** the system calculates the premium
  **THEN** quotes are presented for all three coverage tiers:
  trafikförsäkring, halvförsäkring, and helförsäkring

- **GIVEN** the vehicle is not found in the Transportstyrelsen registry
  **WHEN** the customer submits the registration number
  **THEN** the system displays an error message and allows manual vehicle
  entry as a fallback

- **GIVEN** the customer is a new customer with no claims history
  **WHEN** the premium is calculated
  **THEN** the system applies the default starting bonus class per
  underwriting guidelines

### Data Requirements

| Data Element        | Source             | Required |
| ------------------- | ------------------ | -------- |
| Registreringsnummer | Customer input     | Yes      |
| Personnummer        | Customer input     | Yes      |
| Vehicle make/model  | Transportstyrelsen | Yes      |
| Vehicle year        | Transportstyrelsen | Yes      |
| Vehicle owner       | Transportstyrelsen | Yes      |
| Bonus class         | Internal database  | Yes      |
| Driving history     | Internal database  | No       |

### External Integrations

- **Transportstyrelsen** — Vehicle data lookup via registreringsnummer
- **BankID** — Customer identity verification (if strong auth is required at
  quote stage)

### Regulatory

- **GDPR-001** — Personal data collection for quote generation; legal basis is
  Article 6(1)(b) pre-contractual steps
- **FSA-007** — System must verify that the vehicle requires trafikförsäkring
- **IDD-001** — Demands-and-needs assessment must precede final quote
  presentation (see QNB-03)

---

## QNB-02: Agent-Assisted Quote

**As an** insurance agent (försäkringsagent),
**I want to** create a motor insurance quote on behalf of a customer,
**so that** I can advise them on the appropriate coverage level.

### Acceptance Criteria

- **GIVEN** the agent is authenticated and has valid competence certification
  **WHEN** the agent enters the customer's registreringsnummer and
  personnummer
  **THEN** the system retrieves vehicle and customer data as in QNB-01

- **GIVEN** the agent completes the demands-and-needs assessment (QNB-03) on
  behalf of the customer
  **WHEN** the assessment is submitted
  **THEN** the system generates a coverage recommendation linked to the
  assessment responses

- **GIVEN** the agent creates a quote
  **WHEN** the quote is saved
  **THEN** the system records the agent's identity, the distribution channel
  (agent-assisted), and a timestamp for IDD record-keeping

- **GIVEN** the agent provides a personal recommendation to the customer
  **WHEN** the recommendation is recorded
  **THEN** the system captures the recommended tier, the rationale, and
  whether the customer followed or deviated from the recommendation

- **GIVEN** the agent's competence certification has expired
  **WHEN** the agent attempts to initiate a new quote
  **THEN** the system blocks access and displays a message requiring
  certification renewal

### Data Requirements

| Data Element             | Source             | Required |
| ------------------------ | ------------------ | -------- |
| Agent identity           | Platform login     | Yes      |
| Agent competence status  | HR/training system | Yes      |
| Customer personnummer    | Customer/agent     | Yes      |
| Distribution channel     | System (automatic) | Yes      |
| Recommendation rationale | Agent input        | Yes      |

### External Integrations

- **Transportstyrelsen** — Vehicle data lookup (same as QNB-01)
- **BankID** — Agent authentication

### Regulatory

- **IDD-001** — Agent must perform demands-and-needs assessment before
  recommending a product
- **IDD-005** — Agent must disclose distribution status and remuneration
- **IDD-006** — Personalized recommendation must be documented with rationale
- **IDD-008** — All distribution records must be retained for 5+ years
- **IDD-009** — Agent must have current competence certification
- **FSA-004** — Fair treatment of the customer
- **GDPR-001** — Personal data collection; agent acts under TryggFörsäkring's
  controllership

---

## QNB-03: Demands-and-Needs Assessment

**As the** system,
**I want to** perform a structured demands-and-needs assessment
(krav- och behovsanalys) before presenting coverage options,
**so that** we comply with IDD and recommend appropriate coverage.

### Acceptance Criteria

- **GIVEN** a customer (or agent on their behalf) has entered vehicle and
  personal details
  **WHEN** the quote flow proceeds to coverage selection
  **THEN** the system presents the demands-and-needs assessment form before
  any coverage options are shown

- **GIVEN** the assessment form is presented
  **WHEN** the customer completes all required fields
  **THEN** the system captures responses covering:
  - Vehicle usage pattern (commuting, business, leisure)
  - Annual mileage estimate
  - Parking situation (garage, street, carport)
  - Financial situation regarding deductible (självrisk) tolerance
  - Need for add-on coverages (rental car, roadside assistance, legal
    protection)

- **GIVEN** the assessment is completed
  **WHEN** the system processes the responses
  **THEN** a coverage recommendation is generated indicating:
  - Recommended coverage tier (trafik/halv/hel) with rationale
  - Recommended deductible level with rationale
  - Relevant add-ons based on stated needs

- **GIVEN** the customer deviates from the system recommendation
  **WHEN** the customer selects a different tier or deductible
  **THEN** the system records the deviation and any additional explanation
  provided by the customer

- **GIVEN** the assessment is completed
  **WHEN** the quote is finalized
  **THEN** the assessment record is stored with a unique reference ID and
  linked to the resulting quote and policy

### Data Requirements

| Data Element          | Source         | Required |
| --------------------- | -------------- | -------- |
| Vehicle usage pattern | Customer input | Yes      |
| Annual mileage        | Customer input | Yes      |
| Parking situation     | Customer input | Yes      |
| Deductible tolerance  | Customer input | Yes      |
| Add-on needs          | Customer input | Yes      |
| Recommendation result | System         | Yes      |
| Deviation record      | Customer input | No       |

### Regulatory

- **IDD-001** — This story directly implements the demands-and-needs assessment
  requirement; assessment must be completed before quote finalization
- **IDD-006** — The generated recommendation constitutes advice and must be
  documented per advice requirements
- **IDD-008** — Assessment records must be retained for 5+ years after end of
  customer relationship
- **GDPR-001** — Assessment data is personal data collected under Article
  6(1)(b) pre-contractual steps
- **FSA-004** — Assessment ensures fair treatment by recommending suitable
  products
- **FSA-012** — Assessment is part of the pre-contractual disclosure obligation

---

## QNB-04: Compare Coverage Tiers

**As a** private customer (privatkund),
**I want to** compare trafikförsäkring, halvförsäkring, and helförsäkring
coverage tiers side by side,
**so that** I can make an informed choice about my coverage level.

### Acceptance Criteria

- **GIVEN** the demands-and-needs assessment (QNB-03) is completed
  **WHEN** the system presents coverage options
  **THEN** all three tiers are displayed in a side-by-side comparison with:
  - What is covered in each tier
  - What is not covered in each tier
  - Premium (premie) for each tier
  - Deductible (självrisk) amount for each tier

- **GIVEN** the comparison is displayed
  **WHEN** the customer views the options
  **THEN** the system highlights the recommended tier based on the
  demands-and-needs assessment (QNB-03)

- **GIVEN** optional add-ons are available
  **WHEN** the customer views the comparison
  **THEN** each add-on (rental car, roadside assistance, legal protection)
  is listed with its individual price, clearly separated from the base
  premium

- **GIVEN** the customer selects a coverage tier
  **WHEN** the system updates the quote
  **THEN** the total premium is recalculated including the selected tier and
  any add-ons

- **GIVEN** the IPID for each tier has been generated
  **WHEN** the customer views a coverage tier
  **THEN** the customer can access the corresponding IPID document for that
  tier

### Data Requirements

| Data Element              | Source          | Required |
| ------------------------- | --------------- | -------- |
| Coverage details per tier | Product catalog | Yes      |
| Premium per tier          | Rating engine   | Yes      |
| Deductible per tier       | Product catalog | Yes      |
| Add-on pricing            | Rating engine   | Yes      |
| IPID per tier             | Document store  | Yes      |
| Recommendation highlight  | QNB-03 output   | Yes      |

### Regulatory

- **IDD-002** — IPID must be provided for each product tier before binding
- **IDD-007** — Add-ons must be presented with separate pricing; customer must
  be informed they are optional
- **IDD-001** — Comparison must follow from the demands-and-needs assessment
- **FSA-004** — Comparison must support fair treatment and informed
  decision-making
- **FSA-012** — Coverage terms and exclusions must be clearly disclosed

---

## QNB-05: Sign Policy with BankID

**As a** private customer (privatkund),
**I want to** sign my insurance policy digitally using BankID,
**so that** the process is fully digital and legally binding.

### Acceptance Criteria

- **GIVEN** the customer has selected a coverage tier, deductible, and add-ons
  **WHEN** the customer proceeds to signing
  **THEN** the system presents a binding summary showing:
  - Selected coverage tier and coverage details
  - Premium amount and payment frequency (monthly/annual)
  - Deductible amount
  - Policy effective date
  - Pre-contractual information (IDD-003)
  - Confirmation that the IPID has been provided (IDD-002)
  - Confirmation that the demands-and-needs assessment is recorded (IDD-001)

- **GIVEN** the binding summary is presented
  **WHEN** the customer initiates signing
  **THEN** the system triggers a BankID signing request with the policy
  document hash

- **GIVEN** the customer completes BankID signing
  **WHEN** the signature is verified
  **THEN** the policy is bound with the signing timestamp and BankID
  transaction reference stored

- **GIVEN** BankID signing fails or times out
  **WHEN** the system detects the failure
  **THEN** the customer is shown an error message and can retry without
  re-entering data; the quote remains valid for the configured validity
  period

- **GIVEN** the customer is under 18 years of age
  **WHEN** the system checks the customer's age from personnummer
  **THEN** the system prevents policy binding and displays a message
  indicating that a legal guardian must be the policyholder

### Data Requirements

| Data Element              | Source       | Required |
| ------------------------- | ------------ | -------- |
| BankID transaction ref    | BankID       | Yes      |
| Signing timestamp         | BankID       | Yes      |
| Policy document hash      | System       | Yes      |
| Customer age verification | Personnummer | Yes      |
| Binding summary content   | System       | Yes      |

### External Integrations

- **BankID** — Digital signing and identity verification

### Regulatory

- **IDD-003** — Pre-contractual information must be presented before signing
- **IDD-002** — IPID delivery must be confirmed before signing
- **IDD-001** — Demands-and-needs assessment must be completed before signing
- **IDD-008** — Signing record must be retained as part of distribution records
- **FSA-012** — Contract terms and conditions must be disclosed before binding
- **FSA-013** — Customer must be informed of the 14-day cooling-off right
  (ångerrätt) at the point of signing
- **GDPR-001** — BankID transaction data is personal data; legal basis is
  Article 6(1)(b) contract performance

---

## QNB-06: Receive Insurance Certificate Immediately

**As a** private customer (privatkund),
**I want to** receive my insurance certificate (försäkringsbevis) immediately
after binding,
**so that** I can prove I have valid insurance and drive legally.

### Acceptance Criteria

- **GIVEN** the policy has been bound successfully (QNB-05 completed)
  **WHEN** the binding is confirmed
  **THEN** the system generates a policy number in the format defined by
  TryggFörsäkring's numbering convention

- **GIVEN** the policy number has been assigned
  **WHEN** the system generates confirmation documents
  **THEN** the customer receives:
  - Insurance certificate (försäkringsbevis) with policy number, coverage
    dates, and vehicle details
  - Full policy document with terms and conditions
  - IPID for the selected coverage tier
  - Payment instructions (first premium or direct debit setup)

- **GIVEN** confirmation documents are generated
  **WHEN** the documents are delivered
  **THEN** they are sent via the customer's preferred channel (email,
  digital portal, or both)

- **GIVEN** the policy is bound
  **WHEN** the system processes the new policy
  **THEN** payment setup is initiated per the customer's selected payment
  method (monthly autogiro or annual invoice)

- **GIVEN** the insurance certificate is generated
  **WHEN** the customer views their policy in the self-service portal
  **THEN** the certificate is available for download as a PDF

### Data Requirements

| Data Element            | Source         | Required |
| ----------------------- | -------------- | -------- |
| Policy number           | System         | Yes      |
| Coverage effective date | System/quote   | Yes      |
| Coverage expiry date    | System/quote   | Yes      |
| Vehicle details         | Quote data     | Yes      |
| Customer contact info   | Customer data  | Yes      |
| Payment method          | Customer input | Yes      |

### External Integrations

- **Payment Provider** — Set up recurring premium collection (autogiro) or
  generate invoice

### Regulatory

- **FSA-012** — Policy documents must be provided to the customer after
  binding
- **FSA-007** — Insurance certificate proves the vehicle has valid
  trafikförsäkring
- **FSA-013** — Documents must include information about the 14-day
  cooling-off right (ångerrätt)
- **GDPR-002** — Policy data processing; legal basis is Article 6(1)(b)
  contract performance

---

## QNB-07: Automatic Bonus Class Calculation

**As an** underwriter (riskbedömare),
**I want the** system to apply bonus class (bonusklass) rules automatically
during quoting,
**so that** premiums are calculated correctly based on the customer's
claims-free driving history.

### Acceptance Criteria

- **GIVEN** the customer has an existing bonus class in the system
  **WHEN** a new quote is generated
  **THEN** the current bonus class is applied to the premium calculation

- **GIVEN** the customer is transferring from another insurer
  **WHEN** the customer provides proof of their current bonus class
  **THEN** the system allows manual entry of the transferred bonus class
  subject to verification

- **GIVEN** a new customer with no previous insurance history
  **WHEN** a quote is generated
  **THEN** the system applies the starting bonus class per underwriting
  guidelines

- **GIVEN** the bonus class system uses a scale from 1 (highest premium) to
  a configured maximum (lowest premium)
  **WHEN** the premium is calculated
  **THEN** the correct discount percentage is applied per the published
  bonus table

- **GIVEN** the customer has had claims in the current or previous policy
  period
  **WHEN** the system recalculates the bonus class
  **THEN** the bonus class is reduced according to the claims penalty rules
  defined in underwriting guidelines

### Data Requirements

| Data Element           | Source                | Required |
| ---------------------- | --------------------- | -------- |
| Current bonus class    | Internal database     | Yes      |
| Claims history         | Internal database     | Yes      |
| Transferred bonus      | Customer/prev insurer | No       |
| Bonus scale definition | Underwriting rules    | Yes      |
| Claims penalty rules   | Underwriting rules    | Yes      |

### Regulatory

- **FSA-004** — Bonus class rules must be transparent and applied
  consistently for fair treatment
- **FSA-005** — Bonus rules are part of the product governance framework
- **IDD-004** — Pricing logic including bonus must align with target market
  definitions
- **GDPR-001** — Claims history and bonus class are personal data; processing
  based on Article 6(1)(b) contract performance

---

## QNB-08: Notify Transportstyrelsen of New Policy

**As the** system,
**I want to** notify Transportstyrelsen when a new motor insurance policy is
bound,
**so that** the vehicle registry reflects the current insurance status and the
vehicle is legally insured.

### Acceptance Criteria

- **GIVEN** a new motor insurance policy has been bound (QNB-05 completed)
  **WHEN** the system processes the policy binding event
  **THEN** a notification is sent to Transportstyrelsen containing:
  - Registreringsnummer
  - Policy number
  - Insurance company identifier (TryggFörsäkring)
  - Coverage start date
  - Coverage type (trafikförsäkring, halvförsäkring, or helförsäkring)

- **GIVEN** the notification is sent
  **WHEN** Transportstyrelsen acknowledges receipt
  **THEN** the system records the acknowledgement reference and timestamp

- **GIVEN** the notification fails (network error, validation error)
  **WHEN** the system detects the failure
  **THEN** the notification is queued for automatic retry with exponential
  backoff, and an alert is raised for operations staff after a configured
  number of failures

- **GIVEN** the policy replaces an existing policy from another insurer
  **WHEN** the notification is processed by Transportstyrelsen
  **THEN** the previous insurer's coverage end date is updated in the
  vehicle registry

- **GIVEN** the notification must be sent within regulated timeframes
  **WHEN** the policy is bound
  **THEN** the notification is sent within the same business day or within
  the timeframe specified by Transportstyrelsen's integration
  requirements

### Data Requirements

| Data Element              | Source             | Required |
| ------------------------- | ------------------ | -------- |
| Registreringsnummer       | Policy data        | Yes      |
| Policy number             | System             | Yes      |
| Insurance company ID      | System config      | Yes      |
| Coverage start date       | Policy data        | Yes      |
| Coverage type             | Policy data        | Yes      |
| Acknowledgement reference | Transportstyrelsen | Yes      |

### External Integrations

- **Transportstyrelsen** — Insurance status notification API

### Regulatory

- **FSA-009** — Insurers must notify Transportstyrelsen of policy changes
  within regulated timeframes
- **FSA-007** — Notification ensures the vehicle registry reflects valid
  trafikförsäkring status
- **GDPR-004** — Data sharing with Transportstyrelsen is based on legal
  obligation under Trafikskadelagen

---

## Data Model

The following data entities are central to the quote-and-bind process.

### Quote

| Attribute             | Type     | Description                                   |
| --------------------- | -------- | --------------------------------------------- |
| Quote ID              | String   | Unique identifier for the quote               |
| Customer personnummer | String   | Swedish personal identity number              |
| Registreringsnummer   | String   | Vehicle registration number                   |
| Vehicle make          | String   | From Transportstyrelsen lookup                |
| Vehicle model         | String   | From Transportstyrelsen lookup                |
| Vehicle year          | Integer  | Model year from Transportstyrelsen            |
| Coverage tier         | Enum     | Trafik / Halv / Hel                           |
| Deductible amount     | Decimal  | Selected självrisk in SEK                     |
| Base premium          | Decimal  | Annual premium before add-ons                 |
| Add-ons               | List     | Selected optional coverages with pricing      |
| Total premium         | Decimal  | Base premium + add-on premiums                |
| Payment frequency     | Enum     | Monthly / Annual                              |
| Bonus class applied   | Integer  | Bonus class used for premium calculation      |
| Validity period       | Date     | Quote expiry date                             |
| Assessment reference  | String   | Link to demands-and-needs assessment (QNB-03) |
| IPID version          | String   | Version of IPID provided                      |
| Created timestamp     | DateTime | When the quote was created                    |
| Distribution channel  | Enum     | Digital / Agent / Broker                      |
| Agent ID              | String   | If agent-assisted (nullable)                  |

### Policy

| Attribute              | Type     | Description                             |
| ---------------------- | -------- | --------------------------------------- |
| Policy number          | String   | Unique policy identifier                |
| Quote ID               | String   | Reference to originating quote          |
| Customer personnummer  | String   | Policyholder identity                   |
| Registreringsnummer    | String   | Insured vehicle                         |
| Coverage tier          | Enum     | Trafik / Halv / Hel                     |
| Deductible amount      | Decimal  | Självrisk in SEK                        |
| Total premium          | Decimal  | Bound premium amount                    |
| Payment frequency      | Enum     | Monthly / Annual                        |
| Effective date         | Date     | Coverage start date                     |
| Expiry date            | Date     | Huvudförfallodag (policy anniversary)   |
| Bonus class            | Integer  | Bonus class at time of binding          |
| Status                 | Enum     | Active / Cancelled / Expired            |
| BankID transaction ref | String   | Signing reference                       |
| Signing timestamp      | DateTime | When the policy was signed              |
| Transportstyrelsen ref | String   | Notification acknowledgement reference  |
| Distribution channel   | Enum     | Digital / Agent / Broker                |
| Agent ID               | String   | If agent-assisted (nullable)            |
| Assessment reference   | String   | Link to demands-and-needs assessment    |
| Cooling-off expiry     | Date     | Ångerrätt expiry (14 days from binding) |

### Demands-and-Needs Assessment

| Attribute                | Type     | Description                                   |
| ------------------------ | -------- | --------------------------------------------- |
| Assessment ID            | String   | Unique identifier                             |
| Customer personnummer    | String   | Assessed customer                             |
| Vehicle usage            | Enum     | Commuting / Business / Leisure                |
| Annual mileage           | Integer  | Estimated yearly kilometers                   |
| Parking situation        | Enum     | Garage / Carport / Street / Other             |
| Deductible tolerance     | Enum     | Low / Medium / High                           |
| Add-on needs             | List     | Stated needs for optional coverages           |
| Recommended tier         | Enum     | System recommendation: Trafik / Halv / Hel    |
| Recommended deductible   | Decimal  | Recommended självrisk in SEK                  |
| Recommendation rationale | Text     | Why this tier and deductible were recommended |
| Customer decision        | Enum     | Followed / Deviated                           |
| Deviation explanation    | Text     | Customer's reason for deviating (nullable)    |
| Completed by             | String   | Customer / Agent ID                           |
| Completed timestamp      | DateTime | When the assessment was completed             |

---

## Process Flow

The quote-and-bind process follows this sequence:

1. **Customer identification** — Customer enters registreringsnummer and
   personnummer; system verifies identity (QNB-01 or QNB-02)
2. **Vehicle data lookup** — System retrieves vehicle details from
   Transportstyrelsen
3. **Bonus class retrieval** — System retrieves or calculates the customer's
   current bonus class (QNB-07)
4. **Demands-and-needs assessment** — System guides the customer through the
   structured assessment (QNB-03)
5. **Premium calculation** — System calculates premiums for all three tiers
   using vehicle data, bonus class, and risk factors
6. **Coverage comparison** — Customer reviews and compares tiers with IPID
   access (QNB-04)
7. **Coverage selection** — Customer selects tier, deductible, and optional
   add-ons
8. **Pre-contractual review** — System presents binding summary with all
   required pre-contractual information (IDD-003)
9. **BankID signing** — Customer signs the policy digitally (QNB-05)
10. **Policy issuance** — System generates policy number and insurance
    certificate (QNB-06)
11. **Payment setup** — System initiates premium collection via payment
    provider (QNB-06)
12. **Transportstyrelsen notification** — System notifies the vehicle
    registry (QNB-08)
13. **Confirmation** — Customer receives policy documents, insurance
    certificate, and IPID

---

## Regulatory Traceability Matrix

| Requirement | QNB-01 | QNB-02 | QNB-03 | QNB-04 | QNB-05 | QNB-06 | QNB-07 | QNB-08 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-004     |        | X      | X      | X      | X      |        | X      |        |
| FSA-005     |        |        |        |        |        |        | X      |        |
| FSA-007     | X      |        |        |        |        | X      |        | X      |
| FSA-009     |        |        |        |        |        |        |        | X      |
| FSA-012     |        |        | X      | X      | X      | X      |        |        |
| FSA-013     |        |        |        |        | X      | X      |        |        |
| GDPR-001    | X      | X      | X      |        | X      |        | X      |        |
| GDPR-002    |        |        |        |        |        | X      |        |        |
| GDPR-004    |        |        |        |        |        |        |        | X      |
| IDD-001     | X      | X      | X      | X      | X      |        |        |        |
| IDD-002     |        |        |        | X      | X      |        |        |        |
| IDD-003     |        |        |        |        | X      |        |        |        |
| IDD-004     |        |        |        |        |        |        | X      |        |
| IDD-005     |        | X      |        |        |        |        |        |        |
| IDD-006     |        | X      | X      |        |        |        |        |        |
| IDD-007     |        |        |        | X      |        |        |        |        |
| IDD-008     |        | X      | X      |        | X      |        |        |        |
| IDD-009     |        | X      |        |        |        |        |        |        |

---

## External System Integration Summary

| System             | Integration Point                 | Stories        |
| ------------------ | --------------------------------- | -------------- |
| Transportstyrelsen | Vehicle data lookup               | QNB-01, QNB-02 |
| Transportstyrelsen | Insurance status notification     | QNB-08         |
| BankID             | Customer identity verification    | QNB-01         |
| BankID             | Agent authentication              | QNB-02         |
| BankID             | Digital policy signing            | QNB-05         |
| Payment Provider   | Premium collection setup          | QNB-06         |
| TFF                | Bonus class transfer verification | QNB-07         |
