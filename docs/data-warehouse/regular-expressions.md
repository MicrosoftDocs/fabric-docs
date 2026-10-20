---
title: Regular expression functions
description: Learn how to use the scalar regular expression (regex) T-SQL functions to match, extract, count, and replace text patterns in Fabric Data Warehouse.
ms.reviewer: jovanpop
ms.date: 10/05/2026
ms.topic: how-to
---
# Use regular expression functions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Regular expression (regex) functions let you match complex text patterns and manipulate string data directly in your T-SQL queries. Use them to validate formats, extract values from semi-structured text, count pattern occurrences, and clean or mask data without moving it out of the warehouse.

> [!NOTE]
> Regular expressions are currently in preview.

[!INCLUDE [fabric-dw](includes/fabric-dw.md)] and the SQL analytics endpoint support the **scalar** regular expression functions. Each of these functions returns one value per input row, so you can use them in the `SELECT` list, `WHERE`, `JOIN`, `GROUP BY`, `ORDER BY`, and `CASE` expressions.

> [!NOTE]
> Only scalar regular expression functions are available in [!INCLUDE [fabric-dw](includes/fabric-dw.md)]. The table-valued functions [REGEXP_MATCHES](/sql/t-sql/functions/regexp-matches-transact-sql) and [REGEXP_SPLIT_TO_TABLE](/sql/t-sql/functions/regexp-split-to-table-transact-sql) aren't supported.

## Supported functions

| Function | Return type | Description |
|---|---|---|
| [REGEXP_LIKE](/sql/t-sql/functions/regexp-like-transact-sql) | Boolean | Indicates whether the text input matches the regex pattern. Use it as a predicate, for example in a `WHERE` clause or a `CASE` expression. |
| [REGEXP_REPLACE](/sql/t-sql/functions/regexp-replace-transact-sql) | String expression | Returns the source string with occurrences of the regex pattern replaced by a replacement string. If no matches are found, returns the original string. |
| [REGEXP_SUBSTR](/sql/t-sql/functions/regexp-substr-transact-sql) | String expression | Returns the *n*th occurrence of a substring that matches the regex pattern. |
| [REGEXP_INSTR](/sql/t-sql/functions/regexp-instr-transact-sql) | `int` | Returns the starting or ending position of the matched substring. |
| [REGEXP_COUNT](/sql/t-sql/functions/regexp-count-transact-sql) | `int` | Returns the number of times the regex pattern occurs in a string. |

## Syntax

```syntaxsql
REGEXP_LIKE ( string_expression, pattern_expression [ , flags ] )

REGEXP_REPLACE ( string_expression, pattern_expression [ , string_replacement [ , start [ , occurrence [ , flags ] ] ] ] )

REGEXP_SUBSTR ( string_expression, pattern_expression [ , start [ , occurrence [ , flags [ , group ] ] ] ] )

REGEXP_INSTR ( string_expression, pattern_expression [ , start [ , occurrence [ , return_option [ , flags [ , group ] ] ] ] ] )

REGEXP_COUNT ( string_expression, pattern_expression [ , start [ , flags ] ] )
```

For a full description of each argument, see the linked function reference in [Supported functions](#supported-functions).

### Flags

The optional `flags` argument is a `char` or `varchar` value of up to 30 characters that sets the matching modifiers. If you provide contradictory flags, the last one wins. For example, `'ic'` results in case-sensitive matching.

| Flag | Description |
|---|---|
| `c` | Case-sensitive matching. This is the default. |
| `i` | Case-insensitive matching. |
| `m` | Multi-line mode: `^` and `$` match the beginning and end of each line, in addition to the beginning and end of the text. |
| `s` | Lets `.` match the newline character `\n`. |

## Considerations

- The `string_expression` argument accepts character string types. Large values (`varchar(max)`) are supported up to 2 MB.
- The `pattern_expression` argument supports a maximum length of 8,000 bytes.
- Regular expression functions don't honor collation rules. Matching can differ from other string comparisons, such as `LIKE`. To control case sensitivity, use the `i` and `c` flags instead of relying on the column collation. For more information, see [Data Warehouse collation](collation.md).
- `REGEXP_LIKE` returns a Boolean value and can't be returned directly as a column. To return the result as a column, wrap it in a `CASE` expression.

## Examples

The following examples use a small inline data set, so you can run them in any warehouse or SQL analytics endpoint.

### A. Filter rows that match a pattern

Use `REGEXP_LIKE` in a `WHERE` clause to return only rows with a valid email address format.

```sql
SELECT CustomerId, Email
FROM (VALUES
        (1, 'anna@contoso.com'),
        (2, 'not-an-email'),
        (3, 'Bob.Smith@Fabrikam.org')
     ) AS c (CustomerId, Email)
WHERE REGEXP_LIKE(Email, '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

To return the match result as a column, wrap `REGEXP_LIKE` in a `CASE` expression:

```sql
SELECT Email,
       CASE WHEN REGEXP_LIKE(Email, '@contoso\.com$', 'i') THEN 'Internal' ELSE 'External' END AS EmailType
FROM (VALUES ('anna@CONTOSO.com'), ('bob@fabrikam.org')) AS c (Email);
```

### B. Extract a value from text

Use `REGEXP_SUBSTR` to extract the first order number in the format `ORD-` followed by digits from a free-text comment.

```sql
SELECT Comment,
       REGEXP_SUBSTR(Comment, 'ORD-\d+') AS OrderNumber
FROM (VALUES
        ('Customer called about ORD-10293 and ORD-10311.'),
        ('No order referenced.')
     ) AS t (Comment);
```

To extract only part of the match, use a capture group. The following query returns the domain of each email address:

```sql
SELECT REGEXP_SUBSTR(Email, '@(.+)$', 1, 1, 'c', 1) AS EmailDomain
FROM (VALUES ('anna@contoso.com'), ('bob@fabrikam.org')) AS c (Email);
```

### C. Count pattern occurrences

Use `REGEXP_COUNT` to count how many numbers appear in each string.

```sql
SELECT Comment,
       REGEXP_COUNT(Comment, '\d+') AS NumberCount
FROM (VALUES
        ('Shipped 3 boxes on 12 May, invoice 4471.'),
        ('No numbers here.')
     ) AS t (Comment);
```

### D. Find the position of a match

Use `REGEXP_INSTR` to find the starting position, and the ending position, of the first sequence of digits.

```sql
SELECT ProductCode,
       REGEXP_INSTR(ProductCode, '\d+')             AS FirstDigitStart,
       REGEXP_INSTR(ProductCode, '\d+', 1, 1, 1)    AS FirstDigitEnd
FROM (VALUES ('BK-R93R-62'), ('HL-U509')) AS p (ProductCode);
```

### E. Clean and mask data

Use `REGEXP_REPLACE` to standardize phone numbers with capture groups, and to mask all but the last four digits.

```sql
SELECT Phone,
       REGEXP_REPLACE(Phone, '^(\d{3})-(\d{3})-(\d{4})$', '(\1) \2-\3') AS FormattedPhone,
       REGEXP_REPLACE(Phone, '^\d{3}-\d{3}', '***-***')               AS MaskedPhone
FROM (VALUES ('425-555-0187'), ('206-555-0142')) AS c (Phone);
```

The following query collapses repeated whitespace into a single space:

```sql
SELECT REGEXP_REPLACE('Fabric    Data   Warehouse', '\s+', ' ') AS CleanText;
```

### F. Group and aggregate by an extracted value

Because the functions are scalar, you can use them in `GROUP BY` clauses. The following query counts customers per email domain.

```sql
SELECT LOWER(REGEXP_SUBSTR(Email, '@(.+)$', 1, 1, 'c', 1)) AS EmailDomain,
       COUNT(*) AS Customers
FROM (VALUES
        ('anna@contoso.com'),
        ('bob@Contoso.com'),
        ('chris@fabrikam.org')
     ) AS c (Email)
GROUP BY LOWER(REGEXP_SUBSTR(Email, '@(.+)$', 1, 1, 'c', 1));
```

## Related content

- [Regular expressions functions (Transact-SQL)](/sql/t-sql/functions/regular-expressions-functions-transact-sql)
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md)
- [Data types in Fabric Data Warehouse](data-types.md)
- [Data Warehouse collation](collation.md)
- [Query the SQL analytics endpoint or Warehouse in Microsoft Fabric](query-warehouse.md)
