# Evaluating Deep-Learning Models

## Related Notes

- [[01 Learning/AI/DL/Deep Learning Chapter 2|Cost and Gradient Descent]]
- [[01 Learning/AI/DL/Famous models|Famous Deep-Learning Models]]
- [[01 Learning/AI/ML/Data processing|Data Processing Pipeline]]
- [[01 Learning/AI/ML/Famous models|Famous Machine-Learning Models]]

Evaluation measures how well a trained model performs on data it did not learn from. There is no single metric for all deep-learning models: the correct metric depends on the **task**, **output type**, **class balance**, and **cost of different errors**.

> [!IMPORTANT]
> Evaluation metrics are task-specific, not architecture-specific. A neural network classifier and a classical classifier may use the same metrics. This note focuses on metrics commonly used in deep-learning tasks.

## Evaluation Setup

Use separate data splits:

- **Training set:** Fits the weights and biases.
- **Validation set:** Selects architectures, hyperparameters, checkpoints, and decision thresholds.
- **Test set:** Provides one final estimate of generalization after all choices are fixed.

The test set should represent real deployment conditions and must not influence training or model selection.

## Classification Metrics

For binary classification, predictions fall into four groups:

| Outcome | Meaning |
| --- | --- |
| True positive (TP) | Correctly predicted the positive class |
| True negative (TN) | Correctly predicted the negative class |
| False positive (FP) | Incorrectly predicted the positive class |
| False negative (FN) | Incorrectly predicted the negative class |

### Accuracy

$$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$$

Accuracy is easy to understand, but it can be misleading on imbalanced datasets. A model that always predicts the majority class may have high accuracy while being useless.

### Balanced Accuracy

$$\text{Balanced Accuracy} = \frac{1}{2}\left(\frac{TP}{TP+FN}+\frac{TN}{TN+FP}\right)$$

Balanced accuracy averages sensitivity and specificity, giving equal importance to both classes.

### Precision

$$\text{Precision} = \frac{TP}{TP + FP}$$

Precision answers: **Of all predicted positives, how many were correct?**

Use it when false positives are costly, such as incorrectly blocking a legitimate transaction.

### Recall (Sensitivity)

$$\text{Recall} = \frac{TP}{TP + FN}$$

Recall answers: **Of all actual positives, how many did the model find?**

Use it when false negatives are costly, such as missing a disease or safety defect.

### Specificity

$$\text{Specificity} = \frac{TN}{TN + FP}$$

Specificity measures how well the model recognizes the negative class.

### F1 Score

$$F_1 = 2\frac{\text{Precision}\cdot\text{Recall}}{\text{Precision}+\text{Recall}}$$

The F1 score balances precision and recall through their harmonic mean. It is useful for imbalanced classification when both false positives and false negatives matter.

An $F_\beta$ score can assign more importance to recall ($\beta>1$) or precision ($\beta<1$).

### ROC-AUC

The **receiver operating characteristic (ROC) curve** plots the true-positive rate against the false-positive rate over every classification threshold. **ROC-AUC** summarizes the curve as one number.

- `1.0`: Perfect ranking
- `0.5`: Random ranking

ROC-AUC measures ranking quality independently of one threshold, but it can appear overly optimistic when the positive class is rare.

### PR-AUC

The **precision–recall curve** shows the tradeoff between precision and recall across thresholds. Its area is called **PR-AUC** or **average precision (AP)**.

PR-AUC is usually more informative than ROC-AUC for highly imbalanced datasets because it focuses on performance for the positive class.

### Cross-Entropy (Log Loss)

For multiclass classification:

$$\text{Cross-Entropy} = -\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{C}y_{ic}\log(p_{ic})$$

Cross-entropy evaluates predicted probabilities, not only the final class. It penalizes confident wrong predictions heavily. Lower is better.

### Top-k Accuracy

A prediction is correct if the true class appears among the model’s `k` highest-probability classes.

- **Top-1 accuracy:** The highest-ranked class must be correct.
- **Top-5 accuracy:** The true class may appear anywhere among the five highest-ranked classes.

Top-k accuracy is useful for image or language tasks with many plausible classes.

## Multiclass and Multilabel Averaging

When multiple classes are involved, precision, recall, and F1 require an averaging strategy:

- **Macro average:** Calculates the metric per class, then averages. Every class has equal weight.
- **Micro average:** Pools all decisions before calculating the metric. Frequent classes have more influence.
- **Weighted average:** Averages class metrics according to class frequency.
- **Per-class scores:** Reveal which individual classes are weak and should always accompany aggregate scores when possible.

For **multilabel classification**, also consider **subset accuracy**, which requires the complete predicted label set to match exactly, and **Hamming loss**, which measures the fraction of individual label decisions that are wrong.

## Probability Calibration

A model is **well calibrated** when predictions with `80%` confidence are correct about `80%` of the time.

Useful calibration metrics include:

- **Brier score:** Mean squared error between predicted probabilities and binary outcomes. Lower is better.
- **Expected calibration error (ECE):** Groups predictions into confidence bins and compares average confidence with observed accuracy.
- **Reliability diagram:** Visualizes confidence against empirical accuracy.

Calibration matters when probabilities drive decisions, risk estimates, or human review—not merely when the highest-scoring class is used.

## Regression Metrics

### Mean Absolute Error (MAE)

$$\text{MAE} = \frac{1}{N}\sum_{i=1}^{N}|y_i-\hat{y}_i|$$

MAE measures the average absolute error in the target’s original units. It is relatively robust to outliers.

### Mean Squared Error (MSE)

$$\text{MSE} = \frac{1}{N}\sum_{i=1}^{N}(y_i-\hat{y}_i)^2$$

MSE penalizes large errors more strongly than small ones, making it sensitive to outliers.

### Root Mean Squared Error (RMSE)

$$\text{RMSE} = \sqrt{\text{MSE}}$$

RMSE retains MSE’s emphasis on large errors while returning the result to the target’s original units.

### Coefficient of Determination ($R^2$)

$$R^2 = 1-\frac{\sum_i(y_i-\hat{y}_i)^2}{\sum_i(y_i-\bar{y})^2}$$

$R^2$ compares the model with predicting the target mean. `1` is perfect, `0` matches the mean baseline, and a negative value is worse than that baseline.

## Computer-Vision Metrics

### Object Detection

**Intersection over Union (IoU)** measures overlap between a predicted and ground-truth bounding box:

$$\text{IoU} = \frac{\text{Area of Intersection}}{\text{Area of Union}}$$

A detection counts as correct when its IoU exceeds a chosen threshold and its class is correct.

- **AP:** Area under the precision–recall curve for one class and IoU setting.
- **mAP:** Mean AP across classes, often also averaged across multiple IoU thresholds.

Always report the IoU convention because `mAP@0.5` and `mAP@0.5:0.95` are not directly comparable.

### Image Segmentation

- **Pixel accuracy:** Fraction of correctly classified pixels; may hide poor performance on small classes.
- **IoU/Jaccard index:** Overlap between predicted and ground-truth regions.
- **Mean IoU (mIoU):** Average IoU across classes.
- **Dice coefficient:** Measures region overlap and is common in medical imaging.

$$\text{Dice} = \frac{2|A\cap B|}{|A|+|B|}$$

Dice and IoU are related but not identical, so reports should name the exact metric.

## Sequence, Language, and Speech Metrics

### Perplexity

Perplexity measures how well a language model predicts a token sequence:

$$\text{Perplexity} = \exp(\text{average cross-entropy})$$

Lower is better. Perplexity is only comparable when models use compatible datasets, tokenization, and vocabulary conventions. Lower perplexity does not automatically mean better factuality or usefulness.

### Text Generation

- **BLEU:** Measures n-gram precision, traditionally for machine translation.
- **ROUGE:** Measures overlap with reference text, often for summarization.
- **BERTScore:** Compares contextual token embeddings rather than exact word overlap.

Reference-based metrics may penalize valid outputs that use different wording. Human evaluation is often needed for correctness, coherence, relevance, and safety.

### Speech Recognition

**Word error rate (WER)** measures substitutions, deletions, and insertions:

$$\text{WER} = \frac{S+D+I}{N}$$

where $N$ is the number of words in the reference. Lower is better. Character error rate (CER) applies the same idea at character level.

## Generative-Model Metrics

- **Fréchet Inception Distance (FID):** Compares distributions of generated and real image features. Lower is better.
- **Kernel Inception Distance (KID):** A related distributional metric with an unbiased estimator.
- **CLIP score:** Measures image–text alignment in a shared embedding space.
- **Human evaluation:** Assesses realism, diversity, prompt adherence, usefulness, and safety.

Generative metrics are proxies. A model can improve one score without becoming more useful, diverse, or semantically correct, so multiple metrics and qualitative inspection are necessary.

## Choosing the Right Metric

| Situation | Useful primary metrics |
| --- | --- |
| Balanced classification | Accuracy, cross-entropy |
| Imbalanced classification | Precision, recall, F1, PR-AUC |
| Probability-based decisions | Cross-entropy, Brier score, ECE |
| Many-class classification | Top-k accuracy, macro F1 |
| Regression with costly large errors | RMSE |
| Regression requiring interpretable error | MAE |
| Object detection | AP, mAP, IoU |
| Image segmentation | Dice, IoU, mIoU |
| Language modeling | Perplexity plus downstream evaluation |
| Speech recognition | WER or CER |
| Generative images | FID/KID plus human evaluation |

## Evaluation Best Practices

1. Choose one **primary metric** before examining test results.
2. Compare against a simple baseline, not only against zero.
3. Report per-class results and a confusion matrix when classes matter individually.
4. Tune thresholds on validation data, never on the test set.
5. Evaluate important subgroups and slices to expose hidden failure modes.
6. Report uncertainty with repeated runs, standard deviation, or confidence intervals.
7. Test robustness under realistic noise, distribution shifts, and edge cases.
8. Track latency, memory use, and throughput when deployment constraints matter.
9. Use human evaluation when automatic metrics cannot capture task quality.
10. Never claim that one aggregate score describes every aspect of model behavior.

## Key Takeaways

- Select metrics according to the task and real cost of errors.
- Accuracy alone is insufficient for imbalanced data.
- Threshold-independent metrics do not replace threshold-specific evaluation.
- Probability quality and classification accuracy are different properties.
- Always pair aggregate scores with per-class or subgroup analysis.
- A good test score is meaningful only when the test data represents deployment conditions.
