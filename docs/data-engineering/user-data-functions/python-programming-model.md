---
title: Python programming model for Fabric User data functions (Preview)
description: Overview of the Fabric User data functions programming model for Python.
ms.author: sumuth
author: mksuni
ms.topic: overview
ms.date: 03/20/2025
ms.search.form: Write new user data functions items
---


# Fabric User data functions programming model overview (Preview)

The Fabric User data functions programming model is an SDK that provides the necessary functionality to author and publish runnable functions in Fabric. The SDK also allows you to seamlessly integrate with other items in the Fabric ecosystem, such as Fabric data sources. This library is [publicly available in PyPI](https://pypi.org/project/fabric-user-data-functions/) and is pre-installed in your user data functions items.

## User data functions SDK

A user data functions item contains one or many functions you can invoke from the Fabric portal, from another Fabric item, or from an external application using the provided REST endpoint. Each function is a method in your Python script that allows passing parameters and returning an output to the invoker. The User data functions programming model contains the following components:

- The `fabric.functions` library provides the code you need to create user data functions in Python. You can see this library being imported in your first function template when you create a new user data functions item.

- The method `fn.UserDataFunctions()` provides the execution context. It's added at the beginning of the code file in all new user data functions items, before any function definitions.

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
| **String**| str|
| **Datetime string** | datetime |
| **Boolean** | bool |
| **Numbers**| int, float |
| **Array** | list[], example list[int]|
| **Object**	| dict |
| **null**| None |

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

## Data connections to Fabric data sources

This module allows you to reference the [data connections](./connect-to-data-sources.md) without the need for writing connection strings in your code. The `fabric.functions` library provides two ways to handle data connections:

- **fabric.functions.FabricSqlConnection:** Allows you to work with SQL databases in Fabric, including SQL Analytics endpoints and Fabric warehouses.
- **fabric.functions.FabricLakehouseClient:** Lets you work with Lakehouses, with a way to connect to both Lakehouse tables and Lakehouse files.

To reference a connection to a data source, you need to use the `@udf.connection` decorator. You can applye it in any of the following formats:

- `@udf.connection(alias="<alias for data connection>", argName="sqlDB")`
- `@udf.connection("<alias for data connection>", "<argName>")`
- `@udf.connection("<alias for data connection>")`

The arguments for `@udf.connection` are:

- `argName`, the name of the variable the connection will use in your function.
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

## Get invocation properties using UserDataFunctionContext

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
| PreferredUsername | string | The preferred username of the invoking user, as set by th user. This value is mutable. |

To access the `UserDataFunctionContext` parameter, you must use the following decorator at the top of the function definition: `@udf.context(argName="<parameter name>")`

**Example**
```python
@udf.context(argName="myContext")
@udf.function()
def getContext(myContext: fabric.functions.UserDataFunctionContext)-> str:
    logging.info('Python UDF trigger function processed a request.')
    return f"Hello oid = {context.executing_user['Oid']}, TenantId = {context.executing_user['TenantId']}, PreferredUsername = {context.executing_user['PreferredUsername']}, InvocationId = {context.invocation_id}"
```

## Throw a handled error with UserThrownError

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

The `UserThrownError` method takes two parameters:

- `Message`: This string will be returned as the error message to the application invoking this function.
- A dictionary of properties that will be returned to the application that is invoking this function.

## Invoking a function from an external application

Functions can be invoked by issuing a REST call to the endpoint URL. In the **Funcions explorer**, hover over the function you want to invoke. Select **Copy public URL** to get the URL. Use the **Properties** command to enable or disable the ability to use this URL externally.

:::image type="content" source="..\media\user-data-functions-python-programming-model\python-programming-model-1.png" alt-text="Screenshot showing how to debug locally with breakpoints." lightbox="..\media\user-data-functions-python-programming-model\python-programming-model-1.png":::

Next, use this URL in your application to invoke the function. See [Invoke user data functions from an application](./tutorial-invoke-from-python-app.md) for details.

### Output schema

When invoking a user data functions item from an external application, the output schema will have the following format:

```json
{
  "functionName": "hello_fabric",
  "invocationId": "1234567890", 
  "status": "Succeeded | BadRequest | Failed | Timeout | ResponseTooLarge",
  "output": /*shows the result of the function dependeing on the output type*/,
  "errors": [
     {
       "name": "Error name",
       "message": "Error message",
       "properties": {
          /*Key value pairs custom to error*/
       }
     },
  ]
}
```

The following properties are returned:

- **functionName**: The name of the function that was executed.
- **invocationId**: The invocation ID for execution of a function.
- **status**: The outcome of the function's execution. This can have any of the following values: `Succeeded`, `BadRequest`, `Failed`, `Timeout`, or `ResponseTooLarge`.
- **output**: The output value returned by the function.
- **errors**: If any errors were captured, this returns a list of each error with their name, the error message, and error properties.

## Error codes

| **Error code** | **Description** |
| ------------------- | ------------------------ |
| 200 OK (Success)| The request was successful.|
| 403 (Forbidden) | The response was too large and the invocation failed.|
| 408 (Request Timeout) | The request failed due to the execution taking more than 200 seconds. |
| 409 (Conflict) | The request threw an exception during the execution. |
| 400 (Bad Request)| The request failed due to invalid or missing input parameters.|
| 500 (Internal Server Error)| The request failed due to an internal error.|

## Service limits

| Limit | Value | Description |
|-------|-------------|----|
| Request payload length | 2 MB | The maximum size of all request parameters combined. |
| Request execution timeout | 200 seconds | The maximum amount of time a function can run for.|
| Response size limit | 30MB | The maximum size of the response's return value of a function.|

## Next steps

- [Create a new Fabric User data functions item](./create-user-data-functions-portal.md)
- [User data functions samples](https://github.com/microsoft/fabric-user-data-functions-samples)
