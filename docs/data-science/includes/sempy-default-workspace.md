---
title: Default workspace for SemPy functions
description: Explanation of the default workspace from which SemPy functions read semantic models (Power BI datasets)
author: s-polly
ms.author: scottpolly
ms.topic: include
ms.custom:
ms.date: 06/03/2024
---

Your notebook, Power BI dataset semantic model, and [lakehouse](/fabric/data-engineering/lakehouse-overview) can be located in the same workspace or in different workspaces. By default, SemPy tries to access your semantic model from:

- The workspace of your lakehouse, if you attached a lakehouse to your notebook.
- The workspace of your notebook, if there's no lakehouse attached.

If your semantic model isn't located in either of these workspaces, you must specify the workspace of your semantic model when you call a SemPy method.
