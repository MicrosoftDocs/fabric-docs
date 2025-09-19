---
title: Manage the Environment Through Public APIs
description: This article gives an overview of the public APIs of the environment. It also describes the best practice of using the environment APIs.
ms.author: eur
ms.reviewer: shuaijunye
author: eric-urban
ms.topic: how-to
ms.date: 03/15/2025
ms.search.form: Manage the environment through public APIs
---

# Manage the environment through public APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available environment REST APIs and their usage.

> [!IMPORTANT]
> The new release includes new APIs, API deprecations, and changes of API response/request contract. The table in the following section summarizes all API changes.

## Summary of environment APIs

|Category|API|Description|Note|
|---------|---------|---------|---------|
|Item operation|Create environment |Create a new empty environment in the workspace.|No change.|
|Item operation|Create environment with definition |Create a new environment with definition.|New API.|
|Item operation|Delete environment |Delete an existing environment.|No change.|
|Item operation|List environment|Get the list of environments in a workspace.|No change.|
|Item operation|Get environment|Get the metadata of an environment. The response includes the status of the environment.|Response contract update.|
|Item operation|Get environment definition|Get the definition of an environment. |New API.|
|Item operation|Update environment|Update the metadata of an environment, like name and description.|No change.|
|Item operation|Update environment definition|Update the definition of an environment.|New API.|
|Item operation|Publish environment|Trigger the publish operation of the environment with current pending changes.|Response contract update.|
|Item operation|Cancel publish environment|Cancel an ongoing publish operation of the environment.|No change.|
|Staging|List staging libraries|Get the full staging library list. This list includes the published and pending libraries.|Response contract update.|
|Staging|Import external libraries|Upload external libraries as an *environment.yml* file into environment. It overrides the list of existing external libraries in an environment.|New API.|
|Staging|Export external libraries|Get the full external libraries as an *environment.yml* file.|New API.|
|Staging|Remove external library|Delete an external library from an environment. This API accepts one library at a time.|New API.|
|Staging|Upload custom library|Upload a custom package in environment. This API allows one file upload at a time. The supported file formats are .jar, .py, .whl, and .tar.gz.|New API.|
|Staging|Delete custom library|Delete a custom package from the environment. Put the custom package full name with the extension in the API request to get it removed.|New API.|
|Staging|Upload staging libraries|Add one custom library or one/multiple public library in the environment.|To be no longer supported.|
|Staging|Delete staging libraries|Delete one staging custom library or all public libraries.|To be no longer supported.|
|Staging|List staging Spark settings|Get the full staging compute configurations. The staging configurations include the published and pending compute configurations.|Response contract update.|
|Staging|Update Spark settings|Update the compute configurations and Spark properties for an environment.|Request/response contract update.|
|Published|List published libraries|Get the libraries that are published and effective in Spark sessions.|Response contract update.|
|Published|List published Spark setting|Get the Spark compute configurations and Spark properties that are published and effective in Spark sessions.|Response contract update.|
|Published|Export external libraries|Get the published external libraries as an *environment.yml* file.|New API.|

To learn more about the existing environment public APIs, see [Item APIs - Environment](/rest/api/fabric/environment/items).

## Environment public API update details

This section describes the upcoming updates for existing APIs.

### Get Environment

In the response of the Get Environment API, `startTime` changes to `startDateTime` and `endTime` changes to `endDateTime`. The properties represent the start and end times of the publish operation.

> [!NOTE]
> The `startTime` and `endTime` properties use the *Date-Time* format. The `startDateTime` and `endDateTime` properties change to `String`, which is in UTC and uses the *YYYY-MM-DDTHH:mm:ssZ* format.
>

- Interface

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}
    ```

- Original sample response

    ```JSON
    {
      "displayName": "Environment_1",
      "description": "An Environment description",
      "type": "Environment",
      "workspaceId": "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      "id": "5b218778-e7a5-4d73-8187-f10824047715",
      "properties": {
        "publishDetails": {
          "state": "Success",
          "targetVersion": "46838a80-5450-4414-bea0-40fb6f3e0c0d",
          "startTime": "2024-03-29T14:17:09.0697022Z",
          "endTime": "2024-03-29T14:48:09.0697022Z",
          "componentPublishInfo": {
            "sparkLibraries": {
              "state": "Success"
            },
            "sparkSettings": {
              "state": "Success"
            }
          }
        }
      }
    }
    ```

- New sample response

    ```JSON
    {
      "displayName": "Environment_1",
      "description": "An Environment description",
      "type": "Environment",
      "workspaceId": "cfafbeb1-8037-4d0c-896e-a46fb27ff229",
      "id": "5b218778-e7a5-4d73-8187-f10824047715",
      "properties": {
        "publishDetails": {
          "state": "Success",
          "targetVersion": "46838a80-5450-4414-bea0-40fb6f3e0c0d",
          "startDateTime": "2024-03-29T14:17:09Z",
          "endDateTime": "2024-03-29T14:48:09Z",
          "componentPublishInfo": {
            "sparkLibraries": {
              "state": "Success"
            },
            "sparkSettings": {
              "state": "Success"
            }
          }
        }
      }
    }
    ```

### Publish environment

The Publish Environment API supports long-running operations starting from the release, but the response contract changes. The endpoint remains the same for sending requests.

- Interface

    ```HTTP
    POST https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/staging/publish
    ```

- Original sample response

    ```JSON
    {
      "publishDetails": {
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

- New sample response

    ```HTTP

    Location: https://api.fabric.microsoft.com/v1/operations/aaaabbbb-0000-cccc-1111-dddd2222eeee
    x-ms-operation-id: aaaabbbb-0000-cccc-1111-dddd2222eeee
    Retry-After: 60

    ```

### List staging/published libraries

These two APIs can get the full list of staging/published libraries of the environment. The endpoints remain the same for sending requests. The libraries return with different structures.

- Interfaces

    Get staging libraries

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/staging/libraries
    ```

    Get published libraries

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/libraries
    ```

- Original sample response

    ```JSON

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

- New sample response

    ```JSON
    {
      "libraries": [
        {
          "name": "samplewheel-0.18.0-py2.py3-none-any.whl",
          "libraryType": "Custom"
        },
        {
          "name": "samplepython.py",
          "libraryType": "Custom"
        },
        {
          "name": "samplejar.jar",
          "libraryType": "Custom"
        },
        {
          "name": "sampleR.tar.gz",
          "libraryType": "Custom"
        },
        {
          "name": "fuzzywuzzy",
          "libraryType": "External",
          "version": "0.0.1"
        },
        {
          "name": "matplotlib",
          "libraryType": "External",
          "version": "0.0.1"
        }
      ],
      "continuationToken": "null",
      "continuationUri": "null"
    }

    ```

### List staging/published Spark settings

These two APIs can get the Spark compute configurations and properties of the environment. The endpoints remain the same for sending requests. The configurations return with different structures. The Spark properties change to a list.

- Interfaces

    Get staging Spark settings

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/staging/sparkcompute
    ```

    Get published Spark settings

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/sparkcompute
    ```

- Original sample response

    ```JSON
    {
      "instancePool": {
        "name": "MyWorkspacePool",
        "type": "Workspace",
        "id": "78942136-106c-4f3e-80fc-7ff4eae11603"
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

- New sample response

    ```JSON
    {
      "instancePool": {
        "name": "MyWorkspacePool",
        "type": "Workspace",
        "id": "78942136-106c-4f3e-80fc-7ff4eae11603"
      },
      "driverCores": "4",
          "driverMemory": "56G",
      "executorCores": "4",
      "executorMemory": "56G",
      "dynamicExecutorAllocation": {
        "enabled": false,
        "minExecutors": 1,
        "maxExecutors": 1
      },
      "sparkProperties": [
        {
          "key": "spark.acls.enable",
          "value": "false"
        }
      ],
      "runtimeVersion": "1.2"
    }
    ```

### Update Spark settings

This API is used for updating the Spark compute and properties of an environment. The contract of the Spark property in request and response updates after the release is available.

- Original sample request

    ```HTTP
    PATCH https://api.fabric.microsoft.com/v1/workspaces/bbbbcccc-1111-dddd-2222-eeee3333ffff/environments/ccccdddd-2222-eeee-3333-ffff4444aaaa/staging/sparkcompute

    {
      "instancePool": {
        "name": "MyWorkspacePool",
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
        "spark.acls.enable": "false",
        "spark.admin.acls": null
      },
      "runtimeVersion": "1.2"
    }
    ```

- New sample request

    ```HTTP
    PATCH https://api.fabric.microsoft.com/v1/workspaces/bbbbcccc-1111-dddd-2222-eeee3333ffff/environments/ccccdddd-2222-eeee-3333-ffff4444aaaa/staging/sparkcompute

    {
      "instancePool": {
        "name": "MyWorkspacePool",
        "type": "Workspace"
      },
      "driverCores": "4",
      "driverMemory": "56G",
      "executorCores": "4",
      "executorMemory": "56G",
      "dynamicExecutorAllocation": {
        "enabled": false,
        "minExecutors": 1,
        "maxExecutors": 1
      },
      "sparkProperties": [
        {
          "key": "spark.acls.enable",
          "value": "false"
        },
        {
          "key": "spark.admin.acls",
          "value": null
        }
      ],
      "runtimeVersion": "1.2"
    }
    ```

- Original sample response

    ```JSON
    {
      "instancePool": {
        "name": "MyWorkspacePool",
        "type": "Workspace",
        "id": "78942136-106c-4f3e-80fc-7ff4eae11603"
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

- New sample response

    ```JSON
    {
      "instancePool": {
        "name": "MyWorkspacePool",
        "type": "Workspace",
        "id": "78942136-106c-4f3e-80fc-7ff4eae11603"
      },
      "driverCores": "4",
      "driverMemory": "56G",
      "executorCores": "4",
      "executorMemory": "56G",
      "dynamicExecutorAllocation": {
        "enabled": false,
        "minExecutors": 1,
        "maxExecutors": 1
      },
      "sparkProperties": [
        {
          "key": "spark.acls.enable",
          "value": "false"
        }
      ],
      "runtimeVersion": "1.2"
    }
    ```

## Environment public API use cases

> [!IMPORTANT]
> The new APIs and contract changes aren't included in this section.

This section demonstrates how to use the currently available APIs to achieve specific goals. You can replace the `{WORKSPACE_ID}` and `{ARTIFACT_ID}` properties in the following examples with appropriate values.

### Create a new environment

To create a new empty environment, use the following API.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments

    {
        "displayName": "Environment_1",
        "description": "An environment description"
    }
    ```

### Manage staging libraries

You can use the upload and delete staging libraries APIs to manage the library section in the environment.

#### Check the published libraries for the environment

Before you add or delete a library, use the Get Published Libraries API to check which libraries are currently effective.

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

#### Upload the libraries

The API for uploading staging libraries accepts one file at a time. The supported file types are *.whl*, *.jar*, *.tar.gz*, *.py*, and *environment.yml* for public libraries. You can specify the file via the multipart/form-data content type.

> [!NOTE]
> To manipulate the public library more efficiently, we recommend that you compose all the expected libraries from PyPI and Conda in an *environment.yml* file.
>
>The uploading API allows up to a 200-MB file in one request. A library that exceeds this size limit currently isn't supported in public APIs.

- Sample requests

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries
    ```

#### Delete the libraries

By specifying the full library file name with the type suffix, you can delete one library at a time.

> [!NOTE]
> If you specify *environment.yml* as the file to delete, you remove all public libraries.
>
> If you want to remove a subset of an existing public library, use [upload library](environment-public-api.md#upload-the-libraries) instead and upload an *environment.yml* file that contains only the expected libraries. The uploaded *environment.yml* file replaces the existing public library section entirely.

- Sample requests

    ```http
    DELETE https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries?libraryToDelete=fuzzywuzzy-0.18.0-py2.py3-none-any.whl
    ```

### Manage staging Spark compute

You can use the update staging Spark compute to manage the Spark compute.

#### Check the published Spark compute for the environment

Before you change the configurations for the environment, use the Get Published Spark Compute API to check what Spark compute configurations are currently effective.

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

You can update the Spark runtime, switch to another pool, refine compute configuration, and add or remove Spark properties through editing the request body of this API.

You can switch the attached pool by specifying the pool name and pool. Specify the pool name as `Starter Pool` to switch the pool to default settings. To get the full list of the available custom pools of the workspace by REST API, see [Custom Pools - List Workspace Custom Pools](/rest/api/fabric/spark/custom-pools/list-workspace-custom-pools).

If you want to remove an existing Spark property, specify the value as `null` with the key that you want to remove.

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

Use the following sets of APIs to publish the changes.

#### Prepare for a publish operation

The environment can accept one publish operation at a time. Before you publish your environment, validate the status of the environment and have a final review of the staging changes. After the environment is published successfully, all configurations in the staging state become effective.

- **Step 1:** Get the metadata of the environment.

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/
    ```

    In the response body, you can clearly tell the state of the environment. Make sure that no publish operation is ongoing before you move to the next step.

- **Step 2:** Get the staging libraries/Spark compute to have a final review.

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries
    
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/sparkcompute
    ```

#### Trigger the publish operation of the environment

The changes that you made for the staging libraries and Spark compute are cached, but they require publishing to become effective. Use the next example to trigger the publish operation.

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

During the publish operation, you can also call the following API to cancel it.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/cancelPublish
    ```

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Item APIs - Environment](https://aka.ms/EnvironmentRESTAPISwaggerPage)
