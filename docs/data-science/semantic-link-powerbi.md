---
title: Power BI Connectivity
description: Power BI Connectivity
ms.reviewer: larryfr
ms.author: marcozo
author: eisber
ms.topic: overview 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---

# Power BI Connectivity

[!INCLUDE [preview-note](../includes/preview-note.md)]

Power BI connectivity is at the core of Semantic Link.

Power BI datasets usually represent the gold stage of data and are the result of upstream data refinement and validation.
These datasets are used to drive business decisions through Power BI reports and therefore receive special attention.
Furthermore, business analyst encode business logical into Power BI measure.
Data scientists on the other hand operate on the same data, but not in the same environment or language and therefore had to duplicate the business logic, leading to critical errors.

Microsoft Fabric and Semantic Link bridge this critical gap between business analysts and data scientist, enabling seemless collaboration and reduce data mismatch.

TODO: should we mention read-only replicas to address concerns on hogging Power BI clusters?

## Pandas/Python

The SemPy python library is part of the Semantic Link feature and serves Pandas users.

It supports retrieval of data from tables, computation of measures, execution of DAX queries and metadata. (#TODO link to API docs)

We extend Pandas dataframes with additional metadata propagated from the Power BI source.
This metadata includes:

- Power BI data categories
  - Geographic: address, place, city, ... 
  - URL: web url, image url
  - Barcode
- Relationships between tables
- Hierarchies

## Spark - PySpark, Spark SQL, R and Scala

The Semantic Link Spark native connector enables Spark users agnostic of their language of choice to access Power BI tables and measures.

Power BI datasets are represented as Spark namespaces and transparently expose Power BI tables as Spark tables.

```sql
SHOW TABLES pbi.`Sales Dataset`

SELECT * FROM pbi.`Sales Dataset`.Customer
```

Measures are accessible through the virtual _Metrics table to bridge relational Spark SQL with multi-dimensional Power BI.
In this example, Total Revenue and Revenue Budget are measures defined in the Sales Dataset, while the remaining columns are dimensions.
Note that the aggregation function (e.g. AVG) is ignored for measures and only serves consistency with SQL.

The connector supports predicate push down of computation from Spark expressions into the Power BI engine (e.g. Customer[State] in ('CA', 'WA')) enabling utilization of Power BI optimized engine.

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

