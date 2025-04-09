---
title: Known issue - Dataflow Gen2 refresh fails with type mismatch error
description: A known issue is posted where Dataflow Gen2 refresh fails with type mismatch error.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/08/2025
ms.custom: known-issue-1083
---

# Known issue - Dataflow Gen2 refresh fails with type mismatch error

Your Dataflow Gen2 dataflow doesn't refresh correctly. The refresh fails with a type mismatch error. Dataflow Gen2 with CI/CD dataflows work without failure.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

Your dataflow refresh fails with an error. The error message is similar to: `We can't update the table. The type of column ‘X’ doesn't match the type of the column in the table.`

## Solutions and workarounds

To fix your refresh, you must follow these steps:

1. [Export the template](/power-query/power-query-template#export-a-template) of the failed dataflow
1. Recreate the dataflow as a new Dataflow Gen2 with CI/CD
1. [Import the template file](/power-query/power-query-template#import-a-template) to the new dataflow
1. Reset the output destinations

This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
