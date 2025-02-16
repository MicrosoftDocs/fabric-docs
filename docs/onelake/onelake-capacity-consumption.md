---
title: OneLake capacity consumption example
description: Information on how OneLake uses Fabric capacity and how storage is billed with capacity consumption examples.
ms.author: nishas
author: nishas
ms.topic: how-to
ms.date: 12/24/2024
#customer intent: As a capacity admin, I want to understand how OneLake consumes storage and compute so that I can effectively manage my capacity and optimize costs.
---

# Fabric capacity and OneLake consumption

You only need one capacity to drive all your Microsoft Fabric experiences, including Microsoft OneLake. Keep reading if you want a detailed example of how OneLake consumes storage and compute.

## Overview

[OneLake](../onelake/onelake-overview.md) comes automatically with every Fabric tenant and is designed to be the single place for all your analytics data. All the Fabric data items are prewired to store data in OneLake. For example, when you store data in a lakehouse or warehouse, your data is natively stored in OneLake.

With OneLake, you pay for the data stored, similar to services like Azure Data Lake Storage (ADLS) Gen2 or Amazon S3. However, unlike other services, OneLake doesn't include a separate charge for transactions (for example, reads, writes) to your data. Instead, transactions consume from existing [Fabric capacity](../enterprise/licenses.md) that is also used to run your other Fabric experiences. For information about pricing, which is comparable to ADLS Gen2, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

To illustrate, let’s walk through an example.

* Let’s say you purchase an F2 SKU with 2 Capacity Units (CU) every second. Let’s name this *Capacity1*.

* You then create *Workspace1* and upload a 450 MB file to a lakehouse using the Fabric portal. This action consumes both OneLake storage and OneLake transactions.

Now, let’s dive into each of these dimensions.

## OneLake Storage

Since OneLake storage operates on a pay-as-you-go model, a separate charge for "OneLake Storage" appears in your bill corresponding to the 450 MB of data stored.

If you're a capacity admin, you can view your storage consumption in the [Fabric Capacity Metrics app](../enterprise/metrics-app-storage-page.md). Open the **Storage** tab and choose **Experience** as **lake** to see the cost of OneLake storage. If you have multiple workspaces in the capacity, you can see the storage per workspace.

:::image type="content" source="media\onelake-capacity-consumption\onelake-storage.png" alt-text="Diagram showing how OneLake storage is viewed in Fabric Metrics app." lightbox="media\onelake-capacity-consumption\onelake-storage.png":::

The following image, shows two columns: **Billable storage** and **Current Storage**. Billable storage reflects cumulative data usage over the month. Because the total charge for data stored isn't taken on one day of the month, but on a pro-rated basis throughout the month. You can estimate the monthly price as the billable storage (GB) multiplied by the price per GB per month.

For example, storing 1 TB of data on day 1, adds to 33 GB daily billable storage. On day one it's 1 TB / 30 days = 33 GB and every day adds 33 GB until the month ends. [OneLake soft delete](/fabric/onelake/onelake-disaster-recovery#soft-delete-for-onelake-files) protects individual files from accidental deletion by retaining files for a default retention period before it's permanently deleted. Soft-deleted data is billed at the same rate as active data.

:::image type="content" source="media\onelake-capacity-consumption\storage.png" alt-text="Diagram shows billable and current storage difference." lightbox="media\onelake-capacity-consumption\storage.png":::

## OneLake Compute

Requests to OneLake (e.g., read, write, or list) consume Fabric capacity. OneLake [maps](/azure/storage/blobs/map-rest-apis-transaction-categories) APIs to operations like ADLS. Capacity usage for each operation is visible in the Capacity Metrics app. In the above example, the file upload resulted in a write transaction consuming 127.46 CU seconds. This consumption is reported as **OneLake Write via Proxy** under the operation name column in the capacity metrics App.

Now if you read this data using a notebook. You consume 1.39 CU seconds of read transactions. This consumption is reported as **OneLake Read via Redirect** in the metrics app. See [OneLake consumption page](../onelake/onelake-consumption.md) to learn how each type of operation consumes capacity units.

:::image type="content" source="media\onelake-capacity-consumption\onelake-compute.png" alt-text="Diagram showing how OneLake compute is viewed in Fabric Metrics app." lightbox="media\onelake-capacity-consumption\onelake-compute.png":::

To understand more about the various terminologies on the metrics app, see [Understand the metrics app compute page - Microsoft Fabric](../enterprise/metrics-app-compute-page.md).

You may be wondering, how do shortcuts affect my OneLake usage? In the above example, both storage and compute are billed to Capacity1. Now, let’s say you have a second capacity *Capacity2*, that contains *Workspace2*. You create a lakehouse and create a shortcut to the parquet file you uploaded in Workspace1. You create a notebook to query the parquet file. As Capacity2 accesses the data, the compute or transaction cost for this read operation consumes CU from Capacity2. The storage continues to be billed to Capacity1.

:::image type="content" source="media\onelake-capacity-consumption\shortcut-billing.jpg" alt-text="Diagram showing how shortcut billing is done per capacity." lightbox="media\onelake-capacity-consumption\shortcut-billing.jpg":::

* If Capacity2 is paused but Capacity1 is active, you can’t read the data via the shortcut in Workspace2 (Capacity2) but can access the data directly in Workspace1 (Capacity1).

* If Capacity1 is paused and Capacity2 is active, you can’t read the data in Workspace1 (Capacity1) but you can still use the data using the shortcut in Workspace2. In both cases, as the data is still stored in Capacity1, storage costs remain billed to Capacity1

If your CU consumption exceeds the capacity limit, [throttling](../enterprise/throttling.md) may occur, causing transactions to be delayed or rejected temporarily.

Start Fabric’s 60-day free trial to explore OneLake and other features, and visit the [Fabric forum](https://community.fabric.microsoft.com/t5/Forums/ct-p/ac_forums) for questions.