---
sidebar_position: 39
---

# US-HCF-010: Manage Multi-Unit Claims

## User Story

**As a** claims handler (skadereglerare),
**I want to** manage multi-unit claims (e.g., apartment building fire affecting multiple households),
**so that** all affected policyholders are handled fairly and coordination is maintained.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md), [BRF Board (BRF-styrelse)](../../actors/external/brf-board.md)

## Priority

**Must Have** — Apartment building fires and natural events can affect dozens of policyholders simultaneously. Without coordinated claims handling, individual customers receive inconsistent treatment and the insurer faces operational chaos.

## Acceptance Criteria

- **GIVEN** a fire/natural event affects multiple units in the same building
  **WHEN** the claims handler identifies the multi-unit impact
  **THEN** the system creates a parent event record (katastrof/storskada) and links all individual claims to it for coordinated management

- **GIVEN** a parent event record exists
  **WHEN** additional affected policyholders report claims
  **THEN** the system automatically suggests linking the new claim to the existing parent event based on matching property address and incident date

- **GIVEN** multiple claims are linked to a parent event
  **WHEN** the claims handler views the event dashboard
  **THEN** the system displays: total number of affected units, claim status per unit, total estimated cost, shared contractor assignments, and overall timeline

- **GIVEN** a multi-unit event involves a BRF building
  **WHEN** the claims handler coordinates with the BRF board
  **THEN** the system records the BRF building insurance policy, identifies the boundary between BRF building insurance (structural) and individual bostadsrättsförsäkring (interior/contents), and tracks settlement for each layer

- **GIVEN** a multi-unit event requires coordinated contractor work
  **WHEN** the claims handler assigns contractors
  **THEN** the system supports assigning a shared contractor for building-level repairs (roof, structure, shared spaces) while allowing individual contractors for unit-level repairs

- **GIVEN** a catastrophe event (katastrof) is declared for a large-scale natural event
  **WHEN** the system activates catastrophe response
  **THEN** the system enables: bulk claim registration, simplified FNOL for affected policyholders, dedicated claims team assignment, and aggregate reserve reporting per FSA-018

## Regulatory

- **FSA-010** — Fair and timely claims settlement: all affected policyholders must receive fair and consistent treatment; coordination must not delay individual settlements
- **FSA-018** — Natural disaster reserves: multi-unit and catastrophe events must be tracked for reserve management and FSA catastrophe reporting
- **FSA-004** — Consumer protection: each affected customer must receive individual communication and support, even in a coordinated event
- **GDPR-003** — Claims processing: personal data from individual claims must not be shared between affected policyholders; each claim is confidential
- **FSA-014** — Record keeping: the parent event record and all linked claims must be retained for 10 years

## Dependencies

- Depends on US-HCF-001 (Report Fire or Natural Event Emergency)
- Depends on US-HCF-003 (Classify Event Type and Coverage)
- BRF board actor definition
- Catastrophe event register

## Notes

- In Sweden, apartment building fires typically affect 5-20 units; large-scale storms or flooding can affect hundreds or thousands of properties
- The BRF building insurance and individual bostadsrättsförsäkring policies may be with different insurers, requiring cross-company coordination
- Catastrophe response may involve external resources (e.g., Svensk Försäkring's catastrophe coordination, municipal housing services)
- Individual claims privacy must be maintained even within a coordinated event — one customer's claim details must not be visible to another
