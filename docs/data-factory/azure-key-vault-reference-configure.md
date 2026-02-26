---
title: Configure AKV references
description: How to configure Azure Key Vault reference in Microsoft Fabric
ms.reviewer: abnarain
ms.topic: how-to
ms.date: 12/31/2025
ms.search.form: Configure Azure Key Vault references
ms.custom: configuration
---

# Configure Azure Key Vault references

[Azure Key Vault (AKV)](/azure/key-vault/general/overview) is Microsoft's cloud service for storing secrets, keys, and certificates centrally, so you don't have to hardcode them into your apps. By using Azure Key Vault references in Microsoft Fabric, you can just point to a secret in your vault instead of copying and pasting credentials.

To use Azure Key Vault references in Microsoft Fabric, you:

1. [Create an Azure Key Vault reference in Microsoft Fabric](#create-an-azure-key-vault-reference-in-microsoft-fabric)
1. [Store your credentials in Azure Key Vault](#store-your-credentials-in-azure-key-vault)
1. [Use Azure Key Vault reference in connections](#use-azure-key-vault-reference-in-connections)

## Prerequisites

- A Microsoft Fabric tenant account with an active subscription. [Create an account for free](/fabric/fundamentals/fabric-trial).
- An [Azure subscription](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An [Azure Key Vault](/azure/key-vault/secrets/quick-create-portal)
  - The Azure Key Vault is accessible from public network.
  - The creator of Azure Key Vault reference connection has at least [Key Vault Certificate User](/azure/role-based-access-control/built-in-roles/security#key-vault-certificate-user) permissions on the Key Vault.

- Check [supported connectors and authentication types](#supported-connectors-and-authentication-types) to ensure the connector you want to use supports AKV references.
- Check [limitations and considerations](#limitations-and-considerations) for any restrictions that could affect your use case.

## Create an Azure Key Vault reference in Microsoft Fabric

1. Go to [fabric.microsoft.com](https://app.fabric.microsoft.com/). Select the gear icon in the upper-right corner, and then select **Manage Connections and Gateways**.
1. Select the **Azure Key Vault references** tab and select **New**.

    :::image type="content" source="media/akv-reference/new-azure-key-vault-reference.png" alt-text="Screenshot showing how to create a new AKV reference.":::

1. Under **Reference alias**, enter a name for your reference.
1. Under **Account Name**, enter the name of the existing Azure Key Vault you want to connect to.
1. Use OAuth 2.0 to authenticate to connect to your key vault and select **Edit credentials**.
1. Follow the prompts to sign in with your Azure credentials and grant Microsoft Fabric access to your Azure Key Vault. Make sure you have the [necessary permissions](#prerequisites) to access the Key Vault.
1. (Optional) Select the check box to allow on-premises data gateways or virtual network gateways to use this AKV reference.
1. Select **Create** and check its status to verify if it's online and connected to the key vault.

    :::image type="content" source="media/akv-reference/created-azure-key-vault-reference.png" alt-text="Screenshot showing a new AKV reference created.":::

## Store your credentials in Azure Key Vault

To store your credentials for [supported connectors](#supported-connectors-and-authentication-types) in Azure Key Vault, follow these steps:

1. Go to your key vault in the Azure portal.
1. On the Key Vault left-hand sidebar, select **Objects** and then select **Secrets**.
1. Select **+ Generate/Import**.
1. On the **Create a secret** screen, choose or add the following values:
    - _Upload options:_ Manual.
    - _Name:_ A name for the secret. Use this name later when you [create a connection](#use-azure-key-vault-reference-in-connections). The secret name must be unique within a Key Vault.
    - _Value:_ The credential value you want to store, such as a password, account key, token, or service principal secret. This value varies depending on the connector and authentication type you plan to use.
    - Leave the other values as their defaults.
1. Select **Create**.

You're ready to use this secret in Microsoft Fabric connections.

For more information about Azure Key Vault secrets, see [secrets in Azure Key Vault](/azure/key-vault/secrets/quick-create-portal#add-a-secret-to-key-vault).

## Use Azure Key Vault reference in connections

Create connections by using an Azure Key Vault reference through the **Manage Connections and Gateways** settings.
(Currently, the get data experience in Microsoft Fabric doesn't support creating connections by authenticating with Azure Key Vault references.)

To create a connection through the **Manage Connections and Gateways** settings:

1. In [fabric.microsoft.com](https://app.fabric.microsoft.com/), select the gear icon in the upper-right corner and go to **Manage Connections and Gateways**.
1. Go to the **Connections** tab and select **New**.
1. Select the **Cloud** tab, enter a connection name, and select any [AKV reference supported connection type](#supported-connectors-and-authentication-types).
1. Provide all connection details and select one of the supported authentication types:
    - Basic (Username/password)
    - Service Principal
    - SAS/PAT token
    - Account Key
1. Open the AKV reference list dialog by selecting the **AKV reference** icon next to the secret or password field.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-icon.png" alt-text="Screenshot showing the use AKV reference icon while creating a new connection.":::

1. Select an existing AKV reference, enter the name of the secret in the key vault, and select **Apply**.

    :::image type="content" source="media/akv-reference/azure-key-vault-reference-list-dialog.png" alt-text="Screenshot showing AKV reference list dialog.":::

1. Use that connection to connect to your data source in Fabric items.

    :::image type="content" source="media/akv-reference/selected-azure-key-vault-reference.png" alt-text="Screenshot showing the selected AKV reference while creating a new connection.":::

## How Azure Key Vault references work

When you configure an Azure Key Vault reference in Fabric, you create a secure pointer to your secret rather than storing the secret itself. Here's how the process works:

**Initial Setup:**
Fabric records only the vault URI, secret name from your Key Vault, and user auth or OAuth2.0 credential for connecting to the Azure Key Vault (AKV). You must grant your user identity **Get** and **List** permissions in the specified AKV. Importantly, the actual secret values are never stored within Fabric.

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

- Azure Key Vault references work with Cloud and on-premises data gateway connections.  
- Virtual network data gateways connections aren’t yet supported.
- Fabric Lineage view isn't available for AKV references.
- You can't create AKV references by using a connection from the **Modern Get Data** pane in Fabric items. Instead, [create connections using AKV references through the Manage Connections and Gateways settings](#use-azure-key-vault-reference-in-connections).
- Azure Key Vault references in Fabric always get the current (latest) version of a secret. Azure Key Vault credential versioning isn't supported.

## Related content

- [Data source management](data-source-management.md)
