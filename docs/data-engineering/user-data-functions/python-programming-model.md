---
title: Python Programming model for Fabric User Data Functions (Preview)
description: Overview of the User data functions programming model for Python
ms.author: sumuth
author: mksuni
ms.topic: overview
ms.date: 02/20/2025
ms.search.form: Writing new User Data Functions
---


# Overview of Fabric user data functions programming model (Preview)

The Fabric User Data Functions programming model is an SDK that provides the necessary functionality to author and publish runnable functions in Fabric. The SDK also allows you to seamlessly integrate with other items in the Fabric ecosystem, such as Fabric data sources. This library is [publicly available in PyPI](https://pypi.org/project/fabric-user-data-functions/) and is pre-installed in your User Data Functions items.

## User data functions SDK 
A Fabric User Data Functions item contains one or many functions you can invoke from the Fabric portal, from another Fabric item or from an external application using the provided REST endpoint. Each function is a method in your Python script that allows passing parameters and returning an output to the invoker. The User Data Functions programming model contains the following components: 

- The `fabric.functions` library provides the code you need to create User data functions in Python. You can see this library being imported in your first function template when you create a new User Data Functions item.

- The method `fn.UserDataFunctions()` provides the execution context. This is added at the beginning of the code file in all new User Data Functions items, before any function definitions.

  **Example:**
  ```python
  import datetime
  import fabric.functions as fn
  import logging

  udf = fn.UserDataFunctions()
  ```

- Every function is identified with a `@udf.function()` decorator. This decorator will define if your function can be invoked individually from the portal or an external invoker.

  **Invokable function example**
  ```python
  # This is a hello fabric function sample that can be invoked from the Fabric portal, another Fabric item or an external application.

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

## Input types supported 
You can define input parameters for the function such as primitive data types like str, int, float, etc. The supported input data types are:

| **JSON Type** | **Python Data type** |
| ------------------- | ------------------------ |
| **String**| str|
| **Datetime string** | datetime |
| **Boolean** | bool |
| **Numbers**| int, float |
| **Array** | list[], example list[int]|
| **Object**	| dict |

## Output types supported 
The output data types supported are:

| **Python Data type**|
| ------------------------------------ |
| str|
| datetime| 
| bool |
| int, float|
| list[data-type], for example list[int]|
| dict |
| None|

## Data connections to Fabric data sources
This module allows you to reference the [data connections](./connect-to-data-sources.md) without the need for writing connection strings in your code. The library `fabric.functions` provides two ways to handle data connections: 

- **fabric.functions.FabricSqlConnection:** It allows you to work with SQL databases in Fabric, including SQL Analytics endpoints and Fabric Warehouses.
- **fabric.functions.FabricLakehouseClient:** It allows you to work with Lakehouses, with a way to connect to both Lakehouse tables and Lakehouse files.
 
To reference a connection to a data source, you need to use the `@udf.connection` decorator. You can use it in any of the following formats:

- `@udf.connection(alias="<alias for data connection>", argName="sqlDB")`
- `@udf.connection("<alias for data connection>", "<argName>")`
- `@udf.connection("<alias for data connection>")`

The arguments for `@udf.connection` are:
- `argName` is the name of the variable the connection will use in your function.
- `alias` is the alias of the connection you added in the **Manage connections** menu.
- If the `argName` and `alias` have the same value, you can use `@udf.connection("<alias and argName for the data connection>")`.

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

## Get invocation properties using UserDataFunctionContext
The programming model also includes the `UserDataFunctionContext` object. This object contains the function invocation metadata and can be used to create specific app logic for certain invocation mechanisms.

The following are the properties for the `UserDataFunctionContext` object:


|Property Name|Data Type|Description|
|---------------|-------------|------------------------------------|
| Invocation ID | string| The unique GUID tied to the invocation of the User Data Function |
| ExecutingUser | object | Metadata of the user's information used to authorize the invocation. |

The `ExecutingUser` object contains the following information:

| Property Name| Data Type| Description|
|----------------| ----------------|-----------------------------------------|
| Oid | string (GUID) | The user's object ID, which is an immutable identifier for the requestor. This is the verified identity of the user or service principal used to invoke this function across applications. |
| TenantId | string (GUID) | The ID of the tenant that the user is signed in to. |
| PreferredUsername | string | The preferred username of the invoking user, as set by them. This value is mutable. | 

To access the `UserDataFunctionContext` parameter, you must use this decorator: `@udf.context(argName="<parameter name>")` at the top of the function definition.

**Example**
```python
@udf.context(argName="myContext")
@udf.function()
def getContext(myContext: fabric.functions.UserDataFunctionContext)-> str:
    logging.info('Python UDF trigger function processed a request.')
    return f"Hello oid = {context.executing_user['Oid']}, TenantId = {context.executing_user['TenantId']}, PreferredUsername = {context.executing_user['PreferredUsername']}, InvocationId = {context.invocation_id}"
```

## Throw a handled error using UserThrownError
When developing your function, you can throw an expected error response using the `UserThrownError` available in the Python programming model. One use of this method is managing cases where the user-provided inputs fail to pass business validation rules. 

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
- `Message`: This string will be returned as the error message to the application that is invoking this function.
- A dictionary of properties that will be returned to the application that is invoking this function.


## Next steps
- [Create user data functions](./create-user-data-functions-portal.md)
- [User data functions samples](https://github.com/microsoft/fabric-user-data-functions-samples)
