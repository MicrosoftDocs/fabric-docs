---
title: Known issue - Gateway Refreshes longer than an hour fail
description: A known issue is posted where a refresh taking longer than an hour fails with  "InvalidConnectionCredentials" or "AccessUnauthorized".
author: nikkiwaghani
ms.author: nikkiwaghani
ms.topic: troubleshooting  
ms.date: 09/11/2023
ms.custom: 
---

# Known issue - Gateway Refreshes longer than an hour fail

A known issue is posted where a refresh taking longer than an hour fails with  "InvalidConnectionCredentials" or "AccessUnauthorized".

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric
✔️ On-presmises data gateway in Microsoft Fabric
✔️ VNET data gateway in Microsoft Fabric

**Status:** Open

**Problem area:** Data Factory

## Symptoms

When using OAuth2 credentials, the gateway currently doesn't support refreshing tokens automatically when access tokens expire (one hour after the refresh started). If you get the errors "InvalidConnectionCredentials" or "AccessUnauthorized" when accessing cloud data sources using OAuth2 credentials even though the credentials have been updated recently, you may be hitting this error. This limitation for long running refreshes exists for both VNET gateways and on-premises data gateways.

## Solutions and workarounds

Shorten queries to run in less than an hour.