---
title: 'Tutorial: Use R to detect fraud'
description: This tutorial shows a data science workflow in R, with an end-to-end example of building a model to detect fraud.
ms.reviewer: fsolomon
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 01/22/2024
ms.search.form: R Language
#customer intent: As a data scientist, I want to build a machine learning model in R so I can detect future fraudulent transactions.
---

# Tutorial: Use R to create, evaluate, and score a fraud detection model

This tutorial presents an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. In this scenario, we build a fraud detection model, in R, with machine learning algorithms trained on historical data. We then use the model to detect future fraudulent transactions.

This tutorial covers these steps:

[!div class="checklist"]
> * Install custom libraries
> * Load the data
> * Understand and process the data with exploratory data analysis, and show the use of the Fabric Data Wrangler feature
> * Train machine learning models with LightGBM
> * Use the machine learning models for scoring and predictions

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If necessary, create a Microsoft Fabric lakehouse as described in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can choose one of these options to follow along in a notebook:

- Open and run the built-in notebook in the Synapse Data Science experience
- Upload your notebook from GitHub to the Synapse Data Science experience

### Open the built-in notebook

The sample **Fraud detection** notebook accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

The [AIsample - R Fraud Detection.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Fraud%20Detection.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Fraud%20Detection.ipynb -->

## Step 1: Install custom libraries

For machine learning model development or ad-hoc data analysis, you might need to install a custom library for your Apache Spark session. Use inline installation resources, for example `install.packages` and `devtools::install_version`, for that installation. You can also install the required libraries in the workspace. Navigate to **Library management** in the workspace settings.

In this tutorial, use `install.packages()` to install the imbalanced-learn library (imported as `imbalance`). Set `quiet` to `TRUE` to make output more concise:

```r
# Install imbalance for SMOTE
install.packages("imbalance", quiet = TRUE)
```

## Step 2: Load the data

The fraud detection dataset contains credit card transactions from September 2013, that European cardholders made over the course of two days. The dataset contains only numerical features because of a Principal Component Analysis (PCA) transformation applied to the original features. PCA transformed all features except for `Time` and `Amount`. To protect confidentiality, we can't provide the original features or more background information about the dataset.

These details describe the dataset:

- The `V1`, `V2`, `V3`, …, `V28` features are the principal components obtained with PCA
- The `Time` feature contains the elapsed seconds between a transaction and the first transaction in the dataset
- The `Amount` feature is the transaction amount. You can use this feature for example-dependent, cost-sensitive learning
- The `Class` column is the response (target) variable. It has the value `1` for fraud, and `0` otherwise

Only 492 transactions, out of 284,807 transactions total, are fraudulent. The dataset is highly imbalanced, because the minority (fraudulent) class accounts for only about 0.172% of the data.

This table shows a preview of the *creditcard.csv* data:

|Time|V1|V2|V3|V4|V5|V6|V7|V8|V9|V10|V11|V12|V13|V14|V15|V16|V17|V18|V19|V20|V21|V22|V23|V24|V25|V26|V27|V28|Amount|Class|
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
|0|-1.3598071336738|-0.0727811733098497|2.53634673796914|1.37815522427443|-0.338320769942518|0.462387777762292|0.239598554061257|0.0986979012610507|0.363786969611213|0.0907941719789316|-0.551599533260813|-0.617800855762348|-0.991389847235408|-0.311169353699879|1.46817697209427|-0.470400525259478|0.207971241929242|0.0257905801985591|0.403992960255733|0.251412098239705|-0.018306777944153|0.277837575558899|-0.110473910188767|0.0669280749146731|0.128539358273528|-0.189114843888824|0.133558376740387|-0.0210530534538215|149.62|"0"|
|0|1.19185711131486|0.26615071205963|0.16648011335321|0.448154078460911|0.0600176492822243|-0.0823608088155687|-0.0788029833323113|0.0851016549148104|-0.255425128109186|-0.166974414004614|1.61272666105479|1.06523531137287|0.48909501589608|-0.143772296441519|0.635558093258208|0.463917041022171|-0.114804663102346|-0.183361270123994|-0.145783041325259|-0.0690831352230203|-0.225775248033138|-0.638671952771851|0.101288021253234|-0.339846475529127|0.167170404418143|0.125894532368176|-0.00898309914322813|0.0147241691924927|2.69|"0"|

### Download the dataset and upload to the lakehouse

Define these parameters, so that you can use this notebook with different datasets:

```r
IS_CUSTOM_DATA <- FALSE  # If TRUE, the dataset has to be uploaded manually

IS_SAMPLE <- FALSE  # If TRUE, use only rows of data for training; otherwise, use all data
SAMPLE_ROWS <- 5000  # If IS_SAMPLE is True, use only this number of rows for training

DATA_ROOT <- "/lakehouse/default"
DATA_FOLDER <- "Files/fraud-detection"  # Folder with data files
DATA_FILE <- "creditcard.csv"  # Data file name
```

This code downloads a publicly available version of the dataset, and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Be sure to [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. Otherwise, you'll get an error.

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

Use the `display` command to view the high-level statistics of the dataset:

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

View the distribution of fraudulent versus nonfraudulent transactions with a plot, to show the class imbalance in the dataset:

```r
library(ggplot2)

ggplot(data_df, aes(x = factor(Class), fill = factor(Class))) +
  geom_bar(stat = "count") +
  scale_x_discrete(labels = c("no fraud", "fraud")) +
  ggtitle("Class Distributions \n (0: No Fraud || 1: Fraud)") +
  theme(plot.title = element_text(size = 10))
```

:::image type="content" source="media/r-fraud-detection/bar-plot-fraud.png" alt-text="Screenshot that shows a bar chart of fraud.":::

The plot clearly shows the dataset imbalance:

### Show the five-number summary

Show the five-number summary (minimum score, first quartile, median, third quartile, and maximum score) for the transaction amount, with box plots:

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

For highly imbalanced data, box plots might not show accurate insights. However, you can address the `Class` imbalance problem first, and then create the same plots for more accurate insights.

## Step 4: Train and evaluate the models

Here, you train a LightGBM model to classify the fraud transactions. You train a LightGBM model on both the imbalanced dataset and the balanced dataset. Then, you compare the performance of both models.

### Prepare training and test datasets

Before training, split the data to the training and test datasets:

```r
# Split the dataset into training and test datasets
set.seed(42)
train_sample_ids <- base::sample(seq_len(nrow(data_df)), size = floor(0.85 * nrow(data_df)))

train_df <- data_df[train_sample_ids, ]
test_df <- data_df[-train_sample_ids, ]
```

### Apply SMOTE to the training dataset

Imbalanced classification has a problem. It has too few minority class examples for a model to effectively learn the decision boundary. Synthetic Minority Oversampling Technique (SMOTE) can handle this problem. SMOTE is the most widely used approach to synthesize new samples for the minority class. You can access SMOTE by using the `imbalance` library that you installed in Step 1.

Apply SMOTE only to the training dataset, instead of the test dataset. When you score the model with the test data, you need an approximation of the model performance on unseen data in production. For a valid approximation, your test data relies on the original imbalanced distribution to represent production data as closely as possible.

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

For more Information about SMOTE, see the [Package 'imbalance'](https://cran.r-project.org/web/packages/imbalance/imbalance.pdf) and [Working with imbalanced datasets](https://cran.r-project.org/web/packages/imbalance/vignettes/imbalance.pdf) resources at the CRAN website.

### Train the model with LightGBM

Train the LightGBM model with both the imbalanced dataset and the balanced (via SMOTE) dataset. Then, compare their performance:

```r
# Train LightGBM for both imbalanced and balanced datasets and define the evaluation metrics
library(lightgbm)

# Get the ID of the label column
label_col <- which(names(train_df) == "Class")

# Convert the test dataset for the model
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

For the model that you trained on the balanced (via SMOTE) dataset, calculate the feature importance:

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

A comparison of these plots clearly shows that balanced and imbalanced training datasets have large feature importance differences.

### Evaluate the models

Here, you evaluate the two trained models:

- `model` trained on raw, imbalanced data
- `smote_model` trained on balanced data

```r
preds <- predict(model, test_mtx[, -label_col])
smote_preds <- predict(smote_model, test_mtx[, -label_col])
```

### Evaluate model performance with a confusion matrix

A *confusion matrix* displays the number of

* true positives (TP)
* true negatives (TN)
* false positives (FP)
* false negatives (FN)

that a model produces when scored with test data. For binary classification, the model returns a `2x2` confusion matrix. For multiclass classification, the model returns an `nxn` confusion matrix, where `n` is the number of classes.

1. Use a confusion matrix to summarize the performance of the trained machine learning models on the test data:

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

1. Plot the confusion matrix for the model trained on the imbalanced dataset:

    ```r
    # The value of the prediction indicates the probability that a transaction is fraud
    # Use 0.5 as the threshold for fraud/no-fraud transactions
    plot_cm(ifelse(preds > 0.5, 1, 0), test_df$Class, "Confusion Matrix (Imbalanced dataset)")
    ```

    :::image type="content" source="media/r-fraud-detection/confusion-matrix-imbalanced.png" alt-text="Screenshot of a confusion matrix for the imbalanced model.":::

1. Plot the confusion matrix for the model trained on the balanced dataset:

    ```r
    plot_cm(ifelse(smote_preds > 0.5, 1, 0), test_df$Class, "Confusion Matrix (Balanced dataset)")
    ```

    :::image type="content" source="media/r-fraud-detection/confusion-matrix-balanced.png" alt-text="Screenshot of a confusion matrix for the balanced model.":::

### Evaluate model performance with AUC-ROC and AUPRC measures

The Area Under the Curve Receiver Operating Characteristic (AUC-ROC) measure assesses the performance of binary classifiers. The AUC-ROC chart visualizes the trade-off between the true positive rate (TPR) and the false positive rate (FPR).

In some cases, it's more appropriate to evaluate your classifier based on the Area Under the Precision-Recall Curve (AUPRC) measure. The AUPRC curve combines these rates:

- The precision, or the positive predictive value (PPV)
- The recall, or TPR

```r
# Use the PRROC package to help calculate and plot AUC-ROC and AUPRC
install.packages("PRROC", quiet = TRUE)
library(PRROC)
```

### Calculate the AUC-ROC and AUPRC metrics

Calculate and plot the AUC-ROC and AUPRC metrics for the two models.

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

The earlier figures clearly show that the model trained on the balanced dataset outperforms the model trained on the imbalanced dataset, for both AUC-ROC and AUPRC scores. This result suggests that SMOTE effectively improves model performance when working with highly imbalanced data.

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training/model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)