---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/sap-hana-database/sap-hana-database-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to SAP HANA data from Power Query Online:

1. From the **Data sources** page, select **SAP HANA database**.

2. Enter the name and port of the SAP HANA server you want to connect to. The example in the following figure uses `SAPHANATestServer` on port `30015`.

3. Optionally, enter a SQL statement from **Advanced options**. For more information, go to [Connect using advanced options](/power-query/connectors/sap-hana/overview#connect-using-advanced-options).

4. Select the name of the on-premises data gateway to use for accessing the database.

   > [!NOTE]
   > You must use an on-premises data gateway with this connector, whether your data is local or online.

5. Choose the authentication kind you want to use to access your data. You also need to enter a username and password.

   > [!NOTE]
   > Currently, Power Query Online only supports Basic authentication.

6. Select **Use Encrypted Connection** if you're using any encrypted connection, then choose the SSL crypto provider. If you're not using an encrypted connection, clear **Use Encrypted Connection**. More information: [Enable encryption for SAP HANA](/power-query/connectors/sap-hana/sap-hana-encryption)

   :::image type="content" source="../../sap-hana/sap-hana-online-signin.png" alt-text="Screenshot of the SAP HANA database online sign-in.":::

7. Select **Next** to continue.

8. From the **Navigator** dialog, you can either transform the data in the Power Query editor by selecting **Transform Data**, or load the data by selecting **Load**.

