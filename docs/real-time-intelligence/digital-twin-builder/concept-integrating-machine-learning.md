---
title: Integrating with machine learning (ML)
description: Learn about integrating ontology data from digital twin builder (preview) into machine learning (ML) models.
author: baanders
ms.author: baanders
ms.date: 04/17/2025
ms.topic: concept-article
---

# Integrating machine learning (ML) with digital twin builder (preview)

This article explains what's involved in integrating ontology data from digital twin builder (preview) with machine learning (ML) for use in predictive modeling. Analysts and data scientists can use [automated ML (AutoML)](/azure/machine-learning/concept-automated-ml) or custom ML models to extract value from semantic relationships in operational data.

[!INCLUDE [Fabric feature-preview-note](../../includes/feature-preview-note.md)]

## Why use a digital twin builder ontology in ML? 

Ontology data represented in digital twin builder (preview) enriches ML models by:
* Providing context to raw sensor data (like linking sensors to equipment)
* Improving feature engineering with structured knowledge
* Enhancing model accuracy by incorporating domain relationships

## Steps to using ontology data with ML

The following sections describe the typical steps involved in using ontology data from digital twin builder (preview) in ML workflows.

### Step 1: Ingesting ontology data 

First, you need to pull ontology data into a queryable format. Ontology data usually includes: 
* Relationship instances between entity instances (like which sensor belongs to which equipment)
* Hierarchical mappings (like *production line > equipment > sensors*)
* Static metadata (like equipment type, location, and operational limits)

The following chart represents an example of ontology data.

| Sensor ID | Equipment ID | Equipment type | Production line | Site  |
|---|---|---|---|---|
| S001 | D101 | Distiller | Line A | Site A |
| S002 | C201 | Condenser | Line B | Site B |

Here are some ways you can enrich and use this data:
* Join it with time series data, which adds context to raw sensor readings
* Aggregate relationship instances (like collecting the count of sensors for each piece of equipment)
* Filter by hierarchy (allows you to isolate data like failures in a specific plant location)

### Step 2: Transforming ontology data for ML 

Once ontology data is available, you can transform it for use in ML models. 

This process might involve: 
* Joining with time series data (like time series sensor readings)
* Deriving new features (like average equipment temperature or pressure trends)
* Creating categorical features (like equipment types or cooling medium)

The following chart represents an example of ontology data that went through feature engineering.

| Process ID | Equipment ID | Failure | Mean pressure | Cooling type | Site |
|---|---|---|---|---|---|
| DP001 | D101 | No | 1.5 bar | Air-cooled | Site A |
| DP002 | C201  | Yes | 2.3 bar | Water-cooled | Site B |

At this stage, ontology data is ready to be used in an ML model. 

### Step 3: Extending with AutoML or custom models 

After preparing the dataset, you can choose one of these ML strategies based on your project needs: 
* AutoML: Best for quick experimentation and optimization
* Custom ML: Best for full control and fine-tuned performance

#### AutoML 

AutoML simplifies ML by automatically selecting the best model and hyperparameters. The expected outcome is that AutoML returns the best-performing model without manual tuning.

To use AutoML, follow these steps: 

1. Feed transformed data into an AutoML tool (like [Azure AutoML](https://azure.microsoft.com/solutions/automated-machine-learning) or FLAML)
2. Define the prediction target (like failure probability)
3. Let AutoML optimize the model (like choosing between XGBoost and Random Forest)

Here are some examples of AutoML tools:
* Azure AutoML (Cloud-based, full automation)
* FLAML (Python-based, lightweight)

#### Custom ML 

If you need full control over your models, you can use a custom model approach.

To work with a custom model, follow these steps: 
1. Select a model (like XGBoost, Random Forest, or Neural Networks)
2. Manually engineer features (like rolling averages or anomaly detection)
3. Train and evaluate your model using standard ML libraries (like scikit-learn or PyTorch)

Say you want to predict equipment failures using historical data and ontology relationships. An example ML pipeline might include these steps:
1. Merge ontology and time series data
1. One-hot encode categorical features
1. Train a custom model using RandomForestClassifier or XGBoost
1. Evaluate model performance using `accuracy_score` or `f1_score`

## Related content

* [Integrating Fabric tools with digital twin builder (preview)](concept-integrating-fabric.md)