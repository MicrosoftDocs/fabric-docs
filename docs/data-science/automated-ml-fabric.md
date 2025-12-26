---
title: Automated ML in Fabric
description: Overview of Automated ML in Fabric
ms.topic: overview
ms.custom: 
ms.author: scottpolly
author: s-polly
ms.date: 11/18/2024
reviewer: midesa
ms.reviewer: midesa
---

# Automated ML in Fabric (preview)

Automated Machine Learning (AutoML) enables users to build and deploy machine learning models by automating the most time-consuming and complex parts of the model development process. Traditionally, building a machine learning model requires expertise in data science, model selection, hyperparameter tuning, and evaluation—a process that can be resource-intensive and prone to trial-and-error. AutoML simplifies this by automatically selecting the best algorithms, tuning hyperparameters, and generating optimized models based on the input data and desired outcomes.

In Microsoft Fabric, AutoML becomes even more powerful by integrating seamlessly with the platform's data ecosystem, allowing users to build, train, and deploy models directly on their lakehouses. With AutoML, both technical and non-technical users can create predictive models quickly, making machine learning accessible to a broader audience. From forecasting demand to detecting anomalies and optimizing business operations, AutoML in Fabric accelerates the path from raw data to actionable insights, empowering users to leverage AI with minimal effort and maximum impact.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## How does AutoML work?

[FLAML (Fast and Lightweight AutoML)](https://microsoft.github.io/FLAML/docs/Use-Cases/Task-Oriented-AutoML) powers the AutoML capabilities in Fabric, enabling users to build, optimize, and deploy machine learning models seamlessly within the platform’s data ecosystem. 

FLAML is an open-source AutoML library designed to deliver accurate models quickly by focusing on efficiency, minimizing computational costs, and dynamically tuning hyperparameters. Behind the scenes, FLAML automates model selection and optimization using a resource-aware search strategy, balancing exploration and exploitation to identify the best models without exhaustive trial-and-error. Its adaptive search space and lightweight algorithms make it ideal for large datasets and constrained environments, ensuring scalable and fast performance. This integration with Fabric makes machine learning accessible to both technical and non-technical users, accelerating the path from raw data to actionable insights.

## Machine learning tasks

AutoML in Fabric supports a wide range of machine learning tasks, including classification, regression, and forecasting, making it versatile for various data-driven applications.

### Binary classification

Binary classification is a type of supervised machine learning task where the goal is to categorize data points into one of two distinct classes. It involves training a model on labeled data, where each instance is assigned to one of two possible categories, and the model learns to predict the correct class for new, unseen data. Examples include:

- **Spam Detection**: Classifying emails as either spam or not spam.
- **Fraud Detection:** Flagging financial transactions as fraudulent or legitimate.
- **Disease Screening:** Predicting whether a patient has a condition (positive) or not (negative).

### Multi-class classification

Multi-Class Classification for tabular data involves assigning one of several possible labels to each row of structured data based on the features in that dataset. Here are a few examples relevant to real-world tabular datasets:  

- **Customer Segmentation:** Classifying customers into segments such as "High-value," "Moderate-value," or "Low-value" based on demographic, purchase, and behavioral data.  
- **Loan Risk Assessment:** Predicting the risk level of a loan application as "Low," "Medium," or "High" using applicant data like income, credit score, and employment status.  
- **Product Category Prediction:** Assigning an appropriate product category, such as "Electronics," "Clothing," or "Furniture," based on attributes like price, brand, and product specifications.
- **Disease Diagnosis:** Identifying the type of disease a patient might have, such as "Diabetes Type 1," "Diabetes Type 2," or "Gestational Diabetes," based on clinical metrics and test results.

These examples highlight how multi-class classification can support decision-making in various industries, where the outcome can take one of several mutually exclusive categories.

### Regression

Regression is a type of machine learning used to predict a number based on other related data. It’s helpful when we want to estimate a specific value, like a price, temperature, or time, based on different factors that could affect it. Here are some example scenarios:

- Predicting **house prices** using information like square footage, number of rooms, and location.
- Estimating **monthly sales** based on marketing spend, seasonality, and past sales trends.

### Forecasting

Forecasting is a machine learning technique used to predict future values based on historical data. It’s especially useful for planning and decision-making in situations where past trends and patterns can inform what’s likely to happen next. Forecasting takes time-based data—also called **time series data**—and analyzes patterns like seasonality, trends, and cycles to make accurate predictions. Here are some example scenarios:

- **Sales Forecasting:** Predicting future sales figures based on past sales, seasonality, and market trends.
- **Inventory Forecasting:** Determining the future demand for products using previous purchasing data and seasonal cycles.

Forecasting helps organizations make informed decisions, whether it’s ensuring enough stock, planning resources, or preparing for market changes.

## Training and test datasets

Creating **training and test datasets** is an essential step in building machine learning models. The **training dataset** is used to teach the model, allowing it to learn patterns from labeled data, while the **test dataset** evaluates the model's performance on new, unseen data, helping to check its accuracy and generalizability. Splitting data this way ensures the model isn’t simply memorizing but can generalize to other data.

In Fabric, AutoML tools simplify this process by automatically splitting data into training and test sets, customizing the split based on best practices for the specific task, such as classification, regression, or forecasting.

## Feature engineering

Feature engineering is the process of transforming raw data into meaningful features that improve a machine learning model’s performance. It’s a critical step because the right features help the model learn the important patterns and relationships in the data, leading to better predictions. For instance, in a dataset of dates, creating features like "is holiday" can reveal trends that improve forecasting models.

In Fabric, users can leverage the `auto_featurize` functionality to automate parts of this process. `auto_featurize` analyzes the data and suggests or generates relevant features, such as aggregations, categorical encodings, or transformations, that may enhance the model's predictive power. This functionality saves time and brings feature engineering within reach for users with varied experience levels, enabling them to build more accurate and robust models.

## Next steps

- [Use the AutoML interface](../data-science/low-code-automl.md)
- [Experiment with the AutoML Python APIs](../data-science/python-automated-machine-learning-fabric.md)
