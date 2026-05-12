---
title: Storage tiers in OneLake (preview)
description: Manage your storage costs in OneLake by moving data between storage tiers.
ms.reviewer: eloldag, mabasile
ms.topic: concept-article
ms.date: 05/11/2026
#customer intent: As a workspace admin, I want to lower my storage costs for data I must retain for long periods but is otherwise rarely accessed. 
---

# OneLake storage tiers (preview)

As data volumes continue to grow, it's essential for data admins to have ways to manage the costs of storing ever-increasing amounts of data. OneLake storage tiers let you make cost-effective tiering decisions based on data access patterns, keeping frequently accessed data in the hot tier and moving less active data to cool or cold storage to lower long-term data retention costs.  

## What are storage tiers?

OneLake supports three different storage tiers: hot, cool, and cold. These tiers are the same hot, cool, and cold access tiers supported by Azure Storage. As you move from the hot tier to the cool or cold tier, static storage prices lower but transaction prices rise. This model makes the cooler tiers ideal for governance, security, or compliance scenarios, where rarely accessed data must be retained for long periods. All three tiers are online and feature the same durability, retrieval latency, and throughput characteristics, although the cool and cold tiers have slightly lower data availability than the hot tier.  

All data in OneLake lands in the hot tier by default.

### Hot tier

Use the hot tier for data you access frequently, such as active projects, dashboards, or datasets that refresh often.

- Optimized for frequent reads and writes.
- Highest storage cost per GB.
- Lowest access and transaction costs.
- No minimum retention period.

### Cool tier

Use the cool tier for data you access infrequently, such as historical fact tables, older reports, or logs that you occasionally review.

- Lower storage cost per GB than hot.
- Higher access and transaction costs than hot.
- Subject to a minimum 30-day retention period. Moving data out of cool storage earlier can result in early deletion fees.

### Cold tier

Use the cold tier for data you rarely access but must keep for long-term retention, audit, or compliance, such as multi-year logs or archived snapshots.

- Lowest storage cost per GB.
- Highest access and transaction costs.
- Subject to a minimum 90-day retention period. Moving data out of cold storage earlier can result in early movement fees.

## Change storage tiers

You can change a file's storage tier via the following methods:

- **Set Blob Tier**  

    Call the Set Blob Tier API, explicitly or through a lifecycle management policy. This API is recommended when moving data from a warmer tier to a cooler one. You can also use Azure Storage Explorer to change the tier of a file, or all files within a folder, via the "Change access tier" option when selecting a file or folder.  

- **Copy Blob**

    Call the Copy Blob operation to copy a blob from one tier to another. This API is recommended when moving a blob from a cooler tier to a warmer tier, in order to avoid the early deletion penalty. However, copying a blob results in two transaction charges, from the source and destination tier.  

- **Lifecycle management rules**  

    Define a OneLake lifecycle management to move files between tiers based on predefined rules. Lifecycle rules can move files to your choice of tier based on when they were created, last modified, or last accessed. When a lifecycle rule runs, it updates the file's tier according to the actions you define, based on when they were created, last modified, or last accessed. Lifecycle rules move data using the Set Blob Tier API. Learn more about [OneLake lifecycle management](onelake-lifecycle-management.md).  

- **Workspace default storage tier**  

    If a file doesn't have a specific tier set, OneLake uses the workspace's default storage tier. All workspaces in Fabric start with a default tier of Hot. You can change the default tier of your workspace via the Modify Default Tier API.  Changing the default tier of your workspace moves all files without an explicit tier (set via Set Blob Tier or Copy Blob) into the new default tier. You are charged for capacity consumption for the write operations when moving files to a cooler default tier, or the read and retrieval charges when changing to a warmer default tier.  

   All files uploaded to a workspace will land in the default tier. To upload a file in a different tier, you can use the 'x-ms-access-tier' header in the [Put Blob API](/rest/api/storageservices/put-blob).  

> [!NOTE]
> OneLake only supports changing the storage tier of files which are fully billable.  Any items where storage or transactions aren't billed, or only billed up to a limit, are currently exempt from tier change operations.  

## Storage tiers and OneLake consumption

Storage tiers affect both your pay-as-you-go rate for OneLake storage and your Fabric Capacity Unit (CU) consumption for OneLake transactions:

- **Storage charges:** The per-GB, per-month cost that's highest for hot storage and lowest for cold storage.

- **Transaction charges:** The per-transaction CU consumption for reading, writing, or listing data, which is lowest for hot storage and highest for cold storage.

- **Access costs:** The cool and cold tiers introduce a per-GB data retrieval fee, which consumes CUs based on the amount of data read.  

- **Early deletion penalty:** Extra charges that apply when you change the tier or delete data out of cool or cold storage before the minimum retention period. Can be avoided by copying the data out of the tier instead.  

Cool storage has a minimum 30-day retention period, and cold storage has a minimum 90-day retention period. If you move or delete data earlier, you are billed as if the data remained in that tier for the full retention period.

For more information on OneLake consumption, see [OneLake compute and storage consumption](onelake-consumption.md). For more information about pricing, see [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).  

### Consumption of tier change operations

Changing a file's tier consumes CUs differently depending on the method used:

- When a file is uploaded or moved between tiers, the new tier's storage rate immediately applies upon upload or tier change.
- When a file is moved to a cooler tier, the operation is classified as a write transaction to the destination tier.  Write transaction (every 4 MB, per 10,000) consumption rates of the destination tier apply.  
- When a file is moved to a warmer tier, the operation is classified as a read from the source tier. Read transaction (every 4 MB, per 10,000) and data retrieval (per GB) consumption rates of the source tier apply. Early deletion penalties also apply if the tier is changed before the minimum retention period (charged as pay-as-you-go storage).  

### Early deletion penalty

The cool and cold storage tiers each have a minimum number of days a file must be stored before moving or deleting the file - 30 days for the cool tier, and 90 days for the cold tier. Files are subject to an early deletion penalty if they're deleted, overwritten, or moved to a different tier before this minimum storage period. For example, if a blob is moved to the cool tier and deleted after 21 days, you'll be charged an early deletion fee equivalent to nine days of storage (30 day minimum minus 21 days stored). This charge is prorated based on the data storage price of the corresponding tier. Files in a soft-deleted state aren't subject to the early deletion penalty. The penalty only applies if the retention period expires and the file is permanently deleted before the minimum storage period.  

## Example: saving on storage costs through tiering

The following example shows how tiering can reduce storage costs over time, especially for infrequently accessed data.

Assume you have 10 TB of data that must be retained for five years. Once per year you perform a compliance audit, which reads approximately 10% (1 TB) of the data.

The following table shows the cost of storing the data for five years at the hot, cool, and cold tiers:

| Tier | Storage rate | Monthly storage cost | Total storage cost (60 months) |
|------|--------------------------|----------------------|--------------------------------|
| Hot  | $0.023 per GB            | $230/month           | $13,800                        |
| Cool | $0.0125 per GB           | $125/month           | $7,500                         |
| Cold | $0.004 per GB            | $40/month            | $2,400                         |

By moving data to the cool or cold tier, you can lower your monthly storage costs significantly. But the cool and cold tiers also come with higher capacity consumption (CUs).

The following table shows the total CU consumption for the yearly compliance audit, considering both the read transactions and data retrieval fee (for cool/cold tier). To help illustrate the increase in consumption, you can also calculate the percent of your F64 capacity utilized by the 1-TB read.

| Tier | Total CU consumption | Daily % of F64 capacity |
|------|----------------------|-------------------------|
| Hot  | 2,600 CU seconds     | 0.0004%                 |
| Cool | 206,500 CU seconds   | 4%                      |
| Cold | 665,000 CU seconds   | 12%                     |

As shown, accessing large amounts of data in the cool or cold tiers can increase your capacity consumption significantly. Be sure to estimate your consumption and size your capacity appropriately. A temporary increase in capacity size isn't likely to outweigh the amount you save in storage costs from keeping your data in the cool or cold tier!

## Best practices for tiering your data

Following are some simple guidelines for optimizing your costs through efficient tiering in OneLake.

- To find the optimal access tier, estimate what percentage of the data is read each month. The hot tier is generally cost-effective when at least 50% of the data is read per month.
- Use lifecycle rules to move data to cool or cold storage automatically.
- Load historical data directly to the cool or cold access tier to save on tier change transactions.

## Updates to OneLake consumption reporting

As part of the rollout of OneLake storage tiers, OneLake compute operations reporting is changing for  capacity billing. These updates improve clarity and align reporting with the new storage tier model. There's no change to billing rates.

Key updates include:

- Operation names include the storage tier. For example, “OneLake Read via Proxy” becomes “OneLake Read (Hot).”
- Proxy and Redirect operations are consolidated. Operations previously reported separately now appear under a single operation name. Because consumption rates are the same, there's no effect on billing.
- Operations are reported at the workspace level. A new OneLake item in the Fabric Capacity Metrics app groups operations by workspace instead of individual items. For item-level detail, use OneLake diagnostics to understand usage across Fabric and non-Fabric workloads.
- Units of measure and consumption rates remain unchanged.

## Limitations

- After enabling lifecycle management or storage tiers, you'll be charged for Oracle and MS SQL operations. Upgrading to the [on-premises data gateway version 3000.314.5](https://www.microsoft.com/download/details.aspx?id=53127) or later makes these mirroring operations free again.

## Related content

- [OneLake lifecycle management](onelake-lifecycle-management.md)
- [OneLake compute and storage consumption](onelake-consumption.md)
