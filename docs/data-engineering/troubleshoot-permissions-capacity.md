---
title: Troubleshoot Permission and Capacity Errors in Data Engineering
description: Troubleshoot common permission and capacity issues in Data Engineering in Microsoft Fabric.
author: ValOlson
ms.author: vallariolson
ms.reviewer: ' '
ms.date: 02/09/2026
ms.topic: troubleshooting
---

# General troubleshooting for Data Engineering in Microsoft Fabric

This article provides guidance for troubleshooting common permission and capacity issues you might encounter when working with Data Engineering workloads in Microsoft Fabric.

## Permission and Authorization Errors

### Error: User Is Not Authorized

**Error Messages:**
- 403 Forbidden / Access Denied / Authentication Failed with Access token validation failed
- User is not authorized. User requires at least 'ReadAll' permission on the artifact
- User is Not Authorized to Access the Files in Storage Path for the Delta Table

#### What Happened

Your user account or service principal lacks the necessary permissions to access data engineering artifacts (Lakehouses, Notebooks, Spark job definitions, Pipelines), underlying storage, shortcuts, or perform specific operations. Access can be denied at multiple levels: workspace permissions, artifact permissions, storage-level permissions, or authentication failures with the catalog service.

**Common Causes:**
- Insufficient Microsoft Fabric workspace role (need Contributor or higher for most operations)
- Missing artifact-level permissions (Read, ReadData, or ReadAll) required for connections
- Missing Azure Storage "Storage Blob Data Contributor" or "Storage Blob Data Reader" role assignment
- Access token expired, invalid, or missing required scopes

#### How to Fix the Error

**Fix 1: Verify and Assign Workspace and Artifact Permissions**

Ensure you have the appropriate workspace role and data access permissions:

1. Navigate to Workspace Settings > Manage access
2. Add your user with **Contributor**, **Member**, or **Admin** role (Viewer role has limited access)
3. Navigate to the artifact (Lakehouse, Notebook, Pipeline) > Manage permissions
4. For SQL querying: Grant "Read all data using SQL" (**ReadData** permission)
5. For Spark access: Grant "Read all data using Apache Spark" (**ReadAll** permission)
6. For Power BI connections: Grant at least "Read" permission for metadata access
7. Log out and log back in for permissions to take effect

**Important**: ReadData and ReadAll serve different purposes. For users who need both SQL and Spark access, grant both permissions.

See [workspace permission model](https://learn.microsoft.com/fabric/security/permission-model) and [share warehouse and manage permissions](https://learn.microsoft.com/fabric/data-warehouse/share-warehouse-manage-permissions) for more details.

**Fix 2: Assign Storage-Level Azure Roles**

For Delta tables using Azure Data Lake Storage (ADLS) or OneLake:

1. Go to Azure Portal > Storage Account > Access Control (IAM)
2. Add role assignment: **Storage Blob Data Contributor** (for write) or **Storage Blob Data Reader** (for read-only)
3. Select your user or service principal
4. For service principals: Enable in Fabric Admin Portal (Tenant settings) and add to workspace with Contributor role
5. Verify authentication uses the correct scope: `https://storage.azure.com/` for OneLake

```python
# Verify current user context and token in notebook
print(mssparkutils.credentials.getToken("storage"))
```

See [lakehouse sharing documentation](https://learn.microsoft.com/fabric/data-engineering/lakehouse-sharing) for permission layers.

**Fix 3: Validate Authentication and Configure Shortcuts**

For authentication errors and external storage access:

1. Verify access tokens include the correct scope:
   - OneLake/Storage: `https://storage.azure.com/`
   - Fabric APIs: `https://api.fabric.microsoft.com/`
2. Check token expiration and refresh tokens before long-running operations
3. For shortcuts to external storage (ADLS Gen2, S3):
   - Navigate to Lakehouse > Open shortcut configuration
   - Update credentials (Service Principal, Account Key, or SAS Token)
   - Test the connection and ensure network access is allowed
4. Clear cached credentials and re-authenticate if tokens appear stale

```python
# Test token validity
from notebookutils import mssparkutils
try:
    token = mssparkutils.credentials.getToken("storage")
    print("Token retrieved successfully")
except Exception as e:
    print(f"Token error: {e}")
```

See [OneLake shortcuts](https://learn.microsoft.com/fabric/onelake/onelake-shortcuts) and [troubleshoot lakehouse connector](https://learn.microsoft.com/fabric/data-factory/connector-troubleshoot-lakehouse) for more information.

## Capacity and Rate Limiting Errors

### Error: Spark Job Can't Be Run / API Rate Limit Exceeded

**Error Messages:**
- Spark job can't be run because you exceeded a spark compute or API rate limit
- HTTP 429: Too Many Requests For Capacity
- HTTP 430: Too Many Requests For Capacity
- ListTables' API Rate Limit Exceeded for Artifact

#### What Happened

Your Microsoft Fabric capacity has exceeded its allocated Compute Units (CUs) or API request limits, causing the service to throttle or reject operations. This affects Spark jobs, notebooks, Spark job definitions, data pipelines, and API calls to Lakehouses.

**Common Causes:**
- Running too many concurrent Spark jobs, notebooks, or API requests
- Insufficient capacity SKU for your workload demands
- Orphaned or stalled Spark sessions consuming resources in the background
- Large or inefficient ETL operations consuming excessive compute resources

#### How to Fix the Error

**Fix 1: Monitor and Identify High-Consumption Workloads**

Use the [Fabric Capacity Metrics app](https://learn.microsoft.com/fabric/enterprise/capacity-planning-troubleshoot-consumption) to identify which workspaces, users, or jobs are consuming the most Compute Units:
1. Navigate to Admin Portal and access the Capacity Metrics app
2. Review real-time utilization, throttling events, and overages
3. Check the Compute page, Timepoint page, and Throttling tab to identify resource issues
4. Identify specific operations causing the capacity overload

Understanding [how Fabric capacity throttling works](https://learn.microsoft.com/fabric/enterprise/throttling) is essential. Fabric uses "bursting" and "smoothing" to handle temporary spikes, but sustained overloads trigger throttling.

**Fix 2: Reduce Concurrent Operations and Optimize Workloads**

For Spark operations (Notebooks, Spark job definitions):
- Stagger job execution times to avoid peak loads
- Stop long-running or stalled notebooks and Spark sessions
- Manage [Spark job concurrency limits](https://learn.microsoft.com/fabric/data-engineering/spark-job-concurrency-and-queueing)
- Restart your Fabric capacity from the Admin Portal (Capacity Settings > Fabric Capacity > Restart) to clear orphaned sessions. Wait approximately 10 minutes before retrying operations

For API operations:
- Spread API requests over time rather than making many requests in a short period
- Avoid repeated ListTables operations in loops or parallel calls
- Implement retry logic with exponential backoff
- Reduce the number of concurrent operations accessing the same Lakehouse

**Fix 3: Scale Up Your Capacity**

If throttling occurs frequently despite optimization, upgrade to a higher capacity SKU (e.g., from F2 to F8 or F16) to increase your available Compute Units and rate limits. Higher SKUs allow more concurrent jobs and higher API throughput.

Use the [capacity planning and troubleshooting guide](https://learn.microsoft.com/fabric/enterprise/capacity-planning-troubleshoot-errors) to evaluate your needs and determine the appropriate SKU.

### Error: Capacity Not Active at Refresh

**Error Messages:**
- Capacity Not Active at Lakehouse Refresh
- Capacity Not Active

#### What Happened

The workspace is not connected to an active Fabric capacity, or the capacity is experiencing issues that prevent data engineering operations from executing.

**Common Causes:**
- Workspace is no longer linked to an active Fabric capacity
- Capacity is overloaded or throttled, rejecting operations until utilization drops
- Misconfiguration or licensing limitations (trial or free SKU)
- Capacity has been paused or suspended

#### How to Fix the Error

**Fix 1: Confirm Capacity Status and Assignment**

1. In the Fabric Admin Portal, verify your capacity is active and running
2. Check that the workspace is assigned to this capacity
3. Navigate to Workspace Settings > License Info to confirm "Fabric Capacity" backing
4. Ensure the workspace hasn't been accidentally unassigned from the capacity
5. Verify the capacity hasn't been paused or suspended

**Fix 2: Verify Tenant Settings**

1. In the Power BI Admin Portal under Tenant Settings > Microsoft Fabric, ensure "Users can create Fabric items" is enabled
2. Confirm no organizational policies are blocking Fabric operations
3. If the problem persists for only one workspace while others work fine, consider creating a new workspace and move content

## Pipeline and Orchestration Errors

### Error: Data Pipeline Activity Failed

**Error Messages:**
- Pipeline run failed
- Activity execution failed
- Copy activity failed with error
- Notebook activity execution timeout

#### What Happened

A Data Pipeline activity (Copy Data, Notebook, Dataflow, Stored Procedure, etc.) failed during execution. This interrupts orchestrated workflows and can prevent downstream activities from running.

**Common Causes:**
- Source or destination connectivity issues (Lakehouse, external data sources)
- Insufficient permissions for the pipeline to access artifacts or storage
- Timeout errors for long-running notebook or dataflow activities
- Capacity throttling or resource exhaustion during pipeline execution

#### How to Fix the Error

**Fix 1: Review Pipeline Run Details and Activity Errors**

1. Navigate to the Pipeline > Monitor view or Pipeline runs history
2. Identify the failed activity and review error messages
3. Check the activity input/output JSON for connection details and parameters
4. Verify source and destination artifacts are accessible and exist
5. Review the activity configuration for typos in artifact names or paths

**Fix 2: Validate Connectivity and Permissions**

For connectivity and authorization issues:
- Test source/destination connections independently (Lakehouse, SQL endpoints, external sources)
- Ensure the pipeline has appropriate workspace role (Contributor or higher)
- For Notebook activities: Verify the notebook runs successfully standalone before including in pipeline
- For Copy activities: Confirm Read permissions on source and Write permissions on destination
- For Lakehouse destinations: Ensure table schemas match expected data types

**Fix 3: Optimize Activity Timeouts and Retry Logic**

For timeout and transient errors:
- Increase activity timeout values for long-running operations (Notebook, Dataflow activities)
- Enable retry policies for transient failures (network issues, temporary throttling)
- Configure appropriate retry intervals and maximum retry counts
- For Copy activities: Enable fault tolerance settings to skip bad rows

See [data pipeline monitoring](https://learn.microsoft.com/fabric/data-factory/monitor-pipeline-runs) and [troubleshoot data pipelines](https://learn.microsoft.com/fabric/data-factory/pipeline-troubleshoot-guide) for more information.

## Related content

- [Lakehouse troubleshooting](lakehouse.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Spark advisor introduction](spark-advisor-introduction.md)
