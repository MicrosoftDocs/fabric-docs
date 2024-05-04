---
title: Manage the resources in Fabric environment
description: The Resources section in Fabric environment enable small resources management. Learn how to use the resources folder in the development lifecycle.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 05/01/2024
ms.search.for: Manage the resources in Fabric environment
---

# Manage the resources in Fabric environment

**Resources** in Fabric environment provides a file system that enables you manage your files and folders. You can easily access the environment Resources from notebook and collaborate with others if the notebooks attach to the same environment.

:::image type="content" source="media\environment-resources\environment-resources-overview.gif" alt-text="Screen recording of the environment Resources section.":::

## Interact with Resources in notebook

When the notebook attach to an environment, you can easily find the environment resources folder appear in the explorer. Common operations like upload/download/rename/delete/move files and create/delete/rename folders can be done in both environment and notebook UIs.

If you drag-and-drop the file with supported type from environment Resources folders to a notebook code cell, a code snippet is automatically generated to help you access the file. Learn more on [Notebook code snippets](author-execute-notebook.md#code-snippets).

> [!NOTE]
> The Resource storage has a maximum file size limit of 500MB, with individual files restricted to 50MB. Additionally, the total number of files and folders should not exceed 100.

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
- [Develop, execute, and manage Microsoft Fabric notebooks](author-execute-notebook.md)
