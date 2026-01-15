---
title: Data Encryption with Customer-Managed Keys in Fabric Data Warehouse
description: Learn more about securing your warehouse with customer-managed keys in Microsoft Fabric.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: fresantos
ms.date: 10/15/2025
ms.topic: concept-article
---

# Data Encryption in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

Fabric Data Warehouse encrypts all data at rest by default, ensuring that your information is protected through Microsoft-managed keys.

In addition, you can enhance your security posture by using customer-managed keys (CMK), giving you direct control over the encryption keys that protect your data and metadata.

When you enable CMK for a workspace that contains a Fabric Data Warehouse, both OneLake data and warehouse metadata are protected using your Azure Key Vault-hosted encryption keys. With customer-managed keys, you can connect your Fabric workspace directly to your own **Azure Key Vault**. You maintain complete control over key creation, access, and rotation, ensuring compliance with your organization's security and governance policies.

To get started configuring CMK for your Fabric workspace, see [Customer-managed keys for Fabric workspaces](../security/workspace-customer-managed-keys.md).

## How data encryption works in Fabric Data Warehouse

Fabric Data Warehouse follows a multi-layered encryption model to ensure your data remains protected at rest and transient in use.

:::image type="content" source="media/encryption/encryption-diagram.svg" alt-text="Diagram of the layers of encryption with Fabric Data Warehouse with customer-managed keys (C M K)." lightbox="media/encryption/encryption-diagram.png":::

**SQL Frontend:** Encrypts metadata (tables, views, functions, stored procedures).

**Backend Compute Pool:** Uses ephemeral caches; no data is left at rest.

**OneLake:** All persisted data is encrypted.

### SQL front-end layer encryption

When CMK is enabled for the workspace, Fabric Data Warehouse also uses your customer-managed key to encrypt metadata such as table definitions, stored procedures, functions, and schema information.

This ensures that both your data in OneLake and personal data-bearing metadata in the warehouse are encrypted with your own key.

### Backend compute pool layer encryption

Fabric's compute backend processes queries in an ephemeral, cache-based environment. No data is ever left at rest in these caches. Because Fabric Warehouse evicts all backend cache content after use, transient data never persists beyond the session lifetime.

Because of their short-lived nature, backend caches are only encrypted with Microsoft-managed keys and are not subject to encryption by CMK, for performance reasons. Backend caches are automatically cleared and regenerated as part of normal compute operations.

### OneLake layer encryption

All data stored in OneLake is encrypted at rest using Microsoft-managed keys by default.

When CMK is enabled, your customer-managed key (stored in Azure Key Vault) is used to encrypt the **data encryption keys (DEKs)**, providing an additional envelope of protection. You maintain control over key rotation, access policies, and auditing.

> [!IMPORTANT]
> In CMK-enabled workspaces, all OneLake data is encrypted using your customer-managed keys.

## Limitations

Before enabling CMK for your Fabric Data Warehouse, review the following considerations:

- Key propagation delay: When a key is rotated, updated, or replaced in Azure Key Vault, there can be a propagation delay before Fabric's SQL layer. In certain conditions, this delay can take up to 20 minutes before SQL connections are re-established with the new key.

- Backend caching: Data processed by Fabric's backend compute pool is not encrypted with CMK at rest due to its short-lived, in-memory nature. Fabric automatically evicts cached data after each use.

- Service availability during key revocation: If the CMK becomes inaccessible or revoked, read and write operations in the workspace fail until access to the key is restored.

- DMV support: Since the CMK configuration is established and configured at workspace level, you cannot use `sys.dm_database_encryption_keys` to view the encryption status of the database; that happens exclusively at Workspace Level.

- Firewall restrictions: CMK is not supported when the Azure Key Vault firewall is enabled.

- Queries in the Fabric portal query editor Object Explorer are not encrypted with CMK.

## Related content

- [Learn how to configure Customer-Managed Keys for Fabric Workspaces](../security/workspace-customer-managed-keys.md)
- [Warehouse Security](security.md)
- [Azure Key Vault](/azure/key-vault/general/basic-concepts)
