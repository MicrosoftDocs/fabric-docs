---
title: Troubleshoot the Invoke SSIS Package activity in Data Factory
description: Learn how to troubleshoot common errors when you run SSIS packages by using the Invoke SSIS Package activity in Data Factory for Microsoft Fabric.
ms.reviewer: chugu
ms.topic: troubleshooting
ms.custom:
ms.date: 04/08/2026
---

# Troubleshoot the Invoke SSIS Package activity in Data Factory

This article describes the most common errors that you might encounter when you run SQL Server Integration Services (SSIS) packages by using the Invoke SSIS Package activity in Data Factory for Microsoft Fabric. It describes the potential causes and recommended actions to resolve each error.

## General troubleshooting

### Where to find logs

Use the pipeline portal to check the output of the Invoke SSIS Package activity. The output includes the execution result and error messages.

If you enabled logging in the activity **Settings** tab, the activity output includes a `logLocation` property that points to the log files in OneLake. For example:

```json
"logLocation": "Logging\\f320405465ee4e83bedafbb05759770b"
```

Navigate to the logging path in OneLake to review detailed package execution logs, including data flow component messages and task-level errors. For more details, see [Monitor package execution](invoke-ssis-package-activity.md#step-6--monitor-package-execution).

### How to connect SSIS packages to data sources or destinations

For connection and authentication guidance for various types of sources and destinations, see the [Scenarios: Connect SSIS packages to data sources and destinations](/fabric/data-factory/invoke-ssis-package-activity#scenarios-connect-ssis-packages-to-fabric-services) section of the Invoke SSIS Package activity article.

## Common errors

### Error code: 2906

**Error message**: "Package execution failed. For more details, select the output of your activity run on the same row."

**Cause**: This is a general error that indicates the SSIS package execution failed. The root cause is within the package itself. Common reasons include:

- A data source or destination is unreachable or returned an error.
- Connection manager credentials are missing or expired (especially when the package protection level is set to `DontSaveSensitive`).
- A data type mismatch or column mapping error occurred during data flow execution.
- A script task or script component threw an unhandled exception.
- A package variable or expression evaluated to an unexpected value.

**Recommended action**:

1. Select the activity output on the pipeline run row to view the detailed error message.
1. If logging is enabled, navigate to the `logLocation` path in OneLake and review the log files for the specific task or data flow component that failed.
1. Check the [Connection Managers tab](/fabric/data-factory/invoke-ssis-package-activity#connection-managers-tab) in the activity settings to verify that all credentials and connection strings are correctly supplied at runtime.
1. If the package works locally in Visual Studio but fails in Fabric, verify that the data sources are accessible from Fabric (no on-premises or private-endpoint data sources are supported during preview).

### Error code: 2011

**Error message**: "Value can't be null. Parameter name: path1"

**Cause**: The package path or configuration path is missing or invalid. This can happen when:

- The package `.dtsx` file wasn't uploaded to OneLake or was moved/deleted after the activity was configured.
- The configuration file path (`.dtsConfig`) is specified but the file doesn't exist at the expected location.
- A file path expression inside the package evaluates to null.

**Recommended action**:

1. Open the activity **Settings** tab and select **Browse** to reselect the package file.
1. Verify the package file exists at the expected OneLake path.
1. If you use a configuration file, verify it's also present in OneLake and the path is correct.
1. Check any expressions that build file paths dynamically inside the package.

### Error code: 2015

**Error message**: "Fabric activity failed. 'Value can't be null. Parameter name: o'."

**Cause**: An internal parameter required by the activity runtime is null. This typically occurs when:

- The package file is corrupted or in an unsupported format.
- A required property override or connection manager value is missing.

**Recommended action**:

1. Reupload the package file to OneLake and reconfigure the activity.
1. Verify all required property overrides and connection manager settings are populated in the activity configuration tabs.
1. If the issue persists, try creating a new Invoke SSIS Package activity and reconfiguring it from scratch.

### Activity fails with no error code

**Error message**: *(Empty or no error message displayed)*

**Cause**: The activity failed before the SSIS runtime could return a structured error. Possible causes include:

- The SSIS runtime failed to start due to a transient capacity issue.
- The workspace capacity was paused or unavailable during execution.
- An internal service error occurred.

**Recommended action**:

1. Retry the pipeline run. Transient issues often resolve on a subsequent attempt.
1. Verify that your workspace capacity is active and not paused.
1. If the issue persists across multiple retries, [open a support case](https://support.fabric.microsoft.com/) and provide the activity run ID and timestamp.

## Known limitations

During the preview, the following limitations apply. For the latest list, see [Invoke SSIS Package activity limitations](/fabric/data-factory/invoke-ssis-package-activity#limitations).

| Limitation | Description |
|---|---|
| **OneLake only** | Only packages stored in OneLake are supported. |
| **No on-premises data sources or destinations** | The activity can't connect to on-premises systems. |
| **No private-network endpoints** | Data sources or destinations behind private networks (for example, VNet-injected or private-endpoint resources) aren't supported. |
| **No custom or third-party components** | Packages that depend on custom components or third-party components aren't supported. |
| **Fixed vCore allocation** | Each workspace is allocated 4 vCores for SSIS runtime execution. This allocation can't be modified during preview. |
| **Fixed TTL** | The SSIS runtime Time-To-Live (TTL) is fixed at 30 minutes and can't be configured. |

## Related content

- [Use the Invoke SSIS Package activity to run an SSIS package](/fabric/data-factory/invoke-ssis-package-activity)
- [Activity overview](/fabric/data-factory/activity-overview)
- [How to monitor pipeline runs](/fabric/data-factory/monitor-pipeline-runs)
- [Integrate SSIS with SQL database in Microsoft Fabric](/sql/integration-services/fabric-integration/integrate-fabric-sql-database)
- [Use SSIS packages to write files to OneLake through Azure Data Lake Storage Gen2](/sql/integration-services/fabric-integration/tutorial-ssis-write-files-onelake)
