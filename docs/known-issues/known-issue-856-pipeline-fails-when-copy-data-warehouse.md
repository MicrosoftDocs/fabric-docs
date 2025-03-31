---
title: Known issue - Pipeline fails when copying data to data warehouse with staging
description: A known issue is posted where a data pipeline fails when copying data to data warehouse with staging.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/25/2024
ms.custom: known-issue-856
---

# Known issue - Pipeline fails when copying data to data warehouse with staging

The data pipeline copy activity fails when copying data from Azure Blob Storage to a Data Warehouse with staging enabled. Since staging is enabled, the copy activity uses parquet as the staging format; however, the parquet string type can't be copied into a decimal type in the data warehouse.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

The pipeline copy activity fails with and error similar to: `ErrorCode=DWCopyCommandOperationFailed,'Type=Microsoft.DataTransfer.Common.Shared.HybridDeliveryException,Message='DataWarehouse' Copy Command operation failed with error ''Column '' of type 'DECIMAL(32, 6)' is not compatible with external data type 'Parquet physical type: BYTE_ARRAY, logical type: UTF8', please try with 'VARCHAR(8000)'`.

## Solutions and workarounds

To work around this issue: First, copy the data into the lakehouse table with `decimal` type. Then, copy the data from the lakehouse table into to the data warehouse.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
