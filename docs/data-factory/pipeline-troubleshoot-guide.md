---
title: General troubleshooting
description: Learn how to troubleshoot external control activities for Data Factory in Microsoft Fabric.
author: nabhishek
ms.topic: troubleshooting
ms.date: 11/16/2023
ms.author: abnarain
---

# Troubleshoot pipelines for Data Factory in Microsoft Fabric

This article explores common troubleshooting methods for external control activities for Data Factory in Microsoft Fabric.

## Connector and copy activity

For connector issues such as an encounter error using the copy activity, refer to the [Troubleshoot Connectors](/azure/data-factory/connector-troubleshoot-guide) article.

## Azure Databricks

### Error code: 3200

- **Message**: Error 403.

- **Cause**: `The Databricks access token has expired.`

- **Recommendation**: By default, the Azure Databricks access token is valid for 90 days. Create a new token and update the connection.

### Error code: 3201

- **Message**: `Missing required field: settings.task.notebook_task.notebook_path.`

- **Cause**: `Bad authoring: Notebook path not specified correctly.`

- **Recommendation**: Specify the notebook path in the Databricks activity.

<br/> 

- **Message**: `Cluster... does not exist.`

- **Cause**: `Authoring error: Databricks cluster does not exist or has been deleted.`

- **Recommendation**: Verify that the Databricks cluster exists.

<br/> 

- **Message**: `Invalid Python file URI... Please visit Databricks user guide for supported URI schemes.`

- **Cause**: `Bad authoring.`

- **Recommendation**: Specify either absolute paths for workspace-addressing schemes, or `dbfs:/folder/subfolder/foo.py` for files stored in the Databricks File System (DFS).

<br/> 

- **Message**: `{0} LinkedService should have domain and accessToken as required properties.`

- **Cause**: `Bad authoring.`

- **Recommendation**: Verify the [connection definition](/azure/data-factory/compute-linked-services#azure-databricks-linked-service).

<br/> 

- **Message**: `{0} LinkedService should specify either existing cluster ID or new cluster information for creation.`

- **Cause**: `Bad authoring.`

- **Recommendation**: Verify the [connection definition]/azure/data-factory/compute-linked-services#azure-databricks-linked-service).

<br/> 

- **Message**: `Node type Standard_D16S_v3 is not supported. Supported node types: Standard_DS3_v2, Standard_DS4_v2, Standard_DS5_v2, Standard_D8s_v3, Standard_D16s_v3, Standard_D32s_v3, Standard_D64s_v3, Standard_D3_v2, Standard_D8_v3, Standard_D16_v3, Standard_D32_v3, Standard_D64_v3, Standard_D12_v2, Standard_D13_v2, Standard_D14_v2, Standard_D15_v2, Standard_DS12_v2, Standard_DS13_v2, Standard_DS14_v2, Standard_DS15_v2, Standard_E8s_v3, Standard_E16s_v3, Standard_E32s_v3, Standard_E64s_v3, Standard_L4s, Standard_L8s, Standard_L16s, Standard_L32s, Standard_F4s, Standard_F8s, Standard_F16s, Standard_H16, Standard_F4s_v2, Standard_F8s_v2, Standard_F16s_v2, Standard_F32s_v2, Standard_F64s_v2, Standard_F72s_v2, Standard_NC12, Standard_NC24, Standard_NC6s_v3, Standard_NC12s_v3, Standard_NC24s_v3, Standard_L8s_v2, Standard_L16s_v2, Standard_L32s_v2, Standard_L64s_v2, Standard_L80s_v2.`

- **Cause**: `Bad authoring.`

- **Recommendation**: Refer to the error message.

<br/>

### Error code: 3202

- **Message**: `There were already 1000 jobs created in past 3600 seconds, exceeding rate limit: 1000 job creations per 3600 seconds.`

- **Cause**: `Too many Databricks runs in an hour.`

- **Recommendation**: Check all pipelines that use this Databricks workspace for their job creation rate. If pipelines launched too many Databricks runs in aggregate, migrate some pipelines to a new workspace.

<br/> 

- **Message**: `Could not parse request object: Expected 'key' and 'value' to be set for JSON map field base_parameters, got 'key: "..."' instead.`

- **Cause**: `Authoring error: No value provided for the parameter.`

- **Recommendation**: Inspect the pipeline JSON and ensure all parameters in the baseParameters notebook specify a nonempty value.

<br/> 

- **Message**: `User: `SimpleUserContext{userId=..., name=user@company.com, orgId=...}` is not authorized to access cluster.`

- **Cause**: The user who generated the access token isn't allowed to access the Databricks cluster specified in the connection.

- **Recommendation**: Ensure the user has the required permissions in the workspace.

<br/> 

- **Message**: `Job is not fully initialized yet. Please retry later.`

- **Cause**: The job hasn't initialized.

- **Recommendation**: Wait and try again later.

### Error code: 3203

- **Message**: `The cluster is in Terminated state, not available to receive jobs. Please fix the cluster or retry later.`

- **Cause**: The cluster was terminated. For interactive clusters, this issue might be a race condition.

- **Recommendation**: To avoid this error, use job clusters.

### Error code: 3204

- **Message**: `Job execution failed.`

- **Cause**: Error messages indicate various issues, such as an unexpected cluster state or a specific activity. Often, no error message appears.

- **Recommendation**: N/A

### Error code: 3208

- **Message**: `An error occurred while sending the request.`

- **Cause**: The network connection to the Databricks service was interrupted.

- **Recommendation**: If you're using a self-hosted Data Factory runtime, make sure that the network connection is reliable from the Data Factory runtime nodes. If you're using Azure Data Factory runtime, retry usually works.
 
### The Boolean run output starts coming as string instead of expected int

- **Symptoms**: Your Boolean run output starts coming as string (for example, `"0"` or `"1"`) instead of expected int (for example, `0` or `1`).

   :::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/databricks-pipeline.png" alt-text="Screenshot of the Databricks pipeline.":::

    You noticed this change on September 28, 2021 at around 9 AM IST when your pipeline relying on this output started failing. No change was made on the pipeline, and the Boolean output data arrived as expected prior to the failure.

   :::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/old-and-new-output.png" alt-text="Screenshot of the difference in the output.":::

- **Cause**: This issue is caused by a recent change, which is by design. After the change, if the result is a number that starts with zero, Data Factory will convert the number to the octal value, which is a bug. This number is always 0 or 1, which never caused issues before the change. So to fix the octal conversion, the string output is passed from the Notebook run as is. 

- **Recommendation**: Change the **if** condition to something like `if(value=="0")`.

## Functions

### Error code: 3602

- **Message**: `Invalid HttpMethod: '%method;'.`

- **Cause**: The Httpmethod specified in the activity payload isn't supported by Azure Function Activity.

- **Recommendation**: The supported Httpmethods are: PUT, POST, GET, DELETE, OPTIONS, HEAD, and TRACE.

### Error code: 3603

- **Message**: `Response Content is not a valid JObject.`

- **Cause**: The Azure function that was called didn't return a JSON Payload in the response. Data Factory and Synapse pipeline Azure function activity only support JSON response content.

- **Recommendation**: Update the Azure function to return a valid JSON Payload such as a C# function may return `(ActionResult)new OkObjectResult("{\"Id\":\"123\"}");`

### Error code: 3606

- **Message**: Azure function activity missing function key.

- **Cause**: The Azure function activity definition isn't complete.

- **Recommendation**: Check that the input Azure function activity JSON definition has a property named `functionKey`.

### Error code: 3607

- **Message**: `Azure function activity missing function name.`

- **Cause**: The Azure function activity definition isn't complete.

- **Recommendation**: Check that the input Azure function activity JSON definition has a property named `functionName`.

### Error code: 3608

- **Message**: `Call to provided Azure function '%FunctionName;' failed with status-'%statusCode;' and message - '%message;'.`

- **Cause**: The Azure function details in the activity definition may be incorrect.

- **Recommendation**: Fix the Azure function details and try again.

### Error code: 3609

- **Message**: `Azure function activity missing functionAppUrl.`

- **Cause**: The Azure function activity definition isn't complete.

- **Recommendation**: Check that the input Azure Function activity JSON definition has a property named `functionAppUrl`.

### Error code: 3610

- **Message**: `There was an error while calling endpoint.`

- **Cause**: The function URL may be incorrect.

- **Recommendation**: Verify that the value for `functionAppUrl` in the activity JSON is correct and try again.

### Error code: 3611

- **Message**: `Azure function activity missing Method in JSON.`

- **Cause**: The Azure function activity definition isn't complete.

- **Recommendation**: Check that the input Azure function activity JSON definition has a property named `method`.

### Error code: 3612

- **Message**: `Azure function activity missing LinkedService definition in JSON.`

- **Cause**: The Azure function activity definition isn't complete.

- **Recommendation**: Check that the input Azure function activity JSON definition has connection details.

## Azure Machine Learning

### Error code: 4101

- **Message**: `AzureMLExecutePipeline activity '%activityName;' has invalid value for property '%propertyName;'.`

- **Cause**: Bad format or missing definition of property `%propertyName;`.

- **Recommendation**: Check if the activity `%activityName;` has the property `%propertyName;` defined with correct data.

### Error code: 4110

- **Message**: `AzureMLExecutePipeline activity missing LinkedService definition in JSON.`

- **Cause**: The AzureMLExecutePipeline activity definition isn't complete.

- **Recommendation**: Check that the input AzureMLExecutePipeline activity JSON definition has correctly connection details.

### Error code: 4111

- **Message**: `AzureMLExecutePipeline activity has wrong LinkedService type in JSON. Expected LinkedService type: '%expectedLinkedServiceType;', current LinkedService type: Expected LinkedService type: '%currentLinkedServiceType;'.`

- **Cause**: Incorrect activity definition.

- **Recommendation**: Check that the input AzureMLExecutePipeline activity JSON definition has correctly connection details.

### Error code: 4112

- **Message**: `AzureMLService connection has invalid value for property '%propertyName;'.`

- **Cause**: Bad format or missing definition of property '%propertyName;'.

- **Recommendation**: Check if the connection has the property `%propertyName;` defined with correct data.

### Error code: 4121

- **Message**: `Request sent to Azure Machine Learning for operation '%operation;' failed with http status code '%statusCode;'. Error message from Azure Machine Learning: '%externalMessage;'.`

- **Cause**: The Credential used to access Azure Machine Learning has expired.

- **Recommendation**: Verify that the credential is valid and retry.

### Error code: 4122

- **Message**: `Request sent to Azure Machine Learning for operation '%operation;' failed with http status code '%statusCode;'. Error message from Azure Machine Learning: '%externalMessage;'.`

- **Cause**: The credential provided in Azure Machine Learning connection is invalid, or doesn't have permission for the operation.

- **Recommendation**: Verify that the credential in connection is valid, and has permission to access Azure Machine Learning.

### Error code: 4123

- **Message**: `Request sent to Azure Machine Learning for operation '%operation;' failed with http status code '%statusCode;'. Error message from Azure Machine Learning: '%externalMessage;'.`

- **Cause**: The properties of the activity such as `pipelineParameters` are invalid for the Azure Machine Learning (ML) pipeline.

- **Recommendation**: Check that the value of activity properties matches the expected payload of the published Azure Machine Learning pipeline specified in connection.

### Error code: 4124

- **Message**: `Request sent to Azure Machine Learning for operation '%operation;' failed with http status code '%statusCode;'. Error message from Azure Machine Learning: '%externalMessage;'.`

- **Cause**: The published Azure Machine Learning pipeline endpoint doesn't exist.

- **Recommendation**: Verify that the published Azure Machine Learning pipeline endpoint specified in connection exists in Azure Machine Learning.

### Error code: 4125

- **Message**: `Request sent to Azure Machine Learning for operation '%operation;' failed with http status code '%statusCode;'. Error message from Azure Machine Learning: '%externalMessage;'.`

- **Cause**: There is a server error on Azure Machine Learning.

- **Recommendation**: Retry later. Contact the Azure Machine Learning team for help if the issue continues.

### Error code: 4126

- **Message**: `Azure ML pipeline run failed with status: '%amlPipelineRunStatus;'. Azure ML pipeline run Id: '%amlPipelineRunId;'. Please check in Azure Machine Learning for more error logs.`

- **Cause**: The Azure Machine Learning pipeline run failed.

- **Recommendation**: Check Azure Machine Learning for more error logs, then fix the ML pipeline.

## Common

### Error code: 2103

- **Message**: `Please provide value for the required property '%propertyName;'.`

- **Cause**: The required value for the property has not been provided.

- **Recommendation**: Provide the value from the message and try again.

### Error code: 2104

- **Message**: `The type of the property '%propertyName;' is incorrect.`

- **Cause**: The provided property type isn't correct.

- **Recommendation**: Fix the type of the property and try again.

### Error code: 2105

- **Message**: `An invalid json is provided for property '%propertyName;'. Encountered an error while trying to parse: '%message;'.`

- **Cause**: The value for the property is invalid or isn't in the expected format.

- **Recommendation**: Refer to the documentation for the property and verify that the value provided includes the correct format and type.

### Error code: 2106

- **Message**: `The storage connection string is invalid. %errorMessage;`

- **Cause**: The connection string for the storage is invalid or has incorrect format.

- **Recommendation**: Go to the Azure portal and find your storage, then copy-and-paste the connection string into your connection and try again.

### Error code: 2110

- **Message**: `The connection type '%linkedServiceType;' is not supported for '%executorType;' activities.`

- **Cause**: The connection specified in the activity is incorrect.

- **Recommendation**: Verify that the connection type is one of the supported types for the activity.

### Error code: 2111

- **Message**: `The type of the property '%propertyName;' is incorrect. The expected type is %expectedType;.`

- **Cause**: The type of the provided property isn't correct.

- **Recommendation**: Fix the property type and try again.

### Error code: 2112

- **Message**: `The cloud type is unsupported or could not be determined for storage from the EndpointSuffix '%endpointSuffix;'.`

- **Cause**: The cloud type is unsupported or couldn't be determined for storage from the EndpointSuffix.

- **Recommendation**: Use storage in another cloud and try again.

## Azure Batch

The following table applies to Azure Batch.
 
### Error code: 2500

- **Message**: `Hit unexpected exception and execution failed.`

- **Cause**: `Can't launch command, or the program returned an error code.`

- **Recommendation**: Ensure that the executable file exists. If the program started, verify that *stdout.txt* and *stderr.txt* were uploaded to the storage account. It's a good practice to include logs in your code for debugging.

### Error code: 2501

- **Message**: `Cannot access user batch account; please check batch account settings.`

- **Cause**: Incorrect Batch access key or pool name.

- **Recommendation**: Verify the pool name and the Batch access key in the connection.

### Error code: 2502

- **Message**: `Cannot access user storage account; please check storage account settings.`

- **Cause**: Incorrect storage account name or access key.

- **Recommendation**: Verify the storage account name and the access key in the connection.

### Error code: 2504

- **Message**: `Operation returned an invalid status code 'BadRequest'.`

- **Cause**: Too many files in the `folderPath` of the Azure activity. The total size of `resourceFiles` can't be more than 32,768 characters.

- **Recommendation**: Remove unnecessary files, or Zip them and add an unzip command to extract them.
   
   For example, use `powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory($zipFile, $folder); }" ; $folder\yourProgram.exe`

### Error code: 2505

- **Message**: `Cannot create Shared Access Signature unless Account Key credentials are used.`

- **Cause**: Azure Batch activities support only storage accounts that use an access key.

- **Recommendation**: Refer to the error description.

### Error code: 2507

- **Message**: `The folder path does not exist or is empty: ...`

- **Cause**: No files are in the storage account at the specified path.

- **Recommendation**: The folder path must contain the executable files you want to run.

### Error code: 2508

- **Message**: `There are duplicate files in the resource folder.`

- **Cause**: Multiple files of the same name are in different subfolders of folderPath.

- **Recommendation**: Azure Batch activities flatten folder structure under folderPath. If you need to preserve the folder structure, zip the files and extract them in Azure Batch by using an unzip command.
   
   For example, use `powershell.exe -nologo -noprofile -command "& { Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory($zipFile, $folder); }" ; $folder\yourProgram.exe`

### Error code: 2509

- **Message**: `Batch url ... is invalid; it must be in Uri format.`

- **Cause**: Batch URLs must be similar to `https://mybatchaccount.eastus.batch.azure.com`

- **Recommendation**: Refer to the error description.

### Error code: 2510

- **Message**: `An error occurred while sending the request.`

- **Cause**: The batch URL is invalid.

- **Recommendation**: Verify the batch URL.
 
## Web activity  

### Error Code: 2001

- **Message**: `The length of execution output is over limit (around 4MB currently).`

- **Cause**: The execution output is greater than 4 MB in size but the maximum supported output response payload size is 4 MB.

- **Recommendation**: Make sure the execution output size does not exceed 4 MB. For more information, see [How to scale out the size of data moving using Data Factory](/answers/questions/700102/how-to-scale-out-the-size-of-data-moving-using-azu.html).

### Error Code: 2002

- **Message**: `The payload including configurations on activity/data/connection is too large. Please check if you have settings with very large value and try to reduce its size.`

- **Cause**: The payload you are attempting to send is too large.

- **Recommendation**: Refer to [Payload is too large](pipeline-troubleshoot-guide.md#payload-is-too-large).

### Error Code: 2003

- **Message**: `There are substantial concurrent external activity executions which is causing failures due to throttling under subscription <subscription id>, region <region code> and limitation <current limit>. Please reduce the concurrent executions. For limits, refer https://aka.ms/adflimits.`

- **Cause**: Too many activities are running concurrently. This can happen when too many pipelines are triggered at once.

- **Recommendation**: Reduce pipeline concurrency. You might have to distribute the trigger time of your pipelines.  

### Error Code: 2105

- **Message**: `The value type '<provided data type>', in key '<key name>' is not expected type '<expected data type>'`

- **Cause**: Data generated in the dynamic content expression doesn't match with the key and causes JSON parsing failure.

- **Recommendation**: Look at the key field and fix the dynamic content definition.

### Error code: 2108

- **Message**: `Error calling the endpoint '<URL>'. Response status code: 'NA - Unknown'. More details: Exception message: 'NA - Unknown [ClientSideException] Invalid Url: <URL>. Please verify Url or Data Factory runtime is valid and retry. Localhost URLs are allowed only with SelfHosted Data Factory runtime'`

- **Cause**: Unable to reach the URL provided. This can occur because there was a network connection issue, the URL was unresolvable, or a localhost URL was being used on an Azure Data Factory runtime.

- **Recommendation**: Verify that the provided URL is accessible.

<br/> 

- **Message**: `Error calling the endpoint '%url;'. Response status code: '%code;'`

- **Cause**: The request failed due to an underlying issue such as network connectivity, a DNS failure, a server certificate validation, or a timeout.

- **Recommendation**: Use Fiddler/Postman/Netmon/Wireshark to validate the request.

    **Using Fiddler**
    
    To use **Fiddler** to create an HTTP session of the monitored web application:
    
    1. Download, install, and open [Fiddler](https://www.telerik.com/download/fiddler).
    
    1. If your web application uses HTTPS, go to **Tools** > **Fiddler Options** > **HTTPS**.
    
       1. In the HTTPS tab, select both **Capture HTTPS CONNECTs** and **Decrypt HTTPS traffic**.
    
          :::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/fiddler-options.png" alt-text="Fiddler options":::
    
    1. If your application uses TLS/SSL certificates, add the Fiddler certificate to your device.
    
       Go to: **Tools** > **Fiddler Options** > **HTTPS** > **Actions** > **Export Root Certificate to Desktop**.
    
    1. Turn off capturing by going to **File** > **Capture Traffic**. Or press **F12**.
    
    1. Clear your browser's cache so that all cached items are removed and must be downloaded again.
    
    1. Create a request:
    
    1. Select the **Composer** tab.
    
       1. Set the HTTP method and URL.
     
       1. If needed, add headers and a request body.
    
       1. Select **Execute**.
    
    1. Turn on traffic capturing again, and complete the problematic transaction on your page.
    
    1. Go to: **File** > **Save** > **All Sessions**.
    
    For more information, see [Getting started with Fiddler](https://docs.telerik.com/fiddler/Configure-Fiddler/Tasks/ConfigureFiddler).

### Error Code: 2113

- **Message**: `ExtractAuthorizationCertificate: Unable to generate a certificate from a Base64 string/password combination`

- **Cause**: Unable to generate certificate from Base64 string/password combination.

- **Recommendation**: Verify that the Base64 encoded PFX certificate and password combination you are using are correctly entered.

### Error Code: 2403

- **Message**: `Get access token from MSI failed for Datafactory <DF mname>, region <region code>. Please verify resource url is valid and retry.`

- **Cause**: Unable to acquire an access token from the resource URL provided.

- **Recommendation**: Verify that you have provided the correct resource URL for your managed identity.


## General

### REST continuation token NULL error 

**Error message:** {\"token\":null,\"range\":{\"min\":\..}

**Cause:** When querying across multiple partitions/pages, backend service  returns continuation token in JObject format with 3 properties: **token, min and max key ranges**,  for instance, {\"token\":null,\"range\":{\"min\":\"05C1E9AB0DAD76\",\"max":\"05C1E9CD673398"}}). Depending on source data, querying can result 0 indicating missing token though there is more data to fetch.

**Recommendation:** When the continuationToken is non-null, as the string {\"token\":null,\"range\":{\"min\":\"05C1E9AB0DAD76\",\"max":\"05C1E9CD673398"}}, it is required  to call queryActivityRuns API again with the continuation token from the previous response. You need to pass the full string for the query API again. The activities will be returned in the subsequent pages for the query result. You should ignore that there is empty array in this page, as long as the full continuationToken value != null, you need continue querying. For more details, please refer to [REST api for pipeline run query.](/rest/api/datafactory/activity-runs/query-by-pipeline-run) 


### Activity stuck issue

When you observe that the activity is running much longer than your normal runs with barely no progress, it may happen to be stuck. You can try canceling it and retry to see if it helps. If it's a copy activity, you can learn about the performance monitoring and troubleshooting from [Troubleshoot copy activity performance](/azure/data-factory/copy-activity-performance-troubleshooting); if it's a data flow, learn from [Mapping data flows performance](/azure/data-factory/concepts-data-flow-performance) and tuning guide.

### Payload is too large

**Error message:** `The payload including configurations on activity/data/connection is too large. Please check if you have settings with very large value and try to reduce its size.`

**Cause:** The payload for each activity run includes the activity configuration, the associated data(s), and connection(s) configurations if any, and a small portion of system properties generated per activity type. The limit of such payload size is 896 KB as mentioned in the Azure limits documentation for [Data Factory](/azure/azure-resource-manager/management/azure-subscription-service-limits#data-factory-limits) and [Azure Synapse Analytics](/azure/azure-resource-manager/management/azure-subscription-service-limits#azure-synapse-analytics-limits).

**Recommendation:** You hit this limit likely because you pass in one or more large parameter values from either upstream activity output or external, especially if you pass actual data across activities in control flow. Check if you can reduce the size of large parameter values, or tune your pipeline logic to avoid passing such values across activities and handle it inside the activity instead.

### Unsupported compression causes files to be corrupted

**Symptoms**: You try to unzip a file that is stored in a blob container. A single copy activity in a pipeline has a source with the compression type set to "deflate64" (or any unsupported type). This activity runs successfully and produces the text file contained in the zip file. However, there is a problem with the text in the file, and this file appears corrupted. When this file is unzipped locally, it is fine.

**Cause**: Your zip file is compressed by the algorithm of "deflate64", while the internal zip library of Data Factory only supports "deflate". If the zip file is compressed by the Windows system and the overall file size exceeds a certain number, Windows will use "deflate64" by default, which is not supported in Data Factory. On the other hand, if the file size is smaller or you use some third party zip tools that support specifying the compress algorithm, Windows will use "deflate" by default.

> [!TIP]
> Actually, both [Binary format in Data Factory and Synapse Analytics](format-binary.md) and [Delimited text format in Data Factory and Azure Synapse Analytics](format-delimited-text.md) clearly state that the "deflate64" format is not supported in Data Factory.

### Execute Pipeline passes array parameter as string to the child pipeline

**Error message:** `Operation on target ForEach1 failed: The execution of template action 'MainForEach1' failed: the result of the evaluation of 'foreach' expression '@pipeline().parameters.<parameterName>' is of type 'String'. The result must be a valid array.`

**Cause:** Even if in the Execute Pipeline you create the parameter of type array, as shown in the below image, the pipeline will fail.

:::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/parameter-type-array.png" alt-text="Screenshot showing the parameters of the Execute Pipeline activity.":::

This is due to the fact that the payload is passed from the parent pipeline to the child as string. We can see it when we check the input passed to the child pipeline.

:::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/input-type-string.png" alt-text="Screenshot showing the input type string.":::

**Recommendation:** To solve the issue we can leverage the create array function as shown in the below image.

:::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/create-array-function.png" alt-text="Screenshot showing how to use the create array function.":::

Then our pipeline will succeed. And we can see in the input box that the parameter passed is an array.

:::image type="content" source="/azure/data-factory/media/data-factory-troubleshoot-guide/input-type-array.png" alt-text="Screenshot showing input type array.":::

## Related content

For more troubleshooting help, try these resources:

- [Data Factory blog](https://techcommunity.microsoft.com/t5/azure-data-factory-blog/bg-p/AzureDataFactoryBlog)
- [Data Factory feature requests](/answers/topics/azure-data-factory.html)
- [Stack Overflow forum for Data Factory](https://stackoverflow.com/questions/tagged/azure-data-factory)
- [Twitter information about Data Factory](https://twitter.com/hashtag/DataFactory)
- [Azure videos](https://azure.microsoft.com/resources/videos/index/)
- [Microsoft Q&A question page](/answers/topics/azure-data-factory.html)
