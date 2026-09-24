---
title: "Microsoft Fabric Mirrored Databases From Azure Databricks Tutorial"
description: Learn how to create a mirrored database from Azure Databricks in Microsoft Fabric.
ms.reviewer: sheppardshep, mspreshah
ms.date: 05/01/2026
ms.topic: tutorial
---

# Tutorial: Configure Microsoft Fabric mirrored databases from Azure Databricks

[Database mirroring in Microsoft Fabric](../mirroring/overview.md) is an enterprise, cloud-based, zero-ETL, SaaS technology. This guide helps you establish a mirrored database from Azure Databricks, which creates a read-only, continuously replicated copy of your Azure Databricks data in OneLake.

## Prerequisites

- A Fabric workspace.
- Enable external data access on the metastore. For more information, see [Enable external data access on the metastore](/azure/databricks/external-access/admin#enable-external-data-access-on-the-metastore).
- Create or use an existing Azure Databricks workspace with Unity Catalog enabled.
- Have the `EXTERNAL USE SCHEMA` privilege on the schema in Unity Catalog that contains the tables that Fabric accesses.
- Use Fabric's permissions model to set access controls for catalogs, schemas, and tables in Fabric.

## Create a mirrored database from Azure Databricks

Follow these steps to create a new mirrored database from your Azure Databricks Unity Catalog.

1. Go to your workspace in [Fabric](https://app.fabric.microsoft.com).
1. Select **New item** > **Mirrored Azure Databricks catalog**.

   :::image type="content" source="media/azure-databricks-tutorial/mirrored-item.png" alt-text="Screenshot from the Fabric portal of a new Azure Databricks mirrored item.":::

1. Select an existing connection if you have one configured, or create a new connection.

   To create a connection, you must be either a user or an admin of the Azure Databricks workspace. You can authenticate to your Azure Databricks workspace by using **Organizational account** or **Service principal** authentication.

   >[!NOTE]
   >The authentication choice you make here applies to Databricks authentication and Unity Catalog authorization. If you need to access Azure Data Lake Storage (ADLS) Gen2 accounts behind a firewall, follow the steps to [Enable network security access for your Azure Data Lake Storage Gen2 account](#enable-network-security-access-for-your-azure-data-lake-storage-gen2-account) later in this article. When ADLS Gen2 is behind a firewall, Fabric Workspace Identity is required for storage firewall access, regardless of the authentication method chosen for the Databricks connection.

1. After you connect to an Azure Databricks workspace, on the **Choose tables from a Databricks catalog** page, select the catalog, schemas, and tables that you want to add and access from Fabric by using the inclusion or exclusion list. Pick the catalog and its related schemas and tables that you want to add to your Fabric workspace.

   You can only see the catalogs, schemas, and tables that you have access to. For more information, see [Unity Catalog privileges and securable objects](/azure/databricks/data-governance/unity-catalog/manage-privileges/privileges).

   By default, the **Automatically sync future catalog changes for the selected schema** option is enabled. For more information, see [Mirroring Azure Databricks > Metadata sync](azure-databricks.md#metadata-sync).

1. Select **Next** to continue.

1. On the **Review and create** page, review the details and optionally change the mirrored database item name, which must be unique in your workspace. By default, the name of the mirrored item is the name of the catalog.

1. Select **Create** to continue.

1. A Databricks catalog item is created and for each table, a corresponding Databricks type shortcut is also created.

   Schemas that don't have any tables aren't shown.

1. You can also see a preview of the data when you access a shortcut by selecting the SQL analytics endpoint. Open the SQL analytics endpoint item to launch the Explorer and Query editor page. You can query your mirrored Azure Databricks tables by using T-SQL in the SQL Editor.

## Create Lakehouse shortcuts to the Databricks catalog item

You can also create shortcuts from your Lakehouse to your Databricks catalog item to use your Lakehouse data and use Spark Notebooks.

1. First, create a lakehouse. If you already have a lakehouse in this workspace, you can use an existing lakehouse.
   1. Select your workspace in the navigation menu.
   1. Select **+ New** > **Lakehouse**.
   1. Provide a name for your lakehouse in the **Name** field, and select **Create**.
1. In the **Explorer** view of your lakehouse, in the **Get data in your lakehouse** menu, under **Load data in your lakehouse**, select the **New shortcut** button.
1. Select **Microsoft OneLake**. Select a catalog. This is the data item that you created in the previous steps. Then select **Next**.
1. Select tables within the schema, and select **Next**.
1. Select **Create**.
1. Shortcuts are now available in your Lakehouse to use with your other Lakehouse data. You can also use Notebooks and Spark to perform data processing on the data for these catalog tables that you added from your Azure Databricks workspace.

## Create a semantic model

You can create a Power BI semantic model based on your mirrored item, and manually add or remove tables. For more information about creating and managing semantic models, see [Create a Power BI semantic model](../data-warehouse/create-semantic-model.md).

For the best experience, use the Microsoft Edge browser for semantic modeling tasks.

### Manage your semantic model relationships

After you create a new semantic model based on your mirrored database, configure the relationships between tables.

1. Select **Model Layouts** from the **Explorer** in your workspace.
1. Once you select **Model layouts**, you're presented with a graphic of the tables that are included as part of the semantic model.
1. To create relationships between tables, drag a column name from one table to another column name of another table. A popup appears to identify the relationship and cardinality for the tables.

## Enable network security access for your Azure Data Lake Storage Gen2 account 

Configure network security for your Azure Data Lake Storage (ADLS) Gen2 account when you have an [Azure Storage firewall](/azure/storage/common/storage-network-security) configured. This section applies to ADLS Gen2 storage accounts behind an Azure Storage firewall. Azure Databricks workspace storage behind an Azure Storage firewall isn't supported.

### Prerequisites

- When an Azure Storage firewall protects ADLS Gen2, Fabric uses Workspace Identity to access the firewall. Even if you select **Service principal** for ADLS authentication in the **Network Security** tab, you must allow the Workspace Identity in the Azure Storage account firewall.

  - Workspace Identity is used for storage firewall access. A service principal or OAuth is used for Databricks authentication and Unity Catalog authorization.

  - To enable the workspace identity authentication type (recommended), associate the Fabric workspace with an F capacity. To create a workspace identity, see [Authenticate with workspace identity](../security/workspace-identity-authenticate.md#step-1-create-the-workspace-identity).

- You can only associate a catalog with a single storage account.

### Enable network security access

1. When creating a new Mirrored Azure Databricks Catalog, in the **Choose data** step, select the **Network Security** tab.

   :::image type="content" source="media/azure-databricks-tutorial/network-security.png" alt-text="Screenshot of the Network Security tab in Databricks.":::

1. Select an **Existing connection** to the storage account if you have one configured. 

   - If you don't have an existing ADLS connection, create a **New connection**.  
   - The **URL** of the storage endpoint is where the selected catalog's data is stored. The endpoint should be the specific folder where the data is stored, rather than specifying the endpoint to be at the storage account level. For example, provide `https://<storage account>.dfs.core.windows.net/container1/folder1` rather than `https://<storage account>.dfs.core.windows.net/`.
   - Provide the connection credentials. The authentication types supported are Organizational account, Service principal, and Workspace Identity (recommended).

   > [!NOTE]
   > When ADLS Gen2 is protected by an Azure Storage firewall, Fabric uses Workspace Identity to traverse the firewall regardless of the authentication type selected here. The authentication type (Service principal or Organizational account) controls Databricks authentication and Unity Catalog authorization, while Workspace Identity controls trusted access through the storage firewall. The Workspace Identity must be allowed in the Azure Storage account firewall even if you select a different authentication type for the ADLS connection.

1. In the Azure portal, provide access rights to the storage account based on the authentication type you picked in the previous step. Navigate to the storage account in the Azure portal. Select **Access Control (IAM)**. Select **+Add** and **Add role assignment**. For more information, see [Assign Azure roles using the Azure portal](/azure/role-based-access-control/role-assignments-portal#step-2-open-the-add-role-assignment-page).

   Assign a role based on the scope of the connection:

   - **Storage account**: The chosen authentication identity needs the **Storage Blob Data Reader** role on the storage account.
   - **Container**: The chosen authentication identity needs the **Storage Blob Data Reader** role on the container.
   - **Folder within a container** (recommended): The chosen authentication identity needs **Read (R)** and **Execute (E)** permissions at the folder level. If you're using Service Principal or Workspace Identity as the authentication type, also give that identity **Execute** permissions on the root folder of the container and each folder in the hierarchy leading to the specified folder.

   For more information and steps to grant ADLS access, see [ADLS Access control](/azure/storage/blobs/data-lake-storage-access-control#how-to-set-acls).

1. Enable [Trusted Workspace Access](../security/security-trusted-workspace-access.md) by configuring a resource instance rule for your Fabric workspace on the storage account. For detailed steps, see [Trusted workspace access](../security/security-trusted-workspace-access.md) and [Secure Fabric mirrored databases from Azure Databricks](azure-databricks-security.md#use-trusted-workspace-access-to-access-firewall-enabled-adls-storage).

After the connection is established, a shortcut to Unity Catalog tables is created for the tables whose storage account name matches the storage account specified in the ADLS connection. Shortcuts aren't created for tables whose storage account name doesn't match.

> [!IMPORTANT]
> If you plan to use the ADLS connection outside the Mirrored Azure Databricks catalog item scenarios, you also need to assign the **Storage Blob Delegator** role on the storage account.

> [!TIP]
> If you receive a 403 authorization error when using a Service Principal for Databricks authentication with a firewall-protected ADLS Gen2 account, verify that the Workspace Identity is allowed in the Azure Storage account firewall. Even when a Service Principal is selected for authentication, Fabric uses the Workspace Identity to traverse the storage firewall.

## Enable OneLake security on the Mirrored Databricks item

Map Unity Catalog (UC) policies to Microsoft OneLake security by following these steps: 

1. **Sync the Entra Group and apply permissions in Unity Catalog.** In Azure Databricks, use Automatic Identity Management to sync a Microsoft Entra ID group and grant it the necessary Unity Catalog privileges (USE, BROWSE, and SELECT) on the relevant catalog and tables.
1. **Assign a OneLake Data Access Role.** In the Fabric workspace, create a data access role for the newly mirrored data. Add the same Entra group to this role and grant it read access to the OneLake shortcuts corresponding to the Azure Databricks tables. To get started with table level security, select the **Manage OneLake security** button in the ribbon. Ensure you keep access configurations synchronized as catalog structures and permissions evolve. For more information, see the [OneLake data access control model (preview)](../onelake/security/data-access-control-model.md).

## Related content

- [Secure Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-security.md)
- [Blog: Secure Mirrored Azure Databricks Data in Fabric with OneLake security](https://blog.fabric.microsoft.com/blog/secure-mirrored-azure-databricks-data-in-fabric-with-onelake-security)
- [Limitations in Microsoft Fabric mirrored databases from Azure Databricks](../mirroring/azure-databricks-limitations.md)
- [Frequently asked questions for mirrored databases from Azure Databricks in Microsoft Fabric](../mirroring/azure-databricks-faq.yml)
- [Mirroring Azure Databricks Unity Catalog](../mirroring/azure-databricks.md)
- [Control external access to data in Unity Catalog](/azure/databricks/data-governance/unity-catalog/access-open-api)
