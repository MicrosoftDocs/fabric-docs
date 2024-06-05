---
title: Known issue - Shortcuts to a firewall-enabled ADLS stop working if lakehouse is shared
description: A known issue is posted where shortcuts to a firewall-enabled ADLS stop working if lakehouse is shared.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/23/2024
ms.custom: known-issue-724
---

# Known issue - Shortcuts to a firewall-enabled ADLS stop working if lakehouse is shared

You have a lakehouse that contains an Azure Data Lake Storage (ADLS) Gen2 shortcut, where the ADLS Gen2 storage account is protected by a firewall. You share the lakehouse with a viewer or user outside of the workspace, and user can't access the shortcut. Also, no other users can access the shortcut.

**Status:** Open

**Product Experience:** OneLake

## Symptoms

You have a lakehouse that contains an ADLS Gen2 shortcut, where the ADLS Gen2 storage account is protected by a firewall. You share the lakehouse with a user outside of the workspace. Then, the shortcut that worked previously now fails.

## Solutions and workarounds

Don't share the lakehouse with viewers or users outside of the workspace.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
