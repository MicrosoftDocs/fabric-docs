---
title: Collect your Apache Spark applications logs and metrics using Azure Event Hubs 
description: In this tutorial, you learn how to use the Fabric Apache Spark diagnostic emitter extension to emit Apache Spark applications logs, event logs, and metrics to your Azure Event Hubs.
author: eric-urban
ms.author: eur
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 06/05/2025
---

# Collect Apache Spark applications logs and metrics using Azure Event Hubs (preview)

The Fabric Apache Spark diagnostic emitter extension is a library that enables Apache Spark applications to emit logs, event logs, and metrics to various destinations, including Azure Log Analytics, Azure Storage, and Azure Event Hubs. In this tutorial, you learn how to use the Fabric Apache Spark diagnostic emitter extension to send Apache Spark application logs, event logs, and metrics to your Azure Event Hubs.

## Collect logs and metrics to Azure Event Hubs

### Step 1: Create an Azure Event Hubs Instance

To collect diagnostic logs and metrics, you can use an existing Azure Event Hubs instance. If you don't have one, you can [create an event hub](/azure/event-hubs/event-hubs-create).

### Step 2: Create a Fabric Environment Artifact with Apache Spark Configuration
 
#### Option 1: Configure with Azure Event Hubs Connection String

1. Create a Fabric Environment Artifact in Fabric
2. Add the following **Spark properties** with the appropriate values to the environment artifact, or **select Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/eventhub_spark_properties_option_1.yml) which already containing the following properties.  

   ```properties
   spark.synapse.diagnostic.emitters: MyEventHub
   spark.synapse.diagnostic.emitter.MyEventHub.type: "AzureEventHub"
   spark.synapse.diagnostic.emitter.MyEventHub.categories: "Log,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.MyEventHub.secret: <connection-string>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Fill in the `<connection-string>` parameters in the configuration file. For more information, see [Azure Event Hubs configurations](#available-configurations).

#### Option 2: Configure with Azure Key Vault

> [!NOTE]
> Ensure that users who submit Apache Spark applications are granted read secret permissions. For more information, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](/azure/key-vault/general/rbac-guide).

To configure Azure Key Vault for storing the workspace key:

1. Create and go to your key vault in the Azure portal.
2. On the settings page for the key vault, select **Secrets**, then **Generate/Import**.
3. On the **Create a secret** screen, choose the following values:
   - **Name**: Enter a name for the secret.
   - **Value**: Enter the `<connection-string>` for the secret.
   - Leave the other values to their defaults. Then select **Create**.
4. Create a Fabric Environment Artifact in Fabric.
5. Add the following **Spark properties**. Or select **Add from .yml** on the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/eventhub_spark_properties_option_2.yml), which includes following Spark properties.

   ```properties
   spark.synapse.diagnostic.emitters: MyEventHub
   spark.synapse.diagnostic.emitter.MyEventHub.type: "AzureEventHub"
   spark.synapse.diagnostic.emitter.MyEventHub.categories: "Log,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.MyEventHub.secret.keyVault: <AZURE_KEY_VAULT_URI>
   spark.synapse.diagnostic.emitter.MyEventHub.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Fill in the following parameters in the configuration file: `<AZURE_KEY_VAULT_URI>`, `<AZURE_KEY_VAULT_SECRET_KEY_NAME>`. For more details on these parameters, refer to [Azure Event Hubs configurations](#available-configurations).

6. Save and publish changes.

### Step 3: Attach the Environment Artifact to Notebooks or Spark Job Definitions, or Set It as the Workspace Default

   > [!NOTE]
   > * Only workspace admins can designate an environment as the default for a workspace.
   > * Once set, it becomes the default environment for all notebooks and Spark job definitions within the workspace. For more information, see [Fabric Workspace Settings](../fundamentals/workspaces.md).

**To attach the environment to Notebooks or Spark job definitions**:

1. Navigate to the specific notebook or Spark job definition in Fabric.
2. Select the **Environment** menu on the Home tab and select the environment with the configured diagnostics Spark properties.
3. The configuration is applied when you start a **Spark session**.

**To set the environment as the workspace default**:

1. Navigate to Workspace Settings in Fabric.
2. Find the **Spark settings** in your Workspace settings **(Workspace setting -> Data Engineering/Science -> Spark settings)**.
3. Select **Environment** tab and choose the environment with diagnostics spark properties configured, and select **Save**.

## Available configurations

| Configuration | Description |
|--|--|
| `spark.synapse.diagnostic.emitters` | Required. The comma-separated destination names of diagnostic emitters. |
| `spark.synapse.diagnostic.emitter.<destination>.type` | Required. Built-in destination type. To enable Azure Event Hubs destination, the value should be `AzureEventHub`. |
| `spark.synapse.diagnostic.emitter.<destination>.categories` | Optional. The comma-separated selected log categories. Available values include `DriverLog`, `ExecutorLog`, `EventLog`, `Metrics`. If not set, the default value is **all** categories. |
| `spark.synapse.diagnostic.emitter.<destination>.secret` | Optional. The Azure Event Hubs instance connection string. This field should match this pattern `Endpoint=sb://<FQDN>/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KeyValue>;EntityPath=<PathName>` |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault` | Required if `.secret` isn't specified. The [Azure Key vault](/azure/key-vault/general/overview) uri where the secret (connection string) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName` | Required if `.secret.keyVault` is specified. The Azure Key vault secret name where the secret (connection string) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match` | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerApplicationStart,SparkListenerApplicationEnd` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match` | Optional. The comma-separated Log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match` | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used` |
| `spark.fabric.pools.skipStarterPools` | Required. This Spark property is used to force an on-demand Spark session. You should set the value to true when using the default pool in order to trigger the libraries to emit logs and metrics. |

> [!NOTE]
> The Azure EventHub instance connection string should always contain the `EntityPath`, which is the name of the Azure Event Hubs instance.

## Log data sample

Here's a sample log record in JSON format:

```json
{
  "timestamp": "2025-02-28T09:13:57.978Z",
  "category": "Log|EventLog|Metrics",
  "fabricLivyId": "<fabric-livy-id>",
  "applicationId": "<application-id>",
  "applicationName": "<application-name>",
  "executorId": "<driver-or-executor-id>",
  "userId": "<the-submitter-user-id>",
  "fabricTenantId": "<my-fabric-tenant-id>",
  "capacityId": "<my-fabric-capacity-id>",
  "artifactType": "SynapseNotebook|SparkJobDefinition",
  "artifactId": "<my-fabric-artifact-id>",
  "fabricWorkspaceId": "<my-fabric-workspace-id>",
  "fabricEnvId": "<my-fabric-environment-id>",
  "executorMin": "<executor-min>",
  "executorMax": "<executor-max>",
  "isHighConcurrencyEnabled": "true|false",
  "properties": {
    // The message properties of logs, events and metrics.
    "timestamp": "2025-02-28T09:13:57.941Z",
    "message": "ApplicationAttemptId: appattempt_1740734011890_0001_000001",
    "logger_name": "org.apache.spark.deploy.yarn.ApplicationMaster",
    "level": "INFO",
    "thread_name": "main"
    // ...
  }
}
```

Once diagnostics are emitted to Azure Event Hub, you can use that [Event Hub as a source in a Fabric Event Stream](../real-time-intelligence/event-streams/add-source-azure-event-hubs.md?pivots=enhanced-capabilities) to process or route the data.

## Fabric workspaces with Managed virtual network

Create a managed private endpoint for the target Azure Event Hubs. For detailed instructions, refer to [Create and use managed private endpoints in Microsoft Fabric - Microsoft Fabric](../security/security-managed-private-endpoints-create.md).

Once the managed private endpoint is approved, users can begin emitting logs and metrics to the target Azure Event Hubs.

## Next steps

- [Create Apache Spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Microsoft Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Microsoft Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)



