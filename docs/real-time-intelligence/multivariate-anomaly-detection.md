---
title: Multivariate anomaly detection
description: Learn how to perform multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: conceptual
ms.date: 08/13/2024
ms.search.form: KQL Queryset
---
# Time Series Anomaly Detection in Microsoft Fabric

The Multivariate Anomaly Detection APIs further enable developers by easily integrating advanced AI for detecting anomalies from groups of metrics, without the need for machine learning knowledge or labeled data. Dependencies and inter-correlations between up to 300 different signals are now automatically counted as key factors. This new capability helps you to proactively protect your complex systems such as software applications, servers, factory machines, spacecraft, or even your business, from failures.

Imagine 20 sensors from an auto engine generating 20 different signals like rotation, fuel pressure, bearing, etc. The readings of those signals individually may not tell you much about system level issues, but together they can represent the health of the engine. When the interaction of those signals deviates outside the usual range, the multivariate anomaly detection feature can sense the anomaly like a seasoned expert. The underlying AI models are trained and customized using your data such that it understands the unique needs of your business. With the new APIs in Anomaly Detector, developers can now easily integrate the multivariate time series anomaly detection capabilities into predictive maintenance solutions, AIOps monitoring solutions for complex enterprise software, or business intelligence tools.

In contrast, univariate anomaly detection enables you to monitor and detect abnormalities in a single variable.

Reference: Multivariate Time-Series Anomaly Detection via Graph Attention Network DOI:10.1109/ICDM50108.2020.00093


## Time Series Anomaly Detection in Fabric RTI

There are few options for time series anomaly detection in Fabric RTI
(Real Time Intelligence):

-   For [univariate
    analysis](https://en.wikipedia.org/wiki/Univariate_(statistics)#Analysis),
    KQL contains native function
    [series_decompose_anomalies()](/azure/data-explorer/kusto/query/series-decompose-anomaliesfunction)
    that can perform process thousands of time series in seconds. For
    further info on using this function take a look at [Time series
    anomaly detection & forecasting in Azure Data
    Explorer](/azure/data-explorer/anomaly-detection).

-   For [multivariate
    analysis](https://en.wikipedia.org/wiki/Multivariate_statistics#Multivariate_analysis),
    there are few KQL library functions leveraging few known
    multivariate analysis algorithms in
    [scikit-learn](https://scikit-learn.org/stable/index.html) , taking
    advantage of [ADX capability to run inline Python as part of the KQL
    query](/azure/data-explorer/kusto/query/pythonplugin?pivots=azuredataexplorer).
    For further info see [Multivariate Anomaly Detection in Azure Data
    Explorer - Microsoft Community
    Hub](https://techcommunity.microsoft.com/t5/azure-data-explorer-blog/multivariate-anomaly-detection-in-azure-data-explorer/ba-p/3689616).

-   For both univariate and multivariate you can now use the
    time-series-anomaly-detector package as described below.

# Using time-series-anomaly-detector in Fabric

In the following example we shall

-   Upload stocks change table to Fabric

-   Train the multivariate anomaly detection model in a Python notebook
    using Spark engine

-   Predict anomalies by applying the trained model to new data using
    Event House (Kusto) engine

## Creating training & scoring workflow in Fabric

1.  Create a Workspace


:::image type="content" source="media/multivariate-anomaly-detection/image1.png" alt-text="Screenshot of multivariate anomaly detection image 1.":::

:::image type="content" source="media/multivariate-anomaly-detection/image2.png" alt-text="Screenshot of multivariate anomaly detection image 2.":::

1.  Create Event House

:::image type="content" source="media/multivariate-anomaly-detection/image3.png" alt-text="Screenshot of multivariate anomaly detection image 3.":::

:::image type="content" source="media/multivariate-anomaly-detection/image4.png" alt-text="Screenshot of multivariate anomaly detection image 4.":::

1.  Enable OneLake mirroring

:::image type="content" source="media/multivariate-anomaly-detection/image5.png" alt-text="Screenshot of multivariate anomaly detection image 5.":::

:::image type="content" source="media/multivariate-anomaly-detection/image6.png" alt-text="Screenshot of multivariate anomaly detection image 6.":::

1.  Enable KQL Python plugin

:::image type="content" source="media/multivariate-anomaly-detection/image7.png" alt-text="Screenshot of multivariate anomaly detection image 7.":::

 Select 3.11.7 DL image that contains the time-series-anomaly-detector package

:::image type="content" source="media/multivariate-anomaly-detection/image8.png" alt-text="Screenshot of multivariate anomaly detection image 8.":::

5.  Upload the data table from
    <https://artifactswestus.blob.core.windows.net/public/demo/demo_stocks_change.csv>
    to KQL DB

:::image type="content" source="media/multivariate-anomaly-detection/image9.png" alt-text="Screenshot of multivariate anomaly detection image 9.":::

:::image type="content" source="media/multivariate-anomaly-detection/image10.png" alt-text="Screenshot of multivariate anomaly detection image 10.":::

:::image type="content" source="media/multivariate-anomaly-detection/image11.png" alt-text="Screenshot of multivariate anomaly detection image 11.":::

6.  Go back to the workspace and create OneLake

:::image type="content" source="media/multivariate-anomaly-detection/image12.png" alt-text="Screenshot of multivariate anomaly detection image 12.":::

:::image type="content" source="media/multivariate-anomaly-detection/image13.png" alt-text="Screenshot of multivariate anomaly detection image 13.":::

7.  Create a shortcut to 'demo_stocks_change' table

:::image type="content" source="media/multivariate-anomaly-detection/image14.png" alt-text="Screenshot of multivariate anomaly detection image 14.":::

:::image type="content" source="media/multivariate-anomaly-detection/image15.png" alt-text="Screenshot of multivariate anomaly detection image 15.":::

:::image type="content" source="media/multivariate-anomaly-detection/image16.png" alt-text="Screenshot of multivariate anomaly detection image 16.":::

:::image type="content" source="media/multivariate-anomaly-detection/image17.png" alt-text="Screenshot of multivariate anomaly detection image 17.":::

8.  Go back to the workspace and create the Spark environment

:::image type="content" source="media/multivariate-anomaly-detection/image18.png" alt-text="Screenshot of multivariate anomaly detection image 18.":::

:::image type="content" source="media/multivariate-anomaly-detection/image19.png" alt-text="Screenshot of multivariate anomaly detection image 19.":::

:::image type="content" source="media/multivariate-anomaly-detection/image20.png" alt-text="Screenshot of multivariate anomaly detection image 20.":::

> Add the time-series-anomaly-detector package from PyPI and publish the
> environment
>
:::image type="content" source="media/multivariate-anomaly-detection/image21.png" alt-text="Screenshot of multivariate anomaly detection image 21.":::

9.  Go back to the workspace and attach the environment to the workspace

:::image type="content" source="media/multivariate-anomaly-detection/image22.png" alt-text="Screenshot of multivariate anomaly detection image 22.":::

:::image type="content" source="media/multivariate-anomaly-detection/image23.png" alt-text="Screenshot of multivariate anomaly detection image 23.":::

10. Download the training notebook from
    <https://artifactswestus.blob.core.windows.net/public/demo/MVAD%205%20Stocks%20(Spark).ipynb>
    to your local disk. Go back to the workspace, select the Data
    Science experience and import it

:::image type="content" source="media/multivariate-anomaly-detection/image24.png" alt-text="Screenshot of multivariate anomaly detection image 24.":::


11. Open the notebook

12. Update the attached Lake House to the current one

:::image type="content" source="media/multivariate-anomaly-detection/image25.png" alt-text="Screenshot of multivariate anomaly detection image 25.":::

:::image type="content" source="media/multivariate-anomaly-detection/image26.png" alt-text="Screenshot of multivariate anomaly detection image 26.":::

:::image type="content" source="media/multivariate-anomaly-detection/image27.png" alt-text="Screenshot of multivariate anomaly detection image 27.":::

13. Update the notebook cell to load the table from your Lake House

:::image type="content" source="media/multivariate-anomaly-detection/image28.png" alt-text="Screenshot of multivariate anomaly detection image 28.":::

14. Run the notebook to train the model and save it in Fabric MLflow
    models registry

:::image type="content" source="media/multivariate-anomaly-detection/image29.png" alt-text="Screenshot of multivariate anomaly detection image 29.":::

Verify you received the predictions chart

:::image type="content" source="media/multivariate-anomaly-detection/image30.png" alt-text="Screenshot of multivariate anomaly detection image 30.":::

Note the model URI in the last cell:
abfss://b0b7b174-dd02-4091-a5f2-76794001d4c3@onelakedxt.pbidedicated.windows.net/b0ad521b-88b2-441c-a099-65cbb23b6d38/be4abe73-3fa1-450c-8f54-54cceda3526f/artifacts

15. Create a Query set

:::image type="content" source="media/multivariate-anomaly-detection/image31.png" alt-text="Screenshot of multivariate anomaly detection image 31.":::

:::image type="content" source="media/multivariate-anomaly-detection/image32.png" alt-text="Screenshot of multivariate anomaly detection image 32.":::

16. Attache your KQL DB to this query set

:::image type="content" source="media/multivariate-anomaly-detection/image33.png" alt-text="Screenshot of multivariate anomaly detection image 33.":::

17. Download the kql file from
    <https://artifactswestus.blob.core.windows.net/public/demo/MVAD%205%20Stocks%20(KQL).kql>
    to your local disk.

18. Copy its content to your query set.

19. Run the '.create-or-alter function' query to define
    predict_fabric_mvad_fl() stored function

20. Run the prediction query that will detect multivariate anomalies on
    the 5 stocks, based on the trained model, and render it as
    anomalychart. Note that the anomalous points are rendered on the
    first stock (AAPL), though they represent multivariate anomalies,
    i.e. anomalies of the vector of the 5 stocks in the specific date.

:::image type="content" source="media/multivariate-anomaly-detection/image34.png" alt-text="Screenshot of multivariate anomaly detection image 34.":::

# Summary

The addition of the time-series-anomaly-detector package to Fabric makes
it the top platform for univariate & multivariate time series anomaly
detection. Choose the anomaly detection method that best fits your
scenario -- from native KQL function for univariate analysis at scale,
through standard multivariate analysis techniques and up to the best of
breed time series anomaly detection algorithms implemented in the
time-series-anomaly-detector package.

