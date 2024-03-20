---
title: About private Links for secure access to Fabric (preview)
description: Learn about the Azure private link feature to provide secure access to Fabric using Azure Networking private endpoints. Data is sent privately instead of over the internet.
author: paulinbar
ms.author: painbar
ms.reviewer: danzhang
ms.topic: conceptual
ms.date: 03/11/2024
---

# Private links for secure access to Fabric (preview)

You can use private links to provide secure access for data traffic in Fabric. Azure Private Link and Azure Networking private endpoints are used to send data traffic privately using Microsoft's backbone network infrastructure instead of going across the internet.

When private link connections are used, those connections go through the Microsoft private network backbone when Fabric users access resources in Fabric.

To learn more about Azure Private Link, see [What is Azure Private Link](/azure/private-link/private-link-overview).

Enabling private endpoints has an impact on many items, so you should review this entire article before enabling private endpoints.

## What is a private endpoint

Private endpoint guarantees that traffic going *into* your organization's Fabric items (such as uploading a file into OneLake, for example) always follows your organization's configured private link network path. You can configure Fabric to deny all requests that don't come from the configured network path.

Private endpoints *do not* guarantee that traffic from Fabric to your external data sources, whether in the cloud or on-premises, is secured. Configure firewall rules and virtual networks to further secure your data sources.

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
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links will be blocked by the service, and won't work.
* There might be scenarios that don't support private links, which therefore will be blocked at the service when **Block Public Internet Access** is enabled.

If Azure Private Link is properly configured and **Block public Internet access** is **disabled**:

* Traffic from the public Internet will be allowed by Fabric services.
* Traffic from the virtual network targeting endpoints and scenarios that support private links are transported through the private link.
* Traffic from the virtual network targeting endpoints and scenarios that *don't* support private links are transported through the public Internet, and will be allowed by Fabric services.
* If the virtual network is configured to block public Internet access, scenarios that don't support private links will be blocked by the virtual network, and won't work.

## Private Link in Fabric experiences

### Onelake

Onelake supports Private Link. You can explore Onelake in the Fabric portal or from any machine within your established VNet using via OneLake file explorer, Azure Storage Explorer, PowerShell, and more.

Direct calls using OneLake regional endpoints don't work via private link to Fabric. For more information about connecting to OneLake and regional endpoints, see [How do I connect to OneLake?](../onelake/onelake-access-api.md).

### Warehouse and Lakehouse SQL endpoint

Accessing Warehouse items and Lakehouse SQL endpoints in the portal is protected by Private Link. Customers can also use Tabular Data Stream (TDS) endpoints (for example, SQL Server Management Studio, Azure Data Studio) to connect to Warehouse via Private link.

Visual query in Warehouse doesn't work when the **Block Public Internet Access** tenant setting is enabled.

### Lakehouse, Notebook, Spark job definition, Environment

Once you've enabled the **Azure Private Link** tenant setting, running the first Spark job (Notebook or Spark job definition) or performing a Lakehouse operation (Load to Table, table maintenance operations such as Optimize or Vacuum) will result in the creation of a managed virtual network for the workspace.

Once the managed virtual network has been provisioned, the starter pools (default Compute option) for Spark are disabled, as these are prewarmed clusters hosted in a shared virtual network. Spark jobs run on custom pools that are created on-demand at the time of job submission within the dedicated managed virtual network of the workspace. Workspace migration across capacities in different regions isn't supported when a managed virtual network is allocated to your workspace.

When the private link setting is enabled, Spark jobs won't work for tenants whose home region doesn't support Fabric Data Engineering, even if they use Fabric capacities from other regions that do.

For more information, see [Managed VNet for Fabric](./security-managed-vnets-fabric-overview.md).

### Dataflow Gen2

You can use Dataflow gen2 to get data, transform data, and publish dataflow via private link. When your data source is behind the firewall, you can use the [VNet data gateway](/data-integration/vnet/overview) to connect to your data sources. The VNet data gateway enables the injection of the gateway (compute) into your existing virtual network, thus providing a managed gateway experience. You can use VNet gateway connections to connect to a Lakehouse or Warehouse in the tenant that requires a private link or connect to other data sources with your virtual network.

### Pipeline

When you connect to Pipeline via private link, you can use the data pipeline to load data from any data source with public endpoints into a private-link-enabled Microsoft Fabric lakehouse. Customers can also author and operationalize data pipelines with activities, including Notebook and Dataflow activities, using the private link. However, copying data from and into a Data Warehouse isn't currently possible when Fabric's private link is enabled.

### ML Model and Experiment
ML Model and Experiment supports private link. 

### Power BI

* If internet access is disabled, and if the Power BI semantic model, Datamart, or Dataflow Gen1 connects to a Power BI semantic model or Dataflow as a data source, the connection will fail.

* Publish to Web isn't supported when the tenant setting **Azure Private Link** is enabled in Fabric.

* Email subscriptions aren't supported when the tenant setting **Block Public Internet Access** is enabled in Fabric.

* Exporting a Power BI report as PDF or PowerPoint isn't supported when the tenant setting **Azure Private Link** is enabled in Fabric.

* If your organization is using Azure Private Link in Fabric, modern usage metrics reports will contain partial data (only Report Open events). A current limitation when transferring client information over private links prevents Fabric from capturing Report Page Views and performance data over private links. If your organization had enabled the **Azure Private Link** and **Block Public Internet Access** tenant settings in Fabric, the refresh for the dataset fails and the usage metrics report doesn't show any data.

### Other Fabric items

Other Fabric items, such as KQL Database, and EventStream, don’t currently support Private Link, and are automatically disabled when you turn on the **Block Public Internet Access** tenant setting in order to protect compliance status.

### Microsoft Purview Information Protection

Microsoft Purview Information Protection doesn't currently support Private Link. This means that in Power BI Desktop running in an isolated network, the **Sensitivity** button will be grayed out, label information won't appear, and decryption of *.pbix* files will fail.

To enable these capabilities in Desktop, admins can configure [service tags](/azure/virtual-network/service-tags-overview) for the underlying services that support Microsoft Purview Information Protection, Exchange Online Protection (EOP), and Azure Information Protection (AIP). Make sure you understand the implications of using service tags in a private links isolated network.

## Other considerations and limitations

There are several considerations to keep in mind while working with private endpoints in Fabric:

* Fabric supports up to 200 capacities in a tenant where Private Link is enabled.

* Tenant migration is blocked when Private Link is turned on in the Fabric admin portal.

* Customers can't connect to Fabric resources in multiple tenants from a single VNet, but rather only the last tenant to set up Private Link.

* Private link does not support in Trial capacity. 
* Any uses of external images or themes aren't available when using a private link environment.

* Each private endpoint can be connected to one tenant only.  You can't set up a private link to be used by more than one tenant.

* **For Fabric users**: On-premises data gateways aren't supported and fail to register when Private Link is enabled. To run the gateway configurator successfully, Private Link must be disabled. VNet data gateways will work.

 * **For non-PowerBI (PowerApps or LogicApps) Gateway users**: The gateway doesn't work properly when Private Link is enabled. A potential workaround is to disable the **Azure Private Link** tenant setting, configure the gateway in a remote region (a region other than the recommended region), then re-enable Azure Private Link. After Private Link is re-enabled, the gateway in the remote region won't use private links.

* Private links resource REST APIs don't support tags.

* The following URLs must be accessible from the client browser:

    * Required for auth:

        * `login.microsoftonline.com`
        * `aadcdn.msauth.net`
        * `msauth.net`
        * `msftauth.net`
        * `graph.microsoft.com`
        * `login.live.com`, though this may be different based on account type.

    * Required for the Data Engineering and Data Science experiences:

        * `http://res.cdn.office.net/`
        * `https://pypi.org/*` (for example, `https://pypi.org/pypi/azure-storage-blob/json`) 
        * local static endpoints for condaPackages 
        * `https://cdn.jsdelivr.net/npm/monaco-editor*`

## Related content

* [Set up and use secure private endpoints](./security-private-links-use.md)
* [Managed VNet for Fabric](./security-managed-vnets-fabric-overview.md)
* [Conditional Access](./security-conditional-access.md)
* [How to find your Microsoft Entra tenant ID](/azure/active-directory/fundamentals/active-directory-how-to-find-tenant)
