---
title: Manage the Resources in a Fabric environment
description: The Resources section in a Fabric environment enables small resources management. Learn how to use the resources folder in the development lifecycle.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 05/01/2024
ms.search.form: Manage the resources in Fabric environment
---

# Manage the resources in a Fabric environment

Resources in a Microsoft Fabric environment provide a file system that you can use to manage your files and folders. You can easily access the environment resources from notebooks and collaborate with others if the notebooks are attached to the same environment.

:::image type="content" source="media\environment-resources\environment-resources-overview.gif" alt-text="Screen recording of the environment Resources section.":::

## Interact with resources in a notebook

When the notebook is attached to an environment, you can easily find the environment **Resources** folders that appear in Explorer. You can do common operations like uploading, downloading, renaming, deleting, and moving files. You can also create, delete, and rename folders from both the environment and the notebook UI.

If you drag and drop the file with supported type from the environment **Resources** folders to a notebook code cell, a code snippet is automatically generated to help you access the file. To learn more, see [Notebook code snippets](author-execute-notebook.md#code-snippets).

> [!NOTE]
> The resource storage has a maximum file size limit of 500 MB. Individual files are restricted to 50 MB, with a total limit of 100 files and folders combined.

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
