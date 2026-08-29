---
title: Microsoft Fabric for US Government GCC High customers
description: Learn about eligibility, licensing, sign-in, API endpoints, and workload availability for Microsoft Fabric in the US Government GCC High cloud.
author: SnehaGunda
ms.author: sngun
ms.topic: concept-article
ms.date: 08/29/2026
ms.custom: gcc
ai-usage: ai-assisted

#customer intent: As a GCC High administrator or decision-maker, I want to understand how to access and plan for Microsoft Fabric in GCC High.
---

# Microsoft Fabric for US Government GCC High customers

Microsoft Fabric in the US Government Community Cloud High (GCC High) environment provides Fabric capabilities for organizations that must meet US government compliance and security requirements. This article describes eligibility and licensing resources, the GCC High sign-in experience, service API endpoints, the Fabric workloads and capabilities included at public preview and general availability (GA), and the current limitations during public preview.

## Eligibility, licensing, and subscriptions

Your organization must meet the eligibility requirements for the US Government GCC High environment before it can use Microsoft Fabric in GCC High. Complete the [Government Community Cloud Eligibility Intake Form](https://usgovintake.embark.microsoft.com/) to determine whether your organization is eligible.

Fabric licenses and capacities determine how users create, share, and view Fabric items. Review the following guidance when you plan your GCC High deployment:

- [Understand Microsoft Fabric licenses](licenses.md)
- [Buy a Microsoft Fabric subscription](buy-subscription.md)

> [!NOTE]
> Free licenses and trials aren't available in government clouds. Users need a Power BI Pro license.

Contact your Microsoft account team for GCC High purchasing requirements that apply to your organization.

## Sign in to Fabric

Sign in to Microsoft Fabric in GCC High at `https://app.high.powerbigov.us`. Other government and commercial cloud URLs don't apply to the GCC High environment.

## API endpoints

Use the GCC High endpoint that corresponds to the API you're calling.

| API | GCC High endpoint |
| --- | --- |
| Power BI REST API | `https://api.high.powerbigov.us` |
| Fabric REST API | `https://highapi.fabric.microsoft.us` |

For API operations and request formats, see the [Power BI REST API reference](/rest/api/power-bi/) and [Fabric REST API documentation](/rest/api/fabric/).

## Feature availability

The following table lists the Fabric capabilities available in Microsoft Fabric for GCC High by release stage. **Available** means the capability is part of that stage's scope. The **GA** column is blank where the general availability (GA) scope is still being confirmed.

| Workload | Capabilities in public preview | Public preview | GA |
| --- | --- | --- | --- |
| Data Engineering | Lakehouse, lakehouse SQL analytics endpoint, notebook, Spark job definition, environment, lakehouse with schema, and Spark connector for SQL Data Warehouse | Available | Available |
| Data Factory | Pipeline, Dataflow Gen2, Copy job, default semantic model, virtual network data gateway, and on-premises data gateway (pipeline, Copy job, and Dataflow Gen2) | Available | Available |
| Data Science | Machine learning model and experiment | Available | Available |
| Data Warehouse | Warehouse and SQL analytics endpoint | Available | Available |
| Developer experience | API for GraphQL, deployment pipelines, Git integration, and variable library | Available | Available |
| Governance and security | Sensitivity label and share item | Available | |
| Mirroring | Mirrored Azure SQL Database | Available | Available |
| Fabric databases | SQL database in Fabric | Available | |
| OneLake | Shortcut | Available | Available |
| Power BI | Power BI report, dashboard, scorecard, semantic model, streaming dataflow, streaming dataset, and paginated report | Available | Available |
| Real-Time Intelligence | KQL queryset, Activator, eventhouse and KQL database, eventstream, and Real-Time dashboard | Available | Available |

Fabric items not listed in this table aren't available in GCC High during public preview. This limitation includes Fabric IQ items (graph model, graph queryset, operations agent, and ontology) and all mirroring sources except Mirrored Azure SQL Database.

Feature availability can differ from the commercial Fabric service because of government cloud requirements and service dependencies.

## Current limitations in public preview

The following capabilities aren't supported in Microsoft Fabric for GCC High during public preview.

### Networking and security

- **Private Link** isn't supported.
- **Customer-managed keys (CMK)** aren't supported.
- **Outbound access protection** isn't supported.
- **OneLake security**: Spark support for OneLake security isn't available.

## Related content

- [Power BI for US government customers](powerbi/service-government-us-overview.md)
- [Understand Microsoft Fabric licenses](licenses.md)
- [Buy a Microsoft Fabric subscription](buy-subscription.md)
