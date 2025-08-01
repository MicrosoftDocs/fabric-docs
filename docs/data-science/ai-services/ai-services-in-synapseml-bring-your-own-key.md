---
title: AI services in SynapseML with bring your own key
description: Learn about the capabilities of Azure AI services pretrained models for enriching your data with artificial intelligence (AI) in SynapseML.
ms.topic: overview
ms.custom:
ms.author: ssalgado
author: ssalgadodev
ms.reviewer: jessiwang
reviewer: JessicaXYWang
ms.date: 11/15/2023
ms.update-cycle: 180-days
ms.collection: ce-skilling-ai-copilot
---
# Azure AI services in SynapseML with bring your own key

[SynapseML](../synapse-overview.md) is an open-source library that simplifies the creation of scalable machine learning pipelines and integrates seamlessly with Azure Synapse Analytics. It can handle various machine learning tasks such as text analytics and computer vision, and supports multiple programming languages including Python, R, Scala, Java, and .NET.

[Azure AI services](https://azure.microsoft.com/products/ai-services/) is a suite of APIs, SDKs, and services that developers can use to add cognitive features to their applications, thereby building intelligent applications. AI services empower developers even when they don't have direct AI or data science skills or knowledge. The goal of Azure AI services is to help developers create applications that can see, hear, speak, understand, and even begin to reason. The catalog of services within Azure AI services can be categorized into five main pillars: **Vision**, **Speech**, **Language**, **Web search**, and **Decision**. Fabric uses SynapseML to provide access to these services.


> [!NOTE] 
> Fabric seamlessly integrates with Azure AI services, allowing you to enrich your data with [Azure OpenAI Service](https://azure.microsoft.com/products/ai-services/openai-service/), [Text Analytics](https://azure.microsoft.com/products/ai-services/text-analytics/), [Azure AI Translator](https://azure.microsoft.com/products/ai-services/translator/). This is currently in public preview, for more information about the the prebuilt AI services in Fabric, see [AI services in Fabric](./ai-services-overview.md).


## Usage of Azure AI services with bring your own key

### Vision
[**Azure AI Vision**](https://azure.microsoft.com/products/ai-services/ai-vision/)
- Describe: provides description of an image in human readable language ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/DescribeImage.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.DescribeImage))
- Analyze (color, image type, face, adult/racy content): analyzes visual features of an image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/AnalyzeImage.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.AnalyzeImage))
- OCR: reads text from an image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/OCR.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.OCR))
- Recognize Text: reads text from an image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/RecognizeText.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.RecognizeText))
- Thumbnail: generates a thumbnail of user-specified size from the image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/GenerateThumbnails.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.GenerateThumbnails))
- Recognize domain-specific content: recognizes domain-specific content (celebrity, landmark) ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/RecognizeDomainSpecificContent.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.RecognizeDomainSpecificContent))
- Tag: identifies list of words that are relevant to the input image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/vision/TagImage.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.vision.html#module-synapse.ml.cognitive.vision.TagImage))

[**Azure AI Face**](/azure/ai-services/computer-vision/overview-identity)
- Detect: detects human faces in an image ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/face/DetectFace.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.face.html#module-synapse.ml.cognitive.face.DetectFace))
- Verify: verifies whether two faces belong to a same person, or a face belongs to a person ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/face/VerifyFaces.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.face.html#module-synapse.ml.cognitive.face.VerifyFaces))
- Identify: finds the closest matches of the specific query person face from a person group ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/face/IdentifyFaces.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.face.html#module-synapse.ml.cognitive.face.IdentifyFaces))
- Find similar: finds similar faces to the query face in a face list ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/face/FindSimilarFace.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.face.html#module-synapse.ml.cognitive.face.FindSimilarFace))
- Group: divides a group of faces into disjoint groups based on similarity ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/face/GroupFaces.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.face.html#module-synapse.ml.cognitive.face.GroupFaces))

### Speech
[**Azure AI Speech**](https://azure.microsoft.com/products/ai-services/ai-speech/)
- Speech-to-text: transcribes audio streams ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/speech/SpeechToText.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.speech.html#module-synapse.ml.cognitive.speech.SpeechToText))
- Conversation Transcription: transcribes audio streams into live transcripts with identified speakers. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/speech/ConversationTranscription.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.speech.html#module-synapse.ml.cognitive.speech.ConversationTranscription))
- Text to Speech: Converts text to realistic audio ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/speech/TextToSpeech.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.speech.html#module-synapse.ml.cognitive.speech.TextToSpeech))


### Language
[**Text Analytics**](https://azure.microsoft.com/products/ai-services/text-analytics/)
- Language detection: detects language of the input text ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/text/LanguageDetector.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.text.html#module-synapse.ml.cognitive.text.LanguageDetector))
- Key phrase extraction: identifies the key talking points in the input text ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/text/KeyPhraseExtractor.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.text.html#module-synapse.ml.cognitive.text.KeyPhraseExtractor))
- Named entity recognition: identifies known entities and general named entities in the input text ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/text/NER.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.text.html#module-synapse.ml.cognitive.text.NER))
- Sentiment analysis: returns a score between 0 and 1 indicating the sentiment in the input text ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/text/TextSentiment.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.text.html#module-synapse.ml.cognitive.text.TextSentiment))
- Healthcare Entity Extraction: Extracts medical entities and relationships from text. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/text/AnalyzeHealthText.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.text.html#module-synapse.ml.cognitive.text.AnalyzeHealthText))


### Translation
[**Azure AI Translator**](https://azure.microsoft.com/products/ai-services/translator/)
- Translate: Translates text. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/Translate.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.Translate))
- Transliterate: Converts text in one language from one script to another script. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/Transliterate.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.Transliterate))
- Detect: Identifies the language of a piece of text. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/Detect.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.Detect))
- BreakSentence: Identifies the positioning of sentence boundaries in a piece of text. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/BreakSentence.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.BreakSentence))
- Dictionary Lookup: Provides alternative translations for a word and a few idiomatic phrases. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/DictionaryLookup.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.DictionaryLookup))
- Dictionary Examples: Provides examples that show how terms in the dictionary are used in context. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/DictionaryExamples.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.DictionaryExamples))
- Document Translation: Translates documents across all supported languages and dialects while preserving document structure and data format. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/translate/DocumentTranslator.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.translate.html#module-synapse.ml.cognitive.translate.DocumentTranslator))

### Azure AI Document Intelligence
[**Azure AI Document Intelligence**](https://azure.microsoft.com/products/ai-services/ai-document-intelligence/)
- Analyze Layout: Extract text and layout information from a given document. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeLayout.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeLayout))
- Analyze Receipts: Detects and extracts data from receipts using optical character recognition (OCR) and our receipt model. This functionality makes it easy to extract structured data from receipts such as merchant name, merchant phone number, transaction date, transaction total, and more. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeReceipts.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeReceipts))
- Analyze Business Cards: Detects and extracts data from business cards using optical character recognition (OCR) and our business card model. This functionality makes it easy to extract structured data from business cards such as contact names, company names, phone numbers, emails, and more. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeBusinessCards.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeBusinessCards))
- Analyze Invoices: Detects and extracts data from invoices using optical character recognition (OCR) and our invoice understanding deep learning models. This functionality makes it easy to extract structured data from invoices such as customer, vendor, invoice ID, invoice due date, total, invoice amount due, tax amount, ship to, bill to, line items and more. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeInvoices.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeInvoices))
- Analyze ID Documents: Detects and extracts data from identification documents using optical character recognition (OCR) and our ID document model, enabling you to easily extract structured data from ID documents such as first name, last name, date of birth, document number, and more. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeIDDocuments.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeIDDocuments))
- Analyze Custom Form: Extracts information from forms (PDFs and images) into structured data based on a model created from a set of representative training forms. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/AnalyzeCustomModel.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.AnalyzeCustomModel))
- Get Custom Model: Get detailed information about a custom model. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/GetCustomModel.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/ListCustomModels.html))
- List Custom Models: Get information about all custom models. ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/form/ListCustomModels.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.form.html#module-synapse.ml.cognitive.form.ListCustomModels))

### Decision
[**Azure AI Anomaly Detector**](https://azure.microsoft.com//products/ai-services/ai-anomaly-detector)
- Anomaly status of latest point: generates a model using preceding points and determines whether the latest point is anomalous ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/anomaly/DetectLastAnomaly.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.anomaly.html#module-synapse.ml.cognitive.anomaly.DetectLastAnomaly))
- Find anomalies: generates a model using an entire series and finds anomalies in the series ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/anomaly/DetectAnomalies.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.anomaly.html#module-synapse.ml.cognitive.anomaly.DetectAnomalies))

### Search
- [Bing Image search](https://www.microsoft.com/bing/apis/bing-image-search-api) ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/bing/BingImageSearch.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.bing.html#module-synapse.ml.cognitive.bing.BingImageSearch))
- [Azure Cognitive Search](/azure/search/search-what-is-azure-search) ([Scala](https://mmlspark.blob.core.windows.net/docs/0.11.1/scala/com/microsoft/azure/synapse/ml/cognitive/search/AzureSearchWriter$.html), [Python](https://mmlspark.blob.core.windows.net/docs/0.11.1/pyspark/synapse.ml.cognitive.search.html#module-synapse.ml.cognitive.search.AzureSearchWriter))

## Related content

- [Use Azure AI services with SynapseML in Microsoft Fabric](../how-to-use-ai-services-with-synapseml.md)
- [Use Azure AI services with SynapseML for multivariate anomaly detection](../multivariate-anomaly-detection.md)
- [Create a custom search engine and question-answering system](../create-a-multilingual-search-engine-from-forms.md)
