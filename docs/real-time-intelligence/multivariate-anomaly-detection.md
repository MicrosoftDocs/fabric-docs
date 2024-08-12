---
title: Multivariate anomaly detection
description: Learn how to perform multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: conceptual
ms.date: 04/21/2024
ms.search.form: KQL Queryset
---
# Multivariate anomaly detection

The Multivariate Anomaly Detection APIs further enable developers by easily integrating advanced AI for detecting anomalies from groups of metrics, without the need for machine learning knowledge or labeled data. Dependencies and inter-correlations between up to 300 different signals are now automatically counted as key factors. This new capability helps you to proactively protect your complex systems such as software applications, servers, factory machines, spacecraft, or even your business, from failures.

Imagine 20 sensors from an auto engine generating 20 different signals like rotation, fuel pressure, bearing, etc. The readings of those signals individually may not tell you much about system level issues, but together they can represent the health of the engine. When the interaction of those signals deviates outside the usual range, the multivariate anomaly detection feature can sense the anomaly like a seasoned expert. The underlying AI models are trained and customized using your data such that it understands the unique needs of your business. With the new APIs in Anomaly Detector, developers can now easily integrate the multivariate time series anomaly detection capabilities into predictive maintenance solutions, AIOps monitoring solutions for complex enterprise software, or business intelligence tools.

In contrast, univariate anomaly detection enables you to monitor and detect abnormalities in a single variable.

Reference: Multivariate Time-Series Anomaly Detection via Graph Attention Network DOI:10.1109/ICDM50108.2020.00093