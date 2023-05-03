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

## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not apply to users in certain Fabric roles when they access OneLake directly.

As a general rule, users in the Viewer role can only access data through select compute engines and any security rules defined in those engines apply.  All other roles have direct OneLake access, allowing them to query data through Spark, APIs, or a OneLake File Explorer. However, compute-specific security still applies to those users when accessing data through that compute engine.

**Example:** Martha is an administrator for a Fabric workspace. A co-administrator Pradeep set up rules in SQL to restrict access to the Sales table unless you have accounts assigned to you. When Martha runs a SELECT query from the Sales table, she only sees data for accounts assigned to her. However, because she has OneLake access she can use the Lakehouse explorer to view and open the files backing the Sales table allowing her to see all accounts.

## Shortcut security

Shortcuts in Microsoft Fabric allow for greatly simplified data management, but have some security considerations to note. For general information on what shortcuts are, see this document.

Microsoft Fabric shortcuts, which are shortcuts to data anywhere in OneLake use credential passthrough or single sign-on (SSO). This means that when users access a shortcut, that user's identity is passed to the shortcut destination to evaluate security. The security required to see an item in a shortcut is the same set of permissions as mentioned above. The table below outlines the permissions needed to access a shortcut using SSO. 

> [!NOTE] 
> All shortcuts accessed through a SQL compute (Warehouse or Lakehouse SQL Endpoint) do not use the querying user's identity, but the identity of the data item's owner. Example: Warehouse1 has a shortcut to Lakehouse2 TableA, and Ali is the owner of Warehouse1. Elise does not have access to Lakehouse2, but does have Read permission on Warehouse1. When she goes Warehouse1 and accesses the shortcut to TableA she is able to see the data because Ali's identity is used to traverse the shortcut not Elise's. 

| **Source item** | **Source permission** | **Destination item** | **Destination permission** |
|---|---|---|---|
| Warehouse | Read | Warehouse | Read<sup>1</sup> |  
| Warehouse | Read | Lakehouse | ReadAll<sup>1</sup> |
| Lakehouse | ReadAll | Lakehouse | ReadAll |
| Lakehouse | ReadAll | Warehouse | Read |  

<sup>1</sup>The item owner needs this permission, not the accessing user

External shortcuts, which are shortcuts to data outside of OneLake, use a fixed identity. Instead of the user's identity, a fixed credential or account key is used to access the external source instead. This means that the users only need access to the source of the shortcut and the fixed credential will be used to grant access to the destination. If the fixed credential loses access then the shortcut will break.

## Authentication

OneLake uses Azure Active Directory (Azure AD) for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Azure AD authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups.

:::image type="content" source="media\onelake-security\admin-portal-tenant-settings.png" alt-text="Screenshot showing the Developer settings options on the Tenant setting screen." lightbox="media\onelake-security\admin-portal-tenant-settings.png":::

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Next steps

- [OneLake File Explorer](onelake-file-explorer.md)
