title: PowerShell-based migration of Azure Data Factory pipelines to Fabric
description: Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to upgrade Azure Data Factory pipeline to Fabric pipeline
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/20/2025
ai-usage: ai-assisted

# Upgrade Azure Data Factory pipelines to Microsoft Fabric using PowerShell
> [!TIP]
> New to migration options? Start with the **Microsoft Fabric migration overview** for the full landscape and ADF‑to‑Fabric migration guidance. [Fabric migration guidance](fabric/fundamentals/migration.md)
## What you’ll do

- **Install** the **Microsoft.FabricPipelineUpgrade** module.
- **Prepare** your source ADF workspace and target Fabric workspace.
- **Run the upgrade scripts** in a test workspace first.
- **Validate** and promote.

## Prerequisites

To get started, you must complete the following prerequisites:

- **Fabric**: A tenant account with an active subscription. [Create an account for free](../fundamentals/fabric-trial.md).
- **Permissions**: Read access to the ADF workspace and artifacts you’ll migrate and Contributor or higher rights in the Fabric workspace you’ll write to.
- **Tenant**: Your ADF and Fabric workspace must be in the same Azure AD tenant.
- **Region** (Recommended): For best performance, keep your Fabric workspace in the same region as your ADF.
- **Environment**: prepare your environment for upgrade. [Prepare your environment for upgrade](migrate-pipelines-prepare-your-environment-for-upgrade.md).
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).

### Collect useful information from your Fabric workspace

You’ll need some details from your workspace. Open a blank text file—you’ll copy the info there.

Open Microsoft Fabric and go to your Data Factory Workspace.

### Note your region
Your workspace is in a region like daily, dxt, msit, or prod. Write it down—you’ll need it later.

If you’re not sure, your region is prod. That’s the default, so you can skip adding it if it’s prod.

### Find your workspace ID
See How To: Find your Fabric Workspace ID. Add the ID to your text file.

## Sign In to Azure and Set Context
Run these commands in PowerShell to sign in and set your subscription and tenant for subsequent Az cmdlets:
```
Add-AzAccount 
Select-AzSubscription -SubscriptionId <your subscription ID>
```

## Get Access Tokens
Run:
```
$adfSecureToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
$fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token
```

Tokens expire in about an hour. If they do, repeat this step.

## Upgrade your factory resources
### Upgrade All Resources
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -AdfToken $adfSecureToken
```
### Upgrade a single Pipeline
Add -PipelineName:
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken
```
## Complete your Upgrade

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  <your Pipeline Name> -AdfToken $adfSecureToken| ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```
If your region is prod, you can skip the -Region parameter

## Map your ADF Linked Services to Fabric Connections

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  <your Pipeline Name> -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```
Refer to the [Tutorial](https://github.com/microsoft/FabricPipelineUpgrade/wiki/The-FabricPipelineUpgrade-Tutorial) for further details.

If the upgrade fails, the PowerShell response will show the reason in the details section.
(For Resolutions failure, see the section below).

## The Resolutions file
See [How To: Add a Connection to the Resolutions File](migrate-pipelines-powershell-upgrade-module-how-to-add-a-connection-to-the-resolutions-file).

### Validate the results on Fabric:

Open each pipeline and verify activities, parameters, and dataset connections.
Run test executions with safe sample inputs.
Compare outputs to your source ADF runs to confirm parity.
Fix gaps (for example, activities that don’t have a direct Fabric equivalent yet).
For broader context on Fabric migration validation, see the Fabric migration overview. 

### Step‑by‑step tutorial

For a detailed, click‑through tutorial with screenshots and examples, see:

[FabricPipelineUpgrade tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

## Frequently asked questions (FAQ)

### Is this module supported by Microsoft?

The code is open‑source in the microsoft organization on GitHub. Review the repo’s README and issue tracker for support information and known limitations. 

## Which activities are supported?
Support depends on the module version and the target Fabric capabilities. Check the [Supported functionality](migrate-pipelines-powershell-upgrade-module-supported-functionality) for the latest.

## Next steps

Try a pilot migration of a low‑risk pipeline.
Open issues or feature requests in the GitHub repo if you hit blockers.
