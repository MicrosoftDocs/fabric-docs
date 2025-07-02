---
title: Fabric workload monitoring hub
description: Learn how to use the monitoring hub in the Microsoft Fabric Workload Development Kit.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 05/21/2024
---

# Set up the Fabric monitoring hub

The monitoring hub in the Microsoft Fabric Workload Development Kit is the centralized monitoring center. The monitoring hub is designed for Fabric users to track item background jobs. For more information, see [Use the monitoring hub](../admin/monitoring-hub.md).

## Backend

This section describes how to set up a backend implementation for the monitoring hub.

### Define the `JobScheduler` property in the item manifest

To enable job support, the item must specify the types of jobs it supports. Add the `JobScheduler` property to the item manifest file. The `JobScheduler` property enables Fabric-managed jobs for your items.

The following table provides an overview of the supported `JobScheduler` definition properties:

| Property | Description | Possible values |
| --- | --- | --- |
| `OnDemandJobDeduplicateOptions` |Sets the deduplication option for on-demand item jobs. | - `None`: Don't deduplicate the job. <br> - `PerArtifact`: Ensure that there's only one active job run for the same item and job type. <br> - `PerUser`: Ensure that there's only one active job run for the same user and item.
| `ScheduledJobDeduplicateOptions` | Sets the deduplication option for on-demand item jobs. |- `None`: Don't deduplicate the job. <br> - `PerArtifact`: Ensure there's only one active job run for the same item and job type. <br> - `PerUser`: Ensure that there's only one active job run for the same user and item.
| `ItemJobTypes`| A list of job types with the specified properties. | - `Name`: The name of the job type, which is fully customizable by the independent software vendor (ISV).

### Implement job workload APIs

To integrate with jobs, a workload must implement the Jobs APIs as defined in the [Swagger specification](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Contracts/FabricAPI/Workload/swagger.json).

Three Fabric APIs are related to jobs:

---

#### **Start the job instance**

**Endpoint**: `POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}`

This API is called to initiate the execution of a job.

- **Response**: The API should return a `202 Accepted` status, indicating that the job was successfully scheduled by the system.

---

#### **Get the job instance state**

**End point**: `GET /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}`

Fabric uses a polling mechanism to track job instance status. This API is called every minute while the job instance is in progress to check its status. Polling stops when the job is completed, whether successfully or due to failure.

- **Response**: The API should return a `200 OK` status along with the current job instance state. The response should include the job status, start times and end times, and error details if the job failed.

   **Supported job statuses**:

  - `NotStarted`
  - `InProgress`
  - `Completed`
  - `Failed`
  - `Cancelled`

   **Important**: Even if the job fails, this API should return a `200 OK` status and a `Failed` job status.

---

#### **Cancel a job instance**

**End point**: `POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}/cancel`

Call this API to cancel an ongoing job instance.

- **Response**: The API should return a `200 OK` status along with the current Job Instance State. The response should include the job status, start and end times, and error details if the job failed.

---

### More information

**Job deadletter count**:

A job is marked as a "dead letter" by the Fabric platform if it doesn't start within 2 hours.

### Example implementation

For an example implementation of these APIs, see *JobsControllerImpl.cs* in the [samples repository](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample).

## Frontend

This section describes how to set up a frontend implementation for the monitoring hub.

### Run a job in the Fabric UI

After you integrate jobs into your items on the backend, users can start running jobs.

Users have two options to run jobs in Fabric:

- An unattended scheduled job. This option is defined by the user to run at regular intervals via a shared Fabric scheduler experience.
- On-demand by using the workload UI with and the extension client SDK.

#### Fabric scheduler experience from the UI

- Entry point options:

  - Use the context menu schedule.

    :::image type="content" source="./media/monitoring-hub/fabric-scheduler-menu.png" alt-text="Screenshot showing the Schedule option in the Fabric scheduler menu.":::

  - Use `workloadClient.itemSettings.open`, where the selected settings ID is `Schedule`.

- Layout

    :::image type="content" source="./media/monitoring-hub/fabric-scheduler-set.png" alt-text="Screenshot showing Fabric scheduler settings.":::

    1. The last successful refresh time and the next refresh time.
    1. The **Refresh** button.
    1. The item schedule settings.

**Onboarding**

**Step 1: Add a schedule context menu item**

To show the **Schedule** button in the item context menu, add a new entry into the `contextMenuItems` property in the item frontend manifest:

```json
{
    "name": "schedule"
}
```

**Step 2: Add item schedule settings**

Add a new `schedule` entry to the item settings property in the frontend manifest:

```json
"schedule": {
    "itemJobType": "ScheduledJob",
    "refreshType": "Refresh"
}
```

- `itemJobType`: The item job type that's defined in the item job definition XML file.
- `refreshType`: Specifies the display of the **Refresh** button. Choose from three options: Use `Refresh` and `Run` to enable the refresh button and display name, or set `None` to disable the **Refresh** button.

#### Jobs JavaScript APIs

In addition to unattended scheduled jobs, a workload can run a job on demand or even start a scheduled job on demand. We provide a set of APIs as part of our extension client:

- **Scheduled jobs APIs**:
  - `getItemScheduledJobs(objectId: string): Promise<ItemSchedule>`
  - `createItemScheduledJobs(createItemScheduledJobs: CreateItemScheduleParams): Promise<ItemSchedule>`
  - `updateItemScheduledJobs(updateItemScheduleParams: UpdateItemScheduleParams): Promise<ItemSchedule>`

- **Specific job instance APIs**:
  - `runItemJob(jobParams: RunItemJobParams): Promise<ItemJobInstance>`
  - `cancelItemJob(jobParams: CancelItemJobParams): Promise<CancelItemJobResult>`
  - `getItemJobHistory(getHistoryParams: GetItemJobHistoryParams): Promise<ItemJobHistory>`

> [!NOTE]
> `getItemJobHistory` returns the job with the status that's currently stored in Fabric. Because Fabric currently relies solely on polling, be aware that the status might not be the most up to date. If you require your UI to reflect the most accurate status as soon as possible, we recommend that you get the status directly from the backend.

### Integrate with the monitoring hub

When the data is ready, the item jobs automatically show up in the monitoring hub. The next step is to add your item type to the filter pane and configure and implement available actions that a user can take against the jobs.

#### Enable your item in the monitoring hub filter pane

To add your item to the filter pane, define a new property in the item frontend manifest and set `supportedInMonitoringHub` to `true`.

#### Integrate with job quick actions

:::image type="content" source="./media/monitoring-hub/monitoring-hub-quick-actions.png" alt-text="Screenshot showing jobs quick actions buttons in the monitoring hub.":::

A user can execute a set of operations against a job, including cancel, retry, and get details.

The workload team decides which one they want to enable by setting the `itemJobConfig` property in the item frontend manifest. If it's not set, the icon isn't visible.

For example, the config we added to our sample item that supports all job actions appears later in this section.

When a user selects the **Cancel** icon of the sample item job, we call the provided action `item.job.cancel`. The job-related context to the extension `Fabric.WorkloadSample` is implemented by the workload to actually cancel the job.

The Fabric platform also expects a response from this action to notify the user with the results.

```json
"itemJobActionConfig": {
    "registeredActions": {
        "detail": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "item.job.detail"
        },
        "cancel": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "item.job.cancel"
        },
        "retry": {
            "extensionName": "Fabric.WorkloadSample",
                "action": "item.job.retry"
        }
    }
}
```

#### Job Details pane

:::image type="content" source="./media/monitoring-hub/monitoring-hub-job-details-pane.png" alt-text="Screenshot showing the job details pane in the monitoring hub.":::

When the workload team registers the action for detailed information, Fabric expects the workload action to return the data in a specific format so that Fabric can display that information in the side panel.

Currently, key/value pairs in plain text or hyperlink are supported.

- For an example of handling the job actions, see *index.worker.ts* in the sample [repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample). In the file, search for actions that begin with `item.job`.

### Recent runs

In addition to displaying job status in the monitoring hub, Fabric offers a shared user experience to display the recent runs of a specific item.

Entry points:

- **Context menu** > **Recent runs**

    :::image type="content" source="./media/monitoring-hub/monitoring-hub-recent-runs.png" alt-text="Screenshot of the recent runs option in the options menu.":::

- Using `workloadClient.itemRecentRuns.open`.

**Onboarding**

**Step 1: Add `recentRuns` context menu item**

To show the **Recent runs** button in the item menu, add a new entry into the `contextMenuItems` property in the item frontend manifest.

Example:

```json
{
    "name": "recentruns"
}
```

**Step 2: Add item `recentRun` settings**

Add a new `recentRun` entry to the item settings property in the frontend manifest.

Example:

```json
"recentRun": {
     "useRecentRunsComponent": true,
}
```

### Jobs integration in the sample item ribbon

As part of our UI workload sample, we added a section that's dedicated to jobs to the item ribbon.

:::image type="content" source="./media/monitoring-hub/jobs-tab.png" alt-text="Screenshot showing the Item tab in the Fabric UI.":::

For an example of how this ribbon was implemented, see *ItemTabToolbar.tsx* in the sample [repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample).

## Related content

- [Use the monitoring hub](../admin/monitoring-hub.md)
