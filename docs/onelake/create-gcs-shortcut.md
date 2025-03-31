---
title: Create a Google Cloud Storage(GCS) shortcut
description: Learn how to create a OneLake shortcut for Google Cloud Storage (GCS) inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.author: trolson
author: TrevorLOlson
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 03/15/2024
#customer intent: As a data engineer, I want to learn how to create a shortcut for Google Cloud Storage (GCS) inside a Microsoft Fabric lakehouse so that I can easily access and manage my GCS data within the lakehouse environment.
---

# Create a Google Cloud Storage (GCS) shortcut

In this article, you learn how to create a Google Cloud Storage (GCS) shortcut inside a Fabric lakehouse.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

GCS shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts > Caching](onelake-shortcuts.md#caching).

## Prerequisites

- If you don't have a lakehouse, create one by following these steps: [Creating a lakehouse with OneLake](create-lakehouse-onelake.md).

- Ensure your chosen GCS bucket and user meet the [access and authorization requirements for GCS shortcuts](onelake-shortcuts.md#google-cloud-storage-shortcuts).

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot of right click context menu showing where to select New shortcut from the Lake view." lightbox="media\create-onelake-shortcut\new-shortcut-lake-view.png":::

[!INCLUDE [gcs-shortcut](../includes/gcs-shortcut.md)]

The lakehouse automatically refreshes. The shortcut appears in the left **Explorer** pane.

   :::image type="content" source="media\create-gcs-shortcut\table-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of tables that display the shortcut symbol." lightbox="media\create-gcs-shortcut\table-shortcut-symbol.png":::

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
