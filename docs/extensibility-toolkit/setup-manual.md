---
title: Manual Step by step guid to configure the development environment
description: This article helps you to set up a development environment manually
author: gsaurer
ms.author: billmath
ms.topic: tutorial
ms.custom:
ms.date: 09/04/2025
---

# Manual setup guide

We recommend using the [Setup Guide](./setup-guide.md) instead of following these instructions. In case you're interested in the details or try to skip some steps you can find the information on how to configure the repository manually in this article.

## Create the configuration files

The repository takes the configuration values from the .env.{ENVIROMENT} files in the repository. For this you first need to copy the [.env.template](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/Workload/.env.template) file to `.env.dev`, `.env.test`, and `.env.prod` in the same directory and populate the values. The values in those files are used in creating the Manifest. For local development only the .env.dev file is normally needed.

Decide on a WorkloadName and fill it out in .env.dev file.

## Register a front end Microsoft Entra application

You can use the [CreateDevAADApp.ps1](https://github.com/microsoft/fabric-extensibility-toolkit/blob/main/scripts/Setup/CreateDevAADApp.ps1) to create a new Microsoft Entra app or you can follow the steps.

1. Navigate to App registrations in the Azure Admin Portal.
2. Create a new Multitenant application.

 :::image type="content" source="media/setup-manual/manual-1.png" alt-text="Screenshot of app registration." lightbox="media/setup-manual/manual-1.png":::

3. Add the following SPA redirectURIs to the application manifest:

 - https://app.fabric.microsoft.com/workloadSignIn/{TENANT_ID}/{WORKLOAD_NAME}
 - https://app.powerbi.com/workloadSignIn/{TENANT_ID}/{WORKLOAD_NAME}
 - https://msit.fabric.microsoft.com/workloadSignIn/{TENANT_ID}/{WORKLOAD_NAME}
 - https://msit.powerbi.com/workloadSignIn/{TENANT_ID}/{WORKLOAD_NAME}

Choose the {WORKLOAD_NAME} in the setup process. Take a look at the Project Structure in the repository.

Looking for your {TENANT_ID}? Follow these steps:

1. Open Microsoft Fabric and select on your profile picture in the top right corner.
2. Select **About** from the dropdown menu.
3. In the About dialog, you find your Tenant ID and Tenant Region.

After the App is created, open the “Workload/.env.dev” file and insert your Workload name in the “WORKLOAD_NAME” and your frontend application client ID in the “FRONTEND_APPID” configuration property.

## DevGateway

The repository required more software that needs to be downloaded. For this you need to download the [DevGateway](https://download.microsoft.com/download/c/4/a/c4a0a569-87cd-4633-a81e-26ef3d4266df/DevGateway.zip) and unzip it into the `tools` directory.

To start the DevGateway, a configuration file named `workload-dev-mode.json` needs to be available it in the `build/DevGateway/` directory. This file tells the DevGateway how to locate and serve your workload.

Sample configuration:

```json
{
    "WorkspaceGuid": "your-workspace-guid-here",
    "ManifestPackageFilePath": "path/to/Your/Repo/build/Manifest/[WorkloadName].[Version].nupkg",
    "WorkloadEndpointURL": "http://127.0.0.1:5000/workload"
}
```

**Field explanations:**

- `WorkspaceGuid`: The GUID of your Fabric workspace where the workload is available.
- `ManifestPackageFilePath`: Path to your compiled workload manifest package (.nupkg file).
- `WorkloadEndpointURL`: URL where your workload backend is hosted (typically your local dev server).
