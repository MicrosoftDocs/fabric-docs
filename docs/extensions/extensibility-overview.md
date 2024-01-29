---
title: Fabric extensibility overview
description: Learn about building customized Fabric workloads. 
author: mberdugo
ms.author: monaberdugo
ms.reviewer: muliwienrib
ms.topic: conceptual
ms.custom:
ms.date: 12/27/2023
---

# Microsoft Fabric Software Developer Kit overview

This guide covers everything you need to know to create your own custom Fabric workload for your organization.

> [!NOTE]
> The Fabric Workload SDK repository is currently in private preview and is subject to change. Keep in mind that there may be issues or missing documentation. We are working hard to ensure that the repository is as stable and reliable as possible, and we appreciate your patience and understanding.

## Trademarks

This project might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

<!---
## Table of contents

- [Introduction](#introduction)
  - [What is Fabric](#what-is-fabric)
  - [What are Workloads](#what-are-workloads)
  - [What a Workload Offers](#what-a-workload-offers)
  - [Workloads Use Cases Examples](#workloads-use-cases-examples)
- [Build Your Own Workloads](#build-your-own-workloads)
  - [Introducing Workloads](#introducing-workloads)
  - [Fabric Workload Diagram](#fabric-workload-diagram)
- [Getting started with Frontend only](#getting-started-with-frontend-only)
  - [Prerequisites](#frontend-prerequisites)
  - [Frontend Guides](#frontend-guides)
  - [Getting Started with Workload Backend](#getting-started-with-the-workload-backend)
  - [Prerequisites](#backend-prerequisites)
  - [Backend Guide](#workload-be-guide)
  - [Resources](#resources)
- [Publication Process (TBD)](#publication)
--->

## Introduction

### What is Fabric

Microsoft Fabric is a comprehensive analytics solution designed for enterprise-level applications. This platform encompasses a wide range of services, including data engineering, real-time analytics, and business intelligence, all consolidated within a single, unified framework.
The key advantage of Microsoft Fabric is its integrated approach. This approach eliminates the need for disparate services from multiple vendors. Users can use this platform to streamline their analytics processes, with all services accessible from a single source of truth.
Built on a Software as a Service (SaaS), Microsoft Fabric provides integration and simplicity, as well as a transparent and flexible cost management experience. This cost management experience allows users to control expenses effectively by ensuring they only pay for the resources they require.
The Fabric platform isn't just a tool, but a strategic asset that simplifies and enhances the analytics capabilities of any enterprise.
For more information about Fabric, see the [Microsoft Fabric overview](../get-started/microsoft-fabric-overview.md).

### What Are Workloads

Microsoft Fabric allows the creation of workloads, integrating your application within the Fabric framework. Workloads enhance the usability of your service within a familiar workspace, eliminating the need to leave the Fabric environment. Fabric workloads increase user engagement and improve your application’s discoverability in the Fabric store, supporting compelling business models. The Fabric workspace includes various components, known as Fabric items, which handle the storage, analysis, and presentation of your data.

### What A Workload Offers

#### Workload Extensibility Framework

This is a robust mechanism designed to enhance the existing Fabric experience by integrating custom capabilities. The entire Fabric platform is engineered with interoperability in mind, seamlessly incorporating workload capabilities. For instance, the item editor facilitates the creation of a native, consistent user experience by embedding the customer's workload within the context of a Fabric workspace item.

#### Universal Compute Capacity

Fabric comes equipped with a diverse array of compute engines, enabling customers to purchase and utilize Fabric services. To access premium features as well as any Fabric workloads, universal capacity must be allocated to a Fabric workspace (refer to [How to purchase Power BI Premium - Power BI | Microsoft Learn](/power-bi/enterprise/service-admin-premium-purchase)).

#### Authentication

Fabric workloads integrate with [Microsoft Entra ID](/entra/fundamentals/whatis) for authentication and authorization. All interactions between workloads and other Fabric or Azure components necessitate proper authentication support for incoming and outgoing requests, ensuring correct generation and validation of tokens.

#### Fabric Permission Model

This represents user permissions pertaining to the workspace and specific items. It's utilized to inherit user permissions and applied as part of provisioning resources (see [Roles in workspaces in Power BI](/power-bi/collaborate-share/service-roles-new-workspaces)).

#### Monitoring Hub & Scheduler

The monitoring hub provides a comprehensive view of all background jobs to Fabric users, enhancing transparency and control.

### Workloads Use Cases Examples

In this section, we provide a few examples of use cases to help you understand their potential applications. However, it’s important to note that these examples are just a few of the many unique use cases that can be tailored to meet the specific needs of your organization. The versatility of workloads allows for a wide range of possibilities, enabling you to create solutions that are perfectly suited to your operational requirements. We encourage you to explore and experiment with different configurations to discover the full potential of what workloads can do for your organization.

#### Data Job

Data jobs are one of the most common scenarios. They involve extracting data from OneLake, performing various data operations, and then writing the results back to OneLake. These jobs can be integrated with Fabric’s data scheduling capabilities and executed as background tasks. An example of this would be Data Pipelines Notebooks.

#### Data Store

These are workloads that manage and store data. They can provide APIs to query and write data, serving as a robust and flexible data management solution. Examples include Microsoft Fabric Lakehouse and Cosmos DB.

#### Visual

These are data visualization applications that are entirely based on existing Fabric data items. They allow for the creation of dynamic and interactive visual representations of your data. Power BI reports or dashboards serve as excellent examples of this type of workload.

## Build Your Own Workloads

This chapter covers the basic concepts and components of Fabric, and a dive into the step-by-step process of creating a workload. We cover everything from setting up your environment, to configuring your workload, to deploying and managing it. In the following sections, we introduce the key components of our system and provide an overview of the architecture. These components work together to create a robust and flexible platform for your development needs.

> [!NOTE]
> Before proceeding with the guide, ensure that you have these tools installed and properly configured. If you don’t have these tools installed, you can find installation instructions on their respective official websites.

### Fabric Workload Diagram

The following diagram is a high-level overview of how workloads function within the Fabric architecture. It depicts the interaction and flow between various components.

* The workload Backend (BE) handles data processing, storage, and management. It validates Entra ID tokens before processing them and interacts with external Azure services, such as Lakehouse.
* The workload Frontend (FE) offers a user interface for job creation, authoring, management, and execution.
* User interactions via the FE initiates request to the BE, either directly or indirectly via the Fabric Backend (Fabric BE).

For more detailed diagrams depicting the communication and authentication of the various components, see the [BE Authentication and Security](#authentication-and-security) and the [Authentication Overview](./authentication-overview.md) diagrams.

:::image type="content" source="./media/extensibility-overview/architecture-flow-overview.png" alt-text="Diagram of ISV end to end architecture flow.":::

#### Frontend (FE)

The frontend serves as the base of the user experience (UX) and behavior. operating within an iframe in the Fabric portal. And provides the Fabric partner with a specific user interface experience, including an item editor. The extension client SDK equips the necessary interfaces, APIs, and bootstrap functions to transform a regular web app into a Micro Frontend web app that operates seamlessly within the Fabric portal.

#### Backend (BE)

The backend is the powerhouse for data processing and metadata storage. It employs CRUD operations to create and manage workload items along with metadata, and executes jobs to populate data in storage. The communication bridge between the frontend and backend is established through public APIs.

This overview provides a snapshot of our architectural system. For a more detailed understanding of the project configuration, guidelines, and getting started, refer to the additional content referenced in their respective areas.

#### Lakehouse Integration

Our architecture is designed to integrate flawlessly with Lakehouse, enabling operations such as saving, reading, and fetching data. This interaction is facilitated through Azure Relay and the Fabric SDK, ensuring secure and authenticated communication.

#### Authentication and Security

We employ Entra ID (formerly Azure AD) for robust and secure authentication, ensuring that all interactions within the architecture are authorized and secure. For a complete introduction to the workload authentication as displayed in the diagram above, refer to the following authentication documents:

1. [Workload Authentication - Setup Guide](./authentication-setup.md)
1. [Workload Authentication - Architecture Overview](./authentication-overview.md)
1. [Workload Authentication - Implementation Guide](./backend-authentication.md)

## Getting started with Frontend only

### Frontend prerequisites

There are a few prerequisites that you need to install on your system. These tools are used throughout the guide, so it’s important to ensure that you have them set up correctly.

* [Git](https://github.com/join) - A distributed version control system that we use to manage and track changes to our project.

* [NPM (Node Package Manager)](https://www.npmjs.com/) - This is the default package manager for Node.js. Use it to manage and share the packages that you use in your project.

* [Node.js](https://nodejs.org/en/download/) - An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser. We’ll use this to run our server-side JavaScript code.

* [Webpack](https://webpack.js.org/) - A static module bundler for modern JavaScript applications. It helps to bundle JavaScript files for usage in a browser.

* [Webpack CLI](https://webpack.js.org/api/cli/) - The command line interface for Webpack. This allows us to use Webpack from the command line.
This guide outlines the setup for development workload sample in Fabric tenant. It involves enabling the workload feature and Developer mode in the designated tenant. It assumes you have Node.js and npm installed, and walks you through the entire process of running a locally hosted workload frontend.

When executing the workload SDK sample and building a workload, industry best practice is to use a dedicated development tenant. This practice ensures an isolated environment, minimizing the risk of inadvertent disruptions or modifications to production systems. It also provides an extra layer of security, safeguarding production data from potential exposure or compromise. 

### Frontend Guides

* [FE Quick Setup guide](./extensibility-frontend.md#installation-and-usage): A fast and straightforward way to add and test the sample Frontend (FE) workload to your Fabric capacity. It’s perfect for those who want to quickly see the workload in action.

* [FE Deep Dive guide](./extensibility-frontend.md#package-structure): A comprehensive guide walks you through the process of customizing the sample workload. It’s ideal if you want to tailor the workload to your specific needs.
The UX workload frontend, a standard web app, uses an extension client SDK to operate within the Fabric portal, providing workload-Specific UI experiences. This SDK can be installed in Angular or React applications, with React recommended for compatibility with the Fluent UI library. The package also includes a UX workload Sample implementation built on Fluent UI, designed for React. Alongside the web app, workloads must provide a UX workload Frontend Manifest, a JSON resource containing essential information about the workload. This combination allows workloads to integrate their web applications within the Fabric portal, ensuring a consistent user experience.

> [!NOTE]
>
> * Both the FE Quick Setup and the FE Deep Dive guides can be found in the [FE Readme](./extensibility-frontend.md).
> * Before customizing the sample workload, implement the Frontend (FE) authentication token as outlined in the [Authentication Guide](Authentication/Setup.md#configuring-your-workload-local-manifest-and-acquiring-a-token-for-your-application-frontend).

## Getting Started with the Workload Backend

This section walks you through how to set up and configure the workload BE. Fabric developer sample project is built on the .NET 7 framework and utilizes various tools and packages to deliver a high-performance backend solution.

### Backend prerequisites

Before proceeding with the project setup, ensure the following tools and packages are installed and configured:

* [.NET 7.0 SDK](https://dotnet.microsoft.com/download/visual-studio-sdks)
* [Visual Studio 2022](https://visualstudio.microsoft.com/vs/) - Note that .NET 6.0 or higher in Visual Studio 2019 isn't supported.
* [NuGet Package Manager](https://www.nuget.org/)
* The workload BE has dependencies on the following Azure SDK packages:

  * Azure.Core
  * Azure.Identity
  * Azure.Storage.Files.DataLake
  * Microsoft Identity package

#### Workload BE Guide

With the prerequisites in place, you can proceed with the project configuration. The rest of your guide can follow from here. This includes cloning the project, setting up the workload configuration, and generating a manifest package file. Remember to update the necessary fields in the configuration files to match your setup. To get started with a step-by-step guide, refer to our [Backend Workload Configuration Guide](./backend-authentication.md).

## Resources

Here are all the resources included and referenced. These documents provide additional information and can serve as a reference:

* [Authentication Overview](./authentication-overview.md)
* [Authentication Setup Guide](./authentication-setup.md)
* [Authentication JavaScript API](./authentication-api.md)
* [Backend Configuration Guide](./extensibility-backend.md))
* [Frontend Configuration Guide](./extensibility-frontend.md)
* [Frontend Manifest](./frontend-manifest.md)
* [Backend API Requests Authentication Overview](./backend-authentication.md)
* [Monitoring Hub Configuration Guide](./monitoring-hub.md)

## Publication

The publication process is currently unavailable. We understand the importance of this and are working diligently to make it accessible. We appreciate your patience and assure you that it will be added shortly. Stay tuned for updates.

## Considerations and Limitations

See [Release Notes](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/ReleaseNotes.md)

## Related content

* [Fabric extensibility frontend](extensibility-frontend.md)
* [Fabric extensibility backend](extensibility-backend.md)
