---
title: Use public parameters in Dataflow Gen2 (Preview)
description: Dataflow Gen2 within Fabric offers the capability to define parameters that can be accessible and override during execution through. The article covers how to apply this new mode, its prerequisites, and limitations.
author: ptyx507x
ms.author: miescobar
ms.reviewer: whhender
ms.topic: conceptual
ms.date: 09/15/2025
ms.custom: dataflows
---

# Use public parameters in Dataflow Gen2

Parameters in Dataflow Gen2 allow you to dynamically control and customize dataflows, making them more flexible and reusable by enabling different inputs and scenarios without modifying the dataflow itself. It helps keep things organized by reducing the need for multiple dataflows and centralizing control within a single, parameterized dataflow.

**Public parameters** in Dataflow Gen2 is a new mode where you can allow your Dataflow to be run by passing parameter values outside of the Power Query editor through the Fabric REST API or through native Fabric experiences. It allows you to have a more dynamic experience with your Dataflow where each run can be invoked with different parameters that affect how your Dataflow runs.

## Prerequisites

* **A Dataflow Gen2 with CI/CD support**
* **Parameters must be set within your Dataflow.** [Learn more on how to set query parameters in Dataflow](/power-query/power-query-query-parameters).

## Enable the public parameter mode

As the owner of the dataflow, open the Dataflow. Inside the Home tab of the ribbon, select the **Options** button.

![Screenshot of the Options button found within the Home tab of the ribbon for the Power Query Editor.](media/dataflow-parameters/options-button.png)

Selecting the button opens a new **Options** dialog. In the vertical menu, select the option with the label *Parameters* inside of the *dataflow* group. Within the Parameters section you can enable the option that reads ***"Enable parameters to be discovered and override for execution"*** to enable the public parameters mode.

![Screenshot of the Options dialog to enabling the public parameters mode.](media/dataflow-parameters/enable-public-parameters-mode.png)

Select the **OK** button to commit these changes.

When this mode is enabled, you get a notification in the **Manage parameters** dialog that reads "Public parameter mode is enabled" at the top of the dialog.

![Screenshot of the manage parameters dialog showing the notification that the public parameter mode is enabled.](media/dataflow-parameters/manage-parameters-dialog.png)

Once the public parameter mode has been enabled, you can save your dataflow.

![Screenshot of the options to save a dataflow within the home tab of the ribbon.](media/dataflow-parameters/save-dataflow.png)

## Pass custom parameter values for Dataflow runs

The public parameter mode follows the definition of the parameters inside the dataflow where there's a distinction between required and nonrequired parameters.

* **Required parameters**: if a parameter is set as required, in order to run the dataflow a value needs to be passed to the run job. The run fails if no value is passed for a parameter that is set to required.
* **Non-required parameters**: these are also called ***optional*** parameters and no value is required to be passed for a run to be triggered. If no value is passed, the **Current value** defined within your parameter is used for run.

### Use the Dataflow activity within Data Pipelines

>[!NOTE]
>We recommend reading more about the [dataflow activity from Fabric data pipelines](dataflow-activity.md) to understand all its capabilities. 

When you create a pipeline in Fabric, you can use the dataflow activity to trigger the run of a Dataflow Gen2 with CI/CD support that has the public parameters mode enabled. 

You can select the dataflow that you want to use and set the parameters that you want to use in the **Dataflow parameters** section.

![Screenshot of the dataflow activity within Fabric Data pipelines that allows to pass parameters for Dataflow run.](media/dataflow-parameters/dataflow-activity-pipeline-parameters.png)

In the **Dataflow parameters** section, you're able to see all parameters available in your Dataflow and the default value from each inside the value section.

Required parameters have an asterisk next to their name, while optional parameters don't. At the same time, optional parameters can be removed from the grid, whereas required parameters can't be deleted and a value must be passed for the dataflow to run.

You can select the refresh button to request the latest parameter information from your dataflow.

## Supported parameter types

>[!TIP]
>Read and use the [discover Dataflow parameter REST API](rest/api/fabric/dataflow/items/discover-dataflow-parameters). The documentation provides all available parameter types and their expected values, and the REST API provides a way to get the parameter information from your dataflow.

The following table showcases the currently supported parameter types and the link to the REST API definition for it to understand what are the values expected by the REST API. 

|Dataflow parameter type| REST API definition|
|----|---|
|Text|[DataflowStringParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowStringParameter)|
|Integer (int64)|[DataflowIntegerParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowIntegerParameter)|
|Decimal number|[DataflowNumberParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowNumberParameter)|
|Date|[DataflowDateParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowDateParameter)|
|DateTime|[DataflowDateTimeParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowDateTimeParameter)|
|Time|[DataflowTimeParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowTimeParameter)|
|DateTimeZone|[DataflowDateTimeZoneParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowDateTimeZoneParameter)|
|Duration|[DataflowDurationParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#DataflowDurationParameter)|
|True/False|[DataflowBooleanParameter](/rest/api/fabric/dataflow/items/discover-dataflow-parameters#dataflowbooleanparameter)|

 
## Considerations and limitations

* **Dataflows with the public parameters mode enabled cannot be scheduled for run through the Fabric scheduler.** The only exception is a dataflow with no required parameters set.
* **Dataflows with the public parameters mode enabled cannot be manually triggered through the Fabric Workspace list or lineage view.** The only exception is a dataflow with no required parameters set.
* **Parameters that affect the resource path of a data source or a destination are not supported.** Connections are linked to the exact data source path defined in the authored dataflow and can't be currently override to use other connections or resource paths.
* **Dataflows with incremental refresh can't leverage this new mode.**
* **The public parameters mode allows users to modify the logic defined within the Dataflow by overriding the parameter values.** It  would allow others who have permissions to the dataflow to run the data with other values, resulting in different outputs from the data sources used in the dataflow.
* **Monitoring hub does not display information about the parameters passed during the invocation of the dataflow.**
* **Staged queries will only keep the last data run of a Dataflow stored in the Staging Lakehouse.** Users are able to look at the data from the Staging Lakehouse using the Dataflows connector to determine what was data is stored. Defining data destinations when using the public parameters mode is highly encouraged.
* **When submitting a duplicated request for the same parameter values, only the first request will be accepted and subsequent will be rejected until the first request finishes its evaluation.**
* **In the context of data destinations, parameters cannot be used to change the mapping schema.** The Dataflow run applies all mappings and data destination settings that are saved by the Dataflow during the authoring stage. Check out the article for more information on [data destinations and managed settings in Dataflow Gen2](dataflow-gen2-data-destinations-and-managed-settings.md).
