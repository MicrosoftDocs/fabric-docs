---
title: Git source code format
description: Understand how the items in Microsoft Fabric's git integration tool are structured
author: mberdugo
ms.author: monaberdugo
ms.topic: conceptual 
ms.date: 05/23/2023
ms.custom: 
---

# Git integration source code format

Each item in Microsoft Fabric is represented in Git as a directory. Each directory has the same name as the artifact followed by the type.

:::image type="content" source="./media/source-code-format/item-directory-names.png" alt-text="Screenshot of git directory containing items.":::

Inside each directory are the files that mandatory system defined files that define the item. Besides item files, there are two automatically generated system files in each directory:

- [item.config.json](#config-file)
- [item.metadata.json](#metadata-file)

## Metadata file

```json
{ 
    type: <string>, 
    displayName: <string>, 
} 
```

The item.metadata.json file contains the following attributes:

- `type`: the item’s type (dataset, report etc.)
- `displayName`: the name of the item

To rename an item, change the `displayName` in the ‘item.metadata.json’ file. Changing the name of the folder won’t change the display name of the item in the workspace.

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

The logicalId connects an item in a workspace with its corresponding item in a git branch. Items with the same logicalIds are assumed to be the same. The logicalId preserves the link even if the name or directory change. Since a branch can be synced to multiple workspaces, it’s possible to have items in different workspaces with the same logicalId, but a single workspace can’t have two items with the same logicalId. The logicalId is created when the workspace is connected to a git branch or a new item is synced. The logicalId is necessary for git integration to function properly. Therefore, it’s essential not to change it in any way.

## Next steps

[Get started with git integration](./git-get-started.md)
