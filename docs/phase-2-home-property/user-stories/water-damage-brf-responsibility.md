---
sidebar_position: 14
---

# US-HCW-005: Determine BRF vs Individual Responsibility

## User Story

**As a** claims handler (skadereglerare),
**I want to** determine whether the water damage is a building issue (BRF) or an individual issue,
**so that** the correct insurance policy pays and the claim is settled fairly.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [BRF Board (BRF-styrelse)](../../actors/external/brf-board.md), [Property Inspector (Besiktningsman)](../../actors/external/property-inspector.md)

## Priority

**Must Have** — BRF/individual boundary determination is one of the most complex and disputed aspects of water damage claims in Sweden.

## Acceptance Criteria

- **GIVEN** a water damage claim involves a bostadsrätt property
  **WHEN** the claims handler assesses coverage responsibility
  **THEN** the system presents a decision support tool that maps damage cause and location to the standard BRF/individual responsibility boundary based on bostadsrättslagen and the BRF's stadgar

- **GIVEN** the claims handler is determining responsibility
  **WHEN** the damage originates from a shared system (stamledning, gemensamt avlopp, yttertak)
  **THEN** the system defaults to BRF building insurance responsibility and prompts the handler to contact the BRF's insurer for coordination

- **GIVEN** the claims handler is determining responsibility
  **WHEN** the damage originates from the individual apartment's interior (e.g., appliance leak, bathroom membrane installed by the member)
  **THEN** the system defaults to individual bostadsrättsförsäkring responsibility

- **GIVEN** the damage spans both shared and individual areas
  **WHEN** the claims handler identifies a split-responsibility scenario
  **THEN** the system supports recording the responsibility split (percentage or line-item) and creates linked claims against both the BRF building insurance and the individual's policy

- **GIVEN** the BRF and individual parties dispute the responsibility boundary
  **WHEN** the claims handler cannot resolve the dispute
  **THEN** the system escalates the claim to a senior claims handler and optionally engages a besiktningsman for an independent determination

## Responsibility Boundary Guidelines

| Damage Source                           | Typical Responsibility | Notes                                  |
| --------------------------------------- | ---------------------- | -------------------------------------- |
| Stamledning (main pipes)                | BRF building insurance | Shared infrastructure                  |
| Yttertak (roof)                         | BRF building insurance | Building envelope                      |
| Bathroom membrane (original)            | BRF building insurance | Installed at construction              |
| Bathroom membrane (renovated by member) | Individual             | Member responsible for own renovations |
| Appliance in apartment                  | Individual             | Washing machine, dishwasher            |
| Water heater (shared)                   | BRF building insurance | Building utility                       |
| Balcony drainage                        | BRF building insurance | Building structure                     |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the responsibility determination must be transparent and fair to both parties
- **FSA-004** — Consumer protection: the customer must receive a clear explanation of the responsibility determination and their right to dispute it
- **FSA-011** — Complaints handling: if the customer disputes the determination, the complaints process must be accessible

## Dependencies

- Depends on US-HCW-003 (Register FNOL With Damage Classification)
- BRF building insurance policy lookup
- Access to BRF stadgar (articles of association) for specific boundary rules

## Notes

- BRF responsibility boundaries vary between associations — the stadgar may deviate from the default rules in bostadsrättslagen
- The 2003 amendment to bostadsrättslagen shifted some responsibility from BRF to individual members, but many older BRFs have not updated their stadgar
- This is one of the most common sources of disputes and complaints in Swedish home insurance
- When TryggFörsäkring insures both the BRF building and the individual member, coordination is simpler but the fair settlement obligation still applies
