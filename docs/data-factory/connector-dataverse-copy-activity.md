---
title: Configure Dataverse in a copy activity
description: This article explains how to copy data using Dataverse.
author: jianleishen
ms.author: jianleishen
ms.topic: how-to
ms.date: 11/15/2023
ms.custom:
  - template-how-to
  - build-2023
  - ignite-2023
---

# Configure Dataverse in a copy activity

This article outlines how to use the copy activity in a data pipeline to copy data from and to Dataverse.

## Prerequisites

To use this connector with Microsoft Entra service principal authentication, you must set up server-to-server (S2S) authentication in Dataverse. First register the application user (Service Principal) in Microsoft Entra. For more information, see [Create a Microsoft Entra application and service principal that can access resources](/entra/identity-platform/howto-create-service-principal-portal). 

During application registration you will need to create that user in Dataverse and grant permissions. Those permissions can either be granted directly or indirectly by adding the application user to a team which has been granted permissions in Dataverse. For more information on how to set up an application user to authenticate with Dataverse, see [Use single-tenant server-to-server authentication](/powerapps/developer/data-platform/use-single-tenant-server-server-authentication).

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Destination](#destination)
- [Mapping](#mapping)
- [Settings](#settings)

### General

For **General** tab configuration, go to [General settings](activity-overview.md#general-settings).

### Source

Go to **Source** tab to configure your copy activity source. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-dataverse/source.png" alt-text="Screenshot showing source tab and the list of properties." :::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an existing Dataverse connection from the connection list. If no connection exists, then create a new Dataverse connection by selecting **New**.
- **Connection type**: Select **Dataverse**.
- **Use query**: Specify the way used to read data. You can choose **Entity name** to read data using entity name or **Query** to use query to read data.
  - **Entity name**: Select your entity name from the drop-down list, or select **Edit** to enter it manually. It is the logical name of the entity to retrieve.
  - **Query**: Using FetchXML to read data from Dataverse. FetchXML is a proprietary query language that is used in Dynamics online and on-premises. See the following example. To learn more, see [Build queries with FetchXML](/previous-versions/dynamicscrm-2016/developers-guide/gg328332(v=crm.8)).

    **Sample FetchXML query**:

    ```XML
    <fetch>
      <entity name="account">
        <attribute name="accountid" />
        <attribute name="name" />
        <attribute name="marketingonly" />
        <attribute name="modifiedon" />
        <order attribute="modifiedon" descending="false" />
        <filter type="and">
          <condition attribute ="modifiedon" operator="between">
            <value>2017-03-10 18:40:00z</value>
            <value>2017-03-12 20:40:00z</value>
          </condition>
        </filter>
      </entity>
    </fetch>
    ```


Under **Advanced**, you can specify the following fields:

- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy).

### Destination

Go to **Destination** tab to configure your copy activity destination. See the following content for the detailed configuration.

:::image type="content" source="./media/connector-dataverse/destination.png" alt-text="Screenshot showing destination tab and the list of properties." :::

The following properties are **required**:

- **Data store type**: Select **External**.
- **Connection**: Select an existing Dataverse connection from the connection list. If no connection exists, then create a new Dataverse connection by selecting **New**.
- **Connection type**: Select **Dataverse**.
- **Entity name**: Specify the name of the entity to write data. Select your entity name from the drop-down list, or select **Edit** to enter it manually. This is the logical name of the entity to retrieve.

Under **Advanced**, you can specify the following fields:

- **Write behavior**: The write behavior of the operation. This property is required, and you must select **Upsert**. If you use **Add dynamic content**, specify the value to Upsert.
- **Alternate key name**: Specify the alternate key name defined on your entity to upsert records. 
- **Ignore null values**: Indicates whether to ignore null values from input data during write operation. It is selected by default. 
    - When it is selected: Leave the data in the destination object unchanged when doing upsert/update operation, and insert defined default value when doing insert operation. 
    - When it is unselected: Update the data in the destination object to NULL when doing upsert/update operation, and insert NULL value when doing insert operation.
- **Write batch size**: Specify the row count of data written to Dataverse in each batch. 
- **Max concurrent connections**: The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.

### Mapping

For **Mapping** tab configuration, go to [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). If you choose Binary as your file format, mapping will not be supported.

### Settings

For the **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

See the following table for the summary and more information for the Dataverse copy activity.

### Source information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|External|Yes|/|
|**Connection**|Your connection to the source Dataverse.| < your connection >|Yes|connection|
|**Connection type**|Your connection type. |**Dataverse**|Yes|type (under `typeProperties` -> `source` -> `datasetSettings`):<br>CommonDataServiceForAppsEntity|
|**Use query**|The way to read data from Dataverse|* Tables<br>* Query|Yes|/|
|**Entity name**|The logical name of the entity to retrieve.|< your entity name >|Yes|entityName|
|**Query**| Use FetchXML to read data from Dataverse. FetchXML is a proprietary query language that is used in Dynamics online and on-premises. To learn more, see [Build queries with FetchXML](/previous-versions/dynamicscrm-2016/developers-guide/gg328332(v=crm.8)).|< your query > |Yes|query|
|**Additional columns**|Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. For more information, go to [Add additional columns during copy](/azure/data-factory/copy-activity-overview#add-additional-columns-during-copy). |* Name<br>* Value|No|additionalColumns:<br>* name<br>* value|

### Destination information

|Name|Description|Value|Required|JSON script property|
|:---|:---|:---|:---|:---|
|**Data store type**|Your data store type.|External|Yes|/|
|**Connection**|Your connection to the destination Dataverse.|< your connection >|Yes|connection|
|**Connection type**|Your connection type. |**Dataverse**|Yes|type (under `typeProperties` -> `sink` -> `datasetSettings`):<br>CommonDataServiceForAppsEntity|
|**Entity name**|The logical name of the entity to retrieve.|< your entity >|Yes|entityName|
|**Write behavior**|The write behavior of the operation. The value must be **Upsert**.| Upsert|Yes|writeBehavior: upsert|
|**Alternate key name**|The alternate key name defined on your entity to upsert records.|< alternate key name >|No|alternateKeyName|
|**Ignore null values**|Indicates whether to ignore null values from input data during write operation. <br> - Selected (true): Leave the data in the destination object unchanged when doing upsert/update operation, and insert defined default value when doing insert operation.<br> - Unselected (false): Update the data in the destination object to NULL when doing upsert/update operation, and insert NULL value when doing insert operation.|selected or unselected (default)|No|ignoreNullValues:<br>true or false (default)|
|**Write batch size**|The row count of data written to Dataverse in each batch.|< your write batch size > <br>The default value is 10|No|writeBatchSize|
|**Max concurrent connections**|The upper limit of concurrent connections established to the data store during the activity run. Specify a value only when you want to limit concurrent connections.|< max concurrent connections >|No|maxConcurrentConnections|

## Related content

- [Dataverse connector overview](connector-dataverse-overview.md)
