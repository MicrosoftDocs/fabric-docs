---
title: Manage and execute Fabric notebooks with public APIs
description: Learn about the Fabric notebook public APIs, including how to create and get a notebook with definition, and run a notebook on demand.
ms.reviewer: jingzh
ms.topic: how-to
ms.date: 01/28/2025
ms.search.form: Notebook REST API ci cd
---


# Manage and execute notebooks in Fabric with APIs

The Microsoft Fabric REST API provides a service endpoint for the create, read, update, and delete (CRUD) operations of a Fabric item. This article describes the available notebook REST APIs and their usage.

With the notebook APIs, data engineers and data scientists can automate their own pipelines and conveniently and efficiently establish CI/CD. These APIs also make it easy for users to manage and manipulate Fabric notebook items, and integrate notebooks with other tools and systems.

These **Item management** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Create item |Creates a notebook inside a workspace.|
|Update item |Updates the metadata of a notebook.|
|Update item definition |Updates the content of a notebook.|
|Delete item |Deletes a notebook.|
|Get item |Gets the metadata of a notebook.|
|Get item definition |Gets the content of a notebook.|
|List item | List all items in a workspace.|

For more information, see [Items - REST API](/rest/api/fabric/core/items).

The following **Job scheduler** actions are available for notebooks:

|Action|Description|
|---------|---------|
|Run on demand Item Job|Run notebook with parameterization.|
|Cancel Item Job Instance|Cancel notebook job run.|
|Get Item Job Instance| Get notebook run status.|

For more information, see [Job Scheduler](/rest/api/fabric/core/job-scheduler).

> [!NOTE]
> Service principal authentication is available for Notebook CRUD API and Job scheduler API, meaning you can use service principal to do the CRUD operations and trigger/cancel notebook runs, and get the run status. You need to add the service principal to the workspace with the appropriate role.