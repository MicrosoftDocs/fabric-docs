---
title: Multivariate anomaly detection overview
description: Learn about multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: conceptual
ms.date: 08/14/2024
---

# Multivariate anomaly detection in Microsoft Fabric - overview

What is multivariate anomaly detection? [Univariate anomaly detection](/kusto/query/anomaly-detection?view=microsoft-fabric) enables you to monitor and detect abnormalities in a single variable. In contrast, multivariate anomaly detection is a method of detecting anomalies in a system by analyzing multiple signals or metrics together. This method is useful when the signals are interdependent and the anomalies aren't easily detected by analyzing each signal individually. Multivariate anomaly detection can be used in various applications, such as monitoring the health of complex systems, detecting fraud in financial transactions, and identifying unusual patterns in network traffic.

## Example

For example, consider a system that monitors the performance of a fleet of vehicles. The system collects data on various metrics, such as speed, fuel consumption, and engine temperature. By analyzing these metrics together, the system can detect anomalies that wouldn't be apparent by analyzing each metric individually. On its own, an increase in fuel consumption could be due to various acceptable reasons. However, a sudden increase in fuel consumption combined with a decrease in engine temperature could indicate a problem with the engine, even if each metric on its own is within normal range.

## How can you do multivariate anomaly detection in Microsoft Fabric?

Multivariate anomaly detection in Fabric can take advantage of the powerful Spark and Eventhouse engines on top of a shared persistent storage layer. The initial data can be ingested into an Eventhouse, and exposed in the OneLake. The model can be trained using the Spark engine, and the predictions can be using Eventhouse engine. The interconnection of these engines allows for a seamless flow of data from ingestion to prediction, enabling real-time monitoring and detection of anomalies in complex systems.

## Solution components

This solution relies on the following components:

* [Eventhouse](eventhouse.md): The data is initially ingested into an Eventhouse, which is a real-time data processing engine that can handle high-throughput data streams.
* [OneLake](../onelake/onelake-overview.md): Data from the Eventhouse is exposed in the OneLake, which is a shared persistent storage layer that provides a unified view of the data.
* Multivariate anomaly detection: The solution uses a python environment with an algorithm based on a graph attention network (GAT) that captures the correlations between different time series and detects anomalies in real-time. The GAT model is trained on historical data to learn the relationships between different time series and is then used to predict anomalies in real-time data. The model is able to detect anomalies that wouldn't be detected by analyzing each time series individually, making it a powerful tool for monitoring the health of complex systems. For more information, see [Multivariate Time-Series Anomaly Detection via Graph Attention Network](https://arxiv.org/pdf/2009.02040)
* [KQL queryset](kusto-query-set.md): ADI: What should we say about why we're doing this in Kusto? 

## Next step

> [!div class="nextstepaction"]
> [Multivariate Anomaly Detection](multivariate-anomaly-detection.md)

## Related content

* [Univariate anomaly detection and forecasting](/kusto/query/anomaly-detection?view=microsoft-fabric)
* [Recipe: Azure AI services - Multivariate Anomaly Detection](../data-science/multivariate-anomaly-detection.md)

ADI- what else do you want to link to here?