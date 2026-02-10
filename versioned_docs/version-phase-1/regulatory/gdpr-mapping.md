---
sidebar_position: 2
---

# GDPR Data Mapping

GDPR compliance mapping for personal data handling within the TryggFörsäkring insurance platform. Each data processing activity has a unique ID (GDPR-001, GDPR-002, etc.) used for cross-referencing from user stories and use cases. GDPR-001 through GDPR-006 cover motor insurance; GDPR-007 through GDPR-009 cover home & property insurance (Phase 2).

## Key Legislation

The following EU regulations and Swedish laws govern personal data processing in the insurance context:

| Regulation / Law                   | Swedish Name                       | Scope                                                         |
| ---------------------------------- | ---------------------------------- | ------------------------------------------------------------- |
| General Data Protection Regulation | EU Förordning 2016/679 (GDPR)      | Personal data processing, data subject rights, accountability |
| Swedish Data Protection Act        | Dataskyddslagen (2018:218)         | Supplements GDPR with Swedish-specific provisions             |
| Swedish Data Protection Ordinance  | Dataskyddsförordningen (2018:219)  | Implementing provisions for Dataskyddslagen                   |
| Motor Traffic Damage Act           | Trafikskadelagen (1975:1410)       | Legal obligation basis for claims data processing             |
| Accounting Act                     | Bokföringslagen (1999:1078)        | Retention periods for financial records                       |
| Insurance Contracts Act            | Försäkringsavtalslagen (2005:104)  | Contract performance basis for policy data                    |
| Housing Cooperative Act            | Bostadsrättslagen (1991:614)       | BRF governance, building insurance obligations (Phase 2)      |
| Real Property Register Act         | Fastighetsregisterlagen (2000:224) | Property data from Lantmäteriet (Phase 2)                     |

**Supervisory Authority:** Integritetsskyddsmyndigheten (IMY) is the Swedish supervisory authority for data protection.

## Personal Data Categories in Motor Insurance

| Category        | Data Elements                                                | Legal Basis (Article 6(1))                      | Retention Period              |
| --------------- | ------------------------------------------------------------ | ----------------------------------------------- | ----------------------------- |
| Identity        | Personnummer, name, address, date of birth, contact details  | (b) Contract performance                        | Duration of policy + 10 years |
| Vehicle         | Registreringsnummer, make, model, year, VIN                  | (b) Contract performance                        | Duration of policy + 10 years |
| Driving history | Bonus class, claims history, license information             | (f) Legitimate interest                         | Duration of policy + 10 years |
| Claims          | Accident details, police reports, witness statements, photos | (b) Contract performance + (c) Legal obligation | 10 years (limitation period)  |
| Medical         | Injury reports from trafikförsäkring claims                  | (c) Legal obligation (Trafikskadelagen)         | 10 years                      |
| Payment         | Bank account, payment history                                | (b) Contract performance                        | 7 years (Bokföringslagen)     |
| Location        | Parking address, accident location                           | (b) Contract performance                        | Duration of policy            |
| Communication   | Emails, call recordings, chat logs                           | (f) Legitimate interest                         | 3 years                       |

### Personal Data Categories in Home & Property Insurance (Phase 2)

| Category       | Data Elements                                                      | Legal Basis (Article 6(1)) | Retention Period              |
| -------------- | ------------------------------------------------------------------ | -------------------------- | ----------------------------- |
| Property       | Address, property type (villa/BRF/hyresrätt), building specs, area | (b) Contract performance   | Duration of policy + 10 years |
| BRF membership | BRF name, org. number, board member names, membership status       | (b) Contract performance   | Duration of policy + 10 years |
| Building       | Construction year, materials, rebuilding cost, renovations         | (b) Contract performance   | Duration of policy + 10 years |
| Contents       | Sum insured, high-value items registry, home inventory             | (b) Contract performance   | Duration of policy + 10 years |
| Restoration    | Damage reports, contractor details, restoration progress           | (b) Contract performance   | 10 years (limitation period)  |
| Geospatial     | Flood zone, proximity to water, terrain data, climate risk zone    | (f) Legitimate interest    | Duration of policy            |

### Swedish-Specific Data Considerations

- **Personnummer:** Processing of personnummer is permitted without consent only when clearly motivated by the purpose, the importance of reliable identification, or other notable reasons (Dataskyddslagen, Section 3:10). Insurance contract administration qualifies as a notable reason.
- **Vehicle registration numbers (registreringsnummer):** Considered personal data when linkable to an individual through Transportstyrelsen's vehicle registry. Must be treated with the same care as other personal identifiers.
- **Transportstyrelsen data sharing:** The platform exchanges data with Transportstyrelsen for vehicle and insurance verification. This processing is based on legal obligation under Trafikskadelagen.

## Data Processing Activities

### GDPR-001: Quote Generation

- **Purpose:** Collect and process personal data to generate an insurance quote, including risk assessment and premium calculation.
- **Legal basis:** Article 6(1)(b) — necessary for steps prior to entering a contract.
- **Data categories:** Identity, vehicle, driving history.
- **Data sources:** Customer input, Transportstyrelsen (vehicle registry lookup), internal claims database.
- **Data minimization:** Collect only data required for risk assessment. Do not request medical data at quote stage. Limit driving history to bonus class and claims count (not full claims details).
- **Retention:** Unconverted quotes retained for 12 months, then deleted. Converted quotes retained as part of the policy record.
- **Recipients:** Internal underwriting systems. Transportstyrelsen (vehicle verification).

### GDPR-002: Policy Administration

- **Purpose:** Store, maintain, and amend policy data throughout the policy lifecycle including renewals, endorsements, and coverage changes.
- **Legal basis:** Article 6(1)(b) — necessary for performance of the insurance contract.
- **Data categories:** Identity, vehicle, driving history, payment, communication.
- **Data sources:** Customer input, Transportstyrelsen, payment providers, internal systems.
- **Data minimization:** Store only data necessary for contract administration. Archive communication records that are no longer actively needed. Do not retain draft documents after final versions are issued.
- **Retention:** Duration of policy + 10 years (Försäkringsrörelselagen record-keeping requirements; see FSA-014).
- **Recipients:** Internal policy administration systems, Transportstyrelsen (policy status notifications), TFF (trafikförsäkring reporting).

### GDPR-003: Claims Processing

- **Purpose:** Register, investigate, assess, and settle insurance claims, including third-party claims under trafikförsäkring.
- **Legal basis:** Article 6(1)(b) — contract performance; Article 6(1)(c) — legal obligation under Trafikskadelagen for third-party liability claims.
- **Data categories:** Identity, vehicle, claims, medical (for personal injury claims), location, communication.
- **Data sources:** Claimant, policyholder, police reports, medical providers, witnesses, repair workshops.
- **Data minimization:** Collect medical data only when personal injury is involved. Limit witness data to contact details and statements relevant to the claim. Photographs should capture damage only — avoid incidental capture of bystanders.
- **Retention:** 10 years from claim closure (Swedish limitation period for insurance claims). Medical records follow the same 10-year retention.
- **Recipients:** Internal claims handling systems, repair workshops (damage assessment), medical advisors (injury assessment), reinsurers (for claims exceeding retention limits), courts (if litigation arises).

### GDPR-004: Transportstyrelsen and TFF Reporting

- **Purpose:** Report policy and claims data to Transportstyrelsen (vehicle registry) and Trafikförsäkringsföreningen (TFF) as required by law.
- **Legal basis:** Article 6(1)(c) — legal obligation under Trafikskadelagen and Trafikförsäkringsförordningen.
- **Data categories:** Identity (policyholder), vehicle, policy status, claims (summary data for TFF).
- **Data sources:** Internal policy and claims systems.
- **Data minimization:** Transmit only the data fields required by Transportstyrelsen and TFF specifications. Do not include supplementary data beyond the mandated schema.
- **Retention:** Transmission logs retained for 3 years for audit purposes. Underlying data follows policy/claims retention periods.
- **Recipients:** Transportstyrelsen, TFF.

### GDPR-005: Marketing and Renewal Communications

- **Purpose:** Send renewal reminders, cross-sell offers, and marketing communications to policyholders and former policyholders.
- **Legal basis:** Article 6(1)(f) — legitimate interest for existing customer marketing; Article 6(1)(a) — consent for broader marketing campaigns.
- **Data categories:** Identity, vehicle, communication.
- **Data sources:** Internal CRM and policy systems.
- **Data minimization:** Use only contact details and basic policy information for targeting. Do not use claims history or medical data for marketing purposes. Segment communications to avoid irrelevant messaging.
- **Retention:** Marketing consent records retained for duration of consent + 1 year. Communication logs retained for 3 years.
- **Recipients:** Internal marketing systems, email/SMS service providers (data processor agreements required).

### GDPR-006: Fraud Detection and Prevention

- **Purpose:** Detect, investigate, and prevent fraudulent insurance claims and applications using data analytics and cross-referencing.
- **Legal basis:** Article 6(1)(f) — legitimate interest in preventing fraud and protecting the insurance portfolio.
- **Data categories:** Identity, vehicle, claims, driving history, location.
- **Data sources:** Internal claims and policy systems, industry fraud databases (GSR — Gemensamt skadeanmälningsregister), police reports.
- **Data minimization:** Access full claims details only for flagged cases. Automated screening should use anonymized or pseudonymized data where possible. Limit access to fraud investigation staff.
- **Retention:** Fraud investigation records retained for 10 years from investigation closure. Cleared cases: flag removed but investigation log retained.
- **Recipients:** Internal fraud investigation team, GSR (industry fraud register), police (when criminal referral is made), reinsurers (for material fraud cases).

### GDPR-007: Property Data Processing

- **Purpose:** Collect and process property-related personal data for home & property insurance underwriting, policy administration, and claims handling. This includes address, property details, BRF membership, building specifications, and rebuilding cost estimates.
- **Legal basis:** Article 6(1)(b) — necessary for performance of the insurance contract; Article 6(1)(f) — legitimate interest for property risk assessment using publicly available data.
- **Data categories:** Identity, property, building, BRF membership, geospatial.
- **Data sources:** Customer input, Lantmäteriet (fastighetsregister — property registry), BRF board (building information), municipality (building permits and zoning), building valuation tools.
- **Data minimization:** Collect only property data required for underwriting and risk assessment. Do not collect interior details beyond what is relevant to coverage (e.g., kitchen renovation status is relevant for rebuilding cost but room-by-room photographs are not). Geospatial risk data should be aggregated at zone level rather than exact-coordinate level where possible.
- **Retention:** Policy-related property data retained for duration of policy + 10 years (FSA-014). Unconverted quotes with property data retained for 12 months, then deleted. Geospatial risk assessments retained for duration of policy.
- **Recipients:** Internal underwriting systems, Lantmäteriet (property verification), building valuation providers (data processor agreements required), reinsurers (for catastrophe exposure assessment).
- **Phase:** Phase 2 — Home & Property

### GDPR-008: Restoration Company Data Sharing

- **Purpose:** Share policyholder personal data with restoration companies (saneringsfirmor), contractors, and building inspectors during the claims handling process for home & property insurance. This is necessary to coordinate damage assessment, drying, restoration, and repair work.
- **Legal basis:** Article 6(1)(b) — necessary for performance of the insurance contract (claims settlement); Article 6(1)(f) — legitimate interest in efficient claims resolution.
- **Data categories:** Identity (policyholder name, contact details, address), property (damage location, building access details), claims (damage description, assessment reports, restoration scope).
- **Data sources:** Internal claims systems, policyholder (damage notification), property inspector reports.
- **Data minimization:** Share only the data necessary for the specific restoration task. Restoration companies receive: policyholder name and contact details (for site access coordination), property address and access instructions, damage description and scope of work. They do not receive: personnummer, policy financial details, claims history, or unrelated personal data. Each contractor receives only the information relevant to their specific role.
- **Retention:** Data sharing logs retained for 10 years from claim closure. Contractor copies of personal data must be returned or deleted after the restoration engagement ends, as specified in the data processing agreement.
- **Recipients:** Approved restoration companies (saneringsfirmor), plumbers, electricians, building inspectors, moisture measurement specialists. All recipients must have valid data processing agreements (Article 28).
- **Phase:** Phase 2 — Home & Property

### GDPR-009: BRF Board Data

- **Purpose:** Process personal data of BRF (bostadsrättsförening) board members in connection with building insurance policies for housing cooperatives. BRF board members act as representatives of the cooperative for insurance matters including policy administration, building maintenance coordination, and claims reporting.
- **Legal basis:** Article 6(1)(b) — necessary for performance of the insurance contract (BRF is the policyholder); Article 6(1)(f) — legitimate interest for verifying authority to act on behalf of the BRF.
- **Data categories:** Identity (board member names, roles, contact details), BRF membership (organization number, board composition, mandate periods).
- **Data sources:** BRF board (direct input), Bolagsverket (organization register for BRF registration verification), Lantmäteriet (property ownership records).
- **Data minimization:** Collect only board member data necessary for insurance administration: name, role (ordförande, ledamot, suppleant), contact details, and mandate period. Do not collect personnummer of board members unless required for specific verification. Limit processing to board members who are authorized signatories or designated insurance contacts.
- **Retention:** Board member data retained for duration of the BRF policy + 10 years (FSA-014). When board composition changes, historical board data is archived but retained for the full retention period to support claims traceability.
- **Recipients:** Internal policy administration systems, building inspectors (for coordinating property inspections), Bolagsverket (for organization verification).
- **Phase:** Phase 2 — Home & Property

## Data Subject Rights

For each GDPR right, the following describes how TryggFörsäkring's motor insurance platform must support the right, including any limitations specific to insurance.

### Right to Access (Article 15)

- **Scope:** Data subjects may request a copy of all personal data held about them, along with information about processing purposes, recipients, retention periods, and the source of data.
- **Process:** The platform must support generating a complete data export for a given personnummer or policy number. The export must cover all data categories listed above — identity, vehicle, claims, payment, communication, and any derived data (e.g., risk scores).
- **Response time:** 30 days from receipt of request (extendable by 60 days for complex requests).
- **Format:** Structured, commonly used, machine-readable format (e.g., JSON or CSV).
- **Limitations:** Third-party data within claims files (e.g., witness statements, opposing party details) may be redacted to protect others' privacy. Internal fraud investigation notes may be withheld if disclosure would prejudice an ongoing investigation.

### Right to Rectification (Article 16)

- **Scope:** Data subjects may request correction of inaccurate personal data or completion of incomplete data.
- **Process:** The platform must allow authorized staff to update identity, contact, and vehicle data upon verified request. Changes must be logged with an audit trail showing the original value, new value, timestamp, and reason for change.
- **Verification:** Identity must be verified (e.g., via BankID) before changes are made to sensitive fields such as personnummer, name, or bank account details.
- **Limitations:** Historical claims records may not be altered, but annotations can be added to note corrections or disputes. Bonus class data sourced from external systems (e.g., previous insurer) must be corrected at the source.

### Right to Erasure (Article 17)

- **Scope:** Data subjects may request deletion of personal data when it is no longer necessary for the original purpose.
- **Process:** The platform must support erasure requests by marking records for deletion and executing deletion after verifying no legal retention obligation applies.
- **Limitations specific to insurance:**
  - Policy records: Cannot be erased during the retention period (policy duration + 10 years) due to FSA-014 record-keeping requirements and potential future claims.
  - Claims records: Cannot be erased within the 10-year limitation period under Swedish law.
  - Payment records: Cannot be erased within the 7-year retention period under Bokföringslagen.
  - Trafikförsäkring records: Cannot be erased while a legal obligation exists under Trafikskadelagen.
- **What CAN be erased:** Marketing preferences, unconverted quotes (after 12-month retention), communication logs (after 3-year retention), and any data processed solely on the basis of consent.

### Right to Data Portability (Article 20)

- **Scope:** Data subjects may request their personal data in a structured, commonly used, machine-readable format and have it transmitted to another controller.
- **Process:** The platform must generate a portability export containing data provided by the data subject (not derived or inferred data).
- **Format:** JSON or CSV, covering: identity data, vehicle data, payment history, and communication preferences.
- **Scope limitations:** Data portability applies only to data processed on the basis of consent or contract performance. It does not cover data processed under legitimate interest or legal obligation. Derived data (risk scores, fraud flags) is excluded.
- **Transmission:** Upon request, the export may be transmitted directly to another insurer if technically feasible.

### Right to Object (Article 21)

- **Scope:** Data subjects may object to processing based on legitimate interest (Article 6(1)(f)).
- **Applicable processing activities:**
  - Marketing and renewal communications (GDPR-005) — objection must be honored immediately and unconditionally.
  - Fraud detection profiling (GDPR-006) — objection must be assessed; the insurer may demonstrate compelling legitimate grounds that override the data subject's interests.
  - Driving history processing for risk assessment (when based on legitimate interest) — objection must be assessed on a case-by-case basis.
- **Process:** The platform must record the objection, cease the relevant processing, and confirm the action to the data subject within 30 days.
- **Marketing opt-out:** Must be available through a self-service portal and honored across all communication channels.

### Right to Restrict Processing (Article 18)

- **Scope:** Data subjects may request temporary restriction of processing in specific circumstances: while accuracy is contested, while an objection is being assessed, when processing is unlawful but the data subject prefers restriction over erasure, or when the insurer no longer needs the data but the data subject requires it for legal claims.
- **Process:** The platform must support a "restricted" status on data records. Restricted data may only be stored — not actively processed, analyzed, or shared — until the restriction is lifted.
- **Implementation:** A restriction flag on the policyholder/claimant record that prevents automated processing while allowing manual review by authorized staff. Ongoing claims processing may continue where required by legal obligation (Trafikskadelagen).
- **Duration:** Restriction remains until the underlying issue is resolved (accuracy verified, objection assessed, etc.).

## Data Protection Impact Assessment (DPIA) Triggers

The following processing activities are likely to require a DPIA under Article 35:

| Activity                                  | Trigger                                                       | Recommended Action          |
| ----------------------------------------- | ------------------------------------------------------------- | --------------------------- |
| Claims processing with medical data       | Processing of special category data (Article 9) at scale      | Conduct DPIA before go-live |
| Fraud detection and prevention            | Automated profiling with legal effects                        | Conduct DPIA before go-live |
| Transportstyrelsen data exchange          | Large-scale processing of personal data with public authority | Assess DPIA necessity       |
| Quote generation with personnummer lookup | Systematic monitoring of data subjects                        | Assess DPIA necessity       |

## Data Processor Requirements

Third-party service providers that process personal data on behalf of TryggFörsäkring must comply with Article 28:

- **Data Processing Agreements (DPA):** Required for all processors (e.g., email/SMS providers, cloud hosting, repair workshop networks, medical advisors).
- **Sub-processor management:** Processors must notify TryggFörsäkring before engaging sub-processors. The platform must maintain a register of all processors and sub-processors.
- **Data transfer safeguards:** If data is transferred outside the EU/EEA, appropriate safeguards must be in place (Standard Contractual Clauses, adequacy decisions, or other mechanisms approved by IMY).

## Cross-reference Guide

When writing user stories or use cases, reference GDPR requirements using the format `GDPR-XXX`. For example:

> **Regulatory:** GDPR-001 (Quote generation data processing), GDPR-003 (Claims processing)

Multiple requirements may apply to a single user story. Always list all applicable GDPR requirement IDs alongside FSA and IDD references.

### GDPR to FSA Cross-references

| GDPR ID  | Related FSA IDs           | Relationship                                                                                                 |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| GDPR-001 | FSA-012                   | Quote generation requires both data collection consent and pre-contractual disclosure                        |
| GDPR-002 | FSA-014                   | Policy data retention aligns with FSA record-keeping requirements                                            |
| GDPR-003 | FSA-010                   | Claims processing must satisfy both GDPR and fair settlement requirements                                    |
| GDPR-004 | FSA-007, FSA-008, FSA-009 | Transportstyrelsen and TFF reporting is both a GDPR legal obligation and FSA regulatory requirement          |
| GDPR-005 | FSA-004                   | Marketing must respect both GDPR consent rules and FSA fair treatment principles                             |
| GDPR-006 | FSA-010                   | Fraud detection must balance data protection with fair claims handling                                       |
| GDPR-007 | FSA-015, FSA-016          | Property data processing supports product suitability and building valuation requirements _(Phase 2)_        |
| GDPR-008 | FSA-017                   | Restoration data sharing must comply with both GDPR and water damage claims handling obligations _(Phase 2)_ |
| GDPR-009 | FSA-015                   | BRF board data processing supports home insurance policy administration _(Phase 2)_                          |
