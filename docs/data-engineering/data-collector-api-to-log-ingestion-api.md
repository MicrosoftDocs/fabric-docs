---
title: Migration from Log Analytics Data Collector API to Log Ingestion API
description: This article shows how to migration from Log Analytics Data Collector API to Log Ingestion API.
author: eric-urban
ms.author: eur
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 01/14/2026
---

# Migration from Log Analytics Data Collector API to Log Ingestion API

The Azure Monitor HTTP Data Collector API has been deprecated, and any services or connectors that relies on it will cease to function. To ensure continuity and long-term supportability, all existing integrations must transition to the Log Ingestion API, which serves as the modern and fully supported ingestion mechanism for Azure Monitor Logs. 

The Log Ingestion API is built upon Data Collection Rules (DCRs) and Data Collection Endpoints (DCEs), providing a more secure, structured, and schema-governed ingestion pipeline. Unlike the Data Collector API-which accepts arbitrary JSON payloads-the Log Ingestion API enforces a well-defined schema through DCR transformations, ensuring consistency and reliability in log processing

## Log Ingestion API Overview

The Log Ingestion API uses **Data Collection Rules (DCR)** and **Data Collection Endpoints (DCE)**. Unlike the Data Collector API, which accepted arbitrary JSON, the Log Ingestion API requires strict schema mapping.

**Key Components**

| Component | Purpose |
| --- | --- |
| App Registration & Secret | Authentication via Tenant ID + Client ID + Secret. |
| Log Analytics Table | Custom table manually created as ingestion target. |
| Data Collection Rule (DCR) | Defines schema & transformation logic. |
| Data Collection Endpoint (DCE) | Ingestion endpoint; required for private link or non-direct mode. |

Only **manually created DCRs** can be used for programmatic ingestion through the API. 

## Step-by-Step Configuration

### Step 1. Prepare Log Analytics Workspace

   - Create or identify an existing [**Log Analytics Workspace**](https://ms.portal.azure.com/#blade/Microsoft_OperationsManagementSuite_Workspace/CreateWorkspaceBladeV2). 
   - Ensure all following resources (DCE and DCR) are in the **same region** as the workspace. 

### Step 2. Create a Data Collection Endpoint (DCE)

   - [**Azure Portal**](https://ms.portal.azure.com/#home) → [**Data Collection Endpoints**](https://ms.portal.azure.com/#blade/Microsoft_Azure_Monitoring/CreateDataCollectionEndpointViewModel) → **Create**. 
   - Note down the **DCE name** (e.g., DCEdemo). 

   :::image type="content" source="media\data-collector-api-to-log-ingestion-api\create-a-data-collection-endpoint.png" alt-text="Screenshot showing create a data collection endpoint." lightbox="media\data-collector-api-to-log-ingestion-api\create-a-data-collection-endpoint.png":::

### Step 3. Prepare Sample JSON Schema

The user uploads a JSON array to define the schema of the custom log table. 

- [Event table schema JSON code sample]()
- [Metric table schema JSON code sample]()
- [Metadata table schema JSON code sample]()
- [Log table schema JSON code sample]()

Image sample Json code (Log schema)

:::image type="content" source="media\data-collector-api-to-log-ingestion-api\fabric-sample-table-log-schema.png" alt-text="Screenshot showing fabric sample table log schema." lightbox="media\data-collector-api-to-log-ingestion-api\fabric-sample-table-log-schema.png":::

### Step 4. Create Custom Table (Direct Ingest)

Azure Portal → **Log Analytics Workspace**(*loganalyticsworkspacedemo*) → Tables → Create → New custom log (Direct Ingest)

:::image type="content" source="media\data-collector-api-to-log-ingestion-api\create-custom-table-direct-ingest.png" alt-text="Screenshot showing create custom table direct ingest." lightbox="media\data-collector-api-to-log-ingestion-api\create-custom-table-direct-ingest.png":::

Fill in:
   - **Table name**: e.g., SparkLogTest (suffix _CL is auto-added).
   - **Table Plan**: Analytics.
   - **Data Collection Rule**: create a new one(*SparkLogTestrule*).
   - **Data Collection Endpoint**: select the DCE from Step 2.
   - In the Schema and Transformation step, upload the sample JSON from Step 3. You don't need to configure any DCR transformation - the schema is fully stabilized on the client side.

   :::image type="content" source="media\data-collector-api-to-log-ingestion-api\create-custom-table-direct-ingest-fill-in.png" alt-text="Screenshot showing create custom table direct ingest configure." lightbox="media\data-collector-api-to-log-ingestion-api\create-custom-table-direct-ingest-fill-in.png":::

### Step 5. Prepare Service Principal for Authentication

- Register an app in **Microsoft Entra ID**.
   :::image type="content" source="media\data-collector-api-to-log-ingestion-api\tenantid-clientid.png" alt-text="Screenshot showing tenantId and clientId." lightbox="media\data-collector-api-to-log-ingestion-api\tenantid-clientid.png":::

- Record: **TenantId**, **ClientId**, **ClientSecret(optional)**. 
- Grant the app **Monitoring Metrics Publisher** role on every table's DCE resource.
   :::image type="content" source="media\data-collector-api-to-log-ingestion-api\monitoring-metrics-publisher.png" alt-text="Screenshot showing grant the app Monitoring Metrics Publisher role." lightbox="media\data-collector-api-to-log-ingestion-api\monitoring-metrics-publisher.png":::

### Step 6. Configure Spark Library

To configure Spark, create a Fabric Environment Artifact and choose one of the following options, you can use 'Add from .yml' in the Environment artifact to add all the configurations.

  :::image type="content" source="media\data-collector-api-to-log-ingestion-api\configure-emitter-settings-environment-in-fabric.png" alt-text="Screenshot showing configure emitter settings environment in fabric." lightbox="media\data-collector-api-to-log-ingestion-api\configure-emitter-settings-environment-in-fabric.png":::


#### Option 1: Configure with Service Principal and Client Secret

   1. Create a Fabric Environment Artifact in Fabric.
   2. Add the following **Spark properties** with the appropriate values to the environment artifact, or select Add **from .yml** in the ribbon to download the [sample yaml file](), which already containing the required properties.

      ```properties
      spark.synapse.diagnostic.emitters: <EMITTER_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.type: AzureLogIngestion
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.categories: DriverLog,ExecutorLog,EventLog,Metrics
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.dceUri: https://<DCE_NAME>.ingest.monitor.azure.com
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.logDcr: <LOG_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.logStream: <LOG_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.eventDcr: <EVENT_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.eventStream: <EVENT_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metricDcr: <METRIC_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metricStream: <METRIC_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metaDcr: <META_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metaStream: <META_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.secret: <SP_CLIENT_SECRET>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.tenantId: <SP_TENANT_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.clientId: <SP_CLIENT_ID>
      spark.fabric.pools.skipStarterPools: 'true'
      ```
   3. Save and publish changes.

#### Option 2: Configure with Service Principal with Certificate

When using certificate-based authentication, ensure that your Service Principal is created, for more details, see [Create a service principal containing a certificate using Azure CLI](..cli/azure/azure-cli-sp-tutorial-3) 

   1. Create a Fabric Environment Artifact in Fabric.
   2. Add the following **Spark properties** with the appropriate values to the environment artifact, or select Add **from .yml** in the ribbon to download the [sample yaml file](), which already containing the required properties.

      ```properties
      spark.synapse.diagnostic.emitters: <EMITTER_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.type: AzureLogIngestion
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.categories: DriverLog,ExecutorLog,EventLog,Metrics
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.dceUri: https://<DCE_NAME>.ingest.monitor.azure.com
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.logDcr: <LOG_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.logStream: <LOG_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.eventDcr: <EVENT_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.eventStream: <EVENT_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metricDcr: <METRIC_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metricStream: <METRIC_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metaDcr: <META_DCR_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.metaStream: <META_STREAM_NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.certificate.keyVault.certificateName: <SP_CERT-NAME>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.certificate.keyVault: https://<KEYVAULT_NAME>.vault.azure.net/
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.tenantId: <SP_TENANT_ID>
      spark.synapse.diagnostic.emitter.<EMITTER_NAME>.clientId: <SP_CLIENT_ID>
      spark.fabric.pools.skipStarterPools: 'true'
      ```
   3. Save and publish changes.

### Step 7. Attach the environment artifact to notebooks or spark job definitions, or set it as the workspace default

**To attach the environment to notebooks or Spark job definitions:**
   1. Navigate to your notebook or Spark job definition in Fabric.
   2. Select the **Environment** menu on the Home tab and select the configured environment.
   3. The configuration will be applied after starting a **Spark session**.

**To set the environment as the workspace default:**

   1. Navigate to Workspace settings in Fabric.
   2. Find the **Spark settings** in your Workspace settings **(Workspace setting -> Data Engineering/Science -> Spark settings)**
   3. Select **Environment** tab and choose the environment with diagnostics spark properties configured, and click **Save**.

### Step 8. Submit an Apache Spark application and view the logs and metrics

To submit an Apache Spark application:

   1. Submit an Apache Spark application, with the associated environment, which was configured in the previous step. You can use any of the following ways to do so:
      - Run a notebook in Fabric. 
      - Submit an Apache Spark batch job through an Apache Spark job definition.
      - Run your Spark activities in your Pipelines.

   2. Go to the specified Log Analytics workspace, and then view the application metrics and logs when the Apache Spark application starts to run.

## Write custom application logs

You can use the Apache Log4j library to write custom logs. Here are examples for Scala and PySpark:

Scala Example:
```scala
%%spark
val logger = org.apache.log4j.LogManager.getLogger("com.contoso.LoggerExample")
logger.info("info message")
logger.warn("warn message")
logger.error("error message")
//log exception
try {
      1/0
 } catch {
      case e:Exception =>logger.warn("Exception", e)
}
// run job for task level metrics
val data = sc.parallelize(Seq(1,2,3,4)).toDF().count()
```

PySpark Example:

```python
%%pyspark
logger = sc._jvm.org.apache.log4j.LogManager.getLogger("com.contoso.PythonLoggerExample")
logger.info("info message")
logger.warn("warn message")
logger.error("error message")
```

## Query data with Kusto

To query Apache Spark events:

```kusto
SparkListenerEvent_CL
| where fabricWorkspaceId_g == "{FabricWorkspaceId}" and artifactId_g == "{ArtifactId}" and fabricLivyId_g == "{LivyId}"
| order by TimeGenerated desc
| limit 100 
```

To query Spark application driver and executor logs:

```kusto
SparkLoggingEvent_CL
| where fabricWorkspaceId_g == "{FabricWorkspaceId}" and artifactId_g == "{ArtifactId}" and fabricLivyId_g == "{LivyId}"
| order by TimeGenerated desc
| limit 100 
```

To query Apache Spark metrics:

```kusto
SparkMetrics_CL
| where fabricWorkspaceId_g == "{FabricWorkspaceId}" and artifactId_g == "{ArtifactId}" and fabricLivyId_g == "{LivyId}"
| where name_s endswith "jvm.total.used"
| summarize max(value_d) by bin(TimeGenerated, 30s), executorId_s
| order by TimeGenerated asc
```

## Available Apache Spark configurations

Using `spark.synaspe.diagnostic.emitter.*` prefix to configure the Log Analytics information.

| Configuration | Description |
| --- | --- |
| `spark.synapse.diagnostic.emitters`                                         | Required. The comma-separated destination names of diagnostic emitters. For example, `MyDest1`,`MyDest2`. |
| `spark.synapse.diagnostic.emitter.<destination>.type`                       | Required. Built-in destination type. To enable Azure Log Analytics destination, AzureLogAnalytics needs to be included in this field. |
| `spark.synapse.diagnostic.emitter.<destination>.categories`                 | Optional. The comma-separated selected log categories. Available values include `Log`, `EventLog`, `Metrics`. If not set, the default value is **all** categories. |
| `spark.synapse.diagnostic.emitter.<destination>.workspaceId`                | Required. The destination Log Analytics workspace ID. |
| `spark.synapse.diagnostic.emitter.<destination>.secret`                     | Optional. The workspace secret content. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault`            | Required if `.secre`t is not specified. The [Azure Key vault](/azure/key-vault/general/overview) URI where the secret is stored. |
| `park.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName`  | Required if `.secret.keyVault` is specified. The Azure Key vault secret name where the LA workspace secret is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match`     | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerApplicationStart,SparkListenerApplicationEnd`. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match`    | Optional. The comma-separated log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger`. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match`    | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used`.|
| `spark.fabric.pools.skipStarterPools`    | Required. This Spark property is used to force an on-demand Spark session. You should set the value to `true` when using the default pool in order to trigger the libraries to emit logs and metrics.|

Using `spark.synapse.logAnalytics.*` prefix to configure the Log Analytics information.

| Configuration name | Default value | Description |
| --- | --- | --- |
| `spark.synapse.logAnalytics.enabled` | false | To enable the Log Analytics sink for the Spark applications, true. Otherwise, false. |
| `spark.synapse.logAnalytics.workspaceId` | - | The destination Log Analytics workspace ID. |
| `spark.synapse.logAnalytics.secret` | - | The destination Log Analytics workspace secret. |
| `spark.synapse.logAnalytics.keyVault.name` | - | The Key Vault URI for the Log Analytics ID and key. |
| `spark.synapse.logAnalytics.keyVault.key.workspaceId` | SparkLogAnalyticsWorkspaceId | The Key Vault secret name for the Log Analytics workspace ID. |
| `spark.synapse.logAnalytics.keyVault.key.secret` | SparkLogAnalyticsSecret | The Key Vault secret name for the Log Analytics workspace. |
| `spark.synapse.logAnalytics.uriSuffix` | ods.opinsights.azure.com | The destination Log Analytics workspace [URI suffix](/azure/azure-monitor/logs/data-collector-api#request-uri). If your workspace isn't in Azure global, you need to update the URI suffix according to the respective cloud. |
| `spark.synapse.logAnalytics.filter.eventName.match` | - | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerJobStart,SparkListenerJobEnd`. |
| `spark.synapse.logAnalytics.filter.loggerName.match` | - | Optional. The comma-separated log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger`. |
| `spark.synapse.logAnalytics.filter.metricName.match` | - | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used`. |
| `spark.fabric.pools.skipStarterPools`    | true | Required. This Spark property is used to force an on-demand Spark session.|

> [!NOTE]
>
>  - For Microsoft Azure operated by 21Vianet, the `spark.synapse.logAnalytics.uriSuffix` parameter should `be ods.opinsights.azure.cn`.
>  - For Azure Government, the `spark.synapse.logAnalytics.uriSuffix` parameter should be `ods.opinsights.azure.us`.
>  - For any cloud except Azure, the `spark.synapse.logAnalytics.keyVault.name` parameter should be the fully qualified domain name (FQDN) of the Key Vault. For example, `AZURE_KEY_VAULT_NAME.vault.usgovcloudapi.net` for AzureUSGovernment.

## Next steps

- [Create Apache Spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Microsoft Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Microsoft Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)