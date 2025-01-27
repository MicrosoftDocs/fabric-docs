---
title: Stream Oracle CDC data to Eventstream Kafka endpoint
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
#CustomerIntent: As a developer, I want to stream the change data capture events from my Oracle DB using Fabric event streams.
---

# Stream Oracle CDC Data to Fabric Eventstream Kafka Endpoint with Oracle GoldenGate

In this tutorial, you learn how to use Oracle GoldenGate (OGG) to extract and replicate Oracle database CDC (change data capture) data to Microsoft Fabric Real-Time Intelligence using the Kafka endpoint offered from an Eventstream’s custom endpoint source. This setup allows for real-time processing of Oracle CDC data and enables sending it to various destinations within Fabric, such as Eventhouse, Reflex, Derived stream, or custom endpoint destination for further analysis.

In this tutorial, you will:

> [!div class="checklist"]
>
> - Create an Oracle VM and the Oracle database.
> - Install Oracle GoldenGate (OGG) Core on the Oracle VM.
> - Configure the Oracle database for OGG and the OGG Extract to extract CDC data.
> - Install Oracle GoldenGate (OGG) Big Data on the Oracle VM.
> - Configure OGG Big Data to replicate the CDC data to Eventstream’s Kafka endpoint.
> - Validate the entire end-to-end flow from Oracle to Eventstream.

## Prerequisites
- Get access to a workspace with **Contributor** or higher permissions where your eventstream is located.
- Preferred shell: Windows, Linux, or [Azure Shell](https://shell.azure.com/).
- Familiarity with Unix editors like `vi` or `vim`, and a basic understanding of X Server.

## Create Oracle VM and Database

This section provides instructions on using Azure CLI commands to create an Oracle virtual machine and set up a database within it.

### Create Oracle Virtual Machine

1. Open your preferred shell to sign in to your Azure subscription with the ``az login`` command. Then follow the on-screen directions:
   
   ```bash
   $ az login
   ```
1. Check the subscription name and ID you're using to ensure it's the correct one:

   ```bash
   $ az account show
   ```

1. Create a resource group which is used to group all the Azure resources for this tutorial:
    ```bash
    $ az group create --name esoggcdcrg --location eastus2
    ```

1. Create the network resources that are required for this tutorial:
    1. Create a virtual network (virtual network) which is used for the virtual machines in this tutorial:
        ```bash
        $ az network vnet create --name oggVnet --resource-group esoggcdcrg --address-prefixes "10.0.0.0/16" --subnet-name oggSubnet1 --subnet-prefixes "10.0.0.0/24"
        ```
    1. Create a network security group (NSG):
        ```bash
        $ az network nsg create --resource-group esoggcdcrg --name oggVnetNSG
        ```
    1. Create NSG rule to allow network traffic within virtual network:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggVnetNSG --name oggAllowVnet --protocol '*' --direction inbound --priority 3400 --source-address-prefix 'VirtualNetwork' --source-port-range '*' --destination-address-prefix 'VirtualNetwork' --destination-port-range '*' --access allow
        ```
    1. Create NSG rule to allow RDP connection to connect the windows VM. It's used to access the windows VM remotely from your local windows machine:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggAllowRDP --protocol '*' --direction inbound --priority 3410 --source-address-prefix '*' --source-port-range '*' --destination-address-prefix '*' --destination-port-range '3389' --access allow
        ```
    1. Create NSG rule to deny all inbound connections:
        ```bash
        $ az network nsg rule create --resource-group esoggcdcrg --nsg-name oggDenyAllInBound --protocol '*' --direction inbound --priority 3500 --source-address-prefix '*' --source-port-range '*' --destination-address-prefix '*' --destination-port-range '*' --access deny
        ```
    1. Assign NSG to Subnet where we host our servers:
        ```bash
        $ az network vnet subnet update --resource-group esoggcdcrg --vnet-name oggVNet --name oggSubnet1 --network-security-group oggVnetNSG
        ```

1. Create the Oracle Virtual Machine:
    ```bash
    $ az vm create --resource-group esoggcdcrg --name oggVM --image Oracle:oracle-database:oracle_db_21:21.0.0 --size Standard_D2s_v3 --generate-ssh-keys --admin-username azureuser --vnet-name oggVnet --subnet oggSubnet1 --public-ip-address "" --nsg "" --zone 1
    ```

### Create and Configure X Server VM

To create the Oracle database, it requires to use SSH to sign-in to the virtual machine that was created in the previous step. Because the NSG rule defined before denies all inbound connections but allows connections within the virtual network and RDP 3389 port, a Windows virtual machine is created to connect to the Oracle virtual machine. This Windows virtual machine is also used to host the X server which is to receive the graphical installation interface when installing the GoldenGate core application on Oracle VM later.

1. Replace your password and run the following command to create a Windows workstation VM where we deploy X Server.
    ```bash
    $ az vm create --resource-group esoggcdcrg --name oggXServer --image MicrosoftWindowsDesktop:windows-11:win11-24h2-pro:26100.2605.241207 --size Standard_D2s_v3 --vnet-name oggVnet --subnet oggSubnet1 --public-ip-sku Standard --nsg "" --data-disk-delete-option Delete --os-disk-delete-option Delete --nic-delete-option Delete --security-type Standard --admin-username azureuser --admin-password <YOUR_OWN_PASSWORD>
    ```

1. Once it's created, go to Azure portal to download the RDP file from oggXServer resource so that you can use it to remote access this windows machine. Open the RDP file and use the password you specified when creating the windows VM (oggXServer).

   :::image type="content" source="./media/stream-oracle-data-to-eventstream/create-oggxserver.png" alt-text="Screenshot that shows how to create the windows VM." lightbox="./media/stream-oracle-data-to-eventstream/create-oggxserver.png" :::

1. Install the WSL on the windows VM (oggXServer) so that SSH can be used to connect to Oracle VM (oggVM). You can also use other SSH tools, like putty to connect as well.
    ```bash
    PS C:\Users\azureuser> wsl --install -d Ubuntu
    ```

   :::image type="content" source="./media/stream-oracle-data-to-eventstream/install-ubuntu.png" alt-text="Screenshot that shows how to install the WSL on the windows VM." lightbox="./media/stream-oracle-data-to-eventstream/install-ubuntu.png" :::

1. You need to download the private key for SSH sign in on oggXServer from the oggVM. After the key is downloaded, use this key (move this key to your WSL home .ssh directory) to sign-in:
    ```bash
    $ ssh -i ~/.ssh/id_rsa.pem azureuser@10.0.0.4
    ```

    :::image type="content" source="./media/stream-oracle-data-to-eventstream/update-ssh-key.png" alt-text="Screenshot that shows how to update ssh key." lightbox="./media/stream-oracle-data-to-eventstream/update-ssh-key.png" :::

1. Connect the Oracle VM with its private IP address with SSH.

   :::image type="content" source="./media/stream-oracle-data-to-eventstream/private-ip-address.png" alt-text="Screenshot that shows how to get private ip address." lightbox="./media/stream-oracle-data-to-eventstream/private-ip-address.png" :::

### Create the Oracle Database

Now, you should be able to sign-in to the Oracle VM on the X server windows VM (oggXServer) with SSH. Follow these steps to get the Oracle database created.

1. Use SSH to sign-in to Oracle VM (oggVM).
    ```bash
    $ chmod 400 ~/.ssh/oggVM.pem
    $ ssh -i ~/.ssh/oggVM.pem azureuser@10.0.0.4
    ```

1. Change the user to `oracle`.
    ```bash
    $ sudo su - oracle
    ```

1. Create the database using following command. This command can take 30-40 minutes to complete.
    ```bash
    $ dbca -silent -createDatabase -templateName General_Purpose.dbc -gdbname cdb1 -sid cdb1 -responseFile NO_VALUE -characterSet AL32UTF8 -sysPassword OraPasswd1 -systemPassword OraPasswd1 -createAsContainerDatabase true -numberOfPDBs 1 -pdbName pdb1 -pdbAdminPassword OraPasswd1 -databaseType MULTIPURPOSE -automaticMemoryManagement false -storageType FS -datafileDestination "/u01/app/oracle/oradata/" -ignorePreReqs
    ```

1. Set the ORACLE_SID and LD_LIBRARY_PATH variables
    ```bash
    $ export ORACLE_SID=cdb1
    $ export LD_LIBRARY_PATH=$ORACLE_HOME/lib
    ```

1. Add ORACLE_SID and LD_LIBRARY_PATH to ~/.bashrc file, so that these settings are saved for future logins. ORACLE_HOME variable should already be set in .bashrc file
    ```bash
    $ sed -i '$ a export ORACLE_SID=cdb1' .bashrc
    $ sed -i '$ a export LD_LIBRARY_PATH=$ORACLE_HOME/lib' .bashrc
    ```

1. Start Oracle listener
    ```bash
    $ lsnrctl start
    ```

By now, the Oracle database has been created. To enable the Oracle CDC for GoldenGate, the archive log needs to be enabled. Follow these steps to get it enabled.

1. Connect to sqlplus:
    ```bash
    $ sqlplus / as sysdba
    ```

1. Enable archive log with following command. Execute these commands one by one:
    ```sql
    SQL> SELECT log_mode FROM v$database;
    SQL> SHUTDOWN IMMEDIATE;
    SQL> STARTUP MOUNT;
    SQL> ALTER DATABASE ARCHIVELOG;
    SQL> ALTER DATABASE OPEN;
    ```

1. Enable force logging and GoldenGate replication, and make sure at least one log file is present. Execute these commands one by one:
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

## Install Oracle GoldenGate Core 

In this section, you learn how to download the Oracle GoldenGate Core Application and transfer to the Oracle VM (oggVM) and get it installed. All these steps are performed on the X server windows VM (oggXServer).

### Download and transfer Oracle GoldenGate Core application to VM

1. Open the X server windows VM (oggXServer) RDP and download `Oracle GoldenGate 21.3.0.0.0 for Oracle on Linux x86-64` from [Oracle Golden Gate](https://www.oracle.com/middleware/technologies/goldengate-downloads.html) on the windows VM (oggXServer).

1. Transfer the downloaded zip file to Oracle VM (oggVM) with Secure Copy Protocol (SCP) on the X server windows VM (oggXServer).
    ```bash
    $ scp -i ~/.ssh/oggVM.pem 213000_fbo_ggs_Linux_x64_Oracle_shiphome.zip azureuser@10.0.0.4:~/
    ```

1. In order to install the Oracle GoldenGate core application with GUI interface, the Xming application is needed to install on oggXServer. Download [Xming X Server for Windows](https://sourceforge.net/projects/xming/) to ggXServer and install with all default option.
    - Ensure that you didn't select Launch at the end of installation
    - Launch "XLAUNCH" application from start menu.

1. Complete the configuration by launching the **XLAUNCH** application from the Start menu. Make sure to select **No Access Control**.

### Install Oracle GoldenGate Core Application on oggVM

All the operations in this section are performed on Oracle VM (oggVM). So, Use SSH sign in to this VM and follow these steps to get it installed.

1. Connect to oggVM with SSH.
    ```bash
    $ ssh -i ~/.ssh/oggVM.pem azureuser@10.0.0.4
    ```

2. Move the uploaded zip file to oracle home dir.
    ```bash
    $ sudo su -
    $ mv /home/azureuser/213000_fbo_ggs_Linux_x64_Oracle_shiphome.zip /home/oracle/
    ```

3. Unzip the files (install unzip utility if not already installed).
    ```bash
    $ yum install unzip
    $ cd /home/oracle/
    $ unzip 213000_fbo_ggs_Linux_x64_Oracle_shiphome.zip
    ```

4. Change permission.
    ```bash
    $ chown -R oracle:oinstall fbo_ggs_Linux_x64_Oracle_shiphome/
    $ exit
    ```

5. Now, let’s start the Oracle GoldenGate Core installation. The private IP in ‘DISPLAY=10.0.0.5:0.0’ is the oggXServer’s private IP.
    ```bash
    $ sudo su - oracle
    $ export DISPLAY=10.0.0.5:0.0
    $ cd fbo_ggs_Linux_x64_Oracle_shiphome/Disk1
    $ ./runInstaller
    ```

    You should see the Xming server is opened by this installer.

6. Select **Oracle GoldenGate for Oracle Database 21c**. Then select **Next** to continue.

7. Choose the software installation path as **/u01/app/oggcore**, make sure **Start Manager** box is selected and select **Next** to continue.

8. Select **Install** in the summary step.

9. Select Close in the last step.

Now, the Oracle GoldenGate core application is successfully installed in the Oracle VM (oggVM).

## Configure Oracle database for OGG and OGG Extract to extract the CDC data

After the Oracle GoldenGate core application is installed, it can be configured to extract the Oracle CDC data. Follow these steps to get the Extract configured. All the operations in this section are still performed on Oracle VM (oggVM) with SSH connection.

### Prepare the database for extract

1. Create or update the tnsnames.ora file.
    ```bash
    $ sudo su - oracle
    $ cd $ORACLE_HOME/network/admin
    $ vi tnsnames.ora
    ```

    When vi editor opens you have to press `i` to switch to insert mode, then copy and paste file contents and press `Esc` key, `:wq` to save file.
    ```plaintext
    cdb1=
     (DESCRIPTION=
       (ADDRESS=
         (PROTOCOL=TCP)
         (HOST=localhost)
         (PORT=1521)
       )
       (CONNECT_DATA=
         (SERVER=dedicated)
         (SERVICE_NAME=cdb1)
       )
     )

    pdb1=
     (DESCRIPTION=
       (ADDRESS=
         (PROTOCOL=TCP)
         (HOST=localhost)
         (PORT=1521)
       )
       (CONNECT_DATA=
         (SERVER=dedicated)
         (SERVICE_NAME=pdb1)
       )
     )
    ```

1. Create the Golden Gate owner and user accounts.
    ```bash
    $ sqlplus / as sysdba
    ```

    ```sql
    SQL> CREATE USER C##GGADMIN identified by ggadmin;
    SQL> EXEC dbms_goldengate_auth.grant_admin_privilege('C##GGADMIN',container=>'ALL');
    SQL> GRANT DBA to C##GGADMIN container=all;
    SQL> connect C##GGADMIN/ggadmin
    SQL> ALTER SESSION SET CONTAINER=PDB1;
    SQL> EXIT;
    ```

1. Create the Golden Gate ggtest user account.
    ```bash
    $ cd /u01/app/oggcore
    $ sqlplus system/OraPasswd1@pdb1
    ```

    ```sql
    SQL> CREATE USER ggtest identified by ggtest DEFAULT TABLESPACE USERS TEMPORARY TABLESPACE TEMP;
    SQL> GRANT connect, resource, dba TO ggtest;
    SQL> ALTER USER ggtest QUOTA 100M on USERS;
    SQL> connect ggtest/ggtest@pdb1
    SQL> @demo_ora_create
    SQL> @demo_ora_insert
    SQL> select * from TCUSTMER;
    SQL> select * from TCUSTORD;
    SQL> EXIT;
    ```

You should be able to see two tables (TCUSTMER and TCUSTORD) are created and two records are inserted in each of the two tables.

### Configure and enable the extract

1. Configure the extract parameter file for Oracle GoldenGate Extract.
    ```bash
    $ sudo su – oracle
    ```

1. Ensure `$TNS_ADMIN` is set in `~/.bashrc`. If not, set it as: `export TNS_ADMIN=$ORACLE_HOME/network/admin` in `~/.bashrc`. And run command `source ~/.bashrc` to make it take effect.
    ```bash
    $ cd /u01/app/oggcore
    $ ./ggsci
    GGSCI> DBLOGIN USERID ggtest@pdb1

    Successfully logged into database  pdb1

    GGSCI> ADD SCHEMATRANDATA pdb1.ggtest

    2025-01-04 15:57:42  INFO    OGG-01788  SCHEMATRANDATA has been added on schema "ggtest".
    2025-01-04 15:57:42  INFO    OGG-01976  SCHEMATRANDATA for scheduling columns has been added on schema "ggtest".
    2025-01-04 15:57:42  INFO    OGG-10154  Schema level PREPARECSN set to mode NOWAIT on schema "ggtest".

    GGSCI> EDIT PARAMS EXT1
    ```

    ```plaintext
    EXTRACT EXT1
    USERID C##GGADMIN@cdb1, PASSWORD ggadmin
    RMTHOST 10.0.0.4, MGRPORT 7809
    RMTTRAIL ./dirdat/rt
    DDL INCLUDE MAPPED
    DDLOPTIONS REPORT
    LOGALLSUPCOLS
    UPDATERECORDFORMAT COMPACT
    TABLE pdb1.ggtest.TCUSTMER;
    TABLE pdb1.ggtest.TCUSTORD;
    ```

1. Register extract--integrated extract.
    ```bash
    GGSCI> dblogin userid C##GGADMIN@cdb1

    Successfully logged into database CDB$ROOT.

    GGSCI> REGISTER EXTRACT EXT1 DATABASE CONTAINER(pdb1)

    2025-01-04 16:04:58  INFO    OGG-02003  Extract group EXT1 successfully registered with database at SCN 2147164.

    GGSCI> exit
    ```

1. Set up extract checkpoints and start real-time extract.
    ```bash
    GGSCI> ADD EXTRACT EXT1, INTEGRATED TRANLOG, BEGIN NOW
    GGSCI> ADD RMTTRAIL ./dirdat/rt, EXTRACT EXT1, MEGABYTES 10

    RMTTRAIL added.

    GGSCI> START EXTRACT EXT1

    Sending START request to MANAGER ...
    EXTRACT EXT1 starting

    GGSCI> INFO ALL

    Program     Status      Group       Lag at Chkpt  Time Since Chkpt
    MANAGER     RUNNING
    EXTRACT     RUNNING     EXTORA      00:00:11      00:00:04

    GGSCI > EXIT
    ```

1. Smoke test for the configured extract.
    1. Sign in DB with test account and insert a record to the table:
        ```bash
        $ sqlplus ggtest
        ```

        ```sql
        SQL> select * from TCUSTORD;
        SQL> INSERT INTO TCUSTORD VALUES ('OLLJ',TO_DATE('11-JAN-25'),'CYCLE',400,16000,1,102);
        SQL> COMMIT;
        SQL> EXIT;
        ```

    1. Check the transaction picked up by Golden Gate (Note Total inserts value):
        ```bash
        $ cd /u01/app/oggcore
        $ ./ggsci
        GGSCI> STATS EXT1

        Sending STATS request to Extract group EXT1 ...
        Start of statistics at 2025-01-04 16:12:16.
        DDL replication statistics (for all trails):
                
        *** Total statistics since extract started     ***
            Operations                                         0.00
            Mapped operations                                  0.00
            Unmapped operations                                0.00
            Other operations                                   0.00
            Excluded operations                                0.00

        Output to ./dirdat/rt:
        Extracting from PDB1.GGTEST.TCUSTORD to PDB1.GGTEST.TCUSTORD:
        *** Total statistics since 2025-01-04 16:11:02 ***
            Total inserts                              1.00
            Total updates                              0.00
            Total deletes                              0.00
            Total upserts                              0.00
            Total discards                             0.00
            Total operations                           1.00

        *** Daily statistics since 2025-01-04 16:11:02 ***
            Total inserts                              1.00
            Total updates                              0.00
            Total deletes                              0.00
            Total upserts                              0.00
            Total discards                             0.00
            Total operations                           1.00

        *** Hourly statistics since 2025-01-04 16:11:02 ***
            Total inserts                              1.00
            Total updates                              0.00
            Total deletes                              0.00
            Total upserts                              0.00
            Total discards                             0.00
            Total operations                           1.00

        *** Latest statistics since 2025-01-04 16:11:02 ***
            Total inserts                              1.00
            Total updates                              0.00
            Total deletes                              0.00
            Total upserts                              0.00
            Total discards                             0.00
            Total operations                           1.00
        End of statistics.
        ```

## Install Oracle GoldenGate Big Data

The Oracle GoldenGate Big Data replicates the extracted data to the desired handler (destination). In this tutorial, the handler is Kafka topic. In this section, you're guided to download the software packages needed and get them installed.

### Download the required software packages

The Windows VM (oggXServer) is still used to download these software packages and transfer them to Oracle VM (oggVM).

1. Download OGG for big data (Oracle GoldenGate for Big Data 21.4.0.0.0 on Linux x86-64) from [Oracle GoldenGate Downloads](https://www.oracle.com/middleware/technologies/goldengate-downloads.html). 

1. Download [Kafka package(kafka_2.13-3.9.0.tgz)](https://dlcdn.apache.org/kafka/3.9.0/kafka_2.13-3.9.0.tgz).

1. Download [JAVA SDK(jdk-8u202-linux-x64.tar.gz](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html).

1. Use the SCP command in WSL to transfer them to Oracle VM:
    ```bash
    $ scp -i ~/.ssh/oggVM.pem kafka_2.13-3.9.0.tgz jdk-8u202-linux-x64.tar.gz 214000_ggs_Linux_x64_BigData_64bit.zip azureuser@10.0.0.4:~/
    ```

### Install the three software packages

To install the three software packages, get them extracted to the individual folders and get the corresponding environment variables configured. All the operations in this section are performed on Oracle VM (oggVM). So, use SSH sign in to this VM and follow these steps to get them installed.

1. Connect to oggVM with SSH.
    ```bash
    $ ssh -i ~/.ssh/oggVM.pem azureuser@10.0.0.4
    ```

2. Move these packages to oracle home dir.
    ```bash
    $ sudo su –
    $ mv /home/azureuser/214000_ggs_Linux_x64_BigData_64bit.zip /home/azureuser/kafka_2.13-3.9.0.tgz /home/azureuser/jdk-8u202-linux-x64.tar.gz /home/oracle/
    $ exit
    ```

3. Change to oracle user and go the home directory to prepare the individual folders.
    ```bash
    $ sudo su – oracle
    $ mkdir kafka java oggbd
    $ mv 214000_ggs_Linux_x64_BigData_64bit.zip oggbd/
    $ mv jdk-8u202-linux-x64.tar.gz java/
    $ mv kafka_2.13-3.9.0.tgz kafka
    ```

4. Go to each individual folder and get the package extracted.
    ```bash
    $ cd java
    $ tar -xvf jdk-8u202-linux-x64.tar.gz
    $ cd ../kafka
    $ tar -xvf kafka_2.13-3.9.0.tgz
    $ cd ../oggbd
    $ mkdir /u01/app/oggbd
    $ tar -xvf ggs_Linux_x64_BigData_64bit.tar -C /u01/app/oggbd
    ```

5. Configure the environment variables for JAVA.
    ```bash
    $ export JAVA_HOME=/home/oracle/java/jdk1.8.0_202
    $ export LD_LIBRARY_PATH=$ORACLE_HOME/lib:$JAVA_HOME/lib:/$JAVA_HOME/jre/lib/amd64/server
    ```
## Configure Oracle GoldenGate Big Data to replicate the CDC data to Eventstream’s Kafka endpoint

In this section, you're guided to configure the Oracle GoldenGate Big Data to replicate the CDC data extracted in previous section to the Eventstream’s Kafka endpoint. 

### Prepare the Eventstream Kafka endpoint

Following the normal creation procedures of Eventstream and its custom endpoint source creation to obtain the Kafka endpoint information for later use, see [Add a custom endpoint or custom app source to an eventstream](./add-source-custom-app.md?pivots=enhanced-capabilities).

:::image type="content" source="./media/stream-oracle-data-to-eventstream/create-custom-endpoint-source.png" alt-text="Screenshot that shows custom endpoint source was created successfully." lightbox="./media/stream-oracle-data-to-eventstream/create-custom-endpoint-source.png" :::

### Configure the replicate for Oracle GoldenGate Big Data

All the operations in this section are performed on Oracle VM (oggVM). So, use SSH sign in to this VM and follow these steps to get it configured.

1. Connect to oggVM with SSH if you lost the connection after previous section.
    ```bash
    $ ssh -i ~/.ssh/oggVM.pem azureuser@10.0.0.4
    $ sudo su - oracle
    ```

2. Go to the folder where the Oracle GoldenGate Big Data package was extracted to and get the required folders created.
    ```bash
    $ cd /u01/app/oggbd
    $ ./ggsci
    GGSCI> CREATE SUBDIRS
    GGSCI> EDIT PARAMS MGR
    ```

    ```plaintex
    PORT 7801
    ```

    ```bash
    GGSCI> START MGR
    GGSCI> INFO ALL

    Program     Status      Group       Lag at Chkpt  Time Since Chkpt
    MANAGER     RUNNING

    GGSCI> EXIT
    ```

3. Copy the Kafka handler template configuration files.
    ```bash
    $ cp AdapterExamples/big-data/kafka/* dirprm/
    ```

4. Open the rkafka.prm file and change the MAP/TARGET schema name according to the schema name at the source database.
    ```bash
    $ vim dirprm/rkafka.prm
    ```

    ```plaintext
    REPLICAT rkafka
    TARGETDB LIBFILE libggjava.so SET property=dirprm/kafka.props
    REPORTCOUNT EVERY 1 MINUTES, RATE
    GROUPTRANSOPS 10000
    MAP pdb1.ggtest.*, TARGET pdb1.ggtest.*;
    ```

5. Add the replicate using the following command within ./ggsci command. Be sure the replicate should be the one defined in extract step: 
    ```bash
    $ ./ggsci
    GGSCI> ADD REPLICAT rkafka, exttrail /u01/app/oggcore/dirdat/rt
    GGSCI> EXIT
    ```

6. Open the Kafka props file and change the gg.classpath to the correct kafka installation directory path under #Sample gg.classpath for Apache Kafka. And also fill in the Kafka topic name which is from Eventstream custom endpoint source.
    ```bash
    $ vim dirprm/kafka.props
    ```

    ```plaintext
    gg.handlerlist=kafkahandler
    gg.handler.kafkahandler.type=kafka
    gg.handler.kafkahandler.kafkaProducerConfigFile=custom_kafka_producer.properties
    #The following resolves the topic name using the fixed topic which is from eventstream
    gg.handler.kafkahandler.topicMappingTemplate={YOUR.TOPIC.NAME}
    #The following selects the message key using the concatenated primary keys
    #A null Kafka message key distributes to the partitions on a round-robin basis
    gg.handler.kafkahandler.keyMappingTemplate=${null}
    #gg.handler.kafkahandler.schemaTopicName=mySchemaTopic
    gg.handler.kafkahandler.blockingSend=false
    gg.handler.kafkahandler.includeTokens=false
    gg.handler.kafkahandler.mode=op
    #gg.handler.kafkahandler.metaHeadersTemplate=${alltokens}
    gg.handler.kafkahandler.transactionsEnabled=false
    gg.handler.kafkahandler.format=json
    gg.handler.kafkahandler.format.metaColumnsTemplate=${objectname[table]},${optype[op_type]},${timestamp[op_ts]},${currenttimestamp[current_ts]},${position[pos]}
    #Sample gg.classpath for Apache Kafka
    gg.classpath=dirprm/:/var/lib/kafka/libs/*:/home/oracle/kafka/kafka_2.13-3.9.0/libs/*
    #Sample gg.classpath for HDP
    #gg.classpath=/etc/kafka/conf:/usr/hdp/current/kafka-broker/libs/*
    ```
    - You can find {YOUR.TOPIC.NAME} value on the **SAS Key Authentication** page under the **Kafka tab**: 
  
    :::image type="content" source="./media/stream-oracle-data-to-eventstream/topic-name.png" alt-text="Screenshot that shows how to get topic name." lightbox="./media/stream-oracle-data-to-eventstream/topic-name.png" :::

7. Make changes to custom_producer.properties file by adding your Eventstream connect string and password needed to connect to Eventstream.
    ```bash
    $ vim dirprm/custom_kafka_producer.properties
    ```

    ```plaintext
    bootstrap.servers={YOUR.BOOTSTRAP.SERVER}
    security.protocol=SASL_SSL
    sasl.mechanism=PLAIN
    sasl.jaas.config={YOUR.SASL.JASS.CONFIG};

    acks=1
    reconnect.backoff.ms=1000

    value.serializer=org.apache.kafka.common.serialization.ByteArraySerializer
    key.serializer=org.apache.kafka.common.serialization.ByteArraySerializer
    # 100KB per partition
    batch.size=16384
    linger.ms=0
    ```

    - Replace {YOUR.BOOTSTRAP.SERVER} with the **Bootstrap server** value, witch you can copy from your eventstream.
    - Replace {YOUR.SASL.JASS.CONFIG} with the **SASL JASS config** value, which you can copy from your eventstream.

    :::image type="content" source="./media/stream-oracle-data-to-eventstream/server-key.png" alt-text="Screenshot that shows how to get bootstrap and connection key." lightbox="./media/stream-oracle-data-to-eventstream/server-key.png" :::

8. Sign in into your GoldenGate instance and start the replicate process.
    ```bash
    $ ./ggsci
    GGSCI> START RKAFKA

    Sending START request to Manager ...
    Replicat group RKAFKA starting.
    ```

    ```bash
    GGSCI> INFO ALL
    Program     Status      Group       Lag at Chkpt  Time Since Chkpt
 
    MANAGER     RUNNING
    REPLICAT    RUNNING     RKAFKA      00:00:00      00:53:17

    GGSCI> EXIT
    ```

## Validate the whole E2E flow from Oracle to Eventstream

To validate the whole E2E flow, let’s sign in to the Oracle database with **ggtest** account to insert a few records and then go to Eventstream to check if the change data flows in.

1. Sign-in Oracle DB with test account to insert a few new records:
    ```bash
    $ sqlplus ggtest
    ```

    ```sql
    SQL> select * from TCUSTORD;
    SQL> INSERT INTO TCUSTORD VALUES ('MSFT',TO_DATE('3-JAN-25'),'M365',100,80000,2,104);
    SQL> INSERT INTO TCUSTMER VALUES ('TOM','SUNRISE SOFTWARE INC.','SAN FRANCISCO','CA');
    SQL> COMMIT;
    SQL> EXIT;
    ```

1. Preview the data that you sent with this Kafka endpoint source. Select the default stream node, which is the middle node that shows your eventstream name.

    :::image type="content" source="./media/stream-oracle-data-to-eventstream/preview-data.png" alt-text="Screenshot that shows how to preview data in eventstream." lightbox="./media/stream-oracle-data-to-eventstream/preview-data.png" :::
