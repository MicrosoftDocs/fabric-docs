---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/mongodb-atlas-sql-interface/mongodb-atlas-sql-interface-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect using the Atlas SQL interface:

1. Select **MongoDB Atlas SQL** from the **Power Query - Choose data source** page.
2. On the **Connection settings** page, fill in the following values:
    - The **MongoDB URI**. _Required_.

      Use the MongoDB URI obtained [in the prerequisites](/power-query/connectors/mongodb-atlas-sql-interface#obtaining-connection-information-for-your-federated-database-instance). Make sure that it doesn't contain your username and password. URIs containing username and/or passwords are rejected.

    - Your federated **Database** name. _Required_  

      Use the name of the federated database obtained [in the prerequisites](/power-query/connectors/mongodb-atlas-sql-interface#obtaining-connection-information-for-your-federated-database-instance).

    - Enter a **Connection name**.
    - Choose a **Data gateway**.
    - Enter your Atlas MongoDB Database access username and password and select **Next**.

   :::image type="content" source="../../media/mongodb/connect-to-data-source.png" alt-text="Screenshot of the online Connect to data source dialog where you enter the connection settings.":::

3. In the **Navigator** screen, select the data you require, and then select **Transform data**. This selection opens the Power Query editor so that you can filter and refine the set of data you want to use.  

   :::image type="content" source="../../media/mongodb/choose-data.png" alt-text="Screenshot of the online Navigator where you choose the data you want to transform.":::

