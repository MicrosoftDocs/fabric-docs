---
title: Create an Azure Data Lake Storage Gen2 shortcut
description: Learn how to create a OneLake shortcut for Azure Data Lake Storage Gen2 inside a Microsoft Fabric lakehouse.
ms.reviewer: eloldag # Product team ms alias(es)
# author: Do not use - assigned by folder in docfx file
# ms.author: Do not use - assigned by folder in docfx file
ms.search.form: Shortcuts
ms.topic: how-to
ms.date: 01/14/2026
#customer intent: As a data engineer, I want to learn how to create an Azure Data Lake Storage Gen2 shortcut inside a Microsoft Fabric lakehouse so that I can efficiently manage and access my data.
---

# Create an Azure Data Lake Storage Gen2 shortcut

In this article, you learn how to create an Azure Data Lake Storage (ADLS) Gen2 shortcut inside a Fabric lakehouse. When you create shortcuts to Azure Data Lake Storage (ADLS) Gen2 storage accounts, the target path can point to any folder within the hierarchical namespace. At a minimum, the target path must include a container name.

For an overview of shortcuts, see [OneLake shortcuts](onelake-shortcuts.md). To create shortcuts programmatically, see [OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md).

## Prerequisites

- A lakehouse. If you don't have one, create one by following these steps: [Create a lakehouse](../data-engineering/create-lakehouse.md).
- You must enable Hierarchical Namespaces on your ADLS Gen2 storage account.

## Create a shortcut

1. Open a lakehouse.

1. Right-click on a directory within the **Lake view** of the lakehouse.

1. Select **New shortcut**.

   :::image type="content" source="shortcuts/media/create-onelake-shortcut/new-shortcut-lake-view.png" alt-text="The same screenshot displayed earlier showing where to select New shortcut from the Lake view.":::

1. Under **External sources**, select **Azure Data Lake Storage Gen2**.

1. Enter the **Connection settings** and **Connection credentials** for the storage account.

   :::image type="content" source="media/create-adls-shortcut/shortcut-details.png" alt-text="Screenshot of the New shortcut window showing the Connection settings and Connection credentials."  lightbox="media/create-adls-shortcut/shortcut-details.png":::

   | Field | Description |
   |-----|-----|
   | **URL**| The DFS endpoint for your storage account. <br><br> `https://<STORAGE_ACCOUNT_NAME>.dfs.core.windows.net`|
   |**Connection** | Select an existing connection for the specified storage location from the drop-down menu. Or if no connections exist, select **Create new connection**. |
   |**Connection name** | A name for your Azure Data Lake Storage Gen2 connection.|
   |**Authentication kind**| Select your preferred authorization model from the drop-down menu: Organizational account, Account key, Shared Access Signature (SAS), Service principal, or Workspace Identity. For more information, see [Authorization](#authorization). <br><br> Once you select an authentication kind, fill in the required credentials.|

1. Select **Next**.

1. Browse to the target location for the shortcut.

   :::image type="content" source="./media/create-adls-shortcut/shortcut-browse.png" alt-text="Screenshot of the storage browse window with multiple folders selected." lightbox="./media/create-adls-shortcut/shortcut-browse.png":::

   If you just used the storage account in the connection URL, all of your available containers appear in the left navigation view. If you specified a container in connection URL, only the specified container and its contents appear in the navigation view.

   Navigate the storage account by selecting a folder or the expansion arrow next to a folder.

   In this view, you can select one or more shortcut target locations. Choose target locations by selecting the checkbox next a folder in the left navigation view.

1. Select **Next**

   :::image type="content" source="./media/create-adls-shortcut/shortcut-review.png" alt-text="Screenshot of shortcut review page with options to rename and delete shortcuts." lightbox="./media/create-adls-shortcut/shortcut-review.png":::

   The review page allows you to verify all of your selections. Here you can see each shortcut that will be created. In the action column, you can select the pencil icon to edit the shortcut name. You can select the trash can icon to delete shortcut.

1. Select **Create**.

1. The lakehouse automatically refreshes. The shortcut appears in the left **Explorer** pane.

   :::image type="content" source="shortcuts/media/create-onelake-shortcut/folder-shortcut-symbol.png" alt-text="Screenshot showing a Lake view list of folders that display the shortcut symbol.":::

## Access

ADLS shortcuts must point to the DFS endpoint for the storage account.

Example: `https://accountname.dfs.core.windows.net/`

If a storage firewall protects your storage account, you can configure trusted service access. For more information, see [Trusted workspace access](..\security\security-trusted-workspace-access.md).

## Authorization

ADLS shortcuts use a delegated authorization model. In this model, the shortcut creator specifies a credential for the ADLS shortcut and all access to that shortcut is authorized by using that credential. ADLS shortcuts support the following delegated authorization types:

- **Organizational account** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Service principal** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Workspace identity** - must have Storage Blob Data Reader, Storage Blob Data Contributor, or Storage Blob Data Owner role on the storage account; or Delegator role on the storage account plus file or directory access granted within the storage account.
- **Shared Access Signature (SAS)** - must include at least the following permissions: Read, List, and Execute.
- **Account key** - the storage account access key. Account keys grant full access to the storage account, so use this option with caution and protect your keys appropriately.

Microsoft Entra ID delegated authorization types (organizational account, service principal, or workspace identity) require the **Generate a user delegation key** action at the storage account level. This action is included as part of the Storage Blob Data Reader, Storage Blob Data Contributor, Storage Blob Data Owner, and Delegator roles. If you don't want to give a user reader, contributor, or owner permissions for the whole storage account, assign them the Delegator role instead. Then, define detailed data access rights using [Access control lists (ACLs) in Azure Data Lake Storage](/azure/storage/blobs/data-lake-storage-access-control).

>[!IMPORTANT]
>The **Generate a user delegation key** requirement isn't currently enforced when a workspace identity is configured for the workspace and the ADLS shortcut auth type is Organizational Account, Service Principal, or Workspace Identity. However, this behavior will be restricted in the future. Make sure that all delegated identities have the **Generate a user delegation key** action to ensure that your users' access isn't affected when this behavior changes.

### Use access control lists in Azure Data Lake Storage with ADLS shortcuts

To reuse access control lists (ACLs) assigned to an ADLS shortcut target and bring them to an ADLS shortcut, use a combination of the Storage Blob Delegator role and ACLs assigned to the files and directories within the storage account to control access to ADLS shortcuts.

:::image type="content" source="./media/create-adls-shortcut/acl-image.png" alt-text="A screenshot of a storage account with sample ACL configuration." lightbox="./media/create-adls-shortcut/acl-image.png":::

By using this authorization model, you can control access to ADLS shortcuts with more granularity. The model combines the Storage Blob Delegator role with ACLs assigned on ADLS directories and files within the storage account. This authorization model doesn't affect existing ADLS shortcuts. Customers can continue using existing authorization models. The ACL authorization model supports user identity, service principals, and Fabric workspace identity.

1. Go to the Azure Storage account and select **Add role assignment**. Then select the **Storage Blob Delegator** role. Assign this role to a user identity or a service principal (SPN).

   :::image type="content" source="./media/create-adls-shortcut/show-storage-delegator.png" alt-text="Screenshot of Azure Storage role assignment with Storage Blob Delegator role highlighted in the image." lightbox="./media/create-adls-shortcut/show-storage-delegator.png":::

1. After you complete the role assignment, go to the object (file or directory) in ADLS and select **Manage ACL**. Assign appropriate ACL permissions to the security principal you use for configuring the ADLS shortcut.

   :::image type="content" source="./media/create-adls-shortcut/manage-acl.png" alt-text="Screenshot of ADLS settings with ACL configuration options." lightbox="./media/create-adls-shortcut/manage-acl.png":::

1. Switch to Microsoft Fabric and select **New shortcut**. Follow the prompts to configure the ADLS shortcut by using the security principal that you assigned the Storage Blob Delegator role and appropriate ACL permissions.

   :::image type="content" source="./media/create-adls-shortcut/create-new-adls-shortcut.png" alt-text="Screenshot of create new shortcut experience with connection settings highlighted." lightbox="./media/create-adls-shortcut/create-new-adls-shortcut.png":::

1. After you specify connection details and credentials to use, go to the directory on ADLS with the source data for the shortcut. Your security principal that you use to configure the ADLS shortcut might not have permission to browse directories. If this principal doesn't have permission, select **Path View** in the top right corner of the dialog box and type in the desired location.

   :::image type="content" source="./media/create-adls-shortcut/shortcut-path-view.png" alt-text="Screenshot of new shortcut setup experience with Path View option highlighted." lightbox="./media/create-adls-shortcut/shortcut-path-view.png":::

1. Select **Create shortcut** once you specify the desired location. The new shortcuts appear in OneLake when you create the shortcut successfully.

   :::image type="content" source="./media/create-adls-shortcut/final-create-shortcut.png" alt-text="Screenshot of Fabric lakehouse UX showing ADLS shortcuts have been created successfully." lightbox="./media/create-adls-shortcut/final-create-shortcut.png":::

Now you set up an ADLS shortcut that uses ADLS access control lists to manage authorization for the shortcut representation of that object.

## Limitations

The following limitations apply to ADLS shortcuts:

- ADLS shortcuts to storage accounts in a different Microsoft Entra tenant than your Fabric tenant require using a service principal or SAS token for authentication. Organizational account and workspace identity authentication don't work across tenants. For sharing data across Fabric tenants, consider using [external data sharing](../governance/external-data-sharing-overview.md) instead, which requires Fabric capacity in both tenants.
- ADLS shortcut target paths can't contain any reserved characters from [RFC 3986 section 2.2](https://www.rfc-editor.org/rfc/rfc3986#section-2.2). For allowed characters, see [RFC 3968 section 2.3](https://www.rfc-editor.org/rfc/rfc3986#section-2.3).
- ADLS shortcuts don't support the Copy Blob API.
- Copy function doesn't work on shortcuts that directly point to ADLS containers. It's recommended to create ADLS shortcuts to a directory that is at least one level below a container.
- OneLake shortcuts don't support connections to ADLS Gen2 storage accounts that use managed private endpoints. For more information, see [managed private endpoints for Fabric](../security/security-managed-private-endpoints-overview.md#limitations-and-considerations).
- You can't create more shortcuts inside ADLS shortcuts.
- ADLS gen 2 shortcuts aren't supported for storage accounts that use [Microsoft Purview Data Sharing](/purview/legacy/concept-data-share).

## Related content

- [Create a OneLake shortcut](shortcuts/create-onelake-shortcut.md)
- [Use OneLake shortcuts REST APIs](onelake-shortcuts-rest-api.md)
- [External data sharing in Fabric](../governance/external-data-sharing-overview.md)
