---
title: Connect to data sources - Fabric User data functions
description: Learn how to connect your Fabric User data function items to data sources.
ms.author: eur
ms.reviewer: luisbosquez
author: eric-urban
ms.topic: overview
ms.date: 11/10/2025
ms.search.form: Add new fabric item connections to user data functions items
---

# Connect to Fabric items from your Fabric User data functions item

Fabric User data functions provide connections to supported fabric data sources and items by using the **Manage connections** feature in the Fabric portal. This feature allows you to connect to your Fabric data sources without having to create connection strings or manage access credentials. For fabric items that aren't a data source you can securely connect to those items within a function.

In this article, you learn how to:

- Create a new connection for your user data functions item.
- Use your new connection in your function code.
- Modify or delete your data connection.

## Supported items in Fabric User data functions

The following items are currently supported for Fabric User data functions:

- [Fabric SQL databases](../../database/sql/overview.md) for read/write operations
- [Fabric warehouses](../../data-warehouse/create-warehouse.md) for read/write operations
- [Fabric lakehouses](../lakehouse-overview.md) for read/write operations for Lakehouse files and for read-only operations for the SQL Endpoint.
- [Fabric mirrored databases](../../mirroring/overview.md) for read-only operations
- [Fabric Variable library](../../cicd/variable-library/variable-library-overview.md) to define configuration settings as variables. [Learn more](./python-programming-model.md).

## Create a new data connection for your user data functions item

Any data connections you add are associated with your user data functions item and can be referenced in the code of any of your functions. To follow this guide, you need an existing Fabric User data functions item and an existing Fabric data source.

### 1. Access the Manage connections feature from the Functions portal

In **Develop mode**, find and select **Manage connections** in the ribbon of the Functions portal editor.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-1-2.png" alt-text="Screenshot of functions portal editor with manage connections button highlighted." lightbox="..\media\user-data-functions-manage-connections\manage-connections-1.png":::

The pane that opens contains any data connections you created. Select **Add data connection** to create a new connection.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-2.png" alt-text="Screenshot of side pane with the connections tab selected and no connections listed." lightbox="..\media\user-data-functions-manage-connections\manage-connections-2.png":::

### 2. Select your data connection from the OneLake catalog

When you select **Add data connection**, the OneLake catalog opens with a list of all the data sources your user account has access to. The list is filtered to include only supported data sources, some of which might be in other workspaces.

Choose your data source, then select **Connect**.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-3.png" alt-text="Screenshot of OneLake data catalog with a list of data sources." lightbox="..\media\user-data-functions-manage-connections\manage-connections-3.png":::

> [!NOTE]
> If you can't find the data source you're looking for, make sure you have the right permissions to connect to it. Alternatively, make sure you're using a supported data source, as listed at the beginning of this article.

Once created, the new connection to the data source you selected is shown in the side pane on the **Connections** tab. When you see the connection, take note of the **Alias field** that was generated for it. You need this alias to reference the connection from any function in your user data functions item.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-4.png" alt-text="Screenshot of the connections side pane with a new data source connection created." lightbox="..\media\user-data-functions-manage-connections\manage-connections-4.png":::

### 3. Use your connection alias in your function code
Once you're back in the portal editor, you need to add the alias of the connection you created in the `Manage Connections` tab to your code. This alias is automatically created based on the name of the Fabric item you're connecting to.

In this case we'll use a code sample called "Read data from a table in SQL Database". You can find this sample by clicking on the Edit tab, then clicking on the "Insert sample" button and navigating to "SQL Database".

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-5-1.png" alt-text="Screenshot of Insert Sample data catalog with a list of data sources." lightbox="..\media\user-data-functions-manage-connections\manage-connections-5-1.png":::

This is the sample code that was inserted:

```python
@udf.connection(argName="sqlDB",alias="<alias for sql database>")
@udf.function()
def read_from_sql_db(sqlDB: fn.FabricSqlConnection)-> list:
    # Replace with the query you want to run
    query = "SELECT * FROM (VALUES ('John Smith', 31), ('Kayla Jones', 33)) AS Employee(EmpName, DepID);"

    # Establish a connection to the SQL database
    connection = sqlDB.connect()
    cursor = connection.cursor()

    query.capitalize()

    # Execute the query
    cursor.execute(query)

    # Fetch all results
    results = []
    for row in cursor.fetchall():
        results.append(row)

    # Close the connection
    cursor.close()
    connection.close()
        
    return results
```

> [!NOTE]
> While this sample connects to a SQL Database, it doesn't need a schema or data in your database to run.

To use the data connection you created, modify the following line in this sample: `@udf.connection(argName="sqlDB",alias="<alias for sql database>")` by replacing the value of the `alias` with the one you obtained from the `Manage Connections` menu. The following code shows this example with the value `ContosoSalesDat`:

```python
@udf.connection(argName="sqlDB",alias="ContosoSalesDat")
@udf.function()
def read_from_sql_db(sqlDB: fn.FabricSqlConnection)-> list:
    [...]
```

After modifying the code, you can test your changes by using the [Test capability](./test-user-data-functions.md) in Develop mode. Once you're ready, you can publish your function using the Publish button in the toolbar. This operation might take a few minutes.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-6-1.png" alt-text="Screenshot of the 'Publish' button." lightbox="..\media\user-data-functions-manage-connections\manage-connections-6-1.png":::

Once the publishing is completed, you can run your function by hovering on its name in the Functions Explorer list, and clicking on the "Run" button in the side panel. The bottom panel "Output" shows the outcome of running the function.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-7.png" alt-text="Screenshot of the side panel used to Run a function." lightbox="..\media\user-data-functions-manage-connections\manage-connections-7.png":::

And that's all you need to connect to a data source from your Fabric User Data Functions. 

## Get variables from Fabric variable libraries

A [Fabric Variable Library](../../cicd/variable-library/tutorial-variable-library.md) in Microsoft Fabric is a centralized repository for managing variables that can be used across different items within a workspace. It allows developers to customize and share item configurations efficiently. Follow these steps to use Variable Libraries in your functions:

1. Add a connection to a variable library using **Manage connections** and get the **alias** for the variable library item.
1. Add a connection decorator for the variable library item. For example, `@udf.connection(argName="varLib", alias="<My Variable Library Alias>")` and replace alias to the newly added connection for the variable library item.
1. In the function definition, include an argument with type `fn.FabricVariablesClient`. This client provides methods you need to work with variables library item. 
1. Use `getVariables()` method to get all the variables from the variable library.
1. To read the values of the variables use, either `["variable-name"]` or `.get("variable-name")`.

**Example**
In this example we simulate a configuration scenario for a production and a development environment. This function sets a storage path depending on the selected environment using a value retrieved from the Variable Library. The Variable Library contains a variable called `ENV` where users can set a value of `dev` or `prod`.

```python
@udf.connection(argName="varLib", alias="<My Variable Library Alias>")
@udf.function()
def get_storage_path(dataset: str, varLib: fn.FabricVariablesClient) -> str:
    """
    Description: Determine storage path for a dataset based on environment configuration from Variable Library.
    
    Args:
        dataset_name (str): Name of the dataset to store.
        varLib (fn.FabricVariablesClient): Fabric Variable Library connection.
    
    Returns:
        str: Full storage path for the dataset.
    """
    # Retrieve variables from Variable Library
    variables = varLib.getVariables()
    
    # Get environment and base paths
    env = variables.get("ENV")    
    dev_path = variables.get("DEV_FILE_PATH")
    prod_path = variables.get("PROD_FILE_PATH")
    
    # Apply environment-specific logic
    if env.lower() == "dev":
        return f"{dev_path}{dataset}/"
    elif env.lower() == "prod":
        return f"{prod_path}{dataset}/"
    else:
        return f"incorrect settings define for ENV variable"
```

## Related content

- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) from within Fabric or [use the Visual Studio Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)