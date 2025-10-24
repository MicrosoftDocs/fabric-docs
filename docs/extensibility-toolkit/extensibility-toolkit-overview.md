---
title: Microsoft Fabric Extensibility Toolkit
description: Learn about extending Fabric.
author: gsaurer
ms.author: billmath
ms.topic: conceptual
ms.custom:
ms.date: 09/04/2025
---

# Microsoft Fabric Extensibility Toolkit

The Extensibility Toolkit provides customers and partners with an easy way to extend Fabric to their needs. You can add more capabilities that feel, behave, and integrate like native Fabric components. The Extensibility Toolkit lets developers get started in minutes by using the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit). Local and cloud development environments are supported, reducing the entry barrier. The AI-enabled repository also allows rapid development and helps the developer along its journey to extend Fabric.

> [!NOTE]
> The Extensibility Toolkit is the modern evolution of the [Workload Development Kit](../workload-development-kit/development-kit-overview.md) designed to make extending Microsoft Fabric with custom functionality easier and faster than ever. It offers a streamlined development environment allowing developers to focus on innovation rather than infrastructure. This evolution reflects Microsoft’s commitment to empowering developers with intuitive, scalable, and intelligent tools that accelerate productivity and unlock new possibilities within Fabric.

## What the Extensibility Toolkit provides

- An easy way to extend Fabric with your own functionality
- A development environment that enables easy and fast development
- An SDK that abstracts the complexity from the developer
- A Starter-Kit that contains everything you need to get started within minutes
- AI-enabled development that helps you build your ideas
- Publish workloads to your Fabric tenant for everyone to use
- Publish workloads to all Fabric users

## Who should use it

The toolkit is for any organization that wants to extend Fabric to adapt it to their needs. Developers can easily embed data apps and UI experiences into Fabric workspaces. Typical scenarios include: pipelines, custom data stores, visualization apps, and operational apps that act on Fabric items.

## Publish to the Workload Hub

After developing a Fabric workload, customers and partners can publish it to their tenant and make it available in the Workload Hub to the whole organization. Workloads can also be published to all Fabric users according to the [publishing requirements](../workload-development-kit/publish-workload-requirements.md). This allows users to discover and add the workload to their tenant, start a trial experience, and then buy your workload. See [Publish a workload](./publish-workload-flow.md) for details.

## Workload examples

Here are a few examples to help you understand potential applications of Fabric workloads:

- Data application: Workloads that bring together Fabric and non-Fabric capabilities to build a complete application.
- Data store: Workloads that manage and store data. They can provide APIs to query and write data. Examples include [Lakehouse](../data-engineering/lakehouse-overview.md) and [Azure Cosmos DB](/azure/cosmos-db/introduction).
- Data visualization: Applications built on Fabric data items, such as [Power BI reports](/power-bi/consumer/end-user-reports) and [dashboards](/power-bi/create-reports/service-dashboards).
- Fabric customization: Scenarios like provisioning preconfigured workspaces or adding admin functionality.

The [Extensibility Samples](https://aka.ms/fabric-extensibility-toolkit-samples) provides several item types that you can use out of the box or adapt to your needs:

- Package Installer: Installs predefined packages (items, data, job schedules) into new or existing workspaces.
- OneLake Editor: Opens and visualizes OneLake data for Fabric items, including items created via the Extensibility Toolkit.

## Key considerations for developing a Fabric workload

There are several important concepts to understand before beginning development:

- Native Fabric experience: Review the [Fabric UX system](https://aka.ms/fabricux); all published workloads must comply with these design principles.
- Integrate with the Fabric workspace: Your application must function in a [Fabric workspace](../fundamentals/workspaces.md), where users create instances and collaborate.
- Multitenant integration: Your workload is embedded in Fabric, but your code runs in your cloud. Fabric exposes APIs for user data and context so you can map between the customer’s environment and your deployment. 

## Trademarks

The Microsoft Fabric Workload Development Kit might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Related content

- [Publish a Fabric workload to Workload Hub](publish-workload-flow.md)
- [Quick start: Add a workload in minutes](quickstart.md)
