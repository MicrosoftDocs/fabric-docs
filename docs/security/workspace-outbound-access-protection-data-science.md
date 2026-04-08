---
title: Workspace outbound access protection for Data Science
description: Learn how workspace outbound access protection works with Data Science items like Machine Learning Experiments and Machine Learning Models in Microsoft Fabric.
author: msmimart
ms.author: mimart
ms.topic: overview
ms.date: 04/08/2026
ai-usage: ai-assisted

#customer intent: As a data scientist, I want to understand how workspace outbound access protection affects my Machine Learning Experiments and Models so that I can work securely in a protected workspace.

---

# Workspace outbound access protection for Data Science

Workspace outbound access protection helps safeguard your data by controlling outbound connections from items in your workspace to external resources. When this feature is enabled, [Data Science items](#supported-data-science-item-types) such as Machine Learning Experiments and Machine Learning Models can be created and used within the workspace.

Previously, Machine Learning Experiments and Machine Learning Models couldn't be created in workspaces with outbound access protection enabled. With this preview, these item types are now supported in protected workspaces.

## Understanding outbound access protection with Data Science

Machine Learning Experiments and Machine Learning Models in Microsoft Fabric don't make outbound network connections to external resources on their own. Because of this, no additional outbound access checks are required when outbound access protection is enabled.

The notebook code that generates Machine Learning Experiments or Models might access external data sources. Outbound access for notebooks is governed by the [Data Engineering outbound access protection](workspace-outbound-access-protection-data-engineering.md) configuration, which controls how notebooks connect to resources outside the workspace.

## Configuring outbound access protection for Data Science

To configure outbound access protection, follow the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md). No additional configuration is required for Data Science items. After outbound access protection is enabled, Machine Learning Experiments and Machine Learning Models work within the workspace without further setup.

Exception mechanisms such as managed private endpoints or data connection rules aren't applicable to Data Science items, because these items don't initiate outbound connections to external resources.

## Supported Data Science item types

These Data Science item types are supported with outbound access protection:

- Machine Learning Experiments
- Machine Learning Models

The following sections explain how outbound access protection affects these items in your workspace.

### Machine Learning Experiments

With outbound access protection enabled, you can create and manage Machine Learning Experiments in the protected workspace. Experiments track runs, metrics, and parameters from notebook executions. Experiment logging works both within the same workspace and across workspaces using [cross-workspace logging](../data-science/machine-learning-cross-workspace-logging.md). Outbound access protection doesn't restrict this functionality.

### Machine Learning Models

With outbound access protection enabled, you can create and manage Machine Learning Models in the protected workspace. Models store trained model artifacts and version information. Model creation and versioning work both within the same workspace and across workspaces using [cross-workspace logging](../data-science/machine-learning-cross-workspace-logging.md). Outbound access protection doesn't restrict this functionality.

## Cross-workspace logging with outbound access protection

[Cross-workspace logging](../data-science/machine-learning-cross-workspace-logging.md) allows you to log MLflow experiments and models from one Fabric workspace to another, or from environments outside Fabric such as local machines, Azure Databricks, and Azure Machine Learning. This enables MLOps workflows where you train in a development workspace and deploy to a production workspace, or bring existing ML assets into Fabric from external platforms.

When outbound access protection is enabled on Workspace A, logging ML experiments and models to a different Workspace B requires a cross-workspace managed private endpoint from Workspace A to Workspace B. To learn how to set up a cross-workspace managed private endpoint, see [Allow outbound access to another workspace in the tenant](workspace-outbound-access-protection-allow-list-endpoint.md#allow-outbound-access-to-another-workspace-in-the-tenant).

The following table summarizes the configuration required for each cross-workspace logging scenario when outbound access protection is enabled on Workspace A.

| Source | Destination | Configuration required on Workspace A | Can ML experiments and models be logged to the destination? |
|:--|:--|:--|:--|
| Notebook (Workspace A) | ML Experiment / Model (Workspace A) | None. Logging within the same workspace works without additional configuration. | Yes |
| Notebook (Workspace A) | ML Experiment / Model (Workspace B) | A [cross-workspace managed private endpoint](workspace-outbound-access-protection-allow-list-endpoint.md#allow-outbound-access-to-another-workspace-in-the-tenant) from Workspace A to Workspace B must be set up. | Yes |
| Notebook (Workspace A) | ML Experiment / Model (Workspace B) | No managed private endpoint is set up from Workspace A to Workspace B. | No |
| Local machine, Azure Databricks, or Azure Machine Learning | ML Experiment / Model (Workspace A) | None. Logging from outside Fabric is an inbound connection and isn't affected by outbound access protection. | Yes |

> [!NOTE]
> The standard `%pip install` command requires outbound internet access, which is blocked in OAP-enabled workspaces. To install the `synapseml-mlflow` package, download it from a non-OAP environment, upload the files to the lakehouse, and install from the local path. For detailed steps, see [Install the package in an OAP-enabled workspace](../data-science/machine-learning-cross-workspace-logging.md#install-the-package-in-an-oap-enabled-workspace).

## Considerations and limitations

- Outbound access for notebook code that generates experiments or models is governed by the [Data Engineering outbound access protection](workspace-outbound-access-protection-data-engineering.md) configuration. Make sure your notebook data sources are configured correctly if your workspace has outbound access protection enabled.
- For other limitations, refer to [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Workspace outbound access protection for data engineering workloads](workspace-outbound-access-protection-data-engineering.md)
- [Manage MLflow models across workspaces and platforms](../data-science/machine-learning-cross-workspace-logging.md)
- [Machine learning experiment](../data-science/machine-learning-experiment.md)
- [Machine learning model](../data-science/machine-learning-model.md)
