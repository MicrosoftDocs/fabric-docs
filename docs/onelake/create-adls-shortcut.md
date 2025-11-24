---
title: Create an Azure Data Lake Storage Gen2 shortcut
description: Learn how to create a OneLake shortcut for Azure Data Lake Storage Gen2 inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag
ms.author: kgremban
author: kgremban
ms.search.form: Shortcuts
ms.topic: how-to
ms.custom:
ms.date: 07/25/2024
#customer intent: As a data engineer, I want to learn how to create an Azure Data Lake Storage Gen2 shortcut inside a Microsoft Fabric lakehouse so that I can efficiently manage and access my data.
---

# Create an Azure Data Lake Storage Gen2 shortcut

In this article, you learn how to create an Azure Data Lake Storage (ADLS) Gen2 shortcut inside a Microsoft Fabric lakehouse. When you create shortcuts to Azure Data Lake Storage (ADLS) Gen2 storage accounts, the target path can point to any folder within the hierarchical namespace. At a minimum, the target path must include a container name.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

## Prerequisites

- A lakehouse. If you don't have one, create one by following these steps: [Create a lakehouse with OneLake](create-lakehouse-onelake.md).
- You must have Hierarchical Namespaces enabled on your ADLS Gen 2 storage account.

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="media\create-onelake-shortcut\new-shortcut-lake-view.png" alt-text="The same screenshot displayed earlier showing where to select New shortcut from the Lake view.":::

1. Under **External sources**, select **Azure Data Lake Storage Gen2**.

   :::image type="content" source="media/create-adls-shortcut/new-shortcut.png" alt-text="Screenshot of the New shortcut window showing the two methods for creating a shortcut. The option titled Azure Data Lake Storage Gen2 is highlighted." lightbox="media/create-adls-shortcut/new-shortcut-expanded.png":::

1. Enter the **Connection settings** according to the following table:

   :::image type="content" source="media/create-adls-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials."  lightbox="media/create-adls-shortcut/shortcut-details.png":::

   |Field | Description| Value|
   |-----|-----| -----|
   | **URL**| The connection string for your delta container. | `https://`*StorageAccountName*`.dfs.core.windows.net`|
   |**Connection** | Previously defined connections for the specified storage location appear in the drop-down. If no connections exist, create a new connection.| *Create new connection*. |
   |**Connection name** | The Azure Data Lake Storage Gen2 connection name.| A name for your connection.|
   |**Authentication kind**| The authorization model. The supported models are: Organizational account, Account key, Shared Access Signature (SAS), Service principal, and Workspace Identity. For more information, see [Authorization](#authorization). | Dependent on the authorization model. Once you select an authentication kind, fill in the required credentials.|

1. Select **Next**.

1. Browse to the target location for the shortcut.

   :::image type="content" source="./media/create-adls-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="./media/create-adls-shortcut/shortcut-browse.png":::

   If you just used the storage account in the connection URL, all of your available containers appear in the left navigation view. If you specified a container in connection URL, only the specified container and its contents appear in the navigation view.

   Navigate the storage account by selecting a folder or clicking on the expansion arrow next to a folder.

   In this view, you can select one or more shortcut target locations. Choose target locations by clicking the checkbox next a folder in the left navigation view.

1. Select **Next**

   :::image type="content" source="./media/create-adls-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="./media/create-adls-shortcut/shortcut-review.png":::

   The review page allows you to verify all of your selections. Here you can see each shortcut that will be created. In the action column, you can click the pencil icon to edit the shortcut name. You can click the trash can icon to delete shortcut.

1. Select **Create**.

1. The lakehouse automatically refreshes. The shortcut appears in the left **Explorer** pane.

   :::image type="content" source="media\create-onelake-shortcut\folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol.":::

## Access

ADLS shortcuts must point to the DFS endpoint for the storage account.

Example: `https://accountname.dfs.core.windows.net/`

If your storage account is protected by a storage firewall, you can configure trusted service access. For more information, see [Trusted workspace access](..\security\security-trusted-workspace-access.md).

## Authorization

ADLS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut is authorized using that credential. ADLS shortcuts support the following delegated authorization types:

- **Organizational account** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Service principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Workspace identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Shared Access Signature (SAS)** - must include at least the following permissions: Read, List, and Execute.

Microsoft Entra ID delegated authorization types (organizational account, service principal, or workspace identity) require the **Generate a user delegation key** action at the storage account level. This action is included as part of the Storage Blob Data Reader, Storage Blob Data Contributor, Storage Blob Data Owner, and Delegator roles. If you don't want to give a user reader, contributor, or owner permissions for the whole storage account, assign them the Delegator role instead. Then, define detailed data access rights using [Access control lists (ACLs) in Azure Data Lake Storage](/azure/storage/blobs/data-lake-storage-access-control).

>[!IMPORTANT]
>The **Generate a user delegation key** requirement is not currently enforced when a workspace identity is configured for the workspace and the ADLS shortcut auth type is Organizational Account, Service Principal or Workspace Identity. However, this behavior will be restricted in the future. We recommend making sure that all delegated identities have the **Generate a user delegation key** action to ensure that your users' access isn't affected when this behavior changes.

## Limitations

The following limitations apply to ADLS shortcuts:

- ADLS shortcut target paths can't contain any reserved characters from [RFC 3986 section 2.2](https://www.rfc-editor.org/rfc/rfc3986#section-2.2). For allowed characters, see [RFC 3968 section 2.3](https://www.rfc-editor.org/rfc/rfc3986#section-2.3).
- ADLS shortcuts don't support the Copy Blob API.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts to a directory that is at least one level below a container.
- OneLake shortcuts don't support connections to ADLS Gen2 storage accounts that use managed private endpoints. For more information, see [managed private endpoints for Fabric.](../security/security-managed-private-endpoints-overview.md#limitations-and-considerations)
- More shortcuts can't be created inside ADLS shortcuts.
- ADLS gen 2 shortcuts aren't supported for storage accounts that use [Microsoft Purview data sharing](/purview/legacy/concept-data-share).

## Related content

- [Create a OneLake shortcut](create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
