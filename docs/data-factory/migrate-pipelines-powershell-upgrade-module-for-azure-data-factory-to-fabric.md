---
title: PowerShell-based migration of Azure Data Factory pipelines to Fabric
description: Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to upgrade Azure Data Factory pipeline to Fabric pipeline
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/17/2025
ai-usage: ai-assisted
---

# Upgrade Azure Data Factory pipelines to Microsoft Fabric using PowerShell

> [!TIP]
> New to migration options? Start with the **Microsoft Fabric migration overview** for the full landscape and ADF‑to‑Fabric migration guidance. [Fabric migration guidance](../fundamentals/migration.md)

You can migrate your Azure Data Factory (ADF) pipelines to Microsoft Fabric using the **Microsoft.FabricPipelineUpgrade** PowerShell module. This guide outlines all the steps to perform the migration. For a detailed tutorial with screenshots, examples, and troubleshooting see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

To migrate your ADF pipelines to Fabric using PowerShell, you:

1. [Prepare your environment for Fabric pipeline upgrades.](#prepare-your-environment-for-fabric-pipeline-upgrades)
1. [Connect PowerShell to your Azure and Fabric environments.](#connect-powershell-to-your-azure-and-fabric-environments)
1. [Upgrade your factory pipelines and triggers](#upgrade-your-factory-resources)
1. [Create a resolution file and map linked services to Fabric connections](#map-your-adf-linked-services-to-fabric-connections).
1. Validate your results.

## Prerequisites

To get started, you must complete the following prerequisites:

- Check the [Supported functionality](migrate-pipelines-powershell-upgrade-module-supported-functionality.md) to ensure your ADF pipelines and triggers are supported.
- **Tenant**: Your ADF and Fabric workspace must be in the same Microsoft Entra ID tenant.
- **Fabric**: A tenant account with an active Fabric subscription - [Create an account for free](../fundamentals/fabric-trial.md).
- **Fabric workspace recommendations** (Optional): We recommend using a new [Fabric workspace](../fundamentals/workspaces.md) in the same region as your ADF for upgrades for best performance.
- **Permissions**: [Read access to the ADF workspace and items](/azure/data-factory/concepts-roles-permissions#scope-of-the-data-factory-contributor-role) you’ll migrate and [Contributor or higher rights in the Fabric workspace](../security/permission-model.md#workspace-roles) you’ll write to.
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).
- **Environment**: [Prepare your PowerShell environment to perform upgrades](#prepare-your-environment-for-fabric-pipeline-upgrade).

## Supported functionality

Alongside the [currently supported datasets and linked services](#currently-supported-datasets-and-linked-services) and [currently supported activities](#currently-supported-activities), the following limitations apply:

- If an Activity isn’t [available in Fabric](compare-fabric-data-factory-and-azure-data-factory.md), the Fabric Upgrader can’t upgrade it.
- Global configuration and parameters aren’t supported.
- `pipeline().Pipeline` isn’t currently supported.

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

Before you start upgrading pipelines, [verify](#verify-your-installation) your environment has the required tools and modules:

- [PowerShell 7.4.2 (x64) or later](#install-powershell-742-x64-or-later)
- [FabricPipelineUpgrade module](#install-and-import-the-fabricpipelineupgrade-module)

### Install PowerShell 7.4.2 (x64) or later

You need **PowerShell 7.4.2** or later on your machine.

[Download PowerShell](/powershell/scripting/install/installing-powershell-on-windows)

### Install and import the FabricPipelineUpgrade module

1. Open PowerShell 7 (x64).

1. Select the Start menu, search for **PowerShell 7**, open the app's context menu, and select **Run as administrator**.

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/powershell-icon.png" alt-text="Screenshot of the PowerShell icon.":::

1. In the elevated PowerShell window, install the module from the PowerShell Gallery:

    ```PowerShell
    Install-Module Microsoft.FabricPipelineUpgrade -Repository PSGallery -SkipPublisherCheck
    ```

1. Import the module into your session:

    ```PowerShell
    Import-Module Microsoft.FabricPipelineUpgrade
    ```

1. If you see a signing or execution policy error, run this command and then import the module again:

    ```PowerShell
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    ```

### Verify your installation

1. Run this command to confirm the module loaded correctly:

    ```PowerShell
    Get-Command -Module Microsoft.FabricPipelineUpgrade
    ```

    :::image type="content" source="media/migrate-pipeline-powershell-upgrade/verify-installation-module.png" alt-text="Screenshot of the module command output.":::

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
> Tokens expire in about an hour. If your tokens expire, repeat this step.

## Upgrade your factory resources

First, [upgrade your Azure Data Factory pipelines and triggers](#upgrade-your-azure-data-factory-pipelines-and-triggers), then [map your ADF linked services to Fabric connections](#map-your-adf-linked-services-to-fabric-connections).

## Upgrade your Azure Data Factory pipelines and triggers

The following PowerShell will upgrade your data factory resources. Update the Import-AdfFactory command before the first `|` to either import [all supported resources in your ADF](#import-all-factory-resources), or [a single pipeline](#import-a-single-pipeline).

```PowerShell
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken| ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```

> ![TIP]
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

1. If your Fabric instance doesn't already have connections to the data sources used in your ADF linked services, [create those connections in Fabric](connector-overview).
1. [Create your resolution file](#create-your-resolution-file) to tell FabricUpgrader how to map your ADF linked services to Fabric connections.
1. [Run the PowerShell command](#powershell-command-to-map-adf-linked-services-to-fabric-connections) to perform the mapping.

### Create your resolution file

A resolution file is a JSON file that maps your ADF linked services to Fabric connections:

[!INCLUDE [resolution-file-basics](/includes/resolution-file-basics.md)]

For more information about the resolution file, see [How to add a connection to the resolutions file](migrate-pipelines-how-to-add-connections-to-resolutions-file.md).

### PowerShell command to map ADF linked services to Fabric connections

Now that you have your resolution file, you can run this PowerShell command to perform the mapping. Update the ResolutionFilename parameter to point to your resolution file. Also, update the Import-AdfFactory command before the first `|` to either import [all supported resources in your ADF](#import-all-factory-resources), or [a single pipeline](#import-a-single-pipeline).

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```

>![TIP]
> If the upgrade fails, PowerShell will display the reason in the details section. For some examples and troubleshooting, see the [Tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Validate the results in Microsoft Fabric

Once your migration completes, open each pipeline in Microsoft Fabric and verify activities, parameters, and dataset connections.

Run test executions with safe sample inputs and compare outputs to your source ADF runs to confirm parity.

Fix any gaps (for example, [activities that don’t have a direct Fabric equivalent yet](compare-fabric-data-factory-and-azure-data-factory.md)).

## Step‑by‑step tutorial

For a detailed tutorial with screenshots, examples, and troubleshooting see [the PowerShell migration tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Related content

- [Step-by-step tutorial for PowerShell-based migration of Azure Data Factory pipelines to Fabric](migrate-pipelines-powershell-upgrade-module-tutorial.md)
