---
sidebar_position: 2
---

# Quote and Bind — User Stories

User stories for the home and property insurance quote-and-bind process. This is
the primary sales flow where a customer (or agent) provides address, property,
and personal details, receives a premium quote, and binds a policy. Covers all
four product types: hemförsäkring, villahemförsäkring, bostadsrättsförsäkring,
and fritidshusförsäkring.

## Overview

| ID     | Actor                  | Summary                                                             |
| ------ | ---------------------- | ------------------------------------------------------------------- |
| HQB-01 | Customer               | Get a home insurance quote by entering address and living situation |
| HQB-02 | Customer               | Compare coverage tiers (bas/standard/premium)                       |
| HQB-03 | BRF Member             | Understand BRF building insurance vs personal coverage              |
| HQB-04 | Customer               | Add allrisk/drulle coverage to the policy                           |
| HQB-05 | Customer               | Sign the policy with BankID                                         |
| HQB-06 | Customer Service Agent | Create a home quote on behalf of a phone customer                   |
| HQB-07 | Underwriter            | Auto-assess risk based on property data                             |
| HQB-08 | Underwriter            | Review flagged high-risk quotes                                     |
| HQB-09 | System                 | Verify property address via Lantmäteriet                            |
| HQB-10 | System                 | Calculate premium based on rating factors                           |

---

## HQB-01: Get a Home Insurance Quote

**As a** customer (privatkund),
**I want to** get a home insurance quote by entering my address and living
situation,
**so that** I can see the price and coverage options for my home.

### Acceptance Criteria

- **GIVEN** the customer enters a valid Swedish address
  **WHEN** the system looks up the property via Lantmäteriet/address registry
  **THEN** property details (building type, construction year, size) are
  pre-populated automatically

- **GIVEN** the customer selects the product type (hemförsäkring,
  villahemförsäkring, bostadsrättsförsäkring, or fritidshusförsäkring)
  **WHEN** the system determines which product applies
  **THEN** the quote flow adapts to the selected product type with
  product-specific questions

- **GIVEN** the customer provides living situation details (household size,
  number of rooms, floor area in m²)
  **WHEN** the system calculates the sum insured for contents (lösöre)
  **THEN** a default sum insured is proposed based on household size and
  living area, with the option to adjust

- **GIVEN** property data is available from the address registry
  **WHEN** the system calculates the premium
  **THEN** quotes are presented for all available coverage tiers:
  bas, standard, and premium

- **GIVEN** the address is not found in the Lantmäteriet registry
  **WHEN** the customer submits the address
  **THEN** the system displays an error message and allows manual property
  details entry as a fallback

### Data Requirements

| Data Element      | Source             | Required |
| ----------------- | ------------------ | -------- |
| Street address    | Customer input     | Yes      |
| Postal code       | Customer input     | Yes      |
| Product type      | Customer selection | Yes      |
| Building type     | Lantmäteriet       | Yes      |
| Construction year | Lantmäteriet       | Yes      |
| Living area (m²)  | Customer input     | Yes      |
| Household size    | Customer input     | Yes      |
| Personnummer      | Customer input     | Yes      |

### External Integrations

- **Lantmäteriet** — Property data lookup via address
- **Address Registry** — Address validation and geocoding

### Regulatory

- **GDPR-007** — Consent for processing property data and personal details
- **IDD-011** — Demands-and-needs assessment must precede final quote
  presentation (see HQB-02)
- **FSA-015** — Product suitability; recommended product must match customer
  situation

---

## HQB-02: Compare Coverage Tiers

**As a** customer (privatkund),
**I want to** compare coverage tiers (bas, standard, premium) side by side,
**so that** I can choose the right level of protection for my home.

### Acceptance Criteria

- **GIVEN** the customer has entered property and personal details (HQB-01)
  **WHEN** the system presents coverage options
  **THEN** all three tiers are displayed in a side-by-side comparison with:
  - What is covered in each tier
  - What is not covered in each tier
  - Premium (premie) for each tier
  - Deductible (självrisk) amount for each tier

- **GIVEN** the comparison is displayed
  **WHEN** the customer views the options
  **THEN** the system highlights the recommended tier based on the
  demands-and-needs assessment

- **GIVEN** optional add-ons are available (allrisk/drulle, ID-skydd,
  bostadsrättstillägg)
  **WHEN** the customer views the comparison
  **THEN** each add-on is listed with its individual price, clearly
  separated from the base premium

- **GIVEN** the customer selects a coverage tier
  **WHEN** the system updates the quote
  **THEN** the total premium is recalculated including the selected tier
  and any add-ons

- **GIVEN** the IPID for each tier has been generated
  **WHEN** the customer views a coverage tier
  **THEN** the customer can access the corresponding IPID document for
  that tier

### Data Requirements

| Data Element              | Source          | Required |
| ------------------------- | --------------- | -------- |
| Coverage details per tier | Product catalog | Yes      |
| Premium per tier          | Rating engine   | Yes      |
| Deductible per tier       | Product catalog | Yes      |
| Add-on pricing            | Rating engine   | Yes      |
| IPID per tier             | Document store  | Yes      |
| Recommendation highlight  | Assessment      | Yes      |

### Regulatory

- **IDD-002** — IPID must be provided for each product tier before binding
- **IDD-007** — Add-ons must be presented with separate pricing; customer must
  be informed they are optional
- **IDD-011** — Comparison must follow from the demands-and-needs assessment
- **IDD-013** — Cross-selling of add-ons must be transparent
- **FSA-004** — Comparison must support fair treatment and informed
  decision-making
- **FSA-012** — Coverage terms and exclusions must be clearly disclosed

---

## HQB-03: BRF Coverage Gap Analysis

**As a** BRF member (bostadsrättsinnehavare),
**I want to** understand what my BRF's building insurance covers versus what I
need personally,
**so that** I don't have gaps or double coverage.

### Acceptance Criteria

- **GIVEN** the customer selects bostadsrättsförsäkring as the product type
  **WHEN** the quote flow detects a BRF product
  **THEN** the system presents a BRF coverage gap analysis showing:
  - Typical BRF building insurance coverage (structure, communal areas, pipes)
  - What bostadsrättsförsäkring covers (interior fixtures, personal property,
    liability)
  - Common coverage gaps (e.g., interior surfaces, appliances, bathroom
    renovations)

- **GIVEN** the BRF coverage analysis is presented
  **WHEN** the customer views the analysis
  **THEN** the system recommends a bostadsrättstillägg (BRF supplement) if the
  customer's BRF policy has standard exclusions for interior modifications

- **GIVEN** the customer provides information about their BRF's insurance
  **WHEN** the system processes the input
  **THEN** the system adjusts the bostadsrättsförsäkring recommendation to
  avoid overlapping coverage

- **GIVEN** the customer cannot provide BRF insurance details
  **WHEN** the customer proceeds without BRF information
  **THEN** the system applies a conservative default (recommending
  bostadsrättstillägg) and notes that the customer should verify their BRF's
  building insurance

### Data Requirements

| Data Element                | Source          | Required |
| --------------------------- | --------------- | -------- |
| BRF building insurance info | Customer input  | No       |
| BRF name/org number         | Customer input  | No       |
| Standard BRF coverage model | Product catalog | Yes      |
| Bostadsrättstillägg options | Product catalog | Yes      |
| Interior renovation details | Customer input  | No       |

### Regulatory

- **IDD-011** — Demands-and-needs assessment must consider the customer's
  existing coverage (BRF building insurance)
- **FSA-015** — Product suitability; must ensure the customer is not
  over-insured or under-insured
- **FSA-016** — Adequate sum insured to prevent underinsurance
- **FSA-004** — Fair treatment requires transparent presentation of coverage
  boundaries

---

## HQB-04: Add Allrisk/Drulle Coverage

**As a** customer (privatkund),
**I want to** add allrisk/drulle coverage to my home insurance,
**so that** accidental damage to my belongings is covered.

### Acceptance Criteria

- **GIVEN** the customer is reviewing coverage options (HQB-02)
  **WHEN** the allrisk/drulle add-on is presented
  **THEN** the system clearly explains what allrisk covers:
  - Sudden and unforeseen damage (e.g., dropping a phone, spilling on a laptop)
  - Damage caused by the policyholder's own actions
  - What is excluded (wear and tear, gradual deterioration)

- **GIVEN** the customer selects allrisk/drulle
  **WHEN** the add-on is added to the quote
  **THEN** the system shows the additional premium separately from the base
  premium and recalculates the total

- **GIVEN** allrisk/drulle is selected
  **WHEN** the customer reviews the quote summary
  **THEN** the deductible (självrisk) for allrisk claims is displayed
  separately, as it may differ from the base policy deductible

- **GIVEN** the customer has a villahemförsäkring or fritidshusförsäkring
  **WHEN** allrisk/drulle is offered
  **THEN** the system clarifies that allrisk covers personal property
  (lösöre) only, not building damage

- **GIVEN** the customer opts for allrisk with an åldersavdrag
  (age deduction) waiver
  **WHEN** the system calculates the premium
  **THEN** the premium reflects the waiver and the terms are disclosed

### Data Requirements

| Data Element        | Source          | Required |
| ------------------- | --------------- | -------- |
| Allrisk premium     | Rating engine   | Yes      |
| Allrisk deductible  | Product catalog | Yes      |
| Åldersavdrag rules  | Product catalog | Yes      |
| Coverage exclusions | Product catalog | Yes      |

### Regulatory

- **IDD-007** — Allrisk must be presented as optional with separate pricing
- **IDD-013** — Cross-selling disclosure; customer must understand the add-on
  is separate from the base product
- **FSA-004** — Fair treatment; clear explanation of what is and is not covered
- **FSA-012** — Coverage terms and exclusions must be clearly disclosed

---

## HQB-05: Sign Policy with BankID

**As a** customer (privatkund),
**I want to** sign my home insurance policy digitally using BankID,
**so that** the process is fully digital and legally binding.

### Acceptance Criteria

- **GIVEN** the customer has selected a coverage tier, deductible, and add-ons
  **WHEN** the customer proceeds to signing
  **THEN** the system presents a binding summary showing:
  - Selected product type and coverage tier
  - Coverage details and sum insured
  - Premium amount and payment frequency (monthly/annual)
  - Deductible (självrisk) amount
  - Policy effective date
  - Pre-contractual information (IDD-003)
  - Confirmation that the IPID has been provided (IDD-002)
  - Confirmation that the demands-and-needs assessment is recorded (IDD-011)

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
  re-entering data; the quote remains valid for the configured validity period

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
- **IDD-011** — Demands-and-needs assessment must be completed before signing
- **IDD-008** — Signing record must be retained as part of distribution records
- **FSA-012** — Contract terms and conditions must be disclosed before binding
- **FSA-013** — Customer must be informed of the 14-day cooling-off right
  (ångerrätt) at the point of signing
- **GDPR-007** — BankID transaction data is personal data; legal basis is
  Article 6(1)(b) contract performance

---

## HQB-06: Agent-Assisted Home Quote

**As a** customer service agent (kundtjänstmedarbetare),
**I want to** create a home insurance quote on behalf of a phone customer,
**so that** I can serve non-digital customers.

### Acceptance Criteria

- **GIVEN** the agent is authenticated and has valid competence certification
  **WHEN** the agent enters the customer's address and personnummer
  **THEN** the system retrieves property data as in HQB-01

- **GIVEN** the agent completes the demands-and-needs assessment on behalf
  of the customer
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
| Customer address         | Customer/agent     | Yes      |
| Distribution channel     | System (automatic) | Yes      |
| Recommendation rationale | Agent input        | Yes      |

### External Integrations

- **Lantmäteriet** — Property data lookup (same as HQB-01)
- **BankID** — Agent authentication

### Regulatory

- **IDD-011** — Agent must perform demands-and-needs assessment before
  recommending a product
- **IDD-005** — Agent must disclose distribution status and remuneration
- **IDD-006** — Personalized recommendation must be documented with rationale
- **IDD-008** — All distribution records must be retained for 5+ years
- **IDD-009** — Agent must have current competence certification
- **FSA-004** — Fair treatment of the customer
- **GDPR-007** — Personal data collection; agent acts under TryggFörsäkring's
  controllership

---

## HQB-07: Automatic Property Risk Assessment

**As an** underwriter (riskbedömare),
**I want the** system to auto-assess risk based on property data (address,
construction year, building type),
**so that** standard cases are handled automatically without manual review.

### Acceptance Criteria

- **GIVEN** the system has property data from Lantmäteriet (HQB-09)
  **WHEN** a new home insurance quote is generated
  **THEN** the system performs an automated risk assessment evaluating:
  - Geographic risk zone (flood risk, subsidence, crime rates)
  - Building construction type and materials
  - Construction year and renovation history
  - Security features (alarm, locks, fire protection)
  - Distance to fire station and water source

- **GIVEN** the automated risk assessment classifies the property as
  standard risk
  **WHEN** the assessment is complete
  **THEN** the system proceeds to quote generation without underwriter
  intervention

- **GIVEN** the automated risk assessment identifies risk factors outside
  standard parameters
  **WHEN** the assessment flags the property
  **THEN** the system routes the quote to an underwriter for manual review
  (HQB-08) and notifies the customer that the quote requires review

- **GIVEN** the property is in a known flood-risk zone (översvämningszon)
  **WHEN** the system evaluates geographic risk
  **THEN** the system applies flood-risk pricing adjustments or excludes
  flood coverage based on underwriting guidelines

- **GIVEN** the building was constructed before 1950
  **WHEN** the system evaluates construction year
  **THEN** the system flags the property for potential issues (old wiring,
  lead pipes, asbestos) and may require a property inspection
  (besiktningsprotokoll)

### Data Requirements

| Data Element       | Source                | Required |
| ------------------ | --------------------- | -------- |
| Property address   | Customer/Lantmäteriet | Yes      |
| Construction year  | Lantmäteriet          | Yes      |
| Building type      | Lantmäteriet          | Yes      |
| Building materials | Lantmäteriet/customer | Yes      |
| Security features  | Customer input        | Yes      |
| Flood risk zone    | MSB/geographic data   | Yes      |
| Crime statistics   | SCB/geographic data   | No       |

### External Integrations

- **Lantmäteriet** — Property data and building information
- **MSB (Myndigheten för samhällsskydd och beredskap)** — Flood risk mapping

### Regulatory

- **FSA-015** — Product suitability; risk assessment must support accurate
  pricing
- **FSA-005** — Product governance; underwriting rules must align with target
  market definitions
- **FSA-016** — Building valuation; adequate sum insured to prevent
  underinsurance
- **GDPR-007** — Property data is processed under Article 6(1)(b)
  pre-contractual steps

---

## HQB-08: Review Flagged High-Risk Quotes

**As an** underwriter (riskbedömare),
**I want to** review flagged quotes (high-risk areas, old buildings, previous
claims),
**so that** I can make informed accept/reject decisions.

### Acceptance Criteria

- **GIVEN** the automated risk assessment (HQB-07) flags a quote for manual
  review
  **WHEN** the underwriter opens the review queue
  **THEN** the flagged quote is displayed with:
  - Full property details and risk assessment results
  - Specific risk factors that triggered the flag
  - Customer's claims history
  - Recommended action (accept, accept with conditions, decline)

- **GIVEN** the underwriter reviews a flagged quote
  **WHEN** the underwriter decides to accept with conditions
  **THEN** the system allows the underwriter to:
  - Adjust the premium with a risk surcharge
  - Add specific exclusions (e.g., exclude flood coverage)
  - Require a property inspection before binding
  - Set a maximum sum insured

- **GIVEN** the underwriter decides to decline the quote
  **WHEN** the decline is recorded
  **THEN** the system notifies the customer with a clear explanation of
  the decline reason and any alternative options

- **GIVEN** the underwriter reviews the quote
  **WHEN** the review is completed
  **THEN** the system records the underwriter's identity, decision,
  rationale, and timestamp for audit purposes

- **GIVEN** a flagged quote has been waiting for review for more than
  the configured SLA period
  **WHEN** the SLA threshold is reached
  **THEN** the system alerts the underwriting supervisor

### Data Requirements

| Data Element       | Source            | Required |
| ------------------ | ----------------- | -------- |
| Risk assessment    | System (HQB-07)   | Yes      |
| Claims history     | Internal database | Yes      |
| Property details   | Lantmäteriet      | Yes      |
| Underwriter ID     | Platform login    | Yes      |
| Decision rationale | Underwriter input | Yes      |

### Regulatory

- **FSA-004** — Fair treatment; decline decisions must be justified and
  communicated clearly
- **FSA-005** — Product governance; acceptance criteria must align with
  target market definitions
- **FSA-015** — Product suitability; pricing adjustments must be justified
  by risk factors
- **GDPR-007** — Claims history is personal data; processing must have a
  lawful basis

---

## HQB-09: Verify Property Address via Lantmäteriet

**As the** system,
**I want to** verify the property address via Lantmäteriet/address registry,
**so that** the quote is based on accurate property data.

### Acceptance Criteria

- **GIVEN** the customer enters an address during the quote flow (HQB-01)
  **WHEN** the system processes the address
  **THEN** the system queries the Lantmäteriet/address registry and retrieves:
  - Fastighetsregistret data (property ID, plot boundaries)
  - Building information (construction year, building type, area)
  - Geographic coordinates (for risk zone mapping)
  - Registered owner information (where available)

- **GIVEN** the address lookup returns valid property data
  **WHEN** the system processes the response
  **THEN** the property data is pre-populated in the quote form and used
  for premium calculation

- **GIVEN** the address lookup returns no results or ambiguous results
  **WHEN** the system detects the failure
  **THEN** the customer is prompted to enter property details manually
  (building type, construction year, area) and the quote is flagged for
  underwriter review (HQB-08)

- **GIVEN** the address lookup succeeds but the building type does not
  match the selected product (e.g., apartment address with
  villahemförsäkring selected)
  **WHEN** the system detects the mismatch
  **THEN** the system alerts the customer and suggests the correct product
  type

- **GIVEN** the Lantmäteriet service is temporarily unavailable
  **WHEN** the system detects the outage
  **THEN** the system allows manual entry with a note that data will be
  verified when the service is restored, and the quote is flagged for
  verification

### Data Requirements

| Data Element       | Source         | Required |
| ------------------ | -------------- | -------- |
| Street address     | Customer input | Yes      |
| Postal code        | Customer input | Yes      |
| Property ID        | Lantmäteriet   | Yes      |
| Building type      | Lantmäteriet   | Yes      |
| Construction year  | Lantmäteriet   | Yes      |
| Building area (m²) | Lantmäteriet   | Yes      |
| Geographic coords  | Lantmäteriet   | Yes      |

### External Integrations

- **Lantmäteriet** — Property registry (fastighetsregistret) and building
  data lookup
- **Address Registry** — Swedish address validation service

### Regulatory

- **FSA-016** — Building valuation; accurate property data ensures adequate
  sum insured
- **FSA-015** — Product suitability; property data validates that the correct
  product type is offered
- **GDPR-007** — Property data collection; legal basis is Article 6(1)(b)
  pre-contractual steps

---

## HQB-10: Calculate Premium Based on Rating Factors

**As the** system,
**I want to** calculate the premium based on rating factors (location, size,
construction, security features),
**so that** pricing is accurate and fair.

### Acceptance Criteria

- **GIVEN** property data is available from Lantmäteriet (HQB-09) and the
  customer has provided personal details
  **WHEN** the system calculates the premium
  **THEN** the following rating factors are applied:
  - Geographic risk zone (flood, subsidence, crime)
  - Building construction type and materials
  - Construction year
  - Living area (m²) and number of rooms
  - Security features (alarm system, approved locks, fire alarm)
  - Sum insured for contents (lösöre)
  - Selected coverage tier (bas/standard/premium)
  - Selected deductible level (självrisk)
  - Customer's claims history
  - Product type (hemförsäkring, villahemförsäkring,
    bostadsrättsförsäkring, fritidshusförsäkring)

- **GIVEN** the premium is calculated for all available tiers
  **WHEN** the results are presented
  **THEN** each tier shows the base premium, add-on premiums (if selected),
  and total premium, with monthly and annual payment options

- **GIVEN** a villahemförsäkring or fritidshusförsäkring quote
  **WHEN** the system calculates the building premium
  **THEN** the building sum insured is calculated based on building area,
  construction type, and a current rebuilding cost index

- **GIVEN** the customer has a claims history with TryggFörsäkring
  **WHEN** the system applies claims history to premium calculation
  **THEN** the premium is adjusted based on the number and type of
  previous claims within a defined lookback period

- **GIVEN** the property has enhanced security features (approved alarm,
  certified locks, sprinkler system)
  **WHEN** the system evaluates security discounts
  **THEN** the premium is reduced by the applicable security discount
  percentage per underwriting guidelines

### Data Requirements

| Data Element          | Source                | Required |
| --------------------- | --------------------- | -------- |
| Property risk zone    | MSB/geographic data   | Yes      |
| Building data         | Lantmäteriet          | Yes      |
| Living area           | Customer/Lantmäteriet | Yes      |
| Security features     | Customer input        | Yes      |
| Contents sum insured  | Customer input        | Yes      |
| Coverage tier         | Customer selection    | Yes      |
| Deductible level      | Customer selection    | Yes      |
| Claims history        | Internal database     | No       |
| Rebuilding cost index | Svensk Försäkring     | Yes      |

### External Integrations

- **Svensk Försäkring** — Rebuilding cost index for building valuation
- **MSB** — Flood risk and natural hazard mapping

### Regulatory

- **FSA-015** — Product suitability; premium must reflect actual risk
- **FSA-004** — Fair treatment; pricing must be transparent and
  non-discriminatory
- **FSA-016** — Building valuation; sum insured must be adequate to prevent
  underinsurance
- **FSA-005** — Product governance; pricing model must align with target
  market definitions
- **GDPR-007** — Claims history is personal data; processing based on
  Article 6(1)(b)

---

## Data Model

The following data entities are central to the home quote-and-bind process.

### Quote

| Attribute             | Type     | Description                                    |
| --------------------- | -------- | ---------------------------------------------- |
| Quote ID              | String   | Unique identifier for the quote                |
| Customer personnummer | String   | Swedish personal identity number               |
| Product type          | Enum     | Hem / Villahem / Bostadsrätt / Fritidshus      |
| Property address      | String   | Full property address                          |
| Property ID           | String   | Lantmäteriet fastighets-ID                     |
| Building type         | Enum     | Apartment / Villa / Row house / Vacation home  |
| Construction year     | Integer  | From Lantmäteriet lookup                       |
| Living area (m²)      | Decimal  | Floor area of the insured dwelling             |
| Coverage tier         | Enum     | Bas / Standard / Premium                       |
| Deductible amount     | Decimal  | Selected självrisk in SEK                      |
| Contents sum insured  | Decimal  | Sum insured for lösöre in SEK                  |
| Building sum insured  | Decimal  | Sum insured for building in SEK (villa/fritid) |
| Base premium          | Decimal  | Annual premium before add-ons                  |
| Add-ons               | List     | Selected optional coverages with pricing       |
| Total premium         | Decimal  | Base premium + add-on premiums                 |
| Payment frequency     | Enum     | Monthly / Annual                               |
| Risk assessment       | String   | Reference to automated risk assessment         |
| Validity period       | Date     | Quote expiry date                              |
| Assessment reference  | String   | Link to demands-and-needs assessment           |
| IPID version          | String   | Version of IPID provided                       |
| Created timestamp     | DateTime | When the quote was created                     |
| Distribution channel  | Enum     | Digital / Agent                                |
| Agent ID              | String   | If agent-assisted (nullable)                   |

### Policy

| Attribute              | Type     | Description                                  |
| ---------------------- | -------- | -------------------------------------------- |
| Policy number          | String   | Unique policy identifier                     |
| Quote ID               | String   | Reference to originating quote               |
| Customer personnummer  | String   | Policyholder identity                        |
| Product type           | Enum     | Hem / Villahem / Bostadsrätt / Fritidshus    |
| Property address       | String   | Insured property address                     |
| Coverage tier          | Enum     | Bas / Standard / Premium                     |
| Deductible amount      | Decimal  | Självrisk in SEK                             |
| Contents sum insured   | Decimal  | Sum insured for lösöre in SEK                |
| Building sum insured   | Decimal  | Sum insured for building in SEK (if applies) |
| Total premium          | Decimal  | Bound premium amount                         |
| Payment frequency      | Enum     | Monthly / Annual                             |
| Effective date         | Date     | Coverage start date                          |
| Expiry date            | Date     | Huvudförfallodag (policy anniversary)        |
| Status                 | Enum     | Active / Cancelled / Expired                 |
| BankID transaction ref | String   | Signing reference                            |
| Signing timestamp      | DateTime | When the policy was signed                   |
| Distribution channel   | Enum     | Digital / Agent                              |
| Agent ID               | String   | If agent-assisted (nullable)                 |
| Assessment reference   | String   | Link to demands-and-needs assessment         |
| Cooling-off expiry     | Date     | Ångerrätt expiry (14 days from binding)      |

### PropertyAssessment

| Attribute         | Type     | Description                                   |
| ----------------- | -------- | --------------------------------------------- |
| Assessment ID     | String   | Unique identifier                             |
| Property address  | String   | Full address of the assessed property         |
| Property ID       | String   | Lantmäteriet fastighets-ID                    |
| Construction year | Integer  | Year the building was constructed             |
| Building type     | Enum     | Villa / Apartment / Row house / Vacation home |
| Building area     | Decimal  | Total building area in m²                     |
| Living area       | Decimal  | Livable floor area in m²                      |
| Building material | Enum     | Wood / Brick / Concrete / Mixed               |
| Security features | List     | Alarm, locks, fire protection details         |
| Risk zone         | Enum     | Low / Medium / High                           |
| Flood risk        | Enum     | None / Low / Medium / High                    |
| Risk flags        | List     | Specific risk factors identified              |
| Assessment result | Enum     | Standard / Flagged for review                 |
| Assessed by       | Enum     | System (automatic) / Underwriter (manual)     |
| Assessed at       | DateTime | When the assessment was completed             |

---

## Process Flow

The home insurance quote-and-bind process follows this sequence:

1. **Address entry** — Customer enters property address and selects product
   type (HQB-01)
2. **Property data lookup** — System retrieves property details from
   Lantmäteriet (HQB-09)
3. **Risk assessment** — System auto-assesses property risk based on
   retrieved data (HQB-07)
4. **Demands-and-needs assessment** — System guides the customer through a
   structured assessment of their insurance needs
5. **BRF gap analysis** — If bostadsrättsförsäkring, system presents BRF
   coverage gap analysis (HQB-03)
6. **Premium calculation** — System calculates premiums for all three tiers
   using property data, risk factors, and customer details (HQB-10)
7. **Coverage comparison** — Customer reviews and compares tiers with IPID
   access (HQB-02)
8. **Add-on selection** — Customer selects optional add-ons (allrisk/drulle,
   ID-skydd, etc.) (HQB-04)
9. **Pre-contractual review** — System presents binding summary with all
   required pre-contractual information (IDD-003)
10. **BankID signing** — Customer signs the policy digitally (HQB-05)
11. **Policy issuance** — System generates policy number and confirmation
    documents
12. **Payment setup** — System initiates premium collection via payment
    provider
13. **Confirmation** — Customer receives policy documents, IPID, and
    cooling-off information

---

## Regulatory Traceability Matrix

| Requirement | HQB-01 | HQB-02 | HQB-03 | HQB-04 | HQB-05 | HQB-06 | HQB-07 | HQB-08 | HQB-09 | HQB-10 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-004     |        | X      | X      | X      | X      | X      |        | X      |        | X      |
| FSA-005     |        |        |        |        |        |        | X      | X      |        | X      |
| FSA-012     |        | X      |        | X      | X      |        |        |        |        |        |
| FSA-013     |        |        |        |        | X      |        |        |        |        |        |
| FSA-015     | X      |        | X      |        |        |        | X      | X      | X      | X      |
| FSA-016     |        |        | X      |        |        |        | X      |        | X      | X      |
| GDPR-007    | X      |        |        |        | X      | X      | X      | X      | X      | X      |
| IDD-002     |        | X      |        |        | X      |        |        |        |        |        |
| IDD-003     |        |        |        |        | X      |        |        |        |        |        |
| IDD-005     |        |        |        |        |        | X      |        |        |        |        |
| IDD-006     |        |        |        |        |        | X      |        |        |        |        |
| IDD-007     |        | X      |        | X      |        |        |        |        |        |        |
| IDD-008     |        |        |        |        | X      | X      |        |        |        |        |
| IDD-009     |        |        |        |        |        | X      |        |        |        |        |
| IDD-011     | X      | X      | X      |        | X      | X      |        |        |        |        |
| IDD-013     |        | X      |        | X      |        |        |        |        |        |        |

---

## External System Integration Summary

| System            | Integration Point                | Stories                |
| ----------------- | -------------------------------- | ---------------------- |
| Lantmäteriet      | Property data lookup             | HQB-01, HQB-06, HQB-09 |
| Address Registry  | Address validation and geocoding | HQB-01, HQB-09         |
| BankID            | Customer identity verification   | HQB-01                 |
| BankID            | Agent authentication             | HQB-06                 |
| BankID            | Digital policy signing           | HQB-05                 |
| MSB               | Flood risk mapping               | HQB-07, HQB-10         |
| Svensk Försäkring | Rebuilding cost index            | HQB-10                 |
| Payment Provider  | Premium collection setup         | HQB-05                 |
