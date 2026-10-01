---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/azure-analysis-services/azure-analysis-services-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To make the connection, take the following steps:

1. Select the **Azure Analysis Services database** option in the connector selection. More information: [Where to get data](/power-query/where-to-get-data)

2. In the **Connect to data source** page, provide the name of the server and database (optional).

   :::image type="content" source="../../media/azure-analysis-services/connection-settings-credentials.png" alt-text="Screenshot of the Azure Analysis Services connection settings and credentials in Power Query Online.":::

3. If you're connecting to this database for the first time, select the authentication kind and enter your credentials.

4. Select **Next** to continue.

5. In **Navigator**, select the data you need, and then select **Transform data**.

   :::image type="content" source="../../media/azure-analysis-services/navigator-online.png" lightbox="../../media/sql-server-analysis-services/navigator-online.png" alt-text="Screenshot of the Power Query Online Navigator showing the available data and a table preview.":::

> [!NOTE]
> Azure Analysis Services connections are currently not supported on the on-premises data gateway.
