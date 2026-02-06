---
title: "Tutorial: Ingest data into a lakehouse"
description: In this first part of the tutorial series, learn how to ingest a dataset into a Fabric lakehouse in delta lake format.
ms.reviewer: amjafari
ms.author: lagayhar
author: lgayhardt
ms.topic: tutorial
ms.custom: 
ms.date: 12/26/2025
reviewer: s-polly
---

# Tutorial Part 1: Use Apache Spark to ingest data into a Microsoft Fabric lakehouse

This tutorial ingests data into Fabric lakehouses in delta lake format. We define some important terms here:

* **Lakehouse** - A lakehouse is a collection of files, folders, and / or tables that represent a database over a data lake. The Spark engine and SQL engine use lakehouse resources for big data processing. When you use open-source Delta-formatted tables, that processing includes enhanced ACID transaction capabilities.

* **Delta Lake**  - Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata management, and batch and streaming data processing to Apache Spark. As a data table format, Delta Lake extends Parquet data files with a file-based transaction log for ACID transactions and scalable metadata management.

* [Azure Open Datasets](/azure/open-datasets/overview-what-are-open-datasets) are curated public datasets that add scenario-specific features to machine learning solutions. This leads to more accurate models. Open Datasets are cloud resources that reside on Microsoft Azure Storage. Apache Spark, REST API, Data factory, and other tools can access Open Datasets.

In this tutorial, you use the Apache Spark to:

> [!div class="checklist"]
>
> * Read data from Azure Open Datasets containers.
> * Write data into a Fabric lakehouse delta table.

## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

-  [Add a lakehouse](./tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) to this notebook. In this tutorial, you first download data from a public blob. Then, the data is stored in that lakehouse resource.

## Follow along in a notebook

 The [1-ingest-data.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/1-ingest-data.ipynb) notebook accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/sdgilley/fabric-samples/sdg-new-happy-path/docs-samples/data-science/data-science-tutorial/1-ingest-data.ipynb -->

## Bank churn data

The dataset contains churn status information for 10,000 customers. It also includes attributes that could influence churn - for example:

* Credit score
* Geographical location (Germany, France, Spain)
* Gender (male, female)
* Age
* Tenure (the number of years the customer was a client at that bank)
* Account balance
* Estimated salary
* Number of products that a customer purchased through the bank
* Credit card status (whether or not a customer has a credit card)
* Active member status (whether or not the customer has an active bank customer status)

The dataset also includes these columns:

- row number
- customer ID
- customer surname

These columns should have no influence on the decision of a customer to leave the bank.

The closure of a customer bank account defines the churn of that customer. The dataset `exited` column refers to customer's abandonment. Little context about these attributes is available, so you must proceed without background information about the dataset. Our goal is to understand how these attributes contribute to the `exited` status.

Sample dataset rows:

|"CustomerID"|"Surname"|"CreditScore"|"Geography"|"Gender"|"Age"|"Tenure"|"Balance"|"NumOfProducts"|"HasCrCard"|"IsActiveMember"|"EstimatedSalary"|"Exited"|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|

### Download dataset and upload to lakehouse

> [!TIP]
> When you define the following parameters, you can easily use this notebook with different datasets:

```python
IS_CUSTOM_DATA = False  # if TRUE, dataset has to be uploaded manually

DATA_ROOT = "/lakehouse/default"
DATA_FOLDER = "Files/churn"  # folder with data files
DATA_FILE = "churn.csv"  # data file name
```

The following code snippet downloads a publicly available version of the dataset, and then stores that resource in a Fabric lakehouse:

> [!IMPORTANT]
> **Make sure you [add a lakehouse](./tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) to the notebook before you run it. Failure to do so results in an error.**

```python
import os, requests
if not IS_CUSTOM_DATA:
# Download demo data files into lakehouse if not exist
    remote_url = "https://synapseaisolutionsa.z13.web.core.windows.net/data/bankcustomerchurn"
    file_list = [DATA_FILE]
    download_path = f"{DATA_ROOT}/{DATA_FOLDER}/raw"

    if not os.path.exists("/lakehouse/default"):
        raise FileNotFoundError(
            "Default lakehouse not found, please add a lakehouse and restart the session."
        )
    os.makedirs(download_path, exist_ok=True)
    for fname in file_list:
        if not os.path.exists(f"{download_path}/{fname}"):
            r = requests.get(f"{remote_url}/{fname}", timeout=30)
            with open(f"{download_path}/{fname}", "wb") as f:
                f.write(r.content)
    print("Downloaded demo data files into lakehouse.")
```

<!-- nbend -->

## Related content

You use the data you just ingested in:

> [!div class="nextstepaction"]
> [Part 2: Explore and visualize data using notebooks](tutorial-data-science-explore-notebook.md)
