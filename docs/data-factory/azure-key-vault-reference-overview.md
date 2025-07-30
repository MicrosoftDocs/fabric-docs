---
title: Azure Key Vault Reference overview (Preview)
description: Learn about Azure Key Vault Reference in Microsoft Fabric
ms.author: abnarain
author: nabhishek
ms.topic: overview
ms.date: 04/28/2025
ms.search.form: Azure Key Vault Reference overview
ms.custom: configuration
---

# Azure Key Vault references overview (Preview)

>[!NOTE]
>Azure Key Vault references in Fabric are available as a preview feature.

[Azure Key Vault (AKV)](/azure/key-vault/general/overview) is Microsoft’s cloud service for storing secrets, keys, and certificates centrally, so you don’t have to hardcode them into your apps. With Azure Key Vault references in Microsoft Fabric, you can just point to a secret in your vault instead of copying and pasting credentials. Fabric grabs the secret automatically whenever it’s needed for a data connection.

## How Azure Key Vault references work
When you add an Azure Key Vault reference in Fabric, you’re just telling Fabric where to find the secret—using the vault’s link and the name of the secret. The service records the vault URI and the secret name by using Microsoft Entra ID OAuth 2.0 consent. During the consent flow, you grant Fabric’s system-assigned managed identity **Get** and **List** permissions on the specified secrets; the secret values themselves never leave the key vault.

Fabric doesn’t store the secret itself, just an encrypted token. When it’s time to connect to your data, Fabric quietly grabs the secret, uses it to build the connection, and then lets it go. Nothing is saved to disk or sent through your browser. The secret is held just long enough to establish the connection and is then discarded.

## Prerequisites

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- You need an [Azure subscription](https://azure.microsoft.com/free/) with [Azure Key Vault](/azure/key-vault/quick-create-portal) resource to test this feature.
- Read the [Azure Key Vault quick start guide on learn.microsoft.com](/azure/key-vault/secrets/quick-create-portal) to learn more about creating an AKV resource.
- The Azure Key Vault needs to be accessible from public network.
- The creator of Azure Key Vault reference connection, must have atleast [Key Vault Certificate User](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/security#key-vault-certificate-user) permission on the Key Vault.


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

- Azure Key Vault references can be used only with cloud connections.
- Virtual network data gateways and on-premises data gateways aren’t supported.
- Fabric Lineage view isn't available for AKV references.
- You can’t create AKV references with connection from the "Modern Get Data” pane in Fabric items. Learn how to [create Azure Key Vault references](../data-factory/azure-key-vault-reference-configure.md) in Fabric from "Manage Connections & Gateways". 
- Azure Key Vault references in Fabric always retrieve the current (latest) version of a secret; Azure Key Vault credential versioning is not supported. 

## Related Content
- [Connectors overview](connector-overview.md)
- [Data source management](data-source-management.md)
