---
title: Known issue - Staging items aren't available or are misconfigured
description: A known issue is posted where a customer is able to see and interact with Staging items such as the Staging Lakehouse and Warehouse.
author: Luitwieler
ms.author: jeluitwi
ms.topic: troubleshooting
ms.date: 11/15/2023
ms.custom:
  - ignite-2023
---

# Known issue - Staging items aren't hidden and can be modified by the end-user

In a new workspace, when an end-user first launches a Dataflow Gen2, a set of staging items, such as a new Lakehouse and a new Data Warehouse, are automatically created for the whole workspace. These items can be used for a set of functionalities available for Dataflow Gen2.

A user is able to see these staging items in the workspace list and lineage and being able to interact with these items.

If a user deletes or modifies any of these staging items, the workspace can be set in a state that won't be able to use these items because of misconfiguration.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric

**Status:** Closed

**Problem area:** Data Factory

## Symptoms

When trying to refresh a Dataflow gen2 and the error refers to:

* *null Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: PowerBIEntityNotFound: PowerBIEntityNotFound*

After deleting the staging items, you're unable to get them back.

## Solutions and workarounds

Recreate your Dataflow Gen2 solution in a new workspace.
