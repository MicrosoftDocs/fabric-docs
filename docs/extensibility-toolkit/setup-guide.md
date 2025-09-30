---
title: Getting Started with the Extensibility Toolkit
description: This article helps you to set up a development environment
author: gsaurer
ms.author: billmath
ms.topic: tutorial
ms.custom:
ms.date: 09/04/2025
---

# Setup guide

In this section, we present all of the necessary steps to get started with the Fabric Extensibility Toolkit.

Getting started involves five Steps that are all outlined in this document.

1. Clone this repository to your local machine
2. [Setup the development environment](#set-up-the-development-environment)
3. [Start the development environment](#start-the-development-environment)
4. [Test the workload](#test-the-workload)
5. [Start coding](#start-coding)

## Set up the development environment

To make it easy as possible we provide a [Setup.ps1](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/scripts/Setup/Setup.ps1) script that automates all the work for you. This script replaces all the manual steps that we describe in [Manual Setup Guide](./setup-manual.md). The setup script can be started without any parameters. All necessary information is asked in the commandline. If you want to automate the process, you can also parse the values as parameters to the script. An example to parse the WorkloadName (unique identifier of the workload in Fabric):

```powershell
.\Setup.ps1 -WorkloadName "Org.MyWorkload"
```

* Make sure that the PowerShell execution policy is set to Unrestricted and the files are unblocked if you're getting asked if the PowerShell files should be started.
* If you want to use an existing Microsoft Entra application, make sure to configure the SPA redirect URIs in the application's manifest as described in this [section](./setup-manual.md#register-a-front-end-microsoft-entra-application).
* Follow the guidance the Script provides to get everything setup
* The WorkloadName needs to follow a specific pattern [Organization].[WorkloadName]. For Development and Organizational workloads,  use Org.[YourWorkloadName].

For Mac and Linux, use pwsh to start the PowerShell Scripts:

```bash
pwsh ./Setup.ps1 -WorkloadName "Org.MyWorkload" 
```

After the script finished successfully your environment is configured and ready to go. The Script will provide you with additional information on the next steps to see up your Workload light in Fabric.

The Setup script can be run several times. If values are already present, you're asked if they should be overwritten. If you want to overwrite everything, use the Force parameter.

### Error handling

In case you're getting an error similar to the one below please make sure you have the latest PowerShell installed and configured in the environment you run the script.

![Screenshot of PowerShell setup error.](./media/setup-guide/powershell-setup-error.png)

## Start the development environment

After you completed all the steps, you're ready to test the workload.
Start the workload in development mode:

1. Run [StartDevServer.ps1](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/scripts/Run/StartDevServer.ps1) to start the local Development environment, which includes the Frontend and APIs
2. Run [StartDevGateway.ps1](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/scripts/Run/StartDevGateway.ps1) to register your local development instance with Fabric Backend
3. Navigate to the Fabric portal. Head to the Admin Portal settings and enable the following tenant settings:
- Capacity admins and contributors can add and remove additional workloads
- Workspace admins can develop partner workloads
- Users can see and work with additional workloads not validated by Microsoft
  
 :::image type="content" source="media/setup-guide/setup-1.png" alt-text="Screenshot of tenant settings." lightbox="media/setup-guide/setup-1.png":::

4. Navigate to the Fabric Developer Settings and enable the Fabric Developer Mode:
    :::image type="content" source="media/setup-guide/setup-2.png" alt-text="Screenshot of Fabric developer mode." lightbox="media/setup-guide/setup-2.png":::

You're ready to create your first Hello World Item in Fabric.

## Test the workload

To access your workload, follow the steps:

1. Navigate to `https://app.fabric.microsoft.com/workloadhub/detail/<WORKLOAD_NAME>?experience=fabric-developer`
2. Select the Hello World item type on the page
3. Select the development Workspace you configured before in the dialog to create the item
4. The editor opens and the item is ready for use

Congratulations! You created your first item from your development environment

## Start coding

Now that you're all set you can start following your own item ideas. For this, you can either change the [HelloWorldItemEditor.tsx](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/app/items/HelloWorldItem/HelloWorldItemEditor.tsx), or you can use the [CreateNewItem.ps1](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/scripts/Setup/CreateNewItem.ps1) to create a new item.

Happy coding! 🚀
