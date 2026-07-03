# Boolean Logic

#Boolean

## Boolean Operations

- `x AND y`: `1` only when both inputs are `1`
- `x OR y`: `1` when at least one input is `1`
- `NOT x`: inverts the input

![[Pasted image 20260702163906.png]]

Example:

`NOT(0 OR (1 AND 1)) = NOT(0 OR 1) = NOT(1) = 0`

## Boolean Functions

Example function:

`f(x, y, z) = (x AND y) OR (NOT(x) AND z)`

### Truth Table

![[Pasted image 20260702164215.png]]

- First row: `(0 AND 0) OR (1 AND 0) = 0 OR 0 = 0`
- Second row: `(0 AND 0) OR (1 AND 1) = 0 OR 1 = 1`

## Boolean Identities

- **Commutative laws**
  - `(x AND y) = (y AND x)`
  - `(x OR y) = (y OR x)`
- **Associative laws**
  - `(x AND (y AND z)) = ((x AND y) AND z)`
  - `(x OR (y OR z)) = ((x OR y) OR z)`
- **Distributive laws**
  - `(x AND (y OR z)) = (x AND y) OR (x AND z)`
  - `(x OR (y AND z)) = (x OR y) AND (x OR z)`
- **De Morgan's laws**
  - `NOT(x AND y) = NOT(x) OR NOT(y)`
  - `NOT(x OR y) = NOT(x) AND NOT(y)`
- **Idempotent laws**
  - `x AND x = x`
  - `x OR x = x`
- **Double negation**
  - `NOT(NOT(x)) = x`

![[Pasted image 20260702170614.png]]

> A truth table is often the simplest way to verify or compare Boolean expressions.
