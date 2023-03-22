---
title: Explore and validate data with SemPy and Power BI Connector
description: Learn how to explore and validate data with SemPy and Power BI Connector.
ms.reviewer: larryfr
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 03/10/2023
ms.search.form: Browse PBI Metrics
---

# How to explore and validate data with SemPy and Power BI Connector

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Learn how to use the SemPy library to explore and validate Power BI data in the Data Science workload.

SemPy is a Python library that decreases the time you spend understanding, cleaning, and transforming your data. It simplifies common tasks and increases collaboration between AI and BI tasks. PowerBI/Analysis Services and Spark/Data Science have different semantic layers for the same model. With SemPy, we provide one source of truth for both. The following list contains the common reasons you would use SemPy:

- Simplify repetitive and tedious tasks. For example, automatically detecting joins, relationships, data quality issues, and plotting column data in consumable visuals.
- Data discovery and reuse of data across organizations.
- Consistency across organization on definitions and data semantics.
- Holistic approach to gathering requirements.

> [!TIP]
> For an end-to-end example of using SemPy, see the [End-to-end Power BI example](/fabric/data-science/e2e-powerbi-example).

## Prerequisites

- A familiarity with [How to use Microsoft Fabric notebooks](/fabric/data-engineering/how-to-use-notebook).

## Validate SemPy

To import the SemPy library in your notebook, add the following code to code cell and run it:

```Python
import sempy
print(sempy.__version__)
```

This code returns the version of the SemPy library installed in your workspace.

## Connect to Power BI

SemPy offers the ability to connect to Power BI Datasets available in your workspace to further analyze and share insights. This allows you to utilize the same data as your counterparts in other teams to drive a consistent story.

To view the datasets available in your workspace, use the `PowerBIConnector` to create a connection, and then call `get_datasets`. The following code returns a list of datasets for your workspace:

```Python
from sempy.connectors.powerbi import PowerBIConnector

conn = PowerBIConnector()
conn.get_datasets()
```

> [!TIP]
> If no datasets are returned, you can use the following steps to install the __Customer profitability Sample PBIX__ example dataset:
>
> 1. Download the [.pbix file](https://download.microsoft.com/download/6/A/9/6A93FD6E-CBA5-40BD-B42E-4DCAE8CDD059/Customer%20Profitability%20Sample%20PBIX.pbix).
> 1. To upload the file, go to your workspace and select __Upload__, then __Browse__. Select the .pbix file downloaded in the previous step, and then select __Open__.

The following image shows an example of the data returned:

:::image type="content" source="media/sempy-pbi-connector/table-datasets.png" alt-text="Screenshot of a table that contains the details of three datasets." lightbox="media/sempy-pbi-connector/table-datasets.png":::

The `PowerBIConnector` defaults to your current workspace. If you would like to search a different workspace, use the `workspace` parameter to specify the workspace name.

> [!IMPORTANT]
> You must have access to the workspace, otherwise an error will be returned.

```Python
conn = PowerBIConnector(workspace="workspace name")
conn.get_datasets()
```

## Discover and validate relationships

To load a dataset and view relationships as a mapped visual, use `load_dataset` and specify the dataset name.

```Python
kb1 = conn.load_dataset("dataset name")
kb1.plot_relationships()
```

The following image shows an example visualization of the relationships within a dataset:

:::image type="content" source="media/sempy-pbi-connector/mapped-relationships.png" alt-text="Screenshot showing a mapped visual of dataset relationships." lightbox="media/sempy-pbi-connector/mapped-relationships.png":::

For more information on how SemPy detects the relationship, see [Relationship Detection](sempy-relationship-detection.md).

For more information on using SemPy for data cleaning, see [Data Cleaning with Functional Dependencies](sempy-data-cleaning.md)

### Support your findings with visualizations

SemPy provides many out of the box visuals to showcase and share your insights. The following code creates a regression plot:

```python
sdf.plot.regression(target_column='name of column')
```

The following images show example visualizations. These examples were created using data on diamonds and plotting for price  as the target column.

:::image type="content" source="media/sempy-pbi-connector/continuous-feature.png" alt-text="Screenshot of three continuous features versus target regression plots." lightbox="media/sempy-pbi-connector/continuous-feature.png":::

:::image type="content" source="media/sempy-pbi-connector/categorical-feature.png" alt-text="Screenshot of three categorical features versus target regression plots." lightbox="media/sempy-pbi-connector/categorical-feature.png":::

For information on how SemPy can plot geographical locations, see [Creating Geo Location Plots](sempy-geo-location.md).

### Next steps

Learn more about the functionality SemPy offers:

- [API reference documentation](https://enyaprod.azurewebsites.net/index.html)
- [Getting Started with SemPy](sempy-setup.md)
- [End to end Scenario Notebook](e2e-powerbi-example.md)
