---
title: Multivariate anomaly detection
description: Learn how to train a multivariate anomaly detection model in a Fabric notebook and score new data in a KQL queryset.
ms.reviewer: adieldar
ms.topic: how-to
ms.date: 06/09/2026
ai-usage: ai-assisted
ms.subservice: rti-anomaly-detector
ms.search.form: KQL Queryset
#customer intent: As a data scientist, I want to detect anomalies across multiple metrics so that I can proactively identify complex issues.
---
# Multivariate anomaly detection

This tutorial shows you how to train a multivariate anomaly detection model in a Fabric notebook by using sample data stored in an eventhouse. You then use the trained model in a KQL queryset to score new data and visualize anomalies.

For background information, see [Multivariate anomaly detection in Microsoft Fabric - overview](multivariate-anomaly-overview.md).

## Prerequisites

- A [workspace](../fundamentals/create-workspaces.md) with a Microsoft Fabric-enabled [capacity](../enterprise/licenses.md#capacity).
- An **Admin**, **Contributor**, or **Member** [workspace role](../fundamentals/roles-workspaces.md). You need this permission level to create items such as an environment.
- An [eventhouse](create-eventhouse.md) in your workspace with a database.
- The [sample data file](https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/real-time-intelligence/demo_stocks_change.csv).
- The [sample notebook](https://raw.githubusercontent.com/microsoft/fabric-samples/main/docs-samples/real-time-intelligence/multivariate-anomaly-detection-tutorial.ipynb).

## Part 1: Turn on OneLake availability

Turn on [OneLake availability](event-house-onelake-availability.md) before you load data into the eventhouse. This setting makes the ingested data available in OneLake so that you can access the same table from a notebook later in the tutorial.

1. In your workspace, open the eventhouse that you created in the prerequisites, and then select the database where you want to store your data.
1. In the **Database details** pane, set **OneLake availability** to **On**.

    :::image type="content" source="media/multivariate-anomaly-detection/one-lake-availability.png" alt-text="Screenshot of enabling OneLake availability in your eventhouse.":::

## Part 2: Turn on the KQL Python plugin

In this step, you turn on the Python plugin in your eventhouse. This step is required to run the Python code in the KQL queryset in [Part 9: Predict anomalies in a KQL queryset](#part-9-predict-anomalies-in-a-kql-queryset). Select the Python image that includes the [time-series-anomaly-detector](https://pypi.org/project/time-series-anomaly-detector/) package.

1. In the eventhouse, select **Eventhouse** > **Plugins** on the ribbon.
1. In the **Plugins** pane, set **Python language extension** to **On**.
1. Select **Python 3.11.7 DL**.
1. Select **Done**.

    :::image type="content" source="media/multivariate-anomaly-detection/python-package.png" alt-text="Screenshot showing how to enable the Python 3.11.7 DL package in the eventhouse." lightbox="media/multivariate-anomaly-detection/python-package.png":::

## Part 3: Create a Spark environment

In this step, you create a Spark environment to run the notebook that trains the multivariate anomaly detection model. For more information, see [Create and manage environments](../data-engineering/create-and-use-environment.md).

1. From your workspace, select **+ New item**, and then select **Environment**.

    :::image type="content" source="media/multivariate-anomaly-detection/create-environment.png" alt-text="Screenshot of the Environment tile in New item window." lightbox="media/multivariate-anomaly-detection/create-environment.png":::

1. Enter `MVAD_ENV` for the environment name, and then select **Create**.
1. Under **Libraries**, select **Public libraries**.
1. Select **Add from PyPI**.
1. In the search box, enter `time-series-anomaly-detector`. In the **Version** box, enter `0.3.9`.
1. Select **Save**.

    :::image type="content" source="media/multivariate-anomaly-detection/add-package.png" alt-text="Screenshot of adding the PyPI package to the Spark environment." lightbox="media/multivariate-anomaly-detection/add-package.png":::

1. Select the **Home** tab in the environment.
1. Select the **Publish** icon from the ribbon. :::image type="icon" source="media/multivariate-anomaly-detection/publish-icon.png" border="false":::
1. Select **Publish all**. This step can take several minutes to complete.

    :::image type="content" source="media/multivariate-anomaly-detection/publish-environment.png" alt-text="Screenshot of publishing the environment.":::

## Part 4: Load data into the eventhouse

1. In the eventhouse, hover over the KQL database where you want to store your data, and then select **More menu [...]** > **Get data** > **Local file**.

    :::image type="content" source="media/multivariate-anomaly-detection/local-file.png" alt-text="Screenshot of get data from local file.":::

1. Select **+ New table**, and enter `demo_stocks_change` as the table name.
1. In the upload dialog, select **Browse for files**, and upload the sample data file that you downloaded in [Prerequisites](#prerequisites).
1. Select **Next**.
1. In the **Inspect the data** section, verify that **First row is column header** is set to **On**.
1. Select **Finish**.
1. When the data is uploaded, select **Close**.

## Part 5: Copy the OneLake path

Select the `demo_stocks_change` table. In the **Table details** pane, select **OneLake folder** to copy the OneLake path to your clipboard. Save the path in a text editor for later use.

:::image type="content" source="media/multivariate-anomaly-detection/copy-path.png" alt-text="Screenshot of copying the OneLake path.":::

## Part 6: Prepare the notebook

1. Select your workspace.
1. Select **Import** > **Notebook** > **From this computer**.
1. Select **Upload**, and choose the notebook you downloaded in [Prerequisites](#prerequisites).
1. After the notebook is uploaded, you can find and open your notebook from your workspace.
1. On the top ribbon, select the **Workspace default** drop-down list, and then select the environment you created in the previous step.

    :::image type="content" source="media/multivariate-anomaly-detection/select-environment.png" alt-text="Screenshot of selecting the environment in the notebook.":::

## Part 7: Run the notebook

1. Import standard packages.

    ```python
    import numpy as np
    import pandas as pd
    ```

1. Spark needs an ABFSS URI to securely connect to OneLake storage, so define a helper function that converts the OneLake URI to an ABFSS URI.

    ```python
    def convert_onelake_to_abfss(onelake_uri):
        if not onelake_uri.startswith('https://'):
            raise ValueError("Invalid OneLake URI. It should start with 'https://'.")
        uri_without_scheme = onelake_uri[8:]
        parts = uri_without_scheme.split('/')
        if len(parts) < 3:
            raise ValueError("Invalid OneLake URI format.")
        container_name = parts[1]
        path = '/'.join(parts[2:])
        abfss_uri = f"abfss://{container_name}@{parts[0]}/{path}"
        return abfss_uri
    ```

1. Replace `OneLakeTableURI` with the OneLake URI that you copied in [Part 5: Copy the OneLake path](#part-5-copy-the-onelake-path), and then load the `demo_stocks_change` table into a pandas dataframe.

    ```python
    onelake_uri = "OneLakeTableURI"  # Replace with your OneLake table URI.
    abfss_uri = convert_onelake_to_abfss(onelake_uri)
    print(abfss_uri)
    ```

    ```python
    df = spark.read.format('delta').load(abfss_uri)
    df = df.toPandas()
    df['Date'] = pd.to_datetime(df['Date'])
    df = df.set_index('Date').sort_index()
    print(df.shape)
    df.head(3)
    ```

1. Run the following cells to prepare the training and prediction dataframes.

    > [!NOTE]
    > The actual predictions run in the eventhouse in [Part 9: Predict anomalies in a KQL queryset](#part-9-predict-anomalies-in-a-kql-queryset). In a production scenario, you typically score new streaming data. In this tutorial, the dataset is split by date into training and prediction ranges to simulate historical and incoming data.

    ```python
    features_cols = ['AAPL', 'AMZN', 'GOOG', 'MSFT', 'SPY']
    cutoff_date = pd.Timestamp('2023-01-01')
    ```

    ```python
    train_df = df.loc[df.index < cutoff_date, features_cols]
    print(train_df.shape)
    train_df.head(3)
    ```

    ```python
    train_len = len(train_df)
    predict_len = len(df) - train_len
    print(f'Total samples: {len(df)}. Split to {train_len} for training, {predict_len} for testing')
    ```

1. Run the cells to train the model and save it in the Fabric MLflow model registry.

    ```python
    from anomaly_detector import MultivariateAnomalyDetector
    model = MultivariateAnomalyDetector()
    ```

    ```python
    sliding_window = 200
    params = {"sliding_window": sliding_window}
    ```

    ```python
    model.fit(train_df, params=params)
    ```

    ```python
    model_name = "mvad_5_stocks_model"
    ```

    ```python
    import mlflow

    with mlflow.start_run():
        mlflow.log_params(params)
        mlflow.set_tag("Training Info", "MVAD on 5 Stocks Dataset")

        model_info = mlflow.pyfunc.log_model(
            python_model=model,
            artifact_path="mvad_artifacts",
            registered_model_name=model_name,
        )
    ```

1. Run the following cell to get the registered model path that you use later for prediction in the KQL Python sandbox.

    ```python
    from mlflow.tracking import MlflowClient
    
    client = MlflowClient()
    mvs = client.search_model_versions(f"name='{model_name}'")
    latest = max(mvs, key=lambda v: v.creation_timestamp)
    model_abfss = latest.source
    print(model_abfss)
    ```

1. Copy the model URI from the output of the last cell. You use it in Part 9.

## Part 8: Create a KQL queryset

For general information, see [Create a KQL queryset](create-query-set.md).

1. In your workspace, select **+ New item** > **KQL Queryset**.
1. Enter `MultivariateAnomalyDetectionTutorial`, and then select **Create**.
1. In the **OneLake catalog** window, select the KQL database where you stored the data.
1. Select **Connect**.

## Part 9: Predict anomalies in a KQL queryset

1. Run the following `.create-or-alter function` query to define the `predict_fabric_mvad_fl()` stored function:

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
            work_dir = os.environ.get("UPLOAD_PATH")
            model_dir = work_dir + '/mvad_model'
            model_data_dir = model_dir + '/data'
            os.mkdir(model_dir)
            shutil.move(work_dir + '/MLmodel', model_dir)
            shutil.move(work_dir + '/conda.yaml', model_dir)
            shutil.move(work_dir + '/requirements.txt', model_dir)
            shutil.move(work_dir + '/python_env.yaml', model_dir)
            shutil.move(work_dir + '/python_model.pkl', model_dir)
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

1. Run the following prediction query. Replace `enter your model URI here` with the URI that you copied at the end of [Part 7: Run the notebook](#part-7-run-the-notebook).

    The query detects multivariate anomalies across the five stocks by using the trained model, and then renders the results as an `anomalychart`. The anomalous points are displayed on the first stock (`AAPL`), but they represent anomalies in the joint behavior of all five stocks on a given date.

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
                artifacts_uri='enter your model URI here',
                trim_result=true)
    | summarize Date=make_list(Date), AAPL=make_list(AAPL), AMZN=make_list(AMZN), GOOG=make_list(GOOG), MSFT=make_list(MSFT), SPY=make_list(SPY), anomaly=make_list(toint(is_anomaly))
    | render anomalychart with(anomalycolumns=anomaly, title='Stock price changes in % with anomalies')
    ```

The resulting anomaly chart resembles the following image:

:::image type="content" source="media/multivariate-anomaly-detection/kql-query-output.png" alt-text="Screenshot of multivariate anomaly output." lightbox="media/multivariate-anomaly-detection/kql-query-output.png":::

## Clean up resources

When you finish the tutorial, delete the resources that you created to avoid unnecessary costs:

1. Browse to your workspace homepage.
1. Delete the environment created in this tutorial.
1. Delete the notebook created in this tutorial.
1. Delete the eventhouse or [database](manage-monitor-database.md#manage-kql-databases) used in this tutorial.
1. Delete the KQL queryset created in this tutorial.

## Related content

- [Multivariate anomaly detection in Microsoft Fabric - overview](multivariate-anomaly-overview.md)
- [Create a KQL queryset](create-query-set.md)
- [Troubleshoot anomaly detection in Real-Time Intelligence](troubleshoot-anomaly-detection.md)
