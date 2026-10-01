---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/palantir-foundry-datasets/palantir-foundry-datasets-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

> [!NOTE]
> Before you begin, ensure you have access to an on-premises gateway with an existing connection to Foundry.

To connect to Palantir Foundry from Power Query Online, take the following steps:

1. Select the **Palantir Foundry** option in the connector selection.
2. In **Connection Settings**, provide the Base URL that matches a connection already configured on your on-premises data gateway. For example, `https://<subdomain>.palantirfoundry.com/`. Optionally, provide a **Dataset RID** and **Branch**.

    :::image type="content" source="../../media/palantir-foundry-datasets/online-connection-settings.png" alt-text="Screenshot of the Palantir Foundry connection settings in Power Query Online.":::

    Ensure that the **Connection** dropdown shows the name of your on-premises gateway.

3. Select **Next** to continue.
4. In **Navigator**, select the data you require, and then select **Transform data**.

   :::image type="content" source="../../media/palantir-foundry-datasets/online-select-data.png" alt-text="Screenshot of the Power Query Online Navigator showing the selected data set.":::

### Troubleshooting

If you encounter issues connecting to Foundry, refer to the following resources in Palantir Foundry's documentation for troubleshooting steps:

* [Power BI Connector: FAQs](https://www.palantir.com/docs/foundry/analytics-connectivity/power-bi-faqs/)
* [Troubleshooting issues when configuring ODBC & JDBC Drivers](https://www.palantir.com/docs/foundry/analytics-connectivity/troubleshooting-odbc-jdbc/)
