---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/databricks-azure/databricks-azure-limitations-and-considerations.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

* The Azure Databricks connector supports [web proxy](/power-bi/connect-data/desktop-troubleshooting-sign-in#using-default-system-credentials-for-web-proxy). However, automatic proxy settings defined in .pac files aren't supported.
* In the Azure Databricks connector, the `Databricks.Query` data source isn't supported in combination with Power BI semantic model's DirectQuery mode.
