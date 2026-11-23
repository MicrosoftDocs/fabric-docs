---
title: Tenant private links for Azure and Fabric events
description: Learn how tenant-level private links affect Azure and Fabric event consumption in Microsoft Fabric Real-Time hub.
author: george-guirguis
ms.author: geguirgu
ms.topic: how-to
ms.date: 10/14/2026
ai-usage: ai-assisted

#customer intent: As an admin, I want to understand how tenant-level private link configurations affect Real-Time event consumption so that I can securely configure event-driven workflows while maintaining private network access.

---

# Tenant private links for Azure and Fabric events

[Tenant-level private links](/fabric/security/security-private-links-overview) in Microsoft Fabric can affect how you consume Azure events through Real-Time hub. Azure events, such as Azure Blob Storage events, originate outside the Fabric service boundary and use a public endpoint to enter Fabric. When you enable the **Block Public Internet Access** tenant setting as part of [tenant-level private link configuration](/fabric/security/security-private-links-use), this delivery is blocked by default. If the Azure Event Grid system topic and the Fabric workspace are registered in the same Microsoft Entra tenant, you can allow delivery by adding the system topic to the workspace's Resource Instance Rules.

## Impact on Azure event consumption

When **Block Public Internet Access** is enabled:

| Scenario | Result |
|----------|--------|
| Creating a new Azure event consumer (for example, configuring an Activator rule to monitor blob uploads from an Azure Storage account) | Configuration is blocked. Consumer creation fails. Create and validate the consumer before you enable **Block Public Internet Access**. If the setting is already enabled and the consumer doesn't exist, temporarily disable the setting while you create and validate the consumer. |
| Existing Azure event consumer (for example, an Eventstream that was already receiving Azure Blob Storage events) | Events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state. To restore delivery, add the Azure Event Grid system topic to the allow list as a trusted resource in the workspace inbound networking settings. For details, see [Allow Azure event sources through inbound trusted resources](#allow-azure-event-sources-through-inbound-trusted-resources). To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal. |

## Impact on Fabric event consumption

Fabric events (such as Job events, Workspace item events, and OneLake events) aren't affected by tenant-level private link configuration because they originate from within the Fabric tenant.

## Configuration changes after consumer creation

If a tenant admin enables **Block Public Internet Access** after Azure event consumers are already configured, the events are dropped at the Azure source and never reach Fabric. The configuration doesn't enter a paused state in Real-Time hub. To discover dropped events, investigate the [metrics](/azure/event-grid/monitor-event-delivery) and [diagnostic logs](/azure/event-grid/enable-diagnostic-logs-topic) for the Azure resource (such as the Azure Storage account) in the Azure portal.

To restore event delivery, use one of the following options:

- Add the Azure Event Grid system topic to the allow list as a trusted resource in the workspace inbound networking settings. For details, see [Allow Azure event sources through inbound trusted resources](#allow-azure-event-sources-through-inbound-trusted-resources).
- Disable the **Block Public Internet Access** tenant setting, or remove the Azure Private Link configuration.

## Allow Azure event sources through inbound trusted resources

When the **Block Public Internet Access** tenant setting blocks Azure event delivery, you can restore the flow by adding the Azure Event Grid system topic as a trusted resource in the workspace inbound networking settings. This approach uses [Resource Instance Rules](/fabric/onelake/onelake-manage-inbound-access-trusted-resources) to allow supported inbound traffic from approved Azure resource instances.

The Azure Event Grid system topic and the Fabric workspace must be registered in the same Microsoft Entra tenant. Resource Instance Rules don't support cross-tenant Azure event sources.

### Before you begin

For a planned private-link rollout, complete the following tasks before you enable **Block Public Internet Access**:

1. Create the Azure event consumer, such as an Eventstream or Activator configuration, while public internet access is still enabled.
1. Generate an event and confirm that it reaches Fabric. For Azure Blob Storage, upload a test blob and verify that the event reaches the Eventstream item.
1. Identify the workspace that contains the Eventstream item representing the Azure source. This ingress workspace might differ from a downstream workspace that contains an Activator rule or another consumer.
1. Confirm that a Fabric admin enabled the **Configure workspace-level inbound network rules** and **Configure workspace-level IP firewall rules and trusted resource instances** tenant settings. Otherwise, the workspace admin can't select the inbound network option or see **Allow inbound trusted resources (preview)**. For information about tenant settings, see [About tenant settings](/fabric/admin/tenant-settings-index#advanced-networking).
1. Configure and test the private network paths that administrators and users need:
   - Tenant-level private access is required to use the Fabric portal after tenant public access is blocked.
   - Selecting **Allow connections from selected networks and workspace level private links** restricts public access to the workspace. A tenant-level private link alone doesn't provide private access to a workspace that has this restriction. Configure a [workspace-level private link](/fabric/security/security-workspace-level-private-links-set-up) and use the workspace-specific fully qualified domain name (FQDN), or configure another supported workspace access path, such as an allowed IP range.
   - If a consumer, such as an Activator rule, is in another workspace, establish private connectivity from the consumer's network to the ingress workspace before you restrict public access. The trusted-resource rule restores Event Grid ingress, but it doesn't provide the downstream cross-workspace connection. For more information, see [Workspace private links for Azure, Fabric, and Business events](workspace-private-links-real-time-events.md#azure-blob-storage-events).

Resource Instance Rules allow the Event Grid system topic through the workspace network boundary. They don't provide a private network path for administrators or users, and they don't make arbitrary workspace APIs reachable.

### Find the Event Grid system topic resource ID

To add the Azure Event Grid system topic to the allow list, first find its Azure Resource Manager (ARM) resource ID:

1. In the [Azure portal](https://portal.azure.com), open the Azure resource that emits the events, such as the Azure Storage account.
1. Select the **Events** tab.
1. Select the link to the Event Grid system topic.
1. On the **Overview** page, in the **Essentials** section, select **JSON View**.
1. On the **Resource JSON** page, copy the **Resource ID** value. The resource ID has the following format: `/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.EventGrid/systemTopics/{system-topic-name}`.

> [!IMPORTANT]
> Copy the ID of the root `Microsoft.EventGrid/systemTopics` resource. Don't use the storage account resource ID or a child resource ID that ends in `/eventSubscriptions/{event-subscription-name}`. If the source has multiple system topics, select the system topic that contains the event subscription created for the Fabric consumer.

You can also use Azure CLI to list system topics for an Azure Storage account:

```azurecli
storageId=$(az storage account show \
  --name <storage-account-name> \
  --resource-group <resource-group-name> \
  --query id \
  --output tsv)

az eventgrid system-topic list \
  --query "[?source=='$storageId'].{name:name,id:id}" \
  --output json
```

### Configure the trusted resource

Configure the rule on the workspace that contains the Eventstream item representing the Azure source. This workspace receives the Azure event ingress and might differ from a downstream workspace that contains an Activator rule or another consumer.

1. In the Fabric portal, go to that workspace, and then select **Workspace settings** > **Inbound networking**.
1. Select **Allow connections from selected networks and workspace level private links**.
1. Under the allow list settings, find **Allow inbound trusted resources (preview)**, and select **Edit**.
1. Select **Add resource**, and provide the following information:
   - **Name**: Enter a friendly name for the Azure event source, such as `My Storage Account Events`.
   - **Resource identifier**: Enter the ARM resource ID of the Azure Event Grid system topic.
1. Save the configuration.
1. Refresh the settings and confirm that the complete system topic resource ID appears in the trusted-resources allow list.

For a planned rollout, enable the tenant **Block Public Internet Access** setting only after you save the trusted-resource rule and verify the private access paths. If you're recovering an existing consumer after tenant public access was already blocked, perform these steps from a network that has the required private access.

### Verify event delivery

Network policy and trusted-resource changes aren't immediate. Workspace inbound network policy changes can take up to 30 minutes to take effect.

1. After the changes propagate, generate a new event. For Azure Blob Storage, upload a new test blob.
1. Confirm that the event reaches the Eventstream item in Fabric.
1. In Azure Monitor, review the Event Grid metrics for the source or system topic:
   - **Matched Event Count** (`MatchedEventCount`) shows events that matched the event subscription.
   - **Delivery Success Count** (`DeliverySuccessCount`) should resume increasing after the trusted-resource rule takes effect.
   - **Delivery Attempt Fail Count** (`DeliveryAttemptFailCount`) can increase while tenant public access is blocked or while the policy change is propagating.

Generate new events while validating the recovery. Events created while delivery was blocked might expire according to the Event Grid retry policy.

After you add the trusted resource, Azure events from the Event Grid system topic can be delivered into Fabric even when public internet access is blocked at the tenant level. For more information about Resource Instance Rules, see [Manage workspace inbound access with Resource Instance Rules](/fabric/onelake/onelake-manage-inbound-access-trusted-resources).

> [!IMPORTANT]
> If you delete and recreate the Azure event source or its Fabric consumer configuration, verify the current Event Grid system topic resource ID. The recreated configuration can use a different system topic. Update the trusted-resource rule if the resource ID changed.

## Related content

- [About tenant-level private links](/fabric/security/security-private-links-overview)
- [Workspace private links for Azure, Fabric, and Business events](workspace-private-links-real-time-events.md)
- [Paused event configurations](fabric-events-paused-state.md)
