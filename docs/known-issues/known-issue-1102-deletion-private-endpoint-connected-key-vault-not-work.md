---
title: Known issue - Deletion of managed private endpoint connected to Key Vault doesn't work
description: A known issue is posted where the deletion of managed private endpoint connected to Key Vault doesn't work.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 07/16/2025
ms.custom: known-issue-1102
---

# Known issue - Deletion of managed private endpoint connected to Key Vault doesn't work

When you delete your Fabric workspace, the managed virtual networks (VNets) and their associated managed private endpoints (MPEs) for Key Vault resources remain undeleted if connected to a locked Key Vault. You can't delete the MPEs until a Key Vault administrator removes the delete lock.

**Status:** Fixed: July 16, 2025

**Product Experience:** Data Engineering

## Symptoms

If you face this issue, you see activation failures and connection errors when you attempt to connect to these resources. Additionally, you see errors on your Key Vault connections in the Managed Private Endpoints connections list. The Managed Private Endpoints connections list in within the network security section of workspace settings.

## Solutions and workarounds

You must disable delete locks on your Key Vault resources to avoid running into this issue.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
