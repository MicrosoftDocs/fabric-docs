---
title: include file
description: Prerequisites for PowerShell migration from ADF to Fabric
ms.reviewer: seanmirabile
ms.topic: include
ms.date: 06/11/2026
---

- **Tenant**: Your ADF and Fabric workspace must be in the same Microsoft Entra ID tenant.
- **Fabric**: A tenant account with an active Fabric subscription - [Create an account for free](../../fundamentals/fabric-trial.md).
- **Fabric workspace recommendations** (Optional): Use a new [Fabric workspace](../../fundamentals/workspaces.md) in the same region as your ADF for upgrades for best performance.
- **Permissions**: [Read access to the ADF workspace and items](/azure/data-factory/concepts-roles-permissions#scope-of-the-data-factory-contributor-role) you want to migrate and [Contributor or higher rights in the Fabric workspace](../../security/permission-model.md#workspace-roles) you want to write to.
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).
