---
title: Known issue - Environment Git integration imports for libraries don't work
description: A known issue is posted where environment Git integration imports for libraries don't work.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/19/2025
ms.custom: known-issue-1025
---

# Known issue - Environment Git integration imports for libraries don't work

The Git import and sync functionality for libraries in environments don't work as expected. You can't import public or custom libraries into an environment from a Git branch.

**Status:** Fixed: May 19, 2025

**Product Experience:** Data Engineering

## Symptoms

You create a workspace and environment that contains public and custom libraries. You connect that workspace to a Git repo. When you try to connect a new workspace to the Git repo, the environment gets created without the libraries.

## Solutions and workarounds

As a temporary workaround, you can use [deployment pipelines to copy the environment](/fabric/data-engineering/environment-git-and-deployment-pipeline#deployment-pipeline-for-environment) between workspaces.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
