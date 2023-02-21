---
title: Git integratin process
description: Understand how Trident interacts with git on Azure repos
author: mberdugo
ms.author: monaberdugo
ms.topic: how-to #Required; leave this attribute/value as-is.
ms.date: 01/17/2023
ms.custom: 
---

# The git inegratin process

## Permissions

The actions you can take on a workspace depend on the permissions you have in both the workspace and Azure DevOps. The following list shows what different workspace roles can do depending on their Azure DevOps permissions:

- Admin: Can perform any operation on the workspace, limited only by their Azure DevOps role.
- Member/Contributor: Once connected to a workspace, can commit and update changes, depending on their Azure DevOps role. For actions related to the workspace connection, (for example, connect, disconnect, or switch branches) need help from an Admin.
- Viewer: Can't perform any actions. The viewer won't see any git related information in the workspace.

## Connect and sync

Only a workspace admin can connect a workspace to Azure repos, but once connected, anyone with permissions can work in the workspace. If you're not an admin, ask your admin for help connecting. To connect a workspace to Azure repos, follow these steps:

1. Sign into Trident and navigate to the workspace you want to connect with.
1. Go to Workspace settings.
