---
title: Overview of managed virtual networks in Microsoft Fabric
description: Learn about managed virtual networks in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 02/27/2024
---

# What are managed virtual networks?

Managed virtual networks are virtual networks that are created and managed by Microsoft Fabric for each Fabric workspace. Managed virtual networks provide network isolation for Fabric Spark workloads, meaning that the compute clusters are deployed in a dedicated network and are no longer part of the shared virtual network.

Managed virtual networks also enable network security features such as managed private endpoints, and private link support for Data Engineering and Data Science items in Microsoft Fabric that use Apache Spark.

The following image illustrates ......

![A picture containing text, screenshot, diagram, design](./media/security-managed-vnets-fabric-overview/image1.gif)

Fabric workspaces that are provisioned with a dedicated virtual network provide you value in four ways:

* With a managed virtual network you get complete network isolation for the Spark clusters running your Spark jobs (which allow users to run arbitrary user code) while offloading the burden of managing the virtual network to Microsoft Fabric.

* You don't need to create a subnet for the Spark clusters based on peak load, as this is managed for you by Microsoft Fabric.

* A managed virtual network for your workspace, along with managed private endpoints, allows you to access data sources that are behind firewalls or otherwise blocked from public access.

## How to enable managed virtual networks for a Fabric workspace

Managed virtual networks are provisioned for a Fabric workspace when

* Managed private endpoints are added to a workspace. Workspace admins can create and delete managed private endpoint connections from the workspace settings of a Fabric Workspace.

    :::image type="content" source="./media/security-managed-vnets-fabric-overview/creating-private-endpoint-animation.gif" alt-text="Animated illustration of the process of creating a private endpoint in Microsoft Fabric.":::

    For more information, see [About managed private endpoints in Fabric](./security-managed-private-endpoints-overview.md)

* Enabling Private Link and running a Spark job in a Fabric Workspace. Tenant admins can enable the Private Link setting in the Admin portal of their Microsoft Fabric tenant.

    Once you have enabled the Private Link setting, running the first Spark job (Notebook or Spark job definition) or performing a Lakehouse operation (for example, Load to Table, or a table maintenance operation such as Optimize or Vacuum) will result in the creation of a managed virtual network for the workspace.

    Learn more about [configuring Private Links for Microsoft Fabric](./security-private-links-overview.md)

    > [!NOTE]
    > The managed virtual network is provisioned automatically as part of the job submission step for the first Spark Job in the workspace. Once the managed virtual network has been provisioned, the starter pools (default Compute option) for Spark are disabled, as these are pre-warmed clusters hosted in a shared virtual network. Spark jobs will run on custom pools created on-demand at the time of job submission within the dedicated managed virtual network of the workspace.

## Related content

* [About managed private endpoints](./security-managed-private-endpoints-overview.md)
* [How to create managed private endpoints](./security-managed-private-endpoints-create.md)
* [About private links](./security-private-links-overview.md)