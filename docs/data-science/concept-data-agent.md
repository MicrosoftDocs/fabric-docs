---
title: Fabric data agent creation
description: Learn how to create a Fabric data agent that can answer questions about data.
ms.reviewer: amjafari
ms.topic: concept-article
ms.date: 01/06/2026
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
ms.search.form: Fabric data agent Concepts
ai-usage: ai-assisted
#customer intent: As a Data Analyst, I want to create a Fabric data agent so that I can make it easier for me and my colleagues to get answers from data.
---

# Fabric data agent concepts

Data agent in Microsoft Fabric is a generally available feature that enables you to build your own conversational Q&A systems by using generative AI.A Fabric data agent makes data insights more accessible and actionable for everyone in your organization. By using a Fabric data agent, your team can have conversations, with plain English-language questions, about the data that your organization stored in Fabric OneLake and then receive relevant answers. This way, even people without technical expertise in AI or a deep understanding of the data structure can receive precise and context-rich answers. Within broader agentic application architectures on Microsoft Fabric, data agents serve as the conversational analytics component, connecting to governed data in OneLake through lakehouses, warehouses, semantic models, and KQL databases in multi-agent solutions.

You can also add organization-specific instructions, examples, and guidance to fine-tune the Fabric data agent. This approach ensures that responses align with your organization's needs and goals, allowing everyone to engage with data more effectively. Fabric data agent fosters a culture of data-driven decision-making because it lowers barriers to insight accessibility, facilitates collaboration, and helps your organization extract more value from its data.

[!INCLUDE [data-agent-prerequisites](./includes/data-agent-prerequisites.md)]

### Governance prerequisites

If your tenant or workspace is governed by Microsoft Purview policies, agents must operate within those policies. The following Purview policies can limit agent access and the results that agents return, based on sensitivity and policy configuration:

- **Purview DLP policies in Fabric Data Warehouse** (generally available): DLP policies can detect and restrict access to sensitive data in warehouse assets that the agent queries.
- **Access restriction policies** (preview) for Fabric KQL Database, Fabric SQL Database, and Fabric Data Warehouse: These policies can prevent the agent from accessing or returning results from assets that are classified as sensitive.

## How the Fabric data agent works

The Fabric data agent uses large language models (LLMs) to help users interact with their data naturally. The Fabric data agent applies Azure OpenAI Assistant APIs and behaves like an agent. It processes user questions, determines the most relevant data source (Lakehouse, Warehouse, Power BI dataset, KQL databases, ontology, or Microsoft Graph), and invokes the appropriate tool to generate, validate, and execute queries. Users can then ask questions in plain language and receive structured, human-readable answers. This approach eliminates the need to write complex queries and ensures accurate and secure data access.

Here's how it works in detail:

**Question parsing and validation**: The Fabric data agent applies Azure OpenAI Assistant APIs as the underlying agent to process user questions. This approach ensures that the question complies with security protocols, responsible AI (RAI) policies, and user permissions. The Fabric data agent also respects Microsoft Purview governance controls applied to the underlying Fabric data sources, including Data Loss Prevention (DLP) and access restriction policies. Policy enforcement might prevent certain queries from running or specific data from being surfaced in responses. The Fabric data agent strictly enforces read-only access, maintaining read-only data connections to all data sources.

**Enforcement mechanisms**: The Fabric data agent applies several layers of protection during processing. It uses the requesting user's credentials and permissions to enforce least-privilege access, ensuring that each interaction only reaches data the user is authorized to view. The agent evaluates requests against tenant and workspace policy settings before executing any action. Guardrails constrain tool invocation and outputs to scoped data sources, preventing queries from reaching resources outside the configured scope. You can optionally integrate [Azure AI Content Safety](/azure/ai-services/content-safety/overview) to apply content risk controls that help reduce harmful or out-of-policy responses.

**Data source identification**: The Fabric data agent uses the user's credentials to access the schema of the data source. This approach ensures that the system fetches data structure information that the user has permission to view. The agent then evaluates the user's question against all available data sources, including relational databases (Lakehouse and Warehouse), Power BI datasets (Semantic Models), KQL databases, ontologies, and Microsoft Graph. It might also reference user-provided data agent instructions to determine the most relevant data source. For Power BI semantic models, the agent uses the user's Read permission on the model to retrieve schema and metadata for query generation; Build permission isn't required for agent-driven queries.

**Tool invocation and query generation**: Once the correct data source or sources are identified, the Fabric data agent rephrases the question for clarity and structure, and then invokes the corresponding tool to generate a structured query:

- Natural language to SQL (NL2SQL) for relational databases (Lakehouse/Warehouse).
- Natural language to DAX (NL2DAX) for Power BI datasets (Semantic Models).
- Natural language to KQL (NL2KQL) for KQL databases. NL2KQL can use KQL user-defined functions (UDFs) when they're available in the selected databases.
- Microsoft Graph queries for organizational data accessible through Microsoft Graph.

The selected tool generates a query based on the provided schema, metadata, and context that the agent underlying the Fabric data agent then passes.

**Query validation**: The tool performs validation to ensure the query is correctly formed and adheres to its own security protocols and RAI policies.

**Query execution and response**: Once validated, the Fabric data agent executes the query against the chosen data source. The results are formatted into a human-readable response, which might include structured data such as tables, summaries, or key insights.

By using this approach, users can interact with their data by using natural language. The Fabric data agent handles the complexities of query generation, validation, and execution. Users don't need to write SQL, DAX, or KQL themselves.

## Security and governance with Microsoft Purview

Microsoft Purview provides governance and risk controls for Fabric data agents. These features are currently in preview and help organizations maintain compliance when using agents to access Fabric data. Key capabilities include:

- **Risk discovery and auditing**: Prompts and responses from Fabric data agents can be subject to Purview risk discovery and auditing, giving security teams visibility into how agents interact with organizational data.
- **DSPM Data Risk Assessments**: Data Security Posture Management (DSPM) Data Risk Assessments can surface sensitive data risks in the data sources that agents use, helping you identify and address potential exposure.
- **Insider Risk Management**: Purview Insider Risk Management can detect risky AI usage patterns involving agents, such as unusual query volumes or access to sensitive data.
- **Audit, eDiscovery, and retention**: Purview Audit, eDiscovery, and retention policies apply to agent interactions and outputs in supported Fabric workloads. Non-compliant usage detection can also flag agent activity that violates organizational policies.

For more information about how Microsoft Purview integrates with Fabric, see [Use Microsoft Purview to govern Microsoft Fabric](../governance/microsoft-purview-fabric.md).

## Fabric data agent configuration

Configuring a Fabric data agent is similar to building a Power BI report—you start by designing and refining it to ensure it meets your needs, then publish and share it with colleagues so they can interact with the data. Setting up a Fabric data agent involves:

**Selecting data sources**: A Fabric data agent supports up to five data sources in any combination, including lakehouses, warehouses, KQL databases, Power BI semantic models, ontologies, and Microsoft Graph. For example, a configured Fabric data agent could include five Power BI semantic models. It could include a mix of two Power BI semantic models, one lakehouse, and one KQL database. You have many available options.

**Choosing Relevant Tables**: After you select the data sources, add them one at a time, and define the specific tables from each source that the Fabric data agent uses. This step ensures that the Fabric data agent retrieves accurate results by focusing only on relevant data. For lakehouses, this step means selecting lakehouse tables (not individual lakehouse files). If your data starts as files (for example, CSV or JSON), make it available to the agent by ingesting it into tables or otherwise exposing it through tables.

**Adding Context**: To improve the Fabric data agent accuracy, provide more context through Fabric data agent instructions and example queries. As the underlying agent for the Fabric data agent, the context helps the Azure OpenAI Assistant API make more informed decisions about how to process user questions, and determine which data source is best suited to answer them.

- **Data agent instructions**: Add instructions to guide the agent that underlies the Fabric data agent, in determining the best data source to answer specific types of questions. You can also provide custom rules or definitions that clarify organizational terminology or specific requirements. These instructions can provide more context or preferences that influence how the agent selects and queries data sources. For example, direct questions about **financial metrics** to a Power BI semantic model, assign queries involving **raw data exploration** to the lakehouse, and route questions requiring **log analysis** to the KQL database.

- **Example queries**: Add sample question-query pairs to illustrate how the Fabric data agent should respond to common queries. These examples serve as a guide for the agent, which helps it understand how to interpret similar questions and generate accurate responses.

> [!NOTE]
> Adding sample query/question pairs isn't currently supported for Power BI semantic model data sources.

By combining clear AI instructions and relevant example queries, you can better align the Fabric data agent with your organization's data needs, ensuring more accurate and context-aware responses.

> [!IMPORTANT]
> Developer-provided data agent instructions and example queries must operate within organizational and role-based constraints. If instructions or prompts conflict with policy (for example, attempts to bypass read-only behavior or access out-of-scope sources), the agent refuses or redirects the request according to the precedence model described in the following section.

### Governance and intent layers

When you configure a Fabric data agent, multiple layers of intent can influence how the agent behaves. These layers, listed from highest to lowest precedence, define what the agent is allowed to do:

1. **Organizational intent**: Tenant-wide policies and compliance requirements set by your organization's administrators. These constraints take the highest precedence and can't be overridden by any other layer.
1. **Role-based intent**: Workspace governance settings and permission boundaries that apply to specific roles or groups. These settings enforce access controls and data scope restrictions.
1. **Developer intent**: Custom instructions, example queries, and data source configurations that you provide when you build the data agent.
1. **User intent**: Questions and prompts that end users submit during conversations with the agent.

When conflicts arise between layers, higher-precedence layers override lower ones. For example, organizational policies and workspace governance settings always override developer instructions and user prompts. This precedence model ensures that the agent operates within approved boundaries, regardless of how it's configured or prompted.

## Difference between a Fabric data agent and a copilot

While both Fabric data agents and Fabric copilots use generative AI to process and reason over data, key differences exist in their functionality and use cases:

**Configuration flexibility**: You can highly configure Fabric data agents. You can provide custom instructions and examples to tailor their behavior to specific scenarios. Fabric copilots, on the other hand, come preconfigured and don't offer this level of customization.

**Scope and use case**: Fabric copilots assist with tasks within Microsoft Fabric, such as generating notebook code or warehouse queries. Fabric data agents, in contrast, are standalone configurable artifacts that can query data across OneLake and semantic models. Fabric data agents can also integrate with Microsoft 365 Copilot to surface natural-language insights directly within Microsoft 365 apps. When agents are accessed through Microsoft 365 Copilot, Microsoft Purview governance policies still apply to the underlying data sources. Additionally, Fabric data agents can connect with external systems like Microsoft Copilot Studio, Azure AI Foundry, Microsoft Teams, or other tools outside Fabric. External orchestrators and multi-agent runtimes can invoke Fabric data agents to support end-to-end agentic workflows, while the data agents remain focused on read-only, governed data access.

## Evaluation of the Fabric data agent

The product team rigorously evaluated the quality and safety of Fabric data agent responses:

**Benchmark Testing**: The product team tested Fabric data agents across a range of public and private datasets to ensure high-quality and accurate responses.

**Enhanced Harm Mitigations**: The product team implemented safeguards to ensure that Fabric data agent outputs remain focused on the context of selected data sources, reducing the risk of irrelevant or misleading answers.

## Governance and security

Microsoft Purview integration provides governance controls for Fabric data agents. When you configure a data agent, Purview governance policies apply to the underlying data sources the agent can access. This integration helps ensure that data access through agents follows the same compliance and classification rules as direct access.

**Microsoft Purview policies**: Purview policies such as data access controls and sensitivity labels apply to data sources that agents query. If a Purview policy restricts access to a lakehouse or warehouse, the agent respects that restriction when processing user queries.

**Outbound access protection**: Fabric data agents operate within workspace outbound access protection boundaries. Workspace administrators can manage permitted outbound connections through the workspace settings to control which external endpoints the data agent can reach.

**Microsoft 365 Copilot integration**: When Fabric data agents are surfaced through Microsoft 365 Copilot, Purview governance policies continue to apply. Users can only access data that their credentials and Purview policies allow, regardless of the entry point.

## ALM and DevOps for data agents

Fabric data agents support application lifecycle management (ALM) capabilities that help you manage agent configurations across development, test, and production environments.

**Diagnostics**: Use built-in diagnostics to monitor agent behavior, identify query generation issues, and troubleshoot response quality. Diagnostics provide visibility into how the agent processes questions and selects data sources.

**Git integration**: You can version-control your agent configurations with Git integration. Connect your Fabric workspace to a Git repository to track changes to agent instructions, example queries, and data source selections over time.

**Deployment pipelines**: Use Fabric deployment pipelines to promote data agents across workspaces (for example, from development to production). This support lets you test changes in a staging environment before making them available to end users.

### Operational oversight

To maintain ongoing quality and policy alignment, consider these operational practices for your Fabric data agent:

- **Logging and audit**: Monitor agent interactions through available logging and audit capabilities. Reviewing query patterns and response quality helps you identify unexpected behavior early.
- **Human-in-the-loop escalation**: Establish escalation paths for sensitive or high-impact requests. For scenarios where automated responses aren't sufficient, define processes that route questions to qualified reviewers.
- **Periodic review**: Regularly review your data agent instructions and example queries to ensure they remain aligned with current organizational policies and data structures. As your data sources or business requirements change, update the agent configuration accordingly.

## Limitations

- The Fabric data agent only generates SQL, DAX, and KQL "read" queries. It doesn't generate SQL, DAX, or KQL queries that create, update, or delete data.
- The Fabric data agent doesn't support unstructured data, such as .pdf, .docx, or .txt files. You can't use the Fabric data agent to access unstructured data resources.
- For lakehouse data sources, the Fabric data agent answers questions using the lakehouse tables you select. It doesn't directly read standalone lakehouse files (for example, CSV or JSON files) unless they're ingested or exposed as tables.
- The Fabric data agent doesn't currently support non-English languages. For optimal performance, provide questions, instructions, and example queries in English.
- You can't change the LLM that the Fabric data agent uses.
- Conversation history in the Fabric data agent might not always persist. In certain cases, such as backend infrastructure changes, service updates, or model upgrades, past conversation history might be reset or lost.
- The Fabric data agent can't execute queries when the data source's workspace capacity is in a different region than the data agent's workspace capacity. For example, a lakehouse with capacity in North Europe fails if the Data Agent's capacity is in France Central.
- Users can provide up to 100 example queries per data source in their Data Agent.
- Fabric Data Agents are currently designed for conversational insights rather than for returning complete datasets. To ensure concise and performant responses, chat outputs automatically limit and/or summarize the data returned. At present, responses are capped at a maximum of 25 rows and 25 columns. Please note that previous chat history can influence subsequent responses. For example, if you ask to “show all rows for this year,” the agent will still return a maximum of 25 rows. Follow‑up questions may then be answered based on this already limited context, which can affect the result. In such cases, starting a new chat session is recommended.
- Agent responses might be truncated or blocked if Microsoft Purview DLP or access restriction policies apply to the underlying data sources. The specific behavior depends on your organization's policy configuration.
- Assets that are marked as sensitive by Purview policies might be inaccessible to the agent, which can result in incomplete answers or an inability to query certain data sources.
- Agent interactions might be logged and discoverable through Microsoft Purview Audit and eDiscovery. Organizations should consider these governance controls when deploying agents for sensitive workloads.
- Access to Power BI semantic models through a data agent is governed by Read permission on the model and doesn't require workspace-level access. Row-Level Security (RLS) and Column-Level Security (CLS) still apply.

## Related content

- [Fabric data agent end-to-end tutorial](data-agent-end-to-end-tutorial.md)
- [Create a Fabric data agent](how-to-create-data-agent.md)
- [Azure AI Content Safety overview](/azure/ai-services/content-safety/overview)
