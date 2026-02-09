---
sidebar_position: 10
---

# US-CLM-001: Report a Claim Online (FNOL)

## User Story

**As a** customer (privatkund),
**I want to** report a motor insurance claim online with photos and incident details,
**so that** the claims process starts immediately without waiting for office hours.

## Actors

- **Primary:** [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)
- **Supporting:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)

## Priority

**Must Have** — FNOL is the entry point for all claims processing.

## Acceptance Criteria

- **GIVEN** a customer has an active motor insurance policy
  **WHEN** the customer opens the claims reporting form (skadeanmälan) on web or mobile
  **THEN** the system displays claim types matching the customer's coverage tier (trafikförsäkring, halvförsäkring, or helförsäkring)

- **GIVEN** a customer is filling out the FNOL form
  **WHEN** the customer enters incident details (date, time, location, description)
  **THEN** the system validates that the incident date falls within the policy's active coverage period

- **GIVEN** a customer is reporting a claim
  **WHEN** the customer uploads photos of the damage
  **THEN** the system accepts common image formats (JPEG, PNG, HEIF) up to a configurable maximum file size and stores them linked to the claim record

- **GIVEN** a customer has completed the FNOL form
  **WHEN** the customer submits the claim report
  **THEN** the system creates a claim record with a unique claim number (skadenummer), links it to the policy, and sends the customer a confirmation with the claim number

- **GIVEN** a claim has been submitted
  **WHEN** the system processes the new claim
  **THEN** the system assigns the claim to a claims handler based on claim type and workload rules

- **GIVEN** a customer must verify their identity for the claim
  **WHEN** the customer signs in
  **THEN** the system authenticates the customer via [BankID](../../actors/external-actors.md#bankid)

## Claim Types Supported

The FNOL form must support the following motor claim types:

| Claim Type            | Swedish Term | Coverage Required               |
| --------------------- | ------------ | ------------------------------- |
| Collision             | Vagnskada    | Helförsäkring                   |
| Theft                 | Stöld        | Halvförsäkring or Helförsäkring |
| Fire                  | Brand        | Halvförsäkring or Helförsäkring |
| Glass damage          | Glasskada    | Halvförsäkring or Helförsäkring |
| Natural damage        | Naturskada   | Halvförsäkring or Helförsäkring |
| Animal collision      | Viltskada    | Halvförsäkring or Helförsäkring |
| Third-party liability | Trafikskada  | Trafikförsäkring                |
| Personal injury       | Personskada  | Trafikförsäkring                |
| Roadside assistance   | Vägassistans | Halvförsäkring or Helförsäkring |

## Data Captured at FNOL

| Field                  | Required    | Description                            |
| ---------------------- | ----------- | -------------------------------------- |
| Incident date and time | Yes         | When the event occurred                |
| Incident location      | Yes         | Address or coordinates                 |
| Incident description   | Yes         | Free-text description of what happened |
| Claim type             | Yes         | Selected from coverage-eligible types  |
| Police report number   | Conditional | Required for theft, third-party claims |
| Other parties involved | Conditional | Name, registration number, insurer     |
| Witness information    | No          | Name and contact details               |
| Photos                 | No          | Damage photos, scene photos            |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the claims process must begin promptly upon FNOL
- **FSA-014** — Record keeping: the FNOL and all associated data must be retained for 10 years
- **GDPR-003** — Claims processing: personal data collected at FNOL must follow data minimization principles; collect only what is necessary for the claim
- **GDPR-001** — Customer identity verification via BankID before claim submission
- **IDD-005** — Claims handling disclosure: the IPID must have informed the customer about how to make a claim (pre-purchase)

## Dependencies

- Active policy must exist (depends on Quote and Bind — Issue #10)
- Actor definitions (depends on Actors — Issue #5)
- BankID integration for identity verification

## Notes

- Customers may also report claims by phone; the claims handler uses the same underlying claim registration process (see [US-CLM-002](claims-registration.md))
- Third-party claimants (not policyholders) may also submit FNOL for trafikförsäkring claims; these follow a different identity verification flow
