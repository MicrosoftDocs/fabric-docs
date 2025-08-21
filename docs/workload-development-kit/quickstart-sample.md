---
title: Quick start - Run a sample workload
description: Create a Microsoft Fabric workload using a sample workload and the instructions in this quickstart tutorial.
author: KesemSharabi
ms.author: kesharab
ms.topic: quickstart  #Don't change
ms.custom:
ms.date: 04/09/2025
# Customer intent: Run a workload sample to get a five minute to 'wow' experience.
---

# Quickstart - Run a workload sample

This quickstart guide shows you how to create and run a Microsoft Fabric workload using a sample workload.

This sample demonstrates storing and reading data from and to lakehouses. To do that, you need to generate tokens for Azure Storage service in [On-Behalf-Of (OBO) flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

## Prerequisites

* An environment that is [set up](environment-setup.md) for workload development.

* If [Azure storage](#step-1-setup-azure-storage) isn't installed on your tenant, you must be a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) in the tenant.

* [ASP.NET Core Runtime 6.0](https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-aspnetcore-6.0.31-windows-x64-installer) - ASP.NET Core is used to build the sample workload.

* [.NET 6.0 Runtime](https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-6.0.31-windows-x64-installer) - .NET is used to build the sample workload.

## Step 1: Setup Azure storage

You need consent to use Azure Storage. In this step you check whether Azure Storage is installed in the tenant, and if it isn't you install it.

1. Log into the [Azure portal](https://portal.azure.com).

2. Search for **Enterprise applications** and select it from the search results.

3. From the **Application type** filter dropdown list, select **All applications** and then select **Apply**.

4. In the *Search by application name or object ID* search box, enter **Azure Storage**.

5. If **Azure Storage** isn't listed, open **PowerShell** as an administrator and run the following commands:

   ```powershell
   Install-Module az
   Import-Module az
   Connect-AzureAD
   New-AzureADServicePrincipal -AppId e406a681-f3d4-42a8-90b6-c2b029497af1
   ```

## Step 2: Download the sample

Follow these steps to run the sample workload.

1. Navigate to the [Sample Project Directory](https://go.microsoft.com/fwlink/?linkid=2272254) repository, select **Code**, and then select **Download ZIP**.

2. Extract the contents of the zip file to a local directory on your machine. A new folder called **Microsoft-Fabric-workload-development-sample-main** is created.

## Step 3: Get your tenant ID

Follow these steps to get your tenant ID.

1. Log into Fabric with the user you want to use to create the workload.
2. Select the **Help & Support** (the question mark **?**) and then select **About**.
3. From the **Tenant URL**, copy the string of numbers and letters after `https://app.powerbi.com/home?ctid=`. This string your tenant ID.

    For example, if your tenant URL is `https://app.powerbi.com/home?ctid=bbbbcccc-1111-dddd-2222-eeee3333ffff`, your tenant ID is `bbbbcccc-1111-dddd-2222-eeee3333ffff`.

## Step 4: Create a Microsoft Entra ID application

Use the provided script to create a Microsoft Entra ID application.

1. Open **PowerShell**.

2. Navigate to *Microsoft-Fabric-workload-development-sample-main\Microsoft-Fabric-workload-development-sample-main\Authentication* folder.

3. Run the command in this step. To authenticate, use the credentials of the user you're using to create the workload.

    ```powershell
    .\CreateDevAADApp.ps1 -applicationName "myWorkloadApp" -workloadName "Org.WorkloadSample" -tenantId "<your-tenant-id>"
    ```

4. Copy the following details from the output of the script:

    * **ApplicationIdUri / Audience** - For example, `api://localdevinstance/<your-tenant-id>/Org.WorkloadSample/OyR`
    * **RedirectURI** - `http://localhost:60006/close`
    * **Application Id** - For example, `00001111-aaaa-2222-bbbb-3333cccc4444`
    * **secret** - For example, `aaaaa~0b0b0b0b0b0b0b0b0b.bb~2d2d2d2d2d2d2`

## Step 5: Update the .env.dev file

1. Navigate to the *Microsoft-Fabric-workload-development-sample-main* folder and navigate to the **Frontend** folder.

2. Open the file **.env.dev** with a text editor.

3. Enter the following details:

    * **DEV_AAD_CONFIG_AUDIENCE=** - The audience from the output of the script. For example, `DEV_AAD_CONFIG_AUDIENCE=api://localdevinstance/<your-tenant-id>/Org.WorkloadSample/OyR`.
    * **DEV_AAD_CONFIG_APPID=** - The application ID from the output of the script. For example, `DEV_AAD_CONFIG_APPID=00001111-aaaa-2222-bbbb-3333cccc4444`.

4. Save the **.env.dev** file.

## Step 6: Run the frontend

Open **PowerShell** and do the following:

1. Navigate to *Microsoft-Fabric-workload-development-sample-main\Microsoft-Fabric-workload-development-sample-main\Frontend* folder.

2. To install the dependencies, run the command `npm install`. A new folder called **node_modules** is created.

3. To start the frontend, run the command `npm start`.

   Once the frontend runs successfully, you see a message that includes **successfully** in PowerShell, and your web browser will open with the `http://localhost:60006/` URL. To check that frontend is running successfully, in your browser, navigate to `http://localhost:60006/manifests`.

## Step 7: Open Visual Studio

The rest of the steps in this quickstart are performed in Visual Studio. Use this step to open your solution in Visual Studio. Once your solution is open, you can keep Visual Studio open while you complete the remaining steps.

1. Navigate to the *Microsoft-Fabric-workload-development-sample-main* folder and navigate to the **Backend** folder.

2. In *Visual Studio*, open the file **Fabric_Extension_BE_Boilerplate.sln**.

## Step 8: Update the backend files

1. In the *Solution Explorer*, expand *Fabric_Extension_BE_Boilerplate* and open the **appsettings.json** file and fill in the following fields:

    * **PublisherTenantId** - Your tenant ID. For example, `PublisherTenantId: "bbbbcccc-1111-dddd-2222-eeee3333ffff"`.
    * **ClientId** - The *Application Id* from the output of the script. For example, `ClientId: "00001111-aaaa-2222-bbbb-3333cccc4444"`.
    * **ClientSecret** - The *secret* from the output of the script. For example, `ClientSecret: "aaaaa~0b0b0b0b0b0b0b0b0b.bb~2d2d2d2d2d2d2"`.
    * **Audience** - The *ApplicationIdUri / Audience* from the output of the script. For example, `Audience: "api://localdevinstance/<your-tenant-id>/Org.WorkloadSample/OyR"`.

2. Save the **appsettings.json** file.

3. In the *Solution Explorer*, expand the folder *Packages > manifest* and open the **WorkloadManifest.xml** file and fill in the following fields:

    * **AppID** - Your App ID. For example, `<AppId>00001111-aaaa-2222-bbbb-3333cccc4444</AppId>`. <!-- Your application ID -->
    * **RedirectUri** - Your redirect URI. `<RedirectUri>http://localhost:60006/close</RedirectUri>`.
    * **ResourceId** - The *ApplicationIdUri / Audience* from the output of the script. For example, `<ResourceId>api://localdevinstance/<your-tenant-id>/Org.WorkloadSample/OyR</ResourceId>`.

4. Save the **WorkloadManifest.xml** file.

## Step 9: Build the NuGet package

1. From the Visual Studio menu, select **Build > Build Solution**. The build creates a NuGet package that includes the frontend and backend XML and JSON files.

2. From the *Output* window, take the path that is listed in the row starting with *1>Successfully created package*.

    In this output example, the path is highlighted in bold. `1>Successfully created package`**`C:\Dev kit\Microsoft-Fabric-workload-development-sample-main\Microsoft-Fabric-workload-development-sample-main\Backend\src\bin\Debug\ManifestPackage.1.0.0.nupkg`**.

## Step 10: Copy to your local drive

1. In the *Solution Explorer*, open the **workload-dev-mode.json** file.

2. Fill in the following fields:

    * **WorkspaceGuid** - Your Fabric workspace ID.

        You can find your workspace ID by navigating to the workspace you're using in Fabric. Once you're in the workspace, from the URL copy the string of numbers and letters after `https://app.powerbi.com/groups/`. The workspace ID ends with a forward slash. For example, if your workspace URL is `https://app.powerbi.com/groups/bbbbcccc-1111-dddd-2222-eeee3333ffff/list?experience=power-bi`, your workspace ID is **`bbbbcccc-1111-dddd-2222-eeee3333ffff`**.

    * **ManifestPackageFilePath** - The path of the manifest package file ([step 9](#step-9-build-the-nuget-package)). For example, `"ManifestPackageFilePath": "C:\Dev kit\Microsoft-Fabric-workload-development-sample-main\Microsoft-Fabric-workload-development-sample-main\Backend\src\bin\Debug\ManifestPackage.1.0.0.nupkg"`,

3. Save the **workload-dev-mode.json** file.

4. Copy the **workload-dev-mode.json** file from *src/Config* to `C:\`.

## Step 11: Run the boilerplate

1. In Visual Studio 2022, from the menu, select the arrow next to *IIS Express* and from the dropdown menu select **Boilerplate**.

2. Select **Boilerplate** and authorize Visual Studio's requests. A command prompt opens with information about the running solution.

## Step 12: Run the DevGateway file

>[!NOTE]
>If you're not using Windows, you need to run the DevGateway in a Docker container as described in [DevGateway Container](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/tools/DevGatewayContainer/README.md).

1. Open **PowerShell** and navigate to the **DevGateway** folder.

2. In PowerShell, run the command: `.\Microsoft.Fabric.Workload.DevGateway.exe`. When the output shows the message *info: DevGateway started*. the workload is running successfully.

    If you saved the `workload-dev-mode.json` file from [step 10](#step-10-copy-to-your-local-drive) to a specific folder, run the command with the `DevMode:LocalConfigFilePath` parameter.

    ```powershell
    .\Microsoft.Fabric.Workload.DevGateway.exe -DevMode:LocalConfigFilePath <path_to_config_json_path>
    ```

## Step 13: Open the sample workload in Fabric

> [!TIP]
> To open the sample workload in Fabric, you need to have three PowerShell windows open and running:
> * **Frontend** - A PowerShell with the command `npm start` running, as described in [Step 6](#step-6-run-the-frontend).
> * **Boilerplate** - A PowerShell running the boilerplate, as described in [Step 11](#step-11-run-the-boilerplate).
> * **DevGateway** - A PowerShell running `DevGateway.exe`, as described in [Step 12](#step-12-run-the-devgateway-file).

1. Open Microsoft Fabric.

2. Navigate to the workspace that you're using for development.

3. Select **New item**.

4. Open **Sample Item (preview)**.

## Related content

* [Understand the development sample](sample-features.md)