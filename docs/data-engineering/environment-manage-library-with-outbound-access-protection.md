---
title: Manage libraries with limited network access in Fabric
description: Learn about adding libraries in Fabric with the network limitation.
ms.author: shuaijunye
author: ShuaijunYe
ms.topic: how-to
ms.date: 09/15/2025
ms.search.form: Manage libraries when private links and DEP enabled.
---

# Manage libraries with limited network access in Fabric

Microsoft Fabric allows admins to control and restrict outbound connections from workspace items to external resources. When outbound network security features are enabled, access to public repositories, like PyPI is blocked, which includes the ability to install public libraries or download dependencies required for custom packages.

This article will cover how to install libraries from PyPI the when the outbound access protection is enabled for your workspace.

## Manage the packages as custom libraries (recommended)

In an internet restricted environment, the service will not be able to connect to public repo to download additional customer libraries and its dependencies. We recommend you to **directly upload the packages and their dependencies as custom packages** in the environment.

### Step 1: Pre-requisites

To get started, you need to prepare your libraries specification as`requirement.txt`, a compute resource that can used to build a Python virtual environment, and the setup file for Fabric runtime.

- Compute resources: Linux system, Windows Subsystem for Linux, or an [Azure VM](/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu)

- Download the Fabric Runtime setup files from the [Fabric Runtime release note Github repo](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric) with corresponding Runtime version.

> [!IMPORTANT]
> The Runtime setup file contains a few Microsoft hosted private libraries, which cannot be recognize. Make sure to remove any libraries with names containing 'synapse' from the YAML file.

:::image type="content" source="media\environment-lm\outbound-access-protection-runtime-setup.png" alt-text="Screenshot that shows the example of Runtime setup file." lightbox="media\environment-lm\outbound-access-protection-runtime-setup.png":::

### Step 2: Setup the Virtual Python Environment in your compute resource

Create the the Virtual Python Environment, which aligns with the Fabric Runtime's Python version, in your compute resource by running the following script.

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-py310_24.1.2-0-Linux-x86_64.sh
bash Miniconda3-py310_24.1.2-0-Linux-x86_64.sh
chmod 755 -R /usr/lib/miniforge3/
export PATH="/usr/lib/miniforge3/bin:$PATH"
sudo apt-get update
sudo apt-get -yq install gcc g++
conda env create -n <custom-env-name> -f Python311-CPU.yml
source activate <custom-env-name>
```

### Step 3: Identify and download the required wheels

The following script can be used to pass your requirements.txt file, which has all the packages and versions that you intend to install in the spark runtime. It will print the names of the new wheel files/dependencies for your input library requirements.

```shell
pip install -r <input-user-req.txt> > pip_output.txt
cat pip_output.txt | grep "Using cached *"
```

Now, you can download the listed wheels from PyPI and directly upload them to Fabric Environment.

## Host PyPI mirror on Azure Storage account

A PyPI mirror is a replica of the official PyPI repository. This can either be a full replica of PyPI or a partial replica and can be hosted in several ways within Azure. PG team recommends to use Azure Storage account.This storage account will be protected behind organization vNet, so that only approved targets/endpoints can access it.

> [!IMPORTANT]
> Host PyPI mirror is ideal for organizations that rely on a large set of PyPI libraries and prefer not to manage individual wheel files manually. This comes with the onus of organizations **bearing the setup costs** and **periodic monitoring and updating** to keep the mirror in sync with PyPI.

### Step 1: Pre-requisites

- Compute resources: Linux system, Windows Subsystem for Linux, or an [Azure VM](/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu)
- [Azure Storage Account](/azure/storage/common/storage-account-create?tabs=azure-portal): To store the mirrored packages.
- Other utilities: [Bandersnatch](https://bandersnatch.readthedocs.io/en/latest/), i,e., the PyPI mirroring tool that handles synchronization. Az CLI or Blobefuse2 or Azcopy, i.e., the utility for efficient file synchronization

#### Initial Setup

The size of the entire PyPI repository is quite large and constantly growing. There will be a one-time initial effort of setting up the entire PyPI repository. See the [PyPI Statistics](https://pypi.org/stats/).

#### Maintenance

To keep the mirror in sync with PyPI, periodic monitoring and updating are required.

> [!NOTE]
> The followings are various factors of your compute resource that contribute to the setup and maintenance effort:
>
> - Network speed
> - Server resources: CPU, memory, disk I/O of the compute resource running Bandersnatch will impact the synchronization speed
> - Disk speed: the speed of the storage system (e.g., SSD vs. HDD) can affect how quickly Bandersnatch can write data to disk.
> - Initial setup vs. Maintenance sync: the initial sync (when you first set up Bandersnatch) will generally take longer as it downloads the entire repository. On a typical setup with decent network and hardware, it might range from 8 to 48 hours. Subsequent syncs, which only update new or changed packages, will be faster.

### Step 2: Setup Python on your compute resource

Run the following script to setup the corresponding Python version.

```shell
wget https://repo.anaconda.com/miniconda/Miniconda3-py310_24.1.2-0-Linux-x86_64.sh
bash Miniconda3-py310_24.1.2-0-Linux-x86_64.sh
chmod 755 -R /usr/lib/miniforge3/

# Add Python executable to PATH
export PATH="/usr/lib/miniforge3/bin:$PATH"
```

### Step 2: Setup Bandersnatch

Bandersnatch is a PyPI mirroring tool which downloads all of PyPI and associated index files on **local filesystem**. You can refer to [this article](https://github.com/pypa/bandersnatch/blob/main/src/bandersnatch/example.conf) to create a `bandersnatch.conf` file.

Run the following script to setup Bandersnatch. The command will perform a one-time synchronization with PyPI. The initial sync will take time to run.

```shell
# Install Bandersnatch
pip install bandersnatch

# Execute mirror command
bandersnatch --config <path-to-bandersnatch.conf> mirror
```

> [!NOTE]
> The [Mirror filtering tool](https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html) supports partial mirroring through plugins like allowlist, enabling more efficient management of dependencies.
> By filtering unnecessary packages, it helps reduce the size of the full mirror, minimizing both cost and maintenance effort.
>For example, if the mirror is intended solely for Fabric, you can exclude Windows binaries to optimize storage. We recommend evaluating these filtering options based on your specific use case.
>

After the commands are executed successfully, the sub folders in your mirror directory on local filesystem will be created.

:::image type="content" source="media\environment-lm\outbound-access-protection-PyPI-mirror.png" alt-text="Screenshot that shows the PyPI mirror created by bandersnatch." lightbox="media\environment-lm\outbound-access-protection-PyPI-mirror.png":::

### Step 3: Verify local mirror setup (optional)

You can use a simple HTTP server to serve your local PyPI mirror. This command starts a simple HTTP server on port 8000 that serves the contents of the mirror directory.

```shell
cd <directory-to-mirror>
python -m http.server 8000

# Configure pip to Use the Local PyPI Mirror
pip install <package> -index-url http://localhost:8000/simple
```

### Step 4: Upload mirror on storage account

Enable Static Website on your Azure storage account. This will allow you to host static content like PyPI index page in this case. Enabling this will automatically generate a container named $web

:::image type="content" source="media\environment-lm\outbound-access-protection-storage-account.png" alt-text="Screenshot that shows the storage account example." lightbox="media\environment-lm\outbound-access-protection-storage-account.png":::

And then, you can use either az CLI or azcopy of blobfuse2 to upload the local mirror from your devbox to your Azure storage account.\

- Upload packages folder to your **chosen container** on the storage account container
- Upload simple, pypi, local-stats and json folders to **$web** container of your storage account

### Step 5: Use this mirror in Fabric Environment

In order to access the Azure Storage account, add two private managed endpoint in the Fabric workspace.

:::image type="content" source="media\environment-lm\outbound-access-protection-private-endpoints.png" alt-text="Screenshot that shows the private endpoints example." lightbox="media\environment-lm\outbound-access-protection-private-endpoints.png":::

And then, you can install the library from the Azure storage account by providing the YAML file in Environment or use inline %pip install in Notebook session.

- YAML file example:

 ```YAML
 dependencies:
   - pip
   - pip:
     - pytest==8.2.2
     - --index-url https://<storage-account-name>.z5.web.core.windows.net/simple
 ```

- %pip command example

 ```Python
 %pip install pytest --index-url https://<storage-account-name>.z5.web.core.windows.net/simple
 ```

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Manage Apache Spark libraries in Fabric](library-management.md)
