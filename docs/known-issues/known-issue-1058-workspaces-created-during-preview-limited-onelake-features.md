---
title: Known issue - Workspaces created during Fabric preview only support limited OneLake features
description: A known issue is posted where workspaces created during Fabric preview only support limited OneLake features.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/12/2025
ms.custom: known-issue-1058
---

# Known issue - Workspaces created during Fabric preview only support limited OneLake features

If you created a OneLake data item, such as a lakehouse or warehouse, during the Fabric preview period of April 4, 2023 or earlier, the workspace only supports some OneLake features.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

OneLake items in that workspace don't support OneLake events, OneLake disaster recovery, and new features such as private link support at a workspace level.

## Solutions and workarounds

Recommended actions:

1. **Create a new workspace**: Ensure your workspace settings match the old workspace and reassign all user permissions.
1. **Create new items in the new workspace**: Recreate any items in the new workspace. Recreation includes any internal configurations, such as permissions, data models, and shortcuts.
1. **Copy data to the new workspace**: Transfer any necessary data into a new workspace. You can copy your data between OneLake paths using tools like [AzCopy](/azure/storage/common/storage-use-azcopy-v10), the [copy activity](/fabric/data-factory/copy-data-activity) in Fabric pipelines, or [Azure Storage Explorer](/fabric/onelake/onelake-azure-storage-explorer).
1. **Delete the old workspace**: Once you transfer your data, delete the old workspace to avoid any issues with unsupported features.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
