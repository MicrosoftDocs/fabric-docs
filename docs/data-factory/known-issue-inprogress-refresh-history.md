---
title: Known issue - In progress tables refresh history
description: A known issue is posted where a customer has issues with refresh history reports in progress for some tables that failed.
author: luitwieler
ms.author: jeluitwi
ms.topic: troubleshooting  
ms.date: 11/15/2023
ms.custom: 
---

# Known issue - In progress refresh history

Users are experiencing an intermittent issue. Refresh history reports in progress for some tables while the dataflow has failed.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric.

**Status:** Active

**Problem area:** Data Factory

## Symptoms

Failed dataflows show in progress refresh history for some tables, while it's not refreshing anymore.

## Solutions and workarounds

Retry to refresh the dataflow again and check the refresh history.
