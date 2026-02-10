---
sidebar_position: 1
---

# FSA Requirements

Regulatory requirements from **Finansinspektionen** (Swedish Financial Supervisory Authority) applicable to the TryggFörsäkring insurance platform. Each requirement has a unique ID (FSA-001, FSA-002, etc.) used for cross-referencing from user stories and use cases.

## Key Legislation

The following Swedish laws and EU directives form the legal basis for FSA regulatory obligations relevant to this platform:

| Law / Directive           | Swedish Name                        | Scope                                                                |
| ------------------------- | ----------------------------------- | -------------------------------------------------------------------- |
| Insurance Business Act    | Försäkringsrörelselagen (2010:2043) | Authorization, governance, capital requirements, solvency            |
| Motor Traffic Damage Act  | Trafikskadelagen (1975:1410)        | Mandatory trafikförsäkring, liability rules, TFF membership          |
| Insurance Contracts Act   | Försäkringsavtalslagen (2005:104)   | Consumer insurance contract rules, disclosure, cancellation          |
| EU Solvency II Directive  | Direktiv 2009/138/EG                | Capital adequacy, risk management, supervisory reporting             |
| Housing Cooperative Act   | Bostadsrättslagen (1991:614)        | BRF governance, building insurance obligations (Phase 2)             |
| Planning and Building Act | Plan- och bygglagen (2010:900)      | Building standards, property valuation, construction rules (Phase 2) |

## Requirement Summary

| ID                                                      | Area                           | Short Description                                                            |
| ------------------------------------------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| [FSA-001](#fsa-001-insurance-company-authorization)     | Authorization                  | Insurance company must be authorized by FSA                                  |
| [FSA-002](#fsa-002-minimum-start-up-capital)            | Capital                        | EUR 4M minimum start-up capital for motor insurance                          |
| [FSA-003](#fsa-003-solvency-ii-compliance)              | Solvency                       | Solvency II capital adequacy and risk management                             |
| [FSA-004](#fsa-004-consumer-protection--fair-treatment) | Consumer Protection            | Fair treatment and clear policy terms                                        |
| [FSA-005](#fsa-005-product-governance)                  | Product Governance             | Target market identification and product monitoring                          |
| [FSA-006](#fsa-006-supervisory-reporting)               | Reporting                      | Regular financial and supervisory reporting to FSA                           |
| [FSA-007](#fsa-007-mandatory-trafikförsäkring)          | Trafikförsäkring               | Mandatory insurance for all registered vehicles                              |
| [FSA-008](#fsa-008-tff-membership)                      | TFF Membership                 | Membership in Trafikförsäkringsföreningen                                    |
| [FSA-009](#fsa-009-transportstyrelsen-notification)     | Transportstyrelsen             | Policy changes reported to Transport Agency                                  |
| [FSA-010](#fsa-010-fair-and-timely-claims-settlement)   | Claims Handling                | Fair and timely claims settlement                                            |
| [FSA-011](#fsa-011-complaints-handling-procedure)       | Complaints                     | Complaints handling procedure                                                |
| [FSA-012](#fsa-012-insurance-contract-disclosure)       | Disclosure                     | Pre-contractual and contractual information duties                           |
| [FSA-013](#fsa-013-cancellation-and-cooling-off-rights) | Cancellation                   | Consumer cancellation and ångerrätt (cooling-off)                            |
| [FSA-014](#fsa-014-record-keeping)                      | Record Keeping                 | Retention of policy and claims records                                       |
| [FSA-015](#fsa-015-consumer-protection--home)           | Consumer Protection — Home     | Product suitability for hemförsäkring; mandatory coverage levels _(Phase 2)_ |
| [FSA-016](#fsa-016-building-valuation)                  | Building Valuation             | Adequate building sum insured; underinsurance rules _(Phase 2)_              |
| [FSA-017](#fsa-017-claims-handling--water-damage)       | Claims Handling — Water Damage | Obligations for coordinating restoration (saneringsfirma) _(Phase 2)_        |
| [FSA-018](#fsa-018-natural-disaster-reserves)           | Natural Disaster Reserves      | Reserve requirements for storm/flood/climate events _(Phase 2)_              |

## Detailed Requirements

### FSA-001: Insurance Company Authorization

- **Description:** An insurance company must hold a valid authorization (tillstånd) from Finansinspektionen to conduct insurance business in Sweden. The authorization specifies which classes of insurance the company may underwrite.
- **Legal basis:** Försäkringsrörelselagen (2010:2043), Chapter 2
- **Impact on platform:** The platform must only issue policies for insurance classes covered by TryggFörsäkring's FSA authorization. System configuration must enforce authorized product boundaries.
- **Compliance verification:** Maintain a register of authorized insurance classes in the platform. Administrative controls prevent creation of products outside authorized classes.

### FSA-002: Minimum Start-up Capital

- **Description:** Insurance companies underwriting motor third-party liability (trafikförsäkring) must maintain a minimum start-up capital of EUR 4,000,000 (or SEK equivalent). This is a precondition for authorization.
- **Legal basis:** Försäkringsrörelselagen (2010:2043), Chapter 3; EU Solvency II Directive, Article 129
- **Impact on platform:** No direct system impact. This is a corporate-level financial requirement. However, the platform should support financial reporting that demonstrates ongoing capital adequacy.
- **Compliance verification:** Financial reporting module provides capital position data for regulatory submissions.

### FSA-003: Solvency II Compliance

- **Description:** Insurance companies must comply with Solvency II requirements including: maintaining a Solvency Capital Requirement (SCR), calculating a Minimum Capital Requirement (MCR), performing an Own Risk and Solvency Assessment (ORSA), and implementing a risk management system.
- **Legal basis:** EU Solvency II Directive (2009/138/EC); Försäkringsrörelselagen (2010:2043), Chapters 4 and 10
- **Impact on platform:** The platform must capture and store data needed for solvency calculations — premium volumes, claims reserves, risk exposures per line of business. Data must be exportable in formats required by FSA's reporting framework.
- **Compliance verification:** Data exports for solvency calculations are complete and accurate. Regular reconciliation between platform data and actuarial models.

### FSA-004: Consumer Protection — Fair Treatment

- **Description:** Insurance companies must treat customers fairly throughout the product lifecycle. Policy terms must be clear, transparent, and written in plain language. Customers must receive adequate information to make informed decisions.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapters 2 and 3; FSA General Guidelines (FFFS 2015:9)
- **Impact on platform:** All customer-facing documents (quotes, policy schedules, renewal notices, claims correspondence) must use clear language. The platform must generate documents that present terms, conditions, exclusions, and pricing transparently.
- **Compliance verification:** Document templates reviewed and approved by compliance team. Customer-facing content passes readability review. Terms and exclusions are prominently displayed.

### FSA-005: Product Governance

- **Description:** Insurance companies must implement product oversight and governance arrangements. This includes identifying the target market for each product, regularly reviewing products to ensure they continue to meet customer needs, and monitoring distribution channels.
- **Legal basis:** FSA regulations (FFFS 2017:8); IDD-derived product governance requirements
- **Impact on platform:** The platform must support product configuration that records the target market definition for each product. Product performance data (claims ratios, complaints, cancellations) must be available for product reviews.
- **Compliance verification:** Each product in the platform has a documented target market. Product performance dashboards are available to the product governance committee.

### FSA-006: Supervisory Reporting

- **Description:** Insurance companies must submit regular financial and supervisory reports to FSA. These include annual reports, quarterly solvency reporting (QRTs), and event-driven notifications (significant changes in risk profile, governance, etc.).
- **Legal basis:** Försäkringsrörelselagen (2010:2043), Chapter 13; FSA reporting regulations (FFFS 2019:23)
- **Impact on platform:** The platform must produce accurate, timely data for regulatory reports. This includes premium income by class, claims paid and reserved, policy counts, and risk exposure data. Data must be extractable in structured formats.
- **Compliance verification:** Automated data extraction jobs produce reporting data. Reconciliation between platform aggregates and submitted reports shows zero material discrepancies.

### FSA-007: Mandatory Trafikförsäkring

- **Description:** Every motor vehicle registered in Sweden must have valid trafikförsäkring (third-party motor liability insurance). If a vehicle owner fails to obtain coverage, Trafikförsäkringsföreningen (TFF) provides default coverage and the owner is charged a penalty fee (trafikförsäkringsavgift). Insurers must ensure continuous coverage with no gaps.
- **Legal basis:** Trafikskadelagen (1975:1410), Sections 2 and 34
- **Impact on platform:** The platform must prevent issuing a motor policy without trafikförsäkring as the base coverage tier. Cancellation workflows must verify that replacement coverage exists or notify the vehicle owner of the consequences. The system must track coverage start and end dates precisely.
- **Compliance verification:** Business rules enforce trafikförsäkring as mandatory base coverage. Cancellation workflows include coverage gap checks. Integration tests verify that no motor policy can exist without trafikförsäkring.

### FSA-008: TFF Membership

- **Description:** All insurance companies that sell trafikförsäkring must be members of Trafikförsäkringsföreningen (TFF). TFF acts as the industry body for motor liability insurance, managing the central claims register and providing default coverage for uninsured vehicles.
- **Legal basis:** Trafikskadelagen (1975:1410), Section 33
- **Impact on platform:** The platform must support data exchange with TFF systems. This includes reporting new policies, cancellations, and claims data in TFF-required formats and timeframes.
- **Compliance verification:** TFF data exchange interfaces are operational. Outbound messages conform to TFF specifications. Message delivery is logged and monitored.

### FSA-009: Transportstyrelsen Notification

- **Description:** When a trafikförsäkring policy is created, changed, or cancelled, the insurer must notify Transportstyrelsen (the Swedish Transport Agency) so the vehicle registry reflects current insurance status. Notifications must be sent within prescribed timeframes.
- **Legal basis:** Trafikskadelagen (1975:1410); Trafikförsäkringsförordningen (Traffic Insurance Ordinance)
- **Impact on platform:** The platform must integrate with Transportstyrelsen's systems (vehicle registry). Automated notifications must be sent when policies are bound, modified, or terminated. The system must handle acknowledgements and error responses.
- **Compliance verification:** Integration with Transportstyrelsen is active and monitored. Notification delivery rates and response times are tracked. Failed notifications trigger alerts and retry mechanisms.

### FSA-010: Fair and Timely Claims Settlement

- **Description:** Insurance companies must handle claims fairly, promptly, and transparently. The insurer must investigate claims without undue delay, keep the claimant informed of progress, and provide clear reasons for any claim denial.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapter 7; FSA General Guidelines on claims handling
- **Impact on platform:** The claims module must track settlement timelines (date reported, date acknowledged, date settled/denied). SLA monitoring must be built in. Denial reasons must be recorded and communicated to the claimant in writing.
- **Compliance verification:** Claims processing SLAs are configured and monitored. Average settlement times are reported. Denial rate and reasons are auditable. Customer communications for denials include clear justifications.

### FSA-011: Complaints Handling Procedure

- **Description:** Insurance companies must have a documented complaints handling procedure. Complaints must be registered, acknowledged, investigated, and resolved within a reasonable timeframe. The company must report complaint volumes and outcomes to FSA.
- **Legal basis:** FSA regulations (FFFS 2002:23); Försäkringsrörelselagen (2010:2043)
- **Impact on platform:** The platform must include a complaints register. Complaints linked to specific policies or claims must be traceable. Complaint status tracking (received, under investigation, resolved) and outcome recording are required.
- **Compliance verification:** Complaints module captures all required data fields. Complaint resolution times are monitored. Quarterly complaint reports can be generated for FSA submission.

### FSA-012: Insurance Contract Disclosure

- **Description:** Before an insurance contract is concluded, the insurer must provide the customer with pre-contractual information including: a summary of coverage, significant exclusions, premium calculation basis, cancellation terms, and complaints procedure. After binding, a full policy document must be issued.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapter 2, Sections 1-5
- **Impact on platform:** The quote-to-bind workflow must generate and present pre-contractual information before the customer commits. The platform must produce Insurance Product Information Documents (IPIDs) or equivalent summaries. Full policy documents must be generated and delivered at binding.
- **Compliance verification:** Quote workflow includes mandatory disclosure step. Pre-contractual documents are generated automatically. Policy document generation is tested for completeness.

### FSA-013: Cancellation and Cooling-off Rights

- **Description:** Consumers have a 14-day cooling-off period (ångerrätt) after entering a distance or off-premises insurance contract, during which they may cancel without penalty. Beyond ångerrätt, the Försäkringsavtalslagen provides rules for ordinary cancellation by both insurer and policyholder, including notice periods and premium refund calculations.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapter 3, Sections 1-5; Distansavtalslagen (2005:59)
- **Impact on platform:** The platform must track the contract conclusion date and calculate the ångerrätt window. Cancellation workflows must distinguish between cooling-off cancellations (full refund) and ordinary cancellations (pro-rata refund). Insurer-initiated cancellations must enforce minimum notice periods.
- **Compliance verification:** Cooling-off period is calculated correctly from contract date. Refund calculations follow statutory rules. Notice period enforcement is tested. Cancellation reasons and types are recorded.

### FSA-014: Record Keeping

- **Description:** Insurance companies must retain records of all insurance contracts, claims, customer communications, and regulatory correspondence for the periods required by law. Records must be retrievable for supervisory inspections and audits.
- **Legal basis:** Försäkringsrörelselagen (2010:2043), Chapter 10; Bokföringslagen (1999:1078)
- **Impact on platform:** The platform must implement data retention policies. Policy records, claims files, and customer correspondence must be retained for a minimum of 10 years after the contract ends. Archival and retrieval mechanisms must be built into the system.
- **Compliance verification:** Data retention policies are configured in the platform. Automated archival processes are operational. Retrieval from archive is tested and documented. No records are deleted before the retention period expires.

### FSA-015: Consumer Protection — Home

- **Description:** Insurance companies offering hemförsäkring (home insurance) must ensure product suitability for the customer's housing situation. Mandatory coverage levels for hemförsäkring include personal property (lösöre), liability protection (ansvarsförsäkring), legal expenses (rättsskydd), and assault coverage (överfallsskydd). The insurer must clearly communicate what is and is not covered, particularly the distinction between bostadsrättstillägg (housing cooperative supplement), villaförsäkring (detached house insurance), and hyresrättsförsäkring (rental apartment insurance).
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapters 2 and 3; FSA General Guidelines (FFFS 2015:9); Bostadsrättslagen (1991:614) for BRF-related obligations
- **Impact on platform:** The platform must enforce product configuration rules that ensure all hemförsäkring products include mandatory coverage components. The quote workflow must determine the customer's housing type (villa, bostadsrätt, hyresrätt) and present appropriate product variants. Coverage limits must be validated against minimum statutory levels.
- **Compliance verification:** Product configuration includes all mandatory coverage components. Quote workflow captures housing type and applies the correct product variant. Coverage limit validation rules are enforced. Customer-facing documents clearly distinguish between housing types and their respective coverage.
- **Phase:** Phase 2 — Home & Property

### FSA-016: Building Valuation

- **Description:** For villaförsäkring (detached house insurance) and BRF building insurance, the insurer must ensure adequate building sum insured (fullvärdesförsäkring or förstadagsbelopp) to prevent underinsurance (underförsäkring). The insurer must provide tools or guidance for the customer to determine the correct rebuilding cost (återuppbyggnadskostnad). Where the building sum insured is inadequate, the insurer must inform the customer of the risk of proportional claims settlement.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapter 6, Section 2 (proportional settlement); FSA General Guidelines on property insurance; Plan- och bygglagen (2010:900) for building standards affecting valuation
- **Impact on platform:** The platform must include a building valuation tool or integration (e.g., Lantmäteriet property data, byggkostnadskalkyl) that helps determine the appropriate sum insured. The quote workflow must flag potential underinsurance when the customer-specified sum insured falls below the estimated rebuilding cost. Renewal workflows must prompt the customer to review the sum insured, accounting for building cost inflation (byggkostnadsindex).
- **Compliance verification:** Building valuation tool produces estimates consistent with market rebuilding costs. Underinsurance warnings are triggered and documented when sum insured is below threshold. Renewal notices include building cost inflation adjustments. Proportional settlement calculations are correctly applied when underinsurance exists.
- **Phase:** Phase 2 — Home & Property

### FSA-017: Claims Handling — Water Damage

- **Description:** Water damage (vattenskada) is the most common and costly home insurance claim category in Sweden. The insurer has specific obligations to coordinate with restoration companies (saneringsfirmor), plumbers (rörmokare), and building inspectors to ensure timely and adequate remediation. The insurer must ensure that policyholders are informed of their right to choose their own contractor while also maintaining quality standards through approved supplier networks.
- **Legal basis:** Försäkringsavtalslagen (2005:104), Chapter 7; FSA General Guidelines on claims handling; Branschregler for vattenskadesanering (industry guidelines)
- **Impact on platform:** The claims module must support water damage-specific workflows including: initial damage assessment, moisture measurement scheduling, restoration company assignment (from approved supplier network or customer-chosen contractor), progress tracking through drying and restoration phases, and final inspection sign-off. The system must track response times from first notification of loss (FNOL) through restoration completion.
- **Compliance verification:** Water damage claims workflows include all required phases (assessment, sanering, restoration, inspection). Response time SLAs are configured and monitored. Policyholder contractor choice is documented. Approved supplier network is maintained and accessible. Restoration quality standards are tracked.
- **Phase:** Phase 2 — Home & Property

### FSA-018: Natural Disaster Reserves

- **Description:** Insurance companies offering property insurance must maintain adequate technical reserves for natural disaster events (naturkatastrofreserv), including storm (storm), flooding (översvämning), and climate-related events. FSA requires insurers to model catastrophe risk exposure and hold sufficient capital buffers. This is particularly relevant given increasing climate-related claims frequency in Sweden, including cloudbursts (skyfall), rising sea levels, and extreme weather events.
- **Legal basis:** Försäkringsrörelselagen (2010:2043), Chapter 4 (technical provisions); EU Solvency II Directive, Article 101 (SCR for natural catastrophe risk); FSA regulations (FFFS 2019:23) for reporting natural catastrophe exposure
- **Impact on platform:** The platform must capture and categorize property claims by peril type (storm, flood, fire, water damage, etc.) to support catastrophe risk modeling. Geospatial data (property location, flood zone, proximity to water bodies) must be stored for risk assessment. The platform must support aggregate exposure reporting by geographic area and peril type for actuarial and regulatory purposes.
- **Compliance verification:** Claims categorization includes peril type taxonomy. Property records include geospatial risk data. Aggregate exposure reports can be generated by region and peril type. Catastrophe reserve calculations are supported by accurate platform data. Reporting to FSA on natural catastrophe exposure is facilitated.
- **Phase:** Phase 2 — Home & Property

## Cross-reference Guide

When writing user stories or use cases, reference FSA requirements using the format `FSA-XXX`. For example:

> **Regulatory:** FSA-007 (Mandatory trafikförsäkring), FSA-009 (Transportstyrelsen notification)

Multiple requirements may apply to a single user story. Always list all applicable requirement IDs.
