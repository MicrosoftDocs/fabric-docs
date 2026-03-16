---
title: Submit Spark batch jobs using the Livy API
description: Learn how to submit Spark batch jobs using the Livy API.
ms.reviewer: avinandac
ms.topic: how-to
ms.search.form: Get started with batch jobs with the Livy API for Data Engineering
ms.date: 11/05/2025
ms.custom: sfi-image-nochange
---

# Use the Livy API to submit and execute Livy batch jobs

**Applies to:** [!INCLUDE[fabric-de-and-ds](includes/fabric-de-ds.md)]

Learn how to submit Spark batch jobs using the Livy API for Fabric Data Engineering. The Livy API currently doesn't support Azure Service Principal (SPN).

## Prerequisites

* Fabric [Premium](/power-bi/enterprise/service-premium-per-user-faq) or [Trial capacity](../fundamentals/fabric-trial.md) with a Lakehouse.

* A remote client such as [Visual Studio Code](https://code.visualstudio.com/) with [Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks), [PySpark](https://code.visualstudio.com/docs/python/python-quick-start), and the [Microsoft Authentication Library (MSAL) for Python](/entra/msal/python/).

* A Microsoft Entra app token is required to access the Fabric Rest API. [Register an application with the Microsoft identity platform](/entra/identity-platform/quickstart-register-app).

* Some data in your lakehouse, this example uses [NYC Taxi & Limousine Commission](https://www.nyc.gov/site/tlc/about/tlc-trip-record-data.page#:~:text=TLC%20Trip%20Record%20Data.%20Yellow%20and%20green%20taxi%20trip%20records) green_tripdata_2022_08 a parquet file loaded to the lakehouse.

The Livy API defines a unified endpoint for operations. Replace the placeholders {Entra_TenantID}, {Entra_ClientID}, {Fabric_WorkspaceID}, and {Fabric_LakehouseID} with your appropriate values when you follow the examples in this article.

## Configure Visual Studio Code for your Livy API Batch

1. Select **Lakehouse Settings** in your Fabric Lakehouse.

    :::image type="content" source="media/livy-api/Lakehouse-settings.png" alt-text="Screenshot showing Lakehouse settings." lightbox="media/livy-api/Lakehouse-settings.png" :::

1. Navigate to the **Livy endpoint** section.

    :::image type="content" source="media/livy-api/Lakehouse-settings-livy-endpoint.png" alt-text="screenshot showing Lakehouse Livy endpoint and Session job connection string." lightbox="media/livy-api/Lakehouse-settings-livy-endpoint.png" :::

1. Copy the Batch job connection string (second red box in the image) to your code.

1. Navigate to [Microsoft Entra admin center](https://entra.microsoft.com/) and copy both the Application (client) ID and Directory (tenant) ID to your code.

    :::image type="content" source="media/livy-api/entra-app-overview.png" alt-text="Screenshot showing Livy API app overview in the Microsoft Entra admin center." lightbox="media/livy-api/entra-app-overview.png" :::

## Create a Spark Batch code and upload to your Lakehouse

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code

    ```python
    import sys
    import os
    
    from pyspark.sql import SparkSession
    from pyspark.conf import SparkConf
    from pyspark.sql.functions import col
    
    if __name__ == "__main__":
    
        #Spark session builder
        spark_session = (SparkSession
            .builder
            .appName("batch_demo") 
            .getOrCreate())
    
        spark_context = spark_session.sparkContext
        spark_context.setLogLevel("DEBUG")  
    
        tableName = spark_context.getConf().get("spark.targetTable")
    
        if tableName is not None:
            print("tableName: " + str(tableName))
        else:
            print("tableName is None")
    
        df_valid_totalPrice = spark_session.sql("SELECT * FROM green_tripdata_2022 where total_amount > 0")
        df_valid_totalPrice_plus_year = df_valid_totalPrice.withColumn("transaction_year", col("lpep_pickup_datetime").substr(1, 4))
    
    
        deltaTablePath = f"Tables/{tableName}CleanedTransactions"
        df_valid_totalPrice_plus_year.write.mode('overwrite').format('delta').save(deltaTablePath)
    ```

1. Save the Python file locally. This Python code payload contains two Spark statements that work on data in a Lakehouse and needs to be uploaded to your Lakehouse.  You need the ABFS path of the payload to reference in your Livy API batch job in Visual Studio Code and your Lakehouse table name in the Select SQL statement.

    :::image type="content" source="media\livy-api\Livy-batch-payload.png" alt-text="Screenshot showing the Python payload cell." lightbox="media\livy-api\Livy-batch-payload.png" :::

1. Upload the Python payload to the files section of your Lakehouse. In the Lakehouse explorer, select **Files**. Then select > **Get data** > **Upload files**. Select files via the file picker.

    :::image type="content" source="media\livy-api\Livy-batch-payload-in-lakehouse-files.png" alt-text="Screenshot showing payload in Files section of the Lakehouse." lightbox="media\livy-api\Livy-batch-payload-in-lakehouse-files.png" :::

1. After the file is in the Files section of your Lakehouse, click on the three dots to the right of your payload filename and select Properties.

    :::image type="content" source="media\livy-api\Livy-batch-ABFS-path.png" alt-text="Screenshot showing payload ABFS path in the Properties of the file in the Lakehouse." lightbox="media\livy-api\Livy-batch-ABFS-path.png" :::

1. Copy this ABFS path to your Notebook cell in step 1.

## Authenticate a Livy API Spark batch session using either a Microsoft Entra user token or a Microsoft Entra SPN token

### Authenticate a Livy API Spark batch session using a Microsoft Entra SPN token

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code.

    ```python
    import sys
    from msal import ConfidentialClientApplication
    
    # Configuration - Replace with your actual values
    tenant_id = "Entra_TenantID"  # Microsoft Entra tenant ID
    client_id = "Entra_ClientID"  # Service Principal Application ID
    
    # Certificate paths - Update these paths to your certificate files
    certificate_path = "PATH_TO_YOUR_CERTIFICATE.pem"      # Public certificate file
    private_key_path = "PATH_TO_YOUR_PRIVATE_KEY.pem"      # Private key file
    certificate_thumbprint = "YOUR_CERTIFICATE_THUMBPRINT" # Certificate thumbprint
    
    # OAuth settings
    audience = "https://analysis.windows.net/powerbi/api/.default"
    authority = f"https://login.windows.net/{tenant_id}"
    
    def get_access_token(client_id, audience, authority, certificate_path, private_key_path, certificate_thumbprint=None):
        """
        Get an app-only access token for a Service Principal using OAuth 2.0 client credentials flow.
        
        This function uses certificate-based authentication which is more secure than client secrets.
    
        Args:
            client_id (str): The Service Principal's client ID  
            audience (str): The audience for the token (resource scope)
            authority (str): The OAuth authority URL
            certificate_path (str): Path to the certificate file (.pem format)
            private_key_path (str): Path to the private key file (.pem format)
            certificate_thumbprint (str): Certificate thumbprint (optional but recommended)
    
        Returns:
            str: The access token for API authentication
    
        Raises:
            Exception: If token acquisition fails
        """
        try:
            # Read the certificate from PEM file
            with open(certificate_path, "r", encoding="utf-8") as f:
                certificate_pem = f.read()
    
            # Read the private key from PEM file
            with open(private_key_path, "r", encoding="utf-8") as f:
                private_key_pem = f.read()
    
            # Create the confidential client application
            app = ConfidentialClientApplication(
                client_id=client_id,
                authority=authority,
                client_credential={
                    "private_key": private_key_pem,
                    "thumbprint": certificate_thumbprint,
                    "certificate": certificate_pem
                }
            )
    
            # Acquire token using client credentials flow
            token_response = app.acquire_token_for_client(scopes=[audience])
    
            if "access_token" in token_response:
                print("Successfully acquired access token")
                return token_response["access_token"]
            else:
                raise Exception(f"Failed to retrieve token: {token_response.get('error_description', 'Unknown error')}")
                
        except FileNotFoundError as e:
            print(f"Certificate file not found: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"Error retrieving token: {e}", file=sys.stderr)
            sys.exit(1)
    
    # Get the access token
    token = get_access_token(client_id, audience, authority, certificate_path, private_key_path, certificate_thumbprint)
    ```

1. Run the notebook cell, you should see the Microsoft Entra token returned.

    :::image type="content" source="media/livy-api/livy-session-entra-spn-token.png" alt-text="Screenshot showing the Microsoft Entra SPN token returned after running cell." lightbox= "media/livy-api/Livy-session-entra-spn-token.png":::

### Authenticate a Livy API Spark session using a Microsoft Entra user token

1. Create an `.ipynb` notebook in Visual Studio Code and insert the following code.

    ```python
    from msal import PublicClientApplication
    import requests
    import time
    
    # Configuration - Replace with your actual values
    tenant_id = "Entra_TenantID"  # Microsoft Entra tenant ID
    client_id = "Entra_ClientID"  # Application ID (can be the same as above or different)
    
    # Required scopes for Microsoft Fabric API access
    scopes = [
        "https://api.fabric.microsoft.com/Lakehouse.Execute.All",      # Execute operations in lakehouses
        "https://api.fabric.microsoft.com/Lakehouse.Read.All",        # Read lakehouse metadata
        "https://api.fabric.microsoft.com/Item.ReadWrite.All",        # Read/write fabric items
        "https://api.fabric.microsoft.com/Workspace.ReadWrite.All",   # Access workspace operations
        "https://api.fabric.microsoft.com/Code.AccessStorage.All",    # Access storage from code
        "https://api.fabric.microsoft.com/Code.AccessAzureKeyvault.All",     # Access Azure Key Vault
        "https://api.fabric.microsoft.com/Code.AccessAzureDataExplorer.All", # Access Azure Data Explorer
        "https://api.fabric.microsoft.com/Code.AccessAzureDataLake.All",     # Access Azure Data Lake
        "https://api.fabric.microsoft.com/Code.AccessFabric.All"             # General Fabric access
    ]
    
    def get_access_token(tenant_id, client_id, scopes):
        """
        Get an access token using interactive authentication.
        
        This method will open a browser window for user authentication.
        
        Args:
            tenant_id (str): The Azure Active Directory tenant ID
            client_id (str): The application client ID
            scopes (list): List of required permission scopes
            
        Returns:
            str: The access token, or None if authentication fails
        """
        app = PublicClientApplication(
            client_id,
            authority=f"https://login.microsoftonline.com/{tenant_id}"
        )
    
        print("Opening browser for interactive authentication...")
        token_response = app.acquire_token_interactive(scopes=scopes)
    
        if "access_token" in token_response:
            print("Successfully authenticated")
            return token_response["access_token"]
        else:
            print(f"Authentication failed: {token_response.get('error_description', 'Unknown error')}")
            return None
    
    # Uncomment the lines below to use interactive authentication
    token = get_access_token(tenant_id, client_id, scopes)
    print("Access token acquired via interactive login")
    ```

1. Run the notebook cell, a popup should appear in your browser allowing you to choose the identity to sign-in with.

    :::image type="content" source="media/livy-api/entra-logon-user.png" alt-text="Screenshot showing logon screen to Microsoft Entra app." lightbox="media/livy-api/entra-logon-user.png" :::

1. After you choose the identity to sign-in with, you need to approve the Microsoft Entra app registration API permissions.

    :::image type="content" source="media/livy-api/entra-logon.png" alt-text="Screenshot showing Microsoft Entra app API permissions." lightbox="media/livy-api/entra-logon.png" :::

1. Close the browser window after completing authentication.

    :::image type="content" source="media\livy-api\entra-authentication-complete.png" alt-text="Screenshot showing authentication complete." lightbox="media\livy-api\entra-authentication-complete.png" :::

1. In Visual Studio Code you should see the Microsoft Entra token returned.

    :::image type="content" source="media/livy-api/Livy-session-entra-token.png" alt-text="Screenshot showing the Microsoft Entra token returned after running cell and logging in." lightbox="media/livy-api/Livy-session-entra-token.png":::

## Submit a Livy Batch and monitor batch job.

1. Add another notebook cell and insert this code.

    ```python
    # submit payload to existing batch session

    import requests
    import time
    import json
    
    api_base_url = "https://api.fabric.microsoft.com/v1"  # Base URL for Fabric APIs
    
    # Fabric Resource IDs - Replace with your workspace and lakehouse IDs  
    workspace_id = "Fabric_WorkspaceID"
    lakehouse_id = "Fabric_LakehouseID"
    
    # Construct the Livy Batch API URL
    # URL pattern: {base_url}/workspaces/{workspace_id}/lakehouses/{lakehouse_id}/livyApi/versions/{api_version}/batches
    livy_base_url = f"{api_base_url}/workspaces/{workspace_id}/lakehouses/{lakehouse_id}/livyApi/versions/2023-12-01/batches"
    
    # Set up authentication headers
    headers = {"Authorization": f"Bearer {token}"}
    
    print(f"Livy Batch API URL: {livy_base_url}")
    
    new_table_name = "TABLE_NAME"  # Name for the new table
    
    # Configure the batch job
    print("Configuring batch job parameters...")
    
    # Batch job configuration - Modify these values for your use case
    payload_data = {
        # Job name - will appear in the Fabric UI
        "name": f"livy_batch_demo_{new_table_name}",
        
        # Path to your Python file in the lakehouse
        "file": "<ABFSS_PATH_TO_YOUR_PYTHON_FILE>",  # Replace with your Python file path
        
        # Optional: Spark configuration parameters
        "conf": {
            "spark.targetTable": new_table_name,  # Custom configuration for your application
        },
    }
    
    print("Batch Job Configuration:")
    print(json.dumps(payload_data, indent=2))
    
    try:
        # Submit the batch job
        print("\nSubmitting batch job...")
        post_batch = requests.post(livy_base_url, headers=headers, json=payload_data)
        
        if post_batch.status_code == 202:
            batch_info = post_batch.json()
            print("Livy batch job submitted successfully!")
            print(f"Batch Job Info: {json.dumps(batch_info, indent=2)}")
            
            # Extract batch ID for monitoring
            batch_id = batch_info['id']
            livy_batch_get_url = f"{livy_base_url}/{batch_id}"
            
            print(f"\nBatch Job ID: {batch_id}")
            print(f"Monitoring URL: {livy_batch_get_url}")
            
        else:
            print(f"Failed to submit batch job. Status code: {post_batch.status_code}")
            print(f"Response: {post_batch.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Network error occurred: {e}")
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Response text: {post_batch.text}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    ```

1. Run the notebook cell, you should see several lines printed as the Livy Batch job is created and run.

    :::image type="content" source="media\livy-api\Livy-batch-job-submission.png" alt-text="Screenshot showing results in Visual Studio Code after Livy Batch Job has been successfully submitted." lightbox="media\livy-api\Livy-batch-job-submission.png" :::

1. To see the changes, navigate back to your Lakehouse.

## Integration with Fabric Environments

By default, this Livy API session runs against the default starter pool for the workspace.  Alternatively you can use Fabric Environments [Create, configure, and use an environment in Microsoft Fabric](/fabric/data-engineering/create-and-use-environment) to customize the Spark pool that the Livy API session uses for these Spark jobs.  To use your Fabric Environment, update the prior notebook cell with this one line change.

```python
payload_data = {
    "name":"livybatchdemo_with"+ newlakehouseName,
    "file":"abfss://YourABFSPathToYourPayload.py", 
    "conf": {
        "spark.targetLakehouse": "Fabric_LakehouseID",
        "spark.fabric.environmentDetails" : "{\"id\" : \""EnvironmentID"\"}"  # remove this line to use starter pools instead of an environment, replace "EnvironmentID" with your environment ID
        }
    }
```

## View your jobs in the Monitoring hub

You can access the Monitoring hub to view various Apache Spark activities by selecting Monitor in the left-side navigation links.

1. When the batch job is completed state, you can view the session status by navigating to Monitor.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub.png" alt-text="Screenshot showing previous Livy API submissions in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub.png":::

1. Select and open most recent activity name.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-run.png" alt-text="Screenshot showing most recent Livy API activity in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub-last-run.png":::

1. In this Livy API session case, you can see your previous batch submission, run details, Spark versions, and configuration. Notice the stopped status on the top right.

    :::image type="content" source="media\livy-api\Livy-monitoring-hub-last-activity-details.png" alt-text="Screenshot showing most recent Livy API activity details in the Monitoring hub." lightbox="media\livy-api\Livy-monitoring-hub-last-activity-details.png":::

To recap the whole process, you need a remote client such as [Visual Studio Code](https://code.visualstudio.com/), a Microsoft Entra app token, Livy API endpoint URL, authentication against your Lakehouse, a Spark payload in your Lakehouse, and finally a batch Livy API session.

## Related content

* [Apache Livy REST API documentation](https://livy.incubator.apache.org/docs/latest/rest-api.html)
* [Submit session jobs using the Livy API](get-started-api-livy-session.md)
* [Apache Spark monitoring overview](spark-monitoring-overview.md)
* [Apache Spark application detail](spark-detail-monitoring.md)