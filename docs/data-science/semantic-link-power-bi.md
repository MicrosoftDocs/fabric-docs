---
title: Semantic link and Power BI connectivity
description: Semantic link and Microsoft Fabric provide Power BI data connectivity for pandas and Spark ecosystems.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: marcozo
author: eisber
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 06/14/2023
ms.search.form: semantic link
---

# Power BI connectivity with semantic link and Microsoft Fabric

Power BI connectivity is at the core of semantic link.
In this article, you'll learn about the ways that semantic link provides connectivity to semantic models for users of the Python pandas ecosystem and the Apache Spark ecosystem.

A semantic model usually represents the gold standard of data and is the result of upstream data processing and refinement.
Business analysts can create Power BI reports from semantic models and use these reports to drive business decisions.
Furthermore, they can encode their domain knowledge and business logic into Power BI measures.
On the other hand, data scientists can work with the same semantic models, but typically in a different code environment or language.
In such cases, it may become necessary for the data scientists to duplicate the business logic, which can lead to critical errors.

Semantic link bridges this gap between the semantic models and the [!INCLUDE [fabric-ds-name](includes/fabric-ds-name.md)] in [!INCLUDE [product-name](../includes/product-name.md)] experience.
Thereby, providing a way for business analysts and data scientists to collaborate seamlessly and reduce data mismatch. Semantic link offers connectivity to the:

- Python [pandas](https://pandas.pydata.org/) ecosystem via the **SemPy Python library**, and
- Semantic models through the **Spark native connector** that supports PySpark, Spark SQL, R, and Scala.

## Data connectivity through SemPy Python library for pandas users

The [SemPy Python library](/python/api/semantic-link/overview-semantic-link) is part of the semantic link feature and serves pandas users.
SemPy provides functionalities that include data retrieval from [tables](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-read-table), [computation of measures](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-evaluate-measure), and [execution of DAX queries](/python/api/semantic-link-sempy/sempy.fabric#sempy-fabric-evaluate-dax) and metadata.

Semantic link is available in the default runtime when using Fabric, and there is no need to install it. If you want to be sure you are using the most updated version of Semantic link you can run the command:

` ` ` python
%pip install -U semantic-link
` ` ` 


SemPy also extends pandas DataFrames with additional metadata propagated from the Power BI data source.
This metadata includes:

- Power BI data categories:
  - Geographic: address, place, city, etc.
  - URL: web url, image url
  - Barcode
- Relationships between tables
- Hierarchies

## Data connectivity through semantic link Spark native connector

Support for Spark (PySpark, Spark SQL, R and Scala)

The semantic link Spark native connector enables Spark users to access Power BI tables and measures.
The connector is language-agnostic and supports PySpark, Spark SQL, R, and Scala.

To use the Spark native connector, semantic models are represented as Spark namespaces and transparently expose Power BI tables as Spark tables.

# [Spark SQL](#tab/sql)

Configure Spark to use the Power BI Spark native connector:

```Python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")

# Optionally, configure the workspace using its ID
# Resolve workspace name to ID using fabric.resolve_workspace_id("My workspace")
# Replace 00000000-0000-0000-0000-000000000000 with your own workspace ID
# spark.conf.set("spark.sql.catalog.pbi.workspace, "00000000-0000-0000-0000-000000000000")
```

List all tables in the semantic model `Sales Dataset`:

```sql
%%sql
SHOW TABLES FROM pbi.`Sales Dataset`
```

Display data from the table `Customer` in the semantic model `Sales Dataset`:

```sql
%%sql
SELECT * FROM pbi.`Sales Dataset`.Customer
```

# [Python](#tab/python)

Configure Spark to use the Power BI Spark native connector:

```Python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")
```

List all tables in the semantic model `Sales Dataset`:

```python
df = spark.sql("SHOW TABLES FROM pbi.`Sales Dataset`")

display(df)
```

Load data from the table `Customer` in the semantic model `Sales Dataset` into the Spark DataFrame `df`:

```python
df = spark.table("pbi.`Sales Dataset`.Customer")

display(df)
```

# [R](#tab/r)

Configure Spark to use the Power BI Spark native connector:

```Python
spark.conf.set("spark.sql.catalog.pbi", "com.microsoft.azure.synapse.ml.powerbi.PowerBICatalog")
```

List all tables in the semantic model `Sales Dataset`:

```R
%%sparkr

df = sql("SHOW TABLES FROM pbi.`Sales Dataset`")

display(df)
```

Load data from the table `Customer` in the semantic model `Sales Dataset` into the dataframe `df`:

```R
%%sparkr

df = sql("SELECT * FROM pbi.`Sales Dataset`.Customer")

display(df)
```

---

Power BI measures are accessible through the virtual `_Metrics` table to bridge relational Spark SQL with multidimensional Power BI.
In the following example, `Total Revenue` and `Revenue Budget` are measures defined in the `Sales Dataset` semantic model, while the remaining columns are dimensions.
The aggregation function (for example, `AVG`) is ignored for measures and only serves for consistency with SQL.

The connector supports predicate push down of computation from Spark expressions into the Power BI engine; for example, `Customer[State] in ('CA', 'WA')`, thereby enabling utilization of Power BI optimized engine.

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

The `add_measure` operation is a powerful feature of semantic link that enables you to augment data with measures from semantic models.
The `add_measure` operation is only available in the SemPy Python library and not supported by the Spark native connector. For more information on the `add_measure` method, see [add_measure in the FabricDataFrame Class](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe)

To use the `SemPy` Python library, you first need to install it in your notebook kernel by executing this code in a notebook cell:

   > [!TIP]
   > The code example assumes that you've manually created a FabricDataFrame with data that you want to augment with measures from a semantic model.

```python
# %pip and import only needs to be done once per notebook
%pip install semantic-link
from sempy.fabric import FabricDataFrame

df = FabricDataFrame({
        "Sales Agent": ["Agent 1", "Agent 1", "Agent 2"],
        "Customer[Country/Region]": ["US", "GB", "US"],
        "Industry[Industry]": ["Services", "CPG", "Manufacturing"],
    }
)

joined_df = df.add_measure(["Total Revenue", "Total Budget"], dataset="Sales Dataset")
```

The `add_measure` operation performs these steps:

- **Resolves column names**: The column names in the FabricDataFrame are resolved to Power BI dimensions. Any column names that can't be resolved within the given semantic model are ignored (see the supported [DAX syntax](/dax/dax-syntax-reference)).
- **Defines group by columns**, by using the resolved column names.
- **Computes one or more measures** at the group by level.
- **Filters** the result by the existing rows in the FabricDataFrame.

## Related content

- [See the SemPy reference documentation for the `add_measure` method](/python/api/semantic-link-sempy/sempy.fabric.fabricdataframe#sempy-fabric-fabricdataframe-add-measure)
- [Tutorial: Extract and calculate Power BI measures from a Jupyter notebook](tutorial-power-bi-measures.md)
- [How to validate data with ](semantic-link-validate-data.md)
- [Explore and validate relationships in semantic models](semantic-link-validate-relationship.md)
