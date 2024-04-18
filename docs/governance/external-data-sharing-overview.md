---
title: "External data sharing in Microsoft Fabric"
description: "This article describes the external data sharing feature in Microsoft Fabric."
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.date: 04/14/2024

#customer intent: As a Fabric administrator, data creator, or data consumer, I want to learn about sharing data stored in OneLake from one tenant to another, so that data doesn't have to be copied when it is shared.
---

# External data sharing in Microsoft Fabric

Fabric external data sharing is a feature that enables Fabric users to share data from their tenant with users in another Fabric tenant. The data is shared *in-place* from [OneLake](../onelake/onelake-overview.md) storage locations in the sharer's tenant, meaning that no data is actually copied to the other tenant. Rather, this cross-tenant sharing creates a [OneLake shortcut](../onelake/onelake-shortcuts.md) in the other tenant that points back to the original data in the sharer's tenant. Data that is shared across tenant boundaries is exposed to users in the other tenant as read-only, and can be consumed by any OneLake compatible Fabric workload in that tenant.

:::image type="content" source="./media/external-data-sharing-overview/external-data-share-illustration.png" alt-text="Illustration of a cross-tenant OneLake data share." border="false":::

This external data sharing feature for Fabric OneLake data isn't related to the mechanism that exists for sharing Power BI semantic models with Entra B2B guest users.

## How does external data sharing work

As a prerequisite to external data sharing, Fabric admins need to turn on external data sharing both in the sharer's tenant and in the external tenant. Enabling external data sharing includes specifying who can create and accept external data shares. For more information, see [Enable external data sharing](./external-data-sharing-enable.md).

Users who are allowed to create external data shares can share data residing in tables or files within [supported Fabric items](#supported-fabric-item-types), as long as they have the standard Fabric read and reshare permissions for the item being shared. The user creating the share invites a user from another tenant to accept the external data share. This user receives a link that they use to accept the share. Upon accepting the share, the recipient chooses a lakehouse where a shortcut to the shared data will be created.

External data share links don't work for users who are in the tenant where the external data share was created. They work only for users in external tenants. To share data from OneLake storage accounts with users in the same tenant, use [OneLake shortcuts](../onelake/onelake-shortcuts.md).

> [!NOTE]
> Cross-tenant data access is enabled via a dedicated Fabric-to-Fabric authentication mechanism and does not require [Entra B2B guest user access](/power-bi/enterprise/service-admin-azure-ad-b2b).

## Supported Fabric item types

External data sharing is currently supported for data residing in tables or files within:

* [Lakehouses](../data-engineering/lakehouse-overview.md)
* [KQL databases](../real-time-analytics/create-database.md)

## Revoking external data shares

Any user in the sharing tenant who has read and reshare permissions on an externally shared item can revoke the external data share at any time using the **External data shares** tab on the manage permissions page. Revoking external data shares can have serious implications for the consuming tenants and should be considered carefully. For more information, see [Revoking external data shares](./external-data-sharing-manage.md#revoke-external-data-shares).

## Security Considerations

Sharing data with users outside your home tenant has implications for data security and privacy that you should consider. It's important to understand the underlying flows of data sharing to better evaluate these implications.

Data is shared across tenants using Fabric-internal security mechanisms. The share security mechanism grants read-only access to **any user** within the home tenant of the user that was invited to accept the share. Data is shared “in-place”. No data is copied, and it isn't even accessed until the someone in the receiving tenant executes a Fabric workload over the shared data. Fabric evaluates and enforces Entra-ID-based roles and permissions locally, within the tenant they're defined in. This means that access control policies defined in the sharer's tenant, such as semantic model row-level security (RLS), Microsoft Purview Information Protection policies, and Purview Data Loss Prevention policies **are not** enforced on data that crosses organization boundaries. Rather, it is the policies defined in the consumer's tenant that are enforced on the incoming share, the same way that they are enforced on any data within that tenant.

With this understanding in mind, be aware of the following:

* The sharer can't control who has access to the data in the consumer's tenant.

* The consumer can grant access to the data to anyone, even guest users from outside the consumer's organization.

* Data might be transferred across geographic boundaries when it is accessed within the consumer's tenant.

Sharing data with users outside your home tenant has implications for data security and privacy that you should consider. It's important to understand the underlying flows of data sharing to better evaluate these implications.

Data is shared across tenants using Fabric-internal security mechanisms. The share security mechanism grants read-only access to **any user** within the home tenant of the user that was invited to accept the share. Data is shared “in-place”. No data is copied, and it isn't even accessed until the someone in the receiving tenant executes a Fabric workload over the shared data. Fabric evaluates and enforces Entra-ID-based roles and permissions locally, within the tenant they're defined in. This means that access control policies defined in the sharer's tenant, such as semantic model row-level security (RLS), Microsoft Purview Information Protection policies, and Purview Data Loss Prevention policies **are not** enforced on data that crosses organization boundaries. Rather, it is the policies defined in the consumer's tenant that are enforced on the incoming share, the same way that they are enforced on any data within that tenant.

With this understanding in mind, be aware of the following:

* The sharer can't control who has access to the data in the consumer's tenant.

* The consumer can grant access to the data to anyone, even guest users from outside the consumer's organization.

* Data might be transferred across geographic boundaries when it is accessed within the consumer's tenant.

## Considerations and limitations

* **Shortcuts:** Shortcuts contained in folders that are shared via external data sharing won't resolve in the consumer tenant.

* **Billing:** The cost of read operations is billed to the data provider. The expected behavior is to bill the provider for storage-related costs, and the consumer for read-related costs.

* **[Security]** **Invitations:** External data share invitation can be forwarded to other users within the same tenant and can be accepted more than once. In the future, invitations will be usable only once and scoped to a specific user. Only that user will be able to accept the invitation. Any user with permission to access the lakehouse in which the share was accepted will be able to read the data.

* **[Security]** **Admin control:** The tenant admin switch that specifies which users can accept external data shares is enforced via the user interface. Validation will be added to all layers of the system before this the external data sharing feature is released publicly.

## Related content

* [Create and manage external data shares](./external-data-sharing-create.md)
* [Accept an external data share](./external-data-sharing-accept.md)
* [Manage external data shares](./external-data-sharing-manage.md)
* [Fabric admins: Set up external data sharing on your tenant](./external-data-sharing-enable.md)
