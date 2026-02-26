---
title: Define Jobs for Your Workload
description: Learn how to configure job scheduling and job types for your Fabric workload using the Extensibility Toolkit.
ms.reviewer: gesaur
ms.topic: how-to
ms.date: 12/15/2025
---

# Define Jobs for Your Workload

> [!NOTE]
> Job scheduling functionality for the Extensibility Toolkit is currently under development. The features described below are planned capabilities and may change before release. This guide provides an overview of the upcoming job configuration options.

Jobs in Microsoft Fabric enable workloads to execute background processing tasks, scheduled operations, and automated workflows. When available, the Extensibility Toolkit will support comprehensive job scheduling capabilities that allow your workload to participate in Fabric's unified job management system.

## What are Fabric Jobs?

Fabric jobs are background processes that can be triggered on-demand or scheduled to run at specific intervals. Jobs enable your workload to:

- **Process data asynchronously** - Handle large data operations without blocking the user interface
- **Automate workflows** - Execute routine tasks like data refresh, cleanup, or synchronization
- **Scale operations** - Leverage Fabric's compute resources for intensive processing
- **Integrate with monitoring** - Participate in Fabric's unified monitoring and alerting system

## Job Types and Configuration

When job support becomes available, you'll define jobs in your item manifest using the `<JobScheduler>` configuration section.

### Job Scheduler Structure

The job scheduler configuration includes several key elements:

```xml
<JobScheduler>
    <OnDemandJobDeduplicateOptions>PerItem</OnDemandJobDeduplicateOptions>
    <ScheduledJobDeduplicateOptions>PerItem</ScheduledJobDeduplicateOptions>
    <ItemJobTypes>
        <ItemJobType Name="YourWorkload.YourItem.JobTypeName" />
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

- **WorkloadName**: Your workload identifier (e.g., "MyWorkload")
- **ItemType**: The item type that owns the job (e.g., "DataProcessor")  
- **JobOperation**: Descriptive name for the operation (e.g., "RefreshData")

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

When job support is available, you'll implement job logic in your workload backend:

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

### Event-Driven Jobs

Triggered by specific conditions or external events:

- Data arrival notifications
- Threshold-based processing
- Integration with external systems

## Job Monitoring and Management

Jobs will integrate with Fabric's monitoring infrastructure:

- **Execution tracking** - Monitor job status, duration, and resource usage
- **Error handling** - Automatic retry policies and failure notifications
- **Performance metrics** - Track job performance and optimize execution
- **Audit logging** - Complete audit trail of job executions

## Best Practices for Job Design

When designing jobs for your workload:

### Job Granularity
- Keep individual jobs focused on specific tasks
- Break complex operations into smaller, manageable jobs
- Design for fault tolerance and restart capability

### Resource Management
- Consider memory and compute requirements
- Implement proper cleanup of temporary resources
- Use appropriate deduplication settings

### Error Handling
- Implement robust error handling and logging
- Design for graceful degradation on failures
- Provide meaningful error messages for monitoring

### Security
- Ensure proper authentication and authorization
- Follow least-privilege principles for job execution
- Validate all input data and parameters

## Integration with OneLake

Jobs can leverage OneLake for data operations:

- Read input data from OneLake storage
- Write processed results back to OneLake
- Use shortcuts for external data access
- Maintain data lineage and governance

## Preparing for Job Support

While job functionality is under development, you can prepare by:

- **Designing your job architecture** - Plan what background operations your workload needs
- **Identifying job types** - Determine on-demand vs. scheduled operations
- **Planning data flows** - Design how jobs will interact with OneLake and external systems
- **Considering monitoring** - Plan what metrics and logging you'll need

## Related Content

- [Store Data in OneLake](how-to-store-data-in-onelake.md)
- [Access Fabric APIs](how-to-access-fabric-apis.md)
- [Manifest Overview](manifest-overview.md)
- [Key Concepts and Features](key-concepts.md)

---

> [!NOTE]
> This guide describes planned functionality for the Extensibility Toolkit. Job scheduling capabilities are currently under development and will be available in a future release. Check the documentation for updates on availability and implementation details.
