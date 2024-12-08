---
title: Known issue - Cognitive Services ScoreSentiment function doesn't work in dataflows
description: A known issue is posted where the Cognitive Services ScoreSentiment function doesn't work in dataflows.
author: mihart
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 08/14/2024
ms.custom: known-issue-780
---

# Known issue - Cognitive Services ScoreSentiment function doesn't work in dataflows

When using AI insights in a dataflow, you can choose the **ScoreSentiment** function to run text analytics based on a key phrase. If you use this function when creating a dataflow or refresh an existing dataflow with this function, you might receive an error.

**Status:** Fixed: August 14, 2024

**Product Experience:** Power BI

## Symptoms

When creating a dataflow, you might receive an error in the Power Query editor if using the **ScoreSentiment** function. The error message is similar to: `An internal error occurred`. When refreshing a dataflow that uses the ScoreSentiment function, you might see an error similar to: .

## Solutions and workarounds

To work around this issue, you can use the [sentiment analysis feature](/fabric/data-science/synapseml-first-model) by following the [tutorial](/azure/synapse-analytics/machine-learning/tutorial-cognitive-services-sentiment).

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
