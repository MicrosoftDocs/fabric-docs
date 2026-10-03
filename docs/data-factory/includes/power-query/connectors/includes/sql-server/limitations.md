---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sql-server/limitations.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

### Always Encrypted columns

Power Query doesn't support 'Always Encrypted' columns.

### Microsoft Entra ID authentication

Microsoft Entra ID (Organizational account) authentication is only supported in the SQL Server connector if the specified server also supports Microsoft Entra ID authentication. Otherwise, you might encounter a `The OAuth authentication method isn't supported in this data source` error.

In Power BI service, the Microsoft Entra ID authentication method shows up as `OAuth2`.
