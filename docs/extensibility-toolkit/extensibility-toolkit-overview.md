---
title: Microsoft Fabric Extensibility Toolkit
description: Learn about extending Fabric.
author: gsaurer
ms.author: billmath
ms.topic: overview
ms.custom:
ms.date: 12/15/2025
---

# Microsoft Fabric Extensibility Toolkit

The Extensibility Toolkit provides customers and partners with an easy way to extend Fabric to their needs. You can add more capabilities that feel, behave, and integrate like native Fabric components. The Extensibility Toolkit lets developers get started in minutes by using the [Starter-Kit](https://aka.ms/fabric-extensibility-starter-kit). Local and cloud development environments are supported, reducing the entry barrier. The AI-enabled repository also allows rapid development and helps the developer along its journey to extend Fabric.

## What is a workload?

A workload is a partner- or customer-built web application that integrates into the Fabric portal. The Fabric host loads your app according to its manifest, provides authentication tokens via Microsoft Entra ID, and exposes a host API to enable navigation, theming, notifications, and other platform interactions.

Key characteristics of workloads:

- **Hosted by you, rendered in Fabric via iFrame** - Your web application runs on your infrastructure but displays within Fabric
- **Manifest-driven** - Entry points, capabilities, and permissions are declared in a manifest file
- **Microsoft Entra authentication** - Scoped tokens provide secure access to resources
- **Fabric API integration** - Uses Fabric Public REST APIs for platform operations

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

**Organizations adopting Fabric:** The toolkit is perfect for any organization that wants to extend Fabric to adapt it to their specific internal needs. Whether you're looking to integrate existing systems, create custom data processing workflows, or build specialized analytics tools for your teams, the Extensibility Toolkit enables you to seamlessly embed your solutions into Fabric workspaces. Developers can easily create data apps and UI experiences that feel native to Fabric, supporting scenarios like custom pipelines, specialized data stores, visualization apps, and operational tools that work with your Fabric items.

**Solution builders for the Fabric ecosystem:** If you're building solutions that you want to provide to the entire Fabric community through the Workload Hub, the toolkit offers a complete path to market. You can develop innovative workloads that solve common industry challenges, extend Fabric's capabilities for specific use cases, or create entirely new experiences that other organizations can discover, trial, and purchase. This represents a significant business opportunity to reach millions of Fabric users worldwide while building a sustainable revenue stream through the Workload Hub marketplace.

## Items and native integration

Workloads can contribute one or more item types that appear in workspaces and participate in collaboration, sharing, search, lineage, and lifecycle operations. Data is stored in [OneLake](../onelake/onelake-overview.md) and metadata is managed via Fabric public APIs, ensuring items behave like any other Fabric artifact.

Examples of native participation:

- **Full CRUD operations** - Create, read, update, and delete items in Fabric portal and over API
- **Workspace integration** - Workspace ACLs and tenant governance automatically apply
- **Discoverability** - Items are discoverable via search and integrated in navigation
- **Data storage** - Leverage OneLake for data storage and management
- **CI/CD support** - Automatic participation in continuous integration and deployment workflows

## Workload examples

Here are a few examples to help you understand potential applications of Fabric workloads:

- Data application: Workloads that bring together Fabric and non-Fabric capabilities to build a complete application.
- Data store: Workloads that manage and store data. They can provide APIs to query and write data. Examples include [Lakehouse](../data-engineering/lakehouse-overview.md) and [Azure Cosmos DB](/azure/cosmos-db/introduction).
- Data visualization: Applications built on Fabric data items, such as [Power BI reports](/power-bi/consumer/end-user-reports) and [dashboards](/power-bi/create-reports/service-dashboards).
- Fabric customization: Scenarios like provisioning preconfigured workspaces or adding admin functionality.

The [Extensibility Samples](https://aka.ms/fabric-extensibility-toolkit-samples) provides several item types that you can use out of the box or adapt to your needs:

- Package Installer: Installs predefined packages (items, data, job schedules) into new or existing workspaces.
- OneLake Editor: Opens and visualizes OneLake data for Fabric items, including items created via the Extensibility Toolkit.

## When to use the Extensibility Toolkit

Use the Extensibility Toolkit when you want to bring a custom experience to Fabric while leveraging its identity, governance, storage, and APIs. Common scenarios include:

- **Domain-specific authoring experiences** - Build specialized tools for your industry or use case
- **Governance and compliance tooling** - Create custom governance workflows and compliance dashboards
- **System integrations** - Connect Fabric with your existing systems and workflows
- **Custom analytics and visualization** - Build specialized analytics tools that complement Power BI
- **Operational tools** - Create custom monitoring, management, and operational dashboards

## Key considerations for developing a Fabric workload

There are several important concepts to understand before beginning development:

- Native Fabric experience: Review the [Fabric UX system](https://aka.ms/fabricux); all published workloads must comply with these design principles.
- Integrate with the Fabric workspace: Your application must function in a [Fabric workspace](../fundamentals/workspaces.md), where users create instances and collaborate.
- Multitenant integration: Your workload is embedded in Fabric, but your code runs in your cloud. Fabric exposes APIs for user data and context so you can map between the customer's environment and your deployment.

## Trademarks

The Microsoft Fabric Workload Development Kit might contain trademarks or logos for projects, products, or services. Authorized use of Microsoft trademarks or logos is subject to and must follow [Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/legal/intellectualproperty/trademarks/usage/general).

Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

## Related content

- [Architecture](architecture.md) - Understand the technical architecture
- [Key concepts and features](key-concepts.md) - Learn about core concepts
- [Manifest overview](manifest-overview.md) - Understand workload manifests
- [Getting Started](get-started.md) - Start building your first workload
- [Publish a Fabric workload to Workload Hub](publishing-overview.md) - Learn about publishing
