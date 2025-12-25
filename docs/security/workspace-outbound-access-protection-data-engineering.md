---
title: Workspace outbound access protection for data engineering workloads
description: "This article describes workspace outbound access protection for data engineering workloads."
author: msmimart
ms.author: mimart
ms.service: fabric
ms.topic: overview #Don't change
ms.date: 11/26/2025

#customer intent: As a data engineer, I want to control and secure outbound network access from my Fabric workspace so that I can prevent unauthorized data exfiltration and comply with organizational security policies.

---

# Workspace outbound access protection for data engineering workloads

Workspace outbound access protection enables precise control over external communications from Microsoft Fabric workspaces. When this feature is enabled, [data engineering workspace items](#supported-data-engineering-item-types), such as notebooks, Spark job definitions, and lakehouses, are restricted from making outbound connections to public endpoints unless access is explicitly granted through approved managed private endpoints. This capability is crucial for organizations in secure or regulated environments, as it helps prevent data exfiltration and enforces organizational network boundaries.

## Understanding outbound access protection with data engineering

When outbound access protection is enabled, all outbound connections from the workspace are blocked by default. Workspace admins can then create exceptions to grant access only to approved destinations by configuring managed private endpoints:

:::image type="content" source="media/workspace-outbound-access-protection-data-engineering/workspace-outbound-access-protection-data-engineering.png" lightbox="media/workspace-outbound-access-protection-data-engineering/workspace-outbound-access-protection-data-engineering.png" alt-text="Diagram of workspace outbound access protection in a data engineering scenario." border="false":::

## Configuring outbound access protection for data engineering

To configure outbound access protection for data engineering:

1. Follow the steps to [enable outbound access protection](workspace-outbound-access-protection-set-up.md). 

1. After enabling outbound access protection, you can set up [managed private endpoints](workspace-outbound-access-protection-allow-list-endpoint.md) to allow outbound access to other workspaces or external resources as needed.

Once configured, data engineering items can connect only to the approved managed private endpoints, while all other outbound connections remain blocked.

## Supported data engineering item types

The following data engineering item types are supported with outbound access protection: 

- Lakehouses
- Notebooks
- Spark Job Definitions
- Environments

The following sections explain how outbound access protection affects specific data engineering item types in your workspace.

### Notebooks

When outbound access protection is enabled on a workspace, notebooks can reference a destination only if a managed private endpoint is set up from the workspace to the destination.

| Source | Destination | Is a managed private endpoint set up? | Can the notebook or Spark job connect to the destination? |
|:--|:--|:--|:--|
| Notebook (Workspace A) | Lakehouse (Workspace B) | Yes, a cross-workspace managed private endpoint from A to B is set up in A | Yes |
| Notebook (Workspace A) | Lakehouse (Workspace B) | No | No |
| Notebook (Workspace A) | External Azure Data Lake Storage (ADLS) G2/other data source | Yes, a managed private endpoint is set up from A to the external data source | Yes |
| Notebook (Workspace A) | External ADLS G2/other data source | No | No | 

### Understanding file path behavior in Fabric notebooks

When accessing data in your Lakehouse from a Fabric notebook, you can reference files using either relative or fully qualified (absolute) paths. Understanding the differences is important for successful data access, especially when working across workspaces.

#### Relative paths

Relative paths are the simplest and most common way to reference files within your current Lakehouse. When you drag and drop a file from the Lakehouse explorer into a notebook cell, a relative path is used automatically.

**Example:**  
`Files/people.csv`

**Spark code:**  
```python
df = spark.read.format("csv").option("header", "true").load("Files/people.csv")
```

Relative paths work out of the box and require no further configuration.

#### Fully qualified (absolute) paths

Fully qualified paths specify the complete location of a file, including workspace and Lakehouse information. However, using display names in these paths can cause errors, such as socket timeouts, because the Spark session can't resolve them by default.

**Incorrect example (will fail):**  
`abfss://your_workspace@onelake.dfs.fabric.microsoft.com/your_lakehouse.Lakehouse/Files/people.csv`

#### Accessing data across workspaces

To access files in a Lakehouse located in a different workspace, use a fully qualified path that includes the Workspace ID and Lakehouse ID (not their display names). This ensures Spark can resolve the path and access the data.

**Correct URI format:**  
`abfss://<workspace_id>@onelake.dfs.fabric.microsoft.com/<lakehouse_id>/Files/people.csv`

**Example Spark code:**  
```python
df = spark.read.format("csv").option("header", "true").load("abfss://4c8efb42-7d2a-4a87-b1b1-e7e98bea053d@onelake.dfs.fabric.microsoft.com/5a0ffa3d-80b9-49ce-acd2-2c9302cce6b8/Files/people.csv")
```

#### How to find Workspace and Lakehouse IDs

- **Workspace ID:** The GUID after `/groups/` in your Fabric workspace URL.
- **Lakehouse ID:** The GUID after `/lakehouses/` in the URL.

**Example URL:**  
`https://app.fabric.microsoft.com/groups/4c8efb42-7d2a-4a87-b1b1-e7e98bea053d/lakehouses/5a0ffa3d-80b9-49ce-acd2-2c9302cce6b8/...`

> [!NOTE]
> Always use Workspace ID and Lakehouse ID in the URI when accessing data across workspaces.


### Spark jobs

When workspace outbound access protection is enabled, Spark clusters are prevented from making outbound connections to the public internet. This includes:

- Installing Python packages directly from PyPI using `pip install`
- Accessing public domains such as `https://login.microsoftonline.com`
- Connecting to any external APIs or websites

Microsoft Fabric enforces this restriction through Managed Virtual Networks (Managed VNETs), which isolate Spark clusters from external networks unless explicit access is granted.

#### Secure connectivity with managed private endpoints

To enable Spark clusters to connect to external resources while maintaining security, you must use managed private endpoints. These endpoints allow secure, approved connections to:

- External services (for example, Azure SQL Database, Azure Blob Storage)
- Other Fabric workspaces within the same tenant

Only connections established through approved managed private endpoints are permitted. All other outbound access attempts are blocked by default.

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
   > The initial sync takes time to run (refer to [Statistics · PyPI](https://pypi.org/stats/)). Bandersnatch also supports selective mirroring using allow list and blocklist plugins, enabling more efficient management of dependencies. By filtering unnecessary packages, you can reduce the size of the mirror, minimizing both cost and maintenance effort. For example, if the mirror is intended solely for Fabric, you can exclude Windows binaries to optimize storage. We recommend evaluating these filtering options based on your use case.

   See also [Mirror filtering — Bandersnatch documentation](https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html).


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


## Lakehouse schemas and outbound access protection

Lakehouses that use schemas are fully supported when accessed from items within the same workspace, including when outbound access protection is enabled.

In **cross-workspace access scenarios**, behavior differs depending on how the Lakehouse is accessed when **outbound access protection** is enabled on the consuming workspace.

### Supported scenarios

- Producer and consumer items are in the **same workspace**
- The Lakehouse uses schemas
- Access is performed using Spark DataFrame–based APIs

In these scenarios, Lakehouse schema operations function as expected.

### Cross-workspace behavior with outbound access protection enabled

When outbound access protection is enabled on a workspace and a **schema-enabled Lakehouse is accessed from a different workspace**, the following behavior applies:

- ✅ Access using **Spark DataFrame APIs** (for example, reading tables into DataFrames) continues to work
- ❌ Access using **Spark SQL** statements may fail.

> For example, `spark.read.table()` succeeds, while `SELECT * FROM table` may fail in cross-workspace scenarios when outbound access protection is enabled.


### Understanding the behavior of file paths

When working with data in your Lakehouse using a Fabric notebook, you can reference files in two primary ways:

* If your workspace has outbound access protection enabled, it uses managed virtual networks (VNETs) for Spark. In this case, Starter pools are disabled, and you should expect Spark sessions to take 3 to 5 minutes to start.

* With outbound access protection, all public access from Spark is blocked. This restriction prevents users from downloading libraries directly from public channels like PyPI using pip. To install libraries for their Data Engineering jobs, users have two options (for details, see [Installing libraries securely in outbound access protected workspaces](workspace-outbound-access-protection-data-engineering.md#installing-libraries-securely-in-outbound-access-protected-workspaces)):

   * Reference library packages from a data source connected to the Fabric workspace via a managed private endpoint.

   * Upload wheel files for their required libraries and dependencies (that aren’t already included in the prebaked runtime).

* Enabling outbound access protection blocks all public access from your workspace. Therefore, to query a Lakehouse from another workspace, you must create a cross-workspace managed private endpoint to allow the Spark jobs to establish a connection.

* Using fully qualified paths with workspace and lakehouse names can cause a socket timeout exception. To access files, use relative paths for the current Lakehouse or use a fully qualified path that includes the workspace ID and lakehouse ID (not their display names). This approach ensures the Spark session can resolve the path correctly and avoids socket timeout errors. [Learn more](workspace-outbound-access-protection-data-engineering.md#understanding-file-path-behavior-in-fabric-notebooks).


## Related content

- [Workspace outbound access protection overview](./workspace-outbound-access-protection-overview.md)
- [Set up workspace outbound access protection](./workspace-outbound-access-protection-set-up.md)
