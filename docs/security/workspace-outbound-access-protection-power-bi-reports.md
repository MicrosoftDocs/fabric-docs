---
title: Workspace outbound access protection for Power BI reports (preview)
description: Learn how workspace outbound access protection applies to Power BI reports, including exceptions for semantic models in other workspaces.
author: kgremban
ms.author: kgremban
ms.reviewer: kayu
ms.topic: concept-article
ms.date: 11/08/2026
#customer intent: As a report author or workspace admin, I want to understand how outbound access protection affects Power BI reports, so that I can publish and consume reports in protected workspaces.
ai-usage: ai-assisted
---

# Workspace outbound access protection for Power BI reports (preview)

Power BI reports in a workspace with outbound access protection (OAP) enabled can query semantic models in the same workspace. They can also query semantic models in other workspaces when a workspace admin explicitly allows each destination workspace through an OAP exception policy. Cross-workspace report-to-model connections are blocked by default.

Most report features are client-side features. They run in the browser, not in the Fabric service, so they fall outside the scope of OAP. These client-side features remain enabled for reports in protected workspaces. OAP doesn't constrain them. Use local network security rules to block unwanted outbound client connections.

> [!NOTE]
> This feature is in preview. This article covers interactive Power BI reports (`.pbix`). Paginated reports use different OAP rules; see [Workspace outbound access protection for paginated reports](workspace-outbound-access-protection-paginated-reports.md). Dashboards and scorecards aren't supported in workspaces with outbound access protection enabled and can't be created in these workspaces.

## How enforcement works

Power BI reports do not use data connections. They are bound directly to their semantic models. You can change the binding by using the [Rebind Report REST API](/rest/api/power-bi/reports/rebind-report-in-group), but a report can only be bound to exactly one semantic model. 

When you open a report, Power BI evaluates the OAP policy of the report workspace before rendering the report. Connections to semantic models in the same workspace are allowed. A connection to a semantic model in another workspace is blocked unless the destination workspace is covered by an applicable **Power BI Semantic Model** exception in the report workspace. If the connection is blocked, the report doesn't open.

Configure the exception once for each approved semantic model workspace. You don't configure an exception on each report, and the report binding doesn't change.

The semantic model remains subject to [semantic model OAP enforcement](workspace-outbound-access-protection-semantic-models.md). Any data sources the semantic model accesses through data connections - cloud databases, on-premises systems through gateways, Fabric lakehouses, or warehouses - are evaluated against the semantic model workspace's data connection rules. Enable OAP on both the report workspace and the semantic model workspace to protect both boundaries.

## Covered and not covered

OAP for Power BI reports focuses on the report-to-model connection. Report features render or execute in the browser and aren't governed by OAP.

**Covered by OAP:**

- The connection from the report to its semantic model. Cross-workspace connections require an exception for the destination semantic model workspace.
- Downstream data connections made by the semantic model, evaluated under the semantic model workspace's OAP rules.

**Not covered by OAP (remain enabled):**

- Custom visuals that fetch JavaScript or data from external services.
- Image URLs and web content tiles.
- Bing Maps and the map and filled map visuals.
- Web URL actions in buttons and data-bound URLs.
- R and Python visuals.
- Drillthrough to external URLs.
- User Data Functions invoked from the report.
- Report exports (PDF, PPTX, and Excel).
- Subscriptions and data alerts.
- The RDL visual.

If you need to restrict any of these features, use the corresponding Power BI tenant or report-level settings to disable the feature. OAP doesn't constrain them.

## Publish reports to a protected workspace

You can publish interactive Power BI reports to an OAP-enabled workspace by using these deployment paths:

- **Power BI Desktop publish**: Publish a `.pbix` file to a protected workspace. If its report binds to a semantic model in another workspace, configure an exception for that destination workspace before users open the report.
- **Power BI Desktop live editing**: Live-editing a report against a semantic model in a protected workspace works without extra configuration.
- **Git integration**: Sync the report definition from a Git repository.
- **Fabric Deployment Pipelines**: Promote the report through deployment stages.

Publishing doesn't validate the OAP exception. If the report references a semantic model in another workspace and no applicable exception exists, publishing succeeds, but the report doesn't open.

## Configure outbound access protection for Power BI reports

To use Power BI reports in a protected workspace:

1. Confirm prerequisites:
   - The workspace is assigned to a Fabric capacity (F SKU).
   - The tenant setting **Configure workspace-level outbound network rules** is enabled.
   - The workspace contains only items that support outbound access protection.

1. Enable outbound access protection for the workspace by following the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).

1. For each approved semantic model workspace, add an exception in the report workspace:
   1. In **Workspace settings** > **Outbound networking**, select **Add new cloud connection rule**.
   1. For **Connection kind**, select **Power BI Semantic Model**.
   1. Under **Workspace exception**, select the workspace that contains the semantic model.
   1. Select **Add**, and then select **Save**.

   For more information, see [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md).

1. Enable OAP on the semantic model workspace and configure the model's downstream data connection rules. See [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md).

1. Wait about 15 minutes for policy changes to propagate, and then open the report to validate the connection.

## Considerations and limitations

- **Cross-workspace connections are blocked by default**: A report can query a semantic model in another workspace only when the report workspace has a **Power BI Semantic Model** exception for that destination workspace.
- **Report types**: The rules in this article apply to interactive Power BI reports (`.pbix`). For paginated reports, see [Workspace outbound access protection for paginated reports](workspace-outbound-access-protection-paginated-reports.md). Dashboards and scorecards aren't supported in protected workspaces and can't be created in them.
- **Client-side features aren't constrained**: Custom visuals, image URLs, web content, maps, web URL actions, R and Python visuals, drillthrough URLs, User Data Functions, exports, subscriptions, alerts, and the RDL visual continue to function in protected workspaces. OAP doesn't block them.
- **F SKU required**: Outbound access protection requires Fabric capacity. Power BI Premium (P SKUs), Embedded (EM SKUs), and Pro workspaces aren't supported.
- **Propagation delay**: Policy changes can take about 15 minutes to take effect.

For general outbound access protection limitations that apply across all workloads, see [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md)
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)