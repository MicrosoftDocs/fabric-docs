---
title: Known issue - Data warehouse exports using deployment pipelines or git fail
description: A known issue is posted where data warehouse exports using deployment pipelines or git fail.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 09/23/2024
ms.custom: known-issue-842
---

# Known issue - Data warehouse exports using deployment pipelines or git fail

You might have a data warehouse that you use in a deployment pipeline or store in a Git repository. When you run the deployment pipelines or update the Git repository, you might receive an error.

**Status:** Open

**Product Experience:** Data Warehouse

## Symptoms

During the pipeline run or Git update, you might see an error. The error message is similar to: `Index was outside the bounds of the array`.

## Solutions and workarounds

Try running the pipeline again, as the issue appears intermittently.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
