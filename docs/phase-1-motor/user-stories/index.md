---
sidebar_position: 1
---

# User Stories

User stories for Phase 1 — Motor Insurance. Each user story follows the format _"As a \<role\>, I want \<goal\> so that \<benefit\>"_ and includes acceptance criteria in Given/When/Then format, business rules, data requirements, and regulatory traceability.

## Policy Administration (MTAs)

Mid-term adjustments and policy lifecycle management — see [Policy Administration User Stories](policy-administration.md).

| ID        | Title                                       | Actor          |
| --------- | ------------------------------------------- | -------------- |
| US-PA-001 | Change Vehicle on Policy                    | Customer       |
| US-PA-002 | Update Address                              | Customer       |
| US-PA-003 | Upgrade Coverage Tier                       | Customer       |
| US-PA-004 | Downgrade Coverage Tier                     | Customer       |
| US-PA-005 | Adjust Deductible Level                     | Customer       |
| US-PA-006 | Add Named Driver                            | Customer       |
| US-PA-007 | Remove Named Driver                         | Customer       |
| US-PA-008 | Update Annual Mileage Estimate              | Customer       |
| US-PA-009 | View Amendment History                      | Claims Handler |
| US-PA-010 | Recalculate Premium After Amendment         | System         |
| US-PA-011 | Notify Transportstyrelsen of Policy Changes | System         |
| US-PA-012 | Reissue Policy Document                     | Customer       |
| US-PA-013 | Manage Policy Status                        | Underwriter    |
| US-PA-014 | Review High-Risk Amendments                 | Underwriter    |

## Policy Cancellations

User stories covering motor insurance policy cancellation scenarios, including cooling-off
(ångerrätt), renewal cancellation, vehicle ownership changes, and regulatory notifications.

| ID                                                 | Title                                                   | Priority    |
| -------------------------------------------------- | ------------------------------------------------------- | ----------- |
| [US-CAN-001](cancellation-cooling-off.md)          | Cancel Policy Within Cooling-Off Period (Ångerrätt)     | Must Have   |
| [US-CAN-002](cancellation-huvudforfallodag.md)     | Cancel at Huvudförfallodag                              | Must Have   |
| [US-CAN-003](cancellation-vehicle-sold.md)         | Cancel Due to Vehicle Sold                              | Must Have   |
| [US-CAN-004](cancellation-vehicle-deregistered.md) | Cancel Due to Vehicle Scrapped or Deregistered          | Must Have   |
| [US-CAN-005](cancellation-replacement-coverage.md) | Verify Replacement Trafikförsäkring Before Cancellation | Must Have   |
| [US-CAN-006](cancellation-transportstyrelsen.md)   | Notify Transportstyrelsen of Policy Cancellation        | Must Have   |
| [US-CAN-007](cancellation-refund.md)               | Calculate and Process Premium Refund                    | Must Have   |
| [US-CAN-008](cancellation-emigration.md)           | Cancel Due to Emigration                                | Should Have |
| [US-CAN-009](cancellation-death.md)                | Cancel Due to Death of Policyholder                     | Must Have   |
| [US-CAN-010](cancellation-insurer-initiated.md)    | Insurer-Initiated Cancellation                          | Must Have   |
| [US-CAN-011](cancellation-eu-online-button.md)     | EU Online Cancellation Button (EU 2023/2673)            | Must Have   |

## Claims Handling

User stories covering the full motor insurance claims lifecycle, from first
notification of loss through settlement and closure.

| ID                                            | Title                                                | Priority    |
| --------------------------------------------- | ---------------------------------------------------- | ----------- |
| [US-CLM-001](claims-fnol.md)                  | Report a Claim Online (FNOL)                         | Must Have   |
| [US-CLM-002](claims-registration.md)          | Register and Manage Claims                           | Must Have   |
| [US-CLM-003](claims-coverage-verification.md) | Verify Coverage and Check Exclusions                 | Must Have   |
| [US-CLM-004](claims-liability.md)             | Determine Liability                                  | Must Have   |
| [US-CLM-005](claims-damage-assessment.md)     | Assess Vehicle Damage                                | Must Have   |
| [US-CLM-006](claims-fraud-screening.md)       | Screen Claims for Fraud                              | Should Have |
| [US-CLM-007](claims-decision.md)              | Approve or Deny a Claim                              | Must Have   |
| [US-CLM-008](claims-settlement.md)            | Calculate and Process Settlement                     | Must Have   |
| [US-CLM-009](claims-subrogation.md)           | Recover Costs Through Subrogation                    | Should Have |
| [US-CLM-010](claims-bonus-impact.md)          | Update Bonus Class After Claim                       | Must Have   |
| [US-CLM-011](claims-tff.md)                   | Process TFF Claims                                   | Should Have |
| [US-CLM-012](claims-personal-injury.md)       | Handle Personal Injury Claims Under Trafikforsakring | Must Have   |
| [US-CLM-013](claims-tracking.md)              | Track Claim Status                                   | Should Have |
| [US-CLM-014](claims-repair-authorization.md)  | Authorize Repairs at Network Shops                   | Should Have |
| [US-CLM-015](claims-closure.md)               | Close and Review Claims                              | Must Have   |

## Trafikforsakring (Mandatory Third-Party Liability)

The [trafikforsakring user stories](trafikforsakring.md) cover mandatory
third-party liability insurance under Trafikskadelagen (1975:1410), including
Transportstyrelsen registration, coverage gap prevention, personal injury
claims, TFF reporting, and cross-border coverage:

| ID    | Actor              | Summary                                                  |
| ----- | ------------------ | -------------------------------------------------------- |
| TF-01 | System             | Register trafikforsakring with Transportstyrelsen        |
| TF-02 | Customer           | Automatic trafikforsakring inclusion in any motor policy |
| TF-03 | Claims Handler     | Process personal injury claims under Trafikskadelagen    |
| TF-04 | System             | Prevent policy cancellation without replacement coverage |
| TF-05 | Compliance Officer | Generate TFF statutory reports                           |
| TF-06 | Claims Handler     | Route uninsured/foreign vehicle claims to TFF            |
| TF-07 | Customer           | Cross-border coverage via Green Card system              |

## Renewals

Annual policy renewal lifecycle — see [Renewal User Stories](renewals.md).

| ID        | Title                                        | Actor              |
| --------- | -------------------------------------------- | ------------------ |
| US-RN-001 | Receive Renewal Notice                       | Customer           |
| US-RN-002 | View Premium Change Explanation              | Customer           |
| US-RN-003 | Recalculate Renewal Premium                  | Underwriter        |
| US-RN-004 | Update Bonus Class at Renewal                | System             |
| US-RN-005 | Automatically Renew Policy                   | System             |
| US-RN-006 | Cancel Policy Before Renewal                 | Customer           |
| US-RN-007 | Update Payment Schedule for Renewed Policy   | System             |
| US-RN-008 | Handle Inbound Insurer Switch (Flyttanmälan) | System             |
| US-RN-009 | Offer Retention Pricing                      | Underwriter        |
| US-RN-010 | Reassess Demands and Needs at Renewal        | Compliance Officer |
