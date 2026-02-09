---
sidebar_position: 35
---

# US-CAN-006: Notify Transportstyrelsen of Policy Cancellation

## User Story

**As the** system,
**I want to** notify Transportstyrelsen when a motor insurance policy is cancelled,
**so that** the national vehicle registry is updated and regulatory reporting obligations are met.

## Actors

- **Primary:** System
- **Supporting:** [Transportstyrelsen](../../actors/external-actors.md#transportstyrelsen), [Trafikförsäkringsföreningen (TFF)](../../actors/external-actors.md#trafikförsäkringsföreningen-tff)

## Priority

**Must Have** — Notification to Transportstyrelsen is a legal obligation under Trafikskadelagen.

## Acceptance Criteria

- **GIVEN** a motor insurance policy has been cancelled (regardless of reason)
  **WHEN** the cancellation is finalised
  **THEN** the system sends a cancellation notification to Transportstyrelsen within the required timeframe

- **GIVEN** the cancellation includes trafikförsäkring
  **WHEN** the notification is sent
  **THEN** the system includes the vehicle registration number, policy number, cancellation effective date, and cancellation reason in the notification

- **GIVEN** the Transportstyrelsen notification fails (e.g., system unavailable)
  **WHEN** the notification cannot be delivered
  **THEN** the system queues the notification for automatic retry and alerts operations staff

- **GIVEN** a cancellation has been reported to Transportstyrelsen
  **WHEN** no replacement coverage is registered within the grace period
  **THEN** the system reports the uninsured vehicle to TFF for trafikförsäkringsavgift collection

- **GIVEN** a cancellation notification has been sent
  **WHEN** operations staff reviews the notification log
  **THEN** the system provides a complete audit trail of all notifications sent, including timestamps and delivery status

## Business Rules

| Rule       | Description                                                                                |
| ---------- | ------------------------------------------------------------------------------------------ |
| BR-CAN-021 | Cancellation notification must be sent to Transportstyrelsen within the same business day  |
| BR-CAN-022 | The notification must include: vehicle registration, policy number, effective date, reason |
| BR-CAN-023 | Failed notifications must be retried automatically with exponential backoff                |
| BR-CAN-024 | If a vehicle remains uninsured, TFF must be notified per membership obligations            |

## Regulatory

- **FSA-009** — Transportstyrelsen notification: the insurer must report all policy starts and terminations to the Transport Agency
- **FSA-008** — TFF membership: TryggFörsäkring must report uninsured vehicles to TFF
- **FSA-014** — Record keeping: notification records must be retained for 10 years
- **GDPR-004** — Transportstyrelsen and TFF reporting: data shared with authorities is processed under legal obligation (GDPR Art. 6(1)(c))

## Dependencies

- Transportstyrelsen integration (API or file-based reporting)
- TFF reporting integration
- All cancellation scenarios trigger this notification

## Notes

- Transportstyrelsen integration may initially be file-based (batch reporting) and later upgraded to real-time API
- The notification triggers TFF follow-up if no replacement coverage is found — this is outside TryggFörsäkring's control but must be reported
