---
title: Cube Measures FAQ for Planning and Allocation
description: "Cube measures explained: learn how they differ from regular measures, distribute values across dimensions, and enable two-way editing. "
ms.date: 07/27/2026
ms.topic: faq
---

# Cube FAQ

This FAQ addresses common questions and clarifications that arise while working with cubes in planning sheets.

## What is a Cube measure, and how is it different from a regular measure?

A regular measure pulls a value directly from the semantic model or a planning sheet at whatever granularity it exists. A Cube measure is a calculated allocation layer. It takes a measure with limited granularity and distributes it across additional dimensions by using a reference measure as the basis for distribution, without altering the source data.

## Can I add more than one breakdown to the same Cube measure?

Yes, you can add multiple breakdowns. They're useful when you need to segregate planning into groups such as geography, category, or customer type. However, all breakdowns must have a common dimension.

## If I create a data input cube measure by using the Copy from another series option, and later update the base measure, does the cube measure change too?

No. The base measure only populates the cube measure at the point when you create it. After that, the cube measure becomes its own independent editable series. A later change to the base measure doesn't retroactively update the cube - the two are no longer linked once you make the copy.

## What happens if you try to pull a cube measure into another sheet by using From Sheets instead of Cube Measures?

The values don't populate. Without the Cube breakdown, Infobridge has no way to resolve the measure at the additional dimensions. It can only read the measure at the grain at which it was created. This limitation is the core problem that Cube Measures solves.

## When you update a subtotal value, why do individual category combinations under the subtotal value update too?

The update applies to the subtotal. The cube breakdown distributes that change proportionally down to every dimension category combination under the subtotal, based on their share of the reference measure.

## Why do I need to use the Insert as measure option to import cubes, rather than pull in the same way other referenced measures are?

Inserting it specifically as a Cube measure is what preserves its two-way behavior. If you pull it in as a regular read-only reference, the consuming sheet only displays the value - it can't be edited there. Inserting it through Cube Measures keeps the breakdown-based link intact, so an edit on the consumer flows back to the origin just as an edit on the origin flows forward to the consumer.
