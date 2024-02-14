---
title: Data Factory Dataflow Gen2 limitations
description: Identifies limitations that are specific to Data Factory in Microsoft Fabric Dataflow Gen2 features.
author: ssabat
ms.author: susabat
ms.topic: troubleshooting
ms.custom:
  - ignite-2023
ms.date: 1/8/2024
---

# Data Factory Dataflow Gen2 limitations

The following list describes the limitations for Dataflow Gen2 in Data Factory in Microsoft Fabric.

- Data Factory Fast Copy isn't yet available.
- Data destination to Lakehouse:
  - Spaces or special characters aren't supported in column or table names.
  - Duration and binary columns aren't supported while authoring Dataflow Gen2 dataflows.
- You need to have the latest version of the gateway installed to use with Dataflow Gen2.
- When using OAuth2 credentials, the gateway currently doesn't support refreshes longer than an hour. These refreshes will fail because the gateway cannot support refreshing tokens automatically when access tokens expire, which happens one hour after the refresh started. If you get the errors "InvalidConnectionCredentials" or "AccessUnauthorized" when accessing cloud data sources using OAuth2 credentials even though the credentials have been updated recently, you may be hitting this error. This limitation for long running refreshes exists for both VNET gateways and on-premises data gateways.
- The incremental refresh feature isn't available yet in Dataflow Gen2.
- The Delta Lake specification doesn't support case sensitive column names, so `MyColumn` and `mycolumn`, while supported in Mashup, results in a "duplicate columns" error.
- Dataflows that use a Gateway and the data destination feature are limited to an evaluation or refresh time of one hour. Read more about the [gateway considerations when using data destinations](gateway-considerations-output-destinations.md).

The following table indicates the supported data types in specific storage locations.

| **Supported data types per storage location:**  | DataflowStagingLakehouse | Azure DB (SQL) Output | Azure Data Explorer Output | Fabric Lakehouse (LH) Output | Fabric Warehouse (WH) Output |
|-------------------------------------------------|--------------------------|-----------------------|----------------------------|------------------------------|------------------------------|
| Action                                          | No                       | No                    | No                         | No                           | No                           |
| Any                                             | No                       | No                    | No                         | No                           | No                           |
| Binary                                          | No                       | No                    | No                         | No                           | No                           |
| Currency                                        | Yes                      | Yes                   | Yes                        | Yes                          | No                           |
| DateTimeZone                                    | Yes                      | Yes                   | Yes                        | No                           | No                           |
| Duration                                        | No                       | No                    | Yes                        | No                           | No                           |
| Function                                        | No                       | No                    | No                         | No                           | No                           |
| None                                            | No                       | No                    | No                         | No                           | No                           |
| Null                                            | No                       | No                    | No                         | No                           | No                           |
| Time                                            | Yes                      | Yes                   | No                         | Yes                          | Yes                          |
| Type                                            | No                       | No                    | No                         | No                           | No                           |
| Structured (List, Record, Table)                | No                       | No                    | No                         | No                           | No                           |
