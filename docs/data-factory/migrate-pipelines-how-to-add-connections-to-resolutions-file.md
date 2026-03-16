---
title: How to Add Connections to Your Resolutions File
description: Map your Azure Data Factory linked services to your Fabric connections for PowerShell pipeline migration.
ms.reviewer: ssrinivasara
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/17/2025
---

# How to add connections to your resolutions file

To migrate your Azure Data Factory (ADF) pipelines to Microsoft Fabric you can use the [PowerShell-based FabricUpgrader tool](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md). The tool automates much of the migration, but uses a JSON file called a resolution file to make the mappings between Azure Data Factory linked services and Microsoft Fabric connections.

This article is a guide to creating and troubleshooting your resolutions file and covers:

- [The basic structure of the resolution file](#basic-resolution-file)
- [Resolution types](#resolution-types)
- [How to get the GUID for your Fabric connections](#get-the-guid-for-your-connection)
- [How to structure CredentialConnectionId entries](#credentialconnectionid-entries) for ExecutePipeline activities
- [How to structure UrlHostToConnectionId entries](#urlhosttoconnectionid-entries) for Web and WebHook activities
- [An example of a resolution failure alert and how to use it](#example-alert-and-how-to-use-it)

## Basic resolution file

The basic structure of the resolution file is:

[!INCLUDE [resolution-file-basics](includes/resolution-file-basics.md)]

## Resolution types

There are three `type` entries you can use in your resolution entries, depending on your pipelines and connections:

- **LinkedServiceToConnectionId**- The most common mapping, used to map an ADF LinkedService to a Fabric Connection. Follow the steps in [Get the GUID for your connection](#get-the-guid-for-your-connection) to create the mapping.
    - The `key` value for this type is the name of your Azure Data Factory linked service.
- **CredentialConnectionId** - Used for ADF ExecutePipeline activities that call other pipelines. Follow our [guide for CredentialConnectionId entries](#credentialconnectionid-entries) to create the credentials for adding those activities.
    - The `key` value for this type is "user".
- **UrlHostToConnectionId** - Used for ADF Web and WebHook activities. Follow our [guide for UrlHostToConnectionId entries](#urlhosttoconnectionid-entries) to create the correct connection and update your resolution entry.
    - The `key` value for this type is the hostname for your connection.

## Get the GUID for your connection

To get the GUID for your Fabric connection to add to your **LinkedServiceToConnectionId** entry:

1. Open your Data Factory workspace in Fabric.
1. Select the gear icon in the upper-right corner, then select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways link under the settings menu.":::

1. If the connection doesn't exist in Fabric yet, create a new one.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new cloud connection.":::

    >[!TIP]
    >For a failure, use the connectionHint from the alert to pick the right connection type and data source.

1. If you already have a connection, or once your connection is created, hover over the ellipsis button next to the connection name to show the menu.
1. Select **Settings** from the popup menu.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/connection-settings.png" alt-text="Screenshot of the connection settings.":::

1. In the settings pane, copy the **Connection ID**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/copy-connection-id.png" alt-text="Screenshot of how to get Fabric Connection ID.":::

1. Update this resolution entry template with your Azure Data Factory linked service name and the Connection ID you copied:

    ```json
    {
        "type": "LinkedServiceToConnectionId",
        "key": "<ADF LinkedService Name>",
        "value": "<Fabric Connection ID>"
    }
    ```

    >[!TIP]
    >A resolution failure alert includes a template you can copy and modify. See [An example of a resolution failure alert and how to use it](#example-alert-and-how-to-use-it) for details.

1. Add the object to Resolutions.json. For example:

    ```json
    [
       ...,
       {
          "type": "LinkedServiceToConnectionId",
          "key": "mysqlls",
          "value": "aaaa0000-bb11-2222-33cc-444444dddddd"
       }
    ]
    ```

## CredentialConnectionId entries

If you plan to upgrade an ADF ExecutePipeline activity, add a **CredentialConnectionId** to your Resolutions.

1. In your Fabric workspace, select the gear icon in the upper-right corner and select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways link under the settings menu.":::

1. Go to the **Connections** tab and select **+ New** at the top of the screen:

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new connection.":::

1. In the **New Connection** pane:

   - Enter a name for the connection.
   - Choose **Fabric Pipelines** as the Connection Type.
   - Select **OAuth 2.0** as the Authentication method.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/edit-credential-connection-authenticate.png" alt-text="Screenshot of copying credential connection ID.":::

1. Select **Edit credentials**
1. When the browser window opens, select your account.
1. On the **New connection** pane, select **Create**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/create-credential-connection.png" alt-text="Screenshot of adding a new credential connection.":::

1. In the Settings pane, copy the Connection ID.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/copy-credential-connection-id.png" alt-text="Screenshot of getting the connection ID to use in the resolution file.":::

1. Add this object to Resolutions.json, replacing the value with the GUID you copied:

    ```json
    {
      "type": "CredentialConnectionId",
      "key": "user",
      "value": "<GUID of your Credential Connection>"
    }
    ```

    For example:

    ```json
    [
       ...,
       {
          "type": "CredentialConnectionId",
          "key": "user",
          "value": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb"
       }
    ]
    ```

## UrlHostToConnectionId entries

In Azure Data Factory, Web and WebHook activities include the full URL. Fabric works differently: Fabric uses a connection plus a relative URL. Currently, the upgrader replaces only the host name with a Connection ID. For example: connection to `https://contoso.com` plus relative URL `/admin/organize`. We add the entry to the resolutions file so that the connections are correctly mapped during migration.

1. Select the gear icon in the upper-right corner and select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways link highlighted in the Settings menu.":::

1. Go to the **Connections** tab and select **+ New**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new connection.":::

1. In the **New connection** pane:

   - Enter a name for the connection.
   - Choose **Web v2** as the connection type.
   - Fill in the Hostname and authorization.
   - Select **Create**.

1. From the settings pane, copy the Connection ID.
1. Add this object to Resolutions.json, replacing the value with the GUID you copied:

    ```json
    {
      "type": "UrlHostToConnectionId",
      "key": "<Hostname from your Web or WebHook activity>",
      "value": "<GUID of your Credential Connection>"
    }
    ```

    For example, if your connection is `https://www.example.com:443/`:

    ```json
    [
       ...,
       {
          "type": "UrlHostToConnectionId",
          "key": "https://www.example.com",
          "value": "aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb"
       }
    ]
    ```

## Example alert and how to use it

When running your migration, if there's an issue with the migration, an alert might ask you to add a resolution. That alert also tells you what kind of connection to create and gives you a template for the resolution to add. For example:

```json
 {
    "state": "Failed",
    "alerts": [
      {
        "severity": "RequiresUserAction",
        "details": "Please use the hint and template to create/find a new connection and add its ID to your resolutions.",
        "connectionHint": {
          "linkedServiceName": "mysqlls",
          "connectionType": "AzureSqlDatabase",
          "datasource": "my-sql-server.database.windows.net",
          "template": {
            "type": "LinkedServiceToConnectionId",
            "key": "mysqlls",
            "value": "<Fabric Connection ID>"
          }
        }
      }
    ],
    "resolutions": [],
    "result": {}
  }
```

What to do with that alert:

1. Create or find a Fabric Connection of type AzureSqlDatabase that points to the datasource shown (for example, my-sql-server.database.windows.net).
1. Copy that Connection’s ID.
1. From the alert, find the `template` for your JSON entry. For example:

    ```json
          "template": {
            "type": "LinkedServiceToConnectionId",
            "key": "mysqlls",
            "value": "<Fabric Connection ID>"
          }
    ```

1. Add a Resolution object to Resolutions.json using the template, replacing `<Fabric Connection ID>` with the actual GUID.

    ```json
    [
       ...,
       {
          "type": "LinkedServiceToConnectionId",
          "key": "mysqlls",
          "value": "aaaa0000-bb11-2222-33cc-444444dddddd"
       }
    ]
    ```

## Related content

- [Migrate pipelines: PowerShell upgrade module for Azure Data Factory to Fabric](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md)
