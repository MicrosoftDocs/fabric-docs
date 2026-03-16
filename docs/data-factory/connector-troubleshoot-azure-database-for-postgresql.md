---
title: Troubleshoot the Azure Database for PostgreSQL connector
description: Learn how to troubleshoot issues with the Azure Database for PostgreSQL connector in Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom: connectors
---

# Troubleshoot the Azure Database for PostgreSQL connector in Data Factory in Microsoft Fabric

This article provides suggestions to troubleshoot common problems with the Azure Database for PostgreSQL connector in Data Factory in Microsoft Fabric.

## Error code: 23704 - AzurePostgreSqlNpgsqlDataTypeNotSupported

- **Message**: `The data type of the chosen Partition Column, '%partitionColumn;', is '%dataType;' and this data type is not supported for partitioning.`

- **Recommendation**: Pick a partition column with int, bigint, smallint, serial, bigserial, smallserial, timestamp with or without time zone, time without time zone or date data type.

## Error code: 23705 - AzurePostgreSqlNpgsqlPartitionColumnNameNotProvided

- **Message**: `Partition column name must be specified.`

- **Cause**: No partition column name is provided, and it couldn't be decided automatically.
 
## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://blog.fabric.microsoft.com/blog/category/data-factory)
- [Data Factory community](https://community.fabric.microsoft.com/t5/Data-Factory-preview-Community/ct-p/datafactory)
- [Data Factory feature requests ideas](https://ideas.fabric.microsoft.com/)
