---
title: Default workspace for SemPy functions
description: Explanation of the default workspace from which SemPy functions read semantic models (Power BI datasets)
author: msakande
ms.author: mopeakande
ms.topic: include
ms.custom:
  - ignite-2023
ms.date: 07/14/2023
---

Your notebook, semantic model (Power BI dataset), and [Lakehouse](/fabric/data-engineering/lakehouse-overview) can be located in the same workspace or in different workspaces. By default, SemPy tries to access your semantic model from:

- the workspace of your Lakehouse, if you've attached a Lakehouse to your notebook.
- the workspace of your notebook, if there's no Lakehouse attached.

If your semantic model isn't located in the default workspace that SemPy tries to access, you must specify the workspace of your semantic model when you call a SemPy method.
