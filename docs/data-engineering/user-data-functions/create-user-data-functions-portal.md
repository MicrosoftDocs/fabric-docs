---
title: Quickstart - Create a new Fabric User Data Functions item (Preview)
description: Learn how to create a Fabric User Data Functions in the portal 
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/27/2025
ms.search.form: Fabric User Data Functions
---

# Create a new Fabric user data functions (Preview)

User data functions let you run your code to define custom logic needed for your data engineering needs. You can write many functions within a User data function item. Currently we support **Python 3.11** language. In this article, you learn how to:

1. Create a new user data functions item
2. Add a new data function
3. Manage functions 
4. Test the data function


## Prerequisites
- A Microsoft Fabric capacity. If you don't have one, you can create a [trial capacity for free](../../get-started/fabric-trial.md).
- A [Fabric Workspace](../../get-started/create-workspaces.md) linked to the capacity
 
## Create a new Fabric User Data Functions set
1. Select your workspace, and select on **+ New item**. 
2. Select Item type as **All items**. Search for and select **User data functions**. 
   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-user-data-functions.png" alt-text="Screenshot showing selecting a user data functions item." lightbox="..\media\user-data-functions-create-in-portal\select-user-data-functions.png":::

3. Provide a **name** for the User data functions item.
 
4. Select **New functions** to start with a ``hello_fabric`` function template. The default language is **Python**. Functions explorer shows all the functions that are published and ready to be invoked.
  :::image type="content" source="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png" alt-text="Screenshot creating a new function using a template." lightbox="..\media\user-data-functions-create-in-portal\new-functions-to-create-template.png":::

5. The `hello_fabric` function is published and then ready to be invoked. 
   :::image type="content" source="..\media\user-data-functions-create-in-portal\hello-fabric-template.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="..\media\user-data-functions-create-in-portal\hello-fabric-template.png":::

### Programming model key concepts 
User data functions use [Python Programming model](./python-programming-model.md) to create, run, debug, update functions within a user data functions item. All the functions within a User data functions item are written to file `function_app.py`. You can open it in VS Code to work on it locally. 

The top lines of the code for User data functions are important to run or invoke these functions. **Hence do not delete these lines of code.**

```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

- To create, run, manage functions, you need `fabric.functions` SDK and few other important libraries such as `logging` allows you to write custom logs. 
- `udf=fn.UserDataFunctions()` is the construct to define functions within a User data functions item. 

Each function starts with a `@udf.function()` decorator before your can write the function definition. Read more about our [Python Programming model](./python-programming-model.md).

## Add a new data function

To create new function, you must be the owner of the user data functions item. Use the decorator `@udf.function()` to start with. Here's an example function: 

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
Once the function is ready, publish the function and then test it. 

## Manage data functions
You can add, update, or remove functions from a User data functions item.

### Add a new data function from sample 
Owner of the User data function item can edit the item and add or remove functions within this item. Follow the steps to add a sample function:

1. Select **Library management** to add new library that you can use in a function.
   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::

2. Select **pandas** library and select the version. Once the library is added, it is autosaved. 
   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

3. Select **Insert sample** and select **Manipulate data with pandas library**. 
   :::image type="content" source="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png" alt-text="Screenshot showing how to insert a sample that uses pandas library." lightbox="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png":::

5. The sample is inserted into the editor. To save your changes, you need to select **Publish**. Publishing the changes can take 1-2 minutes. 
   :::image type="content" source="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png" alt-text="Screenshot showing code snippet of the sample in the editor." lightbox="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png":::

Now the function is ready to tested or invoked from another application or Fabric item such as data pipelines. 

### Rename a function
1. Select into the code editor and update the name of the function. For example, rename `hello_fabric` to `hello_fabric1`. Here's an example:
   ```python
   @udf.function()
   def hello_fabric1(name: str) -> str:
      logging.info('Python UDF trigger function processed a request.')

      return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
   ```

2. For rename to take into effect you need to publish these changes. 
3. Once the changes are published, you can view the new name for the function in Functions explorer and your code. 

### Delete a function 
To delete a function, select function code in the code editor and remove the entire code section. Publish the changes to delete it entirely from the user data functions item. 

For example to remove `hello_fabric`, remove this code block and publish. 

```python
@udf.function()
def hello_fabric(name: str) -> str:
    logging.info('Python UDF trigger function processed a request.')

    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

## Test the function 
1. Select **Run** icon, next to `manipulate_data` function in the Functions explorer. 
    :::image type="content" source="..\media\user-data-functions-create-in-portal\test-data-function.png" alt-text="Screenshot showing how to test the data functions." lightbox="..\media\user-data-functions-create-in-portal\test-data-function.png":::

2. Pass the input as a list, for pandas sample in a JSON format.   
   ```json
   [
    {
     "Name": "John",
     "Age": 22,
     "Gender": "male"
    }
   ]
   ```
  
5. Select **Run** to test the function.
   :::image type="content" source="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png" alt-text="Screenshot showing the output when a function is successfully executed." lightbox="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png":::

6. You can see the live logs and the output for the function to validate if it ran successfully. 

## Next steps
- [Develop user data functions in VS Code](./create-user-data-functions-vs-code.md)
- [Learn about User data functions programming model](./python-programming-model.md)



