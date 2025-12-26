---
title: IDEAS journey to a modern data platform with Fabric
description: Learn how IDEAS uses Microsoft Fabric to build a modern data platform, consolidating data sources, enhancing analytics, and driving AI innovation.
author: guyinacube
ms.topic: concept-article
ms.date: 03/31/2025
ms.author: asaxton
ms.custom: fabric-cat
---

# IDEAS journey to a modern data platform with Microsoft Fabric - from petabytes to insights

Microsoft Fabric is an AI-powered SaaS platform for end-to-end enterprise analytics. It efficiently supports various data roles across an organization. To optimize data consistency and accessibility, Microsoft used Fabric to enhance its internal analytics infrastructure during rapid AI advancements. Microsoft established IDEAS (Insights, Data, Engineering, Analytics, Systems) organization to build and maintain a comprehensive data analytics platform. IDEAS aims to unify data sources, eliminate silos, and create a single source of truth, boosting productivity and AI adoption across Microsoft. Initially supporting Office products, IDEAS now powers data-driven insights across Microsoft 365, Security, and over 600 internal teams driving AI adoption and productivity. This article details IDEAS’s journey with adopting Fabric.

A key function of IDEAS is to serve as the central data and growth engine for the Experiences and Devices(E+D) and Security divisions. IDEAS also acts as the central data plane for all Copilot experiences, driving Copilot's success by aggregating key insights, enabling research, and powering AI experiences across Microsoft. It manages 420 PiB (Pebibyte) of data from 2,700 sources, personalizing experiences across more than 350 product surfaces and billions of customer interactions annually.

Because of its scale and role in powering key Microsoft initiatives like Copilot, IDEAS serves as a real-world testing ground for emerging data technologies. IDEAS is a pilot user and strategic 'customer zero' for Microsoft Fabric. It provides valuable feedback and validates the Fabric's capabilities at a various levels. IDEAS provides key insights that shape Fabric's development, while Fabric enables IDEAS to achieve its vision for the future of its AI-driven data platform. Specifically, Fabric offers key benefits in following four key areas:

* **Activating data for AI innovation:** Fabric’s seamless integration with Microsoft tools like Office and Azure AI accelerates the creation of custom AI models and solutions.

* **Streamlining analytics with a unified toolchain:** By providing a unified toolchain for all data roles, Fabric empowers everyone within IDEAS to enhance collaboration, streamline workflows, and maximize the data value.

* **Increasing collaboration and flexibility:** Fabric enables collaboration across different data personas using the same datasets and tools. This flexibility simplifies working with diverse data formats, locations, optimizes engineering processes, and enables teams to work more effectively.

* **Reducing costs and risks:** Fabric’s unified data lake minimizes data movement, reducing engineering costs and compliance risks by allowing multiple compute engines to operate on the same copy of data. By maintaining a single copy of data, teams can efficiently use it for multiple purposes, which support effective data governance and compliance.

This partnership aims to deliver substantial business and productivity value by creating a modern data platform to meet today’s technological demands. This article explains IDEAS’s journey with adopting Fabric.

## Building a scalable data foundation with OneLake and Delta lake

A strong, scalable foundation is key to any modern data platform. At the core of Microsoft Fabric is Delta Lake, an open-source storage layer that ensures reliability, performance, and data management for data lakes. Its broad compatibility with data analytics tools supports a unified data ecosystem.

Delta Lake is the foundation of [OneLake](../onelake/onelake-overview.md), Fabric's unified logical data lake. OneLake optimizes data value by eliminating duplication, and ensuring a single source of truth. All Fabric experiences automatically store or mirror data in OneLake using the Delta Lake format. OneLake integrates seamlessly with existing ADLS Gen2 storage enabling a smooth transition for existing datasets. Shortcuts to ADLS Gen2 avoid large-scale data migrations and enhance manageability through centralized access and governance.  It also supports various analysis tools, including Spark, SQL, and Power BI.

Power BI's Direct Lake mode enhances this unified experience by enabling fast querying and visualization of data directly from OneLake, eliminating data movement and the need for traditional data marts. This direct access to Delta Lake streamlines analytics workflows. Fabric is also fully integrated with Copilot and AI across all surfaces. These features boost productivity through AI-assisted coding and data analysis, supporting data-driven decision-making.

To apply these capabilities within IDEAS, the first step was to ensure the data integration pipelines could seamlessly generate Delta Lake tables. IDEAS uses the following two ISO-certified data engineering systems:

* **[Pharos](https://medium.com/data-science-at-microsoft/leveraging-ai-for-next-level-data-productivity-in-ideas-part-1-1878ae2d0d1e):** A low-code platform for data preparation and staging. It simplifies data transformation by focusing on well-defined data shapes with consistent metadata, and declarative definitions for output generation.

* **[Nitro Hubs](https://medium.com/data-science-at-microsoft/leveraging-ai-for-next-level-data-productivity-in-ideas-part-1-1878ae2d0d1e):** A comprehensive data engineering system for pipeline authoring and management, with strong data privacy and compliance controls.

IDEAS enhanced these services to generate optimized Delta Lake outputs using the Fabric Spark engine, employing techniques like [v-order](../data-engineering/delta-optimization-and-v-order.md), partitioning, and appropriate row group sizes. When storing data, IDEAS focuses on organizing it for fast and efficient retrieval, as the workloads are read-intensive. Integrating this capability with core services that manage thousands of pipelines enabled the quick writing of several thousand data assets to ADLS Gen2 storage.

IDEAS analytics require 13 months of historical data, but due to personal identifiers, we must adhere to General Data Protection Regulation(GDPR). To comply, we extended Nitro Hubs GDPR processing capabilities to handle delete requests in Delta Lake tables, using merge commands in Fabric Spark notebooks. We also implemented Time-To-Live (TTL) expiration for date-partitioned Delta tables, ensuring personal data removal within GDPR timeframes. In contrast, our Gold layer data (using the [medallion architecture](../onelake/onelake-medallion-lakehouse-architecture.md)), is aggregated and free of personal identifiers. We currently store over 4 PiB of data in IDEAS OneLake.

## Powering Microsoft 365 Copilot Analytics with Fabric

IDEAS manages 420 PiB of data across over 600 teams within Microsoft. The data platform is built entirely on Azure to use scalability for a team of over 600 people. By extending Azure’s capabilities, IDEAS has developed a robust and adaptable system. To learn more about the core systems that drive the data lifecycle see [Data productivity in ideas](https://medium.com/data-science-at-microsoft/leveraging-ai-for-next-level-data-productivity-in-ideas-part-1-1878ae2d0d1e)

Efficient data access is essential to IDEAS, and Microsoft Fabric has become a key enabler in our strategy. We wanted to shorten the feedback loop for interactive queries and empower faster report and dashboard creation. Our foundation is the [Unified Data Model (UDM)](https://medium.com/@moving-the-needle/reinventing-data-models-keystone-for-modern-data-platforms-132d8283acbc), a set of durable and extensible data assets designed for company-wide reuse. This reusability is key to maintaining consistency and efficiency.

IDEAS employs the [medallion architecture](../onelake/onelake-medallion-lakehouse-architecture.md) to organize data across three layers: Bronze (raw data), Silver (cleaned and enriched data for analysis), and Gold (curated, aggregated data for business intelligence and reporting with tools like Power BI and Excel).

:::image type="content" source="./media/ideas-data-platform-integration/ideas-medallion-architecture.png" alt-text="Screenshot showing the medallion architecture of IDEAS and the size of data in each layer." lightbox="./media/ideas-data-platform-integration/ideas-medallion-architecture.png":::

By making our gold and silver layers available as UDM assets in Fabric through Delta Lake, we enhanced the Microsoft 365 Copilot analytics plane. We provided direct access to preprocessed Silver layer Microsoft 365 Copilot data as Delta Lake tables in OneLake. It dramatically improved query performance and dashboard rendering by eliminating repeated transformations.

Furthermore, exposing our Gold layer Microsoft 365 Copilot metrics as Delta Lake tables simplified data discovery and usability. It enabled the creation of rich dashboards that support business leaders and product teams with Copilot’s adoption, performance, and growth. This approach reduced data movement, streamlined the data graph, and cut infrastructure costs. As a result, Microsoft 365 Copilot analytics, now powered by Fabric, plays a vital role in several Microsoft projects.

:::image type="content" source="./media/ideas-data-platform-integration/ideas-intelligence-platform-architecture.png" alt-text="Screenshot showing the Ideas intelligence platform architecture." lightbox="./media/ideas-data-platform-integration/ideas-intelligence-platform-architecture.png":::

## Scaling governance and automation in Fabric

Our next priorities were organizing workspaces, optimizing lakehouse structure, and automating operations across thousands of assets managed in Fabric. At our scale, governance demands strict adherence to policies that grant access only for legitimate data use scenarios, making manual operations infeasible. To address this, we have partnered closely with the Fabric SDK/API teams to ensure the availability of APIs that enable us to programmatically create Fabric artifacts and apply granular permissions to the appropriate identities. This fully automated approach provides consistency and scalability.

We organized our workspaces into production, development, and exploration environments. Production data is accessible through shortcuts within the production workspace. Only a dedicated workspace identity has privileged access to create and modify them, while all other users have read-only access. Lakehouses reside within the production workspace with broad read access and are referred by internal shortcuts from within exploration workspaces. This approach effectively isolates production data while allowing users to interact with it in a nonproduction setting.

Next sections will delve into our semantic workspaces that are dedicated to host only semantic models and reports. The lakehouses behind the semantic model is in production workspace to control versioning and change management. As Fabric's unified security features evolve, we continue refining our lakehouse access configuration to further streamline our access governance processes. This automated, API-driven approach is essential for data management at scale and for consistent, secure access.

## Simplifying reporting with Direct Lake

One of the primary drivers for IDEAS's early adoption of Fabric is the [Direct Lake semantic model](direct-lake-overview.md). This feature enables unified reporting, eliminating the need to manage separate SQL and SSAS infrastructure and allowing users to work in an integrated Fabric interface.

IDEAS utilizes semantic models for a various use cases, which include:

* Single-table reports
* Azure Analysis Services cubes
* Import mode star schemas with multiple dimensions
* Cohort analytics for the Microsoft 365 Copilot analytics plane

Our validation of the Direct Lake approach involved migrating existing reports and models to Fabric, yielding several key findings, which include:

* The importance of effective data modeling. For models containing billions of rows, a robust star schema with numeric keys is crucial to achieve optimal query performance.

* Optimizing data with V-Order during creation using Fabric Spark is critical for maximizing Direct Lake performance.

* Proper Delta table partitioning and row group sizing is vital for optimizing both cold and warm cache query performance.

This effort led to the full migration of the Microsoft 365 Copilot analytics plane to Fabric in December 2024. This plane now delivers key business insights for Microsoft 365 Copilot across Microsoft.

## Managing the Fabric development lifecycle for compliance and reliability

IDEAS ensures compliance and reliability through strict change management, production isolation, and validation. To meet these requirements within Fabric, we implemented a robust development lifecycle using Git integration and a well-defined workspace organization. This approach ensures that changes are thoroughly tested and validated before reaching production, minimizing disruptions, and preserving data integrity.

We have created dedicated "semantic workspaces" for semantic models and reporting artifacts, ensuring clear separation of concerns. As previously mentioned, lakehouse artifacts reside in a secure, read-only, production workspace, with semantic workspaces referring to these centralized data assets. This architecture supports both compliance and performance.

Our semantic model lifecycle involves individuals making changes within a workspace dedicated to this category of development. Following validation, Fabric's Git integration commits these changes to the appropriate preproduction branch. Through Azure DevOps (ADO) release pipelines, these changes are then promoted to the production Git branch and later synchronized to the production semantic workspaces This ensures that the production semantic workspaces (where end-user-facing models and reports reside) always reflects validated and approved changes. This way it contributes to the stability and reliability of our services.

:::image type="content" source="./media/ideas-data-platform-integration/ideas-continuous-integration-lifecycle.png" alt-text="Screenshot showing the IDEAS semantic model's CICD cycle." lightbox="./media/ideas-data-platform-integration/ideas-continuous-integration-lifecycle.png":::

To further enhance the reliability of our Fabric deployment, we developed a user experience and performance dashboard using workspace telemetry. The Fabric workspace analytics logs provide data on query execution times and errors in semantic models and Power BI reports. Our dashboard, built on Fabric event houses, tracks key query performance metrics and monitors error categories and rates for each query.

In addition to identifying and addressing potential issues, we monitor the impact of issues and the number of affected users. This dual approach allows us to proactively address issues before they spread and to understand and trend the reliability of our reports and semantic models through user feedback. By monitoring the frequency and breadth of user-reported issues, we can directly correlate our reliability targets with real-world usage and reduce user impact over time.

As the Fabric product group improves telemetry and log data, we'll incorporate richer KPIs and metrics into our dashboard. These enhancements improve our ability to proactively detect issues, ensuring optimal performance and reliability. In the next phase, we plan to extend this monitoring process to other Fabric items, including Lakehouse SQL endpoints and Spark notebooks.

## Enabling interactive analytics with Fabric

Data users often start with Power BI reports but quickly need deeper exploration beyond the reporting layer. Fabric offers two powerful options for interactive analysis: Fabric Spark and the SQL analytics endpoint, enabling users to explore data in the Silver and Gold layers of the Unified Data Model (UDM). The OneLake Data Hub, Lakehouse Explorer, and Lineage View provide quick access to data dependencies and upstream sources. However, as data complexity and size increase from Gold to Bronze, querying becomes more challenging.

To build a scalable data platform and prevent fragmentation, IDEAS implemented a federation strategy for key UDM Silver layer assets, serving as authoritative sources of truth. This allowed partner teams to extend these assets with domain-specific attributes. A robust governance process that encompasses review, extension design refinement, data interface definition, and exposure control, ensures data integrity and compliance.

While extensions address data bottlenecks and separate core data from external attributes, they introduced a performance challenge for interactive querying, which typically requires sub-60-second response times. The reliance on repetitive joins between base data and extensions created a bottleneck. To overcome this challenge, we enhanced our data engineering systems to materialize views, prejoining base data with extensions to minimize query-time join operations. Delta Lake's merge and locking capabilities enabled efficient partition updates and merging of extension data per entity. These precomputed Delta tables are now exposed as shortcuts within our lakehouses for both Fabric SQL and Spark access. We're also collaborating with the Fabric product group to explore potential native integration of this functionality. Furthermore, we developed Python modules with multi-parameter input to optimize row filtering and column selection, providing quick access to column descriptions and data freshness within the notebook environment.

Initial testing with Fabric Spark queries on these materialized assets has shown significant performance gains of over 30X.

## Securing Our Fabric Environment: A Holistic Approach to Data Governance

Over the past year, we’ve progressed from an exploratory Fabric workspace to managing multiple F2048 production workspaces with over 4 PiB of data in Delta Lake format. However, data discovery and compliance remain complex challenges, especially as privacy regulations evolve.  As IDEAS makes more data available in Fabric, our compliance obligations extend beyond GDPR and Microsoft's commitment to data residency within the EU Data Boundary, ensuring commercial personal data is stored and processed exclusively in Europe.

Microsoft’s global scale and handling of sensitive data drive IDEAS' strong commitment to data privacy and governance. This extends beyond baseline requirements, adhering to various international and industry-specific standards. It translates into robust controls and processes for managing data access.

At IDEAS, we strongly adhere to the principle of least privilege and scenario-based data use for security and compliance. This principle means granting data access only to users or identities with legitimate approval for specific use cases. To prevent unauthorized data transfers, IDEAS actively monitors for data exfiltration within Fabric workspaces. While Fabric provides tenant-level monitoring, Microsoft requires more granular control at the workspace level.

To address this, IDEAS developed Data Exfiltration Monitoring (DEM), a custom capability that collects Fabric telemetry data into a centralized metadata store and applies rules to detect violations. When a violation is detected, DEM triggers corrective actions, such as notifying the user, revoking access, or blocking future access. This allows IDEAS to make sensitive data available within Fabric while maintaining strict compliance. Combined with our investments in automating workspace provisioning, we can manage compliant workspaces across expanding data boundaries. Data exfiltration protection is a key area of focus for the Fabric product group, and we look forward to further enhancements in this space.

Ultimately, we believe that data privacy and governance aren't merely a compliance burden but a fundamental component of building trust and a significant competitive advantage in today's data-driven world. Microsoft prioritizes trust, emphasizing data privacy, user control, and responsible data handling across all services and products. IDEAS fully subscribes to this ethos, recognizing that robust data governance is fundamental to the success and sustainability of our data platform.

## Conclusion

Integrating Microsoft Fabric into the IDEAS data platform has enhanced data access and boosted productivity for our data scientists and engineers. By building a unified foundation with OneLake and Delta Lake, enabling interactive analytics, and establishing strong governance, Fabric has provided a robust data analytics environment. As we continue to explore and implement Fabric's capabilities, particularly in areas like real-time analytics and advanced AI integration, we're confident that we’re building a unified and innovative platform that will drive greater insights and impact for Microsoft.