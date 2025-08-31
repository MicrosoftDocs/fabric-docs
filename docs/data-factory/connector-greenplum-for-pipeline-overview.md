---
title: Greenplum for Pipeline connector overview
description: This article provides an overview of the supported capabilities of the Greenplum for Pipeline connector.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 05/18/2025
ms.custom:
  - template-how-to
---

# Greenplum for Pipeline connector overview

The Greenplum for Pipeline connector is supported in Data Factory for [!INCLUDE [product-name](../includes/product-name.md)] with the following capabilities.

## Support in Dataflow Gen2

Data Factory in Microsoft Fabric doesn't currently support Greenplum for Pipeline in Dataflow Gen2.

## Support in a pipeline

The Greenplum for Pipeline connector supports the following capabilities in a pipeline:

| Supported capabilities | Gateway | Authentication |
| --- | --- | ---|
| **Copy activity (source/-)** | None <br>On-premises| Basic |
| **Lookup activity** | None <br>On-premises | Basic |

To learn more about the copy activity configuration for Greenplum for Pipeline in a pipeline, go to [Configure in a pipeline copy activity](connector-greenplum-for-pipeline-copy-activity.md).
