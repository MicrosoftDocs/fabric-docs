---
title: Access a Lakehouse from a Power BI Semantic Model
description: Learn how to configure and use workspace-level Private Link access for Power BI resources.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: how-to
ms.custom:
ms.date: 08/13/2025

#customer intent: As a workspace admin, I want to understand how to securely access Power BI in a restricted workspace from an open workspace by using workspace-level private links, including setup steps and best practices.

---

# Access inbound restricted lakehouse data from Power BI by using an on-premises data gateway

You can use an on-premises data gateway (OPDG) to establish cross-workspace communication between an open workspace and a workspace that [restricts inbound public access](security-workspace-level-private-links-set-up.md#step-8-deny-public-access-to-the-workspace). For example, if you want to access a lakehouse in an inbound restricted workspace from Power BI reports and semantic models in an open workspace, you can set up an OPDG.

An OPDG is typically installed on a virtual machine or a physical server inside a private network. It acts as a bridge between your data and Microsoft Fabric cloud services.

In the following diagram, the open workspace (Workspace 1) contains Power BI reports and a semantic model that's bound to an OPDG. The OPDG enables the connection to the lakehouse in the inbound restricted workspace. This setup allows Power BI reports and semantic models in Workspace 1 to securely access the lakehouse in Workspace 2 without exposing it to public access.

:::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/on-premises-data-gateway.png" alt-text="Diagram that illustrates a connection that uses an on-premises data gateway." border="false":::  

This article explains how to connect an open workspace to data in a restricted workspace by using an OPDG for Power BI semantic models. It also explains how to create semantic models in import and DirectQuery mode against a lakehouse in an inbound restricted workspace.

> [!NOTE]
> Semantic models in Direct Lake mode aren't yet supported against data sources in inbound restricted workspaces.

## Step 1: Create the workspaces

You need both an open workspace and a restricted workspace. This article refers to the workspaces as follows:

* The source workspace is the *open* workspace without public access restriction. It's where you create the reports and semantic models.
* The target workspace is the *restricted* workspace with public access restriction. It's where you create the lakehouse.

To create the workspaces, follow these steps:

1. Create two workspaces in Fabric. For details, see [Create a workspace](/fabric/fundamentals/create-workspaces).

1. In the tenant settings, [enable workspace-level inbound access protection](security-workspace-enable-inbound-access-protection.md).

1. For the target workspace, [set up workspace-level private links](security-workspace-level-private-links-set-up.md).

This article also uses the placeholder *workspaceFQDN*, which refers to the fully qualified domain name (FQDN) of the workspace. The format is one of these types:

* `https://{workspaceID}.z{xy}.w.api.fabric.microsoft.com`
* `https://{workspaceID}.z{xy}.onelake.fabric.microsoft.com`

In the FQDN formats, `{workspaceID}` is the workspace ID without dashes, and `{xy}` is the first two letters of the workspace object ID. For more information, see [Connecting to workspaces](./security-workspace-level-private-links-overview.md#connecting-to-workspaces).

You can find a workspace ID by opening the workspace page in the Fabric portal and noting the ID after `groups/` in the URL. You can also find a workspace FQDN by using the List Workspace or Get Workspace API.

## Step 2: Create a lakehouse in the target (restricted) workspace

Create a lakehouse in the target workspace and upload a Delta Lake table to it by following these steps:

1. Create a lakehouse in the target workspace by using the API. Use the following format:

   ```http
   POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/lakehouses
   ```

   In that code, `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`.

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/lakehouses`.

1. Add data to the lakehouse by using Azure Storage Explorer to upload the folder for your Delta Lake table into the lakehouse. In Storage Explorer, select **ADLS Gen2 container or directory**.  

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/select-resource.png" alt-text="Screenshot of selecting a resource." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/select-resource.png":::

1. Sign in. Enter a display name for the storage, and then enter the blob container URL in the following format:

   `https://{workspaceFQDN}/{workspaceID}/{lakehouseID}`

    In that URL, `{workspaceFQDN}` is `{workspaceID}.z{xy}.onelake.fabric.microsoft.com`.

   For example: `POST https://aaaaaaaa000011112222bbbbbbbbbbbb.zaa.w.api.fabric.microsoft.com/v1/workspaces/aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb/bbbbbbbb-1111-2222-3333-cccccccccccc`.

1. Select **Connect**. The storage now appears.

1. Under the **Tables** folder, upload the Delta Lake table that you want to use (for example, the **customers** table).

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/upload-folder.png" alt-text="Screenshot of the pane for uploading a folder." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/upload-folder.png":::

## Step 3: Create a semantic model in the open workspace

Now that you have a lakehouse in the restricted workspace, you can create a semantic model in the open workspace that references this lakehouse. You can use:

* The web modeling experience in the Power BI portal.
* Power BI Desktop.
* REST APIs to deploy a model definition with the same table schema as in the restricted lakehouse.
* XMLA-based tools to deploy a semantic model programmatically (see [Semantic model connectivity with the XMLA endpoint](/fabric/enterprise/powerbi/service-premium-connect-tools)).

### Create a semantic model by using the web modeling experience

1. In the source workspace, select **New item**. On the **New item** pane, select the **Semantic model** tile.

2. On the **Add data to start building a report** page, select **Get Data**. Then select **Azure SQL database** to connect to the data source via the SQL analytics endpoint.

   > [!NOTE]
   > Don't use the OneLake catalog tile, because the web modeling experience creates a Direct Lake model when you're connecting to a data source in the OneLake catalog. Direct Lake isn't yet supported against data sources in an inbound restricted workspace. All SQL Server connectivity options, such as an Azure SQL database, are fully supported and work as expected when you're connecting to the SQL analytics endpoint.

3. In the **Server** box, enter the *workspaceFQDN* value by using the format for warehouse connection strings: `https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com`. That is, add `z{xy}` to the regular warehouse connection string under the SQL connection string. The GUIDs in the FQDN correspond to the tenant GUID in Base32 and the workspace GUID in Base32, respectively.

4. Optionally, in the **Database** box, enter the GUID of the SQL analytics endpoint to which you want to connect.

5. Under **Connection credentials**, apply the following configuration settings:

    | Input control | Value |
    | -------------- | ------- |
    | **Connection** | In the list, select **Create a new connection**. |
    | **Connection name** | Accept the default or provide a meaningful name. |
    | **Data gateway** | If a data gateway is already installed, select an OPDG for the data connection. You can also perform this step [later in this article](#step-4-enable-a-gateway-connection-in-the-semantic-model-settings). |
    | **Authentication kind** | Select **Organizational account**, and then select **Sign in** to provide the credentials to access the data source. |

6. Accept the remaining default settings, and then select **Next**.

7. On the **Choose data** page, select the tables that you want to include in the semantic model, and then select **Create a report**.

8. In the **Create new report** dialog, verify that the source workspace is selected. Provide a meaningful semantic model name, and then select **Create**.

9. In the **Some steps didn't complete** dialog, select **Open Model View**. Note that the semantic model can't yet connect to the SQL analytics endpoint in the inbound restricted target workspace. You complete the connection configuration [later in this article](#step-4-enable-a-gateway-connection-in-the-semantic-model-settings).

### Create a semantic model by using Power BI Desktop

1. In Power BI Desktop, installed on a machine with private network access to the target workspace, make sure you're signed in with your user account.

2. On the **Home** ribbon, select **Get data** > **More** > **Azure SQL database**.

   > [!NOTE]
   > Don't use the OneLake catalog, because Power BI Desktop can't yet connect to OneLake catalog data sources in an inbound restricted workspace. All SQL Server connectivity options, such as an Azure SQL database, are fully supported and work as expected when you're connecting to the SQL analytics endpoint.

3. In the **Server** box, enter the *workspaceFQDN* value by using the format for warehouse connection strings: `https://{GUID}-{GUID}.z{xy}.datawarehouse.fabric.microsoft.com`. That is, add `z{xy}` to the regular warehouse connection string under the SQL connection string. The GUIDs in the FQDN correspond to the tenant GUID in Base32 and the workspace GUID in Base32, respectively.

4. Optionally, in the **Database** box, enter the GUID of the SQL analytics endpoint to which you want to connect.

5. Under **Data Connectivity mode**, choose **Import** or **DirectQuery** according to your requirements. Then select **OK**.

6. If you're prompted, select **Microsoft account** in the authentication dialog. Then select **Sign in** to provide the credentials to access the data source.

7. In the **Navigator** dialog, select the tables that you want to include in the semantic model. Then select **Load**.

8. Add a visual to the report canvas. Then, on the **Home** ribbon, select **Publish**.

9. Save your changes to a Power BI Desktop file on the local machine. In the **Publish to Power BI** dialog, select the source workspace. Alternatively, you can import the Power BI Desktop file to the source workspace in the Power BI portal.

### Create a semantic model by deploying a semantic model definition

1. In the open workspace, create a semantic model by using a definition with the same table schema as in the restricted lakehouse. Use the following API:

   ```http
   POST https://{workspaceFQDN}/v1/workspaces/{workspaceID}/semanticModels
   ```

   In that code, `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`.

1. Before you finish creating the semantic model, edit the data source to reference the restricted lakehouse's connection string and lakehouse ID. Convert the `definition/tables/customers.tmdl` file from the semantic model definition from Base64 to JSON, and copy the output.

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/convert-json-copy.png" alt-text="Screenshot of converting from Base64 to JSON." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/convert-json-copy.png":::

1. Update the source with the restricted lakehouse's connection string and database ID. Then convert the JSON back to Base64 and use it in your request for semantic model creation.

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/convert-back.png" alt-text="Screenshot of converting JSON back to Base64." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/convert-back.png":::

1. Use the Get Lakehouse API to retrieve the connection string and lakehouse ID:

   ```http
   GET https://{workspaceFQDN}/v1/workspaces/{workspaceID}/lakehouses
   ```

   In that code, `{workspaceFQDN}` is `{workspaceID}.z{xy}.w.api.fabric.microsoft.com`.

## Step 4: Enable a gateway connection in the semantic model settings

To enable the semantic model to connect to the lakehouse in the restricted workspace, you need to set up an OPDG and bind it to the semantic model:

1. In the settings for your Power BI semantic model, turn on the toggle under **Gateway connections**.

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/gateway-connections.png" alt-text="Screenshot of enabling gateway connections." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/gateway-connections.png":::

1. Install and configure an OPDG on a virtual machine, as described in [Install an on-premises data gateway](/data-integration/gateway/service-gateway-install).

1. Use the API to retrieve the gateway ID for the installed OPDG instance:

   `https://api.fabric.microsoft.com/v1/gateways`

1. In Power BI, create the SQL Server connection for the OPDG. Use the lakehouse server name and lakehouse ID as the database, authenticate by using OAuth2, and copy the resulting connection ID.

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/settings-connection-name.png" alt-text="Screenshot of setting a connection name." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/settings-connection-name.png":::

1. Use the API to bind the semantic model to the gateway ID and connection ID:

    `https://api.powerbi.com/v1.0/myorg/groups/{workspaceID}/datasets/{SemanticModelID}/Default.BindToGateway`

    :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/bind-semantic-model.png" alt-text="Screenshot of binding a semantic model." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/bind-semantic-model.png":::

1. Verify the gateway binding. In the semantic model settings, refresh the page. Confirm that the OPDG now appears as the active gateway.

    :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/verify-gateway-binding.png" alt-text="Screenshot of an on-premises data gateway appearing as an active gateway." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/verify-gateway-binding.png":::

1. Refresh the dataset and build a report.

   :::image type="content" source="media/security-workspace-private-links-example-on-premises-data-gateway/refresh-dataset.png" alt-text="Screenshot of a report from a refreshed dataset." lightbox="media/security-workspace-private-links-example-on-premises-data-gateway/refresh-dataset.png":::
