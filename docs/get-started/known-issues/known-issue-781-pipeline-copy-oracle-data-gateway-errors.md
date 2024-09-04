---
title: Known issue - Pipeline copy to Oracle using on-premises data gateway errors
description: A known issue is posted where pipeline copy to Oracle using on-premises data gateway errors.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/04/2024
ms.custom: known-issue-781
---

# Known issue - Pipeline copy to Oracle using on-premises data gateway errors

You can use the copy activity in a data pipeline to load data into an Oracle database. If you use the on-premises data gateway and an Oracle database as the sink, you might receive an error. Although you receive an error, the pipeline does insert the first batch of rows into the Oracle table.

**Status:** Fixed: September 4, 2024

**Product Experience:** Data Factory

## Symptoms

When running a data pipeline copy activity to an Oracle database, you receive an error. The error message is similar to: `The specified table <schema_name>.<table_name> doesn't exist`.

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
