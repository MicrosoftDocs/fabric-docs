---
title: Use anomaly detector with rest api
description: How to use prebuilt anomaly detector in Fabric with REST API 
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---


# Use prebuilt Anomaly Detector in Fabric with REST API and SynapseML

[Anomaly Detector](https://learn.microsoft.com/azure/ai-services/anomaly-detector/overview) is an [Azure AI services](https://learn.microsoft.com/azure/ai-services/) with a set of
APIs, which enables you to monitor and detect anomalies in your time series data with little machine learning (ML) knowledge, either batch validation or real-time inference.

This tutorial demonstrates following features using Anomaly Detector in Fabric with RESTful API:

-   Anomaly status of latest point: generates a model using preceding points and determines whether the latest point is anomalous.
-   Find anomalies: generates a model using an entire series and finds anomalies in the series.
-   Change point detection: discovers tend changes in the time series.

## Prerequisites

# [Rest API](#tab/rest)

``` python
# Get workload endpoints and access token

from synapse.ml.mlflow import get_mlflow_env_config
import json

mlflow_env_configs = get_mlflow_env_config()
access_token = access_token = mlflow_env_configs.driver_aad_token
prebuilt_AI_base_host = mlflow_env_configs.workload_endpoint + "cognitive/anomalydetector/"
print("Workload endpoint for AI service: \n" + prebuilt_AI_base_host)

# Make a RESTful request to AI service

post_headers = {
    "Content-Type" : "application/json",
    "Authorization" : "Bearer {}".format(access_token),
}

def printresponse(response):
    print(f"HTTP {response.status_code}")
    if response.status_code == 200:
        try:
            result = response.json()
            print(json.dumps(result, indent=2, ensure_ascii=False))
        except:
            print(f"pasre error {response.content}")
    else:
        print(response.headers)
        print(f"error message: {response.content}")
```

# [SynapseML](#tab/synapseml)

``` Python
import synapse.ml.core
from synapse.ml.cognitive.anomaly import *
from pyspark.sql.functions import col
```

---



### Output

# [Rest API](#tab/rest)

``` json 

    Workload endpoint for AI service: 
    https://<your-tenant-id>.pbidedicated.windows.net/webapi/capacities/<your-capacity-id>/workloads/ML/ML/Automatic/workspaceid/<your-workspace-id>/cognitive/anomalydetector/
```

# [SynapseML](#tab/synapseml)


---

## Detect anomaly status of the latest point in time series

# [Rest API](#tab/rest)

This operation generates a model using points before the latest one. With this method, only historical points are used to determine whether the target point is an anomaly. The latest point detecting matches the scenario of real-time monitoring of business metrics.

``` python
import requests
import uuid

service_url = prebuilt_AI_base_host + "anomalydetector/v1.1/timeseries/last/detect"
post_body = {
  "series": [
    {
      "timestamp": "1972-01-01T00:00:00Z",
      "value": 826
    },
    {
      "timestamp": "1972-02-01T00:00:00Z",
      "value": 799
    },
    {
      "timestamp": "1972-03-01T00:00:00Z",
      "value": 890
    },
    {
      "timestamp": "1972-04-01T00:00:00Z",
      "value": 900
    },
    {
      "timestamp": "1972-05-01T00:00:00Z",
      "value": 961
    },
    {
      "timestamp": "1972-06-01T00:00:00Z",
      "value": 935
    },
    {
      "timestamp": "1972-07-01T00:00:00Z",
      "value": 894
    },
    {
      "timestamp": "1972-08-01T00:00:00Z",
      "value": 855
    },
    {
      "timestamp": "1972-09-01T00:00:00Z",
      "value": 809
    },
    {
      "timestamp": "1972-10-01T00:00:00Z",
      "value": 810
    },
    {
      "timestamp": "1972-11-01T00:00:00Z",
      "value": 766
    },
    {
      "timestamp": "1972-12-01T00:00:00Z",
      "value": 805
    },
  ],
  "maxAnomalyRatio": 0.25,
  "sensitivity": 95,
  "granularity": "monthly"
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

# [SynapseML](#tab/synapseml)

This operation generates a model using points before the latest one. With this method, only historical points are used to determine whether the target point is an anomaly. The latest point detecting matches the scenario of real-time monitoring of business metrics.

``` Python
from pyspark.sql.functions import *

df = (spark.createDataFrame([
    ("1972-01-01T00:00:00Z", 826.0),
    ("1972-02-01T00:00:00Z", 799.0),
    ("1972-03-01T00:00:00Z", 890.0),
    ("1972-04-01T00:00:00Z", 900.0),
    ("1972-05-01T00:00:00Z", 766.0),
    ("1972-06-01T00:00:00Z", 805.0),
    ("1972-07-01T00:00:00Z", 821.0),
    ("1972-08-01T00:00:00Z", 20000.0),
    ("1972-09-01T00:00:00Z", 883.0),
    ("1972-10-01T00:00:00Z", 898.0),
    ("1972-11-01T00:00:00Z", 957.0),
    ("1972-12-01T00:00:00Z", 924.0),
    ("1973-01-01T00:00:00Z", 881.0),
    ("1973-02-01T00:00:00Z", 837.0),
    ("1973-03-01T00:00:00Z", 90000.0)
], ["timestamp", "value"])
      .withColumn("group", lit(1))
      .withColumn("inputs", struct(col("timestamp"), col("value")))
      .groupBy(col("group"))
      .agg(sort_array(collect_list(col("inputs"))).alias("inputs")))

dla = (DetectLastAnomaly()
      .setSubscriptionKey(anomaly_key)
      .setLocation(anomaly_loc)
      .setOutputCol("anomalies")
      .setSeriesCol("inputs")
      .setGranularity("monthly")
      .setErrorCol("errors"))

display(dla.transform(df))
```

---

### Output

# [Rest API](#tab/rest)

``` json 
    HTTP 200
    {
      "expectedValue": 775.199125487186,
      "isAnomaly": false,
      "isNegativeAnomaly": false,
      "isPositiveAnomaly": false,
      "lowerMargin": 11.016444326790724,
      "period": 0,
      "severity": 0.0,
      "suggestedWindow": 13,
      "upperMargin": 33.04933298037217
    }
```

# [SynapseML](#tab/synapseml)

``` json

{"fields":[{"name":"group"},{"name":"inputs"},{"name":"errors"},{"name":"anomalies"}],"rows":[{"group":"1","inputs":[{"timestamp":"1972-01-01T00:00:00Z","value":826},{"timestamp":"1972-02-01T00:00:00Z","value":799},{"timestamp":"1972-03-01T00:00:00Z","value":890},{"timestamp":"1972-04-01T00:00:00Z","value":900},{"timestamp":"1972-05-01T00:00:00Z","value":766},{"timestamp":"1972-06-01T00:00:00Z","value":805},{"timestamp":"1972-07-01T00:00:00Z","value":821},{"timestamp":"1972-08-01T00:00:00Z","value":20000},{"timestamp":"1972-09-01T00:00:00Z","value":883},{"timestamp":"1972-10-01T00:00:00Z","value":898},{"timestamp":"1972-11-01T00:00:00Z","value":957},{"timestamp":"1972-12-01T00:00:00Z","value":924},{"timestamp":"1973-01-01T00:00:00Z","value":881},{"timestamp":"1973-02-01T00:00:00Z","value":837},{"timestamp":"1973-03-01T00:00:00Z","value":90000}],"errors":"NULL","anomalies":{"suggestedWindow":13,"expectedValue":-3733.5143090984534,"lowerMargin":0.9461199413545784,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.7477715810743361,"upperMargin":0.9461199413545784,"isNegativeAnomaly":false,"period":0}}]}
```

---

## Find anomalies for the entire series in batch.

# [Rest API](#tab/rest)

This operation generates a model using an entire series, each point is detected with the same model. With this method, points before and after
a certain point are used to determine whether it's an anomaly. The entire detection can give the user an overall status of the time series.

``` python
service_url = prebuilt_AI_base_host + "anomalydetector/v1.1/timeseries/entire/detect"
post_body = { 
  "series": [
  {
    "timestamp": "1972-01-01T00:00:00Z",
    "value": 826
  },
  {
    "timestamp": "1972-02-01T00:00:00Z",
    "value": 799
  },
  {
    "timestamp": "1972-03-01T00:00:00Z",
    "value": 890
  },
  {
    "timestamp": "1972-04-01T00:00:00Z",
    "value": 900
  },
  {
    "timestamp": "1972-05-01T00:00:00Z",
    "value": 961
  },
  {
    "timestamp": "1972-06-01T00:00:00Z",
    "value": 935
  },
  {
    "timestamp": "1972-07-01T00:00:00Z",
    "value": 894
  },
  {
    "timestamp": "1972-08-01T00:00:00Z",
    "value": 855
  },
  {
    "timestamp": "1972-09-01T00:00:00Z",
    "value": 809
  },
  {
    "timestamp": "1972-10-01T00:00:00Z",
    "value": 810
  },
  {
    "timestamp": "1972-11-01T00:00:00Z",
    "value": 766
  },
  {
    "timestamp": "1972-12-01T00:00:00Z",
    "value": 805
  }],
 "maxAnomalyRatio": 0.25,
 "sensitivity": 95,
 "granularity": "monthly"
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, json=post_body, headers=post_headers)

# Output all information of the request process
printresponse(response)
```

# [SynapseML](#tab/synapseml)

This operation generates a model using an entire series, each point is detected with the same model. With this method, points before and after a certain point are used to determine whether it's an anomaly. The entire detection can give the user an overall status of the time series.


``` Python
df = (spark.createDataFrame([
    ("1972-01-01T00:00:00Z", 826.0),
    ("1972-02-01T00:00:00Z", 799.0),
    ("1972-03-01T00:00:00Z", 890.0),
    ("1972-04-01T00:00:00Z", 900.0),
    ("1972-05-01T00:00:00Z", 766.0),
    ("1972-06-01T00:00:00Z", 805.0),
    ("1972-07-01T00:00:00Z", 821.0),
    ("1972-08-01T00:00:00Z", 20000.0),
    ("1972-09-01T00:00:00Z", 883.0),
    ("1972-10-01T00:00:00Z", 898.0),
    ("1972-11-01T00:00:00Z", 957.0),
    ("1972-12-01T00:00:00Z", 924.0),
    ("1973-01-01T00:00:00Z", 881.0),
    ("1973-02-01T00:00:00Z", 837.0),
    ("1973-03-01T00:00:00Z", 90000.0)
], ["timestamp", "value"])
      .withColumn("group", lit(1))
      .withColumn("inputs", struct(col("timestamp"), col("value")))
      .groupBy(col("group"))
      .agg(sort_array(collect_list(col("inputs"))).alias("inputs")))

da = (DetectAnomalies()
      .setOutputCol("anomalies")
      .setSeriesCol("inputs")
      .setGranularity("monthly"))

display(da.transform(df))
```

---


### Output


# [Rest API](#tab/rest)

``` json

    HTTP 200
    {
      "expectedValues": [
        841.281269121734,
        859.045109824718,
        876.808950527702,
        894.572791230686,
        912.33663193367,
        906.1373987703912,
        882.9009599709905,
        850.8438534607341,
        818.1826171648884,
        793.7379187943093,
        769.2932204237303,
        744.8485220531512
      ],
      "isAnomaly": [
        false,
        false,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "isNegativeAnomaly": [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "isPositiveAnomaly": [
        false,
        false,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      "lowerMargins": [
        18.630134702491997,
        63.429503086881965,
        5.536990138622646,
        2.9608857980966357,
        6.981952612763738,
        6.957155680110624,
        4.843714997155346,
        2.5080457629006436,
        12.485285441732676,
        6.505286695264623,
        6.498109907092294,
        21.102492677823204
      ],
      "period": 0,
      "severity": [
        0.0,
        0.0,
        0.0,
        0.0,
        0.07512882276826996,
        0.06669766196257754,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0,
        0.0
      ],
      "upperMargins": [
        6.210044900830666,
        21.143167695627323,
        16.61097041586794,
        8.882657394289907,
        6.981952612763738,
        6.957155680110624,
        14.53114499146604,
        7.52413728870193,
        4.161761813910892,
        19.515860085793868,
        2.166036635697431,
        63.307478033469614
      ]
    }

```

# [SynapseML](#tab/synapseml)

``` json
{"fields":[{"name":"group"},{"name":"inputs"},{"name":"DetectAnomalies_98683ee8eaff_error"},{"name":"anomalies"}],"rows":[{"group":"1","inputs":[{"timestamp":"1972-01-01T00:00:00Z","value":826},{"timestamp":"1972-02-01T00:00:00Z","value":799},{"timestamp":"1972-03-01T00:00:00Z","value":890},{"timestamp":"1972-04-01T00:00:00Z","value":900},{"timestamp":"1972-05-01T00:00:00Z","value":766},{"timestamp":"1972-06-01T00:00:00Z","value":805},{"timestamp":"1972-07-01T00:00:00Z","value":821},{"timestamp":"1972-08-01T00:00:00Z","value":20000},{"timestamp":"1972-09-01T00:00:00Z","value":883},{"timestamp":"1972-10-01T00:00:00Z","value":898},{"timestamp":"1972-11-01T00:00:00Z","value":957},{"timestamp":"1972-12-01T00:00:00Z","value":924},{"timestamp":"1973-01-01T00:00:00Z","value":881},{"timestamp":"1973-02-01T00:00:00Z","value":837},{"timestamp":"1973-03-01T00:00:00Z","value":90000}],"DetectAnomalies_98683ee8eaff_error":"NULL","anomalies":{"isPositiveAnomaly":[false,false,false,false,false,false,false,true,false,false,false,false,false,false,true],"expectedValues":[839.8037249928111,837.3507700954189,834.8978151980266,832.4448603006343,812.6636801151691,814.55985377689,831.4793189027447,855.8914357169447,880.8749128917688,901.9458528917621,915.2297066295373,916.8519250177061,908.7687766436836,900.6856282696613,892.6024798956389],"isAnomaly":[false,false,false,false,false,false,false,true,false,false,false,false,false,false,true],"upperMargins":[4.64382821282928,12.826115256492757,55.229576504415526,67.68234743019048,15.596468085826663,3.228573377408513,3.535484739321555,0.2579324479620702,2.2559270930003885,1.3594243990104207,41.90370996476218,7.281613242972498,9.300569556078054,21.272651352694584,0.2634391045888744],"severity":[0,0,0,0,0,0,0,0.6881313708969095,0,0,0,0,0,0,0.8430749988936319],"isNegativeAnomaly":[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"period":0,"lowerMargins":[13.931484638487838,38.478345769478274,18.409858834805174,22.560782476730157,46.78940425747999,9.685720132225539,10.606454217964664,0.2579324479620702,0.7519756976667962,4.078273197031262,13.967903321587393,2.4272044143241662,27.901708668234164,63.81795405808376,0.2634391045888744]}}]}

```

---

## Find trend change point for the entire series in batch.

# [Rest API](#tab/rest)

This operation generates a model using an entire series, each point is detected with the same model. With this method, points before and after a certain point are used to determine whether it's a trend change point. The entire detection can detect all trend change points of the time series.



``` python
service_url = prebuilt_AI_base_host + "anomalydetector/v1.1/timeseries/changepoint/detect"

post_body = {
    "series": [{
            "value": 116168307,
            "timestamp": "2019-01-01T00:00:00Z"
        },
        {
            "value": 116195090,
            "timestamp": "2019-01-02T00:00:00Z"
        },
        {
            "value": 116219292,
            "timestamp": "2019-01-03T00:00:00Z"
        },
        {
            "value": 116218498,
            "timestamp": "2019-01-04T00:00:00Z"
        },
        {
            "value": 116217643,
            "timestamp": "2019-01-05T00:00:00Z"
        },
        {
            "value": 116234219,
            "timestamp": "2019-01-06T00:00:00Z"
        },
        {
            "value": 116291400,
            "timestamp": "2019-01-07T00:00:00Z"
        },
        {
            "value": 116326509,
            "timestamp": "2019-01-08T00:00:00Z"
        },
        {
            "value": 116323167,
            "timestamp": "2019-01-09T00:00:00Z"
        },
        {
            "value": 116360790,
            "timestamp": "2019-01-10T00:00:00Z"
        },
        {
            "value": 116367491,
            "timestamp": "2019-01-11T00:00:00Z"
        },
        {
            "value": 116371082,
            "timestamp": "2019-01-12T00:00:00Z"
        },
    ],
    "granularity": "daily",
    "customInterval": 1,
    "stableTrendWindow": 5,
    "threshold": 0.9,
    "period": 0
}

post_headers["x-ms-workload-resource-moniker"] = str(uuid.uuid1())
response = requests.post(service_url, headers=post_headers, json=post_body)

# Output all information of the request process
printresponse(response)
```

# [SynapseML](#tab/synapseml)

This operation generates a model using an entire series, each point is detected with the same model. With this method, points before and after
a certain point are used to determine whether it's a trend change point. The entire detection can detect all trend change points of the time series.


``` Python
df = (spark.createDataFrame([
    ("1972-01-01T00:00:00Z", 826.0, 1.0),
    ("1972-02-01T00:00:00Z", 799.0, 1.0),
    ("1972-03-01T00:00:00Z", 890.0, 1.0),
    ("1972-04-01T00:00:00Z", 900.0, 1.0),
    ("1972-05-01T00:00:00Z", 766.0, 1.0),
    ("1972-06-01T00:00:00Z", 805.0, 1.0),
    ("1972-07-01T00:00:00Z", 821.0, 1.0),
    ("1972-08-01T00:00:00Z", 20000.0, 1.0),
    ("1972-09-01T00:00:00Z", 883.0, 1.0),
    ("1972-10-01T00:00:00Z", 898.0, 1.0),
    ("1972-11-01T00:00:00Z", 957.0, 1.0),
    ("1972-12-01T00:00:00Z", 924.0, 1.0),
    ("1973-01-01T00:00:00Z", 881.0, 1.0),
    ("1973-02-01T00:00:00Z", 837.0, 1.0),
    ("1973-03-01T00:00:00Z", 90000.0, 1.0),
    ("1972-01-01T00:00:00Z", 826.0, 2.0),
    ("1972-02-01T00:00:00Z", 799.0, 2.0),
    ("1972-03-01T00:00:00Z", 890.0, 2.0),
    ("1972-04-01T00:00:00Z", 900.0, 2.0),
    ("1972-05-01T00:00:00Z", 766.0, 2.0),
    ("1972-06-01T00:00:00Z", 805.0, 2.0),
    ("1972-07-01T00:00:00Z", 821.0, 2.0),
    ("1972-08-01T00:00:00Z", 20000.0, 2.0),
    ("1972-09-01T00:00:00Z", 883.0, 2.0),
    ("1972-10-01T00:00:00Z", 898.0, 2.0),
    ("1972-11-01T00:00:00Z", 957.0, 2.0),
    ("1972-12-01T00:00:00Z", 924.0, 2.0),
    ("1973-01-01T00:00:00Z", 881.0, 2.0),
    ("1973-02-01T00:00:00Z", 837.0, 2.0),
    ("1973-03-01T00:00:00Z", 90000.0, 2.0)
], ["timestamp", "value", "group"]))

sda = (SimpleDetectAnomalies()
        .setOutputCol("anomalies")
        .setGroupbyCol("group")
        .setGranularity("monthly"))

display(sda.transform(df).withColumn("isAnomaly", col("anomalies.isAnomaly")))
```

---

### Output

# [Rest API](#tab/rest)

``` json 
    HTTP 200
    {
      "confidenceScores": [
        0.0,
        0.0,
        0.002121398923370903,
        0.03952656885710763,
        0.051973862655285384,
        0.014491783644617772,
        0.21164344717072964,
        7.348618515027818e-14,
        0.031603994575194666,
        0.022681790161641336,
        0.018113672790111706,
        0.043980954729251155
      ],
      "isChangePoint": [
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false
      ],
      "period": 0
    }
```

# [SynapseML](#tab/synapseml)

``` json
{"fields":[{"name":"timestamp"},{"name":"value"},{"name":"group"},{"name":"SimpleDetectAnomalies_0a347f3aa311_error"},{"name":"anomalies"},{"name":"isAnomaly"}],"rows":[{"timestamp":"1972-01-01T00:00:00Z","value":"826.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":839.8037249928111,"lowerMargin":13.931484638487838,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":4.64382821282928,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-02-01T00:00:00Z","value":"799.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":837.3507700954189,"lowerMargin":38.478345769478274,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":12.826115256492757,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-03-01T00:00:00Z","value":"890.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":834.8978151980266,"lowerMargin":18.409858834805174,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":55.229576504415526,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-04-01T00:00:00Z","value":"900.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":832.4448603006343,"lowerMargin":22.560782476730157,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":67.68234743019048,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-05-01T00:00:00Z","value":"766.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":812.6636801151691,"lowerMargin":46.78940425747999,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":15.596468085826663,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-06-01T00:00:00Z","value":"805.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":814.55985377689,"lowerMargin":9.685720132225539,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.228573377408513,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-07-01T00:00:00Z","value":"821.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":831.4793189027447,"lowerMargin":10.606454217964664,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.535484739321555,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-08-01T00:00:00Z","value":"20000.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":855.8914357169447,"lowerMargin":0.2579324479620702,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.6881313708969095,"upperMargin":0.2579324479620702,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-09-01T00:00:00Z","value":"883.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":880.8749128917688,"lowerMargin":0.7519756976667962,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":2.2559270930003885,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-10-01T00:00:00Z","value":"898.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":901.9458528917621,"lowerMargin":4.078273197031262,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":1.3594243990104207,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-11-01T00:00:00Z","value":"957.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":915.2297066295373,"lowerMargin":13.967903321587393,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":41.90370996476218,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-12-01T00:00:00Z","value":"924.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":916.8519250177061,"lowerMargin":2.4272044143241662,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":7.281613242972498,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-01-01T00:00:00Z","value":"881.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":908.7687766436836,"lowerMargin":27.901708668234164,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":9.300569556078054,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-02-01T00:00:00Z","value":"837.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":900.6856282696613,"lowerMargin":63.81795405808376,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":21.272651352694584,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-03-01T00:00:00Z","value":"90000.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":892.6024798956389,"lowerMargin":0.2634391045888744,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.8430749988936319,"upperMargin":0.2634391045888744,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-01-01T00:00:00Z","value":"826.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":839.8037249928111,"lowerMargin":13.931484638487838,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":4.64382821282928,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-02-01T00:00:00Z","value":"799.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":837.3507700954189,"lowerMargin":38.478345769478274,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":12.826115256492757,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-03-01T00:00:00Z","value":"890.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":834.8978151980266,"lowerMargin":18.409858834805174,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":55.229576504415526,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-04-01T00:00:00Z","value":"900.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":832.4448603006343,"lowerMargin":22.560782476730157,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":67.68234743019048,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-05-01T00:00:00Z","value":"766.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":812.6636801151691,"lowerMargin":46.78940425747999,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":15.596468085826663,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-06-01T00:00:00Z","value":"805.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":814.55985377689,"lowerMargin":9.685720132225539,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.228573377408513,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-07-01T00:00:00Z","value":"821.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":831.4793189027447,"lowerMargin":10.606454217964664,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.535484739321555,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-08-01T00:00:00Z","value":"20000.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":855.8914357169447,"lowerMargin":0.2579324479620702,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.6881313708969095,"upperMargin":0.2579324479620702,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-09-01T00:00:00Z","value":"883.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":880.8749128917688,"lowerMargin":0.7519756976667962,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":2.2559270930003885,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-10-01T00:00:00Z","value":"898.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":901.9458528917621,"lowerMargin":4.078273197031262,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":1.3594243990104207,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-11-01T00:00:00Z","value":"957.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":915.2297066295373,"lowerMargin":13.967903321587393,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":41.90370996476218,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-12-01T00:00:00Z","value":"924.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":916.8519250177061,"lowerMargin":2.4272044143241662,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":7.281613242972498,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-01-01T00:00:00Z","value":"881.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":908.7687766436836,"lowerMargin":27.901708668234164,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":9.300569556078054,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-02-01T00:00:00Z","value":"837.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":900.6856282696613,"lowerMargin":63.81795405808376,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":21.272651352694584,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-03-01T00:00:00Z","value":"90000.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":892.6024798956389,"lowerMargin":0.2634391045888744,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.8430749988936319,"upperMargin":0.2634391045888744,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"}]}

```

---

## Next steps

- [Use prebuilt Anomaly Detector in Fabric with SynapseML](how-to-use-anomaly-detector-via-synapseml.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics-via-synapseml.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator-via-synapseml.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-via-python-sdk.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-via-synapseml.md)
