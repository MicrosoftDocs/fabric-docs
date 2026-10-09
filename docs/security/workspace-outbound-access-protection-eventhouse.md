---
title: Workspace Outbound Access Protection for Eventhouse
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Eventhouse artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Real-Time Intelligence data connections to only approved destinations.
author: msmimart
ms.author: mimart
ms.date: 10/08/2026
ms.topic: how-to
---

# Workspace outbound access protection for Eventhouse

Workspace outbound access protection (OAP) helps safeguard your data by controlling outbound connections from Real-Time Intelligence items in your workspace to external data sources. Eventhouse support for workspace OAP is generally available.
When you enable this feature, items can't make outbound connections unless you explicitly grant access through approved data connection rules. 

When you enable OAP, the workspace blocks outbound traffic by default. You must explicitly allow each supported external connection by using an approved data connection rule.

> [!NOTE]
> Workspace outbound access protection settings apply at the workspace level. All Real-Time Intelligence items in the workspace follow the same outbound access rules. 

## Supported items

Workspace outbound access protection applies to the following Real-Time Intelligence items: 

- Activator, see [Outbound access protection for Activator](workspace-outbound-access-protection-activator.md)
- Eventhouse
- Eventstream, see [Outbound access protection for Eventstream](workspace-outbound-access-protection-eventstream.md)

## Outbound access protection for Eventhouse

### Supported Eventhouse outbound access scenarios

The following scenarios are supported when workspace OAP is enabled. Connections outside the workspace require an approved data connection rule.

| Scenario | Resource or location | Requirements and behavior |
| --- | --- | --- |
| Stream ingestion | Azure Event Hubs | Allow the connection before you create or use the data connection. |
| One-time ingestion | Azure Blob Storage or Azure Data Lake Storage | Allow the storage account connection before you ingest data. |
| Continuous ingestion | Azure Blob Storage or Azure Data Lake Storage | Allow the storage account connection before you create or use the continuous data connection. |
| Query | Azure Data Explorer cluster | Allow the target cluster connection before you run a cross-cluster query. Standard database permissions still apply. |
| Fabric access | Same workspace | Eventstream, OneLake, and follower databases are supported without an outbound access rule. |
| Fabric access | Other workspace | OneLake and follower databases require an access rule for the target workspace. |
| Inbound and outbound network protection | Private Link and workspace OAP | You can use Private Link with workspace OAP. Private Link controls inbound access, and OAP controls outbound access. Configure both features for the directions you want to protect. |


### Unsupported Eventhouse outbound access scenarios

When you enable workspace OAP, Eventhouse blocks the following scenarios:

- Connections to external resources that you didn't explicitly allow.
- Copilot experiences, including generating KQL queries and analyzing Eventhouse data.
- An allow-all configuration with selected blocked exceptions. Eventhouse OAP always blocks outbound traffic by default and permits only explicitly allowed connections.
- Query against an Eventhouse in another workspace.
- Ingestion from eventstream using push mode.

## Limitations

- After you create an Eventstream connection in an OAP-enabled workspace, ingestion might not begin immediately while the connection configuration propagates. This delay applies only after connection creation. It doesn't add ongoing ingestion latency after the connection becomes active.
- All Eventhouse items in the workspace follow the same workspace OAP configuration.
- Copilot isn't supported when workspace OAP is enabled.

## Considerations

- Configure an allow list for only the external resources that the workspace must access. You can't allow all Eventhouse connections and then block selected exceptions.
- Configure both network access and data permissions. An outbound access rule permits the network connection but doesn't grant permissions on the target cluster, database, Eventhouse, or storage account.
- Review SDK-based ingestion designs before you enable OAP. Use ingestion paths whose external endpoints you can identify and explicitly allow.
- Treat Private Link and OAP as complementary controls. Private Link protects inbound access to Eventhouse, while OAP restricts outbound access from the workspace.
- Plan for a short activation period after you create an Eventstream connection. After activation, OAP doesn't introduce an expected ingestion delay.

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
- [Private links for Fabric tenants](security-private-links-overview.md)
