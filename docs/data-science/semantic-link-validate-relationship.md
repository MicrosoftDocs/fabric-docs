---
title: Explore and validate relationships in Power BI semantic models and pandas dataframes
description: Use the Python SemPy semantic link modules to explore and validate relationships in Power BI semantic models and pandas DataFrames.
ms.author: scottpolly
author: s-polly
ms.reviewer: romanbat
reviewer: RomanBat
ms.topic: how-to
ms.custom:
ms.date: 06/17/2024
ms.search.form: semantic link
---

# Explore and validate relationships in semantic models and dataframes

In this article, you learn to use the SemPy semantic link functions to discover and validate relationships in your Power BI semantic models and pandas DataFrames.

In data science and machine learning, it's important to understand the structure and relationships within your data. Power BI is a powerful tool that allows you to model and visualize these structures and relationships. To gain more insights or build machine learning models, you can dive deeper by using the semantic link functions in the SemPy library modules.

Data scientists and business analysts can use SemPy functions to list, visualize, and validate relationships in Power BI semantic models, or find and validate relationships in pandas DataFrames.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy/paste code into cells.
- For Spark 3.4 and above, semantic link is available in the default runtime when using Fabric, and there's no need to install it. For Spark 3.3 or below, or to update to the latest version of semantic link, run the following command:
  ```python
  %pip install -U semantic-link
  ```


- [Add a lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks).

## List relationships in semantic models

The `list_relationships` function in the `sempy.fabric` module returns a list of all relationships found in a Power BI semantic model. The list helps you understand the structure of your data and how different tables and columns are connected.

This function works by using semantic link to provide annotated DataFrames. The DataFrames include the necessary metadata to understand the relationships within the semantic model. The annotated DataFrames make it easy to analyze the semantic model's structure and use it in machine learning models or other data analysis tasks.

To use the `list_relationships` function, you first import the `sempy.fabric` module. Then you call the function by using the name or UUID of your Power BI semantic model, as shown in the following example:

```python
import sempy.fabric as fabric

fabric.list_relationships("my_dataset")
```

The preceding code calls the `list_relationships` function with a Power BI semantic model called *my_dataset*. The function returns a pandas DataFrame with one row per relationship, allowing you to easily explore and analyze the relationships within the semantic model.

> [!NOTE]
> [!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

## Visualize relationships in semantic models

The `plot_relationship_metadata` function helps you visualize relationships in a semantic model so you can gain a better understanding of the model's structure. This function creates a graph that displays the connections between tables and columns. The graph makes it easier to understand the semantic model's structure and how different elements are related.

The following example shows how to use the `plot_relationship_metadata` function:

```python
import sempy.fabric as fabric
from sempy.relationships import plot_relationship_metadata

relationships = fabric.list_relationships("my_dataset")
plot_relationship_metadata(relationships)
```

In the preceding code, the `list_relationships` function retrieves the relationships in the *my_dataset* semantic model, and the `plot_relationship_metadata` function creates a graph to visualize the relationships. 

You can customize the graph by defining which columns to include, specifying how to handle missing keys, and providing more [graphviz](https://pypi.org/project/graphviz/) attributes.

## Validate relationships in semantic models

Now that you have a better understanding of the relationships in your semantic model, you can use the `list_relationship_violations` function to validate these relationships and identify any potential issues or inconsistencies. The `list_relationship_violations` function helps you validate the content of your tables to ensure that they match the relationships defined in your semantic model.

By using this function, you can identify inconsistencies with the specified relationship multiplicity and address any issues before they impact your data analysis or machine learning models.

To use the `list_relationship_violations` function, first you import the `sempy.fabric` module and read the tables from your semantic model. 
Then, you call the function with a dictionary that maps table names to the DataFrames with table content.

The following example code shows how to list relationship violations:

```python
import sempy.fabric as fabric

tables = {
    "Sales": fabric.read_table("my_dataset", "Sales"),
    "Products": fabric.read_table("my_dataset", "Products"),
    "Customers": fabric.read_table("my_dataset", "Customers"),
}

fabric.list_relationship_violations(tables)
```

The preceding code calls the `list_relationship_violations` function with a dictionary that contains the _Sales_, _Products_, and _Customers_ tables from the _my_dataset_ semantic model. You can customize the function by setting a coverage threshold, specifying how to handle missing keys, and defining the number of missing keys to report.

The function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your semantic model.
By using the `list_relationship_violations` function, you can ensure that your semantic model is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

## Find relationships in pandas DataFrames

While the `list_relationships`, `plot_relationships_df` and `list_relationship_violations` functions in the Fabric module are powerful tools for exploring relationships within semantic models, you might also need to discover relationships within other data sources imported as pandas DataFrames.

This is where the `find_relationships` function in the `sempy.relationship` module comes into play.


The `find_relationships` function in the `sempy.relationships` module helps data scientists and business analysts discover potential relationships within a list of pandas DataFrames. By using this function, you can identify possible connections between tables and columns, allowing you to better understand the structure of your data and how different elements are related.

The following example code shows how to find relationships in pandas DataFrames:

```python
from sempy.relationships import find_relationships

tables = [df_sales, df_products, df_customers]

find_relationships(tables)
```

The preceding code calls the `find_relationships` function with a list of three Pandas DataFrames: `df_sales`, `df_products`, and `df_customers`. 
The function returns a pandas DataFrame with one row per potential relationship, allowing you to easily explore and analyze the relationships within your data.

You can customize the function by specifying a coverage threshold, a name similarity threshold, a list of relationships to exclude, and whether to include many-to-many relationships.


## Validate relationships in pandas DataFrames

After you discover potential relationships in your pandas DataFrames by using the `find_relationships` function, you can use the `list_relationship_violations` function to validate these relationships and identify any potential issues or inconsistencies.

The `list_relationship_violations` function validates the content of your tables to ensure that they match the discovered relationships. By using this function to identify inconsistencies with the specified relationship multiplicity, you can address any issues before they impact your data analysis or machine learning models.

The following example code shows how to find relationship violations in pandas DataFrames:

```python
from sempy.relationships import find_relationships, list_relationship_violations

tables = [df_sales, df_products, df_customers]
relationships = find_relationships(tables)

list_relationship_violations(tables, relationships)
```

The preceding code calls the `list_relationship_violations` function with a list of three pandas DataFrames, `df_sales`, `df_products`, and `df_customers`, plus the relationships DataFrame from the `find_relationships` function.
The `list_relationship_violations` function returns a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your data.

You can customize the function by setting a coverage threshold, specifying how to handle missing keys, and defining the number of missing keys to report.

By using the `list_relationship_violations` function with pandas DataFrames, you can ensure that your data is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

## Related content

- [Learn about semantic functions](semantic-link-semantic-functions.md)
- [Get started with the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link)
- [Tutorial: Discover relationships in a semantic model by using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the Synthea dataset by using semantic link](tutorial-relationships-detection.md)
- [Detect, explore, and validate functional dependencies in your data](semantic-link-validate-data.md)