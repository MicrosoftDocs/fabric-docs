---
title: Workspace outbound access protection for Fabric IQ
description: Learn how to configure Workspace Outbound Access Protection to secure your Fabric IQ artifacts.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Fabric IQ data connections to only approved destinations.
author: wmwxwa
ms.author: wangwilliam
ms.date: 04/27/2026
ms.topic: how-to
---

# Workspace outbound access protection for Fabric IQ (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Fabric IQ items in your workspace to external data sources. When this feature is enabled, items are restricted from making outbound connections unless access is explicitly granted through approved data connection rules. 

Workspace outbound access protection for Fabric IQ currently supports only the graphs.

## Understanding workspace outbound access protection for graphs

Workspace outbound access protection enables secure data ingestion by allowing workspace admins to control which external sources can connect to graphs within the workspace. When outbound access protection is enabled, graphs can only connect to data sources that have been explicitly approved through data connection rules.

The following table summarizes the supported sources and destinations for graphs:

| Category | Details |
|----------|---------|
| **Supported sources** | Cloud or gateway connections |
| **Supported destinations** | Lakehouse |

When outbound access protection is enabled, all outbound connections are blocked by default. The workspace admin must then configure data connection rules for cloud or gateway connection policies to specify which external sources the graph can connect to. Once these policies are set, the graph can connect only to the approved sources and the lakehouse that is set as the destination. All other outbound connections are blocked.

### Configuring outbound access protection for graphs

You can only create an allow list using data connection rules; managed private endpoints aren't supported for graphs. To configure outbound access protection for graphs:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, Fabric IQ items can connect only to the approved destinations specified in the data connection rules, while all other outbound connections remain blocked.

## Next steps

[Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
[Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
