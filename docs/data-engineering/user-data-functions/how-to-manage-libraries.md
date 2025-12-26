---
title: How to manage libraries for your Fabric User Data Functions
description: Manage adding, deleting, and updating libraries with User data functions in Fabric.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: how-to
ms.date: 04/21/2025
ms.search.form: Fabric User Data Functions
---

# Manage your libraries for your Fabric user data functions

When developing custom business logic, you can use public libraries from PyPI or incorporate your own private libraries for data processing or transformation. User data functions enable the addition of two types of libraries necessary for writing functions:
- Public libraries: Include any public library available on PyPI in the user data functions item.
- Private libraries: Upload your private libraries as a `.whl` package to the user data functions item.

## Add a public library 

1. Sign in to [Microsoft Fabric ](https://app.fabric.microsoft.com).

2. Select the **User data function** item you're working on. 

3. Select **Library Management**.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::

   >[!NOTE]
   > `fabric_user_data_functions` library is added and can't be removed. This is fabric functions library. You can update the version if there are future releases of this SDK. 

4. Select **Add from PyPI** to add new library. Provide the library name and select a version, for example `pandas` with version `2.2.3`.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

6. Once a library is added to the User data functions item, it is in **Saved** state. The User data functions item needs to be published. All published libraries have **Published** state.

7. Select **Add from PyPI** to add more libraries to use with one or more functions in the user data function item.

8. Select **Publish** to update the changes made to the User data function. Now the function is ready to be tested.

## Manage public libraries
- To update the version of an existing public library, navigate to your user data functions item and select **Library management**. Choose the required library, select the version drop-down, and update its version.
- To delete the library, select the trash option for each library appears when you hover over the corresponding row.

Publish the user data functions item whenever libraries are updated. 

## Add a private library 
Private libraries refer to code built by you or your organization. User data functions allows you to upload a custom library file in `.whl` format. Select the **Upload** button to add private libraries. 

:::image type="content" source="..\media\user-data-functions-manage-libraries\add-private-library.png" alt-text="Screenshot showing how to add-private-library." lightbox="..\media\user-data-functions-manage-libraries\add-private-library.png":::

### Limitations of private libraries 
- The `.whl` file size must be less than 30MB.
- The `.whl` file must be OS agnostic. If the file is specific to an operating system for example `numpy-2.2.2-cp311-cp311-linux_armv6l.whl`, it will fail to upload. 

## Next steps
Learn how to reference these libraries in your function's code. You can also learn how to view your logs after running a Fabric Data Function.

- [Python programming model](./python-programming-model.md)
- [Develop User data functions in VS Code](./create-user-data-functions-vs-code.md)
