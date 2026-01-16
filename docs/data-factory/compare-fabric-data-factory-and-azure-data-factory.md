---
title: Differences between Data Factory in Fabric and Azure
description: Compare Azure Data Factory and Fabric Data Factory features to choose the right data integration solution for your enterprise.
author: kromerm
ms.author: makromer
ms.topic: concept-article
ms.date: 12/19/2025
ms.custom:
  - template-concept
  - build-2023
  - pipelines
ms.search.form: Pipeline Activity Overview
ai-usage: ai-assisted
---

# Differences between Azure Data Factory and Fabric Data Factory

[Data Factory in Microsoft Fabric](data-factory-overview.md) is the next generation of [Azure Data Factory](/azure/data-factory/introduction), built to handle your most complex data integration challenges with a simpler, more powerful approach.

This guide helps you understand the key differences between these two services, so you can make the right choice for your enterprise. We'll walk you through what's new, what's different, and what advantages Fabric brings to the table.

Ready to explore your migration options? Check out our [migration guide](migrate-planning-azure-data-factory.md).

## Compare features side by side

Here's how the core features stack up between Azure Data Factory and Fabric Data Factory. We've highlighted what's changed, what's new, and what stays the same.

|[Azure Data Factory](/azure/data-factory/introduction) |[Data Factory in Fabric](data-factory-overview.md) |What's different |
|:---|:---|:---|
|Pipeline |Pipeline | **Better integration**: Pipelines in Fabric work seamlessly with Lakehouse, Data Warehouse, and other Fabric services right out of the box. Fabric pipelines include more SaaS-based activities and differ in JSON definitions. See our [pipeline feature comparison](#pipeline-feature-comparison) for more details.|
|Mapping data flow  |Dataflow Gen2 | **Easier to use**: Dataflow Gen2 gives you a simpler experience for building transformations. We're adding more mapping dataflow features to Gen2 all the time. |
|Activities |Activities|**More activities coming**: We're working to bring all your favorite ADF activities to Fabric. Plus, you get new ones like the Office 365 Outlook activity that aren't available in ADF. See our [activity comparison](compare-fabric-data-factory-and-azure-data-factory.md#activity-comparison) for details. |
|Dataset |Connections only|**Simpler approach**: No more complex dataset configurations. For Data Factory in Fabric you use connections to link to your data sources and start working. Fabric eliminates datasets, defining data properties inline within activities. |
|Linked Service |Connections |**More intuitive**: Connections work like linked services but are easier to set up and manage. |
|Triggers |Schedule and file event triggers |**Built-in scheduling**: Use Fabric's scheduler and Reflex events to automatically run your pipelines. File event triggers work natively in Fabric without extra setup. Fabric integrates triggers into its Activator framework, unlike ADF’s standalone triggers. |
|Publish |Save and Run |**No publishing step**: In Fabric, skip the publish step entirely. Just select Save to store your work, or select Run to save and execute your pipeline immediately. |
|Autoresolve and Azure Integration runtime |Not needed |**Simplified architecture**: No need to manage integration runtimes. Fabric handles the compute for you. |
|Self-hosted integration runtimes |On-premises Data Gateway |**Same on-premises access**: Connect to your on-premises data using the familiar On-premises Data Gateway. Learn more in our [on-premises data access guide](how-to-access-on-premises-data.md). |
|Azure-SSIS integration runtimes |To be determined |**Future capability in Fabric**: We're still working on the design for SSIS integration in Fabric. |
|Managed virtual networks and private endpoints |To be determined. |**Future capability in Fabric**: We're still working on integration for managed virtual networks and private endpoints in Fabric. |
|Expression language |Expression language |**Same expressions**: Your existing expression knowledge transfers directly. The syntax is nearly identical. |
|Authentication types |Authentication kinds |**More options**: All your popular ADF authentication methods work in Fabric, plus we've added new authentication types. |
|CI/CD |CI/CD |Enhanced capabilities beyond ADF include easy cherry-picking, individual item promotion, Git repo enablement, and built-in SaaS CI/CD options.|
|ARM template export/import |Save as |**Quick duplication**: In Fabric, use "Save as" to quickly duplicate pipelines for development or testing. |
|Monitoring |Monitoring hub + Run history |**Advanced monitoring**: The monitoring hub offers a modern experience with cross-workspace insights and better drill-down capabilities. |
|Debugging |Interactive mode |**Simplified debugging**: Fabric eliminates ADF’s debug mode. You’re always in interactive mode. |
|Change Data Capture (CDC) |Copy jobs |**Incremental data movement**: Fabric manages incremental data movement through Copy jobs instead of CDC artifacts. |
|Azure Synapse Link |Mirroring |**Data replication**: Fabric replaces Azure Synapse Link with mirroring features for data replication. |
|Execute pipeline activity |Invoke pipeline activity |**Cross-platform invocation**: Fabric enhances ADF’s Execute pipeline activity with cross-platform invocation. |

## Pipeline feature comparison

| **Category** | **ADF Pipelines** | **Fabric Pipelines** |
|--------------|-------------------|---------------------|
| Type of service | Data Integration PaaS Service | Data Integration SaaS Service |
| Authoring Environment | Azure portal (ADF Studio) | Fabric / PBI workspace (unified UX with Lakehouses, Warehouses, etc.) |
| Pipeline Orchestration | Full-featured pipelines with activities, triggers, parameters | Same orchestration model, re-imagined for Fabric UX |
| Data Movement | Copy activity, mapping data flows, on-premises IR support, Managed virtual network | Copy activity, Dataflows Gen2, built-in connectivity to OneLake and Fabric items, On-premises Data Gateway, virtual network gateway |
| Compute / IR | Self-hosted, SSIS and Azure IR (for movement + transformation) | Cloud connections, On-premises, and virtual network gateway |
| Data Flows | Azure Blob, Data Lake Storage, SQL, 100+ connectors | Same connectors + native OneLake integration, tighter Fabric workspace alignment |
| Monitoring | Pipelines and Data Flows in ADF Studio with runs, triggers, alerts | Monitoring Hub and Workspace Monitoring with unified views across Pipelines, Dataflows, Notebooks, Databases, etc. |
| Triggers | Schedules, tumbling window, event-based triggers | Schedules, event triggers, tumbling window triggers as interval schedules |
| CI/CD | ARM templates + Azure DevOps or GitHub repo integration | Built-in deployment pipelines in Fabric; workspace-level promotion (Dev → Test → Production) and external repo integration |
| Security | Managed identities, Key Vault integration, private endpoints | Same security model plus Fabric workspace RBAC; OneLake security integration |
| Pricing | Azure utilization-based Pay-as-you-go (per activity run, data movement, and compute) | Capacity-based (Fabric F SKU) with no charges for external or pipeline activities, only activity runs and pipeline data movement |

## Activity comparison

With Data Factory in Microsoft Fabric, we continue to maintain a high degree of continuity with Azure Data Factory. Approximately 90% of activities accessible in ADF are already available under Data Factory in Fabric. Here's a breakdown of the activities and their availability in both ADF and Data Factory in Fabric:

|**Activity**|**ADF**|**Data Factory in Fabric**|
|:---|:---|:---|
|ADX/KQL|[Y](/azure/data-factory/connector-azure-data-explorer)|[Y](kql-activity.md)|
|Append Variable|[Y](/azure/data-factory/control-flow-append-variable-activity)|[Y](append-variable-activity.md)|
|Azure Batch|[Y](/azure/data-factory/transform-data-using-dotnet-custom-activity)|[Y](azure-batch-activity.md)|
|Azure Databricks|[Notebook activity](/azure/data-factory/transform-data-databricks-notebook) &bull; [Jar activity](/azure/data-factory/transform-data-databricks-jar) &bull; [Python activity](/azure/data-factory/transform-data-databricks-python) &bull; [Job activity](/azure/data-factory/transform-data-databricks-job) |[Azure Databricks activity](azure-databricks-activity.md)|
|Azure Machine Learning|[Y](/azure/data-factory/transform-data-machine-learning-service)|[Y](azure-machine-learning-activity.md)|
|Azure Machine Learning Batch Execution|Deprecated|N/A|
|Azure Machine Learning Update Resource|Deprecated|N/A|
|Copy|[Copy data](/azure/data-factory/copy-activity-overview)|[Copy activity](copy-data-activity.md)|
|Dataflow Gen2|N/A|[Y](dataflows-gen2-overview.md)|
|Delete|[Y](/azure/data-factory/delete-activity)|[Y](delete-data-activity.md)|
|Execute/Invoke Pipeline|[Execute pipeline](/azure/data-factory/control-flow-execute-pipeline-activity)|[Invoke pipeline](invoke-pipeline-activity.md)|
|Fabric Notebooks|N/A|[Y](notebook-activity.md)|
|Fail|[Y](/azure/data-factory/control-flow-fail-activity)|[Y](fail-activity.md)|
|Filter|[Y](/azure/data-factory/control-flow-filter-activity)|[Y](filter-activity.md)|
|For Each|[Y](/azure/data-factory/control-flow-for-each-activity)|[Y](foreach-activity.md)|
|Functions|[Azure function](/azure/data-factory/control-flow-azure-function-activity)|[Function activity](functions-activity.md)|
|Get Metadata|[Y](/azure/data-factory/control-flow-get-metadata-activity)|[Y](get-metadata-activity.md)|
|HDInsight|[Hive activity](/azure/data-factory/transform-data-using-hadoop-hive) &bull; [Pig activity](/azure/data-factory/transform-data-using-hadoop-pig) &bull; [MapReduce activity](/azure/data-factory/transform-data-using-hadoop-map-reduce) &bull; [Spark activity](/azure/data-factory/transform-data-using-spark) &bull; [Streaming activity](/azure/data-factory/transform-data-using-hadoop-streaming)|[HDInsight activity](azure-hdinsight-activity.md)|
|If condition|[Y](/azure/data-factory/control-flow-if-condition-activity)|[Y](if-condition-activity.md)|
|Lookup|[Y](/azure/data-factory/control-flow-lookup-activity)|[Y](lookup-activity.md)|
|Mapping Data Flow|[Y](/azure/data-factory/control-flow-execute-data-flow-activity)|[Dataflow Gen2](tutorial-dataflows-gen2-pipeline-activity.md)|
|Office 365 Outlook|N/A|[Y](outlook-activity.md)|
|Power Query (ADF only - Wrangling Dataflow)|Deprecated|N/A|
|Script|[Y](/azure/data-factory/transform-data-using-script)|[Y](script-activity.md)|
|Semantic model refresh|N/A|[Y](semantic-model-refresh-activity.md)|
|Set Variable|[Y](/azure/data-factory/control-flow-set-variable-activity)|[Y](set-variable-activity.md)|
|Sproc|[Y](/azure/data-factory/transform-data-using-stored-procedure)|[Y](stored-procedure-activity.md)|
|SSIS|[Y](/azure/data-factory/how-to-invoke-ssis-package-ssis-activity)|N/A|
|Stored procedure|[Y](/azure/data-factory/transform-data-using-stored-procedure)|[Y](stored-procedure-activity.md)|
|Switch|[Y](/azure/data-factory/control-flow-switch-activity)|[Y](switch-activity.md)|
|Synapse Notebook and SJD activities|[Y](/azure/data-factory/transform-data-synapse-notebook)|N/A|
|Teams|N/A|[Y](teams-activity.md)|
|Until|[Y](/azure/data-factory/control-flow-until-activity)|[Y](until-activity.md)|
|Validation|[Y](/azure/data-factory/control-flow-validation-activity)|[Get metadata](get-metadata-activity.md) & [If Condition](if-condition-activity.md)|
|Wait|[Y](/azure/data-factory/control-flow-wait-activity)|[Y](wait-activity.md)|
|Web|[Y](/azure/data-factory/control-flow-web-activity)|[Y](web-activity.md)|
|Webhook|[Y](/azure/data-factory/control-flow-webhook-activity)|[Y](webhook-activity.md)|
|Wrangling Data Flow|[Y](/azure/data-factory/wrangling-data-flow-overview)|[Dataflow Gen2](tutorial-dataflows-gen2-pipeline-activity.md)|

### New activities in Fabric Data Factory

In addition to maintaining activity continuity, Data Factory in Fabric introduces some new activities to meet your richer orchestration needs. These new activities are:

1. **Outlook**: Available in Fabric Data Factory to facilitate integration with Outlook services.
1. **Teams**: Available in Fabric Data Factory to enable orchestration of Microsoft Teams activities.
1. **Semantic model refresh**: Available in Fabric Data Factory to enhance Power BI semantic model refresh capabilities.
1. **Dataflow Gen2**: Available in Fabric Data Factory to empower data orchestration with advanced dataflow capabilities.

For a list of all available Fabric Data Factory activities, see the [Activity overview](activity-overview.md).

## Connector comparison

For a comparison of all connectors and their availability in Azure Data Factory and Fabric Data Factory, see the [Connector comparison article](connector-parity.md).

## Self-hosted Integration Runtime (SHIR) vs. On-premises Data Gateway (OPDG)

>[!NOTE]
> The services supported by the SHIR and ODPG are different:
>
> - Self-hosted Integration Runtime (SHIR): Supports Azure Data Factory, Azure Synapse Analytics, Azure Machine Learning studio, and Azure Purview.
> - On-premises Data Gateway (OPDG): Supports Power BI, Power Apps, Power Automate, Azure Analysis Services, Logic Apps, Fabric Dataflow Gen2, Fabric Pipeline, Fabric Copy Job, and Fabric Mirroring.

| **Category**                  | **Self-hosted Integration Runtime (SHIR)**                                                                 | **On-premises Data Gateway (OPDG)**                                                                 |
|-------------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| **Supported Services**        | - Azure Data Factory<br>- Azure Machine Learning studio<br>- Azure Synapse Analytics<br>- Azure Purview | - Power BI<br>- Power Apps<br>- Power Automate<br>- Azure Analysis Services<br>- Logic Apps<br>- Fabric Dataflow Gen2<br>- Fabric Pipeline<br>- Fabric Copy Job<br>- Fabric Mirroring |
| **Installation & Registration** | - Registered by key<br>- Runs in service mode | - Registered with Microsoft Entra ID account<br>- Supports user mode                                      |
| **Platform**                  | - Windows<br>- Container image supported                                                               | - Windows only<br>- No container support                                                       |
| **Proxy Support**             | - Support both system and custom proxy                                                                    | - Support custom proxy                                                                             |
| **Region Binding**            | - Fixed to Data Factory region<br>- Can't change default region                                       | - Region can be changed                                                                           |
| **Custom Relay**              | - Not supported                                                                                           | - Supported; customers can bring their own relay                                                  |
| **Sharing Across Services**   | - Shared with up to 120 Data Factories <br> - Can't be shared across ADF, Synapse, Purview, or Synapse workspaces | - Available to all supported services within a tenant                                             |
| **High Availability (HA)**    | - Up to 8 nodes (4 default)                                                                               | - Up to 10 nodes                                                                                  |
| **Recovery**                  | - Requires reinstallation                                                                                 | - Recovery key supported                                                                          |
| **Load Balancing**            | - Task-level load balancing based on available worker count (CPU + memory)                                | - Query-level load balancing <br> - Round robin or Random distribution options                   |
| **Credential Store**          | - Stored locally on SHIR nodes<br>- Azure Key Vault supported                                          | - Stored centrally in Gateway cloud service <br> - No Key Vault integration                      |
| **Auto-update**               | - Supported                                                                                               | - Not supported                                                                                   |
| **Connector Extensibility**   | - Not supported                                                                                           | - Supported                                                                                       |
| **Interactive Authoring**     | - Supported                                                                                               | - Supported                                                                                       |
| **Private Link for Control Flow** | - Supported                                                                                               | - Not supported                                                                                   |
| **Versioning**                | - Two releases per month; one pushed as autoupdate<br>- Supports last 12 months of releases           | - One release per month <br>- Supports last 6 releases                                          |
| **CPU & Memory Throttling**   | - Not supported                                                                                           | - Supported                                                                                       |
| **Throughput Limits**         | - No hard limit; dependent on network bandwidth                                                           | Service-specific limits:<br>Power Apps / Power Automate / Logic Apps:<br> - Write: 2-MB payload limit<br>- Read: 2-MB request limit, 8 MB compressed response limit<br>- GET request URL limit: 2,048 characters<br>Power BI Direct Query: 16-MB uncompressed response limit |

## ADF Managed Virtual Network vs. Fabric Virtual Network Data Gateway

Azure Data Factory (ADF) Managed Virtual Network and Microsoft Fabric Virtual Network (virtual network) Data Gateway both help you connect to data sources securely, without exposing them to the public internet. While both options support private connectivity for cloud workloads, they differ in how they're set up, who manages them, and which services they support.

- **ADF Managed VNET**  
  Microsoft owns and manages the network environment. You get a simple setup, but you can't control the network settings or firewall rules.

- **Fabric VNET Data Gateway**  
  You deploy the gateway inside your own Azure virtual network. This gives you full control over networking, firewall, and scaling. You decide how the gateway connects to your resources and manage all network settings.

Use the table below to compare the main differences and choose the option that fits your workload and governance needs.

| **Category**                  | **ADF Managed Virtual Network**                                                                 | **Fabric Virtual Network Data Gateway**                                                                 |
|-------------------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| **Supported Services**        | Azure Data Factory & Synapse pipelines.                                                       | Microsoft Fabric Dataflow Gen2, Fabric data pipelines, Fabric Copy Job, Fabric Mirroring, Power BI semantic models, and Power BI paginated reports |
| **VNET Ownership**            | Microsoft-managed virtual network (customer doesn’t control the network).                                 | Customer-managed virtual network (customer has full control).                                                     |
| **Private Endpoints**         | Autocreated and managed by ADF for supported services (Azure Storage, SQL DB, etc.).          | Customers configure virtual network Gateway to connect Fabric workloads to resources inside their virtual network.           |
| **Networking Control**        | Limited—customers can only allowlist virtual network integration runtime to private endpoints.          | Full control—customer configures firewall, NSG rules, routing in their own virtual network.                     |
| **Installation / Deployment** | No installation needed; fully managed by Microsoft inside a hidden virtual network.                       | Requires deployment of virtual network Data Gateway into the customer’s virtual network.                                     |
| **High Availability**         | Microsoft-managed, autoscaled inside ADF’s virtual network. Switch to reserve mode when enabling TTL.     | Supports scaling and HA (node-based clusters), but runs inside customer-managed virtual network. Support up to 7 nodes. |

## Key Features of Fabric Data Factory

In Fabric Data Factory, building your pipeline, dataflows, and other Data Factory items is incredibly easy and fast because of native integration with Microsoft's game-changing AI feature Co-Pilot. With Copilot for Data Factory, you can use natural language to easily define your data integration projects.

### Native Lakehouse and Data Warehouse integration

One of the biggest advantages of Fabric Data Factory is how it connects with your data platforms. Lakehouse and Data Warehouse work as both sources and destinations in your pipelines, making it easy to build integrated data projects.

   :::image type="content" source="media/connector-differences/source.png" alt-text="Screenshot showing lakehouse and data warehouse source tab.":::

   :::image type="content" source="media/connector-differences/destination.png" alt-text="Screenshot showing lakehouse and data warehouse destination tab.":::

### Smart email notifications with Office 365

Need to keep your team in the loop? The Office 365 Outlook activity lets you send customized email notifications about pipeline runs, activity status, and results—all with simple configuration. No more checking dashboards constantly or writing custom notification code.

:::image type="content" source="media/connector-differences/office-365-run.png" alt-text="Screenshot showing that office 365 outlook activity.":::

### Streamlined data connection experience

Fabric's modern **Get data** experience makes it quick to set up copy pipelines and create new connections. You'll spend less time configuring and more time getting your data where it needs to go.

:::image type="content" source="media/connector-differences/copy-data-source.png" alt-text="Screenshot showing that A modern and easy Get Data experience.":::

:::image type="content" source="media/connector-differences/create-new-connection.png" alt-text="Screenshot showing that how to create a new connection.":::

### Ease-of-use improvements in CI/CD experience

In Fabric, the CI/CD experience is much easier and more flexible than in Azure Data Factory or Synapse. There's no connection between CI/CD and ARM templates in Fabric making it super-easy to cherry-pick individual parts of your Fabric workspace for check-in, check-out, validation, and collaboration. In ADF and Synapse, your only option for CI/CD is to use your own Git repo. However, in Fabric, you can optionally use the built-in deployment pipelines feature that doesn't require bringing your own external Git repo.

### Next-level monitoring and insights

The monitoring experience in Fabric Data Factory is where you'll really see the difference. The monitoring hub gives you a complete view of all your workloads, and you can drill down into any activity for detailed insights. Cross-workspace analysis is built right in, so you can see the big picture across your entire organization.

:::image type="content" source="./media/connector-differences/monitoring-hub.png" alt-text="Screenshot showing the monitoring hub and the items of Data Factory.":::

When you're troubleshooting copy activities, you'll love the detailed breakdown view. Select the run details button (the glasses icon) to see exactly what happened. The Duration breakdown shows you how long each stage took, making performance optimization easier.

:::image type="content" source="./media/connector-differences/details-of-copy-activity.png" alt-text="Screenshot showing the pipeline copy monitoring results provides breakdown detail of copy activity.":::

:::image type="content" source="./media/connector-differences/duration-breakdown.png" alt-text="Screenshot showing copy data details.":::

### Quick pipeline duplication

Need to create a similar pipeline? The **Save as** feature lets you duplicate any existing pipeline in seconds. It's perfect for creating development versions, testing variations, or setting up similar workflows.

:::image type="content" source="./media/connector-differences/save-as-button.png" alt-text="Screenshot showing save as in Fabric pipeline.":::

## Related content

For more information, see the following resources:

- [Migrate from Azure Data Factory to Data Factory in Microsoft Fabric](migrate-planning-azure-data-factory.md)
- [Get the full overview of Data Factory in Microsoft Fabric](data-factory-overview.md)
- [Migration best practices](migration-best-practices.md)
- [Build your first data integration in Fabric](transform-data.md)
