---
title: Integrate OneLake with Azure Storage Explorer
description: Learn more about Microsoft Fabric integration with Azure Storage Explorer. Connect, browse and download existing data, add new tables or files, and move them from one location to another.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Integrate OneLake with Azure Storage Explorer

This article demonstrates OneLake integration with Azure Storage Explorer. Azure Storage Explorer allows you to view and manage your cloud storage account’s contents. You can upload, download, or move files from one location to another.

## Connect and use Azure Storage Explorer

1. Install the latest version of Azure Storage Explorer from the [product webpage](https://azure.microsoft.com/features/storage-explorer/).

1. Check to ensure the version installed is 1.29.0 or higher. (Check the version by selecting **Help** > **About**.)

1. Select the **Open connect dialog** icon.

   :::image type="content" source="media\onelake-azure-storage-explorer\open-connect-dialog.png" alt-text="Screenshot showing where to select the Open connect dialog icon." lightbox="media\onelake-azure-storage-explorer\open-connect-dialog.png":::

1. Azure Storage Explorer requires you to sign in to connect to Azure resources. Select **Subscription** and follow the instructions to sign in.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-resource-subscription.png" alt-text="Screenshot showing where to select Subscription on the Select resource screen." lightbox="media\onelake-azure-storage-explorer\select-resource-subscription.png":::

1. Connect to OneLake by selecting the **Open connect dialog** icon again and select **ADLS Gen2 container or directory**.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-container-directory.png" alt-text="Screenshot showing where to select the Azure Data Lake Storage (ADLS) Gen2 container or directory option." lightbox="media\onelake-azure-storage-explorer\select-container-directory.png":::

1. Enter URL details of the workspace or item you would like to connect to, in this format: `https://onelake.dfs.fabric.microsoft.com/{workspace-Name}/{itemName.itemType}/`. You can find the workspace name and item name in the **Properties** pane of a file in the Microsoft Fabric portal.

   You can choose a **Display name** for convenience, then select **Next**.

   :::image type="content" source="media\onelake-azure-storage-explorer\enter-display-name.png" alt-text="Screenshot showing where to enter a display name." lightbox="media\onelake-azure-storage-explorer\enter-display-name.png":::

1. Storage Explorer browses to the location of the OneLake you entered.

   :::image type="content" source="media\onelake-azure-storage-explorer\azure-storage-explorer-browse.png" alt-text="Screenshot showing an example of a OneLake selection in Azure Storage Explorer." lightbox="media\onelake-azure-storage-explorer\azure-storage-explorer-browse.png":::

1. To view the contents, select the OneLake folder you connected.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-onelake-folder.png" alt-text="Screenshot showing where to select your connected folder." lightbox="media\onelake-azure-storage-explorer\select-onelake-folder.png":::

1. Select **Upload**. In the **Select files to upload** dialog box, select the files that you want to upload.

   :::image type="content" source="media\onelake-azure-storage-explorer\upload-download-files.png" alt-text="Screenshot showing where to select Upload or Download." lightbox="media\onelake-azure-storage-explorer\upload-download-files.png":::

1. To download, select the folders or files that you want to download and then select **Download**.

1. To copy data across locations, select the folders you want to copy and select **Copy**, then navigate to the destination location and select **Paste**.

   :::image type="content" source="media\onelake-azure-storage-explorer\copy-paste-folder.png" alt-text="Screenshot showing where to select Copy or Paste." lightbox="media\onelake-azure-storage-explorer\copy-paste-folder.png":::

## Limitations

If a workspace name has capital letters, deletion of files or folders fails due to a restriction from the storage service. We recommend using your workspace name in lowercase letters.

## Related content

- [Integrate OneLake with Azure Databricks](onelake-azure-databricks.md)
