---
title: Known issue - Pipeline Web activity through on-premises data gateway doesn't support SPN authentication
description: A known issue is posted where pipeline Web activity through on-premises data gateway doesn't support SPN authentication
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/11/2024
ms.custom: known-issue-753
---

# Known issue - Pipeline Web activity through on-premises data gateway doesn't support SPN authentication

You can use **Web** activity in a pipeline. If you use an on-premises data gateway, you can't use service principal name (SPN) authentication for the **Web** activity.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

When trying to connect using SPN authentication, you receive an error message similar to: `Error calling the Endpoint`

## Solutions and workarounds

Until we release a fix, the only way to connect to web activity using SPN authentication is through a cloud gateway.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)