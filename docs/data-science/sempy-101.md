---
title: SemPy 101
description: Learn the basics of how SemPy works and is organized.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy "101"

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

This article covers the basics of how to get started using SemPy.

## What kind of data does SemPy handle?

SemPy is designed for working with tabular data as a wrapper around pandas with extended notions of "semantic data frame" and specialized types that facilitate the usage of semantic knowledge as part of new capabilities for automating common data science tasks.

:::image type="content" source="media\sempy-101\semantic-data-frame.png" alt-text="Screenshot of visual representation of semantic data frame table with columns and groups of columns." lightbox="media\sempy-101\semantic-data-frame.png":::

## How is SemPy organized?

Here's high-level view of SemPy architecture:

:::image type="content" source="media\sempy-101\core-object-model.png" alt-text="Screenshot of visual representation of the SemPy core object model organization." lightbox="media\sempy-101\core-object-model.png":::

## How to migrate my code from pandas to SemPy?

We designed our library so that it supports all functions of pandas via same APIs. You can use SemPy as a drop-in replacement.

## What's the easiest way to get started?

The easiest is always to look at some working code. Here's an e2e example scenario that showcases most important SemPy capabilities in Azure Synapse vNext: [E2E Power BI Example](e2e-powerbi-example.md). The data we use in this scenario may be familiar to you as a Power BI sample from [Customer Profitability sample for Power BI](/power-bi/create-reports/sample-customer-profitability).  

## How do I install SemPy?

Refer to [setup instructions](sempy-setup.md).

## Will SemPy work locally?

Currently we only support the library in the Azure Synapse vNext, but the possibility of local mode is under consideration. If you want to use it locally, provide us with detailed feedback and it will help us prioritize future work!
