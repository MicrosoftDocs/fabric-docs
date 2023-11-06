---
title: Git source code format
description: Understand how the items in Microsoft Fabric's Git integration tool are structured
author: mberdugo
ms.author: monaberdugo
ms.reviewer: NimrodShalit
ms.topic: conceptual 
ms.date: 06/20/2023
ms.custom: build-2023
---

# Git integration source code format

Items in Microsoft Fabric are stored in a folder. They can either be in the root directory or a subdirectory. When you connect your workspace to git, connect to the folder containing the items. Each item in the folder is represented in its own subdirectory. These item directories have the same name as the item followed by the item type.

:::image type="content" source="./media/source-code-format/item-directory-names.png" alt-text="Screenshot of Git directory containing items.":::

Inside each item directory are the [mandatory system files that define the item](/power-bi/developer/projects/projects-overview). Besides these files, there are two automatically generated system files in each directory:

- [item.metadata.json](#metadata-file)
- [item.config.json](#config-file)

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

## Metadata file

```json
{ 
    "type": <string>, 
    "displayName": <string>,
    "description": <string>
} 
```

The item.metadata.json file contains the following attributes:

- `type`: the item’s type (dataset, report etc.)
- `displayName`: the name of the item
- `description`: (optional) description of the item

To rename an item, change the `displayName` in the ‘item.metadata.json’ file. Changing the name of the folder doesn’t change the display name of the item in the workspace.

## Config file

```json
{ 
    version: <string>, 
    logicalId: <guid>, 
} 
```

The `item.config.json` file contains the following attributes:

- `version`: version number of the system files. This number is used to enable backwards compatibility. Version number of the item might be different.
- `logicalId`: an automatically generated cross-workspace identifier representing an item and its source control representation.

The logicalId connects an item in a workspace with its corresponding item in a Git branch. Items with the same logicalIds are assumed to be the same. The logicalId preserves the link even if the name or directory change. Since a branch can be synced to multiple workspaces, it’s possible to have items in different workspaces with the same logicalId, but a single workspace can’t have two items with the same logicalId. The logicalId is created when the workspace is connected to a Git branch or a new item is synced. The logicalId is necessary for Git integration to function properly. Therefore, it’s essential not to change it in any way.

> [!NOTE]
> Though you should not generally change the *logicalId* or *display name* of an item, one exception might be if you're creating a new item by copying an existing item directory. In that case, you do need to change the *logicalId* and the *display name* to something unique in the repository.

## Item definition files

Besides the item.config.json file and the item.metadata.json file found in all item folders, each item's directory has specific files that define that item.

### Dataset files

Dataset folders contain the following files:

- definition.pbidataset
- model.bim

:::image type="content" source="./media/source-code-format/dataset-directory.png" alt-text="Screenshot of directory tree showing files in the dataset directory.":::

For more information about dataset folders and a complete list of their contents, see [Power BI Desktop project dataset folder](/power-bi/developer/projects/projects-dataset).

### Report files

Report folders contain the following files:

- definition.pbir
- report.json

:::image type="content" source="./media/source-code-format/report-directory.png" alt-text="Screenshot of directory tree showing files in the report directory.":::

For more information about report folders and a complete list of their contents, see [Power BI Desktop project report folder](/power-bi/developer/projects/projects-report).

## Next steps

[Get started with Git integration](./git-get-started.md)
