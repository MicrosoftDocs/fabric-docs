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
components for each Spark version, including Java, Scala, and Delta Lake versions, among others. It is after this
thorough assessment that we craft a detailed timeline, which thoughtfully delineates the availability and progression of the runtime through its various stages.

Overall, we aim to delineate a standard lifecycle path for the Microsoft Fabric runtimes for Apache Spark.

> [!TIP]
> Always use the most recent, GA runtime version for your production workload, which currently is [Runtime 1.2](./runtime-1-2.md).

:::image type="content" source="media\runtime\lifecycle_runtimes.png" alt-text="Lifecycle for Apache Spark Runtimes in
Fabric as diagram" lightbox="media\runtime\lifecycle_runtimes.png":::

The process outlined in the flow chart above follows the lifecycle of a runtime version from its experimental public
preview stage to its deprecation and removal. Here's a step-by-step explanation:

| Stage                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Typical Lifecycle             |
|---------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| Experimental Preview                                    | This is the initial phase where the runtime version is first introduced with documented limitations. Feedback from customers is essential in this stage to determine any adjustments or improvements needed and to assess if that version should be developed, improved and moved to the Preview stage.                                                                                                                                                                                                                                                                                                                                                                     | 2-3 months                    |
| Preview                                                 | After incorporating the initial feedback and key improvements, the runtime enters the Preview stage. It remains here until it meets certain criteria based on further customer feedback.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | 3 months                      |
| General Availability (GA)                               | Once the GA criteria are met, the runtime version is released to the public as a Generally Available feature. The decision to move to GA is influenced by customer feedback, the performance, platform integration and reliability assessments, and the needs that the runtime version fulfills.                                                                                                                                                                                                                                                                                                                                                                            | 24 months                     |
| Long Term Support (LTS)                                 | At some point after the GA release, based on the requirements of the specific Spark version which in OSS is named as LTS, the runtime may move into the Long-Term Support stage. This stage comes with an announcement of the duration of support that customers can expect. In general, it is one more year of full support.                                                                                                                                                                                                                                                                                                                                               | 12 months                     |
| End of Support Date Announced                           | An end-of-support date is announced, indicating when the runtime will no longer receive updates or support. In general, the announcement is made six months before deprecation. The announcement is made through documentation by updating the specific table with the end-of-life date, which signifies the end of support.                                                                                                                                                                                                                                                                                                                                                | 6 months before deprecation   |
| End of Support Date. Runtime Unsupported and Deprecated | When the announced end-of-support date is reached, the runtime officially becomes unsupported. This means it will no longer receive any updates, bug fixes, or official support from the team. All support tickets will be auto-resolved, and using an unsupported runtime is at the customer's own risk. The runtime is removed from Fabric Workspace Settings and Environment Item, so there is no way to use it from the workspace level. The runtime is also removed from the environments and there is no option to create a new environment for that supported runtime version. Existing Spark Jobs running on the existing environments will not be able to execute. | N/A                           |
| Runtime Removed                                         | Following the unsupported phase, the existing environments based on the unsupported runtime are removed. All the backend related items are also removed.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | a few days after the End of Support date |

## Versioning

Our runtime version numbering, while closely related to Semantic Versioning, follows a slightly different approach. The
runtime major version corresponds to the Apache Spark major version. Therefore, Runtime 1 corresponds to Spark version 3. Similarly, the upcoming Runtime 2 will align with Spark 4.0. It's essential to note that between the current runtimes, Runtime 1.1 and Runtime 1.2, changes may occur, including the addition or removal of different libraries. Additionally, our platform offers [a library management feature](./library-management.md) that empowers users to install any desired libraries.

## Related content

- Read
  about [Apache Spark Runtimes in Fabric - Overview, Versioning, Multiple Runtimes Support and Upgrading Delta Lake Protocol](./runtime.md)
- [Runtime 1.3 (Spark 3.5, Java 11, Python 3.11, Delta Lake 3.1)](./runtime-1-3.md)
- [Runtime 1.2 (Spark 3.4, Java 11, Python 3.10, Delta Lake 2.4)](./runtime-1-2.md)
- [Runtime 1.1 (Spark 3.3, Java 8, Python 3.10, Delta Lake 2.2)](./runtime-1-1.md)
