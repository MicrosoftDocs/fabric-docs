---
title: Access OneLake with Python
description: Learn how to use the Azure Storage Python SDK to manage OneLake.
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 09/27/2023
---

# Use Python to manage files and folders in Microsoft OneLake

This article shows how you can use the Azure Storage Python SDK to manage files and directories in OneLake. This walkthrough covers the same content as [Use Python to manage directories and files in ADLS Gen2](/azure/storage/blobs/data-lake-storage-directory-file-acl-python?tabs=azure-ad) and highlights the differences when connecting to OneLake.

## Prerequisites

Before starting your project, make sure you have the following prerequisites:

- A workspace in your Fabric tenant with Contributor permissions.  
- A lakehouse in the workspace. Optionally, have data preloaded to read using Python.

## Set up your project

From your project directory, install packages for the Azure Data Lake Storage and Azure Identity client libraries. OneLake supports the same SDKs as Azure Data Lake Storage (ADLS) Gen2 and supports Microsoft Entra authentication, which is provided by the azure-identity package.  

```console
pip install azure-storage-file-datalake azure-identity
```

Next, add the necessary import statements to your code file:

```python
import os
from azure.storage.filedatalake import (
    DataLakeServiceClient,
    DataLakeDirectoryClient,
    FileSystemClient
)
from azure.identity import DefaultAzureCredential
```

## Authorize access to OneLake

The following example creates a service client connected to OneLake that you can use to create filesystem clients for other operations. To authenticate to OneLake, this example uses the DefaultAzureCredential to automatically detect credentials and obtain the correct authentication token. Common methods of providing credentials for the Azure SDK include using the 'az login' command in the Azure Command Line Interface or the 'Connect-AzAccount' cmdlet from Azure PowerShell.  

```python
def get_service_client_token_credential(self, account_name) -> DataLakeServiceClient:
    account_url = f"https://{account_name}.dfs.fabric.microsoft.com"
    token_credential = DefaultAzureCredential()

    service_client = DataLakeServiceClient(account_url, credential=token_credential)

    return service_client
```

To learn more about using DefaultAzureCredential to authorize access to data, see [Overview: Authenticate Python apps to Azure using the Azure SDK](/azure/developer/python/sdk/authentication-overview).

## Working with directories

To work with a directory in OneLake, create a filesystem client and directory client. You can use this directory client to perform various operations, including renaming, moving, or listing paths (as seen in the following example). You can also create a directory client when creating a directory, using the [FileSystemClient.create_directory](/python/api/azure-storage-file-datalake/azure.storage.filedatalake.filesystemclient#azure-storage-filedatalake-filesystemclient-create-directory) method.

```python
def create_file_system_client(self, service_client, file_system_name: str) : DataLakeServiceClient) -> FileSystemClient:
    file_system_client = service_client.get_file_system_client(file_system = file_system_name)
    return file_system_client

def create_directory_client(self, file_system_client : FileSystemClient, path: str) -> DataLakeDirectoryClient: directory_client 
    directory_client = file_system_client.GetDirectoryClient(path)
    return directory_client


def list_directory_contents(self, file_system_client: FileSystemClient, directory_name: str):
    paths = file_system_client.get_paths(path=directory_name)

    for path in paths:
        print(path.name + '\n')
```

## Upload a file

You can upload content to a new or existing file by using the [DataLakeFileClient.upload_data](/python/api/azure-storage-file-datalake/azure.storage.filedatalake.datalakefileclient#azure-storage-filedatalake-datalakefileclient-upload-data) method.

```python
def upload_file_to_directory(self, directory_client: DataLakeDirectoryClient, local_path: str, file_name: str):
    file_client = directory_client.get_file_client(file_name)

    with open(file=os.path.join(local_path, file_name), mode="rb") as data:
        file_client.upload_data(dataW, overwrite=True)
```

## Sample

The following code sample lists the directory contents of any folder in OneLake.  

```python
#Install the correct packages first in the same folder as this file. 
#pip install azure-storage-file-datalake azure-identity

from azure.storage.filedatalake import (
    DataLakeServiceClient,
    DataLakeDirectoryClient,
    FileSystemClient
)
from azure.identity import DefaultAzureCredential

# Set your account, workspace, and item path here
ACCOUNT_NAME = "onelake"
WORKSPACE_NAME = "<myWorkspace>"
DATA_PATH = "<myLakehouse>.Lakehouse/Files/<path>"

def main():
    #Create a service client using the default Azure credential

    account_url = f"https://{ACCOUNT_NAME}.dfs.fabric.microsoft.com"
    token_credential = DefaultAzureCredential()
    service_client = DataLakeServiceClient(account_url, credential=token_credential)

    #Create a file system client for the workspace
    file_system_client = service_client.get_file_system_client(WORKSPACE_NAME)
    
    #List a directory within the filesystem
    paths = file_system_client.get_paths(path=DATA_PATH)

    for path in paths:
        print(path.name + '\n')

if __name__ == "__main__":
    main()

```

To run this sample, save the preceding code into a file `listOneLakeDirectory.py` and run the following command in the same directory. Remember to replace the workspace and path with your own values in the example.

```terminal
python listOneLakeDirectory.py
```

## Related content

- [Use Python to manage ADLS Gen2](/azure/storage/blobs/data-lake-storage-directory-file-acl-python)
- [OneLake parity and integration](onelake-api-parity.md)
- [Sync OneLake with your Windows File Explorer](onelake-file-explorer.md)
