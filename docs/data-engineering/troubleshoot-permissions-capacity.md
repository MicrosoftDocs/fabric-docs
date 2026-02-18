---
title: Troubleshoot Permission and Capacity Errors in Data Engineering
description: Troubleshoot common permission and capacity issues in Data Engineering in Microsoft Fabric.
author: ValOlson
ms.author: vallariolson
ms.reviewer: eur
ms.date: 02/09/2026
ms.topic: troubleshooting
---

# General troubleshooting for Microsoft Fabric Data Engineering 

This article provides guidance for troubleshooting common errors such as permission and capacity issues you might encounter when working with Data Engineering workloads in Microsoft Fabric.

## Error messages and resolution categories

Use this reference table to quickly identify common permission and capacity error messages and navigate to their troubleshooting solutions.

| Errors | Resolution category|
|-------|---------------------------|
| 403 Forbidden / Access Denied / Authentication Failed | [Permission and Authorization Errors](#permission-and-authorization-errors) |
| Spark job can't be run because you exceeded a spark compute limit / HTTP 430 | [Capacity Exceeded - Spark Job Can't Be Run](#error-capacity-exceeded---spark-job-cant-be-run) | 
| API Rate Limit Exceeded / HTTP 429 | [API Rate Limit Exceeded](#error-api-rate-limit-exceeded) |
| Capacity Not Active at Lakehouse Refresh | [Capacity Not Active at Refresh](#error-capacity-not-active-at-refresh) |

## Permission and Authorization Errors

This section helps you diagnose and resolve authentication and authorization issues when accessing Data Engineering artifacts in Microsoft Fabric.

### Error: Authentication Failed

This kind of error indicates that your account lacks the necessary permissions to access or modify Data Engineering resources.

**Error Messages:**
- 403 Forbidden / Access Denied / Authentication Failed with Access token validation failed / Unauthorized To Access Table Files
- User is not authorized. User requires at least 'ReadAll' permission on the artifact
- User is Not Authorized to Access the Files in Storage Path for the Delta Table

#### Scenario

This issue typically occurs when you are attempting to access or query data in a Lakehouse or run a Spark notebook without the required permissions.

#### Common Causes

The following are the most common permission-related issues:
- Opening a Lakehouse in Fabric and attempting to query tables using SQL or Spark without sufficient workspace role (need Contributor or higher for most operations)
- Running a notebook or Spark job definition that reads from or writes to a Lakehouse without artifact-level permissions (Read, ReadData, or ReadAll)
- Missing Azure Storage "Storage Blob Data Contributor" or "Storage Blob Data Reader" role assignment for Delta tables using ADLS or OneLake
- Access token expired, invalid, or missing required scopes during authentication

#### What Happened
Your user account or service principal lacks the necessary permissions to access data engineering artifacts (Lakehouses, Notebooks, Spark job definitions, Pipelines), underlying storage, shortcuts, or perform specific operations. Access can be denied at multiple levels: workspace permissions, artifact permissions, storage-level permissions, or authentication failures with the catalog service.

#### How to Fix the Error

Follow one or more of these solutions to resolve the error.

**Fix 1: Verify and Assign Workspace and Artifact Permissions**

Ensure you have the appropriate workspace role and data access permissions:

1. Navigate to Workspace Settings > Manage access
2. Add your user with **Contributor**, **Member**, or **Admin** role (Viewer role has limited access)
3. Navigate to the artifact (Lakehouse, Notebook, Pipeline) > Manage permissions
4. For SQL querying: Grant "Read all data using SQL" (**ReadData** permission)
5. For Spark access: Grant "Read all data using Apache Spark" (**ReadAll** permission)
6. For Power BI connections: Grant at least "Read" permission for metadata access
7. Log out and log back in for permissions to take effect

> [!IMPORTANT]
>ReadData and ReadAll serve different purposes. For users who need both SQL and Spark access, grant both permissions.

See [workspace permission model](../security/permission-model.md) and [share warehouse and manage permissions](../data-warehouse/share-warehouse-manage-permissions.md) for more details.

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

See [lakehouse sharing documentation](lakehouse-sharing.md) for permission layers.

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

See [OneLake shortcuts](../onelake/onelake-shortcuts.md) and [troubleshoot lakehouse connector](../data-factory/connector-troubleshoot-lakehouse.md) for more information.

## Capacity and Rate Limiting Errors

This section addresses issues related to capacity limits, throttling, and rate limiting in Microsoft Fabric.

### Error: Capacity Exceeded - Spark Job Can't Be Run

This error occurs when your Spark workloads exceed the available compute resources in your Fabric capacity.

**Error Messages:**
- HTTP 430 Too many requests for capacity
- Spark job can't be run because you exceeded a spark compute limit
- Capacity limit exceeded

#### Scenario

This issue typically occurs when you are running multiple Spark workloads simultaneously or executing resource-intensive data processing jobs.

#### Common Causes

The following situations commonly trigger capacity exceeded errors:
- Starting a Spark notebook or Spark job definition when multiple other Spark sessions are already running in the workspace, exceeding concurrent job limits
- Executing large-scale ETL operations that consume significant Compute Units beyond the capacity SKU allocation
- Orphaned or stalled Spark sessions consuming resources in the background
- Insufficient capacity SKU for your Spark workload demands

#### What Happened
Your Microsoft Fabric capacity has exceeded its allocated Compute Units (CUs) for Spark workloads, causing the service to throttle or reject Spark job execution. This affects Spark jobs, notebooks, Spark job definitions, and data pipelines using Spark activities.

#### How to Fix the Error

Use one or more of these strategies to reduce capacity consumption and prevent throttling of your Spark workloads.

**Fix 1: Enable Autoscale Billing for Spark Workloads**

Enable Autoscale Billing to offload Spark jobs from your Fabric capacity to dedicated, serverless resources with pay-as-you-go billing. With Autoscale Billing enabled, Spark jobs no longer consume Compute Units (CUs) from your Fabric capacity, eliminating capacity exceeded errors for Spark workloads:

1. Navigate to the [Fabric Admin Portal](https://app.fabric.microsoft.com/admin) and select **Capacity settings** > **Fabric capacity**.
1. Select the capacity you want to configure and scroll to the **Autoscale Billing for Fabric Spark** section.
1. Enable the **Autoscale Billing** toggle.
1. Use the slider to set the **Maximum Capacity Units (CU)** you want to allocate to Spark jobs. You're only billed for the compute used, up to this limit.
1. Select **Save** to apply your settings.

Autoscale Billing is purely serverless and pay-as-you-go—you set the maximum CU limits and are only charged for CUs consumed by the jobs that you run. This is particularly effective for dynamic or bursty Spark workloads that cause capacity exceeded errors under the standard capacity model.

See [configure Autoscale Billing for Spark](configure-autoscale-billing.md) and [Autoscale Billing overview](autoscale-billing-for-spark-overview.md) for more details.

**Fix 2: Monitor and Identify High-Consumption Spark Workloads**

Use the [Fabric Capacity Metrics app](../enterprise/capacity-planning-troubleshoot-consumption.md) to identify which workspaces, users, or jobs are consuming the most Compute Units:
1. Navigate to Admin Portal and access the Capacity Metrics app
2. Review real-time utilization, throttling events, and overages
3. Check the Compute page, Timepoint page, and Throttling tab to identify resource issues
4. Identify specific Spark operations causing the capacity overload

Understanding [how Fabric capacity throttling works](../enterprise/throttling.md) is essential. Fabric uses "bursting" and "smoothing" to handle temporary spikes, but sustained overloads trigger throttling.

**Fix 3: Reduce Concurrent Spark Operations and Optimize Workloads**

For Spark operations (Notebooks, Spark job definitions):
- Stagger job execution times to avoid peak loads
- Stop long-running or stalled notebooks and Spark sessions
- Manage [Spark job concurrency limits](spark-job-concurrency-and-queueing.md)
- Restart your Fabric capacity from the Admin Portal (Capacity Settings > Fabric Capacity > Restart) to clear orphaned sessions. Wait approximately 10 minutes before retrying operations
- Optimize Spark jobs to use resources more efficiently

**Fix 4: Scale Up Your Capacity**

If throttling occurs frequently despite optimization and autoscale, upgrade to a higher capacity SKU (e.g., from F2 to F8 or F16) to increase your available Compute Units. Higher SKUs allow more concurrent Spark jobs and higher throughput.

Use the [capacity planning and troubleshooting guide](../enterprise/capacity-planning-troubleshoot-errors.md) to evaluate your needs and determine the appropriate SKU.

### Error: API Rate Limit Exceeded

This error indicates you've exceeded the allowed number of API requests to Fabric services within a given time window.

**Error Messages:**
- HTTP 429 Too Many Requests
- API Rate Limit Exceeded
- Request rate limit exceeded

#### Scenario

This issue typically occurs when you are making frequent API calls to Fabric services programmatically or running automated scripts.

#### Common Causes

The following situations lead to API rate limiting:
- Running a script that repeatedly calls Lakehouse metadata APIs (such as ListTables or GetTable) in a loop without throttling
- Executing multiple concurrent processes that access the same Lakehouse artifacts simultaneously
- Making too many API calls in a short time period without implementing retry logic with backoff strategies

#### What Happened
Your application or workload has exceeded the allowed number of API requests to Microsoft Fabric services (such as Lakehouse APIs) within a specific time window. The service is throttling requests to protect system stability.

#### How to Fix the Error

Implement any of the following solutions to handle rate limiting gracefully and reduce API request frequency.

**Fix 1: Implement Request Throttling and Retry Logic**

Add exponential backoff retry logic to handle HTTP 429 responses gracefully:
- Implement retry logic with exponential backoff (wait 1s, 2s, 4s, 8s between retries)
- Respect the `Retry-After` header in HTTP 429 responses when provided
- Set maximum retry attempts to avoid infinite loops
- Add jitter to retry delays to prevent synchronized retry storms

```python
import time
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configure retry strategy
retry_strategy = Retry(
    total=5,
    backoff_factor=2,
    status_forcelist=[429, 500, 502, 503, 504],
    allowed_methods=["GET", "POST"]
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session = requests.Session()
session.mount("https://", adapter)
```

**Fix 2: Reduce API Request Frequency**

Optimize your code to minimize API calls:
- Avoid repeated API calls in tight loops or parallel operations
- Cache API responses when data doesn't change frequently
- Batch operations where possible instead of individual requests
- Reduce the number of concurrent operations accessing the same Lakehouse
- Spread API requests over time rather than making many requests simultaneously

**Fix 3: Review Application Design and Access Patterns**

For persistent rate limiting issues:
- Profile your application to identify API call hotspots
- Consider alternative approaches (e.g., querying data through Spark instead of repeated API calls)
- Distribute workload across multiple Lakehouses if appropriate
- If legitimate high-volume API access is required, contact Microsoft Support to discuss your scenario

### Error: Capacity Not Active at Refresh

This error occurs when your workspace isn't properly connected to an active Fabric capacity.

**Error Messages:**
- Capacity Not Active at Lakehouse Refresh
- Capacity Not Active

#### Scenario

This issue typically occurs when you are attempting to perform data engineering operations in a workspace that is not properly connected to an active Fabric capacity.

#### Common Causes

The following situations cause capacity activation errors:
- Triggering a scheduled Lakehouse refresh when the workspace's capacity assignment has been removed or the capacity is overloaded or throttled
- Attempting to run a notebook or pipeline after the workspace has been moved from a Fabric capacity to a trial or free tier
- Capacity has been paused or suspended by an administrator

#### What Happened

The workspace is not connected to an active Fabric capacity, or the capacity is experiencing issues that prevent data engineering operations from executing.

#### How to Fix the Error

Use one or more of the following fixes to verify and restore your workspace’s connection to an active Fabric capacity.

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

## Related content

- [Data pipeline monitoring](../data-factory/monitor-pipeline-runs.md) 
- [Troubleshoot data pipelines](../data-factory/pipeline-troubleshoot-guide.md) 
- [Lakehouse troubleshooting](troubleshoot-lakehouse.md)
- [Notebook troubleshooting](../data-science/fabric-notebooks-troubleshooting-guide.md)
- [Apache Spark monitoring overview](spark-monitoring-overview.md)
- [Spark advisor introduction](spark-advisor-introduction.md)
