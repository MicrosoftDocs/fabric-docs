---
title: Known issue - Data pipeline connection fails after connection creator role is removed
description: A known issue is posted where data pipeline connection fails after connection creator role is removed.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/07/2025
ms.custom: known-issue-877
---

# Known issue - Data pipeline connection fails after connection creator role is removed

You might face issues with a connection in a data pipeline in a certain scenario. The scenario is that you add yourself to the connection creator role in an on-premises data gateway. You then create a connection in a data pipeline successfully. Someone removes you from the content creator role. When you try to add and test the same connection, the connection fails, and you receive an error.

**Status:** Fixed: April 7, 2025

**Product Experience:** Data Factory

## Symptoms

When trying to add and test a connection in a data pipeline that uses an on-premises data gateway, you receive an error. The error message is similar to: `An exception error occurred: You do not have sufficient permission for this data gateway. Please request permissions from the owner of the gateway.`

## Solutions and workarounds

To avoid this issue, don't revoke the connection creator role.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
