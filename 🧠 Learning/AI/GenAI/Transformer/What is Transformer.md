# What Is a Transformer?

## Related Notes

- [[🧠 Learning/AI/GenAI/Attention/What is Attention|What Is Attention?]]
- [[🧠 Learning/AI/What is AI|What Is Artificial Intelligence?]]
- [[🧠 Learning/AI/DL/Deep Learning Chapter 1|Neural Networks]]
- [[🧠 Learning/AI/DL/Famous models|Famous Deep-Learning Models]]

A **Transformer** is a neural-network architecture designed to process sequences using [[🧠 Learning/AI/GenAI/Attention/What is Attention|attention]]. Unlike recurrent neural networks, it can process all tokens in a sequence in parallel during training while still learning relationships between distant tokens.

Transformers are the foundation of most modern frontier language models. **GPT** stands for **Generative Pre-trained Transformer**:

- **Generative:** Produces new content.
- **Pre-trained:** Learns general patterns from a large dataset before task-specific use.
- **Transformer:** Uses stacked Transformer blocks as its core architecture.

## Data Flow Through a Transformer

```text
Tokens
  -> embeddings + positional information
  -> repeated Transformer blocks
       -> attention
       -> feed-forward network (MLP)
  -> final normalization
  -> unembedding / output projection
  -> probabilities for the next token
```

### 1. Tokenization and Embeddings

Text is split into **tokens**, and each token ID is converted into a learned vector called an **embedding**. Positional information is added so the model can distinguish token order.

![[Pasted image 20260704113405.png]]

### 2. Attention

Attention lets tokens exchange relevant information. It converts context-free token embeddings into context-aware representations—for example, distinguishing *model* in machine learning from *model* in fashion.

![[Pasted image 20260704113425.png]]

See [[🧠 Learning/AI/GenAI/Attention/What is Attention|What Is Attention?]] for queries, keys, values, and causal masking.

### 3. Feed-Forward Network

After attention mixes information between tokens, a small **multi-layer perceptron (MLP)** processes each token independently. Attention communicates across positions; the MLP transforms the information stored at each position.

![[Pasted image 20260704113451.png]]

### 4. Residual Connections and Normalization

Transformer blocks use **residual connections** to preserve and refine the existing representation instead of replacing it completely. **Layer normalization** keeps activations stable as information passes through many blocks.

### 5. Unembedding and Prediction

The final token representation is projected back into vocabulary-sized scores called **logits**. Softmax converts these scores into probabilities, from which the next token can be selected.

![[Pasted image 20260704113512.png]]

## Main Transformer Families

- **Encoder-only:** Builds representations from the full input; commonly used for understanding and classification. Example: BERT.
- **Decoder-only:** Predicts tokens autoregressively using causal attention. Example: GPT.
- **Encoder-decoder:** Encodes an input sequence and generates a related output sequence. Examples: T5 and the original Transformer.

## Key Idea

A Transformer repeatedly alternates between two operations:

1. **Attention:** Move information between tokens.
2. **MLP:** Transform the information within each token.

Stacking these operations allows the model to build increasingly rich representations and generate context-sensitive outputs.
