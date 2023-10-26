---
# Required metadata
# For more information, see https://review.learn.microsoft.com/en-us/help/platform/learn-editor-add-metadata?branch=main
# For valid values of ms.service, ms.prod, and ms.topic, see https://review.learn.microsoft.com/en-us/help/platform/metadata-taxonomies?branch=main

title:       # Add a title for the browser tab
description: # Add a meaningful description for search results
author:      SQLStijn-MSFT # GitHub alias
ms.author:   stwynant # Microsoft alias
ms.service:  # Add the ms.service or ms.prod value
# ms.prod:   # To use ms.prod, uncomment it and delete ms.service
ms.topic:    # Add the ms.topic value
ms.date:     10/26/2023
---

# Dynamic Data Masking

Dynamic data masking (DDM) limits sensitive data exposure by masking it to nonprivileged users. It can be used to greatly simplify the design and coding of security in your application.

Dynamic data masking helps prevent unauthorized access to sensitive data by enabling customers to specify how much sensitive data to reveal with minimal effect on the application layer. DDM can be configured on designated database fields to hide sensitive data in the result sets of queries. With DDM, the data in the database isn't changed. DDM is easy to use with existing applications, since masking rules are applied in the query results. Many applications can mask sensitive data without modifying existing queries.

- A central data masking policy acts directly on sensitive fields in the database.

- Designate privileged users or roles that do have access to the sensitive data.

- DDM features full masking and partial masking functions, and a random mask for numeric data.

- Simple Transact-SQL commands define and manage masks.

The purpose of dynamic data masking is to limit exposure of sensitive data, preventing users who shouldn't have access to the data from viewing it. Dynamic data masking doesn't aim to prevent database users from connecting directly to the database and running exhaustive queries that expose pieces of the sensitive data. Dynamic data masking is complementary to other Fabric security features like Column-level Security & Row-level security. It's highly recommended to use it with them in order to better protect the sensitive data in the database.

### Define a Dynamic Data mask

A masking rule may be defined on a column in a table in order to obfuscate the data in that column. There are five types of masks available.

|Function|Description|Examples|
| -------- | -------- | -------- |
|Default|Full masking according to the data types of the designated fields.  
For string data types, use XXXX (or fewer) if the size of the field is fewer than 4 characters (char, nchar, varchar, nvarchar, text, ntext).  
  
  
  
For numeric data types use a zero value (bigint, bit, decimal, int, money, numeric, smallint, smallmoney, tinyint, float, real).  
  
  
  
For date and time data types, use 1900-01-01 00:00:00.0000000 (date, datetime2, datetime, datetimeoffset, smalldatetime, time).  
  
  
  
For binary data types use a single byte of ASCII value 0 (binary, varbinary, image).|Example column definition syntax: Phone# varchar(12) MASKED WITH (FUNCTION = 'default()') NULL  
  
  
  
Example of alter syntax: ALTER COLUMN Gender ADD MASKED WITH (FUNCTION = 'default()')|
|Email|Masking method that exposes the first letter of an email address and the constant suffix ".com", in the form of an email address. aXXX@XXXX.com.|Example definition syntax: Email varchar(100) MASKED WITH (FUNCTION = 'email()') NULL  
  
  
  
Example of alter syntax: ALTER COLUMN Email ADD MASKED WITH (FUNCTION = 'email()')|
|Random|A random masking function for use on any numeric type to mask the original value with a random value within a specified range.|Example definition syntax: Account_Number bigint MASKED WITH (FUNCTION = 'random([start range], [end range])')  
  
  
  
Example of alter syntax: ALTER COLUMN [Month] ADD MASKED WITH (FUNCTION = 'random(1, 12)')|
|Custom String|Masking method that exposes the first and last letters and adds a custom padding string in the middle. prefix,[padding],suffix  
  
  
  
If the original value is too short to complete the entire mask, part of the prefix or suffix isn't exposed.|Example definition syntax: FirstName varchar(100) MASKED WITH (FUNCTION = 'partial(prefix,[padding],suffix)') NULL  
  
  
  
Example of alter syntax: ALTER COLUMN [Phone Number] ADD MASKED WITH (FUNCTION = 'partial(1,"XXXXXXX",0)')  
  
  
  
 This turns a phone number like 555.123.1234 into 5XXXXXXX.   
  
  
  
Additional example:  
  
  
  
ALTER COLUMN [Phone Number] ADD MASKED WITH (FUNCTION = 'partial(5,"XXXXXXX",0)')   
  
  
  
 This turns a phone number like 555.123.1234 into 555.1XXXXXXX.|

### Permissions

You don't need any special permission to create a table with a dynamic data mask, only the standard __CREATE TABLE__ and __ALTER__ on schema permissions.

Adding, replacing, or removing the mask of a column, requires the __ALTER ANY MASK__ permission and __ALTER__ permission on the table. It's appropriate to grant __ALTER ANY MASK__ to a security officer.

Users with __SELECT__ permission on a table can view the table data. Columns that are defined as masked, will display the masked data. Grant the __UNMASK__ permission to a user to enable them to retrieve unmasked data from the columns for which masking is defined.

The __CONTROL__ permission on the database includes both the __ALTER ANY MASK__ and __UNMASK__ permission which enables the user to view unmasked data. Administrative users or roles such as Admin Member or Contributor has CONTROL permission on the database by design and can view unmasked data.

### Example

We can add a mask to an existing table by using the ALTER table statement.




```tsql
ALTER TABLE Sales.Orders
ALTER COLUMN SalesRep ADD MASKED WITH (FUNCTION = 'email()');
```

You can also create tables with masking defined
```tsql
CREATE SCHEMA sales;
GO
-- Create a table to store sales data
CREATE TABLE sales.Orders (
    SaleID INT,
    SalesRep MASKED WITH (FUNCTION = 'email()'),
    ProductName VARCHAR(50),
    SaleAmount DECIMAL(10, 2),
    SaleDate DATE
);

-- Insert sample data
INSERT INTO sales.Orders (SaleID, SalesRep, ProductName, SaleAmount, SaleDate)
VALUES
    (1, 'Sales1@contoso.com', 'Smartphone', 500.00, '2023-08-01'),
    (2, 'Sales2@contoso.com', 'Laptop', 1000.00, '2023-08-02'),
    (3, 'Sales1@contoso.com', 'Headphones', 120.00, '2023-08-03'),
    (4, 'Sales2@contoso.com', 'Tablet', 800.00, '2023-08-04'),
    (5, 'Sales1@contoso.com', 'Smartwatch', 300.00, '2023-08-05'),
    (6, 'Sales2@contoso.com', 'Gaming Console', 400.00, '2023-08-06'),
    (7, 'Sales1@contoso.com', 'TV', 700.00, '2023-08-07'),
    (8, 'Sales2@contoso.com', 'Wireless Earbuds', 150.00, '2023-08-08'),
    (9, 'Sales1@contoso.com', 'Fitness Tracker', 80.00, '2023-08-09'),
    (10, 'Sales2@contoso.com', 'Camera', 600.00, '2023-08-10');
When selecting from the sales.Orders table, the data for SalesRep will be masked to aXXX@XXXX.com.

```



#### Grant permissions to view unmasked data

Granting the __UNMASK__ permission allows manager@contoso.com to see the data unmasked.
```tsql
GRANT  
UNMASK TO manager@contoso.com;
```

#### Deletion of a mask

Deleting the mask of a column allows manager@contoso.com to see the data unmasked.
```tsql
ALTER TABLE Sales.Orders  
DROP COLUMN SalesRep MASKED|
```


#### Security Considerations: Bypassing masking using inference or brute-force techniques

Dynamic Data Masking is designed to simplify application development by limiting data exposure in a set of predefined queries used by the application. While Dynamic Data Masking can also be useful to prevent accidental exposure of sensitive data when accessing a production database directly, it's important to note that unprivileged users with ad hoc query permissions can apply techniques to gain access to the actual data.

As an example, consider a database principal that has sufficient privileges to run ad hoc queries on the database, and tries to 'guess' the underlying data and ultimately infer the actual values. Assume that we have a mask defined on the [Employee].[Salary] column, and this user connects directly to the database and starts guessing values, eventually inferring the [Salary] value of a set of Employees:

```tsql
SELECT ID, Name, Salary FROM Employees  
WHERE Salary > 99999 and Salary < 100001;
```

Result

|Id|Name|Salary|
| -------- | -------- | -------- |
|62543|Jane Doe|0|
|91245|John Smith|0|

 

This demonstrates that Dynamic Data Masking shouldn't be used as an isolated measure to fully secure sensitive data from users running ad hoc queries on the database. It's appropriate for preventing accidental sensitive data exposure but doesn't protect against malicious intent to infer the underlying data.

It's important to properly manage the permissions on the database, and to always follow the minimal required permissions principle. Also, remember to have Auditing enabled to track all activities taking place on the database


