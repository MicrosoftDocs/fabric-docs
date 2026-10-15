---
title: String similarity functions
description: Learn how to use the EDIT_DISTANCE, EDIT_DISTANCE_SIMILARITY, JARO_WINKLER_DISTANCE, JARO_WINKLER_SIMILARITY, SOUNDEX, and DIFFERENCE T-SQL functions to compare how similar strings are in Fabric Data Warehouse.
ms.reviewer: jovanpop
ms.date: 10/05/2026
ms.topic: how-to
---
# Use string similarity functions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

String similarity functions compare two strings and return how different, or how similar, they are. Use them to find values that don't match exactly because of spelling errors, transposed or missing characters, abbreviations, regional spelling differences, or different spellings of names that sound the same. Typical scenarios include deduplicating customer records, matching product names across sources, and cleaning manually entered data.

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)] support two groups of string similarity functions, which you can use together:
- **Fuzzy string matching functions** compare the characters in two strings: `EDIT_DISTANCE`, `EDIT_DISTANCE_SIMILARITY`, `JARO_WINKLER_DISTANCE`, and `JARO_WINKLER_SIMILARITY`.
- **Phonetic functions** compare how two strings sound when spoken in English: `SOUNDEX` and `DIFFERENCE`.

## Supported functions

The following scalar functions are available in [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and and [!INCLUDE [fabric-se](includes/fabric-se.md)].

| Function | Return type | Description |
|---|---|---|
| [EDIT_DISTANCE](/sql/t-sql/functions/edit-distance-transact-sql?view=fabric&preserve-view=true) | `int` | Returns the minimum number of insertions, deletions, substitutions, and transpositions needed to transform one string into the other. A lower value means the strings are more similar. |
| [EDIT_DISTANCE_SIMILARITY](/sql/t-sql/functions/edit-distance-similarity-transact-sql?view=fabric&preserve-view=true) | `int` | Returns a similarity score based on edit distance, from `0` (no similarity) to `100` (exact match). |
| [JARO_WINKLER_DISTANCE](/sql/t-sql/functions/jaro-winkler-distance-transact-sql?view=fabric&preserve-view=true) | `float` | Returns the Jaro-Winkler distance between two strings, giving preference to strings that match from the beginning. A lower value means the strings are more similar. |
| [JARO_WINKLER_SIMILARITY](/sql/t-sql/functions/jaro-winkler-similarity-transact-sql?view=fabric&preserve-view=true) | `int` | Returns a Jaro-Winkler similarity score from `0` (no similarity) to `100` (exact match). |
| [SOUNDEX](/sql/t-sql/functions/soundex-transact-sql?view=fabric&preserve-view=true) | `varchar` | Returns a four-character code that represents how a string sounds when spoken in English. Strings that sound alike return the same code. |
| [DIFFERENCE](/sql/t-sql/functions/difference-transact-sql?view=fabric&preserve-view=true) | `int` | Compares the `SOUNDEX` codes of two strings and returns a value from `0` (no similarity) to `4` (the same or very similar sound). |

## Syntax

```syntaxsql
EDIT_DISTANCE ( character_expression, character_expression [ , maximum_distance ] )

EDIT_DISTANCE_SIMILARITY ( character_expression, character_expression )

JARO_WINKLER_DISTANCE ( character_expression, character_expression )

JARO_WINKLER_SIMILARITY ( character_expression, character_expression )

SOUNDEX ( character_expression )

DIFFERENCE ( character_expression, character_expression )
```

## Choose a function

- **EDIT_DISTANCE** and **EDIT_DISTANCE_SIMILARITY** implement the restricted Damerau-Levenshtein algorithm, also known as Optimal String Alignment (OSA). Each edit is an insertion, deletion, or substitution of one character, or a transposition of two adjacent characters. Use them when every character change counts equally.
- **JARO_WINKLER_DISTANCE** and **JARO_WINKLER_SIMILARITY** use the Jaro-Winkler algorithm, which gives extra weight to strings that share the same prefix. Use them for person names, company names, and other values where the beginning of the string is usually entered correctly.
- **SOUNDEX** and **DIFFERENCE** implement the Soundex phonetic algorithm, which ignores vowels and groups consonants that sound alike. Use them for English names and words that are spelled differently but pronounced the same, such as `Smith` and `Smythe`. Don't use them for codes, identifiers, or non-English text. Because `SOUNDEX` keeps the first letter as-is and ignores vowels, it can miss names that sound the same, such as `Catherine` and `Katherine`, and match names that are different, such as `Robert` and `Rupert`.
- Use the *distance* functions (`EDIT_DISTANCE` and `JARO_WINKLER_DISTANCE`) when you want to filter by an absolute threshold of changes. Use the *similarity* functions (`EDIT_DISTANCE_SIMILARITY` and `JARO_WINKLER_SIMILARITY`) when you want a normalized `0`-`100` score that's easy to compare across values of different lengths. Use `DIFFERENCE` when you want a phonetic score from `0` to `4`, and compare `SOUNDEX` codes when you want an exact phonetic match, for example as a join key.

### Alternative: compare with a collation

If values differ only by case, accents, Japanese kana type, or character width, such as `Café` and `CAFE`, you don't need a similarity function. Compare the values with the `COLLATE` clause and a collation that ignores the difference, for example `Latin1_General_100_CI_AI`, to get an exact match. An exact comparison is simpler and faster than a similarity score. In [!INCLUDE [fabric-dw](includes/fabric-dw.md)] and [!INCLUDE [fabric-se](includes/fabric-se.md)], the `COLLATE` clause in a string expressions accepts any collation. For more information, see [COLLATE (Transact-SQL)](/sql/t-sql/statements/collations?view=fabric&preserve-view=true) and [Data Warehouse collation](collation.md).

## Considerations

- The character expressions can be a constant, variable, or column.
- If any input of a fuzzy string matching function is `NULL`, the function returns `NULL`.
- The optional `maximum_distance` argument of `EDIT_DISTANCE` lets the function stop processing early. If the actual distance is greater than `maximum_distance`, the function returns `maximum_distance + 1`. Use it to improve performance when you only need to know whether values are within a threshold.
- Comparison behavior, including case sensitivity, is determined by the collation of the input expressions. With the default case-sensitive collation, `'Contoso'` and `'contoso'` aren't an exact match. To compare values regardless of case, normalize them with `UPPER()` or `LOWER()` first. `SOUNDEX` is also collation sensitive.

## Examples

The examples use inline data, so you can run them in any warehouse or SQL analytics endpoint.

### A. Compare two strings

The following example compares the UK and US spelling of the same word with all the string similarity functions.

```sql
SELECT EDIT_DISTANCE('Colour', 'Color')            AS ED_Distance,
       EDIT_DISTANCE_SIMILARITY('Colour', 'Color') AS ED_Similarity,
       JARO_WINKLER_DISTANCE('Colour', 'Color')    AS JW_Distance,
       JARO_WINKLER_SIMILARITY('Colour', 'Color')  AS JW_Similarity,
       SOUNDEX('Colour')                           AS Soundex1,
       SOUNDEX('Color')                            AS Soundex2,
       DIFFERENCE('Colour', 'Color')               AS SoundDiff;
```

Here's the result set.

```output
ED_Distance ED_Similarity JW_Distance        JW_Similarity Soundex1 Soundex2 SoundDiff
----------- ------------- ------------------ ------------- -------- -------- ---------
1           83            0.0333333333333333 97            C460     C460     4
```

`Colour` becomes `Color` with one deletion, so the edit distance is `1`. Both strings start with the same four characters, so the Jaro-Winkler similarity is higher. The removed `u` is a vowel, which `SOUNDEX` ignores, so both words return the code `C460` and `DIFFERENCE` returns `4`.

### B. Compare a value with similar words

The following example compares one value, stored in the `@word` variable, with a set of similar words defined in a common table expression (CTE). Each word differs from `Warehouse` by a known number and type of edits, so you can see how each kind of change affects the result of each function. The comment next to each word describes how it differs from `Warehouse`.

```sql
DECLARE @word VARCHAR(50) = 'Warehouse';

WITH Words AS (
    SELECT Word
    FROM (VALUES
        ('Warehouse'),      -- Exact match
        ('Warehouses'),     -- One insertion at the end
        ('Warehousse'),     -- One insertion in the middle
        ('Warehous'),       -- One deletion at the end
        ('Warehuse'),       -- One deletion in the middle
        ('Xarehouse'),      -- One substitution of the first character
        ('Warehiuse'),      -- One substitution in the middle
        ('Warehousx'),      -- One substitution of the last character
        ('Wraehouse'),      -- One transposition near the beginning
        ('Warehuose'),      -- One transposition near the end
        ('Wrehous'),        -- Two deletions
        ('Lakehouse'),      -- Two substitutions at the beginning
        ('DataWarehouse'),  -- Four insertions at the beginning
        ('house')           -- Four deletions at the beginning
    ) AS w (Word)
)
SELECT Word,
       EDIT_DISTANCE(@word, Word)                   AS ED_Dist,
       EDIT_DISTANCE_SIMILARITY(@word, Word)        AS ED_Similarity,
       ROUND(JARO_WINKLER_DISTANCE(@word, Word), 4) AS JW_Dist,
       JARO_WINKLER_SIMILARITY(@word, Word)         AS JW_Similarity,
       SOUNDEX(Word)                                AS SoundCode,
       DIFFERENCE(@word, Word)                      AS SoundDiff
FROM Words
ORDER BY ED_Distance, JW_Distance;
```

Here's the result set.

```output
Word           ED_Dist ED_Similarity JW_Dist  JW_Similarity SoundCode SoundDiff
-------------- ------- ------------- -------- ------------- --------- ---------
Warehouse      0       100           0        100           W620      4
Warehousse     1       90            0.02     98            W620      4
Warehouses     1       90            0.02     98            W622      3
Warehous       1       89            0.0222   98            W620      4
Warehuse       1       89            0.0222   98            W620      4
Warehuose      1       89            0.0222   98            W620      4
Wraehouse      1       89            0.0333   97            W620      4
Warehousx      1       89            0.0444   96            W620      4
Warehiuse      1       89            0.0444   96            W620      4
Xarehouse      1       89            0.0741   93            X620      3
Wrehous        2       78            0.0667   93            W620      4
Lakehouse      2       78            0.1481   85            L220      2
DataWarehouse  4       69            0.1396   86            D362      2
house          4       56            0.563    44            H200      2
```

The results show the following behavior:

- **One edit of any kind counts as distance `1`.** An insertion (`Warehouses`), a deletion (`Warehous`), a substitution (`Warehiuse`), and a transposition of two adjacent characters (`Wraehouse`) each return an `ED_Distance` of `1`. Two edits (`Wrehous`, `Lakehouse`) return `2`.
- **Edit distance similarity depends on string length.** The same single edit returns `90` when the longer string has 10 characters (`Warehouses`) and `89` when it has 9 characters (`Warehous`).
- **Jaro-Winkler depends on where the change is.** `Warehousx`, `Warehiuse`, and `Xarehouse` all have an edit distance of `1`, but the change in the first character in `Xarehouse` gives a Jaro-Winkler distance of `0.0741`, while a change after the first four characters in `Warehousx` and `Warehiuse` gives `0.0444`. The Jaro-Winkler algorithm gives a bonus to strings that share the same first characters (up to four).
- **Edit distance and Jaro-Winkler can rank results differently.** `DataWarehouse` has a larger edit distance (`4`) than `Lakehouse` (`2`), but a smaller Jaro-Winkler distance, because it contains the whole word `Warehouse`. `house` has the same edit distance as `DataWarehouse`, but it's the least similar word by every other measure, because it's shorter and doesn't share the first characters of `Warehouse`.
- **SOUNDEX ignores vowels.** Most of the words return the same code as `Warehouse`, `W620`, and a `DIFFERENCE` of `4`, even `Wrehous` with two deletions, because the edits change only vowels or add a consonant that sounds the same as its neighbor. A change to the first letter (`Xarehouse`) or to the consonants (`Lakehouse`) returns a different code and a lower `DIFFERENCE`. This makes `SOUNDEX` a poor choice for detecting typos.
- **The comparison follows the collation.** With a case-sensitive collation, which is the default in a warehouse, `WAREHOUSE` returns an `ED_Distance` of `8`, because every lowercase letter counts as a substitution. To ignore case, compare `UPPER(@word)` with `UPPER(Word)`.

### C. Compare names that sound alike

The following example compares pairs of English first and last names by using the phonetic and the fuzzy string matching functions.

```sql
SELECT Name1,
       Name2,
       SOUNDEX(Name1)                        AS Soundex1,
       SOUNDEX(Name2)                        AS Soundex2,
       DIFFERENCE(Name1, Name2)              AS SoundDiff,
       EDIT_DISTANCE(Name1, Name2)           AS ED_Distance,
       JARO_WINKLER_SIMILARITY(Name1, Name2) AS JW_Similarity
FROM (VALUES
        ('Smith', 'Smythe'),
        ('Jon', 'John'),
        ('Steven', 'Stephen'),
        ('Catherine', 'Katherine'),
        ('Robert', 'Rupert')
     ) AS n (Name1, Name2);
```

Here's the result set.

```output
Name1     Name2     Soundex1 Soundex2 SoundDiff ED_Distance JW_Similarity
--------- --------- -------- -------- --------- ----------- -------------
Smith     Smythe    S530     S530     4         2           86
Jon       John      J500     J500     4         1           93
Steven    Stephen   S315     S315     4         2           89
Catherine Katherine C365     K365     3         1           93
Robert    Rupert    R163     R163     4         2           80
```

The results show the following behavior:

- **SOUNDEX matches different spellings of the same sound.** `Smith` and `Smythe`, and `Steven` and `Stephen`, return the same code, even though they're two edits apart.
- **SOUNDEX keeps the first letter.** `Catherine` and `Katherine` sound the same, but return different codes because they start with different letters. The fuzzy string matching functions rate them as very similar, with an edit distance of `1`.
- **SOUNDEX can match different names.** `Robert` and `Rupert` are different names, but they return the same code because `SOUNDEX` ignores vowels and groups `b` and `p` together.

### D. Match records from two sources

The following example matches customer names from a CRM system with customer names from a billing system, where the same customer is often entered with small differences. The join condition uses `EDIT_DISTANCE` with the `maximum_distance` argument set to `3`, so the function stops calculating as soon as a pair is more than three edits apart. Both names are converted with `UPPER()` so that the comparison ignores case.

```sql
WITH Crm AS (
    SELECT CustomerName
    FROM (VALUES
        ('Contoso Ltd'),
        ('Fabrikam Inc.'),
        ('Northwind Traders'),
        ('Adventure Works'),
        ('Wide World Importers'),
        ('Tailspin Toys')
    ) AS c (CustomerName)
),
Billing AS (
    SELECT CustomerName
    FROM (VALUES
        ('Contoso, Ltd.'),
        ('Fabrikam Inc'),
        ('Nortwind Traders'),
        ('Adventure-Works'),
        ('Wide World Importer'),
        ('Wingtip Toys'),
        ('Northwind Trading')
    ) AS b (CustomerName)
)
SELECT c.CustomerName AS CrmName,
       b.CustomerName AS BillingName,
       EDIT_DISTANCE(UPPER(c.CustomerName), UPPER(b.CustomerName))            AS EditDistance,
       EDIT_DISTANCE_SIMILARITY(UPPER(c.CustomerName), UPPER(b.CustomerName)) AS Similarity
FROM Crm AS c
LEFT JOIN Billing AS b
    ON EDIT_DISTANCE(UPPER(c.CustomerName), UPPER(b.CustomerName), 3) <= 3
ORDER BY CrmName, Similarity DESC;
```

Here's the result set.

```output
CrmName              BillingName         EditDistance Similarity
-------------------- ------------------- ------------ ----------
Adventure Works      Adventure-Works     1            93
Contoso Ltd          Contoso, Ltd.       2            85
Fabrikam Inc.        Fabrikam Inc        1            92
Northwind Traders    Nortwind Traders    1            94
Northwind Traders    Northwind Trading   3            82
Tailspin Toys        NULL                NULL         NULL
Wide World Importers Wide World Importer 1            95
```

`Northwind Traders` has two candidates within three edits, and `Tailspin Toys` has no match in the billing system. To keep only the best candidate for each CRM name, rank the candidates with `ROW_NUMBER()`:

```sql
WITH Crm AS (
    SELECT CustomerName
    FROM (VALUES ('Contoso Ltd'), ('Fabrikam Inc.'), ('Northwind Traders'), ('Adventure Works'), ('Wide World Importers'), ('Tailspin Toys')) AS c (CustomerName)
),
Billing AS (
    SELECT CustomerName
    FROM (VALUES ('Contoso, Ltd.'), ('Fabrikam Inc'), ('Nortwind Traders'), ('Adventure-Works'), ('Wide World Importer'), ('Wingtip Toys'), ('Northwind Trading')) AS b (CustomerName)
),
Candidates AS (
    SELECT c.CustomerName AS CrmName,
           b.CustomerName AS BillingName,
           EDIT_DISTANCE_SIMILARITY(UPPER(c.CustomerName), UPPER(b.CustomerName)) AS Similarity
    FROM Crm AS c
    INNER JOIN Billing AS b
        ON EDIT_DISTANCE(UPPER(c.CustomerName), UPPER(b.CustomerName), 3) <= 3
)
SELECT CrmName, BillingName, Similarity
FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY CrmName ORDER BY Similarity DESC) AS MatchRank
    FROM Candidates
) AS ranked
WHERE MatchRank = 1
ORDER BY CrmName;
```

Here's the result set.

```output
CrmName              BillingName         Similarity
-------------------- ------------------- ----------
Adventure Works      Adventure-Works     93
Contoso Ltd          Contoso, Ltd.       85
Fabrikam Inc.        Fabrikam Inc        92
Northwind Traders    Nortwind Traders    94
Wide World Importers Wide World Importer 95
```

`SOUNDEX` and `DIFFERENCE` aren't a good fit for this scenario. A `SOUNDEX` code represents only the first letter and the next three consonant sounds, so it ignores most of a multi-word name such as a company name.

Comparing every row of one table with every row of another can be expensive for large tables. To reduce the number of compared pairs, add a filter or equality condition on a column that both sources share.

## Related content

- [Fuzzy string matching overview](/sql/relational-databases/fuzzy-string-match/overview)
- [SOUNDEX (Transact-SQL)](/sql/t-sql/functions/soundex-transact-sql?view=fabric&preserve-view=true)
- [DIFFERENCE (Transact-SQL)](/sql/t-sql/functions/difference-transact-sql?view=fabric&preserve-view=true)
- [String functions (Transact-SQL)](/sql/t-sql/functions/string-functions-transact-sql)
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Data Warehouse collation](collation.md)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
