---
title: Advanced networking admin settings
description: Learn how to configure advanced networking admin settings in Fabric.
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

# Advanced networking tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](tenant-settings-index.md).

## Azure Private Link

Increase security by allowing people to use a [Private Link](/azure/private-link) to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email.

To learn how to set up Private Link, see [Private endpoints for secure access to Power BI](/power-bi/enterprise/service-security-private-links).

## Block Public Internet Access

For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. Keep in mind, turning this on could take 10 to 20 minutes to take effect.

To learn more, see [Private endpoints for secure access to Power BI](/power-bi/enterprise/service-security-private-links).

## Related content

* [About tenant settings](tenant-settings-index.md)
