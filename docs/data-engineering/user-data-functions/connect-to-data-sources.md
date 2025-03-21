---
title: Connect to data sources - Fabric User data functions (Preview)
description: Learn how to connect your Fabric User data function items to data sources.
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 03/27/2025
ms.search.form: Add new data connections to user data functions items
---

# Connect to data sources from your Fabric User data functions item (Preview)

Fabric User data functions provides native data source connections by using the Manage connections feature in the Fabric portal. This feature allows you to connect to your Fabric data sources without having to create connection strings or manage access credentials.

In this article, you learn how to:

- Create a new connection for your user data functions item.
- Use your new connection in your function code.
- Modify or delete your data connection.

## Supported data source connections in Fabric User data functions

The following data sources are currently supported for Fabric User data functions:

- [Fabric SQL databases](../../database/sql/overview.md)
- [Fabric warehouses](../../data-warehouse/create-warehouse.md)
- [Fabric lakehouses](../lakehouse-overview.md)
- [Fabric mirrored databases](../../database/mirrored-database/overview.md)

## Create a new data connection for your user data functions item

Any data connections you add are associated with your user data functions item and can be referenced in the code of any of your functions. To follow this guide, you need an existing Fabric User data functions item and an existing Fabric data source.

### 1. Open the Manage connections menu from the Functions portal

Find and select **Manage connections** in the ribbon of the Functions portal editor.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-1.png" alt-text="Screenshot of functions portal editor with manage connections button highlighted." lightbox="..\media\user-data-functions-manage-connections\manage-connections-1.png":::

The pane that opens contains any data connections you created. Select **Add data connection** to create a new connection.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-2.png" alt-text="Screenshot of side pane with the connections tab selected and no connections listed." lightbox="..\media\user-data-functions-manage-connections\manage-connections-2.png":::

### 2. Select your data connection from the OneLake catalog

When you select **Add data connection**, the OneLake catalog opens with a list of all the data sources your user account has access to. The list is filtered to include only supported data sources, some of which might be in other workspaces.

Choose your data source, then select **Connect**.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-3.png" alt-text="Screenshot of OneLake data catalog with a list of data sources." lightbox="..\media\user-data-functions-manage-connections\manage-connections-3.png":::

> [!NOTE]
> If you can't find the data source you're looking for, make sure you have the right permissions to connect to it. Alternatively, make sure you're using a supported data source, as listed at the beginning of this article.

Once created, the new connection to the data source you selected is shown in the side pane on the **Connections** tab. Once you see the connection, take note of the **Alias field** that was generated for it. You need this alias to reference the connection from any function in your user data functions item.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-4.png" alt-text="Screenshot of the connections side pane with a new data source connection created." lightbox="..\media\user-data-functions-manage-connections\manage-connections-4.png":::

### 3. Use the connection alias in your function code

Once you're back in the Functions portal editor, you can add the alias you created on the Connections tab to your code. For example, the following code sample lets you connect to a SQL database and run a query:

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

To use the data connection you created, modify the line `@udf.connection(argName="sqlDB",alias="<alias for sql database>")` in the sample by replacing the `alias` value with the one you obtained from the Manage connections menu. The following code shows this example with the value `ContosoDatabase`:

```python
@udf.connection(argName="sqlDB",alias="ContosoDatabase")
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

That's all you need to connect to a data source from your user data functions item. Make sure to publish your functions before you try to run your changes.

## Next steps

- [Create a Fabric User data functions item](./create-user-data-functions-portal.md) from within Fabric or [use the Visual Studio Code extension](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
