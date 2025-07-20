---
title: Known issue - Credential update in Google Analytics connections fails with JSON error
description: A known issue is posted where updating credentials in the Google Analytics connections fails with JSON error.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1138
---

# Known issue - Credential update in Google Analytics connections fails with JSON error

Test connections to Google Analytics might fail with an error. This issue happens when you create a new connection to Google Analytics and when you attempt to update the credentials on existing Google Analytics connections. Existing connections that you don't attempt to change remain working alongside their associated item such as semantic models and dataflows.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

When you test a connection to Google Analytics, you receive an error. The error is similar to: `We found an unexpected character in the JSON input`.

## Solutions and workarounds

As a workaround, don't attempt to change currently working existing Google Analytics connections. If you need to create a new connection, you must choose to create the connection attached to an on-premises data gateway, selecting the **Skip Test Connection** option.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
