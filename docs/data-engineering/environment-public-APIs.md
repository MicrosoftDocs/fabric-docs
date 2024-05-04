---
title: Manage the environment through public APIs
description: This article gives an overview of the public APIs of the environment. Also describe the best practice of using the environment APIs.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 05/01/2024
ms.search.for: Manage the environment through public APIs
---

# Manage the environment through public APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available environment REST APIs and their usage.

[!INCLUDE [preview-note](../includes/feature-preview-note.md)]

## Summary of available environment APIs

|API|Description|Category|
|---------|---------|---------|
|Create environment |Create a new environment in the workspace.|General|
|Get environment|Get the metadata of an environment. The response includes the status of the environment.|General|
|Update environment|Update the metadata of an environment, like name and description.|General|
|Delete environment |Delete an existing environment.|General|
|List environment in workspace|Get the list of environment in a workspace.|General|
|Publish environment|Trigger the publish of the environment with current pending changes.|General|
|Publish cancellation|Cancel an ongoing publish of the environment|General|
|Get published Spark compute|Get the Spark compute configurations that are effective.|Spark compute|
|Get staging Spark compute|Get the full staging compute configurations. The staging configurations include the published and pending compute configurations.|Spark compute|
|Get published libraries|Get the library list that is effective.|Libraries|
|Get staging libraries|Get the full staging library list. This list includes the published and pending libraries.|Libraries|
|Upload staging libraries|Adding one custom library or one/multiple public library in the environment.|Libraries|
|Delete staging libraries|Delete one staging custom library or all public library.|Libraries|

Learn more about the environment public APIs in [Item APIs - Environment](https://aka.ms/EnvironmentRESTAPISwaggerPage)

## Environment public API use cases

This section walks you through several common scenarios when dealing with environment. You can replace the `{WORKSPACE_ID}` and `{ARTIFACT_ID}` in the following examples with appropriate values.

### Create a new environment

You can create a new empty environment using the following API.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments

    {
        "displayName": "Environment_1",
        "description": "An environment description"
    }
    ```

### Manage staging libraries

You can use the upload/delete staging libraries APIs to manage the library section in the environment

#### Check the published libraries for the environment

Before adding/deleting library, you can use the get published libraries API to check what libraries are currently effective.

- Sample request

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/libraries
    ```

- Sample response

    ```http
    {
        "customLibraries": {
            "wheelFiles": [
                "samplewheel-0.18.0-py2.py3-none-any.whl"
            ],
            "pyFiles": [
                "samplepython.py"
            ],
            "jarFiles": [
                "samplejar.jar"
            ],
            "rTarFiles": [
                "sampleR.tar.gz"
            ]
        },
        "environmentYml": "dependencies:\r\n- pip:\r\n  - matplotlib==3.4.3"
    }
    ```

#### Uploading the libraries

The APIs for uploading staging library accepts one file at a time. The supported file types are *.whl*, *.jar*, *.tar.gz*, *.py* and *environment.yml* for public library. You can specify the file via the multipart/form-data content-type.

> [!NOTE]
>
> - In order to manipulate the public library more efficiently, it's highly recommend to compose all expected libraries from PyPI and conda in an ***environment.yml*** file.
> - The uploading API allows up to 200 MB file in one request, library that exceeds this size limit is currently not supported in public API.

- Sample requests

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries
    ```

#### Deleting the libraries

By specifying the full library file name with the type suffix, you can delete one library at a time.

> [!NOTE]
>
> - If you specify `environment.yml` as the file to be deleted, you are removing all public libraries.
> - If you want to remove a subset of existing public library, please use the [upload library](environment-public-APIs.md#uploading-the-libraries) instead and upload an *environment.yml* that contains only the expected libraries. The uploaded *environment.yml* replaces the existing public library section entirely.

- Sample requests

    ```http
    DELETE https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries?libraryToDelete=fuzzywuzzy-0.18.0-py2.py3-none-any.whl
    ```

### Manage staging Spark compute

You can use the update staging Spark compute to manage the Spark compute.

#### Check the published Spark compute for the environment

Before change the configurations for the environment, you can use the get published Spark compute API to check what Spark compute configurations are currently effective.

- Sample request

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/sparkcompute
    ```

- Sample response

    ```http
    {
        "instancePool": {
            "name": "Starter Pool",
            "type": "Workspace"
        },
        "driverCores": 4,
        "driverMemory": "56g",
        "executorCores": 4,
        "executorMemory": "56g",
        "dynamicExecutorAllocation": {
            "enabled": false,
            "minExecutors": 1,
            "maxExecutors": 1
        },
        "sparkProperties": {
            "spark.acls.enable": "false"
        },
        "runtimeVersion": "1.2"
    }
    ```

#### Update the compute configurations

You can update the Spark runtime, switch to another pool, refine compute configuration and add/remove Spark properties through editing the request body of this API.

If you want to remove an existing Spark property, you need specify the value as `null` with the key that you want to remove, as showing in the following example.

- Sample request

    ```http
    PATCH https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/sparkcompute

    {
        "instancePool": {
            "name": "Starter Pool",
            "type": "Workspace"
        },
        "driverCores": 4,
        "driverMemory": "56g",
        "executorCores": 4,
        "executorMemory": "56g",
        "dynamicExecutorAllocation": {
            "enabled": false,
            "minExecutors": 1,
            "maxExecutors": 1
        },
        "sparkProperties": {
            "spark.acls.enable": null
        },
        "runtimeVersion": "1.2"
    }
    ```

### Make the changes effective

Using the following sets of APIs to publish the changes.

#### Prepare for a publish

The environment can accept one publish at a time. Before publish your environment, you can validate the status of the environment and have a final review of the staging changes. Once the environment is publish successfully, all configurations in the staging state becomes effective.

- **Step 1: get the metadata of the environment**

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/
    ```

    In the response body, you can tell clearly the state of the environment. Make sure there is no ongoing publish before you move to next step.

- **Step 2: get the staging libraries/Spark compute to have a final review**

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries
    
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/sparkcompute
    ```

#### Trigger the publish of the environment

The changes you made in for the staging libraries and Spark compute are cached but require publishing to become effective. Follow the following example to trigger the publish.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/publish
    ```

- Sample response

    ```http
    {
        "publishDetails":
        {
            "state": "Running",
            "targetVersion": "46838a80-5450-4414-bea0-40fb6f3e0c0d",
            "startTime": "2024-03-29T14:17:09.0697022Z",
            "componentPublishInfo": {
                "sparkLibraries": {
                    "state": "Running"
                },
                "sparkSettings": {
                    "state": "Running"
                }
            }
        }
    }   
    ```

During the publish, you can also call following API to **cancel** it.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/cancelPublish
    ```

## Related content

- [Create, configure, and use an environment in Microsoft Fabric](create-and-use-environment.md).
- [Item APIs - Environment](https://aka.ms/EnvironmentRESTAPISwaggerPage).
