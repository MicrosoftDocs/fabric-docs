---
title: Multivariate anomaly detection overview
description: Learn about multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: conceptual
ms.date: 08/14/2024
---

# Time series anomaly detection in Microsoft Fabric - overview

What is multivariate anomaly detection? Multivariate anomaly detection is a method of detecting anomalies in a system by analyzing multiple signals or metrics together. This method is particularly useful when the signals are interdependent and the anomalies are not easily detected by analyzing each signal individually. Multivariate anomaly detection can be used in a variety of applications, such as monitoring the health of complex systems, detecting fraud in financial transactions, and identifying unusual patterns in network traffic.

For example, consider a system that monitors the performance of a fleet of vehicles. The system collects data on various metrics, such as speed, fuel consumption, and engine temperature. By analyzing these metrics together, the system can detect anomalies that would not be apparent by analyzing each metric individually. For example, a sudden increase in fuel consumption combined with a decrease in engine temperature could indicate a problem with the engine, even if each metric on its own is within normal range.In contrast, univariate anomaly detection enables you to monitor and detect abnormalities in a single variable.

To perform multivariate anomaly detection in Microsoft Fabric, a unique solution is given. The solution is based on a graph attention network (GAT) that captures the correlations between different time series and detects anomalies in real-time. The GAT model is trained on historical data to learn the relationships between different time series and is then used to predict anomalies in real-time data. The model is able to detect anomalies that would not be detected by analyzing each time series individually, making it a powerful tool for monitoring the health of complex systems.

## When to use multivariate anomaly detection

Add information about when this solution works, and when it doesn't.

## Solution components

This solution relies on the following components:

* Eventhouse:
* OneLake:
* Algorithm for multivariate anomaly detection: ?Name? 
    Reference: [Multivariate Time-Series Anomaly Detection via Graph Attention Network](https://arxiv.org/pdf/2009.02040)
* KQL queries with the XX python ML library ?Explain?

## Next step

> [!div class="nextstepaction"]
> [Multivariate Anomaly Detection](multivariate-anomaly-detection.md)
