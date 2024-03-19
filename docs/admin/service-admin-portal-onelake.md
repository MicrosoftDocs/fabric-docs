---
title: OneLake tenant settings
description: Learn how to configure OneLake tenant settings as the Fabric administrator.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom:
  - tenant-setting
  - ignite-2023
ms.topic: how-to
ms.date: 11/02/2023
LocalizationGroup: Administration
---

# OneLake tenant settings

OneLake tenant settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Users can access data stored in OneLake with apps external to Fabric

Users can access data stored in OneLake with apps external to the Fabric environment, such as custom applications created with Azure Data Lake Storage (ADLS) APIs, OneLake File Explorer, and Databricks. Users can already access data stored in OneLake with apps internal to the Fabric environment, such as Spark, Data Engineering, and Data Warehouse.

To learn more, see [Allow apps running outside of Fabric to access data via OneLake](../onelake/security/fabric-and-onelake-security.md#allow-apps-running-outside-of-fabric-to-access-data-via-onelake).

## Users can sync data in OneLake with the OneLake File Explorer app

Turn on this setting to allow users to use OneLake File Explorer. This app will sync OneLake items to Windows File Explorer, similar to OneDrive.

To learn more, see [OneLake File Explorer](../onelake/onelake-file-explorer.md).

## Related content

* [About tenant settings](tenant-settings-index.md)
