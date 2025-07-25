﻿---
title: Sensitivity label support for paginated reports
description: Learn about using sensitivity labels from Microsoft Purview Information Protection with paginated reports.
author: msmimart
ms.author: mimart
ms.topic: conceptual
ms.custom:
ms.date: 05/18/2024
LocalizationGroup: Data from files
---
# Sensitivity label support for paginated reports

Sensitivity labels can be applied to paginated reports hosted in the Power BI service. After uploading a paginated report to the service, apply the label to the report just as you would to a [regular Power BI report](/power-bi/enterprise/service-security-apply-data-sensitivity-labels#apply-sensitivity-labels-in-the-power-bi-service).

When you export data from a labeled paginated report to a supported file type (Excel, PDF, PPTX, and Word), the sensitivity label on the paginated report is applied to the exported file.

Sensitivity labels on paginated reports are included in the Purview hub report (as part of the count of sensitivity labels on reports), and can be audited (label-change audits only) and modified by public APIs, just like labels on regular Power BI reports.

## Considerations and limitations

* [Downstream inheritance](service-security-sensitivity-label-downstream-inheritance.md) isn't supported. The label of an upstream model won't propagate down to its downstream paginated reports. Likewise, the label of a paginated report won't propagate down to the report’s downstream content.
* [Mandatory labeling](mandatory-label-policy.md) doesn't apply to paginated reports.

## Paginated Report visuals

A Paginated Report visual is a special type of visual that you can include in a regular Power BI report. It renders a selected paginated report inside the regular Power BI report.

When a supported file type is exported from a Paginated Report visual that is included in a Power BI report, and the original paginated report being rendered in the visual has a sensitivity label, the exported file inherits the sensitivity label of the original paginated report. If the original paginated report doesn't have a label, the exported file inherits the label of the Power BI report, if it has one.

## Related content

* [Apply sensitivity labels in Power BI](/power-bi/enterprise/service-security-apply-data-sensitivity-labels)
* [Sensitivity label overview](/power-bi/enterprise/service-security-sensitivity-label-overview)
