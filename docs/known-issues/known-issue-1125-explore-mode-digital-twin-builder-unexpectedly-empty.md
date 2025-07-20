---
title: Known issue - Explore mode within digital twin builder unexpectedly empty
description: A known issue is posted where the explore mode within digital twin builder is unexpectedly empty.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1125
---

# Known issue - Explore mode within digital twin builder unexpectedly empty

Digital twin builder successfully runs all mapping operation. After the operations successfully completed, the explore mode within digital twin builder is empty.

**Status:** Open

**Product Experience:** Real-Time Intelligence

## Symptoms

When you navigate to the **Explore** page, you receive an error. The error is similar to: `There was an error fetching entity instances. Please refresh the page and try again`.

## Solutions and workarounds

Perform a metadata refresh of the SQL analytics endpoint associated with the model lakehouse created as part of the digital twin builder item creation. The name of the lakehouse should be dtdm.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
