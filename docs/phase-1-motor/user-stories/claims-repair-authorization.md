---
sidebar_position: 23
---

# US-CLM-014: Authorize Repairs at Network Shops

## User Story

**As a** claims handler (skadereglerare),
**I want to** authorize repairs at network shops with direct billing,
**so that** the customer gets fast service and only pays the deductible.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [Repair Shop (Verkstad)](../../actors/external/repair-shop.md), [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Should Have** — Direct repair authorization streamlines the customer experience and controls repair costs.

## Acceptance Criteria

- **GIVEN** a claim has been approved and repair is needed
  **WHEN** the claims handler selects a repair approach
  **THEN** the system displays a list of authorized network repair shops, with the option to filter by location, availability, and specialization

- **GIVEN** the claims handler selects a network repair shop
  **WHEN** the handler authorizes the repair
  **THEN** the system sends a repair authorization to the shop including: claim number, vehicle details, approved repair scope, maximum authorized amount, and the customer's contact information

- **GIVEN** a repair authorization has been sent
  **WHEN** the repair shop accepts the assignment
  **THEN** the system updates the claim status and notifies the customer with the shop's name, address, and contact details

- **GIVEN** the repair is complete
  **WHEN** the repair shop submits the final invoice
  **THEN** the system validates the invoice against the authorized amount, processes payment to the shop (minus the customer's deductible), and records the transaction

- **GIVEN** the repair cost exceeds the authorized amount
  **WHEN** the repair shop requests additional authorization
  **THEN** the system routes the request to the claims handler for approval before the shop proceeds with additional work

- **GIVEN** the customer chooses a non-network repair shop
  **WHEN** the customer submits the repair invoice for reimbursement
  **THEN** the system processes reimbursement to the customer (repair cost minus deductible) after validation of the invoice

## Regulatory

- **FSA-010** — Fair claims settlement: customers must have the option to choose their own repair shop, even if direct billing is only available at network shops
- **FSA-004** — Consumer protection: the customer must be informed of the difference between network and non-network repair options
- **GDPR-003** — Claims processing: personal data shared with repair shops must be limited to what is necessary for the repair (data minimization)
- **GDPR-001** — Data processing agreements must be in place with all network repair shops

## Dependencies

- Depends on US-CLM-007 (Claims Decision) — claim must be approved
- Depends on US-CLM-005 (Damage Assessment) — repair scope must be defined
- Repair shop integration for authorization and invoicing

## Notes

- Network repair shops have pre-agreed labor rates and parts pricing, which helps control costs
- Glass-only claims typically go directly to authorized glass repair shops (e.g., Carglass, Ryds Bilglas) with a simplified authorization process
- Rental car arrangement during repair may be covered under the policy — this should be coordinated with the repair authorization
