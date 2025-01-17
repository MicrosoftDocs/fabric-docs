---
title: Stream Oracle CDC data to RTI Eventstream Kafka endpoint with GoldenGate 
description: Learn how to stream real-time events from Oracle CDC data to Eventstream using the Kafka endpoint with GoldenGate.
ms.reviewer: spelluru
ms.author: xujiang1
author: WenyangShi
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
  - ignite-2024
ms.date: 01/15/2025
ms.search.form: Eventstreams Tutorials
#CustomerIntent: As a developer, I want to stream real-time events from my Oracle DB using Fabric event streams.
---

# Stream Oracle CDC Data to RTI Eventstream Kafka Endpoint with GoldenGate

In this tutorial, you learn how to leverage Oracle GoldenGate (OGG) to extract and replicate Oracle database CDC (change data capture) data to Microsoft Fabric Real-Time Intelligence using the Kafka endpoint offered from an eventstream’s custom endpoint source.

## In this tutorial, you will:
- Create an Oracle VM and the Oracle database.
- Install Oracle GoldenGate (OGG) Core on the Oracle VM.
- Configure the Oracle database for OGG and the OGG Extract to extract CDC data.
- Install Oracle GoldenGate (OGG) Big Data on the Oracle VM.
- Configure OGG Big Data to replicate the CDC data to Eventstream’s Kafka endpoint.
- Validate the entire end-to-end flow from Oracle to Eventstream.

## Prerequisites:
- Access to a workspace with **Contributor** or higher permissions where your eventstream is located.
- Preferred shell: Windows, Linux, or Azure Shell.
- Familiarity with Unix editors like `vi` or `vim`, and a basic understanding of X Server.

## Create Oracle VM and Database

This section provides instructions on using Azure CLI commands to create an Oracle virtual machine and set up a database within it.

1. Open your preferred shell to sign in to your Azure subscription with the `az login` command. Then follow the on-screen directions:
   
   ```bash
   $ az login
   ```

1. Check the subscription name and ID you are using to ensure it is the correct one:

   ```bash
   $ az account show
   ```

1. Create a Resource Group:
    ```bash
    $ az group create --name esoggcdcrg --location eastus2
    ```

1. Create Network Resources:
    1. Create a Virtual Network (VNET):
        ```bash
        $ az network vnet create --name oggVnet --resource-group esoggcdcrg --address-prefixes "10.0.0.0/16" --subnet-name oggSubnet1 --subnet-prefixes "10.0.0.0/24"
        ```
    1. Create a Network Security Group (NSG):
        ```bash
        $ az network nsg create --resource-group esoggcdcrg --name oggVnetNSG
        ```
    1. Create NSG Rule to Allow Network Traffic Within Virtual Network:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggVnetNSG --name oggAllowVnet --protocol '*' --direction inbound --priority 3400 --source-address-prefix 'VirtualNetwork' --source-port-range '*' --destination-address-prefix 'VirtualNetwork' --destination-port-range '*' --access allow
        ```
    1. Create NSG Rule to Allow RDP Connection:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggAllowRDP --protocol '*' --direction inbound --priority 3410 --source-address-prefix '*' --source-port-range '*' --destination-address-prefix '*' --destination-port-range '3389' --access allow
        ```
    1. Create NSG Rule to Deny All Inbound Connections:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggDenyAllInBound --protocol '*' --direction inbound --priority 3500 --source-address-prefix '*' --source-port-range '*' --destination-address-prefix '*' --destination-port-range '*' --access deny
        ```
    1. Assign NSG to Subnet:
        ```bash
        $ az network vnet subnet update --resource-group esoggcdcrg --vnet-name oggVNet --name oggSubnet1 --network-security-group oggVnetNSG
        ```

1. Create the Oracle Virtual Machine:
    ```bash
    $ az vm create --resource-group esoggcdcrg --name oggVM --image Oracle:oracle-database:oracle_db_21:21.0.0 --size Standard_D2s_v3 --generate-ssh-keys --admin-username azureuser --vnet-name oggVnet --subnet oggSubnet1 --public-ip-address "" --nsg "" --zone 1
    ```

## Create and Configure X Server VM

To create the Oracle database, use SSH to log in to the virtual machine that was created in the previous step. Because the NSG rule defined before denies all inbound connections but allows connections within the virtual network and RDP 3389 port, a Windows virtual machine will be created to connect to the Oracle virtual machine. This Windows virtual machine will be also used to host the X server which is to receive the graphical installation interface when installing the GoldenGate core application on Oracle VM later.

1. Replace your password and run the following command to create a Windows workstation VM where we deploy X Server.
    ```bash
    $ az vm create --resource-group esoggcdcrg --name oggXServer --image MicrosoftWindowsDesktop:windows-11:win11-24h2-pro:26100.2605.241207 --size Standard_D2s_v3 --vnet-name oggVnet --subnet oggSubnet1 --public-ip-sku Standard --nsg "" --data-disk-delete-option Delete --os-disk-delete-option Delete --nic-delete-option Delete --security-type Standard --admin-username azureuser --admin-password <YOUR_OWN_PASSWORD>
    ```

1. Once it is created, go to Azure portal to download the RDP file from oggXServer resource so that you can use it to remote access this windows machine. Open the RDP file and use the password you specified when creating the windows VM (oggXServer).

1. Follow this guide Install WSL | Microsoft Learn to install the WSL on the windows VM (oggXServer) so that SSH can be used to connect to Oracle VM (oggVM). You may also use other SSH tools, like putty to connect as well.
    ```bash
    PS C:\Users\azureuser> wsl --install -d Ubuntu
    ```

1. You may need to download the private key for SSH login on oggXServer from the oggVM. After the key is downloaded, use this key (move this key to your WSL home .ssh dir) to login:
    ```bash
    $ ssh -i ~/.ssh/id_rsa.pem azureuser@10.0.0.4
    ```

1. Please use the private IP address of the Oracle VM to connect.

## Create the Oracle Database

With the completion of the above, you should be able to SSHed to the Oracle VM on the X server windows VM (oggXServer). Follow the steps below to get the Oracle database created.

1. Use SSH to login to Oracle VM (oggVM)
    ```bash
    $ chmod 400 ~/.ssh/oggVM.pem
    $ ssh -i ~/.ssh/oggVM.pem azureuser@10.0.0.4
    ```

1. Change the user to ‘oracle’
    ```bash
    $ sudo su - oracle
    ```

1. Create the database using following command. This command can take 30-40 minutes to complete
    ```bash
    $ dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbname cdb1 -sid cdb1 -responseFile NO_VALUE -characterSet AL32UTF8 -sysPassword OraPasswd1 -systemPassword OraPasswd1 -createAsContainerDatabase true -numberOfPDBs 1 -pdbName pdb1 -pdbAdminPassword OraPasswd1 -databaseType MULTIPURPOSE -automaticMemoryManagement false -storageType FS -datafileDestination "/u01/app/oracle/oradata/" -ignorePreReqs
    ```

1. Set the ORACLE_SID and LD_LIBRARY_PATH variables
    ```bash
    $ export ORACLE_SID=cdb1
    $ export LD_LIBRARY_PATH=$ORACLE_HOME/lib
    ```

1. Add ORACLE_SID and LD_LIBRARY_PATH to ~/.bashrc file, so that these settings are saved for future sign-ins. ORACLE_HOME variable should already be set in .bashrc file
    ```bash
    $ sed -i '$ a export ORACLE_SID=cdb1' .bashrc
    $ sed -i '$ a export LD_LIBRARY_PATH=$ORACLE_HOME/lib' .bashrc
    ```

1. Start Oracle listener
    ```bash
    $ lsnrctl start
    ```

By now, the Oracle database has been created. To enable the Oracle CDC for GoldenGate, the archive log needs to be enabled. Follow the steps below to get it enabled.

1. Connect to sqlplus
    ```bash
    $ sqlplus / as sysdba
    ```

1. Enable archive log with following command. Please execute these commands one by one:
    ```sql
    SQL> SELECT log_mode FROM v$database;

    LOG_MODE
    ------------
    NOARCHIVELOG

    SQL> SHUTDOWN IMMEDIATE;
    SQL> STARTUP MOUNT;
    SQL> ALTER DATABASE ARCHIVELOG;
    SQL> ALTER DATABASE OPEN;
    ```

1. Enable force logging and GoldenGate replication, and make sure at least one log file is present. Please execute these commands one by one:
    ```sql
    SQL> ALTER DATABASE FORCE LOGGING;
    SQL> ALTER SYSTEM SWITCH LOGFILE;
    SQL> ALTER SYSTEM set enable_goldengate_replication=true;
    SQL> ALTER PLUGGABLE DATABASE PDB1 OPEN;
    SQL> ALTER SESSION SET CONTAINER=CDB$ROOT;
    SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    SQL> ALTER SESSION SET CONTAINER=PDB1;
    SQL> ALTER DATABASE ADD SUPPLEMENTAL LOG DATA;
    SQL> EXIT;
    ```
