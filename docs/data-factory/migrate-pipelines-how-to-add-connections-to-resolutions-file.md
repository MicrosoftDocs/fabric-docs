---
title: How to Add Connections to Resolutions File
description: Map your Azure Data Factory Linked Service to your Fabric Connection
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/16/2025
ai-usage: ai-assisted
---

# How to add connections to resolutions file

The FabricUpgrader can’t upgrade an ADF **LinkedService** to a Fabric **Connection** on its own.
You’ll need to:

1. Create the Fabric Connection(s) you need.
1. Tell FabricUpgrader which Connection replaces each LinkedService.
1. Make sure the Fabric Connection can access the expected resources before you run the upgrade.

For this mapping, create a file named **Resolutions.json.**

## Steps

1. Add an array of Resolution objects.
1. Each object must include:

   - type: Usually LinkedServiceToConnectionId.
   - key: The name of the ADF LinkedService.
   - value: The GUID of the Fabric Connection.

### Basic format

```json
[
  {
    "type": "LinkedServiceToConnectionId",
    "key": "<ADF LinkedService Name>",
    "value": "<Fabric Connection ID>"
  }
]
```

## When to use other resolution types

Depending on the activities in your ADF pipeline, you mightadd other mappings:

- ExecutePipeline activity: use CredentialConnectionId (check tool guidance for exact format).
- Web or WebHook activity: use UrlHostToConnectionId.
- If a pipeline already contains a Fabric connection: add that Connection’s ID to Resolutions.json so the Upgrader can reference it.

## Example alert and how to use it

You likely found this page because an alert asked you to add a resolution. That alert also tells you what kind of connection to create and gives you a template for the resolution to add. For example:

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
1. Add a Resolution object to Resolutions.json using the template, replacing `<Fabric Connection ID>` with the actual GUID.

Example:

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

## Get the GUID for your connection

1. Open your Data Factory workspace in Fabric.
1. Select the gear icon in the upper-right corner, then select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways.":::

1. If you need a connection, create a new one. Use the connectionHint from the alert to pick the right connection type and data source.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new cloud connection.":::

1. If you already have a connection, hover over the ellipsis button to show the menu.
1. Select **Settings** from the popup menu.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/connection-settings.png" alt-text="Screenshot of the connection settings.":::

1. In the settings pane, copy the Connection ID.

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/copy-connection-id.png" alt-text="Screenshot of how to get Fabric Connection ID.":::

## Add the connection to your resolutions file

Your alert includes a template like this:

```json
          "template": {
            "type": "LinkedServiceToConnectionId",
            "key": "mysqlls",
            "value": "<Fabric Connection ID>"
          }
```


1. Copy the object contents inside the braces (not the word template).
1. Replace `<Fabric Connection ID>` with the GUID you copied.
1. Add the object to Resolutions.json.

Example:

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

## Credential connection

If you plan to upgrade an ADF ExecutePipeline activity, add a **CredentialConnectionId** to your Resolutions.

1. Select the gear icon in the upper-right corner and select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways.":::

1. Go to the **Connections** tab and select **+ New** at the top of the screen:

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new connection.":::

1. In the **New Connection** pane:

   - Enter a name for the connection.
   - Choose **Fabric Data Pipelines** as the Connection Type.
   - Select **Edit credentials**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/create-credential-connection.png" alt-text="Screenshot of adding a new credential connection.":::

1. When the browser window opens, select your account.
1. On the **New connection** pane, select **Create**.
1. In the Settings pane, copy the Connection ID.

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/edit-credential-connection-authenticate.png" alt-text="Screenshot of copying credential connection ID.":::

1. Add this object to Resolutions.json, replacing the value with the GUID you copied:

```json
{
  "type": "CredentialConnectionId",
  "key": "user",
  "value": "<GUID of your Credential Connection>"
}
```

## Create a web v2 connection

ADF Web and WebHook activities include the full URL. Fabric works differently: Fabric uses a connection plus a relative URL. Currently, the upgrader replaces only the host name with a Connection ID. For example: connection to `https://contoso.com` plus relative URL `/admin/organize`.

1. Select the gear icon in the upper-right corner and select **Manage connections and gateways**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot of the Manage connections and gateways.":::

1. Go to the **Connections** tab and select **+ New**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot of adding a new connection.":::

1. In the **New connection** pane:

   - Enter a name for the connection.
   - Choose **Web v2** as the connection type.
   - Fill in the Hostname and authorization.
   - Select **Create**.
