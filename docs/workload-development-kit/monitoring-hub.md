---
title: Fabric Workload Development Kit monitoring hub (preview)
description: Learn about the Fabric Workload Development Kit monitoring hub.
author: KesemSharabi
ms.author: kesharab
ms.topic: how-to
ms.custom:
ms.date: 05/21/2024
---
# Onboard to the Fabric monitoring hub (preview)

The monitoring hub is the centralized monitoring center designed for Fabric users to track item background jobs. For more information about the monitoring hub, see [Use the Monitoring hub](../admin/monitoring-hub.md).

## Backend

### Step 1 - Define the `JobScheduler` property inside the item manifest

To enable job support, the item must specify the types of jobs it supports. Add the `JobScheduler` property to the item manifest. The `JobScheduler` enables Fabric-managed jobs for your items. The following is an overview of the supported `JobScheduler` definition properties:

| Property | Description | Possible Values |
| --- | --- | --- |
| *OnDemandJobDeduplicateOptions* |Sets the deduplication option for on-demand item jobs. | - *None*: Don't deduplicate the job. <br> - *PerArtifact*: Ensure there's only one active job run for the same item and job type. <br> - *PerUser*: Ensure there's only one active job run for the same user and item.
| *ScheduledJobDeduplicateOptions* | Sets the deduplication option for on-demand item jobs. |- *None*: Don't deduplicate the job. <br> - *PerArtifact*: Ensure there's only one active job run for the same item and job type. <br> - *PerUser*: Ensure there's only one active job run for the same user and item.
|*ItemJobTypes*| A list of job types with the specified properties. | - *Name*: The name of the job type, which is fully customizable by the ISV.
### Step 2: Implement Jobs Workload APIs

To integrate with Jobs, the workload must implement the Jobs APIs as defined in the [Swagger specification](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample/blob/main/Backend/src/Contracts/FabricAPI/Workload/swagger.json).

There are three APIs related to Jobs:

---

#### **1. Start Job Instance**
**Endpoint:** `POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}`

This API is called to initiate the execution of a job. 

- **Response:** The API should return a `202 Accepted` status, indicating that the job has been successfully scheduled by the system.

---

#### **2. Get Job Instance State**
**Endpoint:** `GET /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}`

Fabric uses a polling mechanism to track job instance status. This API is called every minute while the job instance is in progress to check its status. Polling stops once the job is completed, whether successfully or due to failure.

- **Response:** The API should return a `200 OK` status along with the current Job Instance State. The response should include the job status, start and end times, and error details if the job has failed.

   **Supported Job Statuses:**
   - `NotStarted`
   - `InProgress`
   - `Completed`
   - `Failed`
   - `Cancelled`

   **Important:** Even if the job has failed, this API should still return a `200 OK` status with a `Failed` job status.

---


#### **3. Cancel Job Instance**
**Endpoint:** `POST /workspaces/{workspaceId}/items/{itemType}/{itemId}/jobTypes/{jobType}/instances/{jobInstanceId}/cancel`

This API is called to cancel an ongoing job instance.

- **Response:** The API should return a `200 OK` status along with the current Job Instance State. The response should include the job status, start and end times, and error details if the job has failed.

---

### Additional Information

**Job Deadletter Count:**
A job is marked as a "dead letter" by the Fabric platform if it hasn't started within 2 hours.

### Example Implementation
For an example implementation of these APIs, refer to `JobsControllerImpl.cs` in the [Microsoft Fabric Workload Development Sample repository](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample).

## Frontend

### Run a job in the Fabric UI

After integrating jobs into your items in the backend, users can start running jobs. There are two ways to run jobs in Fabric:

* **Unattended Scheduled Job:** Defined by the user to run at regular intervals using shared Fabric scheduler experience. 
* **On-demand using Workload UI with Extension Client SDK:**

#### Fabric scheduler experience from the UI

* Entry Points:
   * Context menu -> Schedule
   
    :::image type="content" source="./media/monitoring-hub/fabric-scheduler-menu.png" alt-text="Screenshot showing the Schedule option in the Fabric scheduler menu.":::

    *  Using `workloadClient.itemSettings.open`, where the selected settings ID is 'Schedule'.

* Layout

    :::image type="content" source="./media/monitoring-hub/fabric-scheduler-set.png" alt-text="Screenshot showing Fabric scheduler settings.":::

    1. Last success refresh time and next refresh time
    1. Refresh button
    1. Item schedule settings

**Onboarding**

**Step 1: Add schedule context menu item**

To show the schedule button in the item context menu, you need to add a new entry into the 'contextMenuItems' property in the item frontend manifest:

```json
{
    "name": "schedule"
}
```

**Step 2: Add item schedule settings**

Add a new 'schedule' entry to the item settings property in the frontend manifest.

```json
"schedule": {
    "itemJobType": "ScheduledJob",
    "refreshType": "Refresh"
}
```

* `itemJobType`: item job type defined in item job definition XML file.
* `refreshType`: Specifies the display of the refresh button. There are three types: use "Refresh" and "Run" to enable refresh button and display name, set "None" to disable the refresh button.

#### Jobs JavaScript APIs

In addition to unattended scheduled jobs, a workload can run a job on demand or even start a scheduled job on demand. We provide a set of APIs as part of our extension client:

* **Scheduled jobs APIs:**
    * `getItemScheduledJobs(objectId: string): Promise<ItemSchedule>`
    * `createItemScheduledJobs(createItemScheduledJobs: CreateItemScheduleParams): Promise<ItemSchedule>`
    * `updateItemScheduledJobs(updateItemScheduleParams: UpdateItemScheduleParams): Promise<ItemSchedule>`

* **Specific job instance APIs:**
    * `runItemJob(jobParams: RunItemJobParams): Promise<ItemJobInstance>`
    * `cancelItemJob(jobParams: CancelItemJobParams): Promise<CancelItemJobResult>`
    * `getItemJobHistory(getHistoryParams: GetItemJobHistoryParams): Promise<ItemJobHistory>`

> [!NOTE]
> `getItemJobHistory` returns the job with the status currently stored in Fabric. As we currently rely solely on polling, be aware that the status might not be the most up-to-date. If you require your UI to reflect the most accurate status as soon as possible, we recommend obtaining the status directly from your backend.

### Integration with the monitoring hub

Once the data is ready, the item jobs automatically show up in the monitoring hub. The next step is to add your item type to the filter pane and configure and implement available actions that a user can take against the jobs.

#### Enable your item in the monitoring hub filter pane

To add your item to the filter pane, define a new property in the item Frontend manifest: '"supportedInMonitoringHub": true'.

#### Integrate with job quick actions

:::image type="content" source="./media/monitoring-hub/monitoring-hub-quick-actions.png" alt-text="Screenshot showing jobs quick actions buttons in the monitoring hub.":::

There's a set of operations that a user can execute against a job, such as cancel, retry, and get details.

The workload team decides which one they want to enable by setting the `itemJobConfig` property in the item Frontend manifest. If not set, the icons won't be visible.

For example, the config we added to our sample item that supports all job actions is shown below.

When a user selects the cancel icon of the sample item job, we'll call the provided action "“item".job.cancel” with the job related context to the extension "Fabric.WorkloadSample", which is implemented by the workload to actually cancel the job.

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

When the workload team registers the action for detailed information, Fabric expects the workload action to return the data in a certain format so that Fabric can display that information in the side panel.

Currently, key value pairs in plain text or hyperlink is supported.

* For an example of handling the job actions, see index.worker.ts that can be found in the sample [repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample), and search for actions starting with 'item.job'.

### Recent runs

In addition to viewing jobs in the monitoring hub, Fabric also offers a shared user experience to display the recent runs of a specific item.

Entry Points:

* **Context menu** > **Recent runs**

    :::image type="content" source="./media/monitoring-hub/monitoring-hub-recent-runs.png" alt-text="Screenshot of the recent runs option in the options menu. ":::

* Using `workloadClient.itemRecentRuns.open`.

**Onboarding**

**Step 1: Add `recentRuns` Context Menu Item**

In order to show the recent runs button in the item menu, add a new entry into the 'contextMenuItems' property in the item frontend manifest, like this:

```json
{
    "name": "recentruns"
}
```

**Step 2: Add item `recentRun` settings**

Add a new `recentRun` entry to the item settings property in the frontend manifest.

```json
"recentRun": {
     "useRecentRunsComponent": true,
}
```

### Jobs integration in the sample item ribbon

As part of our UI workload sample, we added a section in the item ribbon dedicated to jobs.

:::image type="content" source="./media/monitoring-hub/artifact-tab.png" alt-text="Screenshot showing the item tab in the Fabric UI.":::

For an example of how this ribbon was implemented, see ItemTabToolbar.tsx, that can be found in the sample [repo](https://github.com/microsoft/Microsoft-Fabric-workload-development-sample). 

## Related links

* [Use the Monitoring hub](../admin/monitoring-hub.md)
