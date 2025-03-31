---
title: Known issue - AI skill creation fails when tenant settings restricted to security groups
description: A known issue is posted where AI skill creation fails when tenant settings are restricted to security groups.
author: jessicammoss
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 03/05/2025
ms.custom: known-issue-1047
---

# Known issue - AI skill creation fails when tenant settings restricted to security groups

To work with the Data Science AI skills, you enable the **Copilot and Azure OpenAI Service** and **Users can create and share AI skill item types (preview)** tenant settings. If you restrict the settings to apply to specific security groups, AI skill creation fails. The AI skill is needed to add new AI-powered capabilities.

**Status:** Open

**Product Experience:** Data Science

## Symptoms

When trying to create an AI skill, the creation fails and you receive an error. The error message is similar to `TenantSwitch is disabled`.

## Solutions and workarounds

As a temporary workaround, enable the **Copilot and Azure OpenAI Service** and **Users can create and share AI skill item types (preview)** tenant settings for the entire organization.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
