---
title: Get started for streaming data in lakehouse
description: Learn how to use stream data into lakehouse and serve in through SQL endpoint.
ms.reviewer: snehagunda
ms.author: tvilutis
author: tedvilutis
ms.topic: conceptual
ms.date: 05/23/2023
ms.search.form: Get Started Lakehouse Streaming SQL Endpoint
---

# Spark structured streaming to lakehouse for serving with SQL endpoint

This tutorial is a quick guide to creating a Spark Job Definition that contains Python code with Spark Structured Streaming to land data in a lakehouse and then serve it through an SQL endpoint. After completing this tutorial, you'll have a Spark Job Definition running continuously and seeing incoming data through the SQL endpoint.

## Create a Python script using your IDE

1. Create a Python code that uses Spark Structured Streaming to land data in a lakehouse table
1. Save your script as Python file (.py) in your local computer

## Create a lakehouse

1. In Microsoft Fabric, make sure you are in desired workspace or select/create one
1. Select **Create** icon on the left menu
1. Under **Data Engineering** select **Lakehouse**
1. Enter name of your lakehouse
1. Select **Create**

## Create a Spark Job Definition

1. In the same workspace where you created a lakehouse, select **Create** icon on the left menu
1. Under "Data Engineering", select **Spark Job Definition**
1. Enter name of your Spark Job Definition
1. Select **Create**
1. Select **Upload** and select your Python file (.py) from your local computer
1. Under **Lakehouse Reference** select the lakehouse you created

## Set Retry policy for Spark Job Definition

1. On a top menu, select **Setting** icon
1. Select Optimization tab
1. Set Retry Policy trigger **On**
1. Define maximum retry attempts or check **Allow unlimited attempts**
1. Specify time between each retry attempt
1. Select **Apply**

## Execute and Monitor Spark Job Definition

1. On a top menu, select **Run** icon
1. Check if **Spark Job definition** was submitted successfully and running

## View data using SQL Endpoint

1. In workspace view, select your Lakehouse
1. In the right corner, select **Lakehouse** and select **SQL endpoint**
1. In SQL endpoint view under Tables,** select the table that your script uses to land data
1. See data preview

## Next steps
- [Spark Job Definition](spark-job-definition.md)
- [What is SQL Endpoint for a lakehouse?](lakehouse-sql-endpoint.md)
