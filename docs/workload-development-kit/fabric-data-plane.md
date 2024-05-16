---
title: Work with customer data in Microsoft Fabric
description: Learn about how to work with customer data in Microsoft Fabric.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
#customer intent:
---

# Work with customer data in Fabric 

Microsoft Fabric OneLake is a unified, logical data lake for the entire organization, designed to be the single place for all analytics data. It comes automatically with every Microsoft Fabric tenant and is built on top of Azure Data Lake Storage (ADLS) Gen2. OneLake supports any type of file, structured or unstructured, and stores all tabular data in Delta Parquet format. It allows for collaboration across different business groups by providing a single data lake that is governed by default with distributed ownership for collaboration within a tenant’s boundaries. Workspaces within a tenant enable different parts of the organization to distribute ownership and access policies, and all data in OneLake is accessed through data items like Lakehouses and Warehouses. 

In terms of data stores, OneLake serves as the common storage location for ingestion, transformation, real-time insights, and Business Intelligence visualizations. It centralizes the different Fabric services and is the storage for data items consumed by all workloads in Fabric. 

## How to Read and Write Data in Microsoft Fabric 

Microsoft Fabric is a platform that enables the storage and management of customer data. In order to read and write data in Fabric, you need to use the Fabric REST APIs and the appropriate authentication methods. 

### Authentication 

Before you can begin using the Fabric REST APIs, you'll need to authenticate using a token. This token can be obtained through a token exchange process. 

The Fabric Extensibility SDK provides a method to acquire an access token in the Workload Frontend. This client token must be passed to the Workload Backend and exchanged using the on-behalf-of flow for a token with the necessary scopes to access your desired resource, such as OneLake. For example, in order to access and read from a Lakehouse, a user must have granted the application to make API calls on their behalf using the Azure Storage user_impersonation permission. Then, the access token must be obtained with the delegated scope "[URL]" in order to use Azure Storage. 

For examples of token authentication, please refer to the [Microsoft Fabric Developer Sample]([URL]). 

### Reading Data 

Once you have authenticated, you can connect to OneLake using Azure Data Lake Storage REST APIs to read different types of data. We recommend utilizing the delta lake protocol in order to read tables. 

### Writing Data 

In addition to reading data using the token, you can also use ADLS APIs to write data into tables as described by the delta lake protocol. 

You can also use the APIs to create files and directories. 

Alternatively, you can utilize other Fabric workloads to write data to the platform. For example, you can leverage Fabric's Lakehouse workload API to efficiently load common file types to an optimized Delta table. This is done by sending a POST or PUT request to the appropriate API endpoint. For more detailed information on how to load data to table using the Lakehouse, you can refer to the [Fabric API reference]([URL]). 

### Read Metadata 

Fabric REST APIs also provide you with a way to access the different properties of items. For example, querying the Get Lakehouse API will provide you with the metadata for a certain Lakehouse including useful properties like OneLake paths and the SQL connection string. 

For implementation examples, please refer to the [Workload development kit]([URL]).

## Related content

 