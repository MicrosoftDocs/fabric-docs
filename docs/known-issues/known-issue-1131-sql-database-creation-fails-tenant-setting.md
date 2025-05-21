---
title: Known issue - SQL database creation fails due to tenant setting
description: A known issue is posted where SQL database creation fails due to tenant setting.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1131
---

# Known issue - SQL database creation fails due to tenant setting

If you don't have the **Users can create fabric items** tenant setting enabled, you can't create an SQL database. It doesn't matter if you enable the **Users can create fabric items** setting under the **Delegate tenant settings** tab in **Capacity Settings** or not.

**Status:** Fixed: May 19, 2025

**Product Experience:** Databases

## Symptoms

When you try to create an SQL database, you receive an error. The error message is similar to: `Fabric tenant setting is not enabled. Visit aka.ms/fabricswitch to learn more`.

## Solutions and workarounds

To work around the issue, enable the **Users can create Fabric items** setting at the tenant level. Alternatively, you can use the SQL database public API to create the database instead of using the service.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
