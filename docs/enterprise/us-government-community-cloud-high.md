---
title: Microsoft Fabric for US Government GCC High customers
description: Learn about eligibility, licensing, sign-in, API endpoints, and workload availability for Microsoft Fabric in the US Government GCC High cloud.
author: SnehaGunda
ms.author: sngun
ms.topic: concept-article
ms.date: 09/29/2026
ms.custom: gcc
ai-usage: ai-assisted

#customer intent: As a GCC High administrator or decision-maker, I want to understand how to access and plan for Microsoft Fabric in GCC High.
---

# Microsoft Fabric for US Government GCC High customers

Microsoft Fabric in the US Government Community Cloud High (GCC High) environment provides Fabric capabilities for organizations that must meet US government compliance and security requirements. This article describes eligibility and licensing resources, the GCC High sign-in experience, service API endpoints, the Fabric workloads and capabilities, and the current limitations.

## Eligibility, licensing, and subscriptions

Your organization must meet the eligibility requirements for the US Government GCC High environment before it can use in GCC High. Complete the [Government Community Cloud Eligibility Intake Form](https://usgovintake.embark.microsoft.com/) to determine whether your organization is eligible.

Fabric licenses and capacities determine how you create, share, and view items. Review the following guidance when you plan your GCC High deployment:

- [Understand Microsoft Fabric licenses](licenses.md)
- [Buy a Microsoft Fabric subscription](buy-subscription.md)

> [!NOTE]
> Free licenses and trials aren't available in government clouds. You need a Power BI Pro license to create or run Fabric items, including lakehouses, warehouses, and notebooks. To use workloads other than Power BI, you also need a Fabric capacity.

Contact your Microsoft account team for GCC High purchasing requirements that apply to your organization.

## Sign in to Fabric

Sign in to Fabric in GCC High at `https://app.high.powerbigov.us`. Other government and commercial cloud URLs don't apply to the GCC High environment.

## API endpoints

Use the GCC High endpoint that corresponds to the API you're calling.

| API | GCC High endpoint |
| --- | --- |
| Power BI REST API | `https://api.high.powerbigov.us` |
| Fabric REST API | `https://highapi.fabric.microsoft.us` |

For API operations and request formats, see the [Power BI REST API reference](/rest/api/power-bi/) and [REST API documentation](/rest/api/fabric/).

## Region availability

Fabric for GCC High is available only in the following regions:

- US Gov Virginia
- US Gov Texas

## Feature availability

The following table lists the Fabric workloads and items available in GCC High:

| Workload | Available items and capabilities |
| --- | --- |
| Data Engineering | Lakehouse, lakehouse SQL analytics endpoint, notebook, Spark job definition, environment, lakehouse with schema, API for GraphQL, User Data Functions, and Spark connector for SQL Data Warehouse |
| Data Factory | Pipeline, Dataflow Gen2, Copy job, virtual network data gateway, and on-premises data gateway |
| Data Science | Machine learning model and experiment |
| Data Warehouse | Warehouse and SQL analytics endpoint |
| Developer experience | Deployment pipelines and variable library |
| Governance and security | Sensitivity label and share item |
| Mirroring | Mirrored Azure SQL Database |
| Fabric databases | SQL database in Fabric |
| Power BI | Power BI report, dashboard, scorecard, semantic model, direct Lake on SQL, direct Lake on OneLake, and paginated report |
| Real-Time Intelligence | KQL queryset, Activator (All integrations points with RTI), eventhouse and KQL database, eventstream, and Real-Time dashboard |

The following table lists the Fabric platform functionality available in GCC High:

| Functionality | Availability in GCC High |
| --- | --- |
| OneLake | Offers same functionality and capabilities as the public Fabric except shortcuts as mentioned in the [limitations section](#current-limitations). |
| Private link | Tenant-level private link is supported. |
| Real-Time Hub | Offers same functionality and capabilities as the public Fabric. |
| OneLake security | Offers same functionality and capabilities as the public Fabric. |
| OneLake disaster recovery | Offers same functionality and capabilities as the public Fabric. |

Items other than those listed in these tables aren't currently available in GCC High. Feature availability can differ from the public/commercial Fabric service because of government cloud requirements and service dependencies.

## Current limitations

The following limitations apply to Fabric for GCC High:

- **Customer-managed keys (CMK)** aren't supported.
- **Outbound access protection** isn't supported.
- **Workspace identity** isn't supported.
- **Workspace monitoring** isn't supported.
- **Shortcuts** have partial support. You can create shortcuts to Azure Blob Storage and Azure Data Lake Storage Gen2. Other shortcut scenarios, such as external connectivity, aren't supported.
- **Fabric IQ items** (graph model, graph queryset, operations agent, and ontology) aren't supported.
- **Mirroring sources** except mirrored Azure SQL Database aren't supported.
- **Workspace Private Link** isn't supported.
- **Copilot Power BI** isn't supported.

## FedRAMP High compliance

Microsoft submitted all required artifacts for Fabric GCC High FedRAMP High authorization and is currently undergoing assessment by U.S. government reviewers. Fabric is already FedRAMP High authorized in commercial cloud environments.

## Related content

- [Power BI for US government customers](powerbi/service-government-us-overview.md)
- [Understand Microsoft Fabric licenses](licenses.md)
- [Buy a Microsoft Fabric subscription](buy-subscription.md)
