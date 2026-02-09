---
sidebar_position: 11
---

# US-CLM-002: Register and Manage Claims

## User Story

**As a** claims handler (skadereglerare),
**I want to** see all policy details and coverage at claim registration,
**so that** I can verify coverage quickly and register the claim accurately.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)

## Priority

**Must Have** — Claim registration is the foundation for all subsequent claims processing.

## Acceptance Criteria

- **GIVEN** a claims handler opens a new or incoming FNOL
  **WHEN** the handler views the claim
  **THEN** the system displays the linked policy details including: coverage tier, active coverages, deductible amounts (självrisk), policy start and end dates, bonus class, and named drivers

- **GIVEN** a claims handler is registering a claim
  **WHEN** the handler confirms the claim type
  **THEN** the system automatically verifies that the policy's coverage tier includes the reported claim type and displays a clear coverage confirmation or denial indicator

- **GIVEN** a claim involves a phone-reported incident (not self-service FNOL)
  **WHEN** the claims handler enters the incident details manually
  **THEN** the system creates a claim record using the same data structure and validation rules as the online FNOL form

- **GIVEN** a claim has been registered
  **WHEN** the claims handler reviews the claim
  **THEN** the system displays the claim status, all attached documents, the incident timeline, and the assigned handler

- **GIVEN** multiple claims exist for the same policy
  **WHEN** the claims handler views the policy
  **THEN** the system displays the complete claim history for that policy, sortable by date and status

- **GIVEN** a claim requires additional information
  **WHEN** the claims handler requests documents from the customer
  **THEN** the system sends a notification to the customer specifying which documents are needed and tracks the outstanding request

## Claim Status Lifecycle

Claims follow this status progression:

| Status                 | Swedish Term          | Description                         |
| ---------------------- | --------------------- | ----------------------------------- |
| Registered             | Registrerad           | Claim received and recorded         |
| Under investigation    | Under utredning       | Handler is investigating            |
| Awaiting information   | Väntar på information | Documents or details needed         |
| Assessment in progress | Under värdering       | Damage being assessed               |
| Decision pending       | Beslut väntande       | Ready for approve/deny decision     |
| Approved               | Godkänd               | Claim approved for settlement       |
| Denied                 | Avslagen              | Claim denied with documented reason |
| Settled                | Reglerad              | Payment made, claim completed       |
| Closed                 | Stängd                | Claim finalized and closed          |
| Reopened               | Återöppnad            | Previously closed claim reopened    |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: claims must be registered promptly and handled without undue delay
- **FSA-014** — Record keeping: all claim records, status changes, and communications must be retained for 10 years after claim closure
- **GDPR-003** — Claims processing: access to claim data must be limited to authorized claims staff; personal data must follow purpose limitation
- **GDPR-001** — Data minimization: only collect information necessary for the claim investigation

## Dependencies

- Depends on US-CLM-001 (FNOL) for online-submitted claims
- Requires access to policy data (depends on Quote and Bind — Issue #10)

## Notes

- Claims handlers must be able to register claims for both policyholders and third-party claimants
- The claim record must support linking to external references: police report numbers, medical record references, repair shop estimates
