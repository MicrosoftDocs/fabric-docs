---
title: SynapseML and its use in Azure Synapse Analytics.
description: Learn about the SynapseML library and how it simplifies the creation of massively scalable machine learning (ML) pipelines in Azure Synapse Analytics.
ms.reviewer: jessiwang
author: jonburchel
ms.author: jburchel
ms.topic: concept-article
ms.date: 08/26/2025
reviewer: JessicaXYWang
ai.usage: ai-assisted
---

# What is SynapseML?

SynapseML (formerly known as MMLSpark) is an open-source library that simplifies building massively scalable machine learning (ML) pipelines. SynapseML provides simple, composable, and distributed APIs for machine learning tasks like text analytics, computer vision, and anomaly detection. SynapseML is built on the [Apache Spark distributed computing framework](https://spark.apache.org/) and uses the same API as the [Spark MLlib library](https://spark.apache.org/mllib/). This alignment lets you embed SynapseML models in existing Apache Spark workflows.

With SynapseML, build scalable, intelligent systems to solve challenges in domains like anomaly detection, computer vision, deep learning, and text analytics. SynapseML trains and evaluates models on single-node, multi-node, and elastically resizable clusters. This approach lets you scale your work without wasting resources. SynapseML works with Python, R, Scala, Java, and .NET. Its API works with many databases, file systems, and cloud data stores to simplify experiments regardless of where the data is.

## Installation

Choose a method on the [installation page](https://github.com/microsoft/SynapseML#setup-and-installation), and follow the steps. 

Go to the [Quickstart: Your first models](https://microsoft.github.io/SynapseML/docs/Get%20Started/Quickstart%20-%20Your%20First%20Models/) to create your first pipeline. 


## Key features of SynapseML

SynapseML offers easy integration and pretrained resources to help you better understand and apply data to your business needs. SynapseML unifies several existing ML frameworks and new Microsoft algorithms in a single, scalable API that’s usable across Python, R, Scala, and Java. SynapseML also helps developers understand model predictions by introducing new tools to reveal why models make certain predictions and how to improve the training dataset to eliminate biases. 


### A unified API for creating, training, and scoring models

SynapseML offers a unified API that simplifies developing fault-tolerant distributed programs. In particular, SynapseML exposes many different machine learning frameworks under a single API that is scalable, agnostic to data and language, and works for batch, streaming, and serving applications.

A unified API standardizes many tools, frameworks, and algorithms, and streamlines the distributed machine learning experience. It lets developers quickly compose disparate machine learning frameworks, keeps code clean, and supports workflows that require more than one framework. For example, workflows such as web supervised learning or search engine creation require multiple services and frameworks. SynapseML shields users from this extra complexity.


### Use prebuilt intelligent models

Many tools in SynapseML don't require a large labeled training dataset. Instead, SynapseML provides simple APIs for prebuilt intelligent services, such as Azure AI services, to quickly solve large-scale AI challenges related to both business and research. SynapseML enables developers to embed over 50 different state-of-the-art ML services directly into their systems and databases. These ready-to-use algorithms can parse a wide variety of documents, transcribe multi-speaker conversations in real time, and translate text into more than 100 languages. For more examples of how to use pre-built AI to solve tasks quickly, see [the SynapseML "cognitive" examples](https://microsoft.github.io/SynapseML/docs/Get%20Started/Set%20up%20Cognitive%20Services/).

To make SynapseML's integration with Azure AI services fast and efficient, SynapseML introduces many optimizations for service-oriented workflows. In particular, SynapseML automatically parses common throttling responses to ensure that jobs don't overwhelm backend services. Additionally, it uses exponential backoffs to handle unreliable network connections and failed responses. Finally, Spark worker machines stay busy with new asynchronous parallelism primitives. Asynchronous parallelism lets worker machines send requests while waiting for a response from the server and can yield a tenfold increase in throughput.

### Broad ecosystem compatibility with ONNX

SynapseML enables developers to use models from many different ML ecosystems through the Open Neural Network Exchange (ONNX) framework. With this integration, you can execute a wide variety of classical and deep learning models at scale with only a few lines of code. SynapseML automatically handles distributing ONNX models to worker nodes, batching and buffering input data for high throughput, and scheduling work on hardware accelerators.

Bringing ONNX to Spark not only helps developers scale deep learning models, but also enables distributed inference across a wide variety of ML ecosystems. In particular, ONNXMLTools converts models from TensorFlow, scikit-learn, Core ML, LightGBM, XGBoost, H2O, and PyTorch to ONNX for accelerated and distributed inference using SynapseML.

### Build responsible AI systems

After building a model, it's imperative that researchers and engineers understand its limitations and behavior before deployment. SynapseML helps developers and researchers build responsible AI systems by introducing new tools that reveal why models make certain predictions and how to improve the training dataset to eliminate biases. SynapseML dramatically speeds the process of understanding a user's trained model by enabling developers to distribute computation across hundreds of machines. More specifically, SynapseML includes distributed implementations of Shapley Additive Explanations (SHAP) and Locally Interpretable Model-Agnostic Explanations (LIME) to explain the predictions of vision, text, and tabular models. It also includes tools such as Individual Conditional Expectation (ICE) and partial dependence analysis to recognize biased datasets.

## Enterprise support on Azure Synapse Analytics

SynapseML is generally available on Azure Synapse Analytics with enterprise support. Build large-scale machine learning pipelines using Azure AI services, LightGBM, ONNX, and other [selected SynapseML features](https://techcommunity.microsoft.com/t5/azure-synapse-analytics-blog/streamline-collaboration-and-insights-with-simplified-machine/ba-p/2924707). Use templates to quickly prototype distributed machine learning systems, like visual search engines, predictive maintenance pipelines, and document translation.

## Related content

* Learn more about SynapseML in the [SynapseML blog post](https://www.microsoft.com/research/blog/synapseml-a-simple-multilingual-and-massively-parallel-machine-learning-library/).

* [Install SynapseML and get started with examples](https://microsoft.github.io/SynapseML/docs/Get%20Started/Install%20SynapseML/)

* [SynapseML GitHub repository](https://github.com/microsoft/SynapseML)

