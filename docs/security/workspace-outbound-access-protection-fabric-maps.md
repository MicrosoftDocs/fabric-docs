---
title: Workspace Outbound Access Protection for Geospatial Analytics
description: Learn how to configure Workspace Outbound Access Protection (outbound access protection) to secure your Geospatial Analytics artifacts in Microsoft Fabric.
#customer intent: As a workspace admin, I want to enable outbound access protection for my workspace so that I can secure Geospatial Analytics Map data connections to only approved destinations.
author: tejitpabari
ms.author: tejitpabari
ms.date: 06/24/2026
ms.topic: how-to
---

# Workspace outbound access protection for Geospatial Analytics (preview)

Workspace outbound access protection helps safeguard your data by controlling outbound connections from Geospatial Analytics Map items in your workspace to external resources. When you enable this feature, Map artifacts can't make outbound connections unless you explicitly grant access through approved data connection rules.

> [!IMPORTANT]
> Support for Geospatial Analytics with workspace outbound access protection is currently in preview.

## Learn about outbound access protection with Geospatial Analytics

Geospatial Analytics Maps can connect to multiple data sources across different Fabric workspaces and external OGC services. When you enable outbound access protection, each data source type is handled as follows:

| Data source target | Behavior with outbound access protection enabled |
|---|---|
| **Lakehouse (OneLake)** | Configurable. Connections to Lakehouses in the same workspace are always allowed. Connections to Lakehouses in other workspaces are blocked unless the workspace admin explicitly permits them by using data connection rules. |
| **Kusto Database (KQL)** | Blocked. Connections to Kusto Databases in the same workspace are always allowed. Kusto Database connections to other workspaces are blocked and can't be configured through data connection rules at this time. |
| **Ontology** | Blocked. Connections to Ontologies in the same workspace are always allowed. Ontology connections to other workspaces are blocked and can't be configured through data connection rules at this time. |
| **External Connections (OGC - WMS/WMTS/WFS)** | Configurable. External OGC service connections are evaluated by the Data Movement and Transformation Services (DMTS) and are blocked unless explicitly allowed in the workspace's outbound access protection policy. Use the **Geospatial Web Services** connection kind in data connection rules to configure access for these connections. |

### How outbound access protection is evaluated

Geospatial Analytics evaluates outbound access protection at multiple points in the data flow:

1. **CRUD Operations (Create, Read, Update, Delete)**: When a Map artifact is saved or loaded, the system evaluates all referenced data sources against the workspace's outbound access protection policy. Blocked sources are redacted on read and rejected on save.

2. **Runtime Data Access**: When the Map visual requests data from connected sources (tiles, features, queries), the system validates each outbound call against the workspace's outbound access protection policy before making the request.

3. **External Connection Resolution**: External OGC connections (WMS, WMTS, WFS) are resolved through DMTS, which applies its own outbound access protection enforcement. If DMTS blocks the connection, Geospatial Analytics surfaces the blocked error to the user.

## Configure outbound access protection for Geospatial Analytics

You can only create an allow list by using data connection rules; managed private endpoints aren't supported for Geospatial Analytics. To configure outbound access protection for Geospatial Analytics:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md).

2. After enabling outbound access protection, set up [data connection rules for cloud or gateway connection policies](workspace-outbound-access-protection-allow-list-connector.md) to allow Map data sources to reach approved targets as needed.

When you configure these settings, Geospatial Analytics Maps can only access data from destinations specified in the data connection rules, while all other outbound connections remain blocked.

### Configuring external OGC connections

For external WMS, WMTS, WFS, and OGC service connections:

1. Create external connections in your workspace using the Fabric connection experience.
2. Set up [data connection rules](workspace-outbound-access-protection-allow-list-connector.md) and use the **Geospatial Web Services** connection kind to allow outbound access to your external OGC endpoints.
3. DMTS validates these connections at runtime and blocks any that don't match the allow-list.

## Considerations and limitations

- **Kusto Database connections**: Workspace-level control for Kusto Database through data connection rules is planned for a future release.

- **Ontology connections**: Workspace-level control for Ontology through data connection rules is planned for a future release.

- **Fail-closed behavior**: If the outbound access protection policy service is unavailable or returns an error, all cross-workspace connections are denied. This ensures data protection even during service disruptions.

- **Artifact redaction on load**: When a Map is loaded and contains references to blocked data sources, those references are redacted from the returned Map definition. If you save the Map immediately after, the saved artifact will contain the redacted definition, which can result in permanent data loss of those layer references.

- For other limitations, refer to [Workspace outbound access protection overview](/fabric/security/workspace-outbound-access-protection-overview#considerations-and-limitations).

## Next steps

- [Create an allow list with managed private endpoints](./workspace-outbound-access-protection-allow-list-endpoint.md)
- [Create an allow list with data connection rules](./workspace-outbound-access-protection-allow-list-connector.md)
