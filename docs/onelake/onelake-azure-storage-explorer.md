---
title: OneLake integration with Azure Storage Explorer
description: Learn more about Microsoft Fabric integration with Azure services, specifically how to use Azure Storage Explorer.
ms.reviewer: eloldag
ms.author: harmeetgill
author: gillharmeet
ms.topic: how-to
ms.date: 03/24/2023
---

# OneLake integration: Azure Storage Explorer

[!INCLUDE [preview-note](../includes/preview-note.md)]

This tutorial is an example of OneLake integration with Azure. We encourage you to test any tools, programs, or services that you currently use today to interface with Azure Data Lake Storage (ADLS) Gen2.

## Using Azure Storage Explorer

1. Install the latest Azure Storage Explorer bits from the [product webpage](https://azure.microsoft.com/features/storage-explorer/).

1. Check to ensure the version installed is 1.27.0 or higher. (You can check the version by selecting **Help** > **About**.)

1. Select the **Open** **connect** **dialog** icon.

   :::image type="content" source="media\onelake-azure-storage-explorer\open-connect-dialog.png" alt-text="Screenshot showing where to select the Open connect dialog icon." lightbox="media\onelake-azure-storage-explorer\open-connect-dialog.png":::

1. Azure Storage Explorer requires you to sign in to connect to Azure resources. Select **Subscription** and follow the instructions to sign in.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-resource-subscription.png" alt-text="Screenshot showing where to select Subscription on the Select resource screen." lightbox="media\onelake-azure-storage-explorer\select-resource-subscription.png":::

1. Connect to OneLake by selecting the **Open connect dialog** icon again and select **ADLS Gen2 container or directory**.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-container-directory.png" alt-text="Screenshot showing where to select the ADLS Gen2 container or directory option." lightbox="media\onelake-azure-storage-explorer\select-container-directory.png":::

1. Enter URL details of the artifact you would like to connect to, in this format: `https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{artifactId}/`. You can find the workspaceID and artifactID in the **Properties** pane of a file in the Microsoft Fabric portal.

   You can choose a **Display name** for convenience, then select **Next.**

   :::image type="content" source="media\onelake-azure-storage-explorer\enter-display-name.png" alt-text="Screenshot showing where to enter a display name." lightbox="media\onelake-azure-storage-explorer\enter-display-name.png":::

1. Storage Explorer browses to the location of the OneLake you entered.

   :::image type="content" source="media\onelake-azure-storage-explorer\azure-storage-explorer-browse.png" alt-text="Screenshot showing an example of a OneLake selection in Azure Storage Explorer." lightbox="media\onelake-azure-storage-explorer\azure-storage-explorer-browse.png":::

1. To view the contents, select the OneLake folder you connected.

   :::image type="content" source="media\onelake-azure-storage-explorer\select-onelake-folder.png" alt-text="Screenshot showing where to select your connected folder." lightbox="media\onelake-azure-storage-explorer\select-onelake-folder.png":::

1. Select **Upload**. In the **Select files to upload** dialog box, select the files that you want to upload.

   :::image type="content" source="media\onelake-azure-storage-explorer\upload-download-files.png" alt-text="Screenshot showing where to select Upload or Download." lightbox="media\onelake-azure-storage-explorer\upload-download-files.png":::

1. To download, select the folders or files that you want to download and then select **Download.**

1. To copy data across locations, select the folders you want to copy and select **Copy**, then navigate to the destination location and select **Paste**.

   :::image type="content" source="media\onelake-azure-storage-explorer\copy-paste-folder.png" alt-text="Screenshot showing where to select Copy or Paste." lightbox="media\onelake-azure-storage-explorer\copy-paste-folder.png":::

## Next steps

- [OneLake integration: Azure Databricks](onelake-azure-databricks.md)
