---
title: QuickStart - Run a workload sample
description: Create a Microsoft Fabric workload using a sample with the instructions in this quickstart tutorial.
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: quickstart  #Don't change
ms.custom:
ms.date: 12/27/2023
# Customer intent: Run a workload sample to get a five minute to 'wow' experience.
---
5 min to WOW - Clone - [user story 242721](https://dev.azure.com/msft-skilling/Content/_workitems/edit/242721)


# QuickStart: Run a workload sample

## Getting Started with Workload Development
This guide outlines the setup for development workload sample in Fabric tenant. It involves enabling the workload feature and Developer mode in the designated tenant. It assumes you have Node.js and npm installed, and walks you through the entire process of running a locally hosted workload frontend
For more information, see the [Setting up environment](TBD)
[Architecture / Diagrams. ](TBD)


## Installation and Usage ## 
A prerequisite for using custom workloads in Fabric is enabling the feature in Admin Portal by the Tenant Administrator.
This is done by enabling the switch 'Workload extensions (preview)' - either for the entire organization, or for specific groups within the organization.

![Workloads tenant switch](./docs/tenantSwitch.png)

To get started with the Sample Project, follow these steps:

**Verify** the requierment form the [Workload environment](workload-environment.md) are met.


1. **Install**. Notice existing packages under `node_modules` !
   Clone the repository:

   ```
   git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
   ```

   Under the repository folder, go to `Frontend` and run **npm install** 
   ``` 
   <repository folder>\Frontend> npm install
    ```

   **Notice** - The repository provides packages under ***node_modules/@trident***
   These packages are not **YET** available on public npm feeds, and so deleting them will render the repo unusable.
   In case of issues with the npm install (when merging mismatching versions, etc.), delete everything under `node_modules` **except** for the `@trident` folder, and delete the `package-lock.json` file, before rerunning **npm install**.


2. **Start server**
   ```
   <repository folder>\Frontend> npm start
   ```

   This command starts a **local** Node.js server (using `webpack`), that Microsoft Fabric will connect to when in Development Mode.
   
   Refer to the localhost server notes for port details, that appear after it has started.
   Current port is `60006`.
   After the localhost server has been started, opening the URL: `127.0.0.1:60006/manifests` fetches the contents of the `localWorkloadManifest.json` manifest file and doing so will verify that the server is up and running.

   Modifying source files triggers a reload of contents in Fabric through `webpack`, if already connected.
   However, typically, this would still necessitate a page refresh.

   If you make changes to the `localWorkloadManifest.json` manifest file, refresh the Fabric page to reload the manifest.

3. **Run**
   In Fabric - enable the Frontend Developer mode setting, allowing Fabric to access your localhost server
   This is done via Developer Settings --> Fabric Developer Mode (and a refresh of the page).
   This setting is persisted in the current browser.

   ![Enabling Developer Mode](./docs/devMode.png)
   
   

# Sample Usage #

Running a typical *Hello World* test scenario:

After starting the local server and enabling Dev Mode, the menu at the left bottom corner should show the new Sample Workload:
![Product Switcher Example Image](./docs/productSwitcher.png)

Select the **Sample Workload** and navigate the user to the Sample workload Home page. The upper section presents the Create Experience:
![Create Card Image](./docs/createCard.png)

Clicking on *Sample Item* will open a dialog for creating a new item, and if the [backend](../Backend/README.md) is configured - the newly saved item will open it for editing.
![Create dialog image](./docs/createDialog.png)


For testing out the various APIs and UI controls, while remaining in a Frontend-only experience - we provide the *Sample Item - Frontend only* card, which opens the same UI, but without an ability to perform CRUD or Jobs operations.

![Main Sample UI image](./docs/sampleEditor.png)

## Getting Started

To set up the boilerplate/sample project on your local machine, follow these steps:

1. Clone the Boilerplate: git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
2. Open Solution in Visual Studio 2022 (since our project works with net7).
3. Setup an app registration by following instructions on the Authentication [guide](../Authentication/Setup.md). Ensure that both your Frontend and Backend projects have the necessary setup described in the guide. Azure Active Directory (AAD) is employed for secure authentication, ensuring that all interactions within the architecture are authorized and secure.
   
4. Update the One Lake DFS Base URL: Depending on the environment you are using for Fabric, you can update the `OneLakeDFSBaseURL` within the **src\Constants\ folder. The default is `onelake.dfs.fabric.microsoft.com` but this can be updated to reflect the environment you are on. More information on the DFS paths can be found [here](https://learn.microsoft.com/en-us/fabric/onelake/onelake-access-api)

5. Setup Workload Configuration\
	&nbsp;&nbsp;a. Copy workload-dev-mode.json from src/Config to `C:\`.\
	&nbsp;&nbsp;**Note:** you can copy it to any other path and set up the command line argument "-DevMode:LocalConfigFilePath" in your project to specify the path.\
	&nbsp;&nbsp;b. In the workload-dev-mode.json file, update the following fields to match your configuration:\
		&emsp;&emsp;i. CapacityGuid: Your Capacity ID. This can be found within the Fabric Portal under the Capacity Settings of the Admin portal.\
		&emsp;&emsp;ii. ManifestPackageFilePath: The location of the manifest package. When you build the solution, it will save the manifest package within **src\bin\Debug**. More details on the manifest package can be found in the later steps.\
		&emsp;&emsp;iii. WorkloadEndpointURL: Workload Endpoint URL.\
	&nbsp;&nbsp;c. In the src/appsettings.json file, update the following fields to match your configuration:\
		&emsp;&emsp;i. PublisherTenantId: The Id of the workload publisher tenant.\
		&emsp;&emsp;ii. ClientId: Client ID (AppId) of the workload AAD application.\
		&emsp;&emsp;iii. ClientSecret: The secret for the workload AAD application.\
		&emsp;&emsp;iv. Audience: Audience for incoming AAD tokens. This can be found in your app registration that you created under "Expose an API" section. This is also referred to as the Application ID URI. \
	&nbsp;&nbsp;Please note that there is work to merge the two configuration files into one.

6. Manifest Package\
To generate a manifest package file, build Fabric_Extension_BE_Boilerplate which will run a 3 step process to generate the manifest package file:

	a. Trigger Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe on workloadManifest.xml in Packages\manifest\files\
	&emsp;(you can find the code of the validation proccess in \workloadManifestValidator directory), if the validation fails,\
	&emsp;an error file will be generated specifying the failed validation.\
	b. If the error file exists, the build will fail with "WorkloadManifest validation error",\
	&emsp;you can double click on the error in VS studio and it will show you the error file.\
	c. After successful validation, pack the WorkloadManifest.xml and FrontendManifest.json files\
	&emsp;into ManifestPackage.1.0.0.nupkg. The resulting package can be found in **src\bin\Debug**.\
Copy the ManifestPackage.1.0.0.nupkg file to the path defined in the workload-dev-mode.json configuration file.
7. Program.cs
	Serves as the entry point and startup script for your application. In this file, you can configure various services, initialize the application, and start the web host. It plays a pivotal role in setting up the foundation of your project.
	
8. Build to ensure your project can access the required dependencies for compilation and execution. 
9. Run the 'Microsoft.Fabric.Workload.DevGateway.exe' application located under 'Backend\DevGateway' and login with a user that is a capacity admin of the capacity you've defined in workload-dev-mode.json(CapacityGuid). Upon the initialization of the workload, an authentication prompt will be presented. It is essential to highlight that administrative privileges for the capacity are a prerequisite.


![signIn](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/573bb83a-1c54-4baf-bf52-0aca1e72bc21)
After authentication, external workloads establish communication with the Fabric backend through Azure Relay. This process involves relay registration and communication management, facilitated by a designated Proxy node. Furthermore, the package containing the workload manifest is uploaded and published.

At this stage, Fabric has knowledge of the workload, encompassing its allocated capacity.

Monitoring for potential errors can be observed in the console, with plans to incorporate additional logging in subsequent iterations.

If you see no errors, it means the connection is established, registration is successfully executed, and the workload manifest has been systematically uploaded, - a dedicated success message will be added here in the future.
![devgetway](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/139851206/548ea235-07f3-461d-b312-c9a01aa967a1)
10. Lastly, change your startup project in Visual Studio to the 'Boilerplate' project and simply click the "Run" button. 
![Run](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/16da53ad-013a-4382-b6cd-51acc4352c52)
![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/139851206/1e3fe360-28d1-4471-aded-8d69f00a8cfd)


## Update workload configuration files

## Build solution

Run frontend

Run devgateway

## Create item

## Run Job

## Related content

* [Fabric extensibility frontend](extensibility-frontend.md)
* [Fabric extensibility backend](extensibility-backend.md)


**QuickStart: Run a Workload Sample**

## Introduction
This QuickStart guide is designed to help you create and run a Microsoft Fabric workload using a sample. The instructions provided aim to deliver an impressive 'wow' experience within five minutes, showcasing the simplicity and power of the Microsoft Fabric Workload SDK.

## Prerequisites
Before you begin, ensure that you have Node.js and npm installed on your system. You will also need access to a Fabric tenant with the workload feature and Developer mode enabled.
See [workload-environment.md](Microsoft Fabric workload environment)

## Step-by-Step Guide

### Enabling Custom Workloads
1. **Admin Portal Configuration**: As a Tenant Administrator, go to the Admin Portal and enable 'Workload extensions (preview)'. This can be done for the entire organization or specific groups.

### Setting Up the Sample Project
2. **Clone the Repository**: Use the following command to clone the sample project repository:
   ```
   git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
   ```
3. **Install Dependencies**: Navigate to the `Frontend` directory within the cloned repository and execute:
   ```
   npm install
   ```
   **Important**: The repository includes packages under `node_modules/@trident` that are not yet available on public npm feeds. Do not delete these packages, as it will make the repository unusable.

4. **Start the Local Server**: Launch a local Node.js server using `webpack` by running:
   ```
   npm start
   ```
   The server typically runs on port `60006`. Confirm that the server is operational by accessing `127.0.0.1:60006/manifests` and checking the `localWorkloadManifest.json` manifest file.

5. **Enable Frontend Developer Mode**: In Fabric, activate the Frontend Developer mode to allow connections to your local server. This setting is found in Developer Settings and is persistent across browser sessions.

### Running a Sample Workload
6. **Access the Sample Workload**: Once the local server is running and Developer Mode is enabled, the new Sample Workload will appear in the menu. Navigate to the Sample workload Home page to start the Create Experience.

### Preparing Your Development Environment
7. **Clone the Boilerplate**: Clone the boilerplate project using the same command as in step 2.

8. **Open the Solution**: Open the solution in Visual Studio 2022, ensuring compatibility with net7.

9. **App Registration**: Follow the Authentication guide to set up Azure Active Directory (AAD) authentication for secure interactions within the architecture.

10. **Update One Lake DFS Base URL**: Modify the `OneLakeDFSBaseURL` in the `src\Constants\` folder to match your environment.

11. **Configure Workload Settings**: Update `workload-dev-mode.json` and `src/appsettings.json` with your specific configuration details
	
    - Copy workload-dev-mode.json from src/Config to `C:\`.
	**Note:** you can copy it to any other path and set up the command line argument "-DevMode:LocalConfigFilePath" in your project to specify the path.
	- In the workload-dev-mode.json file, update the following fields to match your configuration:
        * CapacityGuid: Your Capacity ID. This can be found within the Fabric Portal under the Capacity Settings of the Admin portal.
		* ManifestPackageFilePath: The location of the manifest package. When you build the solution, it will save the manifest package within **src\bin\Debug**. More details on the manifest package can be found in the later steps.
		* WorkloadEndpointURL: Workload Endpoint URL.
	    * In the src/appsettings.json file, update the following fields to match your configuration:\
		* PublisherTenantId: The Id of the workload publisher tenant.
		* ClientId: Client ID (AppId) of the workload AAD application.
		* ClientSecret: The secret for the workload AAD application.
		* Audience: Audience for incoming AAD tokens. This can be found in your app registration that you created under "Expose an API" section. This is also referred to as the Application ID URI.
	Please note that there is work to merge the two configuration files into one.

12. **Generate Manifest Package**: Build the solution to create the manifest package file, which includes validating and packing the necessary XML and JSON files.

	- Trigger Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe on workloadManifest.xml in Packages\manifest\files\
	(you can find the code of the validation proccess in \workloadManifestValidator directory), if the validation fails,
	an error file will be generated specifying the failed validation.
	- If the error file exists, the build will fail with "WorkloadManifest validation error",
	you can double click on the error in VS studio and it will show you the error file.
	- After successful validation, pack the WorkloadManifest.xml and FrontendManifest.json files
	into ManifestPackage.1.0.0.nupkg. The resulting package can be found in **src\bin\Debug**.
Copy the ManifestPackage.1.0.0.nupkg file to the path defined in the workload-dev-mode.json configuration file.

13. **Run the DevGateway**: Execute 'Microsoft.Fabric.Workload.DevGateway.exe' and authenticate as a capacity admin.

14. **Start the Project**: Set the 'Boilerplate' project as the startup project in Visual Studio and run it.

### Additional Steps
- Update workload configuration files as needed.
- Build the solution to ensure all dependencies are correctly linked.
- Run the frontend and devgateway to establish communication with the Fabric backend.
- Create items and run jobs to test the full capabilities of your workload.

### Conclusion
By following these detailed steps, you will be able to quickly set up and run a Microsoft Fabric workload sample, experiencing the platform's extensibility and ease of use firsthand.

**Note**: Ensure all links are functional and placeholders (TBD) are replaced with actual content before finalizing the document. Additionally, remove any image URLs and replace them with the correct relative paths to the images within the repository. The document should maintain a professional tone, clear structure, and provide concise instructions for the users.