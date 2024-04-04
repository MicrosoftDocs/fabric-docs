---
title: Trusted workspace access in Microsoft Fabric (preview)
description: Learn how to configure and use trusted workspace access in Microsoft Fabric.
author: paulinbar
ms.author: painbar
ms.topic: conceptual
ms.custom:
ms.date: 04/04/2024
---

# Trusted workspace access (preview)

Fabric allows you to access firewall-enabled Azure Data Lake Gen 2 accounts in a secure manner. Fabric workspaces that have a workspace identity can securely access Azure Data Lake Gen 2 accounts with public network access enabled from selected virtual networks and IP addresses. You can limit ADLS gen 2 access to specific Fabric workspaces.

Fabric workspaces that access a storage account with trusted workspace access need proper authorization for the request. Authorization is supported with Microsoft Entra credentials for organizational accounts or service principals. To find out more about resource instance rules, see [Grant access from Azure resource instances](/azure/storage/common/storage-network-security?tabs=azure-portal).

To limit and protect access to firewall-enabled storage accounts from certain Fabric workspaces, you can set up resource instance rule to allow access from specific Fabric workspaces.

> [!NOTE]
> Trusted workspace access is currently in public preview. Fabric workspace identity can only be created in workspaces associated with a Fabric capacity (F64 or higher). For information about buying a Fabric subscription, see [Buy a Microsoft Fabric subscription](../enterprise/buy-subscription.md).

This article shows you how to:

* [Configure trusted workspace access](#configure-trusted-workspace-access-in-adls-gen2) in an Azure Data Lake Gen 2 storage account.

* [Create a OneLake shortcut](#create-a-onelake-shortcut-to-storage-account-with-trusted-workspace-access) in a Fabric Lakehouse that connects to a trusted workspace access enabled Azure Data Lake Gen 2 storage account.

* [Create a data pipeline](#create-a-data-pipeline-to-a-storage-account-with-trusted-workspace-access) to connect to directly to a firewall-enabled Azure Data Lake Gen 2 account that has trusted workspace access enabled.

## Configure trusted workspace access in ADLS Gen2

### Resource instance rule

You can configure specific Fabric workspaces to access your storage account based on their workspace identity. You can create a resource instance rule by deploying an ARM template with a resource instance rule. To create a resource instance rule:

1. Sign in to the Azure portal and go to **Custom deployment**.

1. Choose **Build your own template in the editor**. A sample ARM template that creates a resource instance rule is provided at the end of this document.

1. Create the resource instance rule in the editor. When done, choose **Review + Create**.

1. On the **Basics** tab that appears, specify the required project and instance details. When done, choose **Review + Create**.

1. On the **Review + Create** tab that appears, review the summary and then select **Create**. The rule will be submitted for deployment.

1. When deployment is complete, you'll be able to go to the resource.

>[!NOTE]
>- Resource instance rules for Fabric workspaces can only be created through ARM templates. Creation through the Azure portal is not supported.
>- The subscriptionId "00000000-0000-0000-0000-000000000000" must be used for the Fabric workspace resourceId.
>- You can get the workspace id for a Fabric workspace through its address bar URL. 

:::image type="content" source="./media/security-trusted-workspace-access/resource-instance-rule.png" alt-text="Screenshot showing configured resource instance rule." lightbox="./media/security-trusted-workspace-access/resource-instance-rule.png":::

Here's an example of a resource instance rule that can be created through ARM template:

```
"resourceAccessRules": [

       { "tenantId": " df96360b-9e69-4951-92da-f418a97a85eb",

          "resourceId": "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/Fabric/providers/Microsoft.Fabric/workspaces/b2788a72-eef5-4258-a609-9b1c3e454624”
       }
]
```

### Trusted service exception

If you select the trusted service exception for an Azure Data Lake Gen 2 account that has public network access enabled from selected virtual networks and IP addresses, Fabric workspaces with a workspace identity will be able to access the storage account. When the trusted service exception checkbox is selected, any workspaces in your tenant's Fabric capacities that have a workspace identity can access data stored in the storage account.

This configuration isn't recommended, and support might be discontinued in the future. We recommend that you [use resource instance rules to grant access to specific resources](/azure/storage/common/storage-network-security?tabs=azure-portal).

### Who can configure Storage accounts for trusted service access?

A Contributor on the storage account (an Azure RBAC role) can configure resource instance rules or trusted service exception.

## How to use trusted workspace access in Fabric

There are currently two ways to use trusted workspace access to access your data from Fabric in a secure manner:

* You can [create a new ADLS shortcut](#create-a-onelake-shortcut-to-storage-account-with-trusted-workspace-access) in a Fabric Lakehouse to start analyzing your data with Spark, SQL, and Power BI.

* You can [create a data pipeline](#create-a-data-pipeline-to-a-storage-account-with-trusted-workspace-access) that uses trusted workspace access to directly access a firewall-enabled Azure Data Lake Gen 2 account.

The following sections show you how to use these two methods.

### Create a OneLake shortcut to storage account with trusted workspace access

 With the workspace identity configured in Fabric, and trusted workspace access enabled in your ADLS Gen2 storage account, you can create OneLake shortcuts to access your data from Fabric. You just create a new ADLS shortcut in a Fabric Lakehouse and you can start analyzing your data with Spark, SQL, and Power BI.

#### Prerequisites

* A Fabric workspace associated with a Fabric capacity. See [Workspace identity](./workspace-identity.md).
* Create a workspace identity associated with the Fabric workspace.
* The user account or service principal used for creating the shortcut should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope, or a Storage Blob Delegator role at the storage account scope in addition to a Storage Blob Data Reader role at the container scope.
* Configure a [resource instance rule](#resource-instance-rule) for the storage account.

> [!NOTE]
> Preexisting shortcuts in a workspace that meets the prerequisites will automatically start to support trusted service access.

#### Steps

1. Start by creating a new shortcut in a Lakehouse.

    :::image type="content" source="./media/security-trusted-workspace-access/create-new-shortcut-menu-item.png" alt-text="Sceenshot of create new shortcut menu item.":::

    The **New shortcut** wizard opens.

2. Under **External sources** select **Azure Data Lake Storage Gen 2**.

    :::image type="content" source="./media/security-trusted-workspace-access/select-external-source-adls-gen2.png" alt-text="Screenshot showing choosing Azure Data Lake Storage Gen 2 as an external source.":::

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

* **SQL endpoint**: Shortcuts created in the "Tables" section of your lakehouse are also available in the SQL endpoint.  You can open the SQL endpoint and query your data just like any other table.

* **Pipelines**: Data pipelines can access managed shortcuts to storage accounts with trusted workspace access. Data pipelines can be used to read from or write to storage accounts through OneLake shortcuts.

* **Dataflows v2**: Dataflows Gen2 can be used to access managed shortcuts to storage accounts with trusted workspace access. Dataflows Gen2 can read from or write to storage accounts through OneLake shortcuts.

* **Semantic models and reports**: The default semantic model associated with a Lakehouse SQL endpoint can read managed shortcuts to storage accounts with trusted workspace access. To see the managed tables in the default semantic model, go to the SQL endpoint, select **Reporting**, and choose **Automatically update semantic model**.

    You can also create new semantic models that reference table shortcuts to storage accounts with trusted workspace access. Go to the SQL endpoint, select **Reporting** and choose **New semantic model**.

    You can create reports on top of the default semantic models and custom semantic models.

* **KQL Database**: You can also create OneLake shortcuts to Azure Data Lake Storage Gen 2 in a KQL database. The steps to create the managed shortcut with trusted workspace access remain the same.

### Create a data pipeline to a storage account with trusted workspace access

With the workspace identity configured in Fabric and trusted access enabled in your ADLS Gen2 storage account, you can create data pipelines to access your data from Fabric. You can create a new data pipeline to copy data into a Fabric lakehouse and then you can start analyzing your data with Spark, SQL, and Power BI.

#### Prerequisites

 * A Fabric workspace associated with a Fabric capacity. See [Workspace identity](./workspace-identity.md).
* Create a workspace identity associated with the Fabric workspace.
* The user account or service principal used for creating the connection should have Azure RBAC roles on the storage account. The principal must have a Storage Blob Data Contributor, Storage Blob Data owner, or Storage Blob Data Reader role at the storage account scope.
* Configure a [resource instance rule](#resource-instance-rule) for the storage account.

#### Steps

1. Start by selecting **Get Data** in a lakehouse.

1. Select **New data pipeline**. Provide a name for the pipeline and then select **Create**.

    :::image type="content" source="./media/security-trusted-workspace-access/create-new-data-pipeline-dialog.png" alt-text="Screenshot showing the New pipeline dialog." lightbox="./media/security-trusted-workspace-access/create-new-data-pipeline-dialog.png":::

1. Choose **Azure Data Lake Gen 2** as the data source.

    :::image type="content" source="./media/security-trusted-workspace-access/select-azure-data-lake-gen2-data-source.png" alt-text="Screenshot showing choosing Azure Data Lake Gen 2 selection." lightbox="./media/security-trusted-workspace-access/select-azure-data-lake-gen2-data-source.png":::

1. Provide the URL of the storage account that has been configured with trusted workspace access, and choose a name for the connection. For **Authentication kind**, choose *Organizational account* or *Service Principal*.

    :::image type="content" source="./media/security-trusted-workspace-access/connection-settings.png" alt-text="Screenshot showing connection settings for the data source." lightbox="./media/security-trusted-workspace-access/connection-settings.png":::

    When done, select **Next**.

1. Select the file that you need to copy into the lakehouse.

   :::image type="content" source="./media/security-trusted-workspace-access/file-selection.png" alt-text="Screenshot showing file selection.png" lightbox="./media/security-trusted-workspace-access/file-selection.png":::

    When done, select **Next**.

1. On the **Review + save** screen, select **Start data transfer immediately**. When done, select **Save + Run**.

   :::image type="content" source="./media/security-trusted-workspace-access/review-save.png" alt-text="Screenshot showing the review-and-save-screen.png" lightbox="./media/security-trusted-workspace-access/review-save.png":::

1. When the pipeline status changes from *Queued* to *Succeeded*, go to the lakehouse and verify that the data tables were created.

### Restrictions and Considerations

* Trusted workspace access is only supported for workspaces in Fabric capacities (F64 or higher).
* If a workspace with a workspace identity is migrated to a non-Fabric capacity or Fabric capacity lower than F64, trusted workspace access will stop working after an hour.
* Pre-existing shortcuts created before October 10, 2023 don't support trusted workspace access.
* Connections for trusted workspace access can't be created or modified in **Manage connections and gateways**.
* If you reuse connections that support trusted workspace access in Fabric items other than shortcuts, or in other workspaces, they might not work.
* Only *organizational account* or *service principal* must be used for authentication to storage accounts for trusted workspace access.
* Pipelines can't write to OneLake table shortcuts on storage accounts with trusted workspace access. This is a temporary limitation.
* A maximum of 200 resource instance rules can be configured. For more information, see [Azure subscription limits and quotas - Azure Resource Manager](/azure/azure-resource-manager/management/azure-subscription-service-limits).
* Resource instance rules for Fabric workspaces must be created through ARM templates. Resource instance rules created through the Azure portal UI aren't supported.
* If a workspace with a workspace identity is migrated to a non-Fabric capacity or Fabric capacity less than F64, trusted workspace access will stop working within 90 minutes.
* Resource instance rules for Fabric workspaces can only be created through ARM templates. Creation through the UI isn't supported.
* Pre-existing shortcuts in a workspace that meets the prerequisites will automatically start to support trusted service access.

### ARM template sample

```
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
            "sku": {
                "name": "Standard_RAGRS",
                "tier": "Standard"
            },
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
