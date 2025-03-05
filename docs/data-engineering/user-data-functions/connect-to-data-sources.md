---
title: Connnect to data sources - Fabric User Data Functions (preview)
description: Learn how to connect your Fabric User Data Functions to data sources.
ms.author: luisbosquez
author: luisbosquez
ms.topic: overview
ms.date: 03/27/2025
ms.search.form: Fabric User Data Functions
---

# Connect to data sources from your Fabric User Data Functions item (Preview)

Fabric User Data Functions provides native data source connections by using the Manage Connections feature in the Fabric portal. This feature allows you to read, write or modify data in your Fabric data sources using your User Data Functions without having to create connection strings or manage access credentials. 

In this article, you will learn how to:
1. Create a new connection for your User Data Functions item. 
1. Use your new connection in your function code.
1. Modify or delete your data connection.

## Supported data source connections in Fabric User Data Functions
The following data sources are currently supported for Fabric User Data Functions:
- [Fabric SQL Database](../../database/sql/overview.md)
- [Fabric Warehouse](../../data-warehouse/create-warehouse.md)
- [Fabric Lakehouse](../lakehouse-overview.md)
- [Fabric Mirrored Databases](..\..\database\mirrored-database\overview.md)

## How to create a new data connection for your User Data Functions item
Any data connections you add will be associated with your User Data Functions item and can be referenced in the code of any of your functions. To follow this guide, you will need a Fabric User Data Functions item and an existing Fabric data source.

### 1. Open the Manage Connections menu from your Functions portal
You will find the **Manage Connections button** in the top bar of the Functions portal editor.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-1.png" alt-text="Portal editor with a highlight for the manage connections button." lightbox="..\media\user-data-functions-manage-connections\manage-connections-1.png":::

Once you click on it, this will open a side panel. This panel will contain the data connections you create. Click on **Add data connection** to create a new one.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-2.png" alt-text="Manage connections side panel with no connections listed." lightbox="..\media\user-data-functions-manage-connections\manage-connections-2.png":::

### 2. Select your data connection from the OneLake Catalog
After clicking on `Add data connection`, you will see the OneLake catalog with a list of all the existing data sources that your user account has access to, including those in other Workspaces. This list is also filtered to include the supported data sources only. 

From here, select your data source of choice and **click on the Connect button**.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-3.png" alt-text="OneLake data catalog with a list of data sources." lightbox="..\media\user-data-functions-manage-connections\manage-connections-3.png":::

> [!NOTE]
> If you can't find the data source you are looking for, make sure you have the right permissions to connect to it, or make sure it is part of the supported data source types listed at the top of this article. 

This will create a new connection to the data source you selected and add it to the connections side panel. Once you see this connection, **take note of the Alias field** that was generated. You will need this to reference this connection from any function in your User Data Functions item.

:::image type="content" source="..\media\user-data-functions-manage-connections\manage-connections-4.png" alt-text="The connections side panel with a new data source connection created." lightbox="..\media\user-data-functions-manage-connections\manage-connections-4.png":::

### 3. Use your connection alias in your function code
Once you are back in the portal editor, you can use the alias you created in the Manage Connections tab inside of your code. For example, the following code sample allows you to connect to a SQL Database and run a query:

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

To use the data connection you created, modify the first line in this sample: `@udf.connection(argName="sqlDB",alias="<alias for sql database>")` by replacing the value of the `alias` with the one you obtained from the Manage connections tab. The below code shows this example with the value `ContosoDatabase`:

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

And that's all you need to connect to a data source from your Fabric User Data Functions. 

## Next steps
- [Create a new User Data Functions item from the Fabric portal](./create-user-data-functions-portal.md) or by using [the VSCode extension](./create-user-data-functions-vs-code.md).
- [Learn about User data functions programming model](./python-programming-model.md)