---
title: OneLake Capacity Consumption
description: Information on how OneLake uses Fabric capacity and how storage is billed.
ms.author: nishas
author: nishas
ms.topic: how-to
ms.date: 02/12/2024
---

# Fabric Capacity and OneLake consumption

You only need one capacity to drive all your Microsoft Fabric experiences, including Microsoft OneLake. Keep reading if you want a detailed example of how OneLake consumes storage and compute.

## Overview 

[OneLake](../onelake/onelake-overview.md) comes automatically with every Fabric tenant and is designed to be the single place for all your analytics data. All the Fabric data items are prewired to store data in OneLake. For example, when you store data in a lakehouse or warehouse, your data is natively stored in OneLake.  
With OneLake, you pay for the data stored, similar to services like Azure Data Lake Storage (ADLS) Gen2 or Amazon S3. However, unlike other services, OneLake doesn't include a separate charge for transactions (for example, reads, writes) to your data. Instead, transactions consume from existing [Fabric capacity](../enterprise/licenses.md) that is also used to run your other Fabric experiences. For information about pricing, which is comparable to ADLS Gen2, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).
To illustrate, let’s walk through an example. Let’s say you purchase an F2 SKU with 2 Capacity Units (CU) every second. Let’s name this Capacity1. You then create Workspace1 and upload a 450 MB file to a lakehouse using the Fabric web portal. This action consumes both OneLake storage and OneLake transactions. Now, let’s dive into each of these dimensions.

## OneLake Storage
Since OneLake storage operates on a pay-as-you-go model, a separate charge for "OneLake Storage" appears in your bill corresponding to the 450 MB of data stored.
If you're a capacity admin, you can view your storage consumption in the [Fabric Capacity Metrics app](../enterprise/metrics-app-storage-page.md). Open the Storage tab and choose Experience as "lake" to see the cost of OneLake storage. If you have multiple workspaces in the capacity, you can see the storage per workspace.
 
 :::image type="content" source="media\onelake-capacity-consumption\onelake-storage.png" alt-text="Diagram showing how OneLake storage is viewed in Fabric Metrics app." lightbox="media\onelake-capacity-consumption\onelake-storage.png":::

 ## OneLake Compute
Requests to OneLake, such as reading, writing, or listing, consumes your Fabric capacity. OneLake follows similar [mapping](/azure/storage/blobs/map-rest-apis-transaction-categories) of APIs to operations like ADLS. The CU consumption per each type of operation can be viewed in the Fabric Capacity Metrics app. In our example, the file upload resulted in a write transaction that consumed 127.46 CU Seconds of Fabric Capacity. This consumption is reported as "OneLake Write via Proxy" in the operation name in Capacity Metrics App.
Now let’s read this data using a Fabric notebook. You consume 1.39 CU Seconds of read transactions. This consumption is reported as "OneLake Read via Redirect" in the Metrics app.
Refer to the [OneLake consumption page](../onelake/onelake-consumption.md) to learn more about how each type of operation consumes capacity units.
 
 :::image type="content" source="media\onelake-capacity-consumption\onelake-compute.png" alt-text="Diagram showing how OneLake compute is viewed in Fabric Metrics app." lightbox="media\onelake-capacity-consumption\onelake-compute.png":::

Notice in the screenshot that the "Billing Type" for OneLake transactions is marked as "non-billable." This classification is because OneLake transactions are currently not consuming Fabric CU seconds (see “[Known issues](../get-started/known-issues/known-issue-553-onelake-compute-transactions-not-reported-metrics-app.md)"). Reporting as "non-billable" is a temporary situation. Check [OneLake consumption](../onelake/onelake-consumption.md) for updates on when OneLake transactions change to "billable" and count against your capacity limits.

To understand more about the various terminologies on the metrics app, refer to [Understand the metrics app compute page - Microsoft Fabric](../enterprise/metrics-app-compute-page.md).

You may be wondering, how do shortcuts impact my OneLake usage? In the above scenario, both storage and compute are billed to Capacity1. Now, let’s say you have a second capacity Capacity2, that contains Workspace2. You create a lakehouse and create a shortcut to the parquet file you uploaded in workspace1. You create a notebook to query the parquet file. As Capacity2 accesses the data, the compute or transaction cost for this read operation consumes CU from Capacity2. The storage continues to be billed to Capacity1. 
 
:::image type="content" source="media\onelake-capacity-consumption\shortcut-billing.jpg" alt-text="Diagram showing how shortcut billing is done per capacity." lightbox="media\onelake-capacity-consumption\shortcut-billing.jpg":::

What if you pause the capacity? Let’s say Capacity2 is paused and Capacity1 isn't paused. When Capacity2 is paused, you can’t read the data using the shortcut from Workspace2 in Capacity2, however, you can access the data directly in Workspace1. Now, if Capacity1 is paused and Capacity2 is resumed, you can't read the data using Workspace1 in Capacity1. However, you're able to read data using the shortcut that was already created in Workspace2 in Capacity2. In both these cases, as the data is still stored in Capacity1, the data stored is billed to Capacity1.

At any point, if your CU consumption exceeds your capacity limit, your capacity is throttled. Transactions may be rejected or delayed for a given window of time when capacity is throttled. Here's more about [throttling](../enterprise/throttling.md).

We encourage you to start Fabric’s 60-day free trial to explore OneLake and other Fabric features. You may also refer to our [Fabric forum](https://community.fabric.microsoft.com/t5/Forums/ct-p/ac_forums) if you have more questions.
