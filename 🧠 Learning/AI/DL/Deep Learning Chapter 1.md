---
type: knowledge
status: evergreen
area: deep-learning
maturity: growing
created: 2026-07-02
updated: 2026-07-04
owner: Lystiger
tags: [knowledge, deep-learning]
---

# Deep Learning — Chapter 1: Neural Networks

## Related Notes

- [[🧠 Learning/AI/What is AI|What Is Artificial Intelligence?]]
- [[🧠 Learning/AI/ML/ML Fundamentals|Machine Learning Fundamentals]]
- [[🧠 Learning/AI/DL/Deep Learning Chapter 2|Chapter 2: Cost and Gradient Descent]]
- [[🧠 Learning/AI/DL/Famous models|Famous Deep-Learning Models]]

Consider a neural network that learns to recognize handwritten digits from the bottom up.

## Neurons and Activations

A **neuron** stores a number called its **activation**.

A `28 × 28`-pixel input image contains `784` pixels, so the input layer has `784` neurons.

![[Pasted image 20260702190742.png]]

Each input neuron holds a grayscale value between `0` (black) and `1` (white). In later layers, an activation represents how strongly the network has detected a particular pattern.

![[Pasted image 20260702191330.png]]

This example network has two hidden layers with `16` neurons each. The activations in one layer determine the activations in the next.

![[Pasted image 20260702192138.png]]

The hope is that hidden layers learn useful intermediate features—for example, breaking a digit into edges and smaller shapes. A similar idea applies to audio: a network can combine low-level sound patterns into higher-level representations.

## Weights

Every connection between neurons has a **weight**. Weights are learned parameters that determine which input patterns matter to a neuron.

![[Pasted image 20260702192803.png]]

The neuron multiplies each input activation by its corresponding weight, then adds the results to form a weighted sum:

$$z = w_1a_1 + w_2a_2 + \cdots + w_na_n$$

![[Pasted image 20260702193215.png]]

Positive weights excite a neuron, while negative weights inhibit it. A suitable combination can make a neuron respond strongly to a specific feature, such as an edge.

![[Pasted image 20260702193715.png]]

## Activation Functions

A weighted sum can be any real number. An **activation function** transforms that value into the neuron's output. The sigmoid function maps it to a value between `0` and `1`:

$$\sigma(z) = \frac{1}{1 + e^{-z}}$$

![[Pasted image 20260702193917.png]]

![[Pasted image 20260702193946.png]]

The sigmoid is a logistic curve: very negative inputs approach `0`, while very positive inputs approach `1`.

## Biases

A **bias** shifts the activation threshold, controlling how large the weighted sum must be before the neuron activates strongly.

![[Pasted image 20260702194210.png]]

A neuron therefore uses two kinds of learned parameters:

- **Weights:** “What pattern am I looking for?”
- **Bias:** “How much evidence of that pattern do I need?”

For a fully connected layer from `784` input neurons to `16` hidden neurons, there are `784 × 16` weights and `16` biases.

![[Pasted image 20260702195633.png]]

![[Pasted image 20260702195734.png]]

## Matrix Form

The activations of an entire layer can be computed compactly with matrices:

$$\mathbf{a}^{(l+1)} = \sigma\left(\mathbf{W}^{(l)}\mathbf{a}^{(l)} + \mathbf{b}^{(l)}\right)$$

![[Pasted image 20260703212638.png]]

![[Pasted image 20260703212703.png]]

**Learning** means finding weights and biases that allow the network to solve the task.
