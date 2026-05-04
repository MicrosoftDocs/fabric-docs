---
title: Manage outbound access from Data Agent with outbound access protection (preview)
description: Outbound access protection for Data Agent by limiting outbound requests. 
ms.reviewer: 
ms.author: mayurjain
ms.topic: concept-article
ms.custom:
ms.date: 02/01/2026
#customer intent: As a data admin, I want to learn how to protect my data by limiting outbound requests. As a data engineer, I want to learn how to work with my data, even when outbound access protection is turned on. 
---

# Workspace outbound access protection for Data Agent (preview)

Outbound access protection helps ensure that data is shared securely within your network security perimeter. For example, data exfiltration protection solutions use outbound access protection controls to limit a malicious actor's ability to move large amounts of data to an untrusted external location. Outbound protections only limit requests that originate in the workspace and communicate with a different workspace or location. 

:::image type="content" source="media/workspace-outbound-access-protection-data-science/workspace-outbound-access-protection-data-agent.png" lightbox="media/workspace-outbound-access-protection-data-science/workspace-outbound-access-protection-data-agent.png" alt-text="Diagram of workspace outbound access protection in data agent." border="false":::

To learn more about managing outbound access protection, see [Workspace outbound access protection](../security/workspace-outbound-access-protection-overview.md).

## When does Data Agent make outbound requests?  
  
An outbound request is defined as any request made from within the workspace towards a location outside the workspace. Only the directionality of the call matters - both reads and writes to external locations can exfiltrate sensitive information to untrusted locations. Data Agent initiates an outbound request when adding or querying a data source. This behavior is also true of Azure AI Search. 

Outbound access protection doesn't restrict Data Agent calls that target resources within the same workspace, because those calls don't cross the workspace boundary.


## Configure outbound access protection

To configure outbound access protection, follow the steps in [Set up workspace outbound access protection](workspace-outbound-access-protection-set-up.md). After enabling outbound access protection, you can configure data connection rules to allow outbound access to your data sources or AI search.

You can permit your Fabric workspace to make outbound requests to a different Fabric workspace by [creating a data connection rule](../security/workspace-outbound-access-protection-allow-list-connector.md) via connectors for supported data sources. When you allow list the target workspace, outbound requests are permitted from the source workspace to the target workspace even when outbound access is restricted.

## Considerations and Limitations

- Outbound access protection does not apply to the Azure OpenAI connection used by the Fabric data agent. Data agent relies on a Microsoft‑managed Azure OpenAI service for natural language understanding and orchestration, and this service dependency is not treated as a configurable external data connection within the workspace outbound access protection model.
- Outbound access protection is currently not supported for Azure AI Search
- If a connector for a specific data source is not supported, connection to that data source outside the workspace will be blocked when outbound access protection is enabled.
- For other limitations, refer to [Workspace outbound access protection overview - Microsoft Fabric](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).

