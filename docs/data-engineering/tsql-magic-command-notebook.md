---
title: "Run T-SQL code in Fabric Python notebooks"
description: Learn how to use T-SQL magic command inside Fabric Notebook to for achieve the mix-programming experience between T-SQL and Python.
author: eric-urban
ms.author: eur
ms.reviewer: qixwang
ms.topic: how-to
ms.date: 07/28/2025
ms.custom: 
# Customer Intent: As a data engineer, I want to run T-SQL code Fabric notebooks, manage queries, and perform cross datawarehouse queries.
---

# Run T-SQL code in Fabric Python notebooks

The mix of T-SQL and Python in modern data workflows offers a powerful and flexible approach that blends the strengths of both languages. SQL remains the most efficient and readable way to query, filter, and join structured data, while Python excels at data transformation, statistical analysis, machine learning, and visualization. By combining T-SQL and Python, data engineers can use the best of both worlds, enabling them to build robust data pipelines that are efficient, maintainable, and capable of handling complex data processing tasks.

In Microsoft Fabric Python notebooks, we introduced a new feature called T-SQL magic command. This feature allows you to run T-SQL code directly in Python notebooks with full syntax highlighting and code completion. This means you can write T-SQL code in a Python notebook, and it will be executed as if it were a T-SQL cell. This feature is useful for data engineers who want to use the power of T-SQL while still using the flexibility of Python notebooks.

In this article, we explore the T-SQL magic command in Microsoft Fabric notebooks. We cover how to enable this command, specify which warehouse to use, and how to bind the results of T-SQL queries to Python variables.

This feature is available for Fabric Python notebooks. You need to set the language to **Python** in the notebook, and the cell type to **T-SQL**.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Using T-SQL magic command to query Fabric data warehouse

To enable the T-SQL magic command in your Fabric notebook, you need to set the `%%tsql` magic command at the beginning of your cell. This command indicates the code in that cell should be treated as T-SQL code.

In this example, we're using the T-SQL magic command to query a Fabric Data Warehouse. The command takes the following parameters:

* The `-artifact` parameter specifies the name of the data warehouse to use. The T-SQL code in the cell is executed against the specified data warehouse in Fabric.
* The `-type` parameter specifies the type of the Fabric item. For Fabric Data Warehouse, use `Warehouse`.
* The `-bind` parameter specifies the name of the variable to bind the results of the T-SQL query to. In the following example, the results of the query are stored in a Python variable called `df1`. If you need to apply any transformation to the df1 variable, you can do so using Python code in the next cell. The `-bind` parameter is optional, but it's recommended to bind the results of the T-SQL query to a Python variable. This parameter allows you to easily manipulate and analyze the results using Python code.
* The `-workspace` parameter is optional and is used if the warehouse is located in a different workspace. Without this parameter, the notebook uses the current workspace.

```python
%%tsql -artifact dw1 -type Warehouse -bind df1
SELECT TOP (10) [GeographyID],
            [ZipCodeBKey],
            [County],
            [City],
            [State],
            [Country],
            [ZipCode]
FROM [dw1].[dbo].[Geography]
```

:::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-data-warehouse.png" alt-text="Screenshot showing tsql magic command with data warehouse." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-data-warehouse.png":::

If both the `-artifact` and `-type` parameters are skipped, the notebook uses the default warehouse item in the current notebook. 

## Using T-SQL magic command to query SQL database

You can also use the T-SQL magic command to query a SQL database in Fabric. The syntax is similar to querying a data warehouse, but the `-type` parameter must be set to `SQLDatabase`. The `-bind` parameter specifies the name of the variable to bind the results of the T-SQL query to. 

In the following example, the result of the query is stored in a Python variable called `df2`.

```python
%%tsql -artifact sqldb1 -type SQLDatabase -bind df2
SELECT TOP (10) [AddressID]
      ,[AddressLine1]
      ,[AddressLine2]
      ,[City]
      ,[StateProvince]
      ,[CountryRegion]
      ,[PostalCode]
      ,[rowguid]
      ,[ModifiedDate]
  FROM [SalesLT].[Address];
```

:::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-sql-database.png" alt-text="Screenshot showing tsql magic command with sql database." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-sql-database.png":::

## Using T-SQL magic command to query lakehouse SQL analytics endpoint

You can also use the T-SQL magic command to query a SQL analytics endpoint. The syntax is similar to querying a data warehouse, but the `-type` parameter must be set to `Lakehouse`.

## Using T-SQL magic command as line magic

Instead of running T-SQL in a full code cell with `%%tsql`, you can run T-SQL in a single line with `%tsql` as line magic once you have declared a connection for the session. 

1. In a cell that uses the `%%tsql` magic command, include the parameter `-session`. For example:

    ```python
    %%tsql -artifact ContosoDWH -type Warehouse -session
    SELECT TOP(10) * FROM [ContosoDWH].[dbo].[Geography];
    ```

1. Then, in following cells, `%tsql` will assume the `-session` connection without having to provide `-artifact` and `-type`. For example, the following line command allows running quick queries without needing to create a full code cell.

    ```python
    df = %tsql SELECT TOP(10) * FROM [ContosoDWH].[dbo].[Geography];
    ```
    
:::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-line.png" alt-text="Screenshot showing tsql magic command with line magic." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-line.png":::

## Reference Python variables in T-SQL

You can also reference Python variables in T-SQL code. To do so, use the `{}` symbol followed by the name of the Python variable. For example, if you have a Python variable called `count`, you can reference it as follows in your T-SQL code:

```python
count = 10

df = %tsql SELECT TOP({count}) * FROM [dw1].[dbo].[Geography];
```

:::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-reference-python-variable.png" alt-text="Screenshot showing tsql magic command with reference python variable." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-reference-python-variable.png":::

To see the full syntax, use the `%tsql?` command. This command displays the help information for the T-SQL magic command, including the available parameters and their descriptions.

> [!NOTE]
> You can run the full DML and DDL commands against the data warehouse or SQL database, but only read-only query against the lakehouse sql endpoint.

## Related content

For more information about Fabric notebooks, see the following articles.

* Questions? Try asking the [Fabric Community](https://community.fabric.microsoft.com/).
* Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
