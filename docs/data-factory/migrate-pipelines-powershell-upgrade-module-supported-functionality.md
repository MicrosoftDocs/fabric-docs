title: Supported Functionality
description: What functionality is supported by the **Microsoft.FabricPipelineUpgrade** PowerShell module
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/20/2025
ai-usage: ai-assisted

# Supported Functionality
If an Activity isn’t available in Fabric, the Fabric Upgrader can’t upgrade it.

Global configuration and parameters aren’t supported.
`pipeline().Pipeline` isn’t supported yet.

# Supported Datasets and Linked Services
## Currently Supported
- Blob: JSON, Delimited Text, and Binary formats
- Azure SQL Database
- ADLS Gen2: JSON, Delimited Text, and Binary formats
- Azure Function: Function app URL

## Next in Priority
- Other Blob file formats (Avro, etc.)
- SQL Server (non-Azure)

# Supported Activities
## Currently Supported
- CopyActivity for supported datasets
- ExecutePipeline (converted to Fabric InvokePipeline Activity)
- IfCondition
- Wait
- Web
- SetVariable
- Azure Function
- ForEach
- Lookup
- Switch
- SqlServerStoredProcedure
