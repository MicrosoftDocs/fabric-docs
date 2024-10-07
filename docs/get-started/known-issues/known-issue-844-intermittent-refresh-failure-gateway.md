---
title: Known issue - Intermittent refresh failure through on-premises data gateway
description: A known issue is posted where you see an intermittent refresh failure through the on-premises data gateway.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/25/2024
ms.custom: known-issue-844
---

# Known issue - Intermittent refresh failure through on-premises data gateway

You might experience intermittent refresh failures for semantic models and dataflows through the on-premises data gateway. Failures happen regardless of how the refresh was triggered, whether scheduled, manually, or over the REST API.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You see a gateway-bound refresh fail intermittently with the error `AdoNetProviderOpenConnectionTimeoutError`. Impacted hosts include Power BI semantic models and dataflows. The error occurs when the refresh is scheduled, manual, and via the API.

## Solutions and workarounds

As a workaround, you can try to reboot your on-premises data gateway server or upgrade the server to the latest version.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
