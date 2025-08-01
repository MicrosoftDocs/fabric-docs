---
title: Use AI services with SynapseML in Microsoft Fabric
description: Enrich your data with artificial intelligence (AI) in Azure Synapse Analytics using pretrained models from Azure AI services.
ms.topic: how-to
ms.custom: 
ms.author: scottpolly
author: s-polly
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 12/12/2023
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---

# Use Azure AI services with SynapseML in Microsoft Fabric

[Azure AI services](https://azure.microsoft.com/products/ai-services/) help developers and organizations rapidly create intelligent, cutting-edge, market-ready, and responsible applications with out-of-the-box and pre-built and customizable APIs and models. In this article, you'll use the various services available in Azure AI services to perform tasks that include: text analytics, translation, document intelligence, vision, image search, speech to text and text to speech conversion, anomaly detection, and data extraction from web APIs.

The goal of Azure AI services is to help developers create applications that can see, hear, speak, understand, and even begin to reason. The catalog of services within Azure AI services can be categorized into five main pillars: [Vision](https://azure.microsoft.com/products/ai-services/ai-vision/), [Speech](https://azure.microsoft.com/products/ai-services/ai-speech/), [Language](https://azure.microsoft.com/products/ai-services/text-analytics/), [Web search](https://www.microsoft.com/bing/apis/bing-image-search-api), and [Decision](https://azure.microsoft.com//products/ai-services/ai-anomaly-detector).

## Prerequisites

[!INCLUDE [prerequisites](includes/prerequisites.md)]

* Create [a new notebook](../data-engineering/how-to-use-notebook.md#create-notebooks).
* Attach your notebook to a lakehouse. On the left side of your notebook, select **Add** to add an existing lakehouse or create a new one.
* Obtain an Azure AI services key by following [Quickstart: Create a multi-service resource for Azure AI services](/azure/ai-services/multi-service-resource).  Copy the value of the key to use in the code samples below.

## Prepare your system

To begin, import required libraries and initialize your Spark session.

```python
from pyspark.sql.functions import udf, col
from synapse.ml.io.http import HTTPTransformer, http_udf
from requests import Request
from pyspark.sql.functions import lit
from pyspark.ml import PipelineModel
from pyspark.sql.functions import col
import os
```

```python
from pyspark.sql import SparkSession
from synapse.ml.core.platform import *

# Bootstrap Spark Session
spark = SparkSession.builder.getOrCreate()
```

Import Azure AI services libraries and replace the keys and locations in the following code snippet with your Azure AI services key and location.

```python
from synapse.ml.cognitive import *

# A general Azure AI services key for Text Analytics, Vision and Document Intelligence (or use separate keys that belong to each service)
service_key = "<YOUR-KEY-VALUE>" # Replace <YOUR-KEY-VALUE> with your Azure AI service key, check prerequisites for more details
service_loc = "eastus"

# A Bing Search v7 subscription key
bing_search_key =  "<YOUR-KEY-VALUE>" # Replace <YOUR-KEY-VALUE> with your Bing v7 subscription key, check prerequisites for more details

# An Anomaly Detector subscription key
anomaly_key = <"YOUR-KEY-VALUE"> # Replace <YOUR-KEY-VALUE> with your anomaly service key, check prerequisites for more details
anomaly_loc = "westus2"

# A Translator subscription key
translator_key = "<YOUR-KEY-VALUE>" # Replace <YOUR-KEY-VALUE> with your translator service key, check prerequisites for more details
translator_loc = "eastus"

# An Azure search key
search_key = "<YOUR-KEY-VALUE>" # Replace <YOUR-KEY-VALUE> with your search key, check prerequisites for more details
```

## Perform sentiment analysis on text

The [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/) service provides several algorithms for extracting intelligent insights from text. For example, you can use the service to find the sentiment of some input text. The service will return a score between 0.0 and 1.0, where low scores indicate negative sentiment and high scores indicate positive sentiment.

The following code sample returns the sentiment for three simple sentences.

```python
# Create a dataframe that's tied to it's column names
df = spark.createDataFrame(
    [
        ("I am so happy today, its sunny!", "en-US"),
        ("I am frustrated by this rush hour traffic", "en-US"),
        ("The cognitive services on spark aint bad", "en-US"),
    ],
    ["text", "language"],
)

# Run the Text Analytics service with options
sentiment = (
    TextSentiment()
    .setTextCol("text")
    .setLocation(service_loc)
    .setSubscriptionKey(service_key)
    .setOutputCol("sentiment")
    .setErrorCol("error")
    .setLanguageCol("language")
)

# Show the results of your text query in a table format
display(
    sentiment.transform(df).select(
        "text", col("sentiment.document.sentiment").alias("sentiment")
    )
)
```

## Perform text analytics for health data

The [Text Analytics for Health Service](/azure/ai-services/language-service/text-analytics-for-health/overview?tabs=ner) extracts and labels relevant medical information from unstructured text such as doctor's notes, discharge summaries, clinical documents, and electronic health records.

The following code sample analyzes and transforms text from doctors notes into structured data.

```python
df = spark.createDataFrame(
    [
        ("20mg of ibuprofen twice a day",),
        ("1tsp of Tylenol every 4 hours",),
        ("6-drops of Vitamin B-12 every evening",),
    ],
    ["text"],
)

healthcare = (
    AnalyzeHealthText()
    .setSubscriptionKey(service_key)
    .setLocation(service_loc)
    .setLanguage("en")
    .setOutputCol("response")
)

display(healthcare.transform(df))
```

## Translate text into a different language
[Translator](https://azure.microsoft.com/products/ai-services/translator/) is a cloud-based machine translation service and is part of the Azure AI services family of cognitive APIs used to build intelligent apps. Translator is easy to integrate in your applications, websites, tools, and solutions. It allows you to add multi-language user experiences in 90 languages and dialects and can be used for text translation with any operating system.

The following code sample does a simple text translation by providing the sentences you want to translate and target languages you want to translate them to.


```python
from pyspark.sql.functions import col, flatten

# Create a dataframe including sentences you want to translate
df = spark.createDataFrame(
    [(["Hello, what is your name?", "Bye"],)],
    [
        "text",
    ],
)

# Run the Translator service with options
translate = (
    Translate()
    .setSubscriptionKey(translator_key)
    .setLocation(translator_loc)
    .setTextCol("text")
    .setToLanguage(["zh-Hans"])
    .setOutputCol("translation")
)

# Show the results of the translation.
display(
    translate.transform(df)
    .withColumn("translation", flatten(col("translation.translations")))
    .withColumn("translation", col("translation.text"))
    .select("translation")
)
```

## Extract information from a document into structured data
[Azure AI Document Intelligence](https://azure.microsoft.com/products/ai-services/ai-document-intelligence/) is a part of Azure AI services that lets you build automated data processing software using machine learning technology. With Azure AI Document Intelligence, you can identify and extract text, key/value pairs, selection marks, tables, and structure from your documents. The service outputs structured data that includes the relationships in the original file, bounding boxes, confidence and more.

The following code sample analyzes a business card image and extracts its information into structured data.

```python
from pyspark.sql.functions import col, explode

# Create a dataframe containing the source files
imageDf = spark.createDataFrame(
    [
        (
            "https://mmlspark.blob.core.windows.net/datasets/FormRecognizer/business_card.jpg",
        )
    ],
    [
        "source",
    ],
)

# Run the Form Recognizer service
analyzeBusinessCards = (
    AnalyzeBusinessCards()
    .setSubscriptionKey(service_key)
    .setLocation(service_loc)
    .setImageUrlCol("source")
    .setOutputCol("businessCards")
)

# Show the results of recognition.
display(
    analyzeBusinessCards.transform(imageDf)
    .withColumn(
        "documents", explode(col("businessCards.analyzeResult.documentResults.fields"))
    )
    .select("source", "documents")
)
```

## Analyze and tag images

[Computer Vision](https://azure.microsoft.com/products/ai-services/ai-vision/) analyzes images to identify structure such as faces, objects, and natural-language descriptions.

The following code sample analyzes images and labels them with *tags*. Tags are one-word descriptions of things in the image, such as recognizable objects, people, scenery, and actions.

```python
# Create a dataframe with the image URLs
base_url = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-sample-data-files/master/ComputerVision/Images/"
df = spark.createDataFrame(
    [
        (base_url + "objects.jpg",),
        (base_url + "dog.jpg",),
        (base_url + "house.jpg",),
    ],
    [
        "image",
    ],
)

# Run the Computer Vision service. Analyze Image extracts information from/about the images.
analysis = (
    AnalyzeImage()
    .setLocation(service_loc)
    .setSubscriptionKey(service_key)
    .setVisualFeatures(
        ["Categories", "Color", "Description", "Faces", "Objects", "Tags"]
    )
    .setOutputCol("analysis_results")
    .setImageUrlCol("image")
    .setErrorCol("error")
)

# Show the results of what you wanted to pull out of the images.
display(analysis.transform(df).select("image", "analysis_results.description.tags"))
```

## Search for images that are related to a natural language query

[Bing Image Search](https://www.microsoft.com/bing/apis/bing-image-search-api) searches the web to retrieve images related to a user's natural language query. 

The following code sample uses a text query that looks for images with quotes. The output of the code is a list of image URLs that contain photos related to the query.

```python
# Number of images Bing will return per query
imgsPerBatch = 10
# A list of offsets, used to page into the search results
offsets = [(i * imgsPerBatch,) for i in range(100)]
# Since web content is our data, we create a dataframe with options on that data: offsets
bingParameters = spark.createDataFrame(offsets, ["offset"])

# Run the Bing Image Search service with our text query
bingSearch = (
    BingImageSearch()
    .setSubscriptionKey(bing_search_key)
    .setOffsetCol("offset")
    .setQuery("Martin Luther King Jr. quotes")
    .setCount(imgsPerBatch)
    .setOutputCol("images")
)

# Transformer that extracts and flattens the richly structured output of Bing Image Search into a simple URL column
getUrls = BingImageSearch.getUrlTransformer("images", "url")

# This displays the full results returned, uncomment to use
# display(bingSearch.transform(bingParameters))

# Since we have two services, they are put into a pipeline
pipeline = PipelineModel(stages=[bingSearch, getUrls])

# Show the results of your search: image URLs
display(pipeline.transform(bingParameters))
```

## Transform speech to text
The [Speech-to-text](https://azure.microsoft.com/products/ai-services/ai-speech/) service converts streams or files of spoken audio to text. The following code sample transcribes one audio file to text.

```python
# Create a dataframe with our audio URLs, tied to the column called "url"
df = spark.createDataFrame(
    [("https://mmlspark.blob.core.windows.net/datasets/Speech/audio2.wav",)], ["url"]
)

# Run the Speech-to-text service to translate the audio into text
speech_to_text = (
    SpeechToTextSDK()
    .setSubscriptionKey(service_key)
    .setLocation(service_loc)
    .setOutputCol("text")
    .setAudioDataCol("url")
    .setLanguage("en-US")
    .setProfanity("Masked")
)

# Show the results of the translation
display(speech_to_text.transform(df).select("url", "text.DisplayText"))
```

## Transform text to speech
[Text to speech](https://azure.microsoft.com/products/ai-services/text-to-speech/#overview) is a service that allows you to build apps and services that speak naturally, choosing from more than 270 neural voices across 119 languages and variants.

The following code sample transforms text into an audio file that contains the content of the text.

```python
from synapse.ml.cognitive import TextToSpeech

fs = ""
if running_on_databricks():
    fs = "dbfs:"
elif running_on_synapse_internal():
    fs = "Files"

# Create a dataframe with text and an output file location
df = spark.createDataFrame(
    [
        (
            "Reading out loud is fun! Check out aka.ms/spark for more information",
            fs + "/output.mp3",
        )
    ],
    ["text", "output_file"],
)

tts = (
    TextToSpeech()
    .setSubscriptionKey(service_key)
    .setTextCol("text")
    .setLocation(service_loc)
    .setVoiceName("en-US-JennyNeural")
    .setOutputFileCol("output_file")
)

# Check to make sure there were no errors during audio creation
display(tts.transform(df))
```

## Detect anomalies in time series data

[Anomaly Detector](https://azure.microsoft.com/products/ai-services/ai-anomaly-detector) is great for detecting irregularities in your time series data. The following code sample uses the Anomaly Detector service to find anomalies in entire time series data.

```python
# Create a dataframe with the point data that Anomaly Detector requires
df = spark.createDataFrame(
    [
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
        ("1973-03-01T00:00:00Z", 9000.0),
    ],
    ["timestamp", "value"],
).withColumn("group", lit("series1"))

# Run the Anomaly Detector service to look for irregular data
anamoly_detector = (
    SimpleDetectAnomalies()
    .setSubscriptionKey(anomaly_key)
    .setLocation(anomaly_loc)
    .setTimestampCol("timestamp")
    .setValueCol("value")
    .setOutputCol("anomalies")
    .setGroupbyCol("group")
    .setGranularity("monthly")
)

# Show the full results of the analysis with the anomalies marked as "True"
display(
    anamoly_detector.transform(df).select("timestamp", "value", "anomalies.isAnomaly")
)
```

## Get information from arbitrary web APIs

With HTTP on Spark, you can use any web service in your big data pipeline. The following code sample uses the [World Bank API](http://api.worldbank.org/v2/country/) to get information about various countries/regions around the world.

```python
# Use any requests from the python requests library


def world_bank_request(country):
    return Request(
        "GET", "http://api.worldbank.org/v2/country/{}?format=json".format(country)
    )


# Create a dataframe with specifies which countries we want data on
df = spark.createDataFrame([("br",), ("usa",)], ["country"]).withColumn(
    "request", http_udf(world_bank_request)(col("country"))
)

# Much faster for big data because of the concurrency :)
client = (
    HTTPTransformer().setConcurrency(3).setInputCol("request").setOutputCol("response")
)

# Get the body of the response


def get_response_body(resp):
    return resp.entity.content.decode()


# Show the details of the country data returned
display(
    client.transform(df).select(
        "country", udf(get_response_body)(col("response")).alias("response")
    )
)
```
## Related content

- [How to perform the same classification task with and without SynapseML](classification-before-and-after-synapseml.md)
- [How to use KNN model with SynapseML](conditional-k-nearest-neighbors-exploring-art.md)
- [How to use ONNX with SynapseML - Deep Learning](onnx-overview.md)
