---
title: Known issue - Workspace identity tagged as preview for ADLS Gen2 connections
description: A known issue is posted where workspace identities tagged as preview for ADLS Gen2 connections.
author: kfollis
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/09/2025
ms.custom: known-issue-1062
---

# Known issue - Workspace identity tagged as preview for ADLS Gen2 connections

When you use the workspace identity authentication method to connect to Azure Data Lake Storage (ADLS) Gen2, you see **Preview** tag next to **Workspace identity**. This tag is a temporary bug in the user experience. It doesn't affect the functionality of the workspace identity or the connection.

**Status:** Fixed: April 9, 2025

**Product Experience:** Administration & Management

## Symptoms

When trying to use a workspace identity as the authentication method in an Azure Data Lake Storage Gen2 connection, you see **Workspace identity (preview)** instead of **Workspace identity**.

## Solutions and workarounds

The tag doesn't affect the functionality of the workspace identity or connection. You can ignore the tag.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
