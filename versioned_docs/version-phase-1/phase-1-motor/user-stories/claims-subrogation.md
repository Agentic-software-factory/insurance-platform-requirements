---
sidebar_position: 18
---

# US-CLM-009: Recover Costs Through Subrogation

## User Story

**As a** claims handler (skadereglerare),
**I want to** initiate recovery of settlement costs from at-fault third parties or their insurers,
**so that** TryggFörsäkring recovers costs it is entitled to under Swedish law.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal-actors.md#claims-handler-skadereglerare)
- **Supporting:** [TFF](../../actors/external-actors.md#trafikförsäkringsföreningen-tff)

## Priority

**Should Have** — Subrogation recovery directly impacts the company's loss ratio and financial performance.

## Acceptance Criteria

- **GIVEN** a claim has been settled where a third party was at fault
  **WHEN** the claims handler reviews the claim
  **THEN** the system flags the claim as eligible for subrogation (regressrätt) and displays the recoverable amount based on the liability split

- **GIVEN** a subrogation-eligible claim is identified
  **WHEN** the claims handler initiates subrogation
  **THEN** the system records the target party (at-fault driver, their insurer), the amount to be recovered, and the legal basis for recovery

- **GIVEN** subrogation involves another Swedish insurer
  **WHEN** the claims handler sends a recovery request
  **THEN** the system supports inter-company claims settlement via TFF-defined processes and formats

- **GIVEN** a subrogation payment is received
  **WHEN** the payment is recorded
  **THEN** the system updates the claim record with the recovered amount, adjusts the net claim cost, and closes the subrogation case

- **GIVEN** a subrogation attempt is unsuccessful
  **WHEN** the claims handler records the outcome
  **THEN** the system records the reason (uninsured party, disputed liability, uncollectible) and closes the subrogation case with the unrecovered amount documented

## Subrogation Process Steps

| Step | Actor          | Action                                                               | System Response                                 |
| ---- | -------------- | -------------------------------------------------------------------- | ----------------------------------------------- |
| 1    | System         | Flags settled claim as subrogation-eligible based on liability split | Displays recoverable amount and target party    |
| 2    | Claims Handler | Reviews subrogation opportunity and confirms pursuit                 | Creates a subrogation case linked to the claim  |
| 3    | Claims Handler | Sends demand letter to at-fault party or their insurer               | Records demand date, amount, and recipient      |
| 4    | Claims Handler | Tracks response (accepted, disputed, or no response)                 | Updates subrogation case status                 |
| 5a   | Claims Handler | Records payment received (full or partial)                           | Adjusts net claim cost; closes subrogation case |
| 5b   | Claims Handler | Records dispute or non-response                                      | Escalates or writes off; documents reason       |
| 6    | Claims Handler | Closes subrogation case                                              | Final recovery amount recorded                  |

### Recovery Amount Calculation

```text
Recoverable Amount = Settlement Paid × At-Fault Party's Liability %
```

- If the policyholder's deductible was part of the settlement, the deductible amount is also included in the recovery demand
- Recovery is pursued from the at-fault party's insurer (inter-company settlement via TFF processes) or directly from uninsured at-fault parties

### Inter-Company Settlement (via TFF)

- Recovery demands between Swedish insurers follow TFF-defined formats and timelines
- Standard response time: 30 days from demand letter
- Disputes are resolved through TFF's inter-company arbitration process
- Foreign insurer claims follow the green card system coordination

### Write-Off Criteria

| Scenario                                      | Action                                         |
| --------------------------------------------- | ---------------------------------------------- |
| At-fault party is uninsured and uncollectible | Write off after documented collection attempts |
| Liability is disputed and arbitration fails   | Write off the disputed portion                 |
| Recovery cost exceeds recoverable amount      | Write off (de minimis threshold: SEK 2,000)    |
| Statute of limitations reached                | Write off with documented reason               |

## Regulatory

- **FSA-010** — Fair claims settlement: subrogation activities must not delay settlement to the policyholder; the policyholder must be made whole first
- **FSA-014** — Record keeping: all subrogation records, communications, and outcomes must be retained for 10 years
- **GDPR-003** — Claims processing: personal data shared with third-party insurers for subrogation must have a lawful basis (contract performance, legal obligation)
- **GDPR-001** — Data shared in subrogation must follow data minimization — only share what is necessary for the recovery claim

## Dependencies

- Depends on US-CLM-004 (Liability Determination) — liability must be established before subrogation
- Depends on US-CLM-008 (Settlement) — settlement must be paid before pursuing recovery
- TFF integration for inter-company settlement

## Notes

- Under Swedish law, the insurer may subrogate to the policyholder's rights against a third party after paying the claim
- Subrogation does not apply to trafikförsäkring personal injury claims between insurers in the same way — these follow Trafikskadelagen rules
- The customer's deductible should also be recovered in the subrogation process where possible
