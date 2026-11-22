---
title: Microsoft Fabric quotas
description: Learn what counts against Microsoft Fabric capacity quotas, including capacity overage thresholds, and how to view and increase your quota.
author: dknappettmsft
ms.author: daknappe
ms.topic: how-to
ms.date: 11/20/2026
ai-usage: ai-assisted

#customer intent: As an administrator or an executive, I want to learn how to manage my Microsoft Fabric quota.
---

# Microsoft Fabric capacity quotas

Microsoft Fabric provides limits, also known as *quotas*, which determine the maximum number of Fabric Capacity Units (CUs) available to your Azure subscription in each region. Quotas depend on your [Azure subscription type](/azure/azure-resource-manager/management/azure-subscription-service-limits). You don't get charged for quota itself.

This article explains how to view and increase your quotas by using the Azure portal and the Azure Resource Manager (ARM) APIs.

## Prerequisites

* To view your Fabric quota, you need an Azure account with the Contributor role or another role that includes Contributor access.

* To manage your Fabric quota, you need the permissions listed in [Quota Request Operator](/azure/role-based-access-control/built-in-roles/management-and-governance#quota-request-operator).

* Before you provision your first capacity, or if your quota is 0, register the `Microsoft.Fabric` resource provider. For instructions, see [Register a resource provider](/azure/azure-resource-manager/management/resource-providers-and-types#register-resource-provider).

## What counts against your Fabric quota

Quota usage includes these allocations across capacities in the same subscription and region:

* **Provisioned capacity CUs**. Each capacity uses quota based on its SKU.
* **Configured capacity overage thresholds**. Enabling overage uses additional quota based on the threshold, even if no overage occurs. For the calculation and requirements, see [How capacity overage works](capacity-overage-overview.md#how-capacity-overage-works).
* **On-demand billing**. Separate quotas limit usage for each billing category per capacity and the number of capacities that use on-demand billing. For more information, see [View and increase on-demand billing quotas](fabric-on-demand-billing-quotas.md).

## View your Fabric CU quota

View your Fabric quota by using the Azure portal or the ARM APIs.

# [Azure](#tab/Azure)

1. Sign in to the [Azure portal](https://portal.azure.com/#home).

1. Search for *quotas* and select **Quotas**.

1. On the **Overview** page, select **Microsoft Fabric**.

1. Configure the following filters to view your usage records:
   * For **Provider**, select **Microsoft Fabric**.
   * For **Subscription**, select the subscription whose usage you want to view.
   * For **Region**, select the region whose usage you want to view.
   * For **Usage**, select **Show all**.

# [API](#tab/API)

Use [Fabric Capacities - List Usages](/rest/api/microsoftfabric/fabric-capacities/list-by-subscription) to check your current usage and quota.

You need three parameters to make the call:

* `location` - The name of the Azure region. If you don't know the name of your region, use the [Region - List By Service](/rest/api/apimanagement/region/list-by-service) API to find it.

* `subscriptionId` - The ID of the target subscription. The value must be a UUID.

* `api-version` - The API version to use for this operation. The only supported version is `2023-11-01`.

### Response example

The following example shows an API response:

```json
{
    "value": [
        {
            "name": {
                "value": "CapacityQuota",
                "localizedValue": "CapacityQuota"
            },
            "unit": "CU",
            "currentValue": 256,
            "limit": 280,
            "id": null
        }
    ]
}
```

### Calculate your quota

Your available quota is the difference between `limit` and `currentValue` for the selected subscription and region.

* `limit` - Identifies the quota limit for your subscription in the selected region.

* `currentValue` - Identifies the CUs that count against your quota, including provisioned capacity CUs and configured capacity overage thresholds.

---

## Request a quota increase

When you request a quota increase, account for both provisioned capacity CUs and configured overage thresholds, including any planned increases. Overage thresholds require quota even if no overage occurs. For the threshold calculation, see [How capacity overage works](capacity-overage-overview.md#how-capacity-overage-works).

Request a Fabric quota increase by using the Azure portal or the ARM APIs.

# [Azure](#tab/Azure)

After you submit your request, you receive a notification within minutes about whether it was successful. View the status of your request in Azure or in your logs. If your request isn't successful, [open a support request](#create-support-request-for-quota-increase).

1. Sign in to the [Azure portal](https://portal.azure.com/#home).

1. Search for *quotas* and select **Quotas**.

1. On the **Overview** page, select **Microsoft Fabric**.

1. Select **New Quota Request**.

1. To increase your quota, select either **Enter a new limit** or **Adjust the usage %**.

   > [!TIP]
   > To add quotas to your favorites list, see [Manage favorites](/azure/azure-portal/azure-portal-add-remove-sort-favorites).

1. Select **Submit**.

# [API](#tab/API)

Use [Fabric Capacities - Update](/rest/api/microsoftfabric/fabric-capacities/update) to request a quota increase. After you submit your request, use [Fabric Capacities - Get](/rest/api/microsoftfabric/fabric-capacities/get) to check whether it was successful. If your request isn't successful, [open a support request](#create-support-request-for-quota-increase).

You need four parameters to make the call:

* `capacityName` - The name of your Microsoft Fabric capacity.

* `resourceGroupName` - The name of the resource group. The name is case-insensitive.

* `subscriptionId` - The ID of the target subscription. The value must be a UUID.

* `api-version` - The API version to use for this operation. The only supported version is `2023-11-01`.

---

## Create support request for quota increase

If your quota increase request isn't successful, submit a support request:

1. In the Azure portal, go to the **New support request** page by following the steps in [Open a support request](/azure/azure-portal/supportability/how-to-create-azure-support-request).

1. On the **Problem description** tab of the **New support request** page, configure the following fields:
   * For **Issue Type**, select **Service and subscription limits (quotas)**, and then select your subscription from the dropdown list.
   * For **Quota type**, enter *Fabric* and select **Microsoft Fabric**.

1. Select **Next**.

1. On the **Additional details** tab, under **Problem details**, select **Enter details**.

1. In **Quota details**, specify your new limits.

1. Select **Save**.

1. Enter the remaining details of your quota request.

1. Select **Next: Review + create**.

1. Review the request details, and then select **Create** to submit the request.

## Related content

* [Microsoft Fabric licenses](licenses.md)

* [Buy Fabric capacity in Azure](buy-capacity.md)
