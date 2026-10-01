---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sharepoint-online-list/sharepoint-online-list-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to a SharePoint Online list:

1. Select the **SharePoint Online list** option in the get data experience. Different apps have different ways of getting to the Power Query Online get data experience. For more information about how to get to the Power Query Online get data experience from your app, go to [Where to get data](/power-query/where-to-get-data).

   :::image type="content" source="../../media/sharepoint-online-list/get-data-online.png" alt-text="Screenshot of the get data window with SharePoint Online list emphasized.":::

1. If you have access to the [SharePoint site picker](/power-query/connectors/sharepoint-online-list#sharepoint-site-picker), use it to locate and select the sites directly on the connection settings page. If not, [copy the SharePoint site URL](/power-query/connectors/sharepoint-online-list#determine-the-site-url) and paste it into the **Site URL** text box in the **SharePoint Online list** dialog box.

   :::image type="content" source="../../media/sharepoint-online-list/sharepoint-online-list-url-online.png" alt-text="Screenshot of the SharePoint Online Lists window with an example Site URL entered.":::

1. Enter the name of an on-premises data gateway if needed.

1. Select the authentication kind, and enter any required credentials.

1. Select **Next**.

1. From the **Navigator**, you can select a location, then transform the data in the Power Query editor by selecting **Transform data**.

   :::image type="content" source="../../media/sharepoint-online-list/sharepoint-online-list-navigator-online.png" alt-text="Screenshot of the online Navigator with marketing data selected and the data displayed.":::

