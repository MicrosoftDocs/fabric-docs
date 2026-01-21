---
title: Semantic link and Power BI connectivity
description: See how semantic link and Microsoft Fabric provide Power BI data connectivity for pandas and Spark ecosystems.
ms.author: jburchel
author: jonburchel
ms.reviewerr: marcozo
reviewer: eisber
ms.topic: concept-article
ms.date: 08/15/2025
ms.search.form: semantic link
ms.reviewer: scottpolly
---

# Power BI connectivity with semantic link

Power BI connectivity is at the core of semantic link in Microsoft Fabric. This article describes the ways that semantic link provides connectivity to semantic models for users of the Python pandas and Apache Spark ecosystems.

A semantic model usually represents a high data standard that's the result of upstream data processing and refinement. Business analysts can:

- Encode domain knowledge and business logic into Power BI measures.
- Create Power BI reports by using semantic models.
- Use these reports to drive business decisions.

When data scientists working with the same semantic models try to duplicate business logic in different code environments or languages, critical errors can result. Semantic link bridges the gap between semantic models and the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] experience to provide a way for business analysts and data scientists to collaborate seamlessly and reduce data mismatch.

Semantic link offers connectivity to:

- The Python [pandas](https://pandas.pydata.org/) ecosystem via the **SemPy Python library**.
- Semantic models through the **Spark native connector** that supports PySpark, Spark SQL, R, and Scala.

## Data connectivity through SemPy Python library for pandas users

The [SemPy Python library](/python/api/semantic-link/overview-semantic-link) is part of the semantic link feature and serves pandas users. SemPy functionality includes data retrieval from [tables](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-read-table), [computation of measures](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-evaluate-measure), and [execution of Data Analysis Expressions (DAX) queries](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-evaluate-dax) and metadata.

- For Spark 3.4 and above, semantic link is available in the default runtime when using Fabric, and there's no need to install it.

- For Spark 3.3 or below, or to update to the latest version of semantic link, run the following command:

   ``` python
   %pip install -U semantic-link
   ```

SemPy also extends pandas DataFrames with added metadata propagated from the Power BI data source. This metadata includes:

- Power BI data categories:
  - Geographic: Address, place, city
  - URL: Web URL, image URL
  - Barcode
- Relationships between tables
- Hierarchies

## Data connectivity through semantic link Spark native connector

The semantic link Spark native connector lets Spark users access Power BI tables and measures. The connector is language-agnostic and supports PySpark, Spark SQL, R, and Scala.

To use the Spark native connector, you represent semantic models as Spark namespaces and transparently expose Power BI tables as Spark tables.

# [Spark SQL](#tab/sql)

The following command configures Spark to use the Power BI Spark native connector for Spark SQL:

```Python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")

# Optionally, configure the workspace using its ID
# Resolve workspace name to ID using fabric.resolve_workspace_id("My workspace")
# Replace 00000000-0000-0000-0000-000000000000 with your own workspace ID
# spark.conf.set("spark.sql.catalog.pbi.workspace, "00000000-0000-0000-0000-000000000000")
```

The following command lists all tables in a semantic model called `Sales Dataset`:

```sql
%%sql
SHOW TABLES FROM pbi.`Sales Dataset`
```

The following command displays data from the `Customer` table in the semantic model `Sales Dataset`:

```sql
%%sql
SELECT * FROM pbi.`Sales Dataset`.Customer
```

# [Python](#tab/python)

The following command configures Spark to use the Power BI Spark native connector for Python:

```python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")
```

The following command lists all tables in a semantic model called `Sales Dataset`:

```python
df = spark.sql("SHOW TABLES FROM pbi.`Sales Dataset`")

display(df)
```

The following command loads data from the `Customer` table in the semantic model `Sales Dataset` into the Spark DataFrame `df`:

```python
df = spark.table("pbi.`Sales Dataset`.Customer")

display(df)
```

# [R](#tab/r)

The following command configures Spark to use the Power BI Spark native connector for R:

```python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")
```

The following command lists all tables in a semantic model called `Sales Dataset`:

```R
%%sparkr

df = sql("SHOW TABLES FROM pbi.`Sales Dataset`")

display(df)
```

The following command loads data from the `Customer` table in the semantic model `Sales Dataset` into the dataframe `df`:

```R
%%sparkr

df = sql("SELECT * FROM pbi.`Sales Dataset`.Customer")

display(df)
```

---

Power BI measures are accessible through the virtual `_Metrics` table to bridge relational Spark SQL with multidimensional Power BI. In the following example, `Total Revenue` and `Revenue Budget` are measures defined in the `Sales Dataset` semantic model, and the other columns are dimensions. Aggregation functions like `AVG` are ignored for measures and are present only to provide consistency with SQL.

The connector supports predicate push down of computations like `Customer[State] in ('CA', 'WA')` from Spark expressions into the Power BI engine to enable use of the Power BI optimized engine.

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
```

## Data augmentation with Power BI measures

The `add_measure` operation is a powerful feature of semantic link that lets you augment data with measures from semantic models. This operation is available only in the SemPy Python library and isn't supported in the Spark native connector. For more information on the `add_measure` method, see [add_measure](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe#sempy-fabric-fabricdataframe-add-measure) in the `FabricDataFrame` class documentation.

To use the SemPy Python library, install it in your notebook kernel by running the following code in a notebook cell:

```python
# %pip and import only needs to be done once per notebook
%pip install semantic-link
from sempy.fabric import FabricDataFrame
```

The following code example assumes you have an existing FabricDataFrame with data that you want to augment with measures from a semantic model.

```python
df = FabricDataFrame({
        "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
        "Customer[Country/Region]": ["US", "GB", "US"],
        "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
    }
)

joined_df = df.add_measure(["Total Revenue", "Total Budget"], dataset="Sales Dataset")
```

The `add_measure` method does the following steps:

1. Resolves column names in the FabricDataFrame to Power BI dimensions. The operation ignores any column names that can't be resolved within the given semantic model. For more information, see the supported [DAX syntax](/dax/dax-syntax-reference).
1. Defines `group by` columns, using the resolved column names.
1. Computes one or more measures at the `group by` level.
1. Filters the result by the existing rows in the FabricDataFrame.

## Related content

- [SemPy add_measure reference documentation](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe#sempy-fabric-fabricdataframe-add-measure)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [Explore and validate data by using semantic link](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
