---
title: Data type conversion in a copy activity
description: Learn how to configure advanced mapping settings.
ms.reviewer: jianleishen
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/29/2025
---

# Data type conversion in a copy activity

This article describes how to configure advanced settings in a copy activity **Mappings** tab besides the basic settings introduced in [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab).

## Configure your type conversion

On Mapping tab, expand **Type conversion settings** to configure your type conversion if needed. 

   :::image type="content" source="media/data-type-mapping/mapping-type-conversion.png" alt-text="Screenshot of mapping type conversion." lightbox="media/data-type-mapping/mapping-type-conversion.png":::

The following settings are supported in copy activity for data type conversion. 

|Setting  |Description  |
|---------|---------|
|**Allow data truncation** |Allow data truncation when converting source data to destination with different type during copy. For example, from decimal to integer, from DatetimeOffset to Datetime.  |
|**Treat boolean as number** | Treat boolean as number. For example, treat true as 1. |
|**Date format** |Format string when converting between dates and strings, for example "yyyy-MM-dd". For more information, see [Custom date and time format strings](/dotnet/standard/base-types/custom-date-and-time-format-strings).<br><br>The date column can be read as date type for:<br>&nbsp;• [Amazon RDS for SQL Server](connector-amazon-rds-for-sql-server-copy-activity.md)<br>&nbsp;• [Azure SQL Database](connector-azure-sql-database-copy-activity.md)<br>&nbsp;• [Azure SQL Managed Instance](connector-azure-sql-managed-instance-copy-activity.md)<br>&nbsp;• [Azure Synapse Analytics](connector-azure-synapse-analytics-copy-activity.md)<br>&nbsp;• [Delimited text format](format-delimited-text.md)<br>&nbsp;• [Lakehouse Table](connector-lakehouse-copy-activity.md)<br>&nbsp;• [Parquet format](format-parquet.md)<br>&nbsp;• [SQL server](connector-sql-server-copy-activity.md)|
|**DateTime format** |Format string when converting between dates without time zone offset and strings. For example, "yyyy-MM-dd HH:mm:ss.fff". |
|**DateTimeOffset format** | Format string when converting between dates with time zone offset and strings. For example, "yyyy-MM-dd HH:mm:ss.fff zzz".|
|**TimeSpan format**| Format string when converting between time periods and strings. For example, "dd\.hh\:mm\:ss".|
|**Culture**| Culture information to be used when convert types. For example, "en-us", "fr-fr".|

## Configure your column flatten settings

On Mapping tab, expand **Column flatten settings** to configure your column flatten if needed. Applies to the following connectors/formats:

- [Azure Cosmos DB for NoSQL](connector-azure-cosmosdb-for-nosql-copy-activity.md)
- [Azure Cosmos DB for MongoDB](connector-azure-cosmos-db-for-mongodb-copy-activity.md)
- [JSON](format-json.md)
- [Microsoft 365](connector-microsoft-365-copy-activity.md)
- [MongoDB](connector-mongodb-copy-activity.md)
- [MongoDB Atlas](connector-mongodb-atlas-copy-activity.md)
- [REST](connector-rest-copy-activity.md)
- [XML](format-xml.md)

:::image type="content" source="media/data-type-mapping/mapping-column-flatten-settings.png" alt-text="Screenshot of column flatten settings." lightbox="media/data-type-mapping/mapping-column-flatten-settings.png":::

See the following table for the setting details.

|Setting  |Description  |
|---------|---------|
|**Treat array as string** | Specify to treat array values as string. |
|**Treat struct as string** |  Specify to treat struct values as string.|
|**Flatten column delimiter** | Specify the flatten column delimiter, and the default is `.`. This setting isn't available when you enable **Treat struct as string**. |



## Related content

- [Connector overview](connector-overview.md)
- [How to copy data using copy activity](copy-data-activity.md)
