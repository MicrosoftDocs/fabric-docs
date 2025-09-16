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
> New to migration options? Start with the **Microsoft Fabric migration overview** for the full landscape and ADF‑to‑Fabric migration guidance. [Fabric migration guidance](../fundamentals/migration.md)

## What you’ll do

- **Install** the **Microsoft.FabricPipelineUpgrade** module.
- **Prepare** your source ADF workspace and target Fabric workspace.
- **Run the upgrade scripts** in a test workspace first.
- **Validate** and promote.
  
---

## Prerequisites

To get started, you must complete the following prerequisites:

- **Fabric**: A tenant account with an active subscription - [Create an account for free](../fundamentals/fabric-trial.md). Recommend using a new workspace for upgrades.
- **Permissions**: Read access to the ADF workspace and artifacts you’ll migrate and Contributor or higher rights in the Fabric workspace you’ll write to.
- **Tenant**: Your ADF and Fabric workspace must be in the same Azure AD tenant.
- **Region** (Recommended): For best performance, keep your Fabric workspace in the same region as your ADF.
- **Environment**: prepare your environment for upgrade - [Prepare your environment for upgrade](migrate-pipelines-prepare-your-environment-for-upgrade.md).
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).

---

## Collect useful information from your Fabric workspace

You’ll need some details from your workspace. Open a blank text file—you’ll copy the info there.

Open Microsoft Fabric and go to your Data Factory Workspace.

### Find your workspace ID
See [How To: Find your Fabric Workspace ID](migrate-pipelines-how-to-find-your-fabric-workspace-id.md).

Add the ID to your text file.

---

## Sign In to Azure and set context
Run these commands in PowerShell to sign in and set your subscription and tenant for subsequent Az cmdlets:
```
Add-AzAccount 
Select-AzSubscription -SubscriptionId <your subscription ID>
```

---

## Get Access Tokens
Run:
```
$adfSecureToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com/").Token
$fabricSecureToken = (Get-AzAccessToken -ResourceUrl "https://analysis.windows.net/powerbi/api").Token
```

Tokens expire in about an hour. If they do, repeat this step.

---

## Upgrade your Factory Resources

### Import all factory resources
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -AdfToken $adfSecureToken
```
### Import a single pipeline
Add -PipelineName:
```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName <your Pipeline Name> -AdfToken $adfSecureToken
```
---

## Complete your upgrade

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  <your Pipeline Name> -AdfToken $adfSecureToken| ConvertTo-FabricResources | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```
you can either use prod, or skip the -Region parameter

---

## Map your ADF Linked Services to Fabric Connections

```
Import-AdfFactory -SubscriptionId <your subscription ID> -ResourceGroupName <your Resource Group Name> -FactoryName <your Factory Name> -PipelineName  <your Pipeline Name> -AdfToken $adfSecureToken | ConvertTo-FabricResources | Import-FabricResolutions -ResolutionsFilename "<path to your resolutions file>" | Export-FabricResources -Region <region> -Workspace <workspaceId> -Token $fabricSecureToken
```
Refer to the [Tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md) for further details.

If the upgrade fails, the PowerShell response will show the reason in the details section.
(For Resolutions failure, see the section below).


---
## The Resolutions file
See [How To: Add a Connection to the Resolutions File](migrate-pipelines-how-to-add-a-connection-to-the-resolutions-file.md).

### Validate the results on Fabric:

Open each pipeline and verify activities, parameters, and dataset connections.
Run test executions with safe sample inputs.
Compare outputs to your source ADF runs to confirm parity.
Fix gaps (for example, activities that don’t have a direct Fabric equivalent yet).
For broader context on Fabric migration validation, see the Fabric migration overview. 

### Step‑by‑step tutorial

For a detailed, click‑through tutorial with screenshots and examples, see:
[Tutorial](migrate-pipelines-powershell-upgrade-module-tutorial.md).

---

## Which activities are supported?
Support depends on the module version and the target Fabric capabilities. Check the [Supported functionality](migrate-pipelines-powershell-upgrade-module-supported-functionality.md) for the latest.
