---
title: Create an Amazon S3 compatible shortcut
description: Learn how to create a OneLake shortcut that's Amazon S3 compatible for easy data access in a Fabric lakehouse.
ms.reviewer: eloldag
ms.author: mahi
author: Matt1883
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 07/24/2025
#customer intent: As a data engineer, I want to learn how to create an Amazon S3 compatible shortcut so that I can easily access data in my S3 bucket.
---

# Create an Amazon S3 compatible shortcut

In this article, you learn how to create an S3 compatible shortcut inside a Fabric lakehouse. For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md).

S3 compatible shortcuts can take advantage of file caching to reduce egress costs associated with cross-cloud data access. For more information, see [OneLake shortcuts Caching](onelake-shortcuts.md#caching). Currently only key or secret authentication is supported for S3-compatible sources. Entra-based OAuth, Service Principal, and RoleArn are not yet supported.

## Prerequisites

- If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).

- Ensure your chosen S3 compatible bucket and secret key credentials meet the [access and authorization requirements for S3 shortcuts](onelake-shortcuts.md#s3-shortcuts).

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media/create-onelake-shortcut/new-shortcut-lake-view.png" alt-text="Screenshot of right click context menu showing where to select New shortcut from the Lake view.":::

## Select a source

1. Under **External sources**, select **Amazon S3 compatible**.

   :::image type="content" source="media/create-s3-compatible-shortcut/s3-compatible-shortcut-card.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Amazon S3 Compatible is highlighted." lightbox="media/create-s3-compatible-shortcut/s3-compatible-shortcut-card.png":::

1. Enter the **Connection settings** according to the following table:

   :::image type="content" source="media/create-s3-compatible-shortcut/s3-compatible-shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials." lightbox="media/create-s3-compatible-shortcut/s3-compatible-shortcut-details.png":::

   |Field | Description| Value|
   |-----|-----| -----|
   | **URL**| The connection string for your S3 compatible endpoint. For this shortcut type, you must provide a non-bucket specific URL. This URL must allow path style bucket addressing, not just virtual hosted style. | `https://s3.contoso.com` |
   |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection* |
   |**Connection name** | The S3 compatible connection name.| A name for your connection.|
   |**Access Key ID**| The access key ID to be used when accessing the S3 compatible endpoint. | Your access key.|
   |**Secret Access Key**| The secret key associated with the access key ID. | Your secret key.|

1. Select **Next**.

1. Enter a name for your shortcut.

   Optionally, you can enter a sub path to select a specific folder in your S3 bucket.

   > [!NOTE]
   > Shortcut paths are case sensitive.

1. Select **Create**.

The lakehouse automatically refreshes. The shortcut appears under **Files** in the **Explorer** pane.

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Create an Azure Data Lake Storage Gen2 shortcut](create-adls-shortcut.md)
