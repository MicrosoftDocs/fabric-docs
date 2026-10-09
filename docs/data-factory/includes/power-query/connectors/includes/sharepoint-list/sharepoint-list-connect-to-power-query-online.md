---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sharepoint-list/sharepoint-list-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to a SharePoint list:

1. From the **Data sources** page, select **SharePoint list**. For more information, go to [Where to get data](/power-query/where-to-get-data).

1. If you have access to the [SharePoint site picker](/power-query/connectors/sharepoint-list#sharepoint-site-picker), use it to locate and select the sites directly on the connection settings page. If not, [copy the SharePoint site URL](/power-query/connectors/sharepoint-list#determine-the-site-url) and paste it into the **Site URL** text box in the **SharePoint list** dialog box.

   :::image type="content" source="../../media/sharepoint-list/sharepoint-list-url-online.png" alt-text="Screenshot of the online SharePoint list page with the Site URL information filled in.":::

1. Enter the name of an on-premises data gateway if needed.

1. Select the authentication kind, and enter any credentials that are required.

1. Select **Next**.

1. From the **Navigator**, you can select a location, then transform the data in the Power Query editor by selecting **Next**.

   :::image type="content" source="../../media/sharepoint-list/sharepoint-list-navigator-online.png" alt-text="Screenshot of the online Navigator where you select the items you want to use." lightbox="../../media/sharepoint-list/sharepoint-list-navigator-online.png":::

