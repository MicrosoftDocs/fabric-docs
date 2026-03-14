---
title: "Bulk copy data between SQL databases in Fabric with the Microsoft Python Driver for SQL Server"
description: This quickstart describes bulk copying data between SQL databases in Fabric using mssql-python and Apache Arrow (Parquet).
ms.reviewer: antho, drskwier
ms.date: 03/14/2026
ms.topic: quickstart-sdk
ms.custom:
  - sfi-ropc-nochange
ai-usage: ai-assisted
---

# Quickstart: Bulk copy data between SQL databases in Fabric with the mssql-python driver

In this quickstart, you use the `mssql-python` driver to bulk copy data between SQL databases in Fabric. The application downloads tables from a source database schema to local Parquet files using Apache Arrow, then uploads them to a destination database using the high-performance `bulkcopy` method. You can use this pattern to migrate, replicate, or transform data between SQL databases in Fabric.

The `mssql-python` driver doesn't require any external dependencies on Windows machines. The driver installs everything that it needs with a single `pip` install, allowing you to use the latest version of the driver for new scripts without breaking other scripts that you don't have time to upgrade and test.

[mssql-python documentation](https://github.com/microsoft/mssql-python/wiki) | [mssql-python source code](https://github.com/microsoft/mssql-python/wiki) | [Package (PyPi)](https://pypi.org/project/mssql-python/) | [UV](https://docs.astral.sh/uv/)

## Prerequisites

- [Load AdventureWorks sample data in your SQL database](load-adventureworks-sample-data.md) as the source database.

- (Optional) A second SQL database in Fabric to use as the destination. The user must have permission to create and write to tables. If you don't have a second database, you can change the destination connection string to point to the same database and use a different schema for the destination tables.

- Python 3

  - If you don't already have Python, install the **Python runtime** and **pip package manager** from [python.org](https://www.python.org/downloads/).

  - Don't want to use your own environment? Open as a devcontainer using [GitHub Codespaces](https://github.com/features/codespaces).

    [:::image type="icon" source="https://github.com/codespaces/badge.svg":::](https://codespaces.new/github/codespaces-blank?quickstart=1)

- [Visual Studio Code](https://code.visualstudio.com/download) with the following extensions:

  - [Python extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

- [Azure Command-Line Interface (CLI)](/cli/azure/install-azure-cli) - Recommended for macOS and Linux authentication.

- If you don't already have `uv`, install `uv` by following the instructions from [https://docs.astral.sh/uv/getting-started/installation/](https://docs.astral.sh/uv/getting-started/installation/).
- Install one-time operating system specific prerequisites.

  ### [Alpine](#tab/alpine-linux)

  ```bash
  apk add libtool krb5-libs krb5-dev
  ```

  ### [Debian/Ubuntu](#tab/debianUbuntu-linux)

  ```bash
  apt-get install -y libltdl7 libkrb5-3 libgssapi-krb5-2
  ```

  ### [RHEL](#tab/RHEL-linux)

  ```bash
  dnf install -y libtool-ltdl krb5-libs
  ```

  ### [SUSE](#tab/SUSE-linux)

  ```bash
  zypper install -y libltdl7 libkrb5-3 libgssapi-krb5-2
  ```

  ### [openSUSE](#tab/openSUSE-linux)

  ```bash
  zypper install -y libltdl7
  ```

  ### [macOS](#tab/mac)

  ```bash
  brew install openssl
  ```

   ---

## Create the project and run the code

- [Create a new project](#create-a-new-project)
- [Add dependencies](#add-dependencies)
- [Launch Visual Studio Code](#launch-visual-studio-code)
- [Update pyproject.toml](#update-pyprojecttoml)
- [Update main.py](#update-mainpy)
- [Save the connection strings](#save-the-connection-strings)
- [Use uv run to execute the script](#use-uv-run-to-execute-the-script)

### Create a new project

1. Open a command prompt in your development directory. If you don't have one, create a new directory called `python`, `scripts`, etc. Avoid folders on your OneDrive, the synchronization can interfere with managing your virtual environment.

1. Create a new [project](https://docs.astral.sh/uv/guides/projects/#project-structure) with `uv`.

   ```bash
   uv init mssql-python-bcp-qs
   cd mssql-python-bcp-qs
   ```

### Add dependencies

In the same directory, install the `mssql-python`, `python-dotenv`, and `pyarrow` packages.

```bash
uv add mssql-python python-dotenv pyarrow
```

### Launch Visual Studio Code

In the same directory, run the following command.

```console
code .
```

### Update pyproject.toml

1. The [pyproject.toml](https://docs.astral.sh/uv/concepts/projects/layout/#the-pyprojecttoml) contains the metadata for your project. Open the file in your favorite editor.

1. Review the contents of the file. It should be similar to this example. Note the Python version and dependency for `mssql-python` uses `>=` to define a minimum version. If you prefer an exact version, change the `>=` before the version number to `==`. The resolved versions of each package are then stored in the [uv.lock](https://docs.astral.sh/uv/concepts/projects/layout/#the-lockfile). The lockfile ensures that developers working on the project are using consistent package versions. It also ensures that the exact same set of package versions is used when distributing your package to end users. You shouldn't edit the `uv.lock` file.

   ```python
   [project]
   name = "mssql-python-bcp-qs"
   version = "0.1.0"
   description = "Add your description here"
   readme = "README.md"
   requires-python = ">=3.11"
   dependencies = [
       "mssql-python>=1.4.0",
       "python-dotenv>=1.1.1",
       "pyarrow>=19.0.0",
   ]
   ```

1. Update the description to be more descriptive.

   ```python
   description = "Bulk copies data between SQL databases using mssql-python and Apache Arrow"
   ```

1. Save and close the file.

### Update main.py

1. Open the file named `main.py`. It should be similar to this example.

   ```python
   def main():
       print("Hello from mssql-python-bcp-qs!")

   if __name__ == "__main__":
       main()
   ```

1. Replace the contents of the file with the following code blocks. Each block builds on the previous one and should be added to `main.py` in order.

   > [!TIP]  
   > If Visual Studio Code is having trouble resolving packages, you need to [update the interpreter to use the virtual environment](https://code.visualstudio.com/docs/python/environments).

1. At the top of `main.py`, add the imports and constants. The script uses `mssql_python` for database connectivity, `pyarrow` and `pyarrow.parquet` for columnar data handling and Parquet file I/O, `python-dotenv` for loading connection strings from a `.env` file, and a compiled regex pattern that validates SQL identifiers to prevent injection.

   ```python
   """Round-trip: download tables from a source DB/schema to parquet, upload to a destination DB/schema."""

   import os
   import re
   import time
   from uuid import UUID

   import pyarrow as pa
   import pyarrow.parquet as pq
   from dotenv import load_dotenv
   import mssql_python

   BATCH_SIZE = 64_000
   _SAFE_IDENT = re.compile(r"^[A-Za-z0-9_]+$")


   def _validate_ident(name: str) -> str:
       if not _SAFE_IDENT.match(name):
           raise ValueError(f"Unsafe SQL identifier: {name!r}")
       return name
   ```

1. Below the imports, add the SQL-to-Arrow type mapping. This dictionary translates SQL Server column types to their Apache Arrow equivalents so that data fidelity is preserved when writing to Parquet. The two helper functions build exact SQL type strings (for example, `NVARCHAR(100)` or `DECIMAL(18,2)`) from `INFORMATION_SCHEMA` metadata and resolve the matching Arrow type for each column.

   ```python
   _SQL_TO_ARROW = {
       "bit": pa.bool_(),
       "tinyint": pa.uint8(),
       "smallint": pa.int16(),
       "int": pa.int32(),
       "bigint": pa.int64(),
       "float": pa.float64(),
       "real": pa.float32(),
       "smallmoney": pa.decimal128(10, 4),
       "money": pa.decimal128(19, 4),
       "date": pa.date32(),
       "datetime": pa.timestamp("ms"),
       "datetime2": pa.timestamp("us"),
       "smalldatetime": pa.timestamp("s"),
       "uniqueidentifier": pa.string(),
       "xml": pa.string(),
       "image": pa.binary(),
       "binary": pa.binary(),
       "varbinary": pa.binary(),
       "timestamp": pa.binary(),
   }


   def _sql_type_str(data_type: str, max_length: int, precision: int, scale: int) -> str:
       """Build the exact SQL type string from INFORMATION_SCHEMA metadata."""
       dt = data_type.lower()
       if dt in ("char", "varchar", "nchar", "nvarchar", "binary", "varbinary"):
           length = "MAX" if max_length == -1 else str(max_length)
           return f"{dt.upper()}({length})"
       if dt in ("decimal", "numeric"):
           return f"{dt.upper()}({precision},{scale})"
       return dt.upper()


   def _arrow_type(sql_type: str, max_length: int, precision: int, scale: int) -> pa.DataType:
       sql_type = sql_type.lower()
       if sql_type in _SQL_TO_ARROW:
           return _SQL_TO_ARROW[sql_type]
       if sql_type in ("decimal", "numeric"):
           return pa.decimal128(precision, scale)
       if sql_type in ("char", "varchar", "nchar", "nvarchar", "text", "ntext", "sysname"):
           return pa.string()
       return pa.string()


   def _convert_value(v):
       """Convert a SQL value to an Arrow-compatible Python type."""
       if isinstance(v, UUID):
           return str(v)
       return v
   ```

1. Add the schema introspection and DDL generation functions. `_get_arrow_schema` queries `INFORMATION_SCHEMA.COLUMNS` using parameterized queries, builds an Arrow schema, and stores the original SQL type as field metadata so the destination table can be recreated with exact column definitions. `_create_table_ddl` reads that metadata back to generate `DROP`/`CREATE TABLE` DDL. The `timestamp` (rowversion) type is remapped to `VARBINARY(8)` because it's auto-generated and not directly insertable.

   ```python
   def _get_arrow_schema(cursor, schema_name: str, table_name: str) -> pa.Schema:
       """Build an Arrow schema from INFORMATION_SCHEMA.COLUMNS.

       Stores the original SQL type as field metadata so the round-trip
       CREATE TABLE can reproduce exact column definitions.
       """
       cursor.execute(
           "SELECT COLUMN_NAME, DATA_TYPE, "
           "COALESCE(CHARACTER_MAXIMUM_LENGTH, 0), "
           "COALESCE(NUMERIC_PRECISION, 0), "
           "COALESCE(NUMERIC_SCALE, 0), "
           "IS_NULLABLE "
           "FROM INFORMATION_SCHEMA.COLUMNS "
           "WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? "
           "ORDER BY ORDINAL_POSITION",
           (schema_name, table_name),
       )
       rows = cursor.fetchall()
       if not rows:
           raise ValueError(f"No columns found for {schema_name}.{table_name}")
       fields = []
       for col_name, data_type, max_len, precision, scale, nullable in rows:
           arrow_t = _arrow_type(data_type, max_len, precision, scale)
           sql_t = _sql_type_str(data_type, max_len, precision, scale)
           fields.append(
               pa.field(
                   col_name, arrow_t,
                   nullable=(nullable == "YES"),
                   metadata={"sql_type": sql_t},
               )
           )
       return pa.schema(fields)


   def _create_table_ddl(target: str, schema: pa.Schema) -> str:
       """Build DROP/CREATE TABLE DDL from Arrow schema with SQL type metadata."""
       col_defs = []
       for f in schema:
           sql_t = f.metadata[b"sql_type"].decode()
           # timestamp/rowversion is auto-generated and not insertable
           if sql_t == "TIMESTAMP":
               sql_t = "VARBINARY(8)"
           null = "" if f.nullable else " NOT NULL"
           col_defs.append(f"[{f.name}] {sql_t}{null}")
       col_defs_str = ",\n    ".join(col_defs)
       return (
           f"IF OBJECT_ID('{target}', 'U') IS NOT NULL DROP TABLE {target};\n"
           f"CREATE TABLE {target} (\n    {col_defs_str}\n);"
       )
   ```

1. Add the download function. `download_table` reads all rows from a source table, converts each value to an Arrow-compatible Python type, builds a columnar Arrow table, and writes it to a local Parquet file. The function uses two separate cursors: one to read column metadata, and another to stream the data. If the table is empty, it returns early.

   ```python
   def download_table(conn, schema_name: str, table_name: str, parquet_file: str) -> int:
       """Download a SQL table to a parquet file. Returns row count (0 if empty)."""
       _validate_ident(table_name)
       source = f"{schema_name}.[{table_name}]"

       with conn.cursor() as cursor:
           schema = _get_arrow_schema(cursor, schema_name, table_name)

       with conn.cursor() as cursor:
           t0 = time.perf_counter()
           cursor.execute(f"SELECT * FROM {source}")
           n_cols = len(schema)
           columns = [[] for _ in range(n_cols)]
           row_count = 0
           for row in cursor.fetchall():
               for i in range(n_cols):
                   columns[i].append(_convert_value(row[i]))
               row_count += 1

       if row_count == 0:
           return 0

       arrays = [
           pa.array(columns[i], type=schema.field(i).type)
           for i in range(n_cols)
       ]
       pa_table = pa.table(dict(zip(schema.names, arrays)), schema=schema)
       pq.write_table(pa_table, parquet_file)
       elapsed = time.perf_counter() - t0
       print(
           f"{schema_name}.{table_name} → {parquet_file}: {row_count:,} rows downloaded "
           f"in {elapsed:.2f}s ({int(row_count / elapsed):,} rows/sec)"
       )
       return row_count
   ```

1. Add the enrichment hook. `enrich_parquet` is a placeholder where you can add transformations, derived columns, or joins to data before it's uploaded. In this quickstart, it's a no-op that returns the file path unchanged.

   ```python
   def enrich_parquet(parquet_file: str) -> str:
       """Enrich a parquet file before upload. Returns the (possibly new) file path."""
       # TODO: add transformations, derived columns, joins, etc.
       print(f"Enriching {parquet_file} (no-op)")
       return parquet_file
   ```

1. Add the upload function. `upload_parquet` reads the Arrow schema from the Parquet file, generates and executes `DROP`/`CREATE TABLE` DDL to prepare the destination, then reads the file in batches and calls `cursor.bulkcopy()` for high-performance bulk insert. The `table_lock=True` option improves throughput by minimizing lock contention. After the upload completes, the function runs a `SELECT COUNT(*)` to verify the row count matches.

   ```python
   def upload_parquet(conn, parquet_file: str, target: str) -> int:
       """Upload a parquet file into a SQL table via BCP. Returns row count."""
       # ── Create target table from parquet schema ──
       pf_schema = pq.read_schema(parquet_file)
       with conn.cursor() as cursor:
           cursor.execute(_create_table_ddl(target, pf_schema))
       conn.commit()

       # ── Bulk insert ──
       uploaded = 0
       t0 = time.perf_counter()
       with pq.ParquetFile(parquet_file) as pf:
           with conn.cursor() as cursor:
               for batch in pf.iter_batches(batch_size=BATCH_SIZE):
                   rows = zip(*(col.to_pylist() for col in batch.columns))
                   cursor.bulkcopy(
                       target, rows, batch_size=BATCH_SIZE,
                       table_lock=True, timeout=3600,
                   )
                   uploaded += batch.num_rows
       elapsed = time.perf_counter() - t0

       # ── Verify ──
       with conn.cursor() as cursor:
           cursor.execute(f"SELECT COUNT(*) FROM {target}")
           count = cursor.fetchone()[0]

       print(
           f"{parquet_file} → {target}: {uploaded:,} rows uploaded "
           f"in {elapsed:.2f}s ({int(uploaded / elapsed):,} rows/sec) "
           f"| verified: {count:,}"
       )
       return uploaded
   ```

1. Add the orchestration function. `transfer_tables` ties the three phases together. It connects to the source database, discovers all base tables in the given schema via `INFORMATION_SCHEMA.TABLES`, downloads each one to a local Parquet file, runs the enrichment hook, then connects to the destination database and uploads each file.

   ```python
   def transfer_tables(
       source_conn_str: str,
       dest_conn_str: str,
       source_schema: str,
       dest_schema: str,
   ) -> None:
       """Download all tables from source DB/schema to parquet, upload to dest DB/schema."""
       _validate_ident(source_schema)
       _validate_ident(dest_schema)

       parquet_dir = source_schema
       os.makedirs(parquet_dir, exist_ok=True)

       # ── Download from source ──
       with mssql_python.connect(source_conn_str) as src_conn:
           with src_conn.cursor() as cursor:
               cursor.execute(
                   "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES "
                   "WHERE TABLE_SCHEMA = ? AND TABLE_TYPE = 'BASE TABLE' "
                   "ORDER BY TABLE_NAME",
                   (source_schema,),
               )
               tables = [row[0] for row in cursor.fetchall()]

           print(f"Found {len(tables)} {source_schema} tables: {', '.join(tables)}\n")

           parquet_files = []
           for table_name in tables:
               parquet_file = os.path.join(parquet_dir, f"{table_name}.parquet")
               row_count = download_table(src_conn, source_schema, table_name, parquet_file)
               if row_count == 0:
                   print(f"{source_schema}.{table_name}: empty, skipping")
               else:
                   parquet_files.append((table_name, parquet_file))

       # ── Enrich parquet files ──
       for table_name, parquet_file in parquet_files:
           enrich_parquet(parquet_file)

       # ── Upload to destination ──
       with mssql_python.connect(dest_conn_str) as dest_conn:
           for table_name, parquet_file in parquet_files:
               target = f"{dest_schema}.[{table_name}]"
               upload_parquet(dest_conn, parquet_file, target)
   ```

1. Finally, add the `main` entry point. It loads the `.env` file, calls `transfer_tables` with the source and destination connection strings, and prints the total elapsed time.

   ```python
   def main():
       load_dotenv()
       t_start = time.perf_counter()

       transfer_tables(
           source_conn_str=os.environ["SOURCE_CONNECTION_STRING"],
           dest_conn_str=os.environ["DEST_CONNECTION_STRING"],
           source_schema="SalesLT",
           dest_schema="dbo",
       )

       print(f"Total: {time.perf_counter() - t_start:.2f}s")


   if __name__ == "__main__":
       main()
   ```

1. Save and close `main.py`.

### Save the connection strings

1. Open the `.gitignore` file and add an exclusion for `.env` files. Your file should be similar to this example. Be sure to save and close it when you're done.

   ```output
   # Python-generated files
   __pycache__/
   *.py[oc]
   build/
   dist/
   wheels/
   *.egg-info

   # Virtual environments
   .venv

   # Connection strings and secrets
   .env
   ```

1. In the current directory, create a new file named `.env`.

1. Within the `.env` file, add entries for your source and destination connection strings. Replace the placeholder values with your actual server and database names.

   ```text
   SOURCE_CONNECTION_STRING="Server=<source_server_name>;Database=<source_database_name>;Encrypt=yes;TrustServerCertificate=no;Authentication=ActiveDirectoryInteractive"
   DEST_CONNECTION_STRING="Server=<dest_server_name>;Database=<dest_database_name>;Encrypt=yes;TrustServerCertificate=no;Authentication=ActiveDirectoryInteractive"
   ```

   > [!TIP]  
   > For **SQL database in Fabric**, use the **ODBC** connection string from the connection strings tab without the **DRIVER** information. For more information, see [Connect to your SQL database in Fabric](connect.md).

> [!TIP]  
> On macOS, both `ActiveDirectoryInteractive` and `ActiveDirectoryDefault` work for Microsoft Entra authentication. `ActiveDirectoryInteractive` prompts you to sign in every time you run the script. To avoid repeated sign-in prompts, log in once via the [Azure CLI](/cli/azure/install-azure-cli) by running `az login`, then use `ActiveDirectoryDefault`, which reuses the cached credential.

### Use uv run to execute the script

1. In the terminal window from before, or a new terminal window open to the same directory, run the following command.

   ```bash
    uv run main.py
   ```

   Here's the expected output when the script completes.

   ```output
   Found 12 SalesLT tables: Address, Customer, CustomerAddress, ...

   SalesLT.Address → SalesLT/Address.parquet: 450 rows downloaded in 0.15s (3,000 rows/sec)
   ...
   SalesLT/Address.parquet → dbo.[Address]: 450 rows uploaded in 0.10s (4,500 rows/sec) | verified: 450
   ...
   Total: 2.35s
   ```

1. Connect to the destination database and verify that the tables and data were created successfully. For more options on how to connect, see [Connect to your SQL database in Fabric](connect.md).

1. To deploy your script to another machine, copy all files except for the `.venv` folder to the other machine. The virtual environment is recreated with the first run.

### How the code works

The application performs a full round-trip data transfer in three phases:

1. **Download**: Connects to the source database, reads column metadata from `INFORMATION_SCHEMA.COLUMNS`, builds an Apache Arrow schema, then downloads each table into a local Parquet file.
1. **Enrich** (optional): Provides a hook (`enrich_parquet`) where you can add transformations, derived columns, or joins before uploading.
1. **Upload**: Reads each Parquet file in batches, recreates the table in the destination database using DDL generated from Arrow schema metadata, then uses `cursor.bulkcopy()` for high-performance bulk insert.

## Next step

Visit the `mssql-python` driver GitHub repository for more examples, to contribute ideas or report issues.

> [!div class="nextstepaction"]
> [mssql-python driver on GitHub](https://github.com/microsoft/mssql-python?tab=readme-ov-file#microsoft-python-driver-for-sql-server)
