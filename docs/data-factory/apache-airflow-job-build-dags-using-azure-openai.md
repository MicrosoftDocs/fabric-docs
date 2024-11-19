---
title: Use Azure OpenAI in Apache Airflow Job
description: Learn to generate Apache Airflow DAGs by transforming whiteboard sketches into DAG code using Azure OpenAI.
ms.reviewer: abnarain
ms.author: v-ambgarg
author: abnarain
ms.topic: how-to
ms.date: 11/18/2024
---

# Use Azure OpenAI to turn whiteboard sketches into Apache Airflow DAGs

Apache Airflow Jobs in Microsoft Fabric provides cloud-native experience for data engineers and data scientists, with features such as instant runtime provisioning, cloud-based authoring, dynamic auto-scaling, intelligent auto-pause, and enhanced security. It is a fully managed service that enables you to create, schedule, and monitor Apache Airflow workflows in the cloud without worrying about underlying Infrastructure.

Now, with the `gpt-4o` AI model in Azure, we're pushing the limits of what you can do with Apache Airflow Jobs and making it possible for you to create Apache Airflow DAGs from just your whiteboard sketch idea. This feature is particularly useful for data engineers and data scientists who want to quickly prototype and visualize their data workflows.

In this article, you create an end to end workflow that downloads the sketch stored in Azure Blob Storage, use `gpt-4o` to turn it into Apache Airflow DAG and load it into Apache Airflow Jobs for execution. 

## Prerequisites
Before you create the solution, ensure the following prerequisites are set up in Azure and Fabric:

1. A Microsoft **Fabric enabled workspace**.
2. An **Azure OpenAI** account with an API key and a deployed gpt-4o model.
3. **Upload your sketch to Azure Blob Storage:** Ensure the file is accessible in your configured container.
4. Ensure the following required Python packages are installed:
```bash
    azure-storage-blob
    openai
    apache-airflow-providers-microsoft-azure
    Pillow
    requests
```

### Step 1: Configure Azure Blob Storage Connection
* Set up an Airflow connection for Azure Blob Storage:
    * Conn ID: wasb_conn_id (ensure it matches the code).
    * Type: Azure Blob Storage.
    * Required Fields: Storage account name, account key, and container name.

<!-- TODO: IMAGE -->

### Step 2: Store Azure OpenAI API Key and Endpoint in Airflow Variables

To securely store the Azure OpenAI API key and endpoint, create two Airflow variables:
* `openai_api_key`: Your Azure OpenAI API key.
* `openai_endpoint`: The endpoint of the deployed gpt-4o model.

To create the variables, navigate to the Airflow UI, click **Admin**, and then click **Variables**. Add the two variables with the respective values.

### Step 3: Create an Airflow DAG to Generate DAGs from Sketches

#### How the DAG works
1. Download the sketch from Azure Blob Storage: The image is encoded in base64 format and sent to Azure OpenAI.
2. Generate DAG Code using Azure OpenAI: The workflow uses the `gpt-4o` model to generate the DAG code from the sketch and given system prompt.
3. Azure OpenAI interprets the input image and system prompt, generating Python code that represents an Apache Airflow DAG. The response includes this code as part of the API output.
4. The generated DAG code is retrieved from the API response and written to a Python file in the dags directory. This file is immediately ready for use in the Apache Airflow Jobs interface.

#### Code for Azure OpenAI DAG Generator

The following code demonstrates the implementation of this workflow. Copy the code into a Python file and save it in the dags directory of your Apache Airflow Jobs:

```python
    from airflow.decorators import dag, task  
from airflow.models import Variable  
from airflow.models.baseoperator import chain  
from airflow.models.param import Param  
from airflow.providers.microsoft.azure.hooks.wasb import WasbHook  
from pendulum import datetime  
from PIL import Image  
import base64  
import io  
import json  
import requests  

OPENAI_CONN_ID = "openai_dag_generator"  

@dag(  
    start_date=datetime(2023, 11, 1),  
    schedule=None,  
    catchup=False,  
    params={  
        "system_prompt": Param(  
            'You are an AI assistant that helps to write an Apache Airflow DAG code by understanding an image that shows an Apache Airflow DAG...',  
            type="string",  
            title="Give a prompt to the Airflow Expert.",  
            min_length=1,  
            max_length=500,  
        ),  
        "seed": Param(42, type="integer"),  
        "temperature": Param(0.1, type="number"),  
        "top_p": Param(0.95, type="number"),  
        "max_tokens": Param(800, type="integer"),  
    },  
)  
def openai_generator_dag():  

    @task  
    def get_dag_sketch(blob_name: str, container_name: str):  
        wasb_hook = WasbHook(wasb_conn_id="wasb_conn_id")  
        blob_data = wasb_hook.download(container_name=container_name, blob_name=blob_name).readall()  
        image = Image.open(io.BytesIO(blob_data))  
        buffered = io.BytesIO()  
        image.save(buffered, format="PNG")  
        encoded_image = base64.b64encode(buffered.getvalue()).decode('ascii')  
        return {"encoded_image": encoded_image}  

    @task  
    def build_dag_with_openai(image_from_blob: dict):  
        azureAI_api_key = Variable.get("api_key")  
        azureAI_endpoint = Variable.get("api_endpoint")  
        image = image_from_blob["encoded_image"]  

        headers = {"Content-Type": "application/json", "api-key": azureAI_api_key}  
        payload = {  
            "messages": [  
                {"role": "system", "content": [{"type": "text", "text": "{{ params.system_prompt }}"}]},  
                {"role": "user", "content": [{"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image}"}}]},  
            ],  
            "seed": "{{ params.seed }}",  
            "temperature": "{{ params.temperature }}",  
            "top_p": "{{ params.top_p }}",  
            "max_tokens": "{{ params.max_tokens }}",  
        }  

        response = requests.post(azureAI_endpoint, headers=headers, json=payload)  
        response.raise_for_status()  
        dag_code = response.json()["choices"][0]["message"]["content"]  
        return {"dag_code": dag_code}  

    @task  
    def save_dag(xcom_dag_code: dict):  
        with open("dags/openai_dag.py", "w") as f:  
            f.write(xcom_dag_code["dag_code"])  

    chain(  
        save_dag(  
            build_dag_with_openai(  
                get_dag_sketch(blob_name="taskgroups.jpg", container_name="airflow-dag-diagram")  
            )  
        )  
    )  

openai_generator_dag()
```

### Step 4: Trigger the DAG

You would see a new DAG generated by the filename 'openai_dag.py' in the dags directory. This DAG is ready for execution in Apache Airflow Jobs.

## Conclusion
Explore additional use cases by modifying the system prompt or input sketch. This solution demonstrates the seamless integration of Azure OpenAI and Apache Airflow Jobs to quickly convert ideas into functional workflows. By automating the DAG creation process, you can save significant time and focus on higher-value tasks.

