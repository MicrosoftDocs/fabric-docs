---
title: Known issue - Admin monitoring semantic model refresh fails and credentials expire
description: A known issue is posted where the admin monitoring semantic model refresh fails and credentials expire
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting
ms.date: 01/12/2024
ms.custom:
  - known-issue-483
  - ignite-2023
---

# Known issue - Admin monitoring semantic model refresh fails and credentials expire

In some workspaces, the credentials for the admin monitoring workspace semantic model expire, which shouldn't happen.  As a result, the semantic model refresh fails, and the **Feature Usage and Adoption** report doesn't work.

**Status:** Fixed: January 12, 2024

**Product Experience:** Administration & Management

## Symptoms

In the admin monitoring workspace, you receive refresh failures. Although the semantic model refreshed in the past, now the semantic model refresh fails with the error: **Data source error: The credentials provided for the data source are invalid**.

## Solutions and workarounds

To fix the semantic model refresh, reinitialize the admin monitoring workspace.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
