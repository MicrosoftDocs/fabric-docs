---
title: SemPy setup
description: Learn how to set up SemPy.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: quickstart
ms.date: 02/10/2023
---

# SemPy setup

[!INCLUDE [preview-note](../includes/preview-note.md)]

You can use SemPy with Azure Synapse vNext, which comes preinstalled but it may be beneficial to update using *pip* so that you can use latest and greatest.

To start, you need a premium workspace in Azure Synapse vNext portal. Within this workspace, create a new notebook and
add the following line of code to install SemPy from our distribution location:

```
%pip install https://enyaprodstorage.blob.core.windows.net/dist/sempy-0.1.2-py3-none-any.whl
```

The previous example installs *0.1.2* version, which is current at the moment of writing this instruction. [Release history](https://enyaprod.azurewebsites.net/releases.html) has information on SemPy updates.
