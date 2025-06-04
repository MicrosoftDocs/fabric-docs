---
title: Get data from Serilog
description: Learn how to get data from Serilog in a KQL database in Real-Time Intelligence.
ms.reviewer: ramacg
ms.author: spelluru
author: spelluru
ms.topic: how-to
ms.custom:
ms.date: 11/19/2024
---
# Get data from Serilog

[!INCLUDE [ingest-data-serilog](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-serilog.md)]

For a complete list of data connectors, see [Data connectors overview](data-connectors/data-connectors.md).

## Prerequisites

* .NET SDK 6.0 or later
* A [KQL database](/fabric/real-time-analytics/create-database).
* An Azure subscription. Create a [free Azure account](https://azure.microsoft.com/free/).<a id=ingestion-uri></a>
* Your database ingestion URI to use as the *TargetURI* value. For more information, see [Copy URI](access-database-copy-uri.md#copy-uri).

[!INCLUDE [ingest-data-serilog-2](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-serilog-2.md)]

[!INCLUDE [ingest-data-serilog-3](~/../kusto-repo/data-explorer/includes/cross-repo/ingest-data-serilog-3.md)]

3. Select your [target KQL database](access-database-copy-uri.md) and run the following query to explore the ingested data, replacing the placeholder *TableName* with the name of the target table:

    ```kusto
    <TableName>
    | take 10
    ```

    Your output should look similar to the following output:

    |Timestamp  |Level  |Message  |Exception  | Properties | Position | Elapsed |
    |---------|---------|---------|---------|---------|---------|---------|
    | 2023-03-12 1248:474590 | Information | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 1248474770 | Warning | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 1248475590 | Error| Zohar Processed {  Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 1248474790 | Information | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5610 | Warning | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5620 | Error| Zohar Processed {  Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5630 | Information | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5660 | Error| Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5670 | Information | Zohar Processed {  Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |
    | 2023-03-12 124847.5680 | Warning | Processed { Latitude: 25, Longitude:30} | |  {"Position":  { "Latitude": 25, "Longitude":30} | { "Latitude": 25, "Longitude":30} |34 |

## Related content

* [Create a KQL database](create-database.md)
* [Data connectors overview](data-connectors/data-connectors.md)
