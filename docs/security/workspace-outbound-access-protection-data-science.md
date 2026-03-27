---
title: Workspace outbound access protection for Data Science
description: Learn how workspace outbound access protection works with Data Science items like Machine Learning Experiments and Machine Learning Models in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 03/26/2026
ai-usage: ai-assisted

#customer intent: As a data scientist, I want to understand how workspace outbound access protection affects my Machine Learning Experiments and Models so that I can work securely in a protected workspace.

---

# Workspace outbound access protection for Data Science

Workspace outbound access protection helps safeguard your data by controlling outbound connections from items in your workspace to external resources. When this feature is enabled, [Data Science items](#supported-data-science-item-types) such as Machine Learning Experiments and Machine Learning Models can be created and used within the workspace.

Previously, Machine Learning Experiments and Machine Learning Models couldn't be created in workspaces with outbound access protection enabled. With this preview, these item types are now supported in protected workspaces.

## Understanding outbound access protection with Data Science

Machine Learning Experiments and Machine Learning Models in Microsoft Fabric operate within the scope of a single workspace. Cross-workspace logging isn't supported for these item types. Because these items don't make outbound network connections on their own, no additional outbound access checks are required when outbound access protection is enabled.

The notebook code that generates Machine Learning Experiments or Models might access external data sources. Outbound access for notebooks is governed by the [Data Engineering outbound access protection](workspace-outbound-access-protection-data-engineering.md) configuration, which controls how notebooks connect to resources outside the workspace.

## Configuring outbound access protection for Data Science

To configure outbound access protection, follow the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md). No additional configuration is required for Data Science items. After outbound access protection is enabled, Machine Learning Experiments and Machine Learning Models work within the workspace without further setup.

Exception mechanisms such as managed private endpoints or data connection rules aren't applicable to Data Science items, because these items don't initiate outbound connections.

## Supported Data Science item types

These Data Science item types are supported with outbound access protection:

- Machine Learning Experiments
- Machine Learning Models

The following sections explain how outbound access protection affects these items in your workspace.

### Machine Learning Experiments

With outbound access protection enabled, you can create and manage Machine Learning Experiments in the protected workspace. Experiments track runs, metrics, and parameters from notebook executions. Because experiment logging operates within the same workspace, outbound access protection doesn't restrict this functionality.

### Machine Learning Models

With outbound access protection enabled, you can create and manage Machine Learning Models in the protected workspace. Models store trained model artifacts and version information. Because model creation and versioning operate within the same workspace, outbound access protection doesn't restrict this functionality.

## Considerations and limitations

- This feature is currently in public preview.
- Cross-workspace logging for Machine Learning Experiments and Machine Learning Models isn't supported in Fabric. All experiment and model operations must occur within the same workspace.
- Outbound access for notebook code that generates experiments or models is governed by the [Data Engineering outbound access protection](workspace-outbound-access-protection-data-engineering.md) configuration. Make sure your notebook data sources are configured correctly if your workspace has outbound access protection enabled.
- For other limitations, refer to [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md)
- [Machine learning experiment](../data-science/machine-learning-experiment.md)
- [Machine learning model](../data-science/machine-learning-model.md)
