---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/parquet/parquet-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to a Parquet file from Power Query Online, take the following steps:

1. Select the **Parquet** option in the get data experience. Different apps have different ways of getting to the Power Query Online get data experience. For more information about how to get to the Power Query Online get data experience from your app, go to [Where to get data](/power-query/where-to-get-data).

   :::image type="content" source="../../media/parquet/get-data-online.png" alt-text="Screenshot of the get data window with Parquet emphasized.":::

2. In **Parquet**, provide the name of the server and database. Or enter a path and filename if you're connecting to a local file.

   :::image type="content" source="../../media/parquet/service-sign-in.png" alt-text="Screenshot of the Connect to data source window for the Parquet file connection.":::

3. If you're connecting to a local file, select the name of your on-premises data gateway. If the data is online, you don't need to provide an on-premises data gateway.

4. If you're connecting to this data source for the first time, select the authentication kind and input your credentials. From Power Query Online, select one of the following authentication kinds:

   * Anonymous (online)
   * Account key (online)
   * Windows (local file)

5. Select **Next** to continue to the Power Query editor where you can then begin to transform your data.

