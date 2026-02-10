---
sidebar_position: 19
---

# US-CLM-010: Update Bonus Class After Claim

## User Story

**As the** system,
**I want to** recalculate the customer's bonus class after a claim is settled,
**so that** future premiums correctly reflect the customer's updated claims history.

## Actors

- **Primary:** System (automated process)
- **Supporting:** [Underwriter (Riskbedömare)](../../actors/internal/underwriter.md), [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Bonus class is the primary premium adjustment mechanism in Swedish motor insurance.

## Acceptance Criteria

- **GIVEN** a claim has been settled (status "Settled" / Reglerad)
  **WHEN** the system processes the settlement
  **THEN** the system recalculates the policyholder's bonus class according to the bonus class rules, applying the appropriate penalty for the claim type

- **GIVEN** a claim type that does not affect bonus (e.g., glass-only, animal collision)
  **WHEN** the system evaluates bonus impact
  **THEN** the bonus class remains unchanged and the system records that the claim was bonus-neutral

- **GIVEN** a claim type that does affect bonus (e.g., collision at fault)
  **WHEN** the system recalculates the bonus class
  **THEN** the bonus class is reduced by the configured number of steps (typically 3 steps down for a collision claim) and the new bonus class is recorded on the policy

- **GIVEN** a bonus class change has been applied
  **WHEN** the customer views their policy
  **THEN** the updated bonus class is displayed along with a notification explaining the change and its effect on the next renewal premium

- **GIVEN** a claim is denied or withdrawn
  **WHEN** the system evaluates bonus impact
  **THEN** the bonus class is not affected

## Bonus Class Rules (Typical)

| Event                                  | Bonus Impact            |
| -------------------------------------- | ----------------------- |
| Claim-free year                        | +1 step (up to maximum) |
| At-fault collision (vagnskada)         | −3 steps                |
| Third-party liability claim (at fault) | −3 steps                |
| Glass-only claim (glasskada)           | No impact               |
| Animal collision (viltskada)           | No impact               |
| Theft (stöld)                          | No impact               |
| Fire (brand)                           | No impact               |
| Natural damage                         | No impact               |
| Roadside assistance (vägassistans)     | No impact               |

## Bonus Class Scale (Example)

| Class       | Premium Discount  | Years Claim-Free to Reach            |
| ----------- | ----------------- | ------------------------------------ |
| 1 (lowest)  | 0% (base premium) | N/A (entry or after multiple claims) |
| 2           | ~10%              | 1 claim-free year from class 1       |
| 3           | ~20%              | 1 claim-free year from class 2       |
| 4           | ~30%              | 1 claim-free year from class 3       |
| 5           | ~40%              | 1 claim-free year from class 4       |
| 6           | ~50%              | 1 claim-free year from class 5       |
| 7 (highest) | ~60%              | 1 claim-free year from class 6       |

### Recalculation Timing Rules

- Bonus class recalculation is triggered when a claim status changes to "Settled" (Reglerad)
- The new bonus class takes effect at the next renewal date (huvudförfallodag), not immediately
- If multiple claims settle in the same policy year, each claim applies its penalty sequentially (e.g., two at-fault collisions = -6 steps total)
- Bonus class cannot go below class 1 (floor) or above class 7 (ceiling)

### Bonus Protection (Bonusskydd)

- If the policyholder has purchased bonusskydd as an add-on, the first bonus-affecting claim in a policy year does not reduce the bonus class
- Bonus protection resets at each renewal — it covers one claim per policy year
- Bonus protection must be checked before applying any penalty
- The system must record whether bonus protection was applied or not for audit purposes

### Customer Notification Requirements

- When a bonus class change is applied, the customer must be notified in writing (email or letter)
- The notification must include: current bonus class, new bonus class, reason for change, estimated premium impact at next renewal, and information about how to dispute the change
- Notification must be sent within 10 business days of the bonus class recalculation

## Regulatory

- **FSA-004** — Consumer protection: bonus class rules must be transparent and communicated to the customer at policy inception and at renewal
- **FSA-010** — Fair claims settlement: bonus impact must be clearly communicated to the customer after a claim
- **FSA-014** — Record keeping: bonus class history and all changes must be retained for the duration of the policy plus 10 years
- **GDPR-002** — Policy administration: bonus class data is part of the policy record and follows the same retention rules

## Dependencies

- Depends on US-CLM-008 (Settlement) — bonus is recalculated after settlement
- Bonus class rules defined by underwriting (depends on underwriting guidelines)
- TFF bonus class transfer process for customers switching insurers

## Notes

- When a customer switches insurers, TFF coordinates the transfer of bonus class history between companies
- Some insurers offer "bonus protection" (bonusskydd) as an add-on that prevents the first claim from affecting the bonus class — if offered by TryggFörsäkring, this must be checked before applying a bonus penalty
- Bonus class changes take effect at the next renewal (huvudförfallodag), not immediately
