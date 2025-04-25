---
title: Manage the environment through public APIs
description: This article gives an overview of the public APIs of the environment. Also describe the best practice of using the environment APIs.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 03/15/2025
ms.search.form: Manage the environment through public APIs
---

# Manage the environment through public APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available environment REST APIs and their usage.

> [!IMPORTANT]
>
> - The new release includes new APIs, API deprecations, and changes of API response/request contract. The table at following section summarizes all API changes.
>

## Summary of environment APIs

|Category|API|Description|Note|
|---------|---------|---------|---------|
|Item operation|Create environment |Create a new empty environment in the workspace.|No change|
|Item operation|Create environment with Definition |Create a new environment with Definition.|**New API**|
|Item operation|Delete environment |Delete an existing environment.|No change|
|Item operation|List environment|Get the list of environment in a workspace.|No change|
|Item operation|Get environment|Get the metadata of an environment. The response includes the status of the environment.|**Response contract update**|
|Item operation|Get environment Definition|Get the definition of an environment. |**New API**|
|Item operation|Update environment|Update the metadata of an environment, like name and description.|No change|
|Item operation|Update environment definition|Update the definition of an environment.|**New API**|
|Item operation|Publish environment|Trigger the publish of the environment with current pending changes.|**Response contract update**|
|Item operation|Cancel publish environment|Cancel an ongoing publish of the environment|No change|
|Staging|List staging libraries|Get the full staging library list. This list includes the published and pending libraries.|**Response contract update**|
|Staging|Import external libraries|Upload external libraries as an environment.yml file into environment. It overrides the list of existing external libraries in environment.|**New API**|
|Staging|Export external libraries|Get the full external libraries as an environment.yml file.|**New API**|
|Staging|Remove external library|Delete an external library from an environment. This API accepts one library at a time|**New API**|
|Staging|Upload custom library|Upload a custom package in environment. This API allows one file upload at a time. The supported file formats are .jar, .py, .whl, and .tar.gz.|**New API**|
|Staging|Delete custom library|Delete a custom package from the environment. Put the custom package full name with the extension in the API request to get it removed.|**New API**|
|Staging|Upload staging libraries|Adding one custom library or one/multiple public library in the environment.|**To be Deprecated**|
|Staging|Delete staging libraries|Delete one staging custom library or all public library.|**To be Deprecated**|
|Staging|List staging Spark settings|Get the full staging compute configurations. The staging configurations include the published and pending compute configurations.|**Response contract update**|
|Staging|Update Spark settings|Update the compute configurations and Spark properties for an environment|**Request/response contract update**|
|Published|List published libraries|Get the libraries that are published and effective in Spark sessions.|**Response contract update**|
|Published|List published Spark setting|Get the Spark compute configurations and Spark properties that are published and effective in Spark sessions.|**Response contract update**|
|Published|Export external libraries|Get the published external libraries as an environment.yml file.|**New API**|

Learn more about the existing environment public APIs in [Item APIs - Environment](/rest/api/fabric/environment/items)

## Environment public API update details

This section describes the upcoming updates for existing APIs.

### Get Environment

In the response of Get Environment API, the 'startTime' will become 'startDateTime' and the 'endTime' will become 'endDateTime'. They represent the start/end time of publish operation.

> [!NOTE]
> 'startTime' and 'endTime' are using the **Date-Time** format, while the 'startDateTime' and 'endDateTime' will be **String**, which is in UTC and using the YYYY-MM-DDTHH:mm:ssZ format.
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

Publish environment API will support long running operations starting from the release, the contract of the response will change. The endpoint remains the same for sending requests.

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

    Location: https://api.fabric.microsoft.com/v1/operations/abcdef00-9d7e-469a-abf1-fca847a0ea69
    x-ms-operation-id: abcdef00-9d7e-469a-abf1-fca847a0ea69
    Retry-After: 60

    ```

### List staging/published libraries

These two APIs can get the full list of staging/published libraries of the environment. The endpoints remain the same for sending requests, while the libraries will be returned with different structure.

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

These two APIs can get the Spark compute configurations and properties of the environment. The endpoints remain the same for sending requests, while the configurations will be returned with different structure. The Spark properties will be changed to a list.

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

This API is for updating the Spark compute and properties of an Environment, the contract of Spark property in request and response will be updated once the release lands.

- Original sample request

    ```HTTP
    PATCH https://api.fabric.microsoft.com/v1/workspaces/f089354e-8366-4e18-aea3-4cb4a3a50b48/environments/707cfd07-cbf1-41da-aad7-dd157ddb8c11/staging/sparkcompute

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
    PATCH https://api.fabric.microsoft.com/v1/workspaces/f089354e-8366-4e18-aea3-4cb4a3a50b48/environments/707cfd07-cbf1-41da-aad7-dd157ddb8c11/staging/sparkcompute

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
>
> The new APIs and contract changes aren't included in this section.
>

This section demonstrates how to use the currently available APIs to achieve specific goals. You can replace the `{WORKSPACE_ID}` and `{ARTIFACT_ID}` in the following examples with appropriate values.

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

The API for uploading staging library accepts one file at a time. The supported file types are *.whl*, *.jar*, *.tar.gz*, *.py* and *environment.yml* for public library. You can specify the file via the multipart/form-data content-type.

> [!NOTE]
>
> - In order to manipulate the public library more efficiently, it's highly recommended composing all expected libraries from PyPI and conda in an ***environment.yml*** file.
> - The uploading API allows up to 200-MB file in one request, library that exceeds this size limit is currently not supported in public API.

- Sample requests

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries
    ```

#### Deleting the libraries

By specifying the full library file name with the type suffix, you can delete one library at a time.

> [!NOTE]
>
> - If you specify `environment.yml` as the file to be deleted, you're removing all public libraries.
> - If you want to remove a subset of existing public library, please use the [upload library](environment-public-api.md#uploading-the-libraries) instead and upload an *environment.yml* that contains only the expected libraries. The uploaded *environment.yml* replaces the existing public library section entirely.

- Sample requests

    ```http
    DELETE https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries?libraryToDelete=fuzzywuzzy-0.18.0-py2.py3-none-any.whl
    ```

### Manage staging Spark compute

You can use the update staging Spark compute to manage the Spark compute.

#### Check the published Spark compute for the environment

Before changing the configurations for the environment, you can use the get published Spark compute API to check what Spark compute configurations are currently effective.

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

You can switch the attached pool by specifying the pool name and pool. Specify the pool name as `Starter Pool` to switch the pool to default settings. To get the full list of the available custom pools of the workspace by REST API, see [Custom Pools - List Workspace Custom Pools](/rest/api/fabric/spark/custom-pools/list-workspace-custom-pools)

If you want to remove an existing Spark property, you need to specify the value as `null` with the key that you want to remove, as showing in the following example.

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

The environment can accept one publish at a time. Before publishing your environment, you can validate the status of the environment and have a final review of the staging changes. Once the environment is published successfully, all configurations in the staging state become effective.

- **Step 1: get the metadata of the environment**

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/
    ```

    In the response body, you can tell clearly the state of the environment. Make sure there's no ongoing publish before you move to next step.

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
