---
title: Quick start - Run a sample workload
description: Create a Microsoft Fabric workload using a sample workload and the instructions in this quickstart tutorial.
author: KesemSharabi
ms.author: kesharab
ms.topic: quickstart  #Don't change
ms.custom:
ms.date: 05/21/2024
# Customer intent: Run a workload sample to get a five minute to 'wow' experience.
---

# Quickstart: Run a workload sample

This quickstart guide shows you how to create and run a Microsoft Fabric workload using a sample workload.

This sample demonstrates storing and reading data from and to lakehouses. To do that, you need to generate tokens for Azure Storage service in [On-Behalf-Of (OBO) flows](/entra/identity-platform/v2-oauth2-on-behalf-of-flow).

## Prerequisites

Before you begin, ensure that you have an environment that's [set up](environment-setup.md) for workload development.

????
This user must be a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) in the tenant.

## Step 1: Setup Azure storage

You'll need consent to use Azure Storage. In this step you'll check whether Azure Storage is installed in the tenant, and if it isn't you'll install it.

1. Log into the [Azure portal](https://portal.azure.com).

2. Search for **Enterprise applications** and select it from the search results.

3. From the **Application type** filter dropdown list, select **All applications** and then select **Apply**.

4. In the **Application ID starts with** filter search box, enter the following application ID: `e406a681-f3d4-42a8-90b6-c2b029497af1` and then select **Apply**.

    If **Azure Storage** is listed, it's already installed and you can continue to [Step 2](#step-2-confirm-that-the-workload-is-running) .

5. If **Azure Storage** isn't listed, open **PowerShell** as an administrator and run the following commands:

   ```powershell
   Install-Module az
   Import-Module az
   Connect-AzureAD
   New-AzureADServicePrincipal -AppId e406a681-f3d4-42a8-90b6-c2b029497af1
   ```

## Step 2: Create an Azure Entra ID application

Follow these steps to run the sample workload.

1. Navigate to the [Sample Project Directory](https://go.microsoft.com/fwlink/?linkid=2272254) repository, select **Code** and then select **Download ZIP**.

2. Extract the contents of the zip file to a local directory on your machine. A new folder called **Microsoft-Fabric-workload-development-sample-main** is created.

3. Follow these steps to get your tenant IDL
    1. Log into Fabric with the user you want to use to create the workload.
    2. Select the **Help & Support** (the question mark **?**) and then select **About**.
    3. From the **Tenant URL** copy the string of numbers and letters after `https://app.powerbi.com/home?ctid=`. This is your tenant ID.

        For example, if your tenant URL is `https://app.powerbi.com/home?ctid=bbbbcccc-1111-dddd-2222-eeee3333ffff`, your tenant ID is bbbbcccc-1111-dddd-2222-eeee3333ffff.

4. Open **PowerShell** and do the following:

    1. Navigate to *Microsoft-Fabric-workload-development-sample-main\Microsoft-Fabric-workload-development-sample-main\Authentication* folder.

    2. Run the command below. You'll need to authenticate with the credentials of the user you're using to create the workload.

    ```powershell
    .\CreateDevAADApp.ps1 -applicationName "myWorkloadApp" -workloadName "Org.WorkloadSample" -tenantId "<your-tenant-id>"
    ```
5. Copy the following details from the output of the script:

* **ApplicationIdUri / Audience** - For example, `api://localdevinstance/<your-tenant-id>/Org.WorkloadSample/OyR`
* **RedirectURI** - `http://localhost:60006/close`
* **Application Id** - For example, `00001111-aaaa-2222-bbbb-3333cccc4444`
* **secret** - For example, `aaaaa~0b0b0b0b0b0b0b0b0b.bb~2d2d2d2d2d2d2`

## Frontend

## Backend



    
5. Login with the user you want to use to create the workload. This user must be a [Global administrator](/entra/identity/role-based-access-control/permissions-reference#global-administrator) in the tenant.

    >[!NOTE]
    >A *Global administrator* is needed to run the sample application. For development purposes, you can use a [Fabric administrator](/entra/identity/role-based-access-control/permissions-reference#fabric-administrator).

6. Enter the following details:

    * `applicationName` - Provide a name for your [Microsoft Entra ID application](/entra/identity/enterprise-apps/what-is-application-management).
    * `workloadName` - Provide a name for the Microsoft Fabric workload you want to create.
    * `tenantId` - Your Microsoft Fabric's tenant ID. If you don't know what's your tenant ID, see [Find the Microsoft Entra tenant ID](/partner-center/find-ids-and-domain-names#find-the-microsoft-azure-ad-tenant-id-and-primary-domain-name).

    For example:

    ```powershell
    .\CreateDevAADApp.ps1 -applicationName "myWorkloadApp" -workloadName "Org.WorkloadSample" -tenantId "bbbbcccc-1111-dddd-2222-eeee3333ffff"
    ```
























1. 
1. *Microsoft-Fabric-workload-development-sample-main* folder and navigate to the **Authentication** folder.

4. 
CreateDevAADApp




















2. **Install dependencies** - Navigate to the *Frontend* directory in the cloned repository and execute the following command:

   ```typescript
   npm install
   ```

3. **Start the local server** - Launch a local Node.js server using *webpack* by running:

   ```typescript
   npm start
   ```

4. **Confirm that the server is running** - The server typically runs on port *60006*. Confirm that the server is operational by navigating to `127.0.0.1:60006/manifests` on your browser.

## Step 2: Confirm that the workload is running

Follow these steps to confirm that the workload is running.

1. Open [Fabric](app.powerbi.com) and go to any workspace.

2. Select **New item** and from the list, select **Sample item**.

## Step 3: Register an Azure Entra ID application

Use the *CreateDevAADApp.ps1* script to register an Azure Entra ID application.

1. Download the [CreateDevAADApp.ps1](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Authentication/CreateDevAADApp.ps1) script.

2. Open the Microsoft Azure Command Prompt (CLI) and sign in with user of the account you're using to the application.

    ```azurecli
   az login
   ```

3. In CLI, navigate to the folder that has the *CreateDevAADApp.ps1* script.

4. Run the script with the following parameters:
    * `applicationName` - Provide a name for your [Microsoft Entra ID application](/entra/identity/enterprise-apps/what-is-application-management).
    * `workloadName` - Provide a name for the Microsoft Fabric workload you want to create.
    * `tenantId` - Your Microsoft Fabric's tenant ID. If you don't know what's your tenant ID, see [Find the Microsoft Entra tenant ID](/partner-center/find-ids-and-domain-names#find-the-microsoft-azure-ad-tenant-id-and-primary-domain-name).

    For example:

    ```azurecli
   .\CreateDevAADApp.ps1 -applicationName "myWorkloadApp" -workloadName "Org.Myworkload" -tenantId "bbbbcccc-1111-dddd-2222-eeee3333ffff"
   ```

5. The script's output is a text file that includes the details you'll need to configure your workload. Save the file for future reference.

Configure the backend to use Create, Read, Update, and Delete (CRUD) APIs, so that you can use the sample's dialog.












## Step 3: Prepare the development environment


1. **Open the solution**: Open the solution in Visual Studio *2022* to ensure compatibility with net7.



1. **App registration**: Follow the [authentication guide](./authentication-tutorial.md) to set up Microsoft Entra ID authentication for secure interactions within the architecture.




1. **Update OneLake DFS base URL**: Modify the `EnvironmentConstants.cs` file in the `Backend/src/Constants/` folder to match your environment.

1. **Configure workload settings**: Update `src/Config/workload-dev-mode.json` and `src/appsettings.json` with your specific configuration details:

    * Copy *workload-dev-mode.json* from src/Config to `C:\` and update the following fields to match your configuration:

    >[!NOTE]
    >You can copy it to any other path and set up the command line argument "-DevMode:LocalConfigFilePath" in your project to specify the path.

      * *WorkspaceGuid*: Your Workspace ID. Find it in the browser URL when selecting a workspace in Fabric, for example, `https://app.fabric.microsoft.com/groups/{WorkspaceID}/`.
      * *ManifestPackageFilePath*: The location of the manifest package. When you build the solution, it saves the manifest package within **src\bin\Debug**. More details on the manifest package can be found in the later steps.
      * *WorkloadEndpointURL*: Workload endpoint URL.

   * In the src/appsettings.json file, update the following fields to match your configuration:

      * *PublisherTenantId*: The ID of the workload publisher tenant.
      * *ClientId*: Client ID (AppID) of the workload Microsoft Entra application.
      * *ClientSecret*: The secret for the workload Microsoft Entra application.
      * *Audience*: The audience for incoming Microsoft Entra tokens can be found in your app registration that you created under "Expose an API" section. This is also referred to as the Application ID URI.
 
1. **Configure the WorkloadManifest.xml file**: Configure the *WorkloadManifest.xml* file with the following Microsoft Entra application details:

   * *AppID*
   * *ResourceID*
   * *RedirectURI*

1. **Generate manifest package**: Build the solution to create the manifest package file, which includes validating and packing the necessary XML and JSON files.

   * Trigger Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe on workloadManifest.xml in Packages\manifest\files\ (you can find the code of the validation process in the \workloadManifestValidator directory). If validation fails, an error file is generated specifying the failed validation.
   * If the error file exists, the build fails with "WorkloadManifest validation error". You can double click on the error in VS studio and it shows you the error file.
   * After successful validation, pack the WorkloadManifest.xml and FrontendManifest.json files into ManifestPackage.1.0.0.nupkg. The resulting package can be found in **src\bin\Debug**.

   Copy the ManifestPackage.1.0.0.nupkg file to the path defined in the workload-dev-mode.json configuration file.

1. **Run the DevGateway**: Execute 'Microsoft.Fabric.Workload.DevGateway.exe' and sign in with a user that has workspace admin privileges for the workspace specified in the `WorkspaceGuid` field of workload-dev-mode.json.

1. **Start the Project**: Set the 'Boilerplate' project as the startup project in Visual Studio and run it.

### Additional steps

* Update the workload configuration files as needed.
* Build the solution to ensure all dependencies are correctly linked.
* Run the frontend and devgateway to establish communication with the Fabric backend.
* Create items and run jobs to test the full capabilities of your workload.

## Related content

* [Node.js](https://nodejs.org)
* [npm](https://www.npmjs.com/)
