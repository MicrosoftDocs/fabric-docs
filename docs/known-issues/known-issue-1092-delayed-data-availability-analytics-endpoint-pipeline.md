---
title: Known issue - Delayed data availability in SQL analytics endpoint when using a pipeline
description: A known issue is posted where data availability is delayed in SQL analytics endpoint when using a pipeline.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/11/2025
ms.custom: known-issue-1092
---

# Known issue - Delayed data availability in SQL analytics endpoint when using a pipeline

When you use a data pipeline activity to copy data into lakehouse tables, you might see a brief delay before the latest lakehouse data is accessible through the SQL analytics endpoint. This delay occurs because the metadata synchronization process needs time to complete. The metadata synchronization process ensures that all data and schema changes are accurately reflected in the SQL analytics endpoint.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

Any Fabric item, such as a dataflow refresh activity, that attempts to read a lakehouse table through the SQL analytics endpoint first triggers a metadata synchronization process. This synchronization must complete before the actual data can be read from the table, resulting in a delay.

## Solutions and workarounds

To work around the issue, add a dummy script activity immediately after the successful completion of the pipeline copy activity which loaded the data to the lakehouse table. This script wakes up the Data Warehouse engine and initiates the metadata synchronization for the lakehouse table. Following the script, you should add a subsequent item, such as a dataflow refresh activity, that reads the lakehouse table data through the SQL analytics endpoint to ensure it retrieves the most up-to-date data.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
