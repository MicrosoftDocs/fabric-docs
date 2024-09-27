---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title: Creating Data Warehouses with (CI) Case Insensitive Collation
description: This article provides a step-by-step guide on how to create a data warehouse with case-insensitive collation through the RESTful API. It also explains how to use Visual Studio Code with the REST Client extension to facilitate the process, making it easier for users to configure their warehouses to better meet their data management needs.
author:      twinklecyril # GitHub alias
ms.author:   twcyril # Microsoft alias
ms.service: fabric
ms.topic: article
ms.date: 10/07/2024
---
# Creating Data Warehouses with (CI) Case Insensitive Collation

**Applies to:** [!INCLUDE [fabric-dw](includes/applies-to-version/fabric-dw.md)]

All data warehouses by default are configured with case-sensitive (CS) collation Latin1_General_100_BIN2_UTF8. Users now have the option to create warehouses with case-insensitive (CI) collation - Latin1_General_100_CI_AS_KS_WS_SC_UTF8, providing greater flexibility in data management.

## How to Create a Case Insensitive Warehouse

Currently, the only method available for creating a case-insensitive data warehouse is through RESTful API. When making a request to create a warehouse, users must specify the desired collation in the request body. If no collation is specified, the system will default to creating a case-sensitive warehouse.

## Important Considerations

It is crucial to note that once a data warehouse is created, the collation setting cannot be changed. Therefore, users should carefully consider their needs before initiating the creation process to ensure they select the appropriate collation type.

This article provides a step-by-step guide on how to create a data warehouse with case-insensitive collation through the RESTful API. It also explains how to use Visual Studio Code with the REST Client extension to facilitate the process, making it easier for users to configure their warehouses to better meet their data management needs.

## API Endpoint

To create a warehouse with CI collation, use the following API endpoint:

