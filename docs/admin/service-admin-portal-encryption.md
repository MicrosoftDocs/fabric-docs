---
title: Encryption admin setting
description: Learn how to configure the encryption admin settings in Fabric, to enable the workspace customer-managed keys feature.
author: msmimart
ms.author: mimart
ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 05/19/2025
LocalizationGroup: Administration

# Customer intent: As a Microsoft Fabric administrator, I want to configure the encryption admin settings in Fabric, to enable the workspace customer-managed keys feature.
---

# Encryption tenant setting

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Apply customer-managed keys

Customer-managed keys (CMK) are encryption keys that you create, own, and manage in your Azure Key Vault (AKV). By using a CMK, you can supplement [default encryption](../security/security-overview.md#secure-data) with an extra encryption layer. You can use customer-managed keys for greater flexibility to manage access controls or to meet specific regulatory compliance.

### Enable CMK for Fabric workspaces tenant setting

By default, the CMK feature is disabled at the tenant level. This means that workspace administrators cannot enable CMK until the tenant administrator enables the setting. CMK can be enabled and disabled for the workspace while the tenant setting is on. Once the tenant setting is turned off, you can no longer enable CMK for workspaces in that tenant or disable CMK for workspaces that already have CMK turned on in that tenant.

To learn how to set up CMK encryption, see [customer-managed keys for Fabric workspaces](../security/workspace-customer-managed-keys.md).

## Related content

* [About tenant settings](tenant-settings-index.md)
