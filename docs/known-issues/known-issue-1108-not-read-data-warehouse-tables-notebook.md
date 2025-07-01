---
title: Known issue - Can't read data warehouse tables from a notebook
description: A known issue is posted where you can't read data warehouse tables from a notebook.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/06/2025
ms.custom: known-issue-1108
---

# Known issue - Can't read data warehouse tables from a notebook

You can try to read a data warehouse table from a Spark notebook in Fabric. If you have a `not null` constraint on the table, you receive an error, and the notebook execution fails.

**Status:** Fixed: May 6, 2025

**Product Experience:** Data Warehouse

## Symptoms

When you run a notebook that reads from a data warehouse table, you receive an error. The error message is similar to: `org.apache.spark.sql.delta.DeltaTableFeatureException: Unable to operate on this table because the following table features are enabled in metadata but not listed in protocol: invariants`.

## Solutions and workarounds

To work around the issue, delete a row from and reinsert a row into the impacted table. This deletion enables the invariants feature, and your next notebook execution should run successfully.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
