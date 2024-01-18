---
title: Known issue - 'Get Tenant Settings' API returns default values instead of user configured values
description: A known issue is posted where 'Get Tenant Settings' API returns default values instead of user configured values
author: mihart
ms.author: mihart
ms.topic: troubleshooting
ms.date: 06/28/2023
ms.custom: known-issue-421
---

# Known issue - 'Get Tenant Settings' API returns default values instead of user configured values

​When users call the admin API to retrieve tenant settings, it currently returns default values instead of the user-configured values and security groups. This issue is limited to the API and doesn't affect the functionality of the tenant settings page in the admin portal.

**APPLIES TO:** ✔️ Fabric

**Status:** Fixed: June 28, 2023

**Product Experience:** Administration & Management

## Symptoms

​This bug is currently affecting a large number of customers, resulting in the symptoms to be observed more widely. Due to the API returning default values, the properties and corresponding values obtained through the API may not match what users see in the admin portal. Additionally, the API response doesn't include the security group sections, as the default security group is always empty. Here's an example comparing the expected response with the faulty response:

```sql
Expected Response { "settingName": "AllowServicePrincipalsUseReadAdminAPIs", "title": "Allow service principals to use read-only admin APIs", "enabled": true, "canSpecifySecurityGroups": true, "enabledSecurityGroups": [ { "graphId": "494a15ab-0c40-491d-ab15-xxxxxxxxxxx", "name": "testgroup" } ], "tenantSettingGroup": "Admin API settings" } Faulty Response { "settingName": "AllowServicePrincipalsUseReadAdminAPIs", "title": "Allow service principals to use read-only admin APIs", "enabled": false, "canSpecifySecurityGroups": true, "tenantSettingGroup": "Admin API settings" }
```

## Solutions and workarounds

There's no viable workaround. So, we recommend waiting for the bug to be fixed before using this API.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
