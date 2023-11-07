---
title: Known issue - Dataflow Gen1 admin switch affects Dataflow Gen2
description: A known issue is posted where a customer has disabled Dataflow Gen1 admin switch and it affects Dataflow Gen2.
author: luitwieler
ms.author: jeluitwi
ms.topic: troubleshooting  
ms.date: 11/06/2023
ms.custom: 
---

# Known issue - Dataflow Gen1 admin switch affects Dataflow Gen2

Users aren't able to use Dataflow Gen2 when Dataflow Gen1 admin switch is disabled.

**APPLIES TO:** ✔️ Dataflow Gen2 in Microsoft Fabric.

**Status:** Active

**Problem area:** Data Factory

## Symptoms

When the Dataflow Gen1 admin switch is disabled, users aren't able to use Dataflow Gen2. When the user tries to create a Dataflow Gen2, the user gets the following error message: Request failed with 401(Unauthorized): Unauthorized.

## Solutions and workarounds

Enable the Dataflow Gen1 admin switch to use Dataflow Gen2. For more information, see [Dataflow Gen1 admin switch](/fabric/admin/service-admin-portal-dataflow)
