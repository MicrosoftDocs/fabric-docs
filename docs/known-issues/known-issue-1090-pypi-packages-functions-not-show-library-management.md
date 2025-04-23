---
title: Known issue - PyPI packages in User data functions don't show in Library Management
description: A known issue is posted where PyPI packages in User data functions don't show in Library Management.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1090
---

# Known issue - PyPI packages in User data functions don't show in Library Management

You can create a User data function item and add PyPI packages that your function requires in **Library Management**. Even if the PyPI packages are compatible with Python 3.11, the packages might not appear in **Library Management** due to an issue in the list filtering logic for PyPI packages.

**Status:** Open

**Product Experience:** Data Engineering

## Symptoms

After opening **Library Management**, you might see the name of the desired package doesn't appear in the library selection dropdown. Additionally, the version dropdown doesn't appear.

## Solutions and workarounds

At this moment, you can only use alternative packages that provide similar functionality.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
