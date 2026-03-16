---
title: Data type mapping in data movement
description: Learn the principle of data type mapping.
ms.reviewer: jianleishen
ms.topic: how-to
ms.custom: pipelines, copy-job
ms.date: 09/29/2025
---

# Data type mapping in data movement

This article introduces the data type mapping principle for Copy activity in pipelines and Copy job. 

## Data type mapping principle

Copy activity in pipelines and Copy job perform source types to destination types mapping with the following flow: 

1. Convert from source native data types to interim data types used by Fabric Data Factory.
2. Automatically convert interim data type as needed to match corresponding destination types.
3. Convert from interim data types to destination native data types.

Copy activity in pipelines and Copy job currently support the following interim data types: Boolean, Byte, Byte array, Datetime, DatetimeOffset, Decimal, Double, GUID, Int16, Int32, Int64, SByte, Single, String, Timespan, UInt16, UInt32, and UInt64.

The following data type conversions are supported between the interim types from source to destination.

| Source\Destination  | Boolean | Byte array | Date/Time | Decimal | Float-point | GUID | Integer | String | TimeSpan |
| ----------- | ------- | ---------- | ------------- | ------- | --------------- | ---- | ------------ | ------ | -------- |
| Boolean     | ✓       |            |               | ✓       |                 |      | ✓            | ✓      |          |
| Byte array  |         | ✓          |               |         |                 |      |              | ✓      |          |
| Date/Time   |         |            | ✓             |         |                 |      |              | ✓      |          |
| Decimal     | ✓       |            |               | ✓       |                 |      | ✓            | ✓      |          |
| Float-point | ✓       |            |               | ✓       |                 |      | ✓            | ✓      |          |
| GUID        |         |            |               |         |                 | ✓    |              | ✓      |          |
| Integer     | ✓       |            |               | ✓       |                 |      | ✓            | ✓      |          |
| String      | ✓       | ✓          | ✓             | ✓       |                 | ✓    | ✓            | ✓      | ✓        |
| TimeSpan    |         |            |               |         |                 |      |              | ✓      | ✓        |

(1) Date/Time includes DateTime, DateTimeOffset, Date and Time.

(2) Float-point includes Single and Double.

(3) Integer includes SByte, Byte, Int16, UInt16, Int32, UInt32, Int64, and UInt64.

To learn the detailed data type conversions for a particular connector, go to the copy activity configuration article for that connector from [here](connector-overview.md).

> [!NOTE]
> Currently such data type conversion is supported when copying between tabular data. Hierarchical sources/destinations are not supported, which means there is no system-defined data type conversion between source and destination interim types.


## Related content

 - [Data type mapping in a copy activity](data-type-mapping.md)