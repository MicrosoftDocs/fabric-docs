---
title: Integrate Microsoft Fabric with external systems
description: Learn how Microsoft Fabric integrates with external systems to enable seamless data flow, real-time automation, and actionable insights across your organization.
#customer intent: As a data analyst, I want to integrate Microsoft Fabric with Power Automate so that I can automate workflows triggered by real-time data conditions.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 01/20/2026
ms.topic: concept-article
---

# External integration and platform connectivity

While Fabric is an all-in-one platform, it recognizes the importance of integrating with external systems, both for bringing data in and for pushing data/insights out. In this section, we consider how Fabric connects to the outside world and how others can consume Fabric-hosted data.

### Automate actions with Data Activator

:::image type="content" source="./media/external-integration/integration-actions.png" alt-text="Screenshot of integration actions diagram.":::

[Data Activator](/fabric/real-time-intelligence/data-activator/activator-introduction) provides real-time automation by monitoring data streams and triggering actions when defined conditions occur. Activator integrates with:
* **[Power Automate](/fabric/real-time-intelligence/data-activator/activator-trigger-power-automate-flows)** to execute workflows such as sending notifications, updating records, or initiating business processes. This integration allows users to create triggers in Fabric and link them to Power Automate flows for downstream actions (e.g., alerting when a KPI threshold is crossed).
* Teams to post adaptive cards or messages to channels when real-time conditions are met.
* Outlook to send automated emails to stakeholders for alerts or approvals.
* **[Fabric items](/fabric/real-time-intelligence/data-activator/activator-trigger-fabric-items)** to initiate actions such as refreshing a Power BI dataset or initiating a pipeline run. These capabilities enable end-to-end automation across analytics and collaboration tools, ensuring insights from streaming data lead to immediate, actionable outcomes without manual intervention.

### Collaborate across Microsoft 365

:::image type="content" source="./media/external-integration/integration-collaboration.png" alt-text="Screenshot of integration collaboration diagram.":::

Microsoft Fabric is designed to work within the Microsoft 365 ecosystem, enabling collaborative analytics and data-driven workflows across familiar productivity tools:

* [Microsoft Teams](/power-bi/collaborate-share/service-collaborate-microsoft-teams): allow users to share reports, dashboards, and analytics directly in Teams channels or chats. Users can embed Power BI visuals (part of Fabric) in Teams tabs, collaborate on insights, and receive notifications for data-driven alerts. This integration ensures real-time collaboration on analytics without leaving the Teams environment.

* [Excel](/power-bi/collaborate-share/service-analyze-in-excel): users can connect Excel to Fabric datasets using the "Analyze in Excel" feature, enabling pivot tables and advanced analysis on Fabric data while maintaining live connectivity. This bridges self-service analytics with enterprise-scale data models.

* [PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about): Reports and visuals from Fabric (via Power BI) can be exported or embedded into PowerPoint presentations, allowing stakeholders to present live or snapshot analytics in executive decks.

* [SharePoint and OneDrive](/power-bi/create-reports/desktop-sharepoint-save-share): Fabric artifacts such as reports and dashboards can be published to SharePoint Online for broad organizational access. Additionally, OneDrive integration supports storing and sharing related files (e.g., exported data, documentation) alongside Fabric workspaces. These integrations leverage Microsoft 365's security and compliance features, ensuring governed collaboration.

Together, these integrations enable end-to-end collaboration: from analyzing data in Fabric, discussing insights in Teams, refining models in Excel, presenting in PowerPoint, and sharing securely via SharePoint and OneDrive—all within the Microsoft 365 ecosystem.

### Agentic AI integration

:::image type="content" source="./media/external-integration/agentic-integration.png" alt-text="Screenshot of agentic AI integration diagram.":::

Microsoft Fabric is evolving beyond analytics into an intelligence platform that powers Agentic AI workflows. At the core is Fabric IQ, a semantic layer that unifies business meaning across data sources, enabling AI agents to reason with context rather than raw tables. This foundation integrates with three key components to deliver end-to-end agentic capabilities:

* Microsoft Foundry: Acts as the knowledge and custom AI layer, hosting fine-tuned models and providing policy-governed knowledge retrieval. Foundry enables advanced reasoning, multi-agent orchestration, and integration via open standards like the Model Context Protocol (MCP), ensuring agents can interact with external systems and enterprise knowledge securely. Foundry can [use Fabric Data Agents](/azure/ai-foundry/agents/how-to/tools/fabric) as part of their Agentic AI worklflow.

* Copilot Studio: Serves as the agent orchestration and workflow builder, allowing organizations to design custom conversational agents and automate processes without heavy coding. Studio agents can [invoke Fabric Data Agents](/microsoft-copilot-studio/add-agent-fabric-data-agent) for governed insights and call Foundry services for complex logic, creating composable workflows that bridge business and technical domains.

* Microsoft 365 Copilot: Provides the user interface and orchestration layer, embedding these capabilities into everyday tools like Teams and Outlook. It routes user queries to the right agents, merges outputs, and applies Work IQ (user context) for personalized, compliant responses while respecting enterprise security and governance. M365 Copilot can [consume Fabric Data Agents](/fabric/data-science/data-agent-microsoft-365-copilot) as part of their Agentic AI workflow

### Developer tools and APIs

:::image type="content" source="./media/external-integration/integration-developer.png" alt-text="Screenshot of developer integration diagram.":::

Microsoft Fabric is designed not only for data analysts but also for developers who prefer a code-first approach. By leveraging Visual Studio Code, developers can create, manage, and automate Fabric artifacts while integrating with modern DevOps practices. This enables teams to build scalable data solutions and AI workflows using familiar tools and processes.

* Create and Manage Fabric Artifacts in VS Code: Developers can use [Fabric extensions](/fabric/data-engineering/set-up-fabric-vs-code-extension) and [CLI tools](/rest/api/fabric/articles/fabric-command-line-interface) within VS Code to create and manage Fabric artifacts sych as lakehouses, user data functions, notebooks, etc.

* Connect to Fabric Data Sources
  * SQL Endpoints: [Fabric lakehouses and warehouses expose T-SQL endpoints](/fabric/data-warehouse/how-to-connect), allowing developers to query data using standard SQL syntax from VS Code or any SQL client.
  * GraphQL APIs: Fabric provides [GraphQL APIs for programmatic access to data and metadata](/fabric/data-engineering/connect-apps-api-graphql), enabling developers to build custom apps or services that interact with Fabric datasets without relying on UI tools.

### Unified data estate

:::image type="content" source="./media/external-integration/integration-unified-data-estate.png" alt-text="Screenshot of unified data estate integration diagram.":::

#### OneLake interoperability

[OneLake is designed as a unified data lake](/fabric/onelake/onelake-overview) that prioritizes openness and interoperability. Instead of locking data into proprietary formats, OneLake embraces widely adopted open standards to ensure flexibility, portability, and compatibility across ecosystems. This approach is critical for enterprises that need to integrate diverse tools and avoid vendor lock-in. This is achieved through two key strategies:

* **Support for Delta Lake and Iceberg File Formats**
  * [Delta Lake](/fabric/fundamentals/delta-lake-interoperability): OneLake natively supports Delta Lake, enabling ACID transactions, schema enforcement, and time travel on large-scale datasets. This makes OneLake compatible with engines like Azure Databricks, Apache Spark, and other lakehouse architectures.
  * [Apache Iceberg](/fabric/onelake/onelake-iceberg-tables): Iceberg support allows advanced table management features such as partitioning, schema evolution, and versioning. This ensures that OneLake can integrate with modern analytics tools and big data frameworks that rely on Iceberg for scalable table operations.

* **Universal Data Access via APIs**
  * Table APIs: OneLake exposes [Table APIs](/fabric/onelake/table-apis/table-apis-overview) that allow developers and applications to interact with tables programmatically regardless of the file format used to store them. These APIs enable listing, querying, and managing tables in OneLake, supporting integration with custom applications and automation workflows.
  * ADLS Gen2 APIs: OneLake is built on Azure Data Lake Storage Gen2, which means it [supports the same REST APIs and hierarchical namespace features](/fabric/onelake/onelake-api-parity). This compatibility allows existing tools and scripts designed for ADLS Gen2 to work with OneLake out of the box, simplifying migration and integration.

By embracing these open file formats and APIs, OneLake ensures that data stored in OneLake can be read and written by multiple compute engines without conversion, making it a true interoperable data foundation.

#### Azure Databricks integration

Microsoft Fabric's OneLake and Azure Databricks integration provides a foundation for unified analytics and AI. This integration combines OneLake's governed, open data estate with Databricks' data engineering and machine learning capabilities. The bi-directional integration between OneLake and Azure Databricks comes in the form of:
* [Azure Databricks Catalog Mirroring](/fabric/mirroring/azure-databricks): allows Unity Catalog from Databricks to be mirrored into OneLake. This means tables managed in Databricks can appear as shortcuts in OneLake, enabling Fabric workloads (Power BI, Data Agents, Ontologies, Notebooks) to access Databricks data without duplication.
* [Databricks Reading from OneLake](/fabric/onelake/onelake-azure-databricks): Databricks can read and write data stored in OneLake using Delta Lake compatibility. Since OneLake supports open formats (Delta, Parquet), Databricks can mount OneLake storage or access it via ADLS Gen2 APIs with no need for ETL or data duplication.

#### Snowflake integration

Microsoft Fabric's OneLake and Snowflake integration delivers a zero-copy architecture, enabling organizations to unify analytics and AI without duplicating data. This approach is built on open standards and shortcut technology, ensuring interoperability while maintaining governance and performance.

* [OneLake Shortcuts to Snowflake Iceberg tables](/fabric/onelake/onelake-iceberg-tables): Fabric introduces shortcuts that reference Snowflake tables directly in OneLake. This means data remains in Snowflake but appears as part of the OneLake logical data estate. This way Fabric workloads (Power BI, Dataflows, AI agents) can query Snowflake data alongside native OneLake data without ETL or replication. Governance and security policies remain intact across both platforms.
* [Snowflake Access to OneLake](https://www.snowflake.com/en/developers/guides/getting-started-with-iceberg-in-onelake/): Snowflake can query OneLake data using external tables. Since OneLake supports Delta Lake and Parquet, Snowflake reads these formats natively, enabling high-performance queries on OneLake data from Snowflake compute.

## Platform architecture

:::image type="content" source="./media/external-integration/platform.png" alt-text="Screenshot of platform architecture diagram.":::

### Azure

Microsoft Fabric is built as a Software-as-a-Service (SaaS) platform on Azure's infrastructure, meaning it relies on core Azure services for identity, networking, security, monitoring, and more. In practice, a Fabric tenant and its capacities are first-class Azure resources under your Azure subscription. This allows Fabric to integrate with Azure's billing system, use Azure's monitoring and logging capabilities, enforce security through Azure identity and networking features, and interoperate with Azure data services.

#### Azure billing

[Microsoft Fabric capacities](/fabric/enterprise/licenses#capacity) represent the provisioned compute tiers for Fabric and are managed as Azure resources within your subscription. When you enable Fabric, an [Azure Fabric capacity resource is created](/fabric/enterprise/buy-subscription), representing the Fabric tenant's analytics capacity. In the Azure portal you have the ability to [pause and resume your capacity](/fabric/enterprise/pause-resume) and [scale it up and down](/fabric/enterprise/scale-capacity) as needed. You can Billing for Fabric is thus handled through your Azure subscription's billing system. [All Fabric usage charges](/fabric/enterprise/azure-billing) (for compute, storage, etc.) accrue under your subscription and appear in Azure Cost Management alongside other Azure services.

#### Networking

Microsoft Fabric supports Azure Private Endpoints to allow private, internal-only access to Fabric endpoints. When you enable Private Link for Fabric at the [tenant level](/fabric/security/security-private-links-overview) or [workspace level](/fabric/security/security-workspace-level-private-links-overview), Fabric will expose private endpoint URLs for services (OneLake, Warehouse SQL endpoints, etc.) that are accessible only via your Azure Virtual Network, routing traffic through Azure's private backbone network instead of the public internet. With "Block Public Internet Access" enabled in Fabric, attempts to use Fabric from outside your VNet (or without the private endpoint) are rejected. This integration guarantees that sensitive data transfer between Fabric and your network stays off the public internet, satisfying stringent compliance requirements.

Microsoft Fabric also supports [Managed Virtual Networks (Managed VNets)](/fabric/security/security-managed-vnets-fabric-overview) and [Managed Private Endpoints](/fabric/security/security-managed-private-endpoints-overview) to enhance network isolation and secure connectivity. When Private Link is enabled for a Fabric tenant or workspace, Fabric automatically provisions a Managed VNet for compute workloads such as Spark jobs, ensuring they run in an isolated environment rather than shared public pools. Additionally, Managed Private Endpoints allow Fabric services (like Lakehouse, Warehouse, and OneLake) to securely [connect to Azure resources or on-premises data sources](/fabric/security/connect-to-on-premise-sources-using-managed-private-endpoints) without exposing traffic to the public internet. These features leverage Azure's networking backbone to enforce compliance, reduce attack surface, and provide granular control over data ingress and egress within enterprise environments.

### Entra ID

Fabric authenticates and manages users via Microsoft Entra ID. Every Fabric tenant is linked to an Entra ID tenant. User sign-in, single sign-on (SSO), and access control for Fabric use the same identities and groups as Azure. This means you can use your corporate Entra ID accounts to log into Fabric and leverage existing security features like Conditional Access Policies and Multi-Factor Authentication across Fabric. Entra ID integration also enables service principals and managed identities for Fabric inbound and outbound authentication scenarios:
* **Inbound authentication**: you can use service principals to access Fabric's admin APIs or to enable access to Fabric artifact endpoints such as SQL, OneLake and Eventhouse.
* **Outbound authentication**: you can leverage the [Workspace identity](/fabric/security/workspace-identity) or other Service Principals when [setting up connections to Azure data sources](/fabric/security/workspace-identity-authenticate).

### GitHub and Azure DevOps

Microsoft Fabric integrates natively with Azure DevOps and GitHub to enable version control, CI/CD, and collaborative development for analytics artifacts such as pipelines, notebooks, and dataflows. [Workspaces in Fabric can be linked to a Git repository](/fabric/cicd/git-integration/intro-to-git-integration?tabs=azure-devops), allowing users to synchronize items between Fabric and their source control system. This integration supports branching strategies, pull requests, and code reviews, ensuring that changes to Fabric artifacts follow the same governance and DevOps practices as application code. With Azure DevOps, organizations can automate deployment pipelines for Fabric content across environments (e.g., dev, test, prod) using YAML-based workflows. Similarly, GitHub integration leverages GitHub Actions for automation, enabling continuous integration and deployment of Fabric assets. These capabilities help teams maintain consistency, enforce version history, and streamline collaboration, making Fabric a first-class citizen in modern DevOps workflows.

### Microsoft Purview

[Microsoft Fabric integrates deeply with Microsoft Purview](/fabric/governance/microsoft-purview-fabric) to provide unified data governance, cataloging, and compliance across the Fabric data estate. Purview can register Fabric workspaces and OneLake as data sources in its Data Map, enabling [automated metadata scanning](/fabric/governance/metadata-scanning-overview), lineage tracking, and classification of Fabric artifacts such as Lakehouses, Warehouses, and Dataflows. This integration allows organizations to apply consistent governance policies, like [sensitivity labels](/fabric/governance/information-protection) and access controls—across both Azure and Fabric environments. Through [Purview's Unified Catalog](/purview/unified-catalog), Fabric datasets become discoverable alongside other enterprise data assets, supporting data quality checks, profiling, and compliance audits. Authentication for Purview scans uses Entra ID service principals, and administrators must enable Fabric tenant settings to allow read-only API access for Purview. Once configured, Purview can continuously monitor Fabric for schema changes, lineage updates, and data quality metrics, ensuring that analytics workflows in Fabric adhere to enterprise governance standards. This synergy helps enterprises maintain end-to-end visibility and compliance across hybrid data landscapes without duplicating governance efforts.