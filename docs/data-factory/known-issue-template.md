---
title: Known issue - Power Query template has extra queries from output destination
description: A known issue is posted where a customer tries to create a new Microsoft Fabric Data Factory dataflow from a template that was created with output destination logic.
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.date: 07/31/2023
ms.custom: 
---

# Known issue - Power Query template has extra queries from output destination

When importing a Power Query template from a dataflow with output destination logic, the template contains logic specific to the output destination from the dataflow and the queries related to the output destination logic will no longer be hidden in the new dataflow.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric

**Status:** Resolved

**Problem area:** Authoring a dataflow

## Symptoms

When you import a Power Query template, you might notice queries that weren't originally showing in your dataflow with the prefixes **DestinationForWriteToDatabaseTableFrom**, **TransformForOutputToDatabase** and **WriteToDatabaseTableFrom**.

## Solutions and workarounds

You can try two options to work around this issue:

* After importing the template, delete the queries that start with the following prefixes:  

    * **DestinationForWriteToDatabaseTableFrom** 
    * **TransformForOutputToDatabase**
    * **WriteToDatabaseTableFrom**

* Go back to your original dataflow, remove the output destination definition, and export a new template without the output destination definition.