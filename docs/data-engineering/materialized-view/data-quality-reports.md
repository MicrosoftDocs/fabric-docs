---
title: "Power BI reports for data quality"
description: Learn about data quality reports and alerts in materialized lake views within lakehouse in Microsoft Fabric
author: anuj1905 
ms.author: anujsharda
ms.reviewer: nijelsf
ms.topic: conceptual
ms.date: 04/28/2025
---

 
# Power BI reports for data quality

Materialized lake views (MLV)  provides the option to view your data quality metrics at a snapshot through embedded data quality Power BI reports. The data quality report seamlessly integrates with the existing data model in MLV and presents a visual representation of your data quality metrics to help you uncover data trends and identify outliers in your data.  


## Create and access the report 

To create/access the report, navigate to the Managed materialized lake views page and click on the "Data quality report" button. 

This opens the embedded report page. If a report is already created, the user is able to see it here. If no report is  created yet, the user can click on "Generate report" and wait for the report to be created. 


A semantic model and a Power BI report are created for the user in the background and stored in their workspace. 
Once ready, the report Power BI report is also simultaneously displayed on the same page as an embedded report and will present the synopsis of the data quality through two sections (pages on the Power BI report) – Overview and MLV Drilldown. 

 
## Interpret the data in the report

The overview page shows the data trends from the last one week, displaying visuals for the MLVs and constraints that cause the most violations and drops.

A violation indicates a row being unable to meet the condition specified in a constraint for one or more of its columns. 
Regardless of the number of columns in a row that violate different constraints, the row would be dropped only once. 
Hence the number of drops is always <= the number of violations for an MLV. 



The MLV Drilldown page allows the user to look at the data quality metrics at a deeper granularity instead of looking at only aggregates.
The user can filter for a particular MLV and also look at data from beyond the last one week by adjusting the SchemaName, MLVName, and RefreshDate in the Power BI filters. 

 
 
## Navigate to the original report in the workspace 

To use all the other default features offered in a standard Power BI report, the user can navigate to the original report in the workspace by clicking the "PowerBI report" button on the right-hand corner of the top navigation bar. 


## Set up alerts in data quality report 

You can set up alerts on the data quality report in Fabric Materialized lake views using Data Activator service. Follow the steps below to set up alerts on your data quality report.  

1. Click on "Set Alert" button on the top ribbon of the data quality report. 

1. Select a measure of your choice to set up an alert on the chart of your choice.
   In the default data quality report, you can set alerts for events such as those listed below:
   * Total violations (last one week)
   * Total rows dropped across all MLVs in the Lakehouse (last one week)
   * Total rows written across all MLVs in the Lakehouse (last one week)
   * Total rows dropped from top 5 constraints contributing to the most number of violations (last one week)
   * Total violations from top 5 MLVs contributing to the most number of violations (last one week) 

1. Select the trigger upon which you want the alert to be triggered. 

   These triggers could be when the measure changes by a value or percent (such as changes by, increases by, decreases by). It could also be when the measure becomes a value (such as greater than, greater than or equal to, less than, less than or equal to, equal to, not equal to, within range, outside of range).
   * Choose the preferred alert communication method, such as Teams or Outlook email. 

1. Click the "Apply" button to apply the rule for the alerts. 
