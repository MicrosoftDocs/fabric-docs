---
title: Microsoft Fabric quotas
description: Learn how to view and manage your Microsoft Fabric quota which sets the number of Capacity Units (CUs) your subscribed capacity has.
author: JulCsc
ms.author: juliacawthra
ms.topic: how-to
ms.date: 04/06/2025

# Customer intent: As an administrator or an executive, I want to learn how to manage my Microsoft Fabric quota.
---

# Microsoft Fabric capacity quotas

Microsoft Fabric provides limits, also known as *quotas*, which determine the maximum number of Fabric Capacity Units (CUs) for each of the capacities on your subscription. Quotas depend on your [Azure subscription type](/azure/azure-resource-manager/management/azure-subscription-service-limits). You don't get charged for quotas, you're only charged for your capacities.

This article explains how to view and increase your quotas, using the Azure portal and the Azure Resource Manager (ARM) APIs.

## Prerequisites

* To view your Fabric quota, you need an Azure account with the contributor role, or another role that includes *contributor* access.

* To manage your Fabric quota, you need the permissions listed in [Quota Request Operator](/azure/role-based-access-control/built-in-roles/management-and-governance#quota-request-operator)
  
* Before provisioning your first capacity or if your quota is 0, register the Microsoft.Fabric resource provider using the [Azure Resource Provider instructions](/azure/azure-resource-manager/management/resource-providers-and-types#register-resource-provider)

## View your Fabric CU quota

The following section outlines how to view your Fabric quota using the Azure portal and the ARM APIs.

# [Azure](#tab/Azure)

1. Sign in to the [Azure portal](https://portal.azure.com/#home)

2. Search for *quotas* and select **Quotas**.

3. In the *overview* page, select **Microsoft Fabric**.

4. To see your usage records by subscription, select the following filters:
   * **Provider** - *Microsoft Fabric*.
   * **Subscription** - Select the subscription you want to see usage for.
   * **Region** - Select the region you want to see usage for.
   * **Usage** - *Show all*.

# [API](#tab/API)

Use [Fabric Capacities - List Usages](/rest/api/microsoftfabric/fabric-capacities/list-usages) to check your current usage and quota.

You need three parameters to make the call:

* `location` - The name of the Azure region. If you don't know the name of your region, you can use the [Region - List By Service](/rest/api/apimanagement/region/list-by-service) API to find it.

* `subscriptionId` - The ID of the target subscription. The value must be an UUID.

* `api-version` - The API version to use for this operation. The only supported version is `2023-11-01`

### Response example

Here's an example of the response you get when you call the API.

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

Your available quota is the difference between `limit` and `CurrentValue`.

* `limit` - Identifies the quota limit of your subscription.

* `CurrentValue` - Determines the number of used CUs.

---

## Request a quota increase

The following section outlines how to request a Fabric quota increase using the Azure portal and the ARM APIs.

# [Azure](#tab/Azure)

Follow these steps to request a quota increase using the Azure portal. After submitting your request, it's reviewed and within minutes you're notified whether it was successful or not. You can see the status of your request in Azure, or in your logs. If your request isn't successful, you can [open a support request](#create-support-request-for-quota-increase).

1. Sign in to the [Azure portal](https://portal.azure.com/#home)

2. Search for *quotas* and select **Quotas**.

3. In the *overview* page, select **Microsoft Fabric**.

4. Select **New Quota Request**.

5. Select one of these options to increase your quota:
    * Enter a new limit
    * Adjust the usage %

    >[!TIP]
    >To add quotas to your favorites list, see [Manage favorites](/azure/azure-portal/azure-portal-add-remove-sort-favorites).

6. Select **Submit**.

# [API](#tab/API)

Use [Fabric Capacities - Update](/rest/api/microsoftfabric/fabric-capacities/update) to request an increase in quota. After submitting your request, you can use [Fabric Capacities - Get](/rest/api/microsoftfabric/fabric-capacities/get) to check if it was successful. If your request isn't successful, you can [open a support request](#create-support-request-for-quota-increase).

You need four parameters to make the call:

* `capacityName` - The name of your Microsoft Fabric capacity.

* `resourceGroupName`- The name of the resource group. The name is case insensitive.

* `subscriptionId` - The ID of the target subscription. The value must be an UUID.

* `api-version` - The API version to use for this operation. The only supported version is `2023-11-01`

---

## Create support request for quota increase

To create a support request for an increase to your quota, follow these steps:

1.	Go to the New support request page in the Azure portal, by following the steps in [Open a support request](/azure/azure-portal/supportability/how-to-create-azure-support-request).

2.	On the *Problem description* tab of the *New support request* page, do the following:
    * **Issue Type** - Select *Service* and *subscription limits (quotas)* for the issue type, and your subscription from the drop-down menu.
    * **Quota type** - Type *Fabric* and select *Microsoft Fabric*.

3.	Select **Next**.

4.	On the *Additional details* tab, under *Problem details*, select **Enter details** to enter additional information.

5.	In the *Quota details window*, specify your new limits.

6.  Select **Save**.

7.	Fill in the remaining details of your quota request.

8.  Select **Next: Review + create**, and after reviewing the request details, select **Create** to submit the request.

## Related content

* [Microsoft Fabric licenses](licenses.md)

* [Buy a Microsoft Fabric subscription](buy-subscription.md)
