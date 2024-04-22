---
title: Run Data Factory Pipeline with Data workflows
description: Learn how to use a data pipeline to copy data from an Azure Blob Storage source to a Lakehouse destination.
ms.reviewer: jonburchel
ms.author: jburchel
author: jonburchel
ms.topic: tutorial
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Run Data Factory Pipeline with Data workflows

In this tutorial, you'll build a Directed Acyclic Graph(DAG) in Data worflows that triggers the data factory pipeline.

## Prerequisites
To get started, you must complete the following prerequisites:
- - Make sure you have a Project [!INCLUDE [product-name](../includes/product-name.md)] enabled Workspace: [Create a workspace](../get-started/create-workspaces.md).

## Create a data pipeline
For this tutorial, you c


## Create DAG in Data workflows




Subscription with Azure Data Factory containing data pipelines.
Steps
1.	Configure an Azure Data Factory Pipeline named “Pipeline1”.
2.	Configure the Environment:
a.	Add “apache-airflow-providers-microsoft-azure” under “Airflow requirements.”
b.	Click on Apply.
3.	Set up an Airflow Connection for Azure Data Factory:
a.	Click on the ‘View Airflow connections’ to see list of all the connections configured and to set up a new one.
b.	Click on ‘+’ -> Select Connection type: Azure Data Factory -> Fill out the fields:
c.	Connection Id, Client Id, Secret, Tenant Id, Subscription Id, Resource group name, Factory name.
d.	To create Service Principal, refer to doc: https://learn.microsoft.com/en-us/entra/identity-platform/howto-create-service-principal-portal
e.	[Note: To run existing ADF pipeline, you need to Grant SPN identity contributor permission to the ADF instance where you are running]
