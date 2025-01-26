---
title: Fabric and OneLake security
description: OneLake uses a layered security model built around the organizational structure of experiences within Microsoft Fabric. Learn more about OneLake security.
ms.reviewer: aamerril
ms.author: yuturchi
author: yuturchi
ms.topic: concept-article
ms.custom:
  - build-2024
ms.date: 04/01/2024
#customer intent: As a security engineer, I want to understand the security features and considerations of Fabric and OneLake so that I can ensure the confidentiality and integrity of the data stored in the lakehouse.
---

# Secure Data with Fabric, Compute Engines, and OneLake

Fabric offers a [multi-layer security model](../../security/permission-model.md) for managing data access. Security can be set for an entire workspace, for individual items, or through granular permissions in each Fabric engine. OneLake has its own security considerations that are outlined in this document.

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

## Audit Logs

To view your OneLake audit logs, follow the instructions in [Track user activities in Microsoft Fabric](/fabric/admin/track-user-activities). OneLake operation names correspond to [ADLS APIs](/rest/api/storageservices/data-lake-storage-gen2) such as CreateFile or DeleteFile.  OneLake audit logs do not include read requests or requests made to OneLake via Fabric workloads.

## Encryption and networking

### Data at Rest

Data stored in OneLake is encrypted at rest by default using Microsoft-managed key. Microsoft-managed keys are rotated appropriately. Data in OneLake is encrypted and decrypted transparently and it is FIPS 140-2 compliant.

Encryption at rest using customer-managed key is currently not supported. You can submit request for this feature on [Microsoft Fabric Ideas](https://ideas.fabric.microsoft.com/).

### Data in transit

Data in transit across the public internet between Microsoft services is always encrypted with at least TLS 1.2. Fabric negotiates to TLS 1.3 whenever possible. Traffic between Microsoft services always routes over the Microsoft global network.

Inbound OneLake communication also enforces TLS 1.2 and negotiates to TLS 1.3, whenever possible. Outbound Fabric communication to customer-owned infrastructure prefers secure protocols but might fall back to older, insecure protocols (including TLS 1.0) when newer protocols aren't supported.

### Private links

To configure Private Links in Fabric, see [Set up and use private links](/fabric/security/security-private-links-use).

## Allow apps running outside of Fabric to access data via OneLake

OneLake allows you to restrict access to data from applications running outside of Fabric environments. Admins can find the setting in the [OneLake section of Tenant Admin Portal](../../admin/tenant-settings-index.md#onelake-settings).
When you turn this switch ON, users can access data via all sources. When you turn the switch OFF, users can't access data via applications running outside of Fabric environments. For example, users can access data via applications using Azure Data Lake Storage (ADLS) APIs or OneLake file explorer.

## Related content

- [OneLake Data Access Control Model (Preview)](./data-access-control-model.md)
- [Get Started with OneLake Security (Preview)](./get-started-security.md)
- [OneLake file explorer](../onelake-file-explorer.md)
- [Workspace roles](../../fundamentals/roles-workspaces.md)
- [Share items](../../fundamentals/share-items.md)
