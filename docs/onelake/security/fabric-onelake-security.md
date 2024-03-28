---
title: Fabric and OneLake security
description: OneLake uses a layered security model built around the organizational structure of experiences within Microsoft Fabric. Learn more about OneLake security.
ms.reviewer: aamerril
ms.author: yuturchi
author: yuturchi
ms.topic: conceptual
ms.custom:
ms.date: 04/01/2024
---

# Secure Data with Fabric, Compute Engines, and OneLake

Fabric offers a multi-layer security model that provides both simplicity and flexibility in managing data access. Security can be set for an entire workspace, for individual items, or through granular permissions in each Fabric engine.

Granular engine permissions allow fine-grained access control such as table, column, and row-level security to be defined. These granular permissions apply to queries run against that engine. Different engines support different types of granular security, allowing each engine to be tailored specifically for its target users.

:::image type="content" source=".\media\fabric-and-onelake-security.png" alt-text="Diagram showing different layers of security in Fabric, Compute Engines and OneLake.":::

## Fabric data security

Fabric controls data access using [workspaces](../../get-started/workspaces.md) and [items](../../get-started/fabric-terminology.md#general-terms). In workspaces, data appears in the form of Fabric Items, and users can't view or use data in the Items unless you give them access to workspace.

Workspace permissions grant access to all items within workspace. In contrast,
Fabric Item permissions allow granting access to specific items, such as lakehouses, warehouses, or reports. Admins can determine which Fabric Item the user can interact with. For example, limiting access to data via Analytics SQL Endpoint, while giving access to the same data via Lakehouse or via OneLake API directly.

Learn more about controlling data access using Fabric Workspace and Item permissions in [Security in Microsoft .](../../security/security-overview.md)

## Engine-specific data security

Many Fabric engines allow fine-grained access control such as table, column, and row-level security to be defined. Some compute engines in Fabric have their own security models. For example, Fabric Warehouse lets users define access using T-SQL statements. Compute-specific security is always enforced when you access data using that engine. The compute engine security might not apply to users in certain Fabric roles when they access OneLake directly.

Learn more about engine-specific granular data security:

- [Data warehousing Security](../../data-warehouse/security.md)
- [PowerBI Security](/power-bi/enterprise/service-admin-power-bi-security)
- [Data Factory - Set up you Lakehouse Connection](../../data-factory/connector-lakehouse-overview.md)
- [Real-Time Analytics Row-Level Security](/azure/data-explorer/kusto/management/row-level-security-policy)

## OneLake data access roles (Preview)

OneLake data access roles (Preview) allow users to create custom roles within a lakehouse and to grant read permissions only to the specified folders when accessing OneLake. For each OneLake role, users can assign users, security groups or grant an automatic assignment based on the workspace role.

:::image type="content" source=".\media\folder-level-security.png" alt-text="Diagram showing the structure of a data lake connecting to separately secured containers.":::

Learn more about [OneLake Data Access Control Model](./data-access-control-model.md) and [Get Started with Data Access .](./get-started-data-access-roles.md)

## Shortcut security

Shortcuts in Microsoft Fabric allow for simplified data management.
OneLake Folder security applies for OneLake shortcuts based on roles defined in the lakehouse where the data is stored.

For more information on the security considerations of shortcuts, see [OneLake access control model](./data-access-control-model.md). More information on shortcuts can be found [here.](../onelake-shortcuts.md#types-of-shortcuts).

## Authentication

OneLake uses Microsoft Entra ID for authentication; you can use it to give permissions to user identities and service principals. OneLake automatically extracts the user identity from tools, which use Microsoft Entra authentication and map it to the permissions you set in the Fabric portal.

> [!NOTE]
> To use service principals in a Fabric tenant, a tenant administrator must enable Service Principal Names (SPNs) for the entire tenant or specific security groups. Learn more about enabling Service Principals in [Developer Settings of Tenant Admin Portal](../../admin/tenant-settings-index.md#developer-settings)

### Data at Rest

Data stored in OneLake is encrypted at rest by default using Microsoft-managed key. Microsoft-managed keys are rotated appropriately. Data in OneLake is encrypted and decrypted transparently and it is FIPS 140-2 compliant.

Encryption at rest using customer-managed key is currently not supported. You can submit request for this feature on [Microsoft Fabric Ideas](https://ideas.fabric.microsoft.com/).

### Data in transit

Data in transit across the public internet between Microsoft services is always encrypted with at least TLS 1.2. Fabric negotiates to TLS 1.3 whenever possible. Traffic between Microsoft services always routes over the Microsoft global network.

Inbound OneLake communication also enforces TLS 1.2 and negotiates to TLS 1.3, whenever possible. Outbound Fabric communication to customer-owned infrastructure prefers secure protocols but might fall back to older, insecure protocols (including TLS 1.0) when newer protocols aren't supported.

## Private links

Fabric doesn’t currently support private link access to OneLake data via non-Fabric products and Spark.

## Allow apps running outside of Fabric to access data via OneLake

OneLake allows you to restrict access to data from applications running outside of Fabric environments. Admins can find the setting in the [OneLake section of Tenant Admin Portal](../../admin/tenant-settings-index.md#onelake-settings).
When you turn this switch ON, users can access data via all sources. When you turn the switch OFF, users can't access data via applications running outside of Fabric environments. For example, users can access data via applications like Azure Databricks, custom applications using Azure Data Lake Storage (ADLS) APIs, or OneLake file explorer.

## Related content

- [OneLake Data Access Control Model (Preview)](./data-access-control-model.md)
- [Get Started with OneLake Security (Preview)](./get-started-security.md)
- [OneLake file explorer](../onelake-file-explorer.md)
- [Workspace roles](../../get-started/roles-workspaces.md)
- [Share items](../../get-started/share-items.md)
