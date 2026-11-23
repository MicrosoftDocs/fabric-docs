---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/azure-table-storage/azure-table-storage-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

Power Query Online includes Power BI (Dataflows), Power Apps (Dataflows), and Customer Insights (Dataflows) as experiences.

To make the connection, take the following steps:

1. Select the **Azure Table Storage** option in the connector selection. More information: [Where to get data](/power-query/where-to-get-data)

1. In the **Azure Table Storage** dialog that appears, enter the name or URL of the Azure Storage account where the table is housed. Don't add the name of the table to the URL.

   :::image type="content" source="../../media/azure-table-storage/online-connect-to-azure-storage.png" alt-text="Screenshot of the Azure Table Storage window in Power Query online.":::

1. Add your [Azure table storage account key](/power-query/connectors/azure-table-storage#copy-your-account-key-for-azure-table-storage), and then select **Next**.

1. Select one or multiple tables to import and use, then select **Transform Data** to transform data in the Power Query editor.

   :::image type="content" source="../../media/azure-table-storage/online-choose-data.png" alt-text="Screenshot of the Azure Table Storage choose data window in Power Query online.":::

