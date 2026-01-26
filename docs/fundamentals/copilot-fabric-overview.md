---
title: Overview of Copilot in Fabric
description: Learn about Copilot in Fabric and Power BI, which brings a new way to transform and analyze data, generate insights, and create visualizations and reports.
author: denglishbi
ms.author: daengli
ms.reviewer: guptamaya, maghan
ms.date: 01/25/2026
ms.update-cycle: 180-days
ms.service: fabric
ms.topic: overview
ms.collection:
  - ce-skilling-ai-copilot
ms.custom:
  - references_regions
  - copilot-learning-hub
  - fabric-cat
no-loc: [Copilot]
ai-usage: ai-assisted
---

# What is Copilot in Fabric?

Copilot and other generative AI features in preview bring new ways to transform and analyze data, generate insights, and create visualizations and reports in Microsoft Fabric and Power BI. This article introduces you to Copilot in Fabric and tells you how it works in the different workloads. It also discusses data security and privacy, responsible use, and regional availability.

Copilot in Microsoft Fabric is a generative AI assistive technology that aims to enhance the data analytics experience in the Fabric platform for users. Copilot uses large-language models (LLMs) that attempt to facilitate user interaction with their data and items in Fabric. People who use Copilot can include people who create, manage, and consume Fabric items, including enterprise developers, self-service users, and business users.

:::image type="content" source="media/copilot-fabric-overview/fabric-copilot-users-diagram.svg" alt-text="Diagram showing how enterprise developers, self-service users, and business users can use Copilot experiences in Fabric workloads.":::

This article helps you to understand how Copilot in Fabric works, including its architecture and cost. The information in this article is intended to guide you and your organization to use and manage Copilot effectively. This article is primarily targeted at:

- **BI and analytics directors or managers:** Decision makers who are responsible for overseeing the BI program and strategy, and who decide whether to enable and use Copilot in Fabric or other AI tools.

- **Fabric administrators:** The people in the organization who oversee Microsoft Fabric and its various workloads. Fabric administrators oversee who can use Copilot in Fabric for each of these workloads and monitor how Copilot usage affects available Fabric capacity.

- **Data architects:** The people responsible for designing, building, and managing the platforms and architecture that support data and analytics in the organization. Data architects consider the usage of Copilot in architecture design.

- **Center of Excellence (COE), IT, and BI teams:** The teams that are responsible for facilitating successful adoption and use of data platforms like Fabric in the organization. These teams and individuals might use AI tools like Copilot themselves, but also support and mentor self-service users in the organization to benefit from them, as well.

> [!IMPORTANT]  
> Copilot in Fabric aims to *augment* the abilities and intelligence of human users. Copilot can't, and doesn't, aim to *replace* the people who today create and manage reports or other Fabric items. To get the most out of Copilot in Fabric, you should consider how you'll enable these individuals and teams to make their work more efficient or improve their outcomes.

There are different Copilots in each of the Fabric workloads, like Data Factory, Data Science, and Power BI. In Power BI Desktop, Copilot experiences are available to users with access to a workspace that uses Fabric capacity or those assigned to a Fabric Copilot capacity.

:::image type="content" source="media/copilot-fabric-overview/copilot-fabric-power-bi-diagram.svg" alt-text="Diagram showing how users can use Copilot experiences in Fabric and Power BI Desktop, which both consume Fabric capacity.":::

Enabling and effectively using Copilot in your organization requires deliberate thought and planning. Generative AI is an evolving technology with specific nuances and considerations to keep in mind, so it's important to apply generative AI tools like Copilot to the appropriate problems and scenarios. Furthermore, Copilot in Power BI consumes your available Fabric capacity, meaning that you should manage its usage to avoid overconsumption that can lead to throttling and disruption of your other Fabric operations.

## Enable Copilot

Before your business can start using Copilot capabilities in Microsoft Fabric, you need to [enable Copilot](copilot-enable-fabric.md).

> [!NOTE]  
> Copilot isn't yet supported for sovereign clouds due to GPU availability.

## Copilot experiences

You can enable and use Copilot across the various Fabric workloads, and within those workloads you can use different Copilot experiences. While each of these Copilot experiences uses a similar common architecture, they work in distinct ways.

The following diagram depicts an overview of the different items that support Copilot experiences for each Fabric workload.

:::image type="content" source="media/copilot-fabric-overview/fabric-items-copilot-support.svg" alt-text="Diagram showing the different Fabric items that support Copilot experiences across Fabric workloads.":::

### Copilot in Fabric in the Data Science and Data Engineering workloads

Copilot for Data Engineering and Data Science is an AI-enhanced toolset tailored to support data professionals in their workflow. It provides intelligent code completion, automates routine tasks, and supplies industry-standard code templates to facilitate building robust pipelines and crafting complex analytical models. Utilizing advanced machine learning algorithms, Copilot offers contextual code suggestions that adapt to the specific task at hand, helping you code more effectively and with greater ease. From data preparation to insight generation, Microsoft Fabric Copilot acts as an interactive aide, lightening the load on engineers and scientists and expediting the journey from raw data to meaningful conclusions.

### Copilot in Fabric in the Data Factory workload

Copilot for Data Factory is an AI-enhanced toolset that supports both citizen and professional data wranglers in streamlining their workflow. It provides intelligent code generation to transform data with ease and generates code explanations to help you better understand complex tasks. For more information, see [Copilot for Data Factory](copilot-fabric-data-factory.md)

### Copilot in Fabric in the Data Warehouse workload

Microsoft Copilot for Fabric Data Warehouse is an AI assistant designed to streamline your data warehousing tasks. Key features of Copilot for Warehouse include Natural Language to SQL, code completion, quick actions, and intelligent insights. For more information, see [Copilot for Data Warehouse](../data-warehouse/copilot.md).

### Copilot in the SQL database workload

Copilot for SQL database in Microsoft Fabric is an AI assistant designed to streamline your OLTP database tasks. Key features of Copilot for SQL database include Natural Language to SQL, code completion, quick actions, and document-based Q&A. For more information, see [Copilot for SQL database](../database/sql/copilot.md).

### Copilot in Fabric in the Power BI workload

Power BI has introduced generative AI that allows you to create reports automatically by selecting the article for a report or by prompting Copilot for Power BI on a particular article. You can use Copilot for Power BI to generate a summary for the report page that you created, and generate synonyms for better Q&A capabilities. For more information on the features and how to use Copilot for Power BI, see [Overview of Copilot for Power BI](/power-bi/create-reports/copilot-introduction).

Copilot is also available for Power BI apps, where it's scoped to the curated content within an app. App-scoped Copilot helps users search reports, ask questions, and get summaries based on the app's content. For more information, see [Overview of Copilot for Power BI apps (preview)](/power-bi/create-reports/copilot-apps-overview).

### Copilot in Fabric in the Real-Time Intelligence workload

Copilot for Real-Time Intelligence is an advanced AI tool designed to help you explore your data and extract valuable insights. You can input questions about your data, which are then automatically translated into Kusto Query Language (KQL) queries. Copilot streamlines the process of analyzing data for both experienced KQL users and citizen data scientists.

For more information, see [Copilot for Writing KQL Queries](../fundamentals/copilot-for-writing-queries.md).

### Where to find the AI and Copilot experiences in Fabric

The following table provides an overview of the various AI and Copilot experiences available in Fabric, and which workloads and items these experiences apply to. The links in the *Experience* column take you to the documentation describing how to set up and use these features.

| **Fabric workload** | **Supported items** | **Experience** |
| --- | --- | --- |
| **Copilot for Data Science and Data Engineering** | Notebook (typically with lakehouses and other data items) | - [Copilot chat panel](../data-engineering/copilot-notebooks-chat-pane.md) vs [chat magics](../data-engineering/copilot-notebooks-chat-magics.md) in a notebook.<br />- [Generate code or markdown for a notebook (preview)](../data-engineering/copilot-notebooks-chat-pane.md#key-capabilities).<br />- [Add comments, fix errors, or debug notebook code (preview)](../data-engineering/copilot-notebooks-chat-magics.md#commenting-and-debugging).<br />- [Analyze and visualize data](../data-engineering/copilot-notebooks-chat-pane.md).<br />- [Explain notebook contents (preview)](../data-engineering/copilot-notebooks-chat-pane.md#key-capabilities). |
| **AI Experiences in Fabric Data Science** | Data agent <br> AI functions <br> AI services | - [Create a Fabric Data agent](../data-science/how-to-create-data-agent.md). <br />- [Transform and enrich data seamlessly with AI functions](../data-science/ai-functions/overview.md).<br />- [AI services in Fabric](../data-science/ai-services/ai-services-overview.md#ai-services-in-fabric-preview).<br />
| **Copilot for Data Factory** | Dataflows gen2 | - [Generate a new query](copilot-fabric-data-factory.md#get-started-with-copilot-for-dataflow-gen2). |
| | Pipeline | - [Generate and run a pipeline](copilot-fabric-data-factory.md#generate-a-data-pipeline-with-copilot).<br />- [Summarize a pipeline](copilot-fabric-data-factory.md#summarize-a-data-pipeline-with-copilot).<br />- [Troubleshoot pipeline errors](copilot-fabric-data-factory.md#troubleshoot-pipeline-errors-with-copilot). |
| **Copilot for Data Warehouse** | SQL Queries in Data Warehouse | - [Generate SQL queries (preview)](../data-warehouse/copilot-chat-pane.md).<br />- [Suggest SQL code completions (preview)](../data-warehouse/copilot-code-completion.md).<br />- [Fix code in SQL queries (preview)](../data-warehouse/copilot-quick-action.md).<br />- [Explain code in SQL queries (preview)](../data-warehouse/copilot-quick-action.md). |
| **Copilot for SQL database** | SQL queries in SQL database | - [Generate SQL queries (preview)](../database/sql/copilot-chat-pane.md).<br />- [Suggest SQL code completions (preview)](../database/sql/copilot-code-completion.md).<br />- [Fix code in SQL queries (preview)](../database/sql/copilot-quick-actions.md).<br />- [Explain code in SQL queries (preview)](../database/sql/copilot-quick-actions.md). |
| **Copilot for Power BI** | Semantic models in Power BI Desktop or Power BI service | - [Suggest linguistic model synonyms](/power-bi/natural-language/q-and-a-copilot-enhancements).<br />- [Suggest measure descriptions](/power-bi/transform-model/desktop-measure-copilot-descriptions).<br />- [Write and explain DAX queries](/dax/dax-copilot).<br />- [Ask questions about your data (preview)](/power-bi/create-reports/copilot-ask-data-question). |
| | Reports (Power BI Desktop, service, or mobile app) | - Power BI home (announced).<br />- [Suggest a report page (preview)](/power-bi/create-reports/copilot-create-desktop-report).<br />- [Suggest a visual (preview)](/power-bi/create-reports/copilot-create-report-service).<br />- [Summarize data in a narrative visual](/power-bi/create-reports/copilot-create-narrative?tabs=powerbi-service).<br />- [Explain a report page or visual](/power-bi/create-reports/copilot-pane-summarize-content). |
| **Copilot for Real-Time Intelligence** | KQL queryset | - [Generate KQL queries (preview)](copilot-for-writing-queries.md).<br />- [Modify or explore a previously generated KQL query (preview)](copilot-for-writing-queries.md). |
| | Real-time dashboards | - [Generate a real-time dashboard](../fundamentals/copilot-generate-dashboard.md). |
> [!NOTE]  
> Copilot's capabilities are evolving over time. More items and Copilot experiences will likely become available in the future.
>  
> The Copilot experiences which are in *preview* are subject to separate [supplemental preview terms](https://azure.microsoft.com/support/legal/preview-supplemental-terms/), and aren't meant for production use. For more information, see [Microsoft Fabric preview information](./preview.md). We recommend that you only use these preview experiences to test and evaluate Copilot's capabilities.

## Create your own AI solution accelerators

### Build your own copilots

Using the client advisor AI accelerator tool, you can build custom copilot with your enterprise data. The client advisor AI accelerator uses Azure OpenAI Service, Azure AI Search, and Microsoft Fabric to create custom Copilot solutions. This all-in-one custom copilot empowers client advisors to use generative AI across structured and unstructured data optimizing daily tasks and fostering better interactions with clients. To learn more, see the [GitHub repo](https://github.com/microsoft/Build-your-own-copilot-Solution-Accelerator).

### Agentic applications for unified data foundation

Accelerate intelligent decision-making at scale with secure, agentic AI built on a unified data foundation in Microsoft Fabric. This solution integrates Microsoft Foundry agents and Semantic Kernel to power intelligent workflows that support natural language querying, governed data access, and AI-driven automation—enhancing agility and innovation. To learn more, [explore the solution on GitHub](https://github.com/microsoft/agentic-applications-for-unified-data-foundation-solution-accelerator)

### Unified data foundation with Fabric

Build a unified data foundation in Microsoft Fabric using the Modern Analytics, AI, and Governance (MAAG) framework to deliver scalable insights. This accelerator connects Fabric, OneLake, Purview, and Azure Databricks through a [medallion lakehouse architecture](../onelake/onelake-medallion-lakehouse-architecture.md), with sample domain models and prebuilt Power BI dashboards. With flexible deployment options and built-in governance, it helps you unify and analyze data across domains efficiently. To learn more, [explore the solution on GitHub](https://github.com/microsoft/unified-data-foundation-with-fabric-solution-accelerator)

### Real-Time Intelligence for operations

Use Microsoft Fabric’s real‑time intelligence on a unified data foundation to analyze live and historical telemetry, detect anomalies, and monitor operations through interactive dashboards. The solution includes automated email alerts and an AI‑powered data agent for natural‑language insights. To learn more, [explore the solution on GitHub](https://github.com/microsoft/real-time-intelligence-operations-solution-accelerator).

## How do I use Copilot responsibly?

To learn how to use Copilot responsibly, see the guidance at [Privacy, security, and responsible use for Copilot (preview)](copilot-privacy-security.md).

## Available regions

### Available regions for Azure OpenAI Service

To access the prebuilt [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), including the [Copilot in Fabric](copilot-fabric-overview.md), you must have an F2 or higher SKU or a P SKU in the following [Fabric regions](../admin/region-availability.md). The Azure OpenAI Service isn't available on trial SKUs.

The Azure OpenAI Service used to power Fabric Copilot is currently deployed only in US datacenters (East US, East US2, South Central US, and West US) and one EU datacenter (France Central). This differs from the standard Azure OpenAI Service available in the Azure portal, which is accessible in many more regions. For details on standard Azure OpenAI region availability, see [Azure OpenAI Service region availability](/azure/ai-services/openai/concepts/models?tabs=global-standard%2Cstandard-chat-completions#model-summary-table-and-region-availability). If your data is outside the US or EU, the feature is disabled by default unless your tenant admin enables **Data sent to Azure OpenAI can be processed outside your capacity's geographic region, compliance boundary, or national cloud instance** tenant setting. To learn how to get to the tenant settings, see [About tenant settings](../admin/service-admin-portal-copilot.md).

### Data processing across geographic areas

The prebuilt [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/) and [Copilot in Fabric](copilot-fabric-overview.md) might process your prompts and results (input and output when using Copilot) outside your capacity's geographic region, depending on where the Azure OpenAI service is hosted. The table below shows the mapping of where data is processed across geographic areas for Copilot in Fabric and Azure OpenAI features.

> [!NOTE]  
> The data processed for Copilot interactions can include user prompts, meta prompts, structure of data (schema) and conversation history. No data, such as content in tables is sent to Azure OpenAI for processing unless directed by the user.

| Geographic area where your Fabric Capacity is located | Geographic area where Azure OpenAI Service is hosted | Data processing outside your capacity's geographic region? | Actions required to use Fabric Copilot |
| --- | --- | --- | --- |
| US | US | No | Turn on Copilot. |
| EU Data Boundary | EU Data Boundary | No | Turn on Copilot. |
| UK | EU Data Boundary | Yes | Turn on Copilot.<br />Enable cross-geo data processing. |
| Australia<br />Brazil<br />Canada<br />India<br />Asia<br />Japan<br />Korea<br />South Africa<br />Southeast Asia<br />United Arab Emirates | US | Yes | Turn on Copilot.<br />Enable cross-geo data processing. |

### Data storage of conversation history cross geographic regions

> [!NOTE]
>This is only applicable for customers who want to use [Copilot in Notebooks](../data-engineering/copilot-notebooks-overview.md) and Fabric [data agents](../data-science/concept-data-agent.md) (formerly known as Data agent) powered by Azure OpenAI, and whose capacity's geographic region is outside of the EU data boundary and the US. 

In order to use fully conversational agentic AI experiences, the agent needs to store conversation history across user sessions. This ensures that the AI agent keeps context about what a user asked in previous sessions and is a desired behavior in many agentic experiences. Experiences such as Copilot in Notebooks and Fabric data agents are AI experiences that store conversation history across the user's sessions. **This history is stored inside the Azure security boundary, in the same region and in the same Azure Open AI resources that process all your Fabric AI requests.** The difference in this case is that the conversation history is stored for as log as the user allows. For experiences that don't store conversation history across sessions, no data is stored. Prompts are only processed by Azure OpenAI resources that Fabric uses.

**Your users can delete their conversation history at any time, simply by clearing the chat. This option exists both for Copilot in Notebooks and data agents.** If the conversation history isn't manually removed, it is stored for 28 days.

[Learn more about the tenant setting for conversation history](../admin/service-admin-portal-copilot.md)

## Related content

- [What is Microsoft Fabric?](../fundamentals/microsoft-fabric-overview.md)
- [Copilot for Microsoft Fabric and Power BI: FAQ](copilot-faq-fabric.yml)
- [AI services in Fabric (preview)](../data-science/ai-services/ai-services-overview.md)
- [Copilot tenant settings](../admin/service-admin-portal-copilot.md)
