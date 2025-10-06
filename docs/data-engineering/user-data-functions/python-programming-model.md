---
title: Python programming model for Fabric User data functions
description: Overview of the Fabric User data functions programming model for Python.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: overview
ms.date: 07/7/2025
ms.search.form: Write new user data functions items
---


# Fabric User data functions programming model overview

The Fabric User data functions programming model is an SDK that provides the necessary functionality to author and publish runnable functions in Fabric. The SDK also allows you to seamlessly integrate with other items in the Fabric ecosystem, such as Fabric data sources. [This library is publicly available in PyPI](https://pypi.org/project/fabric-user-data-functions/) and is pre-installed in your user data functions items.

## User data functions SDK

A user data functions item contains one or many functions you can invoke from the Fabric portal, from another Fabric item, or from an external application using the provided REST endpoint. Each function is a method in your Python script that allows passing parameters and returning an output to the invoker. The User data functions programming model contains the following components:

- The `fabric.functions` library provides the code you need to create user data functions in Python. You can see this library being imported in your first function template when you create a new user data functions item.

- The method `fn.UserDataFunctions()` provides the execution context found at the beginning of the code file in all new user data functions items, before any function definitions.

  **Example:**
  ```python
  import datetime
  import fabric.functions as fn
  import logging

  udf = fn.UserDataFunctions()
  ```

- Every function is identified with a `@udf.function()` decorator. This decorator defines if your function can be invoked individually from the portal or an external invoker. Using this decorator will also require the function to have a return value. Functions with this decorator can access the connection objects denoted by the `@udf.connection` decorator. 

  **Invokable function example**
  ```python
  # This is a hello fabric function sample that can be invoked from the Fabric portal, another Fabric item, or an external application.

  @udf.function()
  def hello_fabric(name: str) -> str:
      logging.info('Python UDF trigger function processed a request.')
      logging.info('Executing hello fabric function.')
      
      return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
  ```

- Any Python methods without the `@udf.function()` decorator can't be invoked directly. They can only be invoked from functions that contain the decorator, and can be used as helper functions.

  **Helper function example**
  ```python
  # This is a helper function that can be invoked from other functions, but can't be invoked or run directly because it doesn't have the @udf.function() decorator

  def uppercase_name(name: str) -> str:
      return name.upper()
  ```

## Supported input types

You can define input parameters for the function such as primitive data types like str, int, float, etc. The supported input data types are:

| **JSON Type** | **Python Data type** | 
| ------------------- | ------------------------ | 
| **String**| str |
| **Datetime string** | datetime |
| **Boolean** | bool |
| **Numbers**| int, float |
| **Array** | list[], example list[int]|
| **Object**	| dict|
| **Object**	| pandas DataFrame|
| **Object** or **Array of Objects** | pandas Series|

>[!NOTE]
> To use pandas DataFrame and Series types, select **Library management** in Fabric portal for your user data function and update `fabric-user-data-function` version to 1.0.0. 

Example of request body for input types supported:
```json
{
  "name": "Alice",                          // String (str)
  "signup_date": "2025-07-08T13:44:40Z",    // Datetime string (datetime)
  "is_active": true,                        // Boolean (bool)
  "age": 30,                                // Number (int)
  "height": 5.6,                            // Number (float)
  "favorite_numbers": [3, 7, 42],           // Array (list[int])
  "profile": {                              // Object (dict)
    "email": "alice@example.com",
    "location": "Sammamish"
  },
  "sales_data": {                           // Object (pandas DataFrame)
    "2025-07-01": {"product": "A", "units": 10},
    "2025-07-02": {"product": "B", "units": 15}
  },
  "weekly_scores": [                        // Object or Array of Objects (pandas Series)
    {"week": 1, "score": 88},
    {"week": 2, "score": 92},
    {"week": 3, "score": 85}
  ]
}

```


## Supported output types

The supported output data types are:

| **Python Data type**|
| ------------------------------------ |
| str|
| datetime|
| bool |
| int, float|
| list[data-type], for example list[int]|
| dict |
| None|
|pandas Series|
|pandas DataFrame|

## How to write an async function

Add async decorator with your function definition in your code. With an `async` function you can improve responsiveness and efficiency of your application by handling multiple tasks at once. They are ideal for managing high volumes of I/O-bound operations.  This example function reads a CSV file from a lakehouse using pandas. Function takes file name as an input parameter. 

```python
import pandas as pd 

# Replace the alias "<My Lakehouse alias>" with your connection alias.
@udf.connection(argName="myLakehouse", alias="<My Lakehouse alias>")
@udf.function()
async def read_csv_from_lakehouse(myLakehouse: fn.FabricLakehouseClient, csvFileName: str) -> str:

    # Connect to the Lakehouse
    connection = myLakehouse.connectToFilesAsync()   

    # Download the CSV file from the Lakehouse
    csvFile = connection.get_file_client(csvFileName)

    downloadFile = await csvFile.download_file()
    csvData = await downloadFile.readall()
    
    # Read the CSV data into a pandas DataFrame
    from io import StringIO
    df = pd.read_csv(StringIO(csvData.decode('utf-8')))

    # Display the DataFrame    
    result="" 
    for index, row in df.iterrows():
        result=result + "["+ (",".join([str(item) for item in row]))+"]"
    
    # Close the connection
    csvFile.close()
    connection.close()

    return f"CSV file read successfully.{result}"
```

## Data connections to Fabric data sources

This module allows you to reference the [data connections](./connect-to-data-sources.md) without the need for writing connection strings in your code. The `fabric.functions` library provides two ways to handle data connections:

- **fabric.functions.FabricSqlConnection:** Allows you to work with SQL databases in Fabric, including SQL Analytics endpoints and Fabric warehouses.
- **fabric.functions.FabricLakehouseClient:** Lets you work with Lakehouses, with a way to connect to both Lakehouse tables and Lakehouse files.

To reference a connection to a data source, you need to use the `@udf.connection` decorator. You can apply it in any of the following formats:

- `@udf.connection(alias="<alias for data connection>", argName="sqlDB")`
- `@udf.connection("<alias for data connection>", "<argName>")`
- `@udf.connection("<alias for data connection>")`

The arguments for `@udf.connection` are:

- `argName`, the name of the variable the connection uses in your function.
- `alias`, the alias of the connection you added with the **Manage connections** menu.
- If `argName` and `alias` have the same value, you can use `@udf.connection("<alias and argName for the data connection>")`.

### Example

```python
# Where demosqldatabase is the argument name and the alias for my data connection used for this function
@udf.connection("demosqldatabase")
@udf.function()
def read_from_sql_db(demosqldatabase: fn.FabricSqlConnection)-> list:
  # Replace with the query you want to run
  query = "SELECT * FROM (VALUES ('John Smith', 31), ('Kayla Jones', 33)) AS Employee(EmpName, DepID);"

  # [...] Here is where the rest of your SqlConnection code would be.

  return results
```

## Get invocation properties using `UserDataFunctionContext`

The programming model also includes the `UserDataFunctionContext` object. This object contains the function invocation metadata and can be used to create specific app logic for certain invocation mechanisms.

The following table shows the properties for the `UserDataFunctionContext` object:

|Property Name|Data Type|Description|
|---------------|-------------|------------------------------------|
| Invocation ID | string| The unique GUID tied to the invocation of the user data functions item. |
| ExecutingUser | object | Metadata of the user's information used to authorize the invocation. |

The `ExecutingUser` object contains the following information:

| Property Name| Data Type| Description|
|----------------| ----------------|-----------------------------------------|
| Oid | string (GUID) | The user's object ID, which is an immutable identifier for the requestor. This is the verified identity of the user or service principal used to invoke this function across applications. |
| TenantId | string (GUID) | The ID of the tenant that the user is signed into. |
| PreferredUsername | string | The preferred username of the invoking user, as set by the user. This value is mutable. |

To access the `UserDataFunctionContext` parameter, you must use the following decorator at the top of the function definition: `@udf.context(argName="<parameter name>")`

**Example**
```python
@udf.context(argName="myContext")
@udf.function()
def getContext(myContext: fabric.functions.UserDataFunctionContext)-> str:
    logging.info('Python UDF trigger function processed a request.')
    return f"Hello oid = {context.executing_user['Oid']}, TenantId = {context.executing_user['TenantId']}, PreferredUsername = {context.executing_user['PreferredUsername']}, InvocationId = {context.invocation_id}"
```

## Throw a handled error with `UserThrownError`

When developing your function, you can throw an expected error response by using the `UserThrownError` method available in the Python programming model. One use of this method is managing cases where the user-provided inputs fail to pass business validation rules.

**Example**
```python
import datetime

@udf.function()
def raise_userthrownerror(age: int)-> str:
    if age < 18:
        raise fn.UserThrownError("You must be 18 years or older to use this service.", {"age": age})

    return f"Welcome to Fabric Functions at {datetime.datetime.now()}!"
```

This `UserThrownError` method takes two parameters:
- `Message`: This string is returned as the error message to the application that is invoking this function.
- A dictionary of properties is returned to the application that is invoking this function.

## Create generic connections 

User Data Functions allows you to create connection parameters for your functions with custom connectivity logic. This will give you a similar programming experience to using managed connections objects from the [Manage Connections feature](./connect-to-data-sources.md). 

### Connect to Fabric Cosmos DB container using a generic connection
You can connect to a [Fabric Cosmos DB item](../../database/cosmos-db/overview.md) using a generic connection by following these steps:
1. In your Fabric User Data Functions item, install the `azure-cosmos` library version `4.9.0` using the [Library Management experience](./how-to-manage-libraries.md).
1. Go to your Fabric Cosmos DB item settings.

  :::image type="content" source="..\media\user-data-functions-python-programming-model\cosmos_db_connection_1.png" alt-text="Screenshot showing the Fabric Cosmos DB settings button location." lightbox="..\media\user-data-functions-python-programming-model\cosmos_db_connection_1.png":::

1. Retrieve your Fabric Cosmos DB endpoint URL.

  :::image type="content" source="..\media\user-data-functions-python-programming-model\cosmos_db_connection_2.png" alt-text="Screenshot showing the Fabric Cosmos DB endpoint URL." lightbox="..\media\user-data-functions-python-programming-model\cosmos_db_connection_2.png":::

1. Use the following sample code to connect to your Fabric Cosmos DB container and run a read query using the Cosmos DB sample dataset. Replace the values of the following variables:
  - `COSMOS_DB_URI` with your Fabric Cosmos DB endpoint.
  - `DB_NAME` with the name of your Fabric Cosmos DB item.

```python
from fabric.functions.cosmosdb import get_cosmos_client
import json

@udf.generic_connection(argName="cosmosDb", audienceType="CosmosDB")
@udf.function()
def get_product_by_category(cosmosDb: fn.FabricItem, category: str) -> list:

    COSMOS_DB_URI = "YOUR_COSMOS_DB_URL"
    DB_NAME = "YOUR_COSMOS_DB_NAME" # Note: This is the Fabric item name
    CONTAINER_NAME = "SampleData" # Note: This is your container name. In this example, we are using the SampleData container.

    cosmosClient = get_cosmos_client(cosmosDb, COSMOS_DB_URI)

    # Get the database and container
    database = cosmosClient.get_database_client(DB_NAME)
    container = database.get_container_client(CONTAINER_NAME)

    query = 'select * from c WHERE c.category=@category' #"select * from c where c.category=@category"
    parameters = [
        {
            "name": "@category", "value": category
        }
    ]
    results = container.query_items(query=query, parameters=parameters)
    items = [item for item in results]

    logging.info(f"Found {len(items)} products in {category}")

    return json.dumps(items)
```

1. Test or run this function by providing a category name, such as `Accessory` in the invocation parameters.

## Next steps
- [Reference API documentation](/python/api/fabric-user-data-functions/fabric.functions)
- [Create a Fabric User data functions item](./create-user-data-functions-portal.md)
- [User data functions samples](https://github.com/microsoft/fabric-user-data-functions-samples)
