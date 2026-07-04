# Nand2Tetris Overview

## Related Notes

- [[01 Learning/AI/Computer/Computer Architecture/Nand2Tetris/Lessons/Boolean Logic|Boolean Logic]]
- [[01 Learning/AI/Computer/Computer Architecture/Nand2Tetris/Lessons/Boolean Function Synthesis|Boolean Function Synthesis]]
- [[01 Learning/AI/Computer/Computer Architecture/Nand2Tetris/Projects/Project 0|Project 0]]
- [[01 Learning/AI/Computer/Computer Architecture/Nand2Tetris/Projects/Project 1|Project 1]]
- [[01 Learning/AI/What is AI|AI Learning Map]]

## Building a Computer from Scratch

The main hardware components are **ROM, CPU, and RAM**.

### The Big Picture

```text
Human thought
  -> high-level language
  -> compiler
  -> VM code
  -> VM translator
  -> assembly language
  -> assembler
  -> machine code
  -> computer architecture
  -> digital design
  -> CPU, RAM, and chipset
  -> logic gates
  -> elementary logic gates
  -> electrical components
```

Nand2Tetris begins at the **NAND-gate abstraction**, leaving the transistor-level implementation to electrical engineering.

## Building a Chip

An **XOR** gate outputs `1` when exactly one input is `1`; otherwise, it outputs `0`.

| `a` | `b` | `out` |
| ---: | ---: | ----: |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Chip Diagram

![[Pasted image 20260702160644.png]]

> Chips are specified using a hardware description language (HDL).

### Assembly Code

![[Pasted image 20260702161531.png]]

### Binary Code

![[Pasted image 20260702161559.png]]
