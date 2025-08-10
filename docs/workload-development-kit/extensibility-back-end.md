---
title: Implement the Microsoft Fabric backend
description: Learn how to build the backend of a customized Microsoft Fabric workload by using Fabric extensions. Learn about the Microsoft Fabric Workload Development Kit and how to use it by following a detailed example.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 05/21/2024
#customer intent: As a developer, I want to understand how to build the backend of a customized Microsoft Fabric workload and use the Microsoft Fabric Workload Development Kit so that I can create customized user experiences.
---

# Implement the Microsoft Fabric backend

This [Microsoft Fabric workload development sample repository](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample) is a starting point for building applications that require integration with various services and for integration with lakehouse architecture. This article helps you set up the environment and configure the necessary components to get started. The article outlines key components and their roles in the architecture.

## Frontend

The frontend is where you manage the user experience (UX) and behavior. It communicates with the Fabric frontend portal via an iFrame to facilitate seamless interaction.

For more information, see [Microsoft Fabric Workload Development Kit frontend](extensibility-front-end.md).

## Backend

The backend stores both data and metadata. It uses Create, Read, Update, and Delete (CRUD) operations to create workload items and metadata, and it executes jobs to populate data in storage. Communication between the frontend and backend is established through public APIs.

## Azure Relay and DevGateway


Azure Relay enables communication between the local development environment and the Fabric backend in developer mode. In developer mode, the workload operates on the developer's machine.

The DevGateway utility has two roles:

* It handles the workload's side of the Azure Relay channel and manages the registration of the workload local instance with Fabric in the context of a specific workspace. The utility handles deregistration when the channel disconnects.
* It works with Azure Relay to channel workload API calls from Fabric to the workload.

Workload Control API calls are made directly from the workload to Fabric. The Azure Relay channel isn't required for the calls.

## Lakehouse integration

The workload development kit architecture integrates seamlessly with a lakehouse architecture for operations like saving, reading, and fetching data. The interaction is facilitated through Azure Relay and the Fabric SDK to help ensure secure and authenticated communication. For more information, see [working with customer data](./fabric-data-plane.md).

## Authentication and security

Microsoft Entra ID is used for secure authentication, ensuring that all interactions within the architecture are authorized and secure.

The [development kit overview](development-kit-overview.md) provides a glimpse into our architecture. For more information about how projects are configured, for authentication guidelines, and to get started, see the following articles:

* [Workload authentication setup guide](./authentication-tutorial.md)

* [Workload authentication architecture overview](./authentication-concept.md)

* [Workload authentication implementation guide](back-end-authentication.md)

:::image type="content" source="./media/extensibility-back-end/overview.png" alt-text="Diagram showing how the Fabric SDK integrates with Fabric.":::

The frontend establishes communication with the Fabric frontend portal via an iFrame. The portal in turn interacts with the Fabric backend by making calls to its exposed public APIs.

For interactions between the backend development box and the Fabric backend, the Azure Relay serves as a conduit. Additionally, the backend development box seamlessly integrates with Lakehouse.
The communication is facilitated by using Azure Relay and the Fabric Software Development Kit (SDK) installed on the backend development box.

The authentication for all communication within these components is ensured through Microsoft Entra. Microsoft Entra provides a secure and authenticated environment for the interactions between the frontend, backend, Azure Relay, Fabric SDK, and Lakehouse.

## Prerequisites

* [.NET 7.0 SDK](https://dotnet.microsoft.com/)
* Visual Studio 2022

Ensure that the NuGet Package Manager is integrated into your Visual Studio installation. This tool is required for streamlined management of external libraries and packages essential for our project.

### NuGet package management

* `<NuspecFile>Packages\manifest\ManifestPackageDebug.nuspec</NuspecFile>` and `<NuspecFile>Packages\manifest\ManifestPackageRelease.nuspec</NuspecFile>`: These properties specify the path to the NuSpec files used for creating the NuGet package for Debug and Release modes. The NuSpec file contains metadata about the package, such as its ID, version, dependencies, and other relevant information.

* `<GeneratePackageOnBuild>true</GeneratePackageOnBuild>`: When set to `true`, this property instructs the build process to automatically generate a NuGet package during each build. This property is useful to ensure that the package is always up-to-date with the latest changes in the project.

* `<IsPackable>true</IsPackable>`: When set to `true`, this property indicates that the project can be packaged into a NuGet package. Being packable is an essential property for projects that are intended to produce NuGet packages during the build process.

The generated NuGet package for debug mode is located in the *src\bin\Debug* directory after the build process.

When you work in cloud mode, you can change the Visual Studio build configuration to **Release** and build your package. The generated package is located in the `src\bin\Release` directory. For more information, see [Working in cloud mode guide](workload-cloud-setup.md).

### Dependencies

* The backend Boilerplate sample depends on the following Azure SDK packages:

  * Azure.Core
  * Azure.Identity
  * Azure.Storage.Files.DataLake
  * The Microsoft Identity package

To configure NuGet Package Manager, specify the path in the **Package Sources** section before you begin the build process.

```javascript
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net7.0</TargetFramework>
    <AutoGenerateBindingRedirects>true</AutoGenerateBindingRedirects>
    <BuildDependsOn>PreBuild</BuildDependsOn>
    <GeneratePackageOnBuild>true</GeneratePackageOnBuild>
    <IsPackable>true</IsPackable>
  </PropertyGroup>
  
  <PropertyGroup Condition="'$(Configuration)' == 'Release'">
    <NuspecFile>Packages\manifest\ManifestPackageRelease.nuspec</NuspecFile>
  </PropertyGroup>

  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <NuspecFile>Packages\manifest\ManifestPackageDebug.nuspec</NuspecFile>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Azure.Core" Version="1.38.0" />
    <PackageReference Include="Azure.Identity" Version="1.11.0" />
    <PackageReference Include="Azure.Storage.Files.DataLake" Version="12.14.0" />
    <PackageReference Include="Microsoft.AspNet.WebApi.Client" Version="5.2.9" />
    <PackageReference Include="Microsoft.AspNetCore.Mvc.NewtonsoftJson" Version="7.0.5" />
    <PackageReference Include="Microsoft.Extensions.Logging.Debug" Version="7.0.0" />
    <PackageReference Include="Microsoft.Identity.Client" Version="4.60.3" />
    <PackageReference Include="Microsoft.IdentityModel.Protocols" Version="6.30.1" />
    <PackageReference Include="Microsoft.IdentityModel.Protocols.OpenIdConnect" Version="6.30.1" />
    <PackageReference Include="Microsoft.IdentityModel.Tokens" Version="6.30.1" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
  </ItemGroup>

  <ItemGroup>
    <Folder Include="Properties\ServiceDependencies\" />
  </ItemGroup>

  <Target Name="PreBuild" BeforeTargets="PreBuildEvent">
    <Exec Command="powershell.exe -ExecutionPolicy Bypass -File ValidationScripts\RemoveErrorFile.ps1 -outputDirectory ValidationScripts\" />
    <Exec Command="powershell.exe -ExecutionPolicy Bypass -File ValidationScripts\ManifestValidator.ps1 -inputDirectory .\Packages\manifest\ -inputXml WorkloadManifest.xml -inputXsd WorkloadDefinition.xsd -outputDirectory ValidationScripts\" />
    <Exec Command="powershell.exe -ExecutionPolicy Bypass -File ValidationScripts\ItemManifestValidator.ps1 -inputDirectory .\Packages\manifest\ -inputXsd ItemDefinition.xsd -outputDirectory ValidationScripts\" />
    <Exec Command="powershell.exe -ExecutionPolicy Bypass -File ValidationScripts\ValidateNoDefaults.ps1 -outputDirectory ValidationScripts\" />
    <Error Condition="Exists('ValidationScripts\ValidationErrors.txt')" Text="Validation errors with either manifests or default values" File="ValidationScripts\ValidationErrors.txt" />
  </Target>

</Project>
```

## Get started

To set up the workload sample project on your local machine:

1. Clone the repository: Run `git clone https://github.com/microsoft/Microsoft-Fabric-workload-development-sample.git`.
1. In Visual Studio 2022, open the solution.
1. Set up an app registration by following instructions in the [authentication tutorial](authentication-tutorial.md). Ensure that both your frontend and backend projects have the necessary setup that's described in the article. Microsoft Entra is used for secure authentication to help ensure that all interactions within the architecture are authorized and secure.
  1. Update the Microsoft OneLake DFS base URL. Depending on your Fabric environment, you might be able to update the value for `OneLakeDFSBaseURL` in the *src\Constants* folder. The default is `onelake.dfs.fabric.microsoft.com`, but you can update the URL to reflect your environment. For more information about DFS paths, see the [OneLake documentation](../onelake/onelake-access-api.md).

1. Set up the workload configuration.

   1. Copy *workload-dev-mode.json* from *src/Config* to *C:*.
   1. In the *workload-dev-mode.json* file, update the following fields to match your configuration:
      * **WorkspaceGuid**: Your workspace ID. You can find this value in the browser URL when you select a workspace in Fabric. For example, `https://app.powerbi.com/groups/<WorkspaceID>/`.
      * **ManifestPackageFilePath**: The location of the manifest package. When you build the solution, it saves the manifest package in *src\bin\Debug*. More information about the manifest package is provided later in the article.
      * **WorkloadEndpointURL**: The workload endpoint URL.
   1. In the *Packages/manifest/WorkloadManifest.xml* file, update the following fields to match your configuration:
      * **`<AppId>`**: The client ID (Application ID) of the workload Microsoft Entra application.
      * **`<RedirectUri>`**: The redirect URIs. You can find this value in the app registration that you created, under **Authentication**.
      * **`<ResourceId>`**: The audience for the incoming Microsoft Entra tokens. You can find this information in the app registration that you created, under **Expose an API**.
   1. In the *src/appsettings.json* file, update the following fields to match your configuration:
      * **PublisherTenantId**: The ID of the workload publisher tenant.
      * **ClientId**: The client ID (Application ID) of the workload Microsoft Entra application.
      * **ClientSecret**: The secret for the workload Microsoft Entra application.
      * **Audience**: The audience for the incoming Microsoft Entra tokens. You can find this information in the app registration that you created, under **Expose an API**. This setting is also called the *application ID URI*.

1. Generate a manifest package.

   To generate a manifest package file, build *Fabric_Extension_BE_Boilerplate*. The build is a three-step process that generates the manifest package file. It runs these steps:

   1. Triggers *ManifestValidator.ps1* on *WorkloadManifest.xml* in *Packages\manifest\/* and trigger *ItemManifestValidator.ps1* on all items XMLs (for example, *Item1.xml*) in *Packages\manifest\/*. If validation fails, an error file is generated. You can view the validation scripts in *ValidationScripts\/*.
   1. If an error file exists, the build fails with the error *Validation errors with either manifests or default values*. To see the error file in Visual Studio, double-click the error in the validation results.
   1. After successful validation, package the *WorkloadManifest.xml* and *Item1.xml* files into *ManifestPackage.1.0.0.nupkg*. The resulting package is in *src\bin\Debug*.

   Copy the *ManifestPackage.1.0.0.nupkg* file to the path that's defined in the *workload-dev-mode.json* configuration file.

1. *Program.cs* is the entry point and startup script for your application. In this file, you can configure various services, initialize the application, and start the web host.
1. Build to ensure your project can access the required dependencies for compilation and execution.
1. Download the DevGateway from [Microsoft's Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=105993)
1. Run the *Microsoft.Fabric.Workload.DevGateway.exe* application and sign in with a user that has **workspace admin privileges** for the workspace specified in the `WorkspaceGuid` field of workload-dev-mode.json.

   :::image type="content" source="./media/extensibility-back-end/sign-in.png" alt-text="Screenshot of the Microsoft sign in page.":::

   After authentication, external workloads establish communication with the Fabric backend through Azure Relay. This process involves relay registration and communication management that's facilitated by a designated proxy node. The package that contains the workload manifest is uploaded and published.

   At this stage, Fabric detects the workload and incorporates its allocated capacity.

   You can monitor for potential errors in the console.

   If no errors are shown, the connection is established, registration is successfully executed, and the workload manifest is systematically uploaded.

   :::image type="content" source="./media/extensibility-back-end/devgateway.png" alt-text="Screenshot of connection loading without any errors.":::

1. In Visual Studio, change your startup project to the Boilerplate project and select **Run**.

    :::image type="content" source="./media/extensibility-back-end/boilerplate.png" alt-text="Screenshot of UI for startup project in Visual Studio.":::

## Work with the Boilerplate sample project

### Code generation

We use the workload Boilerplate C# ASP.NET Core sample to demonstrate how to build a workload by using REST APIs. The sample starts with generating server stubs and contract classes based on the Workload API [Swagger specification](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Contracts/FabricAPI/Workload/swagger.json). You can generate the code by using any of several Swagger code-generation tools. The Boilerplate sample uses [NSwag](https://github.com/RicoSuter/NSwag). The sample contains the *GenerateServerStub.cmd* command line script, which wraps the NSwag code generator. The script takes a single parameter, which is a full path to NSwag installation directory. It also checks for the Swagger definition file (*swagger.json*) and the configuration file (*nswag.json*) in the folder.

Executing this script produces a C# file named *WorkloadAPI_Generated.cs*. The contents of this file can be logically divided into three parts as explained in the next sections.

### ASP.NET Core stub controllers

`ItemLifecycleController` and `JobsController` classes are thin implementations of ASP.NET Core controllers for two subsets of the Workload API: item lifecycle management and jobs. These classes plug into the ASP.NET Core HTTP pipeline. They serve as the entrypoints for the API methods that are defined in the Swagger specification. The classes forward the calls to the "real" implementation that's provided by the workload.

Here's an example of the `CreateItem` method:

```csharp
/// <summary>
/// Called by Microsoft Fabric for creating a new item.
/// </summary>
/// <remarks>
/// Upon item creation Fabric performs some basic validations, creates the item with 'provisioning' state and calls this API to notify the workload. The workload is expected to perform required validations, store the item metadata, allocate required resources, and update the Fabric item metadata cache with item relations and ETag. To learn more see [Microsoft Fabric item update flow](https://updateflow).
/// <br/>
/// <br/>This API should accept [SubjectAndApp authentication](https://subjectandappauthentication).
/// <br/>
/// <br/>##Permissions
/// <br/>Permissions are checked by Microsoft Fabric.
/// </remarks>
/// <param name="workspaceId">The workspace ID.</param>
/// <param name="itemType">The item type.</param>
/// <param name="itemId">The item ID.</param>
/// <param name="createItemRequest">The item creation request.</param>
/// <returns>Successfully created.</returns>
[Microsoft.AspNetCore.Mvc.HttpPost, Microsoft.AspNetCore.Mvc.Route("workspaces/{workspaceId}/items/{itemType}/{itemId}")]
public System.Threading.Tasks.Task CreateItem(System.Guid workspaceId, string itemType, System.Guid itemId, [Microsoft.AspNetCore.Mvc.FromBody] CreateItemRequest createItemRequest)
{

 return _implementation.CreateItemAsync(workspaceId, itemType, itemId, createItemRequest);
}
```

### Interfaces for workload implementation

`IItemLifecycleController` and `IJobsController` are interfaces for the previously mentioned "real" implementations. They define the same methods, which the controllers implement.

### Definition of contract classes

C# contract classes are classes that the APIs use.

## Implementation

The next step after generating code is implementing the `IItemLifecycleController` and `IJobsController` interfaces. In the Boilerplate sample, `ItemLifecycleControllerImpl` and `JobsControllerImpl` implement these interfaces.

For example, this code is the implementation of the CreateItem API:

```csharp
/// <inheritdoc/>
public async Task CreateItemAsync(Guid workspaceId, string itemType, Guid itemId, CreateItemRequest createItemRequest)
{
 var authorizationContext = await _authenticationService.AuthenticateControlPlaneCall(_httpContextAccessor.HttpContext);
 var item = _itemFactory.CreateItem(itemType, authorizationContext);
 await item.Create(workspaceId, itemId, createItemRequest);
}
```

## Handle an item payload

Several API methods accept various types of "payload" as part of the request body, or they return payloads as part of the response. For example, `CreateItemRequest` has the `creationPayload` property.

```json
"CreateItemRequest": {
 "description": "Create item request content.",
 "type": "object",
 "additionalProperties": false,
 "required": [ "displayName" ],
 "properties": {
 "displayName": {
  "description": "The item display name.",
  "type": "string",
  "readOnly": false
 },
 "description": {
  "description": "The item description.",
  "type": "string",
  "readOnly": false
 },
 "creationPayload": {
  "description": "Creation payload specific to the workload and item type, passed by the item editor or as Fabric Automation API parameter.",
  "$ref": "#/definitions/CreateItemPayload",
  "readOnly": false
 }
 }
}
```

The types for these payload properties are defined in the Swagger specification. There's a dedicated type for every kind of payload. These types don't define any specific properties, and they allow any property to be included.

Here's an example of the `CreateItemPayload` type:

```json
"CreateItemPayload": {
 "description": "Creation payload specific to the workload and item type.",
 "type": "object",
 "additionalProperties": true
}
```

The generated C# contract classes are defined as `partial`. They have a dictionary with properties defined.

Here's an example:

```csharp
/// <summary>
/// Creation payload specific to the workload and item type.
/// </summary>
[System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "13.20.0.0 (NJsonSchema v10.9.0.0 (Newtonsoft.Json v13.0.0.0))")]
public partial class CreateItemPayload
{
 private System.Collections.Generic.IDictionary<string, object> _additionalProperties;

 [Newtonsoft.Json.JsonExtensionData]
 public System.Collections.Generic.IDictionary<string, object> AdditionalProperties
 {
  get { return _additionalProperties ?? (_additionalProperties = new System.Collections.Generic.Dictionary<string, object>()); }
  set { _additionalProperties = value; }
 }
}
```

The code can use this dictionary to read and return properties. However, a better approach is to define specific properties by using corresponding types and names. You can use the `partial` declaration on the generated classes to efficiently define properties.

For example, the *CreateItemPayload.cs* file contains a complementary definition for the `CreateItemPayload` class.

In this example, the definition adds the `Item1Metadata` property:

```csharp
namespace Fabric_Extension_BE_Boilerplate.Contracts.FabricAPI.Workload
{
    /// <summary>
    /// Extend the generated class by adding item-type-specific fields.
    /// In this sample every type will have a dedicated property. Alternatively, polymorphic serialization could be used.
    /// </summary>
    public partial class CreateItemPayload
    {
        [Newtonsoft.Json.JsonProperty("item1Metadata", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public Item1Metadata Item1Metadata { get; init; }
    }
}
```

However, if the workload supports multiple item types, the `CreateItemPayload` class must be able to handle different types of creation payload at one per item type. You have two options. The simpler way, used in the Boilerplate sample, is to define multiple optional properties, each representing the creation payload for a different item type. Every request then has just one of these sets of properties, according to the item type being created. Alternatively, you can implement polymorphic serialization, but this option isn't demonstrated in the sample because the option doesn't provide any significant benefits.

For example, to support two item types, the class definition must be extended like in the following example:

```csharp
namespace Fabric_Extension_BE_Boilerplate.Contracts.FabricAPI.Workload
{
    public partial class CreateItemPayload
    {
        [Newtonsoft.Json.JsonProperty("item1Metadata", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public Item1Metadata Item1Metadata { get; init; }

        [Newtonsoft.Json.JsonProperty("item2Metadata", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public Item2Metadata Item2Metadata { get; init; }
    } 
}
```

> [!NOTE]
> The payload that's sent to the workload is generated by the client. It can be the item editor iFrame or the Fabric Automation REST API. The client is responsible for sending the correct payload and matching the item type. The workload is responsible for verification. Fabric treats this payload as an opaque object and only transfers it from the client to the workload. Similarly, for a payload that's returned by the workload to the client, it is responsibility of the workload and the client to handle the payload correctly.

For example, this code shows how the Boilerplate sample **item1** implementation handles the payload:

```csharp
protected override void SetDefinition(CreateItemPayload payload)
{
 if (payload == null)
 {
  Logger.LogInformation("No payload is provided for {0}, objectId={1}", ItemType, ItemObjectId);
  _metadata = Item1Metadata.Default.Clone();
  return;
 }

 if (payload.Item1Metadata == null)
 {
  throw new InvalidItemPayloadException(ItemType, ItemObjectId);
 }

 if (payload.Item1Metadata.Lakehouse == null)
 {
  throw new InvalidItemPayloadException(ItemType, ItemObjectId)
   .WithDetail(ErrorCodes.ItemPayload.MissingLakehouseReference, "Missing Lakehouse reference");
 }

 _metadata = payload.Item1Metadata.Clone();
}
```

## Troubleshoot and debug

The next sections describe how to troubleshoot and debug your deployment.

### Known issues and resolutions

Get information about known issues and ways to resolve them.

#### Missing client secret

**Error**:

**Microsoft.Identity.Client.MsalServiceException**: A configuration issue is preventing authentication. Check the error message from the server for details. You can modify the configuration in the application registration portal. See `https://aka.ms/msal-net-invalid-client` for details.

**Original exception: AADSTS7000215**: An invalid client secret was provided. Ensure that the secret that is sent in the request is the client secret value and not the client secret ID for a secret added to the app `app_guid` setting.

**Resolution**: Make sure that you have the correct client secret defined in *appsettings.json*.

#### Error during item creation due to missing admin consent

**Error**:

**Microsoft.Identity.Client.MsalUiRequiredException: AADSTS65001**: The user or administrator didn't consent to use the application with ID `<example ID>`. Send an interactive authorization request for this user and resource.

**Resolution**:

1. In the item editor, go to the bottom of the pain and select **Navigate to Authentication Page**.

1. Under **Scopes**, enter **.default**, and then select **Get Access token**.

1. In the dialog, approve the revision.

#### Item creation fails due to capacity selection

**Error**:

**PriorityPlacement**: No core services are available for priority placement. Only `name`, `guid`, and `workload-name` are available.

**Resolution**:

As a user, you might have access only to Trial capacity. Make sure that you use a capacity you have access to.

#### File creation failure with 404 (NotFound) error

**Error**:

**Creating a new file failed for filePath: 'workspace-id'/'lakehouse-id'/Files/data.json**. The response status code doesn't indicate success: **404 (NotFound)**.

**Resolution**:

Make sure that you're working with the OneLake DFS URL that fits your environment. For example, if you work with a PPE environment, change `EnvironmentConstants.OneLakeDFSBaseUrl` in *Constants.cs* to the appropriate URL.

### Debug

When you troubleshoot various operations, you can set breakpoints in the code to analyze and debug the behavior. Follow these steps for effective debugging:

1. Open the code in your development environment.
1. Go to the relevant operation handler function (for example, `OnCreateFabricItemAsync` for CRUD operations or an endpoint in a controller for `execute` operations).
1. Place breakpoints at specific lines where you want to inspect the code.
1. Run the application in debug mode.
1. Trigger the operation from the frontend that you want to debug.

The debugger pauses execution at the specified breakpoints so that you can examine variables, step through the code, and identify issues.

:::image type="content" source="./media/extensibility-back-end/debugger.png" alt-text="Screenshot of sample program with breakpoints for debugging.":::

## Workspace

If you're a connecting a backend to the sample workload project, your item must belong to a workspace that is associated with a capacity. By default, the *My Workspace* workspace isn't associated with a capacity. Otherwise, you might get the error that's shown in the following screenshot:

:::image type="content" source="./media/extensibility-back-end/copy-item.png" alt-text="Screenshot of UI for naming a sample workload item.":::

1. Switch to a named workspace. Leave the default workspace name **My workspace**.

1. From the correct workspace, load the sample workload and proceed with the tests:

## Contribute

We welcome contributions to this project. If you find any issues or want to add new features, follow these steps:

1. Fork the repository.
1. Create a new branch for your feature or bug fix.
1. Make your changes, and then commit them.
1. Push your changes to your forked repository.
1. Create a pull request that has a clear description of your changes.

## Related content

* [Microsoft Fabric Workload Development Kit overview](development-kit-overview.md)
* [Microsoft Fabric Workload Development Kit frontend](extensibility-front-end.md)
