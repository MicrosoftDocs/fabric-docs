---
title: ISREFEXIST function
description: Learn how to use the ISREFEXIST function in Plan to check whether a specified reference exists in the model. 
ms.date: 05/08/2026
ms.topic: reference
#customer intent: As a user, I want to understand the syntax, arguments, and usage of the ISREFEXIST function in Plan.
---

# ISREFEXIST

The **ISREFEXIST** function returns *TRUE* if the specified reference exists in the sheet. It returns *FALSE* if the reference is invalid or doesn't exist. It is commonly used to validate references before applying calculations or logic.

## Syntax

```
ISREFEXIST(reference)
```

## Arguments

* reference - The reference to validate.

## Return value

Returns *TRUE* if a valid reference exists; otherwise, returns *FALSE*.

## **Example**

```
IF(ISREFEXIST(2026 Revenue Plan), 2026 Revenue Plan, "Reference doesn't exist")
```

In this example, the **ISREFEXIST** function checks whether the *2026 Revenue Plan* reference exists. If the condition is *TRUE*, the formula returns the value of the *2026 Revenue Plan*; otherwise, it returns the text *'Reference doesn't exist'*.

## **Excel equivalent**

[ISREF](https://support.microsoft.com/en-us/office/is-functions-0f2d7971-6019-40a0-a171-f2d869135665)
