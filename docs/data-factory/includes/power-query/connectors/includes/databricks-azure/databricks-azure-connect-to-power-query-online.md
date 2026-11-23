---
ms.date: 10/01/2026
ms.topic: include
ms.service: fabric
ms.subservice: data-factory
author: whhender
ms.author: whhender
ai-usage: ai-assisted
---
<!-- Static isolation snapshot: MicrosoftDocs/powerquery-docs-pr/powerquery-docs/connectors/includes/databricks-azure/databricks-azure-connect-to-power-query-online.md at 41cfe3df2f9d754444522058c54cddf7fc0fd3bd. Preserve this Fabric include path permanently. Keep this temporary static body until the Fabric-first publication is verified and the final Power Query include is ready for reconnection. -->

To connect to Databricks from Power Query Online, take the following steps:

1. Select the **Azure Databricks** option in the get data experience. Different apps have different ways of getting to the Power Query Online get data experience. For more information about how to get to the Power Query Online get data experience from your app, go to [Where to get data](/power-query/where-to-get-data).

    Shortlist the available Databricks connectors with the search box. Use the **Azure Databricks** connector for all Databricks SQL Warehouse data unless you've been instructed otherwise by your Databricks rep.  

    :::image type="content" source="../../media/azure-databricks/filtered-connectors.png" alt-text="Screenshot of the Databricks connector options in Power Query.":::

2. Enter the **Server hostname** and **HTTP Path** for your Databricks SQL Warehouse. Refer to [Configure the Databricks ODBC and JDBC drivers](/azure/databricks/integrations/bi/jdbc-odbc-bi) for instructions to look up your "Server hostname" and "HTTP Path". You can optionally supply a default catalog and/or database under **Advanced options**.

    :::image type="content" source="../../media/azure-databricks/azure-connection-settings-credentials.png" alt-text="Screenshot of the connection settings and credentials for Azure Databricks.":::

3. Provide your credentials to authenticate with your Databricks SQL Warehouse. There are four options for credentials:

    * Databricks Client Credentials. For instructions on generating Databricks OAuth M2M Client Credentials, see [Databricks OAuth M2M](/azure/databricks/dev-tools/auth/oauth-m2m).
    * Personal Access Token (usable for AWS, Azure, or GCP). Refer to [Personal access tokens](/azure/databricks/sql/user/security/personal-access-tokens) for instructions on generating a Personal Access Token (PAT).
    * Azure Active Directory (usable only for Azure). Sign in to your organizational account using the browser popup.
    * Service principal (usable only for Azure). Authenticate with a Microsoft Entra ID service principal. This option is available when configuring a cloud or gateway connection.

4. Once you successfully connect, the **Navigator** appears and displays the data available on the server. Select your data in the navigator. Then select **Next** to transform the data in Power Query.

    :::image type="content" source="../../media/azure-databricks/power-query-choose-data.png" alt-text="Screenshot of the Power Query navigator loading Databricks Cloud data to online app.":::

