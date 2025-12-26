---
title: Overview of the backend manifest of a workload for the Fabric Workload Development Kit
description: This article describes the overview and key concepts for the backend manifest definition.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 07/14/2024
#customer intent: As a developer, I want to understand how to create a backend manifest for a customized Fabric workload so that I can create customized user experiences.
---

# Workload Manifest
## Overview

The `WorkloadManifest.xml` and `Item.xml` files are required for workload definition in Fabric. They hold the basic Workload and Workload Items configuration settings for setup and they act as a guide for workload setup and management, helping define, share, and record essential workload details for smooth integration into Fabric.

In our sample repository a `.nupkg` file is generated from the XML files located in the `src/Packages/manifest` folder during the build process. This packaged file holds all the necessary information about your workload. In the `workload-dev-mode.json` file, there's a field called `ManifestPackageFilePath` that should point to this newly created `.nupkg` file.

### Upload and Registration Process 
1. **User Authentication**: During development, once executing the sample, your authentication initiates the upload and registration process. This ensures the correct association of the workload with your identity. 
2. **Manifest Parsing**: The uploaded manifest undergoes parsing to validate its structure and content. This step ensures that the manifest is correctly formatted and ready for further processing. 
3. **Workload Registration**: If parsing is successful, the workload is registered in Fabric. Essential configuration details, such as the workload ID, are stored in the Fabric database, enabling effective workload management.

## Workload Manifest - Key Manifest Components

The manifest, whose structure is defined by WorkloadDefinition.xsd, outlines core attributes of a workload, such as name, application, and endpoints. 

### SchemaVersion Attribute
Represents Fabric's WorkloadDefinition.xsd published version.

### WorkloadName Attribute
Your workload's unique identifier.
**Note that it is required to have an 'Org.' prefix for workloadName such that name consists of two words with '.' separator, e.g. 'Org.MyWorkload'. Other prefixes are invalid and will cause an upload failure.**
**This will be enforced in the following scenarios - dev connection, Test upload.**

### Version Element
Your manifest's version, should be [SemVer](https://semver.org/) compliant.

### CloudServiceConfiguration Element
Your workload's service configuration, currently only one configuration is supported.

### Microsoft Entra ID [Azure Active Directory (AAD)] Application Configuration

The `<AADApp>` section sets up Microsoft Entra ID [Azure Active Directory (AAD)] application for authentication and authorization processes. The `AppId` represents the unique identifier for your application, the `RedirectUri` specifies the URI to which Microsoft Entra ID will send the authentication response, and the `ResourceId` points to the unique identifier for the resource the application is accessing. For more context on what `ResourceId`, `AppId`, and `RedirectUri` represent, you can refer to the [authentication documentation](./authentication-concept.md).

```
<AADApp>
    <AppId>YourApplicationId</AppId>
    <RedirectUri>YourRedirectUri</RedirectUri>
    <ResourceId>YourResourceId</ResourceId>
</AADApp>
```

Consult the [authentication documentation](./authentication-concept.md) for a deeper understanding of `AppId`, `ResourceId`, and `RedirectUri` and their significance in the context of authentication processes.

### ServiceEndpoint Elements

Represent the configuration of a specific logical endpoint, for example, the backend endpoint which includes implementation for item CRUD and jobs APIs.
* The configuration for workload's backend endpoint states the backend URL of your workload.
```
<ServiceEndpoint>
    <Name>Workload</Name>
    <Url>YourWorkloadBackendUrl</Url>
    <IsEndpointResolutionService>...
    <EndpointResolutionContext>...
</ServiceEndpoint>
```

* `<IsEndpointResolutionService>` and `<EndpointResolutionContext>` are set based on whether your endpoint implements the workload API or only the endpoint resolution.
* The resolved endpoint that is returned from the service must meet the following requirements:
  * The domain of the resolved endpoint must match the domain of the [resource ID](/fabric/workload-development-kit/workload-cloud-setup#microsoft-entra-id-app-resourceid-format) found in the WorkloadManifest.xml.
  * The resolved endpoint URL may have up to six extra subdomains before the main domain.
  * Any subdomain after the first segment must belong to the list of [verified domains](/entra/fundamentals/add-custom-domain) of the publisher tenant.

#### Example

**Resource ID URL:** `https://contoso.com/fe/be/Org.WorkloadSample`
(where domain is `contoso.com`)

**Verified domains in tenant:** `contoso.com`, `be.contoso.com`, `eastus.be.contoso.com`

**Valid resolved endpoints:**

- `api.eastus.be.contoso.com`
- `be.contoso.com`
- `api.be.contoso.com`

**Invalid resolved endpoints:**

- `api.eastus.fe.contoso.com` (invalid because `eastus.fe.contoso.com` isn't a verified domain)
- `contoso-dev.com` (invalid because `contoso-dev.com` isn't a verified domain, and also doesn't match the main domain of the resource ID)

* For more information about using the workload-client API for endpoint resolution, see [Endpoint Resolution](/rest/api/fabric/workload/workloadapi/endpoint-resolution).

> [!NOTE]
> Endpoint resolution for Frontend is not supported.

## Item Manifest - Key Manifest Components

The manifest, whose structure is defined by ItemDefinition.xsd, outlines core attributes of a workload's item, such as name and job definitions.

### SchemaVersion Attribute
Represents Fabric's ItemDefinition.xsd published version.

### TypeName Attribute
Your item's unique identifier.

### Job Scheduler Configuration

The `<JobScheduler>` section encompasses various elements that define the behavior and settings of job scheduling, tracking, and management. 
- `<OnDemandJobDeduplicateOptions>` and `<ScheduledJobDeduplicateOptions>`: Define deduplication options for on-demand and scheduled item jobs, respectively. Options include `None` (no deduplication), `PerItem` (one job run for the same item and job type), and `PerUser` (one job run for the same user and item). 
- `<ItemJobTypes>`: Contains configurations for different item job types. 
- `<ItemJobType>`: Describes a specific job type. 
- `<Name>`: The name of the job type. Must use the Item's name as a prefix. 

For example, let's consider our sample workload, which includes three specific jobs defined within the `<ItemJobTypes>` section:

```
<JobScheduler>
    <OnDemandJobDeduplicateOptions>PerItem</OnDemandJobDeduplicateOptions>
    <ScheduledJobDeduplicateOptions>PerItem</ScheduledJobDeduplicateOptions>
    <ItemJobTypes>
    <ItemJobType Name="Org.WorkloadSample.SampleWorkloadItem.ScheduledJob" />
    <ItemJobType Name="Org.WorkloadSample.SampleWorkloadItem.CalculateAsText" />
    <ItemJobType Name="Org.WorkloadSample.SampleWorkloadItem.CalculateAsParquet" />
    </ItemJobTypes>
</JobScheduler>
```

 
- **CalculateAsText Job** : This job type handles text-based calculations, taking `Operand1` and `Operand2`, performing the selected operation, and saving the result in the lakehouse. 
- **CalculateAsParquet Job** : Specifically tailored for working with Parquet data, this job type also takes `Operand1` and `Operand2`, performs the selected operation, and stores the result in the lakehouse, following the Parquet data format.
See [monitoring hub guide](monitoring-hub.md) for more information on jobs and related configuration.

In summary, the Workload and Item Manifests serve as foundational documents for adding custom workloads to Fabric.
The authentication process triggers a straightforward sequence of actions: upload, parsing, and registration, guaranteeing proper configuration and efficient workload management within the Azure ecosystem.
