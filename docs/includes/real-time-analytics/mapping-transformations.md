---
title: Include file for the Mapping transformations heading in Real-Time Analytics
description: Include file for the Mapping transformations heading in the Get data hub in Real-Time Analytics
author: YaelSchuster
ms.author: yaschust
ms.topic: include
ms.custom: build-2023
ms.date: 09/18/2023
---
### Mapping transformations

Some data format mappings (Parquet, JSON, and Avro) support simple ingest-time transformations. To apply mapping transformations, create or update a column in the [Edit columns](#edit-columns) window.

Mapping transformations can be performed on a column of type string or datetime, with the source having data type int or long. Supported mapping transformations are:

* DateTimeFromUnixSeconds
* DateTimeFromUnixMilliseconds
* DateTimeFromUnixMicroseconds
* DateTimeFromUnixNanoseconds
