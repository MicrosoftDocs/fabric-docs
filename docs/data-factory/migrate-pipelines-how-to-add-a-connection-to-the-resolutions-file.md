---
title: How to Add a Connection to the Resolutions File
description: Map your Azure Data Factory Linked Service to your Fabric Connection
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/16/2025
ai-usage: ai-assisted
---

# How To: Add a Connection to the Resolutions File
The FabricUpgrader can’t upgrade an ADF **LinkedService** to a Fabric **Connection** on its own.  
You’ll need to:

1. Create the Fabric Connection(s) yourself.
1. Tell FabricUpgrader which Connection replaces each LinkedService.
1. Make sure the Fabric Connection can access the expected resources before you run the upgrade.

For this mapping, let's create a file named **Resolutions.json.**

## Steps

1. Add an array of **Resolution** objects.
1. Each object must include:
   - `type`: Usually LinkedServiceToConnectionId
   - `key`: The name of the ADF LinkedService.
   - `value`: The GUID of the Fabric Connection.

### Basic Format
```
[
  {
    "type": "LinkedServiceToConnectionId",
    "key": "<ADF LinkedService Name>",
    "value": "<Fabric Connection ID>"
  }
]

```
## When to use other Resolution types
Depending on the activities in your ADF pipeline, you might add more mappings:

#### ExecutePipeline activity
Use: CredentialConnectionId (see tool guidance for the exact format your scenario requires).

#### Web or WebHook activity
Use: UrlHostToConnectionId.

#### Have an existing Fabric Connection in an upgraded pipeline
Add that Connection’s ID to your Resolutions.json so the Upgrader can reference it.

---
## Example alert and how to use it
You likely found this page because an Alert asked you to add a Resolution. That Alert also tells you what kind of Connection to create and gives you a template:
```
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
### What action should you take:

Create or find a Fabric Connection of type AzureSqlDatabase that points to
* my-sql-server.database.windows.net.
* Copy that Connection’s ID.
* Add a Resolution to your Resolutions.json using the template, replacing <Fabric Connection ID> with the actual GUID.


## Get the GUID for your connection
1. Open your Data Factory workspace in Fabric.
1. Select the gear icon in the upper-right corner, then choose Manage connections and gateways.

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot showing the Manage connections and gateways.":::

1. If needed, create a new connection. Use the connectionHint in your alert to check the connection type and data source.

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot for adding a new cloud connetion.":::

1.  If you already have a connection, hover over your connection. You will see three dots:

1. Click the three dots and select "Settings" from the popup menu:

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/connection-settings.png" alt-text="Screenshot showing the connection settings.":::

1.  From the popup pane, copy the "Connection ID":

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/copy-connection-id.png" alt-text="Screenshot showing how to get Fabric Connection ID.":::


## Add this Connection to your Resolutions file

Your alert includes a template property like this:
```
          "template": {
            "type": "LinkedServiceToConnectionId",
            "key": "mysqlls",
            "value": "<Fabric Connection ID>"
          }
```
Do this:

1. Copy everything inside the braces (not the word template).
1. Replace <Fabric Connection ID> with your actual GUID.
1. Add the object to your Resolutions.json file.
```
[
   ...,
   {
      "type": "LinkedServiceToConnectionId",
      "key": "mysqlls",
      "value": "f1ea9d46-85dc-4eb7-b3d4-xxxxxxxx"
   }
]
```

 # Credential Connection

If you plan to upgrade an ADF ExecutePipeline Activity, you’ll need to add a **CredentialConnectionId** to your Resolutions. Use the Fabric interface to create or find a Credential Connection:

1. Select the **gear icon** in the upper-right corner and choose **Manage connections and gateways**. 

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot showing the Manage connections and gateways.":::

1. Go to the **Connections** tab and select **+ New** at the top of the screen: 

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot for adding a new connection.":::

1. In the **New Connection** pane:  
   - Enter a name for your connection.  
   - Choose **Fabric Data Pipelines** as the **Connection Type**.  
   - Select **Edit credentials**: 

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/create-credential-connection.png" alt-text="Screenshot for adding a new credential connection."::: 

1. When the browser window opens, select your account.

1. The **New Connection** pane now looks like this:

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/edit-credential-connection-authenticate.png" alt-text="Screenshot for editing credential connection authentication."::: 

1. Select **Create**.

1. The **Settings** pane appears. Copy the **Connection ID**:
:::image type="content" source="media/migrate-pipeline-powershell-upgrade/copy-credential-connection-id" alt-text="Screenshot for copying credential connection ID .":::

1. Paste that Connection GUID into your Resolutions file like this:

```
{
  "type": "CredentialConnectionId",
  "key": "user",
  "value": "<GUID of your Credential Connection>"
}
```

# A Web v2 Connection

ADF Web and WebHook Activities include the full URL in the Activity. Fabric works differently—it uses a Fabric Connection and a relative URL.

If you’re upgrading an ADF Pipeline with a Web or WebHook Activity, you’ll need to create or find a Web v2 Fabric Connection and add its GUID to your Resolutions file.

Currently, the upgrader only replaces the Host Name with a Connection ID. For example:
https://contoso.com/admin/organize → Connection to https://contoso.com + relative URL /admin/organize.


### Create a Web v2 Connection
1. Select the gear icon in the upper-right corner and choose Manage connections and gateways.
:::image type="content" source="media/migrate-pipeline-powershell-upgrade/workspace-settings.png" alt-text="Screenshot showing the Manage connections and gateways.":::

1. Create a new connection by selecting the "Connections" tab and clicking the "+ New" on the top of the screen:

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/add-new-connection.png" alt-text="Screenshot for adding a new connection.":::


1. In the New Connection pane:

- Enter a name for your connection
- Choose Web v2 as the Connection Type
- Fill in the Hostname and authorization
- Select Create

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/create-webv2-connection.png" alt-text="Screenshot for adding a new Web v2 connection.":::

1. The Settings pane appears. Copy the Connection ID.
1. Copy the Connection ID and add it to your Resolutions file:

```
{
  "type": "UrlHostToConnectionId",
  "key": "<The Hostname you used when creating the Connection>",
  "value": "<GUID of your Credential Connection>"
}
```

