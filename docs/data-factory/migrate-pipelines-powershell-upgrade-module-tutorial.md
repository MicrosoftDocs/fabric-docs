title: Detailed tutorial for PowerShell-based migration of Azure Data Factory pipelines to Fabric
description: Using the **Microsoft.FabricPipelineUpgrade** PowerShell module to upgrade Azure Data Factory pipeline to Fabric pipeline
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/20/2025
ai-usage: ai-assisted

# FabricPipelineUpgrade Tutorial.

In this Tutorial, you will learn:
1. How to prepare for an Upgrade;
1. How to Upgrade an ADF Pipeline to a Fabric Pipeline;
1. Understand what each of the Upgrade step does;
1. Read and handle Alerts.

# Prerequisites
Before you start, make sure you have the right workspaces. This guide doesn’t cover how to create or find them.
You’ll need:

- An ADF workspace you can open in ADF Studio
- A Fabric workspace you can open in Fabric UX

# Prepare to Upgrade
See [Preparing your environment for upgrade](migrate-pipelines-prepare-your-environment-for-upgrade.md)..

Keep your PowerShell window open; you’ll use it for the upgrade.

# Your first Upgrade
## Create a simple ADF Pipeline
In ADF Studio, create a pipeline and add a Wait activity. You can name it anything, this tutorial uses pipeline1.

> NOTE: If your Fabric Workspace already has a Pipeline named "pipeline1", then you'll need to use a different name.

## Sign in to Azure and set context
If you’re not signed in, run these commands in PowerShell to sign in and set your subscription:
```
Add-AzAccount 
Select-AzSubscription -SubscriptionId <your subscription ID>
```
## Get the ADF Azure Resource Manager Token
Run this command to store the secure ADF token for your session:
``` 
$adfSecureToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
```
## Import the ADF Pipeline 
If your factory has multiple pipelines, you can import them all by leaving out the -PipelineName parameter.
In the PowerShell window, run:
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken
```

This command unpacks the pipeline into JSON and creates the first "Upgrade Progress".
```
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
          "etag": "0d029ff9-0000-0100-0000-68bf950c0000"
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
### What these fields mean:

- state: Shows the status. If it says Succeeded, you’re good.
- alerts: Lists any issues or extra info.
- result: Shows the outcome. Here, importedResources lists the ADF artifacts.
- resolutions: Used for mapping ADF Linked Services to Fabric Connections (later section).

## Convert your ADF Pipeline to a Fabric Pipeline
In your Powershell window, press the Up-Arrow until you see the Import-AdfFactory command that worked earlier.
Now, add the ConvertTo-FabricResources command to the end of that line. Make sure to include the | symbol to chain the commands. 
Your full command should look like this:
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  <your Pipeline Name> -AdfToken $adfSecureToken | ConvertTo-FabricResources
```
Press **Enter**. You should see something like:
```
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
You’ll still see the standard Upgrade Progress, but now the result field includes exportableFabricResources. That's expected —you’re getting the Fabric resources ready to export.

You’ll learn about the resolutions field later. For now, note that the export field shows a Fabric pipeline with a Wait activity. If you created a Fabric pipeline with Wait by hand, its JSON would look the same.

If you stop here, this acts like a What-If: it shows what the upgrade would create.

## Collect information from your Fabric workspace
Before exporting your Fabric pipeline, you'll need a few details from your Fabric workspace.
Open a blank text file to copy the values you’ll need later.

Open Microsoft Fabric UX and navigate to your Data Factory Workspace.

### Note your region
Your workspace is in a **region** like `daily`, `dxt`, `msit`, or `prod`.
Do make a note this region; you'll need it later.

If you don't know what this means, use `prod`. Since `prod` is the default value, you won’t need to pass this parameter if you’re on prod.

### Find your workspace ID
See [How To: Find your Fabric Workspace ID](migrate-pipelines-find-your-fabric-workspace-id.md).

Copy your Fabric Workspace ID into your text file.

> As long as you keep using this Fabric workspace, its ID stays the same, so you don't need to do this again.

### Acquire your Fabric Access Token
```
$fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token
```
> Access tokens expire after about an hour. When that happens, run the command again. You’ll know the token expired if Export-FabricResources returns a token expiry error

## Export the Fabric Pipeline
It’s handy to keep your full command in a text file so you can copy and paste it later.
Combine all your details into this command:

```
Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline1" -AdfToken $adfSecureToken | ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```

Now, copy your command from the text document into your PowerShell window, and hit Enter.

Wait a few seconds.

You should see a response like this:
```
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
Now, open your Fabric workspace in Fabric UX. Refresh the page, and you’ll see pipeline1 in the list. Open it—you’ll find exactly what you expect!

# Your second Upgrade: Copy Some Data
This second Upgrade will introduce a few new concepts:
1) Datasets and LinkedServices
2) Resolutions

Let's dive in.

## Create a Json Blob Copy Pipeline.
The Fabric Pipeline Upgrader currently supports a limited set of datasets, so we’ll use Azure Blob Storage connections and JSON datasets.

In ADF Studio, create a pipeline that copies a JSON file from one folder in your Azure Blob Storage to another. The details don’t matter for this tutorial.
We’ll call this pipeline pipeline2 and the Azure Blob Storage connection BlobStore1, but you can use any names you like.


## Convert your ADF Pipeline to a Fabric Pipeline
Run the same command as before: 
```
Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline1" -AdfToken $adfSecureToken | ConvertTo-FabricResources
```

What’s New in the Output?

You’ll notice two exportableFabricResources:

- One for a Connection
- One for a Pipeline

The pipeline looks similar to before, but now there’s more detail.
Here’s an example of the Connection section:

```
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

The resolve step says:

> Find the correct GUID and insert it into the id field of this resource.

For now, the id is all zeros (an empty GUID). If the exporter can’t resolve it, the hint provides guidance.

The Pipeline section has similar steps:
```
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

### What Do These Steps Do?  
They tell the exporter to:  
> Insert the Fabric Connection ID into the Copy Activity’s **source** and **sink**.  

If you check those paths in the JSON, you’ll see empty GUIDs where the IDs will go.  


### Why Does This Happen?  
The upgrader can’t know the Fabric resource ID for a connection or pipeline until those resources exist. So, it gives the exporter instructions on how to finish the exportable resources.  

For this to work, the exporter creates resources in the right order: if A depends on B, B gets created first. Good news—these resources are already in that order!  


## Now let's export the Fabric Pipeline (attempt 1)
If your access tokens expired, refresh them now.

Run the same steps you used in the previous lesson.

Oh. That didn't work! This time, the `Import | Convert | Export` command returned:
```
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

---

## What Went Wrong?  
The Fabric Upgrader can’t create Fabric connections on its own. You need to help by creating a Fabric connection manually and then telling the upgrader when to use it.  

First, create a **Resolutions file**. You can name it anything, but this tutorial uses `D:\Resolutions.json`.  

Initialize the file with:  

```
[
]
```

Next, add your missing resolution. See, [How To: Add a Connection to the Resolutions File](https://github.com/microsoft/FabricUpgrade/wiki/How-To:-Add-a-Connection-to-the-Resolutions-File) for instructions.

When you’re done, your Resolutions file should look something like this (your `value` will be different):  
```
[
   {
      "type": "LinkedServiceToConnectionId",
      "key": "BlobStore1",
      "value": "fce6a58f-c151-487f-9612-b908039e7eea"
   }
]
```
While you’re at it, you can add a comment to your resolution, like this
```
[
   {
      "comment": "Resolve the ADF 'BlobStore1' LinkedService to the Fabric 'myblob' Connection",
      "type": "LinkedServiceToConnectionId",
      "key": "BlobStore1",
      "value": "fce6a58f-c151-487f-9612-b908039e7eea"
   }
]
```

## The Import-FabricResolutions cmdlet
You can import this Resolutions file to check what it does.  

In PowerShell, run:
```
Import-FabricResolutions -rf "D:\Resolutions.json"
```
and press **Enter**.

You should see:
```
{
  "state": "Succeeded",
  "alerts": [],
  "result": {},
  "resolutions": [
    {
      "type": "LinkedServiceToConnectionId",
      "key": "BlobStore1",
      "value": "fce6a58f-c151-487f-9612-b908039e7eea"
    }
  ]
}
```
This is another Upgrade Progress object, but now the `resolutions` field is populated.  

You can run `Import-FabricResolutions` at any point in the command chain **before** `Export-FabricResources`. The resolutions will carry forward to later steps.  

## Export the Fabric Pipeline (this one will work)
If you’re keeping your command in a text file, update it by adding `Import-FabricResolutions` between `Convert` and `Export`:
```
Import-AdfFactory -SubscriptionId <your Subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Data Factory Name> -PipelineName  "pipeline1" -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken

```

If your access token expired, refresh it now. 

As mentioned earlier, you can place `Import-FabricResolutions` anywhere in the chain **before** `Export-FabricResources`. The resolutions will flow through all later steps.  

Run this command in PowerShell.

This time, it works!
