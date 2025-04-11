---
title: Known issue - Data Agent creation fails when tenant settings restricted to security groups
description: A known issue is posted where Data Agent creation fails when tenant settings are restricted to security groups.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 04/11/2025
ms.custom: known-issue-1047
---

# Known issue - Data Agent creation fails when tenant settings restricted to security groups

To work with the Data Science Fabric Data Agents, you enable the **Copilot and Azure OpenAI Service** and **Users can create and share Fabric Data Agent item types (preview)** tenant settings. If you restrict the settings to apply to specific security groups, Fabric Data Agent creation fails. The Fabric Data Agent is needed to add new AI-powered capabilities.

**Status:** Fixed: April 10, 2025

**Product Experience:** Data Science

## Symptoms

When trying to create a Fabric Data Agent, the creation fails and you receive an error. The error message is similar to `TenantSwitch is disabled`.

## Solutions and workarounds

As a temporary workaround, enable the **Copilot and Azure OpenAI Service** and **Users can create and share Fabric Data Agent item types (preview)** tenant settings for the entire organization.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
