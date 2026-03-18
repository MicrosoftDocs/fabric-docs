---
title: Variable references in Dataflow
description: --
ms.reviewer: miescobar
ms.topic: tutorial
ms.date: 10/2/2025
ms.custom: dataflows
---

# Variable references in a Dataflow

>[!NOTE]
>This article focuses on a solution architecture from [CI/CD and ALM (Application Lifecycle Management) solution architectures for Dataflow Gen2](dataflow-gen2-cicd-alm-solution-architecture.md) that relies on the [variable libraries integration](dataflow-gen2-variable-library-integration.md) and is only applicable to Dataflow Gen2 with CI/CD support.

Fabric variable libraries in Dataflow Gen2 enable centralized, reusable configuration management across environments. By referencing variables directly in your dataflow scripts, you can dynamically adjust behavior without hardcoding values, which is ideal for CI/CD workflows. This integration simplifies deployment across stages by allowing workspace-specific values (like Lakehouse or Workspace IDs) to be injected at runtime, making your dataflows more adaptable and maintainable.

This tutorial walks you through an example solution that uses variable references in a Dataflow and shows you how to:
* **Set variables**: Using the Fabric variable libraries and their distinct data types
* **Variable-driven source**: Using a Lakehouse with the WideWorldImpoters sample dataset as the source
* **Variable-driven logic**: Using the input widgets available throughout the Dataflow experience
* **Variable-driven destination**: Using a Warehouse as a destination 

:::image type="content" source="media/dataflow-gen2-variable-references/diagram-dataflow-gen2-variable-references.png" alt-text="Diagram of a solution architecture that uses variable references in Dataflow Gen2." lightbox="media/dataflow-gen2-variable-references/diagram-dataflow-gen2-variable-references.png":::

>[!NOTE]
> The concepts showcased in this article are universal to Dataflow Gen2 and are applicable to other sources and destinations beyond the ones shown here.

## The scenario

:::image type="content" source="media/dataflow-gen2-parameterized-dataflow/query-scenario-diagram.png" alt-text="Screenshot of the query with the name dimension_city for the scenario inside of Dataflow Gen2." lightbox="media/dataflow-gen2-parameterized-dataflow/query-scenario-diagram.png":::

The dataflow used in this scenario is simple, but the core principles described apply to all types of dataflows. It connects to the table named dimension_city from the Wide World Importers sample dataset stored in a Lakehouse. It filters rows where the SalesTerritory column equals Southeast, and loads the result into a new table called City in a Warehouse. All components—the Lakehouse, Warehouse, and Dataflow—are located in the same Workspace. To make the dataflow dynamic, you use variables to drive the source table, the filter value, and the destination table. These changes allow the dataflow to run with values stored in Fabric variable libraries instead of hardcoded ones. 

## Set variables

>[!NOTE]
> Make sure to have Fabric variable libraries enabled for your organization or security group. Learn more on [how to get started with variable libraries](/fabric/cicd/variable-library/get-started-variable-libraries).

As a best practice, it's always recommended to have a design in mind before creating a solution and what components from your Dataflow are dynamically sourced from a variable library. While you can create multiple libraries within a workspace, this example uses a single library named **My Library** that holds the variables that the Dataflow Gen2 uses:

|Variable name|Type|Purpose|
|----|---|---|
|**WorkspaceId**|Guid|Used for the data source and destination scripts in the Dataflow|
|**LakehouseId**|Guid|Determines the ID of the Lakehouse being used as the source|
|**WarehouseId**|Guid| Determines the ID of the Warehouse being used as the destination|
|**Territory**|String|Sets what value should be used to drive the filter logic in the Dataflow|

Make sure to set the default values that correspond to your own environment and then save the variable library.

![Screenshot of the newly created Fabric variable libraries with variables WorkspaceId, LakehouseId, WarehouseId and Territory.](media/dataflow-gen2-variable-references/variable-library.png)

## Variable-driven source

When using any of the Fabric connectors—such as Lakehouse, Warehouse, or Fabric SQL—they all follow the same navigation structure and use the same input format. In this scenario, none of the connectors require manual input to establish a connection. However, each one shows which workspace and item it connects to through the navigation steps in your query.
For example, the first navigation step includes the workspaceId that the query connects to.

:::image type="content" source="media/dataflow-gen2-parameterized-dataflow/navigation-workspaceid-reference.png" alt-text="Screenshot of the Navigation 1 step with the workspaceId value in the formula bar for the dimension_city query." lightbox="media/dataflow-gen2-parameterized-dataflow/navigation-workspaceid-reference.png":::

The goal is to replace the hardcoded values in the formula bar with variables. Specifically, you want to use the variables **WorkspaceId** and **LakehouseId** to drive this logic.
First, you need to bring those variables into the Dataflow Gen2. A recommended approach is to create queries for each distinct variable to centralize and easily manage any variables that you plan to use. To do that, create a blank query by going into the *Get data* entry in the ribbon and selecting the Blank query option from the dropdown menu. 

![Screenshot of the entry in the Get data in the Home tab to create a blank query.](media/dataflow-gen2-variable-references/create-blank-query.png)

Selecting this option brings a new dialog where you can see the blank query that is created. You can select OK to bring this new blank query.

![Screenshot of the blank query dialog.](media/dataflow-gen2-variable-references/blank-query-dialog.png)

Once your query has been created and appears in the dataflow, rename it to WorkspaceId and replace the formula in the Source step to be:

```M code 
Variable.ValueOrDefault("$(/**/My Library/WorkspaceId)", "Your Workspace ID")
```
This script is fundamentally the one that's able to determine what library and variable to fetch. The second argument of the ```Variable.ValueOrDefault``` function determines what value to provide when a variable can't be fetched.

>[!NOTE]
>Make sure to replace the string of **"Your Workspace ID"**, the second argument of the function, with your own corresponding value in your environment and save the query.

Repeat this process for the **LakehouseId** variable and create a query with the same name as the variable but use the following formula for the Source step:

```M code 
Variable.ValueOrDefault("$(/**/My Library/LakehouseId)", "Your Lakehouse ID")
```

>[!NOTE]
>Make sure to replace the string of **"Your Lakehouse ID"**, the second argument of the function, with your own corresponding value in your environment and save the query.

![Screenshot showing a newly created queries named LakehouseId and WorkspaceId.](media/dataflow-gen2-variable-references/lakehouseid-variable-query.png)

Once both queries are created, you can update the query script to use them instead of hardcoded values. This involves manually replacing the original values in the formula bar with references to the WorkspaceId and LakehouseId queries.
The original query script looks like this:

```M code 
let
  Source = Lakehouse.Contents([]),
  #"Navigation 1" = Source{[workspaceId = "8b325b2b-ad69-4103-93ae-d6880d9f87c6"]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseId = "2455f240-7345-4c8b-8524-c1abbf107d07"]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "dimension_city", ItemKind = "Table"]}[Data],
  #"Filtered rows" = Table.SelectRows(#"Navigation 3", each ([SalesTerritory] = "Southeast")),
  #"Removed columns" = Table.RemoveColumns(#"Filtered rows", {"ValidFrom", "ValidTo", "LineageKey"})
in
  #"Removed columns"
```
Once you update the references in the navigation steps, your new updated script might look like this:

```M code 
let
  Source = Lakehouse.Contents([]),
  #"Navigation 1" = Source{[workspaceId = WorkspaceId]}[Data],
  #"Navigation 2" = #"Navigation 1"{[lakehouseId = LakehouseId]}[Data],
  #"Navigation 3" = #"Navigation 2"{[Id = "dimension_city", ItemKind = "Table"]}[Data],
  #"Filtered rows" = Table.SelectRows(#"Navigation 3", each ([SalesTerritory] = "Southeast")),
  #"Removed columns" = Table.RemoveColumns(#"Filtered rows", {"ValidFrom", "ValidTo", "LineageKey"})
in
  #"Removed columns"
```

And you notice that it still correctly evaluates the data preview in the Dataflow editor with the direct references created in the diagram view between all the queries involved:

![Screenshot with WorkspaceId and LakehouseId queries being referenced in the dimension_city query.](media/dataflow-gen2-variable-references/workspaceid-lakehouseid-variable-references-query.png)

## Variable-driven logic

Now that the source is using variables, you can focus on modifying the transformation logic of the dataflow. In this scenario, the filter step is where the logic is applied, and the value being filtered, currently hardcoded as *Southeast*, should be replaced with a query that references a variable.
To do this, you repeat the same process of creating a new blank query and repurpose the formula of its Source step to hold the variable for **Territory** and change the name of the query to the variable name as well. Use the following script:

```M code 
Variable.ValueOrDefault("$(/**/My Library/Territory)", "Mideast")
```

![Screenshot of the Territory query created in the dataflow.](media/dataflow-gen2-variable-references/territory-variable-query.png)

Given that your filter step was created using the user interface, you can head over to the Filtered rows step, double select it and get the settings dialog for the filter step. This dialog allows you to select, through the input widget, if you wish to use a query instead of a static value:

![Screenshot of the input widget in the filter rows dialog with the option to reference a query.](media/dataflow-gen2-variable-references/query-input-widget.png)

After selecting the option to *Select a query*, a dropdown will appear to show all queries that you can choose from. From this list, you can select the newly created **Territory** query.

![Screenshot of the Territory query selected inside the input widget from the filter rows dialog.](media/dataflow-gen2-variable-references/territory-query-input-widget.png)

Once you select OK, notice that the diagram view already created the link between the Territory query and the query in use. Not only that, but the data preview now shows you information for the **Mideast** territory.

:::image type="content" source="media/dataflow-gen2-parameterized-dataflow/mideast-territory-data-preview.png" alt-text="Screenshot of the Diagram view, Query settings, and Data preview for the dimension_city query showing data for the Mideast SalesTerritory." lightbox="media/dataflow-gen2-parameterized-dataflow/mideast-territory-data-preview.png":::

## Variable-driven destination
>[!NOTE]
>It's recommended that you get acquainted with the concept of data destinations in Dataflow Gen2 and how its mashup script gets created from the article on [data destinations and managed settings](dataflow-gen2-data-destinations-and-managed-settings.md#mashup-script-for-data-destination-queries) 

The last component to modify in this scenario is the destination. While the information about what the data destination is can be found in the Dataflow editor, to modify this part of the dataflow you need to use Git or the REST API.

![Screenshot of the flyout that contains the data destination settings for the dimension_city query.](media/dataflow-gen2-parameterized-dataflow/destination-settings-flyout.png)

This tutorial shows you how to make the changes through Git. Before you can make changes through git make sure to:
* **Create a query for the WarehouseId variable**: follow the same process described in earlier sections to create a new blank query and replace the formula for the Source step to be:
```M code
Variable.ValueOrDefault("$(/**/My Library/WarehouseId)", "Your Warehouse ID")
``` 
>[!NOTE]
>Make sure to replace the string of **"Your Warehouse ID"**, the second argument of the function, with your own corresponding value in your environment and save the query.

![Screenshot of all queries in the dataflow including the newly created WarehouseId query.](media/dataflow-gen2-variable-references/workspaceid-lakehouseid-territory-warehouseid-variable-references-query.png)

>[!IMPORTANT]
>Make sure that all your queries that hold a variable have staging disabled.
>![Screenshot of the staging option for a query in its contextual menu.](media/dataflow-gen2-variable-references/disable-staging-query.png)

* **Save the Dataflow**: use the Save button in the home tab of the ribbon.

![Screenshot of the dataflow save button.](media/dataflow-gen2-parameterized-dataflow/dataflow-save.png)

Once your Dataflow is saved, make sure to commit the changes to your Git repository and head over to your repository to see the *mashup.pq* file of your Dataflow.
When looking at the *mashup.pq* file, look for the query that you associated the data destination with. In this scenario, the name of that query is dimension_city. You see a record attribute above this query name:

```M code 
[DataDestinations = {[Definition = [Kind = "Reference", QueryName = "dimension_city_DataDestination", IsNewTarget = true], Settings = [Kind = "Manual", AllowCreation = true, ColumnSettings = [Mappings = {[SourceColumnName = "CityKey", DestinationColumnName = "CityKey"], [SourceColumnName = "WWICityID", DestinationColumnName = "WWICityID"], [SourceColumnName = "City", DestinationColumnName = "City"], [SourceColumnName = "StateProvince", DestinationColumnName = "StateProvince"], [SourceColumnName = "Country", DestinationColumnName = "Country"], [SourceColumnName = "Continent", DestinationColumnName = "Continent"], [SourceColumnName = "SalesTerritory", DestinationColumnName = "SalesTerritory"], [SourceColumnName = "Region", DestinationColumnName = "Region"], [SourceColumnName = "Subregion", DestinationColumnName = "Subregion"], [SourceColumnName = "Location", DestinationColumnName = "Location"], [SourceColumnName = "LatestRecordedPopulation", DestinationColumnName = "LatestRecordedPopulation"]}], DynamicSchema = false, UpdateMethod = [Kind = "Replace"], TypeSettings = [Kind = "Table"]]]}]
shared dimension_city = let
```
This attribute record has a field with the name QueryName, which holds the name of the query that has all the data destination logic associated for this query. This query looks as follows:

```M code    
shared dimension_city_DataDestination = let
  Pattern = Fabric.Warehouse([HierarchicalNavigation = null, CreateNavigationProperties = false]),
  Navigation_1 = Pattern{[workspaceId = "8b325b2b-ad69-4103-93ae-d6880d9f87c6"]}[Data],
  Navigation_2 = Navigation_1{[warehouseId = "527ba9c1-4077-433f-a491-9ef370e9230a"]}[Data],
  TableNavigation = Navigation_2{[Item = "City", Schema = "dbo"]}?[Data]?
in
  TableNavigation
```

You notice that, similarly to the script of the source for the Lakehouse, this script for the destination has a similar pattern where it hardcodes the workspaceid that needs to be used and also the warehouseId. Replace those fixed values with the identifiers of the queries that you created and your script shall look as follows:

```M code 
shared dimension_city_DataDestination = let
  Pattern = Fabric.Warehouse([HierarchicalNavigation = null, CreateNavigationProperties = false]),
  Navigation_1 = Pattern{[workspaceId = WorkspaceId]}[Data],
  Navigation_2 = Navigation_1{[warehouseId = WarehouseId]}[Data],
  TableNavigation = Navigation_2{[Item = "City", Schema = "dbo"]}?[Data]?
in
  TableNavigation
```

You can now commit this change and update your dataflow using the changes from your Dataflow through the source control feature in your workspace.

You can now run your Dataflow, which uses values from variable libraries.