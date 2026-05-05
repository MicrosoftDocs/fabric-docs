---
title: "The Cost of Mirroring for Google BigQuery"
description: Learn more about how the cost of Mirroring for Google BigQuery works. 
ms.reviewer: misaacs
ms.date: 09/09/2025
ms.topic: how-to
---

# The cost of mirroring for Google BigQuery

Fabric compute used to replicate data into OneLake is free. Mirroring storage is also free, up to a limit based on your Fabric capacity tier. However, compute used to query mirrored data—via SQL, Power BI, or Spark—is billed at standard rates. Fabric doesn't charge for network ingress when data is mirrored into OneLake.

For more information, see [Fabric Mirroring pricing](overview.md#cost-of-mirroring) and [Fabric pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).

On the Google BigQuery side, mirroring incurs compute and cloud query costs. BigQuery CDC operations use:
  
- BigQuery compute for detecting row-level changes
- BigQuery compute for Mirroring initial table loads
- Google cloud storage where temporary table data is stored for Mirroring purposes
- Google cloud storage APIs for ingesting data

Google BigQuery virtual warehouse compute charges include:
  
- Query charges are incurred on the BigQuery side **if there are data changes that need to be read in BigQuery, and in turn are being mirrored into Fabric**.
- BigQuery charges for queries **based on the amount of data scanned**.
- Queries that do produce data such as a `SELECT *` scans the full table and incur query costs accordingly.
- Although there are no compute costs for behind-the-scenes tasks such as checking schema, authoring, or metadata queries, **you will incur storage charges** for keeping your data in BigQuery.

For more information, see Google's [BigQuery cloud query costs](https://cloud.google.com/bigquery/docs/change-data-capture#CDC_pricing).

## What's free

There's no charge for configuring or running mirroring. This includes snapshot replication and change data capture (CDC) from BigQuery into OneLake.

Mirrored data is stored free of charge up to the capacity tier provisioned. For example, F2 capacity includes 2 TB of free mirrored storage and F64 capacity includes 64 TB of free mirrored storage.

The compute used to connect to BigQuery, ingest snapshot and change data, and manage replication within Fabric is fully managed and free.

For more information, see [Cost of Mirroring resources](overview.md#cost-of-mirroring).

## What can incur charges

Charges can be incurred from querying mirrored data, shortcut storage, and BigQuery egress fees.

- Query Mirrored Data: Compute charges apply when querying mirrored data using SQL analytics endpoint, Power BI, Spark, or other Fabric services.
- Shortcut storage: If you create shortcuts or other views of mirrored data, standard Fabric storage charges might apply.
- BigQuery Egress Fees: Data transferred out of BigQuery can be subject to egress charges depending on your Google Cloud billing agreement. Reference Google's [pricing overview](https://cloud.google.com/bigquery/pricing), and [estimate and control costs](https://cloud.google.com/bigquery/docs/best-practices-costs) resources.

## How to optimize cost

Mirroring itself is designed to decrease cost. Mirroring uses CDC only to replicate changes, reducing data movement and cost. The replication engine backs off when no changes are detected, reducing unnecessary compute usage.

## Related content

- For more information of BigQuery specific cloud query costs, see [BigQuery docs: Understanding overall cost](https://cloud.google.com/bigquery/docs/change-data-capture#CDC_pricing).
- For more information on the cost structure of Mirroring, see [Cost of mirroring](overview.md#cost-of-mirroring), [Microsoft Fabric Pricing](https://azure.microsoft.com/pricing/details/microsoft-fabric/).
