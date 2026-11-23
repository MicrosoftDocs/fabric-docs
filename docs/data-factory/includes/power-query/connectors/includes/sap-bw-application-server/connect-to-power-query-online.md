---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sap-bw-application-server/sap-bw-application-server-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to an SAP BW Application Server from Power Query Online:

1. From the **Data sources** page, select **SAP BW Application Server**.

2. Enter the server name, system number, and client ID of the SAP BW Application Server you want to connect to. This example uses `SAPBWTestServer` as the server name, a system number of `00`, and a client ID of `837`.

3. Select the [on-premises data gateway](/data-integration/gateway/service-gateway-onprem) you want to use to connect to the data.

4. Set **Authentication Kind** to **Basic**. Enter your user name and password.

   :::image type="content" source="../../sap-business-warehouse/get-data-online-power-apps-app.png" alt-text="Screenshot that shows the SAP BW Application Server online sign-in.":::

5. You can also select from a set of [advanced options](/power-query/connectors/sap-bw/use-advanced-options) to fine-tune your query.

6. Select **Next** to connect.

7. From the **Navigator** dialog box, select the items you want to use. When you select one or more items from the server, the **Navigator** dialog box creates a preview of the output table. For more information about navigating the SAP BW Application Server query objects in Power Query, go to [Navigate the query objects](/power-query/connectors/sap-bw/navigate-query-objects).

8. From the **Navigator** dialog box, you can transform the data in the Power Query Editor by selecting **Transform Data**.

   :::image type="content" source="../../sap-business-warehouse/navigator-online.png" lightbox="../../sap-business-warehouse/navigator-online.png" alt-text="Screenshot that shows the navigator view from Power Query Online.":::
