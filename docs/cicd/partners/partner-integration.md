---
title: Microsoft Fabric ISV Partner integration with Fabric
description:  Fabric ISV Partner Ecosystem enables ISVs to use a streamlined solution that's easy to connect, onboard, and operate.
ms.reviewer: richin
ms.author: monaberdugo
author: mberdugo
ms.topic: overview
ms.custom: 
ms.search.form: 
ms.date: 05/05/2024
---

# Microsoft Fabric Integration Pathways for ISVs

[Microsoft Fabric](https://www.microsoft.com/microsoft-fabric/blog/) offers three distinct pathways for ISVs to seamlessly integrate with Fabric. For an ISV starting on this journey, we want to walk through various resources we have available under each of these pathways.

:::image type="content" source="media/partner-integration/integrate-fabric.png" alt-text="Figure showing the three pathways to integrate with Fabric: Interop, Develop Apps, and Build a Fabric workload.":::

## Interop with Fabric

The primary focus with Interop model is on enabling ISVs to integrate their solutions with the [OneLake Foundation](../../get-started/microsoft-fabric-overview.md). To Interop with Microsoft Fabric, we provide integration using REST APIs for OneLake, a multitude of connectors in Data Factory, shortcuts in OneLake, and database mirroring.

:::image type="content" source="media/partner-integration/onelake-interop.png" alt-text="Figure showing four ways to interop with OneLake: APIs, Fabric Data Factory, Multicloud shortcuts, and database mirroring.":::

Here are a few ways to get you started with this model:

### OneLake APIs

- OneLake supports existing Azure Data Lake Storage (ADLS) Gen2 APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in OneLake. Learn more about [ADLS Gen2 REST APIs](/rest/api/storageservices) and [how to connect to OneLake](../../onelake/onelake-access-api.md).
- Since not all functionality in ADLS Gen2 maps directly to OneLake, OneLake also enforces a set folder structure to support Fabric workspaces and items. For a full list of different behaviors between OneLake and ADLS Gen2 when calling these APIs, see [OneLake API parity](../../onelake/onelake-api-parity.md).
- If you're using Databricks and want to connect to Microsoft Fabric, Databricks works with ADLS Gen2 APIs. [Integrate OneLake with Azure Databricks](../../onelake/onelake-azure-databricks.md).
- To take full advantage of what the Delta Lake storage format can do for you, review and understand the format, table optimization, and V-Order. [Delta Lake table optimization and V-Order](../../data-engineering/delta-optimization-and-v-order.md).
- Once the data is in OneLake, explore locally using [OneLake File Explorer](../../onelake/onelake-file-explorer.md). OneLake file explorer seamlessly integrates OneLake with Windows File Explorer. This application automatically syncs all OneLake items that you have access to in Windows File Explorer. You can also use any other tool compatible with ADLS Gen2 like [Azure Storage Explorer](https://azure.microsoft.com/products/storage/storage-explorer).

:::image type="content" source="media/partner-integration/onelake-apis.png" alt-text="Diagram showing how OneLake APIs interact with Fabric workloads.":::

### Real-Time Intelligence APIs

- Event house and KQL Databases support existing Azure Data Explorer APIs and SDKs for direct interaction, allowing developers to read, write, and manage their data in Event houses. Learn more about [Azure Data Explorer REST API](/azure/data-explorer/kusto/api/rest/index?context=/fabric/context/context-rti&pivots=fabric).
- If you're using Databricks or Jupyter Notebooks you can utilize the Kusto Python Client Library to work with Kusto in Fabric. Learn more about [Kusto Pyton SDK](/azure/data-explorer/kusto/api/python/kusto-python-client-library?context=/fabric/context/context-rti&pivots=fabric).
- You can utilize the existing [Microsoft Logic Apps](/azure/data-explorer/kusto/tools/logicapps), [Azure Data Factory](/azure/data-explorer/data-factory-integration), or [Microsoft Power Automate](/azure/data-explorer/flow) connectors to interact with your Event houses or KQL Databases.

### Data Factory in Fabric

- Data Pipelines boast an **extensive set of connectors**, enabling ISVs to effortlessly connect to a myriad of data stores. Whether you're interfacing traditional databases or modern cloud-based solutions, our connectors ensure a smooth integration process. [Connector overview](../../data-factory/connector-overview.md).
- With our supported Dataflow Gen2 connectors, ISVs can harness the power of Fabric Data Factory to manage complex data workflows. This feature is especially beneficial for ISVs looking to streamline data processing and transformation tasks. [Dataflow Gen2 connectors in Microsoft Fabric](../../data-factory/dataflow-support.md).
- For a full list of capabilities supported by Data Factory in Fabric checkout this [Data Factory in Fabric Blog](https://blog.fabric.microsoft.com/blog/introducing-data-factory-in-microsoft-fabric?ft=All).

:::image type="content" source="media/partner-integration/fabric-data-factory.png" alt-text="Screenshot of the Fabric Data Factory interface.":::

### Multicloud Shortcuts

Shortcuts in Microsoft OneLake allow you to unify your data across domains, clouds, and accounts by creating a single virtual data lake for your entire enterprise. All Fabric experiences and analytical engines can directly point to your existing data sources such as OneLake in different tenant, [Azure Data Lake Storage (ADLS) Gen2](../../onelake/create-adls-shortcut.md), [Amazon S3 storage accounts](../../onelake/create-s3-shortcut.md), and [Dataverse](/power-apps/maker/data-platform/azure-synapse-link-view-in-fabric) through a unified namespace. OneLake presents ISVs with a transformative data access solution, seamlessly bridging integration across diverse domains and cloud platforms.

- [Learn more about OneLake shortcuts](../../onelake/onelake-shortcuts.md)
- [Learn more about OneLake, one copy](../../real-time-intelligence/one-logical-copy.md)

:::image type="content" source="media/partner-integration/multicloud-shortcuts.png" alt-text="Diagram showing multicloud shortcuts in OneLake.":::

### Database Mirroring

You've seen the shortcuts, now you're wondering about integration capabilities with external databases and warehouses. Mirroring provides a modern way of accessing and ingesting data continuously and seamlessly from any database or data warehouse into the Data warehousing experience in Microsoft Fabric. Mirror is all in near real-time thus giving users immediate access to changes in the source. You can learn more about mirroring and the supported databases at [Introducing Mirroring in Microsoft Fabric](https://blog.fabric.microsoft.com/blog/introducing-mirroring-in-microsoft-fabric/).

:::image type="content" source="media/partner-integration/database-mirroring.png" alt-text="Diagram of database mirroring.":::

## Develop on Fabric

:::image type="content" source="media/partner-integration/develop-on-fabric.png" alt-text="Diagram showing how to build apps on Fabric.":::

With the **Develop on Fabric model** ISVs can build their products and services on top of Fabric or seamlessly embed Fabric's functionalities within their existing applications. It's a transition from basic integration to actively applying the capabilities Fabric offers. The main integration surface area is via REST APIs for various Fabric workloads. Here's a list of REST APIs available today.

### Workspace

| API | Description |
|--|--|
| [CRUD APIs for Workspace and Workspace Role Management](/rest/api/fabric/core/workspaces) | Create Workspace, Get Workspace details, Delete Workspace, Assign workspace to a capacity, Add a workspace role assignment. |

### OneLake

| API | Description |
|--|--|
| [Create Shortcut](/rest/api/fabric/) | Creates a new shortcut. |
| [Delete Shortcut](/rest/api/fabric/) | Deletes the shortcut but doesn't delete destination storage folder. |
| [Get Shortcut](/rest/api/fabric/) | Returns shortcut Properties. |
| [ADLS Gen2 APIs](/rest/api/storageservices/data-lake-storage-gen2) | ADLS Gen2 APIs to create and manage file systems, directories, and path. |

### Real-Time Intelligence

| Item | API | Description |
|--|--|--|
| Event House | [Create Event house](/rest/api/fabric/core/items/create-item?tabs=HTTP) | Creates an event house. |
|  | Delete Event house | Deletes an existing event house. |
|  | Get Event house | Get metadata about an event house. |
|  | List Event house | List event houses in your workspace. |
|  | Update Event house | Update an existing event house. |
| KQL Database | [Create KQL Database](/rest/api/fabric/core/items/create-item?tabs=HTTP) | Creates a KQL database. |
|  | [Delete KQL Database](/rest/api/fabric/kqldatabase/items/delete-kql-database?tabs=HTTP) | Deletes an existing KQL database. |
|  | [Get KQL Database](/rest/api/fabric/kqldatabase/items/get-kql-database?tabs=HTTP) | Get metadata about a KQL database. |
|  | [List KQL Database](/rest/api/fabric/kqldatabase/items/list-kql-databases?tabs=HTTP) | List KQL databases in your workspace. |
|  | [Update KQL Database](/rest/api/fabric/kqldatabase/items/update-kql-database?tabs=HTTP) | Update an existing KQL database. |
| KQL Queryset | [Create KQL Queryset](/rest/api/fabric/core/items/create-item?tabs=HTTP) | Creates a KQL queryset. |
|  | [Delete KQL Queryset](/rest/api/fabric/kqlqueryset/items/delete-kql-queryset?tabs=HTTP) | Deletes an existing KQL queryset. |
|  | [Get KQL Queryset](/rest/api/fabric/kqlqueryset/items/get-kql-queryset?tabs=HTTP) | Get metadata about a KQL queryset. |
|  | [List KQL Queryset](/rest/api/fabric/kqlqueryset/items/list-kql-querysets?tabs=HTTP) | List KQL querysets in your workspace. |
|  | [Update KQL Queryset](/rest/api/fabric/kqlqueryset/items/update-kql-queryset?tabs=HTTP) | Update an existing KQL queryset. |

### Fabric Data Factory

| API | Description |
|--|--|
| Coming soon |  |

### Data Warehouse

| API | Description |
|--|--|
| [Create Warehouse](/rest/api/fabric/core/items/create-item) | Creates a Data warehouse. |
| [Get Warehouse](/rest/api/fabric/core/items/get-item) | Get Metadata about warehouse. |
| Update Warehouse | Update an existing warehouse. |
| Delete Warehouse | Delete an existing warehouse. |
| List Warehouse | List warehouses in your workspace. |

### Data Engineering

| API | Description |
|--|--|
| Create Lakehouse | Creates Lakehouse along with SQL analytics endpoint. |
| Update Lakehouse | Updates the name of a lakehouse and the SQL analytics endpoint. |
| Delete Lakehouse | Deletes lakehouse and the associated SQL analytics endpoint. |
| Get Properties | Gets the properties of a lakehouse and the SQL analytics endpoint. |
| [List tables](/rest/api/fabric/lakehouse/tables/list-tables) | List tables in the lakehouse. |
| [Table Load](/rest/api/fabric/lakehouse/tables/load-table) | Creates delta tables from CSV and parquet files and folders. |

This section will be updated as more Fabric APIs become available.

## Build a Fabric Workload

:::image type="content" source="media/partner-integration/fabric-workload.png" alt-text="Diagram showing how to create your own fabric workload.":::

Build a Fabric Workload model is designed to equip ISVs with the tools and platform capabilities required to craft customized workloads and experiences on Fabric. It enables ISVs to tailor their offerings to deliver their value proposition while leveraging the Fabric ecosystem by combining the best of both the worlds.
We're working closely with select design partners for this integration path and it's currently available by invitation only.
