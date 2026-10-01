---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-limitations.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

The following limitations apply to the Power Query SAP HANA database connector.

### Connect to SAP HANA database over proxy

The SAP HANA database connector doesn't support connecting to cloud database through proxy. To work around, use the [ODBC connector](/power-query/connectors/odbc) instead and specify the proxy settings in DSN or connection string.

