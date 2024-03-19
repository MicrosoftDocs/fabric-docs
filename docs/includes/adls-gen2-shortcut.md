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

1. Select **Next**.
1. Browse to the target location for the shortcut.

    :::image type="content" source="../includes/media/onelake-shortcuts/adls-gen2-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="../includes/media/onelake-shortcuts/adls-gen2-shortcut/shortcut-browse.png":::

    If you just used the storage in the connection URL, all of your available containers appear in the left navigation view. If you specified a container in connection URL, only the specified container and its contents appear in the navigation view.

    Navigate the storage account by selecting a folder or clicking on the expansion carrot next to a folder.

    In this view, you can select one or more shortcut target locations.  Choose target locations by clicking the checkbox next a folder in the left navigation view.
1. Select **Next**

    :::image type="content" source="../includes/media/onelake-shortcuts/adls-gen2-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="../includes/media/onelake-shortcuts/adls-gen2-shortcut/shortcut-review.png":::

    The review page allows you to verify all of your selections. Here you can see each shortcut that will be created.  In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.
1. Select **Create**.

