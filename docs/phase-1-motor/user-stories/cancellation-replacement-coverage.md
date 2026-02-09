---
sidebar_position: 34
---

# US-CAN-005: Verify Replacement Trafikförsäkring Before Cancellation

## User Story

**As the** system,
**I want to** verify that replacement trafikförsäkring is in place before allowing cancellation of mandatory motor insurance,
**so that** no coverage gap exists and the vehicle owner is not in breach of Trafikskadelagen.

## Actors

- **Primary:** System
- **Supporting:** [Transportstyrelsen](../../actors/external-actors.md#transportstyrelsen), [Trafikförsäkringsföreningen (TFF)](../../actors/external-actors.md#trafikförsäkringsföreningen-tff)

## Priority

**Must Have** — Trafikförsäkring is mandatory for all registered vehicles in Sweden; a coverage gap exposes the vehicle owner to TFF penalties and personal liability.

## Acceptance Criteria

- **GIVEN** a customer requests cancellation of a policy that includes trafikförsäkring
  **WHEN** the system evaluates the cancellation request
  **THEN** the system checks whether replacement trafikförsäkring is registered for the vehicle at Transportstyrelsen

- **GIVEN** replacement trafikförsäkring is confirmed for the vehicle
  **WHEN** the cancellation is processed
  **THEN** the system allows the cancellation to proceed with the effective date aligned to the replacement coverage start date

- **GIVEN** no replacement trafikförsäkring is found and the vehicle is still registered
  **WHEN** the system evaluates the cancellation
  **THEN** the system blocks the cancellation and informs the customer that trafikförsäkring is mandatory for registered vehicles

- **GIVEN** the vehicle has been deregistered or scrapped
  **WHEN** the system evaluates the cancellation
  **THEN** the system waives the replacement coverage check and allows cancellation (see [US-CAN-004](cancellation-vehicle-deregistered.md))

- **GIVEN** the customer is exercising ångerrätt (cooling-off)
  **WHEN** the cancellation is processed for a policy with trafikförsäkring
  **THEN** the system still requires proof of replacement coverage or vehicle deregistration before finalising

## Business Rules

| Rule       | Description                                                                                                      |
| ---------- | ---------------------------------------------------------------------------------------------------------------- |
| BR-CAN-017 | Trafikförsäkring cannot be cancelled for a registered vehicle without replacement coverage                       |
| BR-CAN-018 | The system must query Transportstyrelsen or accept customer-provided proof of new coverage                       |
| BR-CAN-019 | If the customer cannot provide proof, the cancellation is held pending for a configurable period (e.g., 14 days) |
| BR-CAN-020 | Voluntary coverage (helförsäkring, halvförsäkring) can be cancelled independently of trafikförsäkring            |

## Regulatory

- **FSA-007** — Mandatory trafikförsäkring: all registered vehicles must have valid trafikförsäkring at all times
- **FSA-008** — TFF membership: TryggFörsäkring must report to TFF when trafikförsäkring ceases, and TFF will charge the vehicle owner if no replacement is found
- **FSA-009** — Transportstyrelsen notification: the platform must verify coverage status via the Transport Agency
- **FSA-013** — Cancellation rights: even during ångerrätt, the trafikförsäkring obligation remains for registered vehicles

## Dependencies

- Transportstyrelsen integration for replacement coverage verification
- TFF reporting integration for uninsured vehicle notification
- All cancellation user stories depend on this verification step

## Notes

- This is a system-level verification that applies across all cancellation scenarios for policies including trafikförsäkring
- The customer may provide a policy number from the new insurer as proof if the Transportstyrelsen integration is not yet available
- TFF charges (trafikförsäkringsavgift) are significantly higher than normal premiums and serve as an incentive for the vehicle owner to maintain coverage
