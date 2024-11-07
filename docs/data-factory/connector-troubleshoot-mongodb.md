---
title: Troubleshoot the MongoDB connector
titleSuffix: Fabric Data Factory & Azure Synapse
description: Learn how to troubleshoot issues with the MongoDB connector in Fabric Data Factory and Azure Synapse Analytics. 
author: jianleishen
ms.subservice: data-movement
ms.topic: troubleshooting
ms.date: 11/06/2024
ms.author: jianleishen
ms.custom: has-adal-ref, synapse
---

# Troubleshoot the MongoDB connector in Azure Data Factory and Azure Synapse

[!INCLUDE[appliesto-adf-asa-md](includes/appliesto-adf-asa-md.md)]

This article provides suggestions to troubleshoot common problems with the MongoDB connector in Azure Data Factory and Azure Synapse.

## Error code: MongoDbUnsupportedUuidType

- **Message**:
    `Failed to read data via MongoDB client.,
    Source=Microsoft.DataTransfer.Runtime.MongoDbV2Connector,Type=System.FormatException,
    Message=The GuidRepresentation for the reader is CSharpLegacy which requires the binary sub type to be UuidLegacy not UuidStandard.,Source=MongoDB.Bson,’“,`

- **Cause**: When you copy data from Azure Cosmos DB MongoAPI or MongoDB with the universally unique identifier (UUID) field, there are two ways to represent the UUID in Binary JSON (BSON): UuidStardard and UuidLegacy. By default, UuidLegacy is used to read data. You will receive an error if your UUID data in MongoDB is UuidStandard.

- **Resolution**: In the MongoDB connection string, add the *uuidRepresentation=standard* option. For more information, see [MongoDB connection string](connector-mongodb.md#linked-service-properties).

## Related content

For more troubleshooting help, try this resource:

- [Connector troubleshooting guide](connector-troubleshoot-guide.md)
