---
title: Quick start - run a sample workload
description: Create a Microsoft Fabric workload using a sample workload and the instructions in this quickstart tutorial.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: quickstart  #Don't change
ms.custom:
ms.date: 05/21/2024
# Customer intent: Run a workload sample to get a five minute to 'wow' experience.
---

# Quick start: run a workload sample

This quick start guide shows you how to create and run a Microsoft Fabric workload using a sample workload.

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

* Access to a Fabric tenant with the workload feature and developer mode enabled. See [Introducing workloads](./workload-environment.md) for more information.
* [Node.js](https://nodejs.org).
* [npm](https://www.npmjs.com/).
* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/).

## Step-by-step guide

### Enable custom workloads

Configure the admin portal as follows:

1. Log into [Fabric](https://app.fabric.microsoft.com/signin) with an *Admin* account.

1. From **Settings**, go to the **Admin portal**.

   :::image type="content" source="./media/quickstart-sample/settings-admin-portal.png" alt-text="Screenshot showing how to get to the Fabric Admin portal.":::

1. In the **Additional workloads (preview)** section, enable the **Capacity admins and contributors can add and remove additional workloads** tenant setting. You can enable it for the entire organization or specific groups.

### Set up the sample project

1. **Clone the repository**: Use the following command to clone the sample project repository:

   ```typescript
   git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
   ```

1. **Install dependencies**: Navigate to the `Frontend` directory in the cloned repository and execute the following command:

   ```typescript
   npm install
   ```

   > [!IMPORTANT]
   >The repository includes packages under `node_modules/@trident` that aren't available yet on public npm feeds. Don't delete these packages, as it will make the repository unusable.

1. **Start the local server**: Launch a local Node.js server using `webpack` by running:

   ```typescript
   npm start
   ```

   The server typically runs on port `60006`. Confirm that the server is operational by accessing `127.0.0.1:60006/manifests` and checking the `localWorkloadManifest.json` manifest file.

1. **Enable frontend developer mode**: In the tenant settings in the admin portal, under the **Additional workloads (preview)** section, and activate the **Capacity admins can develop additional workloads.** tenant setting. This setting allows connections to your local server and persists across browser sessions.

### Run a sample workload

Once the local server is running and *Developer Mode* is enabled, the new sample workload appears in the menu.

1. **Access the sample workload**:  To start the *Create* experience, navigate to the sample workload home page.

### Prepare the development environment

1. **Clone the boilerplate**: Clone the boilerplate project:

   ```typescript
   git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
   ```

1. **Open the solution**: Open the solution in Visual Studio *2022* to ensure compatibility with net7.

1. **App registration**: Follow the authentication guide to set up Microsoft Entry ID authentication for secure interactions within the architecture.

1. **Update OneLake DFS base URL**: Modify the `OneLakeDFSBaseURL` file in the `src\Constants\` folder to match your environment.

1. **Configure workload settings**: Update `workload-dev-mode.json` and `src/appsettings.json` with your specific configuration details:

    * Copy *workload-dev-mode.json* from src/Config to `C:\` and update the following fields to match your configuration:

    >[!NOTE]
    >You can copy it to any other path and set up the command line argument "-DevMode:LocalConfigFilePath" in your project to specify the path.

      * *CapacityGuid*: Your capacity ID can be found within the Fabric portal under the Capacity Settings of the admin portal.
      * *ManifestPackageFilePath*: The location of the manifest package. When you build the solution, it saves the manifest package within **src\bin\Debug**. More details on the manifest package can be found in the later steps.
      * *WorkloadEndpointURL*: Workload endpoint URL.

   * In the src/appsettings.json file, update the following fields to match your configuration:\

      * *PublisherTenantId*: The ID of the workload publisher tenant.
      * *ClientId*: Client ID (AppID) of the workload Microsoft Entra application.
      * *ClientSecret*: The secret for the workload Microsoft Entra application.
      * *Audience*: The audience for incoming Microsoft Entra tokens can be found in your app registration that you created under "Expose an API" section. This is also referred to as the Application ID URI.
 
1. **Generate manifest package**: Build the solution to create the manifest package file, which includes validating and packing the necessary XML and JSON files.

   * Trigger Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe on workloadManifest.xml in Packages\manifest\files\ (you can find the code of the validation process in the \workloadManifestValidator directory). If validation fails, an error file is generated specifying the failed validation.
   * If the error file exists, the build fails with "WorkloadManifest validation error". You can double click on the error in VS studio and it shows you the error file.
   * After successful validation, pack the WorkloadManifest.xml and FrontendManifest.json files into ManifestPackage.1.0.0.nupkg. The resulting package can be found in **src\bin\Debug**.

   Copy the ManifestPackage.1.0.0.nupkg file to the path defined in the workload-dev-mode.json configuration file.

1. **Run the DevGateway**: Execute 'Microsoft.Fabric.Workload.DevGateway.exe' and authenticate as a capacity admin.

1. **Start the Project**: Set the 'Boilerplate' project as the startup project in Visual Studio and run it.

### Additional steps

* Update the workload configuration files as needed.
* Build the solution to ensure all dependencies are correctly linked.
* Run the frontend and devgateway to establish communication with the Fabric backend.
* Create items and run jobs to test the full capabilities of your workload.

## Related content

* [Node.js](https://nodejs.org)
* [npm](https://www.npmjs.com/)