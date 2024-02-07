---
title: 'Tutorial: Use R to predict churn'
description: This tutorial shows a data science work flow in R, with an end-to-end example of building a model to predict churn.
ms.reviewer: fsolomon
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - ignite-2023
ms.date: 01/22/2024
#customer intent: As a data scientist, I want to build a machine learning model by using R so I can predict customer churn.
---

# Tutorial: Use R to create, evaluate, and score a churn prediction model

This tutorial presents an end-to-end example of a [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] workflow in [!INCLUDE [product-name](../includes/product-name.md)]. The scenario builds a model to predict whether or not bank customers churn. The churn rate, or the rate of attrition, involves the rate at which bank customers end their business with the bank.

This tutorial covers these steps:

> [!div class="checklist"]
> * Install custom libraries
> * Load the data
> * Understand and process the data through exploratory data analysis
> * Use scikit-learn and LightGBM to train machine learning models
> * Evaluate and save the final machine learning model
> * Show the model performance with Power BI visualizations

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If necessary, create a Microsoft Fabric lakehouse as described in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in a notebook

You can choose one of these options to follow along in a notebook:

- Open and run the built-in notebook in the Synapse Data Science experience.
- Upload your notebook from GitHub to the Synapse Data Science experience.

### Open the built-in notebook

The sample **Customer churn** notebook accompanies this tutorial.

[!INCLUDE [follow-along-built-in-notebook](includes/follow-along-built-in-notebook.md)]

### Import the notebook from GitHub

The [AIsample - R Bank Customer Churn.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Bank%20Customer%20Churn.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Bank%20Customer%20Churn.ipynb -->

## Step 1: Install custom libraries

For machine learning model development or ad-hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. You have two options to install libraries.

* Use inline installation resources, for example `install.packages` and `devtools::install_version`, to install in your current notebook only.
* Alternatively, you can create a Fabric environment, install libraries from public sources or upload custom libraries to it, and then your workspace admin can attach the environment as the default for the workspace. All the libraries in the environment will then become available for use in any notebooks and Spark job definitions in the workspace. For more information on environments, see [create, configure, and use an environment in Microsoft Fabric](https://aka.ms/fabric/create-environment).

In this tutorial, use `install.packages()` to install the `imbalance` and `randomForest` libraries. Set `quiet` to `TRUE` to make the output more concise:

```r
# Install imbalance for SMOTE
install.packages("imbalance", quiet = TRUE)
# Install the random forest algorithm
install.packages("randomForest", quiet=TRUE)
```

## Step 2: Load the data

The dataset in *churn.csv* contains the churn status of 10,000 customers, along with 14 attributes that include:

- Credit score
- Geographical location (Germany, France, Spain)
- Gender (male, female)
- Age
- Tenure (number of years the person was a customer at that bank)
- Account balance
- Estimated salary
- Number of products that a customer purchased through the bank
- Credit card status (whether or not a customer has a credit card)
- Active member status (whether or not the person is an active bank customer)

The dataset also includes row number, customer ID, and customer surname columns. Values in these columns shouldn't influence a customer's decision to leave the bank.

A customer bank account closure event defines the churn for that customer. The dataset `Exited` column refers to the customer's abandonment. Since we have little context about these attributes, we don't need background information about the dataset. We want to understand how these attributes contribute to the `Exited` status.

Out of the 10,000 customers, only 2037 customers (around 20%) left the bank. Because of the class imbalance ratio, we recommend generating synthetic data generation.

This table shows a preview sample of the `churn.csv` data:

|CustomerID|Surname|CreditScore|Geography|Gender|Age|Tenure|Balance|NumOfProducts|HasCrCard|IsActiveMember|EstimatedSalary|Exited|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|

### Download the dataset and upload to the lakehouse

> [!IMPORTANT]
> [Add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before you run it. Failure to do so will result in an error.

This code downloads a publicly available version of the dataset, and then stores that data in a Fabric lakehouse:

```r
library(fs)
library(httr)

remote_url <- "https://sdkstorerta.blob.core.windows.net/churnblob"
file_list <- c("churn.csv")
download_path <- "/lakehouse/default/Files/churn/raw"

if (!dir_exists("/lakehouse/default")) {
  stop("Default lakehouse not found, please add a lakehouse and restart the session.")
}
dir_create(download_path, recurse= TRUE)
for (fname in file_list) {
  if (!file_exists(paste0(download_path, "/", fname))) {
    r <- GET(paste0(remote_url, "/", fname), timeout(30))
    writeBin(content(r, "raw"), paste0(download_path, "/", fname))
  }
}
print("Downloaded demo data files into lakehouse.")
```

Start recording the time needed to run this notebook:

```r
# Record the notebook running time
ts <- as.numeric(Sys.time())
```

### Read raw date data from the lakehouse

This code reads raw data from the **Files** section of the lakehouse:

```r
fname <- "churn.csv"
download_path <- "/lakehouse/default/Files/churn/raw"
rdf <- readr::read_csv(paste0(download_path, "/", fname))
```

## Step 3: Perform exploratory data analysis

### Display raw data

Use the `head()` or `str()` commands to perform a preliminary exploration of the raw data:  

```r
head(rdf)
```

### Perform initial data cleaning

You must convert the R DataFrame to a Spark DataFrame. These operations on the Spark DataFrame clean the raw dataset:

- Drop the rows that have missing data across all columns
- Drop the duplicate rows across the columns `RowNumber` and `CustomerId`
- Drop the columns `RowNumber`, `CustomerId`, and `Surname`

```r
# Transform the R DataFrame to a Spark DataFrame
df <- as.DataFrame(rdf)

clean_data <- function(df) {
  sdf <- df %>%
    # Drop rows that have missing data across all columns
    na.omit() %>%
    # Drop duplicate rows in columns: 'RowNumber', 'CustomerId'
    dropDuplicates(c("RowNumber", "CustomerId")) %>%
    # Drop columns: 'RowNumber', 'CustomerId', 'Surname'
    SparkR::select("CreditScore", "Geography", "Gender", "Age", "Tenure", "Balance", "NumOfProducts", "HasCrCard", "IsActiveMember", "EstimatedSalary", "Exited")
  return(sdf)
}

df_clean <- clean_data(df)
```

Explore the Spark DataFrame with the `display` command:

```r
display(df_clean)
```

This code determines the categorical, numerical, and target attributes:

```r
# Determine the dependent (target) attribute
dependent_variable_name <- "Exited"
print(dependent_variable_name)

# Obtain the distinct values for each column
exprs = lapply(names(df_clean), function(x) alias(countDistinct(df_clean[[x]]), x))
# Use do.call to splice the aggregation expressions to aggregate function
distinct_value_number <- SparkR::collect(do.call(agg, c(x = df_clean, exprs)))

# Determine the categorical attributes
categorical_variables <- names(df_clean)[sapply(names(df_clean), function(col) col %in% c("0") || distinct_value_number[[col]] <= 5 && !(col %in% c(dependent_variable_name)))]
print(categorical_variables)

# Determine the numerical attributes
numeric_variables <- names(df_clean)[sapply(names(df_clean), function(col) coltypes(SparkR::select(df_clean, col)) == "numeric" && distinct_value_number[[col]] > 5)]
print(numeric_variables)
```

For easier processing and visualization, convert the cleaned Spark DataFrame to an R DataFrame:

```r
# Transform the Spark DataFrame to an R DataFrame
rdf_clean <- SparkR::collect(df_clean)
```

### Show the five-number summary

Use box plots to show the five-number summary (minimum score, first quartile, median, third quartile, maximum score) for the numerical attributes:

```r
# Set the overall layout of the graphics window
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # Margin size

for(item in numeric_variables[1:2]){
    # Create a box plot
    boxplot(rdf_clean[, item], 
            main = item, 
            col = "darkgreen", 
            cex.main = 1.5, # Title size
            cex.lab = 1.3, # Axis label size
            cex.axis = 1.2,
            horizontal = TRUE) # Axis size
}
```

:::image type="content" source="media/r-customer-churn/box-plots.png" alt-text="Screenshot that shows box plots for credit score and age.":::

```r
# Set the overall layout of the graphics window
par(mfrow = c(3, 1), 
    mar = c(2, 1, 2, 1)) # Margin size

for(item in numeric_variables[3:5]){
    # Create a box plot
    boxplot(rdf_clean[, item], 
            main = item, 
            col = "darkgreen", 
            cex.main = 1.5, # Title size
            cex.lab = 1.3, # Axis label size
            cex.axis = 1.2,
            horizontal = TRUE) # Axis size
}
```

:::image type="content" source="media/r-customer-churn/box-plots-numeric.png" alt-text="Screenshot that shows box plots for numeric variables.":::

### Show the distribution of exited and non-exited customers

Show the distribution of exited versus non-exited customers, across the categorical attributes:

```r
attr_list <- c('Geography', 'Gender', 'HasCrCard', 'IsActiveMember', 'NumOfProducts', 'Tenure')
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # Margin size
for (item in attr_list[1:2]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # Title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}
```

:::image type="content" source="media/r-customer-churn/bar-charts-1.png" alt-text="Screenshot that shows bar plots split by geography and gender.":::

```r
par(mfrow = c(2, 1), 
    mar = c(2, 2, 2, 1)) # Margin size
for (item in attr_list[3:4]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # Title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}
```

:::image type="content" source="media/r-customer-churn/bar-charts-2.png" alt-text="Screenshot that shows bar charts for customers that have a credit card and are active members.":::

```r
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # Margin size
for (item in attr_list[5:6]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # Title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}
```

:::image type="content" source="media/r-customer-churn/bar-charts-3.png" alt-text="Screenshot that shows bar charts for number of products and tenure.":::

### Show the distribution of numerical attributes

Use a histogram to show the frequency distribution of numerical attributes:

```r
# Set the overall layout of the graphics window
par(mfrow = c(2, 1), 
    mar = c(2, 4, 2, 4) + 0.1) # Margin size

# Create a histogram
for (item in numeric_variables[1:2]) {
    hist(rdf_clean[, item], 
         main = item, 
         col = "darkgreen", 
         xlab = item,
         cex.main = 1.5, # Title size
         cex.axis = 1.2,
         breaks = 20) # Number of bins
}
```

:::image type="content" source="media/r-customer-churn/histogram.png" alt-text="Screenshot of a graph that shows the distribution of credit score and age.":::

```r
# Set the overall layout of the graphics window
par(mfrow = c(3, 1), 
    mar = c(2, 4, 2, 4) + 0.1) # Margin size

# Create a histogram
for (item in numeric_variables[3:5]) {
    hist(rdf_clean[, item], 
         main = item, 
         col = "darkgreen", 
         xlab = item,
         cex.main = 1.5, # Title size
         cex.axis = 1.2,
         breaks = 20) # Number of bins
}
```

:::image type="content" source="media/r-customer-churn/histogram-2.png" alt-text="Screenshot of a graph that shows the distribution of numeric variables.":::

### Perform feature engineering

This feature engineering generates new attributes based on current attributes:

```r
rdf_clean$NewTenure <- rdf_clean$Tenure / rdf_clean$Age
rdf_clean$NewCreditsScore <- as.numeric(cut(rdf_clean$CreditScore, breaks=quantile(rdf_clean$CreditScore, probs=seq(0, 1, by=1/6)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5, 6)))
rdf_clean$NewAgeScore <- as.numeric(cut(rdf_clean$Age, breaks=quantile(rdf_clean$Age, probs=seq(0, 1, by=1/8)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5, 6, 7, 8)))
rdf_clean$NewBalanceScore <- as.numeric(cut(rank(rdf_clean$Balance), breaks=quantile(rank(rdf_clean$Balance, ties.method = "first"), probs=seq(0, 1, by=1/5)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5)))
rdf_clean$NewEstSalaryScore <- as.numeric(cut(rdf_clean$EstimatedSalary, breaks=quantile(rdf_clean$EstimatedSalary, probs=seq(0, 1, by=1/10)), include.lowest=TRUE, labels=c(1:10)))
```

### Perform one-hot encoding

Use one-hot encoding to convert the categorical attributes to numerical attributes, to feed them into the machine learning model:

```r
rdf_clean <- cbind(rdf_clean, model.matrix(~Geography+Gender-1, data=rdf_clean))
rdf_clean <- subset(rdf_clean, select = - c(Geography, Gender))
```

### Create a delta table to generate the Power BI report

```r
table_name <- "rdf_clean"
# Create a Spark DataFrame from an R DataFrame
sparkDF <- as.DataFrame(rdf_clean)
write.df(sparkDF, paste0("Tables/", table_name), source = "delta", mode = "overwrite")
cat(paste0("Spark DataFrame saved to delta table: ", table_name))
```

### Summary of observations from the exploratory data analysis

- Most of the customers are from France. Spain has the lowest churn rate, compared to France and Germany.
- Most customers have credit cards
- Some customers are both over the age of 60 and have credit scores below 400. However, they can't be considered as outliers
- Few customers have more than two bank products
- Inactive customers have a higher churn rate
- Gender and tenure years have little impact on a customer's decision to close a bank account

## Step 4: Perform model training

With the data in place, you can now define the model. Apply Random Forest and LightGBM models. Use randomForest and LightGBM to implement the models with a few lines of code.

Load the delta table from the lakehouse. You can use other delta tables that consider the lakehouse as the source.

```r
SEED <- 12345
rdf_clean <- read.df("Tables/rdf_clean", source = "delta")
df_clean <- as.data.frame(rdf_clean)
```

Import randomForest and LightGBM:

```r
library(randomForest)
library(lightgbm)
```

Prepare the training and testing datasets:

```r
set.seed(SEED)
y <- factor(df_clean$Exited)
X <- df_clean[, !(colnames(df_clean) %in% c("Exited"))]
split <- base::sample(c(TRUE, FALSE), nrow(df_clean), replace = TRUE, prob = c(0.8, 0.2))
X_train <- X[split,]
X_test <- X[!split,]
y_train <- y[split]
y_test <- y[!split]
train_df <- cbind(X_train, y_train)
```

### Apply SMOTE to the training dataset

Imbalanced classification has a problem, because it has too few examples of the minority class for a model to effectively learn the decision boundary. To handle this, Synthetic Minority Oversampling Technique (SMOTE) is the most widely used technique to synthesize new samples for the minority class. Access SMOTE with the `imblearn` library that you installed in step 1.

Apply SMOTE only to the training dataset. You must leave the test dataset in its original imbalanced distribution, to get a valid approximation of model performance on the original data. This experiment represents the situation in production.

First, show the distribution of classes in the dataset, to learn which class is the minority class. The ratio of minority class to majority class is defined as `imbalance Ratio` in the `imbalance` library.

```r
original_ratio <- imbalance::imbalanceRatio(train_df, classAttr = "y_train")
message(sprintf("Original imbalance ratio is %.2f%% as {Size of minority class}/{Size of majority class}.", original_ratio * 100))
message(sprintf("Positive class(Exited) takes %.2f%% of the dataset.", round(sum(train_df$y_train == 1)/nrow(train_df) * 100, 2)))
message(sprintf("Negative class(Non-Exited) takes %.2f%% of the dataset.", round(sum(train_df$y_train == 0)/nrow(train_df) * 100, 2)))
```

In the training dataset:

- `Positive class(Exited)` refers to the minority class, which takes 20.34% of the dataset.
- `Negative class(Non-Exited)` refers to the majority class, which takes 79.66% of the dataset.

The next cell rewrites the oversample function of the `imbalance` library, to generate a balanced dataset:

```r
binary_oversample <- function(train_df, X_train, y_train, class_Attr = "Class"){
    negative_num <- sum(y_train == 0) # Compute the number of the negative class
    positive_num <- sum(y_train == 1) # Compute the number of the positive class
    difference_num <- abs(negative_num - positive_num) # Compute the difference between the negative and positive classes
    originalShape <- imbalance:::datasetStructure(train_df, class_Attr) # Get the original dataset schema
    new_samples <- smotefamily::SMOTE(X_train, y_train, dup_size = ceiling(max(negative_num, positive_num)/min(negative_num, positive_num))) # Use SMOTE to oversample
    new_samples <- new_samples$syn_data # Get the synthetic data
    new_samples <- new_samples[base::sample(1:nrow(new_samples), size = difference_num), ] # Sample and shuffle the synthetic data
    new_samples <- new_samples[, -ncol(new_samples)] # Remove the class column
    new_samples <- imbalance:::normalizeNewSamples(originalShape, new_samples) # Normalize the synthetic data
    new_train_df <- rbind(train_df, new_samples) # Concatenate original and synthetic data by row
    new_train_df <- new_train_df[base::sample(nrow(new_train_df)), ] # Shuffle the training dataset
    new_train_df
}
```

To learn more about SMOTE, see the [Package `imbalance`](https://cran.r-project.org/web/packages/imbalance/imbalance.pdf) and [Working with imbalanced datasets](https://cran.r-project.org/web/packages/imbalance/vignettes/imbalance.pdf) resources on the CRAN website.

### Oversample the training dataset

Use the newly defined oversample function to perform oversampling on the training dataset:

```r
library(dplyr)
new_train_df <- binary_oversample(train_df, X_train, y_train, class_Attr="y_train")
smote_ratio <- imbalance::imbalanceRatio(new_train_df, classAttr = "y_train")
message(sprintf("Imbalance ratio after using smote is %.2f%%\n", smote_ratio * 100))
```

### Train the model

Use random forest to train the model, with four features:

```r
set.seed(1)
rfc1_sm <- randomForest(y_train ~ ., data = new_train_df, ntree = 500, mtry = 4, nodesize = 3)
y_pred <- predict(rfc1_sm, X_test, type = "response")
cr_rfc1_sm <- caret::confusionMatrix(y_pred, y_test)
cm_rfc1_sm <- table(y_pred, y_test)
roc_auc_rfc1_sm <- pROC::auc(pROC::roc(as.numeric(y_test), as.numeric(y_pred)))
print(paste0("The auc is ", roc_auc_rfc1_sm))
```

Use random forest to train the model, with six features:

```r
rfc2_sm <- randomForest(y_train ~ ., data = new_train_df, ntree = 500, mtry = 6, nodesize = 3)
y_pred <- predict(rfc2_sm, X_test, type = "response")
cr_rfc2_sm <- caret::confusionMatrix(y_pred, y_test)
cm_rfc2_sm <- table(y_pred, y_test)
roc_auc_rfc2_sm <- pROC::auc(pROC::roc(as.numeric(y_test), as.numeric(y_pred)))
print(paste0("The auc is ", roc_auc_rfc2_sm))
```

Train the model with LightGBM:

```r
set.seed(42)
X_train <- new_train_df[, !(colnames(new_train_df) %in% c("y_train"))]
y_train <- as.numeric(as.character(new_train_df$y_train))
y_test <- as.numeric(as.character(y_test))
lgbm_sm_model <- lgb.train(list(objective = "binary", learning_rate = 0.1, max_delta_step = 2, nrounds = 100, max_depth = 10, eval_metric = "logloss"), lgb.Dataset(as.matrix(X_train), label = as.vector(y_train)), valids = list(test = lgb.Dataset(as.matrix(X_test), label = as.vector(as.numeric(y_test)))))
y_pred <- as.numeric(predict(lgbm_sm_model, as.matrix(X_test)) > 0.5)
accuracy <- mean(y_pred == as.vector(y_test))
cr_lgbm_sm <- caret::confusionMatrix(as.factor(y_pred), as.factor(as.vector(y_test)))
cm_lgbm_sm <- table(y_pred, as.vector(y_test))
roc_auc_lgbm_sm <- pROC::auc(pROC::roc(as.vector(y_test), y_pred))
print(paste0("The auc is ", roc_auc_lgbm_sm))
```

## Step 5: Evaluate and save the final machine learning model

Assess the performance of the saved models on the testing dataset:

```r
ypred_rfc1_sm <- predict(rfc1_sm, X_test, type = "response")
ypred_rfc2_sm <- predict(rfc2_sm, X_test, type = "response")
ypred_lgbm1_sm <- as.numeric(predict(lgbm_sm_model, as.matrix(X_test)) > 0.5)
```

Show true/false positives/negatives with a confusion matrix. Develop a script to plot the confusion matrix, to evaluate the classification accuracy:

```r
plot_confusion_matrix <- function(cm, classes, normalize=FALSE, title='Confusion matrix', cmap=heat.colors(10)) {
  if (normalize) {
    cm <- cm / rowSums(cm)
  }
  op <- par(mar = c(6,6,3,1))
  image(1:nrow(cm), 1:ncol(cm), t(cm[nrow(cm):1,]), col = cmap, xaxt = 'n', yaxt = 'n', main = title, xlab = "Prediction", ylab = "Reference")
  axis(1, at = 1:nrow(cm), labels = classes, las = 2)
  axis(2, at = 1:ncol(cm), labels = rev(classes))
  for (i in seq_len(nrow(cm))) {
    for (j in seq_len(ncol(cm))) {
      text(i, ncol(cm) - j + 1, cm[j,i], cex = 0.8)
    }
  }
  par(op)
}
```

Create a confusion matrix for the random forest classifier, with four features:

```r
cfm <- table(y_test, ypred_rfc1_sm)
plot_confusion_matrix(cfm, classes=c('Non Churn','Churn'), title='Random Forest with features of 4')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-random-forest-4.png" alt-text="Screenshot of a graph that shows a confusion matrix for random forest with four features.":::

Create a confusion matrix for the random forest classifier, with six features:

```r
cfm <- table(y_test, ypred_rfc2_sm)
plot_confusion_matrix(cfm, classes=c('Non  Churn','Churn'), title='Random Forest with features of 6')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-random-forest-6.png" alt-text="Screenshot of a graph that shows a confusion matrix for random forest with six features.":::

Create a confusion matrix for LightGBM:

```r
cfm <- table(y_test, ypred_lgbm1_sm)
plot_confusion_matrix(cfm, classes=c('Non Churn','Churn'), title='LightGBM')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-lightgbm.png" alt-text="Screenshot of a graph that shows a confusion matrix for LightGBM.":::

### Save results for Power BI

Save the delta frame to the lakehouse, to move the model prediction results to a Power BI visualization:

```r
df_pred <- X_test
df_pred$y_test <- y_test
df_pred$ypred_rfc1_sm <- ypred_rfc1_sm
df_pred$ypred_rfc2_sm <- ypred_rfc2_sm
df_pred$ypred_lgbm1_sm <- ypred_lgbm1_sm

table_name <- "df_pred_results"
sparkDF <- as.DataFrame(df_pred)
write.df(sparkDF, paste0("Tables/", table_name), source = "delta", mode = "overwrite", overwriteSchema = "true")

cat(paste0("Spark DataFrame saved to delta table: ", table_name))
```

## Step 6: Access visualizations in Power BI

Access your saved table in Power BI:

1. On the left, select **OneLake data hub**
1. Select the lakehouse that you added to this notebook
1. In the **Open this Lakehouse** section, select **Open**
1. On the ribbon, select **New semantic model**. Select `df_pred_results`, and then select **Continue** to create a new Power BI semantic model linked to the predictions
1. On the tools at the top of the dataset page, select **New report** to open the Power BI report authoring page.

The following screenshot shows some example visualizations. The data panel shows the delta tables and columns to select from a table. After selection of appropriate category (x) axis and value (y) axis, you can choose the filters and functions. For example, you can choose a sum or average of the table column.

> [!NOTE]
> The screenshot is an illustrated example that shows the analysis of the saved prediction results in Power BI. For a real use case of customer churn, platform users might need a more thorough ideation of the visualizations to create, based on both subject matter expertise and what the organization and business analytics team and firm have standardized as metrics.

:::image type="content" source="media/r-customer-churn/power-bi.png" alt-text="Screenshot that shows a Power BI dashboard of the data.":::

The Power BI report shows that customers who use more than two of the bank products have a higher churn rate. However, few customers had more than two products. (See the plot in the lower-left panel.) The bank should collect more data but also investigate other features that correlate with more products.

Bank customers in Germany have a higher churn rate compared to customers in France and Spain. (See the plot in the lower-right panel.) Based on the report results, an investigation into the factors that encouraged customers to leave might help.

There are more middle-aged customers (between 25 and 45). Customers between 45 and 60 tend to exit more.

Finally, customers with lower credit scores would most likely leave the bank for other financial institutions. The bank should explore ways to encourage customers with lower credit scores and account balances to stay with the bank.

```r
# Determine the entire runtime
cat(paste0("Full run cost ", as.integer(Sys.time() - ts), " seconds.\n"))
```

<!-- nbend -->

## Related content

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training/model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)