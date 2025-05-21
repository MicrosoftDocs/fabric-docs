---
title: Known issue - Multiple installations of on-premises data gateway causes pipelines to fail
description: A known issue is posted where performing multiple installations of on-premises data gateway causes pipelines to fail.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 05/09/2025
ms.custom: known-issue-795
---

# Known issue - Multiple installations of on-premises data gateway causes pipelines to fail

You might face an issue with Data Factory pipelines when performing multiple installations on the on-premises data gateway. The issue occurs when you install the on-premises data gateway that supports pipelines, and then downgrade the on-premises data gateway version to a version that doesn't support pipelines. Finally, you upgrade the on-premises data gateway version to support pipelines. You then receive an error when you run a Data Factory pipeline using the on-premises data gateway.

**Status:** Fixed: May 9, 2025

**Product Experience:** Data Factory

## Symptoms

You receive an error during a pipeline run. The error message is similar to: `Please check your network connectivity to ensure your on-premises data gateway can access xx.frontend.clouddatahub.net`.

## Solutions and workarounds

To solve the issue, uninstall and reinstall the on-premises data gateway.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
