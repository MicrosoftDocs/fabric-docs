---
title: Sensitivity label downstream inheritance in Power BI
description: Learn how sensitivity labels can be propagated to downstream content.
author: paulinbar
ms.author: painbar
ms.service: powerbi
ms.subservice: powerbi-eim
ms.topic: conceptual
ms.custom:
  - ignite-2023
ms.date: 09/12/2023
LocalizationGroup: Data from files
---

# Sensitivity label downstream inheritance

When a sensitivity label is applied to a semantic model or report in the Power BI service, it's possible to have the label trickle down and be applied to content that's built from that semantic model or report. For semantic models, this means other semantic models, reports, and dashboards. For reports, this means dashboards. This capability is called downstream inheritance.

Downstream inheritance is a critical link in Power BI’s end-to-end information protection solution. Together with [inheritance from data sources](service-security-sensitivity-label-inheritance-from-data-sources.md), [inheritance upon creation of new content](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-label-inheritance-upon-creation-of-new-content), [inheritance upon export to file](/power-bi/enterprise/service-security-sensitivity-label-overview#sensitivity-labels-and-protection-on-exported-data), and other capabilities for applying sensitivity labels, downstream inheritance helps ensure that sensitive data remains protected throughout its journey through Power BI, from data source to point of consumption.

Downstream inheritance is illustrated using [lineage view](/power-bi/collaborate-share/service-data-lineage). When a label is applied to the semantic model *Customer profitability*, that label filters down and gets applied to the semantic model's downstream content: the reports that are built using that semantic model, and, in this case, a dashboard that's built from visuals from one of those reports.

:::image type="content" source="media/sensitivity-labels/downstream-inheritance-lineage-view.png" alt-text="Screenshot of lineage view that shows downstream inheritance.":::

>[!IMPORTANT]
>
>* Downstream inheritance never overwrites labels that were applied manually.
>* Downstream inheritance never overwrites a label with a less restrictive label.

## Downstream inheritance modes

Downstream inheritance operates in one of two modes. The Power BI admin decides via a [tenant setting](#enabling-fully-automated-downstream-inheritance) which mode is operable on the tenant.

* **Downstream inheritance with user consent** (default): In this mode, when users apply sensitivity labels on semantic models or reports, they can choose whether to also apply that label downstream. They make their choice by selecting the box that appears with the sensitivity label selector.
* **Fully automated downstream inheritance** (when enabled by a Power BI admin): In this mode, downstream inheritance happens automatically whenever a label is applied to a semantic model or report. There's no checkbox provided for user consent.

The two downstream inheritance modes are explained in more detail in the following sections.

### Downstream inheritance with user consent

In user consent mode, when a user applies a sensitivity label to a semantic model or report, they can choose whether to apply the label to its downstream content as well. A checkbox appears along with the label selector:

:::image type="content" source="media/sensitivity-labels/downstream-inheritance-user-consent-checkbox.png" alt-text="Screenshot of the sensitivity label dialog with the user consent for downstream inheritance checked.":::

By default, the checkbox is selected. This means that when the user applies a sensitivity label to a semantic model or report, the label propagates down to its downstream content. For each downstream item, the label is applied only if:

* The user who applied or changed the label has Power BI edit permissions on the downstream item (that is, the user is an admin, member, or contributor in the workspace where the downstream item is located).
* The user who applied or changed the label is [authorized](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement) to change the sensitivity label that already exists on the downstream item. 

Clearing the checkbox prevents the label from being inherited downstream.

### Fully automated downstream inheritance

In fully automated mode, a label applied to either a semantic model or report is automatically propagated and applied to the semantic model or report’s downstream content, without regard to edit permissions on the downstream item and the [usage rights](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement) on the label.

## Relaxed label change enforcement

In certain cases, downstream inheritance (like other automated labeling scenarios) can result in a situation where no user has all the required permissions needed to change a label. For such situations, label change enforcement relaxations are in place to guarantee access to affected items. See [Relaxations to accommodate automatic labeling scenarios](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement#relaxations-to-accommodate-automatic-labeling-scenarios) for detail.

## Enabling fully automated downstream inheritance

By default, downstream inheritance operates in user consent mode. To switch downstream inheritance in the tenant to fully automated mode, the Power BI admin must enable the **Automatically apply sensitivity labels to downstream content** tenant setting in the admin portal.

:::image type="content" source="media/sensitivity-labels/downstream-inheritance-fully-automated-tenant-switch.png" alt-text="Screenshot of tenant setting for automatically applying labels to downstream content.":::

## Considerations and limitations

* Downstream inheritance is limited to 80 items. If the number of downstream items exceeds 80, no downstream inheritance takes place. Only the item the label was actually applied to receives the label.
* Downstream inheritance never overwrites manually applied labels. See [the following section](#downstream-inheritance-between-semantic-models-and-reports-published-from-pbix-files) for a significant consideration.
* Downstream inheritance never replaces a label on downstream content with a label that's less restrictive than the currently applied label.
* [Sensitivity labels inherited from data sources](service-security-sensitivity-label-inheritance-from-data-sources.md) are automatically propagated downstream only when fully automated downstream inheritance mode is enabled.

### Downstream inheritance between semantic models and reports published from *.pbix* files

When you publish a *.pbix* file that has a sensitivity label, the label that's inherited by the semantic model and report created in the service is considered to be automatically or manually applied depending on whether the label on the *.pbix* file was automatically or manually applied. This has implications for subsequent downstream inheritance from the semantic model to its associated report. If the label on the *.pbix* file was automatically applied, then later, after publishing, if the label on the semantic model is changed, the associated report inherits the change. If, however, the label on the *.pbix* file was manually applied, then if the label on the semantic model is changed, the label on its associated report **is not** be overwritten, as it's considered to be manually applied. This is in keeping with the rule that downstream inheritance never overwrites a manually applied label.

## Related content

* [Sensitivity label overview](/power-bi/enterprise/service-security-sensitivity-label-overview)
* [Label change enforcement](/power-bi/enterprise/service-security-sensitivity-label-change-enforcement)
