---
title: Semantic Link and Power BI connectivity
description: Semantic Link and Microsoft Fabric provide Power BI data connectivity for Pandas and Spark ecosystems.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.date: 06/14/2023
ms.search.form: Semantic Link
---

# Power BI connectivity with Semantic Link and Microsoft Fabric

<!-- This article describes Semantic Link and its integration with Power BI and Microsoft Fabric. You'll learn what Semantic Link is used for and how you can use it in Microsoft Fabric. -->

Power BI connectivity is at the core of Semantic Link. In this article, you'll learn about the ways that Semantic Link provides connectivity to Power BI datasets for users of the Python Pandas ecosystem and the Apache Spark ecosystem.

[!INCLUDE [preview-note](../includes/preview-note.md)]

A Power BI dataset usually represents the gold standard of data and is the result of upstream data processing and refinement. Business analysts can create Power BI reports from Power BI datasets and use these reports to drive business decisions. Furthermore, they can encode their domain knowledge and business logic into Power BI measures. On the other hand, data scientists can work with the same datasets, but typically in a different code environment or language. In such cases, it may become necessary for the data scientists to duplicate the business logic, which can lead to critical errors.

Semantic Link bridges this gap between the Power BI datasets and the Microsoft Fabric Data Science experience. Thereby, providing a way for business analysts and data scientists to collaborate seamlessly and reduce data mismatch. Semantic Link offers connectivity to the:

- Python [Pandas](https://pandas.pydata.org/) ecosystem via the **SemPy Python library**, and
- Power BI datasets through the **Spark native connector** that supports PySpark, Spark SQL, R, and Scala.

## Data connectivity through SemPy Python library for Pandas users

The SemPy python library is part of the Semantic Link feature and serves Pandas users. SemPy provides functionalities that include data retrieval from tables, computation of measures, and execution of DAX queries and metadata. <!-- (#TODO link to API docs) -->

SemPy also extends Pandas dataframes with additional metadata propagated from the Power BI data source. This metadata includes:
- Power BI data categories:
  - Geographic: address, place, city, etc.
  - URL: web url, image url
  - Barcode
- Relationships between tables
- Hierarchies

## Data connectivity through Semantic Link Spark native connector

Support for Spark (PySpark, Spark SQL, R and Scala)

The Semantic Link Spark native connector enables Spark users to access Power BI tables and measures. The connector is language-agnostic and supports PySpark, Spark SQL, R, and Scala.

To use the Spark native connector, Power BI datasets are represented as Spark namespaces and transparently expose Power BI tables as Spark tables.

```sql
SHOW TABLES pbi.`Sales Dataset`

SELECT * FROM pbi.`Sales Dataset`.Customer
```

Power BI measures are accessible through the virtual `_Metrics` table to bridge relational Spark SQL with multidimensional Power BI. In the following example, `Total Revenue` and `Revenue Budget` are measures defined in the `Sales Dataset` dataset, while the remaining columns are dimensions. The aggregation function (for example, `AVG`) is ignored for measures and only serves for consistency with SQL.

The connector supports predicate push down of computation from Spark expressions into the Power BI engine, for example, Customer[State] in ('CA', 'WA'), thereby enabling utilization of Power BI optimized engine.

```sql
SELECT
    `Customer[Country/Region]`,
    `Industry[Industry]`,
    AVG(`Total Revenue`),
    AVG(`Revenue Budget`)
FROM
    pbi.`Sales Dataset`.`_Metrics`
WHERE
    `Customer[State]` in ('CA', 'WA')
GROUP BY
    `Customer[Country/Region]`,
    `Industry[Industry]`
    """)
```


## Next steps
- [How to explore data with Semantic Link](semantic-link-explore-data.md)
- [How to validate data with Semantic Link](semantic-link-validate-data.md)