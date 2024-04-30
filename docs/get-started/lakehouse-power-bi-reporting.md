---
title: Direct Lake mode and Power BI reporting
description: Learn how to build Power BI reports on top of lakehouse data in Microsoft Fabric
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 04/24/2024
ms.search.form: Lakehouse Power BI Reporting
---

# How Direct Lake mode works with Power BI reporting

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated SQL endpoint and default semantic model. The default semantic model has metrics on top of lakehouse data. The semantic model allows Power BI to load data for reporting.

When a Power BI report shows an element that uses data, it requests it from the underlying semantic model. Next the semantic model accesses a lakehouse to retrieve data and return it to the Power BI report. For efficiency, the default semantic model loads commonly requested data into the cache and refreshes it when needed.

Lakehouse applies V-order optimization to tables. This optimization enables quickly loading data into the semantic model and having it ready for querying without any other sorting or transformations.

This approach gives unprecedented performance and the ability to instantly load large amounts of data for Power BI reporting.

:::image type="content" source="media\power-bi-reporting\dataset.png" alt-text="Screenshot of the default semantic model landing page." lightbox="media\power-bi-reporting\dataset.png":::

## Setting permissions for report consumption

The default semantic model is retrieving data from a lakehouse on demand. To make sure that data is accessible for the user that is viewing Power BI report, necessary permissions on the underlying lakehouse need to be set.

One option is to give the user the *Viewer* role in the workspace and grant necessary permissions to data using SQL security. Alternatively, the user can be given the *Admin, Member, or Contributor* role to have full access to the data.

## Related content

- [Default Power BI semantic models in Microsoft Fabric](../data-warehouse/semantic-models.md)
