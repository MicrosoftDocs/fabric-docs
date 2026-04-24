---
title: Manage and execute Fabric notebooks with public APIs
description: Learn about the Fabric notebook public APIs, including how to create and get a notebook with definition, and run a notebook on demand.
ms.reviewer: jingzh
ms.topic: how-to
ms.date: 04/24/2026
ms.search.form: Notebook REST API ci cd
ai-usage: ai-assisted
---


# Manage and execute notebooks in Fabric with APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available notebook REST APIs and their usage.

With the notebook APIs, data engineers and data scientists can automate their own pipelines and conveniently and efficiently establish CI/CD. These APIs also make it easy for users to manage and manipulate Fabric notebook items, and integrate notebooks with other tools and systems. Notebooks can be orchestrated from Fabric pipelines and external schedulers through these APIs, enabling seamless integration with automated workflows.

These **Item management** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Create item |Creates a notebook inside a workspace.|
|Update item |Updates the metadata of a notebook.|
|Update item definition |Updates the content of a notebook.|
|Delete item |Deletes a notebook.|
|Get item |Gets the metadata of a notebook.|
|Get item definition |Gets the content of a notebook.|
|List item | List all items in a workspace.|

For more information, see [Items - REST API](/rest/api/fabric/core/items).

The following **Job scheduler** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Run on demand Item Job|Run a notebook on demand with support for parameterization, session configuration (such as Spark/compute settings), environment and runtime selection, and target Fabric Lakehouse selection.|
|Cancel Item Job Instance|Cancel a notebook job run.|
|Get Item Job Instance|Get notebook run status and retrieve the exit value returned by the run.|

For more information, see [Job Scheduler](/rest/api/fabric/core/job-scheduler).

> [!NOTE]
> Service principal authentication is supported for both the Items REST API (notebook CRUD operations) and the Job Scheduler API (execution, monitoring, and cancellation). This enables secure unattended automation and CI/CD scenarios. Add the service principal to the workspace with an appropriate role (Admin, Member, or Contributor) to manage and execute notebooks.

## Exit values from notebook runs

Notebook runs executed via the Job Scheduler API can return an exit value that you can use for conditional orchestration. The exit value appears in the `exitValue` field of the **Get Item Job Instance** response payload.

A notebook can set its exit value by calling `mssparkutils.notebook.exit("your-value")` before the run completes. The exit value is a string and can encode any outcome signal—for example, `"success"`, `"no_rows_processed"`, or a JSON-serialized result.

External orchestrators, Fabric pipelines, and other automation tools can call **Get Item Job Instance** after the run completes to read the exit value and branch on outcomes. For example:

1. Submit a **Run on demand Item Job** with parameters and execution settings.
1. Poll **Get Item Job Instance** until `status` is `Completed` (or `Failed`).
1. Read `exitValue` from the response to determine the next step in your workflow.

This pattern enables conditional orchestration and downstream signaling based on notebook execution outcomes.

## End-to-end example

The following example shows how to submit a parameterized notebook run and retrieve its status and exit value. For the complete request body schema, including all available session configuration and Lakehouse selection fields, see the [Job Scheduler - Run on demand Item Job](/rest/api/fabric/core/job-scheduler/run-on-demand-item-job) API reference.

### Step 1: Submit a parameterized run

Use the **Run on demand Item Job** endpoint to start a notebook run:

```http
POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{notebookId}/jobs/instances?jobType=RunNotebook
```

Example request body with parameters and a default Lakehouse:

```json
{
  "executionData": {
    "parameters": {
      "inputPath": { "value": "Files/input/data.csv", "type": "string" },
      "threshold": { "value": "0.95", "type": "string" }
    },
    "configuration": {
      "defaultLakehouse": {
        "name": "MyLakehouse",
        "id": "<lakehouse-id>",
        "workspaceId": "<workspace-id>"
      }
    }
  }
}
```

The response returns `202 Accepted` with a `Location` header containing the URL of the job instance you use to monitor the run.

### Step 2: Retrieve run status and exit value

Use the URL from the `Location` header (or construct it using the job instance ID) to check status and read the exit value after the run completes:

```http
GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/items/{notebookId}/jobs/instances/{jobInstanceId}
```

Example response (abbreviated):

```json
{
  "id": "<jobInstanceId>",
  "itemId": "<notebookId>",
  "jobType": "RunNotebook",
  "invokeType": "OnDemand",
  "status": "Completed",
  "startTimeUtc": "2026-03-01T10:00:00Z",
  "endTimeUtc": "2026-03-01T10:05:00Z",
  "exitValue": "success"
}
```

Read `exitValue` to determine the outcome and branch your automation logic accordingly.