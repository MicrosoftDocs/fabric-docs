---
title: Multivariate anomaly detection
description: Learn how to perform multivariate anomaly detection in Real-Time Intelligence.
ms.reviewer: adieldar
author: YaelSchuster
ms.author: yaschust
ms.topic: how-to
ms.date: 08/18/2024
ms.search.form: KQL Queryset
---
# Multivariate Anomaly Detection

Specifically, in this tutorial you will:

> [!div class="checklist"]
>
> * Prepare a table in the Eventhouse with sample data.
> * Enable OneLake availability on this data.
> * Train the multivariate anomaly detection model in a Python notebook using Spark engine
> * Predict anomalies by applying the trained model to new data using Eventhouse (Kusto) engine

## Prerequisites

* A [workspace](../get-started/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity)
* An [eventhouse](create-eventhouse.md) in your workspace
* Download the notebook from the GitHub repo
* Download the sample data from the GitHub repo

## Enable OneLake availability

OneLake availability must be [enabled](event-house-onelake-availability.md) before you get data in the Eventhouse. This step is important, because it enables the data you will ingest to become available in the OneLake. In a later step, you'll access this same data from your Notebook to train the model.

1. Browse to your workspace homepage in Real-Time Intelligence.
1. Select the Eventhouse you created in the prerequisites.
1. Select the pencil icon next to **OneLake availability**
1. In the right pane, toggle the button to **Active**.
1. Select **Done**.

:::image type="content" source="media/multivariate-anomaly-detection/one-lake-availability.png" alt-text="Screenshot of enabling OneLake availability in your Eventhouse.":::

## Get data into the Eventhouse

1. Hover over the KQL database where you want to store your data. Select the **More menu [...]** > **Get data** > **Local file**.

    :::image type="content" source="media/multivariate-anomaly-detection/local-file.png" alt-text="Screenshot of get data from local file.":::

1. Select **+ New table** and enter *demo_stocks_change* as the table name.
1. In the upload data dialog, select **Browse for files** and upload the sample data file that was downloaded in the [Prerequisites](#prerequisites)
1. Select **Next**.
1. In the **Inspect the data** section, toggle **First row is column header** to **On**.
1. Selct **Finish**.
1. When the data is uploaded, select **Close**.

## Enable KQL Python plugin

In this step, you enable the python plugin in your Eventhouse. This is required to run the Python code in the KQL query. It's important to choose the correct package that contains the necessary libraries for the time-series-anomaly-detector package.

1. In the Eventhouse ribbon, select **Manage** > **Plugins**.
1. In the Plugins pane, toggle the **Python language extension to** to **On**.
1. Select **Python 3.11.7 DL (preview)**.
1. Select **Done**.

    :::image type="content" source="media/multivariate-anomaly-detection/python-package.png" alt-text="Screenshot for how to enable python package 3.11.7 DL in the Eventhouse.":::

## Create a OneLake shortcut to the table

In this step, you create a [OneLake shortcut](../onelake/create-onelake-shortcut.md) to the table that was created in a previous step. A OneLake shortcut is an objects in OneLake that point to other storage locations, and is required to access the data that was made available from your Eventhouse. In a later step, you access this data from the Notebook.

1. Browse to a Lakehouse or create a new Lakehouse in your workspace.
1. Select **New shortcut**.

    :::image type="content" source="media/multivariate-anomaly-detection/new-shortcut.png" alt-text="Screenshot of how to create a new shortcut in the Lakehouse.":::

1. Under **Internal sources**, select **Microsoft OneLake**.
1. Select the KQL database used in the previous steps. Select **Next**.
1. Select the table you created in the previous steps. Select **Next**.

    :::image type="content" source="media/multivariate-anomaly-detection/select-table-shortcut.png" alt-text="Screenshot of selecting your table to create a OneLake shortcut to a KQL database table.":::

## Create a Spark environment

1. In the experience switcher, choose **Data Engineering**. If you are already in the Data Engineering experience, browse to **Home**.
1. From **Recommended items to create**, Select **Environments** and enter a name for the environment.

    :::image type="content" source="media/multivariate-anomaly-detection/create-environment.png" alt-text="Screenshot of creating an environment in Data Engineering.":::

1. Under **Libraries**, select **Public libraries**.
1. Select **Add from PyPI**.
1. In the search box, enter *time-series-anomaly-detector*. The version automatically populates with the most recent version.
1. Select **Save**.

    `:::image type="content" source="media/multivariate-anomaly-detection/add-package.png" alt-text="Screenshot of adding the PyPI package to the Spark environment.":::

## Attach the environment to the workspace

TODO: What role is needed to attach the environment to the workspace?

1. Select workspace settings from the top right corner of the workspace. 
1. Expand the **Data Engineering/Science** section and select **Spark settings**.
1. Select the **Environment** tab.
1. Toggle **Set default environment** to **On**.
1. Select the environment you created in the previous step. Select **Save**.

    :::image type="content" source="media/multivariate-anomaly-detection/attach-environment-workspace.png" alt-text="Screenshot of attaching the environment to the workspace." lightbox="media/multivariate-anomaly-detection/attach-environment-workspace.png":::

## Train the model

1. In the experience switcher, choose **Data Engineering**.
1. Select **Import notebook** > **Upload**, and choose the upload you downloaded in a previous step. :::image type="icon" source="media/vector-database/import-notebook.png" border="false":::


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

```kusto 
.create-or-alter function with (folder = "Packages\\ML", docstring = "Predict MVAD model in Microsoft Fabric")
predict_fabric_mvad_fl(samples:(*), features_cols:dynamic, artifacts_uri:string, trim_result:bool=false)
{
    let s = artifacts_uri;
    let artifacts = bag_pack('MLmodel', strcat(s, '/MLmodel;impersonate'), 'conda.yaml', strcat(s, '/conda.yaml;impersonate'),
                             'requirements.txt', strcat(s, '/requirements.txt;impersonate'), 'python_env.yaml', strcat(s, '/python_env.yaml;impersonate'),
                             'python_model.pkl', strcat(s, '/python_model.pkl;impersonate'));
    let kwargs = bag_pack('features_cols', features_cols, 'trim_result', trim_result);
    let code = ```if 1:
        import os
        import shutil
        import mlflow
        model_dir = 'C:/Temp/mvad_model'
        model_data_dir = model_dir + '/data'
        os.mkdir(model_dir)
        shutil.move('C:/Temp/MLmodel', model_dir)
        shutil.move('C:/Temp/conda.yaml', model_dir)
        shutil.move('C:/Temp/requirements.txt', model_dir)
        shutil.move('C:/Temp/python_env.yaml', model_dir)
        shutil.move('C:/Temp/python_model.pkl', model_dir)
        features_cols = kargs["features_cols"]
        trim_result = kargs["trim_result"]
        test_data = df[features_cols]
        model = mlflow.pyfunc.load_model(model_dir)
        predictions = model.predict(test_data)
        predict_result = pd.DataFrame(predictions)
        samples_offset = len(df) - len(predict_result)        # this model doesn't output predictions for the first sliding_window-1 samples
        if trim_result:                                       # trim the prefix samples
            result = df[samples_offset:]
            result.iloc[:,-4:] = predict_result.iloc[:, 1:]   # no need to copy 1st column which is the timestamp index
        else:
            result = df                                       # output all samples
            result.iloc[samples_offset:,-4:] = predict_result.iloc[:, 1:]
        ```;
    samples
    | evaluate python(typeof(*), code, kwargs, external_artifacts=artifacts)
}
```

```kusto
let cutoff_date=datetime(2023-01-01);
let num_predictions=toscalar(demo_stocks_change | where Date >= cutoff_date | count);   //  number of latest points to predict
let sliding_window=200;                                                                 //  should match the window that was set for model training
let prefix_score_len = sliding_window/2+min_of(sliding_window/2, 200)-1;
let num_samples = prefix_score_len + num_predictions;
demo_stocks_change
| top num_samples by Date desc 
| order by Date asc
| extend is_anomaly=bool(false), score=real(null), severity=real(null), interpretation=dynamic(null)
| invoke predict_fabric_mvad_fl(pack_array('AAPL', 'AMZN', 'GOOG', 'MSFT', 'SPY'),
            // NOTE: Update artifacts_uri to model path
            artifacts_uri='abfss://b0b7b174-dd02-4091-a5f2-76794001d4c3@onelakedxt.pbidedicated.windows.net/b0ad521b-88b2-441c-a099-65cbb23b6d38/be4abe73-3fa1-450c-8f54-54cceda3526f/artifacts',
            trim_result=true)
| summarize Date=make_list(Date), AAPL=make_list(AAPL), AMZN=make_list(AMZN), GOOG=make_list(GOOG), MSFT=make_list(MSFT), SPY=make_list(SPY), anomaly=make_list(toint(is_anomaly))
| render anomalychart with(anomalycolumns=anomaly, title='Stock Price Changest in % with Anomalies')
```

18. Copy its content to your query set.

19. Run the '.create-or-alter function' query to define
    predict_fabric_mvad_fl() stored function

20. Run the prediction query that will detect multivariate anomalies on the 5 stocks, based on the trained model, and render it as anomalychart. Note that the anomalous points are rendered on the first stock (AAPL), though they represent multivariate anomalies, i.e. anomalies of the vector of the 5 stocks in the specific date.

:::image type="content" source="media/multivariate-anomaly-detection/image34.png" alt-text="Screenshot of multivariate anomaly detection image 34.":::

## Summary

The addition of the time-series-anomaly-detector package to Fabric makes it the top platform for univariate & multivariate time series anomaly detection. Choose the anomaly detection method that best fits your scenario -- from native KQL function for  univariate analysis at scale, through standard multivariate analysis techniques and up to the best of breed time series anomaly detection algorithms implemented in the time-series-anomaly-detector package.

