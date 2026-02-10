---
sidebar_position: 3
---

# Burglary and Theft Claims — User Stories

User stories for home insurance burglary and theft (inbrott/stöld) claims
processing. Covers break-in damage, stolen property, allrisk/drulle claims,
fraud screening, settlement with åldersavdrag, and post-burglary support
including emergency locksmith dispatch and krisstöd (crisis support).

## Overview

| ID     | Actor          | Summary                                                          |
| ------ | -------------- | ---------------------------------------------------------------- |
| HCB-01 | Customer       | Report a burglary and get emergency locksmith dispatch           |
| HCB-02 | Customer       | Get guidance on filing a polisanmälan                            |
| HCB-03 | Claims Handler | Register burglary FNOL with police report number                 |
| HCB-04 | Claims Handler | Request stolen property inventory from the customer              |
| HCB-05 | Claims Handler | Verify high-value items against prior declarations               |
| HCB-06 | Claims Handler | Screen burglary claim for fraud indicators                       |
| HCB-07 | Claims Handler | Calculate replacement cost with åldersavdrag                     |
| HCB-08 | Customer       | Understand sub-limits for property categories                    |
| HCB-09 | Claims Handler | Arrange lock replacement and window repair                       |
| HCB-10 | Customer       | Claim for accidentally damaged or lost property (allrisk/drulle) |
| HCB-11 | Claims Handler | Process drulle claims with simplified assessment                 |
| HCB-12 | Customer       | Access krisstöd (crisis support) after a burglary                |

---

## HCB-01: Report Burglary and Emergency Locksmith Dispatch

**As a** customer (privatkund),
**I want to** report a burglary and get emergency locksmith dispatch,
**so that** my home is secured immediately after the break-in.

### Acceptance Criteria

- **GIVEN** the customer reports a burglary via web, app, or phone
  **WHEN** the customer indicates that locks or entry points are compromised
  **THEN** the system triggers an emergency locksmith (låssmed) dispatch request
  to TryggFörsäkring's partner network

- **GIVEN** the customer reports a burglary outside office hours
  **WHEN** the report is submitted via the 24/7 emergency service
  **THEN** the system dispatches a locksmith from the emergency partner roster
  and creates a preliminary claim record for follow-up during business hours

- **GIVEN** the locksmith dispatch has been initiated
  **WHEN** the system confirms the dispatch
  **THEN** the customer receives an SMS/push notification with the locksmith's
  estimated arrival time and contact details

- **GIVEN** the customer reports a burglary
  **WHEN** the customer submits the initial report
  **THEN** the system creates a claim record with claim type "Inbrott/stöld",
  records the incident date, time, and address, and generates a unique claim
  number (skadenummer)

- **GIVEN** the customer has reported a burglary
  **WHEN** the emergency response is confirmed
  **THEN** the system displays guidance on immediate next steps: do not touch
  the break-in scene, file a polisanmälan, and document damage with photos

### Data Requirements

| Data Element          | Source          | Required |
| --------------------- | --------------- | -------- |
| Incident date/time    | Customer input  | Yes      |
| Property address      | Policy record   | Yes      |
| Entry point damage    | Customer input  | Yes      |
| Lock replacement need | Customer input  | Yes      |
| Emergency contact     | Customer input  | Yes      |
| Policy number         | System lookup   | Yes      |
| Locksmith partner     | Partner network | Yes      |

### External Integrations

- **Partner Network** — Emergency locksmith dispatch
- **SMS/Push Gateway** — Customer notifications

### Regulatory

- **FSA-003** — Timely claims handling; emergency response must be initiated
  promptly upon notification
- **FSA-005** — Fair settlement; locksmith costs are covered under the policy
- **GDPR-007** — Customer contact data processed for emergency service dispatch;
  legal basis is Article 6(1)(b) contract performance

---

## HCB-02: Guidance on Filing a Polisanmälan

**As a** customer (privatkund),
**I want to** receive guidance on filing a polisanmälan (police report),
**so that** my burglary claim can proceed with the required documentation.

### Acceptance Criteria

- **GIVEN** the customer has reported a burglary (HCB-01)
  **WHEN** the system displays post-report guidance
  **THEN** the system provides step-by-step instructions for filing a
  polisanmälan, including a link to the Polisen online reporting service
  (polisen.se/anmälan)

- **GIVEN** the customer has not yet provided a police report number
  **WHEN** the claims handler reviews the claim
  **THEN** the system displays a reminder that a polisanmälan is required
  before the claim can proceed to assessment

- **GIVEN** the customer provides a police report number (K-nummer)
  **WHEN** the number is entered into the claim record
  **THEN** the system validates the format and stores it linked to the claim

- **GIVEN** the customer is unable to file a polisanmälan immediately
  **WHEN** the customer requests more time
  **THEN** the system allows a configurable grace period (default: 7 days)
  before the claim is paused pending the police report

### Data Requirements

| Data Element              | Source         | Required    |
| ------------------------- | -------------- | ----------- |
| Police report number      | Customer input | Yes         |
| Police report filing date | Customer input | Yes         |
| Grace period status       | System         | Conditional |

### Regulatory

- **FSA-003** — Timely claims handling; the process must not be unreasonably
  delayed while awaiting the police report
- **FSA-007** — Fraud screening obligation; police report is a prerequisite
  for anti-fraud verification
- **GDPR-007** — Police report reference number is personal data; processed
  under Article 6(1)(b) contract performance

---

## HCB-03: Register Burglary FNOL with Police Report

**As a** claims handler (skadereglerare),
**I want to** register the burglary FNOL with the police report number,
**so that** the claim is properly documented and can proceed to assessment.

### Acceptance Criteria

- **GIVEN** a customer has reported a burglary (HCB-01)
  **WHEN** the claims handler opens the claim for registration
  **THEN** the system displays the preliminary claim data and prompts for the
  police report number (K-nummer) and any additional incident details

- **GIVEN** the claims handler enters the police report number
  **WHEN** the FNOL is completed
  **THEN** the system links the police report to the claim record and
  transitions the claim status from "Reported" to "Under Assessment"

- **GIVEN** the claims handler registers the FNOL
  **WHEN** the handler completes the registration
  **THEN** the system verifies coverage: the policy must be active at the
  incident date, and inbrott/stöld must be a covered peril under the
  customer's coverage tier

- **GIVEN** the FNOL is registered
  **WHEN** the system processes the new claim
  **THEN** the system automatically initiates fraud screening (HCB-06) and
  sends a confirmation to the customer with the claim number and next steps

- **GIVEN** the policy does not cover the reported claim type
  **WHEN** coverage verification fails
  **THEN** the system alerts the claims handler, who notifies the customer
  with a clear explanation of why coverage does not apply

### Data Requirements

| Data Element          | Source           | Required |
| --------------------- | ---------------- | -------- |
| Claim number          | System generated | Yes      |
| Policy number         | System lookup    | Yes      |
| Police report number  | Claims handler   | Yes      |
| Incident date/time    | Customer/handler | Yes      |
| Incident description  | Customer/handler | Yes      |
| Coverage verification | System           | Yes      |
| Break-in method       | Customer/handler | No       |

### Regulatory

- **FSA-003** — Timely claims handling; FNOL registration must occur promptly
- **FSA-007** — Fraud screening must be triggered at FNOL registration
- **FSA-014** — Record keeping; FNOL and all associated data must be retained
  for 10 years
- **GDPR-007** — Claim data including police report is personal data;
  processed under Article 6(1)(b)

---

## HCB-04: Submit Stolen Property Inventory

**As a** claims handler (skadereglerare),
**I want** the customer to submit a property inventory with estimated values,
**so that** I can assess the claim and calculate the settlement.

### Acceptance Criteria

- **GIVEN** the FNOL is registered (HCB-03)
  **WHEN** the claims handler requests the property inventory
  **THEN** the system sends the customer a structured inventory form with
  categories: electronics, jewelry, clothing, furniture, documents, and other

- **GIVEN** the customer fills out the property inventory
  **WHEN** the customer enters each stolen item
  **THEN** the system captures: item description, category, purchase date,
  original purchase price, estimated replacement value, and whether the
  customer has a receipt or proof of purchase

- **GIVEN** the customer has completed the inventory
  **WHEN** the inventory is submitted
  **THEN** the system calculates the total claimed value, flags items that
  exceed category sub-limits, and alerts the claims handler if the total
  exceeds the high-value threshold (>100,000 SEK)

- **GIVEN** the customer has supporting documentation (receipts, photos,
  warranty cards)
  **WHEN** the customer uploads the documentation
  **THEN** the system stores the documents linked to the corresponding
  inventory items

- **GIVEN** the customer cannot provide exact values for all items
  **WHEN** the customer submits partial information
  **THEN** the system accepts the partial inventory and flags items without
  values for claims handler review

### Data Requirements

| Data Element      | Source         | Required |
| ----------------- | -------------- | -------- |
| Item description  | Customer input | Yes      |
| Item category     | Customer input | Yes      |
| Purchase date     | Customer input | No       |
| Original price    | Customer input | No       |
| Replacement value | Customer input | Yes      |
| Receipt/proof     | Customer input | No       |
| Supporting photos | Customer input | No       |

### Regulatory

- **FSA-005** — Fair settlement; accurate inventory is required for proper
  claim assessment
- **FSA-003** — Timely claims handling; inventory submission should not
  unreasonably delay the process
- **GDPR-007** — Inventory data is personal data; processed under
  Article 6(1)(b)

---

## HCB-05: Verify High-Value Items

**As a** claims handler (skadereglerare),
**I want to** verify high-value items against any prior declarations or photos,
**so that** fraud risk is managed and settlement accuracy is ensured.

### Acceptance Criteria

- **GIVEN** the stolen property inventory includes items above a configured
  value threshold (e.g., >10,000 SEK per item)
  **WHEN** the claims handler reviews the inventory
  **THEN** the system highlights high-value items and displays any prior
  declarations, photos, or valuations on file for the customer's policy

- **GIVEN** the customer has previously declared high-value items (jewelry,
  art, electronics) when purchasing or renewing the policy
  **WHEN** the claims handler cross-references the declarations
  **THEN** the system shows a comparison between the declared items and the
  claimed items, flagging discrepancies

- **GIVEN** a claimed high-value item has no prior declaration or
  documentation
  **WHEN** the claims handler identifies the gap
  **THEN** the system allows the handler to request additional proof from the
  customer (purchase receipt, independent valuation, or sworn statement)

- **GIVEN** the total claim value exceeds 100,000 SEK
  **WHEN** the claims handler reviews the claim
  **THEN** the system recommends assigning a field investigator for on-site
  verification

- **GIVEN** the verification is complete
  **WHEN** the claims handler records the verification outcome
  **THEN** the system updates each item's status to "Verified", "Partially
  Verified", or "Unverified" with documented rationale

### Data Requirements

| Data Element           | Source             | Required    |
| ---------------------- | ------------------ | ----------- |
| Prior declarations     | Policy record      | Conditional |
| Valuation documents    | Customer/appraiser | Conditional |
| Purchase receipts      | Customer input     | Conditional |
| Verification outcome   | Claims handler     | Yes         |
| Field investigator ref | System             | Conditional |

### Regulatory

- **FSA-007** — Fraud screening obligation; high-value item verification is
  part of the anti-fraud process
- **FSA-005** — Fair settlement; verified values ensure accurate settlement
- **GDPR-007** — Verification data is personal data; processed under
  Article 6(1)(f) legitimate interest (fraud prevention)

---

## HCB-06: Screen Burglary Claim for Fraud

**As a** claims handler (skadereglerare),
**I want to** check if the burglary claim shows signs of insurance fraud,
**so that** suspicious claims are flagged and investigated before settlement.

### Acceptance Criteria

- **GIVEN** a burglary claim FNOL is registered (HCB-03)
  **WHEN** the system processes the claim
  **THEN** it runs automated fraud screening rules and assigns a fraud risk
  score (low / medium / high)

- **GIVEN** the fraud screening identifies medium or high risk indicators
  **WHEN** the claims handler views the claim
  **THEN** the system displays the specific indicators that triggered the flag,
  including: recent policy inception, coverage upgrade before claim, multiple
  recent claims, inconsistent break-in details, and disproportionate claim
  amounts

- **GIVEN** burglary-specific fraud indicators are evaluated
  **WHEN** the system screens the claim
  **THEN** the following burglary-specific indicators are checked:
  - No signs of forced entry
  - Break-in reported during extended absence (vacation)
  - High-value items claimed without prior documentation
  - Claim filed shortly after coverage upgrade
  - Previous burglary claims on record
  - Inconsistency between break-in method and damage reported

- **GIVEN** the claims handler escalates a claim for fraud investigation
  **WHEN** the handler marks the claim for investigation
  **THEN** the system pauses settlement processing, notifies the fraud
  investigation team, and records the escalation reason

- **GIVEN** a fraud investigation is complete
  **WHEN** the investigator records the outcome (confirmed fraud / cleared)
  **THEN** the system updates the claim status accordingly; if fraud is
  confirmed, the system records the decision for potential criminal referral
  to Polisen

### Fraud Indicators (Burglary-Specific)

| Indicator                       | Description                                             |
| ------------------------------- | ------------------------------------------------------- |
| No forced entry signs           | No visible damage to locks, windows, or doors           |
| Extended absence break-in       | Burglary reported during vacation or prolonged absence  |
| Undocumented high-value items   | High-value items claimed without prior declaration      |
| Recent coverage upgrade         | Coverage tier increased shortly before the incident     |
| Multiple burglary claims        | Policyholder has filed burglary claims previously       |
| Inconsistent damage description | Break-in method does not match reported damage          |
| Claim amount disproportionate   | Total claimed value is unusually high for property type |
| Late reporting                  | Significant delay between incident and claim filing     |

### Regulatory

- **FSA-007** — Fraud screening obligation; insurers must have procedures to
  detect and prevent insurance fraud
- **FSA-005** — Fair settlement; fraud screening protects the insurance
  portfolio and honest policyholders
- **GDPR-007** — Fraud screening involves profiling personal data; legal basis
  is Article 6(1)(f) legitimate interest with appropriate safeguards

---

## HCB-07: Calculate Replacement Cost with Åldersavdrag

**As a** claims handler (skadereglerare),
**I want to** calculate replacement cost with åldersavdrag (age deduction) for
each item category,
**so that** the settlement amount is fair and follows policy terms.

### Acceptance Criteria

- **GIVEN** the stolen property inventory has been verified (HCB-05)
  **WHEN** the claims handler initiates settlement calculation
  **THEN** the system calculates the replacement value for each item using
  current market prices, then applies åldersavdrag based on item category
  and age

- **GIVEN** an item has åldersavdrag applied
  **WHEN** the settlement is calculated
  **THEN** the system shows: original replacement value, åldersavdrag
  percentage and amount, and net settlement value per item

- **GIVEN** the total settlement is calculated
  **WHEN** the claims handler reviews the settlement
  **THEN** the system displays: total replacement value, total åldersavdrag,
  applicable sub-limits per category, deductible (självrisk), and net
  settlement amount

- **GIVEN** items in a category exceed the sub-limit
  **WHEN** the system applies sub-limits
  **THEN** the settlement for that category is capped at the sub-limit and the
  customer is informed of the cap

- **GIVEN** the customer has an åldersavdrag waiver (nollavdrag) add-on
  **WHEN** the system calculates the settlement
  **THEN** åldersavdrag is not applied and the customer receives full
  replacement value (subject to sub-limits and deductible)

### Åldersavdrag Schedule

| Item Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5+ |
| ------------- | ------ | ------ | ------ | ------ | ------- |
| Electronics   | 0%     | 20%    | 30%    | 40%    | 50%     |
| Clothing      | 0%     | 25%    | 40%    | 50%    | 60%     |
| Furniture     | 0%     | 10%    | 15%    | 20%    | 25%     |
| Jewelry       | 0%     | 0%     | 0%     | 0%     | 0%      |
| Sports/Hobby  | 0%     | 15%    | 25%    | 35%    | 50%     |

### Settlement Formula

```text
Item Settlement = Replacement Value × (1 − Åldersavdrag %)
Category Settlement = MIN(Sum of Item Settlements, Category Sub-Limit)
Net Settlement = Sum of Category Settlements − Deductible (självrisk)
```

### Regulatory

- **FSA-005** — Fair settlement; åldersavdrag must follow published policy
  terms and be transparently communicated
- **FSA-003** — Timely claims handling; settlement calculation must not
  unreasonably delay payment
- **IDD-002** — Settlement terms including åldersavdrag must be disclosed in
  the IPID

---

## HCB-08: Understand Sub-Limits for Property Categories

**As a** customer (privatkund),
**I want to** understand sub-limits (e.g., jewelry max 50,000 SEK),
**so that** I know my coverage boundaries before and during a claim.

### Acceptance Criteria

- **GIVEN** the customer views their policy details or is in the claims process
  **WHEN** the customer accesses coverage information
  **THEN** the system displays the sub-limits for each property category
  applicable to their coverage tier

- **GIVEN** the customer's claim includes items in a category with a sub-limit
  **WHEN** the settlement is calculated (HCB-07)
  **THEN** the system clearly shows which categories are affected by
  sub-limits and the maximum payout per category

- **GIVEN** the customer wants to increase a sub-limit
  **WHEN** the customer inquires about higher coverage
  **THEN** the system explains options for increasing sub-limits through
  policy endorsement (tillägg) or separate valuable items insurance
  (värdeförsäkring)

- **GIVEN** the customer has declared specific high-value items at policy
  inception
  **WHEN** the customer views their sub-limits
  **THEN** declared items are shown with their individual coverage limits,
  separate from the general category sub-limit

### Sub-Limit Table (Standard Coverage Tier)

| Property Category      | Sub-Limit (SEK) | Notes                                 |
| ---------------------- | --------------- | ------------------------------------- |
| Jewelry and watches    | 50,000          | Per claim; higher with declaration    |
| Art and collectibles   | 50,000          | Per claim; higher with declaration    |
| Electronics (per item) | 30,000          | Per single item                       |
| Cash and securities    | 5,000           | Cash, stamps, gift cards              |
| Bicycles               | 15,000          | Per bicycle; higher with registration |
| Tools and equipment    | 25,000          | Per claim                             |
| Wine and spirits       | 10,000          | Per claim                             |
| Documents and keys     | 10,000          | Per claim; includes replacement costs |

### Regulatory

- **FSA-012** — Coverage terms and exclusions must be clearly disclosed,
  including sub-limits
- **FSA-005** — Fair settlement; sub-limits must be applied consistently and
  transparently
- **IDD-002** — Sub-limits must be disclosed in the IPID
- **FSA-004** — Fair treatment; customer must understand coverage boundaries

---

## HCB-09: Arrange Lock Replacement and Window Repair

**As a** claims handler (skadereglerare),
**I want to** arrange lock replacement and window repair directly through
partner services,
**so that** the customer does not have to coordinate repairs independently.

### Acceptance Criteria

- **GIVEN** the burglary claim includes break-in damage (locks, windows, doors)
  **WHEN** the claims handler reviews the damage
  **THEN** the system presents a list of approved repair partners in the
  customer's geographic area

- **GIVEN** the claims handler selects a repair partner
  **WHEN** the repair order is created
  **THEN** the system sends a repair authorization to the partner with the
  repair scope (lock replacement, window replacement, door repair) and the
  customer's contact details

- **GIVEN** the repair partner has completed the work
  **WHEN** the partner submits the invoice
  **THEN** the system processes payment directly to the partner; the customer
  pays no out-of-pocket cost for break-in damage repair (covered fully under
  the policy, subject to deductible)

- **GIVEN** the customer has already arranged emergency lock replacement
  (HCB-01)
  **WHEN** the claims handler reviews the claim
  **THEN** the system deducts the emergency locksmith cost from the total
  repair settlement to avoid double payment

- **GIVEN** the customer requests a security upgrade beyond like-for-like
  replacement
  **WHEN** the customer requests enhanced locks or security systems
  **THEN** the system calculates the additional cost above standard
  replacement and offers partner discounts for the upgrade portion

### Data Requirements

| Data Element         | Source         | Required |
| -------------------- | -------------- | -------- |
| Damage description   | Claims handler | Yes      |
| Repair scope         | Claims handler | Yes      |
| Partner selection    | Claims handler | Yes      |
| Repair cost estimate | Partner        | Yes      |
| Invoice amount       | Partner        | Yes      |
| Emergency costs      | System record  | Yes      |

### External Integrations

- **Partner Network** — Locksmith, glazier, and carpenter services
- **Payment Provider** — Direct partner payment

### Regulatory

- **FSA-005** — Fair settlement; break-in damage repair is part of the
  insured peril
- **FSA-003** — Timely claims handling; repairs should be arranged promptly
  to secure the home
- **GDPR-007** — Customer address and contact details shared with repair
  partners; legal basis is Article 6(1)(b) contract performance

---

## HCB-10: Claim for Accidentally Damaged or Lost Property (Allrisk/Drulle)

**As a** customer (privatkund),
**I want to** claim for accidentally damaged or lost property outside my home,
**so that** my allrisk/drulle coverage is used when I need it.

### Acceptance Criteria

- **GIVEN** the customer has allrisk/drulle coverage on their home insurance
  policy
  **WHEN** the customer reports an accidental damage or loss
  **THEN** the system presents a simplified FNOL form for drulle claims with
  fields: item description, incident description, incident date, incident
  location, and estimated item value

- **GIVEN** the customer submits a drulle claim
  **WHEN** the system processes the claim
  **THEN** the system verifies that allrisk/drulle coverage is active on the
  customer's policy and that the incident type is a covered peril (sudden and
  unforeseen damage or loss, not wear and tear)

- **GIVEN** the drulle claim is for an item with a value below the simplified
  assessment threshold (e.g., under 5,000 SEK)
  **WHEN** the system evaluates the claim
  **THEN** the system routes the claim for simplified processing (HCB-11)
  without requiring extensive documentation

- **GIVEN** the customer reports a lost item (not damaged)
  **WHEN** the system processes the claim
  **THEN** the system requires a description of the circumstances of the loss
  and, for items above a configured value, a polisanmälan for theft or loss

- **GIVEN** the claimed incident is wear and tear or gradual deterioration
  **WHEN** the system evaluates the incident type
  **THEN** the system rejects the claim with a clear explanation that
  allrisk/drulle does not cover gradual damage

### Allrisk/Drulle Coverage Summary

| Covered                        | Not Covered                            |
| ------------------------------ | -------------------------------------- |
| Dropping or spilling on device | Wear and tear                          |
| Accidental breakage            | Gradual deterioration                  |
| Theft outside the home         | Manufacturer defects under warranty    |
| Loss of personal belongings    | Intentional damage                     |
| Damage during transport        | Items left unattended in public spaces |

### Regulatory

- **FSA-005** — Fair settlement; drulle claims must be assessed per policy
  terms
- **FSA-012** — Coverage terms must be clearly disclosed, including what
  allrisk/drulle covers and excludes
- **GDPR-007** — Claim data processed under Article 6(1)(b) contract
  performance

---

## HCB-11: Process Drulle Claims with Simplified Assessment

**As a** claims handler (skadereglerare),
**I want to** process drulle claims with simplified assessment for lower-value
items,
**so that** small claims are handled efficiently without excessive overhead.

### Acceptance Criteria

- **GIVEN** a drulle claim is submitted for an item below the simplified
  assessment threshold (e.g., under 5,000 SEK)
  **WHEN** the claims handler reviews the claim
  **THEN** the system presents a streamlined assessment workflow: verify
  coverage, confirm incident type, calculate settlement, and approve payment

- **GIVEN** a drulle claim passes the simplified assessment
  **WHEN** the claims handler approves the settlement
  **THEN** the system calculates: replacement value minus åldersavdrag
  (if applicable) minus the allrisk deductible (självrisk), and initiates
  payment to the customer

- **GIVEN** a drulle claim is for an item above the simplified assessment
  threshold
  **WHEN** the system evaluates the claim value
  **THEN** the system routes the claim to the standard assessment process
  with full documentation requirements (HCB-04, HCB-05)

- **GIVEN** the customer has filed multiple drulle claims in a short period
  **WHEN** the system detects the pattern
  **THEN** the system flags the claims for fraud screening (HCB-06) before
  proceeding with settlement

- **GIVEN** a drulle claim is settled
  **WHEN** the payment is processed
  **THEN** the system records the claim outcome and updates the customer's
  claims history

### Simplified Assessment Thresholds

| Criterion           | Threshold       | Action                    |
| ------------------- | --------------- | ------------------------- |
| Item value          | Under 5,000 SEK | Simplified assessment     |
| Item value          | 5,000+ SEK      | Standard assessment       |
| Claims in 12 months | More than 2     | Fraud screening triggered |
| Police report       | Not required    | For items under 5,000 SEK |

### Regulatory

- **FSA-003** — Timely claims handling; simplified process ensures small
  claims are settled promptly
- **FSA-005** — Fair settlement; even simplified assessment must follow
  policy terms
- **FSA-007** — Fraud screening obligation; patterns of frequent claims must
  be monitored
- **GDPR-007** — Claims history used for fraud detection; processed under
  Article 6(1)(f) legitimate interest

---

## HCB-12: Access Krisstöd (Crisis Support) After Burglary

**As a** customer (privatkund),
**I want to** access krisstöd (crisis support) after a burglary,
**so that** I can get psychological help to cope with the emotional impact.

### Acceptance Criteria

- **GIVEN** the customer has reported a burglary claim (HCB-01)
  **WHEN** the claim is registered
  **THEN** the system automatically informs the customer that krisstöd
  (crisis support) is available as part of their home insurance policy

- **GIVEN** the customer requests krisstöd
  **WHEN** the customer activates the crisis support benefit
  **THEN** the system connects the customer to a licensed crisis counselor
  via phone within 24 hours, or books an appointment within 3 business days

- **GIVEN** the policy includes krisstöd coverage
  **WHEN** the customer uses the benefit
  **THEN** the system covers up to the policy-defined number of counseling
  sessions (typically 5–10 sessions) at no additional cost to the customer

- **GIVEN** the customer needs crisis support outside office hours
  **WHEN** the customer contacts the 24/7 emergency line
  **THEN** the system connects the customer to an on-call crisis counselor
  or provides a crisis helpline number for immediate support

- **GIVEN** the customer's household members are also affected
  **WHEN** the customer requests krisstöd for household members
  **THEN** the system extends the benefit to all household members listed
  on the policy

### Data Requirements

| Data Element         | Source              | Required |
| -------------------- | ------------------- | -------- |
| Claim reference      | System              | Yes      |
| Customer contact     | Policy record       | Yes      |
| Household members    | Policy record       | No       |
| Counselor assignment | Crisis support team | Yes      |
| Sessions used        | System tracking     | Yes      |

### External Integrations

- **Crisis Support Provider** — Licensed counselor network
- **24/7 Emergency Line** — After-hours crisis support

### Regulatory

- **FSA-005** — Fair settlement; krisstöd is a covered benefit and must be
  made available as per policy terms
- **FSA-004** — Fair treatment; emotional well-being support is part of
  comprehensive claims handling
- **GDPR-007** — Health-related data (crisis support usage) is special
  category data; processed under Article 9(2)(f) for legal claims or
  Article 6(1)(b) with explicit consent

---

## Data Model

### BurglaryClaimRecord

| Attribute            | Type     | Description                                    |
| -------------------- | -------- | ---------------------------------------------- |
| Claim number         | String   | Unique skadenummer                             |
| Policy number        | String   | Reference to the home insurance policy         |
| Claim type           | Enum     | Inbrott / Stöld / Allrisk-drulle               |
| Incident date/time   | DateTime | When the burglary or loss occurred             |
| Incident address     | String   | Location of the incident                       |
| Police report number | String   | K-nummer from polisanmälan                     |
| Break-in method      | String   | Description of how entry was gained            |
| Emergency locksmith  | Boolean  | Whether emergency locksmith was dispatched     |
| Property inventory   | List     | Stolen/damaged items with values               |
| Total claimed value  | Decimal  | Sum of all claimed items (SEK)                 |
| Fraud risk score     | Enum     | Low / Medium / High                            |
| Settlement amount    | Decimal  | Net settlement after deductions (SEK)          |
| Deductible applied   | Decimal  | Självrisk amount (SEK)                         |
| Åldersavdrag total   | Decimal  | Total age deduction applied (SEK)              |
| Repair costs         | Decimal  | Lock/window/door repair costs (SEK)            |
| Krisstöd activated   | Boolean  | Whether crisis support was requested           |
| Status               | Enum     | Reported / Under Assessment / Settled / Closed |
| Claims handler ID    | String   | Assigned handler identity                      |
| Created timestamp    | DateTime | When the claim was created                     |

### StolenPropertyItem

| Attribute         | Type    | Description                                                   |
| ----------------- | ------- | ------------------------------------------------------------- |
| Item ID           | String  | Unique item identifier within the claim                       |
| Description       | String  | Item description                                              |
| Category          | Enum    | Electronics / Jewelry / Clothing / Furniture / Sports / Other |
| Purchase date     | Date    | When the item was originally purchased                        |
| Original price    | Decimal | Purchase price (SEK)                                          |
| Replacement value | Decimal | Current replacement cost (SEK)                                |
| Åldersavdrag %    | Decimal | Age deduction percentage applied                              |
| Net item value    | Decimal | Value after åldersavdrag (SEK)                                |
| Sub-limit applied | Boolean | Whether a category sub-limit caps this item                   |
| Verification      | Enum    | Verified / Partially Verified / Unverified                    |
| Documentation     | List    | Receipts, photos, valuations attached                         |

---

## Regulatory Traceability Matrix

| Requirement | HCB-01 | HCB-02 | HCB-03 | HCB-04 | HCB-05 | HCB-06 | HCB-07 | HCB-08 | HCB-09 | HCB-10 | HCB-11 | HCB-12 |
| ----------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ |
| FSA-003     | X      | X      | X      | X      |        |        | X      |        | X      |        | X      |        |
| FSA-004     |        |        |        |        |        |        |        | X      |        |        |        | X      |
| FSA-005     | X      |        |        | X      | X      | X      | X      | X      | X      | X      | X      | X      |
| FSA-007     |        | X      | X      |        | X      | X      |        |        |        |        | X      |        |
| FSA-012     |        |        |        |        |        |        |        | X      |        | X      |        |        |
| FSA-014     |        |        | X      |        |        |        |        |        |        |        |        |        |
| GDPR-007    | X      | X      | X      | X      | X      | X      |        |        | X      | X      | X      | X      |
| IDD-002     |        |        |        |        |        |        | X      | X      |        |        |        |        |
