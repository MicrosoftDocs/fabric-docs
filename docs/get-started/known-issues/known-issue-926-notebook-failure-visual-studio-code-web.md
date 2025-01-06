---
title: Known issue - Notebook failure inside Visual Studio Code for the Web
description: A known issue is posted where a notebook fails inside Visual Studio Code for the Web.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 11/27/2024
ms.custom: known-issue-926
---

# Known issue - Notebook failure inside Visual Studio Code for the Web

You can install the Synapse extension inside Visual Studio Code for the Web (also known as vscode.dev). Due to a recent change from the Jupyter extension, you can't open or run a Fabric notebook inside Visual Studio Code for the Web.

**Status:** Fixed: November 27, 2024

**Product Experience:** Data Engineering

## Symptoms

When you run code in a notebook, you receive an error. The error message is similar to: `Failed to start the Kernel 'Synapse PySpark', Kernel is dead'`.

## Solutions and workarounds

To work around this issue, install the Jupyter extension with a version before 2024.9.1.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
