---
title: "Microsoft Fabric Mirrored Databases From Azure Databricks Security"
description: Learn about security for Azure Databricks mirroring in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: sheppardshep, whhender
ms.date: 11/19/2024
ms.topic: overview
ms.search.form: Databricks security overview
---

# Secure Fabric mirrored databases from Azure Databricks

This article helps you establish data security in your mirrored Azure Databricks in Microsoft Fabric.

## Unity Catalog

Users must reconfigure Unity Catalog policies and permissions in Fabric.

To allow Azure Databricks Catalogs to be available in Fabric, see [Control external access to data in Unity Catalog](/azure/databricks/data-governance/unity-catalog/access-open-api).

Unity Catalog policies and permission aren't mirrored in Fabric. Users can't reuse Unity Catalog policies and permissions in Fabric. Permissions set on catalogs, schemas, and tables inside Azure Databricks doesn't carry over to Fabrics workspaces. You need to use Fabric's permission model to set access control on objects in Fabric.

The credential used to create the connection to Unity Catalog of this catalog mirroring is used for all data queries.

## Permissions

Permissions set on catalogs, schemas, and tables in your Azure Databricks workspace can't be replicated to your Fabric workspace. Use Fabric's permissions model to set access controls for catalogs, schemas, and tables in Fabric.

When selecting objects to mirror, you can only see the catalogs/schemas/tables that you have access to as per the privileges that are granted to them as per the privilege model described at [Unity Catalog privileges and securable objects](/azure/databricks/data-governance/unity-catalog/manage-privileges/privileges).

For more information on setting up Fabric Workspace security, see the [Permission model](../../security/permission-model.md) and [Roles in workspaces in Microsoft Fabric](../../fundamentals/roles-workspaces.md).

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](azure-databricks-tutorial.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Databricks](azure-databricks-limitations.md)
- [Review the FAQ](azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog](azure-databricks.md)
