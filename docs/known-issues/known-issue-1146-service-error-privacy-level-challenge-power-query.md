---
title: Known issue - Service error on privacy level challenge for power query
description: A known issue is posted where you receive a service error on privacy level challenge for power query.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/16/2025
ms.custom: known-issue-1146
---

# Known issue - Service error on privacy level challenge for power query

You can attempt to save the populated privacy level configuration on a firewall challenge. When you select the **Save** button, you receive an error. This issue primarily impacts dataflows and all other hosts that evaluate power query and render the query editor.

**Status:** Fixed: June 16, 2025

**Product Experience:** Power BI

## Symptoms

You're unable to save the privacy level configuration dialog. You receive an error message with the `UnknownServiceError` error code.

## Solutions and workarounds

As a workaround, you can use one of the below options:

- Enable fast combine in the **Options** > **Dataflow** > **Privacy** menu and retry the operation.
- Use **Manage Connections**, **Get data**, or the admin panel to set the privacy levels in the **Configure** dialog.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)