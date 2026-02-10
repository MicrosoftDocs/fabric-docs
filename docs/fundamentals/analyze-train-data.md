---
title: Analyze and Train Data in Microsoft Fabric
description: Discover how Microsoft Fabric empowers data scientists with tools for ML model training, big data analysis, and AI workflows—all in one unified platform.
#customer intent: As a data scientist, I want to use Fabric's Data Science workload to train and track machine learning models so that I can operationalize them efficiently within a unified platform.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/20/2026
ms.topic: concept-article
---

# Analyze and train data in Microsoft Fabric

Beyond traditional analytics and reporting, Microsoft Fabric also includes capabilities for advanced analytics, such as machine learning (ML), AI model training, and big data analysis. The Data Science workload in Fabric is specifically geared towards those tasks, providing an environment where data scientists and analysts can build, train, and operationalize ML models by using the same unified data platform. By using Fabric IQ data agents, operations agents, and the Power BI Copilot, you can interact with data and insights by using natural language and act on conditions and patterns found.

### AI agents

:::image type="content" source="./media/analyze-train-data/analyze-agents.png" alt-text="Screenshot of AI Agents architecture diagram.":::

#### Data agent

By using [Fabric data agents](../data-science/concept-data-agent.md), you can build conversational Q&A systems over enterprise data by using generative AI. Users can ask plain‑English questions and receive structured, accurate, and secure answers without needing SQL, DAX, or KQL expertise. It works by using Azure OpenAI Assistant APIs to parse questions, identify the most relevant OneLake data source (such as Lakehouse, Warehouse, Power BI semantic models, KQL databases, or ontologies), and generate validated read‑only queries grounded in user permissions and responsible AI policies. [Organizations can tailor the agent with custom instructions, examples, and domain‐specific guidance](../data-science/data-agent-configurations.md) to ensure responses align with business logic and improve relevance.

Fabric Data Agents integrate with [Microsoft Foundry](../data-science/data-agent-foundry.md), [Copilot Studio](../data-science/data-agent-microsoft-copilot-studio.md), and [M365 Copilot](../data-science/data-agent-microsoft-365-copilot.md) to extend their role from conversational analytics into full agentic AI workflows:
* Foundry IQ provides a shared context layer where Data Agents contribute structured business insights alongside other agents, enabling multistep reasoning and orchestration across enterprise systems. 
* Copilot Studio allows these agents to be embedded as custom skills in Teams, web apps, or line-of-business applications, injecting live business context into Copilot prompts and combining Q&A with workflow automation. 
* The integration with M365 Copilot allows these agents to surface governed, ontology-driven insights directly within productivity tools like Outlook, Excel, and Teams, combining conversational analytics with workflow automation.

#### Operations agent

[Operations Agents](../real-time-intelligence/operations-agent.md) in Microsoft Fabric IQ are autonomous, ontology-driven AI components that monitor real-time data streams, interpret events in business context, and execute or recommend actions to optimize outcomes. They use the ontology to apply rules and objectives, enabling proactive decision-making rather than reactive responses. Integrated with Activator and Power Automate, they can trigger workflows across ERP, CRM, and other systems, while Teams provides alerts and human-in-the-loop approvals for governed autonomy. Unlike Data Agents, which focus on answering questions, Operations Agents continuously act on live conditions, learning from results to improve future decisions and transform operations into adaptive, context-aware automation.

#### Choose between data agents and operations agents

Data Agents and Operations Agents in Microsoft Fabric IQ serve distinct roles: Data Agents provide conversational analytics by answering user questions in natural language, leveraging ontology for semantic grounding and querying multiple sources like Lakehouses, Warehouses, and Power BI models. They integrate externally through Teams, Copilot Studio, and custom apps for insight delivery. In contrast, Operations Agents focus on autonomous decision-making. They monitor real-time data streams against ontology-based rules to trigger or recommend actions. They integrate with Power Automate (via Activator), Teams for alerts and approvals, and external operational systems like ERP or CRM. Essentially, Data Agents democratize data access for insights, while Operations Agents drive proactive, governed automation for operational optimization.

### Data science workflows

:::image type="content" source="./media/analyze-train-data/analyze-data-science.png" alt-text="Screenshot of Data Science workflows diagram.":::

[Fabric's Data Science experience](../data-science/data-science-overview.md) covers the entire ML lifecycle, from data exploration and preparation to model experimentation, tracking, deployment, and consumption. All the tools you need, like notebooks, Apache Spark, MLflow tracking, AutoML, and more, are built-in. Data scientists can develop and operationalize ML models alongside data engineers and analysts in one place.

#### Track experiments with MLflow

[Experiments](../data-science/machine-learning-experiment.md) in Microsoft Fabric organize and track model training runs. An experiment in Fabric works like an MLflow experiment: it contains a collection of runs, where each run is one execution of model training code. Because Fabric integrates with MLflow, every run can [automatically log relevant information](../data-science/mlflow-autologging.md) such as hyperparameters, metrics, tags, code version, and output artifacts without requiring custom logging code. This MLflow tracking is natively built into Fabric's notebooks and Spark jobs, so data scientists can use mlflow APIs or Fabric's UI to create experiments and record runs.

#### Register and deploy ML models

[ML Models](../data-science/machine-learning-model.md) in Fabric are registered machine learning models. Fabric's model management uses MLflow-powered registries to store, version, and track models. After selecting the best experiment run, data scientists register the model in Fabric's model registry. The registry captures metadata such as source run, hyperparameters, metrics, and environment details for reproducibility. Models are saved in a standardized MLflow format, enabling interoperability across Spark and Python environments.

ML Model deployment options include batch scoring directly within Fabric by using Spark for large-scale inference and writing predictions back to OneLake for immediate Power BI consumption. Additionally, [real-time endpoints](../data-science/model-endpoints.md) enable one-click activation of REST APIs for low-latency predictions with auto-scaling and minimal setup. These options make operationalization of ML models faster and more integrated with enterprise workflows.

### Developer data access with GraphQL

[API for GraphQL](../data-engineering/api-graphql-overview.md) provides a data‑access layer that developers use to query multiple Fabric data sources (Data Warehouse, SQL Database, Lakehouse, mirrored databases) through a single, flexible GraphQL endpoint. It abstracts backend complexities so applications can request exactly the data they need in one call, reducing over‑fetching and improving performance. The API supports automatic schema discovery, generated queries and mutations, relationship modeling, monitoring, and an interactive editor with IntelliSense for building and testing GraphQL operations. It makes it easier to expose specific tables, views, and fields while enabling fast, client‑driven data access across Fabric environments.

### Copilot for Power BI 

[Copilot for Power BI](/power-bi/create-reports/copilot-introduction) uses generative AI to help business users and report creators work more efficiently by enabling natural‑language interactions with their data. It supports tasks like ad‑hoc analysis, finding insights, generating DAX expressions, and creating visuals on the fly. 

The [standalone Copilot experience in Power BI](/power-bi/create-reports/copilot-chat-with-data-standalone) provides a full‑screen, cross‑item conversational interface that helps users explore and analyze data by answering questions across any report, semantic model, or Fabric data agent they have access to, rather than being limited to the report currently open. It identifies the most relevant data source automatically, asks clarifying questions when needed, and can immediately deliver insights once it selects the right report or model. For best results, authors [must prepare data for AI](/power-bi/create-reports/copilot-prepare-data-ai) and approve semantic models for Copilot to ensure accuracy; otherwise, users might encounter warning messages or get limited answers.