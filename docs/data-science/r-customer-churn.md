---
title: "Tutorial: Use R to predict churn"

description: This tutorial shows a data science work flow  in R, with an end-to-end example, building a model to predict churn. 
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.date: 09/21/2023
# customer intent: As a data scientist, I want to create a model to predict churn with R
---

# Tutorial: Use R to create, evaluate, and score a churn prediction model

In this tutorial, you'll see a Microsoft Fabric data science workflow in R with an end-to-end example. The scenario is to build a model to predict whether bank customers would churn or not. The churn rate, also known as the rate of attrition refers to the rate at which bank customers stop doing business with the bank.

[!INCLUDE [preview-note](../includes/preview-note.md)]

The main steps in this tutorial are

> [!div class="checklist"]
>
> - Install custom libraries
> - Load the data
> - Understand and process the data through exploratory data analysis
> - Train machine learning models using `Scikit-Learn` and `LightGBM`
> - Evaluate and save the final machine learning model
> - Demonstrate the model performance via visualizations in Power BI

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

* If you don't have a Microsoft Fabric lakehouse, create one by following the steps in [Create a lakehouse in Microsoft Fabric](../data-engineering/create-lakehouse.md).

## Follow along in the notebook

 [AIsample - R Bank Customer Churn.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Bank%20Customer%20Churn.ipynb is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along](./includes/follow-along.md)]

<!-- nbstart https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/data-science/ai-samples/r/AIsample%20-%20R%20Bank%20Customer%20Churn.ipynb -->

## Step 1: Install Custom Libraries

When developing a machine learning model or doing ad-hoc data analysis, you might need to quickly install a custom library for your Apache Spark session. To do so, use in-line installation capabilities such as `install.packages`and `devtools::install_version`. Alternatively, you could install the required libraries into the workspace, by navigating into the workspace setting to find Library management.

In this tutorial, you will use `install.packages()` to install the `imbalance` and `randomForest` libraries. Set `quiet` to `TRUE` to make output more concise:

```r
# Install imbalance for SMOTE
install.packages("imbalance", quiet = TRUE)
# Install Random Forest algorithm
install.packages("randomForest", quiet=TRUE)
```

## Step 2: Load the data

The dataset contains churn status of 10000 customers along with 14 attributes that include credit score, geographical location (Germany, France, Spain), gender (male, female), age, tenure (years of being bank's customer), account balance, estimated salary, number of products that a customer has purchased through the bank, credit card status (whether a customer has a credit card or not), and active member status (whether an active bank's customer or not).

The dataset also includes columns such as row number, customer ID, and customer surname that should have no impact on customer's decision to leave the bank. The event that defines the customer's churn is the closing of the customer's bank account, therefore, the column `exit` in the dataset refers to customer's abandonment. Since you don't have much context about these attributes, you'll proceed without having background information about the dataset. Your aim is to understand how these attributes contribute to the `exit` status.

Out of the 10000 customers, only 2037 customers (around 20%) have left the bank. Therefore, given the class imbalance ratio, it is recommended to generate synthetic data.

The following table shows a preview of the `churn.csv` data:

|"CustomerID"|"Surname"|"CreditScore"|"Geography"|"Gender"|"Age"|"Tenure"|"Balance"|"NumOfProducts"|"HasCrCard"|"IsActiveMember"|"EstimatedSalary"|"Exited"|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|


### Introduction to SMOTE

The problem with imbalanced classification is that there are too few examples of the minority class for a model to effectively learn the decision boundary. Synthetic Minority Oversampling Technique (SMOTE) is the most widely used approach to synthesize new samples for the minority class. To learn more about SMOTE, see [Package `imbalance`](https://cran.r-project.org/web/packages/imbalance/imbalance.pdf) and [Working with imbalanced datasets](https://cran.r-project.org/web/packages/imbalance/vignettes/imbalance.pdf).

You will be able to access SMOTE using the `imbalance` library that you installed in Step 1.

### Download dataset and upload to lakehouse

This code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> Be sure to [add a lakehouse](https://aka.ms/fabric/addlakehouse) to the notebook before running it. If you don't, you'll get an error.


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

Start recording the time it takes to run this notebook:


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

## Step 3: Exploratory Data Analysis

### Display raw data

Perform a preliminary exploration of the raw data using the `head()` or `str()` commands:  


```r
head(rdf)
```

#### Initial data cleansing

You first need to convert the R DataFrame to a Spark DataFrame. Perform the following operations on the Spark DataFrame to cleanse the raw dataset:

- Drop the rows with missing data across all columns
- Drop the duplicate rows across the columns `RowNumber` and `CustomerId`
- Drop the columns `RowNumber`, `CustomerId`, and `Surname`

```r
# Transform R DataFrame to Spark DataFrame
df <- as.DataFrame(rdf)

clean_data <- function(df) {
  sdf <- df %>%
    # Drop rows with missing data across all columns
    na.omit() %>%
    # Drop duplicate rows in columns: 'RowNumber', 'CustomerId'
    dropDuplicates(c("RowNumber", "CustomerId")) %>%
    # Drop columns: 'RowNumber', 'CustomerId', 'Surname'
    SparkR::select("CreditScore", "Geography", "Gender", "Age", "Tenure", "Balance", "NumOfProducts", "HasCrCard", "IsActiveMember", "EstimatedSalary", "Exited")
  return(sdf)
}

df_clean <- clean_data(df)
```

Now explore the Spark DataFrame with the `display` command:

```r
display(df_clean)
```

Next, look at categorical, numerical, and target attributes:

```r
# Determine the dependent (target) attribute
dependent_variable_name <- "Exited"
print(dependent_variable_name)

# Get the distinct values for each column
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

Convert the cleaned Spark DataFrame to an R DataFrame for easier processing and visualization:

```r
# Transfrom spark DataFrame to R DataFrame
rdf_clean <- SparkR::collect(df_clean)
```

### The five-number summary

Show the five-number summary (the minimum score, first quartile, median, third quartile, the maximum score) for the numerical attributes, using box plots:

```r
# Set the overall layout of the graphics window
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # margin size

for(item in numeric_variables[1:2]){
    # Create boxplot
    boxplot(rdf_clean[, item], 
            main = item, 
            col = "darkgreen", 
            cex.main = 1.5, # title size
            cex.lab = 1.3, # axis label size
            cex.axis = 1.2,
            horizontal = TRUE) # axis size
}
```

:::image type="content" source="media/r-customer-churn/box-plots.png" alt-text="Graph shows box plots for CreditScore and Age.":::

```r
# Set the overall layout of the graphics window
par(mfrow = c(3, 1), 
    mar = c(2, 1, 2, 1)) # margin size

for(item in numeric_variables[3:5]){
    # Create boxplot
    boxplot(rdf_clean[, item], 
            main = item, 
            col = "darkgreen", 
            cex.main = 1.5, # title size
            cex.lab = 1.3, # axis label size
            cex.axis = 1.2,
            horizontal = TRUE) # axis size
}
```

:::image type="content" source="media/r-customer-churn/box-plots-numeric.png" alt-text="Graph shows box plots for numeric variables.":::

### Distribution of exited and non-exited customers 

Show the distribution of exited versus non-exited customers across the categorical attributes:


```r
attr_list <- c('Geography', 'Gender', 'HasCrCard', 'IsActiveMember', 'NumOfProducts', 'Tenure')
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # margin size
for (item in attr_list[1:2]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}

```

:::image type="content" source="media/r-customer-churn/bar-charts-1.png" alt-text="Graph shows bar plots split by Geography and Gender.":::

```r
par(mfrow = c(2, 1), 
    mar = c(2, 2, 2, 1)) # margin size
for (item in attr_list[3:4]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}
```

:::image type="content" source="media/r-customer-churn/bar-charts-2.png" alt-text="Graph shows bar charts for HasCrCard and isActiveMember.":::

```r
par(mfrow = c(2, 1), 
    mar = c(2, 1, 2, 1)) # margin size
for (item in attr_list[5:6]) {
    counts <- table(rdf_clean$Exited, rdf_clean[,item])
    barplot(counts, main=item, col=c("darkblue","yellow"), 
            cex.main = 1.5, # title size
            cex.axis = 1.2,
            legend = rownames(counts), beside=TRUE)
}
```

:::image type="content" source="media/r-customer-churn/bar-charts-3.png" alt-text="Graph shows bar charts for NumofProducts and Tenure.":::

### Distribution of numerical attributes

Show the frequency distribution of numerical attributes using histogram.

```r
# Set the overall layout of the graphics window
par(mfrow = c(2, 1), 
    mar = c(2, 4, 2, 4) + 0.1) # margin size

# Create histograms
for (item in numeric_variables[1:2]) {
    hist(rdf_clean[, item], 
         main = item, 
         col = "darkgreen", 
         xlab = item,
         cex.main = 1.5, # title size
         cex.axis = 1.2,
         breaks = 20) # number of bins
}
```

:::image type="content" source="media/r-customer-churn/histogram.png" alt-text="Graph shows distribution of CreditScore and Age.":::

```r
# Set the overall layout of the graphics window
par(mfrow = c(3, 1), 
    mar = c(2, 4, 2, 4) + 0.1) # margin size

# Create histograms
for (item in numeric_variables[3:5]) {
    hist(rdf_clean[, item], 
         main = item, 
         col = "darkgreen", 
         xlab = item,
         cex.main = 1.5, # title size
         cex.axis = 1.2,
         breaks = 20) # number of bins
}
```

:::image type="content" source="media/r-customer-churn/histogram-2.png" alt-text="Graph shows distribution of numeric variables.":::

### Perform feature engineering

The following feature engineering generates new attributes based on current attributes.

```r
rdf_clean$NewTenure <- rdf_clean$Tenure / rdf_clean$Age
rdf_clean$NewCreditsScore <- as.numeric(cut(rdf_clean$CreditScore, breaks=quantile(rdf_clean$CreditScore, probs=seq(0, 1, by=1/6)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5, 6)))
rdf_clean$NewAgeScore <- as.numeric(cut(rdf_clean$Age, breaks=quantile(rdf_clean$Age, probs=seq(0, 1, by=1/8)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5, 6, 7, 8)))
rdf_clean$NewBalanceScore <- as.numeric(cut(rank(rdf_clean$Balance), breaks=quantile(rank(rdf_clean$Balance, ties.method = "first"), probs=seq(0, 1, by=1/5)), include.lowest=TRUE, labels=c(1, 2, 3, 4, 5)))
rdf_clean$NewEstSalaryScore <- as.numeric(cut(rdf_clean$EstimatedSalary, breaks=quantile(rdf_clean$EstimatedSalary, probs=seq(0, 1, by=1/10)), include.lowest=TRUE, labels=c(1:10)))
```

### Perform one-hot encoding

Use one-hot encoding to convert the categorical attributes to the numerical ones so that they can be fed into the machine learning model.

```r
rdf_clean <- cbind(rdf_clean, model.matrix(~Geography+Gender-1, data=rdf_clean))
rdf_clean <- subset(rdf_clean, select = - c(Geography, Gender))
```

### Create a delta table to generate the Power BI report

```r
table_name <- "rdf_clean"
# Create Spark DataFrame from R data frame
sparkDF <- as.DataFrame(rdf_clean)
write.df(sparkDF, paste0("Tables/", table_name), source = "delta", mode = "overwrite")
cat(paste0("Spark dataframe saved to delta table: ", table_name))
```

### Summary of observations from the exploratory data analysis

- Most of the customers are from France comparing to Spain and Germany, while Spain has the lowest churn rate comparing to France and Germany.
- Most of the customers have credit cards.
- There are customers whose age and credit score are above 60 and below 400, respectively, but they can't be considered as outliers.
- Very few customers have more than two of the bank's products.
- Customers who are not active have a higher churn rate.
- Gender and tenure years don't seem to have an impact on customer's decision to close the bank account.

## Step 4: Model Training

With your data in place, you can now define the model. You'll apply Random Forrest and LightGBM models in this tutorial. You will leverage `randomForest` and `lightgbm` to implement the models within a few lines of code. 

Load the delta table from the lakehouse:

You may use other delta tables considering the lakehouse as the source.


```r
SEED <- 12345
rdf_clean <- read.df("Tables/rdf_clean", source = "delta")
df_clean <- as.data.frame(rdf_clean)
```

Import `randomForest` and `lightgbm`:


```r
library(randomForest)
library(lightgbm)
```
Prepare training and test datasets:

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

### Apply SMOTE to the training data to synthesize new samples for the minority class

SMOTE should only be applied to the training dataset. You must leave the test dataset in its original imbalanced distribution in order to get a valid approximation of how the model will perform on the original data, which is representing the situation in production.

Start by showing the distribution of classes in the dataset in order to find out which class is the minority class. The ratio of minority class to majority class is defined as `imbalace ratio` in imbalance library.

```r
original_ratio <- imbalance::imbalanceRatio(train_df, classAttr = "y_train")
message(sprintf("Original imbalance ratio is %.2f%% as {Size of minority class}/{Size of majority class}.", original_ratio * 100))
message(sprintf("Positive class(Exited) takes %.2f%% of the dataset.", round(sum(train_df$y_train == 1)/nrow(train_df) * 100, 2)))
message(sprintf("Negatvie class(Non-Exited) takes %.2f%% of the dataset.", round(sum(train_df$y_train == 0)/nrow(train_df) * 100, 2)))
```

In the training dataset, the `positive class (Exited)` refers the minority class which takes 20.34% of the dataset and `negative class (Non-Exited)` refers to the majority class that takes 79.66% of the dataset. 

The next cell rewrites the oversample function in `imbalance` library in order to generate a balanced dataset:

```r
binary_oversample <- function(train_df, X_train, y_train, class_Attr = "Class"){
    negative_num <- sum(y_train == 0) # Compute the number of negative class
    positive_num <- sum(y_train == 1) # Compute the number of positive class
    difference_num <- abs(negative_num - positive_num) # Compute the difference between negative and positive class
    originalShape <- imbalance:::datasetStructure(train_df, class_Attr) # Get the original dataset schema
    new_samples <- smotefamily::SMOTE(X_train, y_train, dup_size = ceiling(max(negative_num, positive_num)/min(negative_num, positive_num))) # Use SMOTE to oversample
    new_samples <- new_samples$syn_data # Get the synthetic data
    new_samples <- new_samples[base::sample(1:nrow(new_samples), size = difference_num), ] # Sample and shuffle the synthetic data
    new_samples <- new_samples[, -ncol(new_samples)] # Remove the class colomn
    new_samples <- imbalance:::normalizeNewSamples(originalShape, new_samples) # Normalize the synthetic data
    new_train_df <- rbind(train_df, new_samples) # Concat original and synthetic data by row
    new_train_df <- new_train_df[base::sample(nrow(new_train_df)), ] # shuffle the training dataset
    new_train_df
}
```

### Oversample the training dataset 

Use the newly defined oversample function to perform oversampling on the training dataset.

```r
library(dplyr)
new_train_df <- binary_oversample(train_df, X_train, y_train, class_Attr="y_train")
smote_ratio <- imbalance::imbalanceRatio(new_train_df, classAttr = "y_train")
message(sprintf("Imbalance ratio after using smote is %.2f%%\n", smote_ratio * 100))
```


### Train the model

Train the model using Random Forest with four features:

```r
set.seed(1)
rfc1_sm <- randomForest(y_train ~ ., data = new_train_df, ntree = 500, mtry = 4, nodesize = 3)
y_pred <- predict(rfc1_sm, X_test, type = "response")
cr_rfc1_sm <- caret::confusionMatrix(y_pred, y_test)
cm_rfc1_sm <- table(y_pred, y_test)
roc_auc_rfc1_sm <- pROC::auc(pROC::roc(as.numeric(y_test), as.numeric(y_pred)))
print(paste0("The auc is ", roc_auc_rfc1_sm))
```

Train the model using Random Forest with six features:

```r
rfc2_sm <- randomForest(y_train ~ ., data = new_train_df, ntree = 500, mtry = 6, nodesize = 3)
y_pred <- predict(rfc2_sm, X_test, type = "response")
cr_rfc2_sm <- caret::confusionMatrix(y_pred, y_test)
cm_rfc2_sm <- table(y_pred, y_test)
roc_auc_rfc2_sm <- pROC::auc(pROC::roc(as.numeric(y_test), as.numeric(y_pred)))
print(paste0("The auc is ", roc_auc_rfc2_sm))
```

Train the model using LightGBM:

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


Assess the performances of the saved models on test dataset:

```r
ypred_rfc1_sm <- predict(rfc1_sm, X_test, type = "response")
ypred_rfc2_sm <- predict(rfc2_sm, X_test, type = "response")
ypred_lgbm1_sm <- as.numeric(predict(lgbm_sm_model, as.matrix(X_test)) > 0.5)
```

Show True/False Positives/Negatives using the Confusion Matrix:
 
 Develop a script to plot the confusion matrix in order to evaluate the accuracy of the classification.

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

Create the confusion matrix for Random Forest Classifier with four features:

```r
cfm <- table(y_test, ypred_rfc1_sm)
plot_confusion_matrix(cfm, classes=c('Non Churn','Churn'), title='Random Forest with features of 4')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-random-forest-4.png" alt-text="Graph shows confusion matrix for Random Forest with 4 features.":::

Create the confusion matrix for Random Forest Classifier with six features:

```r
cfm <- table(y_test, ypred_rfc2_sm)
plot_confusion_matrix(cfm, classes=c('Non  Churn','Churn'), title='Random Forest with features of 6')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-random-forest-6.png" alt-text="Graph shows confusion matrix for Random Forest with 6 features.":::

Create the confusion matrix for LightGBM:

```r
cfm <- table(y_test, ypred_lgbm1_sm)
plot_confusion_matrix(cfm, classes=c('Non Churn','Churn'), title='LightGBM')
tn <- cfm[1,1]
fp <- cfm[1,2]
fn <- cfm[2,1]
tp <- cfm[2,2]
```

:::image type="content" source="media/r-customer-churn/confusion-matrix-lightgbm.png" alt-text="Graph shows confusion matrix for LightGBM.":::

### Save results for Power BI

Move model prediction results to Power BI Visualization by saving delta frame to lakehouse:


```r
df_pred <- X_test
df_pred$y_test <- y_test
df_pred$ypred_rfc1_sm <- ypred_rfc1_sm
df_pred$ypred_rfc2_sm <- ypred_rfc2_sm
df_pred$ypred_lgbm1_sm <- ypred_lgbm1_sm

table_name <- "df_pred_results"
sparkDF <- as.DataFrame(df_pred)
write.df(sparkDF, paste0("Tables/", table_name), source = "delta", mode = "overwrite", overwriteSchema = "true")

cat(paste0("Spark dataframe saved to delta table: ", table_name))
```

## Step 6: Business Intelligence via Visualizations in Power BI

Use these steps to access your saved table in Power BI.

1. On the left, select **OneLake data hub**.
1. Select the lakehouse that you added to this notebook.
1. On the top right, select **Open** under the section titled **Open this Lakehouse**.
1. Select New Power BI dataset on the top ribbon and select `df_pred_results`, then select **Continue** to create a new Power BI dataset linked to the predictions.
1. On the tools at the top of the dataset page, select **New report** to open the Power BI report authoring page.

Some example visualizations are shown here. The data panel shows the delta tables and columns from the table to select. Upon selecting appropriate x and y axes, you can pick the filters and functions, for example, sum or average of the table column.

> [!NOTE]
> This shows an illustrated example of how you would analyze the saved prediction results in Power BI. However, for a real customer churn use-case, the platform user may have to do more thorough ideation of what visualizations to create, based on subject matter expertise, and what their firm and business analytics team has standardized as metrics.

:::image type="content" source="media/r-customer-churn/power-bi.png" alt-text="Screenshot shows a Power BI dashboard of the data.":::

The Power BI report shows that customers who use more than two of the bank products have a higher churn rate although few customers had more than two products. The bank should collect more data, but also investigate other features correlated with more products (see the plot in the bottom left panel).
Bank customers in Germany have a higher churn rate than in France and Spain (see the plot in the bottom right panel), which suggests that an investigation into what has encouraged customers to leave could be beneficial.
There are more middle aged customers (between 25-45) and customers between 45-60 tend to exit more.
Finally, customers with lower credit scores would most likely leave the bank for other financial institutes. The bank should look into ways that encourage customers with lower credit scores and account balances to stay with the bank.

```r
# Determine the entire runtime
cat(paste0("Full run cost ", as.integer(Sys.time() - ts), " seconds.\n"))
```

<!-- nbend -->


## Next steps

- [Machine learning model in Microsoft Fabric](machine-learning-model.md)
- [Train machine learning models](model-training/model-training-overview.md)
- [Machine learning experiments in Microsoft Fabric](machine-learning-experiment.md)