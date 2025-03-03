---
title: Python Programming model for Fabric User Data Functions (Preview)
description: Overview of the  User data functions programming model using Python
ms.author: sumuth
author: mksuni
ms.topic: overview
ms.date: 02/20/2025
ms.search.form: Fabric User Data Functions
---


# Overview of Fabric user data functions programming model (Preview)
The Fabric programming model helps you to easily create Data function sets and easily connect to Fabric data sources such as Datawareshouse or Lakehouse etc. to read data, transform it in any desired output. The model is leaning towards having to learn Fabric data function set concepts and focusing more on ease of development in Python. 

## Prerequisites
- [Python 3.11 version](https://www.python.org/downloads/release/python-3110/) 
- [User data functions Python SDK in PyPI](https://pypi.org/project/fabric-user-data-functions/) 

## User data functions SDK 
Fabric User data functions item can contain many functions. Each function is a stateless method in your Python script that processes input and produces output. User data functions programming model allows you to get started with few steps: 

- All of the code you need to create User data functions in Python is imported from `fabric.functions`. The sample already includes the line `import fabric.functions as fn`, so any classes can be created through `fn`.

- Ensure the line `fn.UserDataFunctions()` is at the beginning of the code, before any functions you create, in `function_app.py`. It provides the execution context for all the functions defined in this item.

**Example:**
```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

3. **Limits**: The request payload length is limited to 2 MB. 

## Write a data function 
A user defined data function is identified with `@udf.function()` decorator. You can pass an input for the function such as primitive data types like str, int, float, etc. In the function code, you can write your business logic. 

**Example**
```python
# This is a hello fabric function sample 
@udf.function()
def hello_fabric(name: str) -> str:
    logging.info('Python UDF trigger function processed a request.')
    logging.info('Executing hello fabric function.')
    
    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
    
```

## Input types supported 
The input data types supported are:

| **JSON Type** | **Python Data type** |
| ------------------- | ------------------------ |
| **String**| str|
| **Datetime string** | datetime |
| **Boolean** | bool |
| **Numbers**| int, float |
| **Array** | list[], example list[int]|
| **Object**	| dict |
| **null**| None |

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
The programming model allows you to securely use these connections without having to use the connection strings in your code. You can add data connections to your user data functions item to any data source in Fabric. The library `fabric.functions` provides two ways to handle data connections: 

- **fabric.functions.FabricSqlConnection:** It allows you to work with SQL databases in Fabric, including SQL Analytics endpoints
- **fabric.functions.FabricLakehouseClient:** It allows you to work with Lakehouses, with a way to connect to both Lakehouse tables and Lakehouse files.
 
In order to define you connection to data sources you want to use with your custom logic to read or write data, use `@udf.connection`. You can use it in any of the following formats:

•`@udf.connection(alias="<alias for data connection>", argName="sqlDB")`
•`@udf.connection("<alias for data connection>", "<argName>")`
•`@udf.connection("<alias for data connection>")`

The arguments for `@udf.connection` are:
- `argName` is the name of the argument you use as input for your data function.
- `alias` is the alias of data connection you is added to your data function. You can get alias from **Manage connections**.
- `argName` and `alias` can be same, in such cases you can just use `@udf.connection("<alias for data connection>")`

### Example

```python
# Where demosqldatabase is the argument name and the alias for my data connection used for this function
@udf.connection("demosqldatabase")
@udf.function()
def read_from_sql_db(demosqldatabase: fn.FabricSqlConnection)-> list:
   # Replace with the query you want to run
   query = "SELECT * FROM (VALUES ('John Smith', 31), ('Kayla Jones', 33)) AS Employee(EmpName, DepID);"
   . . . .
   . . . .
   return results
```

## Get invocation properties using UserDataFunctionContext
A parameter with the data type UserDataFunctionContext can be added to a User Data Function to access metadata about a function's invocation, with the data supplied within it for you.

Here are the properties for UserDataFunctionContext:


|Property Name|Data Type|Description|
|---------------|-------------|------------------------------------|
| Invocation ID | string| The unique Guid tied to the invocation of the user data function |
| ExecutingUser | UserDetails | Metadata of the user's information that is being used to authorize the invocation of the function |

Where ExecutingUser contains the following information:

| Property Name| Data Type| Description|
|----------------| ----------------|-----------------------------------------|
| Oid | string (Guid) | The user's object ID, which is an immutable identifier for the requestor, which is the verified identity of the user or service principal. This ID uniquely identifies the requestor across applications. We suggest using it in tandem with TenantId to be the values to perform authorization checks. |
| TenantId | string (Guid) | The tenant ID of the user, which represents the tenant that the user is signed into. |
| PreferredUsername | string | The preferred username of the user, which can be an email address, phone number, generic username, or unformatted string. It's mutable. | 

For the function to inject data into the UserDataFunctionContext parameter, you must use an attribute for UserDataFunctionContext. Add `@udf.context(argName="<parameter name>")` to the top of the function. `argName` is optional and can be defined in the function input parameters.

**Example**
```python
@udf.context(myContext")
@udf.function()
def getContext(myContext: fabric.functions.UserDataFunctionContext)-> str:
    logging.info('Python UDF trigger function processed a request.')
    return f"Hello oid = {context.executing_user['Oid']}, TenantId = {context.executing_user['TenantId']}, PreferredUsername = {context.executing_user['PreferredUsername']}, InvocationId = {context.invocation_id}"
```

## Example: Function that queries data 
Here's an example function that queries a Warehouse in Fabric and then write the data to a csv in a Lakehouse in Fabric. Before using the sample, [Create a Data warehouse with sample data](../../data-warehouse/create-warehouse-sample.md) or your own data before creating this function. The function example reads the results from a query for a table in the data warehouse.
 
Before running the example, complete these steps:

1. Select Manage connections to connect to a Fabric SQL Database
2. Copy the Alias name and replace it in `@udf.connection()` decorator.

```python
# This sample allows you to read data from a Fabric SQL Database 
# Complete these steps before testing this function 
# 1. Select Manage connections to connect to a Fabric SQL Database
# 2. Copy the Alias name and replace it below inside the @udf.connection() decorator.

@udf.connection(argName="sqlDB",alias="<alias for sql database>")
@udf.function()
def read_from_sql_db(sqlDB: fn.FabricSqlConnection)-> list:
    # Replace with the query you want to run
    query = "SELECT * FROM (VALUES ('John Smith', 31), ('Kayla Jones', 33)) AS Employee(EmpName, DepID);"

    # Establish a connection to the SQL database
    connection = sqlDB.connect()
    cursor = connection.cursor()

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

## How to invoke a function
Functions can be invoked by calling the Function endpoint Url. Select the function you want to invoke in the **Functions explorer** and select **Copy Function URL**. Use this URL in your front end application to invoke the function. [See Invoke user data functions from an application](./tutorial-invoke-using-python-app.md)


## Output schema for User data function 
The output for a user data function uses the following schema. 

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

The following properties are returned when a function is executed:
- **functionName**: It provides the name of the function executed.
- **invocationId**: It provides the invocation ID for execution of a function at a given time.
- **status**: You can view the status of the function execution.
- **output**: You can see the output of the function based on output type defined in the function. 
- **errors**: If any errors were captured, you see the error name, error message, and any more information about the issue.

## Error codes

| **Error code** | **Description** |
| ------------------- | ------------------------ |
| 200 OK (Success)| The request as successful|
| 403 (Forbidden) | The response is too large and the invocation fails.|
| 408 (Request Timeout) | The request failed due to execution taking more than 200 s. |
| 409 (Conflict) | The request throws an exception during execution. |
| 400 (Bad Request)| The request failed due to invalid or missing input parameters.|
| 500 (Internal Server Error)| The request failed due to internal error.|


## Next steps
- [Create user data functions](./create-user-data-functions-portal.md)
- [User data functions samples](https://github.com/microsoft/fabric-user-data-functions-samples)
