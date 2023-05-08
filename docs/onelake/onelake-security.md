---
title: OneLake security
description: OneLake uses a layered security model built around the organizational structure of components within Microsoft Fabric. Learn more about OneLake security.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.date: 05/23/2023
---

# OneLake security

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake is a single data lake across your entire organization. Microsoft Fabric sits on top of OneLake and provides the workspace concept which serves as the primary security boundary for OneLake. Within each workspace you can set access through compute engines like SQL separately from direct data lake access.

OneLake uses a layered security model built around the organizational structure of components within Microsoft Fabric. Security is derived from Azure Active Directory (Azure AD) authentication and is compatible with user identities, service principals, and managed identities. Using Azure AD and Fabric components, you can build out robust security mechanisms across OneLake, ensuring that you keep your data safe while also reducing copies and minimizing complexity.

:::image type="content" source="media\onelake-security\onelake-structure.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers." lightbox="media\onelake-security\onelake-structure.png":::

## Workspace security

The workspace is the primary security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. Security in the workspace is managed through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](/docs/get-started/roles-workspaces.md)  
  
Workspace roles in Fabric grant the following permissions in OneLake.

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | No |
| Write files in OneLake | Yes | Yes | Yes | No |

## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not apply to users in certain Fabric roles when they access OneLake directly. See the documentation for Warehouse, Real-time analytics, and Power BI datasets for more details on what types of compute security can be defined. 

As a general rule, users in the Viewer role can only access data through select compute engines and any security rules defined in those engines apply.  All other roles have direct OneLake access, allowing them to query data through Spark, APIs, or a OneLake File Explorer. However, compute-specific security still applies to those users when accessing data through that compute engine.

**Example:** Martha is an administrator for a Fabric workspace. A co-administrator Pradeep set up rules in the Lakehouse SQL endpoint to restrict access to the Sales table. When Martha connects to the Lakehouse SQL endpoint she is not able to see the Sales table. However, because she has OneLake access she can use the Lakehouse explorer to view and browse the files including the Sales table. Pradeep further defines row level security in a Power BI dataset. When Martha accesses that dataset she can only see the rows of data that are allowed per Pradeep's security rules. Again, the compute security of datasets only applies to that item and Martha is not restricted from seeing the underlying files in the Lakehouse.

## Shortcut security

Shortcuts in Microsoft Fabric allow for greatly simplified data management, but have some security considerations to note. For general information on what shortcuts are, see this [document](onelake-shortcuts.md).

Microsoft Fabric shortcuts, which are shortcuts to data anywhere in OneLake use credential passthrough or single sign-on (SSO). This means that when users access a shortcut (the shortcut source), that user's identity is passed to the shortcut destination to evaluate security. The security required to see an item in a shortcut is the same set of permissions as mentioned above. The table below outlines the permissions needed to access a shortcut using SSO.

> [!NOTE] 
> All shortcuts accessed through a SQL compute (Warehouse or Lakehouse SQL Endpoint) do not use the querying user's identity, but the identity of the data item's owner. Example: Warehouse1 has a shortcut to Lakehouse2 TableA, and Ali is the owner of Warehouse1. Elise does not have access to Lakehouse2, but does have Read permission on Warehouse1. When she goes Warehouse1 and accesses the shortcut to TableA she is able to see the data because Ali's identity is used to traverse the shortcut not Elise's. 

| **Shortcut source item** | **Required permission to see shortcut source** | **Shortcut target item** | **Required permission to access shortcut target** |
|---|---|---|---|
| Warehouse | Viewer | Warehouse | Viewer<sup>1</sup> |  
| Warehouse | Viewer | Lakehouse | Admin, member, contributor<sup>1</sup> |
| Lakehouse | Admin, member, contributor | Lakehouse | Admin, member, contributor |
| Lakehouse | Admin, member, contributor | Warehouse | Viewer |  
| Lakehouse | Admin, member, contributor | Real-time analytics | Admin, member, contributor |
| Real-time analytics | Viewer | Lakehouse | Admin, member, contributor |
| Real-time analytics | Viewer | Warehouse | Admin, member, contributor |  
<sup>1</sup>The item owner needs this permission, not the accessing user

External shortcuts, which are shortcuts to data outside of OneLake, use a fixed identity. Instead of the user's identity, a fixed credential or account key is used to access the external source instead. This means that the users only need access to the shortcut source and the fixed credential will be used to grant access to the destination. If the fixed credential loses access then the shortcut will break.

| **Shortcut source item** | **Required permission to see shortcut source** |
|---|---|
| Warehouse | Viewer |
| Lakehouse | Admin, member, contributor |
| Real-time analytics | Viewer |

## Authentication

OneLake uses Azure Active Directory (Azure AD) for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Azure AD authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups.

:::image type="content" source="media\onelake-security\admin-portal-tenant-settings.png" alt-text="Screenshot showing the Developer settings options on the Tenant setting screen." lightbox="media\onelake-security\admin-portal-tenant-settings.png":::

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Allow apps running outside of Fabric to access data via OneLake

OneLake provides the ability to restrict access to data from applications running outside of Fabric environments. Admins can find the setting in the tenant admin portal.
When this switch is turned ON, data can be accessed via all sources. When this switched is turned OFF, data can not be accessed via applications running outside of Fabric environments. For example, data can be access via applications like Azure Databricks, custom applications using ADLS APIs, or OneLake file explorer.

## Next steps

- [OneLake file explorer](onelake-file-explorer.md)
- [Workspace roles](/docs/get-started/roles-workspaces.md)  
