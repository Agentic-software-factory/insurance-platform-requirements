---
sidebar_position: 1
---

# Actors

Actors represent the roles and external systems that interact with the
TryggFörsäkring insurance platform. They are referenced by user stories and use
cases throughout all delivery phases. Each actor definition includes the Swedish
term, responsibilities, key interactions, and regulatory relevance.

## Actor Summary

| Actor                                                                   | Type     | Phase       | Primary Role                                        |
| ----------------------------------------------------------------------- | -------- | ----------- | --------------------------------------------------- |
| [Customer (Privatkund)](internal/customer.md)                           | Internal | Motor, Home | Private individual seeking or holding insurance     |
| [Corporate Customer (Företagskund)](internal/corporate-customer.md)     | Internal | Motor       | Business entity with fleet or commercial vehicles   |
| [Insurance Agent (Försäkringsagent)](internal/insurance-agent.md)       | Internal | Motor, Home | Represents insurers and sells policies              |
| [Insurance Broker (Försäkringsmäklare)](internal/insurance-broker.md)   | Internal | Motor       | Independent advisor representing customer interests |
| [Claims Handler (Skadereglerare)](internal/claims-handler.md)           | Internal | Motor, Home | Assesses, investigates, and settles claims          |
| [Claims Adjuster (Värderare)](internal/claims-adjuster.md)              | Internal | Motor       | Specialized vehicle damage assessor                 |
| [Underwriter (Riskbedömare)](internal/underwriter.md)                   | Internal | Motor, Home | Assesses risk, sets premiums and terms              |
| [Actuary](internal/actuary.md)                                          | Internal | Motor       | Develops pricing models and analyzes claims data    |
| [Compliance Officer](internal/compliance-officer.md)                    | Internal | Motor       | Ensures regulatory adherence                        |
| [System Administrator](internal/system-administrator.md)                | Internal | Motor       | Manages platform configuration and access           |
| [Transportstyrelsen](external/transportstyrelsen.md)                    | External | Motor       | Swedish Transport Agency — vehicle registry         |
| [TFF](external/tff.md)                                                  | External | Motor       | Swedish Motor Insurers — uninsured claims           |
| [BankID](external/bankid.md)                                            | External | Motor       | Electronic identification and signing               |
| [Repair Shop (Verkstad)](external/repair-shop.md)                       | External | Motor       | Authorized vehicle repair network                   |
| [Police (Polis)](external/police.md)                                    | External | Motor       | Accident reports and fraud investigation            |
| [Medical Provider (Vårdgivare)](external/medical-provider.md)           | External | Motor       | Injury treatment and medical reports                |
| [Payment Provider](external/payment-provider.md)                        | External | Motor       | Payment processing for premiums and claims          |
| [BRF Board (BRF-styrelse)](external/brf-board.md)                       | External | Home        | Tenant-owner association — building insurance       |
| [Restoration Company (Saneringsfirma)](external/restoration-company.md) | External | Home        | Professional restoration — water, fire, mold        |
| [Property Inspector (Besiktningsman)](external/property-inspector.md)   | External | Home        | Certified property condition inspector              |
| [Locksmith (Låssmed)](external/locksmith.md)                            | External | Home        | Emergency lock replacement after burglary           |
| [Fire Department (Räddningstjänsten)](external/fire-department.md)      | External | Home        | First responder — incident reports for claims       |
| [Lantmäteriet](external/lantmateriet.md)                                | External | Home        | Swedish cadastral authority — property records      |
| [Building Committee (Byggnadsnämnd)](external/building-committee.md)    | External | Home        | Municipal authority — building permits and codes    |

## Internal vs External Actors

**Internal actors** are people within TryggFörsäkring or its distribution
network who use the platform directly. They authenticate via BankID or
organizational credentials and have role-based access to platform functionality.

**External actors** are systems, organizations, or third parties that the
platform integrates with through APIs, file exchanges, or manual processes. They
do not log in to the platform directly but are essential participants in
insurance business processes.
