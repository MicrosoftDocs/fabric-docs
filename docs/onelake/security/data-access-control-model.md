---
title: Data Access Control Model in OneLake
description: TBD
ms.reviewer: eloldag
ms.author: aamerril
author: yuturchi
ms.topic: conceptual
ms.custom:
  - onelake-data-access-public-preview-april-2024
ms.date: 04/01/2024
---

## Role-based access control (RBAC)

OneLake RBAC uses role assignments to apply permissions to its members. You can either assign roles to individuals or to security groups, Microsoft 365 groups, and distribution lists. Every member in the user group gets the role that you've assigned. If someone is in several user groups (e.g. in 2 or more security groups or Microsoft 365 group), they get the highest level of permission that's provided by the roles that they're assigned. If you nest user groups and assign a role to a group, all the contained users have permissions.

### Types of OneLake RBAC

TBD

### Levels of Permissions

TBD

### Inheritance in OneLake RBAC

TBD

### Default permissions

TBD


### Limits on OneLake RBAC

#### Limits on Roles per Item

TBD

#### Limits on Assignments per Role

TBD

## How OneLake RBAC permissions are evaluated with Fabric permissions

Workspace and Item permissions lets you grant "coarse-grain" access to data in OneLake for the given Item. OneLake RBAC permissions enable you to restrict the data access in OneLake only to specific folders.

TBD - add diagram of Workspace -> Item -> RBAC permissions decisions flow.

## OneLake RBAC and Workspace permissions

The workspace permissions are the first security boundary for data within OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace through Fabric workspace roles. Learn more about Fabric role-based access control (RBAC): [Workspace roles](../get-started/roles-workspaces.md)

Workspace roles in Fabric grant the following permissions in OneLake.

| **Capability** | **Admin** | **Member** | **Contributor** | **Viewer** |
|---|---|---|---|---|
| View files in OneLake | Yes | Yes | Yes | Yes by default. Use OneLake RBAC to restrict the access. |
| Write files in OneLake | Yes | Yes | Yes | No |

## OneLake RBAC and Item permissions

Within a workspace, Fabric items can have permissions configured separately from the workspace roles. You can configure permissions either through sharing an item or by managing the permissions of an item. The following permissions determine a user's ability to perform actions on data in OneLake.

### Lakehouse permissions

| **Lakehouse Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No |
| ReadAll | Yes by default. Use OneLake RBAC to restrict the access. | No | No |
| Write | Yes | Yes | Yes |
| Reshare, ViewOutput, ViewLogs | N/A - cannot be granted on its own |  N/A - cannot be granted on its own |  N/A - cannot be granted on its own |

### OneLake RBAC and Lakehouse SQL Analytics Endpoint permissions

| **SQL Analytics Endpoint Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** |
|----------|----------|----------|--------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No by default, but can be configured with [SQL granular permissions](../../data-warehouse/sql-granular-permissions.md) |
| ReadData | Yes by default. Use OneLake RBAC to restrict the access. | No | Yes |
| Write | Yes | Yes | Yes |

### OneLake RBAC and Default Lakehouse Semantic Model permissions

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated default semantic model. The default semantic model has metrics on top of lakehouse data. The semantic model allows Power BI to load data for reporting.

| **Default Semantic Model Permission** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can see schema in Semantic Model?** | **Can read data in Semantic Model?** |
|----------|----------|----------|--------------|-------------|
| Read  | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes by default. Can be restricted with [PowerBI Object-level Security](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-ols?tabs=table) and [PowerBI Row-Level security](https://learn.microsoft.com/en-us/power-bi/enterprise/service-admin-rls)  |
| Build | Yes by default. Use OneLake RBAC to restrict the access. | Yes | Yes | Yes |
| Write | Yes | Yes | Yes | Yes |
| Reshare |  N/A - cannot be granted on its own | N/A - cannot be granted on its own | N/A - cannot be granted on its own | N/A - cannot be granted on its own |

#### Lakehouse Sharing and OneLake RBAC Permissions

By sharing, users grant other users or a group of users access to a lakehouse without giving access to the workspace and the rest of its items. Shared lakehouse can be found through Data Hub or the Shared with Me section in Microsoft Fabrics.

When someone shares a lakehouse, they can also grant access to the SQL endpoint and associated default semantic model.

:::image type="content" source=".\media\lakehouse-sharing.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

| **Sharing Option** | **Can view files in OneLake?** | **Can write files in OneLake?** | **Can read data through SQL analytics endpoint?** | **Can view and build Semantic Models?** |
|----------|----------|----------|----------|-----|
| *No additional permissions selected* | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Read all A]ache Spark | Yes by default. Use OneLake RBAC to restrict the access. |  No | No | No |
| Read all SQL endpoint data | Yes by default. Use OneLake RBAC to restrict the access. |  No | Yes | No |
| Build  reports on the default dataset | Yes by default. Use OneLake RBAC to restrict the access. | No | No | Yes |
