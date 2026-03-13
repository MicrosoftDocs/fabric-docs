---
title: Integrate Microsoft Fabric with external systems
description: Learn how Microsoft Fabric integrates with external systems to enable seamless data flow, real-time automation, and actionable insights across your organization.
#customer intent: As a data analyst, I want to integrate Microsoft Fabric with Power Automate so that I can automate workflows triggered by real-time data conditions.
author: SnehaGunda
ms.author: sngun
ms.reviewer: fabragaMS
ms.date: 02/24/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Integrate Microsoft Fabric with external systems and platform connectivity

Microsoft Fabric integrates with external services to automate workflows, enable collaboration, support developer extensibility, and interoperate with other data platforms. You can trigger actions from real-time data, connect Fabric to Microsoft 365 apps, integrate with developer tools and APIs, and securely share data across cloud ecosystems.

This article describes how to:

- Trigger automated workflows from Fabric data  
- Collaborate by using Microsoft 365 applications  
- Integrate with AI agents and orchestration tools  
- Access Fabric programmatically through developer tools and APIs  
- Interoperate with open data formats and external platforms  
- Connect Fabric to core Azure services for security, networking, and governance  

## Automate actions with Data Activator

[Activator](../real-time-intelligence/data-activator/activator-introduction.md) provides real-time automation by monitoring data streams and triggering actions when defined conditions occur. Activator integrates with:

- **[Power Automate](../real-time-intelligence/data-activator/activator-trigger-power-automate-flows.md)** to execute workflows such as sending notifications, updating records, or initiating business processes. You can create triggers in Fabric and link them to Power Automate flows to alert users when a KPI threshold is crossed.
- Microsoft Teams to post adaptive cards or messages to channels when real-time conditions are met.
- Outlook to send automated emails for alerts or approvals.
- **[Fabric items](../real-time-intelligence/data-activator/activator-trigger-fabric-items.md)** to initiate actions such as refreshing a semantic model or starting a pipeline run.

## Collaborate across Microsoft 365

Microsoft Fabric works within the Microsoft 365 ecosystem, enabling collaborative analytics and data-driven workflows across familiar productivity tools:

- [Microsoft Teams](/power-bi/collaborate-share/service-collaborate-microsoft-teams): Share reports and dashboards in channels or chats. You can embed Power BI visuals in Teams tabs, collaborate on insights, and receive data-driven alerts.
- [Excel](/power-bi/collaborate-share/service-analyze-in-excel): Use Analyze in Excel to connect PivotTables and advanced analysis tools to Fabric semantic models while maintaining live connectivity.
- [PowerPoint](/power-bi/collaborate-share/service-power-bi-powerpoint-add-in-about): Embed or export Power BI reports into presentations so stakeholders can view live or snapshot analytics.
- [SharePoint and OneDrive](/power-bi/create-reports/desktop-sharepoint-save-share): Publish reports to SharePoint Online and store supporting files in OneDrive with Microsoft 365 security and compliance controls.

These integrations enable analytics to flow naturally into collaboration, review, and decision-making processes.

## Integrate with agentic AI solutions

Fabric supports agent-based AI scenarios through a shared semantic foundation. This foundation integrates with three key components to deliver end-to-end agentic capabilities:

- **Microsoft Foundry** hosts fine-tuned models and knowledge retrieval systems. It supports integration through open standards like the Model Context Protocol (MCP). It can use [Fabric Data Agents](/azure/ai-foundry/agents/how-to/tools/fabric) as part of an agentic AI workflow.
- **Copilot Studio** enables you to design conversational agents and automate processes that invoke [Fabric Data Agents](/microsoft-copilot-studio/add-agent-fabric-data-agent) for governed insights.
- **Microsoft 365 Copilot** surfaces these capabilities in tools such as Teams and Outlook, routing queries to appropriate agents while respecting enterprise security controls. Microsoft 365 Copilot can [consume Fabric Data Agents](../data-science/data-agent-microsoft-365-copilot.md) as part of an agentic AI workflow.

Together, these services extend Fabric from analytics into contextual AI automation.

## Use developer tools and APIs

Fabric supports code-first development and DevOps practices.

- **Visual Studio Code**: Use [Fabric extensions](../data-engineering/set-up-fabric-vs-code-extension.md) and [CLI tools](/rest/api/fabric/articles/fabric-command-line-interface) to create and manage items such as lakehouses, notebooks, and user data functions.

- **Connect to Fabric data sources**
  - **SQL endpoints**: Lakehouses and warehouses expose [T-SQL endpoints](../data-warehouse/how-to-connect.md) so you can query data from standard SQL tools.
  - **GraphQL APIs**: [Programmatically access data and metadata](../data-engineering/connect-apps-api-graphql.md) to build custom applications and integrations.

These capabilities enable automation, CI/CD workflows, and custom solutions that extend Fabric beyond the web interface.

### Unified data estate

The unified data estate gives you a consistent foundation for cross-platform analytics. With open formats, API parity, and zero-copy access patterns, you can connect external engines while keeping governance and data ownership centralized in OneLake.

#### OneLake interoperability

[OneLake](../onelake/onelake-overview.md) provides an open and interoperable data foundation by supporting widely adopted standards. OneLake achieves interoperability through two key strategies:

* **Support for Delta Lake and Iceberg file formats**

  - **[Delta Lake support](../fundamentals/delta-lake-interoperability.md)**: Enables ACID transactions, schema enforcement, and time travel across large datasets.
  - **[Apache Iceberg support](../onelake/onelake-iceberg-tables.md)**: Supports advanced table management features such as partitioning and schema evolution.

* **Universal data access through APIs**

  - **[Table APIs](../onelake/table-apis/table-apis-overview.md)**: Provide programmatic access to tables regardless of file format.
  - **[ADLS Gen2 compatibility](../onelake/onelake-api-parity.md)**: Supports the same REST APIs and hierarchical namespace features as Azure Data Lake Storage Gen2.

By using these open file formats and APIs, OneLake ensures that data stored in OneLake can be read and written by multiple compute engines without conversion, making it a true interoperable data foundation.

#### Azure Databricks integration

The OneLake and Azure Databricks integration provides a foundation for unified analytics and AI. This integration combines OneLake's governed, open data estate with Databricks' data engineering and machine learning capabilities. The bidirectional integration between OneLake and Azure Databricks takes the following forms:

- **[Catalog mirroring](../mirroring/azure-databricks.md)**: Mirrors Unity Catalog tables into OneLake as shortcuts, enabling Fabric workloads to access Databricks-managed data.

- **[Databricks access to OneLake](../onelake/onelake-azure-databricks.md)**: Databricks can read and write OneLake data by using Delta Lake compatibility and ADLS Gen2 APIs.

#### Snowflake integration

The OneLake and Snowflake integration delivers a zero-copy architecture that lets you unify analytics and AI without duplicating data. This approach is built on open standards and shortcut technology, ensuring interoperability while maintaining governance and performance.

- **[Shortcuts to Snowflake Iceberg tables](../onelake/onelake-iceberg-tables.md)**: Fabric uses shortcuts that reference Snowflake tables directly in OneLake. Data remains in Snowflake but appears in the OneLake logical data estate. Fabric workloads (Power BI, Dataflows, AI agents) can query Snowflake data alongside native OneLake data without ETL or replication. Governance and security policies remain intact across both platforms.
- **[Snowflake external tables over OneLake](https://www.snowflake.com/en/developers/guides/getting-started-with-iceberg-in-onelake/)**: Snowflake can query OneLake data in Delta or Parquet formats, which enables high-performance queries on OneLake data from Snowflake compute.

## Platform architecture

### Azure

Microsoft Fabric is built as a software as a service (SaaS) platform on Azure's infrastructure, meaning it relies on core Azure services for identity, networking, security, monitoring, and more. In practice, a Fabric tenant and its capacities are first-class Azure resources under your Azure subscription. This allows Fabric to integrate with Azure's billing system, use Azure's monitoring and logging capabilities, enforce security through Azure identity and networking features, and interoperate with Azure data services.

#### Azure billing

[Microsoft Fabric capacities](../enterprise/licenses.md#capacity) represent the provisioned compute tiers for Fabric and are managed as Azure resources within your subscription. When you enable Fabric, an [Azure Fabric capacity resource is created](../enterprise/buy-subscription.md), representing the Fabric tenant's analytics capacity. In the Azure portal, you can [pause and resume your capacity](../enterprise/pause-resume.md) and [scale it up and down](../enterprise/scale-capacity.md) as needed. Billing for Fabric is handled through your Azure subscription's billing system. All Fabric usage charges (for compute and storage) accrue under your subscription and appear in Microsoft Cost Management alongside other Azure services.

#### Networking

Microsoft Fabric supports Azure Private Endpoints for private, internal-only access to Fabric endpoints. When you enable Private Link for Fabric at the [tenant level](../security/security-private-links-overview.md) or [workspace level](../security/security-workspace-level-private-links-overview.md), Fabric exposes private endpoint URLs for services (OneLake, Warehouse SQL endpoints, and others) that are accessible only through your Azure Virtual Network. Traffic routes through Azure's private backbone network instead of the public internet. With **Block Public Internet Access** enabled in Fabric, attempts to use Fabric from outside your VNet (or without the private endpoint) are rejected. This integration ensures that sensitive data transfer between Fabric and your network stays off the public internet, which satisfies stringent compliance requirements.

Microsoft Fabric also supports [Managed Virtual Networks (Managed VNets)](../security/security-managed-vnets-fabric-overview.md) and [Managed Private Endpoints](../security/security-managed-private-endpoints-overview.md) to enhance network isolation and secure connectivity. When Private Link is enabled for a Fabric tenant or workspace, Fabric automatically provisions a Managed VNet for compute workloads such as Spark jobs, so that they run in an isolated environment rather than shared public pools. Managed Private Endpoints also let Fabric services (like Lakehouse, Warehouse, and OneLake) securely [connect to Azure resources or on-premises data sources](../security/connect-to-on-premise-sources-using-managed-private-endpoints.md) without exposing traffic to the public internet. These features use Azure's networking backbone to enforce compliance, reduce attack surface, and provide granular control over data ingress and egress within enterprise environments.

### Microsoft Entra ID

Fabric authenticates and manages users through Microsoft Entra ID. Every Fabric tenant is linked to an Entra ID tenant. User sign-in, single sign-on (SSO), and access control for Fabric use the same identities and groups as Azure. You can use your corporate Entra ID accounts to sign in to Fabric and use existing security features like conditional access policies and multi-factor authentication across Fabric. Entra ID integration also enables service principals and managed identities for Fabric inbound and outbound authentication scenarios:
* **Inbound authentication**: Use service principals to access Fabric's admin APIs or to enable access to Fabric item endpoints such as SQL, OneLake, and Eventhouse.
* **Outbound authentication**: Use the [Workspace identity](../security/workspace-identity.md) or other service principals when [setting up connections to Azure data sources](../security/workspace-identity-authenticate.md).

### GitHub and Azure DevOps

Microsoft Fabric integrates natively with Azure DevOps and GitHub to enable version control, CI/CD, and collaborative development for analytics items such as pipelines, notebooks, and dataflows. [Workspaces in Fabric can be linked to a Git repository](../cicd/git-integration/intro-to-git-integration.md?tabs=azure-devops.md), which lets you synchronize items between Fabric and your source control system. This integration supports branching strategies, pull requests, and code reviews, so that changes to Fabric items follow the same governance and DevOps practices as application code. With Azure DevOps, you can automate deployment pipelines for Fabric content across environments (for example, dev, test, and prod) by using YAML-based workflows. GitHub integration uses GitHub Actions for automation, enabling continuous integration and deployment of Fabric assets. These capabilities help teams maintain consistency, enforce version history, and streamline collaboration, making Fabric a first-class citizen in modern DevOps workflows.

### Microsoft Purview

[Microsoft Fabric integrates deeply with Microsoft Purview](../governance/microsoft-purview-fabric.md) to provide unified data governance, cataloging, and compliance across the Fabric data estate. Purview can register Fabric workspaces and OneLake as data sources in its Data Map, which enables [automated metadata scanning](../governance/metadata-scanning-overview.md), lineage tracking, and classification of Fabric items such as Lakehouses, Warehouses, and Dataflows. This integration lets you apply consistent governance policies, like [sensitivity labels](../governance/information-protection.md) and access controls, across both Azure and Fabric environments. Through [Purview's Unified Catalog](/purview/unified-catalog), Fabric datasets become discoverable alongside other enterprise data assets, supporting data quality checks, profiling, and compliance audits. Authentication for Purview scans uses Entra ID service principals, and administrators must enable Fabric tenant settings to allow read-only API access for Purview. After configuration, Purview can continuously monitor Fabric for schema changes, lineage updates, and data quality metrics, ensuring that analytics workflows in Fabric adhere to enterprise governance standards. This integration helps enterprises maintain end-to-end visibility and compliance across hybrid data landscapes without duplicating governance efforts.

## Related content

* [End-to-end data lifecycle in Microsoft Fabric](data-lifecycle.md)
* [Get data into Microsoft Fabric](get-data.md)
* [Store data in Microsoft Fabric](store-data.md)
* [Prepare and transform data](prepare-transform-data.md)
* [Analyze and train data in Microsoft Fabric](analyze-train-data.md)
* [Track and visualize data](track-visualize-data.md)
