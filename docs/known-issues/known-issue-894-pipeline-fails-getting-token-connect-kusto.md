---
title: Known issue - Pipeline fails when getting a token to connect to Kusto
description: A known issue is posted where pipeline fails when getting a token to connect to Kusto.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-894
---

# Known issue - Pipeline fails when getting a token to connect to Kusto

You might experience issues while trying to get a token using `mssparkutils.credentials.getToken()` with your cluster URL as the audience when connecting to Kusto using a pipeline.

**Status:** Fixed: May 19, 2025

**Product Experience:** Data Engineering

## Symptoms

You receive a pipeline failure when you try to get the token for Azure Data Explorer.

## Solutions and workarounds

Use `mssparkutils.credentials.getToken("kusto")` instead of `mssparkutils.credentials.getToken(cluster_url)`. The code `kusto` is the supported short code for the Kusto audience in getToken().

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
