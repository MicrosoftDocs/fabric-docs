---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/web/web-load-data-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To load data from a web site with Power Query Online:

1. From the **Get Data** page, select either **Web page** or **Web API**. For more information, go to [Where to get data](/power-query/where-to-get-data).

   :::image type="content" source="../../web/select-web-page-api.png" alt-text="Screenshot of the Get data page where you select either the Web page or Web API connector.":::

   In most cases, you want to select the Web page connector. For security reasons, you need to use an [on-premises data gateway](/data-integration/gateway/) with this connector. The Web Page connector requires a gateway because HTML pages are retrieved using a browser control, which involves potential security concerns. This concern isn't an issue with Web API connector, as it doesn't use a browser control.

   In some cases, you might want to use a URL that points at either an API or a file stored on the web. In those scenarios, the Web API connector (or file-specific connector) allows you to move forward without using an on-premises data gateway.

   Also note that if your URL points to a file, you should [use the specific file connector](/power-query/connectors/web/web#import-files-from-the-web) instead of the Web page connector.

2. Enter a URL address in the text box. For this example, enter `https://en.wikipedia.org/wiki/List_of_states_and_territories_of_the_United_States`.

   :::image type="content" source="../../web/online-sign-in.png" alt-text="Screenshot of the upper half of the online sign-in page where you enter the web page URL.":::

3. Select the name of your on-premises data gateway.

   :::image type="content" source="../../web/enter-gateway.png" alt-text="Screenshot of the upper half of the online sign-in page where you enter your on-premises data gateway.":::

4. Select the authentication method you use to connect to the web page.

   :::image type="content" source="../../web/online-authentication.png" alt-text="Screenshot of the authentication dialog where you select the appropriate authentication method.":::

   The available authentication methods for this connector are:

   * **Anonymous**: Select this authentication method if the web page doesn't require any credentials.

   * **Windows**: Select this authentication method if the web page requires your Windows credentials.

   * **Basic**: Select this authentication method if the web page requires a basic user name and password.

   * **Organizational account**: Select this authentication method if the web page requires organizational account credentials.

   * **Service principal**: Select this authentication method if the web page requires a tenant ID, service principal client ID, and service principal key.

   Once you choose the authentication method and fill in the necessary credentials, select **Next**.

5. From the **Navigator** dialog, you can select a table, then transform the data in the Power Query editor by selecting **Transform Data**.

   :::image type="content" source="../../web/online-navigator.png" alt-text="Screenshot of the Navigator dialog showing states from the web page." lightbox="../../web/online-navigator.png":::
