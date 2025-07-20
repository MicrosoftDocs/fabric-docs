---
title: Known issue - New query replicas in Azure Analysis Services fail to start
description: A known issue is posted where new query replicas in Azure Analysis Services fail to start.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/03/2025
ms.custom: known-issue-1158
---

# Known issue - New query replicas in Azure Analysis Services fail to start

For an Azure Analysis Services (AAS) server, you can typically configure multiple Microsoft Entra users or groups as server administrators. If one of these users becomes invalid (for example, if they leave the organization), the existing read/write replicas continue to operate normally. However, when a new query replica is provisioned, AAS attempts to validate all configured administrators with Microsoft Entra. If AAS encounters an invalid user during this process, the newly created replica fails to start.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Newly created replica servers keep restarting repeatedly.

## Solutions and workarounds

To fix the issue:

1. Open the Azure portal and navigate to the affected Azure Analysis Services server.
1. Open the left menu, and select Settings > Analysis Services Admins.
1. Review the list of configured administrators and remove any invalid or outdated users (for example, users no longer in your organization).
1. Save the changes.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
