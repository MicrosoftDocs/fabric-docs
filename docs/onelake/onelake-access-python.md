---
title: Access OneLake with Python
description: Learn how to use the Azure Storage Python SDK to manage OneLake. 
ms.reviewer: eloldag
ms.author: mabasile
author: mabasile-MSFT
ms.topic: conceptual
ms.custom: build-2023
ms.date: 08/04/2023
---

# Use Python to manage files and folders in Microsoft OneLake

[!INCLUDE [preview-note](../includes/preview-note.md)]

This article shows how you can use the Azure Storage Python SDK to manage files and directories in OneLake. This walkthrough covers the same content as [Use Python to manage directories and files in ADLS Gen2](/azure/storage/blobs/data-lake-storage-directory-file-acl-python?tabs=azure-ad) and highlights the differences when connecting to OneLake.

## Prerequisites

Before starting your project, you must have:

- A workspace in your Fabric tenant with Contributor permissions.
- A lakehouse in the workspace. Optionally, have data preloaded to read using Python.

## Set up your project

From your project directory, install packages for the Azure Data Lake Storage and Azure Identity client libraries. OneLake supports the same SDKs as Azure Data Lake Storage (ADLS) Gen2 and supports Azure Active Directory authentication, which is provided by the azure-identity package.

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

To authenticate your requests to OneLake, create an authorized DataLakeServiceClient instance that represents OneLake and uses the default Azure credential. When you build the DataLakeServiceClient, pass in a OneLake URL (`dfs.fabric.microsoft.com`) instead of an ADLS Gen2 URL (`dfs.core.windows.net`). When you call this function, remember the account name for OneLake is always **onelake**.

```python
def get_service_client_token_credential(self, account_name) -> DataLakeServiceClient:
    account_url = f"https://{account_name}.dfs.fabric.microsoft.com"
    token_credential = DefaultAzureCredential()

    service_client = DataLakeServiceClient(account_url, credential=token_credential)

    return service_client

service_client = get_service_client_token_credential('onelake')
```

To learn more about using DefaultAzureCredential to authorize access to data, see [Overview: Authenticate Python apps to Azure using the Azure SDK](/azure/developer/python/sdk/authentication-overview).

## List items in a workspace

You can list items in your workspace by first creating a file system client for your workspace.

```python
def create_file_system_client
    file_system_client = service_client.get_file_system_client(file_system="myworkspace")
    
    return file_system_client

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

## Learn more

- [Use Python to manage ADLS Gen2](/azure/storage/blobs/data-lake-storage-directory-file-acl-python)
- [OneLake API Parity](onelake-api-parity.md)
- [Sync OneLake with your Windows File Explorer](onelake-file-explorer.md)
