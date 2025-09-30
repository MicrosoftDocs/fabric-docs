---
title: Monitor Apache Spark applications with Azure Log Analytics
description: Learn how to enable the Fabric connector for collecting and sending the Apache Spark application metrics and logs to your Log Analytics workspace.
author: eric-urban
ms.author: eur
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 08/22/2024
ms.custom: references_regions
---
# Monitor Apache Spark applications with Azure log analytics (preview)

The Fabric Apache Spark diagnostic emitter extension is a library that enables Apache Spark applications to emit logs, event logs, and metrics to multiple destinations, including Azure log analytics, Azure storage, and Azure event hubs.

In this tutorial, you learn how to configure and emit Spark logs and metrics to Log analytics in Fabric. Once configured, you are able to collect and analyze Apache Spark application metrics and logs in your [Log analytics workspace](/azure/azure-monitor/logs/quick-create-workspace). 

## Configure workspace information

Follow these steps to configure the necessary information in Fabric.

### Step 1: Create a Log Analytics workspace

Consult one of the following resources to create this workspace:
- [Create a workspace in the Azure portal.](/azure/azure-monitor/logs/quick-create-workspace)
- [Create a workspace with Azure CLI.](/azure/azure-monitor/logs/resource-manager-workspace)
- [Create and configure a workspace in Azure Monitor by using PowerShell.](/azure/azure-monitor/logs/quick-create-workspace#create-a-workspace)


### Step 2: Create a Fabric environment artifact with Apache Spark configuration
To configure Spark, create a Fabric Environment Artifact and choose one of the following options:

#### Option 1: Configure with Log Analytics Workspace ID and Key

1. Create a Fabric Environment Artifact in Fabric
2. Add the following **Spark properties** with the appropriate values to the environment artifact, or select **Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/log_analytics_spark_properties_option_1.yml), which already containing the required properties.  

   - `<EMITTER_NAME>`: The name for emmiter.
   - `<LOG_ANALYTICS_WORKSPACE_ID>`: Log Analytics workspace ID.
   - `<LOG_ANALYTICS_WORKSPACE_KEY>`: Log Analytics key. To find this, in the Azure portal, go to **Azure Log Analytics workspace** > **Agents** > **Primary key**.

   ```properties
   spark.synapse.diagnostic.emitters: <EMITTER_NAME>
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.type: "AzureLogAnalytics"
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.categories: "Log,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.secret: <LOG_ANALYTICS_WORKSPACE_KEY>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Alternatively, to apply the same configuration as Azure Synapse, use the following properties, or select **Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/log_analytics_spark_properties_option_1_synapse.yml).

   ```properties
   spark.synapse.logAnalytics.enabled: "true"
   spark.synapse.logAnalytics.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
   spark.synapse.logAnalytics.secret: <LOG_ANALYTICS_WORKSPACE_KEY>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

3. Save and publish changes.

#### Option 2: Configure with Azure Key Vault

> [!NOTE]
>
> You need to grant read secret permission to the users who will submit Apache Spark applications. For more information, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](/azure/key-vault/general/rbac-guide).

To configure Azure Key Vault to store the workspace key, follow these steps:

1. Go to your Key Vault in the Azure portal.
2. On the settings page for the key vault, select **Secrets**, then **Generate/Import**.
3. On the **Create a secret** screen, Enter the following values:
   - **Name**: Enter a name for the secret. For the default, enter `SparkLogAnalyticsSecret`.
   - **Value**: Enter the `<LOG_ANALYTICS_WORKSPACE_KEY>` for the secret.
   - Leave the other values to their defaults. Then select **Create**.
4. Create a Fabric Environment Artifact in Fabric
5. Add the following **Spark properties** with the corresponding values to the environment artifact, or Select **Add from .yml** on the ribbon in the Environment artifact to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/log_analytics_spark_properties_option_2.yml) which includes following Spark properties.

   - `<EMITTER_NAME>`: The name for emmiter.
   - `<LOG_ANALYTICS_WORKSPACE_ID>`: The Log Analytics workspace ID.
   - `<AZURE_KEY_VAULT_URI>`: The key vault uri that you configured.
   - `<AZURE_KEY_VAULT_SECRET_KEY_NAME>` (optional): The secret name in the key vault for the workspace key. The default is `SparkLogAnalyticsSecret`.

   ```properties
   // Spark properties for EMITTER_NAME
   spark.synapse.diagnostic.emitters <EMITTER_NAME>
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.type: "AzureLogAnalytics"
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.categories: "Log,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.secret.keyVault: <AZURE_KEY_VAULT_URI>
   spark.synapse.diagnostic.emitter.<EMITTER_NAME>.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Alternatively, to apply the same configuration as Azure Synapse, use the following properties, or select Add from .yml in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/log_analytics_spark_properties_option_2_synapse.yml).

   ```properties
   spark.synapse.logAnalytics.enabled: "true"
   spark.synapse.logAnalytics.workspaceId: <LOG_ANALYTICS_WORKSPACE_ID>
   spark.synapse.logAnalytics.keyVault.name: <AZURE_KEY_VAULT_URI>
   spark.synapse.logAnalytics.keyVault.key.secret: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   > [!NOTE]
   >
   > You can also store the workspace ID in Key Vault. Set the secret name to `SparkLogAnalyticsWorkspaceId`, or use the configuration `spark.synapse.logAnalytics.keyVault.key.workspaceId` to specify the workspace ID secret name.

 6. Save and publish changes.

### Step 3: Attach the environment artifact to notebooks or spark job definitions, or set it as the workspace default

   > [!NOTE]
   >
   > Only workspace admins can designate an environment as the default for a workspace.
   >
   > Once set, it becomes the default environment for all notebooks and Spark job definitions within the workspace. For more details, see [Fabric Workspace Settings](../fundamentals/workspaces.md).

**To attach the environment to notebooks or Spark job definitions:**
1. Navigate to your notebook or Spark job definition in Fabric.
2. Select the **Environment** menu on the Home tab and select the configured environment.
3. The configuration will be applied after starting a **Spark session**.

**To set the environment as the workspace default:**

1. Navigate to Workspace settings in Fabric.
2. Find the **Spark settings** in your Workspace settings **(Workspace setting -> Data Engineering/Science -> Spark settings)**
3. Select **Environment** tab and choose the environment with diagnostics spark properties configured, and click **Save**.

## Submit an Apache Spark application and view the logs and metrics

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

## Create and manage alerts

Users can query to evaluate metrics and logs at a set frequency, and fire an alert based on the results. For more information, see [Create, view, and manage log alerts by using Azure Monitor](/azure/azure-monitor/alerts/alerts-create-metric-alert-rule).

## Fabric workspaces with managed virtual network
Azure Log Analytics can't currently be selected as a destination for Spark logs and metrics emission in a managed virtual network because the managed private endpoint doesn't support Log Analytics as a data source. 

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

## Frequently Asked Questions

1. **Why is my Log Analytics not receiving logs or generating the Customer table?**
   
   If your Log Analytics workspace is not receiving logs or the Customer table is not being generated, please troubleshoot with the following steps:

   1) **Verify Log Analytics Configuration**: Ensure that the Log Analytics workspace information is properly configured in your Spark application. To verify the configuration, navigate to the Spark UI or Spark History Server, go to the "Environment" tab, and review the settings under "Spark Properties".
      
   2) **Check Permissions**: 

      - Confirm that Log Analytics has the necessary write permissions.
      - If KeyVault is involved, ensure that the KeyVault read permissions are properly assigned to the relevant service or user.
   
   3) **Inspect Data Limits**: Fabric sends log data to Azure Monitor by using the HTTP Data Collector API. [The data posted to the Azure Monitor Data collection API is subject to certain constraints](/azure/azure-monitor/logs/data-collector-api#data-limits):

      - Maximum of 30 MB per post to Azure Monitor Data Collector API. This is a size limit for a single post. If the data from a single post exceeds 30 MB, you should split the data into smaller sized chunks and send them concurrently.
      - Maximum of 32 KB for field values. If the field value is greater than 32 KB, the data is truncated.
      - Recommended maximum of 50 fields for a given type. This is a practical limit from a usability and search experience perspective.
      - Tables in Log Analytics workspaces support only up to 500 columns.
      - Maximum of 45 characters for column names.

2. **How can I confirm that Log Analytics permissions are correctly configured?**

   To ensure Log Analytics can receive logs, verify the following permissions:

   1) **Log Analytics Write Permissions**:
      - Log in to the Azure portal and navigate to your Log Analytics workspace.
      - In the "Access control (IAM)" section, confirm that your user, service principal, or application has been assigned the "Log Analytics Contributor" or "Contributor" role.

   2) **KeyVault Read Permissions (if applicable)**:
      - If logs involve KeyVault, go to the KeyVault's "Access policies" or "Access control (IAM)" section.
      - Ensure the relevant user or service principal has read permissions, such as the "Key Vault Reader" role. If permissions are misconfigured, contact your Azure administrator to adjust the role assignments and wait for the permissions to sync (this may take a few minutes).

3. **Why does starting a Spark session become slow after configuring these spark properties?**

   This occurs because you have configured spark.fabric.pools.skipStarterPool: true, which skips the Starter Pool (a type of Live Pool) and instead uses an On-Demand Pool to start the Spark session. Starting a spark session in the On-Demand Pool typically takes around 3 minutes to create and initialize.

   The reason is that the diagnostic library requires specific configurations to be applied at Spark session startup a process only supported by On-Demand Pools, as they are dynamically created during startup. In contrast, Live Pool sessions are pre-started and cannot apply these configurations during initialization. For more details on Fabric Spark compute, please refer [Apache Spark compute for Data Engineering and Data Science](spark-compute.md).

## Next steps

- [Create Apache Spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Microsoft Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Microsoft Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)