---
title: Configure AKV references
description: How to configure Azure Key Vault reference in Microsoft Fabric
ms.author: abnarain
author: nabhishek
ms.topic: how-to
ms.date: 04/28/2025
ms.search.form: Configure Azure Key Vault references
ms.custom: configuration
---
# Configure Azure Key Vault references

[Azure Key Vault (AKV)](/azure/key-vault/general/overview) is Microsoft’s cloud service for storing secrets, keys, and certificates centrally, so you don’t have to hardcode them into your apps. With Azure Key Vault references in Microsoft Fabric, you can just point to a secret in your vault instead of copying and pasting credentials. Fabric grabs the secret automatically whenever it’s needed for a data connection.

## Prerequisites

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- You need an [Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) with [Azure Key Vault](/azure/key-vault/quick-create-portal) resource to test this feature.
- Read the [Azure Key Vault quick start guide on learn.microsoft.com](/azure/key-vault/secrets/quick-create-portal) to learn more about creating an AKV resource.
- The Azure Key Vault needs to be accessible from public network.
- The creator of Azure Key Vault reference connection must have at least [Key Vault Certificate User](/azure/role-based-access-control/built-in-roles/security#key-vault-certificate-user) permission on the Key Vault.

## Create an Azure Key Vault reference in Microsoft Fabric

1. Go to [fabric.microsoft.com](https://app.fabric.microsoft.com/). Select the gear icon in the upper-right corner, and then select **Manage Connections and Gateways**.
1. Select the **Azure Key Vault references** tab and select **New**.

    :::image type="content" source="media/akv-reference/new-azure-key-vault-reference.png" alt-text="Screenshot showing how to create a new AKV reference.":::

1. Under **Reference alias**, enter a name for your reference.
1. Under **Account Name**, enter the name of the existing Azure Key Vault you want to connect to.
1. Use OAuth 2.0 to authenticate to connect to your key vault and select **Edit credentials**.
1. Follow the prompts to sign in with your Azure credentials and grant Microsoft Fabric access to your Azure Key Vault. (Make sure you have the [necessary permissions](#prerequisites) to access the Key Vault.)
1. (Optional) Select the check box to allow on-premises data gateways or virtual network gateways to use this AKV reference.
1. Select **Create** and check its status to verify if it's online and connected to the key vault.

    :::image type="content" source="media/akv-reference/created-azure-key-vault-reference.png" alt-text="Screenshot showing a new AKV reference created.":::

## Use Azure Key Vault reference in connections

Currently, the modern Get Data experience in Microsoft Fabric doesn't support creating connections by authenticating with Azure Key Vault references. 
However, you can create a connection using an Azure Key Vault reference through the **Manage Connections and Gateways** settings. To do so:

1. Select the gear icon in the upper-right corner and go to **Manage Connections and Gateways**. Go to the **Connections** tab and select **New**.   
1. Go to the **Cloud** tab, enter a connection name, and select any [AKV reference supported connection type](../data-factory/azure-key-vault-reference-overview.md). 
1. Provide all connection details and select one of the supported authentication types: Basic (Username/password), Service Principal, SAS/PAT token, or Account Key.
1. Open the AKV reference list dialog by selecting the **AKV reference** icon next to the secret or password field.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-icon.png" alt-text="Screenshot showing the use AKV reference icon while creating a new connection.":::

1. Select an existing AKV reference, enter the secret name, and select **Apply**.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-list-dialog.png" alt-text="Screenshot showing AKV reference list dialog.":::

1. Once you create the connection by using AKV authentication, use that existing connection to connect to your data source in Fabric items.

    :::image type="content" source="media/akv-reference/selected-azure-key-vault-reference.png" alt-text="Screenshot showing the selected AKV reference while creating a new connection.":::

## How Azure Key Vault references work

When you configure an Azure Key Vault reference in Fabric, you're creating a secure pointer to your secret rather than storing the secret itself. Here's how the process works:

**Initial Setup:**
Fabric records only the vault URI, secret name from your Key Vault and user auth / OAuth2.0 credential for connecting to the Azure Key Vault (AKV). You must grant your the user identity **Get** and **List** permissions in the specified AKV. Importantly, the actual secret values are never stored within Fabric.

**Runtime Secret Retrieval:**
When Fabric needs to establish a data connection, it dynamically retrieves the secret from your Key Vault using the stored reference. The secret is used immediately to authenticate the connection and is held in memory only for the duration needed to establish that connection.

## Supported connectors and authentication types
| Supported Connector | Category | Account key | Basic (Username/Password) | Token (Shared Access Signature or Personal Access Token) | Service Principal |
| --- | --- | --- | --- | --- | --- |
| [:::image type="icon" source="media/data-pipeline-support/blobs-64.png":::<br/>**Azure Blob<br/>Storage**](connector-azure-blob-storage-copy-activity.md) | **Azure** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/blobs-64.png":::<br/>**Azure Data Lake<br/>Storage Gen2**](connector-azure-data-lake-storage-gen2-copy-activity.md) | **Azure** |  <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/azure-table-64.png":::<br/>**Azure Table<br/>Storage**](connector-azure-table-storage-copy-activity.md) | **Azure** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/akv-reference/databricks-64.png":::<br/>**Databricks**](connector-databricks.md) | **Services and apps** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/dataverse-64.png":::<br/>**Dataverse**](connector-dataverse-copy-activity.md) | **Services and apps** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/odata-64.png":::<br/>**OData**](connector-odata.md) | **Generic protocol** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/oracle-cloud-storage.png":::<br/>**Oracle Cloud Storage**](connector-oracle-cloud-storage-copy-activity.md) | **File** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/postgresql-64.png":::<br/>**PostgreSQL**](connector-postgresql-copy-activity.md) | **Database** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/sharepoint-64.png":::<br/>**SharePoint Online<br/>list**](connector-sharepoint-online-list-copy-activity.md) | **Services and apps** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/showflake-64.png":::<br/>**Snowflake**](connector-snowflake-copy-activity.md) | **Services and apps** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |
| [:::image type="icon" source="media/data-pipeline-support/sql-server-64.png":::<br/>**SQL Server (Cloud)**](connector-sql-server-copy-activity.md) | **Database** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |
| [:::image type="icon" source="media/akv-reference/web-64.png":::<br/>**Web API/Webpage**](connector-web-overview.md) | **Generic Protocol** | <!--AKV reference (Account key)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: |  <!--AKV reference (Basic)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: | <!--AKV reference (Token)-->:::image type="icon" source="media/data-pipeline-support/no.png"::: | <!--AKV reference (SPN)-->:::image type="icon" source="media/data-pipeline-support/yes.png"::: |

## Limitations and considerations

- Azure Key Vault references are supported on Cloud and on-premises data gateway connections.  
- Virtual network data gateways connections aren’t yet supported.
- Fabric Lineage view isn't available for AKV references.
- You can’t create AKV references with connection from the "Modern Get Data” pane in Fabric items. Learn how to [create Azure Key Vault references](../data-factory/azure-key-vault-reference-configure.md) in Fabric from "Manage Connections & Gateways". 
- Azure Key Vault references in Fabric always retrieve the current (latest) version of a secret; Azure Key Vault credential versioning is not supported.

## Related content

- [Data source management](data-source-management.md)
