---
title: Known issue - Power Query template has extra queries from output destination
description: A known issue is posted where a customer tries to create a new Microsoft Fabric Data Factory Dataflow from a template that was created with output destination logic
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.date: 06/05/2023
ms.custom: known-issue-???
---

# Known issue - Power Query template has extra queries from output destination

When exporting a Power Query template from a dataflow with output destination logic, the template will contain logic specific to the output destination from the dataflow and the queries related to the output destination logic will no longer be hidden.

**APPLIES TO:** ✔️ Dataflows Gen2 in Microsoft Fabric

**Status:** Open

**Problem area:** Authoring a Dataflow

## Symptoms

when you import a Power Query template, you might notice queries that were not originally showing in your Dataflow with the prefixes **DestinationForWriteToDatabaseTableFrom**, **TransformForOutputToDatabase** and **WriteToDatabaseTableFrom**.

## Solutions and workarounds

You can try two options to work around this issue:

1. After importing the template, delete the queries that start with the following prefixes:  

* **DestinationForWriteToDatabaseTableFrom** 
* *TransformForOutputToDatabase**
* **WriteToDatabaseTableFrom**

2. Go back to your original dataflow, remove the output destination definition, and export a new template without the output destination definition.