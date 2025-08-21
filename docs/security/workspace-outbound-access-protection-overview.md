---
title: Workspace outbound access protection overview
description: "This article describes workspace outbound access protection in Microsoft Fabric."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview
ms.date: 08/20/2025

#customer intent: As a Fabric administrator, I want to control and secure outbound connections from workspace artifacts so that I can protect organizational data and ensure compliance with security policies.

---

# Workspace outbound access protection (preview)

Workspace outbound access protection in Microsoft Fabric allows admins to control and restrict outbound connections from workspace artifacts to external resources. Security can be viewed from two perspectives:

* Inbound security: Ensuring that data inside a boundary is protected from external threats.
* Outbound security: Ensuring that data is shared securely outside a boundary.

For inbound security, Fabric supports private links at the [tenant level](security-private-links-overview.md) and the [workspace level](security-workspace-level-private-links-overview.md), which play a crucial role by providing secure connections directly between your virtual network and Fabric.

For outbound security, Fabric supports workspace outbound access protection. This network security feature ensures that connections outside the workspace go through a secure connection between Fabric and a virtual network. It prevents items from establishing unsecure connections to sources outside the workspace boundary unless allowed by the workspace admins. This granular control makes it possible to restrict outbound connectivity for some workspaces while allowing the rest of the workspaces to remain open. This article provides an overview of workspace outbound access protection. 

## Key benefits of workspace outbound access protection

The following diagram illustrates workspace-level outbound access protection from the perspective of the end customer.

:::image type="content" source="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" lightbox="media/workspace-outbound-access-protection-overview/workspace-outbound-access-protection-diagram.png" alt-text="Diagram of workspace outbound access protection." border="false":::

Workspace level outbound access protection makes it possible to control what the items in the workspace can access outside the workspace boundary. Customers can set up private endpoints to connect the workspace items to different resources from a specific virtual network.

* The outbound enabled workspace can connect to all the resources that support private endpoints by setting up a managed private endpoint from the workspace to the destination. For example, in the preceding diagram, Workspace A (OAP enabled) can connect to the SQL server because it has a managed private endpoint set up to the SQL server.

* The WS OAP enabled workspace can also connect to another workspace within the same tenant if a managed private endpoint is established from the source to the target workspace. For example, in the diagram, Workspace B has a managed private endpoint configured to workspace C. This managed private endpoint allows items in Workspace B (for example shortcuts) to reference the data in Workspace C (for example, in a lakehouse).

* Multiple workspaces can connect to the same source by setting up managed private endpoints. For example, in the diagram, both Workspace A and Workspace B can connect to the SQL server because managed private endpoints are set up for each of them for this SQL server.

## Supported item types

Workspace outbound access protection works with the following item types.

* OneLake shortcuts
* Lakehouses
* Notebooks
* Spark Job Definitions
* Environments

For information about workspace outbound access protection scenarios across the various supported item types, see [Workspace outbound access - scenarios](./workspace-outbound-access-protection-scenarios.md).

## Considerations and limitations


The following limitations apply when using workspace outbound access protection:

* Workspace outbound access protection isn't supported for semantic models and SQL Endpoints. However, there are special considerations for lakehouses:
   * We recommend enabling outbound access protection on the workspace before creating a lakehouse to ensure compatibility.
   * Enabling outbound access protection on an existing workspace that already contains a lakehouse (and its associated semantic model and SQL Endpoint) will fail.
* Outbound access protection is only available in regions where Fabric Data Engineering workloads are supported. For more information, see [Overview of managed private endpoints for Microsoft Fabric](security-managed-private-endpoints-overview.md#limitations-and-considerations).
* Outbound access protection only supports workspaces hosted on Fabric SKUs. Other capacity types and F SKU trials aren't supported.
* If a workspace contains unsupported artifacts, workspace admins can't enable outbound access protection until those artifacts are removed.
* If outbound access protection is enabled on a workspace, workspace admins can't add unsupported artifacts. Outbound access protection must be disabled first, and then workspace admins can add unsupported artifacts.
* If the workspace is part of GIT integration, workspace admins can't enable outbound access protection because GIT integration is unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to GIT integration.
* If the workspace is part of Deployment Pipelines, workspace admins can't enable outbound access protection because Deployment Pipelines are unsupported. Similarly, if outbound access protection is enabled, the workspace can't be added to Deployment Pipelines.
* If your workspace has outbound access protection enabled, it uses managed virtual networks (VNETs) for Spark. This means that Starter pools are disabled, and you should expect Spark sessions to take 3 to 5 minutes to start.
* With outbound access protection, all public access from Spark is blocked. This prevents users from downloading libraries directly from public channels like PyPI using pip.
To install libraries for their Data Engineering jobs, users have two options:
Reference library packages from a data source connected to the Fabric workspace via a managed private endpoint.
Upload wheel files for their required libraries and dependencies (that aren’t already included in the prebaked runtime).
* Enabling outbound access protection blocks all public access from your workspace. Therefore, to query a Lakehouse from another workspace, you must create a cross-workspace managed private endpoint to allow the Spark jobs to establish a connection.
* Using fully qualified paths with workspace and Lakehouse names can cause a socket timeout exception. To access files, use relative paths for the current Lakehouse or use a fully qualified path with the Workspace and Lakehouse GUIDs.
* You could run into Spark issues in the following regions when outbound access protection is enabled for the workspace: Mexico Central, Israel Central, and Spain Central.
* Use the correct file path formats when referencing files in a lakehouse.
   * For files within the current lakehouse, use *relative paths*, for example:

      `Files/people.csv`

   * When accessing files across workspaces or when absolute paths are required, use *fully qualified paths* with GUIDs, including your workspace ID and lakehouse ID, for example:

      `Path: abfss://<YourWorkspaceID>@onelake.dfs.fabric.microsoft.com/<YourLakehouseID>/Files/people.csv`

   * Avoid using workspace or lakehouse display names in fully qualified paths, as Spark sessions can't resolve them and may result in socket timeout errors. Example of an **incorrect** file path:

      `Path: abfss://<YourWorkspace>@onelake.dfs.fabric.microsoft.com/<YourLakehouse>.Lakehouse/Files/people.csv`

* Outbound access protection isn't supported for schema enabled lakehouses.
* Ensure you re-register the `Microsoft.Network` feature on your subscription in the Azure portal.
* Outbound access protection doesn't protect from data exfiltration via inbound requests, such as GET requests made as part of external AzCopy operations to move data out of a workspace.  To protect your data from unauthorized inbound requests, see [Protect inbound traffic](protect-inbound-traffic.md).


## Related content

- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
- [Workspace outbound access protection - scenarios](./workspace-outbound-access-protection-scenarios.md)
