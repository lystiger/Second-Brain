# What Is Attention?

## Related Notes

- [[01 Learning/AI/GenAI/Transformer/What is Transformer|What Is a Transformer?]]
- [[01 Learning/AI/DL/Deep Learning Chapter 1|Neural Networks]]
- [[01 Learning/AI/DL/Famous models|Famous Deep-Learning Models]]

**Attention** is a mechanism that lets each token gather information from other relevant tokens. In intuitive terms, it allows token vectors to “talk” to one another and update their representations using context.

For example, the meaning of **model** changes with its context:

- “The machine-learning **model** made a prediction.”
- “The fashion **model** walked onto the stage.”

Attention helps the representation of *model* incorporate clues such as *machine learning* or *fashion* instead of treating the word as context-free.

![[Pasted image 20260704115221.png]]

## Queries, Keys, and Values

Each input vector is projected into three vectors:

- **Query (Q):** What information is this token looking for?
- **Key (K):** What information does this token contain or represent?
- **Value (V):** What information should this token contribute if selected?

The query of one token is compared with the keys of other tokens. Stronger matches receive larger weights, and the corresponding value vectors are combined into a new contextual representation.

## Scaled Dot-Product Attention

The standard calculation is:

$$
\operatorname{Attention}(Q,K,V)
= \operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

The steps are:

1. Calculate similarity scores with $QK^T$.
2. Scale the scores by $\sqrt{d_k}$ to keep them numerically stable.
3. Apply softmax to convert the scores into attention weights.
4. Use those weights to compute a weighted combination of the values.

## Self-Attention and Multi-Head Attention

In **self-attention**, the queries, keys, and values all come from the same sequence. This allows every token to build a context-aware representation of itself.

**Multi-head attention** runs several attention operations in parallel. Different heads can learn to track different relationships, such as nearby syntax, long-range dependencies, references, or semantic similarity.

## Causal Attention

Decoder-only language models such as GPT apply a **causal mask**. A token may attend only to itself and earlier tokens, never to future tokens. This preserves next-token prediction: the model cannot look ahead at the answer it is supposed to predict.

## Key Idea

Attention does not directly retrieve words. It mixes information carried by token vectors according to learned relevance scores. The output is then processed by the rest of the [[01 Learning/AI/GenAI/Transformer/What is Transformer|Transformer]] block.
