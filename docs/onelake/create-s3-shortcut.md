---
title: Create an S3 shortcut
description: Learn how to create S3 shortcuts.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom: build-2023
ms.date: 03/24/2023
---

# How-to: Create an Amazon S3 shortcut

In this how-to guide, you'll learn how to create an S3 shortcut inside a Fabric Lakehouse. For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisite

Create a lakehouse by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## Create an S3 Shortcut

To create and Amazon S3 Shortcut:

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot of right click context menu showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

1. Select **Amazon S3** tile.

    :::image type="content" source="media\create-onelake-shortcut\new-shortcut-tile-options-v2.png" alt-text="Screenshot of New Shortcuts dialog showing selection tiles for shortcut types." lightbox="media\create-onelake-shortcut\new-shortcut-tile-options.png":::

1. Specify the connection details this shortcut will use.

   1. Proved the endpoint for your S3 account (URL).
      > [!NOTE]
      > URL must be in the following format `https://bucketname.s3.region.amazonaws.com/`

   1. If you have already defined a connection for this storage location, it automatically appears in the connection drop-down. Otherwise, you can choose **Create new connection**.

   1. Enter a **Connection name**.

   1. Provide the **Username**(Key) **Password**(Secret) for your IAM user.

   1. Select **Next**.

   :::image type="content" source="media\create-onelake-shortcut\connection-details-s3.png" alt-text="Screenshot showing where to enter the Connection settings for a new S3 shortcut." lightbox="media\create-onelake-shortcut\connection-details.png":::

1. Specify the shortcut details.

   1. Provide a name for the shortcut.

   1. Provide a path for the shortcut (**Sub Path**). Enter a relative path that starts after the bucket name.

      > [!NOTE]
      > Shortcut paths are case sensitive.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-details-s3.png" alt-text="Screenshot showing where to enter new shortcut details for S3 shortcut." lightbox="media\create-onelake-shortcut\new-shortcut-details.png":::

1. Select **Create**.

1. See the folder icon with shortcut symbol in the explorer.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol." lightbox="media\create-onelake-shortcut\folder-shortcut-symbol.png":::

## Next steps

- [How-to: Create a OneLake shortcut](create-onelake-shortcut.md)
- [How-to: Create an ADLS Gen2 shortcut](create-adls-shortcut.md)
