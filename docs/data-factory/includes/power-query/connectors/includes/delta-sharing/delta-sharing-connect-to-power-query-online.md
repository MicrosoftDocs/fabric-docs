---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/delta-sharing/delta-sharing-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to Delta Sharing data:

1. Select **Delta Sharing** from the **Power Query Connect to data source** page.

1. In the **Delta Sharing** dialog, enter the **Server URL**. You can find this endpoint URL in the credentials file provided by the data provider.

1. Select the authentication kind:

   - **Authentication**: Enter the bearer token from your credentials file.
   - **OAuth (OIDC)**: Sign in with your organizational identity provider to use OpenID Connect authentication.

1. Select **Next** to proceed.

1. In the **Choose data** page, select the tables you want to load, and then select **Transform data** to transform the data in Power Query Editor.
