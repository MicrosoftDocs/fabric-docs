---
title: Multivariate anomaly detection overview
description: Learn about multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: spelluru
ms.author: spelluru
ms.topic: conceptual
ms.custom:
ms.date: 11/19/2024
---

# Multivariate anomaly detection in Microsoft Fabric - overview

What is multivariate anomaly detection for time series? Univariate anomaly detection, which is implemented by the KQL function [series_decompose_anomalies()](/kusto/query/series-decompose-anomalies-function?view=microsoft-fabric&preserve-view=true), enables you to monitor and detect anomalies in the distribution of a single variable over time. In contrast, multivariate anomaly detection is a method of detecting anomalies in the joint distribution of multiple variables over time. This method is useful when the variables are correlated, thus the combination of their values at specific time might be anomalous, while the value of each variable by itself is normal. Multivariate anomaly detection can be used in various applications, such as monitoring the health of complex IoT systems, detecting fraud in financial transactions, and identifying unusual patterns in network traffic.

For example, consider a system that monitors the performance of a fleet of vehicles. The system collects data on various metrics, such as speed, fuel consumption, and engine temperature. By analyzing these metrics together, the system can detect anomalies that wouldn't be apparent by analyzing each metric individually. On its own, an increase in fuel consumption could be due to various acceptable reasons. However, a sudden increase in fuel consumption combined with a decrease in engine temperature could indicate a problem with the engine, even if each metric on its own is within normal range.

## How can you detect multivariate anomalies in Microsoft Fabric?

Multivariate anomaly detection in Fabric takes advantage of the powerful Spark and Eventhouse engines on top of a shared persistent storage layer. The initial data can be ingested into an Eventhouse, and exposed in the OneLake. The anomaly detection model can then be trained using the Spark engine, and the predictions of anomalies on new streaming data can be done in real time using the Eventhouse engine. The interconnection of these engines that can process the same data in the shared storage allows for a seamless flow of data from ingestion, via model training, to prediction of anomalies. This workflow is simple and powerful for real-time monitoring and detecting of anomalies in complex systems.

## Solution components

This solution relies on the following components:

* [Eventhouse](eventhouse.md): The data is initially ingested into an Eventhouse, which is a real-time data processing engine that can handle high-throughput data streams.
* [OneLake](../onelake/onelake-overview.md): Data from the Eventhouse is exposed in the OneLake, which is a shared persistent storage layer that provides a unified view of the data.
* Multivariate anomaly detection package: the solution uses the [time-series-anomaly-detector](https://pypi.org/project/time-series-anomaly-detector/) python package, implementing an advanced algorithm based on a graph attention network (GAT) that captures the correlations between different time series and detects anomalies in real-time. The GAT model is trained on historical data to learn the relationships between different time series. The trained model can be applied to predict anomalies to new streaming data. Note that this algorithm is the one that is used in the [AI Anomaly Detector service](/azure/ai-services/anomaly-detector/overview) which is being retired. For more information on the algorithm, see the [blog](https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/introducing-multivariate-anomaly-detection/ba-p/2260679) and [paper](https://arxiv.org/pdf/2009.02040).
* [Spark Notebook](../data-engineering/how-to-use-notebook.md): used for offline training the anomaly detection model on historical data and store the trained model in Fabric's MLflow models registry
* [KQL queryset](kusto-query-set.md): used for real time prediction of anomalies on incoming data.

## Next step

> [!div class="nextstepaction"]
> [Multivariate Anomaly Detection](multivariate-anomaly-detection.md)
