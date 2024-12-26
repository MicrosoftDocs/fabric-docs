---
title: Known issue - Power BI Copilot can excessively retry in rare error scenarios
description: A known issue is posted where Power BI Copilot can excessively retry in rare error scenarios.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/24/2024
ms.custom: known-issue-949
---

# Known issue - Power BI Copilot can excessively retry in rare error scenarios

There's a rare error scenario in the Power BI Copilot where Copilot infinitely retries an operation and might exhaust your associated capacity. In the worst-case scenario, your capacity becomes exhausted by a long-running, failing, Copilot interaction.

**Status:** Fixed: December 24, 2024

**Product Experience:** Power BI

## Symptoms

You see that the Power BI Copilot operation takes longer than five minutes or you see repeating requests to `/explore/aiclient/chatCompletions` in the network tab.

## Solutions and workarounds

If you experience excessively long Copilot operations, cancel the request or exit the Copilot experience to stop the retries from consuming capacity units (CUs).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
