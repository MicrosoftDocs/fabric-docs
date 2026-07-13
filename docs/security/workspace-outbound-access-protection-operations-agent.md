---
title: Outbound Access Protection for Operations Agent (Preview)
description: Learn how workspace outbound access protection governs the outbound actions an operations agent can take, and what's supported during outbound access protection for operations agent preview.
author: baanders
ms.author: baanders
ms.reviewer: bisiadele
ms.topic: concept-article
ms.date: 06/17/2026
ai-usage: ai-assisted
#customer intent: As a workspace admin or operations agent creator, I want to understand how workspace outbound access protection affects an operations agent so that I can keep the agent working while my workspace is locked down.
---

# Workspace outbound access protection for operations agent (preview)

[Workspace outbound access protection (OAP)](workspace-outbound-access-protection-overview.md) is a Microsoft Fabric workspace security feature that lets workspace admins control which outbound network connections that items in the workspace can make. When you enable OAP on a workspace that contains an [operations agent](../real-time-intelligence/operations-agent.md), the workspace's connection policy governs the agent's outbound actions.

If your workspace runs an operations agent and has OAP turned on, OAP blocks some of the agent's actions, such as Teams notifications, Power Automate flows, and cross-workspace actions, unless the admin explicitly allows them. During preview, extra limitations apply that affect which actions you can permit.

This article explains what OAP covers for operations agent during preview and what you see when the protection blocks an action.

> [!IMPORTANT]
> Operations agent is generally available. Support for operations agent with workspace OAP is in preview. The capabilities and limitations described here apply while support for operations agent is in preview.

## What outbound access protection covers

When you enable OAP on a workspace that contains an operations agent, the policy governs the following outbound actions.

| Capability | Governed by OAP? | Notes |
|---|---|---|
| Teams notifications the agent sends | Yes | The agent checks the workspace OAP policy before sending. |
| Power Automate flows the agent triggers | Yes | Enforced when the [Activator](../real-time-intelligence/data-activator/activator-introduction.md) action runs. Not available during preview (for recommendations, see [Preview limitations](#preview-limitations)). |
| Fabric jobs in a different workspace | Yes | Enforced when the Activator action runs. Not available during preview (for recommendations, see [Preview limitations](#preview-limitations)). |
| Fabric actions in the same workspace as the agent | No | Internal to the workspace. |
| Large language model (LLM) reasoning calls | No | The tenant-level LLM setting governs these calls. |
| Agent rule evaluation and internal telemetry | No | Internal to Fabric. |

OAP affects only the final outbound execution step. The agent's reasoning, rules, and internal logging continue to operate normally.

## Preview limitations

Plan around the following limitations while operations agent with workspace OAP is in preview.

### Cross-workspace actions aren't supported

Preview supports only in-workspace scenarios. OAP blocks outbound actions that target a different workspace.

**Recommendation:** Keep the agent and its action targets, such as Activator items and other Fabric items, in the same workspace.

### Power Automate actions are blocked

Currently there's no per-workspace toggle for Power Automate. While OAP is on, it blocks [Power Automate actions](../real-time-intelligence/operations-agent-actions.md#configure-a-power-automate-action) that the agent triggers.

**Recommendation:** If your agent depends on Power Automate, keep OAP turned off on that workspace until the toggle ships, or replace the action with a Teams notification or an in-workspace Fabric job.

### Other Fabric item outbound actions are blocked

Per-workspace control for other Fabric item outbound actions isn't currently available. At this time, if OAP is on and you don't explicitly allow the required connection policies, Fabric blocks those actions.

### Connectors without an outbound access protection toggle are blocked

Workspace rules can allow only connectors that explicitly support workspace OAP policy. Fabric blocks any other outbound connector while OAP is on.

### Teams notification delivery depends on the tenant Teams setting

The agent sends Teams notifications directly. Its behavior depends on the [tenant level admin setting](../admin/tenant-settings-index.md) for Teams:

- **Teams allowed in the tenant settings**: When OAP blocks an action, the agent sends a Teams card to the agent creator that explains the block.
- **Teams not allowed in the tenant settings**: The agent doesn't send a Teams card. Use the Activity Log (see [Monitoring and troubleshooting section](#monitoring-and-troubleshooting)) to verify agent activity and delivery outcomes, including when OAP policies affect operations or block related messaging actions.

### No programmatic bypass

Fabric enforces OAP at the API layer. There's no supported way to bypass workspace OAP from code, scripts, or external API calls. 

Use the Activity Log to verify agent activity and delivery outcomes, including when Outbound Access Protection (OAP) policies affect operations or block related messaging actions.

## What you see when an action is blocked

The operations agent doesn't fail silently. When OAP blocks an outbound action, the agent surfaces it as follows.

### In the operations agent UI

A banner appears at the top of the agent window with the following text:

*Limited agent functionality — This workspace has outbound access restrictions that may block some agent actions or notifications.*

:::image type="content" source="media/workspace-outbound-access-protection-operations-agent/error-banner.png" alt-text="Screenshot of the error banner." lightbox="media/workspace-outbound-access-protection-operations-agent/error-banner.png":::

### In Microsoft Teams (when Teams is allowed)

The agent creator receives a Teams card.

## Settings that affect operations agent

The following settings determine how OAP interacts with an operations agent.

| Setting | Who controls it | Effect on the agent |
|---|---|---|
| Workspace OAP policy | Workspace admin | Determines which outbound connections the agent can use. |
| Teams tenant setting | Tenant admin | Determines whether Teams delivers blocked-action notifications. When off, the agent falls back to the in-app banner. |
| LLM enablement | Tenant admin | Governs LLM calls. OAP doesn't change this behavior. |

If the agent behaves unexpectedly after OAP is enabled, ask the workspace admin to review the workspace's allowed connections and confirm that it explicitly permits the connectors the agent depends on.

## Monitoring and troubleshooting

Use Activity Log to monitor OAP.

The Activity Log provides visibility into operations agent activities, including how OAP affects agent operations.

To access the Activity Log:
1. Open your operations agent in Fabric.
1. In the left navigation pane, under your agent name, select **Activity Log**.

Look for these items in the Activity Log:
* Blocked outbound requests: Entries showing operations that OAP policies blocked.
* Failed actions: Check if failures correlate with OAP restrictions.
* Timestamps: Correlate agent activity with expected behavior.

## Frequently asked questions

This section contains common questions about how OAP affects the operations agent during preview.

### Will my agent stop working as soon as my admin enables outbound access protection?

No. The agent's reasoning, rules, and internal logging continue to operate. OAP blocks only outbound actions that aren't on the workspace allowlist. The agent surfaces those blocks through a banner and, when available, a Teams notification.

### Can I use operations agent without outbound access protection?

Yes. Operations agent is generally available and works without OAP. Enabling OAP is a workspace admin decision. If OAP isn't on for the workspace, none of the preview limitations described here apply.

### Does outbound access protection affect what data the agent reasons over or sends to the LLM?

No. The tenant-level LLM setting governs LLM calls, not workspace OAP. OAP doesn't affect the agent's reasoning step.

### Why does Power Automate get blocked even if it's the only connector the agent uses?

Power Automate doesn't currently have its own OAP toggle for operations agent. While OAP is on, it blocks Power Automate actions. At this time, keep OAP off on workspaces that depend on Power Automate, or substitute a Teams notification.

### My action targets a Fabric item. Does it work?

When the target is in the same workspace as the agent, yes. OAP doesn't apply. When the target is in a different workspace, OAP blocks the action during preview.

### Who sees the blocked-action Teams card?

The agent creator.

### Can I test outbound access protection behavior with operations agent before turning it on in production?

Yes, test in a nonproduction workspace first. Enable OAP, exercise each agent action, and confirm that both the banner and the Teams card render the way you expect for your tenant's Teams configuration.

### What happens to actions that are running when the admin turns on outbound access protection?

OAP evaluates new action attempts against the current policy. If it blocks an attempt, the agent surfaces the block through the standard fallback banner or a Teams card.

### Can I appeal or override a block?

No. There's no programmatic override. To allow a blocked outbound path, the workspace admin needs to add the relevant connection to the workspace's allowlist.

### Where can I follow what's coming next?

Watch your Fabric admin update channels and the [operations agent documentation](../real-time-intelligence/operations-agent.md) for announcements as more features roll out.

## Where to get help

For help with...
- Workspace allowlists and OAP policy: Contact your Fabric workspace admin.
- Tenant-level Teams or LLM settings: Contact your Microsoft 365 or Fabric tenant admin.
- Product issues or feedback: Submit through your standard Microsoft support channel.
