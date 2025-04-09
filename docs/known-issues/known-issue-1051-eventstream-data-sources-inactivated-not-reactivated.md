---
title: Known issue - Eventstream data sources might be inactivated and can't be reactivated
description: A known issue is posted where Eventstream data sources might be inactivated and can't be reactivated.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/15/2025
ms.custom: known-issue-1051
---

# Known issue -  Eventstream data sources might be inactivated and can't be reactivated

In Eventstream, some data sources require cloud connections to be configured the connections in **Manage connections and gateways**. If you lost permission to the connection or the connection was deleted, the associated data source might be inactivated. You can't reactivate the data source.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

You see some data sources are marked as inactive and can't be reactivated. The data sources have cloud connections that were configured in **Manage connections and gateways**.

## Solutions and workarounds

You can work around this issue by creating a new cloud connection with the previous credentials in **Manage connections and gateways**. Then, update the data source to use the new connection.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
