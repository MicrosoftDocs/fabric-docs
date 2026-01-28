---
title: How to manage libraries for your Fabric User Data Functions
description: Manage adding, deleting, and updating libraries with User data functions in Fabric.
ms.author: eur
ms.reviewer: sumuth
author: eric-urban
ms.topic: how-to
ms.custom: freshness-kr
ms.date: 01/21/2026
ms.search.form: Fabric User Data Functions
---

# Manage libraries for user data functions

When developing custom business logic, you can use public libraries from PyPI or incorporate your own private libraries for data processing or transformation.

This article shows you how to add, update, and remove libraries for your user data functions.

User data functions support two types of libraries:

- **Public libraries**: Any public library available on [PyPI](https://pypi.org/).
- **Private libraries**: Your own custom libraries uploaded as `.whl` packages.

## Add a public library

To add a public library from PyPI:

1. Sign in to [Microsoft Fabric](https://app.fabric.microsoft.com).

1. Open the user data functions item you want to update.

1. Select **Library Management** from the toolbar.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\select-library-management.png" alt-text="Screenshot showing how to manage libraries." lightbox="..\media\user-data-functions-manage-libraries\select-library-management.png":::

   > [!NOTE]
   > The `fabric_user_data_functions` library is included by default and can't be removed. This is the Fabric user data functions SDK. You can update the version when new releases are available.

1. Select **Add from PyPI**. Enter the library name and select a version. For example, enter `pandas` and select version `2.3.3`.

   :::image type="content" source="..\media\user-data-functions-manage-libraries\add-pandas-library.png" alt-text="Screenshot showing how to add pandas library." lightbox="..\media\user-data-functions-manage-libraries\add-pandas-library.png":::

1. Repeat the previous step to add more libraries as needed.

1. Select **Publish** to apply your library changes. The library status changes from **Saved** to **Published** after publishing completes.

## Update or remove a public library

To update a library version:

1. Open your user data functions item and select **Library Management**.
1. Find the library you want to update and select the version dropdown.
1. Select a different version.
1. Select **Publish** to apply your changes.

To remove a library:

1. Open your user data functions item and select **Library Management**.
1. Hover over the library row and select the trash icon.
1. Select **Publish** to apply your changes. 

## Add a private library

Private libraries are custom code packages built by you or your organization. You can upload private libraries in `.whl` (Python wheel) format.

To add a private library:

1. Open your user data functions item and select **Library Management**.
1. Select **Upload**.

    :::image type="content" source="..\media\user-data-functions-manage-libraries\add-private-library.png" alt-text="Screenshot showing how to add a private library." lightbox="..\media\user-data-functions-manage-libraries\add-private-library.png":::

1. Browse to and select your `.whl` file.
1. Select **Publish** to apply your changes.

### Private library requirements

- The `.whl` file size must be less than 30 MB.
- The `.whl` file must be platform-independent (OS agnostic). Platform-specific wheels like `numpy-2.2.2-cp311-cp311-linux_armv6l.whl` aren't supported. 

## Related content

- [User data functions Python programming model](./python-programming-model.md)
- [Develop user data functions in VS Code](./create-user-data-functions-vs-code.md)
- [User data functions service limits](./user-data-functions-service-limits.md)
