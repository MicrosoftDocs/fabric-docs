---
title: REST API capabilities for Fabric Dataflows Gen2 (Preview)
description: This article describes the available REST APIs for Dataflows Gen2 in Microsoft Fabric Data Factory.
author: conxu-ms
ms.author: conxu
ms.topic: conceptual
ms.date: 11/06/2024
---

# REST API capabilities for Dataflows Gen2 in Fabric Data Factory (Preview)

> [!IMPORTANT]
> The Microsoft Fabric API for Data Factory is currently in public preview. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

Fabric Data Factory provides a robust set of APIs that enable users to automate and manage their dataflows efficiently. These APIs allow for seamless integration with various data sources and services, enabling users to create, update, and monitor their data workflows programmatically. The APIs support a wide range of operations -- including dataflows CRUD (Create, Read, Update, and Delete), scheduling, and monitoring -- making it easier for users to manage their data integration processes.

## API use cases for Dataflows Gen2

The APIs for dataflows in Fabric Data Factory can be used in various scenarios:

- **Automated deployment**: Automate the deployment of dataflows across different environments (development, testing, production) using CI/CD practices.
- **Monitoring and alerts**: Set up automated monitoring and alerting systems to track the status of dataflows and receive notifications in case of failures or performance issues.
- **Data integration**: Integrate data from multiple sources, such as databases, data lakes, and cloud services, into a unified dataflow for processing and analysis.
- **Error handling**: Implement custom error handling and retry mechanisms to ensure dataflows run smoothly and recover from failures.

## Understanding APIs

To effectively use the APIs for dataflows in Fabric Data Factory, it is essential to understand the key concepts and components:

- **Endpoints**: The API endpoints provide access to various dataflow operations, such as creating, updating, and deleting dataflows.
- **Authentication**: Secure access to the APIs using authentication mechanisms like OAuth or API keys.
- **Requests and responses**: Understand the structure of API requests and responses, including the required parameters and expected output.
- **Rate limits**: Be aware of the rate limits imposed on API usage to avoid exceeding the allowed number of requests.

### CRUD support

**CRUD** stands for **C**reate, **R**ead, **U**pdate, and **D**elete, which are the four basic operations that can be performed on data. In Fabric Data Factory, the CRUD operations are supported through the Fabric API for Data Factory, which is currently in preview. These APIs allow users to manage their dataflows programmatically. Here are some key points about CRUD support:

- **Create**: Create new dataflows using the API. This involves defining the dataflow structure, specifying data sources, transformations, and destinations.
- **Read**: Retrieve information about existing dataflows. This includes details about their configuration, status, and execution history.
- **Update**: Update existing dataflows. This might involve modifying the dataflow structure, changing data sources, or updating transformation logic.
- **Delete**: Delete dataflows that are no longer needed. This helps in managing and cleaning up resources.

The primary online reference documentation for Microsoft Fabric REST APIs can be found in the [Microsoft Fabric REST API documentation](/rest/api/fabric/articles/).

## Get started with public APIs for Dataflows Gen2


