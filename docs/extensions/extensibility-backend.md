---
title: Fabric extensibility backend
description: Learn about building the backend of a customized Fabric workload.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 12/27/2023
---

# Fabric extensibility backend boilerplate

This [Microsoft Fabric developer sample repository](https://github.com/microsoft/Microsoft-Fabric-developer-sample) serves as a starting point for building applications that require integration with various services, including Workload and Lakehouse. This guide helps you set up the environment and configure the necessary components to get started. This article outlines the key components and their roles in the architecture are outlined below.

## Frontend (FE)

The frontend is responsible for managing the user experience (UX) and behavior. It communicates with the Fabric FE portal via an IFrame, facilitating seamless interaction with the user.

## Backend (BE)

The backend plays a crucial role in storing both data and metadata. It utilizes CRUD operations to create Workload (WL) items along with metadata, and executes jobs to populate data in storage. The communication between the frontend and backend is established through public APIs.

## Azure Relay and Fabric SDK

Azure Relay acts as a conduit for interactions between the BE development box and the Fabric BE. The Fabric SDK, installed on the BE development box, enhances the communication and integration capabilities.

## Lakehouse Integration

Our architecture seamlessly integrates with Lakehouse, allowing operations such as saving, reading, and fetching data. The interaction is facilitated through Azure Relay and the Fabric SDK, ensuring secure and authenticated communication.

## Authentication and Security

Azure Active Directory (AAD) is employed for secure authentication, ensuring that all interactions within the architecture are authorized and secure.

This overview provides a glimpse into our architecture. For more information on project configuration, guidelines, and getting started, refer to the respective sections in this [README](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/README.md).

:::image type="content" source="./media/extensibility-backend/overview.png" alt-text="Diagram showing how Fabric SDK integrated into Fabric.":::

The frontend (FE) establishes communication with the Fabric FE portal via an IFrame. The portal, in turn, interacts with the Fabric backend (BE) by making calls to its exposed public APIs.

For interactions between the BE development box and the Fabric BE, the Azure Relay serve as a conduit. Additionally, the BE development box seamlessly integrates with Lakehouse, performing operations such as saving, reading, and fetching data from this resource.
The communication is facilitated by using Azure Relay and the Fabric Software Development Kit (SDK) installed on the BE development box.

The authentication for all communication within these components is ensured through Azure Active Directory (AAD), providing a secure and authenticated environment for the interactions between the frontend, backend, Azure Relay, Fabric SDK, and Lakehouse.

-------------------

## Project Configuration Guidelines

Our project operates on the .NET 7 framework, necessitating the installation of the .NET 7.0 SDK, available for download from the [official .NET website](https://dotnet.microsoft.com/). As our project harnesses the capabilities of .NET 7, you need to use Visual Studio 2022. NET 6.0 or higher in Visual Studio 2019 isn't supported.

Ensure that the NuGet Package Manager is integrated into your Visual Studio installation. This tool is required for streamlined management of external libraries and packages essential for our project.

### NuGet package management

* `<NuspecFile>Packages\manifest\ManifestPackage.nuspec</NuspecFile>`: This property specifies the path to the NuSpec file used for creating the NuGet package. The NuSpec file contains metadata about the package, such as its ID, version, dependencies, and other relevant information.

* `<GeneratePackageOnBuild>true</GeneratePackageOnBuild>`: When set to true, this property instructs the build process to automatically generate a NuGet package during each build. This is useful to ensure that the package is always up-to-date with the latest changes in the project.

* `<IsPackable>true</IsPackable>`: When set to true, this property indicates that the project is packable, meaning it can be packaged into a NuGet package. It is an essential property for projects intended to produce NuGet packages during the build process.

The generated NuGet package is located in the **src\bin\Debug** directory after the build process.

### Dependencies

The BE Boilerplate depends on the following Azure SDK packages:

* Azure.Core
* Azure.Identity
* Azure.Storage.Files.DataLake
Additionally, incorporate the Microsoft Identity package, as it plays a crucial role in implementing secure authentication and authorization, particularly when interfacing with Azure Active Directory (AAD) or other identity providers.

Lastly, our Software Development Kit (SDK) serves as the conduit linking our project to Fabric. The SDK will currently resides in the repository in src/packages/fabric. To configure the NuGet Package Manager, specify the path in the 'Package Sources' section prior to the build process.

```javascript
	<Project Sdk="Microsoft.NET.Sdk.Web">

	  <PropertyGroup>
	    <TargetFramework>net7.0</TargetFramework>
	    <AutoGenerateBindingRedirects>true</AutoGenerateBindingRedirects>
	    <BuildDependsOn>PreBuild</BuildDependsOn>
	    <NuspecFile>Packages\manifest\ManifestPackage.nuspec</NuspecFile>
	    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
	    <IsPackable>true</IsPackable>
	  </PropertyGroup>

	<ItemGroup>
		<PackageReference Include="Azure.Core" Version="x.x.x" />
		<PackageReference Include="Azure.Identity" Version="x.x.x" />
		<PackageReference Include="Azure.Storage.Files.DataLake" Version="x.x.x" />
		<PackageReference Include="Microsoft.AspNet.WebApi.Client" Version="x.x.x" />
		<PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="x.x.x" />
		<PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="x.x.x" />
		<PackageReference Include="Microsoft.Fabric.Workload.Sdk" Version="x.x.x.x" />
		<PackageReference Include="Microsoft.IdentityModel.Clients.ActiveDirectory" Version="x.x.x" />
		<PackageReference Include="Microsoft.IdentityModel.Protocols" Version="x.x.x" />
		<PackageReference Include="Microsoft.IdentityModel.Protocols.OpenIdConnect" Version="x.x.x" />
		<PackageReference Include="Microsoft.IdentityModel.Tokens" Version="x.x.x" />
		<PackageReference Include="Swashbuckle.AspNetCore" Version="x.x.x" />
		<PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="x.x.x" />
	</ItemGroup>

	<ItemGroup>
		<Folder Include="Properties\ServiceDependencies\" />
	</ItemGroup>

	<Target Name="PreBuild" BeforeTargets="PreBuildEvent">
		<Exec Command="Packages\manifest\files\Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe Packages\manifest\files\WorkloadManifest.xml .\Packages\manifest\files\" />
		<Error Condition="Exists('.\Packages\manifest\files\ValidationErrors.txt')" Text="WorkloadManifest validation error" File=".\Packages\manifest\files\ValidationErrors.txt" />
	</Target>

	</Project>
```

## Getting Started

To set up the boilerplate/sample project on your local machine, follow these steps:

1. Clone the Boilerplate: git clone https://github.com/microsoft/Microsoft-Fabric-developer-sample.git
1. Open Solution in Visual Studio 2022 (since our project works with net7).
1. Install Microsoft.Fabric.Workload.Sdk (nupkg and dependencies exist in src/packages/fabric).
   One approach is to configuring your package manager to include a local source (by accessing 'Tools -> NuGet Package Manager -> Package Manager Settings -> Package Sources') that points to ./Packages/fabric:
![local](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/11fd1bca-18d1-4a0f-8e4b-8425511f782d)

1. Setup Workload Configuration\
	&nbsp;&nbsp;a. Copy workload-dev-mode.json from src/Config to C:\.\
	&nbsp;&nbsp;b. In the workload-dev-mode.json file, update the following fields to match your configuration:\
		&emsp;&emsp;i. EnvironmentType: The environment to work with.\
		&emsp;&emsp;ii. CapacityGuid: Your Capacity ID.\
		&emsp;&emsp;iii. ManifestPackageFilePath: The location of the manifest package.\
	&nbsp;&nbsp;c. In the src/appsettings.json file, update the following fields to match your configuration:\
		&emsp;&emsp;i. PublisherTenantId: The Id of the workload publisher tenant.\
		&emsp;&emsp;ii. ClientId: Client ID (AppId) of the workload AAD application.\
		&emsp;&emsp;iii. ClientSecret: The secret for the workload AAD application.\
		&emsp;&emsp;iv. Audience: Audience for incoming AAD tokens.\
	&nbsp;&nbsp;Please note that there is work to merge the two configuration files into one.
1. Manifest Package\
To generate a manifest package file, build Fabric_Extension_BE_Boilerplate which will run a 3 step process to generate the manifest package file:

	a. Trigger Fabric_Extension_BE_Boilerplate_WorkloadManifestValidator.exe on workloadManifest.xml in Packages\manifest\files\
	&emsp;(you can find the code of the validation proccess in \workloadManifestValidator directory), if the validation fails,\
	&emsp;an error file will be generated specifying the failed validation.\
	b. If the error file exists, the build will fail with "WorkloadManifest validation error",\
	&emsp;you can double click on the error in VS studio and it will show you the error file.\
	c. After successful validation, pack the WorkloadManifest.xml and FrontendManifest.json files\
	&emsp;into ManifestPackage.1.0.0.nupkg. The resulting package can be found in **src\bin\Debug**.\
Copy the ManifestPackage.1.0.0.nupkg file to the path defined in the workload-dev-mode.json configuration file.
1. Program.cs
	Serves as the entry point and startup script for your application. In this file, you can configure various services, initialize the application, and start the web host. It plays a pivotal role in setting up the foundation of your project.
	Example: Registering a Custom Workload Configuration, one of the services you can configure in Program.cs is a custom workload configuration. This service allows you to define specific settings for your workload, which can be essential for 		tailoring your application's behavior:
	    services.AddSingleton(sp => new FabricWorkloadConfiguration
		{
		    WorkloadName = "Fabric.WorkloadSample",
		});
	
1. Build to ensure your project can access the required dependencies for compilation and execution. 
1. Lastly, change your startup project in Visual Studio to the 'Boilerplate' project and simply click the "Run" button. 
![Run](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/16da53ad-013a-4382-b6cd-51acc4352c52)

Upon the initialization of the workload, an authentication prompt will be presented. It is essential to highlight that administrative privileges for the capacity are a prerequisite:

![signIn](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/573bb83a-1c54-4baf-bf52-0aca1e72bc21)

After authentication, external workloads establish communication with the Fabric backend through Azure Relay. This process involves relay registration and communication management, facilitated by a designated Proxy node. Furthermore, the package containing the workload manifest is uploaded and published.

At this stage, Fabric has knowledge of the workload, encompassing its allocated capacity.

Monitoring for potential errors can be observed in the console, with plans to incorporate additional logging in subsequent iterations.

If you see no errors, it means the connection is established, registration is successfully executed, and the workload manifest has been systematically uploaded, - a dedicated success message will be added here in the future.

![logging](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/e9998a51-8059-4d5b-8fb5-25dbdb199578)

## CRUD Operations

CRUD, an acronym for Create, Read, Update, and Delete, serves as a foundational framework within Fabric, offering a unified approach for managing diverse artifacts through a common set of APIs.

![CRUD](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/f67ca9c5-29c1-4292-a1a6-2adba4b6770d)

For generic Fabric artifacts, the implementation of CRUD support necessitates workloads to define several workload callbacks within the FabricItemsLifecycleHandler class. When CRUD operations are initiated in the frontend (FE), calls traverse to the FabricItemsLifecycleHandler, where pertinent CRUD code is executed.

The frontend transmits a payload, comprising of:

**Metadata**: During the occurrence of OnCreate, this encompasses the identifier of the workspace originating the call and the identifier of the Tenant associated with the workload.

**Data**: Transmitted if required, for instance, in the cases of OnCreate or OnUpdate operations.

The FabricItemsLifecycleHandler constitutes the implementation for all CRUD operations. Specifically, it defines the actions to be taken in response to creation, update, deletion, and retrieval operations.

Each function within the FabricItemsLifecycleHandler returns a FabricItemOperationResult, encapsulating both the operation status and, in the event of failure, detailed error information within the ErrorDetails field. This field comprehensively outlines the error code, providing valuable insights into the encountered issues.

To fulfill the operation, OnGet and OnDelete directly transfer the necessary arguments. Conversely, in the case of OnCreate and OnUpdate, arguments are conveyed as an object comprising extended properties. This object serves as a payload, encapsulating the metadata and data to be transferred from the frontend (FE) to the backend (BE) during the Create or Update operations.

#### Implementation Walkthrough
Below is a description of the 'Create' flow as an example as demonstrated in the boilerplate sample.

```javascript
	public async Task<SDKContracts.FabricItemOperationResult> OnCreateFabricItemAsync(SDKContracts.FabricItemMetadata fabricItemMetadataRequest, FabricExecutionContext fabricExecutionContext, CancellationToken ct)
	{
		LogInfo(nameof(OnCreateFabricItemAsync), fabricItemMetadataRequest);

		var subjectAndAppToken = _authenticationService.FetchSubjectAndAppTokenTokenFromHeader(fabricExecutionContext.AuthorizationContext.AuthorizationHeader);
		var subjectClaims = await _authenticationService.ValidateSubjectAndAppToken(subjectAndAppToken, AllowedScopes);

		if (fabricItemMetadataRequest == null)
		{
			_logger.LogError("OnCreateFabricItemAsync: FabricItemMetadataRequest is null.");
			return new SDKContracts.FabricItemOperationResult { Status = SDKContracts.FabricItemOperationStatus.Failed };
		}

		EnsureTenant(subjectClaims, fabricItemMetadataRequest.TenantObjectId);

		var item = _itemFactory.CreateItem(fabricItemMetadataRequest.ItemType);
		await item.Create(fabricItemMetadataRequest);

		return OperationCompleted;
	}
```

**Authentication and Authorization** (FetchSubjectAndAppTokenTokenFromHeader): We retrieve and validate authentication tokens from the Authorization header in the fabricExecutionContext. This step ensures that the request comes from a legitimate and authorized source. We use the _authenticationService for this purpose and check against AllowedScopes.

**Validation** (ValidateSubjectAndAppToken): We perform further validation, ensuring that fabricItemMetadataRequest is not null. If validation fails, a "Failed" result is returned.

**Tenant Verification** (EnsureTenant): We ensure that the request's TenantObjectId matches the authenticated user's Tenant to maintain data separation between Tenants.

**Item Creation** (CreateItem): After successful validation, we create an item based on the provided fabricItemMetadataRequest and invoke the Create method on it. This action facilitates the creation of the item without writing data to the Lakehouse.

The implementation for the other functions follows a similar structure. On subsequent CRUD operations such as update, get, or delete, we refer to the local metadata file to fetch details about the workspace and Tenant. This information is then used to facilitate relevant updates and operations.

#### Services Utilization in Handlers
* ILogger: The handler employs a logger service to record traces, ensuring a comprehensive log of system activities.

* ILakehouseClientService: Integration with Lakehouse is facilitated through the LakeHouseClientService, providing seamless communication and operations related to Lakehouse.

* IAuthenticationService & IAuthorizationHandler: To establish a secure connection and validate tokens, authentication and authorization services are used, bolstering the overall security of the system. These services remain essential for ensuring the legitimacy of requests.

* Additionally, file streaming is utilized for the purpose of storing information and metadata concerning the location of the Lakehouse.

## Integration with Lakehouse

This project features seamless integration with Lakehouse, facilitated through the `LakehouseController.cs` controller. The controller already exposes fundamental actions for essential Lakehouse integration.

### GetLakehouseFile()

* Authentication and Authorization: Validates the request's authentication and authorization to ensure it has the necessary permissions to read Lakehouse files.
* Access Token: Acquires an access token for interacting with the Lakehouse service.
* File Retrieval: Retrieves the specified file from the Lakehouse service.
* Response Handling: Responds with either the retrieved data if it exists or a "No Content" status if the file is empty.

### WriteToLakehouseFile()

* Authentication and Authorization: Validates the request's authentication and authorization to ensure it has the necessary permissions to write Lakehouse files.
* Request Validation: Checks that the request data is valid and not null.
* Access Token: Acquires an access token for interacting with the Lakehouse service.
* File Existence Check: Determines if the file already exists in the Lakehouse and if overwriting is allowed.
* File Write: Writes data to the Lakehouse file or creates a new file if it doesn't exist.
* Response Handling: Responds with a success status and an empty response or a conflict response if overwriting is not allowed or the file already exists.

## Execution of Custom Logic

In addition to supporting CRUD operations, our boilerplate also provides the flexibility to execute custom logic directly from the frontend (FE). The execution process starts from the FE and directly reaches the exposed APIs of the controllers within the boilerplate.

The primary purpose of the Execute operations is to execute specific custom logic tailored to the requirements of your project. This could involve running complex computations, processing data, or performing tasks such as running  jobs on the workload's data stored in the Lakehouse.

To initiate an Execute operation, click on the Play button or you can implement a customized user interface (UI) or interaction within your FE.

Within the relevant controller action, you can execute your custom logic. This may involve invoking external services, processing data, or performing any other operations specific to your project.

The Execute operation can provide results or responses based on the execution of your custom logic. This information can be communicated back to the FE for further actions, display, or processing.

The boilerplate project includes two essential controllers that expose APIs to manage different aspects of your workload:

**FabricController**: This controller is responsible for managing the Fabric artifacts.

**LakehouseController**: The LakehouseController is designed for interactions and integration with the Lakehouse. It allows you to interact with and manipulate data stored in the Lakehouse, facilitating operations related to data storage and retrieval.

#### WriteToLakehouseFile - An Example of Execute Operation

As part of the LakehouseController, the WriteToLakehouseFile method serves as an example of an Execute operation. This operation is used for writing data to storage, particularly to the Lakehouse. It is a practical demonstration of how you can execute custom logic within the boilerplate, specifically for data storage tasks.

The WriteToLakehouseFile method enables you to interact with Lakehouse storage efficiently, whether it involves creating new files, overwriting existing ones, or writing data to specific file paths. By utilizing this method, you can seamlessly manage and manipulate data in the Lakehouse, illustrating the boilerplate's support for custom logic execution in the context of data storage and retrieval.

```javascript


	[HttpPut("writeToLakehouseFile")]
        public async Task<IActionResult> WriteToLakehouseFile([FromBody] WriteToLakehouseFileRequest request)
        {
            var accessToken = string.Empty;
            try
            {
                accessToken = _authenticationService.FetchBearerTokenFromHeader(Request.Headers.Authorization);
                await _authenticationService.ValidateDelegatedAADToken(accessToken, allowedScopes: ScopesForWriteLakehouseFile);
            }
            catch 
            {
                return Unauthorized();
            }

            if (request == null)
            {
                return BadRequest("Invalid request data.");
            }
            
            string lakeHouseAccessToken;
            try
            {
                lakeHouseAccessToken = await _authenticationService.GetAccessTokenOnBehalfOf(accessToken, OneLakeScopes);
            }
            catch (MsalUiRequiredException ex)
            {
                AuthenticationService.AddBearerClaimToResponse(ex, Response);
                return StatusCode(StatusCodes.Status403Forbidden);
            }
            var filePath = $"{request.WorkspaceId}/{request.LakehouseId}/Files/{request.FileName}";

            var fileExists = await _lakeHouseClientService.CheckIfFileExists(lakeHouseAccessToken, filePath);

            if (fileExists && !request.OverwriteIfExists)
            {
                // File exists, and overwrite is not allowed, return an appropriate response
                _logger.LogError($"WriteToLakehouseFile failed. The file already exists at filePath: {filePath}.");
                return Conflict("File already exists. Overwrite is not allowed.");
            }

            // The WriteToLakehouseFile method creates a new item if it doesn't exist,
            // but if it already exists and overwrite is allowed, it deletes the existing one and then creates a new one and writes content to it.
            string payload = JsonSerializer.Serialize(request.Content);
            await _lakeHouseClientService.WriteToLakehouseFile(lakeHouseAccessToken, filePath, payload);

            _logger.LogInformation($"WriteToLakehouseFile succeeded for filePath: {filePath}");
            return Ok();
        }
```

### Code walkthrough

**Authorization and Token Retrieval** (FetchBearerTokenFromHeader): The method begins by retrieving the access token required for authentication. It checks for proper authorization and validates the delegated Azure Active Directory (AAD) token.

**Input Validation** (ValidateDelegatedAADToken):
Proper input validation is performed, ensuring that the request contains valid data. If the request is invalid, a "Bad Request" response is returned.

**Access Token for Lakehouse** (GetAccessTokenOnBehalfOf):
The method obtains an access token for interacting with the Lakehouse. This token is acquired on behalf of the user to enable secure and authorized data manipulation.

**File Path Construction**:
The desired file path is constructed based on information provided in the request, such as the workspace, Lakehouse, and file name. This path is used to specify the location where data will be written.

**File Existence Check** (CheckIfFileExists):
The method checks if the file already exists at the specified file path in the Lakehouse. If the file exists and overwriting is not allowed, a "Conflict" response is returned.

**Data Writing or Overwriting** (WriteToLakehouseFile):
If the file does not exist or overwriting is allowed, the method performs the data writing process. It either creates a new file if it doesn't exist or, in the case of an existing file, deletes the existing one and creates a new one. Data is then written to the newly created file.

**Logging Success**:
Upon successful data writing or overwriting, the method logs the operation's success along with the file path.

**Response**:
A "Success" response is returned, indicating that the data has been successfully written to the Lakehouse storage.
The WriteToLakehouseFile method exemplifies an Execute operation used for writing data to storage, providing a clear and secure process for interacting with the Lakehouse. It demonstrates how the boilerplate supports custom logic execution for various data-related tasks.

### Direct API Access

The exposed APIs also allow direct access from external sources. These features provide convenient methods for external interactions with your application's functionality, making it easier for backend developers to work independently, for example, using tools like Postman, without the need to set up or use the frontend.

## Troubleshooting and Debugging

### Known Issues and Solutions

#### Missing Client Secret

`Error`:
Microsoft.Identity.Client.MsalServiceException: A configuration issue is preventing authentication - check the error message from the server for details. You can modify the configuration in the application registration portal. See https://aka.ms/msal-net-invalid-client for details. Original exception: AADSTS7000215: Invalid client secret provided. Ensure the secret being sent in the request is the client secret value, not the client secret ID, for a secret added to app 'app_guid'.

`Resolution`: Make sure you have the correct client secret in appsettings.json.

#### Error during artifact creation due to missing admin consent

`Error`:
Microsoft.Identity.Client.MsalUiRequiredException: AADSTS65001: The user or administrator has not consented to use the application with ID '4e691b14-bffe-456c-af9f-4efdfa12ed52' named 'childofmsaapp'. Send an interactive authorization request for this user and resource.

`Resolution`:
In the artifact editor, navigate to the bottom and click "Navigate to Authentication Page."
Under "Scopes" write ".default" and click "Get Access token."
Approve consent in the popped-up dialog.

#### Artifact creation fails due to capacity selection

`Error`: PriorityPlacement: There are no available core services for priority placement only 'name','guid','workload-name'.

`Resolution`: You might be using a user that only have access to Trial capacity. Make sure you are using a capacity that you have access to.

#### File creation failure with 404 (NotFound) error

`Error`: Creating a new file failed for filePath: 'workspace-id'/'lakehouse-id'/Files/data.json. Error: Response status code does not indicate success: 404 (NotFound).
Resolution: Ensure you are using the correct OneLake DFS URL for your environment.

`Resolution`: Make sure you are working with the OneLake DFS URL that fits your environment. For example, if you work with PPE environment, change EnvironmentConstants.OneLakeDFSBaseUrl in Constants.cs to the appropriate URL.

### Debugging

When troubleshooting various operations, set breakpoints in the code to analyze and debug the behavior. For effective debugging, follow these steps:

1. Open the code in your development environment.
1. Navigate to the relevant operation handler function (e.g., OnCreateFabricItemAsync for CRUD operations or an endpoint in a controller for Execute operations).
1. Place breakpoints at specific lines where you want to inspect the code.
1. Run the application in debug mode.
1. Trigger the operation from the frontend (FE) that you want to debug.
1. The debugger will pause execution at the specified breakpoints, enabling you to examine variables, step through code, and identify issues.

![BPCreate](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/138197766/106332b5-3240-4a31-9b6b-dcc440cced36)

## Contributing

We welcome contributions to this project. If you find any issues or want to add new features, follow these steps:

1. Fork the [Microsoft developer sample repository](https://github.com/microsoft/Microsoft-Fabric-developer-sample).
1. Create a new branch for your feature or bug fix.
1. Make your changes and commit them.
1. Push your changes to your forked repository.
1. Create a pull request with a clear description of your changes.

## Related content

* [Fabric extensibility overview](extensibility-overview.md)
* [Fabric extensibility frontend](extensibility-frontend.md)