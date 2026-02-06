---
title: PowerShell Migration of Azure Data Factory and Synapse Pipelines to Fabric
description: Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to upgrade Azure Data Factory pipelines to Fabric pipelines.
ms.reviewer: ssrinivasara
ms.topic: how-to
ms.custom: pipelines
ms.date: 02/02/2026
ai-usage: ai-assisted
---

# Upgrade Azure Data Factory and Synapse pipelines to Microsoft Fabric using PowerShell

> [!TIP]
> New to migration options? Start with the **Microsoft Fabric migration overview** for the full landscape and ADF‑to‑Fabric migration guidance. [Fabric migration guidance](../fundamentals/migration.md)

You can migrate your Azure Data Factory (ADF) and Synapse pipelines to Microsoft Fabric using the **Microsoft.FabricPipelineUpgrade** PowerShell module. This guide outlines all the steps to perform the migration. For a detailed tutorial with screenshots, examples, and troubleshooting see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

To migrate your pipelines to Fabric using PowerShell, you:

1. [Prepare your environment for Fabric pipeline upgrades.](#prepare-your-environment-for-fabric-pipeline-upgrades)
1. [Connect PowerShell to your Azure and Fabric environments.](#connect-powershell-to-your-azure-and-fabric-environments)
1. [Upgrade your factory pipelines.](#upgrade-your-factory-resources)
1. [Create a resolution file and map linked services to Fabric connections.](#map-your-adf-linked-services-to-fabric-connections)
1. [Validate your results.](#validate-the-results-in-microsoft-fabric)

## Prerequisites

To get started, you must complete the following prerequisites:

- **Tenant**: Your ADF and Fabric workspace must be in the same Microsoft Entra ID tenant.
- **Fabric**: A tenant account with an active Fabric subscription - [Create an account for free](../fundamentals/fabric-trial.md).
- **Fabric workspace recommendations** (Optional): We recommend using a new [Fabric workspace](../fundamentals/workspaces.md) in the same region as your ADF for upgrades for best performance.
- **Permissions**: [Read access to the ADF workspace and items](/azure/data-factory/concepts-roles-permissions#scope-of-the-data-factory-contributor-role) you’ll migrate and [Contributor or higher rights in the Fabric workspace](../security/permission-model.md#workspace-roles) you’ll write to.
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).

> [!VIDEO https://learn.microsoft.com/_themes/docs.theme/master/en-us/_themes/global/video-embed-one-stream.html?id=46afe4ed-f186-4937-b09f-326dd63bbf5b]

## Supported functionality

Alongside the [currently supported datasets and linked services](#currently-supported-datasets-and-linked-services) and [currently supported activities](#currently-supported-activities), the following limitations apply:

- If an Activity isn’t [available in Fabric](compare-fabric-data-factory-and-azure-data-factory.md), the Fabric Upgrader can’t upgrade it.
- Global configuration and parameters aren’t supported.
- `pipeline().Pipeline` isn’t currently supported.
- Using dynamic expression for the **Url** property in Web/Webhook isn't supported.

### Currently supported datasets and linked services

- Blob: JSON, Delimited Text, and Binary formats
- Azure SQL Database
- ADLS Gen2: JSON, Delimited Text, and Binary formats
- Azure Function: Function app URL

### Currently supported activities

- CopyActivity for supported datasets
- ExecutePipeline (converted to Fabric InvokePipeline Activity)
- IfCondition
- Wait
- Web
- SetVariable
- Azure Function
- ForEach
- Lookup
- Switch
- SqlServerStoredProcedure

## Prepare your environment for Fabric pipeline upgrades

[!INCLUDE [migrate-pipelines-prepare-your-environment-for-upgrade](includes/migrate-pipelines-prepare-your-environment-for-upgrade.md)]

## Connect PowerShell to your Azure and Fabric environments

Run these commands in PowerShell to sign in and set your subscription and tenant for subsequent Az cmdlets:

```PowerShell
Add-AzAccount
Select-AzSubscription -SubscriptionId <your subscription ID>
```

Run these commands to get access tokens for ADF and Fabric:

```PowerShell
$adfSecureToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
$fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token
```

> [!TIP]
> Access tokens expire after about an hour. When that happens, run the command again. You’ll know the token expired if Export-FabricResources returns a token expiry error.

## Upgrade your factory resources

First, [import your Azure Data Factory pipelines](#import-your-azure-data-factory-pipelines), then [map your ADF linked services to Fabric connections](#map-your-adf-linked-services-to-fabric-connections), and finally [upgrade your Azure Data Factory pipelines](#powershell-command-to-upgrade-your-adf-pipelines).

### Import your Azure Data Factory pipelines

The following PowerShell will import your data factory resources. Update the Import-AdfFactory command before the first `|` to either import [all supported resources in your ADF](#import-all-factory-resources), or [a single pipeline](#import-a-single-pipeline).

```PowerShell
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken| ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```

> [!TIP]
> The region parameter is optional. If your Fabric workspace is in the same region as your ADF, you can either use that region or skip the -Region parameter.

### Import all factory resources

```PowerShell
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -AdfToken $adfSecureToken
```

### Import a single pipeline

It's the same command you used to import all factory resources, but you add -PipelineName:

```PowerShell
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken
```

## Map your ADF linked services to Fabric connections

1. If your Fabric instance doesn't already have connections to the data sources used in your ADF linked services, [create those connections in Fabric](migrate-pipelines-how-to-add-connections-to-resolutions-file.md#get-the-guid-for-your-connection).
1. [Create your resolution file](#create-your-resolution-file) to tell FabricUpgrader how to map your ADF linked services to Fabric connections.

### Create your resolution file

A resolution file is a JSON file that maps your ADF linked services to Fabric connections:

[!INCLUDE [resolution-file-basics](includes/resolution-file-basics.md)]

For more information about the resolution file, see [How to add a connection to the resolutions file](migrate-pipelines-how-to-add-connections-to-resolutions-file.md).

### PowerShell command to upgrade your ADF pipelines

Now that you have your resolution file, you can run this PowerShell command to perform the upgrade. Update the ResolutionFilename parameter to point to your resolution file. Also, update the Import-AdfFactory command before the first `|` to either import [all supported resources in your ADF](#import-all-factory-resources), or [a single pipeline](#import-a-single-pipeline).

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```

>[!TIP]
> If the upgrade fails, PowerShell will display the reason in the details section. For some examples and troubleshooting, see the [Tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Validate the results in Microsoft Fabric

Once your migration completes, open each pipeline in Microsoft Fabric and verify activities, parameters, and dataset connections.

Run test executions with safe sample inputs and compare outputs to your source ADF runs to confirm parity.

Fix any gaps (for example, [activities that don’t have a direct Fabric equivalent yet](compare-fabric-data-factory-and-azure-data-factory.md)).

## Step‑by‑step tutorial

For a detailed tutorial with screenshots, examples, and troubleshooting see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Related content

- [Step-by-step tutorial for PowerShell-based migration of Azure Data Factory pipelines to Fabric](migrate-pipelines-powershell-upgrade-module-tutorial.md)


## Upgrading Synapse Pipelines to Fabric
Run these commands to get access tokens for ARM, Synapse, and Fabric:

```PowerShell
$ArmToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
$synapseSecureToken = (Get-AzAccessToken -ResourceUrl "https://dev.azuresynapse.net").Token
$fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token<img width="586" height="91" alt="image" src="https://github.com/user-attachments/assets/09d30533-cda1-4e73-a44d-3e64a366e46a" />

```
## PowerShell command to upgrade your Synapse pipelines
Run these commands to upgrade your Synapse Pipelines to Fabric:

```PowerShell
Import-SynapseWorkspace -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -WorkspaceName <your Synapse Workspace Name> -PipelineName <your Pipeline Name> -ArmToken $ArmToken -SynapseToken $synapseSecureToken| Import-FabricResolutions -rf "<path to your resolutions file>" | ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <your Synapse Workspace Name> -Token $fabricSecureToken -AzureToken $ArmToken -EnableVerboseLogging
```
