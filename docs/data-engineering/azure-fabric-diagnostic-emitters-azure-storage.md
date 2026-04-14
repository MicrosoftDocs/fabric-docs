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


### Step 2: Create a Fabric Environment Artifact with Apache Spark Configuration

#### Option 1: Configure with Azure Storage URI and Access key   

1. Create a Fabric Environment Artifact in Fabric
1. Add the following **Spark properties** with the appropriate values to the environment artifact, or select **Add from .yml** in the ribbon to download the [sample yaml file](https://tridentvscodeextension.z13.web.core.windows.net/diagnostics/SparkDiagnosticSampleConfig/azure_storage_spark_property_option_1.yml), which already containing the following properties.  

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
1. Create a Fabric Environment Artifact in Fabric.
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

#### Option 3: Configure Using Certificate Authentication

1. Register an application

   1. Sign in to the [Azure portal](https://portal.azure.com/) and go to [App registrations](/entra/identity-platform/quickstart-register-app#register-an-application).
	
   1. Create a new app registration for sending logs and metrics to Azure Storage account.
	
	   :::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-storage\create-a-new-app-registration.png" alt-text="Screenshot showing create a new app registration.":::

2. Generate a certificate in Key Vault

   1. Navigate to Key Vault.
	
   1. Expand the **Object**, and select the **Certificates**.
	
   1. Click on **Generate/Import**. 
	
	   :::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-storage\generate-a-new-certificate.png" alt-text="Screenshot showing generate a new certificate for app.":::

3. Trust the certificate in the application 

   1. Go to the app created in Step 1 -> **Manage** -> **Manifest**. 
	
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
	
	   :::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-storage\trust-the-certificate.png" alt-text="Screenshot showing trust the certificate in the application.":::

4. Assign Storage Blob Data Contributor role

   1. In Azure Storage account, navigate to Access control (IAM).

   1. Assign the Storage Blob Data Contributor to the application (service principal).
	
	:::image type="content" source="media\azure-fabric-diagnostic-emitters-azure-storage\assign-storage-blob-data-contributor.png" alt-text="Screenshot showing assign storage blob data contributor.":::

5. Configure Azure Key Vault access permissions

   1. In the Azure portal, navigate to the target Azure Key Vault.

   2. Under Access control (IAM), assign the Key Vault Certificates User role to the application (service principal) used by the Spark diagnostic emitter.

### Step 3: Attach the environment artifact to notebooks or spark job definitions, or set it as the workspace default

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

1. Navigate to Workspace Settings in Fabric.
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
| --- | --- |
| `spark.synapse.diagnostic.emitters`                                         | Required. The comma-separated destination names of diagnostic emitters. For example, `MyDest1,MyDest2` |
| `spark.synapse.diagnostic.emitter.<destination>.type`                       | Required. Built-in destination type. To enable Azure storage destination, `AzureStorage` needs to be included in this field. |
| `spark.synapse.diagnostic.emitter.<destination>.categories`                 | Optional. The comma-separated selected log categories. Available values include `DriverLog`, `ExecutorLog`, `EventLog`, `Metrics`. If not set, the default value is **all** categories. |
| `spark.synapse.diagnostic.emitter.<destination>.auth`                       | Required. `AccessKey` for using storage account [access key](/azure/storage/common/storage-account-keys-manage) authorization. `SAS` for [shared access signatures](/azure/storage/common/storage-sas-overview) authorization. |
| `spark.synapse.diagnostic.emitter.<destination>.uri`                        | Required. The destination blob container folder uri. Should match pattern `https://<my-blob-storage>.blob.core.windows.net/<container-name>/<folder-name>`. |
| `spark.synapse.diagnostic.emitter.<destination>.secret`                     | Optional. The secret (AccessKey or SAS) content. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault`            | Required if `.secret` isn't specified. The [Azure Key vault](/azure/key-vault/general/overview) uri where the secret (AccessKey or SAS) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.secret.keyVault.secretName` | Required if `.secret.keyVault` is specified. The Azure Key vault secret name where the secret (AccessKey or SAS) is stored. |
| `spark.synapse.diagnostic.emitter.<destination>.filter.eventName.match`     | Optional. The comma-separated spark event names, you can specify which events to collect. For example: `SparkListenerApplicationStart,SparkListenerApplicationEnd` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.loggerName.match`    | Optional. The comma-separated Log4j logger names, you can specify which logs to collect. For example: `org.apache.spark.SparkContext,org.example.Logger` |
| `spark.synapse.diagnostic.emitter.<destination>.filter.metricName.match`    | Optional. The comma-separated spark metric name suffixes, you can specify which metrics to collect. For example: `jvm.heap.used` |
| `spark.fabric.pools.skipStarterPools`    | Required. This Spark property is used to force an on-demand Spark session. You should set the value to `true` when using the default pool in order to trigger the libraries to emit logs and metrics.  |

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

 ## Fabric workspaces with Managed virtual network

Create a managed private endpoint for the target Azure Blob Storage. For detailed instructions, refer to [Create and use managed private endpoints in Microsoft Fabric - Microsoft Fabric](../security/security-managed-private-endpoints-create.md).

Once the managed private endpoint is approved, users can begin emitting logs and metrics to the target Azure Blob Storage.

## Next steps

- [Create Apache spark job definition](../data-engineering/create-spark-job-definition.md)
- [Create, configure, and use an environment in Microsoft Fabric](../data-engineering/create-and-use-environment.md)
- [Create and use managed private endpoints in Microsoft Fabric](../security/security-managed-private-endpoints-create.md)
- [Develop, execute, and manage Microsoft Fabric notebooks](../data-engineering/author-execute-notebook.md)
- [Monitor Spark Applications](../data-engineering/spark-monitoring-overview.md)
