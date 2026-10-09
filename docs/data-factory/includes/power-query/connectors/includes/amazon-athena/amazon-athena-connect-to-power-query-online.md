---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/amazon-athena/amazon-athena-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to Amazon Athena data:

1. Select **Amazon Athena** from the **Power Query Connect to data source** page.

1. In the **Amazon Athena** dialog, enter your **DSN** (Data Source Name) for the Athena ODBC connection.

1. Include the name of your on-premises data gateway.

   > [!NOTE]
   > An on-premises data gateway is required because the Amazon Athena connector uses an ODBC driver that must be installed on the gateway machine.

1. Select the authentication kind, and provide your credentials.

1. Select **Next** to proceed.

1. In the **Choose data** page, select the data you require, and then select **Transform data** to transform the data in Power Query Editor.
