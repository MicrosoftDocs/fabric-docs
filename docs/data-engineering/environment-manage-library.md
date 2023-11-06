---
title: Library management in Environment
description: Learn how to include public and custom libraries in the Environment.
ms.author: shuaijunye
author: shuaijunye
ms.topic: how-to
ms.date: 11/01/2023
ms.search.for: Manage libraries in Environment
---

# Library management in Fabric Environment

Libraries provide reusable code that developers want to include. Except for the built-in libraries coming with each Spark runtime, users can also install **public library** and **custom library** in Fabric Environment.

## Public library

Public libraries are sourced from repositories such as PyPI and Conda, which are currently supported.
:::image type="content" source="media\environment-lm\env-library-management-public-library.png" alt-text="Screenshot of Environment LM - public library.":::

### Add new public library

To add a new public library, you can do so one by one by selecting a different source and specifying the name and version of the library. Alternatively, you can upload a Conda environment specification *.yml* file to specify the public libraries. The content of the uploaded *.yml* file is extracted and appended to the list.

> [!NOTE]
> Please note that the auto-completion feature for library names during adding is limited to only the most popular libraries. If the library you want to install is not among them, you don't receive an auto-completion prompt. In such cases, you can still search for the library directly in PyPI or Conda by entering its full name. If the library is valid, you are able to see the available versions. However, if the library is invalid, you will receive a warning that says "The library doesn't exist."

### Filter public libraries

By entering keywords in the search box on the public library page, you can filter the public libraries that contain those keywords.

### Delete public libraries

The trash button for each library appears when you hover your mouse over the corresponding row. Alternatively, you can delete multiple or all public libraries by selecting them and clicking the delete button in the ribbon.

### View dependency

Each public library has various dependencies. The view dependency button appears when you hover your mouse over the corresponding row.

### Export to yaml

You can export the full public library list to a YAML file and download it to your local directory.

## Custom library

Custom libraries refer to code built by you or your organization, and are supported in the *.whl*, *.jar*, and *.tar.gz* formats.

> [!NOTE]
> *.tar.gz* files are only supported for R language
> Use the *.whl* format for Python language

:::image type="content" source="media\environment-lm\env-library-management-custom-library.png" alt-text="Screenshot of Environment LM - custom library.":::

### Upload the custom library

You can upload your custom codes from your local directory to the Fabric Environment.

### Delete the custom library

The trash button for each library appears when you hover your mouse over the corresponding row. Alternatively, you can delete multiple or all custom libraries by selecting them and clicking the delete button in the ribbon.

### Download all custom libraries

If clicked, custom libraries start to downloaded one by one to your local default downloading directory.

## Next steps

- [Learn how to save and publish the changes in Fabric Environment.](create-and-use-environment.md#save-and-publish-the-changes).
- [Best practices of library management on Fabric](library-management.md)
