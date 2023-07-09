---
title: Create an ADLS shortcut
description: Learn how to create ADLS shortcuts.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom: build-2023
ms.date: 03/24/2023
---

# How-to: Create an ADLS Gen2 shortcut

In this how-to guide, you'll learn how to create an ADLS shortcut inside a Fabric Lakehouse. For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

[!INCLUDE [preview-note](../includes/preview-note.md)]

## Prerequisite

Create a lakehouse by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

## Create an ADLS shortcut

To create an Azure Data Lake Storage (ADLS) shortcut:

1. Open a lakehouse.

1. Right click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="The same screenshot displayed earlier showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

  [!INCLUDE [adls-gen2-shortcut](../includes/adls-gen2-shortcut.md)]

1. See the folder icon with shortcut symbol in the explorer.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol." lightbox="media\create-onelake-shortcut\folder-shortcut-symbol.png":::

## Next steps

* [How-to: Create a OneLake shortcut](create-onelake-shortcut.md)
* [How-to: Create an Amazon S3 shortcut](create-s3-shortcut.md)
