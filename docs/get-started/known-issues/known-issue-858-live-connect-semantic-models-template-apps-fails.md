---
title: Known issue - Live connection to semantic models created by template apps fails
description: A known issue is posted where live connection to semantic models created by template apps fails.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 10/15/2024
ms.custom: known-issue-858
---

# Known issue - Live connection to semantic models created by template apps fails

You can create a semantic model using a template app. When you try to connect to the semantic model using live connection mode, the connection fails and you see an error.

**Status:** Fixed: October 15, 2024

**Product Experience:** Power BI

## Symptoms

When you use live connection mode to connect to the semantic model, the connection fails and you receive an error. The error message is similar to: `We couldn’t connect to your model in the Power BI Service. The dataset may have been deleted, renamed, moved, or it is possible you don’t have permission to access it.` The error message is generic, so the known issue only applies when the target of the live connection is a semantic model created by a template app. The error occurs because the template app was published without the appropriate connection configuration.

## Solutions and workarounds

To work around this issue, you can inform the publisher of the template app to enable the setting **Connect to datasets using external model authoring tools** and republish the app. The [setting](/power-bi/connect-data/service-template-apps-create#define-the-properties-of-the-template-app) allows users to use the Public XML/A Endpoint.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
