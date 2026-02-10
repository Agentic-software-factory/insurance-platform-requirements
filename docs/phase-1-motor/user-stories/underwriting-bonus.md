---
sidebar_position: 3
---

# Underwriting Rules and Bonus System — User Stories

User stories for the motor insurance underwriting rules and bonus class system
(bonusklasser). These rules determine who gets insured, at what price, and under
what terms. The bonus class system is the primary mechanism for rewarding
claim-free driving with premium discounts.

## Overview

| ID     | Actor              | Summary                                         |
| ------ | ------------------ | ----------------------------------------------- |
| UWB-01 | Underwriter        | Manage bonus class table and progression rules  |
| UWB-02 | Private Customer   | Transfer bonus class from another insurer       |
| UWB-03 | System             | Calculate premium using rating factors          |
| UWB-04 | Underwriter        | Define risk acceptance and referral rules       |
| UWB-05 | Private Customer   | Understand premium calculation breakdown        |
| UWB-06 | Actuary            | Review documented underwriting rules            |
| UWB-07 | Compliance Officer | Verify non-discriminatory underwriting practice |

---

## UWB-01: Bonus Class Table and Progression Rules

**As an** underwriter (riskbedömare),
**I want** the system to maintain a complete bonus class table with progression
and regression rules,
**so that** all customers are rated consistently according to their claims-free
driving history.

### Acceptance Criteria

- **GIVEN** the bonus class system uses a scale from class 1 (no discount) to
  class 15 (maximum discount)
  **WHEN** the system loads the bonus table
  **THEN** each class has a defined discount percentage, with class 1 at 0%
  discount and class 15 at the maximum configured discount

- **GIVEN** a customer has been claim-free for a full policy year
  **WHEN** the huvudförfallodag (policy anniversary) is reached
  **THEN** the system advances the customer's bonus class by one step (e.g.,
  class 5 to class 6), up to the maximum class 15

- **GIVEN** a customer has one at-fault claim during the policy year
  **WHEN** the huvudförfallodag is reached
  **THEN** the system reduces the customer's bonus class by 3 steps (e.g.,
  class 10 to class 7), with a minimum of class 1

- **GIVEN** a customer has more than one at-fault claim during the policy year
  **WHEN** the huvudförfallodag is reached
  **THEN** the system reduces the customer's bonus class by 5 steps per
  additional claim, with a minimum of class 1

- **GIVEN** a new customer with no previous insurance history in Sweden
  **WHEN** the first policy is created
  **THEN** the system assigns the default starting bonus class (class 7, as
  defined by underwriting guidelines)

- **GIVEN** only at-fault claims affect the bonus class
  **WHEN** a claim is classified as not-at-fault (e.g., parked vehicle hit by
  third party)
  **THEN** the customer's bonus class is not reduced

### Bonus Class Table

| Class | Discount (%) | Years claim-free from class 1 |
| ----- | ------------ | ----------------------------- |
| 1     | 0            | 0                             |
| 2     | 5            | 1                             |
| 3     | 10           | 2                             |
| 4     | 15           | 3                             |
| 5     | 20           | 4                             |
| 6     | 25           | 5                             |
| 7     | 30           | 6 (default start)             |
| 8     | 35           | 7                             |
| 9     | 40           | 8                             |
| 10    | 45           | 9                             |
| 11    | 50           | 10                            |
| 12    | 55           | 11                            |
| 13    | 60           | 12                            |
| 14    | 65           | 13                            |
| 15    | 70           | 14                            |

### Data Requirements

| Data Element            | Source             | Required |
| ----------------------- | ------------------ | -------- |
| Bonus class table       | System config      | Yes      |
| Current bonus class     | Internal database  | Yes      |
| Claims history          | Internal database  | Yes      |
| At-fault classification | Claims system      | Yes      |
| Huvudförfallodag        | Policy data        | Yes      |
| Progression/regression  | Underwriting rules | Yes      |

### Regulatory

- **FSA-004** — Bonus rules must be transparent and consistently applied for
  fair treatment of all customers
- **FSA-005** — Bonus class system is part of the product governance framework;
  rules must be reviewed annually
- **IDD-004** — Pricing logic including bonus must align with target market
  definitions
- **GDPR-001** — Claims history and bonus class are personal data; processing
  based on Article 6(1)(b) contract performance

---

## UWB-02: Transfer Bonus Class from Another Insurer

**As a** private customer (privatkund),
**I want to** transfer my bonus class when switching from another insurer,
**so that** I retain my no-claims discount and do not pay a higher premium.

### Acceptance Criteria

- **GIVEN** the customer indicates they have an existing bonus class from
  another Swedish insurer
  **WHEN** the customer provides the previous insurer's name and claimed bonus
  class
  **THEN** the system records the claimed bonus class as provisional, pending
  verification

- **GIVEN** a provisional bonus class has been recorded
  **WHEN** the system processes the transfer
  **THEN** the system requests verification from the previous insurer via TFF
  (Trafikförsäkringsföreningen) or direct inquiry

- **GIVEN** the previous insurer confirms the bonus class
  **WHEN** the verification response is received
  **THEN** the system updates the customer's bonus class from provisional to
  confirmed, and recalculates the premium if the verified class differs from
  the claimed class

- **GIVEN** the previous insurer does not respond within 30 days
  **WHEN** the verification deadline expires
  **THEN** the system alerts an underwriter for manual review, and the
  provisional bonus class remains in effect until resolved

- **GIVEN** the customer is transferring from an EU/EEA insurer (not Swedish)
  **WHEN** the customer provides documentation of their claims-free history
  **THEN** the system allows the underwriter to manually assign an equivalent
  Swedish bonus class based on the documented history, subject to underwriting
  guidelines

- **GIVEN** the verified bonus class differs from the claimed bonus class
  **WHEN** the verification is completed
  **THEN** the system adjusts the premium accordingly and notifies the customer
  of the change; any premium difference is collected or refunded

### Data Requirements

| Data Element             | Source                 | Required |
| ------------------------ | ---------------------- | -------- |
| Claimed bonus class      | Customer input         | Yes      |
| Previous insurer name    | Customer input         | Yes      |
| Verification request     | TFF / previous insurer | Yes      |
| Verification response    | TFF / previous insurer | Yes      |
| Supporting documentation | Customer upload        | No       |
| Adjusted bonus class     | System / underwriter   | Yes      |

### External Integrations

- **TFF** — Bonus class transfer verification between Swedish insurers
- **Previous insurer** — Direct inquiry for EU/EEA transfers

### Regulatory

- **FSA-004** — Fair treatment requires honoring legitimate bonus class
  transfers; customers must not be penalized for switching insurers
- **GDPR-001** — Transfer data includes personal data (claims history);
  processing based on Article 6(1)(b) pre-contractual steps
- **GDPR-003** — Claims history from previous insurer constitutes personal data;
  data minimization applies — request only the bonus class, not full claim
  details
- **IDD-004** — Transfer rules must be documented as part of product governance

---

## UWB-03: Calculate Premium Using Rating Factors

**As the** system,
**I want to** calculate the motor insurance premium by applying all applicable
rating factors to the base premium,
**so that** each customer receives a risk-adjusted price that reflects their
individual risk profile.

### Acceptance Criteria

- **GIVEN** the system has the customer's vehicle and personal data
  **WHEN** a premium calculation is triggered
  **THEN** the system applies all rating factors in the following order:
  1. Determine the base premium by coverage tier (trafik/halv/hel)
  2. Apply vehicle factors (make, model, year, safety rating, theft risk,
     repair cost group)
  3. Apply customer factors (age, postal code, occupation)
  4. Apply usage factors (annual mileage band, parking type, vehicle usage)
  5. Apply the bonus class discount
  6. Apply the deductible (självrisk) adjustment
  7. Enforce minimum and maximum premium limits

- **GIVEN** the customer's age is between 18 and 25
  **WHEN** the age factor is applied
  **THEN** a young driver surcharge is added, as defined in the rating factor
  table

- **GIVEN** the customer's postal code maps to a risk zone
  **WHEN** the location factor is applied
  **THEN** the system applies the risk zone multiplier for that postal code

- **GIVEN** the vehicle's make and model are in the vehicle risk classification
  table
  **WHEN** the vehicle factor is applied
  **THEN** the system applies the combined multiplier for safety rating, theft
  risk index, and repair cost group

- **GIVEN** the customer has selected a deductible (självrisk) amount
  **WHEN** the deductible adjustment is applied
  **THEN** a higher deductible reduces the premium and a lower deductible
  increases it, according to the deductible factor table

- **GIVEN** all rating factors have been applied
  **WHEN** the final premium is calculated
  **THEN** the premium is not below the configured minimum premium and not
  above the configured maximum premium for the coverage tier

### Rating Factor Catalog

| Factor         | Values / Bands                                       | Impact     |
| -------------- | ---------------------------------------------------- | ---------- |
| Coverage tier  | Trafik / Halv / Hel                                  | Base rate  |
| Vehicle group  | Make, model, year → risk classification group (1–50) | Multiplier |
| Safety rating  | Euro NCAP or equivalent (1–5 stars)                  | Multiplier |
| Theft risk     | Theft risk index per vehicle model (low/medium/high) | Multiplier |
| Repair cost    | Repair cost group (1–20)                             | Multiplier |
| Age            | 18–25, 26–65, 66+                                    | Multiplier |
| Postal code    | Risk zone (1–5 based on claim frequency by area)     | Multiplier |
| Annual mileage | 0–1000, 1001–1500, 1501–2000, 2001+ mil              | Multiplier |
| Parking        | Garage, carport, street, other                       | Multiplier |
| Vehicle usage  | Private, commute, business                           | Multiplier |
| Occupation     | Occupation group (risk-correlated grouping)          | Multiplier |
| Bonus class    | Class 1–15 → discount 0%–70%                         | Discount   |
| Deductible     | 1 500, 3 000, 5 000, 7 500, 10 000 SEK               | Adjustment |

### Data Requirements

| Data Element            | Source             | Required |
| ----------------------- | ------------------ | -------- |
| Base premium per tier   | Rating engine      | Yes      |
| Vehicle risk group      | Vehicle registry   | Yes      |
| Safety rating           | Euro NCAP database | Yes      |
| Theft risk index        | Industry data      | Yes      |
| Repair cost group       | Industry data      | Yes      |
| Customer age            | Personnummer       | Yes      |
| Postal code             | Customer input     | Yes      |
| Annual mileage estimate | Customer input     | Yes      |
| Parking type            | Customer input     | Yes      |
| Vehicle usage           | Customer input     | Yes      |
| Occupation              | Customer input     | No       |
| Bonus class             | Internal database  | Yes      |
| Selected deductible     | Customer input     | Yes      |

### External Integrations

- **Transportstyrelsen** — Vehicle data for risk classification
- **Euro NCAP** — Safety rating lookup (may be cached locally)

### Regulatory

- **FSA-004** — Rating factors must be transparent and non-discriminatory; the
  premium calculation must support fair treatment
- **FSA-005** — Rating factor definitions are part of the product governance
  framework; factors must be reviewed annually for continued relevance
- **IDD-004** — Premium calculation logic must align with target market
  definitions for each coverage tier
- **GDPR-001** — Rating factor data (age, postal code, occupation) is personal
  data; processing based on Article 6(1)(b) pre-contractual steps
- **FSA-012** — The premium calculation method must be disclosed to the customer
  upon request

---

## UWB-04: Risk Acceptance and Referral Rules

**As an** underwriter (riskbedömare),
**I want** the system to apply risk acceptance, referral, and decline rules
automatically,
**so that** high-risk applications are flagged for manual review and
unacceptable risks are declined consistently.

### Acceptance Criteria

- **GIVEN** a quote request meets all standard acceptance criteria
  **WHEN** the system evaluates the risk
  **THEN** the quote is approved automatically and proceeds to premium
  calculation without manual intervention

- **GIVEN** a quote request triggers one or more referral rules
  **WHEN** the system evaluates the risk
  **THEN** the quote is placed in a referral queue with the triggered rule(s)
  listed, and an underwriter is notified for manual review

- **GIVEN** a quote request triggers a decline rule
  **WHEN** the system evaluates the risk
  **THEN** the quote is declined automatically with a clear reason provided to
  the customer, and the decline is logged for reporting

- **GIVEN** the vehicle is a modified vehicle (e.g., engine tuning, body
  modifications)
  **WHEN** the system evaluates the risk
  **THEN** the application is referred to an underwriter for manual assessment

- **GIVEN** the vehicle is an imported vehicle not yet in the Swedish vehicle
  registry
  **WHEN** the system evaluates the risk
  **THEN** the application is referred to an underwriter, pending
  Transportstyrelsen registration

- **GIVEN** the vehicle is classified as a classic car (30+ years old)
  **WHEN** the system evaluates the risk
  **THEN** the application is referred to an underwriter for specialized
  classic car assessment, including agreed value evaluation

- **GIVEN** the customer has 3 or more at-fault claims in the last 3 years
  **WHEN** the system evaluates the risk
  **THEN** the application is referred to an underwriter for portfolio risk
  assessment

### Risk Acceptance Matrix

| Criteria                                | Action  | Notes                           |
| --------------------------------------- | ------- | ------------------------------- |
| Standard vehicle, driver 26–65          | Accept  | Automatic approval              |
| Young driver (18–25)                    | Accept  | Surcharge applied automatically |
| Senior driver (66+)                     | Accept  | Standard rates apply            |
| Modified vehicle                        | Refer   | Underwriter assesses risk       |
| Imported vehicle (not yet registered)   | Refer   | Pending Transportstyrelsen      |
| Classic car (30+ years)                 | Refer   | Agreed value assessment         |
| 3+ at-fault claims in 3 years           | Refer   | Portfolio risk review           |
| Customer previously declined by insurer | Refer   | Review decline history          |
| Vehicle used for racing or competition  | Decline | Outside product scope           |
| Vehicle without valid registration      | Decline | Cannot insure unregistered      |
| Customer under 18 years of age          | Decline | Legal minimum age requirement   |

### Data Requirements

| Data Element            | Source             | Required |
| ----------------------- | ------------------ | -------- |
| Vehicle type/category   | Transportstyrelsen | Yes      |
| Vehicle modifications   | Customer input     | Yes      |
| Vehicle age             | Transportstyrelsen | Yes      |
| Customer age            | Personnummer       | Yes      |
| Claims history (3 yr)   | Internal database  | Yes      |
| Previous decline record | Internal database  | No       |
| Vehicle usage           | Customer input     | Yes      |

### Regulatory

- **FSA-004** — Decline decisions must be communicated clearly and fairly;
  customers must be informed of the reason for decline
- **FSA-005** — Risk acceptance rules are part of the product governance
  framework; referral and decline criteria must be reviewed annually
- **FSA-007** — Trafikförsäkring must be offered to all vehicle owners; decline
  of trafikförsäkring is only permitted in exceptional circumstances defined by
  law
- **IDD-004** — Risk acceptance criteria must be consistent with target market
  definitions; products must not be sold outside their intended market
- **GDPR-001** — Risk assessment uses personal data; processing based on Article
  6(1)(b) pre-contractual steps

---

## UWB-05: Premium Calculation Transparency

**As a** private customer (privatkund),
**I want to** see a breakdown of how my premium is calculated,
**so that** I understand what factors influence my price and trust that the
pricing is fair.

### Acceptance Criteria

- **GIVEN** the system has calculated a premium for the customer
  **WHEN** the customer views the quote
  **THEN** the system displays a summary showing: base premium, bonus class
  discount applied, and total premium

- **GIVEN** the customer requests a detailed breakdown
  **WHEN** the detailed view is opened
  **THEN** the system shows each rating factor applied, including:
  - Vehicle group and its impact
  - Age band and any surcharge
  - Risk zone (postal code area)
  - Annual mileage band
  - Parking type
  - Deductible (självrisk) adjustment
  - Bonus class and discount percentage

- **GIVEN** the customer's bonus class has changed since the last quote or
  renewal
  **WHEN** the premium breakdown is displayed
  **THEN** the system highlights the bonus class change and its impact on the
  premium

- **GIVEN** the customer changes a configurable factor (deductible, mileage
  band, or add-ons)
  **WHEN** the change is applied
  **THEN** the premium is recalculated in real time and the updated breakdown
  is displayed

### Data Requirements

| Data Element              | Source        | Required |
| ------------------------- | ------------- | -------- |
| Premium breakdown         | Rating engine | Yes      |
| Factor descriptions       | System config | Yes      |
| Bonus class history       | Internal DB   | No       |
| Previous premium (if any) | Policy data   | No       |

### Regulatory

- **FSA-004** — Fair treatment requires pricing transparency; customers must be
  able to understand the basis for their premium
- **FSA-012** — Premium calculation basis must be disclosed as part of
  pre-contractual information obligations
- **IDD-001** — Premium transparency supports informed decision-making following
  the demands-and-needs assessment
- **GDPR-001** — The customer has the right to understand how their personal
  data (age, location, claims history) influences their premium

---

## UWB-06: Documented Underwriting Rules for Actuarial Review

**As an** actuary (aktuarie),
**I want** all underwriting rules to be formally documented and version
controlled,
**so that** I can validate the rules against our pricing models and ensure
actuarial soundness.

### Acceptance Criteria

- **GIVEN** the underwriting rules include the bonus class table, rating factor
  definitions, and risk acceptance criteria
  **WHEN** the actuary reviews the documentation
  **THEN** each rule has a unique identifier, effective date, approval record,
  and version number

- **GIVEN** a change is proposed to any underwriting rule (bonus table, rating
  factor, acceptance criteria)
  **WHEN** the change is submitted
  **THEN** it requires approval from both the underwriting manager and the
  actuarial team before taking effect

- **GIVEN** a rule change has been approved and implemented
  **WHEN** the new version takes effect
  **THEN** the system retains the previous version for audit purposes and
  records the effective date range of each version

- **GIVEN** the actuary needs to compare actual claims experience against
  expected outcomes
  **WHEN** the actuary requests performance data
  **THEN** the system provides claims ratios, frequency, and severity data
  segmented by the rating factors defined in the underwriting rules

### Data Requirements

| Data Element           | Source             | Required |
| ---------------------- | ------------------ | -------- |
| Rule definitions       | Underwriting rules | Yes      |
| Rule version history   | System config      | Yes      |
| Approval records       | Workflow system    | Yes      |
| Claims performance     | Claims database    | Yes      |
| Rating factor segments | Rating engine      | Yes      |

### Regulatory

- **FSA-005** — Product governance requires documented, reviewed underwriting
  rules with formal change control
- **FSA-006** — Supervisory reporting requires access to current and historical
  underwriting rules
- **IDD-004** — Product oversight requires that pricing rules are documented and
  aligned with target market definitions

---

## UWB-07: Non-Discriminatory Underwriting Verification

**As a** compliance officer (complianceansvarig),
**I want** underwriting rules to be verified as non-discriminatory and
transparent,
**so that** TryggFörsäkring meets FSA consumer protection standards and
avoids unfair pricing practices.

### Acceptance Criteria

- **GIVEN** the underwriting rules include all rating factors
  **WHEN** the compliance officer reviews the rules
  **THEN** no rating factor is based on a protected characteristic (gender,
  ethnicity, religion, sexual orientation, disability) as prohibited by
  Swedish discrimination law (Diskrimineringslagen, 2008:567)

- **GIVEN** the rating factor "age" is used
  **WHEN** the compliance officer reviews the factor
  **THEN** the age factor is justified by actuarial evidence showing a
  statistically significant correlation with claims frequency or severity

- **GIVEN** the rating factor "postal code" is used
  **WHEN** the compliance officer reviews the factor
  **THEN** the factor is based on area-level claims statistics and does not
  serve as a proxy for ethnicity or socioeconomic discrimination

- **GIVEN** a customer disputes their premium as unfair
  **WHEN** the complaint is investigated
  **THEN** the compliance team can produce the full rating factor breakdown and
  the actuarial justification for each factor applied

- **GIVEN** the annual product governance review is conducted
  **WHEN** the compliance officer participates in the review
  **THEN** the review includes an assessment of whether any rating factor has
  a disproportionate impact on a protected group

### Data Requirements

| Data Element              | Source             | Required |
| ------------------------- | ------------------ | -------- |
| Rating factor definitions | Underwriting rules | Yes      |
| Actuarial justifications  | Actuarial reports  | Yes      |
| Complaint records         | Complaints system  | No       |
| Product review reports    | Governance records | Yes      |
| Discrimination law ref    | Legal/compliance   | Yes      |

### Regulatory

- **FSA-004** — Consumer protection requires non-discriminatory pricing; fair
  treatment of all customer groups
- **FSA-005** — Product governance must include assessment of fairness and
  non-discrimination in rating factors
- **IDD-004** — Product oversight must ensure that pricing does not exclude or
  disadvantage customers outside the intended risk segmentation
- **GDPR-001** — Automated decision-making using personal data for pricing must
  comply with GDPR Article 22 (right not to be subject to purely automated
  decisions with legal effects); customers can request human review

---

## Coverage Tier Definitions

The following coverage tiers are available for motor insurance at
TryggFörsäkring. Each tier builds on the one below it.

### Trafikförsäkring (Mandatory Third-Party Liability)

- **Scope:** Legally required under Trafikskadelagen (1975:1410)
- **Covers:** Personal injury to all parties (driver, passengers, pedestrians,
  cyclists); property damage to third parties
- **Does not cover:** Damage to the policyholder's own vehicle
- **Deductible:** Not applicable (no own-damage coverage)
- **Regulatory:** FSA-007

### Halvförsäkring (Partial Comprehensive — Tier 2)

- **Scope:** Voluntary coverage that includes trafikförsäkring plus additional
  protections
- **Covers:** Everything in trafikförsäkring, plus: fire damage, theft, glass
  damage, rescue and roadside assistance (vägassistans), legal expenses
  (rättsskydd), engine breakdown
- **Does not cover:** Collision damage to the policyholder's own vehicle
- **Deductible options:** 1 500, 3 000, 5 000 SEK (standard options)
- **Typical add-ons:** Rental car coverage, personal belongings in vehicle

### Helförsäkring (Full Comprehensive — Tier 3)

- **Scope:** Full coverage that includes trafikförsäkring, halvförsäkring, plus
  own-damage collision coverage
- **Covers:** Everything in halvförsäkring, plus: collision damage
  (vagnskadeförsäkring) to the policyholder's own vehicle regardless of fault
- **Deductible options:** 1 500, 3 000, 5 000, 7 500, 10 000 SEK
- **Typical add-ons:** Rental car coverage, personal belongings, diminished
  value coverage, new car replacement (within first year)

---

## Data Model

The following data entities are central to the underwriting and bonus system.

### Bonus Class Record

| Attribute             | Type    | Description                            |
| --------------------- | ------- | -------------------------------------- |
| Customer personnummer | String  | Policyholder identity                  |
| Current bonus class   | Integer | Current class (1–15)                   |
| Effective date        | Date    | Date current class took effect         |
| Source                | Enum    | Calculated / Transferred / Manual      |
| Verification status   | Enum    | Confirmed / Provisional / Pending      |
| Previous insurer      | String  | If transferred (nullable)              |
| Claims in period      | Integer | At-fault claims since last anniversary |
| Last progression date | Date    | Date of last bonus class change        |

### Rating Factor Configuration

| Attribute           | Type    | Description                                |
| ------------------- | ------- | ------------------------------------------ |
| Factor ID           | String  | Unique identifier (e.g., RF-AGE, RF-ZONE)  |
| Factor name         | String  | Human-readable name                        |
| Factor type         | Enum    | Multiplier / Discount / Adjustment         |
| Value ranges        | JSON    | Defined bands or categories with values    |
| Effective date      | Date    | When this configuration took effect        |
| Version             | Integer | Configuration version number               |
| Approved by         | String  | Approver identity                          |
| Actuarial reference | String  | Link to actuarial justification (nullable) |

### Risk Assessment

| Attribute        | Type     | Description                                   |
| ---------------- | -------- | --------------------------------------------- |
| Assessment ID    | String   | Unique identifier                             |
| Quote ID         | String   | Link to the quote being assessed              |
| Decision         | Enum     | Accept / Refer / Decline                      |
| Triggered rules  | List     | List of risk rules triggered                  |
| Referral reason  | Text     | Reason for referral (nullable)                |
| Decline reason   | Text     | Reason for decline (nullable)                 |
| Underwriter ID   | String   | Assigned underwriter for referrals (nullable) |
| Review outcome   | Enum     | Approved / Declined / Pending (nullable)      |
| Review timestamp | DateTime | When the underwriter completed review         |

---

## Regulatory Traceability Matrix

| Requirement | UWB-01 | UWB-02 | UWB-03 | UWB-04 | UWB-05 | UWB-06 | UWB-07 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-004     | X      | X      | X      | X      | X      |        | X      |
| FSA-005     | X      |        | X      | X      |        | X      | X      |
| FSA-006     |        |        |        |        |        | X      |        |
| FSA-007     |        |        |        | X      |        |        |        |
| FSA-012     |        |        | X      |        | X      |        |        |
| GDPR-001    | X      | X      | X      | X      | X      |        | X      |
| GDPR-003    |        | X      |        |        |        |        |        |
| IDD-001     |        |        |        |        | X      |        |        |
| IDD-004     | X      | X      | X      | X      |        | X      | X      |

---

## External System Integration Summary

| System             | Integration Point                    | Stories        |
| ------------------ | ------------------------------------ | -------------- |
| TFF                | Bonus class transfer verification    | UWB-02         |
| Transportstyrelsen | Vehicle data for risk classification | UWB-03, UWB-04 |
| Euro NCAP          | Vehicle safety rating lookup         | UWB-03         |
| Previous insurer   | EU/EEA bonus transfer documentation  | UWB-02         |
