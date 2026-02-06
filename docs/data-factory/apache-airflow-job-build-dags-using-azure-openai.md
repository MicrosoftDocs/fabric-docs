---
title: Use Azure OpenAI in Apache Airflow Job
description: Learn to generate Apache Airflow DAGs by transforming whiteboard sketches into DAG code using Azure OpenAI.
ms.reviewer: abnarain
ms.topic: how-to
ms.date: 11/18/2024
ms.custom: airflows, sfi-image-nochange
---

# Use Azure OpenAI to turn whiteboard sketches into Apache Airflow DAGs

Apache Airflow Jobs in Microsoft Fabric provides cloud-native experience for data engineers and data scientists, with features such as instant runtime provisioning, cloud-based authoring, dynamic autoscaling, intelligent autopause, and enhanced security. It's a fully managed service that enables you to create, schedule, and monitor Apache Airflow workflows in the cloud without worrying about underlying infrastructure.

Now, with the `gpt-4o` AI model in Azure, we're pushing the limits of what you can do with Apache Airflow Jobs and making it possible for you to create Apache Airflow DAGs from just your whiteboard sketch idea. This feature is useful for data engineers and data scientists who want to quickly prototype and visualize their data workflows.

In this article, you create an end to end workflow that downloads the sketch stored in your Lakehouse, use `gpt-4o` to turn it into Apache Airflow DAG and load it into Apache Airflow Jobs for execution. 

## Prerequisites
Before you create the solution, ensure the following prerequisites are set up in Azure and Fabric:

- [An **Azure OpenAI** account with an API key and a deployed gpt-4o model.](/azure/ai-services/openai/quickstart?tabs=command-line%2Cjavascript-keyless%2Ctypescript-keyless%2Cpython-new&pivots=programming-language-python)
- [Create a Microsoft Entra ID app](/azure/active-directory/develop/quickstart-register-app) if you don't have one.
- Add your Service principal as a "Contributor" in your Microsoft Fabric workspace.
:::image type="content" source="media/apache-airflow-jobs/manage-access.png" lightbox="media/apache-airflow-jobs/manage-access.png" alt-text="Screenshot to add service principal as a contributor.":::
- [Create the "Apache Airflow Job" in the workspace.](../data-factory/create-apache-airflow-jobs.md)
- A diagram of what you want your Apache Airflow DAG to look like or save the given image in [step 1](#step-1-upload-the-image-to-fabric-lakehouse) to your local machine.
- Add the following python packages in `requirements.txt` present in your Apache Airflow Job environment.
   ```bash
   azure-storage-file-datalake
   Pillow
   ```

### Step 1: Upload the image to Fabric Lakehouse

Before you can analyze the image, you need to upload it to your Lakehouse. 
:::image type="content" source="media/apache-airflow-jobs/airflow-dag-diagram.png" lightbox="media/apache-airflow-jobs/airflow-dag-diagram.png" alt-text="Screenshot represents DAG diagram of Apache Airflow.":::

1. Upload the file from your local machine to the Lakehouse's `Files` folder.
:::image type="content" source="media/apache-airflow-jobs/airflow-upload-lakehouse.png" lightbox="media/apache-airflow-jobs/airflow-upload-lakehouse.png" alt-text="Screenshot represents file upload to Fabric Lakehouse.":::

2. Copy the storage account name of your Fabric Lakehouse, it is used in the Apache Airflow connection to authenticate with the Lakehouse.
:::image type="content" source="media/apache-airflow-jobs/airflow-lakehouse-name.png" lightbox="media/apache-airflow-jobs/airflow-lakehouse-name.png" alt-text="Screenshot represents Fabric Lakehouse name.":::

### Step 2: Set up Environment Variables to authenticate with Lakehouse and Azure OpenAI.

> Note: This tutorial is based on Airflow version 2.6.3.

:::image type="content" source="media/apache-airflow-jobs/rename-add-environment-variables.png" lightbox="media/apache-airflow-jobs/rename-add-environment-variables.png" alt-text="Screenshot to add environment variables in apache airflow job.":::

#### Credentials for Lakehouse Rest APIs. 
We're going to use the Lakehouse Rest APIs to download the image from the Lakehouse. To authenticate with the Lakehouse Rest APIs, you need to set the following environment variables in Apache Airflow Job.
- `FABRIC_CLIENT_ID`: The client ID of the Microsoft Entra ID app.
- `FABRIC_CLIENT_SECRET`: The client secret of the Microsoft Entra ID app.
- `FABRIC_TENANT_ID`: The tenant ID of the Microsoft Entra ID app.

#### Credentials for Azure OpenAI
We use the `gpt-4o` model deployment in Azure OpenAI to analyze the whiteboard sketch of the pipeline and convert it into an Apache Airflow DAG. To connect to the Azure OpenAI API, store the API key and endpoint in environment variables:
- `OPENAI_API_KEY`: Enter your Azure OpenAI API key.
- `OPENAI_API_ENDPOINT`: Enter the endpoint URL for your deployed `gpt-4o` model. For example, `https://ai-contosoai6211465843515213.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview`.

### Step 3: Create an Apache Airflow DAG to generate DAGs from sketches

With all prerequisites complete, you're ready to set up the Azure OpenAI DAG Generator workflow.

#### How the Azure OpenAI DAG Generator works
1. Download the sketch from your Lakehouse: The image is encoded in base64 format and sent to Azure OpenAI.
2. Generate DAG Code using Azure OpenAI: The workflow uses the `gpt-4o` model to generate the DAG code from the sketch and given system prompt.
3. Azure OpenAI interprets the input image and system prompt, generating python code that represents an Apache Airflow DAG. The response includes this code as part of the API output.
4. The generated DAG code is retrieved from the API response and written to a Python file in the `dags` directory. Before you use the file, configure the connections required by the operators in the Apache Airflow and the file is immediately ready for use in the Apache Airflow Jobs interface.

#### Code for Azure OpenAI DAG Generator

Now, follow the steps to implement the workflow:

1. Create a file named openapi_dag_generator.py in the dags directory of your Apache Airflow project.
2. Add the following code to the file. Replace `yourStorageAccountName`, `workspace_name` and `file_path` with the actual values and save the file.
   ```python
   import io
   import os
   import json
   import base64
   import requests
   from PIL import Image
   from pendulum import datetime
   
   from airflow.models import Variable
   from airflow.models.param import Param
   from airflow.decorators import dag, task
   from airflow.models.baseoperator import chain
   from azure.storage.filedatalake import DataLakeServiceClient
   from azure.identity import ClientSecretCredential


   @dag(
       start_date=datetime(2023, 11, 1),
       schedule=None,
       catchup=False,
       params={
           "system_prompt": Param(
               'You are an AI assistant that helps to write an Apache Airflow DAG code by understanding an image that shows an Apache Airflow DAG containing airflow tasks, task descriptions, parameters, trigger rules and edge labels.\
               You have to priortize the Apache Airflow provider operators over Apache Airflow core operators if they resonates more with task description.\
               Use the most appropriate Apache Airflow operators as per the task description\
               To give the label to the DAG edge use the Label from the airflow.utils.edgemodifier class\
               You can use Dummy operators for start and end tasks. \
               Return apache airflow dag code in a valid json format following the format:```json{ "dag": "value should be Apache Airflow DAG code"}```',
               type="string",
               title="Give a prompt to the Airflow Expert.",
               description="Enter what you would like to ask Apache Airflow Expert.",
               min_length=1,
               max_length=500,
           ),
           "seed": Param(42, type="integer"),
           "temperature": Param(0.1, type="number"),
           "top_p": Param(0.95, type="number"),
           "max_tokens": Param(800, type="integer"),
       },
   )
   
   def OpenAI_Dag_Generator():
       """
       A DAG that generates an Apache Airflow DAG code using `gpt-4o` OpenAI model based on a diagram image
       stored in Azure Blob Storage. The generated DAG is saved in the `dags` folder for execution.
       """
       
       @task
       def fetch_image_from_lakehouse(workspace_name: str, file_path: str):
           """
           Downloads an image from Fabric Lakehouse and encodes it as a Base64 string.
           
           :param workspace_name: Name of the workspace where your Lakehouse is located.
           :param file_path: Relative file path stored in the Fabric Lakehouse.
           :return: Dictionary containing the encoded image as a Base64 string.
           """
           account_url = f"https://{yourStorageAccountName}.dfs.fabric.microsoft.com"
           client_id = os.getenv("FABRIC_CLIENT_ID")
           client_secret = os.getenv("FABRIC_CLIENT_SECRET")
           tenant_id = os.getenv("FABRIC_TENANT_ID")

           tokenCredential = ClientSecretCredential(
               tenant_id=tenant_id,
               client_id=client_id,
               client_secret=client_secret
           )

           lakehouse_client = DataLakeServiceClient(
               account_url,
               credential=tokenCredential
           )

           blob_data = lakehouse_client.get_file_client(workspace_name, file_path).download_file().readall()

           image = Image.open(io.BytesIO(blob_data))
           
           # Encode image as Base64
           buffered = io.BytesIO()
           image.save(buffered, format="PNG")
           encoded_image = base64.b64encode(buffered.getvalue()).decode('ascii')
           
           return {"encoded_image": encoded_image}


       @task
       def generate_dag_code_from_openai(image_from_blob: dict, system_prompt: str, **context):
           """
           Sends the encoded image to the OpenAI gpt-4o model to generate an Apache Airflow DAG code.
           
           :param encoded_image: Dictionary containing the Base64-encoded image.
           :param system_prompt: Prompt to ask the OpenAI model to generate the DAG code.
           :return: Dictionary containing the generated DAG code as a string.
           """
           
           azureAI_api_key = os.getenv("OPENAI_API_KEY")
           azureAI_endpoint = os.getenv("OPENAI_API_ENDPOINT")
   
           image = image_from_blob["encoded_image"]
           
           headers = {
               "Content-Type": "application/json",
               "api-key": azureAI_api_key,
           }
           
           payload = {
               "messages": [
               {
                   "role": "system",
                   "content": [
                   {
                       "type": "text",
                       "text": system_prompt
                   }
                   ]
               },
               {
                   "role": "user",
                   "content": [
                   {
                       "type": "image_url",
                       "image_url": {
                       "url": f"data:image/jpeg;base64,{image}"
                       }
                   }
                   ]
               }
               ],
               "seed": context["params"]["seed"],
               "temperature": context["params"]["temperature"],
               "top_p": context["params"]["top_p"],
               "max_tokens": context["params"]["max_tokens"]
           }
           
           response = requests.post(azureAI_endpoint, headers=headers, json=payload)
           response.raise_for_status()  
   
           # Get JSON from request and show
           response_json = response.json()
           
                  
           # Check if 'choices' and 'message' are present in the response
           if 'choices' in response_json and len(response_json['choices']) > 0:
               content = response_json['choices'][0]['message']['content']
               
               start_index = content.find('```json')
               end_index = content.rfind("```")
               
               # Validate JSON block delimiters
               if start_index == -1 or end_index == -1:
                   raise ValueError("JSON block delimiters (```json ... ```) not found in the content.")
               
               # Extract and parse the JSON string
               extracted_json_str = content[start_index + 7:end_index].strip()
               if not extracted_json_str:
                   raise ValueError("Extracted JSON string is empty.")
   
               # Convert to a Python dictionary
               dag_json = json.loads(extracted_json_str)
               dag_code = dag_json.get("dag")
               if not dag_code:
                   raise ValueError("'dag' key not found in the extracted JSON.")
   
               return {"dag_code": dag_code}
           
           return response_json
       
       @task
       def save_dag(xcom_dag_code: dict):
           """
           Saves the generated DAG code to a Python file in the `dags` directory.
           """
           try:
               with open("dags/openai_dag.py", "w") as f:
                   f.write(xcom_dag_code["dag_code"])
               
               print("DAG code saved successfully.")
           except Exception as e:
               raise ValueError(f"Error saving DAG code: {str(e)}")
       
       chain(
           save_dag(
               generate_dag_code_from_openai(
                   fetch_image_from_lakehouse(
                       workspace_name="airflow-dag-images", # Your Fabric Workspace
                       file_path="lakehouse_ai.Lakehouse/Files/airflow-dag-diagram.png" # Path to the image file located in the Lakehouse
                   ),
                   "{{ params.system_prompt }}"
               )
           )
       )
       
   OpenAI_Dag_Generator()
   ```

### Step 4: Trigger the DAG from Apache Airflow UI
1. Click on `Monitor Airflow`.
2. Navigate to the DAGs tab and locate the `OpenAI_Dag_Generator` DAG. Click on it.
3. Click on the play button and Select `Trigger DAG w/ config`.
   :::image type="content" source="media/apache-airflow-jobs/trigger-dag.png" lightbox="media/apache-airflow-jobs/trigger-dag.png" alt-text="Screenshot shows how to trigger dag using config.":::
4. You're presented with a form showing DAG parameters. We provide a default system prompt, seed, temperature, top_p, and max_tokens. You can modify these values as needed.
   :::image type="content" source="media/apache-airflow-jobs/dag-parameters.png" lightbox="media/apache-airflow-jobs/dag-parameters.png" alt-text="Screenshot represents DAG parameters.":::
5. Click on `Trigger` button to start.
6. After the successful DAG execution, you would see a new DAG generated with the filename `openai_dag.py` in the `dags` folder of Apache Airflow Job.

### Step 5: Get Ready to execute the newly generated DAG
1. Open the Apache Airflow Job UI.
2. The newly generated DAG is saved in the DAGs folder as `openai_dag.py`.
   :::image type="content" source="media/apache-airflow-jobs/new-file-openai-dag.png" lightbox="media/apache-airflow-jobs/new-file-openai-dag.png" alt-text="Screenshot represents new dag generated with OpenAI dag generator.":::
3. Open the DAG file to review the code. You can edit it as needed and configure the necessary connections for the operators.
4. Once the connections are set, you can trigger the DAG to execute the workflow.
   :::image type="content" source="media/apache-airflow-jobs/openai-resultant-dag.png" lightbox="media/apache-airflow-jobs/openai-resultant-dag.png" alt-text="Screenshot represents resultant dag from OpenAI.":::

## Conclusion
Explore more use cases by modifying the system prompt or input sketch. This solution demonstrates the seamless integration of Azure OpenAI and Apache Airflow Jobs to quickly convert ideas into functional workflows. By automating the DAG creation process, you can save significant time and focus on higher-value tasks.

## Related content

[Quickstart: Create an Apache Airflow Job](../data-factory/create-apache-airflow-jobs.md)
[Enable Azure Key Vault as Secret Backend](../data-factory/apache-airflow-jobs-enable-azure-key-vault.md)
