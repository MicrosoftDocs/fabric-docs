---
title: Quickstart - View invocation logs for a Fabric Data Function (Preview)
description: Learn how to view and understand the invocation logs
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/27/2025
ms.search.form: Fabric Data Functions
---

# User data functions invocation logs (Preview)
 
While invoking a data function, you want to see the logs for a particular invocation for checking the status or debugging. You can view the logs related to the most recent function invocations. In this view, you can see up to 50 entries for a given function in your Function set. In this article, we walk you through how to use this feature to gather more information about each invocation of a function and use it to troubleshoot any issues. There are some limitations to keep in mind:

- The invocation logs can take few minutes to appear. If you don't see the recent logs, try to refresh the page after a few minutes. 
- The daily ingestion limit is 250 MB. The ingestion limit is reset the next day and you should be logs being tracked.
- The logs are sampled while preserving a statistically correct analysis of application data. Sampling is done by User data functions to reduce the volume of logs ingested. If you notice any partially missing logs, it might occur because of sampling.
- The logs visible are of these supported types: information, error, warning, and trace. 

## View the function invocation logs
Select the function in the Functions explorer and right select to select **view historical logs** to view the logs.

:::image type="content" source="..\media\user-data-functions-view-logs\select-view-historical-logs.png" alt-text="Screenshot showing how to view historical logs for a function." lightbox="..\media\user-data-functions-view-logs\select-view-historical-logs.png":::

## View all invocation logs 
You can see all the invocations listed in the logs view. Select the **Date** to view more details for the invocation that occurred at that time. 

:::image type="content" source="..\media\user-data-functions-view-logs\view-all-invocations-logs.png" alt-text="Screenshot showing how to view all the invocations for the functions ordered by date." lightbox="..\media\user-data-functions-view-logs\view-all-invocations-logs.png":::

- **Invocation ID** - It shows the ID of that specific function invocation. The InvocationID is returned as part of an HTTP header. If there's any issues, users can reference this Invocation ID in a support request to retrieve more information about that invocation. </br>
- **Date (UTC)** - The timestamp showing the start of the function invocation. You can select on the link to review all the logs for that invocation. It shows details of the invocation with all messages logged by user or service. </br>
- **Status** - shows whether the invocation succeeded or failed. </br>
- **Duration(ms)** - It shows the duration of the function execution in milliseconds. </br>


## View the log details of individual function invocations
You can view the details on the log listed here. All the logs added in your function code can be viewed and track here. Any errors and exceptions are visible in this details page. Each log line contains the timestamp, the log message, and the associated type (Information, Warning, Debug, etc.).

:::image type="content" source="..\media\user-data-functions-view-logs\view-detailed-log-for-an-invocation.png" alt-text="Screenshot showing how to detailed logs for a given function invocation." lightbox="..\media\user-data-functions-view-logs\view-detailed-log-for-an-invocation.png":::

## Generate you own logs during invocation

Use the following to write a log into our logging system. 

```python
logger.info('This is a INFO message')
logger.warning('This is a WARNING message')
logger.error('This is an ERROR message')
logger.critical('This is a CRITICAL message')
```

## Next steps
- [Learn User data functions programming model](./python-programming-model.md)
- [Invoke a function from a python app](./tutorial-invoke-from-python-app.md)


