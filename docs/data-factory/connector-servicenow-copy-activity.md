---
title: Configure ServiceNow in a copy activity
description: This article explains how to copy data using ServiceNow.
ms.reviewer: jianleishen
ms.topic: how-to
ms.date: 11/19/2024
ms.custom: 
  - pipelines
  - template-how-to
  - connectors
---

# Configure ServiceNow in a copy activity

This article outlines how to use the copy activity in a pipeline to copy data from ServiceNow.

## Supported configuration

For the configuration of each tab under copy activity, go to the following sections respectively.

- [General](#general)  
- [Source](#source)
- [Mapping](#mapping)
- [Settings](#settings)

> [!NOTE]
> Please use the actual value instead of the displayed value in ServiceNow.

### General

Refer to the [**General** settings](activity-overview.md#general-settings) guidance to configure the **General** settings tab.

### Source

The following properties are supported for ServiceNow under the **Source** tab of a copy activity.

:::image type="content" source="./media/connector-servicenow/servicenow-source.png" alt-text="Screenshot showing source tab.":::

The following properties are **required**:

- **Connection**: Select a ServiceNow connection from the connection list. If no connection exists, then create a new ServiceNow connection.
- **Table**: Select a table from the drop-down list or type the table name.

Under **Advanced**, you can specify the following fields:

- **Query builder**: You can configure the expression here to read data. It has the same usage as the condition builder in ServiceNow. For instructions on how to use it, see this [article](https://www.servicenow.com/docs/bundle/vancouver-platform-user-interface/page/use/common-ui-elements/concept/c_ConditionBuilder.html).

    You can also use the expression parameter by selecting **Add dynamic content**. The parameter type should be **Object**, and the value should follow the format shown in the example JSON below:
    
    ```json
     {
    	"type": "Nary",
    	"operators": [
    		"="
    	],
    	"operands": [
    		{
    			"type": "Field",
    			"value": "col"
    		},
    		{
    			"type": "Constant",
    			"value": "val"
    		}
    	]
    }
    ```
    
    The table below outlines the properties used in the expression parameter value.

    | Property | Description | Required |
    |:--- |:--- |:--- |
    | type | The expression type. Values can be Constant (default), Unary, Binary, Field and Nary.  | No  |
    | value | The constant value. |Yes when the expression type is Constant or Field |
    | operators | The operator value. For more information about operators, see *Operators available for choice fields containing strings* section in this [article](https://docs.servicenow.com/bundle/vancouver-platform-user-interface/page/use/common-ui-elements/reference/r_OpAvailableFiltersQueries.html).| Yes when the expression type is Unary or Binary |
    | operands | List of expressions on which operator is applied.| Yes when the expression type is Unary or Binary |


- **Additional columns**: Add additional data columns to store source files' relative path or static value. Expression is supported for the latter.

### Mapping

For **Mapping** tab configuration, see [Configure your mappings under mapping tab](copy-data-activity.md#configure-your-mappings-under-mapping-tab). 

### Settings

For **Settings** tab configuration, go to [Configure your other settings under settings tab](copy-data-activity.md#configure-your-other-settings-under-settings-tab).

## Table summary

The following tables contain more information about the copy activity in ServiceNow.

### Source information

|Name |Description |Value|Required |JSON script property |
|:---|:---|:---|:---|:---|
|**Connection** |Your connection to the source data store.|\< your ServiceNow connection > |Yes|connection|
|**Table** | Name of the table to read data.|< table name >|Yes |tableName|
| **Query builder** | Configure the expression to read data. It has the same usage as the condition builder in ServiceNow. For instructions on how to use it, see this [article](https://docs.servicenow.com/bundle/vancouver-platform-user-interface/page/use/common-ui-elements/concept/c_ConditionBuilder.html). |< your expression >|No |expression  |
| **Additional columns** | Add additional data columns to store source files' relative path or static value. Expression is supported for the latter. | • Name<br>• Value | No | additionalColumns:<br>• name<br>• value |


## Related content

- [ServiceNow overview](connector-servicenow-overview.md)
