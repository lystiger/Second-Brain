# Nand2Tetris Overview

## Build a computer from scratch
**Main components:** `ROM > CPU > RAM`

### Big picture

`Human thought` -> (write a program) -> `Abstraction: High level language` -> (compiler) -> `Abstraction: VM Code` -> (VM Translator) -> `Abstraction: Low level code` -> (Assembler) -> `Abstraction: Computer Architecture` -> (Digital Design) -> `CPU, RAM, Chipset` -> (Logic Gate) -> `Abstraction: Elementary logic gates` -> (Electrical Engineering) -> `Chip, Resistor, Capacitor, Solid states`

However, solid states are not my specialty, so we start from **NAND gates**.

## Building a chip
**Xor**: outputs 1 if exactly one of its inputs is 1, otherwise outputs 0.

| a | b | out |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  |
| 1 | 0 |  1  |
| 1 | 1 |  0  |

### Chip diagram:
![[Pasted image 20260702160644.png]]

> Use HDL (hardware description language)

### Assembly code
![[Pasted image 20260702161531.png]]

### Binary code
![[Pasted image 20260702161559.png]]
