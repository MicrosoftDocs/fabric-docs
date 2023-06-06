---
title: Known issue - Staging artifacts aren't available or are misconfigured
description: A known issue is posted where a customer is able to see and interact with Staging artifacts such as the Staging Lakehouse and Warehouse.
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.date: 06/05/2023
ms.custom: 
---

# Known issue - Staging artifacts aren't hidden and can be modified by the end-user

In a new workspace, when an end-user first launches a Dataflow Gen2, a set of staging artifacts, such as a new Lakehouse and a new Data Warehouse, are automatically created for the whole workspace. These artifacts can be leveraged for a set of functionalities available for Dataflow Gen2.

A user is able to see these staging artifacts in the workspace list and lineage as well as being able to interact with these artifacts.

If a user deletes or modifies any of these staging artifacts, the workspace can be set in a state that won't be able to leverage these artifacts because of misconfiguration.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric

**Status:** Open

**Problem area:** Data Factory

## Symptoms

When trying to refresh a Dataflow gen2 and the error refers to:

* *null Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error: PowerBIEntityNotFound: PowerBIEntityNotFound*

* After deleting the staging artifacts, you're unable to get them back.

## Solutions and workarounds

Recreate your Dataflow Gen2 solution in a new workspace.