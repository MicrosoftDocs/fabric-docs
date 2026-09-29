---
title: Enable capacity overage in Microsoft Fabric
description: Learn how to configure capacity overage in Microsoft Fabric during capacity creation, manage it later, and set up capacity overage notifications.
ms.reviewer: pankar
ms.topic: how-to
ms.date: 09/11/2026
ai-usage: ai-assisted
---

# Enable capacity overage in Microsoft Fabric

Capacity overage is a feature that pays for eligible excess capacity usage, up to a rolling 24-hour threshold that the capacity admin sets. When you create a new Fabric capacity, capacity overage is enabled by default. During creation, you can review or change the rolling 24-hour threshold, or opt out before you finish creating the capacity.

This article shows you how to configure capacity overage while you create a capacity, how to configure it later through the OneLake catalog, and how to set up capacity overage notifications. For more information about how capacity overage works, what it costs, and how the threshold behaves, see [Capacity overage in Microsoft Fabric](capacity-overage-overview.md).

## Prerequisites

Before you enable capacity overage, ensure you meet the following requirements:

- **Capacity type**: Capacity overage is available only for F SKUs.

- **Role**: You must be a capacity admin to enable or configure capacity overage. You also need this permission for other capacity-level settings, such as surge protection.

- **Quota**: Capacity overage uses extra compute power beyond what's included in your normal Fabric capacity. Your capacity needs sufficient [quota or Fabric capacity units](fabric-quotas.md) to support the overage threshold you want to set.

## Enable and configure capacity overage during capacity creation

When you create a new Fabric capacity, capacity overage is on by default. You can review or change the rolling 24-hour overage threshold, or opt out, before you finish creating the capacity. If you opt out, normal throttling applies to usage above the provisioned SKU. You can enable capacity overage later through the capacity settings.

1. Start the workflow to [buy an Azure capacity SKU for Fabric](buy-capacity.md#buy-an-azure-capacity-sku-for-fabric).

1. On the capacity creation page, select the SKU and complete the required capacity details.

1. In **Capacity overage**, review the setting. Capacity overage is enabled by default. If you want to opt out, toggle the setting to off.

1. Configure the **Rolling 24-hour overage threshold** by using one of the following methods. The default threshold is 25%.

   - **Slider**: Move the slider in 5% increments to set the extra daily capacity consumption you want to allow.
   - **Absolute value**: Enter the threshold directly in CU hours.

1. Review the creation summary and confirm that capacity overage is on and the threshold is correct.

1. Create the capacity.

> [!IMPORTANT]
> Your actual charges can exceed the rolling 24-hour overage threshold. Fabric evaluates overage periodically, and operations already in progress continue to run, so charges can accrue beyond the threshold before throttling begins.

## Enable and configure capacity overage after capacity creation

For an existing Fabric capacity, use either the OneLake catalog or the Fabric admin portal to enable or configure capacity overage.

# [OneLake catalog](#tab/onelake-catalog)

To enable or configure capacity overage for an existing Fabric capacity by using the OneLake catalog, follow these steps:

1. Sign in to Microsoft Fabric and open **OneLake catalog**.

1. Select **Govern** > **Capacities**.

1. Select the capacity that you want to configure. You must be a capacity admin for it.

1. Select **Settings**, and then select **Capacity overage**.

1. Toggle capacity overage on to enable capacity overage for the selected capacity. To opt out, toggle the setting to off.

1. When capacity overage is on, configure the **Rolling 24-hour overage threshold** by using one of the following methods:

   - **Slider**: Adjust the threshold in 5% increments of the base SKU's capacity units (CUs). Fabric rounds each increment to the nearest CU and bills these CUs at the overage rate only if you consume them.
   - **Absolute value**: Enter a precise CU hour value to set an exact threshold.

1. Select **Apply**.

Changes can take up to five minutes to take effect. You don't need to restart or pause the capacity.

# [Admin portal](#tab/admin-portal)

To enable or configure capacity overage for an existing Fabric capacity by using the Fabric admin portal, follow these steps:

1. Sign in to Microsoft Fabric. From the top-right corner, open **Settings**, select **Admin portal**, and then choose **Capacity settings**.

1. Select the capacity that you want to configure. You must be a capacity admin for it.

   :::image type="content" source="media/enable-capacity-overage/select-capacity.png" alt-text="Screenshot of the list of available capacities to configure.":::

1. Scroll to and expand the **Capacity overage** section.

   :::image type="content" source="media/enable-capacity-overage/set-spending-limit.png" alt-text="Screenshot of the capacity settings with the collapsed Capacity overage section highlighted.":::

1. Turn capacity overage on, configure the **Rolling 24-hour overage threshold** with the slider or an absolute CU hour value, and then select **Apply**.

   :::image type="content" source="media/enable-capacity-overage/capacity-overage-setting.png" alt-text="Screenshot of the Capacity overage settings with the toggle turned on, a slider, and an overage limit field set to 240 CU hours.":::

Changes can take up to five minutes to take effect. You don't need to restart or pause the capacity.

---

## Effects of capacity overage changes

Changing the threshold or disabling capacity overage can affect quota, billing, and throttling. Consider the following effects before you make changes:

- When you increase the threshold, ensure the capacity has sufficient [quota or Fabric capacity units](fabric-quotas.md) to support the higher value.
- If you lower the threshold below the overage that's already processed or currently in use, throttling can resume.
- If you disable capacity overage, normal throttling is restored. Fabric doesn't refund charges you already incurred.
- Check the current load before you lower the threshold or disable capacity overage, because throttling can begin immediately.

## Configure capacity overage notifications (preview)

> [!IMPORTANT]
> Capacity overage email notifications are in preview. Capacity overage is generally available.

Configure capacity overage notifications from the same capacity settings that you reach through the OneLake catalog or the admin portal. Notifications send email to the recipients you specify when selected overage events occur.

1. Open the capacity settings through **OneLake catalog** > **Govern** > **Capacities**, or through **Admin portal** > **Capacity settings**.

1. Select the capacity, and then select **Capacity Notifications**.

1. Select the events that send email:

   - Overage consumption reaches a specified percentage of the rolling 24-hour threshold.
   - The capacity enters an overage state.
   - The capacity exits an overage state.
   - Overage CUs are depleted and throttling begins.

1. Set the warning percentage where it's required, add the recipients, and then select **Apply**.

For more information about capacity notification settings, see [Configure Power BI Premium capacity notifications](../admin/service-admin-premium-capacity-notifications.md).

## Estimate the cost of your capacity overage threshold

To get a rough estimate of the potential cost of your capacity overage threshold, take three times your CU per hour bill rate and multiply this value by your configured CU hour threshold. However, pricing varies by region. For a more accurate estimate, use the following steps:

1. Go to the [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/).

1. Search for **Microsoft Fabric**.

1. Select your region.

1. Select a capacity for your region, such as an **F2 capacity**, and choose **Pay as you go**.

   :::image type="content" source="media/enable-capacity-overage/estimated-cost.png" alt-text="Screenshot of the estimated cost for the selected region.":::

1. To calculate the estimated cost if your capacity reached the threshold, follow these steps:

   - Divide the listed hourly price by **2**. This adjustment accounts for the fact that an F2 capacity provides 2 CU hours per hour and you need to find the value of 1 CU hour.

   - Multiply the resulting value by **3**, because Fabric charges capacity overage at 3 times the pay-as-you-go rate.

   - Multiply the calculated hourly cost by the number of CU hours you configure as a threshold.

> [!NOTE]
> Capacity overage creates no standing charge. You pay only for the overage CU hours you consume.

## Related content

- [Capacity overage in Microsoft Fabric](capacity-overage-overview.md)
- [Fabric throttling policy](throttling.md)
- [Surge protection](surge-protection.md)
- [Fabric Capacity Metrics app](metrics-app.md)
- [Understand your Azure bill on a Fabric capacity](azure-billing.md)
- [Configure Power BI Premium capacity notifications](../admin/service-admin-premium-capacity-notifications.md)
- [Manage your Fabric capacity](../admin/capacity-settings.md)
