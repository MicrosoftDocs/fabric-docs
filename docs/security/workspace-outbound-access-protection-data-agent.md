---
title: Workspace outbound access protection for data agents
description: "This article describes workspace outbound access protection for data agents."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 12/01/2025
ai-usage: ai-assisted

#customer intent: As a data scientist, I want to control and secure outbound network access from my Fabric workspace data agents so that I can prevent unauthorized data exfiltration and comply with organizational security policies.

---

# Workspace outbound access protection for data agents

Workspace outbound access protection enables precise control over external communications from Microsoft Fabric workspaces. When this feature is enabled, [data agent workspace items](#supported-data-agent-item-types), such as data science models and AI agents, are restricted from making outbound connections to public endpoints unless access is explicitly granted through approved managed private endpoints. This capability is crucial for organizations in secure or regulated environments, as it helps prevent data exfiltration and enforces organizational network boundaries.

## Understanding outbound access protection with data agents

When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring managed private endpoints:

:::image type="content" source="media/workspace-outbound-access-protection-data-science/workspace-outbound-access-protection-data-agent.png" lightbox="media/workspace-outbound-access-protection-data-science/workspace-outbound-access-protection-data-agent.png" alt-text="Diagram of workspace outbound access protection in a data agent scenario." border="false":::

## Configuring outbound access protection for data agents

You can only create an allow list using managed private endpoints; data connection rules aren't supported for data agent workloads. To configure outbound access protection for data agents:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, you can set up [managed private endpoints](workspace-outbound-access-protection-allow-list-endpoint.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, data agent items can connect only to the approved managed private endpoints, while all other outbound connections remain blocked.

## Supported data agent item types

The following data agent item types are supported with outbound access protection: 

- AI models
- Machine learning models
- Data science experiments
- Model endpoints
- Copilot agents  

The following sections explain how outbound access protection affects specific data agent item types in your workspace.

### AI models and machine learning models

When outbound access protection is enabled on a workspace, AI models and machine learning models can reference a destination only if a managed private endpoint is set up from the workspace to the destination.

| Source | Destination | Is a managed private endpoint set up? | Can the model connect to the destination? |
|:--|:--|:--|:--|
| AI model in workspace with outbound access protection enabled | External API endpoint | Yes | Yes |
| AI model in workspace with outbound access protection enabled | External API endpoint | No | No |
| AI model in workspace with outbound access protection enabled | Another workspace in the same tenant | Yes (plus Private Link service enabled on destination workspace) | Yes |
| AI model in workspace with outbound access protection enabled | Another workspace in the same tenant | No | No |

### Model endpoints

Model endpoints in workspaces with outbound access protection enabled can only access external resources through approved managed private endpoints.

### Copilot agents

Copilot agents require specific managed private endpoints to connect to Microsoft services and approved external resources for their functionality.

## Next steps

- [Enable outbound access protection](workspace-outbound-access-protection-set-up.md) 
- [Create an allow list using managed private endpoints](workspace-outbound-access-protection-allow-list-endpoint.md)
- [Overview of workspace outbound access protection](workspace-outbound-access-protection-overview.md)