---
title: Known issue - Write to shortcut destination using workspace identity fails
description: A known issue is posted when you write to shortcut destination using workspace identity fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/31/2024
ms.custom: known-issue-873
---

# Known issue - Write to shortcut destination using workspace identity fails

You can create a OneLake Azure Data Lake Storage (ADLS) Gen2 shortcut inside a Fabric lakehouse. You can set the authentication method to use a workspace identity. In the scenario where you use a workspace identity, writing to the shortcut destination fails. Reading successfully works.

**Status:** Fixed: October 31, 2024

**Product Experience:** OneLake

## Symptoms

You can't write to ADLS Gen2 using a shortcut that uses a workspace identity to authenticate. For example, when you write to the destination using a Spark notebook, you receive an error. The error message is similar to: "SparkException: [TASK_WRITE_FAILED] Task failed while writing rows to ..."

## Solutions and workarounds

No workarounds at this time. This article will be updated when the fix is released.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
