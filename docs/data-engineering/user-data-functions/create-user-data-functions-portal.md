---
title: Quickstart - Create a new Fabric User Data Functions item (Preview)
description: Learn how to create a Fabric User Data Functions in the portal 
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/27/2025
ms.search.form: Getting started with User Data Functions
---

# Create a new Fabric user data functions item from the Fabric portal (Preview)

In this guide, we will create a new User Data Functions item and write new functions in it. Each User Data Functions item contains a code file that includes one or many functions that you can run individually.

1. Create a new Fabric User Data functions item
2. Write a new function
3. Manage functions 
4. Run your function


## Prerequisites
- A Microsoft Fabric capacity. If you don't have one, you can create a [trial capacity for free](../../get-started/fabric-trial.md).
- A [Fabric Workspace](../../get-started/create-workspaces.md) linked to the capacity
 
## Create a new Fabric User Data Functions item
1. Select your workspace, and select on **+ New item**. 
2. Select Item type as **All items**. Search for and select **User data functions**.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-user-data-functions.png" alt-text="Screenshot showing selecting a user data functions item." lightbox="..\media\user-data-functions-create-in-portal\select-user-data-functions.png":::

3. Provide a **name** for the User data functions item.
 
4. Select **New function** to create a ``hello_fabric`` Python function template. The functions explorer shows all the functions that are published and ready to be invoked.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png" alt-text="Screenshot creating a new function using a template." lightbox="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png":::

5. Once the `hello_fabric` function is published, you can run it from the list of functions in the Functions explorer.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\hello-fabric-template.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="..\media\user-data-functions-create-in-portal\hello-fabric-template.png":::

   :::image type="content" source="..\media\user-data-functions-create-in-portal\run-1.png" alt-text="Screenshot of portal running a user data function" lightbox="..\media\user-data-functions-create-in-portal\run-1.png":::

### Programming model key concepts 
Your User Data Functions use the [User Data Functions Python Programming model](./python-programming-model.md) to create, run, debug and modify individual functions. All the functions within a User data functions item are written to file called `function_app.py` that you can open in VS Code. 

The first lines of the code for User data functions are importing the necessary libraries to run your functions. Your **functions will not work properly** if any of these libraries are missing.

```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

- To create, run, manage functions, you need `fabric.functions` SDK and few other important libraries such as `logging` allows you to write custom logs. 
- `udf=fn.UserDataFunctions()` is the construct to define functions within a User data functions item. 

## Add a new data function
Each runnable function starts with a `@udf.function()` decorator before the function definition. Read more about our [Python Programming model](./python-programming-model.md). To write a new function, use the decorator `@udf.function()` at the beginning to declare it as a runnable function. Here's an example function: 

```python
# This sample allows you to pass a credit card as integer and mask the card leaving the last 4 digits. 

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
You can add, rename, or remove functions from a User data functions item by modifying the code directly. You need to publish your functions every time you make a modification for the changes to be committed.

### Add a new function from sample 
This is an example of how to add a new function from the `Insert sample` menu. In this case, we will add a function called **Manipulate data with pandas library** that uses the `pandas` library as a requirement. Follow the steps to add this sample function:

1. Select **Library management** to add the libraries that your function requires. 

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::
   
   >[!NOTE]
   > `fabric_user_data_functions` library is added by default and can't be removed. This library is required for the functionality of User data functions. You need to update the version of this library for any future releases of this SDK.

2. Select **pandas** library and select the version. Once the library is added, it's automatically saved in your User Data Functions item.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

3. Select **Insert sample** and select **Manipulate data with pandas library**. This action will insert sample code at the end of your User Data Functions code file.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png" alt-text="Screenshot showing how to insert a sample that uses pandas library." lightbox="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png":::

5. Once the sample is inserted into the editor, you can save your changes by selecting **Publish**. Publishing the changes may take a few minutes. 
   
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

2. After changing the name, select **publish** to save these changes. 
3. Once the changes are published, you can view the new name for the function in the Functions explorer. 

### Delete a function 
To delete a function, select function code in the code editor and remove the entire code section. Publish the changes to delete it entirely from the user data functions item. 

For example, to delete the `hello_fabric` function, remove the following code block: 

```python
@udf.function()
def hello_fabric(name: str) -> str:
    logging.info('Python UDF trigger function processed a request.')

    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

After the code is removed, you can select **publish** to save your changes. Once the publish completes, you see an updated list of available functions in the Functions explorer.

## Test your function 
1. Select **Run** icon that shows up when you hover over a function in the Functions explorer list. 

    :::image type="content" source="..\media\user-data-functions-create-in-portal\test-data-function.png" alt-text="Screenshot showing how to test the data functions." lightbox="..\media\user-data-functions-create-in-portal\test-data-function.png":::

1. Pass the required parameters in presented as a form in the Functions explorer. In this case, we are going to run the `manipulate_data` function which requires a list in a JSON format as a parameter.   
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

## Next steps
- [Develop user data functions in VS Code](./create-user-data-functions-vs-code.md)
- [Learn about User data functions programming model](./python-programming-model.md)



