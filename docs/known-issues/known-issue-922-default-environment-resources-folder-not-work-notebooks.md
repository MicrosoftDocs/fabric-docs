---
title: Known issue - The default environment's resources folder doesn't work in notebooks
description: A known issue is posted where the default environment's resources folder doesn't work in notebooks.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/15/2025
ms.custom: known-issue-922
---

# Known issue - The default environment's resources folder doesn't work in notebooks

Each Fabric environment item provides a resources folder. When a notebook attaches to an environment, you can read and write files from and to this folder. When you select an environment as workspace default and the notebook uses the workspace default, the resources folder of the default environment doesn't work.

**Status:** Fixed: April 15, 2025

**Product Experience:** Data Engineering

## Symptoms

You see the environment's resources folder in the notebook's file explorer. However, when you try to read or write files from or to this folder, you receive an error. The error message is similar to `ModuleNotFoundError`.

## Solutions and workarounds

To work around this issue, you can attach a different environment in the notebook or remove the environment from workspace default.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
