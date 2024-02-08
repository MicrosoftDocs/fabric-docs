---
title: "Tutorial: Ingest data into a lakehouse"
description: In this first part of the tutorial series, learn how to ingest a dataset into a Fabric lakehouse in delta lake format.
ms.reviewer: sgilley
ms.author: amjafari
author: amhjf
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 10/16/2023
---

# Tutorial Part 1: Ingest data into a Microsoft Fabric lakehouse using Apache Spark

In this tutorial, you'll ingest data into Fabric lakehouses in delta lake format. Some important terms to understand:

* **Lakehouse** - A lakehouse is a collection of files/folders/tables that represent a database over a data lake used by the Spark engine and SQL engine for big data processing and that includes enhanced capabilities for ACID transactions when using the open-source Delta formatted tables.

* **Delta Lake**  - Delta Lake is an open-source storage layer that brings ACID transactions, scalable metadata management, and batch and streaming data processing to Apache Spark. A Delta Lake table is a data table format that extends Parquet data files with a file-based transaction log for ACID transactions and scalable metadata management.

* [Azure Open Datasets](/azure/open-datasets/overview-what-are-open-datasets) are curated public datasets you can use to add scenario-specific features to machine learning solutions for more accurate models. Open Datasets are in the cloud on Microsoft Azure Storage and can be accessed by various methods including Apache Spark, REST API, Data factory, and other tools.

In this tutorial, you use the Apache Spark to:

> [!div class="checklist"]
>
> * Read data from Azure Open Datasets containers.
> * Write data into a Fabric lakehouse delta table.



## Prerequisites

[!INCLUDE [prerequisites](./includes/prerequisites.md)]

-  [Add a lakehouse](./tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) to this notebook. You'll be downloading data from a public blob, then storing the data in the lakehouse.

## Follow along in notebook

 [1-ingest-data.ipynb](https://github.com/microsoft/fabric-samples/blob/main/docs-samples/data-science/data-science-tutorial/1-ingest-data.ipynb) is the notebook that accompanies this tutorial.

[!INCLUDE [follow-along-github-notebook](./includes/follow-along-github-notebook.md)]

<!-- nbstart https://raw.githubusercontent.com/sdgilley/fabric-samples/sdg-new-happy-path/docs-samples/data-science/data-science-tutorial/1-ingest-data.ipynb -->


## Bank churn data

The dataset contains churn status of 10,000 customers. It also includes attributes that could impact churn such as:

* Credit score
* Geographical location (Germany, France, Spain)
* Gender (male, female)
* Age
* Tenure (years of being bank's customer)
* Account balance
* Estimated salary
* Number of products that a customer has purchased through the bank
* Credit card status (whether a customer has a credit card or not)
* Active member status (whether an active bank's customer or not)

The dataset also includes columns such as row number, customer ID, and customer surname that should have no impact on customer's decision to leave the bank. 

The event that defines the customer's churn is the closing of the customer's bank account. The column `exited` in the dataset refers to customer's abandonment. There isn't much context available about these attributes so you have to proceed without having background information about the dataset. The aim is to understand how these attributes contribute to the `exited` status.


Example rows from the dataset:

|"CustomerID"|"Surname"|"CreditScore"|"Geography"|"Gender"|"Age"|"Tenure"|"Balance"|"NumOfProducts"|"HasCrCard"|"IsActiveMember"|"EstimatedSalary"|"Exited"|
|---|---|---|---|---|---|---|---|---|---|---|---|---|
|15634602|Hargrave|619|France|Female|42|2|0.00|1|1|1|101348.88|1|
|15647311|Hill|608|Spain|Female|41|1|83807.86|1|0|1|112542.58|0|

### Download dataset and upload to lakehouse

> [!TIP]
> By defining the following parameters, you can use this notebook with different datasets easily.



```python
IS_CUSTOM_DATA = False  # if TRUE, dataset has to be uploaded manually

DATA_ROOT = "/lakehouse/default"
DATA_FOLDER = "Files/churn"  # folder with data files
DATA_FILE = "churn.csv"  # data file name
```

This code downloads a publicly available version of the dataset and then stores it in a Fabric lakehouse.

> [!IMPORTANT]
> **Make sure you [add a lakehouse](./tutorial-data-science-prepare-system.md#attach-a-lakehouse-to-the-notebooks) to the notebook before running it. Failure to do so will result in an error.**


```python
import os, requests
if not IS_CUSTOM_DATA:
# Download demo data files into lakehouse if not exist
    remote_url = "https://synapseaisolutionsa.blob.core.windows.net/public/bankcustomerchurn"
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

You'll use the data you just ingested in:
 
> [!div class="nextstepaction"]
> [Part 2: Explore and visualize data using notebooks](tutorial-data-science-explore-notebook.md)
