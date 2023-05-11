---
title: Known issues and limitations in Data Factory in Microsoft Fabric.
description: This article covers known issues and limitations in Data Factory in Microsoft Fabric.
author: ssabat
ms.topic: troubleshooting
ms.date: 05/23/2023
ms.author: susabat
---

# Known issues and limitations in Data Factory in Microsoft Fabric

This article covers known issues and limitations in Data Factory in Microsoft Fabric.

[!INCLUDE [df-preview-warning](includes/data-factory-preview-warning.md)]

## Pipeline known issues

- Error messages in Dataflow Gen 2 refresh and pipeline orchestration of those dataflows may be different, so you should  check both error messages to decide next steps when troubleshooting.
- If you enable *vertipaq* during Copy, performance is slow due to extra compression.
- If you use Copy Assist, you can't skip Data Preview step. If you want the same, use Copy activity.
- Pipeline tasks are Azure Data Factory templates, but not all the templates available in Azure Data Factory are available in the gallery.
- Dataflows Gen2 and pipeline Copy activities don't have non-Azure output connectors for AWS S3, GCS and others as of May 2023.
- Pipeline scheduled runs are displayed as Manual in run history monitoring.
- Snowflake can't handle password contains \"&\" in Data pipeline.

## Pipeline limitations

- If your capacity isn't in the same region as storage accounts, copy throughput can be low.
- Email and Teams activities don't support dynamic content out of the box, but can be achieved with dynamic expressions with HTML tags in the content.
- Most of Azure Data Factory copy and orchestration patterns are applicable to Fabric Pipelines, but Tumbling and Event triggers aren't available as of May 2023.
- Pipelines don't support CI/CD as of May 2023.
- Connectors don't support MSI/UAMI as of May 2023.
- On-premises gateway or VNET gateway can be used with Dataflows Gen2 to ingest on-premises data now. You can orchestrate on-premises data ingestion with data flow activity in pipeline.

## Dataflows Gen2 known issues

- Lakehouse/Datawarehouse-based compute or storage may not be available in all regions. If not available, check with  support.
- Refresh history activities have a complex name: _WriteToDatabaseTableFrom_TransformForOutputToDatabaseTableFrom\_\[QUERYNAME\]_.
- A Dataflow Gen 2 that was created can't be renamed from the Query Editor.
- Reopen a Dataflow Gen 2 and you can edit the name from the flyout above the ribbon.
- Refresh History doesn't report Compute type used during refresh.
- Dataflow Gen 2 doesn't show up when you have no fabric capacity attached to your workspace.
- When exporting/importing a PQ template with output destinations, extra queries show up. You need to remove these manually.

## Dataflows Gen2 limitations

- Data factory Fast Copy is not yet available.
- You must have the latest version of the gateway installed in order to use with Dataflows Gen 2.
- Duration and binary columns aren't supported while authoring in Dataflows Gen2.
- Output destination to Lakehouse:
  - **DateTimeZone**, **Time**, and **DateTime** columns aren't supported.
  - Spaces or special characters aren't supported in column or table names.
  - No option exists to "auto fixup" invalid column names in Lakehouse connector.
    
## Next steps

- [Differences between Data Factory in Fabric and Azure](compare-fabric-data-factory-and-azure-data-factory.md)
- [Differences between Dataflows Gen1 and Gen2 in Microsoft Fabric](dataflows-gen2-overview.md)
