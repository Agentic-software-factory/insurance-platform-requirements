---
sidebar_position: 3
---

# IDD Compliance

Insurance Distribution Directive (IDD) compliance requirements for the TryggFörsäkring insurance platform. The IDD governs how insurance products are sold and distributed, mandating demands-and-needs assessments, pre-contractual information, and product governance. Each requirement has a unique ID (IDD-001, IDD-002, etc.) used for cross-referencing from user stories and use cases. IDD-001 through IDD-010 cover motor insurance; IDD-011 through IDD-013 cover home & property insurance (Phase 2).

## Key Legislation

The following EU directives and Swedish laws form the legal basis for IDD compliance:

| Directive / Law                    | Swedish Name / Reference                          | Scope                                                           |
| ---------------------------------- | ------------------------------------------------- | --------------------------------------------------------------- |
| Insurance Distribution Directive   | Direktiv (EU) 2016/97 (IDD)                       | Distribution rules, demands-and-needs, IPID, product governance |
| Swedish Insurance Distribution Act | Lag om försäkringsdistribution (2018:1219)        | Swedish transposition of IDD                                    |
| Insurance Distribution Ordinance   | Förordning om försäkringsdistribution (2018:1231) | Implementing provisions                                         |
| FSA Regulations on Distribution    | FFFS 2018:10                                      | Detailed rules for insurance distributors                       |
| Insurance Contracts Act            | Försäkringsavtalslagen (2005:104)                 | Consumer contract rules, disclosure, pre-contractual duties     |
| EU Commission Delegated Regulation | Förordning (EU) 2017/2358                         | Product oversight and governance (POG) requirements             |
| EU Commission Delegated Regulation | Förordning (EU) 2017/2359                         | Information requirements and conduct of business rules          |

**Supervisory Authority:** Finansinspektionen (FSA) supervises compliance with the Insurance Distribution Act and related regulations.

## Requirement Summary

| ID                                                              | Area                            | Short Description                                                      |
| --------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| [IDD-001](#idd-001-demands-and-needs-assessment)                | Demands and Needs               | Assess customer needs before recommending a product                    |
| [IDD-002](#idd-002-insurance-product-information-document-ipid) | IPID                            | Standardized product information document                              |
| [IDD-003](#idd-003-pre-contractual-information)                 | Pre-contractual Information     | Identity, complaints, and conflict of interest details                 |
| [IDD-004](#idd-004-product-oversight-and-governance)            | Product Governance              | Target market, monitoring, and distribution strategy                   |
| [IDD-005](#idd-005-disclosure-of-distribution-status)           | Disclosure                      | Registration status and remuneration transparency                      |
| [IDD-006](#idd-006-advice-and-recommendation-requirements)      | Advice                          | Personalized recommendation obligations                                |
| [IDD-007](#idd-007-cross-selling-requirements)                  | Cross-selling                   | Rules for bundled and optional add-on products                         |
| [IDD-008](#idd-008-record-keeping-for-distribution)             | Record Keeping                  | Retention of distribution and advisory records                         |
| [IDD-009](#idd-009-professional-competence-and-training)        | Competence                      | Staff knowledge and ongoing training requirements                      |
| [IDD-010](#idd-010-complaints-handling-for-distribution)        | Complaints                      | Distribution-specific complaints procedures                            |
| [IDD-011](#idd-011-demands-and-needs--home)                     | Demands and Needs — Home        | Needs assessment for home products: BRF vs villa vs rental _(Phase 2)_ |
| [IDD-012](#idd-012-product-complexity-disclosure)               | Product Complexity Disclosure   | Explaining coverage gaps (allrisk, flood exclusions) _(Phase 2)_       |
| [IDD-013](#idd-013-cross-selling-governance--home)              | Cross-selling Governance — Home | Rules for bundling home + travel + ID-skydd _(Phase 2)_                |

## Detailed Requirements

### IDD-001: Demands and Needs Assessment

- **Description:** Before recommending or concluding an insurance contract, the distributor must assess the customer's demands and needs (krav- och behovsanalys). The assessment must identify the customer's requirements and ensure the proposed product is consistent with those requirements. For motor insurance, this includes determining the appropriate coverage tier, deductible level, and optional add-ons.
- **Legal basis:** IDD Article 20; Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 3; FFFS 2018:10, Chapter 4
- **Motor insurance application:**
  - Determine appropriate coverage tier: trafikförsäkring (mandatory third-party liability), halvförsäkring (partial comprehensive), or helförsäkring (full comprehensive)
  - Assess suitable deductible level based on the customer's financial situation and risk tolerance
  - Evaluate need for optional add-ons (e.g., rental car coverage, roadside assistance, legal protection)
  - Consider vehicle value, age, and usage pattern (commuting, business, leisure)
  - Document the assessment and the rationale for the recommendation
- **Platform impact:** The quote workflow must include a structured demands-and-needs assessment step before presenting product options. The platform must capture assessment responses, store the recommended product configuration, and record the rationale linking the recommendation to the customer's stated needs. The assessment must be completed before a quote can be finalized.
- **Evidence requirements:** Retain the completed assessment form, the recommended product, the rationale for the recommendation, and the customer's acceptance or deviation from the recommendation. Records must be retained for the duration of the customer relationship plus 10 years.

### IDD-002: Insurance Product Information Document (IPID)

- **Description:** For all non-life insurance products, the distributor must provide the customer with a standardized Insurance Product Information Document (IPID — försäkringsproduktinformationsdokument) before the contract is concluded. The IPID must follow a prescribed format and use plain language.
- **Legal basis:** IDD Article 20(8); EU Commission Implementing Regulation 2017/1469 (IPID format); Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 4; FFFS 2018:10, Chapter 5
- **Motor insurance application:**
  - One IPID per motor product tier (trafikförsäkring, halvförsäkring, helförsäkring)
  - Must answer the standardized questions:
    - What is this type of insurance?
    - What is insured?
    - What is not insured?
    - Are there any restrictions on coverage?
    - Where am I covered?
    - What are my obligations?
    - When and how do I pay?
    - When does the coverage begin and end?
    - How do I cancel the contract?
  - Must be available in Swedish
  - Must be provided before binding, not after
- **Platform impact:** The platform must generate or serve the correct IPID for each product tier during the quote-to-bind workflow. The IPID must be presented to the customer before contract conclusion. The system must log that the IPID was provided, including the timestamp and the specific document version.
- **Evidence requirements:** Retain a copy of the IPID version provided to each customer, along with the timestamp and delivery method (digital display, email, download). IPID templates must be version-controlled with approval dates.

### IDD-003: Pre-contractual Information

- **Description:** Before concluding an insurance contract, the distributor must provide the customer with specific pre-contractual information about the distributor and the nature of the distribution service. This ensures transparency about who is selling the insurance and how they are compensated.
- **Legal basis:** IDD Articles 18 and 19; Lag om försäkringsdistribution (2018:1219), Chapter 4, Sections 1-2; FFFS 2018:10, Chapter 3
- **Motor insurance application:**
  - Identity and address of the insurer (TryggFörsäkring AB)
  - Registration status with Finansinspektionen (Bolagsverket insurance register)
  - Complaints handling procedures and contact information
  - Out-of-court dispute resolution options (Allmänna reklamationsnämnden — ARN, Personförsäkringsnämnden)
  - Conflicts of interest disclosure (if applicable)
  - Nature and basis of remuneration for intermediaries (commission, fee, or other)
  - Whether advice is provided as part of the distribution
- **Platform impact:** The quote-to-bind workflow must display or deliver the required pre-contractual information before contract conclusion. For direct digital sales, this information must be presented on-screen with a confirmation step. The platform must store a record of which information was presented and when.
- **Evidence requirements:** Retain proof that pre-contractual information was provided to the customer before contract conclusion. Log the information version, delivery timestamp, and customer acknowledgement.

### IDD-004: Product Oversight and Governance

- **Description:** Insurance manufacturers (product creators) must implement product oversight and governance (POG) arrangements. This includes identifying the target market for each product, designing products that meet the target market's needs, choosing appropriate distribution strategies, and regularly reviewing products.
- **Legal basis:** IDD Article 25; EU Commission Delegated Regulation 2017/2358; Lag om försäkringsdistribution (2018:1219), Chapter 5; FFFS 2018:10, Chapter 6
- **Motor insurance application:**
  - **Trafikförsäkring target market:** All vehicle owners in Sweden (mandatory). No exclusion criteria — coverage must be offered to all applicants.
  - **Halvförsäkring target market:** Vehicle owners seeking broader protection beyond mandatory liability. Typical profile: mid-value vehicles where the additional premium is proportionate to vehicle value.
  - **Helförsäkring target market:** Vehicle owners seeking comprehensive protection including own-damage coverage. Typical profile: newer or higher-value vehicles where full coverage is cost-effective relative to vehicle value.
  - Product review cycle: Annual review of each product tier, assessing claims ratios, customer complaints, cancellation rates, and target market alignment.
  - Distribution strategy: Digital self-service (primary), agent-assisted (secondary), broker channel (where applicable).
- **Platform impact:** The platform must store target market definitions for each product tier. Product performance data (claims ratios, complaint counts, cancellation rates, renewal rates) must be available for the annual product review. The system must support reporting that compares actual customer profiles against target market definitions.
- **Evidence requirements:** Retain target market documentation for each product tier, product review reports (annual), distribution strategy assessments, and minutes from product governance committee meetings. Records must be available for FSA inspection.

### IDD-005: Disclosure of Distribution Status

- **Description:** Insurance distributors must disclose their registration status, the nature of their remuneration, and whether they provide advice. This requirement ensures customers understand who they are dealing with and how the distributor is compensated.
- **Legal basis:** IDD Article 19; Lag om försäkringsdistribution (2018:1219), Chapter 4, Sections 1-2; FFFS 2018:10, Chapter 3
- **Motor insurance application:**
  - For direct sales by TryggFörsäkring: disclose that the company is an insurance company (not a broker or agent), registered with Finansinspektionen
  - For agent-distributed sales: disclose the agent's registration with Bolagsverket, the relationship with TryggFörsäkring, and whether the agent represents one or multiple insurers
  - For broker-distributed sales: disclose broker's independence, fee structure, and duty to act in the customer's best interest
  - Remuneration disclosure: whether the distributor receives commission, fees, or other economic benefits in connection with the sale
- **Platform impact:** The platform must display the relevant distribution status disclosures based on the active distribution channel. Channel-specific disclosure templates must be configurable. For digital self-service, disclosures must be presented in the quote flow. For agent/broker channels, the system must generate disclosure documents for the intermediary to provide.
- **Evidence requirements:** Retain records of disclosures made to each customer, including the distribution channel, disclosure content, and timestamp. Agent and broker registration details must be verified and stored.

### IDD-006: Advice and Recommendation Requirements

- **Description:** When a distributor provides a personal recommendation (rådgivning) to a customer regarding a specific insurance product, additional requirements apply. The recommendation must be based on the demands-and-needs assessment and must explain why the recommended product best meets the customer's requirements.
- **Legal basis:** IDD Article 20(1); Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 5; FFFS 2018:10, Chapter 4
- **Motor insurance application:**
  - When an agent or call center representative recommends a specific coverage tier (e.g., helförsäkring over halvförsäkring), this constitutes advice
  - The recommendation must reference the customer's specific demands and needs (from IDD-001)
  - The rationale must explain why the recommended tier, deductible, and add-ons suit the customer's situation
  - Digital self-service flows that present a "recommended" option based on customer input also constitute advice and must follow the same documentation requirements
- **Platform impact:** The platform must distinguish between pure information provision and personalized advice. When advice is given, the system must capture and store the recommendation rationale, linking it to the demands-and-needs assessment (IDD-001). The recommendation record must include what was recommended, why, and whether the customer followed or deviated from the recommendation.
- **Evidence requirements:** Retain the recommendation record, the linked demands-and-needs assessment, and the customer's decision. If the customer chose a product different from the recommendation, record this deviation and any additional information provided.

### IDD-007: Cross-selling Requirements

- **Description:** When an insurance product is offered together with an ancillary product or service as a package, or when optional add-ons are offered alongside a core product, the distributor must inform the customer whether the components can be purchased separately and provide separate cost information for each component.
- **Legal basis:** IDD Article 24; Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 7; FFFS 2018:10, Chapter 7
- **Motor insurance application:**
  - Motor insurance is often sold with optional add-ons: rental car coverage, roadside assistance (vägassistans), legal protection (rättsskydd), personal injury protection, luggage coverage
  - Each add-on must be presented with its individual cost, clearly separated from the base premium
  - The customer must be informed that add-ons are optional and can be declined without affecting the core coverage
  - If motor insurance is bundled with non-insurance services (e.g., vehicle tracking), the insurance component must be separately identifiable
- **Platform impact:** The quote workflow must present add-on options with individual pricing. The base premium and each add-on premium must be itemized separately. The system must allow customers to select or deselect individual add-ons. The final quote summary must show a clear breakdown of all components.
- **Evidence requirements:** Retain the quote breakdown showing base premium and individual add-on pricing for each customer. Record which add-ons were presented, selected, and declined.

### IDD-008: Record Keeping for Distribution

- **Description:** Insurance distributors must retain records of all distribution activities, including demands-and-needs assessments, advice given, pre-contractual information provided, and the outcome of each distribution interaction. Records must be available for supervisory review.
- **Legal basis:** IDD Article 16; Lag om försäkringsdistribution (2018:1219), Chapter 3, Section 4; FFFS 2018:10, Chapter 8
- **Motor insurance application:**
  - All motor insurance distribution records must be retained, including digital self-service interactions, agent-assisted sales, and broker-mediated transactions
  - Records include: demands-and-needs assessment responses, IPID delivery confirmation, pre-contractual information delivery, advice documentation, quote versions, and binding confirmation
  - For digital channels: capture session data, user interactions with assessment forms, and document delivery timestamps
  - For agent/broker channels: capture advisor identity, interaction date, and all documentation exchanged
- **Platform impact:** The platform must create and retain an auditable distribution record for each customer interaction that results in a quote or policy. The record must link all IDD-required documentation (assessment, IPID, disclosures, advice) into a single traceable chain. Records must be searchable and exportable for supervisory inspection.
- **Evidence requirements:** Retain complete distribution records for a minimum of 5 years after the end of the customer relationship (per Lag om försäkringsdistribution, Chapter 3). Records must include timestamps, document versions, and user/advisor identifiers.

### IDD-009: Professional Competence and Training

- **Description:** All persons involved in insurance distribution must possess appropriate knowledge and competence. This includes product knowledge, regulatory knowledge, claims handling knowledge, and complaints handling knowledge. Ongoing professional development (at least 15 hours per year) is required.
- **Legal basis:** IDD Article 10; Lag om försäkringsdistribution (2018:1219), Chapter 2, Sections 3-5; FFFS 2018:10, Chapter 2
- **Motor insurance application:**
  - Staff involved in motor insurance distribution must understand: motor coverage tiers (trafik/halv/hel), bonus system mechanics, trafikförsäkring obligations, claims reporting procedures, and customer rights
  - Annual training must cover regulatory updates (FSA directives, IDD amendments), product changes, and complaints handling
  - Competence requirements apply to call center agents, digital channel support staff, and any tied agents distributing TryggFörsäkring motor products
- **Platform impact:** The platform should support competence verification — for example, restricting access to distribution functions until the user's competence certification is current. Training completion status can be managed in an external HR system, but the platform must enforce access controls based on competence status.
- **Evidence requirements:** Retain training records for all distribution staff, including completion dates, topics covered, and hours logged. Maintain a register of current competence certifications. Records must be available for FSA inspection.

### IDD-010: Complaints Handling for Distribution

- **Description:** Insurance distributors must establish and maintain procedures for handling complaints related to the distribution of insurance products. Complaints must be acknowledged, investigated, and resolved in a timely manner. Complainants must be informed of out-of-court resolution options.
- **Legal basis:** IDD Article 14; Lag om försäkringsdistribution (2018:1219), Chapter 3, Section 2; FFFS 2018:10, Chapter 9
- **Motor insurance application:**
  - Complaints related to the sales process, advice quality, product information adequacy, or claims handling communication must be captured
  - The platform must distinguish between product/claims complaints (handled under FSA-011) and distribution-specific complaints
  - Complainants must be informed of their right to refer the matter to Allmänna reklamationsnämnden (ARN) or Personförsäkringsnämnden
  - For motor insurance: common complaint categories include disputed coverage tier recommendations, add-on mis-selling, and inadequate demands-and-needs assessment
- **Platform impact:** The complaints module must support categorization of complaints as distribution-related. The system must track complaint source (distribution channel), link complaints to the relevant distribution record, and generate reports on distribution complaint volumes and outcomes.
- **Evidence requirements:** Retain complaint records including the nature of the complaint, the distribution channel involved, investigation findings, resolution outcome, and time to resolution. Aggregate complaint data must be available for POG product reviews (IDD-004) and FSA reporting (FSA-011).

### IDD-011: Demands and Needs — Home

- **Description:** Before recommending or concluding a home & property insurance contract, the distributor must perform a demands-and-needs assessment (krav- och behovsanalys) specific to the customer's housing situation. The assessment must determine the customer's housing type (villa, bostadsrätt, or hyresrätt), identify the appropriate product variant, and evaluate the need for supplementary coverage. Home insurance presents distinct assessment challenges compared to motor insurance because the product structure varies significantly by housing type.
- **Legal basis:** IDD Article 20; Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 3; FFFS 2018:10, Chapter 4
- **Home insurance application:**
  - Determine housing type: villa (detached house), bostadsrätt (housing cooperative apartment), or hyresrätt (rental apartment)
  - For villa: assess building insurance needs (rebuilding cost, building age, construction materials), contents coverage level, and liability coverage
  - For bostadsrätt: assess need for bostadsrättstillägg (BRF supplement covering interior fittings and improvements), contents coverage level, and whether the BRF's collective building insurance is adequate
  - For hyresrätt: assess contents and liability coverage needs (no building component)
  - Evaluate need for supplementary coverage: allriskförsäkring (accidental damage), ID-skydd (identity theft protection), bostadsrättstillägg, trädgårdsförsäkring (garden insurance for villa)
  - Assess appropriate deductible level based on the customer's financial situation
  - Document the assessment and the rationale for the recommendation
- **Platform impact:** The quote workflow must include a structured demands-and-needs assessment that branches based on housing type. The assessment must capture the customer's housing situation, ownership status, property details, and coverage preferences before presenting product options. The platform must store the assessment responses, the recommended product configuration, and the rationale linking the recommendation to the customer's stated needs.
- **Evidence requirements:** Retain the completed assessment form, the housing type determination, the recommended product variant, the rationale for the recommendation, and the customer's acceptance or deviation from the recommendation. Records must be retained for the duration of the customer relationship plus 10 years.
- **Phase:** Phase 2 — Home & Property

### IDD-012: Product Complexity Disclosure

- **Description:** Home & property insurance products contain significant complexity that must be disclosed to the customer before contract conclusion. Coverage gaps between standard hemförsäkring and allriskförsäkring must be clearly explained. Common exclusions (flood from natural watercourses, subsidence, gradual damage) must be highlighted because customers frequently misunderstand what their home insurance covers. The distributor must ensure the customer understands the distinction between covered perils and excluded events.
- **Legal basis:** IDD Article 20; Lag om försäkringsdistribution (2018:1219), Chapter 4, Sections 3-4; FFFS 2018:10, Chapters 4-5; Försäkringsavtalslagen (2005:104), Chapter 2 (disclosure)
- **Home insurance application:**
  - Clearly distinguish between standard hemförsäkring (named-perils coverage) and allriskförsäkring (accidental damage coverage)
  - Disclose common exclusions that apply even under allriskförsäkring: gradual damage (smygande skador), wear and tear (slitage), damage from insects/pests, damage from poor maintenance
  - Explain flood coverage limitations: distinguish between water damage from internal plumbing (typically covered) and flooding from natural watercourses or rising groundwater (often excluded or requiring separate coverage)
  - For bostadsrätt: explain the boundary between the BRF's building insurance and the individual member's bostadsrättstillägg (the "ytskikt" principle — who covers what)
  - Disclose natural disaster coverage limitations: storm damage thresholds, earthquake exclusions, and any sub-limits for specific perils
  - Explain underinsurance consequences: if contents sum insured is inadequate, proportional settlement may apply
- **Platform impact:** The platform must present coverage complexity disclosures as part of the quote-to-bind workflow. Product comparison views must clearly show what is covered and excluded for each product variant. The system must log that the customer was presented with coverage gap information and acknowledge understanding before binding. IPID documents for home products must address the key coverage distinctions described above.
- **Evidence requirements:** Retain proof that coverage complexity disclosures were presented to the customer, including the specific product comparison shown, exclusion summaries presented, and the customer's acknowledgement timestamp.
- **Phase:** Phase 2 — Home & Property

### IDD-013: Cross-selling Governance — Home

- **Description:** Home insurance is frequently bundled with complementary products including reseförsäkring (travel insurance), ID-skydd (identity theft protection), and tilläggsförsäkringar (supplementary coverage). The distributor must comply with cross-selling rules by presenting each product as separately available, providing individual pricing, and assessing whether the bundled package meets the customer's demands and needs. Cross-selling governance must prevent mis-selling of unnecessary add-on products.
- **Legal basis:** IDD Article 24; Lag om försäkringsdistribution (2018:1219), Chapter 4, Section 7; FFFS 2018:10, Chapter 7; EU Commission Delegated Regulation 2017/2359, Article 13
- **Home insurance application:**
  - Common home insurance bundles include: hemförsäkring + reseförsäkring, hemförsäkring + ID-skydd, hemförsäkring + allriskförsäkring + ID-skydd
  - Each component must be offered as separately purchasable where technically feasible (travel insurance and ID-skydd can be purchased independently; allriskförsäkring requires base hemförsäkring)
  - Individual pricing must be disclosed for each component in the bundle, including any discount applied for purchasing the bundle
  - The demands-and-needs assessment (IDD-011) must inform the bundle recommendation — do not recommend travel insurance to a customer who states they do not travel, or ID-skydd without explaining its relevance
  - For BRF policyholders: cross-selling of bostadsrättstillägg alongside base hemförsäkring must clearly explain that the supplement covers interior fittings not covered by the BRF's building insurance
  - Product governance (IDD-004) must include monitoring of bundle attachment rates and customer complaints related to bundled products
- **Platform impact:** The quote workflow must present bundle components with individual pricing and clear descriptions. The system must allow customers to select or deselect individual add-on products within a bundle. Bundle recommendations must be linked to the demands-and-needs assessment. The platform must track bundle attachment rates and unbundling requests for product governance reviews. Cross-selling disclosures must be logged.
- **Evidence requirements:** Retain the bundle composition presented to each customer, individual component pricing, the customer's selection/deselection of components, and the link between the recommendation and the demands-and-needs assessment. Bundle attachment rate reports must be available for product governance reviews.
- **Phase:** Phase 2 — Home & Property

## Swedish Implementation Notes

### Transposition into Swedish Law

The IDD was transposed into Swedish law on 1 October 2018 through:

- **Lag om försäkringsdistribution (2018:1219)** — primary legislation replacing the previous Insurance Mediation Act (Lag om försäkringsförmedling, 2005:405)
- **Förordning om försäkringsdistribution (2018:1231)** — government ordinance with supplementary provisions
- **FFFS 2018:10** — Finansinspektionen's detailed regulations on insurance distribution

### Distribution Channels

IDD requirements apply to all distribution channels used by TryggFörsäkring:

| Channel             | Description                                   | IDD Classification       |
| ------------------- | --------------------------------------------- | ------------------------ |
| Direct digital      | Self-service via web/app                      | Insurance company direct |
| Call center         | Phone-based sales and service                 | Insurance company direct |
| Tied agents         | Exclusive agents representing TryggFörsäkring | Tied insurance agent     |
| Independent brokers | Brokers representing the customer             | Insurance broker         |

### Supervision and Enforcement

- Finansinspektionen supervises compliance with the Insurance Distribution Act
- Konsumentverket (Consumer Agency) may act on consumer complaints related to insurance distribution
- Allmänna reklamationsnämnden (ARN) provides out-of-court dispute resolution for consumer complaints
- Sanctions for non-compliance include warnings, administrative fines, and revocation of distribution authorization

## Cross-reference Guide

When writing user stories or use cases, reference IDD requirements using the format `IDD-XXX`. For example:

> **Regulatory:** IDD-001 (Demands and needs assessment), IDD-002 (IPID provision)

Multiple requirements may apply to a single user story. Always list all applicable IDD requirement IDs alongside FSA and GDPR references.

### IDD to FSA Cross-references

| IDD ID  | Related FSA IDs  | Relationship                                                                                      |
| ------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| IDD-001 | FSA-004, FSA-012 | Demands-and-needs assessment supports fair treatment and pre-contractual disclosure               |
| IDD-002 | FSA-012          | IPID provision is part of the broader pre-contractual disclosure obligation                       |
| IDD-003 | FSA-012          | Pre-contractual information duties overlap with FSA disclosure requirements                       |
| IDD-004 | FSA-005          | POG requirements align with FSA product governance obligations                                    |
| IDD-005 | FSA-004          | Distribution status disclosure supports fair treatment principles                                 |
| IDD-006 | FSA-004, FSA-012 | Advice requirements ensure fair treatment and adequate disclosure                                 |
| IDD-007 | FSA-004          | Cross-selling transparency supports fair treatment of customers                                   |
| IDD-008 | FSA-014          | Distribution record keeping aligns with FSA record retention requirements                         |
| IDD-009 | —                | Professional competence is an IDD-specific requirement with no direct FSA equivalent              |
| IDD-010 | FSA-011          | Distribution complaints handling complements the general FSA complaints procedure                 |
| IDD-011 | FSA-004, FSA-015 | Home demands-and-needs assessment supports fair treatment and product suitability _(Phase 2)_     |
| IDD-012 | FSA-004, FSA-012 | Product complexity disclosure supports fair treatment and pre-contractual information _(Phase 2)_ |
| IDD-013 | FSA-004, FSA-015 | Cross-selling governance ensures fair treatment in bundled home products _(Phase 2)_              |

### IDD to GDPR Cross-references

| IDD ID  | Related GDPR IDs | Relationship                                                                                       |
| ------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| IDD-001 | GDPR-001         | Demands-and-needs data collection must comply with data minimization and consent requirements      |
| IDD-002 | —                | IPID is a standardized document with no personal data processing implications                      |
| IDD-003 | —                | Pre-contractual information is about the distributor, not personal data                            |
| IDD-004 | GDPR-005         | Product review data (complaints, cancellations) may involve aggregated personal data               |
| IDD-008 | GDPR-002         | Distribution record retention must comply with GDPR retention principles                           |
| IDD-011 | GDPR-007         | Home demands-and-needs data collection must comply with property data processing rules _(Phase 2)_ |
| IDD-013 | GDPR-007         | Cross-selling involves property data collection subject to GDPR-007 processing rules _(Phase 2)_   |
