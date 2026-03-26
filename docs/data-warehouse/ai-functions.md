---
title: AI Functions (Preview)
description: This tutorial explains how to use AI functions to perform advanced text processing without leaving warehouse in Microsoft Fabric.
ms.reviewer: jovanpop-msft
ms.date: 03/17/2026
ms.topic: how-to
ai-usage: ai-assisted
---

# Use AI functions (preview)

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

[!INCLUDE [feature-preview-note](../includes/feature-preview-note.md)]

Fabric Data Warehouse and SQL analytics endpoint provide built-in AI functions that you can use to analyze, classify, summarize, and transform text directly within SQL queries. By using these functions, you can perform advanced text processing without leaving your data environment. In this tutorial, learn how to use AI functions to transform text.

| Function               | Purpose           | Syntax Example                               |
| ---------------------- | ----------------- | -------------------------------------------- |
| `ai_analyze_sentiment` | Detect sentiment of input text | `ai_analyze_sentiment(<text>)`               |
| `ai_classify`          | Classify text based on provided labels | `ai_classify(<text>, <class1>, <class2>, ...)` |
| `ai_extract`           | Extract entities as JSON properties  | `ai_extract(<text>, <class1>, <class2>, ...)`  |
| `ai_summarize`         | Summarize text    | `ai_summarize(<text>)`                       |
| `ai_generate_response` | Generate response based on prompt | `ai_generate_response(<prompt>, <data>)`     |
| `ai_translate`         | Translate input text to the specified target language    | `ai_translate(<text>, <lang>)`               |
| `ai_fix_grammar`       | Fix grammar in the text       | `ai_fix_grammar(<text>)`                     |

These functions call external AI APIs to process text, which can affect query performance. To optimize efficiency, avoid applying repetitive text transformations within `SELECT` queries on the same dataset. Instead, precompute and materialize the results of AI functions as separate columns or in staging tables.

> [!WARNING]
> The functions return `NULL` if the AI model can't process the text. Common reasons include:
> - Responsible AI rules block inappropriate content in the input text.
> - Input text exceeds token limits. The current model supports up to 15 KB of text.

Typical processing speed of AI functions is 20-100 rows per second. If you experience slower performance, report the problematic query as an issue.

Check the [AI functions prerequisites](../data-science/ai-functions/overview.md#prerequisites) for enabling AI functions in your workspace. [AI functions for Azure OpenAI Service are available in some regions](../fundamentals/copilot-fabric-overview.md#available-regions-for-azure-openai-service).

## Analyze sentiment

The `ai_analyze_sentiment(text)` function analyzes sentiment from the input `text` and returns one of the following values: `positive`, `negative`, `mixed`, or `neutral`.

**Example:**

```sql
SELECT ai_analyze_sentiment('This hotel was great!') AS sentiment;
```

**Expected result:** `positive`

## Classify text

The `ai_classify(text, class1, class2, ...)` function classifies the input `text` into one of the provided categories.

**Example:**

```sql
SELECT ai_classify('Room was dirty', 'service','dirt','food') AS classification;
```

**Expected result:** `dirt`

## Extract entities from text

The `ai_extract(text, class1, class2, ...)` function extracts entities from the input `text` based on the specified classes.

**Example:**

```sql
SELECT ai_extract('Check-in was late and room dirty', 'sentiment','problem') AS extraction;
```

**Expected result:** `{"sentiment":"Negative","problem":"Dirty room"}`

## Generate response

The `ai_generate_response(prompt, data)` function generates a response based on a given `prompt` and optional `data`.

**Example:**

```sql
SELECT ai_generate_response('Reply in 20 words:', 'The room was noisy.') AS response;
```

**Expected result:** 'We sincerely apologize for the inconvenience caused by the noise and are committed to enhancing our soundproofing measures.'

## Summarize text

The `ai_summarize(text)` function summarizes the input `text` into a concise version.

**Example:**

```sql
SELECT ai_summarize('The hotel was clean and staff were friendly.') AS summary;
```

**Expected result:** 'Clean hotel, friendly staff.'

## Translate text

The `ai_translate(text, lang_code)` function translates `text` into the specified language using `lang_code`. 

Supported language codes are `de` (German), `en` (English), `fr` (French), `it` (Italian), `es` (Spanish), `el` (Greek),
`pl` (Polish), `sv` (Swedish), `fi` (Finnish), and `cs` (Czech).

**Example:**

```sql
SELECT ai_translate('The hotel was great','de') AS translation_de;
```

**Expected result:** 'Das Hotel war großartig.'

## Fix grammar

The `ai_fix_grammar(text)` function corrects grammar in the input `text`.

**Example:**

```sql
SELECT ai_fix_grammar('Th room are clean and staff were nice') AS fixed_text;
```

**Expected result:** 'The rooms are clean, and the staff were nice.'

## Examples

### A. Import data and transform text column using AI functions

This sample loads data from a Lakehouse file into the `hotel_reviews` table in the warehouse.
It selects from a file in the `/Files` section, and then applies the AI functions to enrich the data:

```sql
CREATE TABLE HotelDW.dbo.hotel_reviews
AS
SELECT
    city, latitude, longitude, name, reviews_rating, reviews_text,
    ai_summarize(reviews_text) AS reviews_summary,
    ai_classify( reviews_text, 'service', 'dirt', 'food', 'air conditioning', 'other') AS reviews_classification,
    ai_analyze_sentiment(reviews_text) AS reviews_sentiment,
    ai_translate(reviews_text, 'de') AS reviews_text_de,
    ai_translate(reviews_text, 'es') AS reviews_text_es,
    ai_translate(reviews_text, 'fr') AS reviews_text_fr,
    ai_translate(reviews_text, 'it') AS reviews_text_it
FROM OPENROWSET( BULK '/Files/csv/hotel_reviews_demo.csv', DATA_SOURCE = 'TextLakehouse', HEADER_ROW = TRUE);
```

### B. Update text column using AI function

The following example fixes the grammar errors in the `reviews_text` column:

```sql
UPDATE HotelDW.dbo.hotel_reviews
SET reviews_text = ISNULL(ai_fix_grammar(reviews_text), reviews_text);
```

The AI functions might return `NULL` if an error occurs, so avoid overwriting existing values with `NULL`.

Use the `ISNULL(<ai function>, <original value>)` pattern to preserve the original text when AI functions can't return results. 

### C. Extract values from text

In this example, the `ai_extract` function analyzes the review text and returns a JSON object containing the properties `sentiment`, `time_reported`, and `problem`. The `OPENJSON` function then parses this JSON and maps these properties into separate columns for easy querying and analysis. 

This sample script inserts the extracted values as separate columns in the target table. 

```sql
INSERT INTO gold.hotel_reviews
SELECT sentiment, time_reported, problem
FROM hotel_reviews
CROSS APPLY 
OPENJSON(
    ai_extract(reviews_text, 'sentiment', 'time_reported', 'problem')
) WITH ( sentiment VARCHAR(1000), time_reported VARCHAR(100), problem VARCHAR(1000) );
```

The `ai_extract` function applies fuzzy contextual rules to identify and extract topics from text without requiring manual parsing or complex regular expressions. This approach simplifies text analysis  by using AI-driven semantic understanding rather than rigid pattern matching, making it more robust and adaptable to natural language variations.

## Related content

- [Transform and enrich data with AI functions](../data-science/ai-functions/overview.md)
- [Use Azure OpenAI in Fabric with AI Functions (preview)](../data-science/ai-services/how-to-use-openai-ai-functions.md)
