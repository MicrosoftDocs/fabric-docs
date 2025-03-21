---
title: Quickstart - Create a Fabric User data functions item (Preview)
description: Learn how to create a Fabric User data functions item in the portal.
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/27/2025
ms.search.form: Create a user data functions item
---

# Create a Fabric User data functions item (Preview)

In this guide, we'll create a User data functions item and write new functions in it. Each User data functions item contains a code file that includes one or many functions that you can run individually.

Specifically, you learn how to:

- Create a user data functions item.
- Write a new function.
- Manage functions.
- Run your function.

## Prerequisites

- A Microsoft Fabric capacity. If you don't have one, you can create a [trial capacity for free](../../get-started/fabric-trial.md).
- A [Fabric workspace](../../get-started/create-workspaces.md) linked to the capacity.

## Create a new user data functions item

1. In your workspace, select **+ New item**.

1. In the pane that opens, search for `User data functions`, then select the tile.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-user-data-functions.png" alt-text="Screenshot showing user data functions tile in the new item pane." lightbox="..\media\user-data-functions-create-in-portal\select-user-data-functions.png":::

1. Provide a **Name** for the user data functions item.

1. Select **New function** to create a ``hello_fabric`` Python function template. The Functions explorer shows all the functions that are published and ready to be invoked.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png" alt-text="Screenshot showing how to create a new function using a template." lightbox="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png":::

1. Once the `hello_fabric` function is published, you can run it from the list of functions in the Functions explorer.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\hello-fabric-template.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="..\media\user-data-functions-create-in-portal\hello-fabric-template.png":::

   :::image type="content" source="..\media\user-data-functions-create-in-portal\run-1.png" alt-text="Screenshot of hello_fabric function listed in functions explorer.":::

### Programming model key concepts

Your user data functions item uses the [User data functions programming model](./python-programming-model.md) to create, run, debug, and modify individual functions. All the functions within a user data functions item are written to a file called `function_app.py` that you can open in Visual Studio Code.

The first lines of the code for a user data functions item import the libraries needed to run your functions. Your **functions will not work properly** if any of these libraries are missing.

```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

- To create, run, and manage functions, you need the `fabric.functions` SDK and a few other important libraries such as `logging` to write custom logs.
- `udf=fn.UserDataFunctions()` is the construct to define functions within a user data fnctions item.

## Add a new data function

Each runnable function starts with a `@udf.function()` decorator before the function definition. Read more about our [Python programming model](./python-programming-model.md). To write a new function, use the decorator `@udf.function()` at the beginning to declare it as a runnable function. Here's a sample function:

```python
# This sample allows you to pass a credit card number as an integer and mask it, leaving the last 4 digits. 

@udf.function()
def maskCreditCard(cardNumber: int)-> str:
    # Convert the card number to a string
    cardNumberStr = str(cardNumber)
    
    # Check if the card number is valid
    if not cardNumber_str.isdigit() or not (13 <= len(cardNumber_str) <= 19):
        raise ValueError("Invalid credit card number")
    
    # Mask all but the last four digits
    maskedNumber = '*' * (len(cardNumberStr) - 4) + cardNumber_str[-4:]
    
    return str(maskedNumber)

   ```

Once the function is ready, publish the function to test it.

## Manage data functions

You can add, rename, or remove functions from a user data functions item by modifying the code directly. You need to publish your functions every time you make a modification for the changes to be committed.

### Add a new function from sample

This example shows you how to add a new function from the Insert sample menu. We'll add a function called **Manipulate data with pandas library** that uses the `pandas` library as a requirement. Follow these steps to add the sample function:

1. Select **Library management** to add the libraries that your function requires.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::

1. Select **pandas** library and select the version. Once the library is added, it's automatically saved in your user data functions item.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library.":::

1. Select **Insert sample** > **Data Manipulation** > **Manipulate data with pandas library**. This action inserts sample code at the end of your user data functions code file.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png" alt-text="Screenshot showing how to insert a sample that uses pandas library." lightbox="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png":::

1. Once the sample is inserted into the editor, you can save your changes by selecting **Publish**. Publishing the changes might take a few minutes.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png" alt-text="Screenshot showing code snippet of the sample in the editor." lightbox="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png":::

The function is now ready to be tested from the portal, or invoked from another application or Fabric item, such as a data pipeline.

### Rename a function

1. Select into the code editor and update the name of the function. For example, rename `hello_fabric` to `hello_fabric1`. Here's an example:

   ```python
   @udf.function()
   def hello_fabric1(name: str) -> str:
      logging.info('Python UDF trigger function processed a request.')

      return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
   ```

1. After changing the name, select **Publish** to save these changes.

1. Once the changes are published, you can view the new name for the function in the Functions explorer.

### Delete a function

To delete a function, select function code in the code editor and remove the entire code section. Publish the changes to delete it entirely from the user data functions item.

For example, to delete the `hello_fabric` function, remove the following code block:

```python
@udf.function()
def hello_fabric(name: str) -> str:
    logging.info('Python UDF trigger function processed a request.')

    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

After the code is removed, you can select **Publish** to save your changes. Once the publish completes, you see an updated list of available functions in the Functions explorer.

## Test your function

1. Select the **Run** icon that appears when you hover over a function in the Functions explorer list.

    :::image type="content" source="..\media\user-data-functions-create-in-portal\test-data-function.png" alt-text="Screenshot showing how to test the data functions." lightbox="..\media\user-data-functions-create-in-portal\test-data-function.png":::

1. On the **Run** screen, enter the required parameters in the field provided. In this case, we'll run the `manipulate_data` function which requires a list in JSON format as a parameter.

   ```json
   [
    {
     "Name": "John",
     "Age": 22,
     "Gender": "male"
    }
   ]
   ```
  
1. Select **Run** to run the function.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png" alt-text="Screenshot showing the output when a function is successfully executed.":::

1. You can view the live logs and the output to validate if the function ran successfully. Alternatively, you see an error message and logs from your function invocation.

## Next steps

- [Create a Fabric User data functions item in Visual Studio Code](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
