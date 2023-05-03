---
title: OneLake security
description: OneLake uses a layered security model built around the organizational structure of components within Microsoft Fabric. Learn more about OneLake security.
ms.reviewer: eloldag
ms.author: aamerril
author: aamerril
ms.topic: conceptual
ms.date: 03/24/2023
---

# OneLake security

[!INCLUDE [preview-note](../includes/preview-note.md)]

OneLake is a single data lake across your entire organization. Microsoft Fabric sits on top of OneLake and provides security boundaries that can be secured independently through workspaces. Within each workspace, you can define security for different items, and you can set access through compute engines like SQL separately from direct data lake access.

OneLake uses a layered security model built around the organizational structure of components within Microsoft Fabric. Security is derived from Azure Active Directory (Azure AD) authentication and is compatible with user identities, service principals, and managed identities. Using Azure AD and Fabric components, you can build out robust security mechanisms across OneLake, ensuring that you keep your data safe while also reducing copies and minimizing complexity.

:::image type="content" source="media\onelake-security\onelake-structure.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers." lightbox="media\onelake-security\onelake-structure.png":::

## Workspace security

The workspace is the primary security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. Security in the workspace is managed through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](..\data-warehouse\workspace-roles.md)  
  
Workspace roles in Fabric grant the following permissions in OneLake.

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | No |
| Write files in OneLake | Yes | Yes | Yes | No |


## Data item security

Data security can further be managed on individual data items such as lakehouse, warehouse, etc. in Fabric. In general, the access a user has to an item inherits from their Fabric workspace role. However, you can share items with users directly, granting them access to just that item without adding them to a workspace role. In addition, users with workspace role access to a data item can have additional permissions granted directly to that item through the manage permissions experience. The following tables outline the scenarios around sharing data items, the individual data item permissions, and how they apply to OneLake.

**Permissions granted when sharing a data item**
| **Action** | **Read all SQL endpoint data** | **Read all Apache Spark** | **Build reports on the default dataset** |
|---|---|---|---|
| Share a warehouse | Read | ReadAll | Build |
| Share a lakehouse | Read | ReadAll | Build |
| Share a real time analytics database<sup>1</sup> | N/A | N/A | N/A |
| Datasets<sup>2</sup> | N/A | N/A | N/A |
<sup>1</sup> Real-time analytics items always include both Read and Write access when shared.
<sup>2</sup> Datasets cannot be shared directly

**Permissions assigned to individual data items**
| **Permission** | **Warehouse** | **Lakehouse** | **Real-time Analytics** | **Dataset** |
|---|---|---|---|
| Read | Connect to SQL endpoint | Connect to SQL endpoint and open lakehouse artifact | Connect to database and query data | Read data from the dataset | 
| ReadAll | Read warehouse data in OneLake | Read lakehouse files and tables in OneLake | N/A | N/A |
| Write | Write data through SQL endpoint | Write to lakehouse files and tables in OneLake | Write data to real-time analytics DB | Edit a dataset |

## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not bind users in certain Fabric roles when they access OneLake directly.

As a general rule, users in the Viewer role can only access data through select compute engines and any security rules defined in those engines apply.  All other roles have direct OneLake access, allowing them to query data through Spark, APIs, or a OneLake File Explorer. However, compute-specific security still applies to those users when accessing data through that compute engine.

**Example:** Martha is an administrator for a Fabric workspace. A co-administrator Pradeep set up rules in SQL to restrict access to the Sales table unless you have accounts assigned to you. When Martha runs a SELECT query from the Sales table, she only sees data for accounts assigned to her. However, because she has OneLake access she can use the Lakehouse explorer to view and open the files backing the Sales table allowing her to see all accounts.

## Authentication

OneLake uses Azure Active Directory (Azure AD) for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Azure AD authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups.

:::image type="content" source="media\onelake-security\admin-portal-tenant-settings.png" alt-text="Screenshot showing the Developer settings options on the Tenant setting screen." lightbox="media\onelake-security\admin-portal-tenant-settings.png":::

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Next steps

- [OneLake File Explorer](onelake-file-explorer.md)
