---
title: Use Semantic Link to explore and validate relationships in Power BI datasets
description: Learn to use Semantic Link to explore and validate relationships in Power BI datasets.
ms.reviewer: mopeakande
ms.author: romanbat
author: RomanBat
ms.topic: how-to 
ms.date: 06/06/2023
ms.search.form: Semantic Link
---


# Explore and validate relationships in Power BI datasets

In the world of data analysis and machine learning, understanding the structure and relationships within your dataset is crucial.
Power BI is a powerful tool that allows you to model and visualize your data, but sometimes you need to dive deeper into the dataset's structure to gain additional insights or build machine learning models.
This is where the `list_relationships` function comes into play.

The `list_relationships` function is designed to help data scientists and business analysts explore the relationships within a Power BI dataset.
By using this function, you can retrieve a list of all relationships found within the Power BI model, allowing you to better understand the structure of your data and how different tables and columns are connected.

The function works by leveraging Semantic Link, which provides annotated dataframes that include the necessary metadata to understand the relationships within the dataset.
This makes it easy for you to analyze the dataset's structure and use it in your machine learning models or other data analysis tasks.

To use the `list_relationships` function, you'll first need to import the `sempy.fabric` module.
Then, you can call the function with the name or UUID of your Power BI dataset. Here's an example:

```python
import sempy.fabric as fabric

fabric.list_relationships("my_dataset")
```

In this example, the `list_relationships` function is called with the "my_dataset" Power BI dataset.
The function will return a pandas DataFrame with one row per relationship, allowing you to easily explore and analyze the relationships within your dataset.

You can also specify the workspace containing the dataset by providing its name or UUID as an optional parameter.
If no workspace is specified, the function will default to the workspace of the attached lakehouse or the workspace of the notebook if no lakehouse is attached.

# Visualizing Power BI Dataset Relationships

While the `list_relationships` function provides a way to retrieve these relationships, visualizing them can help you gain a better understanding of the dataset's structure.
This is where the `plot_relationship_metadata` function comes in.

The `plot_relationship_metadata` function is designed to help you visualize the relationships within a Power BI dataset.
By using this function, you can create a graph that displays the connections between tables and columns, making it easier to understand the dataset's structure and how different elements are related.

Here's an example:

```python
import sempy.fabric as fabric
from sempy.relationships import plot_relationship_metadata

relationships = fabric.list_relationships("my_dataset")
plot_relationship_metadata(relationships)
```

In this example, the `list_relationships` function retrieves the relationships for the "my_dataset" Power BI dataset, and the `plot_relationship_metadata` function creates a graph to visualize these relationships.

You can customize the graph by specifying which columns to include, how to handle missing keys, and providing additional graphviz attributes.

# Explore Relationship Violations

Now that you have a better understanding of the relationships within your Power BI dataset, it's essential to validate these relationships and identify any potential issues or inconsistencies.
This is where the `list_relationship_violations` function comes in.

The `list_relationship_violations` function is designed to help you validate the content of your tables and ensure that they match the relationships defined in your Power BI dataset.
By using this function, you can identify inconsistencies with the specified relationship multiplicity and address any issues before they impact your data analysis or machine learning models.

To use the `list_relationship_violations` function, you'll first need to import the `sempy.fabric` module and read the tables from your Power BI dataset.
Then, you can call the function with a dictionary that maps table names to the dataframes with table content.
Here's an example:

```python
import sempy.fabric as fabric

tables = {
    "Sales": fabric.read_table("Sales", "my_dataset"),
    "Products": fabric.read_table("Products", "my_dataset"),
    "Customers": fabric.read_table("Customers", "my_dataset"),
}

fabric.list_relationship_violations(tables)
```

In this example, the `list_relationship_violations` function is called with a dictionary containing the "Sales", "Products", and "Customers" tables from the "my_dataset" Power BI dataset.
The function will return a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your dataset.

You can customize the function by specifying how to handle missing keys, setting a coverage threshold, and defining the number of missing keys to report.

By using the `list_relationship_violations` function, you can ensure that your Power BI dataset is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

# Discover Relationships in Pandas DataFrames

While `list_relationships`, `plot_relationships_df` and `list_relationship_violations` function in the fabric module are powerful tools for exploring relationships within Power BI datasets, you may also need to discover relationships brought in from other data sources in the form of Pandas DataFrames.
This is where the sempy.relationship module and to start with the `find_relationships` function comes into play.

The `find_relationships` function is designed to help data scientists and business analysts discover potential relationships within a list of Pandas DataFrames.
By using this function, you can identify possible connections between tables and columns, allowing you to better understand the structure of your data and how different elements are related.
Here's an example:

```python
from sempy.relationships import find_relationships

tables = [df_sales, df_products, df_customers]

find_relationships(tables)
```

In this example, the `find_relationships` function is called with a list of three Pandas DataFrames: `df_sales`, `df_products`, and `df_customers`.
The function will return a pandas DataFrame with one row per potential relationship, allowing you to easily explore and analyze the relationships within your data.

You can customize the function by specifying a coverage threshold, a name similarity threshold, a list of relationships to exclude and whether to include many-to-many relationships.

# Validate Relationships in Pandas DataFrames

After discovering potential relationships within your Pandas DataFrames using the `find_relationships` function, it's essential to validate these relationships and identify any potential issues or inconsistencies.
This is where the `list_relationship_violations` function from the `sempy.relationships` module comes into play.

The `list_relationship_violations` function is designed to help you validate the content of your tables and ensure that they match the discovered relationships.
By using this function, you can identify inconsistencies with the specified relationship multiplicity and address any issues before they impact your data analysis or machine learning models.
Here's an example:

```python
from sempy.relationships import find_relationships, list_relationship_violations

tables = [df_sales, df_products, df_customers]
relationships = find_relationships(tables)

list_relationship_violations(tables, relationships)
```

In this example, the `list_relationship_violations` function is called with a list of three Pandas DataFrames: `df_sales`, `df_products`, and `df_customers`, and the relationships DataFrame obtained from the `find_relationships` function. The function will return a pandas DataFrame with one row per relationship violation, allowing you to easily identify and address any issues within your data.

You can customize the function by specifying how to handle missing keys, setting a coverage threshold, and defining the number of missing keys to report.

By using the `list_relationship_violations` function with Pandas DataFrames, you can ensure that your data is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data.

# Conclusion

Understanding and validating the relationships within your data is crucial for building accurate machine learning models and gaining valuable insights. The `sempy.relationships` module provides powerful functions like `find_relationships` and `list_relationship_violations` that enable you to discover and validate relationships within your Power BI datasets and Pandas DataFrames.

By leveraging these functions, you can ensure that your data is consistent and accurate, allowing you to build more reliable machine learning models and gain deeper insights into your data. Whether you're a data scientist or a business analyst, these tools can help you better understand the structure of your data and how different elements are related, ultimately leading to more informed decisions and better results.

## Next steps
- [How to explore and validate function dependencies](semantic-link-validate-data.md)
- [How to accelerate data science using semantic functions](semantic-link-semantic-functions.md)