---
title: Create and deploy the boilerplate Azure web app
description: Learn about how to create and build the boilerplate Azure web app as a Microsoft Fabric sample.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to build the backend of a customized Azure Fabric workload so that I can create customized user experiences.
---

# Create and deploy the boilerplate Azure web app

To create and deploy the boilerplate Azure web app, you need to create and deploy the backend and frontend web apps. This tutorial provides instructions for creating and deploying the boilerplate backend and frontend web apps.

Make sure that you review the [workload cloud setup tutorial](workload-cloud-setup.md) before you deploy your backend and frontend web apps.

## Create and deploy the boilerplate backend web app

1. In the [Azure portal](https://portal.azure.com/#home), create a [web app resource](https://portal.azure.com/#create/Microsoft.WebSite).
1. Enter or select the relevant information:

   - For **Publish**, select **Code**.
   - For **Runtime stack**, select **.NET 7 (STS)** and **Windows**.

For general instructions, see [Get started with Azure App Service](/azure/app-service/getting-started?pivots=stack-net).

### Map your domain to the backend web app

1. Go to **Settings** > **Custom domains**.
1. Select **Add custom domain**, and then follow the instructions.

   For more information, see [Custom domain mapping in Azure](/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).
1. In Visual Studio, open your backend boilerplate solution.
1. Right-click the boilerplate project and select **Publish**.
1. For the target, select **Azure**.
1. Sign in with a user who has access to the Azure web app you created.
1. Use the UI to locate the relevant subscription and resource group, and then follow the instructions to publish.

### Update CORS

1. On the overview pane of your web app in the Azure portal, go to **API** > **CORS**.
1. Under **Allowed Origins**, add your frontend web app URL.

## Create and deploy the boilerplate frontend web app

1. In the [Azure portal](https://portal.azure.com/#home), create a [web app resource](https://portal.azure.com/#create/Microsoft.WebSite).
1. Enter or select the relevant information:

   - For **Publish**, select **Code**.
   - For **Runtime stack**, select **Node 18 LTS** and **Windows**.

For general instructions, see [Quickstart for Node.js in Azure App Service](/azure/app-service/quickstart-nodejs?tabs=windows&pivots=development-environment-azure-portal).

### Map your domain to the frontend web app

1. Go to **Settings** > **Custom domains**.
1. Select **Add custom domain**, and then follow the instructions.

For more information, see [Custom domain mapping in Azure](/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).

### Publish your frontend boilerplate web app

1. Build your frontend boilerplate by running `npm run build:test`.
1. Go to the *Microsoft-Fabric-developer-sample\Frontend\tools\dist* folder.
1. Select all files and the asset folder under `dist`, and create a .zip file of the selected files.
1. Open PowerShell.
1. In PowerShell, run `Connect-AzAccount` and sign in with a user who has access to the Azure web app you created.
1. Run `Set-AzContext -Subscription "<subscription_id>"`.
1. Run `Publish-AzWebApp -ResourceGroupName <resource_group_name> -Name <web_app_name> -ArchivePath <zip_file_path>`.
