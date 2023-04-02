---
title: Create a shortcut
description: Learn how to create two types of shortcuts, a OneLake shortcut and an Azure Data Lake Storage (ADLS) shortcut.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.topic: how-to
ms.date: 03/24/2023
---

# Create a shortcut

[!INCLUDE [preview-note](../includes/preview-note.md)]
For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

Prerequisite: Create a lakehouse by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## How to create a OneLake shortcut

To create a OneLake shortcut:

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

1. Select the **Microsoft OneLake** tile.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-tile-options.png" alt-text="Screenshot of the tile options in the New shortcut screen." lightbox="media\create-onelake-shortcut\new-shortcut-tile-options.png":::

1. Choose a lakehouse for the shortcut to point to and then select **Next**.

   :::image type="content" source="media\create-onelake-shortcut\select-data-source.png" alt-text="Screenshot of the Select a data source type screen." lightbox="media\create-onelake-shortcut\select-data-source.png":::

1. Select a folder, then select **Create**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-create-button.png" alt-text="Screenshot showing where to select the Create button in the New shortcut screen." lightbox="media\create-onelake-shortcut\new-shortcut-create-button.png":::

## How to create an ADLS shortcut

To create an Azure Data Lake Storage (ADLS) shortcut:

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="The same screenshot displayed earlier showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

1. Select the **ADLS Gen 2** tile.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-tile-options.png" alt-text="The same screenshot shown previously of the tile options in the New shortcut screen." lightbox="media\create-onelake-shortcut\new-shortcut-tile-options.png":::

1. Specify the connection details this shortcut will use.

   1. Provide the endpoint for your ADLS account (URL).

      > [!NOTE]
      > This must be the DFS endpoint for the storage account.

   1. If you've already defined a connection for this storage location, it automatically appears in the connection drop-down. Otherwise, you can choose **Create new connection**.

   1. Enter a **Connection name**.

   1. Select the **Authentication kind** you want to use for the connection.

   1. If you chose **Organizational account**, select the **Sign** **in** button.

   1. Select **Next**.

   :::image type="content" source="media\create-onelake-shortcut\connection-details.png" alt-text="Screenshot showing where to enter the Connection settings for a new shortcut." lightbox="media\create-onelake-shortcut\connection-details.png":::

1. Specify the shortcut details.

   1. Provide a name for the shortcut.

   1. Provide a path for the shortcut (**Sub Path**). Enter a relative path that starts with a container for the storage account.

      > [!NOTE]
      > Shortcut paths are case sensitive.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-details.png" alt-text="Screenshot showing where to enter new shortcut details." lightbox="media\create-onelake-shortcut\new-shortcut-details.png":::

1. Select **Create**.

1. See the folder icon with shortcut symbol in the **Lake view** of the explorer.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol." lightbox="media\create-onelake-shortcut\folder-shortcut-symbol.png":::

## Next steps

- [Access OneLake shortcuts](access-onelake-shortcuts.md)
