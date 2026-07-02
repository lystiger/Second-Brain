# Boolean Logic

## Boolean Operations
- `(x AND y)` -> `x^y`
- `(x OR y)`
- `NOT(x)`

![[Pasted image 20260702163906.png]]

`NOT(0 OR (1 AND 1)) = NOT(0 OR 1) = NOT(1) = 0`

## Boolean Functions
`f(x,y,z) = (x AND y) OR (NOT(x) AND z)` -> formula

### Truth table:
![[Pasted image 20260702164215.png]]

- 1st row = `(x AND y) OR (1 AND z)` = `0 OR 0` = `0`
- 2nd row = `0 OR (1 AND 1)` = `1`

## Boolean Identities
- **Commutative Laws**
  - `(x AND y) = (y AND x)`
  - `(x OR y) = (y OR x)`
- **Associative Laws**
  - `(x AND (y AND z)) = ((x AND y) AND z)`
  - `(x OR (y OR z)) = ((x OR y) OR z)`
- **Distributive Laws**
  - `(x AND (y OR z)) = (x AND y) OR (x AND z)`
  - `(x OR (y AND z)) = (x OR y) AND (x OR z)`
- **De Morgan Laws**
  - `NOT(x AND y) = NOT(x) OR NOT(y)`
  - `NOT(x OR y) = NOT(x) AND NOT(y)`

![[Pasted image 20260702170614.png]]

## Boolean Algebra 

- `NOT(x) AND NOT(y) = NOT(x)` (Idempotence)
- `NOT(NOT(x)) = x` (Double Negation)

=> Use truth table for easier expressions handling