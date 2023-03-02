---
title: SemPy setup
description: Learn how to set up SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.subservice: data-science
ms.topic: quickstart
ms.date: 02/10/2023
---

# SemPy setup

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

You can use SemPy with Azure Synapse vNext, which comes preinstalled but it may be beneficial to update using *pip* so that you can use latest and greatest.

To start, you need a premium workspace in Azure Synapse vNext portal. Within this workspace, create a new notebook and
add the following line of code to install SemPy from our distribution location:

```
%pip install https://enyaprodstorage.blob.core.windows.net/dist/sempy-0.1.2-py3-none-any.whl
```

The previous example installs *0.1.2* version, which is current at the moment of writing this instruction. [Release history](https://enyaprod.azurewebsites.net/releases.html) has information on SemPy updates.
