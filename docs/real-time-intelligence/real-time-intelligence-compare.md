---
title: Differences between Real-Time Intelligence and Azure Data Explorer
description: Learn about the differences between Real-Time Intelligence and Azure Data Explorer.
ms.reviewer: tzgitlin
ms.author: yaschust
author: YaelSchuster
ms.topic: overview
ms.custom:
  - build-2023
  - build-2023-dataai
  - build-2023-fabric
  - ignite-2023
ms.date: 04/21/2024
ms.search.form: Overview
---
# What is the difference between Real-Time Intelligence and Azure Data Explorer?

Real-Time Intelligence is a data analytics SaaS experience in the Microsoft Fabric offering. Azure Data Explorer is a PaaS service in Azure. Kusto in Real-Time Intelligence (KQL Database and KQL Queryset) and Azure Data Explorer share the same core engine with the identical core capabilities, but different management behavior. This article details the difference between the two services. Real-Time Intelligence also offers other capabilities, such as [Eventstreams](event-streams/overview.md), and has many aspects that are managed at the workspace level.

For more information on Real-Time Intelligence, see [What is Real-Time Intelligence in Fabric?](overview.md).

## Integrated work mode

The two services allow for an integrated work model whereby data can be loaded to one service and consumed from the other.

You can query data from your KQL database in the query editor of Azure Data Explorer. Similarly, you can use your KQL Queryset to analyze data loaded into a database in Azure Data Explorer.

## Capability support

| Category | Capability | Synapse Real-Time Intelligence | Azure Data Explorer |
|--|--|--|--|
| **Security** | VNET | Managed at Fabric level- currently unavailable. | Network isolation via Azure Private Endpoints. |
|  | Customer managed keys | Currently unavailable | &check; |
|  | Role-based access control – Control plane | Control plane access managed through the workspace and database user UX. | Control plane access based on the Azure RBAC model and managed through Azure portal. |
|  | Role-based access control – Data plane | Data plane access is managed via the different user experiences and via control commands. | Data plane access is managed via the different user experiences and via control commands. |
| **Business Continuity** | Availability Zones | Yes; dependent on regional zonal availability. | Yes; dependent on regional zonal availability. User controlled. |
| **SKU** | Compute options | SaaS managed platform | User choice of various full managed compute options according to customer needs, including isolated and confidential compute. |
| **Integration** | Ingestion pipelines | Built-in Fabric ingestion pipelines: Eventstream, Fabric Pipeline, and Fabric Dataflow. Also available with Azure Data Factory and Event Hubs | Fabric ingestion pipelines with Azure Data Explorer as a sink: Fabric Pipeline and Fabric Dataflow. Also available with Azure Data Factory, Event Hubs, IoT Hub, and Event Grid. |
|  | OneLake integration | Data stored in KQL databases in Fabric Real-Time Intelligence is available in OneLake. Data in OneLake is available in Real-Time Intelligence via shortcuts | Not currently available |
|  | Spark integration | Built-in Kusto Spark connector adds value like predicate pushdowns. The data is also available in the OneLake so that Fabric experiences can access data also via OneLake APIs. | Built-in Kusto Spark integration with support for Microsoft Entra pass-through authentication, Synapse Workspace MSI, and Service Principal. |
| **Features** | Database | KQL Database | Azure Data Explorer database |
|  | KQL queries | &check; | &check; |
|  | T-SQL queries | Using KQL Queryset or built-in Notebooks. | Using Azure Data Explorer query. |
|  | Query repository and sharing | Queries are stored in a KQL Queryset item that is shared with the other Fabric workspace users. | Queries are stored in the user's Azure Data Explorer web experience. |
|  | API and SDKs | Available in the data plane. | &check; |
|  | Connectors | &check; | &check; |
|  | Autoscale | Built-in | Optional: manual, optimized, and custom modes. |
|  | Visualization | KQL query-based visualization, Power BI reports | KQL query-based visualization, Built-in Azure Data Explorer dashboards, Power BI reports. |
|  | Power BI connectivity | Power BI report Quick create allows for online creation of reports without the desktop application.  Power BI connector | Power BI connector |
| **Pricing** | Business model | Included in the Power BI Premium workspace consumption model. Billing per use. | Cost plus billing model with multiple meters: Azure Data Explorer IP markup, with passthrough of infrastructure (Compute, Storage, and Networking) expenses. Leverages Azure reserved instances plans when in place. |

## Related content

- [Get started with Real-Time Intelligence](tutorial-introduction.md)
