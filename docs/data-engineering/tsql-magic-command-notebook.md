---
title: "T-SQL Magic Command in Microsoft Fabric Notebooks"
description: Learn how to use T-SQL magic command inside Fabric Notebook to for achieve the mix-programming experience between T-SQL and Python.
author: qixwang
ms.author: qixwang
ms.reviewer: sngun
ms.topic: how-to
ms.date: 05/20/2024
ms.custom: 
# Customer Intent: As a data engineer, I want to run T-SQL code Fabric notebooks, manage queries, and perform cross datawarehouse queries.
---

# Mix-programming model in Microsoft Fabric notebooks

The mix of T-SQL and Python in modern data workflows offers a powerful and flexible approach that blends the strengths of both languages. SQL remains the most efficient and readable way to query, filter, and join structured data, while Python excels at data transformation, statistical analysis, machine learning, and visualization. By combining T-SQL and Python, data engineers can use the best of both worlds, enabling them to build robust data pipelines that are efficient, maintainable, and capable of handling complex data processing tasks.

In Microsoft Fabric Python notebooks, we introduce a new feature called T-SQL magic command. This feature allows you to run T-SQL code directly in Python notebooks with full syntax highlighting and code completion. This means you can write T-SQL code in a Python notebook, and it will be executed as if it were a T-SQL cell. This feature is useful for data engineers who want to use the power of T-SQL while still using the flexibility of Python notebooks. This feature is useful for data engineers who want to use the power of T-SQL while still using the flexibility of Python notebooks.

In this article, we explore the T-SQL magic command in Microsoft Fabric notebooks. We cover how to enable this command, specify which warehouse to use, and how to bind the results of T-SQL queries to Python variables.

This feature is available for Fabric Python notebooks. You need to set the language to Python in the notebook.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]

## Using T-SQL magic command to query Fabric Data warehouse

To enable the T-SQL magic command in your Fabric notebook, you need to set the `%%tsql` magic command at the beginning of your cell. This command indicates the code in that cell should be treated as T-SQL code.

In this example, we're using the T-SQL magic command to query a Fabric Data Warehouse, the `-artifact` parameter specifies the name of the Data Warehouse to use. The T-SQL code in the cell is executed against that Data Warehouse, the `-type` parameter specifies the type of the artifact, which in this case is a Data Warehouse, the '-bind' parameter specifies the name of the variable to bind the results of the T-SQL query to. The results of the query are stored in a Python variable called `df1`. If you need to apply any transformation to the df1 variable, you can do so using Python code in the next cell. To specify the warehouse from a different workspace, you can use the `-workspace` parameter. Without this parameter, the notebook uses the current workspace.

   :::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-dw.png" alt-text="Screenshot showing tsql magic command with data warehouse." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-dw.png":::

If both the `-artifact` and `-type` parameters are skipped, the notebook use the default Data warehouse in the current Notebook. The `-bind` parameter is optional, but it's recommended to use it to bind the results of the T-SQL query to a Python variable. This parameter allows you to easily manipulate and analyze the results using Python code.

## Using T-SQL magic command to query Fabric SQL Database

You can also use the T-SQL magic command to query a Fabric SQL Database. The syntax is similar to querying a Data Warehouse, but you need to specify the type of the artifact as `SQLDatabase`. The `-bind` parameter specifies the name of the variable to bind the results of the T-SQL query to. The results of the query is stored in a Python variable called `df2`.

   :::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-sql-database.png" alt-text="Screenshot showing tsql magic command with sql database." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-sql-database.png":::

## Using T-SQL magic command to query Fabric Lakehouse SQL Endpoint
You can also use the T-SQL magic command to query a Fabric SQL Endpoint. The syntax is similar to querying a Data Warehouse, but you need to specify the type of the artifact as `Lakehouse`.

## Using T-SQL magic command as line magic 
Beside running T-SQL in a full code cell with `%%tsql`, you can also run T-SQL in a single line with `%tsql` as line magic. This line magic allows running quick queries without needing to create a full code cell.

   :::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-line.png" alt-text="Screenshot showing tsql magic command with line magic." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-line.png":::

## Reference Python variables in T-SQL

You can also reference Python variables in T-SQL code. You need to use the `{}` symbol followed by the name of the Python variable. For example, if you have a Python variable called `count`, you can reference it in your T-SQL code.

   :::image type="content" source="media\use-python-experience-on-notebook\tsql-magic-command-reference-python-variable.png" alt-text="Screenshot showing tsql magic command with reference python variable." lightbox="media\use-python-experience-on-notebook\tsql-magic-command-reference-python-variable.png":::

To see the full syntax, you can use the `%%tsql -?` command. This display the help information for the T-SQL magic command, including the available parameters and their descriptions.


> [!NOTE]
> You can run the full DML/DDL against the Fabric Data warehouse or Fabric SQL Database, but only read-only query against the Lakehouse sql-endpoint.


## Related content

For more information about Fabric notebooks, see the following articles.

- Questions? Try asking the [Fabric Community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).
