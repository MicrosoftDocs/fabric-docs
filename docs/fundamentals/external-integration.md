---
title: Integrate Microsoft Fabric with external systems
description: Learn how Microsoft Fabric integrates with external systems to enable seamless data flow, real-time automation, and actionable insights across your organization.
#customer intent: As a data analyst, I want to integrate Microsoft Fabric with Power Automate so that I can automate workflows triggered by real-time data conditions.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/11/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# External integration and platform connectivity

Although Fabric is an all-in-one platform, it integrates with external systems both for bringing data in and for pushing data and insights out. This article describes how Fabric connects to external services and how other systems can consume Fabric-hosted data.

## Automate actions with Data Activator

:::image type="content" source="./media/external-integration/integration-actions.png" alt-text="Diagram of integration actions architecture.":::

[Data Activator](../real-time-intelligence/data-activator/activator-introduction.md) provides real-time automation by monitoring data streams and triggering actions when defined conditions occur. Activator integrates with:
* **[Power Automate](../real-time-intelligence/data-activator/activator-trigger-power-automate-flows.md)** to execute workflows such as sending notifications, updating records, or initiating business processes. You can create triggers in Fabric and link them to Power Automate flows for downstream actions, for example, alerting when a KPI threshold is crossed.
* Teams to post adaptive cards or messages to channels when real-time conditions are met.
* Outlook to send automated emails to stakeholders for alerts or approvals.
* **[Fabric items](../real-time-intelligence/data-activator/activator-trigger-fabric-items.md)** to initiate actions such as refreshing a Power BI dataset or starting a pipeline run. These capabilities enable end-to-end automation across analytics and collaboration tools, so that insights from streaming data lead to immediate, actionable outcomes without manual intervention.

## Collaborate across Microsoft 365

:::image type="content" source="./media/external-integration/integration-collaboration.png" alt-text="Diagram of integration collaboration architecture.":::

Microsoft Fabric works within the Microsoft 365 ecosystem, enabling collaborative analytics and data-driven workflows across familiar productivity tools:

* [Microsoft Teams](/power-bi/collaborate-share/service-collaborate-microsoft-teams): Share reports, dashboards, and analytics directly in Teams channels or chats. You can embed Power BI visuals (part of Fabric) in Teams tabs, collaborate on insights, and receive notifications for data-driven alerts. This integration supports real-time collaboration on analytics without leaving the Teams environment.

* [Excel](/power-bi/collaborate-share/service-analyze-in-excel): Connect Excel to Fabric datasets by using the "Analyze in Excel" feature, which enables PivotTables and advanced analysis on Fabric data while maintaining live connectivity. This approach bridges self-service analytics with enterprise-scale data models.

* [PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about): Export or embed reports and visuals from Fabric (through Power BI) into PowerPoint presentations so that stakeholders can present live or snapshot analytics in executive decks.

* [SharePoint and OneDrive](/power-bi/create-reports/desktop-sharepoint-save-share): Publish Fabric artifacts such as reports and dashboards to SharePoint Online for broad organizational access. OneDrive integration also supports storing and sharing related files (for example, exported data and documentation) alongside Fabric workspaces. These integrations use Microsoft 365's security and compliance features to ensure governed collaboration.

Together, these integrations enable end-to-end collaboration: from analyzing data in Fabric, discussing insights in Teams, refining models in Excel, presenting in PowerPoint, and sharing securely through SharePoint and OneDrive—all within the Microsoft 365 ecosystem.

## Agentic AI integration

:::image type="content" source="./media/external-integration/agentic-integration.png" alt-text="Diagram of agentic AI integration architecture.":::

Microsoft Fabric is evolving beyond analytics into an intelligence platform that powers Agentic AI workflows. At the core is Fabric IQ, a semantic layer that unifies business meaning across data sources and enables AI agents to reason with context rather than raw tables. This foundation integrates with three key components to deliver end-to-end agentic capabilities:

* Microsoft Foundry: Acts as the knowledge and custom AI layer, hosting fine-tuned models and providing policy-governed knowledge retrieval. Foundry enables advanced reasoning, multi-agent orchestration, and integration through open standards like the Model Context Protocol (MCP), so that agents can interact with external systems and enterprise knowledge securely. Foundry can [use Fabric Data Agents](/azure/ai-foundry/agents/how-to/tools/fabric) as part of an Agentic AI workflow.

* Copilot Studio: Serves as the agent orchestration and workflow builder, which lets you design custom conversational agents and automate processes without heavy coding. Studio agents can [invoke Fabric Data Agents](/microsoft-copilot-studio/add-agent-fabric-data-agent) for governed insights and call Foundry services for complex logic, creating composable workflows that bridge business and technical domains.

* Microsoft 365 Copilot: Provides the user interface and orchestration layer, embedding these capabilities into everyday tools like Teams and Outlook. It routes user queries to the right agents, merges outputs, and applies Work IQ (user context) for personalized, compliant responses while respecting enterprise security and governance. Microsoft 365 Copilot can [consume Fabric Data Agents](../data-science/data-agent-microsoft-365-copilot.md) as part of an Agentic AI workflow.

## Developer tools and APIs

:::image type="content" source="./media/external-integration/integration-developer.png" alt-text="Diagram of developer integration architecture.":::

Microsoft Fabric supports both data analysts and developers who prefer a code-first approach. With Visual Studio Code, developers can create, manage, and automate Fabric artifacts while integrating with modern DevOps practices. This approach enables teams to build scalable data solutions and AI workflows by using familiar tools and processes.

* Create and manage Fabric artifacts in VS Code: Use [Fabric extensions](../data-engineering/set-up-fabric-vs-code-extension.md) and [CLI tools](../rest/api/fabric/articles/fabric-command-line-interface.md) within VS Code to create and manage Fabric artifacts such as lakehouses, user data functions, and notebooks.

* Connect to Fabric data sources
  * SQL endpoints: [Fabric lakehouses and warehouses expose T-SQL endpoints](../data-warehouse/how-to-connect.md) that let developers query data by using standard SQL syntax from VS Code or any SQL client.
  * GraphQL APIs: Fabric provides [GraphQL APIs for programmatic access to data and metadata](../data-engineering/connect-apps-api-graphql.md), which enables developers to build custom apps or services that interact with Fabric datasets without relying on UI tools.

### Unified data estate

:::image type="content" source="./media/external-integration/integration-unified-data-estate.png" alt-text="Diagram of unified data estate integration architecture.":::

#### OneLake interoperability

[OneLake is a unified data lake](../onelake/onelake-overview.md) that prioritizes openness and interoperability. Instead of locking data into proprietary formats, OneLake uses widely adopted open standards to ensure flexibility, portability, and compatibility across ecosystems. This approach is critical for enterprises that need to integrate diverse tools and avoid vendor lock-in. OneLake achieves interoperability through two key strategies:

* **Support for Delta Lake and Iceberg file formats**
  * [Delta Lake](../fundamentals/delta-lake-interoperability.md): OneLake natively supports Delta Lake, which enables ACID transactions, schema enforcement, and time travel on large-scale datasets. This support makes OneLake compatible with engines like Azure Databricks, Apache Spark, and other lakehouse architectures.
  * [Apache Iceberg](../onelake/onelake-iceberg-tables.md): Iceberg support provides advanced table management features such as partitioning, schema evolution, and versioning. This support ensures that OneLake can integrate with modern analytics tools and big data frameworks that rely on Iceberg for scalable table operations.

* **Universal data access through APIs**
  * Table APIs: OneLake exposes [Table APIs](../onelake/table-apis/table-apis-overview.md) that let developers and applications interact with tables programmatically regardless of the file format used to store them. These APIs enable listing, querying, and managing tables in OneLake, and support integration with custom applications and automation workflows.
  * ADLS Gen2 APIs: OneLake is built on Azure Data Lake Storage Gen2, so it [supports the same REST APIs and hierarchical namespace features](../onelake/onelake-api-parity.md). This compatibility lets existing tools and scripts designed for ADLS Gen2 work with OneLake without modification, which simplifies migration and integration.

By using these open file formats and APIs, OneLake ensures that data stored in OneLake can be read and written by multiple compute engines without conversion, making it a true interoperable data foundation.

#### Azure Databricks integration

The OneLake and Azure Databricks integration provides a foundation for unified analytics and AI. This integration combines OneLake's governed, open data estate with Databricks' data engineering and machine learning capabilities. The bi-directional integration between OneLake and Azure Databricks takes the following forms:
* [Azure Databricks Catalog Mirroring](../mirroring/azure-databricks.md): Mirrors Unity Catalog from Databricks into OneLake. Tables managed in Databricks can appear as shortcuts in OneLake, which enables Fabric workloads (Power BI, Data Agents, Ontologies, Notebooks) to access Databricks data without duplication.
* [Databricks reading from OneLake](../onelake/onelake-azure-databricks.md): Databricks can read and write data stored in OneLake through Delta Lake compatibility. Because OneLake supports open formats (Delta, Parquet), Databricks can mount OneLake storage or access it through ADLS Gen2 APIs with no need for ETL or data duplication.

#### Snowflake integration

The OneLake and Snowflake integration delivers a zero-copy architecture that lets you unify analytics and AI without duplicating data. This approach is built on open standards and shortcut technology, ensuring interoperability while maintaining governance and performance.

* [OneLake shortcuts to Snowflake Iceberg tables](../onelake/onelake-iceberg-tables.md): Fabric uses shortcuts that reference Snowflake tables directly in OneLake. Data remains in Snowflake but appears as part of the OneLake logical data estate. Fabric workloads (Power BI, Dataflows, AI agents) can query Snowflake data alongside native OneLake data without ETL or replication. Governance and security policies remain intact across both platforms.
* [Snowflake access to OneLake](https://www.snowflake.com/en/developers/guides/getting-started-with-iceberg-in-onelake/): Snowflake can query OneLake data through external tables. Because OneLake supports Delta Lake and Parquet, Snowflake reads these formats natively, which enables high-performance queries on OneLake data from Snowflake compute.

## Platform architecture

:::image type="content" source="./media/external-integration/platform.png" alt-text="Screenshot of platform architecture diagram.":::

### Azure

Microsoft Fabric is built as a Software-as-a-Service (SaaS) platform on Azure's infrastructure, meaning it relies on core Azure services for identity, networking, security, monitoring, and more. In practice, a Fabric tenant and its capacities are first-class Azure resources under your Azure subscription. This allows Fabric to integrate with Azure's billing system, use Azure's monitoring and logging capabilities, enforce security through Azure identity and networking features, and interoperate with Azure data services.

#### Azure billing

[Microsoft Fabric capacities](../enterprise/licenses.md#capacity.md) represent the provisioned compute tiers for Fabric and are managed as Azure resources within your subscription. When you enable Fabric, an [Azure Fabric capacity resource is created](../enterprise/buy-subscription.md), representing the Fabric tenant's analytics capacity. In the Azure portal you have the ability to [pause and resume your capacity](../enterprise/pause-resume.md) and [scale it up and down](../enterprise/scale-capacity.md) as needed. You can Billing for Fabric is thus handled through your Azure subscription's billing system. All Fabric usage charges (for compute, storage, etc.) accrue under your subscription and appear in Azure Cost Management alongside other Azure services.

#### Networking

Microsoft Fabric supports Azure Private Endpoints for private, internal-only access to Fabric endpoints. When you enable Private Link for Fabric at the [tenant level](../security/security-private-links-overview.md) or [workspace level](../security/security-workspace-level-private-links-overview.md), Fabric exposes private endpoint URLs for services (OneLake, Warehouse SQL endpoints, and others) that are accessible only through your Azure Virtual Network. Traffic routes through Azure's private backbone network instead of the public internet. With **Block Public Internet Access** enabled in Fabric, attempts to use Fabric from outside your VNet (or without the private endpoint) are rejected. This integration ensures that sensitive data transfer between Fabric and your network stays off the public internet, which satisfies stringent compliance requirements.

Microsoft Fabric also supports [Managed Virtual Networks (Managed VNets)](../security/security-managed-vnets-fabric-overview.md) and [Managed Private Endpoints](../security/security-managed-private-endpoints-overview.md) to enhance network isolation and secure connectivity. When Private Link is enabled for a Fabric tenant or workspace, Fabric automatically provisions a Managed VNet for compute workloads such as Spark jobs, so that they run in an isolated environment rather than shared public pools. Managed Private Endpoints also let Fabric services (like Lakehouse, Warehouse, and OneLake) securely [connect to Azure resources or on-premises data sources](../security/connect-to-on-premise-sources-using-managed-private-endpoints.md) without exposing traffic to the public internet. These features use Azure's networking backbone to enforce compliance, reduce attack surface, and provide granular control over data ingress and egress within enterprise environments.

### Entra ID

Fabric authenticates and manages users through Microsoft Entra ID. Every Fabric tenant is linked to an Entra ID tenant. User sign-in, single sign-on (SSO), and access control for Fabric use the same identities and groups as Azure. You can use your corporate Entra ID accounts to sign in to Fabric and use existing security features like Conditional Access Policies and Multi-Factor Authentication across Fabric. Entra ID integration also enables service principals and managed identities for Fabric inbound and outbound authentication scenarios:
* **Inbound authentication**: Use service principals to access Fabric's admin APIs or to enable access to Fabric artifact endpoints such as SQL, OneLake, and Eventhouse.
* **Outbound authentication**: Use the [Workspace identity](../security/workspace-identity.md) or other service principals when [setting up connections to Azure data sources](../security/workspace-identity-authenticate.md).

### GitHub and Azure DevOps

Microsoft Fabric integrates natively with Azure DevOps and GitHub to enable version control, CI/CD, and collaborative development for analytics artifacts such as pipelines, notebooks, and dataflows. [Workspaces in Fabric can be linked to a Git repository](../cicd/git-integration/intro-to-git-integration.md?tabs=azure-devops.md), which lets you synchronize items between Fabric and your source control system. This integration supports branching strategies, pull requests, and code reviews, so that changes to Fabric artifacts follow the same governance and DevOps practices as application code. With Azure DevOps, you can automate deployment pipelines for Fabric content across environments (for example, dev, test, and prod) by using YAML-based workflows. GitHub integration uses GitHub Actions for automation, enabling continuous integration and deployment of Fabric assets. These capabilities help teams maintain consistency, enforce version history, and streamline collaboration, making Fabric a first-class citizen in modern DevOps workflows.

### Microsoft Purview

[Microsoft Fabric integrates deeply with Microsoft Purview](../governance/microsoft-purview-fabric.md) to provide unified data governance, cataloging, and compliance across the Fabric data estate. Purview can register Fabric workspaces and OneLake as data sources in its Data Map, which enables [automated metadata scanning](../governance/metadata-scanning-overview.md), lineage tracking, and classification of Fabric artifacts such as Lakehouses, Warehouses, and Dataflows. This integration lets you apply consistent governance policies, like [sensitivity labels](../governance/information-protection.md) and access controls, across both Azure and Fabric environments. Through [Purview's Unified Catalog](/purview/unified-catalog), Fabric datasets become discoverable alongside other enterprise data assets, supporting data quality checks, profiling, and compliance audits. Authentication for Purview scans uses Entra ID service principals, and administrators must enable Fabric tenant settings to allow read-only API access for Purview. After configuration, Purview can continuously monitor Fabric for schema changes, lineage updates, and data quality metrics, ensuring that analytics workflows in Fabric adhere to enterprise governance standards. This integration helps enterprises maintain end-to-end visibility and compliance across hybrid data landscapes without duplicating governance efforts.

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Prepare and transform data](prepare-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
