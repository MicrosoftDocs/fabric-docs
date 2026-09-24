---
title: Workspace outbound access protection for Power BI reports (preview)
description: Learn how workspace outbound access protection applies to Power BI reports, including the same-workspace semantic model constraint and which report features remain enabled.
author: kgremban
ms.author: kgremban
ms.reviewer: kayu
ms.topic: concept-article
ms.date: 06/02/2026
#customer intent: As a report author or workspace admin, I want to understand how outbound access protection affects Power BI reports, so that I can publish and consume reports in protected workspaces.
ai-usage: ai-assisted
---

# Workspace outbound access protection for Power BI reports (preview)

Power BI reports in a workspace with outbound access protection (OAP) enabled are constrained to a single connection path: they can only query semantic models that live in the same workspace. There's no OAP allow list to configure and no exception mechanism to enable. The protection comes from the OAP enablement itself.

Most report features are client-side features. They run in the browser, not in the Fabric service, so they fall outside the scope of OAP. These client-side features remain enabled for reports in protected workspaces. OAP doesn't constrain them. Use local network security rules to block unwanted outbound client connections.

> [!NOTE]
> This feature is in preview. Only interactive Power BI reports (`.pbix`) are supported. Paginated reports, dashboards, and scorecards aren't supported in workspaces with outbound access protection enabled and can't be created in these workspaces.

## How enforcement works

Power BI reports do not use data connections. They are bound directly to their semantic models. You can change the binding by using the [Rebind Report REST API](/rest/api/power-bi/reports/rebind-report-in-group), but a report can only be bound to exactly one semantic model. 

Given that Power BI reports do not use data connections, OAP enforces a single rule for Power BI reports: a report in a protected workspace can only bind to a semantic model in the *same* workspace. Reports can't query semantic models in other workspaces, regardless of any OAP allow-list configuration.

The semantic model itself remains subject to [semantic model OAP enforcement](workspace-outbound-access-protection-semantic-models.md). Any data sources the semantic model accesses through data connections—cloud databases, on-premises systems through gateways, fabric lakehouses, warehouses—are evaluated against the workspace's data connection rules. The report inherits the resulting data boundary through its connection to the model.

You don't need to configure anything for reports beyond enabling OAP on the workspace and authorizing the report's underlying semantic model's data connections.

## Covered and not covered

OAP for Power BI reports focuses on the report-to-model connection. Report features render or execute in the browser and aren't governed by OAP.

**Covered by OAP:**

- The connection from the report to its semantic model. This connection is restricted to semantic models in the same workspace.
- Downstream data connections made by the semantic model, evaluated under the semantic model OAP rules.

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

Publishing interactive Power BI reports to an OAP-enabled workspace works without extra configuration:

- **Power BI Desktop publish**: Publishing a `.pbix` file to a protected workspace succeeds when the report binds to a semantic model in that same workspace.
- **Power BI Desktop live editing**: Live-editing a report against a semantic model in a protected workspace works without extra configuration.
- **Git integration**: Sync the report definition from a Git repository.
- **Fabric Deployment Pipelines**: Promote the report through deployment stages.

If the report references a semantic model in a different workspace, publishing succeeds but the published report cannot render the data because cross-workspace queries aren't allowed.

## Configure outbound access protection for Power BI reports

There's no report-specific configuration. To use Power BI reports in a protected workspace:

1. Confirm prerequisites:
   - The workspace is assigned to a Fabric capacity (F SKU).
   - The tenant setting **Configure workspace-level outbound network rules** is enabled.
   - The workspace contains only items that support outbound access protection.

1. Enable outbound access protection for the workspace by following the steps in [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md).

1. Configure data connection rules for the semantic models the reports use. See [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md).

1. Publish reports to the protected workspace. Each report must bind to a semantic model in the same workspace.

## Considerations and limitations

- **Same-workspace semantic model only**: Reports in a protected workspace can only query semantic models in the same workspace. Cross-workspace model bindings aren't supported and can't be allowed through configuration.
- **Interactive reports only**: Only interactive Power BI reports (`.pbix`) are supported. Paginated reports, dashboards, and scorecards aren't supported in protected workspaces and can't be created in them.
- **Client-side features aren't constrained**: Custom visuals, image URLs, web content, maps, web URL actions, R and Python visuals, drillthrough URLs, User Data Functions, exports, subscriptions, alerts, and the RDL visual continue to function in protected workspaces. OAP doesn't block them.
- **F SKU required**: Outbound access protection requires Fabric capacity. Power BI Premium (P SKUs), Embedded (EM SKUs), and Pro workspaces aren't supported.
- **Propagation delay**: Policy changes can take about 15 minutes to take effect.

For general outbound access protection limitations that apply across all workloads, see [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md#considerations-and-limitations).

## Related content

- [Workspace outbound access protection overview](workspace-outbound-access-protection-overview.md)
- [Workspace outbound access protection for semantic models](workspace-outbound-access-protection-semantic-models.md)
- [Enable workspace outbound access protection](workspace-outbound-access-protection-set-up.md)
- [Create an allow list using data connection rules](workspace-outbound-access-protection-allow-list-connector.md)