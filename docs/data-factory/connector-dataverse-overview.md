---
title: Dataverse connector overview
description: This article provides an overview of the supported capabilities of the Dataverse connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Dataverse connector overview

This Dataverse connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

To learn about how to connect to Dataverse in Dataflow Gen2, go to [Set up your connection in Dataflow Gen2](connector-dataverse.md#set-up-your-connection-in-dataflow-gen2).

## Support in data pipelines

The Dataverse connector supports the following capabilities in data pipelines:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/destination)** | None <br> On-premises | Service principal |
| **Lookup activity** | None <br> On-premises | Service principal|

To learn about the copy activity configuration for Dataverse in data pipelines, go to [Configure Dataverse in a copy activity](connector-dataverse-copy-activity.md).
