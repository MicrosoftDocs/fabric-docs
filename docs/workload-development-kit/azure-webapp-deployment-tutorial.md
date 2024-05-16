---
title: Create and deploy the boilerplate Azure web app
description: Learn about how to create and build the boilerplate Azure web app.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 12/27/2023
#customer intent: As a developer, I want to understand how to build the backend of a customized Fabric workload so that I can create customized user experiences.
---

# Create and deploy the boilerplate Azure web app

To create and deploy the boilerplate Azure web app, you need to create and deploy the backend and frontend web apps. This tutorial provides instructions for creating and deploying the boilerplate backend and frontend web apps.

## Create and deploy the boilerplate backend web app

To create an Azure web app from the Azure portal:

1. Create a [**Web App** resource](https://ms.portal.azure.com/#create/Microsoft.WebSite) in the [Azure portal](https://ms.portal.azure.com/#home).
1. Fill in all the relevant data:
   - For **Publish**, select *Code*.
   - For **Runtime stack**, select *.NET 7 (STS)* and *Windows*.

For general instructions, see [Getting Started with Azure App Service](/azure/app-service/getting-started?pivots=stack-net).

### Map Your Domain to the Web App part 1

1. Navigate to **Settings** -> **Custom domains**.
1. Select **Add custom domain**, and follow the instructions.
   For more information on mapping custom domains, visit [Custom Domain Mapping in Azure](/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).
1. Open your backend boilerplate Visual Studio solution.
1. Right-click the boilerplate project and select **Publish**.
1. Choose *Azure* as the target.
1. Sign in with a user who has access to the Azure web app you created.
1. Use the UI to locate the relevant subscription and resource group, then follow the instructions to publish.

### Update CORS

1. In your web app's Azure page, navigate to **API** -> **CORS**.
1. Under **Allowed Origins**, add your frontend web app URL.

## Create and Deploy the Boilerplate Frontend Web App

To create an Azure web app from the Azure portal:

1. Create a [**Web App** resource](https://ms.portal.azure.com/#create/Microsoft.WebSite) in the [Azure portal](https://ms.portal.azure.com/#home). a "Web App" resource in the Azure portal.
1. Fill in all the relevant data:
   - For **Publish**, select *Code*.
   - For **Runtime stack**, select *Node 18 LTS* and *Windows*.

For general instructions, see [Quickstart for Node.js in Azure App Service](/azure/app-service/quickstart-nodejs?tabs=windows&pivots=development-environment-azure-portal).

### Map Your Domain to the Web App

1. Navigate to **Settings** -> **Custom domains**.
1. Select **Add custom domain**, and follow the instructions.

For more information on mapping custom domains, visit [Custom Domain Mapping in Azure](/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).

### Publish Your Frontend Boilerplate Web App part 2

1. Build your frontend boilerplate by running `npm run build:test`.
1. Navigate to the `dist` folder at `Microsoft-Fabric-developer-sample\Frontend\tools\dist`.
1. Select all files and the asset folder under `dist` and create a zip file.
1. Open PowerShell.
1. Run `Connect-AzAccount` and sign in with a user who has access to the Azure web app you created.
1. Run `Set-AzContext -Subscription "<subscription_id>"`.
1. Run `Publish-AzWebApp -ResourceGroupName <resource_group_name> -Name <web_app_name> -ArchivePath <zip_file_path>`.
