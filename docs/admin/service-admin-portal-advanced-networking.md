---
title: Advanced networking admin settings 
description: Learn how to configure Power BI advanced networking admin settings.
author: paulinbar
ms.author: painbar
ms.reviewer: ''
ms.service: powerbi
ms.subservice: powerbi-admin
ms.custom: tenant-setting
ms.topic: how-to
ms.date: 03/10/2022
LocalizationGroup: Administration
---

# Advanced networking tenant settings

These settings are configured in the tenant settings section of the Admin portal. For information about how to get to and use tenant settings, see [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings).

## Azure Private Link

Increase security by allowing people to use a Private Link to access your Power BI tenant. Someone will need to finish the set-up process in Azure. If that's not you, grant permission to the right person or group by entering their email.

![Screenshot of the Azure Private Link tenant setting.](media/tenant-settings/azure-private-link-tenant-setting.png)

## Block Public Internet Access

For extra security, block access to your Power BI tenant via the public internet. This means people who don't have access to the Private Link won't be able to get in. Keep in mind, turning this on could take 10 to 20 minutes to take effect. 

![Screenshot of the block public internet access tenant setting.](media/tenant-settings/block-public-internet-access-tenant-setting.png)

## Next steps

* [About tenant settings](/power-bi/admin/service-admin-portal-about-tenant-settings)