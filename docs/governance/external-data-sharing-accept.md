---
title: External data sharing
description: Learn about sharing data with external users.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 03/19/2024
---

# External data sharing

Fabric external data sharing is a feature that enables Fabric users to share data from their tenant (hearafter referred to as the provider tenant) with users in another Fabric tenant (hereafter referred to as the consuming tenant). The data is shared *in-place* from [OneLake](../onelake/onelake-overview.md) storage locations in the provider tenant, meaning that no data is actually copied to the consuming tenant. Rather, this cross-tenant sharing creates a [OneLake shortcut](../onelake/onelake-shortcuts.md) in the consuming tenant that points back to the original data. Data that is shared across tenant boundaries is exposed to users in the consuming tenant as read-only, and may be consumed by any OneLake compatible Fabric workload in that tenant.

:::image type="content" source="./media/external-data-sharing-accept/image1.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

## How does external data sharing work

As a prerequisite to external data sharing Fabric admins need to turn on external data sharing both in the provider tenant and in the consumer tenants. Enabling external data sharing includes specifying who can create and accept external data shares. For more information, see XXX.

Users who are allowed to create external data shares can share data residing in tables or files within supported Fabric items (currently, [lakehouses](../data-engineering/lakehouse-overview.md) and [KQL databases](../real-time-analytics/create-database.md)), as long as they have the standard Fabric read and reshare permissions for an item. The user creating the share invites a user from another tenant to accept the external data share. This user receives a link that can be used to accept the share. Upon accepting the share, the recipient chooses a lakehouse in which a shortcut to the provider’s data will be created.

> [!NOTE]
> Cross-tenant data access is enabled via a dedicated Fabric-to-Fabric authentication mechanism and does not require [Entra B2B guest user access](/power-bi/enterprise/service-admin-azure-ad-b2b).

## Security Considerations

Sharing data with users outside of your home tenant has some inherent security and data privacy implications that should be taken into consideration.

It is important to understand the underlying flows of data sharing to better evaluate the security considerations. Data is shared across tenants using Fabric internal security mechanisms. The share security mechanism grants read-only access to **any user** within the home tenant of the user that was invited to accept the share. Data is shared “in-place”. No data is copied or even accessed until the consumer executes as Fabric workload over the shared data. Fabric evaluates and enforces local Entra ID based roles and permissions within the tenant they are defined in. Access control policies defined in the providers' tenant, such as semantic model row-level security (RLS), Microsoft Purview Information Protection policies, and Purview Data Loss Prevention policies are not enforced on data that crosses organization boundaries. Policies defined in the consumer's tenant are enforced on the incoming share the same way they are enforced over any data within that tenant.

With this understanding in mind, be aware of the following:

* The provider cannot enforce who has access to the data in the consumer's tenant.
* The consumer may grant access to this data to anyone, even with guest users from outside the consumer's organization.
* Data may be transferred across geographic boundaries when it is accessed within the consumer's tenant.

## Known Issues

* **Shortcuts:** Shortcuts contained within folders that are shared via external data sharing will not be resolved in the consumer tenant. 
* **Billing:** The cost of read operations will be billed to the data provider. The expectation is to bill the provider for storage related costs and bill the consumer for read related costs.
* **[Security]** **Invitations:** Invitations may be forwarded to other users within the same tenant and may be accepted more than once. In the future, invitations will be usable only once and scoped to a specific user. Only that user will be able to accept the invitation. Any user with permission to access the lakehouse in which the share was accepted will be able to read the data.
* **[Security]** **Admin control:** The tenant admin switch that specifies which users may accept shares is enforced via the user interface. The validation will be added to all layers of the system before this feature is released publicly.

We are working to resolve these issues as soon as possible.

## Appendix A – Power BI B2B sharing

Power BI supports the [sharing of semantic models](https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-dataset-external-org-share-admin) (FKA datasets) with Entra B2B guest users. This feature has been in preview for some time and has not yet been made generally available. Currently, the new Fabric OneLake external sharing feature and the existing external semantic model feature are not related. In time, we will work to unify these solutions.

Shares may be deleted by the consumer or revoked by the provider at any time.

## Share data with a user in another Fabric tenant

1. In a workspace or in the OneLake data hub, find the supported Fabric item that contains the data that you want to share.

1. Open the context menu of the selected item and choose **External data share (preview)**.

    :::image type="content" source="./media/external-data-sharing-accept/image4.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

1. In the **New external data share** dialog that opens, choose the folder or table to be shared and select **Save and continue**.

    :::image type="content" source="./media/external-data-sharing-accept/image5.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
1. Enter the email address of the user you want to share the data with and select Send. An email will be sent to the user inviting them to accept the invitation to share. Alternatively, you can select Copy link and then paste it into an email that you yourself compose.

:::image type="content" source="./media/external-data-sharing-accept/image6.png" alt-text="Illustration of a cross-tenant OneLake data share.":::
 
The consumer will now be able to accept the share and access the data within their tenant.

## Prerequisites

Before you can get started with creating or accepting shares, the private preview must be enabled in your tenant. To enable the private preview, you will need:

1. Microsoft tenant with at least one [Fabric enabled capacity](../admin/fabric-switch.md). 
1. Fabric admin with permission to enable tenant switch.
1. Lakehouse or KQL Database with at least one folder or table.

Once you have these things setup, please send your tenant id to your Microsoft account contact so that the private preview can be enabled for your tenant.

## Admin Settings

Once the tenant has been added to the private preview, the tenant admin must enable the sharing feature for all or a specific group of users.

Navigate to the Fabric admin portal by clicking on the settings icon on the top right of the screen, then click on the “Admin portal” link on the bottom of the settings blade.  Scroll down within the “Tenant settings” blade to the “Export and sharing settings”. To allow users to share data within a tenant, enable the “External data sharing (preview)” setting.

:::image type="content" source="./media/external-data-sharing-accept/image2.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

To allow users to accept shares into an organization enable the “Allow users to accept external data shares (preview)” setting.

:::image type="content" source="./media/external-data-sharing-accept/image3.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

## Share data

In the provider’s tenant, navigate to a workspace or the OneLake Data Hub and select an existing Lakehouse or KQL Database that contains data that you would like to share. Click on the context menu of the selected item and click “External data share (preview)”.

:::image type="content" source="./media/external-data-sharing-accept/image4.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

This will open a dialog with the OneLake explorer. Select the folder or table to be shared and click “Save and continue”.

:::image type="content" source="./media/external-data-sharing-accept/image5.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

Enter the email address of the user you want to invite and click Copy link. (The ability to send an email directly from this dialog will be available within the next few weeks.) Copy the link and send it to the consumer.

:::image type="content" source="./media/external-data-sharing-accept/image6.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

The consumer will now be able to accept the share and access the data within their tenant.

## Accept Share

To accept a share, click the share link or paste the URL in a browser. This will navigate to a dialog that displays the name of the share and the data provider’s tenant details.

:::image type="content" source="./media/external-data-sharing-accept/image7.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

Click “Accept and select a location”. This will navigate to the OneLake data hub. Select a Lakehouse, click “Next”, select the table or folder location in which to create the incoming share shortcut, and then click “Apply”.

:::image type="content" source="./media/external-data-sharing-accept/image8.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

The share has now been created in the consumer’s OneLake location. The data within this share location can be consumed using any Fabric workload.

## Manage Shares

To view existing shares, navigate to the shared Lakehouse or KQL Database within the workspace view or the OneLake data hub, click on the context menu, and then click “Manage permissions”

:::image type="content" source="./media/external-data-sharing-accept/image9.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

Navigate to the “External data shares” tab to view a list of external shares for this item. Hover over the share id, to view the revoke icon. Shares may be revoked at any time.

:::image type="content" source="./media/external-data-sharing-accept/image10.png" alt-text="Illustration of a cross-tenant OneLake data share.":::

## Security Considerations

Sharing data with users outside of your home tenant has some inherent security and data privacy implications that should be taken into consideration. 

It is important to understand the underlying flows of data sharing to better evaluate the security considerations. Data is shared across tenants using Fabric internal security mechanisms. The share security mechanism grants read-only access to any user within the home tenant of the user that was invited to accept the share. Data is shared “in-place”. No data is copied or even accessed until the consumer executes as Fabric workload over the shared data. Fabric evaluates and enforces local Entra Id based roles and permissions within the tenant they are defined. Access control policies defined in the providers' tenant such as Semantic model row level security (RLS), Microsoft Purview Information Protection (MIP) policies, and Purview Data Loss Prevention policies will not be enforced on the data that crosses organization boundaries. Policies defined within the consumer's tenant will be enforced over the incoming share the same way they are enforced over any data within that tenant. 

With this understanding in mind, be aware of the following:

* The provider cannot enforce who has access to the data within the consumer’s tenant.
* The consumer may grant access to this data with anyone, even with guest users from outside of the consumer's organization.
* Data may be transferred across geographic boundaries when it is accessed within the consumer's tenant. 

## Known Issues

* **Shortcuts:** Shortcuts contained within folders that are shared via external data sharing will not be resolved in the consumer tenant. 
* **Billing:** The cost of read operations will be billed to the data provider. The expectation is to bill the provider for storage related costs and bill the consumer for read related costs.
* **[Security]** **Invitations:** Invitations may be forwarded to other users within the same tenant and may be accepted more than once. In the future, invitations will be usable only once and scoped to a specific user. Only that user will be able to accept the invitation. Any user with permission to access the lakehouse in which the share was accepted will be able to read the data.
* **[Security]** **Admin control:** The tenant admin switch that specifies which users may accept shares is enforced via the user interface. The validation will be added to all layers of the system before this feature is released publicly.

We are working to resolve these issues as soon as possible.

## Appendix A – Power BI B2B sharing

Power BI supports the [sharing of semantic models](https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-dataset-external-org-share-admin) (FKA datasets) with Entra B2B guest users. This feature has been in preview for some time and has not yet been made generally available. Currently, the new Fabric OneLake external sharing feature and the existing external semantic model feature are not related. In time, we will work to unify these solutions.

## Related content

* [Domain management tenant settings](../admin/service-admin-portal-domain-management-settings.md)
* [Microsoft Fabric REST Admin APIs for domains](/rest/api/fabric/admin/domains)
* [Admin role in workspaces](../get-started/roles-workspaces.md)
