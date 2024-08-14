---
title: Multivariate anomaly detection overview
description: Learn about multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: conceptual
ms.date: 08/14/2024
---

# Time Series Anomaly Detection in Microsoft Fabric - overview

The Multivariate Anomaly Detection APIs further enable developers by easily integrating advanced AI for detecting anomalies from groups of metrics, without the need for machine learning knowledge or labeled data. Dependencies and inter-correlations between up to 300 different signals are now automatically counted as key factors. This new capability helps you to proactively protect your complex systems such as software applications, servers, factory machines, spacecraft, or even your business, from failures.

Imagine 20 sensors from an auto engine generating 20 different signals like rotation, fuel pressure, bearing, etc. The readings of those signals individually may not tell you much about system level issues, but together they can represent the health of the engine. When the interaction of those signals deviates outside the usual range, the multivariate anomaly detection feature can sense the anomaly like a seasoned expert. The underlying AI models are trained and customized using your data such that it understands the unique needs of your business. With the new APIs in Anomaly Detector, developers can now easily integrate the multivariate time series anomaly detection capabilities into predictive maintenance solutions, AIOps monitoring solutions for complex enterprise software, or business intelligence tools.

In contrast, univariate anomaly detection enables you to monitor and detect abnormalities in a single variable.

Reference: Multivariate Time-Series Anomaly Detection via Graph Attention Network DOI:10.1109/ICDM50108.2020.00093

- For [univariate analysis](https://en.wikipedia.org/wiki/Univariate_(statistics)#Analysis), KQL contains native function [series_decompose_anomalies()](/azure/data-explorer/kusto/query/series-decompose-anomaliesfunction) that can perform process thousands of time series in seconds. For
    further info on using this function take a look at [Time series anomaly detection & forecasting in Azure Data Explorer](/azure/data-explorer/anomaly-detection).
- For [multivariate analysis](https://en.wikipedia.org/wiki/Multivariate_statistics#Multivariate_analysis),
    there are few KQL library functions leveraging few known multivariate analysis algorithms in [scikit-learn](https://scikit-learn.org/stable/index.html), taking advantage of [ADX capability to run inline Python as part of the KQL query](/azure/data-explorer/kusto/query/pythonplugin?pivots=azuredataexplorer). For further info see [Multivariate Anomaly Detection in Azure Data Explorer - Microsoft Community Hub](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/multivariate-anomaly-detection-in-azure-data-explorer/ba-p/3689616).


Suppose we monitor two car metrics: speed and engine rpm. Having 0 for specific metric is not anomalous – either the car doesn’t move, or its engine is off. But measuring speed of 40 km/hour with 0 rpm is definitely anomalous - the car might be sliding or pulled. To detect these types of anomalies we need to use multivariate analysis methods that jointly analyze time series of multiple metrics.