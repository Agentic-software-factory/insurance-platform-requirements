---
sidebar_position: 1
---

# Actors

Actors represent the roles and external systems that interact with the
TryggFörsäkring insurance platform. They are referenced by user stories and use
cases throughout all delivery phases. Each actor definition includes the Swedish
term, responsibilities, key interactions, and regulatory relevance.

## Actor Summary

| Actor                                                                 | Type     | Primary Role                                          |
| --------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| [Customer (Privatkund)](internal/customer.md)                         | Internal | Private individual seeking or holding motor insurance |
| [Corporate Customer (Företagskund)](internal/corporate-customer.md)   | Internal | Business entity with fleet or commercial vehicles     |
| [Insurance Agent (Försäkringsagent)](internal/insurance-agent.md)     | Internal | Represents insurers and sells policies                |
| [Insurance Broker (Försäkringsmäklare)](internal/insurance-broker.md) | Internal | Independent advisor representing customer interests   |
| [Claims Handler (Skadereglerare)](internal/claims-handler.md)         | Internal | Assesses, investigates, and settles claims            |
| [Claims Adjuster (Värderare)](internal/claims-adjuster.md)            | Internal | Specialized vehicle damage assessor                   |
| [Underwriter (Riskbedömare)](internal/underwriter.md)                 | Internal | Assesses risk, sets premiums and terms                |
| [Actuary](internal/actuary.md)                                        | Internal | Develops pricing models and analyzes claims data      |
| [Compliance Officer](internal/compliance-officer.md)                  | Internal | Ensures regulatory adherence                          |
| [System Administrator](internal/system-administrator.md)              | Internal | Manages platform configuration and access             |
| [Transportstyrelsen](external/transportstyrelsen.md)                  | External | Swedish Transport Agency — vehicle registry           |
| [TFF](external/tff.md)                                                | External | Swedish Motor Insurers — uninsured claims             |
| [BankID](external/bankid.md)                                          | External | Electronic identification and signing                 |
| [Repair Shop (Verkstad)](external/repair-shop.md)                     | External | Authorized vehicle repair network                     |
| [Police (Polis)](external/police.md)                                  | External | Accident reports and fraud investigation              |
| [Medical Provider (Vårdgivare)](external/medical-provider.md)         | External | Injury treatment and medical reports                  |
| [Payment Provider](external/payment-provider.md)                      | External | Payment processing for premiums and claims            |

## Internal vs External Actors

**Internal actors** are people within TryggFörsäkring or its distribution
network who use the platform directly. They authenticate via BankID or
organizational credentials and have role-based access to platform functionality.

**External actors** are systems, organizations, or third parties that the
platform integrates with through APIs, file exchanges, or manual processes. They
do not log in to the platform directly but are essential participants in
insurance business processes.
