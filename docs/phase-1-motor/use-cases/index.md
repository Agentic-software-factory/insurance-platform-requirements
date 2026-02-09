---
sidebar_position: 1
---

# Use Cases

Use cases for Phase 1 — Motor Insurance. Each use case describes the detailed interaction flow including actors, preconditions, main flow, exception flows, postconditions, and regulatory references.

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

## Trafikforsakring (Mandatory Third-Party Liability)

The [Trafikforsakring](trafikforsakring.md) use case (UC-TF-001) describes
the management of mandatory third-party liability insurance under
Trafikskadelagen (1975:1410). It covers:

- Transportstyrelsen registration upon policy binding
- Coverage gap prevention at cancellation
- Personal injury claims under strict liability (Trafikskadelagen)
- TFF statutory reporting obligations
- Uninsured and foreign vehicle claims handling
- Cross-border coverage via the Green Card system
