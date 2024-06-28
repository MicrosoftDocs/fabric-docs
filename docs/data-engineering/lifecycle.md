---
title: Apache Spark runtime in Fabric lifecycle and supportability
description: Lifecycle and support policies for Apache Spark runtime in Fabric
ms.reviewer: snehagunda
ms.author: eskot
author: ekote
ms.topic: overview
---

# Lifecycle and supportability for Apache Spark Runtimes in Fabric

The Microsoft Fabric Runtime is an Azure-integrated platform based on Apache Spark, designed to facilitate the execution and management of data engineering and data science workflows. It synthesizes essential elements from both proprietary internal and open-source resources to offer a comprehensive solution to customers. For brevity, we refer to the Microsoft Fabric Runtime powered by Apache Spark simply as Fabric Runtime.

## Release cadence

Apache Spark typically issues minor versions every 6 to 9 months. **The Microsoft Fabric Spark team is committed to
delivering new runtime versions with alacrity while ensuring the highest quality and integration as well as continuous
support.** Each runtime version is a complex ensemble of approximately 110 distinct components. Recognizing the runtime's expansion beyond Apache Spark, our team is dedicated to ensuring seamless integrations within the Azure ecosystem.

With this commitment to excellence, we approach the release of new preview runtime versions with careful consideration,
establishing timelines on a case-by-case basis. This meticulous process involves a comprehensive evaluation of critical
components for each Spark version, including Java, Scala, Python, R, and Delta Lake versions, among others. It's after this thorough assessment that we craft a detailed timeline, which thoughtfully delineates the availability and progression of the runtime through its various stages.

Overall, we aim to delineate a standard lifecycle path for the Microsoft Fabric runtimes for Apache Spark.

> [!TIP]
> Always use the most recent, GA runtime version for your production workload, which currently is [Runtime 1.2](./runtime-1-2.md).

:::image type="content" source="media\runtime\lifecycle_runtimes.png" alt-text="Lifecycle for Apache Spark Runtimes in
Fabric as diagram" lightbox="media\runtime\lifecycle_runtimes.png":::

The process outlined in the diagram follows the lifecycle of a runtime version from its experimental public
preview stage to its deprecation and removal. 

| Stage                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Typical Lifecycle                        |
|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| Experimental Public Preview                             | The Experimental Public Preview phase marks the initial release of a new runtime version. During this phase, users are urged to experiment with the latest versions of Apache Spark and Delta Lake and provide feedback, despite the presence of documented limitations.                                                                                                                                                                                                                                                                                                                                                                                                 | 2-3 months                               |
| Public Preview                                          | After further improvements are made and limitations are minimalized, the runtime progresses to the Preview stage.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | 3 months                                 |
| General Availability (GA)                               | Once a runtime version meets the General Availability (GA) criteria, it's released to the public and is suitable for production workloads. To reach this stage, the runtime must meet strict requirements in terms of performance, integration with the platform, reliability assessments, and its ability to meet users' needs.                                                                                                                                                                                                                                                                                                                                          | 24 months                                |
| Long Term Support (LTS)                                 | Following the General Availability (GA) release, a runtime may transition into the Long-Term Support (LTS) stage, depending on the specific requirements of the Spark version. This LTS stage may be announced, detailing the expected support duration for customers, which is generally an additional year of full support.                                                                                                                                                                                                                                                                                                                                     | 12 months                                |
| End of Support Date Announced                           | When a runtime reaches its end of support, it will not receive any further updates or support. Typically, a six-month notice is given before the deprecation of the runtime. This end-of-support date is documented by updating a specific table with the end-of-life date, which marks the discontinuation of support.                                                                                                                                                                                                                                                                                                                                               | 6 months before deprecation day          |
| End of Support Date. Runtime Unsupported and Deprecated | Once the previously announced end-of-support date arrives, the runtime becomes officially unsupported. This implies that it will not receive any updates or bug fixes, and no official support will be provided by the team. All support tickets will be automatically resolved. Using an unsupported runtime is at the user's own risk. The runtime will be removed from Fabric Workspace Settings and Environment Item, making it impossible to use at the workspace level. Furthermore, the runtime will also be removed from the environments, and there will be no option to create a new environment for that supported runtime version. Existing Spark Jobs running on the existing environments will be unable to execute. | N/A                                      |
| Runtime Removed                                         | Once the runtime reaches the unsupported phase, all environments using this runtime are eliminated. All backend-related components associated with this runtime are also removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | a few days after the End of Support date |

## Versioning

Our runtime version numbering, while closely related to Semantic Versioning, follows a slightly different approach. The
runtime major version corresponds to the Apache Spark major version. Therefore, Runtime 1 corresponds to Spark version 3. Similarly, the upcoming Runtime 2 will align with Spark 4.0. It's essential to note that between the current runtimes, Runtime 1.1 and Runtime 1.2, changes may occur, including the addition or removal of different libraries. Additionally, our platform offers [a library management feature](./library-management.md) that empowers users to install any desired libraries.

## Related content

- Read
  about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
- [Runtime 1.3 (Spark 3.5, Java 11, Python 3.11, Delta Lake 3.1)](./runtime-1-3.md)
- [Runtime 1.2 (Spark 3.4, Java 11, Python 3.10, Delta Lake 2.4)](./runtime-1-2.md)
- [Runtime 1.1 (Spark 3.3, Java 8, Python 3.10, Delta Lake 2.2)](./runtime-1-1.md)
