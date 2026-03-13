---
title: Manage a Power BI Semantic Model
description: Learn how to manage a Power BI semantic model in Microsoft Fabric.
ms.reviewer: chweb, salilkanade, pvenkat
ms.date: 12/05/2025
ms.topic: how-to
---
# Manage a Power BI semantic model

**Applies to:** [!INCLUDE [fabric-se-dw-mirroreddb](includes/applies-to-version/fabric-se-dw-mirroreddb.md)]

In this article, learn how to manage Power BI semantic models in Microsoft Fabric.

> [!NOTE]
> [!INCLUDE [default-semantic-model-retirement](../includes/default-semantic-model-retirement.md)]

## Manually update a Power BI semantic model

By default, Fabric doesn't automatically add tables and views to a Power BI semantic model when created, and there's no automatic sync for semantic models from their warehouse or SQL analytics endpoint source.

Once there are objects in a Power BI semantic model, you can validate or visually inspect the tables included:

1. Open your **Semantic model** item in your Fabric workspace.
1. Switch the mode from **Viewing** to **Editing**.
1. Review the default layout for the semantic model. Make changes as needed. For more information, see [Edit data models in the Power BI service](/power-bi/transform-model/service-edit-data-models#autosave).

<a id="monitor-the-default-power-bi-semantic-model"></a>

## Monitor a Power BI semantic model

You can monitor and analyze activity on a semantic model with [SQL Server Profiler](/sql/tools/sql-server-profiler/sql-server-profiler) by connecting to the XMLA endpoint.

SQL Server Profiler installs with [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms), and allows tracing and debugging of semantic model events. Although officially deprecated for SQL Server, Profiler is still included in SSMS and remains supported for Analysis Services and Power BI. Use with a Fabric semantic model requires SQL Server Profiler version 18.9 or higher. Users must specify the semantic model as the **initial catalog** when connecting with the XMLA endpoint. To learn more, see [SQL Server Profiler for Analysis Services](/analysis-services/instances/use-sql-server-profiler-to-monitor-analysis-services?view=power-bi-premium-current&preserve-view=true).

## Related content

- [Power BI semantic models in Microsoft Fabric](semantic-models.md)
- [Create a Power BI semantic model](create-semantic-model.md)
- [Semantic models in the Power BI service](/power-bi/connect-data/service-datasets-understand)
