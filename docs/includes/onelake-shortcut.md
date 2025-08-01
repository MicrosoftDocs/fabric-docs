---
title: Include file for OneLake shortcut in Microsoft Fabric
description: Include file for OneLake shortcut in Microsoft Fabric.
author: kgremban
ms.author: kgremban
ms.topic: include
ms.date: 03/20/2025
ms.custom: sfi-image-nochange
---
## Select a source

1. Under **Internal sources**, select **Microsoft OneLake**.

   :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing available shortcut sources. The option titled OneLake is highlighted.":::

1. Select the data source that you want to connect to, and then select **Next**.

   :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/data-source.png" alt-text="Screenshot of the Select a data source type window showing the available data sources to use with the shortcut. The Next button is highlighted." lightbox="media/onelake-shortcuts/onelake-shortcut/data-source.png":::

1. Expand **Files** or **Tables** to view the available subfolders. Subfolders in the tables directory that contain valid Delta or Iceberg tables are indicated with a table icon. Files or unidentified folders in the tables section are indicated with a folder icon.

   :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/table-folder-icons.png" alt-text="Screenshot that shows the expanded Tables and Files directories of a lakehouse.":::


1. Select one or more subfolders to connect to, then select **Next**.

   You can select up to 50 subfolders when creating OneLake shortcuts.

   :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/create-shortcut.png" alt-text="Screenshot of the New shortcut window showing the data in the lakehouse.":::

1. Review your selected shortcut locations. Use the edit action to change the default shortcut name. Use the delete action to remove any undesired selections. Select **Create** to generate shortcuts.

   :::image type="content" source="media/onelake-shortcuts/onelake-shortcut/review-shortcut-selection.png" alt-text="Screenshot of the New shortcut window showing selected shortcut locations and providing the option to delete or rename selections." lightbox="media/onelake-shortcuts/onelake-shortcut/review-shortcut-selection.png":::
