---
title: Create an Azure Blob Storage shortcut
description: Learn how to create a OneLake shortcut for Azure Blob Storage inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.author: kgremban
author: kgremban
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 05/16/2025
#customer intent: As a data engineer, I want to learn how to create an Azure Blob Storage shortcut inside a Microsoft Fabric lakehouse so that I can efficiently manage and access my data.
---

# Create an Azure Blob Storage shortcut (preview)

In this article, you learn how to create an Azure Blob Storage shortcut inside a Microsoft Fabric lakehouse.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

>[!NOTE]
>Azure Blob Storage shortcuts are currently in public preview.

## Prerequisites

- A lakehouse in Microsoft Fabric. If you don't have a lakehouse, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).
- An Azure Storage account with data in a container.

## Create a shortcut

1. Open a lakehouse in Fabric.

1. Right-click on a directory in the **Explorer** pane of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="Screenshot that shows selecting 'new shortcut' from a directory menu.":::

## Select a source

When you create a shortcut in a lakehouse, the **New shortcut** window opens to walk you through the configuration details.

1. On the **New shortcut** window, under **External sources**, select **Azure Blob Storage (preview)**.

1. Select **Existing connection** or **Create new connection**, depending on whether this Storage account is already connected in your OneLake.

   * For an **Existing connection**, select the connection from the drop-down menu.

   * To **Create new connection**, provide the following connection settings.

     :::image type="content" source="./media/create-blob-shortcut/create-new-connection.png" alt-text="Screenshot of the New shortcut window showing the connection settings and connection credentials.":::

     |Field | Description|
     |-----|-----|
     | **Account name or URL**| The name of your blob storage account. |
     |**Connection** | The default value, **Create new connection**. |
     |**Connection name** | A name for your Azure Blob Storage connection. The service generates a suggested connection name based on the storage account name, but you can overwrite with a preferred name. |
     |**Authentication kind**| Select the authorization model from the drop-down menu that you want to use to connect to the Storage account. The supported models are: account key, organizational account, Shared Access Signature (SAS), service principal, and workspace identity. Once you select a model, fill in the required credentials. For more information, see [Azure Blob Storage shortcuts authorization](./onelake-shortcuts.md#azure-blob-storage-shortcuts). |

1. Select **Next**.

1. Browse to the target location for the shortcut.

   If you provided the storage account name in the connection details, all of your available containers appear in the navigation view. If you specified a container in connection URL, only the specified container and its contents appear in the navigation view.

   Navigate the storage account by selecting a folder or expanding a folder to view its child items.

   Choose one or more target locations by selecting the checkbox next a folder in the navigation view. Then, select **Next**.

   :::image type="content" source="./media/create-blob-shortcut/select-target.png" alt-text="Screenshot that shows selecting the target locations for a new shortcut.":::

1. On the review page, verify your selections. Here you can see each shortcut to be created. In the **Actions** column, you can select the pencil icon to edit the shortcut name. You can select the trash can icon to delete the shortcut.

1. Select **Create**.

1. The lakehouse automatically refreshes. The shortcut or shortcuts appear in the **Explorer** pane.

   :::image type="content" source="./media/create-blob-shortcut/view-shortcuts.png" alt-text="Screenshot showing the lakehouse explorer view with a list of folders that display the shortcut symbol.":::

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Create an Amazon S3 shortcut](create-s3-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
