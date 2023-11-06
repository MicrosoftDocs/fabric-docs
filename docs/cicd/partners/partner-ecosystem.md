---
title: Microsoft Fabric ISV Partner Ecosystem
description:  Fabric ISV Partner Ecosystem enables ISVs to use a streamlined solution that’s easy to connect, onboard, and operate. 
ms.reviewer: richin
ms.author: monaberdugo
author: mberdugo
ms.topic: overview
ms.custom: 
ms.search.form: 
ms.date: 10/30/2023
---

# Microsoft Fabric ISV Partner Ecosystem

Microsoft Fabric is an end-to-end analytics solution that includes data movement, data lake, data engineering, data integration, data science, real-time analytics, and business intelligence—all backed by a shared platform providing data security, governance, and compliance. Customers no longer need to stitch together individual analytics services from multiple vendors. Instead, they can use a streamlined solution that’s easy to connect, onboard, and operate.

Within our Partner Ecosystem Launch, we have designed three distinct pathways for ISVs to seamlessly integrate with Fabric.  

* With the Interop tier, the primary focus is on enabling ISVs to integrate their solutions with the OneLake Foundation. With this model ISVs establish fundamental connections and interoperability with Fabric.  

* With Develop on Fabric tier, ISVs can build their products and services on top of Fabric or seamlessly embed Fabric's functionalities within their existing applications. It's a transition from basic integration to actively leveraging the capabilities Fabric offers.  

* Finally, we have the Build a Fabric Workload tier, this is the most advanced and engaging tier, designed to equip ISVs with the tools and platform capabilities required to craft customized workloads and experiences on Fabric. It enables ISVs to tailor their offerings to deliver their value proposition while leveraging Fabric ecosystem by combining the best of both the worlds.

:::image type="content" source="{source}" alt-text="{alt-text}":::

## Interop with Fabric

Interop in Microsoft Fabric provides integration with OneLake through REST APIs, ensuring tailored data transfers between your applications and OneLake. It manages both structured and unstructured data, utilizing tools like Power Query and Data Factory for seamless transformations.

:::image type="content" source="{source}" alt-text="{alt-text}":::

Here are a few ways to get you started with this model: 

### Direct Interaction with OneLake using ADLS Gen2 APIs and Delta-Parquet Format

1. OneLake supports ADLS Gen2 APIs for direct interaction, allowing developers to read from and write to OneLake using these APIs. The API supports CRUD file operations in OneLake's Data Lake Storage Gen2 account​. How do I connect to OneLake? - Microsoft Fabric | Microsoft Learn.
1. Writing Data in Delta-Parquet Format and Optimization with V-Order are the next steps in the pipeline.  Delta Lake table optimization and V-Order - Microsoft Fabric | Microsoft Learn

### Database Endpoints, Utilization of Tools & Connectivity Options

In Fabric, a Lakehouse SQL Endpoint or Warehouse is accessible through a Tabular Data Stream (TDS) endpoint.  

1. Familiarize yourself with the various database endpoints available in Fabric and utilize tools like the T-SQL TDS endpoint to query and update your data within Fabric. Connectivity to data warehousing - Microsoft Fabric | Microsoft Learn.
1. Authentication in Fabric - Two types of authenticated users are supported through the SQL connection string: Azure Active Directory (Azure AD) user principals (or user identities) and Azure Active Directory (Azure AD) service principals. Connectivity to data warehousing - Microsoft Fabric | Microsoft Learn.
1. Utilization of tools & Connectivity Options – We can use different tools to interact with Fabric, such as Azure Data Studio, SSMS, Visual Query Editor and T-SQL language. Query the SQL Endpoint or Warehouse - Microsoft Fabric | Microsoft Learn.
1. Other Connectivity Options – Similarly, several connectivity options can be leveraged to connect to warehouse or SQL endpoint, such as OLEDB, ODBC and JDBC. Connectivity to data warehousing - Microsoft Fabric | Microsoft Learn.

### Connector Ecosystem, Mirroring & Shortcuts

1. Rich Connector Ecosystem: Microsoft Fabric's Data Factory boasts an extensive set of connectors, enabling ISVs to effortlessly connect to a myriad of data stores. Whether you're interfacing traditional databases or modern cloud-based solutions, our connectors ensure a smooth integration process. Connector overview - Microsoft Fabric | Microsoft Learn.
1. Advanced Dataflow Capabilities: With our supported Dataflow Gen2 connectors, ISVs can harness the power of Data Factory to manage complex data workflows. This feature is especially beneficial for ISVs looking to streamline data processing and transformation tasks. Dataflow Gen2 connectors in Microsoft Fabric - Microsoft Fabric | Microsoft Learn.
1. Real-Time Data Sharing: Stay ahead of the curve with our real-time data sharing feature. ISVs can create database shortcuts, providing an embedded reference within a Kusto Query Language (KQL) database to a source database in Azure Data Explorer. This ensures that your data is always up-to-date and accessible when you need it. Real-Time Data Sharing in Microsoft Fabric  | Microsoft Fabric Blog | Microsoft Fabric.
1. OneLake Shortcuts: Microsoft Fabric's OneLake presents ISVs with a transformative data access solution, seamlessly bridging integration across diverse domains and cloud platforms. Through OneLake shortcuts, ISVs can achieve real-time data integration, minimizing latency and eliminating data redundancy. These dynamic pointers, compatible with storage solutions like ADLS Gen2 and Amazon S3, ensure adaptability. Coupled with transparent querying, robust security measures, and a commitment to continuous advancements, OneLake stands as the pinnacle choice for ISVs aiming for efficient and forward-looking data operations. OneLake shortcuts - Microsoft Fabric | Microsoft Learn. One logical copy - Microsoft Fabric | Microsoft Learn.
1. Mirroring External Databases - You’ve seen the shortcuts, now you’re wondering about integration capabilities with external databases like Snowflake, Cosmos DB, MongoDB and Azure SQL DB.

    1. Mirror your Databases into OneLake: Think of this as a bridge to OneLake. Once connected, it's like having your data right within OneLake. Through efficient Change Data Capture (CDC) from the source, we ensure a hassle-free replication into OneLake, keeping operational costs at an all-time low.
    1. Fabric-Powering Leading Databases: Unlock the true potential of your SQL DB, Cosmos, MySQL, and PostgreSQL databases. By integrating them with Fabric, you bring your data to OneLake almost instantly. Our mission is to facilitate seamless connections between diverse databases to Fabric, enhancing their innate capabilities without any disruptions.

## Develop with Fabric

The Develop pathway in Microsoft Fabric empowers ISVs with advanced environment management options using Microsoft Fabric’s REST APIs. Microsoft Fabric’s REST APIs provides service endpoints for embedding, administration, governance, and user resources. With the capability to perform CRUD operations on pivotal items like Lakehouses and Data Pipelines, ISVs can develop IP such as custom SDKs and open new opportunities for monetization. This, combined with the unified data format of Delta Parquet and Fabric Spark, positions the Develop pathway as a holistic solution for advanced data workflows in Microsoft Fabric.

:::image type="content" source="{source}" alt-text="{alt-text}":::

Here are a few ways to get you started with this model:

* Power BI embedded offers the capability of embedding Power BI items such as reports, dashboards and tiles, in a web application or a website. Power BI embedded capabilities are offered with Fabric capacities as well, when other Fabric workloads will follow suit. Power BI Embedded with Microsoft Fabric | Microsoft Power BI Blog | Microsoft Power BI 

* Microsoft Fabric REST APIs is an evolving set of endpoints for embedding, administration, governance and user resources. The well-documented Fabric REST API will include authentication, authorization, version control, policy enforcement, and error handling. Additionally, developers can use existing protocol-specific APIs like XMLA and TDS. Some use cases that will be addressed include Workspace and capacity management, CRUD operations on items, and permission management.  

* Fabric workloads will offer parity with the equivalent Azure services in most cases with guidance on migration of individual services.  

  * For ISVs transitioning to Fabric workloads, it's noteworthy that our SQL Fabric workload, with its TDS and T-SQL interface compatibility, aligns well with Azure Synapse DW's capabilities. This alignment positions Fabric as a robust platform for data warehousing and analytical tasks, offering similar functionalities to Synapse DW. While distinct from Azure SQL DB's operational workload scope, Fabric provides a specialized, efficient solution for ISVs focusing on large-scale data handling and analytics. 

* There are three significant enhancements available for ISVs using Fabric over the equivalent Azure Services:  

  * The capacity model of Fabric allows the usage of the entire range of Fabric workloads through a single meter and with great efficiency.  

  * The integral workspace organization of Fabric makes building a multi-tenant solution a breeze. Together with the capacities model, Fabric makes it very economical to maintain a separate database for each tenant.  

  * The up-and-coming management capabilities of Fabric make maintaining many databases, one-per-tenant, very simple.  

## Build a Fabric Workload

:::image type="content" source="{source}" alt-text="{alt-text}":::

ISVs can utilize Fabric’s tools and platform capabilities to develop tailored workloads and experiences. By leveraging Fabric’s extensibility features ISVs can design workloads that align with their specific business objectives and customer requirements. Our UI and backend SDKs facilitate this process, offering integration options like One Security for enhanced protection, tools to manage Fabric capacities and the ability to tap into our simplified business model. Our business model allows partners to develop data applications which can be provisioned easily from Fabric marketplace. Once provisioned, these applications operate as native workload in Fabric, ensuring a seamless user experience to end customer. 

Here are a few ways to get you started with this model:

* ISVs can kickstart their custom workload development by utilizing Fabric’s Extensibility APIs. This will grant ISVs access to Fabric's internals, enabling them to tailor its capabilities to their specific needs.  

* ISVs will use Fabric UI SDK to build user interfaces for their workloads. SDK documentation provides resources and guidelines to seamlessly integrate the UI with Fabric's ecosystem.  

* ISVs can manage Fabric's resources using the backend SDK, designed for .NET developers. This SDK serves as a control center, allowing ISVs to oversee and optimize all workload components within the Fabric framework.   

* We have created a sample application that walks through this integration e2e leveraging both the UI and Backend SDK, this app provides a good template to kickstart this integration. 

* In addition to the above resources, we have documented guidelines around the fundamentals that a partner should adhere to while developing their workload within Fabric. The list of fundamentals includes BCDR, TLS, UX, Security Requirements, integration with other Fabric items like sensitivity labels etc.  

* It is always beneficial to learn from thought process of others who went on similar journey hence we created the following documentation that showcases how some of the native Azure services built their own workload within Fabric.
