---
title: Security in Microsoft Fabric
description: Learn how Microsoft Fabric security works, and what features are available.
author: KesemSharabi
ms.author: kesharab
ms.topic: overview
ms.date: 01/23/2024
---

# Security in Microsoft Fabric

[Microsoft Fabric](../get-started/microsoft-fabric-overview.md) is a software as a service (SaaS) platform that lets users get, create, share, and visualize data.

As a SaaS service, Fabric offers a complete security package for the entire platform. Fabric removes the cost and responsibility of maintaining your security solution, and transfers it to the cloud. With Fabric, you can use the expertise and resources of Microsoft to keep your data secure, patch vulnerabilities, monitor threats, and comply with regulations. Fabric also allows you to manage and control your security settings, in line with your changing needs and demands.

As you bring your data to the cloud and use it with various analytic experiences such as Power BI, Data Factory, and the next generation of Synapse, Microsoft ensures that built-in security and reliability features secure your data at rest and transit. Microsoft also makes sure that your data is recoverable in cases of infrastructure failures or disasters.

Fabric security is:

* Continuous - Fabric security is always on. Because it's embedded in the cloud, it doesn't rely on a team of experts to keep it running.

* Configurable - You can configure Fabric security in accordance with your solution and organizational policies.

* Automated - Many of the Fabric security features are automated. Once configured, these features continue to work in the background.

* Evolving - Microsoft is constantly improving its Fabric security, by adding new features and controls.

## Understand tenants in multiple geographies

Many organizations have a global presence and require services in multiple [Azure geographies](/azure/reliability/availability-zones-service-support). For example, a company can have its headquarters in the United States, while doing business in other geographical areas, such as Australia. To comply with local regulations, businesses with a global presence need to ensure that data remains stored at rest in several regions. In Fabric, this is called *multi-geo*.

The query execution layer, query caches, and item data assigned to a multi-geo workspace remain in the Azure geography of their creation. However, some metadata, data movement, and processing, is stored at rest in the tenant's home geography.

Fabric is part of a larger Microsoft ecosystem. If your organization is already using other cloud subscription services, such as Azure, Microsoft 365, or Dynamics 365, then Fabric operates within the same [Microsoft Entra tenant](/microsoft-365/education/deploy/intro-azure-active-directory#what-is-a-microsoft-entra-tenant). Your organizational domain (for example, contoso.com) is associated with Microsoft Entra ID. Like all Microsoft cloud services, your Fabric [tenant](../enterprise/licenses.md#tenant) relies on your organization's Microsoft Entra ID for identity and access management.

Fabric ensures that your data is secure across regions when you're working with several tenants that have multiple capacities across a number of geographies.

* **Data logical separation** - The [Fabric platform](security-fundamentals.md#fabric-platform) provide logical isolation between tenants to protect your data.

* **Data sovereignty** - To start working with multi-geo, see [Configure Multi-Geo support for Fabric](../admin/service-admin-premium-multi-geo.md).

## Authenticate

Every interaction with Fabric, including logging in, using the Power BI mobile app, and running SQL queries through SQL Server Management Studio (SSMS), is authenticated using [Microsoft Entra ID](/entra/verified-id/decentralized-identifier-overview).

With Microsoft Entra ID you can set up a [Zero Trust](/security/zero-trust/zero-trust-overview) security solution for Fabric. Zero Trust assumes that you're not safe within the compound of your organization's network security. The Zero trust approach believes that your organization is constantly under attack, and that you face continues security breach threat. To combat this on-going threat, Fabric enforces the use of Microsoft Entra ID authentication. Users can't use other authentication means such as account keys, shared access signatures (SAS), SQL authentication (usernames and passwords).

Microsoft Entra ID provides Fabric with [Conditional Access](/entra/identity/conditional-access/overview) which allows you to secure access to your data. Here are a few examples of access restrictions you can enforce using Conditional Access.

* Define a list of IPs for inbound connectivity to Fabric.

* Use Multifactor Authentication (MFA).

* Restrict traffic based on parameters such as country of origin or device type. 

## Manage data

Fabric allows different people in your organization to consume data when and where they need it. For example, an executive might look at a Power BI report on her mobile in a convention that's taking place in a foreign country. Another example is a data engineer connecting to a remote server from home.

In this section, you learn how to import data into Fabric, how it's kept secure, and how you can make sure that data is only consumed by the right people in your organization. For more information about data in Fabric, review [Microsoft Fabric security fundamentals](security-fundamentals.md).

### Import data from a secure network

Your organization might store data in other locations that aren't part of the Fabric platform. Fabric allows several ways to securely connect to data, for import and export purposes.

* **On-premises data gateway** - With an on-premises data gateway you can use [Data Flows Gen 2](../data-factory/dataflows-gen2-overview.md) to connect to data sources that are behind firewalls and virtual networks.

* **Connect to an existing service** - You can connect to Fabric using your existing Azure Platform as a Service (PaaS) service. For Synapse and Azure Data Factory (ADF) you can use [Azure Integration Runtime (IR)](/azure/data-factory/concepts-integration-runtime) or [Azure Data Factory managed virtual network](/azure/data-factory/managed-virtual-network-private-endpoint). You can also connect to these services and other services such as Mapping data flows, Synapse Spark clusters, Databricks Spark clusters and Azure HDInsight using [OneLake APIs](../onelake/onelake-access-api.md).

* **Azure service tags** - Use [service Tags](security-service-tags.md) to ingest data without the use of data gateways, from data sources deployed in an Azure virtual network, such as Azure SQL Virtual Machines (VMs), Azure SQL Managed Instance (MI) and EST APIs. You can also use service tags to get traffic from a virtual network or an Azure firewall. For example, service tags can allow outbound traffic to Fabric so that a user on a VM can connect to Fabric SQL endpoints from SSMS, while blocked from accessing other public internet resources.

* **IP allowlist** - If you have data that doesn't reside in Azure, you can enable an IP allowlist on your organization's network to allow traffic to and from Fabric. An IP allowlist is useful if you need to get data from data sources that don't support service tags, such as Azure Data Lake Storage (ADLS) and on-premises data sources. If you have an ADLS Gen2 account that's protected by a firewall or a virtual network, you can use an IP allowlist to create shortcuts in Fabric. With these shortcuts, you can get data without copying it into OneLake using a [Lakehouse SQL endpoint](../data-engineering/lakehouse-sql-analytics-endpoint.md) or [Direct Lake](/power-bi/enterprise/directlake-overview).

    You can get the list of Fabric IPs from [Service tags on-premises](/azure/virtual-network/service-tags-overview#service-tags-on-premises). The list is available as a JSON file, or programmatically with REST APIs, PowerShell, and Azure Command-Line Interface (CLI).

### Secure Data

In Fabric, all data that is stored in OneLake is encrypted at rest. All data at rest is stored in your home region, or in one of your capacities at a remote region of your choice. For more information, see [Microsoft Fabric security fundamentals](security-fundamentals.md).

### Access data

Fabric controls data access using [workspaces](../get-started/workspaces.md). In workspaces, data appears in the form of Fabric items, and users can't view or use items (data) unless you give them access to the workspace.

#### Workspace roles

Workspace access is listed in the table below. It includes [workspace roles](../get-started/roles-workspaces.md) and [OneLake security](../onelake/onelake-security.md#workspace-security). Users with a viewer role can run SQL, Data Analysis Expressions (DAX) or Multidimensional Expressions (MDX) queries, but they can't access Fabric items or run a [notebook](../data-engineering/how-to-use-notebook.md)

| Role                           | Workspace access                       | OneLake access                                                        |
|--------------------------------|----------------------------------------|-----------------------------------------------------------------------|
| Admin, member, and contributor | Can use all the items in the workspace | :::image type="icon" source="../media/yes-icon.svg" border="false"::: |
| Viewer                         | Can see all the items in the workspace | :::image type="icon" source="../media/no-icon.svg" border="false":::  |

#### Share items

You can [share Fabric items](../get-started/share-items.md) with users in your organization that don't have any workspace role. Sharing items gives restricted access, allowing users to only access the shared item in the workspace.

#### Limit access

You can limit viewer access to data using [Row-level security (RLS)](/power-bi/enterprise/service-admin-rls), [Column level security (CLS)](../data-warehouse/column-level-security.md) and [Object level security (OLS)](/power-bi/enterprise/service-admin-ols). With RLS, CLS and OLS, you can create user identities that have access to certain portions of your data, and limit SQL results returning only what the user's identity can access.

You can also add RLS to a DirectLake dataset. If you define security for both SQL and DAX, DirectLake falls back to DirectQuery for tables that have RLS in SQL. In such cases, DAX, or MDX results are limited to the user's identity.

To expose reports using a DirectLake dataset with RLS without a DirectQuery fallback, use [apps in Power BI](/power-bi/consumer/end-user-apps). With apps in Power BI you can give access to reports without viewer access. This kind of access means that the users can't use SQL. To enable DirectLake to read the data, you need to [switch the data source credential](/power-bi/enterprise/directlake-fixed-identity) from Single Sign On (SSO) to a fixed identity that has access to the files in the lake.

### Protect data

Fabric supports sensitivity labels from Microsoft Purview Information Protection. These are the labels, such as *General*, *Confidential*, and *Highlighly Confidential*, that are widely used in Microsoft Office apps such as Word, PowerPoint, and Excel to protect senstivity information. In Fabric, you can classify items that contain sensitive data using these same sensitivity labels. The sensitivity labels then follow the data automatically from item to item as it flows through Fabric, all the way from data source to business user. The sensitivity label follows even when the data is exported to supported formats such as PBIX, Excel, PowerPoint, and PDF, thus ensuring that your data remains protected. Only authorized users will be able to open the file. For more information, see [Governance and compliance in Microsoft Fabric](../governance/governance-compliance-overview.md).

## Recover data

Fabric data resiliency ensures that your data is available in case of a disaster. Fabric also enables you to recover your data in case of a disaster, Disaster recovery. For more information see [Reliability in Microsoft Fabric](/azure/reliability/reliability-fabric).

## Capabilities

Review this section for a list of some of the security features available in Microsoft Fabric.

| Capability |Description |
|------------|------------|
| [Conditional access](security-conditional-access.md)  | Secure your apps by using Microsoft Entra ID |
| [Lockbox](security-lockbox.md)  | Control how Microsoft engineers access your data                   |
| [OneLake security](../onelake/onelake-security.md) | Learn how to secure your data in OneLake. |
| [Resiliency](az-resiliency.md) | Reliability and regional resiliency with Azure availability zones   |
| [Service tags](security-service-tags.md) | Enable an Azure SQL Managed Instance (MI) to allow incoming connections from Microsoft Fabric |

## Related content

* [Security fundamentals](../security/security-fundamentals.md)

* [Admin overview](../admin/admin-overview.md)

* [Governance and compliance overview](../governance/governance-compliance-overview.md)

* [Microsoft Fabric licenses](../enterprise/licenses.md)
