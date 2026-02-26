---
title: Set up your FHIR data connection
description: This article provides information about how to create a FHIR data connection in Microsoft Fabric.
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - connectors
---

# Set up your FHIR data connection

This article outlines the steps to create a FHIR data connection.


## Supported authentication types

The FHIR connector supports the following authentication types for copy and Dataflow Gen2 respectively.  

|Authentication type |Copy |Dataflow Gen2 |
|:---|:---|:---|
|Anonymous| n/a | √ |
|Organizational account| n/a | √ |

## Set up your connection in Dataflow Gen2

You can connect Dataflow Gen2 in Microsoft Fabric to FHIR using Power Query connectors. Follow these steps to create your connection:

1. [Get data from Data Factory in Microsoft Fabric](/power-query/where-to-get-data#get-data-from-data-factory-in-microsoft-fabric).
1. [Set up FHIR prerequisites](/power-query/connectors/fhir/fhir#prerequisites).
1. [Connect to a FHIR server (from Power Query Online)](/power-query/connectors/fhir/fhir#connect-to-a-fhir-server-from-power-query-online).

## Set up your connection in a pipeline

Data Factory in Microsoft Fabric doesn't currently support FHIR in pipelines.
