---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/odata-feed/odata-feed-load-data-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To load data from an OData Feed in Power Query Online:

1. Select the **OData** or **OData Feed** option in the get data experience. Different apps have different ways of getting to the Power Query Online get data experience. For more information about how to get to the Power Query Online get data experience from your app, go to [Where to get data](/power-query/where-to-get-data).

   :::image type="content" source="../../media/odata-feed/get-data-online.png" alt-text="Screenshot of the get data window with OData emphasized.":::

2. In the OData dialog that appears, enter a URL in the text box.

   :::image type="content" source="../../media/odata-feed/odata-online-sign-in.png" alt-text="Screenshot of the OData online sign in page.":::

3. If you're connecting using the OData Feed for the first time, select the authentication kind and enter your credentials (if necessary). Then select **Next**.

4. From the **Navigator** dialog, you can select a table, then transform the data in the Power Query editor by selecting **Transform Data**.

   :::image type="content" source="../../media/odata-feed/odata-navigator.png" alt-text="Screenshot of the online navigator with the alphabetical list of products selected and displayed." lightbox="../../media/odata-feed/odata-navigator.png":::

   If you have multiple tables that have a direct relationship to one or more of the already selected tables, you can select the **Select Related Tables** button. When you do, all tables that have a direct relationship to one or more of the already selected tables are imported as well.
