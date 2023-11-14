---
title: Known issue - Gateway Refreshes longer than an hour fail
description: A known issue is posted where a refresh taking longer than an hour fails with  "InvalidConnectionCredentials" or "AccessUnauthorized" error reasons.
author: nikkiwaghani
ms.author: nikkiwaghani
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom:
  - ignite-2023
---

# Known issue - Gateway refreshes longer than an hour fail

A known issue is posted where a refresh taking longer than an hour fails with  "InvalidConnectionCredentials" or "AccessUnauthorized" error reasons.

**APPLIES TO:**
✔️ Dataflow Gen2 in Microsoft Fabric
✔️ On-premises data gateway in Microsoft Fabric
✔️ VNet data gateway in Microsoft Fabric

**Status:** Open

**Problem area:** Data Factory

## Symptoms

When you're using OAuth2 credentials, the gateway currently doesn't support refreshing tokens automatically when access tokens expire (one hour after the refresh started). If you get the errors "InvalidConnectionCredentials" or "AccessUnauthorized" when accessing cloud data sources using OAuth2 credentials even though the credentials have been updated recently, you might be hitting this error. This limitation for long running refreshes exists for both VNet gateways and on-premises data gateways.

## Solutions and workarounds

Shorten queries to run in less than an hour.
