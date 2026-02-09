---
sidebar_position: 21
---

# US-CLM-012: Handle Personal Injury Claims Under Trafikförsäkring

## User Story

**As a** claims handler (skadereglerare),
**I want to** process personal injury claims under trafikförsäkring with appropriate medical documentation and compensation schedules,
**so that** injured parties receive fair compensation as required by Trafikskadelagen.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [Medical Provider (Vårdgivare)](../../actors/external-actors.md#medical-provider-vårdgivare), [Customer (Privatkund)](../../actors/internal-actors.md#customer-privatkund)

## Priority

**Must Have** — Personal injury claims under trafikförsäkring are legally mandated with a 10-year claim window.

## Acceptance Criteria

- **GIVEN** a claim involves personal injury from a traffic incident
  **WHEN** the claims handler registers the injury claim
  **THEN** the system creates a personal injury claim record linked to the main claim, with separate tracking for medical documentation and injury-specific compensation

- **GIVEN** a personal injury claim requires medical documentation
  **WHEN** the claims handler requests medical records
  **THEN** the system sends a consent-based request to the medical provider and tracks the document request status

- **GIVEN** medical documentation has been received
  **WHEN** the claims handler reviews the injury claim
  **THEN** the system stores the medical documentation under special category data protection (GDPR Article 9) with restricted access limited to authorized claims handlers

- **GIVEN** a personal injury settlement is being calculated
  **WHEN** the claims handler processes the injury claim
  **THEN** the system supports calculation of compensation components: medical costs (sjukvårdskostnader), income loss (inkomstförlust), pain and suffering (sveda och värk), and permanent disability (invaliditet)

- **GIVEN** a personal injury claimant is not the policyholder
  **WHEN** a third-party injured person files a claim
  **THEN** the system allows the third party to file directly against the policyholder's trafikförsäkring, as mandated by Trafikskadelagen

- **GIVEN** a personal injury claim has a long recovery period
  **WHEN** the claims handler manages the claim over time
  **THEN** the system supports interim payments and keeps the claim open for the duration of treatment, up to the 10-year limitation period

## Compensation Components

| Component            | Swedish Term            | Description                                    |
| -------------------- | ----------------------- | ---------------------------------------------- |
| Medical costs        | Sjukvårdskostnader      | Actual medical treatment costs                 |
| Income loss          | Inkomstförlust          | Lost earnings during recovery                  |
| Pain and suffering   | Sveda och värk          | Compensation for pain during the acute phase   |
| Permanent disability | Invaliditet             | Compensation for lasting impairment            |
| Loss of amenity      | Lyte och men            | Compensation for reduced quality of life       |
| Future income loss   | Framtida inkomstförlust | Long-term earnings reduction due to disability |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: personal injury claims must be handled fairly with particular care given the vulnerability of injured claimants
- **FSA-007** — Mandatory trafikförsäkring: personal injury coverage is the core purpose of trafikförsäkring under Trafikskadelagen
- **FSA-014** — Record keeping: personal injury claim records must be retained for 10 years from claim closure (Trafikskadelagen allows claims up to 10 years after the injury)
- **GDPR-003** — Claims processing: medical data is special category personal data (Article 9) requiring explicit consent or legal obligation basis
- **GDPR-001** — Data minimization: collect only medical data directly relevant to the injury claim; do not request the claimant's full medical history

## Dependencies

- Depends on US-CLM-002 (Claim Registration)
- Depends on US-CLM-004 (Liability Determination) — though trafikförsäkring injury liability is strict
- Medical provider integration for medical records exchange

## Notes

- Under Trafikskadelagen, personal injury liability is strict — the insurer must compensate the injured party regardless of fault
- Personal injury claims often remain open for extended periods (months to years) due to ongoing treatment
- The 10-year limitation period means claims can be filed long after the original policy period has ended
- Medical data must be stored with the highest level of access control and is subject to DPIA requirements
