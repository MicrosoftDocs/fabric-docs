---
title: Known issue - Lakehouse ALM operations fail for Git using public APIs in UK South
description: A known issue is posted where lakehouse ALM operations fail for Git using public APIs in UK South.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1035
---

# Known issue - Lakehouse ALM operations fail for Git using public APIs in UK South

You can use public APIs to interact with an application lifecycle management (ALM) connected workspace. The APIs can perform actions such as exporting a lakehouse to Git or using deployment pipelines. If you use these ALM public APIs in the UK South region, you receive an error and the APIs fail.

**Status:** Fixed: April 9, 2025

**Product Experience:** Data Engineering

## Symptoms

The lakehouse ALM public APIs fail with an error. The error message is similar to: `Internal Server error`.

## Solutions and workarounds

The following mitigations are possible:

- Add `OneLake.ReadWrite.All` scope to the user or identity performing the operation. With the proper scope in place, the public APIs work.
- Use the Fabric user interface flows to perform all ALM scenarios.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
