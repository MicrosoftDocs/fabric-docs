---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/odbc/odbc-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To make the connection, take the following steps:

1. From the **Data sources** page, select **ODBC**.

2. In the ODBC page, enter your ODBC connection string. In the following example, the connection string is `dsn=SQL Server Database`.

   :::image type="content" source="../../media/odbc/odbc-online-connection.png" alt-text="Screenshot of the ODBC page, with the connection string set to the SQL Server database.":::

3. If needed, select an on-premises data gateway in **Data gateway**.

4. Choose the authentication kind to sign in, and then enter your credentials. For more information, go to [Authentication in Power Query Online](/power-query/connection-authentication-pqo).

5. Select **Next**.

6. In the **Navigator**, select the database information you want, and then select **Transform data** to continue transforming the data in the Power Query editor.

   :::image type="content" source="../../media/odbc/odbc-online-navigator.png" alt-text="Screenshot of the online navigator with employee information selected." lightbox="../../media/odbc/odbc-online-navigator.png":::

