---
title: "Limitations in Microsoft Fabric mirrored databases from Google BigQuery"
description: Learn about the limitations in mirrored databases from Google BigQuery in Microsoft Fabric.
author: misaacs
ms.author: misaacs
ms.reviewer: 
ms.date: 09/09/2025
ms.topic: concept-article
---

# Limitations in Microsoft Fabric mirrored databases from Google BigQuery

This guide helps you learn more about the existing limitations in your mirrored BigQuery in Microsoft Fabric.

> [!IMPORTANT]
> We currently support Mirroring for Google BigQuery for on-premises Data Gateway (OPDG). Utilize version 3000.286.6 or greater. VNET is also now supported.

## Database level limitations

When mirroring tables without primary keys, you can only perform insert-only changes to ensure data accuracy. If noninsert changes are found, the table automatically reseeds (the table is remirrored in its entirely). If multiple noninsert changes occur following that initial reseed, Mirroring goes into a backoff state for a time; the backoff state helps keep down costs and limits unnecessary full-table replication. After the backoff period, the table will return to its normal state of Mirroring (continuous data replication).

## Performance limitations

If you're changing most the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.

Mirrored data typically reflects changes with a [10–15 minute delay due to BigQuery’s Change History capabilities](https://cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#changes).
If no changes are detected, the replication engine enters a backoff mode, increasing polling intervals up to 1 hour.

## Supported region limitations

Database mirroring is available in all Microsoft Fabric regions. For more information, see [Fabric region availability](../admin/region-availability.md).

## Permissioning limitations

We understand that some customers are hesitant to enable edit permissions for Mirroring for Google BigQuery. Mirroring creates a live-twin, editable consumption replica of your BigQuery data in OneLake. To support Mirroring for Google BigQuery, the replication engine must:

  - Access and export data from BigQuery tables
  - Track changes using Change Data Capture (CDC)
  - Create temporary datasets and jobs for replication
  - Interact with Google Cloud Storage for staging and ingestion

## Reseed Limitations 

The CHANGES function, which enables change tracking in BigQuery tables using Google’s CDC change history technology, is subject to several important reseeding limitations that users should consider when implementing Mirroring solutions:  

- Time Travel Limitation: The CHANGES function only returns data within the table’s configured time travel window. For standard tables, this is typically seven days but may be shorter if configured differently. Any changes outside this window are inaccessible.  
- Timestamp Limitation: The change history time window for CHANGES TVF exceeds the maximum allowed time. The maximum allowed range between `start_timestamp` and `end_timestamp` is one day. This restricts batch processing of longer historical windows, and multiple queries may be required for broader coverage.  
-Change History Limitation: The CHANGES function requires that change history tracking be enabled for the table prior to use. If it isn't enabled, delta changes can't be queried.  
- Multi-statement Limitation: The CHANGES function can't be used inside multi-statement transactions. It also can't query tables that had multi-statement transactions committed in the requested time window.  

To learn more, please reference [Google's BigQuery Change History Limitation Documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#changes). 


## Related content

- [Google BigQuery mirroring overview](google-bigquery.md)
- [Tutorial to set up mirroring for Google BigQuery](google-bigquery-tutorial.md)
