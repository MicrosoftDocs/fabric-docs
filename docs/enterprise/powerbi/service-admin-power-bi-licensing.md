---
title: Power BI Licensing Guide for Organizations
description: "Learn how to purchase, assign, and manage Power BI Pro and Premium Per User licenses for your organization. Includes self-service options and Microsoft 365 integration."
author: dknappettmsft
ms.author: daknappe
ms.service: powerbi
ms.subservice: powerbi-admin
ms.topic: how-to
ms.date: 11/20/2025
ms.custom: licensing support
LocalizationGroup: Administration
#customer intent: As an admin, I need a comprehensive guide to understand, purchase, and manage Power BI licenses for my organization.
---

# Power BI licensing guide for organizations

This article is for administrators and explains how to acquire and manage Power BI licenses for your organization. It covers purchasing licenses, assigning them to users, managing self-service options, and handling special scenarios.

> [!NOTE]
> The Power BI service is available as a standalone service and as one of the services that's integrated with [Microsoft Fabric](/fabric/get-started/microsoft-fabric-overview). Administration and licensing of the Power BI service is now integrated with Microsoft Fabric.

To learn about license types, including Pro and Premium Per User (PPU), see [Licensing for Fabric and Power BI](/power-bi/fundamentals/service-features-license-type).

## Licenses and subscriptions overview

Fabric and the Power BI service are both SaaS platforms and require licenses and at least one capacity subscription.

### Power BI licenses

Use of the Power BI service requires a license and a capacity.

- **Per user license** - Per user licenses allow users to work in the Power BI service. The options are Fabric (Free), Pro, and Premium Per User (PPU). For more information, see [Per user license](/power-bi/fundamentals/service-features-license-type#power-bi-service-licenses).

- **Capacity subscription** - There are two types of Power BI subscriptions for organizations: standard and Premium. Premium provides enhancements to Power BI and a comprehensive portfolio of [Premium features](service-premium-features.md). Power BI Premium is a tenant-level Microsoft 365 subscription, available in a choice of SKUs (Stock Keeping Units).

Each Microsoft 365 E5 subscription includes standard capacity and a Pro license.

### Fabric licenses

To access the Fabric SaaS platform, you need a license and a capacity.

- **Per user license** - Per user licenses grant users the ability to work in Fabric. The available options are Fabric (Free), Pro, and Premium Per User (PPU). The two Power BI licenses apply to using the Power BI workload in Fabric. For more information, see [Per user license](/fabric/enterprise/licenses#per-user-licenses).

- **Capacity license** - An organizational license that provides a pool of resources for Fabric operations. Capacity licenses are divided into stock keeping units (SKUs). Each SKU provides a different number of capacity units (CUs) which are used to calculate the capacity's compute power. You can purchase or trial Fabric capacities. For more information, see [Capacity license](/fabric/enterprise/licenses#capacity-license).

## Admin roles for licensing

Different admin roles have different permissions for purchasing and managing Power BI licenses. Understanding these roles helps you determine who can perform specific licensing tasks in your organization.

### Roles for purchasing licenses and subscriptions

You must belong to the Billing admin role to purchase or assign licenses for your organization. Assign admin roles from the Microsoft Entra admin center or the Microsoft 365 admin center. For more information about admin roles in Microsoft Entra ID, see [View and assign administrator roles in Microsoft Entra ID](/azure/active-directory/users-groups-roles/directory-manage-roles-portal). To learn more about admin roles in Microsoft 365, including best practices, see [About admin roles](/microsoft-365/admin/add-users/about-admin-roles).

### Roles for managing licenses and subscriptions

After purchasing licenses and subscriptions, License or User admins can manage licenses for an organization. For details about these admin roles, see [Admin roles](/fabric/admin/microsoft-fabric-admin#microsoft-365-admin-roles).

## Get Power BI licenses for your organization

Users can get a license in two ways: from an administrator or by using self-service. Billing administrators can sign up for the Power BI service and Fabric. After signing up and purchasing a subscription or a free trial, Billing, License, and User administrators assign licenses to users in their organization.

> [!TIP]
> If you're ready to make a purchase, use these links to find up-to-date pricing information:
>
> - [Power BI Pricing & product comparison](https://powerbi.microsoft.com/pricing/)
> - [Pricing options for Fabric](/fabric/enterprise/buy-subscription)

### Purchase options

Choose the option that best fits your organization's needs:

1. **Purchase a Fabric subscription** - [Purchase a Fabric subscription](/fabric/enterprise/buy-subscription) that includes Power BI. If you're ready to purchase, your options include bulk purchasing for your organization or enabling your users to upgrade their own licenses. After you purchase a Fabric subscription, [enable Fabric for your organization](/fabric/admin/fabric-switch).

1. **Purchase Power BI licenses** - Power BI Pro is included in Microsoft 365 E5. Otherwise, you can purchase Pro or PPU licenses from the [Microsoft pricing site](https://powerbi.microsoft.com/pricing/), through Microsoft 365, or through a Microsoft partner. After your purchase, you can assign licenses to individual users or use self-service.

1. **Use the sign-up wizard** - Go directly to the [sign-up wizard for Power BI Pro](https://go.microsoft.com/fwlink/?LinkId=2106428&clcid=0x409&cmpid=pbidocs-purchasing-power-bi-pro).

1. **Start a Fabric trial** - [Start a free 60-day Fabric trial for your organization](/fabric/get-started/fabric-trial). The trial includes a trial capacity, 1 TB of storage, and access to all of the Fabric experiences and features.

1. **Get free licenses** - The Fabric (Free) license doesn't include a Fabric capacity but includes access to the paid features of the Power BI service. Sign up on app.fabric.microsoft.com.

1. **Start a Power BI Pro trial** - [Start a free 30-day trial of Power BI Pro](service-admin-signing-up-for-power-bi-with-a-new-office-365-trial.md). The trial includes up to 25 licenses. When the trial expires, you receive a charge for the licenses.

### Purchase licenses in Microsoft 365

To purchase Power BI paid licenses in the Microsoft 365 admin center:

1. Using your administrator account, sign in to the [Microsoft 365 admin center](https://admin.microsoft.com).
1. On the navigation menu, select **Home**, then select **Subscriptions** > **Add more products**.
1. In the **View by category** section, search for **Power BI**.
1. Scroll to the license you want to purchase, and select **Details**.

    :::image type="content" source="media/service-admin-purchasing-power-bi-pro/power-bi-microsoft-365-purchases.png" alt-text="Screenshot of the Power BI options for Purchase services.":::

1. Select the number of licenses you need and whether you want to be charged monthly or yearly.
1. Select **Buy**.
1. Complete the **Checkout** page and place your order.
1. To verify your purchase, on the navigation menu, select **Billing**, then select **Your Products**.

> [!NOTE]
> To receive an invoice instead of using a credit card or bank account, work with your Microsoft Reseller or go through the Volume Licensing Service Center to add or remove licenses. For more information, see [Manage subscription licenses](/microsoft-365/commerce/licenses/buy-licenses).

## Assign licenses to users

After purchasing licenses, you need to assign them to users in your organization. You can assign licenses from either the Microsoft 365 admin center or the Azure portal.

### Assign licenses from Microsoft 365 admin center

To assign licenses to users, from **Billing**, select **Licenses**, and **Power BI Pro** or **Power BI Premium Per User**. For detailed information about assigning licenses from the Microsoft 365 admin center, see [Assign Microsoft 365 licenses to users](/microsoft-365/admin/manage/assign-licenses-to-users).

For guest users, see [Use the licenses page to assign licenses to users](/microsoft-365/admin/manage/assign-licenses-to-users#assign-licenses-by-using-the-licenses-page). Before assigning paid licenses to guest users, contact your Microsoft account representative to make sure you're in compliance with the terms of your agreement.

### Assign licenses from the Azure portal

Follow these steps to assign Power BI licenses to individual user accounts:

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. Search for and select **Microsoft Entra ID**.
   :::image type="content" source="media/service-admin-purchasing-power-bi-pro/fabric-assign-licenses.png" alt-text="Screenshot of the selection for Microsoft Entra ID.":::
1. In the navigation pane, under **Manage**, select **Licenses**.
1. Select **Manage** again and choose **All products**.
1. Select the name of your product (for example, **Power BI Premium Per User** or **Power BI Pro**) and then choose **+ Assign**.
1. On the **Assign license** page, select a user, or select **+ Add users and groups**. Select one or more users from the list.
1. Select **Assignment options** and set the required options to **On**.
1. Select **Review + Assign**, and then select **Assign**.

### View existing licenses

To see which users in your organization already have a license:

- In the Microsoft 365 admin center, go to **Billing** > **Licenses** to view all your organization's licenses by product.
- To view licenses assigned to specific users, go to **Users** > **Active users**, and select a user to view their assigned licenses.

For more information, see [Assign or unassign licenses for users](/microsoft-365/admin/manage/assign-licenses-to-users).

## Self-service sign-up and purchasing

Billing administrators can enable or disable self-service sign-up. As a billing administrator, you also decide whether users in your organization can make self-service purchases to get their own license.

If you give users permissions, they can get one of the organization's licenses by signing in to Power BI (app.powerbi.com) or Fabric (app.fabric.microsoft.com). When a user signs in, they automatically receive a license.

Turning off self-service sign-up prevents users from exploring Power BI for data visualization and analysis. If you block individual sign-up, you might want to get Fabric (Free) licenses for your organization and assign them to all users.

Turning off self-service purchase prevents users from performing actions that require a paid license. These actions include sharing, exporting, and creating workspaces for collaboration.

> [!NOTE]
> If you acquired Power BI through a Microsoft Cloud Solution Provider (CSP), the settings might be disabled to block users from signing up individually. Your CSP can act as the admin for your organization, so you need to contact them to help you change this setting.

Consider the following scenarios to help you decide whether self-service options are appropriate for your organization.

### When to use self-service

**Use self-service when:**

- Your large and decentralized organization (work or school) gives individuals the flexibility to try or purchase SaaS (Software as a service) licenses for their own use.
- Your one-person or small organization purchases only one or a few Power BI Pro licenses.
- Individuals want to try Power BI and become proficient before purchasing a subscription for the entire organization.
- Current users with a free license want to create and share content and upgrade to a 60-day trial of the paid features of Power BI.
- Current users with a free license want to start a free trial of a Fabric capacity.

**Disable self-service when:**

- Your organization has procurement processes that meet compliance, regulatory, security, and governance needs. Ensure that all licenses are approved and managed according to defined processes.
- Your organization has requirements for new Power BI Pro or Premium Per User licensees, such as mandatory training or user acknowledgment of data protection policies.
- Your organization prohibits use of Fabric or the Power BI service due to data privacy or other concerns and needs to closely control the assignment of Fabric (Free) licenses.
- You want to ensure that all Power BI Pro or Premium Per User licenses fall under an enterprise agreement that takes advantage of a negotiated or discounted licensing rate.
- Current users with a Fabric (Free) license are prompted to try or directly purchase a Fabric Pro license. Your organization might not want these users to upgrade because of security, privacy, or expense.

### Enable and disable self-service

For instructions on how to enable and disable self-service sign-up and purchasing, see:

- [Manage self-service purchases and trials](/microsoft-365/commerce/subscriptions/manage-self-service-purchases-admins)
- [Manage self-service license requests in the Microsoft 365 admin center](/microsoft-365/commerce/licenses/manage-license-requests)
- [Manage self-service sign-up subscriptions in the Microsoft 365 admin center](/microsoft-365/commerce/subscriptions/manage-self-service-signup-subscriptions)
- [How to combine self-service settings](/fabric/admin/service-admin-portal-help-support#users-can-try-microsoft-fabric-paid-features)

## Special scenarios

The following sections cover special licensing scenarios that may apply to your organization.

### Guest user licenses

You might want to distribute content to users who are outside of your organization. You can share content with external users by inviting them to view content as a guest. Microsoft Entra Business-to-business (Microsoft Entra B2B) enables sharing with external guest users.

Prerequisites:

- You must enable the ability to share content with external users.
- The guest user must have the proper licensing in place to view the shared content.

#### Licensing requirements for external sharing

To share Power BI content with external users:

- **The sharer** needs a Power BI Pro or Premium Per User (PPU) license to share content outside the organization.
- **The external guest user** needs one of the following:
  - A Power BI Pro or PPU license (either from their own organization or assigned by your organization), OR
  - Only a Fabric (Free) license if the content is hosted in a Premium capacity (P SKU) or Fabric capacity (F64 or greater).

For more information about guest user access, see [Distribute Power BI content to external guest users with Microsoft Entra B2B](service-admin-entra-b2b.md).

### Microsoft 365 E5 subscriptions

Microsoft 365 E5 subscriptions include Power BI Pro licenses for your organization. When you purchase or already have a Microsoft 365 E5 subscription:

- Each E5 license includes one Power BI Pro license that you can assign to users.
- Power BI Pro licenses from E5 subscriptions are managed the same way as standalone Power BI Pro licenses.
- Assign these licenses through the Microsoft 365 admin center or Azure portal using the methods described in [Assign licenses to users](#assign-licenses-to-users).

For more information about managing your Microsoft 365 E5 subscription and licenses, see [Administration overview](/fabric/admin/admin-overview).

## License management tasks

After licenses are assigned, you may need to perform various ongoing management tasks to maintain your organization's licensing.

### Power BI license expiration

There's a grace period after a Power BI license expires. For licenses that are part of a volume license purchase, the grace period is 90 days. If you bought the license directly, the grace period is 30 days. For license trials, there's no grace period.

Power BI has the same license lifecycle as Microsoft 365. For more information, see [What happens to my data and access when my Microsoft 365 for business subscription ends](/microsoft-365/commerce/subscriptions/what-if-my-subscription-expires).

### Other license management tasks

Some common license management tasks include:

- Assign and manage licenses with [Microsoft 365](/microsoft-365/commerce/subscriptions/manage-self-service-purchases-users) and with the [Azure portal](#assign-licenses-from-the-azure-portal)
- [Remove or reassign a license, enable, disable a license](/microsoft-365/admin/manage/assign-licenses-to-users)
- [Cancel a trial](/fabric/get-started/fabric-trial)
- [Takeover a license or tenant](/microsoft-365/commerce/subscriptions/manage-self-service-purchases-admins)
- [Handle expiring trials](/microsoft-365/commerce/subscriptions/cancel-your-subscription)

## Considerations and limitations

Self-service purchase, subscription, and license management capabilities for Fabric and Power BI are available for commercial cloud customers. For more information, see [Self-service purchase FAQ](/microsoft-365/commerce/subscriptions/self-service-purchase-faq).

## Related content

- [Sign up for Power BI as an individual](/power-bi/fundamentals/service-self-service-signup-for-power-bi)
- [About self-service sign-up](/microsoft-365/admin/misc/self-service-sign-up)
- [Business subscriptions and billing documentation](/microsoft-365/commerce/)
- [Find Power BI users that are signed in](/power-bi/admin/service-admin-access-usage)
- [Try or buy a Microsoft 365 for business subscription](/microsoft-365/commerce/try-or-buy-microsoft-365)
- [What is Power BI administration?](/power-bi/admin/service-admin-administering-power-bi-in-your-organization)

More questions? [Try asking the Power BI Community](https://community.powerbi.com/)
