---
title: Include file for supported property types
description: Include file for supported property types for ontology (preview) data binding
ms.topic: include
ms.date: 03/31/2025
---

## Supported property types

The following table lists the supported property types for data that can be bound to properties in ontology (preview).

| Ontology property value type | Supported Lakehouse types | Supported Eventhouse types |
| --- | --- | --- |
| integer | tinyint, smallint, bigint, integer, long, short | int, long |
| boolean | boolean | bool |
| datetime | datetime, date, timestamp | datetime |
| double | double, decimal, float | Decimal, real |
| string | char, decimal(p, s), string, array, binary, binary16, byte, map, object, struct, timestampint64, timestamp_ntz | dynamic, string, guid, timespan |

The following table shows supported property types that can be used as the source data timestamp column.

| Ontology configuration | Lakehouse and Eventhouse source column value type |
| --- | --- |
| Timestamp | datetime, date, timestamp |

The following table shows supported property types that can be used as the entity type key.

| Ontology configuration | Ontology property value type |
| --- | --- |
| Entity type key | string, integer |

If your data contains other data types, perform ETL to convert the data to one of the supported types before bringing the data to ontology.