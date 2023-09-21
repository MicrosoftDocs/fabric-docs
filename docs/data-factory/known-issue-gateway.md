---
title: Known issue - Gateway issues with Lakehouse connector
description: A known issue is posted where a customer has issues trying to refresh a dataflow that connects to a Lakehouse using a Gateway.
author: ptyx507
ms.author: miescobar
ms.topic: troubleshooting  
ms.date: 08/17/2023
ms.custom: 
---

# Known issue - Gateway issues with Lakehouse connector

Evaluation and refresh issues when an older Gateway is in use in a Dataflow Gen2 using the Lakehouse connector, which could result in authoring or refresh issues.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric

**Status:** Resolved

**Problem area:** Data Factory

## Symptoms

Some of the errors that could be triggered because of this issue:

* *An exception occurred: The given data source kind is not supported. Data source kind: Lakehouse*
* *null Error: Couldn't refresh the entity because of an issue with the mashup document MashupException.Error*
* *We cannot convert the value null to type Table*

>[!Note]
>Other errors might not be listed here at the time this article was written.

## Solutions and workarounds

Download the version 3000.182.5 or later of the on-premises data gateway.
