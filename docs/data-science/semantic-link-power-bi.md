---
title: Semantic Link and Power BI connectivity
description: Semantic Link and Microsoft Fabric provide Power BI data connectivity for pandas and Spark ecosystems.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.date: 06/14/2023
ms.search.form: Semantic Link
---

# Power BI connectivity with Semantic Link and Microsoft Fabric

Power BI connectivity is at the core of Semantic Link.
In this article, you'll learn about the ways that Semantic Link provides connectivity to Power BI datasets for users of the Python pandas ecosystem and the Apache Spark ecosystem.

[!INCLUDE [preview-note](../includes/preview-note.md)]

A Power BI dataset usually represents the gold standard of data and is the result of upstream data processing and refinement.
Business analysts can create Power BI reports from Power BI datasets and use these reports to drive business decisions.
Furthermore, they can encode their domain knowledge and business logic into Power BI measures.
On the other hand, data scientists can work with the same datasets, but typically in a different code environment or language.
In such cases, it may become necessary for the data scientists to duplicate the business logic, which can lead to critical errors.

Semantic Link bridges this gap between the Power BI datasets and the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] experience.
Thereby, providing a way for business analysts and data scientists to collaborate seamlessly and reduce data mismatch. Semantic Link offers connectivity to the:

- Python [pandas](https://pandas.pydata.org/) ecosystem via the **SemPy Python library**, and
- Power BI datasets through the **Spark native connector** that supports PySpark, Spark SQL, R, and Scala.

## Data connectivity through SemPy Python library for pandas users

The SemPy Python library is part of the Semantic Link feature and serves pandas users.
SemPy provides functionalities that include data retrieval from tables, computation of measures, and execution of DAX queries and metadata. <!-- (#TODO link to API docs) -->

To use the `SemPy` Python library, you first need to install it in your notebook kernel by executing this code in a notebook cell:

```python
%pip install semantic-link
```

SemPy also extends pandas DataFrames with additional metadata propagated from the Power BI data source.
This metadata includes:
- Power BI data categories:
  - Geographic: address, place, city, etc.
  - URL: web url, image url
  - Barcode
- Relationships between tables
- Hierarchies


## Data augmentation with Power BI measures

The `add_measure` operation is a powerful feature of Semantic Link that enables you to augment data with measures from Power BI datasets.
The `add_measure` operation is only available in the SemPy Python library and not supported by the Spark native connector.

To use the `SemPy` Python library, you first need to install it in your notebook kernel by executing this code in a notebook cell:

```python
%pip install semantic-link
```

The following example assumes that you've manually created a FabricDataFrame with data that you want to augment with measures from a Power BI dataset.

```python
df = FabricDataFrame({
        "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
        "Customer[Country/Region]": ["US", "GB", "US"],
        "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
    }
)

joined_df = df.add_measure(["Total Revenue", "Total Budget"], dataset="Sales Dataset")
```

The `add_measure` operation performs these steps:

- **Resolves column names**: The column names in the FabricDataFrame are resolved to Power BI dimensions. Any column names that can't be resolved within the given dataset are ignored (see the supported [DAX syntax](/dax/dax-syntax-reference)).
- **Defines group by columns**, by using the resolved column names.
- **Computes one or more measures** at the group by level.
- **Filters** the result by the existing rows in the FabricDataFrame.

## Next steps
Learn how to use semantic information

- [How to validate data with Semantic Link](semantic-link-validate-data.md)
- [Explore and validate relationships in Power BI datasets](semantic-link-validate-relationship.md)