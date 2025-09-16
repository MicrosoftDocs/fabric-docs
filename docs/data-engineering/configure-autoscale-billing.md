---
title: Configure Autoscale Billing for Spark in Microsoft Fabric
description: Learn how to enable Autoscale Billing for Apache Spark workloads in Microsoft Fabric and configure maximum capacity units.
ms.reviewer: snehagunda
ms.author: saravi
author: santhoshravindran7
ms.topic: how-to
ms.custom:
  - fabcon-2025
ms.date: 06/05/2025
---

# Configure Autoscale Billing for Spark in Microsoft Fabric

Autoscale Billing for Spark enables serverless, pay-as-you-go compute for Spark workloads in Microsoft Fabric. Once enabled, Spark jobs no longer consume the shared capacity, giving you the flexibility to scale Spark workloads independently and optimize costs.

This guide walks you through how to enable Autoscale Billing for your Fabric capacity and configure the maximum Capacity Unit (CU) limit for your Spark jobs.

## Requirements

- **Capacity**: Only available for **Fabric F-SKUs** (F2 and above). Not supported on **P-SKUs** or **Fabric Trial capacities**.
- **Access roles**: You must be a **Fabric Capacity Administrator** to configure Autoscale Billing.

> [!IMPORTANT]
> Enabling, disabling, or reducing the **Maximum Capacity Units** will cancel all active Spark jobs running under Autoscale Billing to avoid billing overlaps.

## How to configure Autoscale Billing for Spark

Use the following steps to enable and manage Autoscale Billing settings for a Fabric capacity:

1. Navigate to the [Microsoft Fabric Admin Portal](https://app.fabric.microsoft.com/admin).
2. Under the **Governance and insights** section, select **Admin portal**.
3. From the left-hand menu, choose **Capacity settings** and go to the **Fabric capacity** tab.
4. Select the capacity you want to configure.

   a. In the **Capacity Settings** page, scroll to the **Autoscale Billing for Fabric Spark** section.  
   
   b. Enable the **Autoscale Billing** toggle.  
   
   c. Use the slider to set the **Maximum Capacity Units (CU)** you want to allocate to Spark jobs.

      - You can set up to a maximum limit on the slider and this limit is based on the Quota approved for your Azure subscription and it’s also based on the type of subscription you are using. You could increase the quota by following the steps mentioned in the **Quota Management** section in this document.
      - You are only billed for the compute used, up to this limit.

   :::image type="content" source="media/autoscale-configure/autoscale-billing-settings.png" alt-text="Screenshot showing the Autoscale Billing toggle and CU slider in Capacity Settings." lightbox="media/autoscale-configure/autoscale-billing-settings.png":::

   d. Click **Save** to apply your settings.

> [!NOTE]
> * Once saved, your Spark Pools can now utilize the new CU quota set by Autoscale Billing. 
> * Optionally, you can choose to resize your capacity now that you have moved the Spark workloads to a new billing model to optimize your costs.  This would be done in the Azure portal, and you must be an Azure administrator to change the SKU size. To ensure any unsmoothed usage from Spark is no longer counting against your capacity limits, we strongly recommend pausing the capacity to clear that usage and restarting it.  Instructions for how to do that are included below.

## (Optional) Resize and reset capacity for cost optimization

After enabling Autoscale Billing, you can downsize your Fabric capacity if Spark workloads are no longer using it. Follow these steps in the **Azure portal**:

1. Go to the [Azure portal](https://ms.portal.azure.com/auth/login/).
2. Search for and select your **Fabric capacity**.
3. Click **Pause** to temporarily stop the capacity.

   > This clears any active or unsmoothed Spark usage on the shared capacity.

4. Wait 5 minutes, then click **Resume** to restart the capacity.
5. Now, resize the capacity to a lower SKU that fits the remaining workloads (e.g., Power BI, Data Warehouse, Real-Time Intelligence, Databases).

> [!NOTE]
> Only Azure administrators can resize SKUs. This change is made in the **Azure portal**, not within Fabric settings.

## Monitor billing and usage

After enabling Autoscale Billing, use Azure’s built-in cost management tools to track compute usage:

1. Navigate to the [Azure portal](https://portal.azure.com).
2. Select the **Subscription** linked to your Fabric capacity.
3. In the subscription page, go to **Cost Analysis**.
4. Filter by the resource (Fabric capacity) and use the meter:
   - `Autoscale for Spark Capacity Usage CU`
5. View real-time compute spend for Spark workloads using Autoscale Billing.

   :::image type="content" source="media/autoscale-configure/autoscale-cost-analysis.png" alt-text="Screenshot showing how to track Spark usage in Azure Cost Analysis." lightbox="media/autoscale-configure/autoscale-cost-analysis.png":::


## Request additional quotas

If your data engineering or data science workloads require a higher quota than your current maximum Capacity Unit (CU) limit, you can request an increase via the Azure Quotas page:

1. Navigate to the [Azure portal](https://portal.azure.com) and sign in.
2. In the search bar, type and select **Azure Quotas**.
3. Choose **Microsoft Fabric** from the list of available services.
4. Select the subscription associated with your Fabric capacity.
5. Edit the quota limit by entering the new CU limit that you intend to acquire.
6. Submit your quota request.

:::image type="content" source="media/autoscale-configure/autoscale-quotas.gif" alt-text="Graphic showing how to increase quota for your Fabric resource by acquiring more quotas using the Azure Quotas page in Azure portal." lightbox="media/autoscale-configure/autoscale-quotas.gif":::

Once the request is approved, the new CU limits will be refreshed and applied to your Fabric capacity. This ensures that your Autoscale Billing model can accommodate increased demand without interrupting Spark workloads.


## Related content

- [Overview of Autoscale Billing for Spark](autoscale-billing-for-spark-overview.md)
