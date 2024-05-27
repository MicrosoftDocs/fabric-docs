---
title: Use semantic link to explore and validate relationships in Power BI semantic models
description: Learn to use semantic link to explore and validate relationships in Power BI semantic models and pandas DataFrames.
ms.reviewer: mopeakande
reviewer: msakande
ms.author: romanbat
author: RomanBat
ms.topic: how-to
ms.custom:
  - ignite-2023
ms.date: 06/06/2023
ms.search.form: semantic link
---


# Explore and validate relationships in Power BI semantic models

In this article, you'll learn to discover and validate relationships within your Power BI semantic models and pandas DataFrames by using SemPy modules.

In data science and machine learning, it's important to understand the structure and relationships within your data.
Although Power BI is a powerful tool that allows you to model and visualize your data, you sometimes need to dive deeper into a semantic model's structure to gain more insights or build machine learning models.
Data scientists and business analysts can explore the relationships within a Power BI semantic model or pandas DataFrame by using various functions in the SemPy library.

You'll learn to:

> [!div class="checklist"]
> * Find, visualize, and explore relationships in a Power BI semantic model
> * Find and validate relationships in a pandas DataFrame

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Go to the Data Science experience in [!INCLUDE [product-name](../includes/product-name.md)].
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- [!INCLUDE [sempy-notebook-installation](includes/sempy-notebook-installation.md)]
- [Add a Lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).
For Spark 3.4 and above, Semantic link is available in the default runtime when using Fabric, and there is no need to install it. If you are using Spark 3.3 or below, or if you want to update to the most recent version of Semantic Link, you can run the command:
  
` ` ` python
%pip install -U semantic-link
` ` ` 


## Find relationships in a semantic model

The `list_relationships` function lets you retrieve a list of all relationships found within a Power BI semantic model so that you can better understand the structure of your data and how different tables and columns are connected.

The function works by leveraging semantic link, which provides annotated DataFrames that include the necessary metadata to understand the relationships within the semantic model.
This makes it easy for you to analyze the semantic model's structure and use it in your machine learning models or other data analysis tasks.

To use the `list_relationships` function, you'll first need to import the `sempy.fabric` module.
Then, you can call the function with the name or UUID of your Power BI semantic model as shown in the following code:

```python
import sempy.fabric as fabric

fabric.list_relationships("my_dataset")
```

The previous code shows the `list_relationships` function is called with a Power BI semantic model called *my_dataset*.
The function returns a pandas DataFrame with one row per relationship, allowing you to easily explore and analyze the relationships within the semantic model.

> [!TIP]
> [!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

## Visualize relationships in a semantic model

The `plot_relationship_metadata` function helps you visualize relationships in a semantic model so that you can gain a better understanding of the semantic model's structure.

By using this function, you can create a graph that displays the connections between tables and columns, making it easier to understand the semantic model's structure and how different elements are related.

The following code shows how to use the `plot_relationship_metadata` function

```python
import sempy.fabric as fabric
from sempy.relationships import plot_relationship_metadata

relationships = fabric.list_relationships("my_dataset")
plot_relationship_metadata(relationships)
```

In previous code, the `list_relationships` function retrieves the relationships in the *my_dataset* semantic model, and the `plot_relationship_metadata` function creates a graph to visualize these relationships.

You can customize the graph by specifying which columns to include, how to handle missing keys, and by providing more graphviz attributes.

## Explore relationship violations in a semantic model

Now that you have a better understanding of the relationships within your semantic model, it's essential to validate these relationships and identify any potential issues or inconsistencies. This is where the `list_relationship_violations` function comes in.

The `list_relationship_violations` function helps you validate the content of your tables to ensure that they match the relationships defined in your semantic model.
By using this function, you can identify inconsistencies with the specified relationship multiplicity and address any issues before they impact your data analysis or machine learning models.

To use the `list_relationship_violations` function, you'll first need to import the `sempy.fabric` module and read the tables from your semantic model.
Then, you can call the function with a dictionary that maps table names to the DataFrames with table content.

The following code shows how to list relationship violations:

```python
import sempy.fabric as fabric

tables = {
    "Sales": fabric.read_table("my_dataset", "Sales"),
    "Products": fabric.read_table("my_dataset", "Products"),
    "Customers": fabric.read_table("my_dataset", "Customers"),
}

fabric.list_relationship_violations(tables)
```

In the previous code, the `list_relationship_violations` function is called with a dictionary that contains the _Sales_, _Products_, and _Customers_ tables from the _my_dataset_ semantic model.
The function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your semantic model.

You can customize the function by specifying how to handle missing keys, by setting a coverage threshold, and defining the number of missing keys to report.

By using the `list_relationship_violations` function, you can ensure that your semantic model is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

## Find relationships in pandas DataFrames

While the `list_relationships`, `plot_relationships_df` and `list_relationship_violations` functions in the Fabric module are powerful tools for exploring relationships within semantic models, you may also need to discover relationships brought in from other data sources in the form of pandas DataFrames.

This is where the `find_relationships` function in the `sempy.relationship` module comes into play.

The `find_relationships` function helps data scientists and business analysts discover potential relationships within a list of Pandas DataFrames.

By using this function, you can identify possible connections between tables and columns, allowing you to better understand the structure of your data and how different elements are related.

The following code shows how to find relationships in a pandas DataFrame:

```python
from sempy.relationships import find_relationships

tables = [df_sales, df_products, df_customers]

find_relationships(tables)
```

In the previous code, the `find_relationships` function is called with a list of three Pandas DataFrames: `df_sales`, `df_products`, and `df_customers`.
The function returns a pandas DataFrame with one row per potential relationship, allowing you to easily explore and analyze the relationships within your data.

You can customize the function by specifying a coverage threshold, a name similarity threshold, a list of relationships to exclude and whether to include many-to-many relationships.

## Validate relationships in pandas DataFrames

After you've discovered potential relationships within your pandas DataFrames, using the `find_relationships` function, it's essential to validate these relationships and identify any potential issues or inconsistencies.
This is where the `list_relationship_violations` function from the `sempy.relationships` module comes into play.

The `list_relationship_violations` function is designed to help you validate the content of your tables and ensure that they match the discovered relationships.

By using this function, you can identify inconsistencies with the specified relationship multiplicity and address any issues before they impact your data analysis or machine learning models.

The following code shows how to find relationship violations in a pandas DataFrame:

```python
from sempy.relationships import find_relationships, list_relationship_violations

tables = [df_sales, df_products, df_customers]
relationships = find_relationships(tables)

list_relationship_violations(tables, relationships)
```

In the previous code, the `list_relationship_violations` function is called with a list of three pandas DataFrames (`df_sales`, `df_products`, and `df_customers`) and the relationships DataFrame obtained from the `find_relationships` function.
The `list_relationship_violations` function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your data.

You can customize the function by specifying how to handle missing keys, by setting a coverage threshold, and defining the number of missing keys to report.

By using the `list_relationship_violations` function with pandas DataFrames, you can ensure that your data is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

## Related content

- [Deepen your expertise of SemPy through the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link)
- [Tutorial: Discover relationships in a semantic model using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the _Synthea_ dataset using semantic link](tutorial-relationships-detection.md)
- [Detect, explore and validate functional dependencies in your data](semantic-link-validate-data.md)
- [Accelerate data science using semantic functions](semantic-link-semantic-functions.md)
