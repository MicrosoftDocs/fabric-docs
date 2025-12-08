---
title: Explore and validate relationships in Power BI semantic models and pandas dataframes
description: Use the Python SemPy semantic link modules to explore and validate relationships in Power BI semantic models and pandas DataFrames.
ms.author: scottpolly
author: s-polly
ms.reviewer: romanbat
reviewer: RomanBat
ms.topic: how-to
ms.custom:
ms.date: 09/28/2025
ms.search.form: semantic link
---

# Explore and validate relationships in semantic models and dataframes

This article shows you how to use SemPy semantic link functions to discover and validate relationships in Power BI semantic models and pandas DataFrames.

In data science and machine learning, understanding the structure and relationships in your data is important. Power BI lets you model and visualize these structures and relationships. To get more insights or build machine learning models, use semantic link functions in SemPy library modules.

Data scientists and business analysts use SemPy functions to list, visualize, and validate relationships in Power BI semantic models, or find and validate relationships in pandas DataFrames.

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]
- Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks) to copy and paste code into cells.
- For Spark 3.4 and above, semantic link is available in the default runtime when you use Fabric, so you don't need to install it. For Spark 3.3 or below, or to update to the latest version of semantic link, run the following command:
  ```python
  %pip install -U semantic-link
  ```


- [Add a lakehouse to your notebook](../data-engineering/how-to-use-notebook.md#connect-lakehouses-and-notebooks)

## List relationships in semantic models

The `list_relationships` function in the `sempy.fabric` module returns a list of all relationships found in a Power BI semantic model. The list helps you understand the structure of your data and how different tables and columns are connected.

This function works by using semantic link to provide annotated DataFrames. The DataFrames include the necessary metadata to understand the relationships within the semantic model. The annotated DataFrames make it easy to analyze the semantic model's structure and use it in machine learning models or other data analysis tasks.

To use the `list_relationships` function, you first import the `sempy.fabric` module. Then you call the function by using the name or UUID of your Power BI semantic model, as shown in the following example:

```python
import sempy.fabric as fabric

fabric.list_relationships("my_dataset")
```

The preceding code calls the `list_relationships` function with a Power BI semantic model named *my_dataset*. The function returns a pandas DataFrame with one row for each relationship, so you can quickly explore and analyze relationships in the semantic model.

> [!NOTE]
> [!INCLUDE [sempy-default-workspace](includes/sempy-default-workspace.md)]

## Visualize relationships in semantic models

Use the `plot_relationship_metadata` function to visualize relationships in a semantic model and learn how the model is structured. This function creates a graph that shows connections between tables and columns, making it easier to see how different elements are related.

Here's an example of how to use the `plot_relationship_metadata` function:

```python
import sempy.fabric as fabric
from sempy.relationships import plot_relationship_metadata

relationships = fabric.list_relationships("my_dataset")
plot_relationship_metadata(relationships)
```

In the example, the `list_relationships` function gets the relationships in the *my_dataset* semantic model, and the `plot_relationship_metadata` function creates a graph to show those relationships.

Customize the graph by choosing which columns to include, setting how to handle missing keys, and adding more [graphviz](https://pypi.org/project/graphviz/) attributes.

## Validate relationships in semantic models

Use the `list_relationship_violations` function to check relationships in your semantic model and find any issues or inconsistencies. The `list_relationship_violations` function checks your tables to make sure they match the relationships in your semantic model.

This function helps you find inconsistencies with relationship multiplicity and fix issues before they affect your data analysis or machine learning models.

To use the `list_relationship_violations` function, import the `sempy.fabric` module and read the tables from your semantic model. 
Then, call the function with a dictionary that maps table names to DataFrames with table content.

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

The preceding code calls the `list_relationship_violations` function with a dictionary that has the _Sales_, _Products_, and _Customers_ tables from the _my_dataset_ semantic model. You can customize the function by setting a coverage threshold, choosing how to handle missing keys, and setting the number of missing keys to report.

The function returns a pandas DataFrame with one row for each relationship violation, so you can quickly find and fix issues in your semantic model.
Use the `list_relationship_violations` function to keep your semantic model consistent and accurate, so you build more reliable machine learning models and get better insights from your data.

## Find relationships in pandas DataFrames

The `list_relationships`, `plot_relationships_df`, and `list_relationship_violations` functions in the Fabric module are powerful tools for exploring relationships in semantic models. Sometimes, you need to find relationships in other data sources, like pandas DataFrames.

Use the `find_relationships` function in the `sempy.relationship` module to find relationships in pandas DataFrames.

The `find_relationships` function in the `sempy.relationships` module lets data scientists and business analysts find potential relationships in a list of pandas DataFrames. This function helps you spot connections between tables and columns, so you learn more about your data and how its elements relate.

Here's how to find relationships in pandas DataFrames:

```python
from sempy.relationships import find_relationships

tables = [df_sales, df_products, df_customers]

find_relationships(tables)
```

The preceding code calls the `find_relationships` function with a list of three pandas DataFrames: `df_sales`, `df_products`, and `df_customers`.
The function returns a pandas DataFrame with one row for each potential relationship, so you can explore and analyze relationships in your data.

Customize the function by setting a coverage threshold, a name similarity threshold, a list of relationships to exclude, and whether to include many-to-many relationships.


## Validate relationships in pandas DataFrames

After you find potential relationships in your pandas DataFrames by using the `find_relationships` function, use the `list_relationship_violations` function to validate these relationships and identify any issues or inconsistencies.

The `list_relationship_violations` function checks your tables to make sure they match the discovered relationships. Use this function to find inconsistencies with the specified relationship multiplicity, so you can fix issues before they affect your data analysis or machine learning models.

Here's an example that shows how to find relationship violations in pandas DataFrames:

```python
from sempy.relationships import find_relationships, list_relationship_violations

tables = [df_sales, df_products, df_customers]
relationships = find_relationships(tables)

list_relationship_violations(tables, relationships)
```

The example calls the `list_relationship_violations` function with three pandas DataFrames: `df_sales`, `df_products`, and `df_customers`, along with the relationships DataFrame from the `find_relationships` function.
The `list_relationship_violations` function returns a pandas DataFrame with one row for each relationship violation, so you can quickly find and fix any issues in your data.

Customize the function by setting a coverage threshold, choosing how to handle missing keys, and defining how many missing keys to report.

Use the `list_relationship_violations` function with pandas DataFrames to keep your data consistent and accurate. This helps you build reliable machine learning models and get deeper insights from your data.

## Related content

- [Learn about semantic functions](semantic-link-semantic-functions.md)
- [Get started with the SemPy reference documentation](/python/api/semantic-link/overview-semantic-link)
- [Tutorial: Discover relationships in a semantic model by using semantic link](tutorial-power-bi-relationships.md)
- [Tutorial: Discover relationships in the Synthea dataset by using semantic link](tutorial-relationships-detection.md)
- [Detect, explore, and validate functional dependencies in your data](semantic-link-validate-data.md)