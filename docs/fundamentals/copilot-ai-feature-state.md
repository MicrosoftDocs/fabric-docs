---
title: Release Status of AI and Copilot in Fabric
description: Learn about the release status of AI and Copilot features in Fabric
author: SnehaGunda
ms.author: sngun
ms.reviewer: daengli, guptamaya, maghan
ms.date: 06/19/2026
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.update-cycle: 180-days
ms.custom:
  - references_regions
  - copilot-learning-hub
  - fabric-cat
no-loc: Copilot
---

# Release status of AI and Copilot experiences in Fabric

The following table provides an overview of the AI and Copilot experiences available in Fabric, the workloads and items they apply to, and the release status of each capability. The links in the *Copilot experience* column take you to documentation that describes how to set up and use each feature.

| **Fabric workload** | **Supported items** | **Copilot experience** | **Release status** |
| --- | --- | --- | --- |
| **Data Science and Data Engineering** | Notebook (typically with lakehouses and other data items) | - [Copilot chat pane](../data-engineering/copilot-notebooks-chat-pane.md) in a notebook, with notebook-wide code generation, refactoring, and validation.<br />- [Generate code or markdown across notebook workflows (preview)](../data-engineering/copilot-notebooks-overview.md#what-you-can-accomplish-with-copilot).<br />- [Add comments, fix errors, or optimize notebook code (preview)](../data-engineering/copilot-notebooks-chat-pane.md#in-cell-copilot).<br />- [Analyze and visualize data](../data-engineering/copilot-notebooks-chat-pane.md).<br />- [Fix with Copilot (preview)](../data-engineering/copilot-notebooks-chat-pane.md#diagnose-notebook-failures): error summaries, root-cause analysis, and approval-based code fixes from the chat pane or in-cell Copilot. | Preview |
| **Data Science** | Data agent, AI functions, AI services | - [Create a Fabric data agent](../data-science/how-to-create-data-agent.md).<br />- [Transform and enrich data seamlessly with AI functions](../data-science/ai-functions/overview.md).<br />- [Foundry Tools in Fabric](../data-science/ai-services/ai-services-overview.md#foundry-tools-in-fabric-preview). | Preview |
| **Data Factory** | Dataflows gen2 | - [Generate a new query](../fundamentals/copilot-fabric-data-factory.md#get-started-with-copilot-for-dataflow-gen2). | GA |
| | Pipeline | - [Generate and run a pipeline](../fundamentals/copilot-fabric-data-factory.md#generate-a-data-pipeline-with-copilot).<br />- [Summarize a pipeline](../fundamentals/copilot-fabric-data-factory.md#summarize-a-data-pipeline-with-copilot).<br />- [Troubleshoot pipeline errors](../fundamentals/copilot-fabric-data-factory.md#troubleshoot-pipeline-errors-with-copilot). | GA |
| **Data Warehouse** | SQL Queries in Data Warehouse | - [Generate SQL queries (preview)](../data-warehouse/copilot-chat-pane.md).<br />- [Suggest SQL code completions (preview)](../data-warehouse/copilot-code-completion.md).<br />- [Fix code in SQL queries (preview)](../data-warehouse/copilot-quick-action.md).<br />- [Explain code in SQL queries (preview)](../data-warehouse/copilot-quick-action.md). | Preview |
| **SQL database** | SQL queries in SQL database (Fabric portal Query Editor, SQL Server Management Studio (SSMS), MSSQL extension for Visual Studio Code) | - [Generate SQL queries](../database/sql/copilot-chat-pane.md).<br />- [Suggest SQL code completions](../database/sql/copilot-code-completion.md).<br />- [Fix code in SQL queries](../database/sql/copilot-quick-actions.md).<br />- [Explain code in SQL queries](../database/sql/copilot-quick-actions.md).<br />- Inline T-SQL completions, chat-based code generation, and execution plan analysis when connected via [SQL Server Management Studio (SSMS)](/sql/ssms/download-sql-server-management-studio-ssms) or [MSSQL extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql). | GA |
| **Power BI** | Semantic models in Power BI Desktop or Power BI service | - [Suggest linguistic model synonyms](/power-bi/natural-language/q-and-a-copilot-enhancements).<br />- [Suggest measure descriptions](/power-bi/transform-model/desktop-measure-copilot-descriptions).<br />- [Write and explain DAX queries](/dax/dax-copilot).<br />- [Ask questions about your data](/power-bi/create-reports/copilot-ask-data-question).<br />- [AI Auto-Summary for semantic models (preview)](../governance/onelake-catalog-explore.md#create-ai-auto-summary-for-semantic-models-preview). | GA |
| | Reports (Power BI Desktop, service, or mobile app) | - Power BI home (announced).<br />- [Suggest a report page](/power-bi/create-reports/copilot-create-desktop-report).<br />- [Suggest a visual](/power-bi/create-reports/copilot-create-report-service).<br />- [Summarize data in a narrative visual](/power-bi/create-reports/copilot-create-narrative?tabs=powerbi-service).<br />- [Explain a report page or visual](/power-bi/create-reports/copilot-pane-summarize-content). | GA |
| **Real-Time Intelligence** | KQL queryset | - [Copilot for Writing KQL Queries (preview)](../fundamentals/copilot-for-writing-queries.md).<br />- [Modify or explore a previously generated KQL query](../fundamentals/copilot-for-writing-queries.md). | GA |
| | Real-time dashboards | - [Generate a real-time dashboard](../fundamentals/copilot-generate-dashboard.md).<br />- [Explore data in real-time dashboards with Copilot](../real-time-intelligence/dashboard-explore-data.md) | GA |
| | Operations agent | - [Get started with operations agent](../real-time-intelligence/operations-agent.md). | GA |
