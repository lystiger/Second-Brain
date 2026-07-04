---
type: knowledge
status: evergreen
area: deep-learning
maturity: growing
created: 2026-07-02
updated: 2026-07-04
owner: Lystiger
tags: [knowledge, deep-learning, architectures]
---

# Famous Deep-Learning Models and Architectures

## Related Notes

- [[🧠 Learning/AI/DL/Deep Learning Chapter 1|Neural Networks]]
- [[🧠 Learning/AI/DL/Evaluation|Evaluating Deep-Learning Models]]
- [[🧠 Learning/AI/ML/Famous models|Famous Machine-Learning Models]]
- [[What is Transformer|Transformers]]

Deep-learning models learn hierarchical representations directly from data. The best architecture depends more on the data modality and task than on which model is newest or largest.

## Quick Selection Guide

| Task or data | Common starting architecture |
| --- | --- |
| Tabular data with a large dataset | Multilayer perceptron (MLP) |
| Image classification | ResNet, EfficientNet, Vision Transformer |
| Object detection | Faster R-CNN, YOLO |
| Image segmentation | U-Net, Mask R-CNN |
| Sequential or time-series data | LSTM, GRU, Transformer |
| Text understanding | BERT-style encoder |
| Autoregressive text generation | GPT-style decoder |
| Translation or text transformation | Encoder–decoder Transformer, T5 |
| Graph-structured data | Graph neural network (GNN) |
| Representation learning or compression | Autoencoder, variational autoencoder |
| Image generation | Diffusion model, GAN |

## Multilayer Perceptron (MLP)

An MLP is a feed-forward network composed of fully connected layers and nonlinear activation functions.

**Pros**

- Simple, flexible, and easy to implement.
- Can approximate complex nonlinear functions.
- Useful as a baseline and as the prediction head inside larger architectures.

**Cons**

- Ignores spatial, sequential, and graph structure.
- Fully connected layers can require many parameters.
- Often underperforms specialized architectures on images, text, and sequences.
- Classical tree ensembles frequently remain stronger on ordinary tabular datasets.

**Use when:** Building a neural baseline, learning from dense fixed-length features, or adding a classification/regression head to another model.

## Convolutional Neural Networks (CNNs)

CNNs use learned filters that slide across local regions. Weight sharing makes them efficient for spatial data and gives them a useful inductive bias for images.

### Landmark CNN Architectures

| Model | Main contribution |
| --- | --- |
| **LeNet-5** | Early successful CNN for handwritten-digit recognition |
| **AlexNet** | Demonstrated the power of deep CNNs, GPUs, and ReLU on large-scale image classification |
| **VGG** | Used a simple stack of small `3 × 3` convolutions; conceptually clear but parameter-heavy |
| **Inception/GoogLeNet** | Combined filters of different sizes efficiently within inception modules |
| **ResNet** | Introduced residual connections that made very deep networks easier to optimize |
| **EfficientNet** | Scaled network depth, width, and input resolution in a coordinated way |

### ResNet

ResNet learns a residual mapping through skip connections:

$$\mathbf{y}=F(\mathbf{x})+\mathbf{x}$$

**Pros**

- Stable training for deep networks.
- Strong, widely available pretrained backbones.
- Useful for classification, detection, segmentation, and feature extraction.

**Cons**

- Larger variants can be expensive.
- The standard architecture is less compute-efficient than some newer CNN families.

**Use when:** You need a dependable general-purpose vision backbone or transfer-learning baseline.

### EfficientNet

EfficientNet balances network depth, width, and image resolution rather than scaling only one dimension.

**Pros**

- Strong accuracy relative to parameter count.
- Suitable when inference efficiency matters.

**Cons**

- Real hardware speed does not always match theoretical efficiency.
- Input resolution and preprocessing must match the selected variant carefully.

**Use when:** You need a compact image classifier and can benchmark it on the target hardware.

## Recurrent Neural Networks (RNNs)

RNNs process a sequence one step at a time while carrying a hidden state forward.

**Pros**

- Naturally models ordered and variable-length sequences.
- Can operate incrementally in streaming settings.

**Cons**

- Sequential computation limits parallelism.
- Basic RNNs suffer from vanishing and exploding gradients.
- Long-range dependencies are difficult to preserve.

**Use when:** The model must process a stream step by step or when a small recurrent model is sufficient.

### LSTM and GRU

**Long short-term memory (LSTM)** and **gated recurrent unit (GRU)** networks use gates to control what information is stored, forgotten, and exposed.

**Pros**

- Handle longer dependencies better than basic RNNs.
- Work well on many time-series, audio, and modest sequence tasks.
- GRUs are simpler and usually have fewer parameters than LSTMs.

**Cons**

- Remain sequential and difficult to parallelize across time.
- Often replaced by Transformers when data and compute are abundant.

**Use when:** Working with time series, streaming signals, or smaller sequence datasets where a Transformer would be excessive.

## Transformers

Transformers use **attention** to let each token weigh information from other tokens. Unlike RNNs, they can process training sequences largely in parallel.

The core attention operation is:

$$\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

**Pros**

- Models long-range dependencies effectively.
- Highly parallelizable during training.
- Scales well with data, parameters, and compute.
- Transfers across language, vision, audio, and multimodal tasks.

**Cons**

- Standard self-attention has quadratic time and memory cost with sequence length.
- Large models require substantial training and inference resources.
- Outputs can be plausible but factually wrong.
- Performance depends strongly on data quality and evaluation design.

### BERT

BERT is an **encoder-only Transformer** trained to create bidirectional contextual representations.

**Pros**

- Strong for classification, token labeling, retrieval, and extractive question answering.
- Produces contextual text embeddings.
- Fine-tunes well with labeled task data.

**Cons**

- Not naturally designed for open-ended autoregressive generation.
- Long inputs can be computationally expensive.

**Use when:** Understanding or encoding existing text is more important than generating new text.

### GPT

GPT-style models are **decoder-only Transformers** trained to predict the next token.

**Pros**

- Natural fit for open-ended generation and completion.
- Supports prompting and in-context learning.
- One model can perform many language tasks.

**Cons**

- Can hallucinate or reproduce undesirable patterns from training data.
- Autoregressive generation is sequential and can be expensive.
- Requires careful grounding and evaluation for high-stakes uses.

**Use when:** Generating, transforming, summarizing, or interacting through natural language.

### T5 and Encoder–Decoder Transformers

Encoder–decoder Transformers encode an input sequence and autoregressively generate an output sequence. T5 casts many language tasks into a text-to-text format.

**Pros**

- Natural for translation, summarization, and structured text transformation.
- Separates input understanding from output generation.

**Cons**

- Uses both an encoder and decoder, increasing computation.
- Still inherits the limitations of autoregressive generation.

**Use when:** The output is a transformed version of a provided input sequence.

### Vision Transformer (ViT)

ViT divides an image into patches, embeds them as tokens, and processes them with a Transformer encoder.

**Pros**

- Captures global relationships naturally.
- Scales well with large pretraining datasets.
- Integrates cleanly with multimodal Transformer systems.

**Cons**

- Has less built-in image-specific bias than a CNN.
- May be data-hungry when trained from scratch.
- Attention cost grows quickly with the number of patches.

**Use when:** Strong pretrained checkpoints are available or the task benefits from large-scale vision or multimodal pretraining.

## U-Net

U-Net uses an encoder to extract features and a decoder to recover spatial resolution. Skip connections pass fine-grained features directly from encoder layers to corresponding decoder layers.

**Pros**

- Precise localization and strong segmentation performance.
- Works well with limited labeled data and augmentation.
- Adaptable to 2D and 3D data.

**Cons**

- High-resolution feature maps require substantial memory.
- Performance can struggle under major domain shifts.

**Use when:** Performing semantic segmentation, especially in medical or scientific imaging.

## Object-Detection Models

### Faster R-CNN

Faster R-CNN first proposes candidate regions and then classifies and refines them.

**Pros**

- Strong localization and detection accuracy.
- Good for small or overlapping objects.

**Cons**

- Two-stage inference is relatively slow and complex.

**Use when:** Detection accuracy matters more than real-time speed.

### YOLO

YOLO models predict bounding boxes and classes in a single-stage pipeline.

**Pros**

- Fast and suitable for real-time systems.
- Straightforward end-to-end detection pipeline.
- Available in variants targeting different speed–accuracy tradeoffs.

**Cons**

- Performance depends heavily on the exact implementation and model size.
- Very small, crowded, or unusual objects may remain challenging.

**Use when:** Latency and throughput are central requirements.

## Autoencoders

An autoencoder compresses an input into a latent representation and reconstructs the original input.

**Pros**

- Learns representations without class labels.
- Useful for compression, denoising, anomaly detection, and pretraining.

**Cons**

- May simply learn an identity function if the bottleneck is weak.
- Low reconstruction error does not guarantee a semantically useful representation.

**Use when:** Learning compact features or modeling normal patterns for anomaly detection.

### Variational Autoencoder (VAE)

A VAE learns a probability distribution in latent space, enabling sampling and smooth interpolation.

**Pros**

- Provides a structured, continuous latent space.
- Has a probabilistic formulation.
- Supports controlled sampling and representation learning.

**Cons**

- Generated images may look blurrier than those from GANs or diffusion models.
- Requires balancing reconstruction quality against latent regularization.

**Use when:** A meaningful latent space, uncertainty, or controllable generation matters.

## Generative Adversarial Networks (GANs)

A GAN trains a **generator** to create samples and a **discriminator** to distinguish generated samples from real ones.

Famous examples include DCGAN, CycleGAN, and StyleGAN.

**Pros**

- Can generate sharp, realistic images.
- Supports image translation and style manipulation.
- Inference requires only one generator pass.

**Cons**

- Training can be unstable.
- May suffer from **mode collapse**, producing limited diversity.
- Evaluation is difficult because visual quality and diversity are separate properties.

**Use when:** Fast image generation or adversarial image-to-image translation is needed and training instability can be managed.

## Diffusion Models

Diffusion models learn to reverse a gradual noising process, generating data by iteratively denoising a random sample.

**Pros**

- Produces high-quality, diverse images.
- Training is generally more stable than GAN training.
- Supports conditioning, editing, inpainting, and guidance.

**Cons**

- Sampling usually requires many iterative steps.
- Training and inference can be computationally expensive.
- Evaluation and data-governance concerns remain significant.

**Use when:** Image-generation quality, diversity, and controllability matter more than minimum latency.

## Graph Neural Networks (GNNs)

GNNs pass and aggregate messages between connected nodes to learn representations of nodes, edges, or entire graphs.

Famous families include graph convolutional networks (GCNs), GraphSAGE, and graph attention networks (GATs).

**Pros**

- Uses relational structure directly.
- Supports node classification, link prediction, and graph classification.
- Useful for molecules, recommendations, fraud networks, and knowledge graphs.

**Cons**

- Scaling to very large or dense graphs is difficult.
- Deep GNNs can suffer from over-smoothing, making node representations too similar.
- Results depend strongly on graph construction and sampling.

**Use when:** Relationships between entities carry essential predictive information.

## Transfer Learning

Training a famous architecture from scratch is often unnecessary. A common workflow is:

1. Start with a model pretrained on a large related dataset.
2. Replace or adapt its output head.
3. Freeze most layers for an initial baseline.
4. Fine-tune some or all layers with a smaller learning rate.
5. Validate against a simpler model and monitor overfitting.

Transfer learning usually reduces data requirements and training time, but pretraining data that differs greatly from the target domain can limit its value.

## Key Takeaways

- Use architecture families as starting points, not automatic answers.
- CNNs remain strong and efficient for vision; Transformers dominate many large-scale sequence and multimodal tasks.
- LSTMs and GRUs remain practical for smaller or streaming sequence problems.
- U-Net is a dependable segmentation baseline, while YOLO and Faster R-CNN represent different detection speed–accuracy tradeoffs.
- Diffusion models favor generation quality; GANs can offer faster sampling.
- Pretrained models are usually more practical than training from scratch.
- Compare accuracy with latency, memory, data requirements, robustness, and maintainability before choosing a model.
