---
title: Parameters
description: Learn about parameters for Data Factory in Microsoft Fabric.
ms.reviewer: xupzhou
ms.author: jburchel
author: jonburchel
ms.topic: conceptual
ms.custom:
  - build-2023
  - ignite-2023
ms.date: 11/15/2023
---

# Parameters for Data Factory in [!INCLUDE [product-name](../includes/product-name.md)]

This document describes how to use parameters in your pipelines for Data Factory in Fabric.

## How to use parameters, expressions and functions in pipelines for Data Factory in Fabric

In this document, we focus on learning fundamental concepts with various examples to explore the ability to create parameterized data pipelines within Data Factory in Fabric. Parameterization and dynamic expressions can save a tremendous amount of time and allow for a much more flexible Extract, Transform, Load (ETL) or Extract, Load, Transform (ELT) solution, which will dramatically reduce the cost of solution maintenance and speed up the implementation of new features into existing pipelines. These gains are because parameterization minimizes the amount of hard coding and increases the number of reusable objects and processes in a solution.

## Parameter and expression concepts

You can use parameters to pass external values into pipelines. Once the parameter has been passed into the resource, it cannot be changed. By parameterizing resources, you can reuse them with different values each time. Parameters can be used individually or as a part of expressions. Parameter values in the definition can be literal or expressions that are evaluated at runtime.

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

### Creating and using parameters

To create parameters, select the background of the pipeline editor canvas, and then the **Parameters** tab of the properties window at the bottom.  Select the **+ New** button to add a new parameter to the pipeline, give it a name, a data type, and a default value:

:::image type="content" source="media/parameters/add-parameter.png" alt-text="Screenshot showing the Parameters editor on the properties pages for a pipeline.":::

You can then use the parameter anywhere in your pipeline where dynamic content is supported. In this example, the parameter is used to dynamically provide the name of a Lakehouse data store on the **Source** tab of a copy activity's property pages.

:::image type="content" source="media/parameters/use-dynamic-content.png" alt-text="Screenshot showing the Source tab of a copy activity's property pages, highlighting the Add dynamic content option.":::

The **Add dynamic content** window is displayed, allowing you to specify any kind of dynamic content, including parameters, [system variables](expression-language.md#pipeline-scope-variables), [functions](expression-language.md#functions), or pipeline variables. In this example, the previously defined parameter is selected, and the dynamic content window is automatically populated with the correct expression to reference the parameter.

:::image type="content" source="media/parameters/select-pipeline-parameter.png" alt-text="Screenshot showing the Add dynamic content window with a pipeline parameter selected.":::

### Complex expression example

The below example shows a complex example that references a deep sub-field of activity output. To reference a pipeline parameter that evaluates to a sub-field, use [] syntax instead of dot(.) operator (as in case of subfield1 and subfield2)

`@activity('*activityName*').output.*subfield1*.*subfield2*[pipeline().parameters.*subfield3*].*subfield4*`

### Dynamic content editor

The dynamic content editor automatically escapes characters in your content when you finish editing. For example, the following content in the content editor is a string interpolation with an expression function:

`@{toUpper('myData')}`

The dynamic content editor converts the above content to the following expression:

`MYDATA`

## Using functions and variables in expressions

You can call functions and use variables within expressions. The following sections provide information about the functions that can be used in an expression.  

### Pipeline scope variables

These system variables can be referenced anywhere in the pipeline JSON.

| Variable Name | Description |
| --- | --- |
| @pipeline().DataFactory |Name of the data  or Synapse workspace the pipeline run is running in |
| @pipeline().Pipeline |Name of the pipeline |
| @pipeline().RunId |ID of the specific pipeline run |
| @pipeline().TriggerId|ID of the trigger that invoked the pipeline |
| @pipeline().TriggerName|Name of the trigger that invoked the pipeline |
| @pipeline().TriggerTime|Time of the trigger run that invoked the pipeline. This is the time at which the trigger **actually** fired to invoke the pipeline run, and it may differ slightly from the trigger's scheduled time.  |
| @pipeline().GroupId | ID of the group to which pipeline run belongs. |
| @pipeline()?.TriggeredByPipelineName | Name of the pipeline that triggers the pipeline run. Applicable when the pipeline run is triggered by an ExecutePipeline activity. Evaluate to _Null_ when used in other circumstances. Note the question mark after @pipeline() |
| @pipeline()?.TriggeredByPipelineRunId | Run ID of the pipeline that triggers the pipeline run. Applicable when the pipeline run is triggered by an ExecutePipeline activity. Evaluate to _Null_ when used in other circumstances. Note the question mark after @pipeline() |

>[!NOTE]
>Trigger-related date/time system variables (in both pipeline and trigger scopes) return UTC dates in ISO 8601 format, for example, `2017-06-01T22:20:00.4061448Z`.

### String functions  

To work with strings, you can use these string functions
and also some [collection functions](#collection-functions).
String functions work only on strings.

| String function | Task |
| --------------- | ---- |
| [concat](expression-language.md#concat) | Combine two or more strings, and return the combined string. |
| [endsWith](expression-language.md#endswith) | Check whether a string ends with the specified substring. |
| [guid](expression-language.md#guid) | Generate a globally unique identifier (GUID) as a string. |
| [indexOf](expression-language.md#indexof) | Return the starting position for a substring. |
| [lastIndexOf](expression-language.md#lastindexof) | Return the starting position for the last occurrence of a substring. |
| [replace](expression-language.md#replace) | Replace a substring with the specified string, and return the updated string. |
| [split](expression-language.md#split) | Return an array that contains substrings, separated by commas, from a larger string based on a specified delimiter character in the original string. |
| [startsWith](expression-language.md#startswith) | Check whether a string starts with a specific substring. |
| [substring](expression-language.md#substring) | Return characters from a string, starting from the specified position. |
| [toLower](expression-language.md#toLower) | Return a string in lowercase format. |
| [toUpper](expression-language.md#toUpper) | Return a string in uppercase format. |
| [trim](expression-language.md#trim) | Remove leading and trailing whitespace from a string, and return the updated string. |

### Collection functions

To work with collections, generally arrays, strings,
and sometimes, dictionaries, you can use these collection functions.

| Collection function | Task |
| ------------------- | ---- |
| [contains](expression-language.md#contains) | Check whether a collection has a specific item. |
| [empty](expression-language.md#empty) | Check whether a collection is empty. |
| [first](expression-language.md#first) | Return the first item from a collection. |
| [intersection](expression-language.md#intersection) | Return a collection that has *only* the common items across the specified collections. |
| [join](expression-language.md#join) | Return a string that has *all* the items from an array, separated by the specified character. |
| [last](expression-language.md#last) | Return the last item from a collection. |
| [length](expression-language.md#length) | Return the number of items in a string or array. |
| [skip](expression-language.md#skip) | Remove items from the front of a collection, and return *all the other* items. |
| [take](expression-language.md#take) | Return items from the front of a collection. |
| [union](expression-language.md#union) | Return a collection that has *all* the items from the specified collections. | 

### Logical functions  

These functions are useful inside conditions, they can be used to evaluate any type of logic.  
  
| Logical comparison function | Task |
| --------------------------- | ---- |
| [and](expression-language.md#and) | Check whether all expressions are true. |
| [equals](expression-language.md#equals) | Check whether both values are equivalent. |
| [greater](expression-language.md#greater) | Check whether the first value is greater than the second value. |
| [greaterOrEquals](expression-language.md#greaterOrEquals) | Check whether the first value is greater than or equal to the second value. |
| [if](expression-language.md#if) | Check whether an expression is true or false. Based on the result, return a specified value. |
| [less](expression-language.md#less) | Check whether the first value is less than the second value. |
| [lessOrEquals](expression-language.md#lessOrEquals) | Check whether the first value is less than or equal to the second value. |
| [not](expression-language.md#not) | Check whether an expression is false. |
| [or](expression-language.md#or) | Check whether at least one expression is true. |
  
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
| [array](expression-language.md#array) | Return an array from a single specified input. For multiple inputs, see [createArray](expression-language.md#createArray). |
| [base64](expression-language.md#base64) | Return the base64-encoded version for a string. |
| [base64ToBinary](expression-language.md#base64ToBinary) | Return the binary version for a base64-encoded string. |
| [base64ToString](expression-language.md#base64ToString) | Return the string version for a base64-encoded string. |
| [binary](expression-language.md#binary) | Return the binary version for an input value. |
| [bool](expression-language.md#bool) | Return the Boolean version for an input value. |
| [coalesce](expression-language.md#coalesce) | Return the first non-null value from one or more parameters. |
| [createArray](expression-language.md#createArray) | Return an array from multiple inputs. |
| [dataUri](expression-language.md#dataUri) | Return the data URI for an input value. |
| [dataUriToBinary](expression-language.md#dataUriToBinary) | Return the binary version for a data URI. |
| [dataUriToString](expression-language.md#dataUriToString) | Return the string version for a data URI. |
| [decodeBase64](expression-language.md#decodeBase64) | Return the string version for a base64-encoded string. |
| [decodeDataUri](expression-language.md#decodeDataUri) | Return the binary version for a data URI. |
| [decodeUriComponent](expression-language.md#decodeUriComponent) | Return a string that replaces escape characters with decoded versions. |
| [encodeUriComponent](expression-language.md#encodeUriComponent) | Return a string that replaces URL-unsafe characters with escape characters. |
| [float](expression-language.md#float) | Return a floating point number for an input value. |
| [int](expression-language.md#int) | Return the integer version for a string. |
| [json](expression-language.md#json) | Return the JavaScript Object Notation (JSON) type value or object for a string or XML. |
| [string](expression-language.md#string) | Return the string version for an input value. |
| [uriComponent](expression-language.md#uriComponent) | Return the URI-encoded version for an input value by replacing URL-unsafe characters with escape characters. |
| [uriComponentToBinary](expression-language.md#uriComponentToBinary) | Return the binary version for a URI-encoded string. |
| [uriComponentToString](expression-language.md#uriComponentToString) | Return the string version for a URI-encoded string. |
| [xml](expression-language.md#xml) | Return the XML version for a string. |
| [xpath](expression-language.md#xpath) | Check XML for nodes or values that match an XPath (XML Path Language) expression, and return the matching nodes or values. |

### Math functions  
 These functions can be used for either types of numbers: **integers** and **floats**.  

| Math function | Task |
| ------------- | ---- |
| [add](expression-language.md#add) | Return the result from adding two numbers. |
| [div](expression-language.md#div) | Return the result from dividing two numbers. |
| [max](expression-language.md#max) | Return the highest value from a set of numbers or an array. |
| [min](expression-language.md#min) | Return the lowest value from a set of numbers or an array. |
| [mod](expression-language.md#mod) | Return the remainder from dividing two numbers. |
| [mul](expression-language.md#mul) | Return the product from multiplying two numbers. |
| [rand](expression-language.md#rand) | Return a random integer from a specified range. |
| [range](expression-language.md#range) | Return an integer array that starts from a specified integer. |
| [sub](expression-language.md#sub) | Return the result from subtracting the second number from the first number. |
  
### Date functions  

| Date or time function | Task |
| --------------------- | ---- |
| [addDays](expression-language.md#addDays) | Add a number of days to a timestamp. |
| [addHours](expression-language.md#addHours) | Add a number of hours to a timestamp. |
| [addMinutes](expression-language.md#addMinutes) | Add a number of minutes to a timestamp. |
| [addSeconds](expression-language.md#addSeconds) | Add a number of seconds to a timestamp. |
| [addToTime](expression-language.md#addToTime) | Add a number of time units to a timestamp. See also [getFutureTime](expression-language.md#getFutureTime). |
| [convertFromUtc](expression-language.md#convertFromUtc) | Convert a timestamp from Universal Time Coordinated (UTC) to the target time zone. |
| [convertTimeZone](expression-language.md#convertTimeZone) | Convert a timestamp from the source time zone to the target time zone. |
| [convertToUtc](expression-language.md#convertToUtc) | Convert a timestamp from the source time zone to Universal Time Coordinated (UTC). |
| [dayOfMonth](expression-language.md#dayOfMonth) | Return the day of the month component from a timestamp. |
| [dayOfWeek](expression-language.md#dayOfWeek) | Return the day of the week component from a timestamp. |
| [dayOfYear](expression-language.md#dayOfYear) | Return the day of the year component from a timestamp. |
| [formatDateTime](expression-language.md#formatDateTime) | Return the timestamp as a string in optional format. |
| [getFutureTime](expression-language.md#getFutureTime) | Return the current timestamp plus the specified time units. See also [addToTime](expression-language.md#addToTime). |
| [getPastTime](expression-language.md#getPastTime) | Return the current timestamp minus the specified time units. See also [subtractFromTime](expression-language.md#subtractFromTime). |
| [startOfDay](expression-language.md#startOfDay) | Return the start of the day for a timestamp. |
| [startOfHour](expression-language.md#startOfHour) | Return the start of the hour for a timestamp. |
| [startOfMonth](expression-language.md#startOfMonth) | Return the start of the month for a timestamp. |
| [subtractFromTime](expression-language.md#subtractFromTime) | Subtract a number of time units from a timestamp. See also [getPastTime](expression-language.md#getPastTime). |
| [ticks](expression-language.md#ticks) | Return the `ticks` property value for a specified timestamp. |
| [utcNow](expression-language.md#utcNow) | Return the current timestamp as a string. |

## Related content

- [Expression language](expression-language.md)
