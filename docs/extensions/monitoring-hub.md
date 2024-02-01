---
title: Fabric extensibility monitoring hub
description: Learn about the Fabric extensibility monitoring hub.
author: paulinbar
ms.author: painbar
ms.reviewer: muliwienrib
ms.topic: how-to
ms.custom:
ms.date: 02/01/2024
---

# Onboarding to Fabric monitoring hub

The monitoring hub is the centralized monitoring center designed for fabric users to track artifact background jobs. For additional information about the monitoring hub, refer to the [official documentation](../admin/monitoring-hub.md).

## Backend

### Step 1 - Define the 'JobScheduler' property Inside the artifact manifest

To enable job support, the artifact must specify the types of jobs it supports. This is accomplished by adding the `JobScheduler` property to the artifact manifest. Below is an overview of the supported `JobScheduler` definition properties:

* **JobScheduler**: Enables Trident-managed jobs for your artifacts.
    * *Enabled*: true/false to enable/disable the job scheduler.
    * *JobHistoryCount*: Sets the maximum job records count per artifact. Once the limit is reached, old job instances will be deleted.
    * *JobDeadletterHours*: A job will be marked as a Dead Letter by the fabric platform if it hasn't started executing for N hours.
    * *OnDemandJobDeduplicateOptions*: Sets the deduplication option for on-demand artifact jobs. Possible values:
        * *None*: Do not deduplicate the job.
        * *PerArtifact*: Ensure there is only one active job run for the same artifact and job type.
        * *PerUser*: Ensure there is only one active job run for the same user and artifact.

    * *ScheduledJobDeduplicateOptions*: Sets the deduplication option for on-demand artifact jobs. Possible values:
        * *None*: Do not deduplicate the job.
        * *PerArtifact*: Ensure there is only one active job run for the same artifact and job type.
        * *PerUser*: Ensure there is only one active job run for the same user and artifact.

    * *JobStatusPullingInterval*: If specified, Fabric will pull the job status and properties from the workload at the specified interval in minutes. This value should be greater than 0 and less than 6. If not specified, the time interval will change with the job runs.
        * *ArtifactJobTypes*: A list of job types with the following properties:
        * *Name*: The name of the job type, which is fully customizable by the ISV.
        * *EnabledForUser*: true/false to enable/disable the job type.
        * *MaxConsecutiveFailuresCount* (optional): Disable scheduled jobs if there are N consecutive failed scheduled jobs.

For an example of how the `JobScheduler` property is defined in our sample artifact definition, refer to [WorkloadManifest.xml](https://github.com/microsoft/Microsoft-Fabric-developer-sample/blob/main/Backend/src/Packages/manifest/files/WorkloadManifest.xml).

### Step 2: Implement 'IFabricItemsJobsHandler'

Our SDK provides an abstract class that your workloads need to implement in order to support jobs. Currently, this class has three methods you need to implement:

1. **OnRunFabricItemJobAsync**

   This method is called whenever a job should be executed. The workload will receive all the necessary information to start running the job, including operation context (Tenant, Capacity, Workspace, and item IDs), item and job type, job instance ID (a unique identifier for the current job), and job properties which include a payload sent from the UI.

2. **OnCancelFabricItemJobInstanceAsync**

   This method is called whenever a job should be canceled. The workload will receive the same properties as OnRunFabricItemJobAsync, except for the jobProperties, which are irrelevant in this case.

3. **OnGetFabricItemJobInstanceStatusAsync**

   Fabric uses a polling mechanism to sync job status in our platform. The polling intervals are defined in the artifact definition as shown in Step 1. This method is invoked every N minutes while the job is still in progress to check its status. When the job is done, either successfully or with an error, Fabric will stop polling its status. The workload will receive the same properties as OnRunFabricItemJobAsync, except for the jobProperties, which are irrelevant in this case.

All job handlers return a `FabricItemJobResult`, with the most important property being `JobInstanceStatus`.

Currently, we support the following job statuses:

```csharp
[DataContract]
public enum FabricItemJobStatus
{
    NotStarted,
    InProgress,
    Completed,
    Failed,
    Cancelled,
    NotFound
}
```

Once your workload implements IFabricItemsJobsHandler, register this class in program.cs, e.g. services.AddSingleton<IFabricItemsJobsHandler, FabricItemsJobsHandler>();.

For an example of how to implment this class  refer to [FabricItemsJobsHandler.cs](Backend/src/FabricItemsJobsHandler.cs).



## Frontend

### How to Run a Job in fabric UI.

After integrating jobs into your artifacts in the backend, users can start running jobs. Currently, there are two ways to run jobs in Fabric:

1. **Unattended Scheduled Job:** Defined by the user to run at regular intervals using shared Fabric Scheduler Experience. 
2. **On Demand using Workload UI with Extension Client SDK:** 

#### Fabric Scheduler Experience from the UI
- Entry Points:
1. Context menu -> Schedule
   ![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/d954b0fa-b801-4b1b-bdb1-f36a47237a33)

2. Using extensionClient.artifactSettings.open where the selected settings Id is 'Schedule'


- Layout
   ![image](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/35b8e385-ce3f-4b39-b728-a1e8a0be947c)
1. Last success refresh time and next refresh time
2. Refresh button
3. Artifact schedule settings

**Onboarding**

**Step 1: Add Schedule Context Menu Item**
In order to show the schedule button in the artifact context menu, you will need to add a new entry into the 'contextMenuItems' property in the artifact frontend manifest like this:

```json
{
    "name": "schedule"
}
```

**Step 2: Add Artifact Schedule Settings**

Add a new 'schedule' entry to artifact settings property in the frontend manifest.

```json
"schedule": {
    "artifactJobType": "ScheduledJob",
    "refreshType": "Refresh"
}
```

- `artifactJobType`: Artifact job type defined in artifact job definition XML file.
- `refreshType`: Specifies the display of the refresh button. There are three types: using "Refresh" and "Run" to enable refresh button and display name, setting "None" to disable refresh button.

For an example of this frontend manifest properties, refer to [localWorkloadManifest.json](Frontend/Manifests/localWorkloadManifest.json).

#### Jobs Javascript APIs

In addition to unattended scheduled jobs, a workload can run a job on demand or even start a scheduled job on demand. We provide a set of APIs as part of our extension client:

**Scheduled Jobs APIs:**
- `getArtifactScheduledJobs(objectId: string): Promise<ArtifactSchedule>`
- `createArtifactScheduledJobs(createArtifactScheduledJobs: CreateArtifactScheduleParams): Promise<ArtifactSchedule>`
- `updateArtifactScheduledJobs(updateArtifactScheduleParams: UpdateArtifactScheduleParams): Promise<ArtifactSchedule>`

**Specific Job Instance APIs:**
- `runArtifactJob(jobParams: RunArtifactJobParams): Promise<ArtifactJobInstance>`
- `cancelArtifactJob(jobParams: CancelArtifactJobParams): Promise<CancelArtifactJobResult>`
- `getArtifactJobHistory(getHistoryParams: GetArtifactJobHistoryParams): Promise<ArtifactJobHistory>`

**Note:** 'getArtifactJobHistory' returns the job with the status currently stored in Fabric. 
As we currently rely solely on polling, please be aware that the status might not be the most up-to-date. 
In the future, we may introduce support for the workload side to push status updates directly to Fabric. 
However, for now, if you require your UI to reflect the most accurate status as soon as possible, we recommend obtaining the status directly from your backend.


### Integration with monitoring hub
Once the data is ready, the artifact jobs will automatically show up in the monitoring hub. 
The next step would be to add your artifact type to the filter pane and config and implement available actions that user can take against the jobs.

#### Enable your artifact in monitoring hub filter pane.
To add your artifact into the filter pane, you just need to define a new property in the artifact Frontend manifest: '"supportedInMonitoringHub": true'

#### Integrate with Job quick actions.
![actopms](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/bc2f63e8-57df-4394-8c43-3e8ea95d9829)

There is a set of operations that user can execute against a job, like cancel, retry, and get details.  
The workload team will decide which one they want to enable by setting 'artifactJobConfig' property in the artifact Frontend manifest. If not set, the icons will not be visible. 

For example, below is the config we added to our sample artifact that supports all job actions.   
When a user clicks on cancel icon of sample artifact job, we will call the provided action “artifact.job.cancel” with the job related context to the extension “Fabric.WorkloadSample” which is implemented by workload to actually cancel the job.

Fabric platform is also expecting a response from this action to notify the user with results.

```json
"artifactJobActionConfig": {
    "registeredActions": {
        "detail": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "artifact.job.detail"
        },
        "cancel": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "artifact.job.cancel"
        },
        "retry": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "artifact.job.retry"
        }
    }
}
```

#### Job Details pane
![Details](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/d5bd9595-e636-4326-8a73-ab67caa88958)

When the workload team registers the action for detailed information, Fabric is expecting the workload action to return the data in certain format so that Fabric will display that in the side panel. 
Currently, key value pairs in plain text or hyperlink is supported. In the future, more options will be available.

For an example of this frontend manifest properties, refer to [localWorkloadManifest.json](Frontend/Manifests/localWorkloadManifest.json).

For an example of handling the job actions, refer to [index.worker.ts](Frontend/src/index.worker.ts). and search for actions starting with 'artifact.job'

### Recent runs
In addition to viewing jobs in the monitoring hub, Fabric also offers a shared user experience to display the recent runs of a specific artifact.

- Entry Points:
1. Context menu -> Recent runs
<img width="387" alt="recent-runs-list" src="https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/a8c78afd-d2d3-4120-9ff1-27849d81d290">


2. Using extensionClient.artifactRecentRuns.open.

**Onboarding**

**Step 1: Add recentRuns Context Menu Item**
In order to show the recent runs button in the artifact menu, you will need to add a new entry into the 'contextMenuItems' property in the artifact frontend manifest like this:

```json
{
    "name": "recentruns"
}
```

**Step 2: Add Artifact recentRun Settings**
Add a new 'recentRun' entry to artifact settings property in the frontend manifest.

```json
"recentRun": {
     "useRecentRunsComponent": true,
}
```


### Jobs integration in the sample artifact ribbon.
As part of our UI workload sample, we added a section in the artifact ribbon specifically dedicated to jobs. 
![artiafctTab](https://github.com/microsoft/Microsoft-Fabric-developer-sample/assets/26460388/751b6b86-7cd3-46ad-97d9-42d83e27d79d)


For an example of how this ribbon was implemeted, refer to [ArtifactTabToolbar.tsx](Frontend/src/components/SampleWorkloadRibbon/ArtifactTabToolbar.tsx).