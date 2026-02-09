---
sidebar_position: 1
---

# Use Cases

Use cases for Phase 1 — Motor Insurance. Each use case describes an end-to-end
business process with main success scenario, alternative flows, business rules,
non-functional requirements, and regulatory compliance mapping.

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

## Claims Handling

Use cases describing the detailed workflows for motor insurance claims
processing.

| ID                                         | Title                              | Scope                                         |
| ------------------------------------------ | ---------------------------------- | --------------------------------------------- |
| [UC-CLM-001](uc-claims-lifecycle.md)       | Claims Lifecycle                   | End-to-end claims flow from FNOL to closure   |
| [UC-CLM-002](uc-fnol-processing.md)        | FNOL Processing                    | First notification of loss — online and phone |
| [UC-CLM-003](uc-settlement-calculation.md) | Settlement Calculation and Payment | Settlement rules and payment execution        |
| [UC-CLM-004](uc-fraud-screening.md)        | Fraud Screening and Investigation  | Automated and manual fraud detection          |

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
