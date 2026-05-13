---
title: Include file
description: Include file
author: billmath
ms.topic: include
ms.date: 09/20/2024
ms.author: billmath
---
## Considerations and limitations

You can see the current limitations for row-level security on cloud models here:

* If you previously defined roles and rules in the Power BI service, you must re-create them in Power BI Desktop.
* You can define RLS only on the semantic models created with Power BI Desktop. If you want to enable RLS for semantic models created with Excel, you must convert your files into Power BI Desktop (PBIX) files first. [Learn more](/power-bi/connect-data/desktop-import-excel-workbooks).
* Service principals can't be added to an RLS role. Accordingly, RLS isn't applied for apps using a service principal as the final effective identity.
* Only Import and DirectQuery connections are supported. Live connections to Analysis Services are handled in the on-premises model.
* With RLS enabled, using the USERELATIONSHIP() function in DAX queries and measures might cause unexpected errors. To work around this issue, redesign your DAX expressions to avoid USERELATIONSHIP() and use model-level relationships or other DAX patterns instead.
* The Test as role/View as role feature doesn't work for DirectQuery models with single sign-on (SSO) enabled.
* The Test as role/view as role feature shows only reports from semantic models workspace.
* The Test as role/View as role feature doesn't work for paginated reports.
* The token-based identity only works for DirectQuery models on a capacity connected to an Azure SQL Database that's configured to allow Microsoft Entra authentication. For more information, see [Embed a report with token-based identity](/power-bi/developer/embedded/rls-sso)
* The 'IdentityBlob' parameter is an OAuth 2.0 access token for Azure SQL and is only supported for datasets with a DirectQuery connection to Azure SQL. The mechanism itself is Azure-SQL-specific: The blob *is* a Microsoft Entra access token scoped to `https://database.windows.net/.default`. There's no equivalent token-passing mechanism for other data sources in App-owns-data embedding. For more information, see [REST API reference for GenerateToken](/rest/api/power-bi/embed-token/generate-token).
* 


Keep in mind that if a Power BI report references a row with RLS configured then the same message displays as for a deleted or non-existing field. To these users, it looks like the report is broken.
