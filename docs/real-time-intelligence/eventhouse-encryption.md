---
title: Data Encryption with Customer-Managed Keys in Fabric Eventhouse
description: Learn more about securing your Eventhouse with customer-managed keys in Microsoft Fabric.
author: bwatts64
ms.author: bwatts
ms.reviewer: 
ms.date: 4/15/2026
ms.topic: concept-article
---

# Data Encryption in Fabric Eventhouse (Preview)

Fabric Eventhouse encrypts all data at rest by default, ensuring that your information is protected through Microsoft-managed keys.

In addition, you can enhance your security posture by using customer-managed keys (CMK), giving you direct control over the encryption keys that protect your data and metadata.

When you enable CMK for a workspace that contains a Fabric Eventhouse, all data in Eventhouse storage are protected using your Azure Key Vault-hosted encryption keys. With customer-managed keys, you can connect your Fabric workspace directly to your own **Azure Key Vault**. You maintain complete control over key creation, access, and rotation, ensuring compliance with your organization's security and governance policies.

> [!IMPORTANT]
> This feature could require the Eventhouse to scale out. This feature is only supported on a minimum of 16 CU Eventhouse.


> [!Note]
> When Fabric Eventhouse identifies that access to a customer-managed key is revoked, it will automatically suspend access to the resource to delete any cached data. Once access to the key is returned, the Eventhouse will be resumed automatically.


To get started configuring CMK for your Fabric workspace, see [Customer-managed keys for Fabric workspaces](../security/workspace-customer-managed-keys.md).

## Limitations

Before enabling CMK for your Fabric Data Warehouse, review the following considerations:

- When enable Eventhouse will scale ot a minimum of 16 virtual cores and could affect CU consumption.

- Queries agains the Fabric Eventhouse are not encrypted with CMK.

## Related content

- [Learn how to configure Customer-Managed Keys for Fabric Workspaces](../security/workspace-customer-managed-keys.md)
- [Azure Key Vault](/azure/key-vault/general/basic-concepts)
