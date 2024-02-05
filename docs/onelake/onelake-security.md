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

OneLake uses a layered security model built around the organizational structure of experiences within Microsoft Fabric. Security is derived from Microsoft Entra authentication and is compatible with user identities, service principals, and managed identities. Using Microsoft Entra ID and Fabric components, you can build out robust security mechanisms across OneLake, ensuring that you keep your data safe while also reducing copies and minimizing complexity.

:::image type="content" source="media\onelake-security\onelake-structure.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

## Workspace security

The workspace is the primary security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | No |
| Write files in OneLake | Yes | Yes | Yes | No |

## Item security

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

| **Permission Name** | **Sharing text** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|----------|--------------|
| Read | *No share boxes selected* | No | No | No |
| ReadData | Read all SQL endpoint data | No | No | Yes |
| ReadAll | Read all Apache Spark | Yes | No | No |
| Write | *N/A, only available through workspace roles* | Yes | Yes | Yes |

## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not apply to users in certain Fabric roles when they access OneLake directly. For more information on what types of compute security you can define, see the documentation for Warehouse, Real-time analytics, and Power BI semantic models.

As a rule, users in the Viewer role can only access data through select compute engines and any security rules defined in those engines apply. All other roles have direct OneLake access, allowing them to query data through Spark, APIs, or a OneLake File Explorer. However, compute-specific security still applies to those users when accessing data through that compute engine.

**Example:** Martha is an administrator for a Fabric workspace and Pradeep is a viewer. Martha wants to restrict access to certain tables in **LakehouseA**. She connects to SQL and defines object level security using GRANT and DENY statements. When Pradeep accesses the data through SQL, he's only able to see the tables from **LakehouseA** that he was granted access to.

## Shortcut security

Shortcuts in Microsoft Fabric allow for simplified data management, but have some security considerations to note. For information on managing shortcut security see this [document](onelake-shortcuts.md#types-of-shortcuts).

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
