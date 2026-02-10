---
sidebar_position: 18
---

# US-HCW-009: Approve Repair Scope and Contractor

## User Story

**As a** claims handler (skadereglerare),
**I want to** approve the repair scope and contractor after drying is complete,
**so that** restoration costs are controlled and the customer's property is properly restored.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Repair scope approval is a critical cost control step and ensures the restoration matches the covered damage.

## Acceptance Criteria

- **GIVEN** drying is complete and the final torkprotokoll has been approved
  **WHEN** the claims handler reviews the claim for repair phase
  **THEN** the system presents the damage assessment, approved drying costs, and prompts for repair scope definition

- **GIVEN** a repair scope has been defined
  **WHEN** the claims handler reviews contractor quotes
  **THEN** the system allows the handler to compare quotes, select a contractor, and approve the repair budget

- **GIVEN** the repair cost exceeds a configurable threshold
  **WHEN** the claims handler submits the approval
  **THEN** the system requires senior claims handler authorization before the repair can proceed

- **GIVEN** the claims handler has approved the repair scope
  **WHEN** the approval is confirmed
  **THEN** the system notifies the customer of the approved scope, selected contractor, and estimated repair timeline

- **GIVEN** the customer requests specific materials or finishes beyond standard replacement
  **WHEN** the upgrade cost exceeds the insured replacement value
  **THEN** the system records the customer's choice and calculates the customer's additional out-of-pocket cost (mellanskillnad)

## Repair Approval Thresholds

| Total Repair Cost     | Approval Authority    |
| --------------------- | --------------------- |
| Up to SEK 50,000      | Claims handler        |
| SEK 50,001 -- 200,000 | Senior claims handler |
| Over SEK 200,000      | Claims manager        |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: repair approval must not cause undue delay; the customer is entitled to timely restoration
- **FSA-004** — Consumer protection: the customer must be informed of the approved repair scope and their right to choose a contractor (subject to policy terms)

## Dependencies

- Depends on US-HCW-008 (Submit Drying Protocol) — drying must be complete
- Depends on US-HCW-004 (Receive Moisture Measurement Report) — for damage scope
- Contractor network and pricing agreements

## Notes

- Customers generally have the right to choose their own contractor, but the insurer may limit reimbursement to the cost of a network contractor
- Repair scope must match the original condition — betterment is the customer's responsibility
- For BRF claims, repair scope approval may require coordination between the BRF and individual member
