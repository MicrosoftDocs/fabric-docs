---
title: Collect your Apache Spark applications logs and metrics using Azure Storage account
description: Learn how to use Fabric Apache Spark Diagnostic Emitter to route Apache Spark logs, event logs, and metrics to Azure Blob Storage.
ms.reviewer: jejiang
ms.topic: tutorial
ms.date: 03/18/2026
---

# Collect your Apache Spark applications logs and metrics using Azure Storage account

This article describes the Azure Blob Storage destination for Fabric Apache Spark Diagnostic Emitter.

Fabric Apache Spark Diagnostic Emitter provides a common configuration model for Spark diagnostics across destinations. In this tutorial, you configure that model to route Apache Spark logs, event logs, and metrics to Azure Blob Storage.

For emitter architecture and destination selection guidance, see [Fabric Apache Spark Diagnostic Emitter overview](spark-diagnostic-emitter-overview.md).

## Collect logs and metrics to storage account

### Step 1: Create a storage account
To collect diagnostic logs and metrics, you can use an existing Azure Storage account. If you don't have one, you can [create an Azure blob storage account](/azure/storage/common/storage-account-create) or [create a storage account to use with Azure Data Lake Storage Gen2](/azure/storage/blobs/create-data-lake-storage-account).


### Step 2: Create a Fabric Environment Item with Apache Spark Configuration

#### Option 1: Configure with Azure Storage URI and Access key   

1. Create an environment item in Fabric
1. Add the following **Spark properties** with the appropriate values to the environment item, or select **Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/azure_storage_spark_property_option_1.yml), which already containing the following properties.  

   ```properties
   spark.synapse.diagnostic.emitters: MyStorageBlob
   spark.synapse.diagnostic.emitter.MyStorageBlob.type: "AzureStorage"
   spark.synapse.diagnostic.emitter.MyStorageBlob.categories: "DriverLog,ExecutorLog,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.MyStorageBlob.uri:  "https://<my-blob-storage>.blob.core.windows.net/<container-name>/<folder-name>"
   spark.synapse.diagnostic.emitter.MyStorageBlob.auth: "AccessKey"
   spark.synapse.diagnostic.emitter.MyStorageBlob.secret: <storage-access-key>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Fill in the following parameters in the configuration file: `<my-blob-storage>`, `<container-name>`, `<folder-name>`, `<storage-access-key>`. For more details on these parameters, see [Azure Storage configurations](#available-configurations).

#### Option 2: Configure with Azure Key Vault

> [!NOTE]
>
> Ensure that users who submit Apache Spark applications are granted read secret permissions. For more information, see [Provide access to Key Vault keys, certificates, and secrets with an Azure role-based access control](/azure/key-vault/general/rbac-guide).

To configure Azure Key Vault for storing the workspace key:

1. Create and go to your key vault in the Azure portal.
1. On the settings page for the key vault, select **Secrets**, then **Generate/Import**.
1. On the **Create a secret** screen, choose the following values:
   - **Name**: Enter a name for the secret.
   - **Value**: Enter the `<storage-access-key>` for the secret.
   - Leave the other values to their defaults. Then select **Create**.
1. Create an environment item in Fabric.
1. Add the following **Spark properties**. Or select **Add from .yml** on the ribbon to upload the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/azure_storage_spark_property_option_2.yml) which includes following Spark properties.

   ```properties
   spark.synapse.diagnostic.emitters: <MyStorageBlob>
   spark.synapse.diagnostic.emitter.MyStorageBlob.type: "AzureStorage"
   spark.synapse.diagnostic.emitter.MyStorageBlob.categories: "DriverLog,ExecutorLog,EventLog,Metrics"
   spark.synapse.diagnostic.emitter.MyStorageBlob.uri:  "https://<my-blob-storage>.blob.core.windows.net/<container-name>/<folder-name>"
   spark.synapse.diagnostic.emitter.MyStorageBlob.auth: "AccessKey"
   spark.synapse.diagnostic.emitter.MyStorageBlob.secret.keyVault: <AZURE_KEY_VAULT_URI>
   spark.synapse.diagnostic.emitter.MyStorageBlob.secret.keyVault.secretName: <AZURE_KEY_VAULT_SECRET_KEY_NAME>
   spark.fabric.pools.skipStarterPools: "true" //Add this Spark property when using the default pool.
   ```

   Fill in the following parameters in the configuration file: `<my-blob-storage>`, `<container-name>`, `<folder-name>`,  `<AZURE_KEY_VAULT_URI>`, `<AZURE_KEY_VAULT_SECRET_KEY_NAME>`. For more details on these parameters, see [Azure Storage configurations](#available-configurations).

1. Save and publish changes.

#### Option 3: Configure with service principal certificate authentication 

Use this option to authenticate to Azure Storage with a Microsoft Entra service principal and a certificate stored in Azure Key Vault. 

Before configuring the Spark properties: 

- Create or import a certificate in Azure Key Vault. The certificate must contain an exportable private key. 
- Download only the public certificate in CER or PEM format, and upload it to the Microsoft Entra app registration under Certificates & secrets > Certificates. 
- Assign the Storage Blob Data Contributor role to the service principal on the target storage account or container. 
- Assign the Key Vault Certificate User role on the Azure Key Vault to the signed-in Fabric user who starts the Spark session. 

>[!IMPORTANT]
>Certificate retrieval and Storage access use different identities. The signed-in Fabric user retrieves the certificate and its private key from Azure Key Vault. The service principal uses the certificate to authenticate and write diagnostic data to Azure Storage. Granting Key Vault access only to the service principal isn't sufficient. 

Add the following Spark properties to the Fabric environment:

   ```properties
spark.synapse.diagnostic.emitters: MyStorageBlob 
spark.synapse.diagnostic.emitter.MyStorageBlob.type: "AzureStorage" 
spark.synapse.diagnostic.emitter.MyStorageBlob.categories: "DriverLog,ExecutorLog,EventLog,Metrics" 
spark.synapse.diagnostic.emitter.MyStorageBlob.uri: "https://<STORAGE_ACCOUNT>.blob.core.windows.net/<CONTAINER>/<FOLDER>" 
spark.synapse.diagnostic.emitter.MyStorageBlob.auth: "ServicePrincipalCert" 
spark.synapse.diagnostic.emitter.MyStorageBlob.certificate.keyVault.certificateName: "<CERTIFICATE_NAME>" 
spark.synapse.diagnostic.emitter.MyStorageBlob.certificate.keyVault: "https://<KEY_VAULT_NAME>.vault.azure.net/" 
spark.synapse.diagnostic.emitter.MyStorageBlob.tenantId: "<SERVICE_PRINCIPAL_TENANT_ID>" 
spark.synapse.diagnostic.emitter.MyStorageBlob.clientId: "<SERVICE_PRINCIPAL_CLIENT_ID>" 
spark.fabric.pools.skipStarterPools: "true" 
   ```

The uri property identifies the destination Blob Storage container and optional folder. The certificate name must exactly match the certificate name in Azure Key Vault. 

### Step 3: Attach the environment item to notebooks or spark job definitions, or set it as the workspace default

   > [!NOTE]
   >
   > Only workspace admins can designate an environment as the default for a workspace.
   >
   > Once set, it becomes the default environment for all notebooks and Spark job definitions within the workspace. For more details, see [Fabric Workspace Settings](../fundamentals/workspaces.md).

   **To attach the environment to Notebooks or Spark job definitions**:

   1. Navigate to the specific notebook or Spark job definition in Fabric.
   1. Select the **Environment** menu on the Home tab and select the environment with the configured diagnostics Spark properties.
   1. The configuration is applied when you start a **Spark session**.

   **To set the environment as the workspace default**:

   1. Navigate to workspace settings in Fabric.
   1. Find **Spark settings** in workspace settings (**Workspace setting** > **Data Engineering/Science** > **Spark settings**).
   1. Select **Environment** tab and choose the environment with diagnostics spark properties configured, and click **Save**.

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

### Step 5: View the logs files in Azure storage account

After submitting a job to the configured Spark session, you can view the logs and metrics files in the destination storage account. The logs are stored in corresponding paths based on different applications, identified by `<workspaceId>.<fabricLivyId>`. All log files are in JSON Lines format (also known as newline-delimited JSON or ndjson), which is convenient for data processing.

## Available configurations

| Configuration | Description |
|---|---|
| `spark.synapse.diagnostic.emitters` | Required. The comma-separated destination names of diagnostic emitters. For example, `MyDest1,MyDest2` |
| `spark.synapse.diagnostic.emitter.<destination>.type` | Required. Built-in destination type. To enable Azure storage destination, `AzureStorage` needs to be included in this field. |
| `spark.synapse.diagnostic.emitter.<destination>.categories` | Optional. The comma-separated selected log categories. Available values include `DriverLog`, `ExecutorLog`, `EventLog`, `Metrics`. If not set, the default value is all categories. |
| `spark.synapse.diagnostic.emitter.<destination>.auth` | Required. Set this value to ServicePrincipalCert when using Microsoft Entra service principal certificate authentication. |
| `spark.synapse.diagnostic.emitter.<destination>.uri` |Required. The destination Blob Storage container and optional folder URI. For example, `https://&lt;storage-account&gt;.blob.core.windows.net/<container>/<folder>`.|
| `spark.synapse.diagnostic.emitter.<destination>.secret` | Optional. The secret content (AccessKey or SAS). Required if using `.auth` = `AccessKey` or `SAS` and `.secret.keyVault` is not specified. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault` | Required if using `.auth` = `AccessKey` or `SAS` and `.secret` is not specified. The Azure Key Vault uri where the secret (AccessKey or SAS) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName` | Required if `.secret.keyVault` is specified. The Azure Key Vault secret name where the secret (AccessKey or SAS) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.tenantId` | Required if using `.auth` = `ServicePrincipalCert`. The Azure Active Directory tenant ID of the Service Principal. |
| `spark.synapse.diagnostic.emitter.<destination>.clientId` | Required if using `.auth` = `ServicePrincipalCert`. The application (client) ID of the Service Principal. |
| `spark.synapse.diagnostic.emitter.<destination>.certificate.keyVault.certificateName` | Required when auth is ServicePrincipalCert. The name of the certificate stored in Azure Key Vault. The certificate must contain an accessible private key, and its public certificate must be registered on the Microsoft Entra app.  |
| `spark.synapse.diagnostic.emitter.<destination>.certificate.keyVault` | Required when auth is ServicePrincipalCert. The Azure Key Vault URL that stores the certificate. The signed-in Fabric user who starts the Spark session must have permission to retrieve the certificate and its private key, such as the Key Vault Certificate User role.  |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match` | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerApplicationStart,SparkListenerApplicationEnd` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match` | Optional. The comma-separated Log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match` | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used` |
| `spark.fabric.pools.skipStarterPools` | Required. This Spark property is used to force an on-demand Spark session. You should set the value to `true` when using the default pool in order to trigger the libraries to emit logs and metrics. |

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
  "artifactId": "<my-fabric-item-id>",
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

 ## Fabric workspaces with Managed virtual network

Create a managed private endpoint for the target Azure Blob Storage. For detailed instructions, refer to [Create and use managed private endpoints in Fabric](../security/security-managed-private-endpoints-create.md).

Once the managed private endpoint is approved, users can begin emitting logs and metrics to the target Azure Blob Storage.

## Next steps

- [Create Apache spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)
