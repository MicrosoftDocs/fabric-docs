---
title: "Microsoft Fabric security fundamentals"
description: "Learn about Microsoft Fabric security fundamentals and how the main flows in the system work."
author: peter-myers
ms.author: v-myerspeter
ms.reviewer: sergeig, vparasuraman
ms.date: 01/14/2024
ms.topic: conceptual
ms.custom: fabric-cat
---

# Microsoft Fabric security fundamentals

This article presents a big-picture perspective of the Microsoft Fabric security architecture by describing how the main security flows in the system work. It also describes how users authenticate with Fabric, how data connections are established, and how Fabric stores and moves data through the service.

The article is primarily targeted at Fabric administrators, who are responsible for overseeing Fabric in the organization. It's also relevant to enterprise security stakeholders, including security administrators, network administrators, Azure administrators, workspace administrators, and database administrators.

## Fabric platform

[Microsoft Fabric](../get-started/microsoft-fabric-overview.md) is an all-in-one analytics solution for enterprises that covers everything from data movement to data science, real-time analytics, and business intelligence (BI). The Fabric platform comprises a series of services and infrastructure components that support the common functionality for all [Fabric experiences](../get-started/microsoft-fabric-overview.md#components-of-microsoft-fabric). Collectively, they offer a comprehensive set of analytics experiences designed to work together seamlessly. Experiences include [Lakehouse](../data-engineering/lakehouse-overview.md), [Data Factory](../data-factory/data-factory-overview.md), [Synapse Data Engineering](../data-engineering/data-engineering-overview.md), [Synapse Data Warehouse](../data-warehouse/data-warehousing.md), [Power BI](/power-bi/fundamentals/power-bi-overview), and others.

With Fabric, you don't need to piece together different services from multiple vendors. Instead, you benefit from a highly integrated, end-to-end, and easy-to-use product that's designed to simplify your analytics needs. Fabric was designed from the outset to protect sensitive assets.

The Fabric platform is built on a foundation of software as a service (SaaS), which delivers reliability, simplicity, and scalability. It's built on Azure, which is Microsoft's public cloud computing platform. Traditionally, many data products have been platform as a service (PaaS), requiring an administrator of the service to set up security, compliance, and governance for each service. Because Fabric is a SaaS service, many of these features are built into the SaaS platform and require no setup or minimal setup.

### Architectural diagram

The architectural diagram below shows a high-level representation of the Fabric security architecture.

:::image type="content" source="media/security-fundamentals/fabric-security-architectural-diagram.svg" alt-text="Diagram shows a high-level representation of the Fabric security architecture.":::

The architectural diagram depicts the following concepts.

1. A user uses a browser or a client application, like Power BI Desktop, to connect to the Fabric service.

2. Authentication is handled by Microsoft Entra ID, [previously known as Azure Active Directory](/entra/fundamentals/new-name), which is the cloud-based identity and access management service that authenticates the user or [service principal](/entra/identity-platform/app-objects-and-service-principals?tabs=browser#service-principal-object) and manages access to Fabric.

3. The web front end receives user requests and facilitates login. It also routes requests and serves front-end content to the user.

4. The metadata platform stores tenant metadata, which can include customer data. Fabric services query this platform on demand in order to retrieve authorization information and to authorize and validate user requests. It's located in the tenant home region.

5. The back-end capacity platform is responsible for compute operations and for storing customer data, and it's located in the capacity region. It leverages Azure core services in that region as necessary for specific Fabric experiences.

Fabric platform infrastructure services are multitenant. There is logical isolation between tenants. These services don't process complex user input and are all written in managed code. Platform services never run any user-written code.

The metadata platform and the back-end capacity platform each run in secured virtual networks. These networks expose a series of secure endpoints to the internet so that they can receive requests from customers and other services. Apart from these endpoints, services are protected by network security rules that block access from the public internet. Communication within virtual networks is also restricted based on the privilege of each internal service.

The application layer ensures that tenants are only able to access data from within their own tenant.

## Authentication

Fabric relies on Microsoft Entra ID to authenticate users (or service principals). When authenticated, users receive [access tokens](/entra/identity-platform/access-tokens) from Microsoft Entra ID. Fabric uses these tokens to perform operations in the context of the user.

A key feature of Microsoft Entra ID is [conditional access](security-conditional-access.md). Conditional access ensures that tenants are secure by enforcing multifactor authentication, allowing only [Microsoft Intune](/mem/intune/fundamentals/what-is-intune) enrolled devices to access specific services. Conditional access also restricts user locations and IP ranges.

## Authorization

All Fabric permissions are stored centrally by the metadata platform. Fabric services query the metadata platform on demand in order to retrieve authorization information and to authorize and validate user requests.

For performance reasons, Fabric sometimes encapsulates authorization information into _signed tokens_. Signed tokens are only issued by the back-end capacity platform, and they include the access token, authorization information, and other metadata.

## Data residency

In Fabric, a tenant is assigned to a home metadata platform cluster, which is located in a single region that meets the data residency requirements of that region's geography. Tenant metadata, which can include customer data, is stored in this cluster.

Customers can control where their [workspaces](../get-started/workspaces.md) are located. They can choose to locate their workspaces in the same geography as their metadata platform cluster, either explicitly by assigning their workspaces on capacities in that region or implicitly by using Fabric Trial, Power BI Pro, or Power BI Premium Per User [license mode](../get-started/workspaces.md#license-mode). In the latter case, all customer data is stored and processed in this single geography. For more information, see [Microsoft Fabric concepts and licenses](../enterprise/licenses.md).

Customers can also create [Multi-Geo capacities](../admin/service-admin-premium-multi-geo.md) located in geographies (geos) other than their home region. In this case, compute and storage (including [OneLake](../onelake/onelake-overview.md) and experience-specific storage) is located in the multi-geo region, however the tenant metadata remains in the home region. Customer data will only be stored and processed in these two geographies. For more information, see [Configure Multi-Geo support for Fabric Premium](../admin/service-admin-premium-multi-geo.md).

## Data handling

This section provides an overview of how data handling works in Fabric. It describes storage, processing, and the movement of customer data.

### Data at rest

All Fabric data stores are encrypted at rest by using Microsoft-managed keys. Fabric data includes customer data as well as system data and metadata.

While data can be processed in memory in an unencrypted state, it's never persisted to permanent storage while in an unencrypted state.

### Data in transit

Data in transit across the public internet between Microsoft services is always encrypted with at least TLS 1.2. Fabric negotiates to TLS 1.3 whenever possible. Traffic between Microsoft services always routes over the [Microsoft global network](/azure/networking/microsoft-global-network).

Inbound Fabric communication also enforces TLS 1.2 and negotiates to TLS 1.3, whenever possible. Outbound Fabric communication to customer-owned infrastructure prefers secure protocols but might fall back to older, insecure protocols (including TLS 1.0) when newer protocols aren't supported.

## Telemetry

Telemetry is used to maintain performance and reliability of the Fabric platform. The Fabric platform telemetry store is designed to be compliant with data and privacy regulations for customers in all regions where Fabric is available, including the European Union (EU). For more information, see [EU Data Boundary Services](https://www.microsoft.com/licensing/terms/product/PrivacyandSecurityTerms/MPSA#EUDataBoundaryServices).

## OneLake

[OneLake](../onelake/onelake-overview.md) is a single, unified, logical data lake for the entire organization, and it's automatically provisioned for every Fabric tenant. It's built on Azure and it can store any type of file, structured or unstructured. Also, all Fabric items, like warehouses and lakehouses, automatically store their data in OneLake.

OneLake supports the same [Azure Data Lake Storage Gen2 (ADLS Gen2)](/azure/storage/blobs/data-lake-storage-introduction) [APIs](../onelake/onelake-api-parity.md) and SDKs, therefore it's compatible with existing ADLS Gen2 applications, including [Azure Databricks](/azure/databricks/introduction/).

For more information, see [OneLake security](../onelake/onelake-security.md).

### Workspace security

[Workspaces](../get-started/workspaces.md) represent the primary security boundary for data stored in OneLake. Each workspace represents a single domain or project area where teams can collaborate on data. You manage security in the workspace by assigning users to [workspace roles](../get-started/roles-workspaces.md).

For more information, see [OneLake security (Workspace security)](../onelake/onelake-security.md#workspace-security).

### Item security

Within a workspace, you can assign permissions directly to Fabric items, like warehouses and lakehouses. [Item security](../onelake/onelake-security.md#item-security) provides the flexibility to grant access to an individual Fabric item without granting access to the entire workspace. Users can set up per item permissions either by [sharing an item](../get-started/share-items.md) or by managing the permissions of an item.

## Compliance resources

The Fabric service is governed by the [Microsoft Online Services Terms](https://www.microsoftvolumelicensing.com/DocumentSearch.aspx?Mode=3&DocumentTypeId=31) and the [Microsoft Enterprise Privacy Statement](https://www.microsoft.com/privacystatement/OnlineServices/Default.aspx).

For the location of data processing, refer to the _Location of Data Processing_ terms in the [Microsoft Online Services Terms](https://www.microsoftvolumelicensing.com/Downloader.aspx?DocumentId=9555) and to the [Data Protection Addendum](https://www.microsoft.com/download/details.aspx?id=101581).

For compliance information, the [Microsoft Trust Center](https://www.microsoft.com/trustcenter) is the primary resource for Fabric. For more information about compliance, see [Microsoft compliance offerings](/compliance/regulatory/offering-home).

The Fabric service follows the Security Development Lifecycle (SDL), which consists of a set of strict security practices that support security assurance and compliance requirements. The SDL helps developers build more secure software by reducing the number and severity of vulnerabilities in software, while reducing development cost. For more information, see [Microsoft Security Development Lifecycle Practices](https://www.microsoft.com/securityengineering/sdl/practices).

## Related content

For more information about Fabric security, see the following resources.

- [Security in Microsoft Fabric](security-overview.md)
- [OneLake security](../onelake/onelake-security.md)
- [Microsoft Fabric licenses](../enterprise/licenses.md)
- Questions? Try asking the [Fabric community](https://community.fabric.microsoft.com/).
- Suggestions? [Contribute ideas to improve Fabric](https://ideas.fabric.microsoft.com/).