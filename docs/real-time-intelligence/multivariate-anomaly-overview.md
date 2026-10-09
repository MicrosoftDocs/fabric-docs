---
title: Multivariate anomaly detection overview
description: Learn about multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
ms.topic: concept-article
ms.subservice: rti-anomaly-detector
ms.date: 05/11/2026
---

# Multivariate anomaly detection in Microsoft Fabric - overview
## What is multivariate anomaly detection?

Univariate anomaly detection, which is implemented by the KQL function [series_decompose_anomalies()](/kusto/query/series-decompose-anomalies-function?view=microsoft-fabric&preserve-view=true), monitors and detects anomalies in a single variable over time. Multivariate anomaly detection extends this approach by detecting anomalies in the **joint distribution** of multiple variables over time—meaning it analyzes how the variables relate to and influence each other as a group, rather than examining each variable in isolation. Multivariate anomaly detection is useful for monitoring the health of complex IoT systems, detecting fraud in financial transactions, and identifying unusual patterns in network traffic.

For example, consider a system that monitors the performance of a fleet of vehicles. The system collects data on various metrics, such as speed, fuel consumption, and engine temperature. By analyzing these metrics together, the system can detect anomalies that wouldn't be apparent by analyzing each metric individually. On its own, an increase in fuel consumption could be due to various acceptable reasons. However, a sudden increase in fuel consumption combined with a decrease in engine temperature could indicate a problem with the engine, even if each metric on its own is within normal range.

## How can you detect multivariate anomalies in Microsoft Fabric?

Multivariate anomaly detection in Fabric takes advantage of the powerful Spark and Eventhouse engines on top of a shared persistent storage layer. The initial data can be ingested into an Eventhouse, and exposed in the OneLake. The anomaly detection model can then be trained using the Spark engine, and the predictions of anomalies on new streaming data can be done in real time using the Eventhouse engine. The interconnection of these engines that can process the same data in the shared storage allows for a seamless flow of data from ingestion, via model training, to prediction of anomalies. This workflow is simple and powerful for real-time monitoring and detecting of anomalies in complex systems.

Two end-to-end paths are available, and you can choose based on the complexity of your scenario:

- **Native Eventhouse anomaly detection on live data**: Run [anomaly detection](anomaly-detection.md) directly against streaming and historical data in Eventhouse tables, with no custom training or model setup. Start with this path when built-in models meet your needs and you want the simplest path to insights.
- **Custom multivariate detection by using a notebook-trained model**: Use the GAT-based Python package described in this article to train a custom model in a notebook on historical data, then score new streaming data in real time through Eventhouse and KQL. Choose this path when you need a bespoke algorithm or a specialized scenario that the native models don't cover.

### Native Eventhouse anomaly detection

Eventhouse supports native anomaly detection on live tables, so you can analyze streaming and historical data directly without moving data or training a custom model. Use this option when you need a quick start with built-in algorithms; choose the custom multivariate path that follows when you require a tailored algorithm or specialized configuration.

## Solution components

This solution relies on the following components:

* [Eventhouse](eventhouse.md): The data is initially ingested into an Eventhouse, which is a real-time data processing engine that can handle high-throughput data streams.
* [OneLake](../onelake/onelake-overview.md): Data from the Eventhouse is exposed in the OneLake, which is a shared persistent storage layer that provides a unified view of the data.
* Multivariate anomaly detection package: the solution uses the [time-series-anomaly-detector](https://pypi.org/project/time-series-anomaly-detector/) python package, implementing an advanced algorithm based on a graph attention network (GAT) that captures the correlations between different time series and detects anomalies in real-time. The GAT model is trained on historical data to learn the relationships between different time series. The trained model can be applied to predict anomalies to new streaming data. Note that this algorithm is the one that is used in the [AI Anomaly Detector service](/azure/ai-services/anomaly-detector/overview) which is being retired. For more information on the algorithm, see the [blog](https://techcommunity.microsoft.com/t5/ai-azure-ai-services-blog/introducing-multivariate-anomaly-detection/ba-p/2260679) and [paper](https://arxiv.org/pdf/2009.02040).
* [Fabric notebooks](../data-engineering/how-to-use-notebook.md): used for offline training of the anomaly detection model on historical data and to store the trained model in Fabric's MLflow models registry. Notebooks support KQL, T-SQL, Python, and Spark within the same workspace, enabling unified exploration, transformations, training (for custom models), and validation of anomalies on the same Eventhouse-backed data.
* [KQL queryset](kusto-query-set.md): used for real time prediction of anomalies on incoming data.
* [SQL analytics endpoint](eventhouse-analyze-data-with.md): exposes a managed T-SQL surface aligned with the Eventhouse data model. You can query detected anomalies and related metrics by using T-SQL for downstream analytics and integration with BI or reporting tools under Fabric governance.
* Data agents integration: anomalies detected in Eventhouse can be consumed by [Fabric data agents](../data-science/concept-data-agent.md) to reason over live and historical signals. Combining anomaly detection with data agents enables conversational analytics and automated workflows over the same Eventhouse data.

## Next step

> [!div class="nextstepaction"]
> [Multivariate Anomaly Detection](multivariate-anomaly-detection.md)
