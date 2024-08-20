---
title: Known issue - Search strings that include Japanese symbols don't return matches
description: A known issue is posted where you may see unexpected results when the search string contains Japanese symbols.
author: mihart
ms.author: mihart
ms.topic: troubleshooting  
ms.service: powerbi
ms.subservice: pbi-troubleshooting
ms.date: 08/16/2024
ms.custom: known-issue-222
---

# Known issue #222 - Search strings that include Japanese symbols don't return matches

In the Power BI service, you may see unexpected results when the search string contains Japanese symbols. Search strings that include Japanese symbols don't return matching content in the search results.

**APPLIES TO:** Power BI

**Status:** Removed: August 16, 2024

**Problem area:** Consume and View

## Symptoms

When using the global search box in the header of the Power BI service, you may see no results returned if you use Japanese symbols in the search string.

## Solutions and workarounds

As [documented](/power-bi/consumer/end-user-search-sort#limitations), search currently supports only English characters.

## Related content

- [About known issues](/power-bi/troubleshoot/known-issues/power-bi-known-issues)