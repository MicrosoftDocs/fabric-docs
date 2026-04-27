---
title: OneLake tenant settings
description: Learn how to configure OneLake tenant settings as the Fabric administrator.
author: msmimart
ms.author: mimart
ms.custom:
  - tenant-setting
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# OneLake tenant settings

OneLake tenant settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Users can access data stored in OneLake with apps external to Fabric

Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse.

To learn more, see [Allow apps running outside of Fabric to access data via OneLake](../onelake/security/fabric-onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake).

## Users can sync data in OneLake with the OneLake File Explorer app

Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive.

To learn more, see [OneLake File Explorer](../onelake/onelake-file-explorer.md).

## Use short-lived user-delegated SAS tokens

This setting allows users to request OneLake user delegation keys for this tenant, which are used to sign OneLake SAS tokens.  OneLake SAS tokens enable applications to access data in OneLake through short-lived SAS tokens, based on a Microsoft Fabric user's Entra identity. These token's permissions can be further limited to provide least privileged access and cannot exceed a lifetime of one hour. This setting allows users to request OneLake user delegation keys for this tenant. 

To learn more, see [OneLake shared access signatures](../onelake/onelake-shared-access-signature-overview.md).

## Authenticate with OneLake user-delegated SAS tokens

Allow applications to authenticate using a OneLake SAS token. Fabric users can create OneLake SAS by requesting a user delegation key. The tenant setting, Use short-lived user delegated SAS tokens, must be turned on to generate user delegation keys. The lifetimes of the user delegation keys and SAS tokens cannot exceed one hour. This setting is delegated to workspace admins by default, allowing them to override the default tenant setting. 

To learn more, see [OneLake shared access signatures](../onelake/onelake-shared-access-signature-overview.md).

## Include end-user identifiers in OneLake diagnostic logs

Control whether OneLake diagnostic logs capture end user identifiable information (EUII), such as email addresses and IP addresses. When enabled, these fields are recorded to support diagnostics, investigations, and usage analysis across your tenant. When disabled, these fields are redacted from new events.

To learn more, see [OneLake diagnostics](../onelake/onelake-diagnostics-overview.md).

## Related content

* [About tenant settings](tenant-settings-index.md)
