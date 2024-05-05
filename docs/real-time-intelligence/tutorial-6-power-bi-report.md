---
title: Real-Time Intelligence tutorial part  6- Create a Power BI report
description: Learn how to create a Power BI report from your KQL queryset Real-Time Intelligence.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: tutorial
ms.custom:
  - build-2024
ms.date: 05/21/2024
ms.search.form: Get started
#customer intent: I want to learn how to Create a Power BI report from your KQL queryset
---
# Real-Time Intelligence tutorial part 6: Create a Power BI report

> [!NOTE]
> This tutorial is part of a series. For the previous section, see: [Tutorial part 5: Create a Real-Time dashboard](tutorial-5-create-dashboard.md).

A Power BI report is a multi-perspective view into a semantic model, with visuals that represent findings and insights from that semantic model. In this section, you create a new query that joins both semantic models, and use this query output to create a new Power BI report.

## Build a Power BI report

1. Copy and paste the following query into your KQL queryset. The output of this query is used as the semantic model for building the Power BI report.

    ```kusto
    TutorialTable
    | some query
    ```
    
1. Select **Build Power BI report**. The Power BI report editor opens with the query result available as a data source named **Kusto Query Result**.

## Related content

For more information about tasks performed in this tutorial, see:

* [Visualize data in a Power BI report](create-powerbi-report.md)


## Next step

> [!div class="nextstepaction"]
> [Tutorial part 7: Clean up resources](tutorial-7-clean-up-resources.md)