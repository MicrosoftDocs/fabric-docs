---
title: Auditing data agent interactions in Microsoft Purview (preview)
description: Learn how to use DSPM for AI to govern AI interactions in Data Agent.
ms.reviewer: mayurjain
ms.topic: how-to
ms.date: 04/28/2026
---

# Audit Logging for Fabric Data Agent with Microsoft Purview (Preview)

Microsoft Purview Data Security Posture Management (DSPM) for AI enables organizations to **monitor, audit, and investigate AI interactions** across Fabric Data Agents and Copilot experiences.

With audit logging enabled, **user prompts, AI responses, and interaction metadata** are captured and stored in Microsoft Purview through the Microsoft 365 audit pipeline.

[!INCLUDE [feature-preview](../includes/feature-preview-note.md)]
---

## Prerequisites

Ensure the following configurations are enabled before using audit logging:

### 1. Enable Purview Audit
- From DSPM for AI (classic) > Overview, in the Get Started section, look to see if auditing is on for your tenant. If not, select Activate Microsoft Purview Audit.

### 2. Enable DSPM for AI Policy
- In Microsoft Purview:
  - Enable the policy:
    **DSPM for AI – Capture interactions for Copilot experiences**
For more information about one-click policies, see [Considerations for DSPM for AI](https://learn.microsoft.com/purview/dspm-for-ai-considerations#one-click-policies-from-data-security-posture-management-for-ai)

### 3. Enable Fabric Tenant Setting
- In the Fabric Admin Portal:
  - Turn on:
    **Allow Microsoft Purview to secure AI interactions** 

For more information about this option, see [Tenant settings index](https://learn.microsoft.com/fabric/admin/tenant-settings-index#information-protection).

---

## Viewing Data Agent Audit Logs

When a user interacts with a Fabric Data Agent, a Copilot Interaction audit record is created for the request as well as the response. 

Each audit record includes:

- Timestamp
- User identity
- Application and agent details
- Associated resources and metadata
- User prompt or AI response

All records are stored in the **Microsoft 365 unified audit log**.

To review audit logs:

1. Go to **Microsoft Purview Portal**
2. Navigate to **DSPM for AI**
3. Open **Activity Explorer**
4. Look for records labeled **Copilot Interaction**

:::image type="content" source="./media/data-agent-governance/purview-activity-explorer.png" alt-text="Screenshot showing Activity Explorer in Purview DSPM for AI." lightbox="./media/data-agent-governance/purview-activity-explorer.png":::

Each record represents a single interaction between a user and the Data Agent.

Use Activity Explorer filters to locate specific interactions:

- **Timestamp**  
  Narrow results to a specific time window

- **Activity Type**  
  Filter by `Copilot Interaction`

- **User**  
  Identify activity by specific users

- **Application**  
  Isolate interactions from:
  - Fabric Data Agent
  - Other AI apps

### User Prompt 
For each interaction, Microsoft Purview captures and logs the full text of the user’s prompt.

:::image type="content" source="./media/data-agent-governance/purview-da-prompt.png" alt-text="Screenshot showing user prompt in Fabric data agent." lightbox="./media/data-agent-governance/purview-da-prompt.png":::

### Data Agent Response
For each interaction, the response returned by the Data Agent including the natural language answer and structured outputs such as generated queries or code are logged.


:::image type="content" source="./media/data-agent-governance/purview-da-response.png" alt-text="Screenshot showing Data Agent response from M365." lightbox="./media/data-agent-governance/purview-da-response.png":::


---

## Licensing and Costs

Microsoft Purview now offers a combination of entitlement-based (per-user-per-month) and Pay-As-You-Go (PAYG) pricing models. The PAYG model applies to a broader set of Purview capabilities—including Insider Risk Management, Communication Compliance, eDiscovery, and other data security and governance solutions—based on copilot for Power BI usage volume or complexity. Purview Audit logging of Copilot for Power BI activity remains included at no additional cost as part of Microsoft 365 E5 licensing. This flexible pricing structure ensures that organizations only pay for what they use as data flows through AI models, networks, and applications. 

---

