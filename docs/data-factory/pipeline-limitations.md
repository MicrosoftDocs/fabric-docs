---
title: Data Factory pipeline limitations
description: Identifies limitations that are specific to Data Factory in Microsoft Fabric pipeline features. 
author: ssabat
ms.author: susabat
ms.topic: troubleshooting    
ms.date: 9/13/2023
---

# Data Factory data pipeline limitations in Microsoft Fabric

The following list describes the limitations for pipelines in Data Factory in Microsoft Fabric.

- Most of the Azure Data Factory copy and orchestration patterns are applicable to Fabric pipelines, but [tumbling window](/azure/data-factory/how-to-create-tumbling-window-trigger) and [event triggers](/azure/data-factory/how-to-create-custom-event-trigger) aren't yet available.
- Currently, pipelines don't support Continuous Integration and Continuous Delivery (CI/CD).
- Currently, connectors don't support OAuth, Azure key vault (AKV), and Managed System Identity (MSI).
- Connectors can't leverage parameters.
- The on-premises data gateway or VNet data gateway can be used with Dataflow Gen2 to ingest on-premises data now. You can orchestrate on-premises data ingestion with a data flow activity in the pipeline.
- Currently, a pipeline on managed VNet and a gateway with on-premises data access aren't supported.
- GetMetaData activity can't have a source from KQL databases.
- Script activity can't have a source from Fabric KQL databases.
- Data pipelines are scoped to their workspace, and can't interact with items in other workspaces.  
- Copy activity uses a Web connector, whereas Web/Webhook activities use a Web v2 connector that supports more functionality, like audience and resource URI.
- Custom activity in Fabric pipelines is coming soon.

## Next steps

For information about the resource limitations for data pipelines, see [Data pipeline resource limits](pipeline-resource-limits.md).
