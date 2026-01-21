---
title: About private Links for secure access to Fabric
description: Learn about the Azure private link feature to provide secure access to Fabric using Azure Networking private endpoints. Data is sent privately instead of over the internet.
author: msmimart
ms.author: mimart
ms.reviewer: karthikeyana
ms.topic: concept-article
ms.custom:
ms.date: 08/21/2025
---

# Private links for Fabric tenants

You can use private links to provide secure access for data traffic in Fabric. [Azure Private Link](/azure/private-link/private-link-overview) and Azure Networking private endpoints are used to send data traffic privately using Microsoft's backbone network infrastructure instead of going across the internet. 
When private link connections are used, those connections go through the Microsoft private network backbone when Fabric users access resources in Fabric.

Fabric supports private links at both the tenant level and the workspace level:

* **Tenant-level private links** provide network policy to the entire tenant. This article focuses on tenant-level private links. 

* **Workspace-level private links** provide granular control, making it possible to restrict access to certain workspaces while allowing the rest of the workspaces to remain open for public access. To learn more, see [Private links for Fabric workspaces](security-workspace-level-private-links-overview.md).

Enabling private endpoints affects many items, so you should review this entire article before enabling private endpoints for your tenant.

## What is a private endpoint?

Private endpoint guarantees that traffic going *into* your organization's Fabric items (such as uploading a file into OneLake, for example) always follows your organization's configured private link network path. You can configure Fabric to deny all requests that don't come from the configured network path.

Private endpoints *don't* guarantee that traffic from Fabric to your external data sources, whether in the cloud or on-premises, is secured. Configure firewall rules and virtual networks to further secure your data sources.

A private endpoint is a single, directional technology that lets clients initiate connections to a given service but doesn't allow the service to initiate a connection into the customer network. This private endpoint integration pattern provides management isolation since the service can operate independently of customer network policy configuration. For multitenant services, this private endpoint model provides link identifiers to prevent access to other customers' resources hosted within the same service.  

The Fabric service implements private endpoints and not service endpoints.  

Using private endpoints with Fabric provides the following benefits:

* Restrict traffic from the internet to Fabric and route it through the Microsoft backbone network.
* Ensure only authorized client machines can access Fabric.
* Comply with regulatory and compliance requirements that mandate private access to your data and analytics services.


## Understand private endpoint configuration

There are two tenant settings in the Fabric admin portal involved in Private Link configuration: **Azure Private Links** and **Block Public Internet Access**.

If Azure Private Link is properly configured and **Block public Internet access** is **enabled**:

* Supported Fabric items are only accessible for your organization from private endpoints, and aren't accessible from the public Internet.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links are blocked by the service.
* There could be scenarios that don't support private links, which are blocked at the service when **Block Public Internet Access** is enabled.

If Azure Private Link is properly configured and **Block public Internet access** is **disabled**:

* Traffic from the public Internet is allowed by Fabric services.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links is transported through the public Internet, and is allowed by Fabric services.
* If the virtual network is configured to block public Internet access, scenarios that don't support private links are blocked by the virtual network.

## Private Link in Fabric experiences

### OneLake

OneLake supports Private Link. You can explore OneLake in the Fabric portal or from any machine within your established virtual network using OneLake file explorer, Azure Storage Explorer, PowerShell, and more.

Direct calls using OneLake regional endpoints don't work via private link to Fabric. For more information about connecting to OneLake and regional endpoints, see [How do I connect to OneLake?](../onelake/onelake-access-api.md).

### Warehouse and Lakehouse SQL analytics endpoint

Accessing a Warehouse or the SQL analytics endpoint of a Lakehouse in the Fabric portal is protected by private link. Customers can also use Tabular Data Stream (TDS) endpoints (for example, [SQL Server Management Studio (SSMS)](https://aka.ms/ssms) or the [MSSQL extension for Visual Studio Code](/sql/tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code)) to connect to Warehouse via private link.

Visual query in Warehouse doesn't work when the **Block Public Internet Access** tenant setting is enabled.

### SQL database

Accessing a SQL database or the SQL analytics endpoint in the Fabric portal is protected by private link. Customers can also use Tabular Data Stream (TDS) endpoints (for example, SQL Server Management Studio or Visual Studio Code) to [connect to SQL database](../database/sql/connect.md) via private link. For more information on connecting to a SQL database, see [Authentication in SQL database in Microsoft Fabric](../database/sql/authentication.md).

### Lakehouse, Notebook, Spark job definition, Environment

Once you enable the **Azure Private Link** tenant setting, running the first Spark job (Notebook or Spark job definition) or performing a Lakehouse operation (Load to Table, table maintenance operations such as Optimize or Vacuum) results in the creation of a managed virtual network for the workspace.

Once the managed virtual network is provisioned, the starter pools (default Compute option) for Spark are disabled, because they're prewarmed clusters hosted in a shared virtual network. Spark jobs run on custom pools that are created on-demand at the time of job submission within the dedicated managed virtual network of the workspace. Workspace migration across capacities in different regions isn't supported when a managed virtual network is allocated to your workspace.

When the private link setting is enabled, Spark jobs don't work for tenants whose home region doesn't support Fabric Data Engineering, even if they use Fabric capacities from other regions that do.

For more information, see [Managed VNet for Fabric](./security-managed-vnets-fabric-overview.md).

### Dataflow Gen2

You can use Dataflow gen2 to get data, transform data, and publish dataflow via private link. When your data source is behind the firewall, you can use the [virtual network data gateway](/data-integration/vnet/overview) to connect to your data sources. The VNet data gateway enables the injection of the gateway (compute) into your existing virtual network, thus providing a managed gateway experience. You can use virtual network gateway connections to connect to a Lakehouse or Warehouse in the tenant that requires a private link or connect to other data sources with your virtual network.

### Pipeline

When you connect to Pipeline via private link, you can use the pipeline to load data from any data source with public endpoints into a private-link-enabled Microsoft Fabric lakehouse. Customers can also author and operationalize pipelines with activities, including Notebook and Dataflow activities, using the private link. However, copying data from and into a Data Warehouse isn't currently possible when Fabric's private link is enabled.

### ML Model, Experiment, and Data agent
ML Model, Experiment, and Data agent supports private link. 

### Power BI

* If internet access is disabled, and if the Power BI semantic model, Datamart, or Dataflow Gen1 connects to a Power BI semantic model or Dataflow as a data source, the connection fails.

* Publish to Web isn't supported when the tenant setting **Azure Private Link** is enabled in Fabric.

* Email subscriptions aren't supported when the tenant setting **Block Public Internet Access** is enabled in Fabric.

* Exporting a Power BI report as PDF or PowerPoint isn't supported when the tenant setting **Azure Private Link** is enabled in Fabric.

* If your organization is using Azure Private Link in Fabric, modern usage metrics reports contain partial data (only Report Open events). A current limitation when transferring client information over private links prevents Fabric from capturing Report Page Views and performance data over private links. If your organization enabled the **Azure Private Link** and **Block Public Internet Access** tenant settings in Fabric, the refresh for the dataset fails and the usage metrics report doesn't show any data.

* Copilot isn't currently supported for Private Link or closed network environments.

### Eventstream

Eventstream supports Private Link, enabling secure, real-time data ingestion from multiple sources without exposing traffic to the public internet. It also supports real-time data transformation, such as filtering and enrichment of incoming data streams, before routing them to destinations within Fabric.

Unsupported scenarios:

* Custom Endpoint as a source is not supported.
* Custom Endpoint as a destination is not supported.
* Eventhouse as a destination (with direct ingestion mode) is not supported.
* Activator as a destination is not supported.

### Eventhouse

Eventhouse supports Private Link, allowing secure data ingestion and querying from your Azure Virtual Network via a private link. You can ingest data from various sources, including Azure Storage accounts, local files, and Dataflow Gen2. Streaming ingestion ensures immediate data availability. Additionally, you can utilize KQL queries or Spark to access data within an Eventhouse.

Limitations:

* Ingesting data from OneLake isn't supported.
* Creating a shortcut to an Eventhouse isn't possible.
* Connecting to an Eventhouse in a pipeline isn't possible.
* Ingesting data using queued ingestion isn't supported.
* Data connectors relying on queued ingestion aren't supported.
* Querying an Eventhouse using T-SQL isn't possible.

### Healthcare data solutions (preview)

Customers can provision and utilize Healthcare data solutions in Microsoft Fabric through a private link. In a tenant where private link is enabled, customers can deploy Healthcare data solution capabilities to execute comprehensive data ingestion and transformation scenarios for their clinical data. Also included is the ability to ingest healthcare data from various sources, such as Azure Storage accounts, and more.

### Fabric Events

Fabric Events support Private Link without affecting event delivery, because the events originate from within the tenant.

### Azure Events

Azure Events support Private Link with the following behavior when the Block Public Internet Access tenant setting is enabled: 
* New configurations to consume Azure events (e.g., Azure Blob Storage events) will be blocked from being delivered. 
* Existing configurations consuming Azure events will stop new events from being delivered.
  
<!--### Other Fabric items

Other Fabric items, such as KQL Database, and Eventstream, don't currently support Private Link, and are automatically disabled when you turn on the **Block Public Internet Access** tenant setting in order to protect compliance status.
-->

### Microsoft Purview Information Protection

Microsoft Purview Information Protection doesn't currently support Private Link. This means that in Power BI Desktop running in an isolated network, the **Sensitivity** button is grayed out, label information doesn't appear, and decryption of *.pbix* files fail.

To enable these capabilities in Desktop, admins can configure [service tags](/azure/virtual-network/service-tags-overview) for the underlying services that support Microsoft Purview Information Protection, Exchange Online Protection (EOP), and Azure Information Protection (AIP). Make sure you understand the implications of using service tags in a private links isolated network.

### Mirrored database

Private link is supported for [open mirroring](/fabric/mirroring/open-mirroring), [Azure Cosmos DB mirroring](/fabric/mirroring/azure-cosmos-db), [Azure SQL Managed Instance mirroring](/fabric/mirroring/azure-sql-managed-instance) and [SQL Server 2025 mirroring](/fabric/mirroring/sql-server). For other types of database mirroring, if the **Block public Internet access** tenant setting is **enabled**, active mirrored databases enter a paused state, and mirroring can't be started.

For open mirroring, when the **Block public Internet access** tenant setting is **enabled**, ensure the publisher writes data into the OneLake landing zone via a private link.

## Other considerations and limitations

There are several considerations to keep in mind while working with private endpoints in Fabric:

* Fabric supports up to 450 capacities in a tenant where Private Link is enabled.
* When capacity is newly created, it doesn't support private link until its endpoint is reflected in the private DNS zone, which can take up to 24 hours. 

* Tenant migration is blocked when Private Link is turned on in the Fabric admin portal.

* Customers can't connect to Fabric resources in multiple tenants from the same network location (depends on where you configure DNS records), but rather only the last tenant to set up Private Link.

* Private link doesn't support in Trial capacity. When accessing Fabric via Private Link traffic, trial capacity doesn't work.
  
* Any uses of external images or themes aren't available when using a private link environment.

* Each private endpoint can be connected to one tenant only. You can't set up a private link to be used by more than one tenant.

* Cross-tenant scenarios aren't supported. This means that setting up a tenant-level private endpoint in one Azure tenant to connect directly to a Private Link service in another tenant isn't supported.

* **For Fabric users**: On-premises data gateways aren't supported and fail to register when Private Link is enabled. To run the gateway configurator successfully, Private Link must be disabled. [Learn more about this scenario](/data-integration/gateway/service-gateway-install#related-considerations). Virtual network data gateways work. For more information, see [these considerations](/data-integration/gateway/service-gateway-install#related-considerations).

* **For non-PowerBI (PowerApps or LogicApps) Gateway users**: The on-premises data gateway isn't supported when Private Link is enabled. We recommend exploring the use of the [virtual network data gateway](/data-integration/vnet/overview), which can be used with private links.

* Private Links doesn't work with VNet Data Gateway download diagnostics.

* The Microsoft Fabric Capacity Metrics app doesn't support Private Link.
  
* The OneLake Catalog - Govern tab isn't available when Private Link is activated.
  
* Private links resource REST APIs don't support tags.

* The following URLs must be accessible from the client browser:

    * Required for auth:

        * `login.microsoftonline.com`
        * `aadcdn.msauth.net`
        * `msauth.net`
        * `msftauth.net`
        * `graph.microsoft.com`
        * `login.live.com`, though it might be different based on account type.

    * Required for the Data Engineering and Data Science experiences:

        * `http://res.cdn.office.net/`
        * `https://aznbcdn.notebooks.azure.net/` 
        * `https://pypi.org/*` (for example, `https://pypi.org/pypi/azure-storage-blob/json`) 
        * local static endpoints for condaPackages 
        * `https://cdn.jsdelivr.net/npm/monaco-editor*`

## Related content

<!--* [Set up and use secure private endpoints](./security-private-links-use.md)-->
* [Managed VNet for Fabric](./security-managed-vnets-fabric-overview.md)
* [Conditional Access](./security-conditional-access.md)
* [How to find your Microsoft Entra tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant)
