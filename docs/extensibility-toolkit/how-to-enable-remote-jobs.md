---
title: Define Jobs for Your Workload
description: Learn how to configure job scheduling and job types for your Fabric workload using the Extensibility Toolkit.

ms.author: billmath
ms.topic: how-to
ms.custom:
ms.date: 12/15/2025
ai-usage: ai-assisted
---

# Define Jobs for Your Workload

Jobs in Microsoft Fabric are long-running operations that execute background processing tasks, scheduled operations, and automated workflows. Fabric provides a [job scheduler](/rest/api/fabric/core/job-scheduler) to manage job execution and a [monitoring hub](/fabric/admin/monitoring-hub) where users can view the status and history of their jobs.

## What are Fabric Jobs?

Jobs are background processes that can be triggered on-demand or scheduled to run at specific intervals. Jobs play an important role when:

- **Items need to run code on a regular basis** - Scheduled data refresh, periodic maintenance, or automated report generation
- **The user is not in front of the UI** - Background processing, overnight operations, or long-running data transformations
- **Process data asynchronously** - Handle large data operations without blocking the user interface
- **Scale operations** - Leverage compute resources for intensive processing tasks

Jobs integrate with Fabric's unified [monitoring hub](/fabric/admin/monitoring-hub), allowing users to track job execution status, view history, and troubleshoot issues across all their Fabric items.

## Defining Jobs in the Item Manifest

Custom items define their jobs in the item manifest using the `<JobScheduler>` configuration section. Jobs defined in the manifest appear in Fabric's [job scheduler](/rest/api/fabric/core/job-scheduler) and [monitoring hub](/fabric/admin/monitoring-hub), but the job execution logic runs outside of Fabric.

### Job Scheduler Structure

Here's an example of job configuration in the item manifest:

```xml
<JobScheduler>
    <OnDemandJobDeduplicateOptions>PerItem</OnDemandJobDeduplicateOptions>
    <ScheduledJobDeduplicateOptions>PerItem</ScheduledJobDeduplicateOptions>
    <ItemJobTypes>
        <ItemJobType Name="{{WORKLOAD_NAME}}.HelloWorld.RunJob" />
    </ItemJobTypes>
</JobScheduler>
```

### Deduplication Options

Control how concurrent job executions are handled:

- **`None`** - No deduplication; multiple instances of the same job can run simultaneously
- **`PerItem`** - Only one job of the same type can run per item at a time
- **`PerUser`** - Only one job of the same type can run per user and item combination

### Defining Job Types

Each job type represents a specific operation your workload can perform:

```xml
<ItemJobTypes>
    <ItemJobType Name="MyWorkload.DataProcessor.RefreshData" />
    <ItemJobType Name="MyWorkload.DataProcessor.GenerateReport" />
    <ItemJobType Name="MyWorkload.DataProcessor.CleanupTemp" />
</ItemJobTypes>
```

#### Job Naming Convention

Job names must follow the pattern: `{WorkloadName}.{ItemType}.{JobOperation}`

- **WorkloadName**: Your workload identifier (for example, "MyWorkload")
- **ItemType**: The item type that owns the job (for example, "DataProcessor")  
- **JobOperation**: Descriptive name for the operation (for example, "RefreshData")

## Implementing Job Execution

Jobs defined in custom items can't run directly within Fabric. Instead, you need to implement a remote endpoint that Fabric calls when a job is triggered. This gives you full control over where and how your job logic executes.

For detailed information about implementing and configuring remote endpoints, see [How-To: Enable remote endpoints for custom items](how-to-enable-remote-endpoint.md).

## Example Job Configuration

Here's an example of how a data processing workload might configure jobs:

```xml
<JobScheduler>
    <OnDemandJobDeduplicateOptions>PerItem</OnDemandJobDeduplicateOptions>
    <ScheduledJobDeduplicateOptions>PerUser</ScheduledJobDeduplicateOptions>
    <ItemJobTypes>
        <!-- Scheduled data refresh job -->
        <ItemJobType Name="DataInsights.Pipeline.ScheduledRefresh" />
        
        <!-- On-demand data export job -->
        <ItemJobType Name="DataInsights.Pipeline.ExportToParquet" />
        
        <!-- Data transformation job -->
        <ItemJobType Name="DataInsights.Pipeline.TransformData" />
        
        <!-- Cleanup and maintenance job -->
        <ItemJobType Name="DataInsights.Pipeline.MaintenanceCleanup" />
    </ItemJobTypes>
</JobScheduler>
```

## Job Implementation Patterns

Jobs are triggered by Fabric and execute at your remote endpoint. Consider these common patterns:

### On-Demand Jobs

Triggered by user actions or API calls:

- Data exports and transformations
- Ad-hoc analysis operations  
- User-initiated processing tasks

### Scheduled Jobs

Run automatically based on time intervals:

- Regular data refresh operations
- Periodic maintenance tasks
- Automated report generation

## Job Monitoring and Management

Jobs integrate with Fabric's [monitoring hub](/fabric/admin/monitoring-hub) infrastructure:

- **Execution tracking** - Monitor job status, duration, and resource usage in the monitoring hub
- **Error handling** - Implement retry policies and failure notifications in your remote endpoint
- **Performance metrics** - Track job performance through the monitoring hub
- **Audit logging** - Complete audit trail of job executions available in Fabric

## Best Practices for Job Design

When designing jobs for your workload:

### Job Granularity
- Keep individual jobs focused on specific tasks
- Break complex operations into smaller, manageable jobs
- Design for fault tolerance and restart capability

### Resource Management
- Choose appropriate compute resources for your remote endpoint
- Consider memory and compute requirements for job execution
- Implement proper cleanup of temporary resources
- Use appropriate deduplication settings to prevent concurrent execution issues

### Error Handling
- Implement robust error handling and logging in your remote endpoint
- Design for graceful degradation on failures
- Provide meaningful error messages that appear in the monitoring hub
- Implement retry logic for transient failures

### Security
- Ensure proper authentication and authorization for your remote endpoint
- Secure communication between Fabric and your endpoint
- Follow least-privilege principles for job execution
- Validate all input data and parameters

## Integration with OneLake

Jobs can leverage OneLake for data operations:

- Read input data from OneLake storage
- Write processed results back to OneLake
- Use shortcuts for external data access
- Maintain data lineage and governance

## Integrate with the Monitoring Hub

When jobs are configured for your items, they automatically appear in Fabric's [monitoring hub](/fabric/admin/monitoring-hub). To provide the best user experience, you can integrate additional features that allow users to monitor, manage, and interact with jobs.

### Enable Your Item in the Monitoring Hub Filter Pane

To make your item type available in the monitoring hub's filter pane, add the `supportedInMonitoringHub` property to your item's frontend manifest:

```json
{
  "supportedInMonitoringHub": true
}
```

This allows users to filter jobs by your custom item type in the monitoring hub.

### Integrate with Job Quick Actions

The monitoring hub provides quick action buttons for each job, allowing users to perform operations like cancel, retry, and view details directly from the monitoring hub interface.

:::image type="content" source="media/how-to-enable-remote-jobs/monitoring-hub-quick-actions.png" alt-text="Screenshot showing jobs quick actions buttons in the monitoring hub.":::

Configure which actions are available for your jobs by adding the `itemJobActionConfig` property to the item frontend manifest:

```json
"itemJobActionConfig": {
    "registeredActions": {
        "detail": {
            "extensionName": "YourWorkload.ExtensionName",
            "action": "item.job.detail"
        },
        "cancel": {
            "extensionName": "YourWorkload.ExtensionName",
            "action": "item.job.cancel"
        },
        "retry": {
            "extensionName": "YourWorkload.ExtensionName",
            "action": "item.job.retry"
        }
    }
}
```

When a user selects an action button, Fabric calls the registered action in your extension. For example, when a user selects the Cancel icon, Fabric calls the `item.job.cancel` action, which your extension must implement.

Your action handler receives the job-related context and must respond with the operation result to notify the user.

### Job Details Pane

When you register the detail action, Fabric displays job information in a side panel when users select the details button.

:::image type="content" source="media/how-to-enable-remote-jobs/monitoring-hub-job-details-pane.png" alt-text="Screenshot showing the job details pane in the monitoring hub.":::

Your detail action must return data in a specific format for Fabric to display it correctly. Currently, Fabric supports key/value pairs as plain text or hyperlinks.

Example response format:

```typescript
{
  details: [
    { key: "Job ID", value: "12345" },
    { key: "Start Time", value: "2025-01-15 10:30:00" },
    { key: "Status", value: "Completed" },
    { 
      key: "Logs", 
      value: "https://your-logs-url.com",
      isLink: true 
    }
  ]
}
```

### Recent Runs

In addition to the monitoring hub, Fabric provides a Recent Runs view specifically for individual items. Users can access this view through:

- Context menu > **Recent runs**
- Using the `workloadClient.itemRecentRuns.open()` API

:::image type="content" source="media/how-to-enable-remote-jobs/monitoring-hub-recent-runs.png" alt-text="Screenshot of the recent runs option in the options menu.":::

#### Enable Recent Runs

**Step 1: Add recentruns context menu item**

To show the **Recent runs** button in the item context menu, add a new entry to the `contextMenuItems` property in the item frontend manifest:

```json
{
    "name": "recentruns"
}
```

**Step 2: Add item recentRun settings**

Add a new `recentRun` entry to the item settings property in the frontend manifest:

```json
"recentRun": {
    "useRecentRunsComponent": true
}
```

This enables the shared Fabric Recent Runs UI component for your item.

### Jobs Integration Example

For a complete example of job action implementation, see the [Fabric Workload Development Sample repository](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample). Look for:

- **Backend implementation**: `JobsControllerImpl.cs` - Shows how to implement the job APIs
- **Frontend action handlers**: `index.worker.ts` - Search for actions beginning with `item.job` to see how to handle cancel, retry, and detail actions

## Related Content

- [Authenticate Remote Endpoints](authentication-remote.md)
- [Enable Remote Endpoints for Custom Items](how-to-enable-remote-endpoint.md)
- [Job Scheduler API](/rest/api/fabric/core/job-scheduler)
- [Monitoring Hub](/fabric/admin/monitoring-hub)
- [Store Data in OneLake](how-to-store-data-in-onelake.md)
- [Access Fabric APIs](how-to-access-fabric-apis.md)
- [Manifest Overview](manifest-overview.md)
