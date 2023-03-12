---
title: Explore and validate data with SemPy and PBI Connector
description: Learn how to explore and validate data with SemPy and PBI Connector.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: how-to
ms.date: 02/10/2023
---

# How to explore and validate data with SemPy and PBI Connector

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

SemPy is Python library that decreases the time spent by users to understand, clean and transform their data by simplifying common tasks in addition to increasing collaboration between the AI and BI worlds. SemPy is tackling the gap that currently exists between PBI/Analysis Services and Spark/Data Science, users of each space have their own semantic layer for the same data model. We want to decrease the recreation of this layer and have both leverage one source of truth using SemPy. For example, Daisy can access not just the data but also have access to the structure of the data.

Reasons why SemPy is crucial:

- Simplifying repetitive and tedious tasks like automatically detecting joins, relationships, data quality issues, plotting column data in consumable visuals and more.
- Data discovery and reuse of data across organizations.
- Consistency across organization on definitions and data semantics.
- Holistic approach to requirements gathering.

In this article, you'll learn how to use SemPy in the Data Science workload.

## Validate SemPy setup

Let’s begin with confirming which SemPy library version is being used in the notebook.

```Python
import sempy
print(sempy.__version__)import sempyprint(sempy.__version__)
```

Now you can begin your discover, validate and prep journey. Continue reading to learn how to connect to a PBI dataset and additional functionality SemPy has to offer.

If you're ready to see this in action our End to End Scenario Notebook that will guide you through an example of how SemPy can help solve a common business case using a frequently used sample PBI Dataset.

## Connect to Power BI

SemPy offers the ability to connect to PBI Datasets available in your workspace to further analyze and share insights. This allows users to utilize the same data as their counterparts in other teams to drive a consistent story. To get started, we'll take a look at the datasets you have in your workspace using the following code.

```Python
conn = PowerBIConnector()
conn.get_databases()conn
```

:::image type="content" source="media/sempy-pbi-connector/table-datasets.png" alt-text="Screenshot of a table that contains the details of three datasets." lightbox="media/sempy-pbi-connector/table-datasets.png":::

The PBI connector will default to your current workspace. However, it isn't limited to only that, if you would like to search a different workspace (that you have access to) identify the workspace name. See the following code snippet.

```Python
conn = PowerBIConnector(workspace=“workspace name”)
conn.get_databases()
```

> [!NOTE]
> If you do not have access to a workspace and run the code an error will be returned.

Learn more about what the Power BI connector from this [E2E Example](e2e-powerbi-example.md).

## Discover and validate relationships

Now that you can see a list of all the PBI datasets available to you let’s select one and dive a bit deeper to understand it. Using the code below we're able to see existing relationships through a mapped visual.

```Python
kb1 = conn.load_database("dataset name")
kb1.show_relationships()
```

:::image type="content" source="media/sempy-pbi-connector/mapped-relationships.png" alt-text="Screenshot showing a mapped visual of dataset relationships." lightbox="media/sempy-pbi-connector/mapped-relationships.png":::

Learn more about [Relationship Detection](sempy-relationship-detection.md).

Learn more about [Data Cleaning with Functional Dependencies](sempy-data-cleaning.md)

### Support your findings with visualizations

SemPy provides many out of the box visuals to showcase and share your insights; the following code will take a look at a regression plot.

`sdf.plot.regression(target_column='name of column')sdf.plot.regression(target_column='name of column')`

In this example, the resulting visual is using data on diamonds and plotting for price the target column.

:::image type="content" source="media/sempy-pbi-connector/continuous-feature.png" alt-text="Screenshot of three continuous feature versus target regression plots." lightbox="media/sempy-pbi-connector/continuous-feature.png":::

:::image type="content" source="media/sempy-pbi-connector/categorical-feature.png" alt-text="Screenshot of three categorical feature versus target regression plots." lightbox="media/sempy-pbi-connector/categorical-feature.png":::

Learn more about how SemPy can plot geographical locations: [Creating Geo Location Plots](sempy-geo-location.md).

### Next steps

Learn more about the functionality SemPy offers:

- [API reference documentation](https://enyaprod.azurewebsites.net/index.html)
- [Getting Started with SemPy](sempy-setup.md)
- [End to end Scenario Notebook](e2e-powerbi-example.md)
