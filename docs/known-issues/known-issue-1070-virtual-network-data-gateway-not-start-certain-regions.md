---
title: Known issue - Virtual network data gateway doesn't start certain regions
description: A known issue is posted where virtual network data gateway doesn't start certain regions.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/21/2025
ms.custom: 'known-issue-1062, references_regions'
---

# Known issue - Virtual network data gateway doesn't start certain regions

You couldn't start your virtual network data gateway in the following regions during the incident period (March 19, 2025 Pacific Time 9:00am - 10:00am):

- Switzerland North
- Texas
- Virginia
- China East 2
- China North 2

This issue was due to a change in the way we authenticate against Cosmos DB, which didn't work for the impacted regions. The incident is currently mitigated with the change rolled back.

**Status:** Fixed: March 21, 2025

**Product Experience:** Power BI

## Symptoms

You couldn't start your virtual network data gateway in the following regions during the incident period (March 19, 2025 Pacific Time 9:00am - 10:00am):

- Switzerland North
- Texas
- Virginia
- China East 2
- China North 2

## Solutions and workarounds

The incident is currently mitigated with the change rolled back.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
