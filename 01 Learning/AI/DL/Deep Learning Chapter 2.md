# Deep Learning — Chapter 2: Cost and Gradient Descent

Training a neural network means finding the **weights and biases** that make its predictions as accurate as possible. To do that, we need:

1. A way to measure how wrong the network is: the **cost function**.
2. A way to reduce that error: **gradient descent**.

## Loss and Cost Functions

A **loss function** measures the error on one training example. A **cost function** is usually the average loss across many examples.

For one example, the squared-error loss is:

$$L = \sum_j (a_j - y_j)^2$$

where:

- $a_j$ is the activation of output neuron $j$.
- $y_j$ is the desired output for neuron $j$.

For a dataset with $n$ examples, the average cost is:

$$C = \frac{1}{n}\sum_{i=1}^{n} L_i$$

The cost is small when the network's predictions are close to the targets and large when they differ substantially.

![[Pasted image 20260703213753.png]]

![[Pasted image 20260703213822.png]]

> [!NOTE]
> Squared error is useful for understanding the basic idea. For classification, **cross-entropy loss** is often preferred because it usually provides a stronger learning signal when a prediction is confidently wrong.

## Finding the Minimum

Imagine a simple cost function with one input and one output. Training means finding the input value that produces the smallest cost.

![[Pasted image 20260703214142.png]]

The derivative tells us how the output changes when the input changes slightly:

- A **positive derivative** means moving right increases the cost, so we should move left.
- A **negative derivative** means moving right decreases the cost, so we should move right.
- A derivative near **zero** means the function is locally flat and may be near a minimum, maximum, or saddle point.

Starting from an initial value, we repeatedly take a small step in the direction that lowers the cost.

![[Pasted image 20260703214602.png]]

## From Derivatives to Gradients

A neural network does not have only one trainable value. It can have thousands, millions, or billions of **parameters**.

For the network from Chapter 1, with layers of `784 → 16 → 16 → 10` neurons, the parameter count is:

$$
\begin{aligned}
\text{Weights} &= 784(16) + 16(16) + 16(10) = 12{,}960 \\
\text{Biases} &= 16 + 16 + 10 = 42 \\
\text{Total} &= 13{,}002
\end{aligned}
$$

The cost therefore depends on `13,002` weights and biases. We can imagine it as a surface in a `13,002`-dimensional parameter space, even though we cannot visualize that many dimensions.

![[Pasted image 20260703214753.png]]

The **gradient** collects the partial derivative of the cost with respect to every parameter:

$$
\nabla C =
\begin{bmatrix}
\frac{\partial C}{\partial \theta_1} \\
\frac{\partial C}{\partial \theta_2} \\
\vdots \\
\frac{\partial C}{\partial \theta_m}
\end{bmatrix}
$$

Here, $\theta$ represents all weights and biases, and $m$ is the total number of parameters.

Each gradient component answers a practical question:

> If this parameter increases slightly, how much will the cost change?

The sign indicates whether a parameter should move up or down. The magnitude indicates how sensitive the cost is to that parameter.

![[Pasted image 20260703221155.png]]

## Gradient Descent

The gradient points in the direction of **steepest ascent**. Its negative points in the direction of steepest local descent, so the parameter update is:

$$\theta \leftarrow \theta - \eta \nabla C(\theta)$$

where:

- $\theta$ is the vector of all weights and biases.
- $\nabla C(\theta)$ is the gradient of the cost.
- $\eta$ is the **learning rate**.

Repeating this update gradually moves the network toward parameter values with a lower cost.

### Learning Rate

The learning rate controls the size of each step:

- **Too small:** Training is stable but very slow.
- **Too large:** Training may overshoot good solutions, oscillate, or diverge.
- **Well chosen:** Training makes steady progress toward a lower cost.

The best learning rate can change during training, so practical systems often use a **learning-rate schedule** or an adaptive optimizer such as Adam.

## Batch, Stochastic, and Mini-Batch Gradient Descent

Computing the exact average gradient over the entire training set can be expensive.

- **Batch gradient descent:** Uses every training example for each update. It is accurate but potentially slow.
- **Stochastic gradient descent (SGD):** Uses one randomly selected example per update. It is fast but noisy.
- **Mini-batch gradient descent:** Uses a small batch of examples per update. This is the usual compromise in deep learning because it is efficient on modern hardware and produces a useful gradient estimate.

An **epoch** is one complete pass through the training dataset.

## Where Backpropagation Fits

Gradient descent tells us **how to update** the parameters, but it does not tell us how to calculate all the partial derivatives efficiently.

**Backpropagation** solves that problem. It applies the chain rule from the output layer backward through the network to compute the gradient of the cost with respect to every weight and bias.

The training loop is therefore:

1. **Forward pass:** Compute the network's prediction.
2. **Calculate loss:** Compare the prediction with the target.
3. **Backward pass:** Use backpropagation to compute gradients.
4. **Update parameters:** Apply gradient descent or another optimizer.
5. **Repeat:** Continue across mini-batches and epochs.

![[Pasted image 20260703223631.png]]

![[Pasted image 20260703223706.png]]

For a single training example, backpropagation determines how each weight and bias contributes to the loss and how each parameter should be nudged to reduce it.

The result is not an immediate parameter update. Instead, backpropagation computes the **relative size and direction** of the changes that would most rapidly decrease the loss:

- The **sign** of a gradient component indicates whether its parameter should increase or decrease.
- The **magnitude** indicates how strongly changing that parameter would affect the loss.
- The **relative proportions** show which parameters should change more than others.

During mini-batch training, the gradients from multiple examples are averaged or summed. The optimizer then uses the learning rate to convert that combined gradient into an actual update.

> [!NOTE]
> **Backpropagation computes the gradients; the optimizer applies the updates.** They are related steps, but they are not the same algorithm.

## Important Limitations

Neural-network cost surfaces are generally **non-convex**. They can contain local minima, saddle points, flat regions, and steep regions. Gradient descent is not guaranteed to find the absolute global minimum.

In practice, the goal is usually not to find the mathematically lowest possible training cost. The goal is to find parameters that perform well on **unseen data**. A very low training cost with poor validation performance is a sign of **overfitting**.

## Key Takeaways

- A loss measures error on one example; a cost usually averages loss across examples.
- Training minimizes the cost by adjusting weights and biases.
- The gradient contains one partial derivative for every trainable parameter.
- The negative gradient gives the direction of steepest local decrease.
- The learning rate controls the update size.
- Backpropagation computes gradients; gradient descent uses them.
- Validation performance matters more than achieving the lowest possible training cost.
