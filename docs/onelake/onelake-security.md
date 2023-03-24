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

OneLake uses a layered security model built around the organizational structure of components within Microsoft Fabric. Security is derived from Azure Active Directory (Azure AD) authentication and is compatible with both user identities and service principals. Using Azure AD and Fabric components, you can build out robust security mechanisms across OneLake, ensuring that you keep your data safe while also reducing copies and minimizing complexity.

OneLake is a single data lake across your entire organization. Fabric sits on top of OneLake and divides the single data lake into separate containers that can be secured independently. Within each workspace, you can define security for different items, and you can set access through compute engines like SQL separately from direct data lake access.

IMAGE onelake-structure.png Diagram showing the structure of a data lake connecting to separately secured containers.

## Workspace security

The workspace is the primary security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. Security in the workspace is managed through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](..\data-warehouse\workspace-roles.md)

| **Role** | **View files in OneLake** | **Write files in OneLake** | **Manage OneLake settings** |
|---|---|---|---|
| Admin | Yes | Yes | Yes |
| Member | Yes | Yes | Yes |
| Contributor | Yes | Yes | No |
| Viewer | No | No | No |

Viewers can still access data through certain compute types in Fabric. For more information, see the [Compute-specific security](#compute-specific-security) section.

## Item security

You can apply more security or settings to individual items in Fabric. In general, the access a user has to an item inherits from their Fabric workspace role. However, you can share items with users directly, granting them access to just that item without adding them to a workspace role. The following table outlines the scenarios around sharing lakehouses and warehouses, and how they apply to OneLake.

| **Action** | **View files in OneLake** | **Write files in OneLake** |
|---|---|---|
| If a warehouse is shared with you… | No | No |
| If a lakehouse is shared with you… | Yes | No |
| If a lakehouse with write access is shared with you… | Yes | Yes |

## Compute-specific security

Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine, but those conditions may not bind users in certain Fabric roles when they access OneLake directly.

As a general rule, users in the Viewer workspace role can't access OneLake directly. Viewers are limited to accessing data through the compute engine and are restricted by any rules set there. All other roles contain direct OneLake access, allowing them to query data through Spark, APIs, or a OneLake File Explorer. However, compute-specific security still applies to those users when accessing data through that compute engine.

**Example:** Martha is an administrator for a Fabric workspace. A co-administrator Pradeep set up rules in SQL to restrict access to the Sales table unless you have accounts assigned to you. When Martha runs a SELECT query from the Sales table, she only sees data for accounts assigned to her. However, because she has OneLake access she can use the Lakehouse explorer to view and open the files backing the Sales table.

## Authentication

OneLake uses Azure Active Directory (Azure AD) for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Azure AD authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups.

IMAGE admin-portal-tenant-settings.png Screenshot showing the Developer settings options on the Tenant setting screen.

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Next steps

- [OneLake File Explorer](onelake-file-explorer.md)
