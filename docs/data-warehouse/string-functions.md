---
title: String functions in Microsoft Fabric
description: Learn how to clean, search, extract, combine, and format text with T-SQL string functions in Fabric Data Warehouse and the SQL analytics endpoint.
ms.reviewer: jovanpop
ms.date: 11/18/2026
ms.topic: concept-article
ai-usage: ai-generated
---
# String functions in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Use T-SQL string functions to clean imported text, extract parts of codes, find characters,
build labels, and prepare values for display. The functions and concatenation operators
in this article are available in both Fabric Data Warehouse and the SQL analytics endpoint.

Most functions are *scalar functions*: they return one value for each input row.
`STRING_SPLIT` instead returns rows, while `STRING_AGG` combines values from multiple
rows into one string.

For regular-expression matching or approximate string comparisons, see
[Regular expressions](regular-expressions.md) and
[String similarity functions](string-similarity.md). Those functions aren't covered here.

The examples use constants or small inline tables defined with `VALUES`, so you don't
need to create tables to run them. For example, `AS s(Code)` names the inline table `s`
and its column `Code`. `NULL` represents a missing or unknown value.

## Inspect strings

Use length functions to measure text and hash or checksum functions to generate a
fingerprint. These functions describe a value rather than transform its text.

| Function | Purpose |
|---|---|
| [LEN](/sql/t-sql/functions/len-transact-sql?view=fabric&preserve-view=true) | Counts characters, excluding trailing spaces. |
| [DATALENGTH](/sql/t-sql/functions/datalength-transact-sql?view=fabric&preserve-view=true) | Measures storage length in bytes, including trailing spaces. |
| [HASHBYTES](/sql/t-sql/functions/hashbytes-transact-sql?view=fabric&preserve-view=true) | Returns a hash of the input as `varbinary`. Use `SHA2_256` or `SHA2_512`. |
| [CHECKSUM](/sql/t-sql/functions/checksum-transact-sql?view=fabric&preserve-view=true) | Returns an `int` checksum based on SQL comparison rules and collation. |
| [BINARY_CHECKSUM](/sql/t-sql/functions/binary-checksum-transact-sql?view=fabric&preserve-view=true) | Returns an `int` checksum based on the input's byte representation. |

`DATALENGTH`, `CHECKSUM`, and `BINARY_CHECKSUM` also accept non-text inputs.
`HASHBYTES` accepts character or binary strings.

Fabric Data Warehouse and the SQL analytics endpoint use UTF-8 collations. The default
is `Latin1_General_100_BIN2_UTF8`. The case-insensitive alternative is
`Latin1_General_100_CI_AS_KS_WS_SC_UTF8`.
For `char` and `varchar`, ASCII characters use one byte each, while non-ASCII
characters can use two, three, or four bytes. See [Warehouse collation](collation.md).

This example uses `varchar` literals under the Fabric UTF-8 database collation.
The first value is `Pen` followed by two spaces; the other values include non-ASCII
characters:

```sql
SELECT TextValue,
       LEN(TextValue) AS CharacterCount,
       DATALENGTH(TextValue) AS ByteCount
FROM (VALUES (1, 'Pen  '), (2, 'café'), (3, '猫'), (4, '😀')) AS s(SortOrder, TextValue)
ORDER BY SortOrder;
```

| TextValue | CharacterCount | ByteCount |
|---|---|---|
| `Pen  ` | 3 | 5 |
| café | 4 | 5 |
| 猫 | 1 | 3 |
| 😀 | 1 | 4 |

`LEN` excludes trailing spaces and counts characters rather than UTF-8 bytes.
`DATALENGTH` includes trailing spaces and counts bytes. For `Pen  `, three ASCII
letters (3 bytes) plus two trailing spaces (2 bytes) give a total of 5 bytes.
`LEN` returns `3` because it ignores those spaces.

For non-ASCII text, `é` uses two bytes, `猫` uses three, and `😀` uses four. Don't use
byte counts as character positions.

The `N` prefix creates an `nvarchar` literal, which uses UTF-16, not UTF-8. These are
different encodings of Unicode characters. UTF-16 uses two bytes for `猫` and four for
`😀`. As a result, `DATALENGTH(N'猫')` returns `2`, not `3`, even in a UTF-8 database.
Check the input's data type and collation before interpreting a byte count.

For example, `HASHBYTES('SHA2_256', 'BK-0042-UK')` creates a binary fingerprint of a
product code. Hashes depend on the input bytes, so use consistent data types and
encodings when comparing results. The same text represented as UTF-8 `varchar` and
UTF-16 `nvarchar` can produce different hashes because the bytes differ.

`CHECKSUM` and `BINARY_CHECKSUM` can miss changes: different inputs can produce the same
checksum. `CHECKSUM` also ignores dashes and trailing spaces in `nchar` and `nvarchar`
inputs. Don't use either checksum as proof that strings are identical.

For `nvarchar` input, `BINARY_CHECKSUM` supports up to 255 characters. Use `HASHBYTES`
for longer text or when you need a stronger fingerprint.

## Find, extract, and split text

Use `CHARINDEX` or `PATINDEX` to find a position, `LEFT`, `RIGHT`, or `SUBSTRING` to
extract text, and `STRING_SPLIT` to turn a delimited value into rows.

| Function | Purpose |
|---|---|
| [CHARINDEX](/sql/t-sql/functions/charindex-transact-sql?view=fabric&preserve-view=true) | Finds the starting position of a literal substring. |
| [PATINDEX](/sql/t-sql/functions/patindex-transact-sql?view=fabric&preserve-view=true) | Finds the starting position of a pattern that uses SQL wildcards, such as `%` and `[0-9]`. |
| [LEFT](/sql/t-sql/functions/left-transact-sql?view=fabric&preserve-view=true) | Extracts a specified number of characters from the start. |
| [RIGHT](/sql/t-sql/functions/right-transact-sql?view=fabric&preserve-view=true) | Extracts a specified number of characters from the end. |
| [SUBSTRING](/sql/t-sql/functions/substring-transact-sql?view=fabric&preserve-view=true) | Extracts characters from a specified starting position. |
| [STRING_SPLIT](/sql/t-sql/functions/string-split-transact-sql?view=fabric&preserve-view=true) | Splits a string at a single-character separator into rows in a `value` column. This is a table-valued function. |

Positions start at `1`; `CHARINDEX` and `PATINDEX` return `0` when there's no match.
`PATINDEX` uses `LIKE` wildcards, not regular expressions. If the searched expression
is `NULL`, `PATINDEX` raises an error. Use `COALESCE(expression, '')` if treating missing
text as empty is appropriate.

### Extract parts of a code

The code `BK-0042-UK` contains a category, a product number, and a country. This query
extracts each part and locates the first separator and digit:

```sql
SELECT LEFT(Code, 2) AS Category,
       SUBSTRING(Code, 4, 4) AS ProductNumber,
       RIGHT(Code, 2) AS Country,
       CHARINDEX('-', Code) AS FirstSeparator,
       PATINDEX('%[0-9]%', Code) AS FirstDigit
FROM (VALUES ('BK-0042-UK')) AS s(Code);
```

| Category | ProductNumber | Country | FirstSeparator | FirstDigit |
|---|---|---|---|---|
| BK | 0042 | UK | 3 | 4 |

`SUBSTRING` starts at character `4` and takes four characters. `RIGHT` takes the final
two characters without requiring you to calculate their starting position.

### Split a delimited value into rows

Call `STRING_SPLIT` in `FROM`, because it returns a table rather than one scalar value:

```sql
SELECT value AS Product
FROM STRING_SPLIT('Pen,Pencil,Notebook', ',')
ORDER BY value;
```

| Product |
|---|
| Notebook |
| Pen |
| Pencil |

`STRING_SPLIT` doesn't guarantee input order. Here, `ORDER BY value` sorts the products
alphabetically. Consecutive separators produce empty strings. Filter with `WHERE value <> ''`
when you don't want empty entries.

## Clean and transform text

Use case-conversion functions to normalize letters, trim functions to remove padding,
and replacement functions to change characters within a value.

| Function | Purpose |
|---|---|
| [LOWER](/sql/t-sql/functions/lower-transact-sql?view=fabric&preserve-view=true) | Converts letters to lowercase. |
| [UPPER](/sql/t-sql/functions/upper-transact-sql?view=fabric&preserve-view=true) | Converts letters to uppercase. |
| [LTRIM](/sql/t-sql/functions/ltrim-transact-sql?view=fabric&preserve-view=true) | Removes leading spaces in its one-argument form. |
| [RTRIM](/sql/t-sql/functions/rtrim-transact-sql?view=fabric&preserve-view=true) | Removes trailing spaces in its one-argument form. |
| [TRIM](/sql/t-sql/functions/trim-transact-sql?view=fabric&preserve-view=true) | Removes spaces, or specified characters, from both ends. |
| [REPLACE](/sql/t-sql/functions/replace-transact-sql?view=fabric&preserve-view=true) | Replaces every occurrence of a substring. |
| [TRANSLATE](/sql/t-sql/functions/translate-transact-sql?view=fabric&preserve-view=true) | Maps individual characters to corresponding replacement characters. |
| [STUFF](/sql/t-sql/functions/stuff-transact-sql?view=fabric&preserve-view=true) | Deletes characters at a specified position and inserts replacement text there. |
| [REVERSE](/sql/t-sql/functions/reverse-transact-sql?view=fabric&preserve-view=true) | Reverses the order of characters. |

This example standardizes a country value and two code formats:

```sql
SELECT UPPER(TRIM('  uk  ')) AS Country,
       REPLACE('AB-0042', '-', '') AS CompactCode,
       TRANSLATE('A/B-C', '/-', '__') AS StandardCode;
```

| Country | CompactCode | StandardCode |
|---|---|---|
| UK | AB0042 | A_B_C |

`REPLACE` removes the hyphen by replacing it with an empty string. `TRANSLATE` maps both
`/` and `-` to `_` in one call; its source and replacement character lists must have
the same number of characters.

By default, the trim functions remove ordinary spaces, not every kind of whitespace.
For example, `TRIM('.' FROM '..Pen..')` returns `Pen`.

`REPLACE` can truncate non-`max` results at 8,000 bytes. Cast its string input to
`varchar(max)` when you need longer results.

## Combine text

Use `CONCAT` or `CONCAT_WS` to combine values within a row, and `STRING_AGG` to combine
values from multiple rows. You can also use the `||` and `+` operators to concatenate
string expressions within a row.

| Function or operator | Purpose | Form |
|---|---|---|
| [CONCAT](/sql/t-sql/functions/concat-transact-sql?view=fabric&preserve-view=true) | Joins values without a separator. | Scalar. |
| [CONCAT_WS](/sql/t-sql/functions/concat-ws-transact-sql?view=fabric&preserve-view=true) | Joins values with a separator. | Scalar. |
| [\|\|](/sql/t-sql/language-elements/string-concatenation-pipes-transact-sql?view=fabric&preserve-view=true) | Joins string expressions by using ANSI SQL concatenation syntax. | Operator. |
| [+](/sql/t-sql/language-elements/string-concatenation-transact-sql?view=fabric&preserve-view=true) | Joins string expressions by using T-SQL concatenation syntax. | Operator. |
| [STRING_AGG](/sql/t-sql/functions/string-agg-transact-sql?view=fabric&preserve-view=true) | Combines values from multiple rows into one string. | Aggregate. |

### Join values within a row

`CONCAT` converts its inputs to strings. `CONCAT_WS` adds a separator between values
that aren't `NULL`:

```sql
SELECT CONCAT('Order-', 42) AS OrderLabel,
       CONCAT_WS(' ', 'Alex', NULL, 'Taylor') AS FullName;
```

| OrderLabel | FullName |
|---|---|
| Order-42 | Alex Taylor |

`CONCAT` treats `NULL` as an empty string. `CONCAT_WS` skips `NULL` values and their
separators, so the missing middle name doesn't add a second space. It doesn't skip
empty strings.

With operators, explicitly convert numbers and dates to strings before concatenating.
Unlike `CONCAT`, `||` returns `NULL` if either input is `NULL`:

```sql
SELECT 'Order-' || CAST(42 AS varchar(10)) AS PipeLabel,
       'Order-' + CAST(42 AS varchar(10)) AS PlusLabel,
       'Order-' || CAST(NULL AS varchar(10)) AS NullLabel;
```

| PipeLabel | PlusLabel | NullLabel |
|---|---|---|
| Order-42 | Order-42 | `NULL` |

With [`CONCAT_NULL_YIELDS_NULL`](/sql/t-sql/statements/set-concat-null-yields-null-transact-sql?view=fabric&preserve-view=true)
set to `ON`, `+` also returns `NULL` for a `NULL` input. The setting doesn't change
the behavior of `||`.

The `+` operator also performs numeric addition, so mixing strings and numbers without
conversion can produce an error or an unintended calculation. Both concatenation
operators can truncate results at 8,000 bytes unless a large-value input is involved.
Cast an input to `varchar(max)` before the concatenation that could exceed this limit.

### Combine values from multiple rows

Use `STRING_AGG` to join product names with a comma and space. The example casts the
input to `varchar(max)` to allow a longer combined result. Without that cast, a
bounded `varchar` input produces a `varchar(8000)` result.

```sql
SELECT STRING_AGG(CAST(ProductName AS varchar(max)), ', ') AS ProductNames
FROM (VALUES ('Notebook'), ('Pen'), ('Pencil')) AS p(ProductName);
```

One possible result:

| ProductNames |
|---|
| Notebook, Pen, Pencil |

`STRING_AGG` skips `NULL` inputs and their separators. The concatenation order isn't
guaranteed. An outer `ORDER BY` doesn't control that order.

## Convert character codes and repeat text

Use `ASCII` and `UNICODE` to read a character's numeric code, and `CHAR` and `NCHAR`
to convert a code back to a character. Use `UNISTR` to turn Unicode escape sequences
into characters, and `SPACE` and `REPLICATE` to build padding or repeated text.
A Unicode *code point* is the number assigned to a character.

| Function | Purpose |
|---|---|
| [ASCII](/sql/t-sql/functions/ascii-transact-sql?view=fabric&preserve-view=true) | Returns the ASCII code for the first character. |
| [CHAR](/sql/t-sql/functions/char-transact-sql?view=fabric&preserve-view=true) | Returns a character for a code in the database character set. |
| [UNICODE](/sql/t-sql/functions/unicode-transact-sql?view=fabric&preserve-view=true) | Returns the Unicode code point for the first character. |
| [NCHAR](/sql/t-sql/functions/nchar-transact-sql?view=fabric&preserve-view=true) | Returns a Unicode character for a code point. |
| [UNISTR](/sql/t-sql/functions/unistr-transact-sql?view=fabric&preserve-view=true) | Replaces Unicode escape sequences in text with their characters. |
| [SPACE](/sql/t-sql/functions/space-transact-sql?view=fabric&preserve-view=true) | Returns a specified number of spaces. |
| [REPLICATE](/sql/t-sql/functions/replicate-transact-sql?view=fabric&preserve-view=true) | Repeats a string a specified number of times. |

This example reads numeric character codes and converts codes back to characters:

```sql
SELECT ASCII('A') AS AsciiCode,
       CHAR(65) AS AsciiCharacter,
       UNICODE(N'猫') AS UnicodeCode,
       NCHAR(29483) AS UnicodeCharacter;
```

| AsciiCode | AsciiCharacter | UnicodeCode | UnicodeCharacter |
|---|---|---|---|
| 65 | A | 29483 | 猫 |

`A` has code `65` in both ASCII and Unicode; `猫` has Unicode code point `29483`.
Use `UNICODE`, not `ASCII`, to obtain Unicode code points for non-ASCII text.
Both `N'猫'` and `NCHAR(29483)` produce UTF-16 text.

`UNISTR` uses `\` as its default escape character. It converts `\00E9`, `\732B`, and
`\+01F600` into `é`, `猫`, and `😀`. Use four hexadecimal digits after `\`, or six
after `\+`. For `char` and `varchar` inputs, `UNISTR` requires a UTF-8 collation.

```sql
SELECT UNISTR('caf\00E9 \732B \+01F600') AS ExpandedText;
```

| ExpandedText |
|---|
| café 猫 😀 |

The examples show the same code point in two notations: `29483` in decimal is `732B`
in hexadecimal. Both `NCHAR(29483)` and `UNISTR('\732B')` return `猫`.

`REPLICATE` can truncate non-`max` results at 8,000 bytes. Cast its string input to
`varchar(max)` when you need longer results.

## Encode and decode Base64

Use Base64 to represent binary data as text for exchange. Encoding isn't encryption.

| Function | Purpose |
|---|---|
| [BASE64_ENCODE](/sql/t-sql/functions/base64-encode-transact-sql?view=fabric&preserve-view=true) | Converts `varbinary` bytes to Base64-encoded `varchar` text. |
| [BASE64_DECODE](/sql/t-sql/functions/base64-decode-transact-sql?view=fabric&preserve-view=true) | Converts Base64-encoded `varchar` text back to `varbinary` bytes. |

This example encodes the UTF-8 bytes of `café` and decodes the same Base64 value:

```sql
SELECT BASE64_ENCODE(CAST('café' AS varbinary(max))) AS EncodedText,
       CAST(BASE64_DECODE('Y2Fmw6k=') AS varchar(max)) AS DecodedText;
```

| EncodedText | DecodedText |
|---|---|
| Y2Fmw6k= | café |

The `(max)` casts avoid truncating text or bytes to a small fixed length.
`BASE64_DECODE` returns bytes, not a character string. Here, `café` is five UTF-8 bytes
(`0x636166C3A9`), represented as eight Base64 characters. The final `=` is padding.
The cast back to `varchar` interprets the bytes as UTF-8. Only use this conversion
when the decoded bytes contain text in that encoding.

## Format display text and quote identifiers

Use `FORMAT` or `STR` for display text and `QUOTENAME` to delimit SQL identifiers.

| Function | Purpose |
|---|---|
| [FORMAT](/sql/t-sql/functions/format-transact-sql?view=fabric&preserve-view=true) | Formats numeric or date/time values by using a format string and optional culture. |
| [STR](/sql/t-sql/functions/str-transact-sql?view=fabric&preserve-view=true) | Converts a number to right-aligned text with a specified total length and decimal places. |
| [QUOTENAME](/sql/t-sql/functions/quotename-transact-sql?view=fabric&preserve-view=true) | Delimits a SQL identifier and escapes embedded delimiter characters. Inputs are limited to 128 characters. |

### Format numeric values

Specify the culture for predictable formatting. This example formats a
`decimal(10, 2)` amount:

```sql
SELECT FORMAT(CAST(1234.5 AS decimal(10, 2)), 'N2', 'en-US') AS DisplayAmount,
       LTRIM(STR(1234.5, 10, 2)) AS PlainAmount;
```

| DisplayAmount | PlainAmount |
|---|---|
| `1,234.50` | `1234.50` |

Both columns contain text, not numbers. `FORMAT` adds culture-specific separators.
`STR` pads to the requested width, and `LTRIM` removes that padding. Use `CAST` or
`CONVERT` for data-type conversions rather than display formatting.

### Quote SQL identifiers

Use `QUOTENAME` to delimit an identifier that contains a closing bracket:

```sql
SELECT QUOTENAME('Sales]2026') AS QuotedIdentifier;
```

| QuotedIdentifier |
|---|
| `[Sales]]2026]` |

`QUOTENAME` doubles the closing bracket inside the identifier. It quotes identifiers,
not data values. Use query parameters for values in dynamic SQL.

## Collation, `NULL` values, and data types

These considerations apply across the function groups:

- Searches and case conversion depend on the input collation. Don't assume that string
  matching is case-insensitive. See [Warehouse collation](collation.md).
- Most scalar string functions return `NULL` for `NULL` inputs, but behavior varies.
  See the behavior described earlier for `CONCAT`, `CONCAT_WS`, `STRING_AGG`, and
  `PATINDEX`, and check each function's reference for details. For operator behavior,
  see [Combine text](#combine-text).
- Warehouse tables store text in `char` or `varchar` columns. You can use
  Unicode-returning functions in query expressions, but you can't create `nchar` or
  `nvarchar` columns in warehouse tables. See [Data types](data-types.md).

## Related content

- [T-SQL functions: string functions](/sql/t-sql/functions/functions?view=fabric&preserve-view=true#string-functions).
- [T-SQL surface area in Fabric Data Warehouse](tsql-surface-area.md).
- [Data types in Fabric Data Warehouse](data-types.md).
- [Warehouse collation](collation.md).
- [Regular expressions](regular-expressions.md).
- [String similarity functions](string-similarity.md).
