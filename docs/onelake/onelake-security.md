---
title: OneLake security
description: OneLake uses a layered security model built around the organizational structure of experiences within Microsoft Fabric. Learn more about OneLake security.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 09/27/2023
---

# OneLake security

OneLake uses a layered security model built around the organizational structure of experiences within Microsoft Fabric. Access to OneLake data can be controlled at each level in the Fabric hierarchy, while folder level access can be managed using OneLake data access roles (preview). Security is derived from Microsoft Entra authentication and is compatible with user identities, service principals, and managed identities. 

:::image type="content" source="media\onelake-security\onelake-structure-new.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

## Workspace security

The workspace is the primary security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | No, can be given access through OneLake data access roles (preview) |
| Write files in OneLake | Yes | Yes | Yes | No |

## Item security

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

| **Permission Name** | **Sharing text** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|----------|--------------|
| Read | *No share boxes selected* | No, can be given access through OneLake data access roles (preview)<sup>1</sup> | No | No, can be given access through SQL security<sup>2</sup> |
| ReadData | Read all SQL endpoint data | No, can be given access through OneLake data access roles (preview)<sup>1</sup> | No | Yes |
| ReadAll | Read all Apache Spark | No, can be given access through OneLake data access roles (preview)<sup>1</sup> | No | No, can be given access through SQL security<sup>2</sup> |
| Write | *N/A, only available through workspace roles* | Yes | Yes | Yes |
*1 - See the "OneLake data access roles (preview) section for more details*
*2 - See the "Compute-specific security" section for more details*


## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not apply to users when they access OneLake directly. Compute security allows for users to define fine-grained access control such as table and row level security. For more information on what types of compute security you can define, see the documentation for Warehouse, Real-time analytics, and Power BI semantic models.

Because compute-specific security only applies when accessing data through that query engine, it is important to give users access to only the compute where the security is defined using the item permissions discussed above. This means not granting access to the underlying OneLake data through data access roles (preview) or the ReadAll permission.

## OneLake Data access roles (preview)
OneLake data access roles is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data through the lakehouse UX, notebooks, or OneLake APIs.  

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that are not part of a data access role will see no data in that lakehouse.  

Learn more about the security model for access roles [here.](/security/data-access-control-model.md) 

## Shortcut security

Shortcuts in Microsoft Fabric allow for simplified data management, but have some security considerations to note. For information on managing shortcut security see this [document](onelake-shortcuts.md#types-of-shortcuts).

For OneLake data access roles (preview), shortcuts receive special treatment depending on the shortcut type. The access to a OneLake shortcut is always controlled by the access roles on the target of the shortcut. This means that for a shortcut from LakehouseA to LakehouseB, the security of LakehouseB takes effect. Data access roles in LakehouseA cannot grant or edit the security of the shortcut to LakehouseB.

For external shortcuts to Amazon S3 or ADLS Gen2, the security is configured through data access roles in the lakehouse itself. A shortcut from LakehouseA to an S3 bucket can have data access roles configured in LakehouseA. It is important to note that only the root level of the shortcut can have security applied. Assigning access to sub-folders of the shortcut will result in role creation errors.

## Authentication

OneLake uses Microsoft Entra ID for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Microsoft Entra authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups.

:::image type="content" source="media\onelake-security\admin-portal-tenant-settings.png" alt-text="Screenshot showing the Developer settings options on the Tenant setting screen." lightbox="media\onelake-security\admin-portal-tenant-settings.png":::

## Encryption

Data stored in OneLake is encrypted at rest by default using Microsoft-managed key. Microsoft-managed keys are rotated appropriately per compliance requirements. Data in OneLake is encrypted and decrypted transparently using 256-bit AES encryption, one of the strongest block ciphers available, and it is FIPS 140-2 compliant.

Encryption at rest using customer-managed key is currently not supported. You can submit request for this feature on [Microsoft Fabric Ideas](https://ideas.fabric.microsoft.com/).

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Allow apps running outside of Fabric to access data via OneLake

OneLake allows you to restrict access to data from applications running outside of Fabric environments. Admins can find the setting in the tenant admin portal.
When you turn this switch ON, users can access data via all sources. When you turn the switch OFF, users can't access data via applications running outside of Fabric environments. For example, users can access data via applications like Azure Databricks, custom applications using Azure Data Lake Storage (ADLS) APIs, or OneLake file explorer.

## Related content

- [OneLake file explorer](onelake-file-explorer.md)
- [Workspace roles](../get-started/roles-workspaces.md)
- [Share items](../get-started/share-items.md)
- [OneLake data access security model](/security/data-access-control-model.md)
