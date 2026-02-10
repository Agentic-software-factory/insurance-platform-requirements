---
sidebar_position: 4
---

# Trafikforsakring — Cross-Reference Index

Trafikforsakring (mandatory third-party liability) requirements are spread
across multiple epics. This page provides a consolidated index linking to all
trafikforsakring-related content, so that compliance reviewers and developers
can find everything from one place.

For the dedicated trafikforsakring user stories, see
[Trafikforsakring User Stories](trafikforsakring.md). For the consolidated use
case, see
[UC-TRF-001: Trafikforsakring Compliance Lifecycle](../use-cases/trafikforsakring.md).

## Quote and Bind

| Reference | Title                                          | Trafikforsakring Relevance                                                             |
| --------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- |
| QNB-01    | [Get a Quick Quote](quote-and-bind.md)         | Trafikforsakring is the mandatory base tier included in every quote                    |
| QNB-04    | [Compare Coverage Tiers](quote-and-bind.md)    | All tiers include trafikforsakring as the non-removable base; tier comparison explains |
| QNB-08    | [Notify Transportstyrelsen](quote-and-bind.md) | Transportstyrelsen is notified of new trafikforsakring upon policy binding             |

## Policy Administration

| Reference | Title                                                                   | Trafikforsakring Relevance                                          |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| US-PA-011 | [Notify Transportstyrelsen of Policy Changes](policy-administration.md) | Transportstyrelsen is notified when trafikforsakring status changes |

## Policy Cancellations

| Reference  | Title                                                                                  | Trafikforsakring Relevance                                                 |
| ---------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| US-CAN-005 | [Verify Replacement Trafikforsakring](cancellation-replacement-coverage.md)            | Replacement trafikforsakring must be verified before cancellation proceeds |
| US-CAN-006 | [Notify Transportstyrelsen of Policy Cancellation](cancellation-transportstyrelsen.md) | Transportstyrelsen notified when trafikforsakring coverage ends            |

## Claims Handling

| Reference  | Title                                                                             | Trafikforsakring Relevance                                               |
| ---------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| US-CLM-011 | [Process TFF Claims](claims-tff.md)                                               | TFF claims for uninsured, unknown, and foreign vehicles                  |
| US-CLM-012 | [Handle Personal Injury Claims Under Trafikforsakring](claims-personal-injury.md) | Personal injury claims processed under Trafikskadelagen strict liability |

## Underwriting Rules and Bonus System

| Reference | Title                                              | Trafikforsakring Relevance                                    |
| --------- | -------------------------------------------------- | ------------------------------------------------------------- |
| UWB-01    | [Coverage Tier Definitions](underwriting-bonus.md) | Defines trafikforsakring scope within coverage tier structure |

## Regulatory Requirements

| Reference | Title                                                                   | Trafikforsakring Relevance                                    |
| --------- | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| FSA-007   | [Mandatory Trafikforsakring](../../regulatory/fsa-requirements.md)      | Legal requirement for all registered vehicles                 |
| FSA-008   | [TFF Membership Obligation](../../regulatory/fsa-requirements.md)       | TFF membership required for insurers selling trafikforsakring |
| FSA-009   | [Transportstyrelsen Notification](../../regulatory/fsa-requirements.md) | Timely notification of insurance status changes               |
| FSA-010   | [Fair Claims Settlement](../../regulatory/fsa-requirements.md)          | Personal injury claims must be handled fairly                 |
| FSA-013   | [Cooling-Off Period Rules](../../regulatory/fsa-requirements.md)        | Coverage gap prevention during cooling-off cancellations      |

## Mapping to Dedicated Trafikforsakring Stories

The following table maps cross-referenced content to the dedicated
trafikforsakring user stories, showing where each topic is covered in depth.

| Topic                              | Other Epic References         | Dedicated Story                                                                             |
| ---------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------- |
| Mandatory base tier                | QNB-01, QNB-04, UWB-01        | [US-TRF-001](trafikforsakring.md#us-trf-001-ensure-continuous-mandatory-coverage)           |
| Transportstyrelsen notifications   | QNB-08, US-PA-011, US-CAN-006 | [US-TRF-001](trafikforsakring.md#us-trf-001-ensure-continuous-mandatory-coverage)           |
| TFF reporting                      | FSA-008                       | [US-TRF-002](trafikforsakring.md#us-trf-002-report-to-tff)                                  |
| TFF data exchange                  | US-CLM-011                    | [US-TRF-003](trafikforsakring.md#us-trf-003-handle-tff-data-exchange)                       |
| Personal injury (strict liability) | US-CLM-012                    | [US-TRF-004](trafikforsakring.md#us-trf-004-process-personal-injury-under-trafikskadelagen) |
| Green Card / cross-border          | FSA-007, EU Motor Ins. Dir.   | [US-TRF-005](trafikforsakring.md#us-trf-005-issue-green-card-for-eu-travel)                 |
| Coverage gap / penalty fee         | US-CAN-005                    | [US-TRF-006](trafikforsakring.md#us-trf-006-handle-trafikforsakringsavgift-notification)    |
| TFF membership compliance          | FSA-008                       | [US-TRF-007](trafikforsakring.md#us-trf-007-verify-tff-membership-compliance)               |
