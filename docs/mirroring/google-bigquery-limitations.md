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
> We currently support Mirroring for Google BigQuery for On-Premises Data Gateway (OPDG). Utilize version 3000.286.6 or greater

## Database level limitations

When mirroring tables without primary keys, you can only perform insert-only changes to ensure data accuracy. If non-insert changes are found, the table automatically reseeds (the table is remirrored in its entirely). If multiple non-insert changes occur following that initial reseed, Mirroring goes into a backoff state for a time; the backoff state helps keep down costs and limits unnecessary full-table replication. After the backoff period, the table will return to its normal state of Mirroring (continuous data replication).

## Performance limitations

If you're changing most the data in a large table, it's more efficient to stop and restart Mirroring. Inserting or updating billions of records can take a long time.

Mirrored data typically reflects changes with a [10–15 minute delay due to BigQuery’s Change Data Capture (CDC) architecture](https://cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions#changes).
If no changes are detected, the replication engine enters a backoff mode, increasing polling intervals up to 1 hour.

## Supported region limitations

Database mirroring is available in all Microsoft Fabric regions. For more information, see [Fabric region availability](../admin/region-availability.md).

## Permissioning limitations

We understand that some customers are hesitant to enable edit permissions for Mirroring for Google BigQuery. Mirroring creates a live-twin, editable consumption replica of your BigQuery data in OneLake. To support Mirroring for Google BigQuery, the replication engine must:

  - Access and export data from BigQuery tables
  - Track changes using Change Data Capture (CDC)
  - Create temporary datasets and jobs for replication
  - Interact with Google Cloud Storage for staging and ingestion

## Related content

- [Google BigQuery mirroring overview](google-bigquery.md)
- [Tutorial to set up mirroring for Google BigQuery](google-bigquery-tutorial.md)
