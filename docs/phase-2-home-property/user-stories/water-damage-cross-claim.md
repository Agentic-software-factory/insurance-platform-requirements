---
sidebar_position: 22
---

# US-HCW-013: Coordinate Cross-Claim Payment (BRF/Individual)

## User Story

**As a** claims handler (skadereglerare),
**I want to** coordinate payment between the BRF's building insurance and the individual's bostadsrättsförsäkring,
**so that** each party pays their share and the customer receives full compensation.

## Actors

- **Primary:** [Claims Handler (Skadereglerare)](../../actors/internal/claims-handler.md)
- **Supporting:** [BRF Board (BRF-styrelse)](../../actors/external/brf-board.md), [Customer (Privatkund)](../../actors/internal/customer.md)

## Priority

**Must Have** — Cross-claim coordination between BRF and individual insurance is essential for bostadsrätt water damage claims where both policies are involved.

## Acceptance Criteria

- **GIVEN** a water damage claim has been determined to involve both BRF building insurance and the individual's bostadsrättsförsäkring
  **WHEN** the claims handler prepares the settlement
  **THEN** the system supports splitting the settlement into a BRF portion (building structure, shared systems) and an individual portion (apartment interior, personal property, fixtures)

- **GIVEN** the BRF building insurance is held by a different insurer
  **WHEN** the claims handler needs to coordinate the BRF portion
  **THEN** the system records the BRF insurer details and supports sending a cross-claim coordination request to the other insurer

- **GIVEN** both the BRF building insurance and the individual policy are held by TryggFörsäkring
  **WHEN** the claims handler processes the settlement
  **THEN** the system allows coordinated settlement under both policies with a single claims handler, applying each policy's deductible independently

- **GIVEN** the cross-claim coordination is complete
  **WHEN** both insurers have agreed on their respective shares
  **THEN** the system records the agreed split and processes payment from TryggFörsäkring's share without waiting for the other insurer's payment to the customer

- **GIVEN** the customer's own policy covers a portion and the BRF's insurer covers the building portion
  **WHEN** the customer receives the settlement
  **THEN** the system ensures the customer is not left out of pocket for the covered portion while the BRF claim is being processed

## Cross-Claim Split Examples

| Damage Component            | Typical Payer          | Notes                                                         |
| --------------------------- | ---------------------- | ------------------------------------------------------------- |
| Building structure repair   | BRF building insurance | Walls, floors (under surface), pipes in wall                  |
| Surface finishes (interior) | Individual policy      | Flooring, tiles, paint, wallpaper                             |
| Kitchen/bathroom fixtures   | Depends on BRF stadgar | Often individual responsibility                               |
| Personal property           | Individual policy      | Furniture, electronics, clothing                              |
| Drying costs                | Split or BRF           | Often building insurance responsibility                       |
| Temporary housing           | Individual policy      | Covered under individual hemförsäkring/bostadsrättsförsäkring |

## Regulatory

- **FSA-010** — Fair and timely claims settlement: the customer must not experience undue delay due to cross-claim coordination between insurers
- **FSA-004** — Consumer protection: the customer must receive clear communication about which insurer is responsible for each portion
- **FSA-014** — Record keeping: the cross-claim coordination details must be retained for 10 years

## Dependencies

- Depends on US-HCW-005 (Determine BRF vs Individual Responsibility)
- Depends on US-HCW-011 (Calculate Settlement With Age Deduction)
- BRF building insurance policy lookup and cross-insurer communication

## Notes

- When TryggFörsäkring insures both the BRF and the individual, coordination is simpler and faster
- When different insurers are involved, the customer may receive two separate settlements
- The customer should not need to coordinate between insurers themselves — this is the claims handler's responsibility
- Cross-claim coordination is one of the main reasons water damage claims take longer to settle for bostadsrätt properties
