---
title: Known issue - Not able to add Lookup activity output to Body of Office 365 activity
description: A known issue is posted where Not able to add Lookup activity output to Body of Office 365 activity
author: mihart
ms.author: anirmale
ms.topic: troubleshooting 
ms.date: 07/20/2023
ms.custom: known-issue-458
---

# Known issue - Not able to add Lookup activity output to Body of Office 365 activity

Currently there's a bug while adding output of Lookup activity as a dynamic content to the body of Office 365 activity, the Office 365 activity hangs indefinitely.

**Status:** Open

**Product Experience:** Data Factory

## Symptoms

Office 365 activity hangs indefinitely when output of Lookup activity is added as a dynamic content to the body of Office 365 activity

## Solutions and workarounds

Wrap the output of the lookup activity into a string, For Example @string(activity('Lookup1').output.firstRow)

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
