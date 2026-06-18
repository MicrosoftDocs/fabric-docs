---
title: Random and lookup functions
description: Learn about random and lookup functions in plan (preview) and how to use them to generate random numbers and retrieve positional values.
ms.date: 06/04/2026
ms.topic: reference
ms.search.form: Random and lookup functions
#customer intent: As a user, I want to understand random and lookup functions and how to use them in calculations.
---

# Random and lookup functions

Random functions let you generate random numbers and lookup functions retrieve positional values in reports. These functions are commonly used to create sample data, generate randomized results, and identify the position of values within a list.

[!INCLUDE [Fabric feature-preview-note](../../../../includes/feature-preview-note.md)]

In plan (preview), these functions help you create calculations in simulations, testing, dynamic analysis, and positional data evaluation.

## INDEXOF

The *INDEXOF* function returns the index of the first occurrence of a specified value within a list of values. The arguments can be numeric values or references. If the value is not found in the list, the function returns -1.

### Syntax

```
INDEXOF(list, value)
```

### Arguments

* `list`: The list of values to search.
* `value`: The value to find in the list.

### Return value

Returns the index of the first matching value in the list. The index starts at 0. If no match is found, the function returns -1.

### Example

```
INDEXOF([2025.Q2.Actuals, 2025.Q3.Actuals, 2025.Q4.Actuals], 2025.Q1.Actuals)
```

In this example, the INDEXOF function is used to identify whether the *Q1 Actuals* value of 2025 exists in the *Q2 Actuals*, *Q3 Actuals*, and *Q4 Actuals* values of 2025 and returns its index position.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/random-lookup-functions/indexof.png" alt-text="Screenshot of INDEXOF function." lightbox="../../media/planning-reference-formulas/math-functions/random-lookup-functions/indexof.png":::

## RAND

The *RAND* function returns a random decimal number between 0 and 1. A new random value is generated each time the function is evaluated or the report is refreshed. This function is commonly used in simulations, sample data generation, testing scenarios, and calculations that require random values

### Syntax

```
RAND()
```

### Return value

Returns a random decimal number greater than or equal to 0 and less than 1.

### Example

```
RAND()
```

In this example, the *Rand* measure is created using the RAND function, which generates a random decimal number between 0 and 1 each time the report is evaluated or refreshed.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/random-lookup-functions/rand.png" alt-text="Screenshot of RAND function." lightbox="../../media/planning-reference-formulas/math-functions/random-lookup-functions/rand.png":::

### Excel equivalent

[RAND](https://support.microsoft.com/en-us/office/rand-function-4cbfa695-8869-4788-8d90-021ea9f5be73)

## RANDBETWEEN

The *RANDBETWEEN* function returns a random integer between two specified values. It generates a number within the defined range each time the function is evaluated and is commonly used in simulations, sampling, and testing scenarios where random data is required.

### Syntax

```
RANDBETWEEN(value1, value2)
```

### Arguments

* `value1`: The smallest integer that RANDBETWEEN returns.
* `value2`: The largest integer that RANDBETWEEN returns.

### Return value

Returns a random integer between the specified minimum and maximum values.

### Example

```
RANDBETWEEN(52, 110)
```

In this example, the RANDBETWEEN function generates a random integer between 52 and 110.

:::image type="content" source="../../media/planning-reference-formulas/math-functions/random-lookup-functions/randbetween.png" alt-text="Screenshot of RANDBETWEEN function." lightbox="../../media/planning-reference-formulas/math-functions/random-lookup-functions/randbetween.png":::

### Excel equivalent

[RANDBETWEEN](https://support.microsoft.com/en-us/office/randbetween-function-4cc7f0d1-87dc-4eb7-987f-a469ab381685)
