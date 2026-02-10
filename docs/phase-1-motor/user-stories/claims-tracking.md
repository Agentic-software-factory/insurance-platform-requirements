---
sidebar_position: 22
---

# US-CLM-013: Track Claim Status

## User Story

**As a** customer (privatkund),
**I want to** track my claim status online,
**so that** I know what is happening with my claim without calling customer service.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)

## Priority

**Should Have** — Claim tracking improves customer experience and reduces call center volume.

## Acceptance Criteria

- **GIVEN** a customer has an active claim
  **WHEN** the customer logs in and navigates to claims
  **THEN** the system displays all the customer's claims with their current status, claim number, and claim type

- **GIVEN** a customer views a specific claim
  **WHEN** the customer opens the claim details
  **THEN** the system displays: claim status, a timeline of status changes with dates, the assigned handler's name, any outstanding information requests, the applicable deductible (självrisk), and estimated settlement amount (when available)

- **GIVEN** a claim status changes
  **WHEN** the system updates the claim
  **THEN** the customer receives a notification (email or push notification based on preferences) with the new status and any action required from the customer

- **GIVEN** a claim has an outstanding information request
  **WHEN** the customer views the claim
  **THEN** the system clearly displays what additional information or documents are needed and allows the customer to upload them directly

- **GIVEN** a claim has been settled
  **WHEN** the customer views the claim
  **THEN** the system displays the final settlement amount, payment date, and payment method

## Customer-Visible Claim Statuses

| Status                 | Swedish Term        | Description                                                        | Customer Action Required                |
| ---------------------- | ------------------- | ------------------------------------------------------------------ | --------------------------------------- |
| Registered             | Registrerad         | Claim has been received and registered                             | None -- await handler assignment        |
| Under Review           | Under utredning     | Claim is being investigated by the claims team                     | May be asked for additional information |
| Additional Info Needed | Komplettering krävs | The claims team needs more information or documents                | Upload documents or provide information |
| Approved               | Godkänd             | Claim has been approved for settlement                             | None -- settlement is being calculated  |
| Payment Pending        | Utbetalning pågår   | Settlement has been calculated and payment is being processed      | None -- payment is in transit           |
| Settled                | Reglerad            | Payment has been completed                                         | None -- claim is complete               |
| Denied                 | Nekad               | Claim has been denied                                              | May file a complaint or appeal          |
| Closed                 | Stängd              | Claim is fully closed (settled or denied, all follow-ups complete) | None                                    |

### Notification Rules

| Event                     | Notification Channel            | Timing                            |
| ------------------------- | ------------------------------- | --------------------------------- |
| Claim registered          | Email + push notification       | Immediately after registration    |
| Handler assigned          | Email                           | Within 1 business day             |
| Status change             | Email + push notification       | Within 1 hour of status change    |
| Additional info requested | Email + push notification + SMS | Immediately                       |
| Claim approved            | Email + push notification       | Immediately                       |
| Payment initiated         | Email                           | When payment is sent              |
| Payment confirmed         | Email + push notification       | When payment provider confirms    |
| Claim denied              | Email + letter                  | Within 1 business day of decision |
| Claim closed              | Email                           | At closure                        |

### Customer Portal Features

- Claims list with filtering by status and date range
- Claim detail view with full timeline of status changes
- Document upload capability for responding to information requests
- Settlement breakdown view (when available)
- Contact information for assigned claims handler
- Link to complaints procedure (for denied or disputed claims)
- Push notification preferences management

## Regulatory

- **FSA-010** — Fair and timely claims settlement: customers must be kept informed of claim progress
- **FSA-004** — Consumer protection: claim status information must be clear and in plain language
- **GDPR-003** — Claims processing: the customer's view must only display their own claim data; access requires authentication via BankID

## Dependencies

- Depends on US-CLM-001 (FNOL) and US-CLM-002 (Claim Registration)
- BankID integration for customer authentication

## Notes

- Third-party claimants (not policyholders) should also have limited claim tracking capability for their filed claims
- The claims handler's internal notes and fraud investigation details must never be visible to the customer
