---
title: Known issue - Lineage view edit dataflow button
description: A known issue is posted where a customer gets taken to the Dataflows Gen1 experience when clicking the Edit button from within the Lineage view of a workspace
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.service: datafactory
ms.subservice: dataflows-troubleshooting
ms.date: 06/5/2023
ms.custom: known-issue-???
---

# Known issue - Lineage view edit dataflow button

A known issue is posted where a customer gets taken to the Dataflows Gen1 experience when clicking the Edit button from within the Lineage view of a workspace.

**APPLIES TO:** ✔️ Dataflows Gen2 in Microsoft Fabric

**Status:** Open

**Problem area:** Data Factory

## Symptoms

When opening a Dataflow Gen2 from within the Lineage view of the workspace, clicking the edit button for a Dataflow Gen2 takes you to the Dataflow Gen1 experience where the Output destination entry point and other functionality is not available.

## Solutions and workarounds

Download the Gateway version 3000.174.13 or later.