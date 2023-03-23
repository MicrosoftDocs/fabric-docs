---
title: OneLake integration with Azure Storage Explorer
description: Follow steps to integrate and use Azure Storage Explorer.
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

   IMAGE open-connect-dialog.png Screenshot showing where to select the Open connect dialog icon.

1. Azure Storage Explorer requires you to sign in to connect to Azure resources. Select **Subscription** and follow the instructions to sign in.

   IMAGE select-resource-subscription.png Screenshot showing where to select Subscription on the Select resource screen.

1. Connect to OneLake by selecting the **Open connect dialog** icon again and select **ADLS Gen2 container or directory**.

   IMAGE select-container-directory.png Screenshot showing where to select the ADLS Gen2 container or directory option.

1. Enter URL details of the artifact you would like to connect to, in this format: [*https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{artifactId}/*](https://onelake.dfs.fabric.microsoft.com/{workspaceId}/{artifactId}/). You can find the workspaceID and artifactID in the **Properties** pane of a file in the Fabric portal.

   You can choose a **Display name** for convenience, then select **Next.**

   IMAGE enter-display-name.png Screenshot showing where to enter a display name.

1. Storage Explorer browses to the location of the OneLake you entered.

   IMAGE azure-storage-explorer-browse.png Screenshot showing an example of a OneLake selection in Azure Storage Explorer.

1. To view the contents, select the OneLake folder you connected.

   IMAGE select-onelake-folder.png Screenshot showing where to select your connected folder.

1. Select **Upload**. In the **Select files to upload** dialog box, select the files that you want to upload.

   IMAGE upload-download-files.png Screenshot showing where to select Upload or Download.

1. To download, select the folders or files that you want to download and then select **Download.**

1. To copy data across locations, select the folders you want to copy and select **Copy**, then navigate to the destination location and select **Paste**.

   IMAGE copy-paste-folder.png Screenshot showing where to select Copy or Paste.

## Next steps

- [OneLake integration: Azure Databricks](onelake-azure-databricks.md)
