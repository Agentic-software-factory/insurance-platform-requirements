---
sidebar_position: 1
---

# Use Cases

Use cases for Phase 1 — Motor Insurance. Each use case describes the detailed interaction flow including actors, preconditions, main flow, exception flows, postconditions, and regulatory references.

## Quote and Bind

The [Quote and Bind Motor Insurance](quote-and-bind.md) use case (UC-QNB-001)
describes the complete flow from customer identification through policy
issuance and Transportstyrelsen notification. It covers:

- Customer identification and vehicle data lookup
- Demands-and-needs assessment (IDD-001)
- Premium calculation and coverage comparison
- BankID digital signing
- Policy issuance and insurance certificate delivery
- Transportstyrelsen notification
- Agent-assisted and broker-assisted alternative flows

## Policy Administration (MTAs)

Mid-term adjustment and policy lifecycle use cases — see [Policy Administration Use Cases](policy-administration.md).

| ID        | Title                                     | Primary Actor |
| --------- | ----------------------------------------- | ------------- |
| UC-PA-001 | Process Mid-Term Vehicle Change           | Customer      |
| UC-PA-002 | Process Coverage Tier Change              | Customer      |
| UC-PA-003 | Process Named Driver Change               | Customer      |
| UC-PA-004 | Manage Policy Status Transitions          | System        |
| UC-PA-005 | Recalculate Premium After Amendment       | System        |
| UC-PA-006 | Underwriter Review of High-Risk Amendment | Underwriter   |

## Policy Cancellations

Use cases describing the detailed workflows for motor insurance policy cancellation
processing and premium refund calculation.

| ID                                          | Title                          | Scope                                                   |
| ------------------------------------------- | ------------------------------ | ------------------------------------------------------- |
| [UC-CAN-001](uc-cancellation-processing.md) | Policy Cancellation Processing | End-to-end cancellation flow for all cancellation types |
| [UC-CAN-002](uc-refund-calculation.md)      | Premium Refund Calculation     | Refund rules, calculation, and payment processing       |

## Claims Handling

Use cases describing the detailed workflows for motor insurance claims
processing.

| ID                                          | Title                              | Scope                                         |
| ------------------------------------------- | ---------------------------------- | --------------------------------------------- |
| [UC-CLM-001](uc-claims-lifecycle.md)        | Claims Lifecycle                   | End-to-end claims flow from FNOL to closure   |
| [UC-CLM-002](uc-fnol-processing.md)         | FNOL Processing                    | First notification of loss — online and phone |
| [UC-CLM-003](uc-settlement-calculation.md)  | Settlement Calculation and Payment | Settlement rules and payment execution        |
| [UC-CLM-004](uc-fraud-screening.md)         | Fraud Screening and Investigation  | Automated and manual fraud detection          |
| [UC-CLM-005](uc-liability-determination.md) | Liability Determination            | Fault assessment and liability allocation     |
| [UC-CLM-006](uc-damage-assessment.md)       | Damage Assessment                  | Vehicle damage evaluation and cost estimation |
| [UC-CLM-007](uc-claims-closure.md)          | Claims Closure                     | Final review, closure, and archiving          |

## Underwriting and Bonus Assessment

The [Motor Underwriting and Bonus Assessment](underwriting-bonus.md) use case
(UC-UWB-001) describes the risk evaluation, premium calculation, and bonus class
management process. It covers:

- Bonus class determination and transfer verification
- Risk evaluation using vehicle, customer, and usage factors
- Risk acceptance, referral, and decline decisions
- Premium calculation with rating factor application
- Bonus class progression and regression rules
- Referral handling for non-standard risks

## Trafikforsakring (Mandatory Third-Party Liability)

The [Trafikforsakring Compliance Lifecycle](trafikforsakring.md) use case
(UC-TRF-001) describes the end-to-end management of mandatory third-party
liability insurance under Trafikskadelagen (1975:1410). It covers:

- Policy issuance: mandatory coverage check and Transportstyrelsen registration
- Ongoing monitoring: coverage gap detection and TFF reporting
- Claims: personal injury processing under strict liability and TFF coordination
- Cross-border: Green Card issuance and EU motor insurance directive compliance
- Cancellation: replacement coverage verification and TFF notification

## Renewals

Annual policy renewal lifecycle use cases — see [Renewal Use Cases](renewals.md).

| ID        | Title                                         | Primary Actor |
| --------- | --------------------------------------------- | ------------- |
| UC-RN-001 | Process Annual Policy Renewal                 | System        |
| UC-RN-002 | Process Flyttanmälan (Insurer Switch Request) | System        |
| UC-RN-003 | Manage Bonus Class Progression                | System        |
