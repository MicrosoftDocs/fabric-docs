---
title: Azure Key Vault Reference overview 
description: Learn about Azure Key Vault Reference in Microsoft Fabric
ms.author: abnarain
author: nabhishek
ms.topic: overview
ms.date: 10/21/2025
ms.search.form: Azure Key Vault Reference overview
ms.custom: configuration
---

# Azure Key Vault references overview 

>[!NOTE]
>Azure Key Vault references in Fabric is Generally Available feature.

[Azure Key Vault (AKV)](/azure/key-vault/general/overview) is Microsoft’s cloud service for storing secrets, keys, and certificates centrally, so you don’t have to hardcode them into your apps. With Azure Key Vault references in Microsoft Fabric, you can just point to a secret in your vault instead of copying and pasting credentials. Fabric grabs the secret automatically whenever it’s needed for a data connection.

## How Azure Key Vault references work
When you configure an Azure Key Vault reference in Fabric, you're creating a secure pointer to your secret rather than storing the secret itself. Here's how the process works:

**Initial Setup:**
Fabric records only the vault URI, secret name from your Key Vault and user auth / OAuth2.0 credential for connecting to the Azure Key Vault (AKV). You must grant your the user identity **Get** and **List** permissions in the specified AKV. Importantly, the actual secret values are never stored within Fabric.

**Runtime Secret Retrieval:**
When Fabric needs to establish a data connection, it dynamically retrieves the secret from your Key Vault using the stored reference. The secret is used immediately to authenticate the connection and is held in memory only for the duration needed to establish that connection.

## Prerequisites

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- You need an [Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) with [Azure Key Vault](/azure/key-vault/quick-create-portal) resource to test this feature.
- Read the [Azure Key Vault quick start guide on learn.microsoft.com](/azure/key-vault/secrets/quick-create-portal) to learn more about creating an AKV resource.
- The Azure Key Vault needs to be accessible from public network.
- The creator of Azure Key Vault reference connection must have at least [Key Vault Certificate User](/azure/role-based-access-control/built-in-roles/security#key-vault-certificate-user) permission on the Key Vault.


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

## Related Content
- [Connectors overview](connector-overview.md)
- [Data source management](data-source-management.md)
