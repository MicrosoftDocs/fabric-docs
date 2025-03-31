---
title: Quickstart - View invocation logs for a Fabric User data functions item (Preview)
description: Learn how to view and understand the invocation logs for a Fabric User data functions item.
ms.author: sumuth
author: mksuni
ms.topic: quickstart
ms.date: 03/31/2025
ms.search.form: Fabric User data functions
---

# User data functions invocation logs (Preview)

While invoking a data function, you want to see the logs for a particular invocation so that you can check the status or perform debugging. You can view the logs related to the most recent function invocations. In this view, you can see up to 50 entries for a given function in your Function set. In this article, we walk you through how to use this feature to gather more information about each invocation of a function and use it to troubleshoot any issues.

## Limitations

There are some limitations to keep in mind when using user data functions invocation logs:

- The invocation logs can take few minutes to appear. If you don't see the recent logs, try to refresh the page after a few minutes.
- The daily ingestion limit is 250 MB. The ingestion limit is reset the next day and you should see logs being tracked.
- The logs are sampled while preserving a statistically correct analysis of application data. Sampling is done by User data functions to reduce the volume of logs ingested. If you notice any logs that are partially missing, it might be because of sampling.
- The visible logs are of these supported types: information, error, warning, and trace.

## View the function invocation logs

In the Functions explorer, hover over the name of the function and select the ellipses icon (...) that appears, then select **View historical log** to view the logs.

:::image type="content" source="..\media\user-data-functions-view-logs\select-view-historical-logs.png" alt-text="Screenshot showing how to view historical logs for a function." lightbox="..\media\user-data-functions-view-logs\select-view-historical-logs.png":::

## View all invocation logs

You can see all the invocations listed in the logs view. Select the link under **Date (UTC)** to view more details for the invocation that occurred at that time.

:::image type="content" source="..\media\user-data-functions-view-logs\view-all-invocations-logs.png" alt-text="Screenshot showing how to view all the invocations for the functions ordered by date." lightbox="..\media\user-data-functions-view-logs\view-all-invocations-logs.png":::

The **All historical logs** pane contains the following information.

- **Date (UTC)**. The timestamp showing the start of the function invocation. Select the link to review all the logs for that invocation. It displays the details of the invocation with all messages logged by the user or service.
- **Status**. Indicates whether the invocation succeeded or failed.
- **Duration(ms)**. The duration of the function execution in milliseconds.
- **Invocation ID**. The ID of that specific function invocation. The Invocation ID is returned as part of an HTTP header. If there are any issues, users can reference this Invocation ID in a support request to retrieve more information about the invocation.

## View the log details of individual function invocations

When you select a timestamp link in the Date (UTC) column, the **Invocation details** pane opens to display details on the selected invocation. All the logs added in your function code can be viewed and track here. Any errors or exceptions are also shown here. Each log line contains the timestamp, log message, and associated type (Information, Warning, Debug, etc.).

:::image type="content" source="..\media\user-data-functions-view-logs\view-detailed-log-for-an-invocation.png" alt-text="Screenshot showing how to detailed logs for a given function invocation." lightbox="..\media\user-data-functions-view-logs\view-detailed-log-for-an-invocation.png":::

## Generate your own logs during invocation

Use the following code to write a log into our logging system.

```python
logger.info('This is a INFO message')
logger.warning('This is a WARNING message')
logger.error('This is an ERROR message')
logger.critical('This is a CRITICAL message')
```

## Next steps

- [Learn about the User data functions programming model](./python-programming-model.md)
- [Tutorial: Invoke user data functions from a Python application](./tutorial-invoke-from-python-app.md)
