---
title: Quickstart - Create a Fabric User data functions item
description: Learn how to create a Fabric User data functions item in the portal.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: quickstart
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Create Fabric User data functions
---

# Create a Fabric User data functions item

User Data Functions enable you to create reusable Python functions that can be invoked across Microsoft Fabric and from external applications. By centralizing your business logic in functions, you can maintain consistency, reduce code duplication, and streamline data transformation workflows throughout your organization.

With User Data Functions, you can:
- **Centralize business logic** - Write functions once and invoke them from Pipelines, Notebooks, Activator rules, and Power BI
- **Integrate seamlessly** - Call functions via REST endpoints from any application or service
- **Accelerate development** - Use pre-built sample functions or create custom functions with the Python programming model
- **Maintain consistency** - Ensure data transformations and business rules are applied uniformly across all workloads

This quickstart shows you how to create your first User Data Functions item, add functions from the sample library, write custom functions, and run them in the Fabric portal. By the end, you have a working function that demonstrates category standardization for product data.

## What you accomplish

In this quickstart, you complete the following tasks:

1. Create a User Data Functions item in your workspace
1. Add and configure required Python libraries (like pandas)
1. Insert a function from the sample library
1. Write a custom function with proper syntax and decorators
1. Test and publish your functions
1. Run functions in the portal and view results

## Prerequisites

- A [Microsoft Fabric capacity](../../enterprise/licenses.md) in one of [the supported regions](../../admin/region-availability.md). If you don't have a Fabric capacity, start a [free Fabric trial](../../get-started/fabric-trial.md).
- A [Fabric workspace](../../get-started/create-workspaces.md) assigned to that capacity

## Create a new user data functions item

1. In your workspace, select **+ New item**.

1. Search for and select the **User data functions** tile. 

   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-user-data-functions.png" alt-text="Screenshot showing user data functions tile in the new item pane." lightbox="..\media\user-data-functions-create-in-portal\select-user-data-functions.png":::

1. Enter a **Name** for the user data functions item and select **Create**.

1. Select the **New function** file to create a new sample function. The ``hello_fabric`` Python function is published and loaded in the code editor.

1. The Functions explorer shows all the functions that are published and ready to be invoked. Since the `hello_fabric` function is published, you can run it from the list of functions in the Functions explorer.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\hello-fabric-template.png" alt-text="Screenshot showing the code for hello-fabric function." lightbox="..\media\user-data-functions-create-in-portal\hello-fabric-template.png":::


## Add a new function from sample 

This example shows how to add a new function from the **Insert sample** menu. In this case, we add a function called **Manipulate data with pandas library** that uses the `pandas` library as a requirement.

### Add required libraries

1. Make sure you are in **Develop** mode. 

   :::image type="content" source="..\media\user-data-functions-create-in-portal\select-mode-develop.png" alt-text="Screenshot showing the menu to select develop mode." lightbox="..\media\user-data-functions-create-in-portal\select-mode-develop.png":::

1. Select **Library management** to add the libraries that your function requires. 

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::
   
1. Select **+Add from PyPI** to add a new library from the public PyPI repository.

1. Search for and select the **pandas** library and select the version. Once the library is added, it's automatically saved in your User Data Functions item. 

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

1. Optionally, you can update the version of the `fabric_user_data_functions` library to the latest available version. Select the pencil icon next to the library to update it.
   
   >[!NOTE]
   > The `fabric_user_data_functions` library is included by default and can't be removed. This library is required for the functionality of User data functions. You need to update the version of this library for any future releases of this SDK.

1. Close the **Library management** pane to return to the User Data Functions home page.

### Insert the sample function

1. Select the **Edit** tab to open more editing options in the ribbon menu.

1. Select **Insert sample** > **Data Manipulation** > **Manipulate data with pandas library**. This action adds a new function that uses the `pandas` library to manipulate data.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png" alt-text="Screenshot showing how to insert a sample that uses pandas library." lightbox="..\media\user-data-functions-create-in-portal\insert-sample-using-pandas.png":::

1. After the sample is inserted into the editor, you'll see the new function appear in the **Functions explorer** with a circle icon next to it. This icon indicates that the function changed since it was last published, meaning there are updates that need to be published.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png" alt-text="Screenshot showing the sample added to the function editor." lightbox="..\media\user-data-functions-create-in-portal\sample-added-to-function-editor.png":::

## Write a custom function

Now that you added a function from the sample library, you can write your own custom function directly in the code editor. This section shows you the syntax and structure required for creating functions from scratch.

Every runnable function requires the `@udf.function()` decorator before the function definition. This decorator marks your Python function as executable within the User Data Functions framework. The basic syntax is:

```python
@udf.function()
def your_function_name(parameter: type) -> return_type:
    # Your function logic here
    return result
```

> [!IMPORTANT]
> Parameter names must use camelCase (for example, `productName` instead of `product_name`) and all parameters are required. For complete syntax requirements and limitations, see [Syntax requirements and limitations](./python-programming-model.md#syntax-requirements-and-limitations).

Here's a complete example that standardizes product categories from raw sales data:

```python
# This function standardizes inconsistent product category names from different data sources

@udf.function()
def standardize_category(productName: str, rawCategory: str) -> dict:
    # Define category mappings for common variations
    category_mapping = {
        "electronics": ["electronic", "electronics", "tech", "devices"],
        "clothing": ["clothes", "clothing", "apparel", "fashion"],
        "home_goods": ["home", "household", "home goods", "furniture"],
        "food": ["food", "grocery", "groceries", "snacks"],
        "books": ["book", "books", "reading", "literature"]
    }
    
    # Normalize the input
    raw_lower = rawCategory.lower().strip()
    
    # Find the standardized category
    standardized = "other"
    for standard_name, variations in category_mapping.items():
        if raw_lower in variations:
            standardized = standard_name
            break
    
    return {
        "product_name": productName,
        "original_category": rawCategory,
        "standardized_category": standardized,
        "needs_review": standardized == "other"
    }
```

You can add this function to your code editor alongside the existing functions. The function appears in the **Functions explorer** with a circle icon, indicating it needs to be published. 

### Programming model key concepts 

Your User Data Functions use the [User Data Functions Python Programming model](./python-programming-model.md) to create, run, debug, and modify individual functions. The programming model is provided by the `fabric-user-data-functions` package, which is [publicly available on PyPI](https://pypi.org/project/fabric-user-data-functions/) and pre-installed in your user data functions items.

When you create your first function, the code file includes the required import statements:

```python
import datetime
import fabric.functions as fn
import logging

udf = fn.UserDataFunctions()
```

Key points about the programming model:

- The `fabric-user-data-functions` package provides the `fabric.functions` module, which you import as `fn` in your code.
- The `fn.UserDataFunctions()` call creates the execution context required for defining and running functions within a User Data Functions item.
- Other libraries like `logging` enable you to write custom logs for debugging and monitoring.

>[!NOTE]
> The `import fabric.functions as fn` statement and the `udf = fn.UserDataFunctions()` line are required for your functions to work properly. Your **functions will not work** if these lines are missing. 

## Test and publish your functions

Now that you created multiple functions (the sample `manipulate_data` function and your custom `standardize_category` function), you can test and publish them together.

1. While in **Develop** mode, you can test each function using the [Test capability](./test-user-data-functions.md) before publishing. Testing allows you to validate your code changes without making them available for external invocation.

1. When you're ready to make your functions available, select **Publish** to save your changes and update all your functions. Publishing might take a few minutes.

1. After publishing completes, all functions are refreshed in the **Functions explorer** list and the circle icons are removed. Your functions are now ready to be:
   - Run from the portal in **Run only** mode
   - Invoked from another Fabric item, such as a pipeline, notebook, or Activator rule
   - Called from an external application via the REST endpoint

## Run your functions

With all your functions created, tested, and published, you can now switch to **Run only** mode to execute them and see the results.

1. Select **Run only mode** from the mode selector in the top-right corner of the portal.
   
   :::image type="content" source="..\media\user-data-functions-create-in-portal\switch-mode-run-mode.gif" alt-text="Animated screenshot showing how to switch to Run only mode." lightbox="..\media\user-data-functions-create-in-portal\switch-mode-run-mode.gif":::

1. Select the **Run** icon that shows up when you hover over a function in the Functions explorer list.

    :::image type="content" source="..\media\user-data-functions-create-in-portal\test-data-function.png" alt-text="Screenshot showing how to run the functions." lightbox="..\media\user-data-functions-create-in-portal\test-data-function.png":::

### Run the sample function

1. In the **Functions explorer**, hover over the `manipulate_data` function.

1. Select the **Run** button that appears when you hover over the function.

1. A run pane opens on the right side of the screen.

1. In the run pane, you see the parameter name **data** with type `list`. Enter the following JSON value in the text box:
   ```json
   [
    {
     "Name": "John",
     "Age": 22,
     "Gender": "male"
    }
   ]
   ```

1. Select the **Run** button in the run pane (located next to where you entered the JSON data) to execute the function.

   :::image type="content" source="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png" alt-text="Screenshot showing the output when a function is successfully executed." lightbox="..\media\user-data-functions-create-in-portal\data-function-successfully-executed.png":::

1. View the results and logs under **Output (list)** in the run pane. The output shows the manipulated data as a pandas DataFrame in JSON format. 

### Run the custom function

Now try running your custom `standardize_category` function.

1. In the **Functions explorer**, hover over the `standardize_category` function.

1. Select the **Run** button that appears when you hover over the function.

1. A run pane opens on the right side of the screen.

1. Provide test parameters:
   - **productName**: `Laptop Computer`
   - **rawCategory**: `tech`

1. Select **Run** and observe the output, which should show the standardized category as "electronics" and include the metadata about the categorization.

## Manage functions

After creating and running your functions, you can rename or delete them as needed. All management operations require you to be in **Develop** mode.

### Rename a function

1. In **Develop mode**, select into the code editor and update the name of the function. For example, rename `hello_fabric` to `hello_fabric1`:

   ```python
   @udf.function()
   def hello_fabric1(name: str) -> str:
      logging.info('Python UDF trigger function processed a request.')

      return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
   ```

1. After changing the name, select **Publish** to save these changes.

1. Once the changes are published, you see the new name for the function in the **Functions explorer**.

### Delete a function

To delete a function, select the function code in the code editor and remove the entire code section. Publish the changes to delete it entirely from the user data functions item.

For example, to delete the `hello_fabric` function, remove the following code block:

```python
@udf.function()
def hello_fabric(name: str) -> str:
    logging.info('Python UDF trigger function processed a request.')

    return f"Welcome to Fabric Functions, {name}, at {datetime.datetime.now()}!"
```

After the code is removed, you can select **Publish** to save your changes. Once the publish completes, you see an updated list of available functions in the Functions explorer.

## Troubleshooting

If you encounter issues while working with User Data Functions:

- **Function won't publish** - Check for syntax errors in your code. Ensure all required imports (`fabric.functions`) and the `udf = fn.UserDataFunctions()` line are present.
- **Parameter naming errors** - Remember that parameter names must use camelCase (no underscores). Review the [syntax requirements and limitations](./python-programming-model.md#syntax-requirements-and-limitations).
- **Library import errors** - Verify that all required libraries are added via Library Management and that the version is compatible with Python 3.11.
- **Function not appearing in Functions explorer** - Make sure you published your changes after adding or modifying functions.

For more help, see [User Data Functions service limits and considerations](./user-data-functions-service-limits.md).

## Related content

Now that you created your first User Data Functions item, explore these resources to expand your skills:

- [Create a Fabric User data functions item in Visual Studio Code](./create-user-data-functions-vs-code.md) - Learn to develop functions locally with full IDE support
- [Learn about the User data functions programming model](./python-programming-model.md) - Dive deeper into the Python SDK and advanced features
- [Invoke User Data Functions from a Python application](./tutorial-invoke-from-python-app.md) - Call your functions from external applications via REST APIs
- [Manage libraries for User Data Functions](./how-to-manage-libraries.md) - Learn advanced library management techniques
