---
title: Row Model Concept for Driver-Based Planning
description: Learn about the concept of row model as planning's agile driver framework that turns every planning sheet row into a driver.
#customer intent: As a finance business user, I want to understand how every row becomes a driver so that I can build driver-based planning without help from IT.
ms.date: 08/06/2026
ms.topic: concept-article
---

# Row model - the agile driver framework

Row model is planning's agile driver framework for building driver-based planning models. It transforms the rows in a planning sheet into dynamic planning elements called **drivers**. Instead of depending on a complex semantic model or prebuilt measures, a row model lets you build planning logic directly in the planning layer.

A row model uses a single row hierarchy, where each member in the hierarchy becomes a potential driver. Typical row hierarchies include:

* Country/Region
* Cost Center
* Chart of Accounts
* Product

> [!NOTE]
> **Key concept:** Every row is a potential driver.

Each driver can represent an input, calculation, subtotal, or business outcome. You define relationships between rows by using formulas and aggregations to create a connected planning model.

## How a row model works

A row model starts with a row hierarchy that represents the planning dimension. Every member in that hierarchy becomes a planning driver.

For example, a single row hierarchy can contain the following rows:

* Goods Sold
* Cost
* Net Profit

Each row acts as an individual driver. You can define formulas and relationships between these rows so that changes to one driver automatically update the related business outcomes. The row hierarchy is usually evaluated across planning versions (such as **Actual** and **Forecast**), business KPIs, and other scalar measures.

Unlike traditional spreadsheet models that distribute formulas across multiple cells, a row model organizes planning logic into a connected hierarchy of rows, making it easier to maintain and extend.

## When to use a row model

Use a row model when your organization uses lightweight semantic models, such as flat tables, star schemas, or row transactional views, but needs sophisticated planning logic.

Because the planning logic resides in the planning layer, you don't need a complex semantic model or numerous calculated measures in the underlying database.

## Benefits of a row model

A row model provides the following benefits:

* **Rapid deployment** by building planning logic without requiring a complex semantic model.
* **Every row becomes a planning driver**, enabling detailed driver-based planning directly within the planning sheet.
* **Business-user ownership**, allowing finance and operational teams to add new planning drivers by simply adding new members to the hierarchy instead of waiting for IT changes.
* **Flexible planning**, enabling simple source data to be transformed into sophisticated planning models.
* **Centralized business logic**, making models easier to understand, maintain, and extend.
* **Scenario planning**, allowing you to evaluate different business outcomes by changing driver values.

## Common use cases

Use row models for the following use cases:

* Financial planning and analysis (FP&A)
* Profit and loss (P&L) planning
* Budgeting and forecasting
* Sales planning
* Headcount planning
* Supply chain planning
* Operations planning
