---
title: Microsoft Fabric workload environment
description: Learn about the Microsoft Fabric workload environment and how it's configured on your local machine and on the cloud.
author: KesemSharabi
ms.author: kesharab
ms.reviewer: muliwienrib
ms.topic: concept
ms.custom:
ms.date: 05/21/2024
---

# Introducing workloads

This chapter introduces the key components of our system and provides an overview of the architecture. These components work together to create a robust and flexible platform for your development needs. Let’s delve into these components and their roles within our architecture.

## Fabric Workload Architecture

Some of the key aspects of the Fabric workload architecture are:

* It handles data processing, storage, and management. It validates Microsoft Entra ID tokens before processing them and interacts with external Azure services, such as Lakehouse.

* The workload Frontend (FE) offers a user interface for job creation, authoring, management, and execution.

* User interactions via the FE initiate requests to the BE, either directly or indirectly via the Fabric Backend (Fabric BE).

For more detailed diagrams depicting the communication and authentication of the various components, see the [Backend authentication and authorization overview](./backend-authentication.md) and the [Authentication overview](./authentication-concept.md) diagrams.

### Frontend (FE)

The frontend serves as the base of the user experience (UX) and behavior, operating within an iframe in the Fabric portal. It provides the Fabric partner with a specific user interface experience, including an item editor. The extension client SDK equips the necessary interfaces, APIs, and bootstrap functions to transform a regular web app into a Micro Frontend web app that operates seamlessly within the Fabric portal.

### Backend (BE)

The backend is the powerhouse for data processing and metadata storage. It employs CRUD operations to create and manage workload items along with metadata, and executes jobs to populate data in storage. The communication bridge between the frontend and backend is established through public APIs.

The workloads can run in two environments: local and cloud. In local (devmode), the workload runs on the developer's machine, with API calls managed by the DevGateway utility. This utility also handles workload registration with Fabric. In cloud mode, the workload runs on the partner services, with API calls made directly to an HTTPS endpoint.

## Development environment

During the development cycle, testing a workload on a nonproduction tenant can be done in two modes, local (devmode) and cloud mode (tenant mode). For more information, see the relevant document.

> [!NOTE]
> For each dev mode, a different package is created when building the BE solution in Visual Studio.

- **Dev mode workload package**: When building the BE solution in Visual Studio, use the Debug parameter to create a BE NuGet package, which can be loaded in to the Fabric tenant using the DevGateWay application.

:::image type="content" source="./media/workload-environment/dev-mode-diagram.png" alt-text="Diagram of the dev mode architecture." lightbox="./media/workload-environment/dev-mode-diagram.png":::

- **Cloud mode workload package**: When building the BE solution in Visual Studio, use the Release parameter to create a standalone workload package (BE and FE). This package can be uploaded to tenant directly.

:::image type="content" source="./media/workload-environment/cloud-mode-diagram.png" alt-text="Diagram of the cloud mode architecture." lightbox="./media/workload-environment/cloud-mode-diagram.png":::

### Local development mode (devmode)

The workload backend (BE) operates on the developer's machine. Workload API calls are transmitted via Azure Relay, with the workload's side of the Azure Relay channel managed by a specialized command-line utility, DevGateway. Workload control API calls are sent directly from the workload to Fabric, bypassing the Azure Relay channel. The DevGateway utility also oversees the registration of the local development instance of the workload with Fabric, within the context of a specific capacity. This ensures the workload's availability across all workspaces assigned to that capacity. Upon termination of the DevGateway utility, the registration of the workload instance is automatically rescinded. For more information, see [Fabric extensibility backend boilerplate](./extensibility-backend.md).

#### DevMode BE schema

:::image type="content" source="./media/workload-environment/dev-mode-be-schema-diagram.png" alt-text="Diagram of the dev mode be schema architecture." lightbox="./media/workload-environment/dev-mode-be-schema-diagram.png":::

### Cloud development mode (cloud mode)

The workload backend (BE) operates within the partner's services. Workload API calls are made directly to the HTTPS endpoint, as specified in the workload manifest. In this scenario, the DevGateway utility isn't required. The registration of the workload with Fabric is accomplished by uploading the workload NuGet package to Fabric and subsequently activating the workload for the tenant. For more information, see [Manage a workload in Fabric](./manage-workload.md)

#### CloudMode BE schema

:::image type="content" source="./media/workload-environment/cloud-mode-be-schema-diagram.png" alt-text="Diagram of the cloud mode BE schema architecture." lightbox="./media/workload-environment/cloud-mode-be-schema-diagram.png":::

### Lakehouse Integration

Our architecture is designed to integrate flawlessly with Lakehouse, enabling operations such as saving, reading, and fetching data. This interaction is facilitated through Azure Relay and the Fabric SDK, ensuring secure and authenticated communication.

### Authentication and Security

We use Microsoft Entra ID (formerly Azure Active Directory) for robust and secure authentication, ensuring that all interactions within the architecture are authorized and secure. For a complete introduction to the workload authentication as displayed in the diagram above, refer to the authentication documents:

* [Workload authentication - Setup guide](./authentication-tutorial.md)

* [Workload authentication - Architecture overview ](./authentication-concept.md)

* [Workload authentication - Implementation guide](./backend-authentication.md)

## Related content

* [Item lifecycle](./item-lifecycle.md)