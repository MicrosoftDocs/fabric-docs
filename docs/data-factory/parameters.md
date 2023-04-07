---
title: Parameters
description: Learn about parameters in [!INCLUDE [product-name](../includes/product-name.md)].
ms.reviewer: xupzhou
ms.author: jburchel
author: jonburchel
ms.topic: conceptual 
ms.date: 04/07/2023
---

# Parameters for Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW.
> This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here. Refer to [Azure Data Factory documentation](/azure/data-factory/) for the service in Azure.

This document describes how to use parameters in your pipelines and dataflows for Data Factory in Fabric.

## How to use parameters, expressions and functions in pipelines and dataflows for Data Factory in Fabric

In this document, we focus on learning fundamental concepts with various examples to explore the ability to create parameterized data pipelines within Data Factory in Fabric. Parameterization and dynamic expressions can save a tremendous amount of time and allow for a much more flexible Extract, Transform, Load (ETL) or Extract, Load, Transform (ELT) solution, which will dramatically reduce the cost of solution maintenance and speed up the implementation of new features into existing pipelines. These gains are because parameterization minimizes the amount of hard coding and increases the number of reusable objects and processes in a solution.

## Parameter and expression concepts

You can use parameters to pass external values into pipelines and dataflows. Once the parameter has been passed into the resource, it cannot be changed. By parameterizing resources, you can reuse them with different values each time. Parameters can be used individually or as a part of expressions. Parameter values in the definition can be literal or expressions that are evaluated at runtime.

Expressions can appear anywhere in a string value and always generate another string value. Here, password is a pipeline parameter in the expression. If a parameter value is an expression, the body of the expression is extracted by removing the at-sign (@). If a literal string is needed that starts with @, it must be escaped by using @@. The following examples show how expressions are evaluated.

|Parameter value|Result|  
|----------------|------------|  
|"parameters"|The characters 'parameters' are returned.|  
|"parameters[1]"|The characters 'parameters[1]' are returned.|  
|"\@\@"|A 1 character string that contains '\@' is returned.|  
|" \@"|A 2 character string that contains ' \@' is returned.|

Expressions can also appear inside strings, using a feature called *string interpolation* where expressions are wrapped in `@{ ... }`. For example, the following string includes parameter values and literal string values:

"First Name: @{pipeline().parameters.firstName} Last Name: @{pipeline().parameters.lastName}"

 Using string interpolation, the result is always a string. For example, if you defined `myNumber` as `42` and  `myString` as  `foo`:  
  
|Parameter value|Result|  
|----------------|------------|  
|"\@pipeline().parameters.myString"| Returns `foo` as a string.|  
|"\@{pipeline().parameters.myString}"| Returns `foo` as a string.|  
|"\@pipeline().parameters.myNumber"| Returns `42` as a *number*.|  
|"\@{pipeline().parameters.myNumber}"| Returns `42` as a *string*.|  
|"Answer is: @{pipeline().parameters.myNumber}"| Returns the string `Answer is: 42`.|  
|"\@concat('Answer is: ', string(pipeline().parameters.myNumber))"| Returns the string `Answer is: 42`|  
|"Answer is: \@\@{pipeline().parameters.myNumber}"| Returns the string `Answer is: @{pipeline().parameters.myNumber}`.|  

## Examples of using parameters in expressions 

### Complex expression example
The below example shows a complex example that references a deep sub-field of activity output. To reference a pipeline parameter that evaluates to a sub-field, use [] syntax instead of dot(.) operator (as in case of subfield1 and subfield2)

`@activity('*activityName*').output.*subfield1*.*subfield2*[pipeline().parameters.*subfield3*].*subfield4*`

### Dynamic content editor

The dynamic content editor automatically escapes characters in your content when you finish editing. For example, the following content in the content editor is a string interpolation with an expression function:

`@{toUpper('myData')}`

The dynamic content editor converts the above content to the following expression:

`MYDATA`

## Calling functions within expressions 

You can call functions within expressions. The following sections provide information about the functions that can be used in an expression.  

### String functions  

To work with strings, you can use these string functions
and also some [collection functions](#collection-functions).
String functions work only on strings.

| String function | Task |
| --------------- | ---- |
| [concat](control-flow-expression-language-functions.md#concat) | Combine two or more strings, and return the combined string. |
| [endsWith](control-flow-expression-language-functions.md#endswith) | Check whether a string ends with the specified substring. |
| [guid](control-flow-expression-language-functions.md#guid) | Generate a globally unique identifier (GUID) as a string. |
| [indexOf](control-flow-expression-language-functions.md#indexof) | Return the starting position for a substring. |
| [lastIndexOf](control-flow-expression-language-functions.md#lastindexof) | Return the starting position for the last occurrence of a substring. |
| [replace](control-flow-expression-language-functions.md#replace) | Replace a substring with the specified string, and return the updated string. |
| [split](control-flow-expression-language-functions.md#split) | Return an array that contains substrings, separated by commas, from a larger string based on a specified delimiter character in the original string. |
| [startsWith](control-flow-expression-language-functions.md#startswith) | Check whether a string starts with a specific substring. |
| [substring](control-flow-expression-language-functions.md#substring) | Return characters from a string, starting from the specified position. |
| [toLower](control-flow-expression-language-functions.md#toLower) | Return a string in lowercase format. |
| [toUpper](control-flow-expression-language-functions.md#toUpper) | Return a string in uppercase format. |
| [trim](control-flow-expression-language-functions.md#trim) | Remove leading and trailing whitespace from a string, and return the updated string. |

### Collection functions

To work with collections, generally arrays, strings,
and sometimes, dictionaries, you can use these collection functions.

| Collection function | Task |
| ------------------- | ---- |
| [contains](control-flow-expression-language-functions.md#contains) | Check whether a collection has a specific item. |
| [empty](control-flow-expression-language-functions.md#empty) | Check whether a collection is empty. |
| [first](control-flow-expression-language-functions.md#first) | Return the first item from a collection. |
| [intersection](control-flow-expression-language-functions.md#intersection) | Return a collection that has *only* the common items across the specified collections. |
| [join](control-flow-expression-language-functions.md#join) | Return a string that has *all* the items from an array, separated by the specified character. |
| [last](control-flow-expression-language-functions.md#last) | Return the last item from a collection. |
| [length](control-flow-expression-language-functions.md#length) | Return the number of items in a string or array. |
| [skip](control-flow-expression-language-functions.md#skip) | Remove items from the front of a collection, and return *all the other* items. |
| [take](control-flow-expression-language-functions.md#take) | Return items from the front of a collection. |
| [union](control-flow-expression-language-functions.md#union) | Return a collection that has *all* the items from the specified collections. | 

### Logical functions  

These functions are useful inside conditions, they can be used to evaluate any type of logic.  
  
| Logical comparison function | Task |
| --------------------------- | ---- |
| [and](control-flow-expression-language-functions.md#and) | Check whether all expressions are true. |
| [equals](control-flow-expression-language-functions.md#equals) | Check whether both values are equivalent. |
| [greater](control-flow-expression-language-functions.md#greater) | Check whether the first value is greater than the second value. |
| [greaterOrEquals](control-flow-expression-language-functions.md#greaterOrEquals) | Check whether the first value is greater than or equal to the second value. |
| [if](control-flow-expression-language-functions.md#if) | Check whether an expression is true or false. Based on the result, return a specified value. |
| [less](control-flow-expression-language-functions.md#less) | Check whether the first value is less than the second value. |
| [lessOrEquals](control-flow-expression-language-functions.md#lessOrEquals) | Check whether the first value is less than or equal to the second value. |
| [not](control-flow-expression-language-functions.md#not) | Check whether an expression is false. |
| [or](control-flow-expression-language-functions.md#or) | Check whether at least one expression is true. |
  
### Conversion functions  

 These functions are used to convert between each of the native types in the language:  
-   string
-   integer
-   float
-   boolean
-   arrays
-   dictionaries

| Conversion function | Task |
| ------------------- | ---- |
| [array](control-flow-expression-language-functions.md#array) | Return an array from a single specified input. For multiple inputs, see [createArray](control-flow-expression-language-functions.md#createArray). |
| [base64](control-flow-expression-language-functions.md#base64) | Return the base64-encoded version for a string. |
| [base64ToBinary](control-flow-expression-language-functions.md#base64ToBinary) | Return the binary version for a base64-encoded string. |
| [base64ToString](control-flow-expression-language-functions.md#base64ToString) | Return the string version for a base64-encoded string. |
| [binary](control-flow-expression-language-functions.md#binary) | Return the binary version for an input value. |
| [bool](control-flow-expression-language-functions.md#bool) | Return the Boolean version for an input value. |
| [coalesce](control-flow-expression-language-functions.md#coalesce) | Return the first non-null value from one or more parameters. |
| [createArray](control-flow-expression-language-functions.md#createArray) | Return an array from multiple inputs. |
| [dataUri](control-flow-expression-language-functions.md#dataUri) | Return the data URI for an input value. |
| [dataUriToBinary](control-flow-expression-language-functions.md#dataUriToBinary) | Return the binary version for a data URI. |
| [dataUriToString](control-flow-expression-language-functions.md#dataUriToString) | Return the string version for a data URI. |
| [decodeBase64](control-flow-expression-language-functions.md#decodeBase64) | Return the string version for a base64-encoded string. |
| [decodeDataUri](control-flow-expression-language-functions.md#decodeDataUri) | Return the binary version for a data URI. |
| [decodeUriComponent](control-flow-expression-language-functions.md#decodeUriComponent) | Return a string that replaces escape characters with decoded versions. |
| [encodeUriComponent](control-flow-expression-language-functions.md#encodeUriComponent) | Return a string that replaces URL-unsafe characters with escape characters. |
| [float](control-flow-expression-language-functions.md#float) | Return a floating point number for an input value. |
| [int](control-flow-expression-language-functions.md#int) | Return the integer version for a string. |
| [json](control-flow-expression-language-functions.md#json) | Return the JavaScript Object Notation (JSON) type value or object for a string or XML. |
| [string](control-flow-expression-language-functions.md#string) | Return the string version for an input value. |
| [uriComponent](control-flow-expression-language-functions.md#uriComponent) | Return the URI-encoded version for an input value by replacing URL-unsafe characters with escape characters. |
| [uriComponentToBinary](control-flow-expression-language-functions.md#uriComponentToBinary) | Return the binary version for a URI-encoded string. |
| [uriComponentToString](control-flow-expression-language-functions.md#uriComponentToString) | Return the string version for a URI-encoded string. |
| [xml](control-flow-expression-language-functions.md#xml) | Return the XML version for a string. |
| [xpath](control-flow-expression-language-functions.md#xpath) | Check XML for nodes or values that match an XPath (XML Path Language) expression, and return the matching nodes or values. |

### Math functions  
 These functions can be used for either types of numbers: **integers** and **floats**.  

| Math function | Task |
| ------------- | ---- |
| [add](control-flow-expression-language-functions.md#add) | Return the result from adding two numbers. |
| [div](control-flow-expression-language-functions.md#div) | Return the result from dividing two numbers. |
| [max](control-flow-expression-language-functions.md#max) | Return the highest value from a set of numbers or an array. |
| [min](control-flow-expression-language-functions.md#min) | Return the lowest value from a set of numbers or an array. |
| [mod](control-flow-expression-language-functions.md#mod) | Return the remainder from dividing two numbers. |
| [mul](control-flow-expression-language-functions.md#mul) | Return the product from multiplying two numbers. |
| [rand](control-flow-expression-language-functions.md#rand) | Return a random integer from a specified range. |
| [range](control-flow-expression-language-functions.md#range) | Return an integer array that starts from a specified integer. |
| [sub](control-flow-expression-language-functions.md#sub) | Return the result from subtracting the second number from the first number. |
  
### Date functions  

| Date or time function | Task |
| --------------------- | ---- |
| [addDays](control-flow-expression-language-functions.md#addDays) | Add a number of days to a timestamp. |
| [addHours](control-flow-expression-language-functions.md#addHours) | Add a number of hours to a timestamp. |
| [addMinutes](control-flow-expression-language-functions.md#addMinutes) | Add a number of minutes to a timestamp. |
| [addSeconds](control-flow-expression-language-functions.md#addSeconds) | Add a number of seconds to a timestamp. |
| [addToTime](control-flow-expression-language-functions.md#addToTime) | Add a number of time units to a timestamp. See also [getFutureTime](control-flow-expression-language-functions.md#getFutureTime). |
| [convertFromUtc](control-flow-expression-language-functions.md#convertFromUtc) | Convert a timestamp from Universal Time Coordinated (UTC) to the target time zone. |
| [convertTimeZone](control-flow-expression-language-functions.md#convertTimeZone) | Convert a timestamp from the source time zone to the target time zone. |
| [convertToUtc](control-flow-expression-language-functions.md#convertToUtc) | Convert a timestamp from the source time zone to Universal Time Coordinated (UTC). |
| [dayOfMonth](control-flow-expression-language-functions.md#dayOfMonth) | Return the day of the month component from a timestamp. |
| [dayOfWeek](control-flow-expression-language-functions.md#dayOfWeek) | Return the day of the week component from a timestamp. |
| [dayOfYear](control-flow-expression-language-functions.md#dayOfYear) | Return the day of the year component from a timestamp. |
| [formatDateTime](control-flow-expression-language-functions.md#formatDateTime) | Return the timestamp as a string in optional format. |
| [getFutureTime](control-flow-expression-language-functions.md#getFutureTime) | Return the current timestamp plus the specified time units. See also [addToTime](control-flow-expression-language-functions.md#addToTime). |
| [getPastTime](control-flow-expression-language-functions.md#getPastTime) | Return the current timestamp minus the specified time units. See also [subtractFromTime](control-flow-expression-language-functions.md#subtractFromTime). |
| [startOfDay](control-flow-expression-language-functions.md#startOfDay) | Return the start of the day for a timestamp. |
| [startOfHour](control-flow-expression-language-functions.md#startOfHour) | Return the start of the hour for a timestamp. |
| [startOfMonth](control-flow-expression-language-functions.md#startOfMonth) | Return the start of the month for a timestamp. |
| [subtractFromTime](control-flow-expression-language-functions.md#subtractFromTime) | Subtract a number of time units from a timestamp. See also [getPastTime](control-flow-expression-language-functions.md#getPastTime). |
| [ticks](control-flow-expression-language-functions.md#ticks) | Return the `ticks` property value for a specified timestamp. |
| [utcNow](control-flow-expression-language-functions.md#utcNow) | Return the current timestamp as a string. |

## Next steps

[Expression language](expression-language.md)
