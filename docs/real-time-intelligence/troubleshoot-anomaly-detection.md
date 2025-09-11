---
title: Troubleshoot Errors in Anomaly Detection
description: This article provides troubleshooting steps for common errors encountered in anomaly detection in Real-Time Intelligence.
author: hzargari-ms
ms.author: v-hzargari
ms.reviewer: tessahurr
ms.topic: concept-article
ms.custom:
ms.date: 09/15/2025
ms.search.form: Anomaly Detection, Anomaly Detection Errors, Anomaly Detection Troubleshooting (Preview)
---

# Troubleshoot errors in anomaly detection

If a problem occurs with any of your anomaly detection events, models, or configurations after you create them, the system sends you an email containing an error code. This article explains the meaning of the error codes you might receive and provides steps to resolve the associated issues.

## Error messages

### Unauthorized access

An error message indicating unauthorized access means that you don't have the necessary privileges to access the anomaly detection feature or the specific resources within it. To resolve this issue, contact the workspace admin and request the required permissions.

### Python plugin disabled

An error message indicating that the Python plugin is disabled means that the Python plugin required for anomaly detection isn't enabled in your workspace. To resolve this issue, contact your workspace admin and request that they enable the Python plugin with images Python 3.11.7 DL.

### Invalid data source

An error message indicating an invalid data source means that the data source you're trying to use for anomaly detection isn't valid or accessible. To resolve this issue:

- Ensure that the data source exists and is correctly configured.
- Ensure that the table includes a numeric column, a datetime column, and a key column.

### Analysis returned no results

An error message indicating that the analysis returned no results means that the anomaly detection model didn't receive a sufficient amount of data to perform the analysis. To resolve this issue, add more data to the source table or adjust the time range of the analysis to include more data points.

### Model not found

`Requested Model = '{0}'`

An error message indicating that the model wasn't found means that the anomaly detection model you're trying to access doesn't exist or was deleted. To resolve this issue, contact support and copy the error message to them for further assistance.

### Failed to select model

`Step = '{0}'`

An error message indicating that the model selection failed means that the system was unable to select the appropriate anomaly detection model for your data. To resolve this issue, contact support and copy the error message to them for further assistance.

### Error in parameters definition

An error message indicating an error in parameters definition means that there's an issue with the parameters you provided for the anomaly detection model. To resolve this issue, contact support and copy the error message to them for further assistance.

### Not enough data

`Step='{0}', ID='{PrivateInformationUtility.MarkAsCustomerContent("{1}")`

An error message indicating that there isn't enough data means that the anomaly detection model requires more data to perform the analysis. To resolve this issue, verify that series for ID indicated in the Error Message has enough valid data.

### Failed to load base model

`Debug Variable = '{0}'`

An error message indicating that the base model failed to load means that the anomaly detection model couldn't be loaded due to an issue with the underlying data or configuration. To resolve this issue, contact support and copy the error message to them for further assistance.

### Error computing anomaly detection model

`Step = '{0}'`

An error message indicating an error computing the anomaly detection model means that there was an issue during the computation of the model. To resolve this issue, contact support and copy the error message to them for further assistance.

## Related content

* [Anomaly Detection Overview](anomaly-detection.md)
* [Anomaly Detection Models](anomaly-detection-models.md)
