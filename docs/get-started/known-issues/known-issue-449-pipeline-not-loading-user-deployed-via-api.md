---
title: Known issue - pipeline isn't loading if user deployed with update app via public API
description: A known issue is posted where the pipeline isn't loading if a user deploys it with an update app via public API
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 08/24/2023
ms.custom: known-issue-449
---

# Known issue - pipeline not loading if user deployed with update app via public API

When the pipeline is deployed via public API with the 'update app' option (/rest/api/power-bi/pipelines/deploy-all#pipelineupdateappsettings), opening the pipeline page gets stuck on loading.

**Status:** Fixed: August 24, 2023

**Product Experience:** Administration & Management

## Symptoms

The pipeline page gets stuck on loading.

## Solutions and workarounds

The user can update the pipeline via public APIs: /rest/api/power-bi/pipelines.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
