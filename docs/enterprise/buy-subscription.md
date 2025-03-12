---
title: Buy a Microsoft Fabric subscription
description: Learn how to buy a Microsoft Fabric subscription.
author: KesemSharabi
ms.author: kesharab
ms.topic: conceptual
ms.custom:
ms.date: 12/03/2024
---

# Buy a Microsoft Fabric subscription

This article describes the differences between the [Microsoft Fabric](../fundamentals/microsoft-fabric-overview.md) capacities, and shows you how to buy an Azure SKU for your organization. The article is aimed at admins who want to buy Microsoft Fabric for their organization.

After you buy a capacity, you can learn how to [manage your capacity](/power-bi/enterprise/service-admin-premium-manage#manage-capacity) and [assign workspaces](/power-bi/enterprise/service-admin-premium-manage#assign-a-workspace-to-a-capacity) to it.

## SKU types

Microsoft Fabric has an array of capacities that you can buy. The capacities are split into Stock Keeping Units (SKU). Each SKU provides a different amount of computing power, measured by its Capacity Unit (CU) value. Refer to the [Capacity and SKUs](licenses.md#capacity) table to see how many CUs each SKU provides.

Microsoft Fabric operates on two types of SKUs:

* **Azure** - Billed per second with no commitment. To save costs, you can make a [yearly reservation](/azure/cost-management-billing/reservations/fabric-capacity).

* **Microsoft 365** - Billed monthly or yearly, with a monthly commitment.

## Azure SKUs

Azure SKUs, also known as F SKUs, are the recommended capacities for Microsoft Fabric. You can use your Azure capacity for as long as you want without any commitment. Pricing is regional and billing is made on a per second basis with a minimum of one minute.

Azure capacities offer the following improvements over the Microsoft 365 SKUs.

* Pay-as-you-go with no time commitment.

* A [capacity reservation](/azure/cost-management-billing/reservations/fabric-capacity). This feature allows you to reserve a capacity for a specific period of time, and save money on your Azure bill. A reserved capacity is no longer charged at the pay-as-you-go rates.

* You can [scale your capacity](scale-capacity.md) up or down using the Azure portal.

* You can [pause](pause-resume.md#pause-your-capacity) and [resume](pause-resume.md#resume-your-capacity) your capacity as needed. This feature is designed to save money when the capacity isn't in use.

* [Microsoft Cost Management](/azure/cost-management-billing/cost-management-billing-overview).

* [Azure Monitor Metrics](/azure/azure-monitor/essentials/data-platform-metrics).

### Buy an Azure SKU

To buy an Azure SKU, you need to be an owner or a contributor of an Azure subscription. If you do not have access to these roles in a subscription, you can ask your Azure subscription administrator to create a custom role with the following [Azure role-based access control](/azure/role-based-access-control/overview) (Azure RBAC) permissions:
  * Microsoft.Fabric/capacities/read
  * Microsoft.Fabric/capacities/write
  * Microsoft.Fabric/capacities/suspend/action
  * Microsoft.Fabric/capacities/resume/action

To buy an Azure SKU, follow these steps:

1. Sign in to the [Azure portal](https://portal.azure.com/).

2. In Azure, select the **Microsoft Fabric** service. You can search for *Microsoft Fabric* using the search menu.

3. Select **Create Fabric Capacity**.

4. In the **Basics** tab, fill in the following fields:

    * *Subscription* - The subscription you want your capacity to be assigned to. All Azure subscriptions are billed together.

    * *Resource group* - The resource group you want your capacity to be assigned to.

    * *Capacity name* - Provide a name for your capacity.

    * *Region* - Select the region you want your capacity to be part of.

    * *Size* - Select your capacity size. Capacities come in different stock keeping units (SKUs) and we measure them by capacity units (CUs). You can view a detailed list of Microsoft Fabric capacities in [Capacities and SKUs](licenses.md#capacity).

    * *Fabric capacity administrator* - Select the [admin](../admin/microsoft-fabric-admin.md#capacity-admin-roles) for this capacity.
        * The capacity administrator must belong to the tenant where the capacity is provisioned.
        * Business to business (B2B) users can't be capacity administrators.

5. Select **Next: Tags** and if necessary, enter a name and a value for your capacity.

6. Select **Review + create**.

### Fabric quotas
Microsoft Fabric provides limits (quotas) on how many total Fabric CUs you can provision on your subscription depending on your [Azure subscription type](/azure/azure-resource-manager/management/azure-subscription-service-limits). The Fabric Quota determines the maximum size of the capacities you can provision in your subscription. You are charged only for the provisioned capacities, not for the quota itself. In essence, you cannot provision capacities that exceed the quota.
The following sections explain how to review your provisioned CU usage in your Azure subscription and how to request a quota increase for Microsoft Fabric through the Azure Portal and using Azure Quota APIs

##### Viewing your Fabric CU quota usage using the Azure Portal
To view your provisioned CU usage, you must have an Azure account with the contributor role, or another role that includes *contributor* access. Follow these steps to view your Fabric quota usage.
1. Sign in to the [Azure portal](https://portal.azure.com/#home)
2. Search for *quotas* and select **Quotas**.
3. On the Overview page, select **Microsoft Fabric**.
4. You will be able to see your usage records by subscription - select the following filters
   * **Provider** - Select *Microsoft Fabric*.
   * **Subscription** - Select the subscription you want to see usage for.
   * **Region** - Select the region you want to see usage for.
   * **Usage** - Select *Show all*.
     ![image](https://github.com/user-attachments/assets/39df7c88-950a-45f2-81f9-7c2a55521b9b)

  
##### Requesting a quota increase through the Azure Portal
To request a quota increase, you must have an Azure account with the contributor role, or another role that includes *contributor* access. Follow these steps to submit a request for a quota increase.
1. Sign in to the [Azure portal](https://portal.azure.com/#home)
2. Search for *quotas* and select **Quotas**.
3. On the Overview page, select **Microsoft Fabric**.
4. Select New Quota Request. Select one of these options to increase the quota(s):
    * Enter a new limit
    * Adjust the usage %
    * You can also [add **Quotas** to your **Favorites** list](/azure/azure-portal/azure-portal-add-remove-sort-favorites) so that you  can quickly go back to it.
      ![image](https://github.com/user-attachments/assets/9433b2db-b582-4bc1-b816-65b7fdb0a2fa)
5. When you're finished, select **Submit**.

Your request will be reviewed, and you'll be notified if the request can be fulfilled. This usually happens within a few minutes. If your request isn't fulfilled, you'll need to open a support request so that a support engineer can assist you with the increase.

##### Viewing or Requesting a quota increase through the APIs
If you have an automation to provision your capacities or want to check the quota availability or increase it programatically, you may use the Azure Quota APIs to do so. The API documentation is in the [Using Quota APIs doc](/rest/api/quota/?view=rest-quota-2023-02-01#using-quota-apis)

1. **Check your current quota and usage:**
   Documentation is [here](/fabric-capacities/list-usages?view=rest-microsoftfabric-2025-01-15-preview&tabs=HTTP#code-try-0)
   While making the get call, there are 4 key parameters - the URI, subscriptionID, location and API Version.
   Use "https://management.azure.com/subscriptions/{subscriptionId}/providers/Microsoft.Fabric/locations/{location}/usages?api-version={2023-11-01}" for Subscription URI and "2023-11-01" for Version You will input your subscriptionID and location based on your request.
   Your response format will be like this:
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
Limit identifies the quota set for your subscription and the "CurrentValue" determines how much has been used. If the new capacity you are provisioning is larger than available quota, then you will need to make a request to increase the quota using the following steps.

2. **Request an increase in quota using API:**
   You will make the PATCH call to update the quota increased. The quota API URI to be used has the following format: "https://management.azure.com/{SCOPE}/providers/Microsoft.Quota/quotas/{ResourceName}?api-version=2023-02-01". There are 2 main placeholders in the quota API URI that needs to be updated before making the call. "ResourceName" needs to be capacityquota and "SCOPE" needs to be replaced with this: subscriptions/<usbscriptionID>/providers/Microsoft.Fabric/locations/<location>. You will need to update "SubscriptionID and location" with your subscription and location values.
   The request body will look like this:
   {
  "properties": {
    "limit": {
      "limitObjectType": "LimitValue",
      "value": 280   -> Update this to desired quota
    },
    "name": {
      "value": "capacityquota"
    }
  }
}

The "value" is the new quota limit you are requesting, which must be greater than the current limit.

Here is a sample request body:
{
  "properties": {
    "limit": {
      "limitObjectType": "LimitValue",
      "limitType": "Independent",
      "value": 280
    },
    "name": {
      "value": "CAPACITYQUOTA"
    },
    "properties": {},
    "provisioningState": "InProgress",
    "isQuotaApplicable": true
  },
  "id": "/subscriptions/8a70be23-9bdb-4b1a-9739-8a9860597949/providers/Microsoft.Fabric/locations/westcentralus/providers/Microsoft.Quota/quotaRequests/cd32bfd2-8211-4b29-8594-a93e1cafbc15",
  "type": "Microsoft.Quota/Quotas",
  "name": "cd32bfd2-8211-4b29-8594-a93e1cafbc15"
}
   
4. **Check the Status of your request**
You need to check the status using the GET request by updating the SCOPE with your subscriptionID and location -
Example:
subscriptions/8a70be23-9bdb-4b1a-9739-8a9860597949/providers/Microsoft.Fabric/locations/westcentralus
![image](https://github.com/user-attachments/assets/1314d11c-b0ca-450d-9ea4-4648ef426a43)

If it is a failure, you will need to contact support to get the quota increase

##### Create support request for quota increase
To request an increase to your quota, do the following:
1.	Go to the New support request page in the Azure portal by following the steps to [Open a support request](/azure/azure-portal/supportability/how-to-create-azure-support-request).
2.	On the Problem description tab of the New support request page,
    * **Issue Type** Select *Service* and *subscription limits (quotas)* for the Issue type, and your subscription from the drop-down.
    * **Quota type** Type *Fabric* and select *Microsoft Fabric*.
3.	Select **Next**.
4.	On the *Additional details* tab, under *Problem details*, select **Enter details** to enter additional information.
5.	In the *Quota details window*, specify your new limits.
6.  Select **Save**.
7.	Fill in the remaining details of your quota request.
8.  Select *Next: Review + create>>*, and after reviewing the request details, select **Create** to submit the request.

### Microsoft 365 SKUs

Microsoft 365 SKUs, also known as P SKUs, are Power BI SKUs that also support Fabric when it's [enabled](../admin/fabric-switch.md) on top of your Power BI subscription. Power BI EM SKUs don't support Microsoft Fabric.

## Related content

[Microsoft Fabric licenses](licenses.md)
