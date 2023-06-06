---
title: Known issue - Gateway issues with Lakehouse connector
description: A known issue is posted where a customer has issues trying to refresh a dataflow that connects to a Lakehouse using a Gateway
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.service: datafactory
ms.subservice: dataflows-troubleshooting
ms.date: 06/5/2023
ms.custom: known-issue-???
---

# Known issue - Gateway issues with Lakehouse connector

Evaluation and refresh issues when an older Gateway is in use in a Dataflow Gen2 using the Lakehouse connector which could result in authoring or refresh issues.

**APPLIES TO:** ✔️ Dataflows Gen2 in Microsoft Fabric

**Status:** Resolved

**Problem area:** Data Factory

## Symptoms

Some of the errors that could be triggered because of this issue:

* *An exception ocurrred: The given data source kind is not supported. Data source kind: Lakehouse*
* *null Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error

>[!Note]
>Other errors might not be listed here at the time of writing this document.

## Solutions and workarounds

Download the Gateway version 3000.174.13 or later.