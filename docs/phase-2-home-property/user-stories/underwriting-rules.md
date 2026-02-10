---
sidebar_position: 5
---

# Home Underwriting Rules — User Stories

User stories for home & property insurance underwriting (riskbedömning och
prissättning). Covers risk assessment based on geographic location, construction
type, building age, security features, and claims history. Defines coverage tiers
(bas/standard/premium), self-retention (självrisk) options, sub-limits for
high-value items, risk acceptance criteria, automatic premium calculation, and
external integration with SMHI, MSB, BRÅ, and Lantmäteriet.

## Overview

| ID     | Actor       | Summary                                                    |
| ------ | ----------- | ---------------------------------------------------------- |
| HUW-01 | Underwriter | Assess risk based on geographic location                   |
| HUW-02 | Underwriter | Evaluate construction type and building age                |
| HUW-03 | Underwriter | Apply discounts for security features                      |
| HUW-04 | Underwriter | Factor claims history into premium calculation             |
| HUW-05 | Underwriter | Define coverage tiers with inclusions and exclusions       |
| HUW-06 | Underwriter | Set self-retention (självrisk) levels                      |
| HUW-07 | Underwriter | Define sub-limits for high-value item categories           |
| HUW-08 | Underwriter | Define risk acceptance criteria                            |
| HUW-09 | Underwriter | Escalate borderline cases for manual review                |
| HUW-10 | System      | Calculate premium automatically for standard risk profiles |
| HUW-11 | System      | Integrate with external data sources for geographic risk   |

---

## HUW-01: Assess Risk Based on Geographic Location

**As an** underwriter (försäkringsgivare),
**I want** the system to assess risk based on the property's geographic location
(flood zone, crime rate, subsidence area),
**so that** premiums reflect the actual local risk profile of the insured
property.

### Acceptance Criteria

- **GIVEN** a property address is provided during the quote or underwriting
  process
  **WHEN** the system determines the geographic risk zone
  **THEN** it assigns a risk zone classification for each peril: flood risk
  (översvämning), crime rate (inbrottsrisk), and subsidence (sättningar), using
  data from SMHI, MSB, and BRÅ

- **GIVEN** the property is located in a high-risk flood zone (as classified by
  MSB)
  **WHEN** the system calculates the premium
  **THEN** a flood risk loading factor is applied to the base premium, and the
  loading percentage is recorded in the rating factor breakdown

- **GIVEN** the property is in an area with above-average burglary rates (as
  classified by BRÅ)
  **WHEN** the system calculates the premium
  **THEN** a crime risk loading factor is applied, proportional to the area's
  deviation from the national average

- **GIVEN** the property is in a known subsidence area
  **WHEN** the system evaluates the risk
  **THEN** a subsidence loading factor is applied and the system flags the
  property for underwriter review if the subsidence risk exceeds a configurable
  threshold

- **GIVEN** the geographic risk data is unavailable for a specific address
  **WHEN** the system cannot retrieve risk zone data from external sources
  **THEN** the quote is routed to manual underwriting review and the system logs
  the data retrieval failure

### Data Requirements

| Data Element            | Source                  | Required |
| ----------------------- | ----------------------- | -------- |
| Property address        | Customer input          | Yes      |
| Flood zone class        | SMHI / MSB flood maps   | Yes      |
| Crime rate zone         | BRÅ statistics          | Yes      |
| Subsidence risk zone    | MSB / geological survey | Yes      |
| Risk zone loading       | Rating engine           | Yes      |
| Factor breakdown record | Rating engine           | Yes      |

### External Integrations

- **SMHI** — Climate and flood risk data
- **MSB (Myndigheten för samhällsskydd och beredskap)** — Risk zone mapping,
  flood maps
- **BRÅ (Brottsförebyggande rådet)** — Crime statistics by geographic area

### Regulatory

- **FSA-005** — Product governance requires risk-based pricing that reflects the
  actual risk profile; geographic factors must be applied consistently across
  similar properties
- **IDD-012** — Customers must be informed about how geographic risk affects
  their premium, particularly flood exclusions or loadings
- **GDPR-007** — Geospatial risk data processed under Article 6(1)(f) legitimate
  interest for property risk assessment; data aggregated at zone level where
  possible

---

## HUW-02: Evaluate Construction Type and Building Age

**As an** underwriter (försäkringsgivare),
**I want** the system to evaluate the construction type (trä, sten, betong) and
building age,
**so that** fire and water damage risk is correctly priced based on the
property's structural characteristics.

### Acceptance Criteria

- **GIVEN** the property's construction material is known (from Lantmäteriet or
  customer input)
  **WHEN** the system evaluates fire risk
  **THEN** a construction type factor is applied: trä (wood) receives the
  highest fire risk loading, sten (stone/brick) receives a moderate loading, and
  betong (concrete) receives the lowest loading

- **GIVEN** the building's construction year is known
  **WHEN** the system evaluates the property
  **THEN** a building age factor is applied based on age bands (e.g., 0–10
  years, 11–30 years, 31–50 years, 51–100 years, >100 years), with older
  buildings receiving higher loading for water damage and electrical fire risk

- **GIVEN** the building is older than 100 years
  **WHEN** the system processes the quote
  **THEN** the system requires a besiktningsprotokoll (inspection report) before
  a quote can be finalized, and routes the case to underwriter review

- **GIVEN** the building has undergone a major renovation (stambyte, roof
  replacement, electrical rewiring)
  **WHEN** the customer or Lantmäteriet data indicates a recent renovation
  **THEN** the system adjusts the effective building age for the renovated
  components, reducing the age-related loading accordingly

- **GIVEN** construction material data is unavailable from Lantmäteriet
  **WHEN** the system cannot determine the construction type
  **THEN** the system prompts the customer for manual input and applies a
  default conservative loading until verified

### Data Requirements

| Data Element          | Source                        | Required |
| --------------------- | ----------------------------- | -------- |
| Construction material | Lantmäteriet / customer input | Yes      |
| Construction year     | Lantmäteriet / customer input | Yes      |
| Renovation history    | Customer input                | No       |
| Inspection report     | Customer upload / surveyor    | Cond.    |
| Fire risk factor      | Rating engine                 | Yes      |
| Age band factor       | Rating engine                 | Yes      |

### External Integrations

- **Lantmäteriet** — Property data including construction year, building type,
  and materials

### Regulatory

- **FSA-005** — Product governance requires that construction risk factors are
  applied fairly and consistently
- **FSA-016** — Building valuation must account for construction type and age to
  ensure adequate sum insured and prevent underinsurance
- **GDPR-007** — Building specification data processed under Article 6(1)(b)
  contract performance

---

## HUW-03: Apply Discounts for Security Features

**As an** underwriter (försäkringsgivare),
**I want** to apply discounts for security features (larm, vattenavstängning,
sprinkler),
**so that** policyholders who invest in risk-reducing measures are rewarded with
lower premiums.

### Acceptance Criteria

- **GIVEN** the customer declares that the property has a connected alarm system
  (larm)
  **WHEN** the system calculates the premium
  **THEN** a discount of 5–15% is applied to the burglary and fire components of
  the premium, with the exact percentage determined by the alarm type
  (local-only, monitored, or connected to räddningstjänsten)

- **GIVEN** the customer declares that the property has an automatic water
  shutoff system (vattenavstängningssystem)
  **WHEN** the system calculates the premium
  **THEN** a discount of 5–10% is applied to the water damage component of the
  premium

- **GIVEN** the customer declares that the property has a sprinkler system
  **WHEN** the system calculates the premium
  **THEN** a discount of 10–20% is applied to the fire damage component of the
  premium

- **GIVEN** the customer declares multiple security features
  **WHEN** the system applies the discounts
  **THEN** the discounts are applied cumulatively but subject to a maximum total
  security discount cap (configurable, e.g., 30%), and the individual and
  combined discounts are visible in the premium breakdown

- **GIVEN** the customer declares a security feature
  **WHEN** a claim is subsequently filed for the relevant peril
  **THEN** the claims handler can verify whether the declared security feature
  was active at the time of loss, and the declaration is recorded in the policy
  record for audit purposes

### Security Feature Discount Table

| Feature                        | Discount Range | Applies To      |
| ------------------------------ | -------------- | --------------- |
| Alarm — local only             | 5%             | Burglary + fire |
| Alarm — monitored              | 10%            | Burglary + fire |
| Alarm — connected to emergency | 15%            | Burglary + fire |
| Water shutoff — automatic      | 5–10%          | Water damage    |
| Sprinkler system               | 10–20%         | Fire damage     |
| Maximum combined discount      | 30%            | Total premium   |

### Data Requirements

| Data Element           | Source         | Required |
| ---------------------- | -------------- | -------- |
| Alarm type and status  | Customer input | No       |
| Water shutoff type     | Customer input | No       |
| Sprinkler installation | Customer input | No       |
| Discount percentage    | Rating engine  | Yes      |
| Combined discount cap  | Rating engine  | Yes      |

### Regulatory

- **FSA-004** — Discount criteria and amounts must be transparent; the customer
  must understand which discounts apply and why
- **FSA-005** — Security discounts must be applied consistently across all
  qualifying policyholders; similar security features must receive similar
  discounts
- **IDD-012** — The relationship between security features and premium reduction
  must be disclosed so the customer can make an informed decision about
  risk-reducing investments

---

## HUW-04: Factor Claims History into Premium Calculation

**As an** underwriter (försäkringsgivare),
**I want** claims history to factor into the premium calculation,
**so that** policyholders with high claim frequency pay a premium that reflects
their demonstrated risk.

### Acceptance Criteria

- **GIVEN** the customer has an existing claims history with TryggFörsäkring
  **WHEN** the system calculates the premium
  **THEN** the system retrieves the number, type, and total paid amount of
  claims in the past 5 years and applies a claims loading factor based on the
  claims frequency

- **GIVEN** the customer has 0 claims in the past 5 years
  **WHEN** the system calculates the premium
  **THEN** no claims loading is applied (base premium)

- **GIVEN** the customer has 1–2 claims in the past 5 years
  **WHEN** the system calculates the premium
  **THEN** a moderate claims loading factor is applied per the tariff table, and
  the loading amount is shown in the premium breakdown

- **GIVEN** the customer has 3 or more claims in the past 5 years
  **WHEN** the system calculates the premium
  **THEN** the case is routed to a senior underwriter for manual review before
  the quote is issued (see HUW-09)

- **GIVEN** the customer is a new customer with no internal claims history
  **WHEN** the system calculates the premium
  **THEN** the system accepts a claims-free declaration from the customer and
  applies the base premium; the declaration is recorded for audit purposes

- **GIVEN** claims history is used in premium calculation
  **WHEN** the premium is presented to the customer
  **THEN** the customer is informed that claims history is a rating factor and
  the impact is visible in the premium breakdown

### Claims History Loading Table

| Claims (Past 5 Years) | Loading Factor | Action                      |
| --------------------- | -------------- | --------------------------- |
| 0                     | None           | Base premium                |
| 1                     | +5–10%         | Automatic                   |
| 2                     | +15–25%        | Automatic                   |
| 3+                    | +30% or more   | Route to senior underwriter |

### Data Requirements

| Data Element        | Source               | Required |
| ------------------- | -------------------- | -------- |
| Claims count (5 yr) | Internal claims data | Yes      |
| Claim types         | Internal claims data | Yes      |
| Total paid amounts  | Internal claims data | Yes      |
| Claims-free decl.   | Customer input       | Cond.    |
| Loading factor      | Rating engine        | Yes      |

### Regulatory

- **FSA-004** — Claims history impact on premium must be communicated
  transparently
- **FSA-005** — Claims loading must be applied consistently and fairly; similar
  claims histories must result in similar loadings
- **IDD-012** — The customer must understand that claims history affects the
  premium and by how much
- **GDPR-007** — Claims history data processed under Article 6(1)(b) contract
  performance for existing customers; Article 6(1)(f) legitimate interest for
  risk assessment

---

## HUW-05: Define Coverage Tiers

**As an** underwriter (försäkringsgivare),
**I want** to define coverage tiers (bas/standard/premium) with clear inclusions
and exclusions,
**so that** products are consistent, customers can choose the right level of
protection, and pricing is transparent.

### Acceptance Criteria

- **GIVEN** the system is configured with three coverage tiers
  **WHEN** a customer requests a quote
  **THEN** the system presents all three tiers with a clear comparison of what
  is included and excluded in each tier

- **GIVEN** the bas (grundskydd) tier is selected
  **WHEN** the system configures the coverage
  **THEN** the policy includes: contents insurance (lösöre), liability
  protection (ansvarsförsäkring), legal expenses (rättsskydd), fire, water
  damage, and burglary coverage, with standard sub-limits applied

- **GIVEN** the standard (standardskydd) tier is selected
  **WHEN** the system configures the coverage
  **THEN** the policy includes everything in bas plus: travel insurance
  (reseförsäkring), assault coverage (överfallsskydd), ID-theft protection
  (ID-skydd), and higher sub-limits for valuables

- **GIVEN** the premium (premiumskydd) tier is selected
  **WHEN** the system configures the coverage
  **THEN** the policy includes everything in standard plus: allrisk/drulle
  coverage (accidental damage), no sub-limits for standard item categories, and
  a lower default självrisk

- **GIVEN** a tier is presented to the customer
  **WHEN** the customer views the tier comparison
  **THEN** each tier clearly lists: included perils, excluded perils, sub-limits
  by item category, default deductible, and the annual premium for the
  customer's property

### Coverage Tier Definition

| Coverage Component                | Bas | Standard | Premium |
| --------------------------------- | --- | -------- | ------- |
| Contents (lösöre)                 | Yes | Yes      | Yes     |
| Liability (ansvar)                | Yes | Yes      | Yes     |
| Legal expenses (rättsskydd)       | Yes | Yes      | Yes     |
| Fire                              | Yes | Yes      | Yes     |
| Water damage                      | Yes | Yes      | Yes     |
| Burglary                          | Yes | Yes      | Yes     |
| Travel insurance (reseförsäkring) | No  | Yes      | Yes     |
| Assault (överfallsskydd)          | No  | Yes      | Yes     |
| ID-theft protection (ID-skydd)    | No  | Yes      | Yes     |
| Allrisk/drulle                    | No  | No       | Yes     |
| Sub-limits for valuables          | Yes | Higher   | None    |
| Default självrisk                 | Std | Std      | Lower   |

### Data Requirements

| Data Element       | Source         | Required |
| ------------------ | -------------- | -------- |
| Coverage tier      | Customer input | Yes      |
| Included perils    | Product config | Yes      |
| Excluded perils    | Product config | Yes      |
| Sub-limit amounts  | Product config | Yes      |
| Default deductible | Product config | Yes      |
| Tier premium       | Rating engine  | Yes      |

### Regulatory

- **FSA-004** — Coverage tier differences must be communicated clearly so the
  customer can make an informed choice
- **FSA-005** — Product governance requires that each tier has a defined target
  market and that tier pricing is fair and consistent
- **FSA-012** — Pre-contractual disclosure must include the coverage scope and
  significant exclusions for the selected tier
- **FSA-015** — All hemförsäkring tiers must include the mandatory coverage
  components (lösöre, ansvar, rättsskydd, överfallsskydd)
- **IDD-011** — The demands-and-needs assessment must determine which tier is
  appropriate for the customer's situation
- **IDD-012** — Coverage gaps between tiers must be clearly disclosed,
  particularly the distinction between named-perils and allrisk coverage

---

## HUW-06: Set Self-Retention (Självrisk) Levels

**As an** underwriter (försäkringsgivare),
**I want** to set self-retention (självrisk) levels that customers can choose
from,
**so that** the premium/risk trade-off is transparent and the customer can
select the deductible that fits their financial situation.

### Acceptance Criteria

- **GIVEN** the system is configured with multiple självrisk levels
  **WHEN** a customer requests a quote
  **THEN** the system presents all available deductible options with the
  corresponding premium impact for each level

- **GIVEN** the customer selects a lower deductible (låg, 1 500 SEK)
  **WHEN** the system calculates the premium
  **THEN** a premium surcharge of approximately +15% is applied relative to the
  standard deductible premium

- **GIVEN** the customer selects the standard deductible (3 000 SEK)
  **WHEN** the system calculates the premium
  **THEN** the base premium is applied with no surcharge or discount

- **GIVEN** the customer selects a higher deductible (hög, 6 000 SEK or mycket
  hög, 10 000 SEK)
  **WHEN** the system calculates the premium
  **THEN** a premium discount is applied (-10% for hög, -18% for mycket hög)
  and the discount is visible in the premium breakdown

- **GIVEN** the customer selects a deductible level
  **WHEN** the system presents the quote
  **THEN** the quote clearly explains the selected deductible amount, the
  premium impact, and that the deductible is the amount the customer pays
  per claim before the insurer covers the remainder

### Self-Retention Options

| Level      | Amount (SEK) | Premium Impact |
| ---------- | ------------ | -------------- |
| Låg        | 1 500        | +15% premium   |
| Standard   | 3 000        | Base premium   |
| Hög        | 6 000        | -10% premium   |
| Mycket hög | 10 000       | -18% premium   |

### Data Requirements

| Data Element        | Source         | Required |
| ------------------- | -------------- | -------- |
| Selected deductible | Customer input | Yes      |
| Deductible amount   | Product config | Yes      |
| Premium adjustment  | Rating engine  | Yes      |
| Premium breakdown   | Rating engine  | Yes      |

### Regulatory

- **FSA-004** — Deductible options and their premium impact must be presented
  clearly and transparently
- **FSA-012** — Pre-contractual disclosure must explain the deductible concept
  and the financial implications of each level
- **IDD-011** — The demands-and-needs assessment must evaluate which deductible
  level is appropriate for the customer's financial situation
- **IDD-012** — The trade-off between lower premium and higher out-of-pocket
  cost must be disclosed

---

## HUW-07: Define Sub-Limits for High-Value Item Categories

**As an** underwriter (försäkringsgivare),
**I want** to define sub-limits for specific item categories (jewelry,
electronics, art),
**so that** exposure to high-value claims is controlled and customers understand
the maximum payout per category.

### Acceptance Criteria

- **GIVEN** the policy is configured with sub-limits
  **WHEN** the system presents the coverage details
  **THEN** each sub-limit category is listed with its maximum payout amount for
  the selected coverage tier

- **GIVEN** a customer has high-value items exceeding a sub-limit
  **WHEN** the customer reviews the coverage
  **THEN** the system recommends that the customer declare specific high-value
  items (värdeföremålsdeklaration) to extend the coverage limit for those items

- **GIVEN** a claim is filed for items in a sub-limited category
  **WHEN** the claims handler assesses the claim
  **THEN** the settlement is capped at the sub-limit amount unless the customer
  has a valid värdeföremålsdeklaration for the specific items

- **GIVEN** the premium tier is selected
  **WHEN** the system configures the coverage
  **THEN** sub-limits are removed for standard item categories (per the premium
  tier definition), though limits for extraordinary items such as art
  collections remain subject to individual valuation

- **GIVEN** the customer adds a värdeföremålsdeklaration
  **WHEN** the system recalculates the premium
  **THEN** an additional premium is charged based on the declared total value
  and item category, and the specific items and declared values are recorded on
  the policy

### Sub-Limit Table

| Category                 | Bas (SEK) | Standard (SEK) | Premium (SEK)  |
| ------------------------ | --------- | -------------- | -------------- |
| Jewelry (smycken)        | 25 000    | 50 000         | No limit       |
| Electronics (elektronik) | 30 000    | 60 000         | No limit       |
| Art and collectibles     | 20 000    | 40 000         | By declaration |
| Bicycles (cyklar)        | 15 000    | 30 000         | No limit       |
| Musical instruments      | 15 000    | 30 000         | No limit       |
| Cash and securities      | 5 000     | 5 000          | 10 000         |

### Data Requirements

| Data Element         | Source         | Required |
| -------------------- | -------------- | -------- |
| Sub-limit amounts    | Product config | Yes      |
| Declared items       | Customer input | No       |
| Declared item values | Customer input | No       |
| Additional premium   | Rating engine  | Cond.    |
| Coverage tier        | Customer input | Yes      |

### Regulatory

- **FSA-004** — Sub-limits must be clearly communicated; the customer must
  understand the maximum payout per category before binding
- **FSA-012** — Pre-contractual disclosure must include sub-limit amounts and the
  option to extend coverage via värdeföremålsdeklaration
- **IDD-012** — The gap between total contents sum insured and per-category
  sub-limits must be disclosed to prevent customer misunderstanding

---

## HUW-08: Define Risk Acceptance Criteria

**As an** underwriter (försäkringsgivare),
**I want** to define risk acceptance criteria (maximum building age, minimum
security requirements, flood zone exclusions),
**so that** risks that fall outside the company's appetite are declined or
referred for manual review.

### Acceptance Criteria

- **GIVEN** a property exceeds the maximum insurable building age without an
  approved inspection report
  **WHEN** the system evaluates the risk
  **THEN** the quote is declined with a message explaining that a
  besiktningsprotokoll is required for buildings over the age threshold

- **GIVEN** a property is located in the highest flood risk zone (as classified
  by MSB)
  **WHEN** the system evaluates the risk
  **THEN** the system either declines the quote or applies an exclusion for
  flood damage, depending on the configured risk acceptance rules for the zone

- **GIVEN** a property does not meet minimum security requirements for villa
  insurance (e.g., no functioning lock system)
  **WHEN** the system evaluates the risk
  **THEN** the system flags the property and requires the customer to confirm
  security measures before coverage is bound

- **GIVEN** the property's combined risk score (geographic, construction, claims
  history) exceeds the automatic acceptance threshold
  **WHEN** the system evaluates the risk
  **THEN** the case is routed to underwriter review (HUW-09) with a summary of
  the risk factors that triggered the referral

- **GIVEN** a risk is declined
  **WHEN** the system communicates the decision
  **THEN** the declination reason is recorded, the customer is informed in clear
  language, and the decision is logged for regulatory audit purposes

### Risk Acceptance Matrix

| Criterion                    | Auto-Accept     | Refer to UW     | Decline           |
| ---------------------------- | --------------- | --------------- | ----------------- |
| Building age                 | < 80 years      | 80–120 years    | > 120 (no report) |
| Flood zone (MSB)             | Low / moderate  | High            | Very high         |
| Claims (past 5 years)        | 0–2             | 3+              | —                 |
| Construction: trä > 80 years | —               | Always          | No inspection     |
| Combined risk score          | Below threshold | Above threshold | —                 |
| Missing property data        | —               | Always          | —                 |

### Data Requirements

| Data Element          | Source               | Required |
| --------------------- | -------------------- | -------- |
| Risk acceptance rules | Underwriting config  | Yes      |
| Building age          | Lantmäteriet / input | Yes      |
| Flood zone            | MSB                  | Yes      |
| Claims history        | Claims system        | Yes      |
| Security features     | Customer input       | Yes      |
| Combined risk score   | Rating engine        | Yes      |
| Declination reason    | System               | Cond.    |

### Regulatory

- **FSA-004** — Declination reasons must be communicated clearly to the customer
- **FSA-005** — Risk acceptance criteria must be applied consistently and fairly;
  non-discrimination rules apply
- **GDPR-007** — Risk assessment data (including geographic and property data)
  processed under Article 6(1)(f) legitimate interest; the customer has the
  right to understand the basis of automated decisions

---

## HUW-09: Escalate Borderline Cases for Manual Review

**As an** underwriter (försäkringsgivare),
**I want** borderline cases to be escalated for manual review,
**so that** complex or unusual risks receive expert assessment before a coverage
decision is made.

### Acceptance Criteria

- **GIVEN** the automatic risk assessment flags a property for manual review
  (per the criteria in HUW-08)
  **WHEN** the case enters the underwriter review queue
  **THEN** the queue item includes a summary of all risk factors: geographic
  risk zone, construction details, building age, claims history, security
  features, and the specific trigger that caused the referral

- **GIVEN** the underwriter reviews the case
  **WHEN** the underwriter makes a decision
  **THEN** the decision is one of: accept at standard terms, accept with
  conditions (increased deductible, coverage exclusions, required improvements),
  or decline with documented reason

- **GIVEN** the underwriter accepts the case with conditions
  **WHEN** the conditional offer is prepared
  **THEN** the system generates a quote with the conditions clearly stated, and
  the customer must explicitly accept the conditions before binding

- **GIVEN** the underwriter declines the risk
  **WHEN** the declination is recorded
  **THEN** the system notifies the customer with a clear explanation, logs the
  decision with the underwriter's rationale, and retains the record for
  regulatory audit

- **GIVEN** the underwriter review takes more than the SLA target (e.g., 2
  business days)
  **WHEN** the SLA is breached
  **THEN** the system escalates the case to a senior underwriter and notifies
  the customer that their quote is under review

### Data Requirements

| Data Element         | Source            | Required |
| -------------------- | ----------------- | -------- |
| Referral trigger     | Rating engine     | Yes      |
| Risk factor summary  | Rating engine     | Yes      |
| Underwriter decision | Underwriter input | Yes      |
| Conditions applied   | Underwriter input | Cond.    |
| Decision rationale   | Underwriter input | Yes      |
| SLA breach timestamp | System            | Cond.    |

### Regulatory

- **FSA-004** — Declination and conditional offer reasons must be communicated
  fairly and transparently
- **FSA-005** — Underwriter decisions must be consistent; similar risks must be
  treated similarly to prevent unfair discrimination
- **GDPR-007** — Automated risk scoring that triggers referral constitutes
  profiling; the customer has the right to human review of significant automated
  decisions per GDPR Article 22

---

## HUW-10: Calculate Premium Automatically for Standard Risks

**As the** system,
**I want** to calculate the premium automatically for standard risk profiles,
**so that** most quotes are issued instantly without manual intervention.

### Acceptance Criteria

- **GIVEN** a property passes all automatic acceptance criteria (HUW-08)
  **WHEN** the system calculates the premium
  **THEN** the premium is computed using all applicable rating factors:
  geographic zone, construction type, building age, security discounts, claims
  history, coverage tier, deductible level, and living area (m²)

- **GIVEN** the premium calculation is complete
  **WHEN** the quote is presented to the customer
  **THEN** a premium breakdown is displayed showing the contribution of each
  rating factor: base rate, geographic loading, construction factor, age factor,
  security discounts, claims loading, tier adjustment, and deductible adjustment

- **GIVEN** a standard risk profile
  **WHEN** the system processes the quote
  **THEN** the premium calculation completes within 3 seconds and the quote is
  available to the customer immediately

- **GIVEN** the rating factors are updated (e.g., new tariff version, updated
  risk zones)
  **WHEN** a new quote is requested
  **THEN** the system uses the tariff version effective on the requested policy
  start date

- **GIVEN** the premium calculation encounters an error (missing data,
  integration failure)
  **WHEN** the calculation cannot complete
  **THEN** the system logs the error, notifies the customer that the quote is
  being reviewed manually, and routes the case to the underwriting queue

### Rating Factor Summary

| Factor                  | Data Source                 | Impact      |
| ----------------------- | --------------------------- | ----------- |
| Geographic zone         | Address → risk zone mapping | High        |
| Flood risk              | SMHI / MSB flood maps       | High        |
| Crime rate              | BRÅ statistics by area      | Medium      |
| Construction material   | Lantmäteriet / input        | High        |
| Building age            | Lantmäteriet / input        | Medium      |
| Living area (m²)        | Customer input              | Medium      |
| Security: alarm         | Customer input              | Discount    |
| Security: water shutoff | Customer input              | Discount    |
| Security: sprinkler     | Customer input              | Discount    |
| Claims history (5 yr)   | Internal claims data        | Medium-High |
| Coverage tier           | Customer selection          | Structural  |
| Deductible level        | Customer selection          | Moderate    |
| BRF vs villa            | Product type                | Structural  |

### Data Requirements

| Data Element       | Source          | Required |
| ------------------ | --------------- | -------- |
| All rating factors | Various (above) | Yes      |
| Tariff version     | Rating engine   | Yes      |
| Policy start date  | Customer input  | Yes      |
| Calculated premium | Rating engine   | Yes      |
| Premium breakdown  | Rating engine   | Yes      |

### Regulatory

- **FSA-004** — Premium calculation must be transparent; the customer must be
  able to understand how the premium was derived
- **FSA-005** — Pricing must be fair and consistent; the same risk profile must
  produce the same premium
- **IDD-012** — Risk-based pricing transparency requires that the customer
  understands which factors affect their premium
- **GDPR-007** — Rating factor data processed under Article 6(1)(b) contract
  performance; the customer has the right to understand the logic of automated
  premium calculation

---

## HUW-11: Integrate with External Data Sources for Geographic Risk

**As the** system,
**I want** to integrate with SMHI, MSB, BRÅ, and Lantmäteriet for geographic
and property risk data,
**so that** risk assessments are based on current, authoritative data rather
than customer self-reporting alone.

### Acceptance Criteria

- **GIVEN** a property address is submitted
  **WHEN** the system initiates risk assessment
  **THEN** the system queries Lantmäteriet for property data (building type,
  construction year, size, construction material) and pre-populates the rating
  input

- **GIVEN** the property address is geocoded
  **WHEN** the system determines flood risk
  **THEN** it queries SMHI and MSB for the property's flood zone classification
  and applies the corresponding loading factor

- **GIVEN** the property address is geocoded
  **WHEN** the system determines crime risk
  **THEN** it queries BRÅ statistics for the property's area classification and
  applies the corresponding loading factor

- **GIVEN** an external data source is temporarily unavailable
  **WHEN** the system attempts to retrieve risk data
  **THEN** the system falls back to the most recently cached data (max age
  configurable, e.g., 30 days), logs the fallback event, and applies a
  conservative loading if the cache is stale

- **GIVEN** external data is refreshed on a scheduled basis
  **WHEN** the data refresh job runs
  **THEN** the system updates its local risk zone mappings with the latest data
  from each source and logs the update timestamp and data version

### External Integration Summary

| System       | Purpose                       | Data Frequency    |
| ------------ | ----------------------------- | ----------------- |
| SMHI         | Climate and flood risk data   | Updated quarterly |
| MSB          | Risk zone mapping, flood maps | Updated annually  |
| BRÅ          | Crime statistics by area      | Updated annually  |
| Lantmäteriet | Property data and registry    | Real-time lookup  |

### Data Requirements

| Data Element     | Source        | Required |
| ---------------- | ------------- | -------- |
| Property data    | Lantmäteriet  | Yes      |
| Flood zone class | SMHI / MSB    | Yes      |
| Crime rate zone  | BRÅ           | Yes      |
| Cache timestamp  | System        | Yes      |
| Data version     | External APIs | Yes      |
| Fallback flag    | System        | Cond.    |

### Regulatory

- **FSA-005** — Risk assessment must be based on reliable, current data;
  external authoritative sources ensure pricing accuracy and fairness
- **GDPR-007** — External data retrieved for risk assessment processed under
  Article 6(1)(f) legitimate interest; data minimization requires that only
  risk-relevant data is retrieved and stored
