---
title: Data Factory pipeline limitations
description: Identifies limitations that are specific to Data Factory in Microsoft Fabric pipeline features.
author: ssabat
ms.author: susabat
ms.topic: troubleshooting
ms.custom:
  - ignite-2023
ms.date: 11/15/2023
---

# Data Factory data pipeline limitations in Microsoft Fabric

The following list describes the current limitations of pipelines in Data Factory in Microsoft Fabric.

- Most of the Azure Data Factory copy and orchestration patterns are applicable to Fabric pipelines, but [tumbling window](/azure/data-factory/how-to-create-tumbling-window-trigger) and [event triggers](/azure/data-factory/how-to-create-custom-event-trigger) aren't yet available.
- Pipelines don't support Continuous Integration and Continuous Delivery (CI/CD).
- Connectors don't support OAuth, Azure key vault (AKV), and Managed System Identity (MSI).
- Connectors can't use parameters.
- GetMetaData activity can't have a source from Fabric KQL databases.
- Script activity can't have a source from Fabric KQL databases.
- Copy activity uses a Web connector, whereas Web/Webhook activities use a Web v2 connector that supports richer functionality, like audience and resource URI.
- Custom activities aren't available in Fabric pipelines. Use Azure Batch activity in stead.
- Data pipelines are scoped to their workspace, and can't interact with items in other workspaces.
- The on-premises data gateway can be used with Dataflow Gen2 to ingest on-premises data now. You can orchestrate on-premises data ingestion with a data flow activity in the pipeline.
- Pipelines can't use a managed VNet.
- Web activity does not support service principal based authentication.

## Related content

For information about the resource limitations for data pipelines, see [Data pipeline resource limits](pipeline-resource-limits.md).
