---
title: Key concepts and Features
description: Learn about the key concepts and features of the Extensibility Toolkit
author: gsaurer
ms.author: billmath
ms.topic: concept-article
ms.custom:
ms.date: 12/15/2025
---

# Key concepts and features

The Extensibility toolkit introduces a suite of capabilities designed to bring your Data Application to fabric as simple as possible. These features enable developers to build rich, integrated experiences with minimal effort. With the Extensibility Toolkit, you can easily access Fabric APIs directly from the frontend, persist the item definition (state) within Fabric, use a standardized item creation flow, and take advantage of improved security and interoperability through iFrame relaxation and public API support. Additionally, it streamlines your development lifecycle with built-in CI/CD support, making it easier to automate deployment and testing. The following sections provide an overview of the main functionality and guidance on how to incorporate them into your workloads.

## Standard item creation experience

The item creation is standardized through a dedicated Fabric control that guides users through the process. This control allows users to select the workspace where the item is created, assign Sensitivity labels, and configure other relevant settings. By using this standardized experience, you no longer need to handle the complexities of item creation yourself or worry about future changes to the process. Additionally, this approach enables item creation to be surfaced directly within your workload page, providing a seamless and integrated user experience.

Use the [How to create an Item guide](./how-to-create-item.md) to understand how it can be implemented.

## Frontend API support

With the Extensibility Toolkit, you can obtain a Microsoft Entra On-Behalf-Of (OBO) token directly within your frontend application, enabling secure access to any Entra-protected API. This capability allows you to deeply integrate with Microsoft Fabric services—for example, you can read and store data in OneLake, create and interact with other Fabric items, or use Spark as a processing engine via the Livey APIs. For more information, see the [Microsoft Entra documentation](/entra/), [OneLake documentation](../onelake/onelake-overview.md), [Fabric REST APIs](/rest/api/fabric/), and [Spark in Fabric](../data-engineering/data-engineering-overview.md).

Use the [How to acquire Microsoft Entra Token guide](./how-to-acquire-entra-token.md) to understand how it can be implemented.
Also use the [How to access Fabric APIs guide](./how-to-access-fabric-apis.md) to understand how you can interact with Fabric.

## Storing item definition (state) in Fabric

This feature enables you to store your item's metadata—such as item configuration, and other relevant information—directly in OneLake within a hidden folder that isn't visible to end users. The data is stored using the same format applied by public APIs and CI/CD processes, ensuring consistency and interoperability across different integration points. Details about the format and its use with public APIs and CI/CD is discussed in the following sections.

Use the [How to store Item definition](./how-to-store-item-definition.md) to understand how it can be implemented.


### What to store in the definition

Think about the state as something that holds all the information needed to restore an item if it is deleted or copied elsewhere. This does not include the data itself, which is stored in OneLake (see [Storing Item Data in OneLake](#storing-item-data-in-onelake)).

Here are some practical examples:

- **Notebook item**: The state stores the notebook's code, cell order, and metadata such as which execution engine (e.g., Spark, SQL) should be used. The actual data processed by the notebook is not stored in the state.
- **File editor item**: The state does not store the file contents themselves, but instead stores the editor configuration—such as color scheme, auto-complete settings, font size, and other user preferences.
- **Installer or orchestrator item**: If your item installs or provisions other components (like databases or compute resources), the state should hold references (IDs, URIs) to the items it created. This allows your workload to check their state or manage them later.

By focusing on configuration, metadata, and references, you ensure your item's state is portable, lightweight, and easy to restore or migrate.



## Storing item data in OneLake

Every item comes with its own Onelake item folder where developers can store structured as well as unstructured data. Similar to a [Lakehouse](../data-engineering/tutorial-build-lakehouse.md) the item has a Table folder where data can be stored in Delta or Iceberg format and a Files folder where unstructured data can be stored.

Use the [How to store data in Item](./how-to-store-data-in-onelake.md) to understand how it can be implemented.

## Shortcut data

As every item has, its own [Onelake](../onelake/onelake-overview.md) folder they can also work with Shortcuts. Over the Public [Shortcut API](/rest/api/fabric/core/onelake-shortcuts) workload developers can create different Shortcut types from or into their item to participate in the single copy promise from OneLake.

Use the [How to create shortcuts](./how-to-create-shortcut.md) to understand how it can be implemented.

## CRUD item API support

Users can create, update, and delete items with content using the standard [Fabric Item Rest APIs](/rest/api/fabric/core/items). This automatic enablement makes it much easier to integrate with workload items in the same way as core Fabric items, streamlining interoperability and reducing the effort required to build robust integrations.

## CI/CD support

> [!NOTE]
> CI/CD support for the Extensibility Toolkit is currently under development. The features described below are planned capabilities and may change before release.

CI/CD support for all items is one of the highest asks from customers. With this feature all items, participate in CICD out of the box, without the need to implement any specific logic or operations. This means you can automate deployment, testing, and updates for your workloads using standard Azure Pipelines and tools. The item format and APIs are designed to be fully compatible with CI/CD processes, ensuring a consistent and reliable experience across environments. For more information on integrating with CI/CD, see the [Fabric CICD documentation](../cicd/cicd-overview.md).

## Item CRUD notification API

> [!NOTE]
> CRUD notification API support for the Extensibility Toolkit is currently under development. The features described below are planned capabilities and may change before release.

There are cases where your workload needs to participate in the Item CRUD events. As items are created on the platform directly via the [UX](#standard-item-creation-experience), [Public APIs](#crud-item-api-support) or [CI/CD](#cicd-support) workload owners aren't in control when a new item is created over those entrypoints. By default items store their [state](#storing-item-definition-state-in-fabric) in Fabric and don't need to get informed about the change of their item. Nevertheless there are some cases where workloads have a need to participate in the CRUD flow. This is mainly the case if Infrastructure for items needs to be provisioned or configured (for example, Databases). For these scenarios, we allow partners to implement a Crud notification API which Fabric calls on every event. In this scenario, Workload developer need to make sure that their API is reachable as otherwise Fabric operations fail.


## Fabric scheduler

> [!NOTE]
> Fabric scheduler support for the Extensibility Toolkit is currently under development. The features described below are planned capabilities and may change before release.

Fabric supports Job scheduling for workloads. This feature allows developers to build workloads that get notified even if the user isn't in front of the UX and act based on the Job that should be executed (for example, copy data in Onelake). Partners need to implement an API and configure their workload to participate in this functionality.


## iFrame relaxation

Developers can request more iFrame attributes to enable advanced scenarios such as file downloads or opening external websites. This feature allows your workload to prompt users for explicit consent before performing actions that require broader browser capabilities—such as initiating downloads or connecting users to external APIs using their current Fabric credentials. By specifying these requirements in your workload configuration, you ensure that users are informed and can grant the necessary permissions, enabling seamless integration with external systems while maintaining security and user trust.  

Use the [How to relax the iFrame](./how-to-relax-iframe.md) to understand how it can be implemented.

>[!NOTE]
>Enabling this feature requires users to grant more Microsoft Entra consent for the relaxation scope, beyond the standard Fabric scope required for basic workload functionality.

## Feature limitations

### Private link

All workloads are blocked for consumption and development if Private Link is enabled on tenant or workspace level.
