---
title: Vector databasese
description: Learn about what vector databases are and how you can use Eventhouse to store and query vector data in Real-Time Intelligence.
ms.reviewer: sharmaanshul
ms.author: yaschust
author: YaelSchuster
ms.topic: concept-article
ms.date: 07/18/2024
ms.search.form: Eventhouse
---
# Vector databases

Vector databases store and manage data in the form of vectors that are numerical arrays of data points. Vector databases allow manipulating and analyzing set of vectors at scale using vector algebra and other advanced mathematical techniques. 

Traditional databases are not well-suited for handling the high-dimensional data that is becoming increasingly common in data analytics. Vector databases are designed to handle high-dimensional data, such as text, images, and audio, by representing them as vectors. The use of vectors allows for more complex queries and analyses, as vectors can be compared and analyzed using advanced techniques such as vector similarity search, quantization and clustering.

This article explains vector databases and how you can use an [Eventhouse](eventhouse.md) as a vector database in Real-Time Intelligence.

## Vector similarity

Vector similarity is a measure of how different (or similar) two or more vectors are. Vector similarity search is a technique used to find similar vectors in a dataset. In vector similarity search, vectors are compared using a distance metric, such as Euclidean distance or cosine similarity. The closer two vectors are, the more similar they are. 

## Embeddings

Embeddings are a common way of representing data in a vector format for use in vector databases. An embedding is a mathematical representation of a piece of data, such as a word, text document or an image, that is designed to capture its semantic meaning.Embeddings are created using algorithms that analyze the data and generate a set of numerical values that represent its key features. For example, an embedding for a word might represent its meaning, its context, and its relationship to other words. 

## When to use vector databases

Vector databases particularly useful for tasks such as machine learning, natural language processing, and image recognition, where the goal is to identify patterns or similarities in large datasets.

## Eventhouse as a Vector Database

At the core of Vector Similarity Search is the ability to store, index, and query vector data. Eventhouses provide a solution for handling and analyzing large volumes of data, particularly in scenarios requiring real-time analytics and exploration, making it an excellent choice for storing and searching vectors.

* Eventhouse supports a the [dynamic](/azure/data-explorer/kusto/query/scalar-data-types/dynamic) data type, which can store unstructured data such as arrays and property bags. Thus data type is recommended for storing vector values. You can further augment the vector value by storing metadata related to the original object as separate columns in your table.  

* Eventhouses can use a new [encoding](/azure/data-explorer/kusto/management/encoding-policy) type `Vector16` designed for storing vectors of floating-point numbers in 16 bits precision, which uses the Bfloat16 instead of the default 64 bits. This encoding is recommended for storing ML vector embeddings as it reduces storage requirements by a factor of four and accelerates vector processing functions such as [series_dot_product()](/azure/data-explorer/kusto/query/series-dot-product-function) and [series_cosine_similarity()](/azure/data-explorer/kusto/query/series-cosine-similarity-function) by orders of magnitude.

* The [series_cosine_similarity](/azure/data-explorer/kusto/query/series-cosine-similarity-function) function performs vector similarity searches on top of the vectors stored in Eventhouse.

## Next step

> [!div class="nextstepaction"]
> [Use Eventhouse as a vector database](vector-database-eventhouse.md)
