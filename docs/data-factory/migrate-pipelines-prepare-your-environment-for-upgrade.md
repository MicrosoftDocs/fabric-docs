---
title: Preparing the environment for Fabric Pipeline Upgrade
description: Steps to prepare the environment for pipeline upgrade
author: ssindhub
ms.author: ssrinivasara
ms.reviewer: whhender
ms.topic: how-to
ms.custom: pipelines
ms.date: 09/16/2025
ai-usage: ai-assisted
---

# Prepare Your Environment for Fabric Pipeline Upgrade

Before you begin upgrading pipelines, make sure your environment is ready with the right tools and modules.

## Install PowerShell 7.4.2 (x64) or Later

To proceed, you’ll need **PowerShell 7.4.2 or higher installed on your machine. 

[Download PowerShell](/powershell/scripting/install/installing-powershell-on-windows)

---

## Install and Import the `FabricPipelineUpgrade` Module

- Open **PowerShell 7 (x64)**  
   Click the Start menu and search for **PowerShell 7**. Look for this icon:

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/powershell-icon.png" alt-text="Screenshot showing the powershell icon.":::

 - Right-click and choose **Run as administrator** for elevated permissions.
 

- In the PowerShell window, run the following command to install the module:

```
Install-Module Microsoft.FabricPipelineUpgrade -Repository PSGallery -SkipPublisherCheck
```
- Once installed, import the module:
```
Import-Module Microsoft.FabricPipelineUpgrade
```
- If you encounter a signing or execution policy error, run the below command and try importing the module again.
```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

## Verify Your Installation
To confirm everything is set up correctly, run:
```
Get-Command -Module Microsoft.FabricPipelineUpgrade
```
You should see output similar to this. Version number would be based on the latest published version:

:::image type="content" source="media/migrate-pipeline-powershell-upgrade/verify-installation-module.png" alt-text="Screenshot showing the pipeline upgrade icon.":::



