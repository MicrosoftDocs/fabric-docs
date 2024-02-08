---
title: Include file for Azure Data Lake Storage Gen2 shortcut in Microsoft Fabric
description: Include file for Azure Data Lake Storage Gen2 shortcut in Microsoft Fabric.
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.date: 07/16/2023
---

## Select a source

1. Under **External sources**, select **Azure Data Lake Storage Gen2**.
    :::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Azure Data Lake Storage Gen2 is highlighted." lightbox="media/onelake-shortcuts/adls-gen2-shortcut/new-shortcut-expanded.png":::

1. Enter the **Connection settings** according to the following table:

    :::image type="content" source="media/onelake-shortcuts/adls-gen2-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials."  lightbox="media/onelake-shortcuts/adls-gen2-shortcut/shortcut-details.png":::

      |Field | Description| Value|
      |-----|-----| -----|
      | **URL**| The connection string for your delta container. | `https://`*StorageAccountName*`.dfs.core.windows.net`|
      |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection*. |
      |**Connection name** | The Azure Data Lake Storage Gen2 connection name.| A name for your connection.|
      |**Authentication kind**| The authorization model. The supported models are: Organizational account, Account key, Shared Access Signature (SAS), and Service principal. For more information, see [ADLS shortcuts](../onelake/onelake-shortcuts.md#adls-shortcuts). | Dependent on the authorization model. Once you select an authentication kind, fill in the required credentials.|

1. Select **Next**
1. Under **Shortcut Name**, enter a name for your shortcut.
1. Under **Sub Path**, enter a sub path to select a specific folder in your storage account.
1. Select **Create**.
1. In the **Shortcut creation completed** window, select **close**.
