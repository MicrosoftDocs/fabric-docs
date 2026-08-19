---
title: Microsoft Fabric for US Government GCC High customers
description: Learn about eligibility, licensing, sign-in, API endpoints, and workload availability for Microsoft Fabric in the US Government GCC High cloud.
author: SnehaGunda
ms.author: sngun
ms.topic: concept-article
ms.date: 07/31/2026
ms.custom: gcc
ai-usage: ai-assisted

#customer intent: As a GCC High administrator or decision-maker, I want to understand how to access and plan for Microsoft Fabric in GCC High.
---

# Microsoft Fabric for US Government GCC High customers

Microsoft Fabric in the US Government Community Cloud High (GCC High) environment provides Fabric capabilities for organizations that must meet US government compliance and security requirements. This article describes eligibility and licensing resources, the GCC High sign-in experience, service API endpoints, and the Fabric workloads and capabilities included at public preview and general availability (GA).

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

The following table identifies the Fabric workloads and cross-cutting capabilities included in the GCC High release scope. It lists Public Preview and GA scope without release dates. An entry of **Not included** means the capability isn't part of that release stage.

| Workload or capability | Public Preview | GA |
| --- | --- | --- |
| Power BI | Included | Included |
| OneLake | Included | Included |
| Data Warehouse: warehouse and SQL analytics endpoint | Included | Included |
| Data Engineering: notebooks | Included | Included |
| Data Engineering: Spark Core | Included | Included |
| Data Engineering: lakehouse | Included | Included |
| Eventstream, including Real-Time Intelligence | Included | Included |
| Eventhouse | Included | Included |
| Data Factory: data pipelines, Dataflow Gen2, Copy job, and Apache Airflow jobs | Included | Included |
| Mirroring for SQL database in Fabric | Included | Included |
| API for GraphQL | Included | Included |
| Data Science: machine learning, experiments, and models | Included | Included |
| Fabric-native semantic models with Direct Lake and SQL analytics endpoints | Included | Included |
| Real-Time hub | Included | Included |
| Activator | Included | Included |
| Variable libraries | Included | Included |

Feature availability can differ from the commercial Fabric service because of government cloud requirements and service dependencies. This table doesn't provide release dates or commitments for capabilities outside the listed scope.

## Related content

- [Power BI for US government customers](powerbi/service-government-us-overview.md)
- [Understand Microsoft Fabric licenses](licenses.md)
- [Buy a Microsoft Fabric subscription](buy-subscription.md)
