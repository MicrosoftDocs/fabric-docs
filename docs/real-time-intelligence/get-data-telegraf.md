---
title: Ingest Data from Telegraf into Microsoft Fabric Eventhouse
description: In this article, you learn how to ingest (load) data into Microsoft Fabric Eventhouse from Telegraf.
ms.reviewer: aksdi
author: spelluru
ms.author: spelluru
ms.topic: how-to
ms.date: 08/25/2025

#Customer intent: As an integration developer, I want to build integration pipelines from Telegraf into Microsoft Fabric Eventhouse, so I can make data available for near real-time analytics.
---
# Ingest data from Telegraf into Microsoft Fabric Eventhouse

Microsoft Fabric Real-Time Intelligence supports data ingestion from [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/). Telegraf is an open source, lightweight agent that uses minimal memory to collect, process, and write telemetry: logs, metrics, and IoT data.

What you'll learn in this article:

- Configure Telegraf to send metrics to Microsoft Fabric Eventhouse.
- Choose connection-string settings (MetricsGroupingType, IngestionType) and authentication options.
- Create tables and query ingested metrics for near real-time analytics.

Telegraf supports hundreds of input and output plugins. A broad open source community uses and supports it.

The Microsoft Fabric [Real-Time Intelligence output plugin](https://github.com/influxdata/telegraf/blob/release-1.35/plugins/outputs/microsoft_fabric/README.md) serves as Telegraf's connector and sends data from many [input plugins](https://github.com/influxdata/telegraf/tree/master/plugins/inputs) to Eventhouse, a high-performance, scalable data store for real-time analytics.

> [!TIP]
> You can also configure Telegraf to send data to an Eventstream. For details, see [Telegraf plugin](https://github.com/influxdata/telegraf/blob/release-1.35/plugins/outputs/microsoft_fabric/README.md#eventstream)

## Prerequisites

* A Microsoft Fabric workspace with Real-Time Intelligence enabled.
* An Eventhouse instance and a KQL (Kusto Query Language) database. [Create an Eventhouse](create-eventhouse.md).
* [Telegraf](https://portal.influxdata.com/downloads/) version 1.35.0 or later. Host Telegraf on a virtual machine (VM) or container, either locally where the monitored app or service runs or remotely on a dedicated monitoring compute or container.
* Give the principal that runs Telegraf appropriate permissions in Microsoft Fabric, and assign the Database user role or higher for the Eventhouse database.

## Supported authentication methods

The plugin uses `DefaultAzureCredential` authentication. This credential tries multiple authentication methods in order until one succeeds, so it doesn't require hardcoded credentials.

### Azure default credential chain

Azure default credentials automatically try authentication methods in this order:

* **Environment Variables** - Checks for service principal credentials in environment variables:

  * `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `AZURE_TENANT_ID` (for client secret authentication)
  * `AZURE_CLIENT_ID`, `AZURE_CLIENT_CERTIFICATE_PATH`, `AZURE_TENANT_ID` (for client certificate authentication)

* **Managed Identity** - Uses system-assigned or user-assigned managed identity if running on Azure resources (VMs, App Service, Functions, etc.)

* **Azure CLI** - Uses credentials from `az login` if Azure CLI is installed and user is logged in

* **Azure PowerShell** - Uses credentials from `Connect-AzAccount` if Azure PowerShell is installed and user is logged in

* **Interactive Browser** - Opens browser for interactive sign-in (typically disabled in production scenarios)

### Authentication setup options

Choose the authentication method that best fits your deployment scenario:

**For production (recommended)**

* Use **Managed Identity** when running Telegraf on Azure resources (VMs, containers, etc.)
* Use **Service Principal with Environment Variables** for non-Azure environments

**For development**

* Use **Azure CLI** authentication by running `az login`
* Use **Azure PowerShell** authentication by running `Connect-AzAccount`

**Service principal environment variables:**
If using service principal authentication, set these environment variables:

Replace the placeholder text in the following example with your own values.

```bash
export AZURE_TENANT_ID=<your-tenant-id>
export AZURE_CLIENT_ID=<your-client-id>
export AZURE_CLIENT_SECRET=<your-client-secret>
```

## Configure Telegraf

Telegraf is a configuration driven agent. To get started, you must install Telegraf and configure the required input and output plugins. The default location of configuration file is as follows:

* For Windows: *C:\Program Files\Telegraf\telegraf.conf*
* For Linux: */etc/telegraf/telegraf.conf*

To enable the Microsoft Fabric output plugin for Eventhouse, add the following section to your configuration file:

```ini
[[outputs.microsoft_fabric]]
  ## The connection string for Microsoft Fabric Eventhouse
  connection_string = "Data Source=https://your-eventhouse.fabric.microsoft.com;Database=your-database;MetricsGroupingType=TablePerMetric;CreateTables=true"

  ## Client timeout
  # timeout = "30s"
```

## Connection string configuration

The `connection_string` provides information necessary for the plugin to establish a connection to the Eventhouse endpoint. It's a semicolon-delimited list of name-value parameter pairs.

### Eventhouse connection string parameters

The following table lists all the possible properties that can be included in a connection string for Eventhouse:

| Property name | Aliases | Description | Default |
|---|---|---|---|
| Data Source | Addr, Address, Network Address, Server | The URI specifying the Eventhouse service endpoint. For example, `https://mycluster.fabric.microsoft.com`. | Required |
| Initial Catalog | Database | The database name in the Eventhouse. For example, `MyDatabase`. | Required |
| Ingestion Type | IngestionType | Values can be set to `managed` for streaming ingestion with fallback to batched ingestion or `queued` for queuing up metrics and process sequentially | `queued` |
| Table Name | TableName | Name of the single table to store all the metrics; only needed if `MetricsGroupingType` is `SingleTable` | - |
| Create Tables | CreateTables | Creates tables and relevant mapping if `true`. Otherwise table and mapping creation is skipped. Useful for running Telegraf with the lowest possible permissions, for example, table ingestor role. | `true` |
| Metrics Grouping Type | MetricsGroupingType | Type of metrics grouping used when pushing to Eventhouse either being `TablePerMetric` or `SingleTable`. | `TablePerMetric` |

### Example connection strings

**TablePerMetric grouping (recommended):**

```ini
connection_string = "Data Source=https://mycluster.fabric.microsoft.com;Database=MyDatabase;MetricsGroupingType=TablePerMetric;CreateTables=true"
```

**SingleTable grouping:**

```ini
connection_string = "Data Source=https://mycluster.fabric.microsoft.com;Database=MyDatabase;MetricsGroupingType=SingleTable;Table Name=telegraf_metrics;CreateTables=true"
```

**With managed ingestion:**

```ini
connection_string = "Data Source=https://mycluster.fabric.microsoft.com;Database=MyDatabase;IngestionType=managed;CreateTables=true"
```

## Metrics grouping

Metrics can be grouped in two ways when sent to Eventhouse:

### TablePerMetric (Recommended)

The plugin groups the metrics by the metric name and sends each group of metrics to a separate Eventhouse KQL database table. If the table doesn't exist, the plugin creates the table. If the table exists, the plugin tries to merge the Telegraf metric schema to the existing table.

The table name matches the metric name. The metric name must comply with the Eventhouse KQL database table naming constraints.

### SingleTable

The plugin sends all the metrics received to a single Eventhouse KQL database table. The name of the table must be supplied via `Table Name` parameter in the `connection_string`. If the table doesn't exist, the plugin creates the table. If the table exists, the plugin tries to merge the Telegraf metric schema to the existing table.

## Ingestion types

The plugin supports two ingestion types:

### Queued ingestion (default)

The service queues and processes metrics in batches. It's the default and recommended method for most use cases because it provides better throughput and reliability.

### Managed ingestion

Streaming ingestion with fallback to batched ingestion provides lower latency but falls back to batched ingestion when streaming ingestion isn't enabled on Eventhouse.

> [!IMPORTANT]
> To use managed ingestion, you must enable [streaming ingestion](/azure/data-explorer/ingest-data-streaming?tabs=azure-portal%2Ccsharp) on your Eventhouse.

To check if streaming ingestion is enabled, run this query in your Eventhouse:

```kql
.show database <DB-Name> policy streamingingestion
```

## Table schema

Eventhouse automatically creates tables whose schema matches the Telegraf metric structure:

```kql
.create-merge table ['table-name'] (['fields']:dynamic, ['name']:string, ['tags']:dynamic, ['timestamp']:datetime)
```

The corresponding table mapping is automatically created:

```kql
.create-or-alter table ['table-name'] ingestion json mapping 'table-name_mapping' '[{"column":"fields", "Properties":{"Path":"$[\'fields\']"}},{"column":"name", "Properties":{"Path":"$[\'name\']"}},{"column":"tags", "Properties":{"Path":"$[\'tags\']"}},{"column":"timestamp", "Properties":{"Path":"$[\'timestamp\']"}}]'
```

> [!NOTE]
> When `CreateTables=true` (it's the default), this plugin creates tables and corresponding table mappings using the commands above.

## Query ingested data

The following are examples of data collected using input plugins along with the Microsoft Fabric output plugin. The examples show how to use data transformations and queries in Eventhouse.

### Sample metrics data

The following table shows sample metrics data collected by various input plugins:

| name | tags | timestamp | fields |
|--|--|--|--|
| cpu | {"cpu":"cpu-total","host":"telegraf-host"} | 2021-09-09T13:51:20Z | {"usage_idle":85.5,"usage_system":8.2,"usage_user":6.3} |
| disk | {"device":"sda1","fstype":"ext4","host":"telegraf-host","mode":"rw","path":"/"} | 2021-09-09T13:51:20Z | {"free":45234176000,"total":63241359360,"used":15759433728,"used_percent":25.9} |

Since the collected metrics object is a complex type, the *fields* and *tags* columns are stored as dynamic data types. There are several ways to query this data:

### Query JSON attributes directly

You can query JSON data in raw format without parsing it:

**Example 1**

```kusto
cpu
| where todouble(fields.usage_user) > 10
| project timestamp, host=tostring(tags.host), cpu_usage=todouble(fields.usage_user)
```

**Example 2**

```kusto
disk
| where todouble(fields.used_percent) > 80
| project timestamp, host=tostring(tags.host), device=tostring(tags.device), used_percent=todouble(fields.used_percent)
```

> [!NOTE]
> This approach can affect performance with large volumes of data. For better performance with large datasets, use the update policy approach.

### Use an update policy for better performance

Transform dynamic data type columns using an update policy. This approach is recommended for querying large volumes of data:

```kusto
// Function to transform data
.create-or-alter function Transform_cpu_metrics() {
    cpu
    | extend 
        usage_idle = todouble(fields.usage_idle),
        usage_system = todouble(fields.usage_system), 
        usage_user = todouble(fields.usage_user),
        host = tostring(tags.host),
        cpu_name = tostring(tags.cpu)
    | project timestamp, name, host, cpu_name, usage_idle, usage_system, usage_user
}

// Create destination table with transformed schema
.set-or-append cpu_transformed <| Transform_cpu_metrics() | take 0

// Apply update policy on destination table
.alter table cpu_transformed policy update
@'[{"IsEnabled": true, "Source": "cpu", "Query": "Transform_cpu_metrics()", "IsTransactional": true, "PropagateIngestionProperties": false}]'
```

### Flatten dynamic columns

There are multiple ways to flatten dynamic columns by using the [extended](/kusto/query/extend-operator?view=azure-data-explorer&preserve-view=true) operator or [bag_unpack()](/kusto/query/bag-unpack-plugin?view=azure-data-explorer&preserve-view=true) plugin. You can use either of them in the update policy *Transform_TargetTableName()* function.

* **Use the `extend` operator**: Use this approach because it's faster and robust. Even if the schema changes, it doesn't break queries or dashboards.

    ```kusto
    cpu
    | extend 
        usage_idle = todouble(fields.usage_idle),
        usage_system = todouble(fields.usage_system), 
        usage_user = todouble(fields.usage_user),
        host = tostring(tags.host),
        cpu_name = tostring(tags.cpu)
    | project-away fields, tags
    ```

* **Use bag_unpack() plugin**: This approach automatically unpacks dynamic type columns. Changing the source schema can cause issues when dynamically expanding columns.

    ```kusto
    cpu
    | evaluate bag_unpack(tags, columnsConflict='replace_source')
    | evaluate bag_unpack(fields, columnsConflict='replace_source')
    | project timestamp, name, host, cpu, usage_idle, usage_system, usage_user
    ```
