---
type: knowledge
status: evergreen
area: machine-learning
maturity: growing
created: 2026-07-01
updated: 2026-07-04
owner: Lystiger
tags: [knowledge, machine-learning, models]
---

# Famous Machine-Learning Models

## Related Notes

- [[🧠 Learning/AI/ML/ML Fundamentals|Machine Learning Fundamentals]]
- [[🧠 Learning/AI/ML/Data processing|Data Processing Pipeline]]
- [[🧠 Learning/AI/DL/Famous models|Famous Deep-Learning Models]]
- [[🧠 Learning/AI/DL/Evaluation|Model Evaluation]]

Classical machine-learning models are often the best starting point for structured or tabular data. They usually require less data and compute than deep neural networks, train quickly, and can provide strong, interpretable baselines.

## Quick Selection Guide

| Situation | Good starting models |
| --- | --- |
| Predict a continuous value | Linear regression, random forest, gradient boosting |
| Binary or multiclass classification | Logistic regression, random forest, gradient boosting |
| Small dataset with many features | Logistic regression, linear SVM |
| Nonlinear tabular relationships | Random forest, XGBoost, LightGBM, CatBoost |
| Explainability is critical | Linear/logistic regression, shallow decision tree |
| Find groups without labels | k-means, DBSCAN |
| Reduce feature dimensions | PCA |
| Need a simple similarity-based baseline | k-nearest neighbors |

## Linear Regression

Linear regression models a continuous target as a weighted sum of input features:

$$\hat{y}=w_1x_1+w_2x_2+\cdots+w_dx_d+b$$

**Pros**

- Fast to train and predict.
- Easy to interpret when features are meaningful and properly scaled.
- Works well when the relationship is approximately linear.
- Provides a strong regression baseline.

**Cons**

- Cannot naturally capture complex nonlinear relationships.
- Sensitive to outliers and highly correlated features.
- Assumptions about residuals matter for statistical inference.

**Use when:** Predicting a continuous value with limited data or when interpretability matters.

## Logistic Regression

Despite its name, logistic regression is a classification model. It applies a sigmoid or softmax function to a linear score to estimate class probabilities.

**Pros**

- Fast, simple, and interpretable.
- Produces probability estimates.
- Performs well on high-dimensional sparse data such as bag-of-words features.
- Supports regularization to control overfitting.

**Cons**

- Learns a linear decision boundary unless features are transformed.
- Can struggle when classes are separated by complex nonlinear patterns.

**Use when:** Building an explainable classification baseline, especially with small or sparse datasets.

## k-Nearest Neighbors (k-NN)

k-NN predicts from the labels or values of the `k` closest training samples.

**Pros**

- Simple and almost training-free.
- Naturally supports nonlinear decision boundaries.
- Can handle classification and regression.

**Cons**

- Prediction becomes slow and memory-heavy as the dataset grows.
- Sensitive to feature scale, irrelevant features, and the distance metric.
- Performs poorly in very high-dimensional spaces—the **curse of dimensionality**.

**Use when:** The dataset is small, similarity is meaningful, and a local baseline is useful.

## Naive Bayes

Naive Bayes applies Bayes' theorem while assuming features are conditionally independent given the class.

Common variants include Gaussian, multinomial, and Bernoulli Naive Bayes.

**Pros**

- Extremely fast and data-efficient.
- Works surprisingly well for text classification and sparse count features.
- Supports multiclass classification naturally.

**Cons**

- The independence assumption is often unrealistic.
- Probability estimates may be poorly calibrated.
- Correlated features can reduce performance.

**Use when:** Classifying text, spam, or documents, or when a very fast probabilistic baseline is needed.

## Decision Tree

A decision tree recursively splits the feature space using human-readable rules.

**Pros**

- Captures nonlinear relationships and feature interactions.
- Requires little preprocessing and no feature scaling.
- Easy to visualize when kept shallow.
- Handles numerical and categorical features in suitable implementations.

**Cons**

- Deep trees overfit easily.
- Small data changes can produce a very different tree.
- Greedy splitting does not guarantee the globally best tree.

**Use when:** Explainable rules are valuable or as a building block for tree ensembles.

## Random Forest

A random forest trains many decision trees on bootstrapped samples and random feature subsets, then combines their predictions.

**Pros**

- Strong general-purpose performance on tabular data.
- More stable and resistant to overfitting than one decision tree.
- Handles nonlinearities and interactions with little preprocessing.
- Provides feature-importance estimates.

**Cons**

- Less interpretable than a single tree.
- Larger forests use more memory and prediction time.
- Feature importance can be misleading when features are correlated or differ in cardinality.
- Usually less accurate than well-tuned gradient boosting on structured data.

**Use when:** You need a reliable tabular baseline with minimal tuning.

## Gradient-Boosted Trees

Gradient boosting builds trees sequentially, with each tree correcting errors made by the existing ensemble.

Famous implementations include:

- **XGBoost:** Highly configurable, regularized, and widely used.
- **LightGBM:** Optimized for speed and large datasets.
- **CatBoost:** Strong native handling of categorical features.

**Pros**

- Often among the best choices for structured and tabular data.
- Captures nonlinear relationships and complex feature interactions.
- Handles mixed feature types and missing values in many implementations.
- Offers extensive controls for regularization.

**Cons**

- Has many hyperparameters and can overfit if poorly tuned.
- Sequential training is less parallel than random forests.
- Model explanations require additional tools and care.

**Use when:** Predictive performance on tabular data is the priority.

## Support Vector Machine (SVM)

An SVM finds a decision boundary with the largest possible margin between classes. Kernel functions can create nonlinear boundaries.

**Pros**

- Effective on small and medium datasets with many features.
- Linear SVMs work well with sparse text features.
- Kernel SVMs can represent complex boundaries.

**Cons**

- Kernel SVMs scale poorly to very large datasets.
- Sensitive to feature scaling and hyperparameters.
- Does not produce probabilities without an extra calibration step.
- Kernel models are difficult to interpret.

**Use when:** The dataset is not huge, the feature space is high-dimensional, and the margin between classes is meaningful.

## k-Means Clustering

k-means assigns each sample to one of `k` clusters by minimizing its squared distance from the cluster center.

**Pros**

- Simple, fast, and scalable.
- Easy to interpret when clusters are compact and well separated.
- Useful for segmentation and exploratory analysis.

**Cons**

- Requires choosing `k` in advance.
- Sensitive to initialization, scaling, and outliers.
- Assumes roughly spherical clusters with similar variance.
- Every point must belong to a cluster.

**Use when:** You expect compact groups and can define a meaningful distance between samples.

## DBSCAN

DBSCAN forms clusters from dense regions and labels isolated points as noise.

**Pros**

- Does not require the number of clusters in advance.
- Finds irregularly shaped clusters.
- Explicitly identifies noise and outliers.

**Cons**

- Sensitive to its neighborhood radius and density settings.
- Struggles when clusters have very different densities.
- Distance becomes less meaningful in high dimensions.

**Use when:** Clusters may have arbitrary shapes and detecting noise matters.

## Principal Component Analysis (PCA)

PCA projects features onto orthogonal directions that preserve as much variance as possible.

**Pros**

- Reduces dimensionality, storage, and training time.
- Removes linear correlation between transformed features.
- Helps visualize high-dimensional data.

**Cons**

- Captures only linear structure.
- Components may be difficult to interpret.
- High variance does not always mean high predictive value.
- Requires careful feature scaling.

**Use when:** Compressing numerical features, reducing multicollinearity, visualizing data, or preparing a simple baseline.

## Practical Workflow

1. Start with a simple baseline such as linear or logistic regression.
2. Use cross-validation when the dataset is small enough.
3. Compare against random forest and gradient boosting for tabular data.
4. Scale features for distance-based and margin-based models.
5. Tune hyperparameters using validation data only.
6. Evaluate with metrics appropriate to the task and error costs.
7. Inspect per-class and subgroup performance, not only one aggregate score.

## Key Takeaways

- Linear models are fast, interpretable baselines.
- Tree ensembles are usually the strongest default for tabular data.
- Distance-based models require meaningful, scaled features.
- Clustering results depend heavily on the chosen representation and distance metric.
- A more complex model is useful only when it improves validated performance enough to justify its operational cost.
