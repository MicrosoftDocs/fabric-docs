---
title: Variable library integration with Data pipelines (Preview)
description: Learn about how to use Variable library with data pipelines. 
ms.reviewer: 
ms.author: noelleli
author: n0elleli
ms.topic: conceptual
ms.custom:
ms.date: 03/18/2025
---

# Variable library integration with Data pipelines (Preview) in [!INCLUDE [product-name](../includes/product-name.md)]

This document describes how to use Variable library in your pipelines for Data Factory in Fabric.

# Introduction

The Variable library is a new item type in Microsoft Fabric that allows users to define and manage variables at the workspace level, so they could soon be used across various workspace items, such as data pipelines, notebooks, Shortcut for lakehouse and more. It provides a unified and centralized way to manage configurations, reducing the need for hardcoded values and simplifying your CI/CD processes, making it easier to manage configurations across different environments.

# How to use Variable library with data pipelines







## Known limitations

The following known limitations apply to the integration of Variable library in pipelines in Data Factory in Microsoft Fabric:

- Unique names need to be set for your variable references.
- Connection parameterization is **not** supported with Variable library integrated with data pipelines. 
- Currently, you are unable to view what value has been set for the Variable library variable in the pipeline canvas. 



## Related content

- [CI/CD for pipelines in Data Factory](../datafactory/cicd-pipelines.md)
- [Parameters in pipelines](../datafactory/parameters.md)
- [Introduction to the CI/CD process as part of the ALM cycle in Microsoft Fabric](../cicd/cicd-overview.md?source=recommendations)
