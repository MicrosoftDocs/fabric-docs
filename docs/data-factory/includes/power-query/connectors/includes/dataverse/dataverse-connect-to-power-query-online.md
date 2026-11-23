---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/dataverse/dataverse-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to Dataverse from Power Query Online:

1. Select the **Dataverse** option in the **Choose data source** page. More information: [Where to get data](/power-query/where-to-get-data)

1. In the **Connect to data source** page, leave the server URL address blank. Leaving the address blank lists all of the available environments you have permission to use in the Power Query Navigator window.

   :::image type="content" source="../../media/dataverse/enter-url-online.png" alt-text="Screenshot of the connect to data source page for Dataverse.":::

   > [!NOTE]
   >If you need to use port 5558 to access your data, you'll need to load a specific environment with port 5558 appended at the end in the server URL address. In this case, go to [Finding your Dataverse environment URL](/power-query/connectors/dataverse#finding-your-dataverse-environment-url) for instructions on obtaining the correct server URL address.

1. If necessary, enter an on-premises data gateway if you're going to be using on-premises data. For example, if you're going to combine data from Dataverse and an on-premises SQL Server database.

1. Sign in to your organizational account.

1. When you've successfully signed in, select **Next**.

1. In the navigation page, select the data you require, and then select **Transform Data**.

   :::image type="content" source="../../media/dataverse/navigator-online.png" alt-text="Screenshot of the navigation page open with the Application User data selected.":::

