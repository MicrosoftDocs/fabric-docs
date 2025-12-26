---
title: Fabric and Power BI, end, close, cancel
description: Learn how to end a Microsoft Fabric or Power BI trial, cancel a subscription, and close an account in Fabric and Power BI. 
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.date: 03/06/2025
ms.custom: licensing support
LocalizationGroup: Get started

#customer intent: As a user or an admin, I want to know how to close my account, cancel my subscription, or end my trial in Microsoft Fabric and Power BI.
---

# Close your account, cancel your subscription, end your trial

You or your admin have options to close your account, cancel your subscription, or end your trial. Each of these actions has a different set of procedures and considerations. 

#### [End user](#tab/enduser)

Most canceling, closing, and expiry is handled by an administrator. But there are some tasks that you can do as an end user. Being able to do these tasks yourself is possible if you signed up as an individual and your account or subscription isn't managed by your organization. 

## Cancel a Power BI license trial

If you signed up for a trial of a paid Power BI license, you can cancel that trial. Open your Account manager and select **Cancel trial**.

:::image type="content" source="media/fabric-close-end-cancel/power-bi-cancel-trials-new.png" alt-text="Screenshot of the Account drop down showing the Cancel trial option.":::

## Cancel your license account

If you signed up for Power BI as an individual, and you don't want to use Power BI any longer, close your Power BI account. After you close your account, you can't sign in to Power BI. Also, as it states in the data retention policy in the [Power BI Service Agreement](https://azure.microsoft.com/support/legal/subscription-agreement/), Power BI deletes any customer data you uploaded or created.

1. In Power BI, select the gear icon in the upper right, then select **Settings**.

1. On the **General** tab, select **Close Account**.

    :::image type="content" border="true" source="media/fabric-close-end-cancel/close-account-settings-2.png" alt-text="Screenshot showing the Power BI settings menu. General and the close account menu options are highlighted.":::

1. Select a reason for closing the account. You can also provide further information. Then select **Close account**.

1. Confirm that you want to close your account.

    You should see a confirmation that Power BI closed your account. You can reopen your account from here if necessary.

If your organization signed you up for Power BI, contact your admin. Ask them to unassign the license from your account.

:::image type="content" border="true" source="media/fabric-close-end-cancel/close-account-managed.png" alt-text="Screenshot of the close account message for Managed Users.":::

## Cancel a Fabric capacity trial that you started

If you signed up for a Fabric trial capacity, you can cancel that trial. Open your Account manager and select **Cancel trial**.

#### [Admin](#tab/admin)

## Fabric: close, cancel, end

With Microsoft Fabric, you can end a Fabric capacity trial, cancel a capacity subscription, and close a Fabric account. 

## Fabric trial capacity

Fabric trial capacities can be canceled, be deleted, be purchased, and expire. 

### Cancel a Fabric trial capacity

The Fabric trial capacity lasts 60 days. [Cancel a Fabric capacity trial](../fundamentals/fabric-trial.md#end-a-fabric-trial) explains what happens when a trial is canceled or expires. Use this article to find helpful information on how to save your data whether you upgrade or not.  

### Delete a Fabric capacity and Fabric trial capacity

The Capacity administrator can delete Fabric capacities using the Fabric admin portal. Fabric items in workspaces assigned to the capacity become unusable unless the workspaces are assigned to a different Fabric capacity within seven days. To learn more, see [Delete a capacity](../admin/capacity-settings.md#delete-a-capacity) and 
[Fabric capacity deletion.](../admin/capacity-settings.md#delete-a-capacity)

### Buy a Fabric trial capacity

You can [purchase a Fabric capacity](buy-subscription.md) at any time. You don't have to wait for your trial to end. 

### Migrate an expiring P SKU capacity

> [!NOTE]
> Power BI Premium is transitioning to Microsoft Fabric. Power BI Premium is now part of Fabric. At the end of your current agreement with Microsoft, work with your Microsoft account representatives to migrate your P SKU purchase to an F SKU purchase. No immediate action is required. You can continue using your existing Power BI Premium capacity until the time of your next renewal. You can use Power BI in Fabric alongside all the other Fabric workloads. Because of this change, the Power BI Premium SKUs are being retired.

If a Premium subscription or capacity license expires, you have 90 days of full access to your capacity. During these 90 days, migrate your workspaces to your new F SKU capacity without losing access to your existing work. However, once the workspace is reassigned, all currently active jobs are canceled. Rerun those jobs after migration. Migration doesn't impact scheduled jobs. If you don't migrate your workspaces, your content reverts to a shared capacity where it continues to be accessible. However, you can't view reports that are based on semantic models that are greater than 1 GB or reports that require Premium capacities to render.

## Subscriptions

Fabric and Power BI subscriptions can be canceled in several different ways. The subscriptions remain active until the expiration date, so administrators should remind users to save their data. 

### Cancel a capacity subscription

Cancel a P SKU or EM SKU capacity subscription in the Microsoft 365 admin portal. If you're within your grace period, select **Billing** > **Your products** > **Subscription status** > **Cancel subscription** . If you're outside the grace period, turn off recurring billing. See [Cancel your subscription in the Microsoft 365 admin center.](/microsoft-365/commerce/subscriptions/cancel-your-subscription)

The subscription remains active until it expires. Only an administrator with billing permissions can cancel the subscription. Remember to ask users to save their data.

Cancel an A SKU subscription in Azure.  

<!-- ### Cancel a paid Fabric capacity subscription

<Mihir to write> -->

## Disable Fabric

Fabric administrators can turn off Fabric for an entire organization, individuals, and security groups. See [Can I disable Microsoft Fabric?](../admin/fabric-switch.md#can-i-disable-microsoft-fabric). At the tenant level, the Fabric admin uses the Admin portal **Settings.** The Fabric administrator can also delegate a Capacity administrator to disable Fabric at the capacity level using the Admin portal **Capacity settings.**

## Licenses

If an administrator with billing permissions assigned the Fabric (Free) license, that administrator can use the Admin portal to remover users' free licenses. The steps are the same as [Close your Power BI account.](#close-your-power-bi-account) If a Capacity administrator got the license themselves, that administrator can use the Admin portal to remove that license. If a paid license expires you have a grace period for repurchasing.  

### Manage an expired license

When a paid license passes its expiration date, you have a grace period for repurchasing the license. To learn more about expired licenses, see [Power BI license expiration.](/power-bi/enterprise/service-admin-licensing-organization#power-bi-license-expiration)

### Cancel a Power BI trial

The method for canceling a Power BI trial depends on how the trial was started. 

- If a user started a Power BI trial of a paid license, the only way to cancel that trial is if an administrator submits a Support ticket.
- To cancel a free organizational trial, an administrator with billing permissions can turn off recurring billing.

### Close your Power BI account

If you don't want to use Power BI any longer, close your Power BI license account. After you close your account, you can't sign in to Power BI. Also, as it states in the data retention policy in the [Power BI Service Agreement](https://azure.microsoft.com/support/legal/subscription-agreement/), Power BI deletes any customer data you uploaded or created.

If you signed up for Power BI as an individual, you can close your account from the **Settings** screen.

1. In Power BI, select the gear icon in the upper right, then select **Settings**.

1. On the **General** tab, select **Close Account**.

    :::image type="content" border="true" source="media/fabric-close-end-cancel/close-account-settings-2.png" alt-text="Screenshot showing the Power BI settings menu. General and the close account menu options are highlighted.":::

1. Select a reason for closing the account. You can also provide further information. Then select **Close account**.

1. Confirm that you want to close your account.

    You should see a confirmation that Power BI closed your account. You can reopen your account from here if necessary.

If your organization signed you up for Power BI, contact your admin. Ask them to unassign the license from your account.

:::image type="content" border="true" source="media/fabric-close-end-cancel/close-account-managed.png" alt-text="Screenshot of the close account message for Managed Users.":::

---
