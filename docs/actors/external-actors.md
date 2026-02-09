---
sidebar_position: 3
---

# External Actors

External actors are systems, organizations, and third parties that the
TryggFörsäkring platform integrates with. They participate in insurance business
processes through APIs, file exchanges, or manual interactions but do not log in
to the platform directly.

## Transportstyrelsen

- **Swedish term:** Transportstyrelsen
- **English name:** Swedish Transport Agency
- **Description:** The government agency that manages the national vehicle
  registry (fordonsregistret). All registered vehicles in Sweden are recorded
  in this registry, including ownership, technical specifications, and
  insurance status. Transportstyrelsen is a critical integration point for
  motor insurance operations.
- **Responsibilities:**
  - Maintain the vehicle registry with ownership and technical data
  - Receive and publish insurance status notifications from insurers
  - Provide vehicle data lookups for quoting and policy issuance
  - Monitor that all registered vehicles have valid trafikförsäkring
  - Issue trafikförsäkringsavgift (penalty fee) for uninsured vehicles
- **Key interactions:** Quote and bind (vehicle data lookup), policy
  administration (insurance status notification), trafikförsäkring
  verification
- **Regulatory relevance:**
  - FSA — insurers must notify Transportstyrelsen of policy changes within
    regulated timeframes (FSA-009)
  - FSA — mandatory trafikförsäkring status is verified through
    Transportstyrelsen (FSA-007)

## Trafikförsäkringsföreningen (TFF)

- **Swedish term:** Trafikförsäkringsföreningen (TFF)
- **English name:** Swedish Motor Insurers
- **Description:** The industry organization for all companies that sell
  trafikförsäkring in Sweden. Membership in TFF is mandatory for any insurer
  offering motor third-party liability insurance. TFF handles claims involving
  uninsured vehicles, manages the central claims database, and coordinates
  industry-wide processes.
- **Responsibilities:**
  - Provide trafikförsäkring for uninsured and unidentified vehicles
  - Manage the central claims database (skaderegister)
  - Coordinate inter-company claims settlement (regressrätt)
  - Maintain industry statistics and risk data
  - Administer the bonus class transfer process between insurers
- **Key interactions:** Claims handling (inter-company settlement),
  trafikförsäkring (uninsured vehicle claims), bonus class transfers,
  industry reporting
- **Regulatory relevance:**
  - FSA — membership is mandatory for trafikförsäkring sellers (FSA-008)
  - FSA — TFF provides trafikförsäkring for uninsured vehicles as required by
    Trafikskadelagen (FSA-007)

## BankID

- **Swedish term:** BankID
- **English name:** BankID (Electronic Identification)
- **Description:** The leading electronic identification and digital signing
  service in Sweden, used by the vast majority of the adult population. BankID
  provides strong authentication (two-factor) and legally binding digital
  signatures, making it the standard for identity verification in Swedish
  insurance.
- **Responsibilities:**
  - Authenticate customers and intermediaries during platform login
  - Provide digital signing for policy documents and applications
  - Verify identity during claims reporting and sensitive operations
  - Support age and identity verification for regulatory compliance
- **Key interactions:** Quote and bind (identity verification, policy signing),
  claims reporting (identity verification), policy administration (change
  authorization)
- **Regulatory relevance:**
  - IDD — supports customer identification requirements for demands-and-needs
    assessments (IDD-001) and record keeping (IDD-008)
  - GDPR — strong authentication supports data protection obligations; identity
    verification for data subject rights requests (GDPR-001, GDPR-006)
  - FSA — supports know-your-customer obligations and contract signing
    requirements (FSA-012)

## Repair Shop (Verkstad)

- **Swedish term:** Verkstad
- **English name:** Authorized Repair Shop
- **Description:** Vehicle repair facilities authorized by TryggFörsäkring to
  perform repairs on insured vehicles. Authorized repair shops have agreements
  with the insurer covering repair quality standards, pricing, and direct
  billing. Customers may also choose non-authorized shops, but the claims
  process differs.
- **Responsibilities:**
  - Receive repair assignments from TryggFörsäkring
  - Provide repair cost estimates for claims assessment
  - Perform vehicle repairs according to agreed quality standards
  - Submit invoices directly to TryggFörsäkring (direct settlement)
  - Report repair completion and return vehicle to customer
- **Key interactions:** Claims handling (repair assignment, cost estimation,
  invoicing), claims adjustment (coordinated assessments)
- **Regulatory relevance:**
  - FSA — repair quality and cost management support fair claims settlement
    obligations (FSA-010)
  - GDPR — receives limited personal data (vehicle owner, contact details)
    necessary for repair coordination; subject to data processing agreements
    (GDPR-001)

## Police (Polis)

- **Swedish term:** Polis
- **English name:** Swedish Police Authority
- **Description:** The national police authority involved in motor insurance
  through traffic accident investigations, accident reports, and fraud
  investigations. Police reports are an important source of evidence in claims
  handling, particularly for liability determination and fraud detection.
- **Responsibilities:**
  - Investigate traffic accidents and produce accident reports
  - Provide accident reports to insurers upon request
  - Investigate suspected insurance fraud
  - Issue reports for vehicle theft and vandalism
- **Key interactions:** Claims handling (accident reports, liability
  determination), fraud detection (fraud investigation reports)
- **Regulatory relevance:**
  - FSA — police reports support fair and evidence-based claims settlement
    (FSA-010)
  - GDPR — exchange of personal data between police and insurer must have a
    legal basis; data minimization applies (GDPR-001)

## Medical Provider (Vårdgivare)

- **Swedish term:** Vårdgivare
- **English name:** Medical Provider / Healthcare Provider
- **Description:** Hospitals, clinics, and healthcare professionals who treat
  injuries resulting from traffic accidents. Medical providers supply injury
  reports and treatment documentation needed for personal injury claims under
  trafikförsäkring. The exchange of medical information is subject to strict
  confidentiality and data protection rules.
- **Responsibilities:**
  - Treat injuries resulting from traffic accidents
  - Provide medical certificates and treatment reports for claims
  - Assess injury severity and expected recovery for claims valuation
  - Supply documentation for permanent disability assessments
- **Key interactions:** Claims handling (personal injury claims, medical
  documentation), trafikförsäkring (injury compensation)
- **Regulatory relevance:**
  - GDPR — medical data is special category personal data requiring explicit
    consent or legal basis for processing (GDPR-001, GDPR-004)
  - FSA — medical documentation supports fair personal injury claims settlement
    (FSA-010)
  - Swedish patient data legislation (Patientdatalagen 2008:355) governs
    healthcare providers' data sharing with insurers

## Payment Provider

- **Swedish term:** Betalningsleverantör
- **English name:** Payment Provider / Payment Service Provider
- **Description:** External payment processing services that handle premium
  collection and claims disbursement for TryggFörsäkring. Payment providers
  support various payment methods including direct debit (autogiro), card
  payments, and bank transfers (Swish, bankgiro).
- **Responsibilities:**
  - Process premium payments (recurring and one-time)
  - Handle claims disbursements to policyholders and third parties
  - Manage direct debit mandates (autogiro agreements)
  - Provide payment status notifications and reconciliation data
  - Support refund processing for cancellations and overpayments
- **Key interactions:** Quote and bind (initial premium payment), policy
  administration (recurring premium collection), claims handling (claims
  disbursement), cancellations (refund processing)
- **Regulatory relevance:**
  - GDPR — processes personal data (payment details, bank accounts) under data
    processing agreements (GDPR-001)
  - PSD2 (Payment Services Directive) — payment processing must comply with
    strong customer authentication requirements
  - FSA — premium collection and claims payment are regulated insurance
    activities
