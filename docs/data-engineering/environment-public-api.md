---
title: Manage the Environment Through Public APIs
description: This article gives an overview of the public APIs of the environment. It also describes the best practice of using the environment APIs.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 10/09/2025
ms.search.form: Manage the environment through public APIs
---

# Manage the environment through public APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available environment REST APIs and their usage.

## Migrate the environment APIs to their stable GA version

> [!IMPORTANT]
>
> - The GA release includes updates in the request/response contract of existing APIs, API deprecations, and new APIs. You can find the details in the following sections.
> - A new query parameter `preview` is introduced to facilitate the transition of request/response contract changes. The `preview` query parameter defaults to `True` until **March 31, 2026**, making the preview contracts still available. Set the value to `False` to start using the stable Release version of the contracts.
> - The to-be-deprecated APIs will continue to be supported until **March 31, 2026**, please use the newly introduced APIs to replace them as soon as possible.

### APIs with request/response contract update

|Category|API|Description|Notes|Preview version swagger|Release version swagger|
|---------|---------|---------|---------|---------|---------|
|Item operation|Publish environment|Trigger the publish operation of the environment with current pending changes.|Update in response contract.|[Publish environment (Preview)](/rest/api/fabric/environment/items/publish-environment(preview))|[Publish environment](/rest/api/fabric/environment/items/publish-environment)|
|Staging|List staging libraries|Get the full staging library list. This list includes the published and pending libraries.|Update in response contract.|[List staging libraries (Preview)](/rest/api/fabric/environment/staging/list-libraries(preview))|[List staging libraries](/rest/api/fabric/environment/staging/list-libraries)|
|Staging|List staging Spark compute|Get the full staging compute configurations. The staging configurations include the published and pending compute configurations.|Update in response contract.|[List staging Spark compute (Preview)](/rest/api/fabric/environment/staging/get-spark-compute(preview))|[List staging Spark compute](/rest/api/fabric/environment/staging/get-spark-compute)|
|Staging|Update Spark compute|Update the compute configurations and Spark properties for an environment.|Update in request and response contracts.|[Update Spark compute (Preview)](/rest/api/fabric/environment/staging/update-spark-compute(preview))|[Update Spark compute](/rest/api/fabric/environment/staging/update-spark-compute)|
|Published|List published libraries|Get the libraries that are published and effective in Spark sessions.|Update in response contract.|[List published libraries (Preview)](/rest/api/fabric/environment/published/list-libraries(preview))|[List published libraries](/rest/api/fabric/environment/published/list-libraries)|
|Published|List published Spark compute|Get the Spark compute configurations and Spark properties that are published and effective in Spark sessions.|Update in response contract.|[List published libraries (Preview)](/rest/api/fabric/environment/published/get-spark-compute(preview))|[List published libraries](/rest/api/fabric/environment/published/get-spark-compute)|

The `preview` parameter defaults to `True` until **March 31, 2026**, i.e., the system considers the parameter as `True` if the request is sending without specifying this parameter until the deprecation date. We highly recommend migrating your implementations to the stable version by explicitly set the `preview` parameter to `False` as soon as possible.

Using `List staging libraries` API as an example, which has an update in the API response.

- When sending the request with `preview` parameter as `True`
  
  Sample request:

    ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/libraries?preview=True
    ```

  Sample response:

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
      "environmentYml": "name: sample-environment\ndependencies:\n  - fuzzywuzzy==0.0.1\n  - matplotlib==0.0.1"
    }
    ```

- When sending the request with `preview` parameter as `False`

  Sample request:
  
  ```HTTP
    GET https://api.fabric.microsoft.com/v1/workspaces/{workspaceId}/environments/{environmentId}/libraries?preview=False
    ```

  Sample response:

    ```JSON
    {
      "libraries": [
        {
          "name": "samplewheel-0.18.0-py2.py3-none-any.whl",
          "libraryType": "Custom"
        },
        {
          "name": "fuzzywuzzy",
          "libraryType": "External",
          "version": "0.0.1"
        }
      ],
      "continuationToken": "null",
      "continuationUri": "null"
    }
    ```

### To-be-deprecated APIs

> [!IMPORTANT]
>
> - The to-be-deprecated APIs will continue to be supported until **March 31, 2026**. We highly recommend to use newly introduced APIs to replace your implementations as soon as possible.

|Category|API|Description|Note|
|---------|---------|---------|---------|
|Staging|[Upload staging libraries](/rest/api/fabric/environment/staging/upload-custom-library(preview))|Add one custom library or one/multiple public library in the environment.|Support until **March 31, 2026**, please use the newly introduced `Import external libraries`/`Upload custom library` APIs to replace.|
|Staging|[Delete staging libraries](/rest/api/fabric/environment/staging/delete-custom-library(preview))|Delete one staging custom library or all public libraries.|Support until **March 31, 2026**, please use the newly introduced `Remove external library`/`Delete custom library` APIs to replace.|

Belows are a few examples covering the scenarios when managing staging libraries.

- Add the public libraries in your environment

    Previously, you can use `Upload staging libraries` API to upload the updated YAML file, and now you can use `Import external libraries` API to import the updated YAML.

- Delete one public library in your environment

    Previously, you can use `Upload staging libraries` API to upload the updated YAML file, and now you can use `Remove external library` API to remove it.

- Delete all public library in your environment

    Previously, you can use `Delete staging libraries` API to delete all the public libraries, and now you can use `Remove external library` API to remove the public libraries one by one or use `Import external libraries` to upload an empty YAML file to achieve the same functionalities.

### New APIs

|Category|API|Description|Note|
|---------|---------|---------|---------|
|Item operation|[Create environment with definition](/rest/api/fabric/environment/items/create-environment)|Create a new environment with definition.|New API.|
|Item operation|[Get environment definition](/rest/api/fabric/environment/items/get-environment-definition)|Get the definition of an environment. |New API.|
|Item operation|[Update environment definition](/rest/api/fabric/environment/items/update-environment-definition)|Update the definition of an environment.|New API.|
|Staging|[Import external libraries](/rest/api/fabric/environment/staging/import-external-libraries)|Upload external libraries as an *environment.yml* file into environment. It overrides the list of existing external libraries in an environment.|New API.|
|Staging|[Export external libraries](/rest/api/fabric/environment/staging/export-external-libraries)|Get the full external libraries as an *environment.yml* file.|New API.|
|Staging|[Remove external library](/rest/api/fabric/environment/staging/remove-external-library)|Delete an external library from an environment. This API accepts one library at a time.|New API.|
|Staging|[Upload custom library](/rest/api/fabric/environment/staging/upload-custom-library)|Upload a custom package in environment. This API allows one file upload at a time. The supported file formats are .jar, .py, .whl, and .tar.gz.|New API.|
|Staging|[Delete custom library](/rest/api/fabric/environment/staging/delete-custom-library)|Delete a custom package from the environment. Put the custom package full name with the extension in the API request to get it removed.|New API.|
|Published|[Export external libraries](/rest/api/fabric/environment/published/export-external-libraries)|Get the published external libraries as an *environment.yml* file.|New API.|

### APIs without update

|Category|API|Description|
|---------|---------|---------|
|Item operation|[Create environment](/rest/api/fabric/environment/items/create-environment)|Create a new empty environment in the workspace.|
|Item operation|[Get environment](/rest/api/fabric/environment/items/get-environment)|Get the metadata of an environment. The response includes the status of the environment.|
|Item operation|[Delete environment](/rest/api/fabric/environment/items/delete-environment)|Delete an existing environment.|
|Item operation|[List environment](/rest/api/fabric/environment/items/list-environments)|Get the list of environments in a workspace.|
|Item operation|[Update environment](/rest/api/fabric/environment/items/update-environment)|Update the metadata of an environment, like name and description.|
|Item operation|[Cancel publish environment](/rest/api/fabric/environment/items/cancel-publish-environment)|Cancel an ongoing publish operation of the environment.|

To learn more about the environment public APIs, see [Item APIs - Environment](/rest/api/fabric/environment/items).

## Environment public API use cases

> [!IMPORTANT]
> This section is demonstrated with the stable Release version of the APIs.

This section demonstrates how to use the APIs to achieve specific scenarios when managing Environment. You can replace the `{WORKSPACE_ID}` and `{ARTIFACT_ID}` properties in the following examples with appropriate values.

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
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/libraries?preview=False
    ```

- Sample response

    ```JSON
    {
      "libraries": [
        {
          "name": "samplewheel-0.18.0-py2.py3-none-any.whl",
          "libraryType": "Custom"
        },
        {
          "name": "fuzzywuzzy",
          "libraryType": "External",
          "version": "0.0.1"
        }
      ],
      "continuationToken": "null",
      "continuationUri": "null"
    }
    ```

#### Import public libraries or upload custom library

You can use [Import external libraries](/rest/api/fabric/environment/staging/import-external-libraries) and [Upload custom library](/rest/api/fabric/environment/staging/upload-custom-library) APIs to add new public/custom libraries to your environment. The import external libraries API accepts *environment.yml* file while the supported file types are *.whl*, *.jar*, *.tar.gz*, *.py* for upload custom library API.

> [!NOTE]
> To manipulate the public library more efficiently, we recommend that you compose all the expected libraries from PyPI and Conda in an *environment.yml* file.
>
>The uploading API allows up to a 200-MB file in one request. A library that exceeds this size limit currently isn't supported in public APIs.

- Sample requests

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries/importExternalLibraries
    ```

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries/samplelibrary.jar
    ```

#### Delete the custom library

By specifying the full library file name with the type suffix, you can delete one custom library at a time.

> [!NOTE]
> If you want to remove a subset of the existing public libraries or all of them, please import an updated YAML file through `Import public libraries` API.
>

- Sample requests

    ```http
    DELETE https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries/samplelibrary.jar
    ```

### Manage staging Spark compute

You can use the update staging Spark compute to manage the Spark compute.

#### Check the published Spark compute for the environment

Before you change the configurations for the environment, use the Get Published Spark Compute API to check what Spark compute configurations are currently effective.

- Sample request

    ```http
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/sparkcompute?preview=False
    ```

- Sample response

    ```http
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
      "sparkProperties": [
        {
          "key": "spark.acls.enable",
          "value": "false"
        }
      ],
      "runtimeVersion": "1.2"
    }
    ```

#### Update the compute configurations

You can update the Spark runtime, switch to another pool, refine compute configuration, and add or remove Spark properties through editing the request body of this API.

You can switch the attached pool by specifying the pool name and pool. Specify the pool name as `Starter Pool` to switch the pool to default settings. To get the full list of the available custom pools of the workspace by REST API, see [Custom Pools - List Workspace Custom Pools](/rest/api/fabric/spark/custom-pools/list-workspace-custom-pools).

If you want to remove an existing Spark property, specify the value as `null` with the key that you want to remove.

- Sample request

    ```http
    PATCH https://api.fabric.microsoft.com/v1/workspaces/f089354e-8366-4e18-aea3-4cb4a3a50b48/environments/707cfd07-cbf1-41da-aad7-dd157ddb8c11/staging/sparkcompute?preview=False

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
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/libraries?preview=False
    
    GET https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/sparkcompute?preview=False
    ```

#### Trigger the publish operation of the environment

The changes that you made for the staging libraries and Spark compute are cached, but they require publishing to become effective. Use the next example to trigger the publish operation. Response is following [long running operations (LRO)](/rest/api/fabric/articles/long-running-operation) pattern and HTTP response code 202 may be returned.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/publish?preview=False
    ```

- Sample response

    ```http
    Location: https://api.fabric.microsoft.com/v1/operations/abcdef00-9d7e-469a-abf1-fca847a0ea69
    x-ms-operation-id: abcdef00-9d7e-469a-abf1-fca847a0ea69
    Retry-After: 120  
    ```

During the publish operation, you can also call the following API to cancel it.

- Sample request

    ```http
    POST https://api.fabric.microsoft.com/v1/workspaces/{{WORKSPACE_ID}}/environments/{{ARTIFACT_ID}}/staging/cancelPublish
    ```

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Item APIs - Environment](https://aka.ms/EnvironmentRESTAPISwaggerPage)
