---
sidebar_position: 4
---

# Home Renewals — User Stories

User stories for annual renewal (förnyelse) of home and property insurance
policies. Covers renewal notice generation, index adjustment of building and
contents sums insured, premium recalculation, coverage modification at renewal,
opt-out of automatic renewal, year-over-year comparison, agent-assisted
modifications, underwriter review of flagged renewals, and demands-and-needs
reassessment.

## Overview

| ID     | Actor                  | Summary                                                                 |
| ------ | ---------------------- | ----------------------------------------------------------------------- |
| HRN-01 | Customer               | Receive a renewal notice showing changes in premium and coverage        |
| HRN-02 | Customer               | View year-over-year comparison of coverage and premium                  |
| HRN-03 | Customer               | Modify coverage at renewal (upgrade/downgrade tier, add/remove add-ons) |
| HRN-04 | Customer               | Opt out of automatic renewal before the deadline                        |
| HRN-05 | System                 | Recalculate building sum insured using byggkostnadsindex                |
| HRN-06 | System                 | Recalculate contents sum insured using konsumentprisindex               |
| HRN-07 | System                 | Apply premium adjustments based on claims history and risk changes      |
| HRN-08 | Customer Service Agent | Process renewal modifications for phone customers                       |
| HRN-09 | Underwriter            | Review renewals flagged for significant risk changes                    |
| HRN-10 | System                 | Generate and send renewal notice 30 days before huvudförfallodag        |

---

## HRN-01: Receive Renewal Notice

**As a** customer (privatkund),
**I want to** receive a clear renewal notice showing what has changed (premium,
coverage, index adjustments),
**so that** I can review the new terms before my policy automatically renews.

### Acceptance Criteria

- **GIVEN** my home insurance policy's huvudförfallodag is approaching
  **WHEN** the renewal notice is dispatched (at least 30 days before renewal)
  **THEN** I receive the notice via my preferred channel (postal letter, digital
  mailbox, or Mina Sidor) showing: current premium, new premium, premium change
  amount and percentage, coverage tier, sums insured (building and contents),
  index adjustments applied, and the huvudförfallodag

- **GIVEN** the renewal notice includes a premium change
  **WHEN** I review the notice
  **THEN** each contributing factor is listed separately: index adjustment of
  building sum, index adjustment of contents sum, claims history impact, area
  risk zone changes, and any tariff adjustments

- **GIVEN** the renewal notice has been sent
  **WHEN** the system records the delivery
  **THEN** it logs the sent date, delivery channel, content version, and
  delivery confirmation status

- **GIVEN** the renewal notice cannot be delivered (returned post, bounced
  email)
  **WHEN** the delivery failure is detected
  **THEN** the system retries via an alternative channel and alerts operations
  staff if all channels fail

- **GIVEN** the renewal notice has been sent
  **WHEN** the customer reads it
  **THEN** the notice clearly states the customer's right to cancel before the
  huvudförfallodag without penalty and explains how to do so

### Data Requirements

| Data Element               | Source               | Required |
| -------------------------- | -------------------- | -------- |
| Policy number              | Policy record        | Yes      |
| Policyholder name          | Policy record        | Yes      |
| Property address           | Policy record        | Yes      |
| Coverage tier              | Policy record        | Yes      |
| Current annual premium     | Policy record        | Yes      |
| New annual premium         | Renewal calculation  | Yes      |
| Building sum insured (old) | Policy record        | Yes      |
| Building sum insured (new) | Index calculation    | Yes      |
| Contents sum insured (old) | Policy record        | Yes      |
| Contents sum insured (new) | Index calculation    | Yes      |
| Index adjustment details   | SCB/index provider   | Yes      |
| Claims history summary     | Claims system        | Yes      |
| Huvudförfallodag           | Policy record        | Yes      |
| Delivery channel           | Customer preferences | Yes      |

### Regulatory

- **FSA-003** — Renewal notice must be sent at least 30 days before
  huvudförfallodag, per Försäkringsavtalslagen
- **FSA-004** — Renewal notices must use clear, transparent language and present
  terms fairly
- **FSA-016** — Index adjustment amounts and methodology must be transparently
  disclosed
- **GDPR-007** — Customer contact data processed for renewal notice delivery;
  legal basis is Article 6(1)(b) contract performance
- **IDD-011** — Demands-and-needs review may be triggered at renewal if
  significant changes occur

---

## HRN-02: View Year-over-Year Comparison

**As a** customer (privatkund),
**I want to** see a comparison of this year's coverage and premium versus last
year's,
**so that** I understand exactly what has changed and can make an informed
decision about renewing.

### Acceptance Criteria

- **GIVEN** the customer receives a renewal notice or logs into Mina Sidor
  **WHEN** the customer views the renewal details
  **THEN** the system displays a side-by-side comparison showing: previous and
  new annual premium, previous and new building sum insured, previous and new
  contents sum insured, previous and new coverage tier, add-ons (allrisk/drulle,
  ID-skydd, etc.), and deductible (självrisk)

- **GIVEN** the comparison shows a change in sums insured
  **WHEN** the customer views the building or contents sum
  **THEN** the system shows: previous sum, index adjustment percentage, index
  adjustment amount (SEK), and resulting new sum

- **GIVEN** the comparison shows a premium change
  **WHEN** the customer views the premium breakdown
  **THEN** each factor contributing to the change is displayed with its
  approximate SEK impact: index-driven change, claims history impact, area risk
  zone adjustment, and tariff changes

- **GIVEN** the customer wants to understand the index adjustments
  **WHEN** the customer views the explanation
  **THEN** the system displays the applicable index name (byggkostnadsindex or
  konsumentprisindex), the percentage change from the prior year, and how it
  affects the sums insured

### Data Requirements

| Data Element                | Source              | Required |
| --------------------------- | ------------------- | -------- |
| Previous policy terms       | Policy record       | Yes      |
| New renewal terms           | Renewal calculation | Yes      |
| Index adjustment breakdown  | SCB/index provider  | Yes      |
| Premium factor breakdown    | Rating engine       | Yes      |
| Claims during expiring term | Claims system       | Yes      |

### Regulatory

- **FSA-004** — Year-over-year comparison must be transparent so the customer
  can make an informed renewal decision
- **FSA-016** — Index adjustment methodology and impact must be disclosed
- **IDD-011** — Comparison supports the customer's ability to assess whether
  coverage still meets their demands and needs

---

## HRN-03: Modify Coverage at Renewal

**As a** customer (privatkund),
**I want to** modify my coverage at renewal (upgrade or downgrade tier, add or
remove allrisk/drulle and other add-ons),
**so that** my policy stays relevant to my current living situation and needs.

### Acceptance Criteria

- **GIVEN** the customer has received a renewal notice
  **WHEN** the customer requests a coverage modification before the
  huvudförfallodag
  **THEN** the system allows the customer to change: coverage tier
  (bas/standard/premium), add-ons (allrisk/drulle, ID-skydd, bostadsrättstillägg),
  deductible level (självrisk), and contents sum insured

- **GIVEN** the customer selects a new coverage configuration
  **WHEN** the modification is submitted
  **THEN** the system recalculates the renewal premium based on the modified
  terms and displays the updated premium before the customer confirms

- **GIVEN** the customer confirms the coverage modification
  **WHEN** the modification is recorded
  **THEN** the system updates the renewal record with the new terms, regenerates
  the renewal confirmation, and applies the changes effective from the
  huvudförfallodag

- **GIVEN** the customer requests a modification after the huvudförfallodag
  **WHEN** the request is submitted
  **THEN** the system informs the customer that the policy has already renewed
  and the modification will be processed as a mid-term endorsement instead

- **GIVEN** the modification results in a coverage downgrade
  **WHEN** the customer confirms the downgrade
  **THEN** the system displays a clear warning about the reduced coverage scope
  and obtains explicit confirmation

### Data Requirements

| Data Element                | Source                    | Required |
| --------------------------- | ------------------------- | -------- |
| Current coverage tier       | Policy record             | Yes      |
| Requested coverage tier     | Customer input            | Yes      |
| Current add-ons             | Policy record             | Yes      |
| Requested add-on changes    | Customer input            | Yes      |
| Current deductible level    | Policy record             | Yes      |
| Requested deductible        | Customer input            | No       |
| Recalculated premium        | Rating engine             | Yes      |
| Modification effective date | System (huvudförfallodag) | Yes      |

### Regulatory

- **FSA-004** — Coverage modifications must be clearly explained so the customer
  understands the impact
- **FSA-012** — Modified coverage terms must be disclosed via updated policy
  documentation
- **IDD-011** — Coverage modification at renewal constitutes a new
  demands-and-needs assessment; the system must verify the new configuration
  meets the customer's stated needs
- **GDPR-007** — Modification records processed under Article 6(1)(b) contract
  performance

---

## HRN-04: Opt Out of Automatic Renewal

**As a** customer (privatkund),
**I want to** opt out of automatic renewal before the deadline,
**so that** I can switch to another insurer or let the policy lapse.

### Acceptance Criteria

- **GIVEN** the customer has received a renewal notice
  **WHEN** the customer submits a cancellation request before the
  huvudförfallodag
  **THEN** the system records the cancellation effective on the huvudförfallodag
  and confirms the cancellation to the customer

- **GIVEN** the customer cancels before the huvudförfallodag
  **WHEN** the huvudförfallodag arrives
  **THEN** the policy ends on the huvudförfallodag, automatic renewal does not
  proceed, and the customer receives a cancellation confirmation

- **GIVEN** the customer cancels the policy
  **WHEN** the cancellation is processed
  **THEN** the system sends a confirmation including: the policy end date, a
  reminder to arrange replacement coverage for the property, and information
  about any cooling-off rights for the new policy

- **GIVEN** the customer attempts to cancel after the huvudförfallodag
  **WHEN** the cancellation request is submitted
  **THEN** the system informs the customer that the policy has already renewed
  and they must follow the mid-term cancellation process instead

- **GIVEN** a competitor insurer sends a flyttanmälan for the customer
  **WHEN** the system receives the request before the huvudförfallodag
  **THEN** the system processes the cancellation effective on the
  huvudförfallodag and suppresses automatic renewal

### Data Requirements

| Data Element              | Source                    | Required |
| ------------------------- | ------------------------- | -------- |
| Cancellation request date | Customer input            | Yes      |
| Requested effective date  | System (huvudförfallodag) | Yes      |
| Cancellation reason       | Customer input            | No       |
| Channel                   | System                    | Yes      |
| Confirmation sent date    | System                    | Yes      |
| Flyttanmälan reference    | Competitor insurer        | No       |

### Regulatory

- **FSA-003** — Cancellation at huvudförfallodag is a customer right under
  Försäkringsavtalslagen; no penalty applies
- **FSA-004** — Cancellation process must be clear and accessible
- **GDPR-007** — Cancellation records processed under Article 6(1)(b) contract
  performance

---

## HRN-05: Recalculate Building Sum Insured Using Byggkostnadsindex

**As the** system,
**I want to** automatically recalculate the building sum insured (byggnadssumma)
using byggkostnadsindex (construction cost index),
**so that** coverage keeps pace with rising construction costs and the customer
is not underinsured at renewal.

### Acceptance Criteria

- **GIVEN** a home insurance policy with a building component
  (villahemförsäkring or fritidshusförsäkring) approaches renewal
  **WHEN** the renewal batch process runs (T-60 days)
  **THEN** the system retrieves the current byggkostnadsindex from SCB
  (Statistiska Centralbyrån) and calculates the new building sum insured

- **GIVEN** the byggkostnadsindex has changed since the last renewal
  **WHEN** the new building sum is calculated
  **THEN** the system applies the formula:
  New Building Sum = Previous Building Sum x (Current Index / Previous Index)

- **GIVEN** the building sum adjustment is calculated
  **WHEN** the renewal record is updated
  **THEN** the system stores: previous building sum, previous index value,
  current index value, index change percentage, and new building sum

- **GIVEN** the index adjustment results in a significant increase (>10% year
  over year)
  **WHEN** the renewal is processed
  **THEN** the system flags the renewal for underwriter review before the
  renewal notice is sent

- **GIVEN** a hemförsäkring (contents-only) policy approaches renewal
  **WHEN** the renewal batch process runs
  **THEN** no building sum adjustment is applied (building coverage belongs to
  the property owner or BRF)

### Index Adjustment Formula

```text
New Building Sum = Previous Building Sum x (Current Byggkostnadsindex / Previous Byggkostnadsindex)
```

### Data Requirements

| Data Element                  | Source         | Required    |
| ----------------------------- | -------------- | ----------- |
| Previous building sum insured | Policy record  | Yes         |
| Previous byggkostnadsindex    | Renewal record | Yes         |
| Current byggkostnadsindex     | SCB            | Yes         |
| Index change percentage       | Calculated     | Yes         |
| New building sum insured      | Calculated     | Yes         |
| Policy type                   | Policy record  | Yes         |
| Review flag                   | System         | Conditional |

### External Integrations

- **SCB (Statistiska Centralbyrån)** — Source for byggkostnadsindex data

### Regulatory

- **FSA-016** — Index adjustment methodology must be transparent; the customer
  must be informed of how the building sum was recalculated
- **FSA-004** — The index adjustment and its impact on the premium must be
  communicated clearly
- **FSA-005** — Building sum must be adequate to cover full reinstatement;
  index adjustment is a consumer protection measure
- **GDPR-007** — Property valuation data processed under Article 6(1)(b)
  contract performance

---

## HRN-06: Recalculate Contents Sum Insured Using Konsumentprisindex

**As the** system,
**I want to** adjust the contents sum insured (lösöresbelopp) using
konsumentprisindex (KPI / consumer price index),
**so that** the contents coverage reflects current replacement costs and the
customer is not underinsured.

### Acceptance Criteria

- **GIVEN** a home insurance policy with contents coverage approaches renewal
  **WHEN** the renewal batch process runs (T-60 days)
  **THEN** the system retrieves the current konsumentprisindex from SCB and
  calculates the adjusted contents sum insured

- **GIVEN** the konsumentprisindex has changed since the last renewal
  **WHEN** the new contents sum is calculated
  **THEN** the system applies the formula:
  New Contents Sum = Previous Contents Sum x (Current KPI / Previous KPI)

- **GIVEN** the contents sum adjustment is calculated
  **WHEN** the renewal record is updated
  **THEN** the system stores: previous contents sum, previous KPI value,
  current KPI value, KPI change percentage, and new contents sum

- **GIVEN** the customer has manually set a specific contents sum (overriding
  the default)
  **WHEN** the renewal batch processes the policy
  **THEN** the system still applies the KPI adjustment but flags the renewal
  for customer notification that their custom sum has been index-adjusted

- **GIVEN** the KPI adjustment results in a decrease (deflation)
  **WHEN** the new contents sum is calculated
  **THEN** the system does not reduce the contents sum below the previous
  level, preserving the customer's coverage (floor rule)

### Index Adjustment Formula

```text
New Contents Sum = Previous Contents Sum x (Current KPI / Previous KPI)
Floor Rule: New Contents Sum >= Previous Contents Sum
```

### Data Requirements

| Data Element                  | Source         | Required    |
| ----------------------------- | -------------- | ----------- |
| Previous contents sum insured | Policy record  | Yes         |
| Previous KPI value            | Renewal record | Yes         |
| Current KPI value             | SCB            | Yes         |
| KPI change percentage         | Calculated     | Yes         |
| New contents sum insured      | Calculated     | Yes         |
| Customer-set override flag    | Policy record  | Conditional |

### External Integrations

- **SCB (Statistiska Centralbyrån)** — Source for konsumentprisindex (KPI) data

### Regulatory

- **FSA-016** — Index adjustment methodology must be transparent; the customer
  must be informed of how the contents sum was recalculated
- **FSA-004** — The KPI adjustment and its impact must be communicated clearly
- **FSA-005** — Contents sum must reflect current replacement values; index
  adjustment is a consumer protection measure
- **GDPR-007** — Property valuation data processed under Article 6(1)(b)
  contract performance

---

## HRN-07: Apply Premium Adjustments at Renewal

**As the** system,
**I want to** apply premium adjustments based on claims history, area risk zone
changes, and other rating factors,
**so that** the renewal premium accurately reflects the current risk profile.

### Acceptance Criteria

- **GIVEN** a home insurance policy approaches renewal (T-60 days)
  **WHEN** the premium recalculation batch runs
  **THEN** the system recalculates the premium using: updated sums insured
  (after index adjustment), current claims history, current area risk zone,
  coverage tier and add-ons, and the applicable tariff version

- **GIVEN** the customer has had claims during the expiring policy period
  **WHEN** the premium is recalculated
  **THEN** the system applies the claims loading factor per the tariff rules
  and records the number of claims, types, and total paid amounts that
  influenced the premium

- **GIVEN** the customer's area risk zone has changed (e.g., due to updated
  flood, burglary, or fire risk mapping)
  **WHEN** the premium is recalculated
  **THEN** the new risk zone is applied and the premium factor change is
  recorded separately

- **GIVEN** the recalculated premium triggers a high-change flag (increase
  above a configurable threshold, e.g., >15%)
  **WHEN** the flag is raised
  **THEN** the renewal is routed to an underwriter for manual review before
  the renewal notice is sent (HRN-09)

- **GIVEN** the premium recalculation is complete and no flags are triggered
  **WHEN** the renewal is approved
  **THEN** the system queues the renewal for notice generation (HRN-10)

### Data Requirements

| Data Element              | Source            | Required |
| ------------------------- | ----------------- | -------- |
| Updated sums insured      | Index calculation | Yes      |
| Claims history            | Claims system     | Yes      |
| Area risk zone            | Risk mapping      | Yes      |
| Coverage tier and add-ons | Policy record     | Yes      |
| Deductible level          | Policy record     | Yes      |
| Tariff version            | Rating engine     | Yes      |
| Old annual premium        | Policy record     | Yes      |
| New annual premium        | Rating engine     | Yes      |
| Premium factor breakdown  | Rating engine     | Yes      |

### Regulatory

- **FSA-004** — Premium recalculation must be transparent and auditable;
  customers must understand why the premium changed
- **FSA-006** — Premium data must be available for supervisory reporting
- **FSA-016** — Index-driven premium changes must be distinguished from other
  rating factor changes
- **IDD-011** — Significant premium changes may trigger a demands-and-needs
  reassessment
- **GDPR-007** — Premium calculation data processed under Article 6(1)(b)
  contract performance

---

## HRN-08: Process Renewal Modifications for Phone Customers

**As a** customer service agent (kundservicehandläggare),
**I want to** process renewal modifications requested by phone customers,
**so that** non-digital customers can adjust their coverage at renewal.

### Acceptance Criteria

- **GIVEN** a customer calls to modify their renewal terms
  **WHEN** the agent opens the customer's renewal record
  **THEN** the system displays the current renewal terms (premium, coverage
  tier, sums insured, add-ons, deductible) alongside the changes from the
  previous year

- **GIVEN** the agent modifies the coverage on behalf of the customer
  **WHEN** the agent selects new coverage options
  **THEN** the system recalculates the premium in real time and displays the
  updated terms for confirmation with the customer over the phone

- **GIVEN** the customer verbally confirms the modification
  **WHEN** the agent records the confirmation
  **THEN** the system logs the modification with: agent ID, timestamp, customer
  verification method (personnummer or BankID), and the specific changes made

- **GIVEN** the modification changes the premium by more than a configured
  threshold
  **WHEN** the agent processes the change
  **THEN** the system requires the agent to read a standardized disclosure
  statement to the customer explaining the premium impact

- **GIVEN** the customer requests a cancellation (opt-out) over the phone
  **WHEN** the agent processes the request
  **THEN** the system follows the same cancellation workflow as HRN-04 and
  sends written confirmation to the customer

### Data Requirements

| Data Element              | Source         | Required |
| ------------------------- | -------------- | -------- |
| Customer personnummer     | Agent input    | Yes      |
| Agent ID                  | System         | Yes      |
| Modification timestamp    | System         | Yes      |
| Verification method       | Agent input    | Yes      |
| Changes made              | Agent input    | Yes      |
| Disclosure statement read | Agent checkbox | Yes      |
| Updated premium           | Rating engine  | Yes      |

### Regulatory

- **FSA-004** — Agent must communicate renewal terms clearly and ensure the
  customer understands the changes
- **IDD-011** — Agent-assisted modifications constitute a demands-and-needs
  interaction; the agent must verify the new configuration meets the customer's
  needs
- **IDD-006** — If the agent recommends a coverage change, it constitutes
  advice and must be documented with rationale
- **GDPR-007** — Customer identity verification and call records processed
  under Article 6(1)(b) contract performance; call recording subject to
  consent requirements

---

## HRN-09: Review Flagged Renewals

**As an** underwriter (försäkringsgivare),
**I want to** review renewals flagged for significant risk changes (multiple
claims, area risk zone downgrade, large premium increase),
**so that** I can verify that continued coverage is appropriate and pricing is
accurate.

### Acceptance Criteria

- **GIVEN** a renewal has been flagged during premium recalculation (HRN-07)
  **WHEN** the underwriter opens the renewal queue
  **THEN** the system displays the flagged renewals with the specific trigger:
  premium increase above threshold, multiple claims during the period, area risk
  zone downgrade, or significant index adjustment

- **GIVEN** the underwriter reviews a flagged renewal
  **WHEN** the underwriter examines the details
  **THEN** the system provides: full claims history for the expiring period,
  year-over-year premium comparison with factor breakdown, property details and
  risk zone information, and any customer-reported changes (renovations, new
  valuables)

- **GIVEN** the underwriter approves the renewal
  **WHEN** the approval is recorded
  **THEN** the system queues the renewal for notice generation (HRN-10) with
  any underwriter-adjusted terms

- **GIVEN** the underwriter determines that continued coverage requires special
  conditions
  **WHEN** the underwriter adds conditions (increased deductible, coverage
  exclusion, or required property improvements)
  **THEN** the system records the conditions, includes them in the renewal
  notice, and requires customer acceptance before renewal proceeds

- **GIVEN** the underwriter decides not to renew the policy
  **WHEN** the underwriter records the non-renewal decision
  **THEN** the system generates a non-renewal notice to the customer at least
  30 days before the huvudförfallodag with a clear explanation of the reasons

### Review Triggers

| Trigger                        | Threshold                         |
| ------------------------------ | --------------------------------- |
| Premium increase               | Above 15% year over year          |
| Claims count                   | 2 or more claims in expiring term |
| Area risk zone downgrade       | Zone changed to higher risk       |
| Building sum index increase    | Above 10% year over year          |
| Customer-reported risk changes | Renovations, new high-value items |

### Data Requirements

| Data Element             | Source             | Required    |
| ------------------------ | ------------------ | ----------- |
| Flag trigger reason      | Renewal processing | Yes         |
| Claims history           | Claims system      | Yes         |
| Premium factor breakdown | Rating engine      | Yes         |
| Property risk data       | Risk mapping       | Yes         |
| Underwriter decision     | Underwriter input  | Yes         |
| Conditions applied       | Underwriter input  | Conditional |
| Non-renewal notice       | System             | Conditional |

### Regulatory

- **FSA-003** — Non-renewal decisions must be communicated at least 30 days
  before huvudförfallodag
- **FSA-004** — Non-renewal reasons must be communicated clearly and fairly
- **FSA-005** — Underwriter decisions must be consistent and fair; similar
  risks must be treated similarly
- **IDD-011** — Underwriter review at renewal is part of ongoing product
  governance and oversight
- **GDPR-007** — Underwriting decision data processed under Article 6(1)(f)
  legitimate interest (risk management)

---

## HRN-10: Generate and Send Renewal Notice

**As the** system,
**I want to** generate and send the förnyelseavisering (renewal notice) 30 days
before the huvudförfallodag,
**so that** legal notice requirements are met and the customer has time to review
and respond.

### Acceptance Criteria

- **GIVEN** the renewal has been processed (index adjustments, premium
  recalculation, and any underwriter review complete)
  **WHEN** the policy reaches T-30 days before huvudförfallodag
  **THEN** the system generates a förnyelseavisering containing: new premium,
  premium change explanation, updated sums insured with index adjustments,
  coverage summary, year-over-year comparison, customer's right to cancel, and
  instructions for making modifications

- **GIVEN** the renewal notice is generated
  **WHEN** the system dispatches the notice
  **THEN** it is sent via the customer's preferred channel (postal letter,
  digital mailbox such as Kivra, or Mina Sidor notification) and a copy is
  stored in the customer's document archive

- **GIVEN** the renewal notice includes index adjustments
  **WHEN** the notice is formatted
  **THEN** the adjustments are presented in a clear table showing: previous sum,
  index name, index change percentage, and resulting new sum for both building
  and contents

- **GIVEN** the renewal processing window has passed for a policy
  **WHEN** T-30 days arrives and the notice has not been sent
  **THEN** the system escalates to operations staff to ensure the notice is
  dispatched immediately, as late notices risk regulatory non-compliance

- **GIVEN** the renewal notice has been sent to all eligible policies
  **WHEN** the batch is complete
  **THEN** the system generates an operations report showing: total notices
  sent, delivery failures, flagged renewals pending review, and non-renewal
  notices issued

### Renewal Timeline

| Milestone | Timing            | Action                                                   |
| --------- | ----------------- | -------------------------------------------------------- |
| T-60      | 60 days before    | Identify policies approaching huvudförfallodag           |
| T-60      | 60 days before    | Recalculate index adjustments (HRN-05, HRN-06)           |
| T-60      | 60 days before    | Recalculate premium (HRN-07)                             |
| T-45      | 45 days before    | Underwriter reviews flagged renewals (HRN-09)            |
| T-30      | 30 days before    | Send förnyelseavisering to customer                      |
| T-30 to 0 | Response window   | Customer reviews, modifies (HRN-03), or cancels (HRN-04) |
| T-0       | Huvudförfallodag  | Automatic renewal for non-cancelled policies             |
| T+1       | Day after renewal | Send renewal confirmation and updated policy documents   |

### Data Requirements

| Data Element          | Source              | Required |
| --------------------- | ------------------- | -------- |
| Renewal record        | Renewal processing  | Yes      |
| Customer contact info | Policy record       | Yes      |
| Preferred channel     | Customer preference | Yes      |
| Notice content        | System generated    | Yes      |
| Dispatch timestamp    | System              | Yes      |
| Delivery confirmation | Channel provider    | Yes      |
| Operations report     | System generated    | Yes      |

### External Integrations

- **Postal Service** — Physical letter dispatch
- **Digital Mailbox (Kivra)** — Digital notice delivery
- **Mina Sidor** — Customer self-service portal notification

### Regulatory

- **FSA-003** — Renewal notice must be sent at least 30 days before
  huvudförfallodag per Försäkringsavtalslagen
- **FSA-004** — Notice must use clear, plain Swedish and present all changes
  transparently
- **FSA-016** — Index adjustment details must be included in the notice
- **IDD-011** — Notice must inform the customer of their right to reassess
  demands and needs at renewal
- **GDPR-007** — Customer contact data processed for notice delivery under
  Article 6(1)(b) contract performance

---

## Data Model

### HomeRenewalRecord

| Attribute                   | Type     | Description                                               |
| --------------------------- | -------- | --------------------------------------------------------- |
| Renewal ID                  | String   | Unique identifier for the renewal                         |
| Policy number               | String   | Reference to the home insurance policy                    |
| Policy type                 | Enum     | Hemförsäkring / Villa / Bostadsrätt / Fritidshus          |
| Old policy period start     | Date     | Start date of the expiring policy period                  |
| Old policy period end       | Date     | Huvudförfallodag                                          |
| New policy period start     | Date     | Start date of the renewed policy period                   |
| New policy period end       | Date     | End date of the renewed policy period                     |
| Old annual premium          | Decimal  | Premium for the expiring period (SEK)                     |
| New annual premium          | Decimal  | Calculated premium for the new period (SEK)               |
| Old building sum insured    | Decimal  | Building sum during expiring period (SEK)                 |
| New building sum insured    | Decimal  | Building sum after index adjustment (SEK)                 |
| Old contents sum insured    | Decimal  | Contents sum during expiring period (SEK)                 |
| New contents sum insured    | Decimal  | Contents sum after index adjustment (SEK)                 |
| Byggkostnadsindex previous  | Decimal  | Index value used for previous period                      |
| Byggkostnadsindex current   | Decimal  | Current index value from SCB                              |
| KPI previous                | Decimal  | KPI value used for previous period                        |
| KPI current                 | Decimal  | Current KPI value from SCB                                |
| Claims count                | Integer  | Number of claims during expiring period                   |
| Area risk zone              | String   | Current risk zone for the property                        |
| Coverage tier               | Enum     | Bas / Standard / Premium                                  |
| Add-ons                     | List     | Active add-ons (allrisk, ID-skydd, etc.)                  |
| Deductible (självrisk)      | Decimal  | Deductible amount (SEK)                                   |
| Renewal status              | Enum     | Pending / Notice Sent / Renewed / Cancelled / Non-renewal |
| Underwriter review required | Boolean  | Whether the renewal was flagged for review                |
| Underwriter decision        | String   | Approve / Conditional / Non-renewal                       |
| Notice sent date            | DateTime | When the förnyelseavisering was dispatched                |
| Renewal processed date      | DateTime | When the renewal was processed on huvudförfallodag        |
| Cancellation date           | DateTime | When the customer cancelled (if applicable)               |
| Modification applied        | Boolean  | Whether coverage was modified at renewal                  |
| Premium factor breakdown    | JSON     | Detailed breakdown of premium rating factors              |

---

## Regulatory Traceability Matrix

| Requirement | HRN-01 | HRN-02 | HRN-03 | HRN-04 | HRN-05 | HRN-06 | HRN-07 | HRN-08 | HRN-09 | HRN-10 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-003     | X      |        |        | X      |        |        |        |        | X      | X      |
| FSA-004     | X      | X      | X      | X      | X      | X      | X      | X      | X      | X      |
| FSA-005     |        |        |        |        | X      | X      |        |        | X      |        |
| FSA-006     |        |        |        |        |        |        | X      |        |        |        |
| FSA-012     |        |        | X      |        |        |        |        |        |        |        |
| FSA-016     | X      | X      |        |        | X      | X      | X      |        |        | X      |
| GDPR-007    | X      |        | X      | X      | X      | X      | X      | X      | X      | X      |
| IDD-006     |        |        |        |        |        |        |        | X      |        |        |
| IDD-011     | X      | X      | X      |        |        |        | X      | X      | X      | X      |
