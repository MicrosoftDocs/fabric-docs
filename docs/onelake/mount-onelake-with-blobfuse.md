---
title: Mount OneLake as a filesystem using BlobFuse2
description: Learn how to use BlobFuse2 to mount Microsoft Fabric OneLake as a filesystem on Linux virtual machines.
ms.reviewer: eloldag
ms.author: amasingh
author: amanjeetsingh
ms.topic: how-to
ms.custom: build-2024
ms.date: 01/20/2026
---

# Mount OneLake as a filesystem using BlobFuse2

[OneLake](onelake-overview.md) is a single, unified, logical data lake for your whole organization. You can access your data in OneLake through any API, SDK, or tool compatible with Azure Blob Storage or Azure Data Lake Storage (ADLS) by using a OneLake URI. OneLake [supports the same APIs as ADLS and Azure Blob Storage](onelake-api-parity.md).

[BlobFuse2](https://github.com/Azure/azure-storage-fuse) is an open source project developed to provide a virtual filesystem backed by the Azure Storage. It uses the libfuse open source library (fuse3) to communicate with the Linux FUSE kernel module, and implements the filesystem operations using the Azure Storage REST APIs. Since OneLake supports the same APIs as ADLS, you can use BlobFuse2 to mount OneLake as a filesystem on Linux virtual machines (VMs)

This article provides a step-by-step guide for configuring BlobFuse2 and mounting OneLake as a filesystem on a Linux virtual machine.

## Use cases for BlobFuse and OneLake Integration

- **Direct data ingestion**: Write data directly to OneLake from applications hosted on (VMs), reducing the time to generate insights. The data in OneLake is immediately available to all Fabric engines for analytical use-cases.

- **Shared filesystem across VMs**: Mount OneLake belonging to a single tenant across many virtual machines. This pattern enables many VMs to share OneLake location as a common filesystem for read/write operations.

- **Unified namespace**: OneLake [unifies data via shortcuts](onelake-shortcuts.md) and applies [OneLake security](security/get-started-security.md) end-to-end, so you can bring external data into a single logical namespace and control access consistently.

## Prerequisites

- An Azure subscription to host a Linux-based Azure virtual machine.
- A Fabric workspace with a minimum of workspace Contributor role.
- An application registration in Microsoft Entra ID with the necessary permissions to access the Fabric workspace.
- Network connectivity from the VM to Microsoft Fabric OneLake endpoints. The network where VM is hosted must allow outbound access to OneLake endpoints. If you are using private links for Microsoft Fabric, ensure that the VM can reach the private endpoint.

## Create an Azure Virtual Machine

1. Create an [Azure Virtual Machine](/azure/virtual-machines/linux/quick-create-portal) with a Linux-based operating system. The instructions here use Ubuntu 24.04. 

1. Configure the Network Security Group (NSG) rules to ensure the VM can connect to Microsoft Fabric OneLake endpoints. By default, outbound internet access is allowed. If your VM is in a restricted network, ensure that outbound access to the following endpoint is allowed:

   - `onelake.dfs.fabric.microsoft.com` on port 443 (HTTPS)

> [!NOTE]
> Network bandwidth is a key factor in determining the performance of BlobFuse2. Choose a VM size that provides adequate network bandwidth for your workload. For more information, see [Azure VM network bandwidth](/azure/virtual-network/virtual-machine-network-throughput).

## Install BlobFuse2

Follow the [installation instructions for BlobFuse2](/azure/storage/blobs/blobfuse2-what-is) for your Linux distribution. For Ubuntu, use the following commands:

```bash
sudo wget https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install blobfuse2
```

## Authorize access to OneLake

You must grant access to OneLake for the identity who mounts a [Fabric workspace (container)](onelake-api-parity.md). OneLake supports the following authentication methods:

- Service principal (client_id and client_secret)
- [Shared access signature](onelake-shared-access-signature-overview.md)

This document uses service principal to authenticate with OneLake. Follow these steps to configure service principal authentication:

1. Create an application registration in Microsoft Entra ID in the same tenant where Microsoft Fabric is deployed.

1. Note the following values from your application registration:
   - **Tenant ID**
   - **Client ID** (Application ID)
   - **Client Secret**

1. Switch to **Microsoft Fabric** and navigate to the workspace you want to mount to the Azure VM.

1. Select **Manage Access** from the workspace settings.

1. Add the service principal (Client ID) and assign it the **Contributor** role. This grants permissions to read and write from OneLake container (workspace).

## Prepare the BlobFuse2 Configuration File

1. Create a configuration file for BlobFuse2. The following example shows a recommended configuration for most scenarios:

   ```yaml
   # Logger configuration
   # This log file resides on the VM itself and you can choose any name and path.
   logging:
     type: base
     level: log_debug
     file-path: /home/azureuser/ols-logs.log
   
   # Pipeline configuration
   # Pipeline in BlobFuse2 is a set of components that define how data is accessed and cached.
   components:
     - libfuse
     - attr_cache
     - azstorage
   
   # Libfuse configuration
   libfuse:
     direct-io: true
     negative-entry-expiration-sec: 0
     allow-other: true
     uid: 1000
     gid: 1000
   
   # Streaming configuration
   streaming:
     enabled: true
     block_size_mb: 4
     parallelism: 4
   
   # Attribute cache configuration
   attr_cache:
     entry_timeout: 240
     negative_timeout: 120
     no-symlinks: true
     timeout-sec: 0
     cleanup-on-start: true
   
   # Azure storage configuration
   azstorage:
     type: adls
     account-name: onelake
     container: <replace-with-fabric-workspace-id>
     subdirectory: <replace-with-fabric-lakehouse-id>/Files
     max-concurrency: 20
     endpoint: onelake.dfs.fabric.microsoft.com
     mode: spn
     tenant-id: <replace-with-tenant-id>
     client-id: <replace-with-client-id>
     client-secret: <replace-with-client-secret>
   ```
   > [!NOTE]
   > BlobFuse2 achieves near-native performance through local file caching. Cache configuration and behavior differ based on access patterns, such as large sequential file streaming versus small, random file access. For more information on configuring caching, see [How to configure BlobFuse2](/azure/storage/blobs/blobfuse2-how-to-deploy).

1. Replace the placeholder values in the configuration:
   - `<replace-with-fabric-workspace-id>`: Fabric Workspace ID
   - `<replace-with-fabric-lakehouse-id>`: Fabric Lakehouse ID
   - `<replace-with-tenant-id>`: Microsoft Entra Tenant ID
   - `<replace-with-client-id>`: Client ID
   - `<replace-with-client-secret>`: Client Secret

1. Save the configuration file to your home directory. For this example, save it as `ols-ms-config.yaml`.

## Mount OneLake using BlobFuse2

1. Create a mount point directory on your VM. For example:

   ```bash
   mkdir ~/ols-files
   ```

1. Mount the OneLake /Files directory using the BlobFuse2 command:

   ```bash
   blobfuse2 mount ./ols-files/ --config-file=ols-ms-config.yaml
   ```

1. Verify that the filesystem mounted successfully by running:

   ```bash
   mount | grep -i blobfuse
   ```

   You should see output confirming that the BlobFuse2 filesystem is mounted to the virtual machine.

1. Check the log file to verify there are no errors or warnings:

   ```bash
   cat ~/ols-logs.log
   ```

## Verify OneLake workspace mount

1. Navigate to the mounted directory:

   ```bash
   cd ~/ols-files
   ls -la
   ```

   Any existing directories under the /Files path in your lakehouse appear as local directories on the VM.

1. Test writing a file to the mount. For example, use the `dd` command to generate test data:

   ```bash
   cd ~/ols-files
   dd if=/dev/zero of=dummy_file.img bs=1M count=100
   ```

   This command writes 100 blocks of 1 MB each, creating a 100-MB file on OneLake.

1. Verify the file appears in the Microsoft Fabric portal:
   - Navigate to your lakehouse in the Fabric portal
   - Go to the /Files directory
   - Confirm that the files are listed

> [!NOTE]
> - The performance of write operations depends on the resources available on the VM.
> - Latency depends on the region of the VM and the region where the Fabric capacity is provisioned. For optimal performance, provision resources in the same region.
> - Azure VM type will determine [network bandwidth](/azure/virtual-network/virtual-machine-network-throughput) a VM can support.

## Performance considerations

When using BlobFuse2 with OneLake, consider the following performance factors:

- **Access patterns**: Choose the access pattern that matches your workload. Enable local caching if you expect random access and repeated reads of the same data. For large sequential transfers, consider using streaming mode to avoid unnecessary disk overhead.

- **Regional proximity**: For best performance, provision your VM in the same Azure region as your Fabric capacity.

- **VM specifications**: In Azure, the VM size (SKU) limits maximum network bandwidth and caps aggregate throughput. Hence, choose a VM size that meets your performance requirements.

- **Concurrency**: Adjust the `max-concurrency` and `parallelism` settings in the configuration file based on your workload and VM resources.

## Limitations

- **POSIX compliance**: BlobFuse2 isn't fully POSIX-compliant. Certain operations, such as atomic renames or concurrent writes, may behave differently than on a traditional disk-based filesystem.

- **Concurrent writes**: Multiple writers to the same file aren't supported and can lead to data corruption.

- **File locking**: Standard POSIX file locking mechanisms aren't supported.

## Related content

- [OneLake overview](onelake-overview.md)
- [OneLake security](security/get-started-security.md)
- [OneLake shortcuts](onelake-shortcuts.md)
- [What is BlobFuse2?](/azure/storage/blobs/blobfuse2-what-is)
- [How to deploy BlobFuse2](/azure/storage/blobs/blobfuse2-how-to-deploy)
- [How to configure BlobFuse2](/azure/storage/blobs/blobfuse2-configuration)
- [BlobFuse2 commands](/azure/storage/blobs/blobfuse2-commands)
