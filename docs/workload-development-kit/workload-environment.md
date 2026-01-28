---
title: Microsoft Fabric workload environment
description: Learn about the Microsoft Fabric workload environment and how it's configured on your local machine and on the cloud.
author: KesemSharabi
ms.author: kesharab
ms.topic: concept-article
ms.custom:
ms.date: 05/21/2024
---

# Introducing workloads

This chapter introduces the key components of our system and provides an overview of the architecture. These components work together to create a robust and flexible platform for your development needs. Let’s delve into these components and their roles within our architecture.

## Fabric workload architecture

Some of the key aspects of the Fabric workload architecture are:

* It handles data processing, storage, and management. It validates Microsoft Entra ID tokens before processing them and interacts with external Azure services, such as Lakehouse.

* The workload Frontend (FE) offers a user interface for job creation, authoring, management, and execution.

* User interactions via the FE initiate requests to the BE, either directly or indirectly via the Fabric Backend (Fabric BE).

For more detailed diagrams depicting the communication and authentication of the various components, see the [Backend authentication and authorization overview](back-end-authentication.md) and the [Authentication overview](./authentication-concept.md) diagrams.

### Frontend (FE)

The frontend serves as the base of the user experience (UX) and behavior, operating within an iframe in the Fabric portal. It provides the Fabric partner with a specific user interface experience, including an item editor. The extension client SDK equips the necessary interfaces, APIs, and bootstrap functions to transform a regular web app into a Micro Frontend web app that operates seamlessly within the Fabric portal.

### Backend (BE)

The backend is the powerhouse for data processing and metadata storage. It employs CRUD operations to create and manage workload items along with metadata, and executes jobs to populate data in storage. The communication bridge between the frontend and backend is established through public APIs.

The workloads can run in two environments: local and cloud. In local (devmode), the workload runs on the developer's machine, with API calls managed by the DevGateway utility. This utility also handles workload registration with Fabric. In cloud mode, the workload runs on the partner services, with API calls made directly to an HTTPS endpoint.

## Development environment
- **Dev mode workload package**: When building the backend solution in Visual Studio, use the Debug build configuration to create a BE NuGet package, which can be loaded in to the Fabric tenant using the DevGateway application.

:::image type="content" source="./media/workload-environment/developer-mode-diagram.png" alt-text="Diagram of the developer mode architecture." lightbox="./media/workload-environment/developer-mode-diagram.png":::

- **Cloud mode workload package**: When building the BE solution in Visual Studio, use the Release build configuration to create a standalone workload package (BE and FE). This package can be uploaded to tenant directly.

:::image type="content" source="./media/workload-environment/cloud-mode-diagram.png" alt-text="Diagram of the cloud mode architecture." lightbox="./media/workload-environment/cloud-mode-diagram.png":::

- For more details on Debug and Release build configurations, see [change the build configuration](/visualstudio/debugger/how-to-set-debug-and-release-configurations#change-the-build-configuration)


### Workload NuGet package structure

The workload is packaged as a NuGet package, combining backend and frontend components. The structure adheres to specific naming conventions and is enforced by Fabric for consistency across upload scenarios.
The NuGet package designed to represent workloads is structured to include both backend and frontend components.

#### Backend structure

The backend segment comprises .xml files that define the workload and its associated items, which are essential for registration with Fabric.

##### Key components
- `WorkloadManifest.xml` - The workload configuration file, required to have this exact name for Fabric's verification.
- `Item1.xml`, `Item2.xml`, `...` - Manifests for individual items with flexible naming, following the XML format.

#### Frontend structure

The frontend section contains .json files detailing the product and items for the frontend, along with an 'assets' directory for icons.

##### Key components
- `Product.json` - The main manifest for your product's frontend, which must be named precisely for Fabric's verification.
- `Item1.json`, `Item2.json`, `...` - Manifests for individual items with flexible naming, following the JSON format. Each json corresponds to a backend manifest (e.g., Item1.json to Item1.xml).
- `assets` folder - Stores all icons `icon1.jpg`, `icon2.png`, `...` used by the frontend.

#### Mandatory structure compliance

The structure, including specific subfolder names ('BE', 'FE', 'assets'), is mandatory and enforced by Fabric for all upload scenarios, including test and development packages. The structure is specified in the `.nuspec` files found in the [repository](https://go.microsoft.com/fwlink/?linkid=2272254) under the `Backend/src/Packages/manifest` directory.

### Limits
The following limits apply to all types of NuGet packages, both in development mode and cloud mode:
- Only `BE` and `FE` subfolders are permitted. Any other subfolders or files located outside these folders result in an upload error.
- The `BE` folder accepts only `.xml` files. Any other file type result in an upload error.
- A maximum of 10 item files is allowed, meaning the `BE` folder can contain one `WorkloadManifest.xml` and up to 10 `Item.xml` files. Having more than 10 item files in the folder result in an upload error.
- The `Assets` subfolder must reside under the `FE` folder. It can contain up to 15 files, with each file being no larger than 1.5 MB.
- Only the following file types are permitted in the `Assets` subfolder: `.jpeg`, `.jpg`, `.png`.
- The `FE` folder can contain a maximum of 10 item files plus one `product.json` file.
- The size of the `product.json` must not exceed 50 KB.
- Each asset within the `Assets` folder must be referenced within the item files. Any asset referenced from an item file that is missing in the `Assets` folder will result in an upload error.
- Filenames for items must be unique. Duplicate filenames result in an upload error. 
- Filenames must contain alphanumeric (English) characters or hyphens only and cannot exceed a length of 32 characters. Using other characters or exceeding this length result in an upload error.
- The total package size must not exceed 20 MB.
- Please refer to [the workload manifest](./backend-manifest.md) for manifest specific limitations.

### Local development mode (devmode)

The workload backend (BE) operates on the developer's machine. Workload API calls are transmitted via Azure Relay, with the workload's side of the Azure Relay channel managed by a specialized command-line utility, DevGateway. Workload control API calls are sent directly from the workload to Fabric, bypassing the Azure Relay channel. The DevGateway utility also oversees the registration of the local development instance of the workload with Fabric, within the context of a specific workspace. Upon termination of the DevGateway utility, the registration of the workload instance is automatically rescinded. For more information, see [Back-end implementation guide](extensibility-back-end.md).

#### DevMode BE schema

:::image type="content" source="./media/workload-environment/developer-mode-back-end-schema-diagram.png" alt-text="Diagram of the dev mode be schema architecture." lightbox="./media/workload-environment/developer-mode-back-end-schema-diagram.png":::

### Cloud development mode (cloud mode)

The workload backend (BE) operates within the partner's services. Workload API calls are made directly to the HTTPS endpoint, as specified in the workload manifest. In this scenario, the DevGateway utility isn't required. The registration of the workload with Fabric is accomplished by uploading the workload NuGet package to Fabric and subsequently activating the workload for the tenant. For more information, see [Manage a workload in Fabric](./manage-workload.md).

#### CloudMode BE schema

:::image type="content" source="./media/workload-environment/cloud-mode-back-end-schema-diagram.png" alt-text="Diagram of the cloud mode BE schema architecture." lightbox="./media/workload-environment/cloud-mode-back-end-schema-diagram.png":::

## Related content

* [Item lifecycle](./item-lifecycle.md)
* [Set up your environment](./environment-setup.md)
* [Manage a workload in Fabric](./manage-workload.md)
