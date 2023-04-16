---
title: SemPy glossary
description: Learn the definition of SemPy terms, including Knowledge Base, Stype, ColumnSType, and CompoundSType.
ms.reviewer: mopeakande
ms.author: narsam
author: narmeens
ms.topic: conceptual
ms.date: 02/10/2023
---

# SemPy in Microsoft Fabric glossary

[!INCLUDE [preview-note](../includes/preview-note.md)]

These terms are introduced in SemPy.

## Knowledge Base

The Knowledge Base (KB) is a central component of SemPy as it captures the semantic model and enables better collaboration between data scientists. Internally, KB consists of in-memory collections that capture different aspects of the semantic model (STypes, relationships, semantic functions, and groundings). SemPy provides APIs to add and retrieve components of the semantic model and to visualize it within a Python notebook. The KB can be serialized to disk as a JSON file capturing the various components of the semantic model.

## SType

Base semantic unit. Abstract base class, with two main sublasses, ColumnSType and CompoundSType.

## ColumnSType

This semantic type is associated with a single column.

## CompoundSType

This semantic type is associated with a group of STypes (which can be CompoundSTypes in turn).
