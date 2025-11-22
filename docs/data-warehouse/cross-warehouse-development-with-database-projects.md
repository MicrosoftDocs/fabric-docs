---
title: Development and Deployment Workflows
description: Learn about development and deployment workflows available to developers working with Fabric Data Warehouse.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: pvenkat, randolphwest
ms.date: 11/05/2025
ms.topic: conceptual
---
In this article, you’ll learn how to model and deploy **cross-warehouse dependencies** using SQL database projects in Visual Studio Code. You’ll start from two existing warehouse projects and configure one-way dependencies between them using database references and, where necessary, pre-/post-deployment scripts.

This article builds on the concepts in [Develop warehouse projects in Visual Studio Code][Microsoft Learn](/fabric/data-warehouse/develop-warehouse-project) and assumes you’re already comfortable building and publishing a single warehouse project.

## Prerequisites



Before you begin, make sure you:

- Completed the steps in **Develop warehouse projects in Visual Studio Code** to:

  - Create **two Fabric Warehouses** in the same workspace.
    
  - Create or extract a **database project** for each warehouse in Visual Studio Code.[Microsoft Learn](/fabric/data-warehouse/develop-warehouse-project)
    
- Installed:

  - Visual Studio Code and the **SQL Database Projects** extension.
    
  - The `.NET` SDK required to build warehouse projects.[Microsoft Learn](/fabric/data-warehouse/develop-warehouse-project)
    
- Can build and publish each warehouse project independently from VS Code.



