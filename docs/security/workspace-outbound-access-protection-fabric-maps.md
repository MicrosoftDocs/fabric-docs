---
title: Workspace Outbound Access Protection for Fabric Maps
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Fabric Maps items in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Fabric Maps' data connections to only approved destinations.
ms.reviewer: tejitpabari
ms.date: 07/07/2026
ms.topic: how-to
---

# Workspace outbound access protection for Fabric Maps (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Fabric Maps items in your workspace to external resources. When you enable this feature, map items can't make outbound connections unless you explicitly grant access through approved data connection rules.

> [!IMPORTANT]
> Support for Fabric Maps with workspace outbound access protection is currently in preview.

## Learn about outbound access protection with Fabric Maps

Fabric Maps can connect to multiple data sources across different Fabric workspaces and external services. When you enable outbound access protection, each data source type is handled as follows:

| Data source target | Behavior with outbound access protection enabled |
|---|---|
| **Lakehouse (OneLake)** | Configurable.<br><br>Connections to Lakehouses in the same workspace are always allowed.<br><br>Connections to Lakehouses in other workspaces are blocked unless the workspace admin explicitly permits them by using data connection rules. |
| **Kusto databases (KQL)** | Blocked.<br><br>Connections to Kusto databases in the same workspace are always allowed.<br><br>Connections to Kusto databases in other workspaces are blocked and can't be configured through data connection rules at this time. |
| **Ontology** | Blocked.<br><br>Connections to Ontologies in the same workspace are always allowed.<br><br>Connections to Ontologies in other workspaces are blocked and can't be configured through data connection rules at this time. |
| **External Connections (WMS/WMTS/WFS)** | Configurable.<br><br>External service connections are evaluated by the Data Movement and Transformation Services (DMTS) and are blocked unless explicitly allowed in the workspace's outbound access protection policy. DMTS is the service layer that brokers and validates these external connection requests at runtime.<br><br>Use the **Geospatial Web Services** connection kind in data connection rules to configure access for these connections. |

### How outbound access protection is evaluated

Fabric Maps evaluates outbound access protection at multiple points in the data flow:

- **Create, Read, Update, and Delete (CRUD) Operations**: When a map item is saved or loaded, the system evaluates all referenced data sources against the workspace's outbound access protection policy. Blocked sources are redacted on read and rejected on save.

- **Runtime data access**: When the map visual requests data from connected sources (tiles, features, queries), the system validates each outbound call against the workspace's outbound access protection policy before making the request.

- **External connection resolution**: External connections such as Web Map Service (WMS), Web Map Tile Service (WMTS), and Web Feature Service (WFS) are resolved through DMTS, which applies its own outbound access protection enforcement. If DMTS blocks the connection, Fabric Maps surfaces the blocked error to the user.

## Configure outbound access protection for Fabric Maps

You can only create an allow list by using data connection rules; managed private endpoints aren't supported for Fabric Maps. To configure outbound access protection for Fabric Maps:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md).

1. After enabling outbound access protection, set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow map data sources to reach approved targets as needed.

When you configure these settings, Fabric Maps can only access data from destinations specified in the data connection rules, while all other outbound connections remain blocked.

### Configure external connections

For external WMS, WMTS, and WFS service connections:

1. Create external connections in your workspace by using the Fabric connection experience.
1. Set up [data connection rules](workspace-outbound-access-protection-allow-list-connector.md) and use the **Geospatial Web Services** connection kind to allow outbound access to your external connections.
1. DMTS validates these connections at runtime and blocks any that don't match the allow list.

## Considerations and limitations

- **Kusto database connections**: Workspace-level control for Kusto databases through data connection rules is planned for a future release.

- **Ontology connections**: Workspace-level control for Ontology through data connection rules is planned for a future release.

- **Fail-closed behavior**: If the outbound access protection policy service is unavailable or returns an error, all cross-workspace connections are denied. This behavior ensures data protection even during service disruptions.

- **Item redaction on load**: When a map is loaded and contains references to blocked data sources, the service redacts those references from the returned map definition. If you save the map immediately after, the saved item contains the redacted definition, which can result in permanent data loss of those layer references.

- For other limitations, refer to [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Next steps

- [Create an allow list with managed private endpoints](workspace-outbound-access-protection-allow-list-endpoint.md)
- [Create an allow list with data connection rules](workspace-outbound-access-protection-allow-list-connector.md)
