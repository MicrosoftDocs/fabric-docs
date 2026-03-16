---
title: Prepare the Environment for Fabric Pipeline Upgrade
description: Steps to prepare the environment for pipeline upgrade
ms.reviewer: ssrinivasara
ms.topic: include
ms.date: 09/16/2025
---

Before you start upgrading pipelines, [verify](#verify-your-installation) your environment has the required tools and modules:

- [PowerShell 7.4.2 (x64) or later](#install-powershell-742-x64-or-later)
- [FabricPipelineUpgrade module](#install-and-import-the-fabricpipelineupgrade-module)

### Install PowerShell 7.4.2 (x64) or later

You need **PowerShell 7.4.2** or later on your machine.

[Download PowerShell](/powershell/scripting/install/installing-powershell-on-windows)

### Install and import the FabricPipelineUpgrade module

1. Open PowerShell 7 (x64).

1. Select the Start menu, search for **PowerShell 7**, open the app's context menu, and select **Run as administrator**.

    :::image type="content" source="../media/migrate-pipeline-powershell-upgrade/powershell-icon.png" alt-text="Screenshot of the PowerShell icon.":::

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

Run this command to confirm the module loaded correctly:

```PowerShell
Get-Command -Module Microsoft.FabricPipelineUpgrade
```
:::image type="content" source="../media/migrate-pipeline-powershell-upgrade/verify-installation-module.png" alt-text="Screenshot of the module command output.":::



