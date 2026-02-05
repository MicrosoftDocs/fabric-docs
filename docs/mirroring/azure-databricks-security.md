---
title: "Microsoft Fabric Mirrored Databases From Azure Databricks Security"
description: Learn about security for Azure Databricks mirroring in Microsoft Fabric.
ms.reviewer: preshah, sheppardshep
ms.date: 07/31/2025
ms.topic: overview
ms.search.form: Databricks security overview
---

# Secure Fabric mirrored databases from Azure Databricks

This article helps you establish data security in your mirrored Azure Databricks in Microsoft Fabric.

## Unity Catalog

Users must reconfigure Unity Catalog policies and permissions in Fabric.

To allow Azure Databricks Catalogs to be available in Fabric, see [Control external access to data in Unity Catalog](/azure/databricks/data-governance/unity-catalog/access-open-api).

Unity Catalog policies and permission aren't mirrored in Fabric. Users can't reuse Unity Catalog policies and permissions in Fabric. Permissions set on catalogs, schemas, and tables inside Azure Databricks doesn't carry over to Fabric workspaces. You need to use Fabric's permission model to set access control on objects in Fabric.

The credential used to create the connection to Unity Catalog of this catalog mirroring is used for all data queries.

### Use trusted workspace access to access firewall-enabled ADLS storage

When configuring Azure Databricks mirroring to Microsoft Fabric, enable [trusted workspace access](../security/security-trusted-workspace-access.md) to access firewall-enabled Azure Data Lake Storage (ADLS) Gen2 accounts.

Trusted workspace access requires creating a connection directly to the ADLS storage account which can be used independently of the Azure Databricks workspace connection. Unity Catalog policies such as [RLS/CLM or ABAC](/azure/databricks/tables/row-and-column-filters) are not enforced at the storage layer and will not be applied if a connection is used to directly access storage. Trusted workspace access instead relies on [Fabric workspace identities administration and governance](../security/workspace-identity.md#security-administration-and-governance-of-the-workspace-identity).

Follow the steps in the [Tutorial to Enable network security access](../mirroring/azure-databricks-tutorial.md). It is recommended to give granular control on the storage account by specifying a specific folder within a container, and [Assign Azure roles using the Azure portal](/azure/role-based-access-control/role-assignments-portal#step-2-open-the-add-role-assignment-page).

## Permissions

Permissions set on catalogs, schemas, and tables in your Azure Databricks workspace can't be replicated to your Fabric workspace. Use Fabric's permissions model to set access controls for catalogs, schemas, and tables in Fabric.

When selecting objects to mirror, you can only see the catalogs/schemas/tables that you have access to as per the privileges that are granted to them as per the privilege model described at [Unity Catalog privileges and securable objects](/azure/databricks/data-governance/unity-catalog/manage-privileges/privileges).

For more information on setting up Fabric Workspace security, see the [Permission model](../security/permission-model.md) and [Roles in workspaces in Microsoft Fabric](../fundamentals/roles-workspaces.md).

## Related content

- [Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-tutorial.md)
- [Limitations in Microsoft Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-limitations.md)
- [Review the FAQ](../mirroring/azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog](../mirroring/azure-databricks.md)
