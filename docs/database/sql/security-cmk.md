---
title: "Customer-managed keys in SQL database in Microsoft Fabric"
description: Learn about Customer-managed keys in SQL database in Microsoft Fabric.
author: pietervanhove
ms.author: pivanho
ms.reviewer: wiassaf
ms.date: 10/13/2025
ms.topic: conceptual
ms.search.form: SQL database security
---
# Customer-managed keys in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

Microsoft Fabric encrypts all data-at-rest using Microsoft managed keys. With [customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md), you can use your Azure Key Vault keys to add another layer of protection to the data in your Microsoft Fabric workspaces - including all data in SQL database in Microsoft Fabric. A customer-managed key provides greater flexibility, allowing you to manage its rotation, control access, and usage auditing. It also helps organizations meet data governance needs and comply with data protection and encryption standards.

When a customer-managed key is configured for a workspace in Microsoft Fabric, [Transparent Data Encryption (TDE)](https://learn.microsoft.com/en-us/azure/azure-sql/database/transparent-data-encryption-byok-overview?view=azuresql&tabs=azurekeyvault%2Cazurekeyvaultrequirements%2Cazurekeyvaultrecommendations) is automatically enabled for all SQL databases within that workspace using the specified customer-managed key. This process is entirely seamless and requires no manual intervention. While the encryption process begins automatically for all existing SQL databases, it is not instantaneous; the duration depends on the size of each SQL database, with larger SQL databases requiring more time to complete encryption. Any SQL databases created after the customer-managed key is configured will also be encrypted using the customer-managed key. 

If the customer-managed key is removed, the decryption process is triggered for all SQL databases in the workspace. Like encryption, decryption is also dependent on the size of the SQL database and may take time to complete. Once decrypted, the SQL databases will revert to using Microsoft-managed keys for encryption.

[!INCLUDE [preview-note](../../security/includes/feature-preview-note.md)]

## Backup and Restore
Once a SQL database is encrypted with a customer-managed key, any newly generated backups are also encrypted with the same key. When the key is changed, old backups of the SQL database are not updated to use the latest key. To restore a backup encrypted with a customer-managed key, make sure that the key material is available in the Azure Key Vault. Therefore, we recommend that customers keep all the old versions of the customer-managed keys in Azure Key Vault, so SQL database backups can be restored.

The SQL database restore process will always honor the customer-managed key workspace setting. The table below outlines various restore scenarios based on the customer-managed key settings and whether the backup is encrypted.

| The backup is...  | Customer-managed key workspace setting | PITR |
| ------------- |----------------------------------------| -------|
| Not encrypted | Disabled | SQL database is not encrypted |
| Not encrypted | Enabled  | SQL database is encrypted with customer-managed key|
| Encrypted with customer-managed key | Disabled | SQL database is not encrypted |
| Encrypted with customer-managed key | Enabled | SQL database is encrypted with customer-managed key |
| Encrypted with customer-managed key | Enabled but different customer-managed key | SQL database is encrypted with the new customer-managed key |

## Inaccessible customer-managed key
When a customer-managed key is configured for a workspace in Microsoft Fabric, continuous access to the key is required for the SQL database to stay online. If the SQL database loses access to the key in the Azure Key Vault, in up to 10 minutes the SQL database starts denying all connections with the corresponding error message and changes its state to Inaccessible. 

If key access is restored within 30 minutes, the SQL database will auto heal within the next hour. If key access is restored after more than 30 minutes, auto heal of the SQL database isn't possible. Bringing back the SQL database requires extra steps and can take a significant amount of time depending on the size of the SQL database. 

Follow the steps below to revalidate the customer-managed key:

1. In your workspace, right-click on the SQL database, or the  `...` context menu. Select **Settings**.
2. Click **Encryption (preview)**
3. To attempt to revalidate the customer-managed key, click the **Revalidate customer-managed key** button. If the revalitdation is successful, restoring access to your SQL database may take some time.

> [!NOTE]
> When you revalidate the key for one SQL database, the key is automatically revalidated for all SQL databases within your workspace.

## Limitations
Current limitations when using customer-managed key for a SQL database in Microsoft Fabric:

- 4,096 bit keys are not supported for SQL Database in Microsoft Fabric. Supported key lengths are 2,048 bits and 3,072 bits.
- The customer-managed key must be an RSA or RSA-HSM asymmetric key.
- Auto key rotation is currently not supported.

## Related content

- [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md)
- [Restore from a backup in SQL database in Microsoft Fabric](restore.md)
