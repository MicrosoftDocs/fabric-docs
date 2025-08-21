---
title: Workspace outbound access protection for data engineering workloads
description: "This article describes workspace outbound access protection for data engineering workloads."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 08/20/2025

#customer intent: As a data engineer, I want to control and secure outbound network access from my Fabric workspace so that I can prevent unauthorized data exfiltration and comply with organizational security policies.

---

# Workspace outbound access protection for data engineering workloads (preview)

Workspace outbound access protection enables precise control over external communications from Microsoft Fabric workspaces. When this feature is enabled, all workspace items, such as notebooks, Spark job definitions, and lakehouses, are restricted from making outbound connections to public endpoints unless access is explicitly granted through approved managed private endpoints. This capability is crucial for organizations in secure or regulated environments, as it helps prevent data exfiltration and enforces organizational network boundaries.

## Configuring outbound access protection for Data Engineering workloads

To configure outbound access protection for a workspace, you can enable the setting using the Fabric portal. 

* Open the workspace settings and select **Network Security**.
* Under **Outbound access protection (preview)**, switch the **Block outbound public access** toggle to **On**.

For detailed instructions, refer to [Set up workspace outbound access protection (preview)](workspace-outbound-access-protection-set-up.md).

## Running Spark Jobs with Outbound Access Protection Enabled 

Once workspace outbound access protection is enabled, all public internet access from Spark clusters is blocked, including:

* `pip install` commands fetching from Python Package Index (PyPI)
* Access to public domains like `https://login.microsoftonline.com` 
* Any attempts to access external APIs or websites 

This restriction is enforced through Managed Virtual Networks (Managed VNETs) provisioned by Microsoft Fabric. These secure networking environments are isolated unless explicitly connected to external resources via approved endpoints. 

## Connecting securely using managed private endpoints 

When outbound access is restricted, only approved managed private endpoints can facilitate connections from Spark clusters to:

* External services (for example, Azure SQL, Blob Storage)
* Other Fabric workspaces within the same tenant

Once a managed private endpoint (MPE) is created and approved, it becomes the only allowed channel for outbound data access.

## Installing libraries securely in outbound access protected Workspaces 

Because Fabric blocks public internet traffic, Spark clusters can't directly install packages from PyPI using `pip install`. 

You have two secure options for installing libraries in a workspace with outbound access protection enabled:

1. **Upload and use wheel files:** Manually prepare the required Python package wheel files on a trusted compute resource, then upload them to your Fabric environment. This method ensures only approved packages are installed and avoids public internet access.

2. **Host a private PyPI mirror:** Set up a private PyPI repository on Azure Storage and synchronize it with selected packages from the public PyPI index. Configure your Fabric environment to install packages from this private mirror using managed private endpoints, maintaining compliance with network security policies.

Choose the approach that best fits your organization's requirements for package management and security.

#### Option 1: Upload and use wheel files

1. Identify missing packages not included in the Fabric Spark Runtime.

1. Run the following script on your compute resource to set up a local python environment that's the same as the Microsoft Fabric Spark runtime 1.3. This script requires a YAML file containing a list of all the libraries included in the prebaked environment.

1. Ensure that Microsoft hosted private libraries are removed from this YAML.

   ```yaml 
   wget https://repo.anaconda.com/miniconda/Miniconda3-py310_24.1.2-0-Linux-x86_64.sh 
   bash Miniconda3-py310_24.1.2-0-Linux-x86_64.sh 
   chmod 755 -R /usr/lib/miniforge3/ 
   export PATH="/usr/lib/miniforge3/bin:$PATH" 
   sudo apt-get update 
   sudo apt-get -yq install gcc g++ 
   conda env create -n <custom-env-name> -f Python<version>-CPU.yml 
   source activate <custom-env-name> 
   ```

1. The script can be used to pass your requirements.txt file, which has all the packages and versions that you intend to install in the spark runtime. It prints the names of the new wheel files/dependencies for your input library requirements.

   ```yaml
   pip install -r <input-user-req.txt> > pip_output.txt 
   cat pip_output.txt | grep "Using cached *" 
   ```

1. Download `.whl` files manually.

1. Use Environment Artifact to upload all required wheels.

1. Attach the environment to notebooks or jobs.
 
#### Option 2: Host a private PyPI mirror on Azure Storage 

##### Prerequisites 

- Compute resources, such as a Linux development machine, Windows Subsystem for Linux (WSL), or an Azure virtual machine (VM.
   - Example: [Quickstart - Create a Linux VM in the Azure portal - Azure Virtual Machines](/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).
- Azure Storage Account to store the mirrored packages.
   - [Create a storage account - Azure Storage](/azure/storage/common/storage-account-create?tabs=azure-portal).
- Utilities:  
   - Bandersnatch: PyPI mirroring tool for repository synchronization. See the [Bandersnatch documentation](https://bandersnatch.readthedocs.io/en/latest/).
   - Azure CLI, Blobfuse2, or AzCopy: Utilities for uploading and synchronizing files with Azure Storage.

##### Initial sync of the PyPI repository

As an initial step, you need to perform a sync of the PyPI repository. The complete PyPI repository contains a large number of packages and is continuously expanding, so the initial download can take from 8 to 48 hours, depending on your hardware and network. For current repository size and package counts, refer to [Statistics · PyPI](https://pypi.org/stats/).

##### Maintenance

Periodic monitoring and updates are required to keep the mirror in sync. The following factors affect synchronization speed:

- Network speed.
- Server resources such as CPU, memory, and disk I/O on the compute resource running Bandersnatch.
- Disk speed (SSD vs. HDD) impacts how quickly Bandersnatch writes data.
- Initial setup versus maintenance sync: The initial sync downloads the entire repository and can take from 8 to 48 hours, but subsequent syncs are faster because they only update new or changed packages.

##### Setup steps

1. Set up a Linux VM or Windows Subsystem for Linux (WSL)) development machine. 

   ```
   wget https://repo.anaconda.com/miniconda/Miniconda3-py310_24.1.2-0-Linux-x86_64.sh 
   bash Miniconda3-py310_24.1.2-0-Linux-x86_64.sh 
   chmod 755 -R /usr/lib/miniforge3/ 
    
   # Add Python executable to PATH 
   export PATH="/usr/lib/miniforge3/bin:$PATH" 
   ``` 
 
1. Install Bandersnatch to mirror PyPI. Bandersnatch is a PyPI mirroring tool that downloads the entire PyPI repository and associated index files on **local filesystem**.

   ```
   # Install Bandersnatch 
   pip install bandersnatch
   ```

1. Configure Bandersnatch: Create a bandersnatch.conf file with the configurations specified in the example on GitHub at [bandersnatch/src/bandersnatch/example.conf](https://github.com/pypa/bandersnatch/blob/main/src/bandersnatch/example.conf). <!--Alternatively, find the exact conf file we created at MS. Refer attachment bandersnatch.conf.-->

1. Execute a mirror command to perform a one-time synchronization with the PyPI primary server.

   `bandersnatch --config <path-to-bandersnatch.conf> mirror `

   This command creates the following subdirectories in your mirror directory on the local filesystem.

   > [!NOTE]
   > The initial sync takes time to run (refer to [Statistics · PyPI](https://pypi.org/stats/)). Bandersnatch also supports selective mirroring using allowlist and blocklist plugins, enabling more efficient management of dependencies. By filtering unnecessary packages, you can reduce the size of the mirror, minimizing both cost and maintenance effort. For example, if the mirror is intended solely for Fabric, you can exclude Windows binaries to optimize storage. We recommend evaluating these filtering options based on your use case.

   See also [Mirror filtering — Bandersnatch documentation] (https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html).


1. To verify the mirror setup, you can use an HTTP server to serve your local PyPI mirror. This command starts a simple HTTP server on port 8000 that serves the contents of the mirror directory:

   ``` 
   cd <directory-to-mirror>
   python -m http.server 8000
   ```   

1. Configure pip to use the local PyPI mirror:

   ```   
   pip install <package> -index-url http://localhost:8000/simple 
   ```

1. Upload Mirror to the storage account and select **Enable Static Website on your Azure storage account**. This setting allows you to host static content like PyPI the index page. Enabling this setting automatically generates a container named $web.

   You can use either Azure CLI or AzCopy of blobfuse2 to upload the local mirror from your development machine to your Azure storage account.
   - Upload the packages folder to your chosen container on the storage account container.
   - Upload simple, PyPI, local-stats, and JSON folders to $web container of your storage account.
 
1. To use this mirror in your Fabric environment item, create two managed private endpoints in Fabric: 
   - One for the blob container (packages) 
   - One for the static website (index) 

1. Use Environment Artifact to specify a yml file to install [Library management in Fabric environments](/fabric/data-engineering/environment-manage-library). 

   ```
   dependencies: 
     - pip 
     - pip: 
       - pytest==8.2.2 
       - --index-url https://<storage-account-name>.z5.web.core.windows.net/simple 
   ```

1. Or, you can install packages directly within a notebook using the `%pip install` command:

```
   %pip install pytest --index-url https://<storage-account-name>.z5.web.core.windows.net/simple
```

### Understanding the behavior of file paths

When working with data in your Lakehouse using a Fabric notebook, you can reference files in two primary ways:

* **Relative Path**: This method is the easiest and most common method. When you drag and drop a file from the Lakehouse explorer into a notebook cell, it uses a relative path that points to the file within your current Lakehouse. This format works without any more configuration.

   Example: Files/people.csv

   Spark code: `df = spark.read.format("csv").option("header", "true").load("Files/people.csv")`

* **Fully qualified path** (absolute path): This path provides the complete location of the file, including the workspace and Lakehouse names. The Spark session's default configuration isn't set up to resolve these paths, which can cause a socket timeout exception when trying to access data.

   Example (throws a socket timeout error): `abfss://your_workspace@onelake.dfs.fabric.microsoft.com/your_lakehouse**.Lakehouse/Files/people.csv`

#### Recommended solution

To read files using a fully qualified path, especially when connecting to a Lakehouse in another workspace, you must use a different URI format. This format uses the Workspace ID and Lakehouse ID instead of their display names. This ensures the Spark session can correctly resolve the path and access the data.

* Correct URI format: `abfss://your_workspace_id@onelake.dfs.fabric.microsoft.com/your_lakehouse_id/Files/people.csv`

### How to Find Your Workspace and Lakehouse IDs

You can find these unique identifiers in the URL of your Fabric workspace and Lakehouse.

* **Workspace ID**: The GUID that appears after /groups/ in the URL.

* **Lakehouse ID**: The GUID that appears after /lakehouses/ in the URL.

Example: If your URL is `https://app.fabric.microsoft.com/groups/**4c8efb42-7d2a-4a87-b1b1-e7e98bea053d**/lakehouses/**5a0ffa3d-80b9-49ce-acd2-2c9302cce6b8**/...`

Correct Spark code:

Python

`df = spark.read.format("csv").option("header", "true").load("abfss://4c8efb42-7d2a-4a87-b1b1-e7e98bea053d@onelake.dfs.fabric.microsoft.com/5a0ffa3d-80b9-49ce-acd2-2c9302cce6b8/Files/people.csv")`

> [!NOTE]
> Use this same approach when you need to access data in a different workspace.

## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
