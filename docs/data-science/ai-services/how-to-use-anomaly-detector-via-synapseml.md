---
title: Use anomaly detector with synapseml
description: How to use prebuilt anomaly detector in Fabric with SynapseML
ms.reviewer: mopeakande
ms.author: ruxu
author: ruixinxu
ms.topic: how-to
ms.custom: ignite-2023
ms.date: 10/18/2023
ms.search.form:
---

# Use prebuilt Anomaly Detector in Fabric with SynapseML

[Anomaly Detector](https://learn.microsoft.com/azure/ai-services/anomaly-detector/overview) is an [Azure AI services](https://learn.microsoft.com/azure/ai-services/) with a set of
APIs, which enables you to monitor and detect anomalies in your time series data with little machine learning (ML) knowledge, either batch validation or real-time inference.

This tutorial demonstrates following features using Anomaly Detector in Fabric with SynapseML:

-   Anomaly status of latest point: generates a model using preceding points and determines whether the latest point is anomalous.
-   Find anomalies: generates a model using an entire series and finds anomalies in the series.
-   Change point detection: discovers tend changes in the time series.

## Prerequisites

``` Python
import synapse.ml.core
from synapse.ml.cognitive.anomaly import *
from pyspark.sql.functions import col
```

## Detect anomaly status of the latest point in time series

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

### Output

``` json

{"fields":[{"name":"group"},{"name":"inputs"},{"name":"errors"},{"name":"anomalies"}],"rows":[{"group":"1","inputs":[{"timestamp":"1972-01-01T00:00:00Z","value":826},{"timestamp":"1972-02-01T00:00:00Z","value":799},{"timestamp":"1972-03-01T00:00:00Z","value":890},{"timestamp":"1972-04-01T00:00:00Z","value":900},{"timestamp":"1972-05-01T00:00:00Z","value":766},{"timestamp":"1972-06-01T00:00:00Z","value":805},{"timestamp":"1972-07-01T00:00:00Z","value":821},{"timestamp":"1972-08-01T00:00:00Z","value":20000},{"timestamp":"1972-09-01T00:00:00Z","value":883},{"timestamp":"1972-10-01T00:00:00Z","value":898},{"timestamp":"1972-11-01T00:00:00Z","value":957},{"timestamp":"1972-12-01T00:00:00Z","value":924},{"timestamp":"1973-01-01T00:00:00Z","value":881},{"timestamp":"1973-02-01T00:00:00Z","value":837},{"timestamp":"1973-03-01T00:00:00Z","value":90000}],"errors":"NULL","anomalies":{"suggestedWindow":13,"expectedValue":-3733.5143090984534,"lowerMargin":0.9461199413545784,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.7477715810743361,"upperMargin":0.9461199413545784,"isNegativeAnomaly":false,"period":0}}]}
```

## Find anomalies for the entire series in batch

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

### Output

``` json
{"fields":[{"name":"group"},{"name":"inputs"},{"name":"DetectAnomalies_98683ee8eaff_error"},{"name":"anomalies"}],"rows":[{"group":"1","inputs":[{"timestamp":"1972-01-01T00:00:00Z","value":826},{"timestamp":"1972-02-01T00:00:00Z","value":799},{"timestamp":"1972-03-01T00:00:00Z","value":890},{"timestamp":"1972-04-01T00:00:00Z","value":900},{"timestamp":"1972-05-01T00:00:00Z","value":766},{"timestamp":"1972-06-01T00:00:00Z","value":805},{"timestamp":"1972-07-01T00:00:00Z","value":821},{"timestamp":"1972-08-01T00:00:00Z","value":20000},{"timestamp":"1972-09-01T00:00:00Z","value":883},{"timestamp":"1972-10-01T00:00:00Z","value":898},{"timestamp":"1972-11-01T00:00:00Z","value":957},{"timestamp":"1972-12-01T00:00:00Z","value":924},{"timestamp":"1973-01-01T00:00:00Z","value":881},{"timestamp":"1973-02-01T00:00:00Z","value":837},{"timestamp":"1973-03-01T00:00:00Z","value":90000}],"DetectAnomalies_98683ee8eaff_error":"NULL","anomalies":{"isPositiveAnomaly":[false,false,false,false,false,false,false,true,false,false,false,false,false,false,true],"expectedValues":[839.8037249928111,837.3507700954189,834.8978151980266,832.4448603006343,812.6636801151691,814.55985377689,831.4793189027447,855.8914357169447,880.8749128917688,901.9458528917621,915.2297066295373,916.8519250177061,908.7687766436836,900.6856282696613,892.6024798956389],"isAnomaly":[false,false,false,false,false,false,false,true,false,false,false,false,false,false,true],"upperMargins":[4.64382821282928,12.826115256492757,55.229576504415526,67.68234743019048,15.596468085826663,3.228573377408513,3.535484739321555,0.2579324479620702,2.2559270930003885,1.3594243990104207,41.90370996476218,7.281613242972498,9.300569556078054,21.272651352694584,0.2634391045888744],"severity":[0,0,0,0,0,0,0,0.6881313708969095,0,0,0,0,0,0,0.8430749988936319],"isNegativeAnomaly":[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],"period":0,"lowerMargins":[13.931484638487838,38.478345769478274,18.409858834805174,22.560782476730157,46.78940425747999,9.685720132225539,10.606454217964664,0.2579324479620702,0.7519756976667962,4.078273197031262,13.967903321587393,2.4272044143241662,27.901708668234164,63.81795405808376,0.2634391045888744]}}]}

```

## Find trend change point for the entire series in batch.

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

### Output

``` json
{"fields":[{"name":"timestamp"},{"name":"value"},{"name":"group"},{"name":"SimpleDetectAnomalies_0a347f3aa311_error"},{"name":"anomalies"},{"name":"isAnomaly"}],"rows":[{"timestamp":"1972-01-01T00:00:00Z","value":"826.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":839.8037249928111,"lowerMargin":13.931484638487838,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":4.64382821282928,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-02-01T00:00:00Z","value":"799.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":837.3507700954189,"lowerMargin":38.478345769478274,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":12.826115256492757,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-03-01T00:00:00Z","value":"890.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":834.8978151980266,"lowerMargin":18.409858834805174,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":55.229576504415526,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-04-01T00:00:00Z","value":"900.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":832.4448603006343,"lowerMargin":22.560782476730157,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":67.68234743019048,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-05-01T00:00:00Z","value":"766.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":812.6636801151691,"lowerMargin":46.78940425747999,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":15.596468085826663,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-06-01T00:00:00Z","value":"805.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":814.55985377689,"lowerMargin":9.685720132225539,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.228573377408513,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-07-01T00:00:00Z","value":"821.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":831.4793189027447,"lowerMargin":10.606454217964664,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.535484739321555,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-08-01T00:00:00Z","value":"20000.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":855.8914357169447,"lowerMargin":0.2579324479620702,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.6881313708969095,"upperMargin":0.2579324479620702,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-09-01T00:00:00Z","value":"883.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":880.8749128917688,"lowerMargin":0.7519756976667962,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":2.2559270930003885,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-10-01T00:00:00Z","value":"898.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":901.9458528917621,"lowerMargin":4.078273197031262,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":1.3594243990104207,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-11-01T00:00:00Z","value":"957.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":915.2297066295373,"lowerMargin":13.967903321587393,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":41.90370996476218,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-12-01T00:00:00Z","value":"924.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":916.8519250177061,"lowerMargin":2.4272044143241662,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":7.281613242972498,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-01-01T00:00:00Z","value":"881.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":908.7687766436836,"lowerMargin":27.901708668234164,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":9.300569556078054,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-02-01T00:00:00Z","value":"837.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":900.6856282696613,"lowerMargin":63.81795405808376,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":21.272651352694584,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-03-01T00:00:00Z","value":"90000.0","group":"1.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":892.6024798956389,"lowerMargin":0.2634391045888744,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.8430749988936319,"upperMargin":0.2634391045888744,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-01-01T00:00:00Z","value":"826.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":839.8037249928111,"lowerMargin":13.931484638487838,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":4.64382821282928,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-02-01T00:00:00Z","value":"799.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":837.3507700954189,"lowerMargin":38.478345769478274,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":12.826115256492757,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-03-01T00:00:00Z","value":"890.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":834.8978151980266,"lowerMargin":18.409858834805174,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":55.229576504415526,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-04-01T00:00:00Z","value":"900.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":832.4448603006343,"lowerMargin":22.560782476730157,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":67.68234743019048,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-05-01T00:00:00Z","value":"766.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":812.6636801151691,"lowerMargin":46.78940425747999,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":15.596468085826663,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-06-01T00:00:00Z","value":"805.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":814.55985377689,"lowerMargin":9.685720132225539,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.228573377408513,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-07-01T00:00:00Z","value":"821.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":831.4793189027447,"lowerMargin":10.606454217964664,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":3.535484739321555,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-08-01T00:00:00Z","value":"20000.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":855.8914357169447,"lowerMargin":0.2579324479620702,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.6881313708969095,"upperMargin":0.2579324479620702,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"},{"timestamp":"1972-09-01T00:00:00Z","value":"883.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":880.8749128917688,"lowerMargin":0.7519756976667962,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":2.2559270930003885,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-10-01T00:00:00Z","value":"898.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":901.9458528917621,"lowerMargin":4.078273197031262,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":1.3594243990104207,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-11-01T00:00:00Z","value":"957.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":915.2297066295373,"lowerMargin":13.967903321587393,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":41.90370996476218,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1972-12-01T00:00:00Z","value":"924.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":916.8519250177061,"lowerMargin":2.4272044143241662,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":7.281613242972498,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-01-01T00:00:00Z","value":"881.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":908.7687766436836,"lowerMargin":27.901708668234164,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":9.300569556078054,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-02-01T00:00:00Z","value":"837.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":900.6856282696613,"lowerMargin":63.81795405808376,"isPositiveAnomaly":false,"isAnomaly":false,"severity":0,"upperMargin":21.272651352694584,"isNegativeAnomaly":false,"period":0},"isAnomaly":"false"},{"timestamp":"1973-03-01T00:00:00Z","value":"90000.0","group":"2.0","SimpleDetectAnomalies_0a347f3aa311_error":"NULL","anomalies":{"expectedValue":892.6024798956389,"lowerMargin":0.2634391045888744,"isPositiveAnomaly":true,"isAnomaly":true,"severity":0.8430749988936319,"upperMargin":0.2634391045888744,"isNegativeAnomaly":false,"period":0},"isAnomaly":"true"}]}

```

## Next steps

- [Use prebuilt Anomaly Detector in Fabric with REST API](how-to-use-anomaly-detector-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with REST API](how-to-use-text-analytics-via-rest-api.md)
- [Use prebuilt Text Analytics in Fabric with SynapseML](how-to-use-text-analytics-via-synapseml.md)
- [Use prebuilt Azure AI Translator in Fabric with REST API](how-to-use-text-translator-via-rest-api.md)
- [Use prebuilt Azure AI Translator in Fabric with SynapseML](how-to-use-text-translator-via-synapseml.md)
- [Use prebuilt Azure OpenAI in Fabric with REST API](how-to-use-openai-via-rest-api.md)
- [Use prebuilt Azure OpenAI in Fabric with Python SDK](how-to-use-openai-via-python-sdk.md)
- [Use prebuilt Azure OpenAI in Fabric with SynapseML](how-to-use-openai-via-synapseml.md)
