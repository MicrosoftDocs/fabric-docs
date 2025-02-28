---
title: How to manage libraries for your Fabric User Data Functions
description: Manage adding, deleting and updating version of public libraries from PyPI to use with User data functions in Fabric.
ms.author: sumuth
author: mksuni
ms.topic: how-to
ms.date: 02/20/2025
ms.search.form: Fabric User Data Functions
---

# Manage your libraries for your Fabric User Data Functions (Preview)

When writing custom business logic, you want to use public libraries available on PyPI for processing or transforming data. In this article, you learn how to add a library from PyPI for a User data functions item. 

## Add a new library

1. Sign in to [Microsoft Fabric ](https://app.fabric.microsoft.com)

2. Select the **User data function** item you are working on. 

3. Select **Library Management**

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select_library_management.png" alt-text="Screenshot showing how to manage libraries" lightbox="..\media\user-data-functions-manage-libraries\select_library_management.png":::

   >[!NOTE]
   > `fabric_user_data_functions` library is added and can't be removed. It's required for the user data functions item. You can update the version if there are future releases of this SDK. 

4. Select **Add from PyPI** to add new library. Provide the library name and select a version, for example `pandas` with version `2.2.3`.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add_pandas_library.png" alt-text="Screenshot showing how to add pandas library" lightbox="..\media\user-data-functions-manage-libraries\add_pandas_library.png":::

6. Once a library is added to the User data functions item, it is in **Saved** state. The User data functions item needs to be published. All published libraries have **Published** state.

7. Select **Add from PyPI** to add more libraries to use with one or more functions in the user data function item.

8. Select **Publish** to update the changes made to the User data function. Now the function is ready to be tested.

## Manage library updates
1. Select the Edit icon to edit the version of the library version.
2. Select the Delete icon to delete the library. 
 
## Next steps
Now that you have added a new library, learn how to reference it in your Fabric function code. You can also learn how to view your logs after running a Fabric Data Function.

- [Python programming mode](./python-programming-model.md)
- [Develop User data functions in VS Code](./create-user-data-functions-in-vs-code.md)