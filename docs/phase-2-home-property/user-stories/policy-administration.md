---
sidebar_position: 3
---

# Policy Administration — User Stories

User stories for mid-term policy adjustments (MTAs) and post-bind policy
lifecycle management for home and property insurance. These cover all changes
a customer, BRF board chair, or internal actor may make to an active
hemförsäkring, villahemförsäkring, bostadsrättsförsäkring, or
fritidshusförsäkring policy.

## Overview

| ID     | Actor                  | Summary                                               |
| ------ | ---------------------- | ----------------------------------------------------- |
| HPA-01 | Customer               | Update address when moving within same property type  |
| HPA-02 | Customer               | Report villa renovation or extension                  |
| HPA-03 | BRF Member             | Update bostadsrättstillägg after apartment renovation |
| HPA-04 | Customer               | Upgrade coverage tier                                 |
| HPA-05 | Customer               | Add or remove allrisk coverage                        |
| HPA-06 | Customer               | Add a family member to the policy                     |
| HPA-07 | Customer               | Adjust deductible (självrisk)                         |
| HPA-08 | BRF Board Chair        | Update building insurance after renovation            |
| HPA-09 | BRF Board Chair        | Add or remove shared facilities                       |
| HPA-10 | Customer Service Agent | Process a mid-term policy change                      |
| HPA-11 | System                 | Recalculate premium after policy change               |
| HPA-12 | Customer               | View policy documents digitally                       |

---

## HPA-01: Update Address When Moving

**As a** customer (privatkund),
**I want to** update my address when I move within the same property type,
**so that** my coverage follows me to my new home and my premium reflects the
new location.

_Persona context: Maria & Johan Bergström move from their villa in Nacka
to a villa in Tyresö. Elin Andersson moves from one BRF apartment to
another in Stockholm._

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy
  **WHEN** they submit a new address
  **THEN** the system validates the address format, postal code, and verifies
  the property via Lantmäteriet

- **GIVEN** the new address is a different property type (e.g., villa to BRF)
  **WHEN** the system detects a property type mismatch
  **THEN** it informs the customer that a new policy is required rather than
  an address change, and offers to start a new quote flow

- **GIVEN** the new address is the same property type
  **WHEN** the system retrieves property data from Lantmäteriet
  **THEN** it pre-populates building details (construction year, size, building
  materials) and displays them for customer confirmation

- **GIVEN** property data is confirmed
  **WHEN** the system recalculates the premium based on the new property and
  geographic risk zone
  **THEN** the customer sees the old premium, new premium, and pro-rata
  adjustment amount with the effective date

- **GIVEN** the customer accepts the address change
  **WHEN** the amendment is processed
  **THEN** an updated policy document is generated and available for download

### Data Requirements

| Data Element         | Source         | Required |
| -------------------- | -------------- | -------- |
| New address          | Customer input | Yes      |
| Postal code          | Customer input | Yes      |
| Property type        | Lantmäteriet   | Yes      |
| Construction year    | Lantmäteriet   | Yes      |
| Building area (m²)   | Lantmäteriet   | Yes      |
| Geographic risk zone | Internal       | Yes      |

### External Integrations

- **Lantmäteriet** — Property data lookup and verification for the new address
- **Address Registry** — Address validation and geocoding

### Regulatory

- **GDPR-007** — Property data processing must comply with data minimization;
  old property data must be archived per retention policy
- **FSA-015** — Product suitability must be reconfirmed when the property
  changes significantly
- **FSA-004** — Premium recalculation must be transparent and communicated
  clearly

---

## HPA-02: Report Villa Renovation or Extension

**As a** customer (villaägare),
**I want to** report a renovation or extension to my villa,
**so that** my building sum insured (byggnadssumma) is updated to reflect the
current rebuilding cost.

_Persona context: Maria & Johan Bergström add a 20 m² extension to their
villa and need to update their building sum insured to avoid underinsurance._

### Acceptance Criteria

- **GIVEN** the customer has an active villahemförsäkring
  **WHEN** they report a renovation or extension
  **THEN** the system collects renovation details: type of work, additional
  area (m²), estimated cost, and completion status

- **GIVEN** the renovation increases the rebuilding cost
  **WHEN** the system recalculates the building sum insured
  **THEN** the customer sees the previous sum insured, the proposed new sum
  insured (calculated via building valuation tool), and the premium adjustment

- **GIVEN** the building valuation tool estimates a rebuilding cost above the
  current sum insured
  **WHEN** the system detects potential underinsurance
  **THEN** it displays a clear warning explaining proportional settlement risk
  (underförsäkring) per FSA-016

- **GIVEN** the customer accepts the updated sum insured
  **WHEN** the amendment is processed
  **THEN** the premium is adjusted pro-rata and an updated policy document is
  generated

- **GIVEN** the renovation involves structural changes (load-bearing walls,
  roof, foundation)
  **WHEN** the system assesses the renovation
  **THEN** it triggers an underwriter review before accepting the change

### Data Requirements

| Data Element         | Source             | Required    |
| -------------------- | ------------------ | ----------- |
| Renovation type      | Customer input     | Yes         |
| Additional area (m²) | Customer input     | Conditional |
| Estimated cost (SEK) | Customer input     | Yes         |
| Completion status    | Customer input     | Yes         |
| New rebuilding cost  | Building valuation | Yes         |
| Previous sum insured | Policy record      | Yes         |

### External Integrations

- **Building Valuation Tool** — Rebuilding cost estimation
  (byggkostnadskalkyl)

### Regulatory

- **FSA-016** — Building sum insured must reflect actual rebuilding cost;
  underinsurance risk must be communicated
- **FSA-015** — Product suitability; coverage must match the property's
  current state
- **GDPR-007** — Renovation details are property data subject to data
  minimization

---

## HPA-03: Update Bostadsrättstillägg After Apartment Renovation

**As a** BRF member (bostadsrättsinnehavare),
**I want to** update my policy when I renovate my apartment,
**so that** my bostadsrättstillägg reflects the current value of my interior
fittings and improvements (ytskikt).

_Persona context: Elin Andersson renovates the kitchen and bathroom in her
BRF apartment and needs her bostadsrättstillägg coverage to reflect the
increased value of her interior improvements._

### Acceptance Criteria

- **GIVEN** the customer has an active bostadsrättsförsäkring with
  bostadsrättstillägg
  **WHEN** they report an apartment renovation
  **THEN** the system collects details: rooms renovated, type of work
  (kitchen, bathroom, flooring, other), estimated cost

- **GIVEN** the renovation increases the value of interior fittings
  **WHEN** the system recalculates the bostadsrättstillägg sum insured
  **THEN** the customer sees the previous and proposed sum insured and the
  premium adjustment

- **GIVEN** the customer does not currently have bostadsrättstillägg
  **WHEN** they report a renovation
  **THEN** the system recommends adding bostadsrättstillägg and explains the
  coverage gap between the BRF's building insurance and personal coverage
  (ytskikt principle)

- **GIVEN** the customer accepts the update
  **WHEN** the amendment is processed
  **THEN** the premium is adjusted pro-rata and an updated policy document is
  generated

### Data Requirements

| Data Element              | Source         | Required |
| ------------------------- | -------------- | -------- |
| Rooms renovated           | Customer input | Yes      |
| Type of renovation work   | Customer input | Yes      |
| Estimated renovation cost | Customer input | Yes      |
| Current tillägg sum       | Policy record  | Yes      |

### External Integrations

None — relies on customer-provided renovation details.

### Regulatory

- **IDD-011** — Updated demands-and-needs assessment when coverage scope
  changes; must reassess whether bostadsrättstillägg is adequate
- **FSA-015** — Product suitability; coverage must match the customer's
  current situation
- **GDPR-007** — Renovation data is property data subject to data
  minimization

---

## HPA-04: Upgrade Coverage Tier

**As a** customer (privatkund),
**I want to** upgrade my coverage tier (bas to standard, or standard to
premium),
**so that** I get better protection for my home and belongings.

_Persona context: Amira Hassan upgrades from bas to standard hemförsäkring
to get better legal protection (rättsskydd) and travel insurance for her
family._

### Acceptance Criteria

- **GIVEN** the customer has an active policy at a lower coverage tier
  **WHEN** they request an upgrade
  **THEN** the system displays a side-by-side comparison of the current tier
  and the requested tier, showing what additional coverage is included

- **GIVEN** the comparison is displayed
  **WHEN** the customer reviews the upgrade
  **THEN** the system shows the premium difference, the new total premium,
  and the pro-rata adjustment for the remainder of the policy period

- **GIVEN** the upgrade requires a new demands-and-needs assessment
  **WHEN** the system detects a significant coverage scope change
  **THEN** it collects updated demands-and-needs responses before presenting
  the final recommendation per IDD-011

- **GIVEN** the customer accepts the upgrade
  **WHEN** the amendment is processed
  **THEN** the new coverage takes effect immediately, the premium is adjusted
  pro-rata, and an updated policy document is generated

### Data Requirements

| Data Element       | Source         | Required    |
| ------------------ | -------------- | ----------- |
| Current tier       | Policy record  | Yes         |
| Requested tier     | Customer input | Yes         |
| Updated D&N        | Customer input | Conditional |
| Premium adjustment | Calculation    | Yes         |

### External Integrations

None.

### Regulatory

- **IDD-011** — Demands-and-needs assessment must be updated when coverage
  scope changes significantly
- **IDD-012** — Coverage gap disclosures must be presented when upgrading
  (what the new tier covers that the old did not)
- **FSA-015** — Product suitability must be verified for the upgraded tier
- **FSA-004** — Premium change must be transparent and clearly communicated

---

## HPA-05: Add or Remove Allrisk Coverage

**As a** customer (privatkund),
**I want to** add or remove allrisk/drulle coverage on my policy,
**so that** I can adjust my protection against accidental damage to match my
needs.

_Persona context: Elin Andersson adds allrisk/drulle to cover her expensive
road bicycle and electronics. Karin & Bengt Holm remove allrisk from their
fritidshusförsäkring to reduce the premium._

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy
  **WHEN** they request to add allrisk/drulle
  **THEN** the system displays what allrisk covers (accidental damage to
  personal property), the premium increase, and any coverage limitations
  (e.g., maximum amount per item, age deductions)

- **GIVEN** the customer requests to remove allrisk/drulle
  **WHEN** the system presents the change
  **THEN** it displays a clear explanation of what coverage is lost and the
  premium reduction

- **GIVEN** the customer confirms the add or remove
  **WHEN** the amendment is processed
  **THEN** the coverage change takes effect immediately, the premium is
  adjusted pro-rata, and the updated policy document is generated

- **GIVEN** allrisk is being added
  **WHEN** the system checks current coverage
  **THEN** it also checks whether any high-value items should be registered
  separately (e.g., items above the standard single-item limit)

### Data Requirements

| Data Element       | Source         | Required    |
| ------------------ | -------------- | ----------- |
| Allrisk add/remove | Customer input | Yes         |
| High-value items   | Customer input | Conditional |
| Premium adjustment | Calculation    | Yes         |

### External Integrations

None.

### Regulatory

- **IDD-012** — When removing allrisk, coverage gap disclosures must explain
  what is no longer covered (accidental damage exclusion)
- **IDD-013** — Allrisk is an add-on; individual pricing must be shown
  separately from the base premium
- **FSA-015** — Product suitability; the system must not encourage removal
  of coverage without explaining the consequences

---

## HPA-06: Add a Family Member to the Policy

**As a** customer (privatkund),
**I want to** add a family member to my home insurance policy,
**so that** their belongings are also covered and they are included in the
liability protection.

_Persona context: Amira Hassan adds her partner (who recently completed SFI)
to her hemförsäkring so his belongings are covered._

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy
  **WHEN** they request to add a family member
  **THEN** the system collects the family member's details: name,
  personnummer (or date of birth), and relationship to the policyholder

- **GIVEN** the new member is added to the household
  **WHEN** the system recalculates coverage
  **THEN** it evaluates whether the contents sum insured (lösöresumma)
  should be increased to account for the additional person's belongings

- **GIVEN** the household size changes
  **WHEN** the premium is recalculated
  **THEN** the customer sees any premium adjustment (typically the premium
  does not change for adding household members, but the suggested sum insured
  may increase)

- **GIVEN** the customer confirms the change
  **WHEN** the amendment is processed
  **THEN** the family member is listed on the policy, the updated policy
  document reflects the new household composition, and the change is logged

### Data Requirements

| Data Element      | Source         | Required |
| ----------------- | -------------- | -------- |
| Member name       | Customer input | Yes      |
| Personnummer/DOB  | Customer input | Yes      |
| Relationship      | Customer input | Yes      |
| Updated household | Derived        | Yes      |

### External Integrations

None.

### Regulatory

- **GDPR-007** — Processing of family member's personal data (name,
  personnummer) requires a legal basis; contract performance applies when
  they are insured parties
- **FSA-015** — Product suitability; household composition affects coverage
  adequacy
- **FSA-004** — Any premium or coverage changes must be clearly communicated

---

## HPA-07: Adjust Deductible (Självrisk)

**As a** customer (privatkund),
**I want to** adjust my deductible (självrisk) level,
**so that** I can balance my premium cost against my out-of-pocket cost in
case of a claim.

_Persona context: Amira Hassan increases her deductible to reduce the
monthly premium. Karin & Bengt Holm lower the deductible on their
fritidshusförsäkring because remote properties have higher repair costs._

### Acceptance Criteria

- **GIVEN** the customer has an active home insurance policy
  **WHEN** they request a deductible change
  **THEN** the system displays available deductible levels (e.g., 1 500 SEK,
  3 000 SEK, 5 000 SEK, 7 500 SEK) with the corresponding premium for each

- **GIVEN** the customer selects a new deductible level
  **WHEN** the system recalculates the premium
  **THEN** the customer sees the current deductible, the new deductible, the
  premium change, and the pro-rata adjustment

- **GIVEN** the customer chooses a higher deductible
  **WHEN** the system presents the change
  **THEN** it includes a clear explanation that the customer will pay more
  out-of-pocket per claim in exchange for a lower premium

- **GIVEN** the customer confirms the change
  **WHEN** the amendment is processed
  **THEN** the new deductible takes effect immediately and the updated
  policy document reflects the new level

### Data Requirements

| Data Element           | Source         | Required |
| ---------------------- | -------------- | -------- |
| Current deductible     | Policy record  | Yes      |
| Requested deductible   | Customer input | Yes      |
| Premium per deductible | Calculation    | Yes      |

### External Integrations

None.

### Regulatory

- **IDD-011** — Deductible choice is part of the demands-and-needs
  assessment; customers must understand the trade-off between premium and
  out-of-pocket cost
- **FSA-004** — Premium and deductible changes must be transparent and
  clearly communicated
- **FSA-015** — Product suitability; the system must not allow a deductible
  so high that it undermines the purpose of the insurance

---

## HPA-08: Update BRF Building Insurance After Renovation

**As a** BRF board chair (ordförande),
**I want to** update the building insurance when renovations are completed,
**so that** the building sum insured (byggnadsförsäkringsbelopp) accurately
reflects the current rebuilding cost.

_Persona context: Per-Erik Nilsson reports that the BRF has completed a
stambyte (pipe replacement) costing 12 MSEK, increasing the building's
rebuilding cost._

### Acceptance Criteria

- **GIVEN** the BRF board chair has access to the BRF building insurance
  policy
  **WHEN** they report a completed renovation
  **THEN** the system collects: renovation type (stambyte, fasadrenovering,
  takrenovering, hissinstallation, other), scope, completion date,
  and total cost

- **GIVEN** the renovation increases the rebuilding cost
  **WHEN** the system recalculates the building sum insured
  **THEN** the board chair sees the previous sum insured, the proposed new
  sum insured, and the premium adjustment

- **GIVEN** the reported renovation cost appears inconsistent with the
  building's current valuation
  **WHEN** the system detects an anomaly
  **THEN** it flags the change for underwriter review and notifies the board
  chair that approval is pending (expected turnaround: 5 business days)

- **GIVEN** the update is accepted
  **WHEN** the amendment is processed
  **THEN** the premium is adjusted, the building insurance certificate is
  reissued, and an amendment record is created in the policy history

- **GIVEN** the BRF has fullvärdesförsäkring (full-value insurance)
  **WHEN** the building sum insured is updated
  **THEN** the system confirms that underinsurance risk is eliminated and
  no proportional settlement applies

### Data Requirements

| Data Element         | Source             | Required |
| -------------------- | ------------------ | -------- |
| Renovation type      | Board chair input  | Yes      |
| Renovation scope     | Board chair input  | Yes      |
| Completion date      | Board chair input  | Yes      |
| Total cost (SEK)     | Board chair input  | Yes      |
| Previous sum insured | Policy record      | Yes      |
| New rebuilding cost  | Building valuation | Yes      |

### External Integrations

- **Building Valuation Tool** — Rebuilding cost estimation for the updated
  building

### Regulatory

- **FSA-016** — Building sum insured must reflect actual rebuilding cost;
  underinsurance consequences must be communicated
- **GDPR-009** — Board member personal data processing complies with BRF
  data processing rules
- **FSA-015** — Product suitability; the BRF's coverage must match the
  building's current state

---

## HPA-09: Add or Remove Shared Facilities in BRF Insurance

**As a** BRF board chair (ordförande),
**I want to** add or remove shared facilities (laundry room, gym, sauna,
bicycle storage) from the building insurance,
**so that** communal areas are accurately covered.

_Persona context: Per-Erik Nilsson's BRF has converted an unused storage
room into a shared gym and needs to update the building insurance to cover
the new facility and its equipment._

### Acceptance Criteria

- **GIVEN** the BRF board chair has access to the BRF building insurance
  **WHEN** they request to add a shared facility
  **THEN** the system collects: facility type, location in the building,
  estimated value of fixed installations and equipment, and any special
  risk factors (e.g., sauna — fire risk, laundry — water damage risk)

- **GIVEN** the BRF board chair requests to remove a facility
  **WHEN** the system processes the removal
  **THEN** it confirms which facility is being removed, updates the covered
  facilities list, and recalculates the premium

- **GIVEN** a new facility introduces higher risk (e.g., sauna, pool)
  **WHEN** the system assesses the change
  **THEN** it may trigger an underwriter review to evaluate the added risk

- **GIVEN** the change is confirmed
  **WHEN** the amendment is processed
  **THEN** the covered facilities list is updated, the premium is adjusted,
  and the building insurance certificate is reissued

### Data Requirements

| Data Element         | Source            | Required    |
| -------------------- | ----------------- | ----------- |
| Facility type        | Board chair input | Yes         |
| Location             | Board chair input | Yes         |
| Equipment value      | Board chair input | Conditional |
| Special risk factors | Board chair input | Conditional |

### External Integrations

None.

### Regulatory

- **FSA-016** — Building valuation must account for shared facilities
- **GDPR-009** — Board member data processing rules apply
- **FSA-015** — Product suitability; shared facilities affect the BRF's
  overall coverage needs

---

## HPA-10: Process Mid-Term Policy Change (Agent)

**As a** customer service agent,
**I want to** process a mid-term policy change on behalf of a customer,
**so that** the customer's coverage is updated immediately when they contact
us by phone or in person.

_Persona context: Lars Svensson (claims handler cross-trained as agent)
processes a coverage upgrade for a customer who calls in after a neighbor's
water damage scare._

### Acceptance Criteria

- **GIVEN** the agent is authenticated and has policy administration
  permissions
  **WHEN** a customer requests a mid-term change by phone
  **THEN** the agent can search for the customer's policy by personnummer,
  policy number, or name + address

- **GIVEN** the agent locates the customer's policy
  **WHEN** they initiate a change
  **THEN** the same validation rules, premium calculations, and regulatory
  checks apply as when the customer self-serves online

- **GIVEN** the change requires BankID verification
  **WHEN** the agent initiates the change
  **THEN** the system sends a BankID authentication request to the
  customer's mobile device for remote verification

- **GIVEN** the change is processed
  **WHEN** the agent confirms on behalf of the customer
  **THEN** the amendment record notes that the change was agent-initiated
  (channel: PHONE or IN_PERSON), and the customer receives confirmation
  via email or SMS

- **GIVEN** the change triggers an underwriter review
  **WHEN** the agent submits the request
  **THEN** the agent is informed of the review requirement and can
  communicate the expected turnaround to the customer

### Data Requirements

| Data Element     | Source      | Required    |
| ---------------- | ----------- | ----------- |
| Customer lookup  | Agent input | Yes         |
| Change type      | Agent input | Yes         |
| BankID reference | BankID      | Conditional |
| Agent ID         | System      | Yes         |
| Channel          | System      | Yes         |

### External Integrations

- **BankID** — Remote customer identity verification

### Regulatory

- **GDPR-007** — Agent access to customer policy data must be logged;
  data minimization applies to the search and display of customer records
- **FSA-015** — Agent-initiated changes must follow the same product
  suitability rules as self-service
- **IDD-011** — If the change involves a coverage upgrade, the agent must
  complete the demands-and-needs assessment on behalf of the customer

---

## HPA-11: Recalculate Premium After Policy Change

**As the** system,
**I want to** recalculate the premium after any policy change,
**so that** the customer pays the correct amount for their updated coverage.

### Acceptance Criteria

- **GIVEN** any policy amendment has been accepted (address change, coverage
  upgrade, add/remove allrisk, deductible change, etc.)
  **WHEN** the system processes the amendment
  **THEN** it recalculates the annual premium using the updated risk factors

- **GIVEN** the premium has changed
  **WHEN** the system calculates the pro-rata adjustment
  **THEN** it determines the amount owed or to be refunded for the remainder
  of the current policy period, based on the effective date

- **GIVEN** the adjustment results in an additional charge
  **WHEN** the system triggers payment
  **THEN** it creates a payment request via the customer's registered payment
  method

- **GIVEN** the adjustment results in a refund
  **WHEN** the system triggers payment
  **THEN** it creates a refund to the customer's registered payment method

- **GIVEN** the amendment is processed
  **WHEN** the system updates the premium record
  **THEN** the amendment record includes: old premium, new premium, pro-rata
  adjustment amount, effective date, and the rating factors that changed

### Data Requirements

| Data Element         | Source        | Required |
| -------------------- | ------------- | -------- |
| Updated risk factors | Policy record | Yes      |
| Old annual premium   | Policy record | Yes      |
| New annual premium   | Calculation   | Yes      |
| Effective date       | Amendment     | Yes      |
| Pro-rata adjustment  | Calculation   | Yes      |
| Payment method       | Policy record | Yes      |

### External Integrations

- **Payment Provider** — Payment collection or refund processing

### Regulatory

- **FSA-004** — Premium changes must be transparent, with a clear breakdown
  of what changed and why
- **FSA-015** — Premium must accurately reflect the risk profile of the
  insured property and coverage

---

## HPA-12: View Policy Documents Digitally

**As a** customer (privatkund),
**I want to** view my policy documents digitally,
**so that** I can check my coverage, deductible, and premium anytime without
calling customer service.

_Persona context: Elin Andersson wants to check whether her
bostadsrättstillägg covers her recent kitchen renovation. Amira Hassan
wants to verify her hemförsäkring covers her children's belongings._

### Acceptance Criteria

- **GIVEN** the customer is authenticated via BankID
  **WHEN** they access the policy management section
  **THEN** they can view: the current policy document, insurance certificate,
  IPID, and a summary of current coverage (tier, add-ons, deductible,
  sum insured)

- **GIVEN** the customer has made mid-term changes
  **WHEN** they view policy documents
  **THEN** the most recent version is displayed by default, with access to
  previous versions in a document history

- **GIVEN** the customer views the policy
  **WHEN** they want a copy
  **THEN** they can download the policy document as a PDF

- **GIVEN** the customer views coverage details
  **WHEN** the system displays the policy summary
  **THEN** it clearly shows: what is covered, what is not covered, the
  deductible amount, coverage limits, and named insured persons

### Data Requirements

| Data Element          | Source         | Required |
| --------------------- | -------------- | -------- |
| Policy document       | Document store | Yes      |
| Insurance certificate | Document store | Yes      |
| IPID                  | Document store | Yes      |
| Amendment history     | Policy record  | Yes      |

### External Integrations

- **BankID** — Customer authentication

### Regulatory

- **GDPR-007** — Customer has the right to access their personal data;
  policy documents contain personal and property data
- **FSA-012** — Insurance contract information must be accessible to the
  customer throughout the policy period
- **IDD-002** — IPID must remain accessible to the customer after contract
  conclusion
