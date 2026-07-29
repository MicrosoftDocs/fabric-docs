---
title: Apache Spark runtime lifecycle in Fabric
description: Lifecycle for Apache Spark runtime in Fabric
ms.reviewer: arali
ms.topic: overview
ms.date: 07/24/2026
---

# Lifecycle of Apache Spark runtimes in Fabric

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark. It facilitates the execution and management of data engineering and data science workflows. It synthesizes essential elements from both proprietary and open-source resources to offer a comprehensive solution. For brevity, refer to the Microsoft Fabric Runtime powered by Apache Spark simply as Fabric Runtime.

> [!NOTE]
> This article covers the lifecycle of Apache Spark runtimes. It doesn't cover Python notebook kernels, which follow a separate lifecycle. For the Python notebook kernel lifecycle, see [Python notebook runtime and kernel lifecycle in Fabric](./python-notebook-runtime-lifecycle.md).

## Release cadence

Apache Spark typically releases minor versions every six to nine months. The Microsoft Fabric Spark team is committed to delivering new runtime versions quickly while ensuring the highest quality, integration, and continuous support. Each version comprises around 110 components. As the runtime expands beyond Apache Spark, the team ensures seamless integration within the Azure ecosystem.

With a commitment to excellence, the team approaches new preview runtime releases carefully. They target an experimental preview in about three months but ultimately establish timelines on a case-by-case basis. This approach involves evaluating critical components of each Spark version, including Java, Scala, Python, R, and Delta Lake. After thorough assessment, the team creates a detailed timeline outlining the runtime's availability and progression through various stages. Overall, the goal is to establish a standard lifecycle path for Microsoft Fabric runtimes for Apache Spark.

> [!TIP]
> Always use the most recent, GA runtime version for your production workload, which currently is [Runtime 1.3](./runtime-1-3.md).

The following table lists the runtime name and release dates for supported Azure Synapse runtime releases.

| Runtime name                                              | Release stage | End of Support date |
|-----------------------------------------------------------|---------------|---------------------|
| [Runtime 2.0 based on Apache Spark 4.1](./runtime-2-0.md) | Public Preview | Not Applicable      |
| [Runtime 1.3 based on Apache Spark 3.5](./runtime-1-3.md) | GA            | September 30, 2026**  |

** Runtime 1.3 enters Long Term Support (LTS) on October 1, 2026, for a period of six months, extending support through March 2027.


:::image type="content" source="media\runtime\lifecycle-runtimes.png" alt-text="Diagram showing lifecycle of a runtime in Fabric." lightbox="media\runtime\lifecycle-runtimes.png":::

The diagram outlines the lifecycle of a runtime version from its experimental public preview to its deprecation and removal.

| Stage                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Typical Lifecycle                        |
|---------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| Experimental public preview                             | The Experimental public preview phase marks the initial release of a new runtime version. During this phase, users are urged to experiment with the latest versions of Apache Spark and Delta Lake and provide feedback, despite the presence of documented limitations. The Microsoft Azure Preview terms apply. See [Preview Terms Of Use](../fundamentals/preview.md).                                                                                                                                                                                                                                                                                                                                                                                            | 2-3 months*                               |
| Public preview                                          | After further improvements are made and limitations are minimized, the runtime progresses to the preview stage. The Microsoft Azure Preview terms apply. See [Preview Terms Of Use](../fundamentals/preview.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 3 months*                                 |
| General Availability (GA)                               | Once a runtime version meets the General Availability (GA) criteria, it's released to the public and is suitable for production workloads. To reach this stage, the runtime must meet strict requirements in terms of performance, integration with the platform, reliability assessments, and its ability to meet users' needs.                                                                                                                                                                                                                                                                                                                                                                                                   | 24 months                                |
| Long Term Support (LTS)                                 | Following the General Availability (GA) release, a runtime might transition into the Long-Term Support (LTS) stage, depending on the specific requirements of the Spark version. This LTS stage might be announced, detailing the expected support duration for customers, which is generally an additional year of full support.                                                                                                                                                                                                                                                                                                                                                                                                      | 12 months*                                |
| End of support date announced                           | When a runtime reaches its end of support, it doesn't receive any further updates or support. Typically, a six-month notice is given before the deprecation of the runtime. This end-of-support date is documented by updating a specific table with the end-of-life date, which marks the discontinuation of support.                                                                                                                                                                                                                                                                                                                                                                                                            | 6 months before deprecation day          |
| End of support date. Runtime Unsupported and Deprecated | Once the previously announced end-of-support date arrives, the runtime becomes officially unsupported. This change implies that it doesn't receive any updates or bug fixes, and the team provides no official support. The system automatically resolves all support tickets. Using an unsupported runtime is at your own risk. The runtime is removed from Fabric workspace settings and the Environment item, making it impossible to use at the workspace level. Furthermore, the runtime is also removed from the environments, and there's no option to create a new environment for that runtime version. Existing Spark jobs running on the existing environments can't run. | N/A                                      |
| Runtime removed                                         | Once the runtime reaches the unsupported phase, all environments using this runtime are eliminated. All backend-related components associated with this runtime are also removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | A few days after the end of support date |

_* The expected duration of runtime in each stage. These timelines are provided as an example and might vary depending on various factors. Lifecycle timelines are subject to change at Microsoft discretion._



## Versioning

Our runtime version numbering, while closely related to Semantic Versioning, follows a slightly different approach. The
runtime major version corresponds to the Apache Spark major version. Therefore, Runtime 1 corresponds to Spark version 3. Similarly, Runtime 2 aligns with Spark 4.1. It's essential to note that between the current runtimes, changes can occur, including the addition or removal of different libraries. Additionally, our platform offers [a library management feature](./library-management.md) that empowers users to install any desired libraries.

## Related content

- [Python notebook runtime and kernel lifecycle in Fabric](./python-notebook-runtime-lifecycle.md)
- [Apache Spark Runtimes in Fabric - Overview, Versioning, and Multiple Runtimes Support](./runtime.md)
- [Runtime 2.0 (Spark 4.1, Java 21, Python 3.13, Delta Lake 4.2)](./runtime-2-0.md)
- [Runtime 1.3 (Spark 3.5, Java 11, Python 3.11, Delta Lake 3.2)](./runtime-1-3.md)
