---
title: PowerShell-based migration of Azure Data Factory pipelines to Fabric
description: Use the **Microsoft.FabricPipelineUpgrade** PowerShell module to upgrade Azure Data Factory pipeline to Fabric pipeline
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: tutorial
ms.custom: pipelines
ms.date: 08/20/2025
ai-usage: ai-assisted
---

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
- **PowerShell**: Use PowerShell version 7.2 or later.
- **Network and auth**: Make sure you can sign in to both Azure and Fabric from your machine (interactive or service principal).

> [!NOTE]
> For end‑to‑end screens and a narrated walkthrough, see the short video [!VIDEO https://www.youtube.com/embed/gq99E_PHsEU?feature=oembed]

### Prepare your environment for upgrade

[Prepare your environment for upgrade (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/Preparing-your-environment-to-Upgrade)

### Export your ADF pipeline

[Export a pipeline from ADF Studio (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/How-To:-Export-a-Pipeline-from-ADF-Studio)

### Collect useful information from your Fabric workspace

[Collect useful information from your Fabric workspace](https://github.com/microsoft/FabricPipelineUpgrade/wiki/The-FabricPipelineUpgrade-Tutorial#import-the-adf-support-file)

### Map ADF Linkedservice to a Fabric Connection (Resolution)

[Add Connection to Resolution file (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/How-To%3A-Add-a-Connection-to-the-Resolutions-File)

### Import ADF support file and Resolution file to be upgraded to Fabric resources

[Import the ADF support file (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/The-FabricPipelineUpgrade-Tutorial#import-the-adf-support-file)

Validate the results on Fabric:

Open each pipeline and verify activities, parameters, and dataset connections.
Run test executions with safe sample inputs.
Compare outputs to your source ADF runs to confirm parity.
Fix gaps (for example, activities that don’t have a direct Fabric equivalent yet).
For broader context on Fabric migration validation, see the Fabric migration overview. 

### Step‑by‑step tutorial (GitHub)

For a detailed, click‑through tutorial with screenshots and examples, see:

[FabricPipelineUpgrade tutorial (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/The-FabricPipelineUpgrade-Tutorial)

## Frequently asked questions (FAQ)

### Is this module supported by Microsoft?

The code is open‑source in the microsoft organization on GitHub. Review the repo’s README and issue tracker for support information and known limitations. 

## Which activities are supported?
Support depends on the module version and the target Fabric capabilities. Check the [Supported functionality (GitHub Wiki)](https://github.com/microsoft/FabricPipelineUpgrade/wiki/Supported-Functionality) for the latest.

## Next steps

Try a pilot migration of a low‑risk pipeline.
Open issues or feature requests in the GitHub repo if you hit blockers.
