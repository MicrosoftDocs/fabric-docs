---
title: Use semantic link to explore and validate relationships in Power BI semantic models
description: Learn to use semantic link to explore and validate relationships in Power BI semantic models and pandas DataFrames.
ms.reviewer: franksolomon
reviewer: msakande
ms.author: romanbat
author: RomanBat
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 06/13/2024
ms.search.form: semantic link
---

# Explore and validate relationships in Power BI semantic models

In this article, you learn to find and validate relationships within your Power BI semantic models and pandas DataFrames by using SemPy modules.

In data science and machine learning, the structure and relationships within your data have great importance. Power BI is a powerful tool that can model and visualize your data. However, you sometimes need to dive deeper into the structure of a semantic model, to build machine learning models or to gain more insights. Various SemPy library functions offer data scientists and business analysts a way to explore the relationships within a Power BI semantic model or pandas DataFrame.

You learn to:

> [!div class="checklist"]
> * Find, visualize, and explore relationships in a Power BI semantic model
> * Find and validate relationships in a pandas DataFrame

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Start at the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)]
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks)

For Spark 3.4 and above, Semantic link is available in the default runtime when using Fabric. You don't need to install it. For Spark 3.3 or below, or to upgrade to the most recent version of Semantic Link, run this command:
  
``` python
%pip install -U semantic-link
``` 

## Find relationships in a semantic model

The `list_relationships` function retrieves a list of all relationships found within a Power BI semantic model, to better understand the structure of your data, and how different tables and columns are connected.

The function uses semantic link, to provide annotated DataFrames that include the necessary metadata to understand the relationships within the semantic model. You can then analyze the semantic model structure, and use it in your machine learning models or other data analysis tasks.

To use the `list_relationships` function, first import the `sempy.fabric` module. Then, you can call the function with the name or UUID of your Power BI semantic model as shown in this code sample:

```python
import sempy.fabric as fabric
fabric.list_relationships("my_dataset")
```

In this code sample, a Power BI semantic model called *my_dataset* calls the `list_relationships` function. The function returns a pandas DataFrame with one row per relationship, and you can then easily explore and analyze the relationships within the semantic model.

> [!TIP]
> [!INCLUDE [sempy-default-workspace](/includes/sempy-default-workspace.md)]

## Visualize relationships in a semantic model

The `plot_relationship_metadata` function helps you visualize relationships in a semantic model, to can gain a better understanding of the semantic model's structure. With this function, you can create a graph that displays the connections between tables and columns, to make it easier to understand the semantic model's structure and the relationships between the different elements.

This code sample uses the `plot_relationship_metadata` function:

```python
import sempy.fabric as fabric
from sempy.relationships import plot_relationship_metadata

relationships = fabric.list_relationships("my_dataset")
plot_relationship_metadata(relationships)
```

In this code sample, the `list_relationships` function retrieves the relationships in the *my_dataset* semantic model. The `plot_relationship_metadata` function creates a graph to visualize these relationships. To customize the graph, specify the columns to include, how to handle missing keys, and provide more graphviz attributes.

## Explore relationship violations in a semantic model

With a better understanding of the relationships within your semantic model, you should validate these relationships and identify any potential issues or inconsistencies. The `list_relationship_violations` function can help.

The `list_relationship_violations` function helps validate the content of your tables, to ensure that they match the relationships that your semantic model defined. With this function, you can identify inconsistencies with the specified relationship multiplicity, and address any issues before they influence your data analysis or machine learning models.

To use the `list_relationship_violations` function, you must first import the `sempy.fabric` module, and read the tables from your semantic model. Then, you can call the function with a dictionary that maps table names to the DataFrames that have table content.

This code sample shows how to list relationship violations:

```python
import sempy.fabric as fabric

tables = {
    "Sales": fabric.read_table("my_dataset", "Sales"),
    "Products": fabric.read_table("my_dataset", "Products"),
    "Customers": fabric.read_table("my_dataset", "Customers"),
}

fabric.list_relationship_violations(tables)
```

In this code sample, the `list_relationship_violations` function is called with a dictionary that contains the

- _Customers_
- _Products_
- _Sales_

tables from the _my_dataset_ semantic model. The function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your semantic model. To customize the function, you can set a coverage threshold, define the number of missing keys to report, and specify how to handle missing keys.

With the `list_relationship_violations` function, you can ensure the consistency and accuracy of your semantic model, which allows you to build more reliable machine learning models and gain deeper insights into your data.

## Find relationships in pandas DataFrames

While the `list_relationships`, `plot_relationships_df` and `list_relationship_violations` functions in the Fabric module are powerful tools for exploring relationships within semantic models, you might also need to find relationships brought in as pandas DataFrames from other data sources. The `find_relationships` function in the `sempy.relationship` module can help.

The `find_relationships` function helps data scientists and business analysts discover potential relationships within a list of Pandas DataFrames. With this function, you can identify possible connections between tables and columns, to make it easier to understand the structure of your data and the relationships between the different elements.

This code sample shows how to find relationships in a pandas DataFrame:

```python
from sempy.relationships import find_relationships

tables = [df_sales, df_products, df_customers]

find_relationships(tables)
```

This code sample calls the `find_relationships` function with a list of three Pandas DataFrames:

- `df_customers`
- `df_products`
- `df_sales`

The function returns a pandas DataFrame with one row per potential relationship, allowing you to easily explore and analyze the relationships within your data. To customize the function, you can set a coverage threshold, define a list of relationships to exclude, and whether to include many-to-many relationships.

## Validate relationships in pandas DataFrames

After you use the `find_relationships` function to find potential relationships within your pandas DataFrames, you need to validate these relationships and identify any potential issues or inconsistencies.  The `list_relationship_violations` function in the `sempy.relationship` module can help.

The `list_relationship_violations` function is designed to help validate the content of your tables and ensure that they match the discovered relationships. With this function, you can identify inconsistencies with the specified relationship multiplicity, and handle any issues before they influence your data analysis or machine learning models.

This code sample shows how to find relationship violations in a pandas DataFrame:

```python
from sempy.relationships import find_relationships, list_relationship_violations

tables = [df_sales, df_products, df_customers]
relationships = find_relationships(tables)

list_relationship_violations(tables, relationships)
```

This code sample calls the `list_relationship_violations` function with the relationships DataFrame obtained from the `find_relationships` function, and a list of three pandas DataFrames:

- `df_customers`
- `df_products`
- `df_sales`

The `list_relationship_violations` function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your data. To customize the function, you can set a coverage threshold, define the number of missing keys to report, and specify how to handle missing keys.

By using the `list_relationship_violations` function with pandas DataFrames, you can ensure the consistency and accuracy of your data, which allows you to build more reliable machine learning models and gain deeper insights into your data.

## Related content

- [Deepen your expertise of SemPy through the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link)
- [Tutorial: Discover relationships in a semantic model using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset using semantic link](tutorial-relationships-detection.md)
- [Detect, explore, and validate functional dependencies in your data](semantic-link-validate-data.md)
- [Accelerate data science using semantic functions](semantic-link-semantic-functions.md)