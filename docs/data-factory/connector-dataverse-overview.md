---
title: Dataverse connector overview
description: This article provides an overview of the supported capabilities of the Dataverse connector.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 12/04/2025
ms.custom:
  - template-how-to
  - connectors
---

# Dataverse connector overview

This Dataverse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Supported capabilities

| Supported capabilities| Gateway | Authentication|
|---------| --------| --------|
| **Dataflow Gen2** (source/-)|None<br> On-premises<br> Virtual network |Organizational account<br> Service principal<br> Workspace identity |
| **Pipeline**<br>- [Copy activity](connector-dataverse-copy-activity.md) (source/destination) <br>- Lookup activity    |None<br> On-premises<br> Virtual network |Organizational account<br> Service principal<br> Workspace identity |
| **Copy job** (source/destination) <br>- Full load<br>- Append <br>- Upsert|None<br> On-premises<br> Virtual network |Organizational account<br> Service principal<br> Workspace identity |


## Related content

To learn about how to connect to Dataverse, go to [Set up your Dataverse connection](connector-dataverse.md).

To learn about the copy activity configuration for Dataverse in pipelines, go to [Configure Dataverse in a copy activity](connector-dataverse-copy-activity.md).
