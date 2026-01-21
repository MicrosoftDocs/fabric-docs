---
title: Data Encryption in SQL Database in Fabric
description: Learn about data encryption and customer-managed keys in SQL database in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pivanho
ms.date: 11/17/2025
ms.topic: concept-article
ms.search.form: SQL database security
ms.custom: references_regions
---
# Data encryption in SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

[!INCLUDE [preview-note](../../includes/feature-preview-note.md)]

Microsoft Fabric encrypts all data-at-rest using Microsoft-managed keys. All SQL database data is stored in remote Azure Storage accounts. To comply with encryption-at-rest requirements using Microsoft-managed keys, each Azure Storage account used by the SQL database is configured with [service-side encryption](/azure/storage/common/storage-service-encryption#about-azure-storage-service-side-encryption) enabled. 

With [customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md), you can use your Azure Key Vault keys to add another layer of protection to the data in your Microsoft Fabric workspaces, including all data in SQL database in Microsoft Fabric. A customer-managed key provides greater flexibility, allowing you to manage its rotation, control access, and usage auditing. Customer-managed keys also help organizations meet data governance needs and comply with data protection and encryption standards.

- When a customer-managed key is configured for a workspace in Microsoft Fabric, [transparent data encryption](#how-transparent-data-encryption-works-in-sql-database-in-microsoft-fabric) is automatically enabled for all SQL databases (and `tempdb`) within that workspace using the specified customer-managed key. This process is entirely seamless and requires no manual intervention. 
   - While the encryption process begins automatically for all existing SQL databases, it is not instantaneous; the duration depends on the size of each SQL database, with larger SQL databases requiring more time to complete encryption.
   - After the customer-managed key is configured, any SQL databases created in the workspace will also be encrypted using the customer-managed key. 
- If the customer-managed key is removed, the decryption process is triggered for all SQL databases in the workspace. Like encryption, decryption is also dependent on the size of the SQL database and can take time to complete. Once decrypted, the SQL databases revert to using Microsoft-managed keys for encryption.

## How transparent data encryption works in SQL database in Microsoft Fabric

Transparent data encryption performs real-time encryption and decryption of the database, associated backups, and transaction log files at rest. 

- This process occurs at the page level, meaning each page is decrypted when read into memory and re-encrypted before being written back to disk. 
- Transparent data encryption secures the entire database using a symmetric key known as the Database Encryption Key (DEK). 
- When the database starts up, the encrypted DEK is decrypted and used by the SQL Server database engine to manage encryption and decryption operations. 
- The DEK itself is protected by the transparent data encryption protector, which is a customer-managed asymmetric key—specifically, the customer-managed key configured at the workspace level.

:::image type="content" source="media/encryption/encryption-diagram.svg" alt-text="Diagram of encryption for SQL database in Microsoft Fabric." lightbox="media/encryption/encryption-diagram.png":::

## Backup and restore

Once a SQL database is encrypted with a customer-managed key, any newly generated backups are also encrypted with the same key. 

When the key is changed, old backups of the SQL database are not updated to use the latest key. To restore a backup encrypted with a customer-managed key, make sure that the key material is available in the Azure Key Vault. Therefore, we recommend that customers keep all the old versions of the customer-managed keys in Azure Key Vault, so SQL database backups can be restored.

The SQL database restore process will always honor the customer-managed key workspace setting. The table below outlines various restore scenarios based on the customer-managed key settings and whether the backup is encrypted.

| The backup is... | Customer-managed key workspace setting | Encryption status post-restore |
| ------------- |----------------------------------------| -------|
| Not encrypted | Disabled | SQL database is not encrypted |
| Not encrypted | Enabled  | SQL database is encrypted with customer-managed key|
| Encrypted with customer-managed key | Disabled | SQL database is not encrypted |
| Encrypted with customer-managed key | Enabled | SQL database is encrypted with customer-managed key |
| Encrypted with customer-managed key | Enabled but different customer-managed key | SQL database is encrypted with the new customer-managed key |

## Verify successful customer-managed key

Once you enable customer-managed key encryption in the workspace, the existing database will be encrypted. A new database in a workspace will also be encrypted when customer-managed key enabled. To verify if your database is successfully encrypted, run the following T-SQL query:

```sql
SELECT DB_NAME(database_id) as DatabaseName, * 
FROM sys.dm_database_encryption_keys 
WHERE database_id <> 2;
```

- A database is encrypted if the `encryption_state_desc` field displays `ENCRYPTED` with `ASYMMETRIC_KEY` as the `encryptor_type`. 
- If the state is `ENCRYPTION_IN_PROGRESS`, the `percent_complete` column will indicate the progress of the encryption state change. This will be `0` if there is no state change in progress.
- If not encrypted, a database will not appear in the query results of `sys.dm_database_encryption_keys`.

<a id="inaccessible-customer-managed-key"></a>

## Troubleshoot inaccessible customer-managed key

When a customer-managed key is configured for a workspace in Microsoft Fabric, continuous access to the key is required for the SQL database to stay online. If the SQL database loses access to the key in the Azure Key Vault, in up to 10 minutes the SQL database starts denying all connections and changes its state to Inaccessible. Users will receive a corresponding error message such as "Database `<database ID>.database.fabric.microsoft.com` is not accessible due to Azure Key Vault critical error.".

- If key access is restored within 30 minutes, the SQL database will automatically heal within the next hour. 
- If key access is restored after more than 30 minutes, automatic heal of the SQL database isn't possible. Bringing back the SQL database requires extra steps and can take a significant amount of time depending on the size of the SQL database.

Use the following steps to re-validate the customer-managed key:

1. In your workspace, right-click on the SQL database, or the  `...` context menu. Select **Settings**.
1. Select **Encryption (preview)**.
1. To attempt to revalidate the customer-managed key, select the **Revalidate customer-managed key** button. If the revalidation is successful, restoring access to your SQL database can take some time.

> [!NOTE]
> When you revalidate the key for one SQL database, the key is automatically revalidated for all SQL databases within your workspace.

## Limitations

Current limitations when using customer-managed key for a SQL database in Microsoft Fabric:

- 4,096 bit keys are not supported for SQL Database in Microsoft Fabric. Supported key lengths are 2,048 bits and 3,072 bits.
- The customer-managed key must be an RSA or RSA-HSM asymmetric key.
- Currently, customer-managed key encryption is available in the following regions:
   - US: East US 2, South Central US
   - Asia: Australia East, South East Asia, UAE North
   - Europe: North Europe, West Europe

## Related content

- [Customer-managed keys for Fabric workspaces](../../security/workspace-customer-managed-keys.md)
- [Restore from a backup in SQL database in Microsoft Fabric](restore.md)
