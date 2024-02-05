---
title: Known issue - Reflex item creation fails due to a token creation failure
description: A known issue is posted where creating a reflex item fails due to a token creation failure
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting 
ms.date: 12/15/2023
ms.custom: known-issue-585
---

# Known issue - Reflex item creation fails due to a token creation failure

You can create a reflex trigger from a Power BI report.  The creation can fail because of a token creation failure.

**Status:** Open

**Product Experience:** Data Activator

## Symptoms

When you try to create a reflex trigger, you see an error message similar to: `An internal error occurred while creating your trigger. If this error persists, please contact support, quoting the following information: "There is an error in creating AAD token"`

## Solutions and workarounds

Follow these steps to work around the issue:

1. Remove `&clientSideAuth=0` from the URL in address bar of your browser, and reload your Power BI report.
1. Proceed as normal to create your reflex trigger.

## Related content

- [About known issues](https://support.fabric.microsoft.com/known-issues)
