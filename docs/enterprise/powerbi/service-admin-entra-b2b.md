---
title: Distribute Power BI Content to External Guest Users with Microsoft Entra B2B
description: "Learn how to share Power BI content with external guest users through Microsoft Entra B2B collaboration. Configure invitations, manage licensing, and enable secure external sharing."
author: dknappettmsft
ms.author: daknappe
ms.service: powerbi
ms.subservice: powerbi-admin
ms.topic: how-to
ms.date: 11/03/2025
LocalizationGroup: Administration
---

# Distribute Power BI content to external guest users with Microsoft Entra B2B

Power BI enables sharing content with external guest users through Microsoft Entra Business-to-Business (Microsoft Entra B2B). By using Microsoft Entra B2B, your organization enables and governs sharing with external users in a central place.

Another way to share content with external guest users is in-place semantic model sharing with Power BI. This method allows you to share content with external guest users that they can then access in their own home tenant. For more information about in-place semantic model sharing, see [About Power BI in-place semantic model sharing with guest users in external organizations](/power-bi/collaborate-share/service-dataset-external-org-share-about).

## Enable the "invite external users to your organization" setting

Make sure you enable the [Invite external users to your organization](../../admin/service-admin-portal-export-sharing.md) feature in the Power BI admin portal before inviting guest users. Even when this option is enabled, the user must be granted the Guest Inviter role in Microsoft Entra ID to invite guest users.  

> [!NOTE]
> The [Invite external users to your organization](../../admin/service-admin-portal-export-sharing.md) setting controls whether Power BI allows inviting external users to your organization. After an external user accepts the invite, they become a Microsoft Entra B2B guest user in your organization. They appear in people pickers throughout the Power BI experience. If you disable the setting, existing guest users in your organization continue to have access to any items they already had access to and continue to be listed in people picker experiences. Additionally, if you add guests through the [planned invite](#send-planned-invites) approach, they also appear in people pickers. To prevent guest users from accessing Power BI, use a Microsoft Entra Conditional Access policy.

## Who can you invite?

Most email addresses are supported for guest user invitations, including personal email accounts like gmail.com, outlook.com, and hotmail.com. Microsoft Entra B2B calls these addresses *social identities*.

> [!NOTE]
> In Microsoft Entra ID, external users can be set to UserType Member. In Power BI, support for UserType Member is currently in preview. Microsoft Purview Information Protection isn't supported for external members. Admins in the provider tenant shouldn't enable information protection for external members. In some situations, external members might see errors during their first sign-in attempt on the provider tenant. To unblock these external members, grant them permission to a Power BI item, such as a workspace, semantic model, or report, and then have them sign in again.

## Invite guest users

Guest users only need invitations the first time you invite them to your organization. To invite users, use planned or ad hoc invites.

To use ad hoc invites, use the following capabilities:

- Report and Dashboard sharing
- Report and Dashboard subscriptions
- App access list

The workspace access list doesn't support ad hoc invites. Use the [planned invites approach](#send-planned-invites) to add these users to your organization. After the external user becomes a guest in your organization, add them to the workspace access list.

### Send planned invites

Use a planned invite if you know which users to invite. You can send the invites through the Azure portal or PowerShell. You must be assigned the user admin role to invite people.

Follow these steps to send an invite in the Azure portal.

1. In the [Azure portal](https://portal.azure.com), select the Menu button, then select **Microsoft Entra ID**.
1. Under **Manage**, select **Users** > **All users** > **New guest user**.

    :::image type="content" source="media/service-admin-entra-b2b/entra-portal-new-guest-user.png" alt-text="Screenshot of the Azure portal with the New guest user option called out.":::
  
1. Scroll down and enter an **email address** and **personal message**.

    :::image type="content" source="media/service-admin-entra-b2b/entra-portal-invite-message.png" alt-text="Screenshot of the New Guest User dialog with the email and message fields called out.":::

1. Select **Invite**.

To invite more than one guest user, use PowerShell or create a bulk invite in Microsoft Entra ID. To use PowerShell for the bulk invite, follow the steps in [Tutorial: Use PowerShell to bulk invite Microsoft Entra B2B collaboration users](/entra/external-id/bulk-invite-powershell). To use the Azure portal for the bulk invite, follow the steps in [Tutorial: Bulk invite Microsoft Entra B2B collaboration users](/entra/external-id/tutorial-bulk-invite).

The guest user must select **Get Started** in the email invitation they receive. The guest user is then added to the organization.

:::image type="content" source="media/service-admin-entra-b2b/guest-user-invite-email.png" alt-text="Screenshot of the Guest user email invitation with Get Started called out.":::

### Send ad hoc invites

To invite an external user at any time, add them to your dashboard or report through the share feature or to your app through the access page. Here's an example of what to do when inviting an external user to use an app.

:::image type="content" source="media/service-admin-entra-b2b/power-bi-app-access.png" alt-text="Screenshot of an external user added to the App access list in Power BI.":::

The guest user gets an email indicating that you shared the app with them.

:::image type="content" source="media/service-admin-entra-b2b/guest-user-invite-email-2.png" alt-text="Screenshot of the email that guest user receives when the app has been shared.":::

The guest user must sign in with their organization email address. They receive a prompt to accept the invitation after signing in. After they sign in, the app opens for the guest user. To return to the app, they should bookmark the link or save the email.

## Discoverability for B2B content

### Tenant switcher

If you have access to more than one tenant, you can switch between tenants by using the tenant switcher.

1. Select your profile picture to open your account manager and choose **Switch**.

   :::image type="content" source="media/service-admin-entra-b2b/tenant-switcher-link.png" alt-text="Screenshot of the tenant switcher link in the Fabric account manager pane.":::

1. In the **Switch tenant (preview)** dialog, open the dropdown menu and choose the tenant you want to navigate to.

   :::image type="content" source="media/service-admin-entra-b2b/tenant-switcher-selector.png" alt-text="Screenshot of the tenant switcher selector where you can choose which tenant you want to switch to.":::

   > [!NOTE]
   > The dropdown list displays a maximum of 50 tenants.

### From external orgs tab

The discoverability for B2B content feature in Power BI makes it easy for consumers to access shared B2B content. Power BI users who are guest users in any other tenant have a tab on their home page (in their home tenant) called *From external orgs*. When you select the tab, it lists all the items shared with you from external tenants that you can access as a guest user. You can filter and sort through the list to find content easily, and see which organization is sharing a specific item with you. When you select an item on the tab, a new window opens and takes you to the relevant provider tenant where you can access the item.

:::image type="content" source="media/service-admin-entra-b2b/from-external-orgs-tab.png" alt-text="Screenshot of the Power BI home page with the From external orgs tab called out.":::

## Licensing

### Licensing requirements

The following tables list the licensing requirements for B2B access to Power BI based on the consumer's license type. The provider user type and workspace type determine what external consumers can access.

> [!NOTE]
> To invite guest users, you need a Power BI Pro or Premium Per User (PPU) license. Pro trial users can't invite guest users in Power BI.

#### Consumer with a *Free* license

External users with Free licenses have limited access to shared content. They can only access content from PPC workspaces when shared by licensed providers.

|**Provider user type**|**Pro workspace**|**PPU workspace**|**PPC workspace**|
|---|---|---|---|
|Free (All Workspaces)|❌|❌|❌|
|Pro/PPU/PPU Trial|❌|❌|✅|
|PPU User|❌|❌|✅|

#### Consumer with a *Pro* license

External users with Pro licenses can access content from Pro workspaces and PPC workspaces when shared by licensed providers, but cannot access PPU workspaces.

|**Provider user type**|**Pro workspace**|**PPU workspace**|**PPC workspace**|
|---|---|---|---|
|Free (All Workspaces)|❌|❌|❌|
|Pro/PPU/PPU Trial|✅|❌|✅|
|PPU User|❌|❌|✅|

#### Consumer with a *PPU* license

External users with PPU licenses have the broadest access and can consume content from Pro workspaces, PPU workspaces, and PPC workspaces when shared by licensed providers.

|**Provider user type**|**Pro workspace**|**PPU workspace**|**PPC workspace**|
|---|---|---|---|
|Free (all workspaces)|❌|❌|❌|
|Pro/PPU/PPU trial|✅|❌|✅|
|PPU user|❌|✅|✅|

- **Free (all workspaces)**: Provider is a user with a Free license. These workspaces have no paid features and are limited to basic sharing.
- **Pro/PPU/PPU trial**: Provider is a user with a Pro license, PPU license, or PPU trial. This typically applies to Pro workspaces or PPC workspaces created by these users.
- **PPU user**: Provider is a user with an active PPU license (not a trial). This applies to PPU workspaces, which include advanced per-user premium capabilities.

### Steps to address licensing requirements

As noted previously, the guest user must have the proper licensing in place to view the content that you shared. To make sure the user has a proper license, use one of the following options:

- Use Power BI Premium capacity.
- Assign a Power BI Pro or a Premium Per User (PPU) license.
- Use a guest's Power BI Pro or PPU license.

#### Use Power BI Premium capacity

Assigning the workspace to [Power BI Premium capacity](service-premium-what-is.md) lets the guest user use the app without requiring a Power BI Pro license; only a Fabric Free license is necessary. Power BI Premium also lets apps take advantage of other capabilities like increased refresh rates and large model sizes.

#### Assign a Power BI Pro or Premium Per User (PPU) license to guest user

Assigning a Power BI Pro or PPU license from your organization to a guest user lets that guest user view content shared with them. For more information about assigning licenses, see [Assign licenses to users on the Licenses page](/office365/admin/manage/assign-licenses-to-users#assign-licenses-to-users-on-the-licenses-page). Before assigning Pro or PPU licenses to guest users, consult the [Product Terms site](https://www.microsoft.com/licensing/terms) to ensure you're in compliance with the terms of your licensing agreement with Microsoft.

#### Guest user brings their own Power BI Pro or Premium Per User (PPU) license

The guest user might already have a Power BI Pro or PPU license that their own organization assigned to them.

To help allowed guests sign in to Power BI, provide them with the Tenant URL. To find the tenant URL, follow these steps.

1. In the Power BI service, in the header menu, select help (**?**), then select **About Power BI**.
1. Look for the value next to **Tenant URL**. Share the tenant URL with your allowed guest users.

    :::image type="content" source="media/service-admin-entra-b2b/power-bi-about-dialog.png" alt-text="Screenshot of the About Power BI dialog with the guest user Tenant URL called out.":::

## Cross-cloud B2B

You can use Power BI's B2B capabilities across Microsoft Azure clouds by configuring Microsoft cloud settings for B2B collaboration. Read [Microsoft cloud settings](/entra/external-id/cross-tenant-access-overview#microsoft-cloud-settings) to learn how to establish mutual B2B collaboration between the following clouds:

- Microsoft Azure global cloud and  Microsoft Azure Government
- Microsoft Azure global cloud and Microsoft Azure operated by 21Vianet 21Vianet

Be aware of these limitations to the B2B experience:

- Guest users might already have a Power BI license that their organization assigned to them. But "Bring your own license" doesn't work across different Microsoft Azure clouds for B2B guest users. The provider tenant must assign a new license to these guest users.
- You can't invite new external users to the organization through Power BI sharing, permissions, and subscription experiences.
- On the Home page, the "From external orgs" tab doesn't list content shared from other clouds.
- Cross-cloud sharing doesn't work when sharing with a security group. For example, if a user in a national cloud invites a security group from the public cloud or vice versa, access isn't granted. This limitation exists because the service can't resolve the members of these groups across clouds.

## Admin info for B2B collaboration

Power BI tenant level settings give admins control over B2B collaboration. For more information, see [Export and sharing admin settings](../../admin/service-admin-portal-export-sharing.md). The following settings are available:

- [Guest users can access Microsoft Fabric](../../admin/service-admin-portal-export-sharing.md#guest-users-can-access-microsoft-fabric)
  - [Users can invite guest users to collaborate through item sharing and permissions](../../admin/service-admin-portal-export-sharing.md#users-can-invite-guest-users-to-collaborate-through-item-sharing-and-permissions)
  - [Guest users can browse and access Fabric content](../../admin/service-admin-portal-export-sharing.md#guest-users-can-browse-and-access-fabric-content)
  - [Users can see guest users in lists of suggested people](../../admin/service-admin-portal-export-sharing.md#users-can-see-guest-users-in-lists-of-suggested-people)

Microsoft Entra ID settings limit what external guest users can do within your organization. Those settings also apply to your Power BI environment. For more information, see:

- [Manage External Collaboration Settings](/entra/external-id/external-collaboration-settings-configure#configure-b2b-external-collaboration-settings)
  - [Allow or block invitations to B2B users from specific organizations](/entra/external-id/allow-deny-list)
  - [Use Conditional Access to allow or block access](/entra/identity/conditional-access/concept-conditional-access-cloud-apps)

To use in-place semantic model sharing, tenant admins need to enable the following settings:

- [Guest users can work with shared semantic models in their own tenants](/power-bi/collaborate-share/service-dataset-external-org-share-admin#guest-users-can-work-with-shared-semantic-models-in-their-own-tenants)
- [Allow specific users to turn on external data sharing](/power-bi/collaborate-share/service-dataset-external-org-share-admin#allow-specific-users-to-turn-on-external-data-sharing)

## Considerations and limitations

- Information protection: See [Sensitivity labels in Fabric and Power BI: Considerations and limitations](./service-security-sensitivity-label-overview.md#considerations-and-limitations).
- Some experiences aren't available to guest users even when they have higher-level permissions. To update or publish reports, guest users need to use the Power BI service, including Get Data, to upload Power BI Desktop files. The following experiences aren't supported:
  - Direct publishing from Power BI desktop to the Power BI service
  - Guest users can't use Power BI desktop to connect to service semantic models or dataflows in the Power BI service
  - Sending ad hoc invites isn't supported for workspace access lists
  - Guest users can't install a Power BI Gateway and connect it to your organization
  - Guest users can't install apps published to the entire organization
  - Guest users can't use Analyze in Excel
  - Guest users can't be @mentioned in commenting
  - Guest users who use this capability should have a work or school account
- Guest users using social identities experience more limitations because of sign-in restrictions.
  - They can use consumption experiences in the Power BI service through a web browser
  - They can't use the Power BI Mobile apps
  - They can't sign in where a work or school account is required
- This feature isn't currently available with the Power BI SharePoint Online report web part.
- If you share directly to a guest user, Power BI sends them an email with the link. To avoid sending an email, add the guest user to a security group and share to the security group.
- If you disable the **Guest users can browse and access Fabric content** tenant setting, guest users continue to have any workspace role and item permissions that you previously granted or grant in the provider environment. For more information, see the [Guest users can browse and access Fabric content](../../admin/service-admin-portal-export-sharing.md#guest-users-can-browse-and-access-fabric-content) tenant setting.  
- External users invited via identities, such as Microsoft Account or Mail, might see their UPN displayed in Power BI differently from the UPN in Microsoft Entra ID. This difference could imply some changes to be done on the row-level security.
  - For example: The email `ABC@abc.com` is a guest via Microsoft Identity, and the UPN in Microsoft Entra shows as `ABC#EXT@abc.com`. But in Power BI, it shows as `Live#ABC#EXT@abc.com`.

## Related content

- For information about Microsoft Entra B2B, see [What is Microsoft Entra B2B collaboration?](/entra/external-id/what-is-b2b)
- For information about in-place semantic model sharing, see [Power BI in-place semantic model sharing with guest users in external organizations (preview)](/power-bi/collaborate-share/service-dataset-external-org-share-about).
- For information about government clouds, see [Power BI for US Government](service-government-us-overview.md).


