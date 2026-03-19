---
title: Trigger Fabric Items
description: Understand how to trigger Fabric items with Activator and automate data loading and transformation processes.
ms.topic: concept-article
ms.custom: FY25Q1-Linter
ms.date: 03/19/2026
ms.search.form: Data Activator Fabric Item
---

# Trigger Fabric items

You can use Fabric Pipelines, Dataflows (preview), Notebooks, Spark Job Definition, and User Data Function (preview) to load, transform, and analyze data in Microsoft Fabric. Fabric [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rules can take an action that starts jobs on Fabric items. Use this feature in the following scenarios:

* Run Pipelines and Dataflows (preview) when new files are loaded to Azure storage accounts, to load files into OneLake. To learn more, see [Azure Storage events](/azure/storage/blobs/storage-blob-event-overview).

* Run Notebooks when issues with data quality are found using Power BI reports. To learn more, see [getting data from Power BI](activator-get-data-power-bi.md).

* Run Spark Jobs to submit batch or streaming tasks to Spark clusters.

* Run Functions to execute custom business logic to analyze and process data by using code.

## How to trigger a job on Fabric items

Start by selecting an existing Activator rule or [creating a rule](activator-create-activators.md).

In the rule definition pane on the right side of the screen, find the **Action** section to define the action when the chosen condition is met. Select an action type and select a specific Fabric item from the [OneLake Data Hub](../../governance/onelake-catalog-overview.md) pop-up window.

## Test, start, or stop an [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule

After you enter all of the required information, select **Save** to save the [!INCLUDE [fabric-activator](../includes/fabric-activator.md)] rule. To test the rule, select **Test action**. To start the rule, select **Start** from the top menu bar. To stop the rule, select **Stop**. **Stop** only appears while a rule is active.

## Pass parameter values to Fabric items (Preview)

You can now pass values to the parameters defined in the activated Fabric item. To pass parameter values in Activator portal, select **Edit action**, enter the parameter name and type exactly as they're defined in the Fabric item. Enter the parameter values manually or by selecting dynamic properties from the data source.

:::image type="content" border="true" source="media/activator-trigger-fabric-items/pass-parameter.png" alt-text="Screenshot showing Activator card with a parameter.":::

For Spark Job Definition, Activator supports passing parameter values to [command line arguments, executable main file, and main class](https://aka.ms/sparkjobdefinitionparameters). 

### Types of parameters

Activator accepts parameters in string, boolean, and number (float) formats. For User Data Function, Activator supports all parameter types that functions support. Follow the guidelines to pass number and boolean values:

**Number**

| Input Value | Result | Valid value? | Notes |
| --- | --- | --- | --- |
| `123.45` | 123.45 | Yes | Dot as decimal separator |	
| `1,234.56` | 1234.56 | Yes | Comma as thousands separator |	
| `0.99` | 0.99 | Yes |  |	
| `1e3` | 1000 | Yes | Scientific notation |	
| `123,45` | 0 | No | Invalid in en-US (comma not decimal) |	
| null or whitespace | 0 | No |  |	
| any other string | 0 | No |  |	

**Boolean**

| Input Value | Result | Valid value? | Notes |
| --- | --- | --- | --- |
| `true` | true | Yes | Case-insensitive |	
| `1` | true | Yes |  |	
| `yes` | true | Yes |  |	
| `y` | true | Yes |  |	
| `false` | false | Yes | Case-insensitive |	
| `0` | false | Yes |  |	
| `no` | false | Yes |  |	
| `n` | false | Yes |  |	
| null or whitespace | false | No |  |	
| any other string | false | No |  |	



> [!NOTE]
> Make sure you define the parameter name and type exactly the same as the activated Fabric item. If you have any feedback or ideas regarding this feature, share them on [Activator community](https://aka.ms/ActivatorCommunity).


## Related content

* [[!INCLUDE [fabric-activator](../includes/fabric-activator.md)] tutorial using sample data](activator-tutorial.md)

To learn more about Microsoft Fabric, see:

* [What is Microsoft Fabric?](../../fundamentals/microsoft-fabric-overview.md)
