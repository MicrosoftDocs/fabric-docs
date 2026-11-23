---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/mysql-database/mysql-database-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To make the connection, take the following steps:

1. Select the **MySQL database** option in the connector selection. For more information, go to [Where to get data](/power-query/where-to-get-data).

2. In the **MySQL database** dialog, provide the name of the server and database.  

   :::image type="content" source="../../media/mysql-database/service-signin.png" alt-text="Screenshot of the Connection settings dialog with server and database sample entries filled in.":::

3. If the MySQL server isn't accessible from the cloud, include the name of your on-premises data gateway (personal mode isn't supported).

4. Select the **Basic** authentication kind and input your MySQL credentials in the **Username** and **Password** boxes.

5. If your connection isn't encrypted, clear **Use Encrypted Connection**.

6. Select **Next** to connect to the database.

7. In **Navigator**, select the data you require, then select **Transform data** to transform the data in Power Query editor.

