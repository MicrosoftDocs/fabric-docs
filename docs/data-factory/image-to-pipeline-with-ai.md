---
title: Use AI to turn whiteboard sketches into pipelines
description: This article shows how AI can easily transform images directly to pipelines for Data Factory for Microsoft Fabric.
ms.reviewer: weetok
ms.topic: how-to
ms.date: 08/29/2024
ms.custom: pipelines, sfi-image-nochange
---

# Use Azure OpenAI to turn whiteboard sketches into pipelines

Data factory in Microsoft Fabric provides cloud-scale data movement and data transformation services that allow you to solve the most complex data factory and ETL scenarios and empowers you with a modern data integration experience to ingest, prepare, and transform data from a rich set of data sources. Within Data Factory, you can create pipelines to use out-of-the-box rich data orchestration capabilities to compose flexible data workflows that meet your enterprise needs.

Now, with the `gpt-4o` AI model in Azure, we're pushing the limits of what you can do with Data Factory and making it possible for you to create data solutions from just an image.

What do you need to get started? Just a Microsoft Fabric account and an idea. Here, we show you how to transform a whiteboard idea to a Fabric Data Factory pipeline using just a picture and `gpt-4o`.

## Prerequisites

Before you create the solution, ensure the following prerequisites are set up in Azure and Fabric:

- Microsoft Fabric enabled workspace.
- Azure OpenAI account with an API key and a `gpt-4o` model deployed.
- An image of what you want your pipeline to look like.

> [!WARNING]
> API keys are sensitive information and production keys should always only be stored securely in Azure Key Vault or other secure stores. This sample uses an OpenAI key for demonstration purposes only. For production code, consider using Microsoft Entra ID instead of key authentication for a more secure environment that doesn't rely on key sharing or risk a security breach if a key is compromised.

## Step 1: Upload your image to a Lakehouse

Before you can analyze the image, you need to upload it to your Lakehouse. Sign in to your Microsoft Fabric account and navigate to your workspace. Select **+ New item** and create a new Lakehouse.

:::image type="content" source="media/image-to-pipeline-with-ai/create-new-lakehouse.png" alt-text="Screenshot showing where to create a new Lakehouse.":::

Once your Lakehouse is set up, create a new folder under **files**, called **images**, and upload the image there.

:::image type="content" source="media/image-to-pipeline-with-ai/image-to-convert.png" alt-text="Screenshot showing a drawn image to be converted to a pipeline.":::

## Step 2: Create the notebook in your workspace

Now we just need to create a notebook to execute some Python code that summarizes and creates the pipeline in the workspace.

Create a new Notebook in your workspace:

:::image type="content" source="media/image-to-pipeline-with-ai/create-new-notebook.png" alt-text="Screenshot showing how to create a new Notebook in a Data Factory for Fabric workspace.":::

In the code area, enter the following code, which sets up the required libraries and configuration and encodes the image:

```python
# Configuration
AZURE_OPENAI_KEY = "<Your Azure OpenAI key>"
AZURE_OPENAI_GPT4O_ENDPOINT = "<Your Azure OpenAI gpt-4o deployment endpoint>"
IMAGE_PATH = "<Path to your uploaded image file>" # For example, "/lakehouse/default/files/images/pipeline.png"

# Install the OpenAI library
!pip install semantic-link --q 
!pip uninstall --yes openai
!pip install openai
%pip install openai --upgrade

# Imports
import os
import requests
import base64
import json
import time
import pprint
import openai
import sempy.fabric as fabric
import pandas as pd

# Load the image
image_bytes = open(IMAGE_PATH, 'rb').read()
encoded_image = base64.b64encode(image_bytes).decode('ascii')

## Request headers
headers = {
    "Content-Type": "application/json",
    "api-key": AZURE_OPENAI_KEY,
}
```

Run this code block to configure the environment.

## Step 3: Use `gpt-4o` to describe the pipeline (optional)

This step is optional, but shows you how simple it's to extract details from the image, which could be relevant for your purposes. If you don't execute this step, you can still generate the pipeline JSON in the next step.

First select **Edit** on the main menu for the Notebook, and then select the **+ Add code cell below** button on the toolbar, to add a new block of code after the previous one.

:::image type="content" source="media/image-to-pipeline-with-ai/add-new-code-cell-below.png" alt-text="Screenshot showing where to add a new code cell below the current one in the Notebook editor.":::

Then add the following code to the new section. This code shows how `gpt-4o` can interpret and summarize the image to understand its contents.

```python
# Summarize the image

## Request payload
payload = {
    "messages": [
    {
        "role": "system",
        "content": [
        {
            "type": "text",
            "text": "You are an AI assistant that helps an Azure engineer understand an image that likely shows a Data Factory in Microsoft Fabric pipeline. Show list of pipeline activities and how they are connected."
        }
        ]
    },
    {
        "role": "user",
        "content": [
        {
            "type": "image_url",
            "image_url": {
            "url": f"data:image/jpeg;base64,{encoded_image}"
            }
        }
        ]
    }
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
}

## Send request
try:
    response = requests.post(AZURE_OPENAI_GPT4O_ENDPOINT, headers=headers, json=payload)
    response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
except requests.RequestException as e:
    raise SystemExit(f"Failed to make the request. Error: {e}")

response_json = response.json()

## Show AI response
print(response_json["choices"][0]['message']['content'])
```

Run this code block to see the AI summarization of the image and its components.

## Step 4: Generate the pipeline JSON

Add another code block to the Notebook, and add the following code. This code analyzes the image and generates the pipeline JSON.

```python
# Analyze the image and generate the pipeline JSON

## Setup new payload
payload = {
    "messages": [
    {
        "role": "system",
        "content": [
        {
            "type": "text",
            "text": "You are an AI assistant that helps an Azure engineer understand an image that likely shows a Data Factory in Microsoft Fabric pipeline. Succeeded is denoted by a green line, and Fail is denoted by a red line. Generate an ADF v2 pipeline JSON with what you see. Return ONLY the JSON text required, without any leading or trailing markdown denoting a code block."
        }
        ]
    },
    {
        "role": "user",
        "content": [
        {
            "type": "image_url",
            "image_url": {
            "url": f"data:image/jpeg;base64,{encoded_image}"
            }
        }
        ]
    }
    ],
    "temperature": 0.7,
    "top_p": 0.95,
    "max_tokens": 800
}

## Send request
try:
    response = requests.post(AZURE_OPENAI_GPT4O_ENDPOINT, headers=headers, json=payload)
    response.raise_for_status()  # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
except requests.RequestException as e:
    raise SystemExit(f"Failed to make the request. Error: {e}")

## Get JSON from request and show
response_json = response.json()
pipeline_json = response_json["choices"][0]['message']['content']
print(pipeline_json)
```

Run this code block to generate the pipeline JSON from the image.

## Step 4: Create the pipeline with Fabric REST APIs

Now that you obtained the pipeline JSON, you can create it directly using the Fabric REST APIs. Add another code block to the Notebook, and add the following code. This code creates the pipeline in your workspace.

```python
# Convert pipeline JSON to Fabric REST API request

json_data = json.loads(pipeline_json)

# Extract the activities from the JSON
activities = json_data["properties"]["activities"]

# Prepare the pipeline JSON definition
data = {}
activities_list = []

idx = 0

# Name mapping used to track activity name found in image to dynamically generated name
name_mapping = {}

for activity in activities:
    idx = idx + 1
    activity_name = activity["type"].replace("Activity","")

    objName = f"{activity_name}{idx}"

    # store the name mapping so we can deal with dependency 
    name_mapping[activity["name"]] = objName

    if 'dependsOn' in activity: 
        activity_dependent_list = activity["dependsOn"] 
        
        dependent_activity = ""
        if ( len(activity_dependent_list) > 0 ):
            dependent_activity = activity_dependent_list[0]["activity"]

        match activity_name:
            case "Copy":
                activities_list.append({'name': objName, 'type': "Copy", 'dependsOn': [],
                'typeProperties': { "source": { "datasetSettings": {} },
                "sink": { "datasetSettings": {} } }})
            case "Web":
                activities_list.append({'name': objName, 'type': "Office365Outlook",
                        "dependsOn": [
                            {
                                "activity":  name_mapping[dependent_activity] ,
                                "dependencyConditions": [
                                    "Succeeded"
                                ]
                            }
                        ]
                    }
                )
            case "ExecutePipeline":
                activities_list.append({'name': "execute pipeline 1", 'type': "ExecutePipeline",
                    "dependsOn": [
                            {
                                "activity":  name_mapping[dependent_activity] ,
                                "dependencyConditions": [
                                    "Succeeded"
                                ]
                            }
                        ]
                    }
                )
            case _:
                continue
    else:
        # simple activities with no dependencies
        match activity_name:
            case "Copy":
                activities_list.append({'name': objName, 'type': "Copy", 'dependsOn': [],
                'typeProperties': { "source": { "datasetSettings": {} } , "sink": { "datasetSettings": {} } }})
            case "SendEmail":
                 activities_list.append({'name': "Send mail on success", 'type': "Office365Outlook"})
            case "Web":
                activities_list.append({'name': "Send mail on success", 'type': "Office365Outlook"})
            case "ExecutePipeline":
                activities_list.append({'name': "execute pipeline 1", 'type': "ExecutePipeline"})
            case _:
                print("NoOp")

# Now that the activities_list is created, assign it to the activities tag in properties
data['properties'] = { "activities": activities_list}

# Convert data from dict to string, then Byte Literal, before doing a Base-64 encoding
data_str = str(data).replace("'",'"')
createPipeline_json = data_str.encode(encoding="utf-8")
createPipeline_Json64 = base64.b64encode(createPipeline_json)

# Create a new pipeline in Fabric
timestr = time.strftime("%Y%m%d-%H%M%S")
pipelineName = f"Pipeline from image with AI-{timestr}"

payload = {
        "displayName": pipelineName,
        "type": "DataPipeline",
        "definition": {
           "parts": [ 
             { 
              "path": "pipeline-content.json", 
              "payload": createPipeline_Json64, 
              "payloadType": "InlineBase64" 
              }
            ]
        }
}

print(f"Creating pipeline: {pipelineName}")

# Call the Fabric REST API to generate the pipeline
client = fabric.FabricRestClient()
workspaceId = fabric.get_workspace_id()
try:
    response = client.post(f"/v1/workspaces/{workspaceId}/items",json=payload)
    if response.status_code != 201:
        raise FabricHTTPException(response)
except WorkspaceNotFoundException as e:
    print("Workspace is not available or cannot be found.")
except FabricHTTPException as e:
    print(e)
    print("Fabric HTTP Exception. Check that you have the correct Fabrric API endpoints.")

response = client.get(f"/v1/workspaces/{workspaceId}/Datapipelines")
df_items = pd.json_normalize(response.json()['value'])
print("List of pipelines in the workspace:")
df_items
```

Output confirms the name of the pipeline created, and showing a list of your workspace's pipelines, so you can validate it's present.

:::image type="content" source="media/image-to-pipeline-with-ai/notebook-output.png" alt-text="Screenshot showing the output of the notebook after the pipeline was created.":::

## Step 6: Use your pipeline

Once your pipeline is created, you can edit it in your Fabric workspace, to see your image implemented as a pipeline. You can select each activity to configure it as you wish, and then run and monitor it as you require.

:::image type="content" source="media/image-to-pipeline-with-ai/generated-pipeline.png" lightbox="media/image-to-pipeline-with-ai/generated-pipeline.png" alt-text="Screenshot showing the pipeline generated by the notebook with AI.":::

## Related content

- [View or download the complete Python notebook with this sample](https://github.com/n0elleli/Azure-DataFactory/blob/fabric_samples/FabricSamples/Image%20to%20Pipeline%20with%20AI/NotebookSample.py)
- [How to monitor pipeline runs in Microsoft Fabric](monitor-pipeline-runs.md)
- [Azure OpenAI Service documentation](/azure/ai-services/openai/overview)
