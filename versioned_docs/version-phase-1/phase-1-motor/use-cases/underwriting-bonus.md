---
sidebar_position: 3
---

# Use Case: Motor Underwriting and Bonus Assessment

End-to-end use case for assessing risk, calculating premiums, and managing the
bonus class system for motor insurance at TryggFörsäkring. Covers the flow from
risk evaluation through premium calculation, including bonus class management
and referral handling.

## Use Case Summary

| Field                | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| **Use Case ID**      | UC-UWB-001                                                                 |
| **Name**             | Motor Underwriting and Bonus Assessment                                    |
| **Primary Actor**    | System (Rating Engine)                                                     |
| **Secondary Actors** | Underwriter, Private Customer, Actuary, Compliance Officer                 |
| **Goal**             | Assess risk, calculate a fair premium, and apply the correct bonus class   |
| **Preconditions**    | Customer and vehicle data are available; bonus class is known or defaulted |
| **Postconditions**   | Premium is calculated; risk decision (accept/refer/decline) is recorded    |
| **Trigger**          | A motor insurance quote is requested (links to UC-QNB-001, step 4)         |

## Stakeholders and Interests

| Stakeholder        | Interest                                                              |
| ------------------ | --------------------------------------------------------------------- |
| Private Customer   | Fair, transparent premium reflecting their individual risk profile    |
| Underwriter        | Consistent risk assessment; high-risk cases flagged for manual review |
| Actuary            | Pricing rules are actuarially sound and documented                    |
| Compliance Officer | Non-discriminatory rating; transparent premium calculation            |
| TryggFörsäkring    | Profitable portfolio; competitive pricing; regulatory compliance      |

## Main Success Scenario

### 1. Bonus Class Determination

1. System retrieves the customer's current bonus class from the internal
   database
2. If the customer is new with no prior history, system assigns the default
   starting class (class 7)
3. If the customer is transferring from another insurer, system uses the
   provisional or verified transferred class (see Extension 1a)
4. System confirms the bonus class and its corresponding discount percentage
   from the bonus table

### 2. Risk Evaluation

1. System retrieves the vehicle risk classification:
   - Vehicle group (make, model, year)
   - Safety rating (Euro NCAP)
   - Theft risk index
   - Repair cost group
2. System retrieves the customer risk profile:
   - Age band (from personnummer)
   - Postal code risk zone
   - Occupation group (if provided)
3. System retrieves usage factors:
   - Annual mileage band
   - Parking type
   - Vehicle usage pattern
4. System evaluates risk acceptance rules against the risk profile

### 3. Risk Decision

1. System checks all acceptance, referral, and decline rules:
   - If all rules pass → **Accept** (proceed to step 4)
   - If one or more referral rules trigger → **Refer** (proceed to Extension
     3a)
   - If a decline rule triggers → **Decline** (proceed to Extension 3b)
2. System records the risk decision and any triggered rules

### 4. Premium Calculation

1. System selects the base premium for the requested coverage tier
   (trafik/halv/hel)
2. System applies rating factors multiplicatively:
   - Vehicle group multiplier
   - Safety rating multiplier
   - Theft risk multiplier
   - Repair cost multiplier
   - Age multiplier (including young driver surcharge if applicable)
   - Postal code risk zone multiplier
   - Annual mileage multiplier
   - Parking type multiplier
   - Vehicle usage multiplier
   - Occupation multiplier (if applicable)
3. System applies the bonus class discount percentage to the adjusted premium
4. System applies the deductible (självrisk) adjustment factor
5. System enforces minimum and maximum premium limits
6. System calculates the final annual premium

### 5. Premium Presentation

1. System generates the premium for each of the three coverage tiers
   (trafik/halv/hel)
2. System prepares the premium breakdown showing each factor's contribution
3. System stores the calculated premium with all applied factors for audit
   purposes
4. Premium data is returned to the quote flow (UC-QNB-001, step 4)

### 6. Bonus Class Progression (Post-Period)

1. At the huvudförfallodag (policy anniversary), system reviews the claims
   history for the policy period
2. If no at-fault claims: system advances the bonus class by one step (max
   class 15)
3. If one at-fault claim: system reduces the bonus class by 3 steps (min
   class 1)
4. If additional at-fault claims: system reduces the bonus class by 5 steps per
   additional claim (min class 1)
5. System records the new bonus class with the effective date
6. Updated bonus class is applied at the next renewal

## Extensions (Alternative Flows)

### 1a. Bonus Class Transfer from Another Insurer

1. Customer indicates they have a bonus class from a previous insurer
2. System records the claimed bonus class as provisional
3. System initiates a verification request via TFF
4. Provisional class is used for the initial quote and policy
5. When verification is received:
   - If confirmed: system updates the status to confirmed
   - If different from claimed: system adjusts the bonus class and
     recalculates the premium; customer is notified of the change
   - If not confirmed within 30 days: underwriter is alerted for manual
     review
6. Flow continues from step 4 (Premium Calculation)

### 1b. EU/EEA Bonus Transfer

1. Customer provides documentation of claims-free history from an EU/EEA
   insurer
2. System flags the case for underwriter review
3. Underwriter reviews the documentation and assigns an equivalent Swedish
   bonus class
4. Assigned class is recorded with the source as "Manual" and verification
   status as "Confirmed"
5. Flow continues from step 4 (Premium Calculation)

### 3a. Referral to Underwriter

1. System identifies one or more triggered referral rules
2. System places the application in the underwriter referral queue with:
   - Customer and vehicle summary
   - List of triggered referral rules
   - Preliminary premium calculation (for reference)
3. Underwriter reviews the application and:
   - **Approves** the quote (optionally with modified terms or premium
     loading)
   - **Declines** the application with a documented reason
4. If approved: flow returns to step 5 (Premium Presentation) with any
   modifications applied
5. If declined: flow continues to Extension 3b

### 3b. Application Declined

1. System records the decline decision with the decline rule(s) and reason
2. System notifies the customer that coverage cannot be offered, with a clear
   explanation of the reason
3. If the decline applies to halvförsäkring or helförsäkring only, system
   informs the customer that trafikförsäkring (mandatory minimum) is still
   available
4. Decline record is stored for regulatory reporting and future reference

### 4a. Premium Below Minimum

1. System detects that the calculated premium is below the configured minimum
   for the coverage tier
2. System sets the premium to the minimum threshold
3. System logs the minimum premium override for actuarial analysis
4. Flow continues from step 5 (Premium Presentation)

### 4b. Premium Above Maximum

1. System detects that the calculated premium exceeds the configured maximum
   for the coverage tier
2. System sets the premium to the maximum threshold
3. System flags the case for actuarial review (pricing may need adjustment)
4. Flow continues from step 5 (Premium Presentation)

## Business Rules

| Rule ID | Rule                                                                                     |
| ------- | ---------------------------------------------------------------------------------------- |
| BR-11   | Bonus class must be determined before premium calculation begins                         |
| BR-12   | New customers with no Swedish insurance history start at bonus class 7                   |
| BR-13   | Claim-free year advances the bonus class by 1 step; at-fault claim reduces it by 3 steps |
| BR-14   | Each additional at-fault claim in the same period reduces the bonus class by 5 steps     |
| BR-15   | Not-at-fault claims do not affect the bonus class                                        |
| BR-16   | Transferred bonus classes are provisional until verified via TFF                         |
| BR-17   | Rating factors are applied multiplicatively to the base premium                          |
| BR-18   | Bonus class discount is applied after all other rating factors                           |
| BR-19   | Minimum and maximum premium limits are enforced after all adjustments                    |
| BR-20   | Modified vehicles, imported vehicles, and classic cars require underwriter referral      |
| BR-21   | Trafikförsäkring cannot be declined except in cases defined by law (FSA-007)             |
| BR-22   | All decline decisions must include a clear reason communicated to the customer           |
| BR-23   | Rating factor changes require approval from underwriting manager and actuarial team      |

## Non-functional Requirements

| Requirement               | Target                                                    |
| ------------------------- | --------------------------------------------------------- |
| Premium calculation       | Complete within 2 seconds for all three tiers             |
| Risk evaluation           | Complete within 1 second                                  |
| Referral queue assignment | Underwriter notified within 5 minutes of referral         |
| Referral turnaround       | Target 24-hour response from underwriter                  |
| Bonus class update        | Processed on the huvudförfallodag (batch or event-driven) |
| Rating factor versioning  | All changes auditable with full version history           |
| Premium breakdown storage | Every calculated premium stored with factor-level detail  |

## Regulatory Compliance Summary

| Regulation   | Requirements Addressed                                               |
| ------------ | -------------------------------------------------------------------- |
| **FSA-004**  | Fair treatment through transparent, non-discriminatory pricing       |
| **FSA-005**  | Product governance: documented rules, annual review, version control |
| **FSA-006**  | Underwriting rules accessible for supervisory reporting              |
| **FSA-007**  | Trafikförsäkring cannot be refused; mandatory coverage preserved     |
| **FSA-012**  | Premium calculation basis disclosed to customers                     |
| **GDPR-001** | Personal data used in rating processed under Article 6(1)(b)         |
| **GDPR-003** | Transfer data (claims history) processed with data minimization      |
| **IDD-001**  | Premium transparency supports informed decision-making               |
| **IDD-004**  | Pricing and acceptance rules aligned with target market definitions  |

## Related User Stories

- [UWB-01: Bonus Class Table and Progression Rules](../user-stories/underwriting-bonus.md#uwb-01-bonus-class-table-and-progression-rules)
- [UWB-02: Transfer Bonus Class from Another Insurer](../user-stories/underwriting-bonus.md#uwb-02-transfer-bonus-class-from-another-insurer)
- [UWB-03: Calculate Premium Using Rating Factors](../user-stories/underwriting-bonus.md#uwb-03-calculate-premium-using-rating-factors)
- [UWB-04: Risk Acceptance and Referral Rules](../user-stories/underwriting-bonus.md#uwb-04-risk-acceptance-and-referral-rules)
- [UWB-05: Premium Calculation Transparency](../user-stories/underwriting-bonus.md#uwb-05-premium-calculation-transparency)
- [UWB-06: Documented Underwriting Rules for Actuarial Review](../user-stories/underwriting-bonus.md#uwb-06-documented-underwriting-rules-for-actuarial-review)
- [UWB-07: Non-Discriminatory Underwriting Verification](../user-stories/underwriting-bonus.md#uwb-07-non-discriminatory-underwriting-verification)
