---
title: Create and manage a OneLake shortcut
description: Learn how to create, edit, or delete a OneLake shortcut inside a Fabric lakehouse using a lakehouse, data warehouse, or Kusto Query Language database as the source.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 03/20/2025
#customer intent: As a data engineer, I want to learn how to create a OneLake shortcut inside a Fabric lakehouse using different data sources so that I can efficiently access and manage data within the lakehouse.
---

# Create a OneLake shortcut

In this article, you learn how to create a OneLake shortcut inside a Fabric lakehouse. You can use a lakehouse, a data warehouse, or a Kusto Query Language (KQL) database as the source for your shortcut.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts/create-shortcut?tabs=HTTP).

## Prerequisite

A lakehouse in OneLake. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Explorer** pane of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view.":::

[!INCLUDE [onelake-shortcut](../includes/onelake-shortcut.md)]

The lakehouse automatically refreshes. The shortcut appears under the selected directory in the **Explorer** pane. You can differentiate a regular file or table from the shortcut from its properties. The properties have a **Shortcut Type** parameter that indicates the item is a shortcut.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol.":::

## Edit a shortcut

Editing shortcuts requires write permission on the item being edited. The admin, member, and contributor roles grant write permissions.

1. To edit a shortcut, right-click on the shortcut and select **Manage shortcut**.

1. In the **Manage shortcut** view, you can edit the following fields:

   * **Name**

   * **Target connection**

     Not all shortcut types use the target connection feature.

   * **Target location** and **Target subpath**

     Both of these fields are editable by selecting the **Target location**.

   * **Shortcut location**

   :::image type="content" source="media/create-onelake-shortcut/manage-shortcut.png" alt-text="Screenshot that shows the Manage shortcut view.":::

You can also edit shortcuts by using the [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts).

## Remove a shortcut

To delete a shortcut, select the **...** icon next to the shortcut file or table and select **Delete**. To delete shortcuts programmatically, see [OneLake shortcuts REST APIs](/rest/api/fabric/core/onelake-shortcuts/delete-shortcut?tabs=HTTP).

## Related content

- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
- [Create an Amazon S3 shortcut](create-s3-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
