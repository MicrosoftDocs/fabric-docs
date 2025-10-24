---
title: Quickstart - Create a Fabric User data functions item
description: Learn how to create a Fabric User data functions item in the portal.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: quickstart
ms.date: 03/31/2025
ms.search.form: Create Fabric User data functions
---

# Create a Fabric User data functions item

In this guide, we will create a new User Data Functions item and write new functions in it. Each User Data Functions item contains code that defines one or many functions that you can run individually.

Specifically, you learn how to:

- Create a user data functions item.
- Write a new function.
- Manage functions.
- Run your function.

## Prerequisites
- A Microsoft Fabric capacity in one of [the supported regions](../../admin/region-availability.md). If you don't have a Fabric capacity, you can create a [trial capacity for free](../../get-started/fabric-trial.md).
- A [Fabric Workspace](../../get-started/create-workspaces.md) linked to that capacity
 
## Create a new Fabric User Data Functions item
1. Select your workspace, and select on **+ New item**. 
2. Select Item type as **All items**. Search for and select **User data functions**.

## Create a new user data functions item

1. In your workspace, select **+ New item**.

1. In the pane that opens, search for `user data functions`, then select the tile.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-user-data-functions.png" alt-text="Screenshot showing user data functions tile in the new item pane." lightbox="..\media\user-data-functions-create-in-portal\select-user-data-functions.png":::

1. Provide a **Name** for the user data functions item.

1. Select **New function** to create a ``hello_fabric`` Python function template. The Functions explorer shows all the functions that are published and ready to be invoked.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png" alt-text="Screenshot showing how to create a new function using a template." lightbox="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png":::

1. Once the `hello_fabric` function is published, you can run it from the list of functions in the Functions explorer.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\hello-fabric-template-1.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="..\media\user-data-functions-create-in-portal\hello-fabric-template-1.png":::


### Add a new function from sample 
This is an example of how to add a new function from the `Insert sample` menu. In this case, we will add a function called **Manipulate data with pandas library** that uses the `pandas` library as a requirement. Follow the steps to add this sample function:

1. Make sure you are in **Develop mode**. Select **Library management** to add the libraries that your function requires. 

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::
   
   >[!NOTE]
   > `fabric_user_data_functions` library is added by default and can't be removed. This library is required for the functionality of User data functions. You need to update the version of this library for any future releases of this SDK.

1. Select **pandas** library and select the version. Once the library is added, it's automatically saved in your User Data Functions item.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

1. Select **Insert sample** and select **Manipulate data with pandas library**. This action will insert sample code at the bottom of your code, after the other functions.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png" alt-text="Screenshot showing how to insert a sample that uses pandas library." lightbox="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png":::

1. Once the sample is inserted into the editor, you test it by using the [Test capability](./test-user-data-functions.md) in Develop mode. 


1. When you are ready, you can select **Publish** to save your changes and update your functions. Publishing may take a few minutes. 
   
   :::image type="content" source="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png" alt-text="Screenshot showing code snippet of the sample in the editor." lightbox="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png":::

6. After the publish is completed, you will see the new function in the Functions explorer list. This function is now ready to be run from the portal, or invoked from another application or Fabric item, such as a pipeline. 

   :::image type="content" source="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png" alt-text="Screenshot showing code snippet of the sample in the editor." lightbox="..\media\user-data-functions-create-in-portal\test-data-function-2.png":::

### Run your function 
1. To run your function, first you need to switch to the **Run only mode** by clicking on the mode switcher. 
   
   :::image type="content" source="..\media\user-data-functions-create-in-portal\switch-mode-run-mode.gif" alt-text="Animated screenshot showing how to switch to Run only mode." lightbox="..\media\user-data-functions-create-in-portal\switch-mode-run-mode.gif":::

1. Select **Run** icon that shows up when you hover over a function in the Functions explorer list. 

    :::image type="content" source="..\media\user-data-functions-create-in-portal\test-data-function.png" alt-text="Screenshot showing how to run the functions." lightbox="..\media\user-data-functions-create-in-portal\test-data-function.png":::

1. Pass the required parameters in presented as a form in the Functions explorer. In this case, we are going to run the `manipulate_data` function which requires a JSON string as a parameter.   
   ```json
   [
    {
     "Name": "John",
     "Age": 22,
     "Gender": "male"
    }
   ]
   ```
  
5. Select **Run** to run the function.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png" alt-text="Screenshot showing the output when a function is successfully executed." lightbox="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png":::

6. You can see the live logs and the output for the function to validate if it ran successfully. Alternatively, you'll see an error message and logs from your function invocation.


## Write a new function
Every runnable function starts with a `@udf.function()` decorator before the function definition. Read more about our [Python Programming model](./python-programming-model.md). To write a new function, use the decorator `@udf.function()` at the beginning to declare it as a runnable function. Here's an example function: 

```python
# This sample allows you to pass a credit card number as an integer and mask it, leaving the last 4 digits. 

@udf.function()
def maskCreditCard(cardNumber: int)-> str:
    # Convert the card number to a string
    cardNumberStr = str(cardNumber)
    
    # Check if the card number is valid
    if not cardNumberStr.isdigit() or not (13 <= len(cardNumberStr) <= 19):
        raise ValueError("Invalid credit card number")
    
    # Mask all but the last four digits
    maskedNumber = '*' * (len(cardNumberStr) - 4) + cardNumberStr[-4:]
    
    return str(maskedNumber)

   ```
Once the function is ready, publish the function to run it. 

### Programming model key concepts 
Your User Data Functions use the [User Data Functions Python Programming model](./python-programming-model.md) to create, run, debug and modify individual functions. This is a first-party library that provides the necessary functionality to invoke your functions in Fabric and leverage all the integrations. 

After creating your first function, the first lines of the code will contain the import statements with the necessary libraries to run your template. 

```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

>[!NOTE]
> The import statement containing the `fabric.functions` library, and the line containing this statement `udf = fn.UserDataFunctions()` are necessary to run your functions properly. Your **functions will not work properly** if these lines are missing.

- To create, run, manage functions, you need `fabric.functions` SDK and few other important libraries such as `logging` allows you to write custom logs. 
- `udf=fn.UserDataFunctions()` is the construct to define functions within a User data functions item. 

## Manage data functions

### Rename a function

1. In **Develop mode**, select into the code editor and update the name of the function. For example, rename `hello_fabric` to `hello_fabric1`:

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

## Next steps

- [Create a Fabric User data functions item in Visual Studio Code](./create-user-data-functions-vs-code.md)
- [Learn about the User data functions programming model](./python-programming-model.md)
