---
title: Collect your Apache Spark applications logs and metrics using Azure Event Hubs 
description: Learn how to use Fabric Apache Spark Diagnostic Emitter to route Apache Spark logs, event logs, and metrics to Azure Event Hubs.
ms.reviewer: jejiang
ms.topic: how-to
ms.date: 03/18/2026
---

# Collect Apache Spark applications logs and metrics using Azure Event Hubs

This article describes the Azure Event Hubs destination for Fabric Apache Spark Diagnostic Emitter.

Fabric Apache Spark Diagnostic Emitter provides a common configuration model for Spark diagnostics across destinations. In this article, you configure that model to route Apache Spark logs, event logs, and metrics to Azure Event Hubs.

For emitter architecture and destination selection guidance, see [Fabric Apache Spark Diagnostic Emitter overview](spark-diagnostic-emitter-overview.md).

## Collect logs and metrics to Azure Event Hubs

### Step 1: Create an Azure Event Hubs Instance

To collect diagnostic logs and metrics, you can use an existing Azure Event Hubs instance. If you don't have one, you can [create an event hub](/azure/event-hubs/event-hubs-create).

### Step 2: Create a Fabric Environment Artifact with Apache Spark Configuration
 
#### Option 1: Configure with Azure Event Hubs Connection String

1. Create a Fabric Environment Artifact in Fabric
1. Add the following **Spark properties** with the appropriate values to the environment artifact, or **select Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/eventhub_spark_properties_option_1.yml) which already containing the following properties.  

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
1. On the settings page for the key vault, select **Secrets**, then **Generate/Import**.
1. On the **Create a secret** screen, choose the following values:
   - **Name**: Enter a name for the secret.
   - **Value**: Enter the `<connection-string>` for the secret.
   - Leave the other values to their defaults. Then select **Create**.
1. Create a Fabric Environment Artifact in Fabric.
1. Add the following **Spark properties**. Or select **Add from .yml** on the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/eventhub_spark_properties_option_2.yml), which includes following Spark properties.

   ```properties
   spark.synapse.diagnostic.emitters: MyEventHub
   spark.synapse.diagnostic.emitter.MyEventHub.type: "AzureEventHub"
   spark.synapse.diagnostic.emitter.MyEventHub.categories: "Log,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.MyEventHub.secret.keyVault: <AZURE_KEY_VAULT_URI>
   spark.synapse.diagnostic.emitter.MyEventHub.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Fill in the following parameters in the configuration file: `<AZURE_KEY_VAULT_URI>`, `<AZURE_KEY_VAULT_SECRET_KEY_NAME>`. For more details on these parameters, refer to [Azure Event Hubs configurations](#available-configurations).

1. Save and publish changes.

#### Option 3: Configure Using Certificate Authentication

1. Register an application

   1. Sign in to the [Azure portal](https://portal.azure.com/) and go to [App registrations](/entra/identity-platform/quickstart-register-app#register-an-application).
	
   1. Create a new app registration for sending logs and metrics to Azure Event Hubs.
	
	:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-event-hub\create-a-new-app-registration.png" alt-text="Screenshot showing create a new app registration.":::

2. Generate a certificate in Key Vault

   1. Navigate to Key Vault.
	
   1. Expand the **Object**, and select the **Certificates**.
	
   1. Click on **Generate/Import**. 
	
	:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-event-hub\generate-a-new-certificate.png" alt-text="Screenshot showing generate a new certificate for app.":::

3. Trust the certificate in the application 

   1. Go to the App registration created in 1 -> **Manage** -> **Manifest**. 
	
   1. Append the certificate details to the manifest file to establish trust. This enables subject-based certificate trust for the service principal.
	
      ```
	   "trustedCertificateSubjects": [ 
	      { 
	         "authorityId": "00000000-0000-0000-0000-000000000001", 
	         "subjectName": "Your-Subject-of-Certificate", 
	         "revokedCertificateIdentifiers": [] 
	      } 
	      ] 
	   ```
	
	:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-event-hub\trust-the-certificate.png" alt-text="Screenshot showing trust the certificate in the application.":::

4. Assign **Azure Event Hubs Data Sender** Role

   1. In Azure Event Hubs, navigate to Access control (IAM).

   1. Assign the Azure Event Hubs data sender role to the application (service principal).
	
	:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-event-hub\assign-azure-event-hubs-data-sender-role.png" alt-text="Screenshot showing assign Azure event hubs data sender role.":::

5. Configure Azure Key Vault access permissions

   1. In the Azure portal, navigate to the target Azure Key Vault.

   2. Under Access control (IAM), assign the **Key Vault Certificates User role** to the application (service principal) used by the Spark diagnostic emitter.

:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-event-hub\assign-key-vault-certificates-user-role.png" alt-text="Screenshot showing assign key vault certificates user role.":::

6. Create a Fabric Environment Artifact in Fabric, and add the following **Spark properties** with the appropriate values to the environment artifact.

- `<EMITTER_NAME>`: The name for the emitter.
- `<CERTIFICATE_NAME>`: The certificate name that you generated in the key vault.
- `<KEY_VAULT_URL>`: The Azure Key Vault uri (e.g., `https://{keyvault-name}.vault.azure.net/`).
- `<EVENT_HUB_HOST_NAME>`: The fully qualified domain name of the Event Hubs namespace (e.g., `<namespace>.servicebus.windows.net`).
- `<EVENT_HUB_NAME>`: The name of the Event Hub instance to send diagnostic data to.
- `<SERVICE_PRINCIPAL_TENANT_ID>`: The service principal tenant ID, you can find it in App registrations -> your app name -> Overview -> Directory (tenant) ID.
- `<SERVICE_PRINCIPAL_CLIENT_ID>`: The service principal client ID, you can find it in App registrations -> your app name -> Overview -> Application (client) ID.

   ```Parameters
   "spark.synapse.diagnostic.emitters": "<EMITTER_NAME>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.type": "AzureEventHub",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.categories": "DriverLog,ExecutorLog,EventLog,Metrics",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.hostName": "<EVENT_HUB_HOST_NAME>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.entityPath": "<EVENT_HUB_NAME>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.certificate.keyVault": "<KEY_VAULT_URL>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.certificate.keyVault.certificateName": "<CERTIFICATE_NAME>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.tenantId": "<SERVICE_PRINCIPAL_TENANT_ID>",
   "spark.synapse.diagnostic.emitter.<EMITTER_NAME>.clientId": "<SERVICE_PRINCIPAL_CLIENT_ID>",
   "spark.fabric.pools.skipStarterPools": "true"
   ```

### Step 3: Attach the Environment Artifact to Notebooks or Spark Job Definitions, or Set It as the Workspace Default

   > [!NOTE]
   > * Only workspace admins can designate an environment as the default for a workspace.
   > * Once set, it becomes the default environment for all notebooks and Spark job definitions within the workspace. For more information, see [Fabric Workspace Settings](../fundamentals/workspaces.md).

**To attach the environment to Notebooks or Spark job definitions**:

1. Navigate to the specific notebook or Spark job definition in Fabric.
1. Select the **Environment** menu on the Home tab and select the environment with the configured diagnostics Spark properties.
1. The configuration is applied when you start a **Spark session**.

**To set the environment as the workspace default**:

1. Navigate to Workspace Settings in Fabric.
1. Find **Spark settings** in workspace settings (**Workspace setting** > **Data Engineering/Science** > **Spark settings**).
1. Select **Environment** tab and choose the environment with diagnostics spark properties configured, and select **Save**.

### Step 4. Submit an Apache Spark application and view the logs and metrics
	
You can use the Apache Log4j library to write custom logs.
	
Example for Scala:
	
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
	
Example for PySpark:
	
```python
	%%pyspark
	logger = sc._jvm.org.apache.log4j.LogManager.getLogger("com.contoso.PythonLoggerExample")
	logger.info("info message")
	logger.warn("warn message")
	logger.error("error message")
```

## Available configurations

| Configuration | Description |
|---|---|
| `spark.synapse.diagnostic.emitters` | Required. The comma-separated destination names of diagnostic emitters. For example, `MyDest1,MyDest2` |
| `spark.synapse.diagnostic.emitter.<destination>.type` | Required. Built-in destination type. To enable Azure Event Hubs destination, the value should be `AzureEventHub`. |
| `spark.synapse.diagnostic.emitter.<destination>.categories` | Optional. The comma-separated selected log categories. Available values include `DriverLog`, `ExecutorLog`, `EventLog`, `Metrics`. If not set, the default value is all categories. |
| `spark.synapse.diagnostic.emitter.<destination>.secret` | Optional. The Azure Event Hubs connection string. Required if not using certificate-based authentication and `.secret.keyVault` is not specified. This field should match the pattern `Endpoint=sb://<FQDN>/;SharedAccessKeyName=<KeyName>;SharedAccessKey=<KeyValue>;EntityPath=<PathName>`. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault` | Required if using connection string authentication and `.secret` is not specified. The Azure Key Vault uri where the secret (connection string) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName` | Required if `.secret.keyVault` is specified. The Azure Key Vault secret name where the secret (connection string) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.hostName` | Required if using certificate-based authentication. The fully qualified domain name of the Event Hubs namespace. For example, `<namespace>.servicebus.windows.net`. |
| `spark.synapse.diagnostic.emitter.<destination>.entityPath` | Required if using certificate-based authentication. The name of the Event Hub instance to send diagnostic data to. |
| `spark.synapse.diagnostic.emitter.<destination>.tenantId` | Required if using certificate-based authentication. The Azure Active Directory tenant ID of the Service Principal. |
| `spark.synapse.diagnostic.emitter.<destination>.clientId` | Required if using certificate-based authentication. The application (client) ID of the Service Principal. |
| `spark.synapse.diagnostic.emitter.<destination>.certificate.keyVault` | Required if using certificate-based authentication. The Azure Key Vault URL where the certificate is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.certificate.keyVault.certificateName` | Required if using certificate-based authentication. The certificate name stored in Azure Key Vault, used for Service Principal certificate-based authentication. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match` | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerApplicationStart,SparkListenerApplicationEnd` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match` | Optional. The comma-separated Log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match` | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used` |
| `spark.fabric.pools.skipStarterPools` | Required. This Spark property is used to force an on-demand Spark session. You should set the value to `true` when using the default pool in order to trigger the libraries to emit logs and metrics. |

> [!NOTE]
> The Azure Event Hubs instance connection string should always contain the `EntityPath`, which is the name of the Azure Event Hubs instance.

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

Once diagnostics are emitted to Azure Event Hubs, you can use that [event hub as a source in a Fabric eventstream](../real-time-intelligence/event-streams/add-source-azure-event-hubs.md?pivots=enhanced-capabilities) to process or route the data.

## Fabric workspaces with Managed virtual network

Create a managed private endpoint for the target Azure Event Hubs. For detailed instructions, refer to [Create and use managed private endpoints in Microsoft Fabric - Microsoft Fabric](../security/security-managed-private-endpoints-create.md).

Once the managed private endpoint is approved, users can begin emitting logs and metrics to the target Azure Event Hubs.

## Next steps

- [Create Apache Spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Microsoft Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Microsoft Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)



