---
title: Known issue - Failure to scale AAS server or add admins through Azure portal
description: A known issue is posted where there's a failure to scale an AAS server or add admins through Azure portal.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/31/2025
ms.custom: known-issue-1077
---

# Known issue - Failure to scale AAS server or add admins through Azure portal

You can use the Azure portal to scale your Azure Analysis Services (AAS) server up or down. You can also add administrators to the server. When you apply the server admin changes, you receive an error and changes aren't applied.

**Status:** Open

**Product Experience:** Power BI

## Symptoms

You receive an error when making changes to your AAS server on the Azure portal. The error message is similar to: `Failed to scale server`, `Failure scaling analysis services`, or `Error while applying server administrator change to the Azure Analysis Services server`.

## Solutions and workarounds

To work around this issue, you can perform the operation from PowerShell or SQL Server Management Studio.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
