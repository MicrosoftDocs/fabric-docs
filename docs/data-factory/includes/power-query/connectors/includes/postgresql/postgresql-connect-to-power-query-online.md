---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/postgresql/postgresql-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To make the connection, take the following steps:

1. Select the **PostgreSQL database** option in the connector selection. For more information, go to [Where to get data](/power-query/where-to-get-data).

2. In the **PostgreSQL database** dialog that appears, provide the name of the server and database.

   :::image type="content" source="../../media/postgresql/server-name-online.png" alt-text="Screenshot of the PostgreSQL connection builder in Power Query Online.":::

3. Select the name of the on-premises data gateway you want to use.

4. Select the **Basic** authentication kind and input your PostgreSQL credentials in the **Username** and **Password** boxes.

5. If your connection isn't encrypted, clear **Use Encrypted Connection**.

6. Select **Next** to connect to the database.

7. In **Navigator**, select the data you require, then select **Transform data** to transform the data in Power Query editor.

