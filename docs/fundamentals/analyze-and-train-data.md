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

# Analyze and train data

Beyond traditional analytics and reporting, Microsoft Fabric also includes capabilities for advanced analytics, such as machine learning (ML), AI model training, and big data analysis. The Data Science workload in Fabric is specifically geared towards those tasks, providing an environment where data scientists and analysts can build, train, and operationalize ML models using the same unified data platform. Fabric IQ data agents, operations agents and the Power BI Copilot offer a way to interact with data and insights using natural language and act on conditions and patterns found.

### AI Agents

:::image type="content" source="./media/Analyze-AIAgents.png" alt-text="Screenshot of AI Agents architecture diagram.":::

#### Data gent

[Fabric data agents](/fabric/data-science/concept-data-agent) let you build conversational Q&A systems over enterprise data using generative AI, enabling users to ask plain‑English questions and receive structured, accurate, and secure answers without needing SQL, DAX, or KQL expertise. It works by using Azure OpenAI Assistant APIs to parse questions, identify the most relevant OneLake data source (such as Lakehouse, Warehouse, Power BI semantic models, KQL databases, or ontologies), and generate validated read‑only queries grounded in user permissions and responsible AI policies. [Organizations can tailor the agent with custom instructions, examples, and domain‐specific guidance](/fabric/data-science/data-agent-configurations) to ensure responses align with business logic and improve relevance.

Fabric Data Agents integrate with [Microsoft Foundry](/fabric/data-science/data-agent-foundry), [Copilot Studio](/fabric/data-science/data-agent-microsoft-copilot-studio) and [M365 Copilot](/fabric/data-science/data-agent-microsoft-365-copilot) to extend their role from conversational analytics into full agentic AI workflows:
* Foundry IQ provides a shared context layer where Data Agents contribute structured business insights alongside other agents, enabling multi-step reasoning and orchestration across enterprise systems. 
* Copilot Studio allows these agents to be embedded as custom skills in Teams, web apps, or line-of-business applications, injecting live business context into Copilot prompts and combining Q&A with workflow automation. 
* The integration with M365 Copilot allows these agents to surface governed, ontology-driven insights directly within productivity tools like Outlook, Excel, and Teams, combining conversational analytics with workflow automation.

#### Operations Agent

[Operations Agents](/fabric/real-time-intelligence/operations-agent) in Microsoft Fabric IQ are autonomous, ontology-driven AI components that monitor real-time data streams, interpret events in business context, and execute or recommend actions to optimize outcomes. They use the ontology to apply rules and objectives, enabling proactive decision-making rather than reactive responses. Integrated with Activator and Power Automate, they can trigger workflows across ERP, CRM, and other systems, while Teams provides alerts and human-in-the-loop approvals for governed autonomy. Unlike Data Agents, which focus on answering questions, Operations Agents continuously act on live conditions, learning from results to improve future decisions and transform operations into adaptive, context-aware automation.

#### Choose between Data Agents and Operations Agent

Data Agents and Operations Agents in Microsoft Fabric IQ serve distinct roles: Data Agents provide conversational analytics by answering user questions in natural language, leveraging ontology for semantic grounding and querying multiple sources like Lakehouses, Warehouses, and Power BI models, and integrate externally through Teams, Copilot Studio, and custom apps for insight delivery. In contrast, Operations Agents focus on autonomous decision-making, monitoring real-time data streams against ontology-based rules to trigger or recommend actions, integrating with Power Automate (via Activator), Teams for alerts and approvals, and external operational systems like ERP or CRM. Essentially, Data Agents democratize data access for insights, while Operations Agents drive proactive, governed automation for operational optimization.

### Data science workflows

:::image type="content" source="./media/Analyze-DataScience.png" alt-text="Screenshot of Data Science workflows diagram.":::

[Fabric's Data Science experience](/fabric/data-science/data-science-overview) covers the entire ML lifecycle, from data exploration and preparation to model experimentation, tracking, deployment, and consumption. All the tools needed (like notebooks, Apache Spark, MLflow tracking, AutoML, etc.) are built-in, allowing data scientists to develop and operationalize ML models alongside data engineers and analysts in one place.

#### Experiments

[Experiments](/fabric/data-science/machine-learning-experiment) in Microsoft Fabric are the primary mechanism for organizing and tracking model training runs. An experiment in Fabric is analogous to an MLflow experiment: it contains a collection of runs, where each run is one execution of model training code. Fabric's integration with MLflow means that every run can [automatically log relevant information](/fabric/data-science/mlflow-autologging) (such as hyperparameters, metrics, tags, code version, and output artifacts) without requiring custom logging code. This MLflow tracking is natively built into Fabric's notebooks and Spark jobs, so data scientists can use mlflow APIs (or Fabric's UI) to create experiments and record runs.

#### ML Model

[ML Models](/fabric/data-science/machine-learning-model) in Fabric refer to registered machine learning models. Fabric's model management centers on using MLflow-powered registries to store, version, and track models . After selecting the best experiment run, data scientists can register the model in Fabric's model registry, which captures metadata such as source run, hyperparameters, metrics, and environment details for reproducibility. Models are saved in a standardized MLflow format, enabling interoperability across Spark and Python environments.

ML Model deployment options include batch scoring directly within Fabric using Spark for large-scale inference and writing predictions back to OneLake for immediate Power BI consumption. Additionally, [real-time endpoints](/fabric/data-science/model-endpoints), enable one-click activation of REST APIs for low-latency predictions with auto-scaling and minimal setup, making operationalization of ML models faster and more integrated with enterprise workflows.

### Developer

[API for GraphQL](/fabric/data-engineering/api-graphql-overview) provides a data‑access layer that allows developers to query multiple Fabric data sources (Data Warehouse, SQL Database, Lakehouse, mirrored databases) through a single, flexible GraphQL endpoint. It abstracts backend complexities so applications can request exactly the data they need in one call, reducing over‑fetching and improving performance. The API supports automatic schema discovery, generated queries and mutations, relationship modeling, monitoring, and an interactive editor with IntelliSense for building and testing GraphQL operations, making it easier to expose specific tables, views, and fields while enabling fast, client‑driven data access across Fabric environments.

### Copilot for Power BI 

[Copilot for Power BI](/power-bi/create-reports/copilot-introduction) uses generative AI to help business users and report creators work more efficiently by enabling natural‑language interactions with their data, supporting tasks like ad‑hoc analysis, finding insights, generating DAX expressions, and creating visuals on the fly. 

The [standalone Copilot experience in Power BI](/power-bi/create-reports/copilot-chat-with-data-standalone) provides a full‑screen, cross‑item conversational interface that helps users explore and analyze data by answering questions across any report, semantic model, or Fabric data agent they have access to, rather than being limited to the report currently open. It identifies the most relevant data source automatically, asks clarifying questions when needed, and can immediately deliver insights once it selects the right report or model. For best results, authors [must prepare data for AI](/power-bi/create-reports/copilot-prepare-data-ai) and approve semantic models for Copilot to ensure accuracy; otherwise, users may encounter warning messages or get limited answers.