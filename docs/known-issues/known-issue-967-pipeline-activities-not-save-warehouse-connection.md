---
title: Known issue - Pipeline activities don't save if their data warehouse connection is changed
description: A known issue is posted where pipeline activities don't save if their data warehouse connection is changed.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 12/10/2024
ms.custom: known-issue-967
---

# Known issue - Pipeline activities don't save if their data warehouse connection is changed

In a pipeline, you can add a stored procedure or script activity that uses a data warehouse connection. If you change the data warehouse connection to point to a new data warehouse connection in the activity, you can't save the connection in the activity.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

In the pipeline, the stored procedure or script activity changes doesn't persist after their data warehouse connection is updated.

## Solutions and workarounds

Delete and recreate the stored procedure or script activity using the new data warehouse connection.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
