---
title: Trusted workspace access in Microsoft Fabric
description: Learn how to configure and use trusted workspace access to securely access your Azure Data Lake Gen2 storage accounts from Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 08/12/2025
---

# Trusted workspace access

Fabric allows you to access firewall-enabled Azure Data Lake Storage (ADLS) Gen2 accounts in a secure manner. Fabric workspaces that have a workspace identity can securely access ADLS Gen2 accounts with either public network access enabled from selected virtual networks and IP addresses or with public network access disabled. You can limit ADLS Gen2 access to specific Fabric workspaces.

Fabric workspaces that access a storage account with trusted workspace access need proper authorization for the request. Authorization is supported with Microsoft Entra credentials for organizational accounts or service principals. To find out more about resource instance rules, see [Grant access from Azure resource instances](/azure/storage/common/storage-network-security?tabs=azure-portal).

To limit and protect access to firewall-enabled storage accounts from certain Fabric workspaces, you can set up resource instance rules to allow access from specific Fabric workspaces.

> [!NOTE]
> Trusted workspace access is **generally available**, but can only be used in F SKU capacities. For information about buying a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md). Trusted workspace access isn't supported in Trial capacities.

This article shows you how to:

* [Configure trusted workspace access](#configure-trusted-workspace-access-in-adls-gen2) in an ADLS Gen2 storage account.

* [Create a OneLake shortcut](#create-a-onelake-shortcut-to-storage-account-with-trusted-workspace-access) in a Fabric Lakehouse that connects to a trusted-workspace-access enabled ADLS Gen2 storage account.

* [Create a pipeline](#create-a-pipeline-to-a-storage-account-with-trusted-workspace-access) to connect directly to a firewall-enabled ADLS Gen2 account that has trusted workspace access enabled.
  
* [Use the T-SQL COPY statement](#use-the-t-sql-copy-statement-to-ingest-data-into-a-warehouse) to ingest data into your Warehouse from a firewall-enabled ADLS Gen2 account that has trusted workspace access enabled.

* [Create a semantic model](#create-a-semantic-model-with-trusted-workspace-access) in import mode to connect to a firewall-enabled ADLS Gen2 account that has trusted workspace access enabled.

* [Load data with AzCopy](#load-data-using-azcopy-and-trusted-workspace-access) from a firewall-enabled Azure Storage account into OneLake.

## Configure trusted workspace access in ADLS Gen2

### Prerequisites

* A Fabric workspace associated with a Fabric capacity. 
* Create a workspace identity associated with the Fabric workspace. See [Workspace identity](./workspace-identity.md). Ensure that the workspace identity has Contributor access to the workspace by going to **Manage Access** (next to **Workspace settings**) and adding the workspace identity to the list as contributor.
* The principal used for authentication in the shortcut should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope, or a Storage Blob Delegator role at the storage account scope together with access at the folder level within the container. Access at the folder level can be provided through an RBAC role at the container level or through specific folder-level access.
* Configure a [resource instance rule](#configure-trusted-workspace-access-in-adls-gen2) for the storage account.

### Resource instance rule via ARM template

You can configure specific Fabric workspaces to access your storage account based on their workspace identity. You can create a resource instance rule by deploying an ARM template with a resource instance rule. To create a resource instance rule:

1. Sign in to the Azure portal and go to **Custom deployment**.

1. Choose **Build your own template in the editor**. For a sample ARM template that creates a resource instance rule, see [ARM template sample](#arm-template-sample).

1. Create the resource instance rule in the editor. When done, choose **Review + Create**.

1. On the **Basics** tab that appears, specify the required project and instance details. When done, choose **Review + Create**.

1. On the **Review + Create** tab that appears, review the summary and then select **Create**. The rule is submitted for deployment.

1. When deployment is complete, you're able to go to the resource.

>[!NOTE]
>- Resource instance rules for Fabric workspaces can only be created through ARM templates or PowerShell. Creation through the Azure portal is not supported.
>- The subscriptionId "00000000-0000-0000-0000-000000000000" must be used for the Fabric workspace resourceId.
>- You can get the workspace ID for a Fabric workspace through its address bar URL.

:::image type="content" source="./media/security-trusted-workspace-access/resource-instance-rule.png" alt-text="Screenshot showing configured resource instance rule." lightbox="./media/security-trusted-workspace-access/resource-instance-rule.png":::

Here's an example of a resource instance rule that can be created through ARM template. For a complete example, see [ARM template sample](#arm-template-sample).

```json
"resourceAccessRules": [

       { "tenantId": " aaaabbbb-0000-cccc-1111-dddd2222eeee",

          "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/Fabric/providers/Microsoft.Fabric/workspaces/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e"
       }
]
```

### Resource instance rule via PowerShell script

You can create a resource instance rule through PowerShell, using the following script.

```PowerShell
$resourceId = "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/Fabric/providers/Microsoft.Fabric/workspaces/<YOUR_WORKSPACE_GUID>"
$tenantId = "<YOUR_TENANT_ID>"
$resourceGroupName = "<RESOURCE_GROUP_OF_STORAGE_ACCOUNT>"
$accountName = "<STORAGE_ACCOUNT_NAME>"
Add-AzStorageAccountNetworkRule -ResourceGroupName $resourceGroupName -Name $accountName -TenantId $tenantId -ResourceId $resourceId
```

### Trusted service exception

If you select the trusted service exception for an ADLS Gen2 account that has public network access enabled from selected virtual networks and IP addresses, Fabric workspaces with a workspace identity can access the storage account. When the trusted service exception checkbox is selected, any workspaces in your tenant's Fabric capacities that have a workspace identity can access data stored in the storage account.

This configuration isn't recommended, and support might be discontinued in the future. We recommend that you [use resource instance rules to grant access to specific resources](/azure/storage/common/storage-network-security?tabs=azure-portal).

### Who can configure Storage accounts for trusted service access?

A Contributor on the storage account (an Azure RBAC role) can configure resource instance rules or trusted service exception.

## How to use trusted workspace access in Fabric

There are several ways to use trusted workspace access to access your data from Fabric in a secure manner:

* You can [create a new ADLS shortcut](#create-a-onelake-shortcut-to-storage-account-with-trusted-workspace-access) in a Fabric Lakehouse to start analyzing your data with Spark, SQL, and Power BI.

* You can [create a pipeline](#create-a-pipeline-to-a-storage-account-with-trusted-workspace-access) that uses trusted workspace access to directly access a firewall-enabled ADLS Gen2 account.

* You can use a T-SQL Copy statement that leverages trusted workspace access to ingest data into a Fabric warehouse.

* You can use a semantic model (import mode) to leverage trusted workspace access and create models and reports on the data.

* You can [use AzCopy](#load-data-using-azcopy-and-trusted-workspace-access) to performantly load data from a firewall-enabled Azure Storage account to OneLake.

The following sections show you how to use these methods.

### Create a OneLake shortcut to storage account with trusted workspace access

 With the workspace identity configured in Fabric, and trusted workspace access enabled in your ADLS Gen2 storage account, you can create OneLake shortcuts to access your data from Fabric. You just create a new ADLS shortcut in a Fabric Lakehouse and you can start analyzing your data with Spark, SQL, and Power BI.

> [!NOTE]
>- Preexisting shortcuts in a workspace that meets the prerequisites automatically start to support trusted service access.
>- You must use the DFS URL ID for the storage account. Here's an example: `https://StorageAccountName.dfs.core.windows.net`
>- Service principals can also create shortcuts to storage accounts with trusted access.

#### Steps

1. Start by creating a new shortcut in a Lakehouse.

    :::image type="content" source="./media/security-trusted-workspace-access/create-new-shortcut-menu-item.png" alt-text="Sceenshot of create new shortcut menu item.":::

    The **New shortcut** wizard opens.

2. Under **External sources** select **Azure Data Lake Storage Gen2**.

    :::image type="content" source="./media/security-trusted-workspace-access/select-external-source-adls-gen2.png" alt-text="Screenshot showing choosing Azure Data Lake Storage Gen2 as an external source.":::

3. Provide the URL of the storage account that has been configured with trusted workspace access, and choose a name for the connection. For Authentication kind, choose *Organizational account*, or *Service Principal*.

    :::image type="content" source="./media/security-trusted-workspace-access/provide-url.png" alt-text="Screenshot showing URL specification in shortcut wizard.":::

    When done, select **Next**.

4. Provide the shortcut name and sub path.

    :::image type="content" source="./media/security-trusted-workspace-access/provide-subpath.png" alt-text="Screenshot showing sub path definition in shortcut wizard.":::

    When done, select **Create**.

5. The lakehouse shortcut is created, and you should be able to preview storage data in the shortcut.

    :::image type="content" source="./media/security-trusted-workspace-access/preview-storage-data-lakehouse-shortcut.png" alt-text="Screenshot showing previewing storage data through lakehouse shortcut." lightbox="./media/security-trusted-workspace-access/preview-storage-data-lakehouse-shortcut.png":::

#### Use the OneLake shortcut to a storage account with trusted workspace access in Fabric items

With OneCopy in Fabric, you can access your OneLake shortcuts with trusted access from all Fabric workloads.

* **Spark**: You can use Spark to access data from your OneLake shortcuts. When shortcuts are used in Spark, they appear as folders in OneLake. You just need to reference the folder name to access the data. You can use the OneLake shortcut to storage accounts with trusted workspace access in Spark notebooks.

* **SQL analytics endpoint**: Shortcuts created in the "Tables" section of your lakehouse are also available in the SQL analytics endpoint. You can open the SQL analytics endpoint and query your data just like any other table.

* **Pipelines**: Pipelines can access managed shortcuts to storage accounts with trusted workspace access. Pipelines can be used to read from or write to storage accounts through OneLake shortcuts.

* **Dataflows v2**: Dataflows Gen2 can be used to access managed shortcuts to storage accounts with trusted workspace access. Dataflows Gen2 can read from or write to storage accounts through OneLake shortcuts.

* **Semantic models and reports**: The default semantic model associated with the SQL analytics endpoint of a Lakehouse can read managed shortcuts to storage accounts with trusted workspace access. To see the managed tables in the default semantic model, go to the SQL analytics endpoint item, select **Reporting**, and choose **Automatically update semantic model**.

    You can also create new semantic models that reference table shortcuts to storage accounts with trusted workspace access. Go to the SQL analytics endpoint, select **Reporting**, and choose **New semantic model**.

    You can create reports on top of the default semantic models and custom semantic models.

* **KQL Database**: You can also create OneLake shortcuts to ADLS Gen2 in a KQL database. The steps to create the managed shortcut with trusted workspace access remain the same.

### Create a pipeline to a storage account with trusted workspace access

With the workspace identity configured in Fabric and trusted access enabled in your ADLS Gen2 storage account, you can create pipelines to access your data from Fabric. You can create a new pipeline to copy data into a Fabric lakehouse and then you can start analyzing your data with Spark, SQL, and Power BI.

#### Prerequisites

 * A Fabric workspace associated with a Fabric capacity. See [Workspace identity](./workspace-identity.md).
* Create a workspace identity associated with the Fabric workspace.
* The principal used for authentication in the pipeline should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope.
* Configure a [resource instance rule](#configure-trusted-workspace-access-in-adls-gen2) for the storage account.

#### Steps

1. Start by selecting **Get Data** in a lakehouse.

1. Select **New pipeline**. Provide a name for the pipeline and then select **Create**.

    :::image type="content" source="./media/security-trusted-workspace-access/create-new-data-pipeline-dialog.png" alt-text="Screenshot showing the New pipeline dialog." lightbox="./media/security-trusted-workspace-access/create-new-data-pipeline-dialog.png":::

1. Choose **Azure Data Lake Gen2** as the data source.

    :::image type="content" source="./media/security-trusted-workspace-access/select-azure-data-lake-gen2-data-source.png" alt-text="Screenshot showing choosing ADLS Gen2 selection." lightbox="./media/security-trusted-workspace-access/select-azure-data-lake-gen2-data-source.png":::

1. Provide the URL of the storage account that has been configured with trusted workspace access, and choose a name for the connection. For **Authentication kind**, choose *Organizational account* or *Service Principal*.

    :::image type="content" source="./media/security-trusted-workspace-access/connection-settings.png" alt-text="Screenshot showing connection settings for the data source." lightbox="./media/security-trusted-workspace-access/connection-settings.png":::

    When done, select **Next**.

1. Select the file that you need to copy into the lakehouse.

   :::image type="content" source="./media/security-trusted-workspace-access/file-selection.png" alt-text="Screenshot showing file selection." lightbox="./media/security-trusted-workspace-access/file-selection.png":::

    When done, select **Next**.

1. On the **Review + save** screen, select **Start data transfer immediately**. When done, select **Save + Run**.

   :::image type="content" source="./media/security-trusted-workspace-access/review-save.png" alt-text="Screenshot showing the review and save screen." lightbox="./media/security-trusted-workspace-access/review-save.png":::

1. When the pipeline status changes from *Queued* to *Succeeded*, go to the lakehouse and verify that the data tables were created.

### Use the T-SQL COPY statement to ingest data into a warehouse

With the workspace identity configured in Fabric and trusted access enabled in your ADLS Gen2 storage account, you can use the [COPY T-SQL statement](/sql/t-sql/statements/copy-into-transact-sql?view=fabric&preserve-view=true) to ingest data into your Fabric warehouse. Once the data is ingested into the warehouse, then you can start analyzing your data with SQL and Power BI. Users with Admin, Member, Contributor, Viewer workspace roles, or read permissions on the warehouse, can use trusted access along with the T-SQL COPY command.

### Create a semantic model with trusted workspace access

Semantic models in import mode support trusted workspace access to storage accounts. You can use this feature to create models and reports for data in firewall-enabled ADLS Gen2 storage accounts.

#### Prerequisites

* A Fabric workspace associated with a Fabric capacity. See [Workspace identity](./workspace-identity.md).
* Create a workspace identity associated with the Fabric workspace.
* A connection to the ADLS Gen2 storage account. The principal used for authentication in the connection bound to the semantic model should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope.
* Configure a [resource instance rule](#configure-trusted-workspace-access-in-adls-gen2) for the storage account.

#### Steps
1. Create the semantic model in Power BI Desktop that connects to the ADLS Gen2 storage account using the steps listed in [Analyze data in Azure Data Lake Storage Gen2 by using Power BI](/power-query/connectors/analyze-data-in-adls-gen2). You can use an organizational account to connect to Azure Data Lake Storage Gen2 in Desktop.
2. Import the model to the workspace configured with the workspace identity.
3. Navigate to the model settings and expand the Gateway and cloud connections section.
4. Under cloud connections, select a data connection for the ADLS Gen2 storage account (this connection can have workspace identity, service principal, and organizational account as the authentication method)
5. Select **Apply** and then refresh the model to finalize the configuration.

### Load data using AzCopy and trusted workspace access

With trusted workspace access configured, AzCopy copy jobs can access data stored in a firewall-enabled Azure Storage account, letting you performantly load data from Azure Storage to OneLake.

#### Prerequisites

* A Fabric workspace associated with a Fabric capacity. See [Workspace identity](./workspace-identity.md).
* Install AzCopy and sign in with the principal used for authentication. See [Get started with AzCopy](/azure/storage/common/storage-use-azcopy-v10).
* Create a workspace identity associated with the Fabric workspace.
* The principal used for authentication in the shortcut should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope, or a Storage Blob Delegator role at the storage account scope together with access at the folder level within the container. Access at the folder level can be provided through an RBAC role at the container level or through specific folder-level access.
* Configure a [resource instance rule](#configure-trusted-workspace-access-in-adls-gen2) for the storage account.

#### Steps

1. Log in to AzCopy with the principal that has access to the Azure Storage account and Fabric item. Select the subscription containing your firewall-enabled Azure Storage account. 
```azcopy
azcopy login
```

2. Build your AzCopy command. You need the copy source, destination, and at least one parameter.
    - **source-path**: A file or directory in your firewall-enabled Azure Storage account.
    - **destination-path**: The landing zone in OneLake for your data. For example, the /Files folder in a lakehouse.
    - **--trusted-microsoft-suffixes**: Must include "fabric.microsoft.com". 
```azcopy
azcopy copy "https://<source-account-name>.blob.core.windows.net/<source-container>/<source-path>" "https://onelake.dfs.fabric.microsoft.com/<destination-workspace>/<destination-path>" --trusted-microsoft-suffixes "fabric.microsoft.com"
```

3. Run the copy command. AzCopy uses the identity you logged in with to access both OneLake and Azure Storage. The copy operation is synchronous so when the command returns, all files are copied. For more information about using AzCopy with OneLake, see [AzCopy](/fabric/onelake/onelake-azcopy).

## Restrictions and Considerations

#### Supported Scenarios and Limitations
- Trusted workspace access is supported for workspaces in any Fabric F SKU capacity.
- You can only use trusted workspace access in OneLake shortcuts, pipelines, semantic models, the T-SQL COPY statement, and AzCopy. To securely access storage accounts from Fabric Spark, see [Managed private endpoints for Fabric](./security-managed-private-endpoints-overview.md).
- Pipelines can't write to OneLake table shortcuts on storage accounts with trusted workspace access. This is a temporary limitation.
- If you reuse connections that support trusted workspace access in Fabric items other than shortcuts, pipelines, and semantic models, or in other workspaces, they might not work.
- Trusted workspace access isn't compatible with cross-tenant requests.

#### Authentication Methods and Connection Management
- Connections for trusted workspace access can be created in **Manage connections and gateways**; however, workspace identity is the only supported authentication method. Test connection fails if organizational account or service principal authentication methods are used.
- Only *organizational account*, *service principal*, and *workspace identity* authentication methods can be used for authentication to storage accounts for trusted workspace access in shortcuts, pipelines, and shortcuts. 
- If you want to use service principal or organizational accounts as the authentication method in connections to a firewall-enabled storage account, you can use shortcut or pipeline creation experiences, or the Power BI quick reports experience to create the connection. Later, you can bind this connection to semantic models, and other shortcuts and pipelines.
- If a semantic model uses personal cloud connections, you can only use workspace identity as the authentication method for trusted access to storage. We recommend replacing personal cloud connections with shared cloud connections.
- Connections to firewall-enabled Storage accounts have the status *Offline* in Manage connections and gateways.

#### Migration and Preexisting Shortcuts
- If a workspace with a workspace identity is migrated to a non-Fabric capacity, or to a non-F SKU Fabric capacity, trusted workspace access will stop working after an hour.
- Preexisting shortcuts created before October 10, 2023 don't support trusted workspace access.
- Preexisting shortcuts in a workspace that meets the prerequisites will automatically start to support trusted service access.

#### Security, Network, and Resource Configuration
- Trusted workspace access only works when public access is enabled from selected virtual networks and IP addresses or when public access is disabled.
- Resource instance rules for Fabric workspaces must be created through ARM templates. Resource instance rules created through the Azure portal UI aren't supported.
- A maximum of 200 resource instance rules can be configured. For more information, see [Azure subscription limits and quotas - Azure Resource Manager](/azure/azure-resource-manager/management/azure-subscription-service-limits).
- If your organization has a Microsoft Entra Conditional access policy for workload identities that includes all service principals, then trusted workspace access won't work. In such instances, you need to exclude specific Fabric workspace identities from the Conditional access policy for workload identities.

### ARM template sample

```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "resources": [
        {
            "type": "Microsoft.Storage/storageAccounts",
            "apiVersion": "2023-01-01",
            "name": "<storage account name>",
            "id": "/subscriptions/<subscription id of storage account>/resourceGroups/<resource group name>/providers/Microsoft.Storage/storageAccounts/<storage account name>",
            "location": "<region>",
            "kind": "StorageV2",
            "properties": {
                "networkAcls": {
                    "resourceAccessRules": [
                        {
                            "tenantId": "<tenantid>",
                            "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/Fabric/providers/Microsoft.Fabric/workspaces/<workspace-id>"
                        }]
                }
            }
        }
    ]
}
```

## Related content

* [Workspace identity](./workspace-identity.md)
* [Grant access from Azure resource instances](/azure/storage/common/storage-network-security?tabs=azure-portal#grant-access-from-azure-resource-instances)
* [Trusted access based on a managed identity](/azure/storage/common/storage-network-security?tabs=azure-portal#trusted-access-based-on-a-managed-identity)