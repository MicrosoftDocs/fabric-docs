---
title: Authenticate with Microsoft Fabric workspace identity
description: This article describes how to authenticate using workspace identity. 
author: msmimart
ms.author: mimart
ms.service: fabric
ms.subervice: security
ms.topic: how-to #Don't change
ms.date: 08/04/2025

#customer intent: As a data engineer, I want to authenticate using workspace identity so that my Fabric items can connect with data sources securely.

---

# Authenticate with workspace identity

A Fabric workspace identity is an automatically managed service principal that can be associated with a Fabric workspace. You can use the workspace identity as an authentication method when connecting Fabric items in the workspace to resources that support Microsoft Entra authentication. Workspace identity is a secure authentication method as there's no need to manage keys, secrets, and certificates. When you grant the workspace identity with permissions on target resources such as ADLS gen 2, Fabric can use the identity to obtain Microsoft Entra tokens to access the resource.

Trusted access to Storage accounts and authentication with workspace identity can be combined together. You can use workspace identity as the authentication method to access storage accounts that have public access restricted to selected virtual networks and IP addresses.

This article describes how to use the workspace identity to authenticate when connecting OneLake shortcuts, pipelines, semantic models, and Dataflows Gen2 (CI/CD) to data sources. The target audience is data engineers and anyone interested in establishing a secure connection between Fabric items and data sources.

## Supported data sources
For the most up-to-date information about Fabric connectors with support for workspace identity authentication, refer to [Fabric Connector Overview](../data-factory/connector-overview.md)
You can also create a new connection in *Manage Connections and Gateways* and review the supported connection types.

## Authenticate with workspace identity
The example below shows you the steps to enable Workspace identity authentication with Azure Data Lake Storage Gen2. The steps for other data sources such as SQL Server, Azure Blobs, Azure Analysis Services will be similar.

### Step 1: Create the workspace identity

You must be a workspace admin to be able to create and manage a workspace identity.

1. Navigate to the workspace and open the workspace settings.

1. Select the **Workspace identity** tab.

1. Select the **+ Workspace identity** button.

When the workspace identity has been created, the tab displays the workspace identity details and the list of authorized users.

Workspace identity can be [created and deleted by workspace admins](./workspace-identity.md). Admins, members, and contributors in the workspace can configure the identity as the authentication method in connections that are used in OneLake shortcuts, pipelines, semantic models, and Dataflows Gen2.

For more detail, see [Create and manage a workspace identity](./workspace-identity.md#create-and-manage-a-workspace-identity).

### Step 2: Grant the identity permissions on the storage account

1. Sign in to the Azure portal and navigate to the storage account you want to access from OneLake.

1. Select the Access control (IAM) tab on the left sidebar and select **Role assignments**.

1. Select the **Add** button and select **Add role assignment**.

1. Select the role you want to assign to the identity, such as *Storage Blob Data Reader* or *Storage Blob Data Contributor*.

    > [!NOTE]
    > The role must be provided at the Storage account level.

1. Select **Assign access to User, group, or service principal**.

1. Select **+ Select members**, and search by name or app ID of the workspace identity. Select the identity associated with your workspace.

1. Select **Review + assign** and wait for the role assignment to be completed.

### Step 3: Create the Fabric item

#### OneLake shortcut

Follow the steps listed in [Create an Azure Data Lake Storage Gen2 shortcut](../onelake/create-adls-shortcut.md#create-a-shortcut). Select workspace identity as the authentication method (supported only for ADLS Gen2 shortcuts).

:::image type="content" source="./media/workspace-identity-authenticate/workspace-identity-authentication-option.png" alt-text="Screenshot showing Workspace identity as an authentication option.":::

#### Pipelines with Copy, Lookup, and GetMetadata activities

To create the pipeline, follow the steps listed in [Module 1 - Create a pipeline with Data Factory](../data-factory/tutorial-end-to-end-pipeline.md). Select workspace identity as the authentication method (supported for Copy, Lookup, and GetMetadata activities).

> [!NOTE]
> The user creating the shortcut with workspace identity must have an admin, member, or contributor role in the workspace. Users accessing the shortcuts only need permissions on the lakehouse.

#### Reports and semantic models

You can use a semantic model (import mode) with workspace identity authentication and create models and reports.

1. Create the semantic model in Power BI Desktop that connects to the ADLS Gen2 storage account using the steps listed in [Analyze data in Azure Data Lake Storage Gen2 by using Power BI](/power-query/connectors/analyze-data-in-adls-gen2). You can use organizational account to connect to Azure Data Lake Storage Gen2 in Desktop.

1. Import the model to the workspace configured with the workspace identity.

1. Navigate to the model settings and expand the Gateway and cloud connections section.

1. Under cloud connections, select a data connection that is configured with the workspace identity authentication method and the desired ADLS Gen2 storage account. You can either create this connection in the *Manage connections and gateways* experience, or use a preexisting connection created through the shortcut or pipeline creation experiences.

1. Select **Apply** and then refresh the model to finalize the configuration.

> [!NOTE]
> If refresh fails, check the permissions that the workspace identity has on the storage account and validate the networking settings of the storage account.

#### Dataflows Gen2 
Data Factory in Microsoft Fabric uses Power Query connectors to connect Dataflow Gen2 to Azure Data Lake Storage Gen2. To connect to Azure Data Lake Storage Gen2 in Dataflow Gen2: 
1. Create the Dataflow Gen2 in Fabric
2. Follow the steps listed in [Connect to ADLS Gen2 from Power Query Online](/power-query/connectors/data-lake-storage#connect-to-azure-data-lake-storage-gen2-from-power-query-online)
3. Select Workspace Identity as the authentication method
   
> [!NOTE]
> Workspace identity is only supported for Dataflows Gen2 with deployment pipelines and Public API.


## Considerations and limitations

* Workspace identity can be created in workspaces associated with any capacity (except for My workspaces).
  
* Workspace identity can be used for authentication in any capacity that supports OneLake shortcuts, pipelines, semantic models, or Dataflows Gen2.

* Trusted workspace access to firewall-enabled Storage accounts is supported in any F capacity.

* You can create connections with workspace-identity-based authentication in the *Manage Gateways and Connections* experience for a cloud connection.

* Workspace-Identity-based authentication is currently not supported for gateway connections. 

* If you reuse connections configured with the workspace identity authentication method in Fabric items other than OneLake shortcuts, pipelines, semantic models, or Dataflows Gen2, or in other workspaces, they might not work.

* Connections with workspace-identity-authentication can only be used in OneLake shortcuts, pipelines, semantic models, or Dataflows Gen2.

* If you create a connection in the *Manage Gateways and Connections* experience, you might see a banner stating that the workspace identity authentication type is only supported in pipelines and OneLake shortcuts. This is a known issue that will be resolved with future releases.

* Checking the status of a connection that has workspace identity as the authentication method isn't supported.

* If your organization has a Microsoft Entra Conditional Access policy for workload identities that includes all service principals, then each Fabric workspace identity should be excluded from the Conditional Access policy for workload identities. Otherwise, workspace identities won't work.

* Workspace identity isn't compatible with cross-tenant requests.

## Related content

* [Workspace identity](./workspace-identity.md)
* [Trusted workspace access](./security-trusted-workspace-access.md)
* [Fabric identities](../admin/fabric-identities-manage.md)
