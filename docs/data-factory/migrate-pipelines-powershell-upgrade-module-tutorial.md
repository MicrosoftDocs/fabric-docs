---
title: Detailed Tutorial for PowerShell-based Migration of Azure Data Factory Pipelines to Fabric
description: Use the Microsoft.FabricPipelineUpgrade PowerShell module to upgrade Azure Data Factory pipelines to Fabric pipelines.
ms.reviewer: ssrinivasara
ms.topic: tutorial
ms.custom: pipelines
ms.date: 09/17/2025
ai-usage: ai-assisted
---

# Tutorial: Upgrade your Azure Data Factory pipelines to Fabric pipelines using PowerShell

You can migrate your Azure Data Factory (ADF) pipelines to Microsoft Fabric using the Microsoft.FabricPipelineUpgrade PowerShell module. This tutorial provides an example of all the steps to perform the migration with specific instructions, screenshots, and troubleshooting steps. For a more general, concise guide, see [the overview](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md).

> [!div class="checklist"]
> * [How to prepare for an upgrade](#prepare-to-upgrade)
> * [How to upgrade an ADF pipeline to a Fabric pipeline](#your-first-upgrade)
> * [Read and handle alerts](#now-lets-export-the-fabric-pipeline-attempt-1)

## Prerequisites

To get started, be sure you have the following prerequisites:

- **Tenant**: Your ADF and Fabric workspace must be in the same Microsoft Entra ID tenant.
- **Fabric**: A tenant account with an active Fabric subscription - [Create an account for free](../fundamentals/fabric-trial.md).
- **Fabric workspace recommendations** (Optional): We recommend using a new [Fabric workspace](../fundamentals/workspaces.md) in the same region as your ADF for upgrades for best performance.
- **Permissions**: [Read access to the ADF workspace and items](/azure/data-factory/concepts-roles-permissions#scope-of-the-data-factory-contributor-role) you’ll migrate and [Contributor or higher rights in the Fabric workspace](../security/permission-model.md#workspace-roles) you’ll write to.
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=46afe4ed-f186-4937-b09f-326dd63bbf5b]

## Prepare to upgrade

[!INCLUDE [migrate-pipelines-prepare-your-environment-for-upgrade](includes/migrate-pipelines-prepare-your-environment-for-upgrade.md)]

Keep your PowerShell window open; you’ll use it for the upgrade.

## Your first Upgrade

We'll create a sample pipeline and upgrade it to Fabric as a walkthrough of the process.

### Create a simple ADF Pipeline

In the Azure Data Factory Studio, [create a pipeline](/azure/data-factory/concepts-pipelines-activities#creating-a-pipeline-with-ui) and add a [Wait activity](/azure/data-factory/control-flow-wait-activity). You can name it anything, but this tutorial uses **pipeline1**.

### Prepare your PowerShell environment

1. In your PowerShell window, replace the values for `<your subscription ID>` and run these commands in PowerShell to sign in and set your subscription:

    ```powershell
    Add-AzAccount 
    Select-AzSubscription -SubscriptionId <your subscription ID>
    ```

1. Run this command to store the secure ADF token for your session:

    ``` powershell
    $adfSecureToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
    ```

1. In the PowerShell window, replace the values for `<your subscription ID>`, `<your Resource Group Name>`, and `<your Factory Name>`, and run:

    ```powershell
    Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName "pipeline1" -AdfToken $adfSecureToken
    ```

    >[!TIP]
    > For Data Factories with multiple pipelines, you can import all the pipelines at once by leaving out the `-PipelineName` parameter.

This command loads the pipeline and associated artifacts from your Azure Data Factory and creates the JSON for the first "Upgrade Progress".

```json
{
  "state": "Succeeded",
  "alerts": [],
  "result": {
    "importedResources": {
      "type": "AdfSupportFile",
      "adfName": "testdatafactory,
      "pipelines": {
        "pipeline1": {
          "name": "pipeline1",
          "type": "Microsoft.DataFactory/factories/pipelines",
          "properties": {
            "activities": [
              {
                "name": "Wait1",
                "type": "Wait",
                "dependsOn": [],
                "userProperties": [],
                "typeProperties": {
                  "waitTimeInSeconds": 1
                }
              }
            ],
            ],
            "policy": {
              "elapsedTimeMetric": {}
            },
            "annotations": [],
            "lastPublishTime": "2025-09-09T02:46:36Z"
          },
          "etag": "aaaaaaaa-bbbb-cccc-1111-222222222222"
        }
      },
      "datasets": {},
      "linkedServices": {},
      "triggers": {}
    }
  },
  "resolutions": []
}
```

### What these fields mean

- **state**: Shows the status. If it says Succeeded, you’re good.
- **alerts**: Lists any issues or extra info.
- **result**: Shows the outcome. Here, importedResources lists the ADF artifacts.
- **resolutions**: Used for mapping ADF Linked Services to Fabric Connections (later section).

### Convert your ADF Pipeline to a Fabric Pipeline

1. In your PowerShell window, take the Import-AdfFactory command that you just ran, and add `|` and then the ConvertTo-FabricResources command to the end of the line.

    Your full command should look like this:

    ```powershell
    Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  "pipeline1" -AdfToken $adfSecureToken | ConvertTo-FabricResources
    ```

1. Run the command. You should see a response like this:

    ```json
    {
      "state": "Succeeded",
      "alerts": [],
      "result": {
        "exportableFabricResources": [
          {
            "resourceType": "DataPipeline",
            "resourceName": "pipeline1",
            "resolve": [],
            "export": {
              "name": "pipeline1",
              "properties": {
                "activities": [
                  {
                    "name": "Wait1",
                    "type": "Wait",
                    "dependsOn": [],
                    "userProperties": [],
                    "description": null,
                    "typeProperties": {
                      "waitTimeInSeconds": 1
                    }
                  }
                ]
              },
              "annotations": []
            }
          }
        ]
      },
      "resolutions": []
    }
    ```

You’ll still see the standard Upgrade Progress, but now the result field includes exportableFabricResources. That's expected; you’re getting the Fabric resources ready to export.

You’ll learn about the resolutions field later. For now, the export field shows a Fabric pipeline with a Wait activity.

If you stop here, this command acts like a What-If: it shows what the upgrade would create, and is a good way to validate the upgrade before making any changes.

### Collect information from your Fabric workspace

Before exporting your Fabric pipeline, you'll need a few details from your Fabric workspace. Open a blank text file to copy the values you’ll need later.

1. Open Microsoft Fabric UX and navigate to your Data Factory Workspace.
1. Find your [Workspace ID](migrate-pipelines-how-to-find-your-fabric-workspace-id.md) and copy it into your text file.
1. Run this PowerShell command to get your Fabric Access Token and store it for your session:

    ```PowerShell
    $fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token
    ```

    > [!TIP]
    > Access tokens expire after about an hour. When that happens, run the command again. You’ll know the token expired if Export-FabricResources returns a token expiry error.

### Export the Fabric Pipeline

1. Combine all the details you gathered into this command:

    ```powershell
    Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline1" -AdfToken $adfSecureToken | ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
    ```

1. Now, copy your command from the text document into your PowerShell window, and run the command.

    You should see a response like this:

    ```json
    {
        "state": "Succeeded",
        "alerts": [],
        "result": {
          "exportedFabricResources": {
            "pipeline1": {
              "type": "DataPipeline",
              "workspaceId": "<your Workspace ID>",
              "id": "<The GUID of your new Pipeline>,
              "displayName": "pipeline1",
              "description": null
            }
          }
        }
      }
    ```

This means it worked! The exportedFabricResources section shows your new pipeline and its ID.
Now, open your Fabric workspace in Fabric UX. Refresh the page, and you’ll see pipeline1 in the list. Open it and you’ll find exactly what you expect!

## Your second upgrade: Copy some data

This second upgrade is much like the first, but introduces a couple new concepts:

- Datasets and LinkedServices
- Resolutions

The Fabric Pipeline Upgrader currently supports a [limited set of datasets](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md#supported-functionality), so we’ll use Azure Blob Storage connections and JSON datasets. Let's dive in.

1. In ADF Studio, create a pipeline that [copies](/azure/data-factory/copy-activity-overview) a JSON file from one folder in your Azure Blob Storage to another. We’ll call this pipeline "pipeline2" and the Azure Blob Storage connection "BlobStore1", but again, you can use any names you like.

1. Run the same What-If command as before to import your pipeline and check what the migration outcome would be. Be sure to update the pipeline name.

    ```powershell
    Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline2" -AdfToken $adfSecureToken | ConvertTo-FabricResources
    ```

In the output, the pipeline looks similar to before, but now there’s more detail, including two exportableFabricResources:

- One for a Connection
- One for a Pipeline

Here’s an example of the **Connection** section of the output:

```json
{
    "resourceName": "BlobStore1",
    "resourceType": "Connection",
    "resolve": [
    {
        "type": "LinkedServiceToConnectionId",
        "key": "BlobStore1",
        "targetPath": "id",
        "hint": {
        "linkedServiceName": "BlobStore1",
        "connectionType": "AzureBlobStorage",
        "datasource": "...",
        "template": {
            "type": "LinkedServiceToConnectionId",
            "key": "BlobStore1",
            "value": "<Fabric Connection ID>"
        }
        }
    }
    ],
    "export": {
    "id": "00000000-0000-0000-0000-000000000000"
    }
}
```

The resolve step says: `Find the correct GUID and insert it into the id field of this resource.` For now, the ID is all zeros (an empty GUID). Since the exporter can’t resolve it, the hint provides guidance on how to resolve the problem.

The **Pipeline** section has similar steps:

```json
"resolve": [
  {
    "type": "AdfResourceNameToFabricResourceId",
    "key": "Connection:BlobStore1",
    "targetPath": "properties.activities[0].typeProperties.source.datasetSettings.externalReferences.connection"
  },
  {
    "type": "AdfResourceNameToFabricResourceId",
    "key": "Connection:BlobStore1",
    "targetPath": "properties.activities[0].typeProperties.sink.datasetSettings.externalReferences.connection"
  }
],
```

### What do these steps do?

These `resolve` steps are instructions for you to map your ADF Linked services to the activities' **source** and **sink** with the corresponding Fabric Connection ID.

### Why does this happen?  

The upgrader can’t know the Fabric resource ID for a connection or pipeline until those resources exist. So, it provides a tip on how to create the necessary resources and fill out your resolution file.

## Now let's export the Fabric Pipeline (attempt 1)

1. If your access tokens expired, refresh them now.

1. Run the same steps you used in the previous lesson, but for "pipeline2" this time.

    ```powershell
    Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline2" -AdfToken $adfSecureToken | ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
    ```

1. This fails. This time, the `Import | Convert | Export` command returns something like:

    ```json
    {
        "state": "Failed",
        "alerts": [
          {
            "severity": "RequiresUserAction",
            "details": "Please use the hint and template to create/find a new connection and add its ID to your resolutions.",
            "connectionHint": {
              "linkedServiceName": "BlobStore1",
              "connectionType": "AzureBlobStorage",
              "datasource": "...",
              "template": {
                "type": "LinkedServiceToConnectionId",
                "key": "BlobStore1",
                "value": "<Fabric Connection ID>"
              }
            }
          }
        ],
        "resolutions": [],
        "result": {}
      }
    ```

(If you read the end of the last step, you might recognize `connectionHint`.)  

The error says we need to **“add a connection’s ID to your resolutions.”**

### What went wrong?  

The Fabric Upgrader can’t create Fabric connections on its own. You need to help by creating a Fabric connection manually and then telling the upgrader when to use it.

## Create a resolutions file

1. First, create a **Resolutions file**. You can name it anything and save it wherever you like on your machine (as long as PowerShell can access it), but this tutorial uses `D:\Resolutions.json`.  

1. Initialize the file with:  

    ```json
    [
    ]
    ```

1. Next, add your missing resolution from the hint your upgrader gave you. You can find it under 'template' in the `connectionHint` section of the error message.

    ```json
    [
        "type": "LinkedServiceToConnectionId",
        "key": "BlobStore1",
        "value": "<Fabric Connection ID>"
    ]
    ```

1. Next, we need to find that `<Fabric Connection ID>`. To do that, go to your Fabric workspace in Fabric UX, select the gear icon in the upper-right corner, then select **Manage connections and gateways**.
1. If the connection doesn't exist in Fabric yet, create a new Connection to the same Azure Blob Storage account that your ADF pipeline uses. You can name it anything, but this tutorial uses "myblob".
1. After creating the connection, hover over the ellipsis button next to the connection name to show the menu.
1. Select **Settings** from the menu, then copy the **Connection ID** and paste it into your Resolutions file in place of `<Fabric Connection ID>`.
1. Your resolutions file should look something like this (your `value` will be different):

    ```json
    [
        {
            "type": "LinkedServiceToConnectionId",
            "key": "BlobStore1",
            "value": "dddddddd-9999-0000-1111-eeeeeeeeeeee"
        }
    ]
    ```

1. While you’re at it, you can add a comment to your resolution like this:

    ```json
    [
       {
          "comment": "Resolve the ADF 'BlobStore1' LinkedService to the Fabric 'myblob' Connection",
          "type": "LinkedServiceToConnectionId",
          "key": "BlobStore1",
          "value": "dddddddd-9999-0000-1111-eeeeeeeeeeee"
       }
    ]
    ```

### The Import-FabricResolutions cmdlet

You can import this resolutions file to check what it does.  

In PowerShell, run:

```powershell
Import-FabricResolutions -rf "D:\Resolutions.json"
```

You should see:

```powershell
{
  "state": "Succeeded",
  "alerts": [],
  "result": {},
  "resolutions": [
    {
      "type": "LinkedServiceToConnectionId",
      "key": "BlobStore1",
      "value": "dddddddd-9999-0000-1111-eeeeeeeeeeee"
    }
  ]
}
```

This is another upgrade progress object, but now the `resolutions` field is populated.  

You can run `Import-FabricResolutions` at any point in the command chain **before** `Export-FabricResources`. The resolutions will carry forward to later steps.  

## Export the Fabric Pipeline (attempt 2)

Now that we have a resolutions file, we can try the export again after adding the `Import-FabricResolutions` step.

1. Update your command by adding `Import-FabricResolutions` between `Convert` and `Export`:

    ```powershell
    Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline2" -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
    ```

1. Run the command in PowerShell.

This time, it works! Again, the exportedFabricResources section shows your new pipeline and its ID.

Now open your Fabric workspace in Fabric UX. Refresh the page, and you’ll see pipeline1 in the list. Open it and you’ll find exactly what you expect!

## Next steps

Now that you’ve successfully upgraded two pipelines, you can use what you learned to upgrade more pipelines. 

- For more information about the types of activities and datasets that are supported, see [the supported functionality](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md#supported-functionality).
- For more information about how to create the resolutions file for different kinds of pipelines, see [how to add connections to your resolutions file](migrate-pipelines-how-to-add-connections-to-resolutions-file.md).
- For general steps on performing this migration using PowerShell, see: [Migrate pipelines from Azure Data Factory to Fabric using PowerShell](migrate-pipelines-powershell-upgrade-module-for-azure-data-factory-to-fabric.md).
