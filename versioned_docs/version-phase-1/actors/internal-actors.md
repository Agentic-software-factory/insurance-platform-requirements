---
sidebar_position: 2
---

# Internal Actors

Internal actors are people within TryggFörsäkring or its authorized distribution
network who interact directly with the insurance platform. Each actor has
role-based access to specific platform functionality.

## Customer (Privatkund)

- **Swedish term:** Privatkund
- **Description:** A private individual who seeks, purchases, or holds a motor
  insurance policy with TryggFörsäkring. Customers interact with the platform
  through self-service channels (web, mobile) and through agents or brokers.
- **Responsibilities:**
  - Request and compare motor insurance quotes
  - Purchase and sign insurance policies (via BankID)
  - Report claims (skadeanmälan) and track claim status
  - Manage policy details (vehicle changes, address updates, coverage
    adjustments)
  - Pay premiums and manage payment methods
  - Exercise cooling-off rights (ångerrätt) and request cancellations
- **Key interactions:** Quote and bind, policy administration, claims reporting,
  renewals, cancellations
- **Regulatory relevance:**
  - GDPR — data subject with rights to access, rectification, erasure, and
    portability (GDPR-001 to GDPR-006)
  - IDD — entitled to demands-and-needs assessment before purchase (IDD-001),
    IPID document (IDD-002), and pre-contractual information (IDD-003)
  - FSA — protected by consumer protection rules (FSA-004), cooling-off rights
    (FSA-013), and fair claims settlement (FSA-010)

## Corporate Customer (Företagskund)

- **Swedish term:** Företagskund
- **Description:** A business entity (company, organization, or sole proprietor)
  that holds motor insurance for one or more vehicles. Corporate customers
  typically manage fleet policies and have different needs than private
  individuals.
- **Responsibilities:**
  - Request fleet insurance quotes covering multiple vehicles
  - Manage fleet policy administration (add/remove vehicles, adjust coverage)
  - Designate authorized contacts for policy and claims management
  - Report and track claims for fleet vehicles
  - Review fleet-level reporting and premium summaries
- **Key interactions:** Quote and bind (fleet), policy administration, claims
  reporting, renewals, fleet management
- **Regulatory relevance:**
  - GDPR — data controller for employee data; employees who are named drivers
    are data subjects (GDPR-001)
  - IDD — entitled to demands-and-needs assessment (IDD-001), though
    requirements differ for professional vs. non-professional customers
  - FSA — mandatory trafikförsäkring for every registered vehicle in the fleet
    (FSA-007)

## Insurance Agent (Försäkringsagent)

- **Swedish term:** Försäkringsagent
- **Description:** A licensed intermediary who represents one or more insurance
  companies and sells their products. Agents act on behalf of the insurer and
  are registered with Finansinspektionen. In the Swedish market, agents are
  tied to the insurers they represent.
- **Responsibilities:**
  - Conduct demands-and-needs assessments for customers
  - Present quotes and recommend appropriate coverage tiers
  - Bind policies on behalf of TryggFörsäkring
  - Provide pre-contractual information (IPID, disclosure documents)
  - Maintain competence through ongoing training
  - Record all advisory interactions
- **Key interactions:** Quote and bind, demands-and-needs assessment, policy
  administration
- **Regulatory relevance:**
  - IDD — must perform demands-and-needs assessment (IDD-001), provide IPID
    (IDD-002), disclose distribution status and remuneration (IDD-005), and
    maintain professional competence (IDD-009)
  - FSA — must be registered with Finansinspektionen; subject to consumer
    protection rules (FSA-004)
  - IDD — advisory records must be retained (IDD-008)

## Insurance Broker (Försäkringsmäklare)

- **Swedish term:** Försäkringsmäklare
- **Description:** An independent intermediary who represents the customer's
  interests, not the insurer's. Brokers are licensed by Finansinspektionen and
  must provide impartial advice based on a sufficiently large number of
  insurance products available on the market.
- **Responsibilities:**
  - Conduct independent demands-and-needs assessments
  - Compare products across multiple insurers on behalf of the customer
  - Provide personalized recommendations with documented rationale
  - Submit policy applications and bind coverage through the platform
  - Disclose remuneration and potential conflicts of interest
- **Key interactions:** Quote and bind, demands-and-needs assessment, policy
  administration
- **Regulatory relevance:**
  - IDD — must perform demands-and-needs assessment (IDD-001), provide
    personalized advice (IDD-006), disclose conflicts of interest (IDD-005),
    and maintain competence (IDD-009)
  - FSA — must be registered with Finansinspektionen; held to a higher
    impartiality standard than agents (FSA-004)
  - IDD — all advisory and recommendation records must be retained (IDD-008)

## Claims Handler (Skadereglerare)

- **Swedish term:** Skadereglerare
- **Description:** An employee of TryggFörsäkring responsible for the end-to-end
  handling of insurance claims. Claims handlers receive first notifications of
  loss (FNOL), investigate claim circumstances, determine coverage and
  liability, and authorize settlements.
- **Responsibilities:**
  - Receive and register claims (skadeanmälan)
  - Investigate claim circumstances and verify coverage
  - Determine liability and assess claim value
  - Coordinate with claims adjusters, repair shops, and medical providers
  - Authorize claim payments and settlements
  - Handle disputes and escalate to complaints procedures when needed
  - Detect and flag potential fraud
- **Key interactions:** Claims handling, fraud detection, settlement processing
- **Regulatory relevance:**
  - FSA — must ensure fair and timely claims settlement (FSA-010); adhere to
    complaints handling procedures (FSA-011)
  - GDPR — processes sensitive personal data (injury details, police reports);
    must follow data minimization and purpose limitation (GDPR-001, GDPR-004)
  - FSA — claims records must be retained per record-keeping requirements
    (FSA-014)

## Claims Adjuster (Värderare)

- **Swedish term:** Värderare
- **Description:** A specialized assessor who evaluates vehicle damage following
  an insured event. Claims adjusters may be internal employees or contracted
  external specialists. They determine repair costs, total loss valuations,
  and whether damage is consistent with reported circumstances.
- **Responsibilities:**
  - Inspect damaged vehicles (on-site or via photographs/video)
  - Estimate repair costs using industry-standard valuation tools
  - Determine whether a vehicle is repairable or a total loss
  - Verify that reported damage is consistent with the incident description
  - Provide assessment reports to claims handlers
  - Coordinate with authorized repair shops on repair scope
- **Key interactions:** Claims handling, repair shop coordination, fraud
  detection
- **Regulatory relevance:**
  - FSA — assessments support fair claims settlement obligations (FSA-010)
  - GDPR — may access personal data related to the claim; subject to purpose
    limitation (GDPR-001)

## Underwriter (Riskbedömare)

- **Swedish term:** Riskbedömare
- **Description:** An insurance professional responsible for evaluating risk and
  determining the terms, conditions, and pricing of insurance policies.
  Underwriters apply risk models, bonus class rules, and company guidelines
  to decide whether to accept, modify, or decline insurance applications.
- **Responsibilities:**
  - Evaluate insurance applications against risk criteria
  - Set premium levels based on risk factors (vehicle type, driver history,
    bonus class, geographic area)
  - Define policy terms and conditions, including exclusions
  - Apply bonus class rules and no-claims discount schedules
  - Approve or decline high-risk or non-standard applications
  - Maintain and update underwriting guidelines
- **Key interactions:** Quote and bind, underwriting and bonus management,
  renewals, policy administration
- **Regulatory relevance:**
  - FSA — pricing must comply with consumer protection and fair treatment rules
    (FSA-004); products must be governed by product oversight processes
    (FSA-005)
  - IDD — products must have defined target markets and be monitored
    post-launch (IDD-004)
  - GDPR — risk assessments may process personal data; automated decisions must
    allow for human review (GDPR-001)

## Actuary

- **Swedish term:** Aktuarie
- **Description:** A professional who applies mathematical and statistical
  methods to assess risk, develop pricing models, and analyze claims data.
  Actuaries ensure that premium levels are adequate to cover expected claims
  while remaining competitive. They also support solvency calculations and
  regulatory reporting.
- **Responsibilities:**
  - Develop and maintain motor insurance pricing models
  - Analyze claims frequency, severity, and trends
  - Calculate technical provisions and reserves
  - Support Solvency II capital adequacy calculations (FSA-003)
  - Provide data-driven input to underwriting guidelines
  - Monitor loss ratios and recommend pricing adjustments
- **Key interactions:** Underwriting and bonus management, regulatory reporting,
  pricing model development
- **Regulatory relevance:**
  - FSA — supports Solvency II compliance (FSA-003) and supervisory reporting
    (FSA-006)
  - GDPR — works with aggregated and anonymized claims data; must ensure
    personal data is properly anonymized before analysis (GDPR-001)

## Compliance Officer

- **Swedish term:** Regelefterlevnadsansvarig
- **Description:** An employee responsible for ensuring that TryggFörsäkring's
  operations comply with all applicable regulations, including FSA rules,
  GDPR, and IDD. The compliance officer monitors regulatory changes, conducts
  internal audits, and advises the business on compliance matters.
- **Responsibilities:**
  - Monitor regulatory changes from FSA, IMY, and EU institutions
  - Conduct internal compliance audits and gap analyses
  - Review new products and processes for regulatory compliance
  - Manage complaints handling procedures (FSA-011, IDD-010)
  - Oversee GDPR compliance including data protection impact assessments
  - Ensure IDD distribution requirements are met across all channels
  - Report compliance status to management and board
- **Key interactions:** Regulatory reporting, product governance, complaints
  handling, audit
- **Regulatory relevance:**
  - FSA — oversees compliance with all FSA requirements (FSA-001 through
    FSA-014)
  - GDPR — ensures data protection obligations are met (GDPR-001 through
    GDPR-006)
  - IDD — monitors distribution compliance (IDD-001 through IDD-010)

## System Administrator

- **Swedish term:** Systemadministratör
- **Description:** An IT professional responsible for managing the technical
  configuration, user access, and operational health of the insurance
  platform. System administrators do not make business decisions but ensure
  the platform is available, secure, and properly configured.
- **Responsibilities:**
  - Manage user accounts, roles, and access permissions
  - Configure platform settings (product parameters, workflow rules, integration
    endpoints)
  - Monitor system health, performance, and availability
  - Manage integrations with external systems (Transportstyrelsen, BankID, TFF)
  - Execute data retention and archival procedures
  - Support incident response and disaster recovery
- **Key interactions:** Platform configuration, user management, system
  integration, data retention
- **Regulatory relevance:**
  - GDPR — responsible for implementing technical measures for data protection,
    access control, and data retention/deletion (GDPR-001, GDPR-005)
  - FSA — supports record-keeping obligations through system configuration
    (FSA-014)
