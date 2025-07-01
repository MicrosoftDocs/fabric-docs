---
title: Known issue - Managed private endpoint connection could fail
description: A known issue is posted where a managed private endpoint connection could fail.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/13/2024
ms.custom: known-issue-835
---

# Known issue - Managed private endpoint connection could fail

A managed private endpoint connection for a private link service could fail. The failure occurs due to the inability to allow a list of Fully Qualified Domain Names (FQDNs) as part of the managed private endpoint creation.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

You see a managed private endpoint creation error when trying to create a managed private endpoint from the network security menu in the workspace settings.

## Solutions and workarounds

You can use an alternate method to securely connect using the existing data sources supported currently in Fabric.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
