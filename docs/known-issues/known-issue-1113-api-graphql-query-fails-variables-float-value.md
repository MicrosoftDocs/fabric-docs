---
title: Known issue - API for GraphQL query fails when using variables with float value
description: A known issue is posted where API for GraphQL query fails when using variables with float value.
author: jessicamo
ms.author: jessicamo
ms.topic: troubleshooting  
ms.date: 06/27/2025
ms.custom: known-issue-1113
---

# Known issue - API for GraphQL query fails when using variables with float value

You can use a variable for a parameter in a GraphQL query. If the parameter is a float value, the query fails with an error.

**Status:** Fixed: June 27, 2025

**Product Experience:** Data Engineering

## Symptoms

When you run a GraphQL query with variables containing float values, the query fails. The error message is similar to: `Float cannot parse the given value of type System.Single`.

## Solutions and workarounds

To work around the issue, use the float values directly instead of the variable in the GraphQL query.

## Next steps

- [About known issues](https://support.fabric.microsoft.com/known-issues)
