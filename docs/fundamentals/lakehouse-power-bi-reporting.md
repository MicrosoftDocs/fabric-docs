---
title: Direct Lake mode and Power BI reporting
description: Learn how to build Power BI reports on top of lakehouse data in Microsoft Fabric
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.custom:
ms.date: 04/24/2024
ms.search.form: Lakehouse Power BI Reporting
---

# How Direct Lake mode works with Power BI reporting

In Microsoft Fabric, when the user creates a lakehouse, the system also provisions the associated SQL analytics endpoint. Then, you can create a new Power BI semantic model in Direct Lake mode to allow Power BI to consume data by creating Power BI reports, explores, and running user-created DAX queries. 

When a Power BI report shows data in visuals, it requests it from the semantic model. Next, the semantic model accesses a lakehouse to consume data and return it to the Power BI report. For efficiency, the semantic model can keep some data in the cache and refresh it when needed. 

- You can create a semantic model in Direct Lake mode, then add tables from the lakehouse into the semantic model. Open the SQL analytics endpoint and select the **Manage semantic model** button in the **Reporting** ribbon to manage the tables in the semantic model. 
- You can also create a semantic model in Direct Lake mode by selecting **New semantic model** in the lakehouse or SQL analytics endpoint. For more information on Direct Lake mode, see [Direct Lake overview](./direct-lake-overview.md).

Lakehouse also applies V-order optimization to delta tables. This optimization gives unprecedented performance and the ability to quickly consume large amounts of data for Power BI reporting.

:::image type="content" source="media\power-bi-reporting\dataset.png" alt-text="Screenshot of the semantic model landing page." lightbox="media\power-bi-reporting\dataset.png":::

## Setting permissions for report consumption

The semantic model in Direct Lake mode is consuming data from a lakehouse on demand. To make sure that data is accessible for the user that is viewing Power BI report, necessary permissions on the underlying lakehouse need to be set.

One option is to give the user the *Viewer* role in the workspace to consume all items in the workspace, including the lakehouse, if in this workspace, semantic models, and reports. Alternatively, the user can be given the *Admin, Member, or Contributor* role to have full access to the data and be able to create and edit the items, such as lakehouses, semantic models, and reports. 

In addition, semantic models can utilize a [fixed identity](./direct-lake-fixed-identity.md) to read data from the lakehouse, without giving report users any access to the lakehouse, and users be given permission to access the report through an [app](/power-bi/collaborate-share/service-create-distribute-apps). Also, with fixed identity, semantic models in Direct Lake mode can have row-level security defined in the semantic model to limit the data the report user sees while maintaining Direct Lake mode. SQL-based security at the SQL analytics endpoint can also be used, but Direct Lake mode will fall back to DirectQuery, so this should be avoided to maintain the performance of Direct Lake. 

## Related content

- [Power BI semantic models in Microsoft Fabric](../data-warehouse/semantic-models.md)
