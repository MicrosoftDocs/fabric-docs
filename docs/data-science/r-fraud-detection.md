---
title: 'Tutorial: Use R to detect fraud'
description: This tutorial shows a data science workflow in R, with an end-to-end example of building a model to detect fraud.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 09/21/2023
ms.search.form: R Language
#customer intent: As a data scientist, I want to build a machine learning model in R so I can detect future fraudulent transactions.
---

# Tutorial: Use R to create, evaluate, and score a fraud detection model

In this tutorial, you walk through an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario is to build a fraud detection model in R by using machine learning algorithms trained on historical data. You can then use the model to detect future fraudulent transactions.

The main steps in this tutorial are:

> [!div class="checklist"]
>
> - Install custom libraries.
> - Load the data.
> - Understand and process the data through exploratory data analysis, and demonstrate the use of the Fabric Data Wrangler feature.
> - Train machine learning models by using LightGBM.
> - Use the machine learning models for scoring and making predictions

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

- If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can follow along in a notebook in one of two ways:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

**Fraud detection** is the sample notebook that accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

[AIsample - R Fraud Detection.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Fraud%20Detection.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Fraud%20Detection.ipynb -->

## Step 1: Install custom libraries

When you're developing a machine learning model or doing ad hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. To do so, use inline installation capabilities such as `install.packages` and `devtools::install_version`. Alternatively, you can install the required libraries in the workspace by browsing to **Library management** in the workspace settings.

For this notebook, you use `install.packages()` to install the imbalanced-learn library (imported as `imbalance`).  Set `quiet` to `TRUE` to make output more concise:

```r
# Install imbalance for SMOTE
install.packages("imbalance", quiet = TRUE)
```

## Step 2: Load the data

The fraud detection dataset contains credit card transactions that European cardholders made in September 2013 over the course of two days. The dataset contains only numerical features, which is the result of a Principal Component Analysis (PCA) transformation that was applied to the original features. The only features that weren't transformed with PCA are `Time` and `Amount`. To protect confidentiality, we can't provide the original features or more background information about the dataset.

Here are some details about the dataset:

- The features `V1`, `V2`, `V3`, …, `V28` are the principal components obtained with PCA.
- The feature `Time` contains the elapsed seconds between a transaction and the first transaction in the dataset.
- The feature `Amount` is the transaction amount. You can use this feature for example-dependent, cost-sensitive learning.
- The column `Class` is the response (target) variable. It takes the value `1` for fraud and `0` otherwise.

Out of the 284,807 transactions, only 492 are fraudulent. The minority class (fraud) accounts for only about 0.172% of the data, so the dataset is highly imbalanced.

The following table shows a preview of the *creditcard.csv* data:

|Time|V1|V2|V3|V4|V5|V6|V7|V8|V9|V10|V11|V12|V13|V14|V15|V16|V17|V18|V19|V20|V21|V22|V23|V24|V25|V26|V27|V28|Amount|Class|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|-1.3598071336738|-0.0727811733098497|2.53634673796914|1.37815522427443|-0.338320769942518|0.462387777762292|0.239598554061257|0.0986979012610507|0.363786969611213|0.0907941719789316|-0.551599533260813|-0.617800855762348|-0.991389847235408|-0.311169353699879|1.46817697209427|-0.470400525259478|0.207971241929242|0.0257905801985591|0.403992960255733|0.251412098239705|-0.018306777944153|0.277837575558899|-0.110473910188767|0.0669280749146731|0.128539358273528|-0.189114843888824|0.133558376740387|-0.0210530534538215|149.62|"0"|
|0|1.19185711131486|0.26615071205963|0.16648011335321|0.448154078460911|0.0600176492822243|-0.0823608088155687|-0.0788029833323113|0.0851016549148104|-0.255425128109186|-0.166974414004614|1.61272666105479|1.06523531137287|0.48909501589608|-0.143772296441519|0.635558093258208|0.463917041022171|-0.114804663102346|-0.183361270123994|-0.145783041325259|-0.0690831352230203|-0.225775248033138|-0.638671952771851|0.101288021253234|-0.339846475529127|0.167170404418143|0.125894532368176|-0.00898309914322813|0.0147241691924927|2.69|"0"|

### Download the dataset and upload to the lakehouse

Define the following parameters so that you can use this notebook with different datasets:

```r
IS_CUSTOM_DATA <- FALSE  # If TRUE, the dataset has to be uploaded manually

IS_SAMPLE <- FALSE  # If TRUE, use only rows of data for training; otherwise, use all data
SAMPLE_ROWS <- 5000  # If IS_SAMPLE is True, use only this number of rows for training

DATA_ROOT <- "/lakehouse/default"
DATA_FOLDER <- "Files/fraud-detection"  # Folder with data files
DATA_FILE <- "creditcard.csv"  # Data file name
```

The following code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Be sure to [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. If you don't, you'll get an error.

```r
if (!IS_CUSTOM_DATA) {
    # Download data files into a lakehouse if they don't exist
    library(httr)
    
    remote_url <- "https://synapseaisolutionsa.blob.core.windows.net/public/Credit_Card_Fraud_Detection"
    fname <- "creditcard.csv"
    download_path <- file.path(DATA_ROOT, DATA_FOLDER, "raw")

    dir.create(download_path, showWarnings = FALSE, recursive = TRUE)
    if (!file.exists(file.path(download_path, fname))) {
        r <- GET(file.path(remote_url, fname), timeout(30))
        writeBin(content(r, "raw"), file.path(download_path, fname))
    }
    message("Downloaded demo data files into lakehouse.")
}
```

### Read raw date data from the lakehouse

This code reads raw data from the **Files** section of the lakehouse:

```r
data_df <- read.csv(file.path(DATA_ROOT, DATA_FOLDER, "raw", DATA_FILE))
```

## Step 3: Perform exploratory data analysis

Explore the dataset by using the `display` command to view its high-level statistics:

```r
display(as.DataFrame(data_df, numPartitions = 3L))
```

```r
# Print dataset basic information
message(sprintf("records read: %d", nrow(data_df)))
message("Schema:")
str(data_df)
```

```r
# If IS_SAMPLE is True, use only SAMPLE_ROWS of rows for training
if (IS_SAMPLE) {
    data_df = sample_n(data_df, SAMPLE_ROWS)
}
```

Print the distribution of classes in the dataset:

```r
# The distribution of classes in the dataset
message(sprintf("No Frauds %.2f%% of the dataset\n", round(sum(data_df$Class == 0)/nrow(data_df) * 100, 2)))
message(sprintf("Frauds %.2f%% of the dataset\n", round(sum(data_df$Class == 1)/nrow(data_df) * 100, 2)))
```

This class distribution shows that most of the transactions are nonfraudulent. Therefore, data preprocessing is required before model training, to avoid overfitting.

### View the distribution of fraudulent versus nonfraudulent transactions

Use a plot to show the class imbalance in the dataset, by viewing the distribution of fraudulent versus nonfraudulent transactions:

```r
library(ggplot2)

ggplot(data_df, aes(x = factor(Class), fill = factor(Class))) +
  geom_bar(stat = "count") +
  scale_x_discrete(labels = c("no fraud", "fraud")) +
  ggtitle("Class Distributions \n (0: No Fraud || 1: Fraud)") +
  theme(plot.title = element_text(size = 10))
```

:::image type="content" source="media/r-fraud-detection/bar-plot-fraud.png" alt-text="Screenshot that shows a bar chart of fraud.":::

This plot clearly shows how imbalanced the dataset is.

### Show the five-number summary

Show the five-number summary (minimum score, first quartile, median, third quartile, and maximum score) for the transaction amount, by using box plots:

```r
library(ggplot2)
library(dplyr)

ggplot(data_df, aes(x = as.factor(Class), y = Amount, fill = as.factor(Class))) +
  geom_boxplot(outlier.shape = NA) +
  scale_x_discrete(labels = c("no fraud", "fraud")) +
  ggtitle("Boxplot without Outliers") +
  coord_cartesian(ylim = quantile(data_df$Amount, c(0.05, 0.95)))
```

:::image type="content" source="media/r-fraud-detection/box-plot.png" alt-text="Screenshot that shows box plots for transaction amount split by class.":::

When the data is highly imbalanced, these box plots might not demonstrate accurate insights. Alternatively, you can address the `Class` imbalance problem first and then create the same plots for more accurate insights.

## Step 4: Train and evaluate the models

In this section, you train a LightGBM model to classify the fraud transactions. You train a LightGBM model on both the imbalanced dataset and the balanced dataset. Then, you compare the performance of both models.

### Prepare training and testing datasets

Before training, split the data to the training and testing datasets:

```r
# Split the dataset into training and testing datasets
set.seed(42)
train_sample_ids <- base::sample(seq_len(nrow(data_df)), size = floor(0.85 * nrow(data_df)))

train_df <- data_df[train_sample_ids, ]
test_df <- data_df[-train_sample_ids, ]
```

### Apply SMOTE to the training dataset

The problem with imbalanced classification is that there are too few examples of the minority class for a model to effectively learn the decision boundary. Synthetic Minority Oversampling Technique (SMOTE) is the most widely used approach to synthesize new samples for the minority class. You can access SMOTE by using the `imbalance` library that you installed in Step 1.

Apply SMOTE only to the training dataset, and not to the testing dataset. When you score the model with the test data, you want an approximation of the model's performance on unseen data in production. For this approximation to be valid, your test data needs to represent production data as closely as possible by having the original imbalanced distribution.

```r
# Apply SMOTE to the training dataset
library(imbalance)

# Print the shape of the original (imbalanced) training dataset
train_y_categ <- train_df %>% select(Class) %>% table
message(
    paste0(
        "Original dataset shape ",
        paste(names(train_y_categ), train_y_categ, sep = ": ", collapse = ", ")
    )
)

# Resample the training dataset by using SMOTE
smote_train_df <- train_df %>%
    mutate(Class = factor(Class)) %>%
    oversample(ratio = 0.99, method = "SMOTE", classAttr = "Class") %>%
    mutate(Class = as.integer(as.character(Class)))

# Print the shape of the resampled (balanced) training dataset
smote_train_y_categ <- smote_train_df %>% select(Class) %>% table
message(
    paste0(
        "Resampled dataset shape ",
        paste(names(smote_train_y_categ), smote_train_y_categ, sep = ": ", collapse = ", ")
    )
)
```

To learn more about SMOTE, see [Package `imbalance`](https://cran.r-project.org/web/packages/imbalance/imbalance.pdf) and [Working with imbalanced datasets](https://cran.r-project.org/web/packages/imbalance/vignettes/imbalance.pdf) on the CRAN website.

### Train the model by using LightGBM

Train the LightGBM model by using both the imbalanced dataset and the balanced (via SMOTE) dataset, and then compare their performance:

```r
# Train LightGBM for both imbalanced and balanced datasets and define the evaluation metrics
library(lightgbm)

# Get the ID of the label column
label_col <- which(names(train_df) == "Class")

# Convert the testing dataset for the model
test_mtx <- as.matrix(test_df)
test_x <- test_mtx[, -label_col]
test_y <- test_mtx[, label_col]

# Set up the parameters for training
params <- list(
    objective = "binary",
    learning_rate = 0.05,
    first_metric_only = TRUE
)

# Train for the imbalanced dataset
message("Start training with imbalanced data:")
train_mtx <- as.matrix(train_df)
train_x <- train_mtx[, -label_col]
train_y <- train_mtx[, label_col]
train_data <- lgb.Dataset(train_x, label = train_y)
valid_data <- lgb.Dataset.create.valid(train_data, test_x, label = test_y)
model <- lgb.train(
    data = train_data,
    params = params,
    eval = list("binary_logloss", "auc"),
    valids = list(valid = valid_data),
    nrounds = 300L
)

# Train for the balanced (via SMOTE) dataset   
message("\n\nStart training with balanced data:")
smote_train_mtx <- as.matrix(smote_train_df)
smote_train_x <- smote_train_mtx[, -label_col]
smote_train_y <- smote_train_mtx[, label_col]
smote_train_data <- lgb.Dataset(smote_train_x, label = smote_train_y)
smote_valid_data <- lgb.Dataset.create.valid(smote_train_data, test_x, label = test_y)
smote_model <- lgb.train(
    data = smote_train_data,
    params = params,
    eval = list("binary_logloss", "auc"),
    valids = list(valid = smote_valid_data),
    nrounds = 300L
)
```

### Determine feature importance

Determine feature importance for the model that you trained on the imbalanced dataset:

```r
imp <- lgb.importance(model, percentage = TRUE)
ggplot(imp, aes(x = Frequency, y = reorder(Feature, Frequency), fill = Frequency)) +
  scale_fill_gradient(low="steelblue", high="tomato") +
  geom_bar(stat = "identity") +
  geom_text(aes(label = sprintf("%.4f", Frequency)), hjust = -0.1) +
  theme(axis.text.x = element_text(angle = 90)) +
  xlim(0, max(imp$Frequency) * 1.1)
```

:::image type="content" source="media/r-fraud-detection/feature-importance-imbalanced.png" alt-text="Screenshot of a bar chart that shows feature importance for the imbalanced model.":::

Determine the feature importance for the model that you trained on the balanced (via SMOTE) dataset:

```r
smote_imp <- lgb.importance(smote_model, percentage = TRUE)
ggplot(smote_imp, aes(x = Frequency, y = reorder(Feature, Frequency), fill = Frequency)) +
  geom_bar(stat = "identity") +
  scale_fill_gradient(low="steelblue", high="tomato") +
  geom_text(aes(label = sprintf("%.4f", Frequency)), hjust = -0.1) +
  theme(axis.text.x = element_text(angle = 90)) +
  xlim(0, max(smote_imp$Frequency) * 1.1)
```

:::image type="content" source="media/r-fraud-detection/feature-importance-balanced.png" alt-text="Screenshot of a bar chart that shows feature importance for the balanced model.":::

Comparison of the preceding plots clearly shows that the importance of features is drastically different between imbalanced and balanced training datasets.

### Evaluate the models

In this section, you evaluate the two trained models:

- `model` trained on raw, imbalanced data
- `smote_model` trained on balanced data

```r
preds <- predict(model, test_mtx[, -label_col])
smote_preds <- predict(smote_model, test_mtx[, -label_col])
```

### Evaluate model performance by using a confusion matrix

A *confusion matrix* displays the number of true positives (TP), true negatives (TN), false positives (FP), and false negatives (FN) that a model produces when it's scored with test data. For binary classification, you get a `2x2` confusion matrix. For multiclass classification, you get an `nxn` confusion matrix, where `n` is the number of classes.

Use a confusion matrix to summarize the performance of the trained machine learning models on the test data:

```r
plot_cm <- function(preds, refs, title) {
    library(caret)
    cm <- confusionMatrix(factor(refs), factor(preds))
    cm_table <- as.data.frame(cm$table)
    cm_table$Prediction <- factor(cm_table$Prediction, levels=rev(levels(cm_table$Prediction)))

    ggplot(cm_table, aes(Reference, Prediction, fill = Freq)) +
            geom_tile() +
            geom_text(aes(label = Freq)) +
            scale_fill_gradient(low = "white", high = "steelblue", trans = "log") +
            labs(x = "Prediction", y = "Reference", title = title) +
            scale_x_discrete(labels=c("0", "1")) +
            scale_y_discrete(labels=c("1", "0")) +
            coord_equal() +
            theme(legend.position = "none")
}
```

Plot the confusion matrix for the model that you trained on the imbalanced dataset:

```r
# The value of the prediction indicates the probability that a transaction is fraud
# Use 0.5 as the threshold for fraud/no-fraud transactions
plot_cm(ifelse(preds > 0.5, 1, 0), test_df$Class, "Confusion Matrix (Imbalanced dataset)")
```

:::image type="content" source="media/r-fraud-detection/confusion-matrix-imbalanced.png" alt-text="Screenshot of a confusion matrix for the imbalanced model.":::

Plot the confusion matrix for the model that you trained on the balanced dataset:

```r
plot_cm(ifelse(smote_preds > 0.5, 1, 0), test_df$Class, "Confusion Matrix (Balanced dataset)")
```

:::image type="content" source="media/r-fraud-detection/confusion-matrix-balanced.png" alt-text="Screenshot of a confusion matrix for the balanced model.":::

### Evaluate model performance by using AUC-ROC and AUPRC measures

The Area Under the Curve Receiver Operating Characteristic (AUC-ROC) measure is widely used to assess the performance of binary classifiers. AUC-ROC is a chart that visualizes the trade-off between the true positive rate (TPR) and the false positive rate (FPR).

In some cases, it's more appropriate to evaluate your classifier based on the Area Under the Precision-Recall Curve (AUPRC) measure. The AUPRC is a curve that combines these rates:

- The precision, also called the positive predictive value (PPV)
- The recall, also called TPR

```r
# Use the PRROC package to help calculate and plot AUC-ROC and AUPRC
install.packages("PRROC", quiet = TRUE)
library(PRROC)
```

### Calculate the AUC-ROC and AUPRC metrics

Calculate and plot the AUC-ROC and AUPRC metrics for each of the two models.

#### Imbalanced dataset

Calculate the predictions:

```r
fg <- preds[test_df$Class == 1]
bg <- preds[test_df$Class == 0]
```

Print the area under the AUC-ROC curve:

```r
# Compute AUC-ROC
roc <- roc.curve(scores.class0 = fg, scores.class1 = bg, curve = TRUE)
print(roc)
```

Plot the AUC-ROC curve:

```r
# Plot AUC-ROC
plot(roc)
```

:::image type="content" source="media/r-fraud-detection/roc-curve-balanced.png" alt-text="Screenshot of a graph that shows the AUC-ROC curve for the imbalanced model.":::

Print the AUPRC curve:

```r
# Compute AUPRC
pr <- pr.curve(scores.class0 = fg, scores.class1 = bg, curve = TRUE)
print(pr)
```

Plot the AUPRC curve:

```r
# Plot AUPRC
plot(pr)
```

:::image type="content" source="media/r-fraud-detection/auprc-curve-imbalanced.png" alt-text="Screenshot of a graph that shows the AUPRC curve for the imbalanced model.":::

#### Balanced (via SMOTE) dataset

Calculate the predictions:

```r
smote_fg <- smote_preds[test_df$Class == 1]
smote_bg <- smote_preds[test_df$Class == 0]
```

Print the AUC-ROC curve:

```r
# Compute AUC-ROC
smote_roc <- roc.curve(scores.class0 = smote_fg, scores.class1 = smote_bg, curve = TRUE)
print(smote_roc)
```

Plot the AUC-ROC curve:

```r
# Plot AUC-ROC
plot(smote_roc)
```

:::image type="content" source="media/r-fraud-detection/roc-curve-balanced.png" alt-text="Screenshot of a graph that shows the AUC-ROC curve for the balanced model.":::

Print the AUPRC curve:

```r
# Compute AUPRC
smote_pr <- pr.curve(scores.class0 = smote_fg, scores.class1 = smote_bg, curve = TRUE)
print(smote_pr)
```

Plot the AUPRC curve:

```r
# Plot AUPRC
plot(smote_pr)
```

:::image type="content" source="media/r-fraud-detection/auprc-curve-balanced.png" alt-text="Screenshot of a graph that shows the AUPRC curve for the balanced model.":::

The preceding figures clearly show that the model that you trained on the balanced dataset outperforms the model that you trained on the imbalanced dataset, in terms of both AUC-ROC and AUPRC scores. This outcome suggests that SMOTE is an effective technique to enhance model performance when you're working with highly imbalanced data.

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training/model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)
