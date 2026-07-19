---
title: Dynamic Data Masking in Fabric Data Warehouse
description: Learn about the dynamic data masking data protection feature in Fabric data warehousing.
ms.reviewer: dhsundar
ms.date: 06/25/2026
ms.topic: concept-article
ai-usage: ai-assisted
---

# Dynamic data masking in Fabric Data Warehouse

**Applies to:** [!INCLUDE [fabric-se-and-dw](includes/applies-to-version/fabric-se-and-dw.md)]

Dynamic data masking is a data protection feature that limits sensitive data exposure by masking it to nonprivileged users. It simplifies the design and coding of security in your application.

Dynamic data masking helps prevent unauthorized viewing of sensitive data. Administrators specify how much sensitive data to reveal, with minimal effect on the application layer. You can configure dynamic data masking on designated database fields to hide sensitive data in the result sets of queries. The data in the database isn't changed, so existing applications can continue to work without modification because masking rules are applied to query results. Many applications can mask sensitive data without modifying existing queries.

Dynamic data masking provides these capabilities:

- A central data masking policy acts directly on sensitive fields in the database.
- Privileged users or roles can be designated to access the sensitive data.
- You have masking options to choose from: full masking and partial masking functions, and a random mask for numeric data.
- Simple Transact-SQL commands define and manage masks.

Dynamic data masking doesn't prevent database users from connecting directly to the database and running exhaustive queries that expose pieces of the sensitive data. Use dynamic data masking together with other Fabric security features like [column-level security](column-level-security.md) and [row-level security](row-level-security.md) to protect sensitive data in the database.

## Dynamic data masking functions

Define a masking rule on a column in a table to obfuscate the data in that column. Four types of masks are available.

| Function | Description | Examples |
| --- | --- | --- |
| Default | Full masking according to the data types of the designated fields.<br /><br />For string data types, use `XXXX` (or fewer) if the size of the field is fewer than 4 characters (**char**, **nchar**, **varchar**, **nvarchar**, **text**, **ntext**).<br /><br />For numeric data types use a zero value (**bigint**, **bit**, **decimal**, **int**, **money**, **numeric**, **smallint**, **smallmoney**, **tinyint**, **float**, **real**).<br /><br />For date and time data types, use `1900-01-01 00:00:00.0000000` (**date**, **datetime2**, **datetime**, **datetimeoffset**, **smalldatetime**, **time**).<br /><br />For binary data types use a single byte of ASCII value 0 (**binary**, **varbinary**, **image**). | Example column definition syntax: `Phone# varchar(12) MASKED WITH (FUNCTION = 'default()') NULL`<br /><br />Example of alter syntax: `ALTER COLUMN Gender ADD MASKED WITH (FUNCTION = 'default()')` |
| Email | Masking method that exposes the first letter of an email address and the constant suffix ".com", in the form of an email address. `aXXX@XXXX.com`. | Example definition syntax: `Email varchar(100) MASKED WITH (FUNCTION = 'email()') NULL`<br /><br />Example of alter syntax: `ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()')` |
| Random | A random masking function for use on any numeric type to mask the original value with a random value within a specified range. | Example definition syntax: `Account_Number bigint MASKED WITH (FUNCTION = 'random([start range], [end range])')`<br /><br />Example of alter syntax: `ALTER COLUMN [Month] ADD MASKED WITH (FUNCTION = 'random(1, 12)')` |
| Custom String | Masking method that exposes the first and last letters and adds a custom padding string in the middle. `prefix,[padding],suffix`<br /><br />If the original value is too short to complete the entire mask, part of the prefix or suffix isn't exposed. | Example definition syntax: `FirstName varchar(100) MASKED WITH (FUNCTION = 'partial(prefix,[padding],suffix)') NULL`<br /><br />Example of alter syntax: `ALTER COLUMN [Phone Number] ADD MASKED WITH (FUNCTION = 'partial(1,"XXXXXXX",0)')`<br /><br /> This turns a phone number like `555.123.1234` into `5XXXXXXX`. <br /><br />Additional example:<br /><br />`ALTER COLUMN [Phone Number] ADD MASKED WITH (FUNCTION = 'partial(5,"XXXXXXX",0)')` <br /><br /> This turns a phone number like `555.123.1234` into `555.1XXXXXXX`. |

For more examples, see [How to implement dynamic data masking in Fabric Data Warehouse](howto-dynamic-data-masking.md).

## Permissions for dynamic data masking

In Fabric Data Warehouse, users see masked data when they query masked columns if they're not members of the Administrator, Member, or Contributor roles in the workspace, or don't have elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)].

The following table lists the permissions required for each dynamic data masking operation:

| Operation | Required permission |
| --- | --- |
| Create a table that has masked columns | `CREATE TABLE` and `ALTER` on the schema |
| Add, replace, or remove a mask on a column | `ALTER ANY MASK` and `ALTER` on the table |
| View masked data | `SELECT` on the table |
| View unmasked data | `UNMASK` on the column or `CONTROL` on the database |

Grant `ALTER ANY MASK` to a security officer. Grant `UNMASK` to a user to allow that user to retrieve unmasked data from masked columns.

The `CONTROL` permission on the database includes both `ALTER ANY MASK` and `UNMASK`, so users who have `CONTROL` can view unmasked data. Administrative users or roles such as Admin, Member, or Contributor have `CONTROL` permission on the database by design and can view unmasked data by default. Elevated permissions on the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] include `CONTROL` permission.

<a id="security-consideration-bypassing-masking-using-inference-or-brute-force-techniques"></a>

## Security consideration: bypassing masking by using inference or brute-force techniques

Dynamic data masking simplifies application development by limiting data exposure in a set of predefined queries that the application uses. Although dynamic data masking can also help prevent accidental exposure of sensitive data when accessing data directly, unprivileged users with query permissions can use techniques to infer the actual data.

For example, a user who has permission to run queries on the warehouse can guess values to infer masked data. Assume that you define a mask on the `[Employee].[Salary]` column. The user connects directly to the database and starts guessing values, eventually inferring the `[Salary]` value in the `Employees` table. They run a range query against the `Employees` table:

```sql
SELECT ID, Name, Salary FROM Employees
WHERE Salary > 99999 and Salary < 100001;
```

The query returns:

| ID | Name | Salary |
| --- | --- | --- |
| 62543 | Jane Doe | 0 |
| 91245 | John Smith | 0 |

Even though the `Salary` column is masked (the values display as `0`), the `WHERE` clause confirms that both employees have a salary between $99,999 and $100,001. Don't use dynamic data masking alone to fully secure sensitive data from users with query access to the [!INCLUDE [fabric-dw](includes/fabric-dw.md)] or [!INCLUDE [fabric-se](includes/fabric-se.md)]. Dynamic data masking is appropriate for preventing accidental sensitive data exposure, but it doesn't protect against malicious intent to infer the underlying data.

Properly manage object-level security with [SQL granular permissions](sql-granular-permissions.md), and always follow the principle of least privilege.

## Related content

- [Workspace roles in Fabric data warehousing](workspace-roles.md)
- [Column-level security in Fabric data warehousing](column-level-security.md)
- [Row-level security in Fabric data warehousing](row-level-security.md)
- [Security for data warehousing in Microsoft Fabric](security.md)

## Next step

> [!div class="nextstepaction"]
> [How to implement dynamic data masking in Fabric Data Warehouse](howto-dynamic-data-masking.md)
