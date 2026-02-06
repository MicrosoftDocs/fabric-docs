---
title: "Connect to a SQL Database in Fabric from a Jupyter Notebook in Visual Studio Code"
description: This quickstart describes connect to your SQL database in Fabric from a Jupyter Notebook in Visual Studio Code.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, drskwier
ms.date: 12/29/2025
ms.topic: quickstart-sdk
ms.custom:
  - sfi-ropc-nochange
---

# Quickstart: Connect to a SQL database in Fabric from a Jupyter Notebook

In this quickstart, you use Jupyter Notebook in Visual Studio Code to quickly derive business insights. You use the `mssql-python` driver for Python to connect to your **SQL database in Fabric** and read the data that is then formatted for use in emails, reports presentations, etc.

The `mssql-python` driver doesn't require any external dependencies on Windows machines. The driver installs everything that it needs with a single `pip` install, allowing you to use the latest version of the driver for new scripts without breaking other scripts that you don't have time to upgrade and test.

[mssql-python documentation](https://github.com/microsoft/mssql-python/wiki) | [mssql-python source code](https://github.com/microsoft/mssql-python/wiki) | [Package (PyPi)](https://pypi.org/project/mssql-python/) | [Visual Studio Code](https://code.visualstudio.com/download)

## Prerequisites

- [Load AdventureWorks sample data in your SQL database](load-adventureworks-sample-data.md).

- Python 3

  - If you don't already have Python, install the **Python runtime** and **pip package manager** from [python.org](https://www.python.org/downloads/).

  - Prefer to not use your own environment? Open as a devcontainer using [GitHub Codespaces](https://github.com/features/codespaces).

    [:::image type="icon" source="https://github.com/codespaces/badge.svg":::](https://codespaces.new/github/codespaces-blank?quickstart=1)

- [Visual Studio Code](https://code.visualstudio.com/download) with the following extensions:

  - [Python extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python)

  - [Jupyter Extension for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter)

  - [(Optional) Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-repos)

- [(Optional) Azure Command-Line Interface (CLI)](/cli/azure/install-azure-cli)

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
- [Save the connection string](#save-the-connection-string)
- [Create a Jupyter Notebook](#create-a-jupyter-notebook)
- [Display results in a table](#display-results-in-a-table)
- [Display results in a chart](#display-results-in-a-chart)

### Create a new project

1. Open a command prompt in your development directory. If you don't have one, create a new directory called `python`, `scripts`, etc. Avoid folders on your OneDrive, the synchronization can interfere with managing your virtual environment.

1. Create a new [project](https://docs.astral.sh/uv/guides/projects/#project-structure) with `uv`.

   ```bash
   uv init jupyter-notebook-qs
   cd jupyter-notebook-qs
   ```

### Add dependencies

In the same directory, install the `mssql-python`, `python-dotenv`, `rich`, `pandas`, and `matplotlib` packages. Then add `ipykernel` and `uv` as dev dependencies. VS Code requires `ipykernel` and `uv` are added to be able to interact with `uv` from within your notebook cells using commands like `!uv add mssql_python`.

```bash
uv add mssql_python dotenv rich pandas matplotlib
uv add --dev ipykernel
uv add --dev uv
```

### Launch Visual Studio Code

In the same directory, run the following command.

```bash
code .
```

### Update pyproject.toml

1. The [pyproject.toml](https://docs.astral.sh/uv/concepts/projects/layout/#the-pyprojecttoml) contains the metadata for your project.

1. Update the description to be more descriptive.

   ```python
   description = "A quick example using the mssql-python driver and Jupyter Notebooks."
   ```

1. Save and close the file.

### Save the connection string

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

1. Within the `.env` file, add an entry for your connection string named `SQL_CONNECTION_STRING`. Replace the example here with your actual connection string value.

   ```text
   SQL_CONNECTION_STRING="Server=<server_name>;Database={<database_name>};Encrypt=yes;TrustServerCertificate=no;Authentication=ActiveDirectoryDefault"
   ```

   > [!TIP]  
   > For **SQL database in Fabric**, use the **ODBC** connection string from the connection strings tab without the **DRIVER** information.

### Create a Jupyter Notebook

1. Select **File**, then **New File** and **Jupyter Notebook** from the list. A new notebook opens.

1. Select **File**, then **Save As...** and give your new notebook a name.

1. Add the following imports in the first cell.

   ```python
   from os import getenv
   from mssql_python import connect
   from dotenv import load_dotenv
   from rich.console import Console
   from rich.table import Table
   import pandas as pd
   import matplotlib.pyplot as plt
   ```

1. Use the **+ Markdown** button at the top of the notebook to add a new markdown cell.

1. Add the following text to the new markdown cell.

   ```text
   ## Define queries for use later
   ```

1. Select the **check mark** in the cell toolbar or use the keyboard shortcuts `Ctrl+Enter` or `Shift+Enter` to render the markdown cell.

1. Use the **+ Code** button at the top of the notebook to add a new code cell.

1. Add the following code to the new code cell.

   ```python
   SQL_QUERY_ORDERS_BY_CUSTOMER = """
   SELECT TOP 5
   c.CustomerID,
   c.CompanyName,
   COUNT(soh.SalesOrderID) AS OrderCount
   FROM
   SalesLT.Customer AS c
   LEFT OUTER JOIN SalesLT.SalesOrderHeader AS soh
   ON c.CustomerID = soh.CustomerID
   GROUP BY
   c.CustomerID,
   c.CompanyName
   ORDER BY
   OrderCount DESC;
   """
   
   SQL_QUERY_SPEND_BY_CATEGORY = """
   select top 10
   pc.Name as ProductCategory,
   SUM(sod.OrderQty * sod.UnitPrice) as Spend
   from SalesLT.SalesOrderDetail sod 
   inner join SalesLt.SalesOrderHeader soh on sod.salesorderid = soh.salesorderid 
   inner join SalesLt.Product p on sod.productid = p.productid 
   inner join SalesLT.ProductCategory pc on p.ProductCategoryID = pc.ProductCategoryID 
   GROUP BY pc.Name 
   ORDER BY Spend;
   """
   ```

### Display results in a table

1. Use the **+ Markdown** button at the top of the notebook to add a new markdown cell.

1. Add the following text to the new markdown cell.

   ```text
   ## Print orders by customer and display in a table
   ```

1. Select the **check mark** in the cell toolbar or use the keyboard shortcuts `Ctrl+Enter` or `Shift+Enter` to render the markdown cell.

1. Use the **+ Code** button at the top of the notebook to add a new code cell.

1. Add the following code to the new code cell.

   ```python
   load_dotenv()
   with connect(getenv("SQL_CONNECTION_STRING")) as conn: # type: ignore
       with conn.cursor() as cursor:
           cursor.execute(SQL_QUERY_ORDERS_BY_CUSTOMER)
           if cursor:
               table = Table(title="Orders by Customer")
               # https://rich.readthedocs.io/en/stable/appendix/colors.html
               table.add_column("Customer ID", style="bright_blue", justify="center")
               table.add_column("Company Name", style="bright_white", justify="left")
               table.add_column("Order Count", style="bold green", justify="right")
   
               records = cursor.fetchall()
               
               for r in records:
                   table.add_row(f"{r.CustomerID}",
                                   f"{r.CompanyName}", f"{r.OrderCount}")
   
               Console().print(table)
   ```

> [!TIP]  
> To use Microsoft Entra Authentication in macOS, you need to be logged in via either the [Azure Repos](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-repos) extension in Visual Studio Code or by running `az login` via the [Azure Command-Line Interface (CLI)](/cli/azure/install-azure-cli).

1. Use the **Run All** button at the top of the notebook to run the notebook.

1. Select the **jupyter-notebook-qs** kernel when prompted.

### Display results in a chart

1. Review the output of the last cell. You should see a table with three columns and five rows.

1. Use the **+ Markdown** button at the top of the notebook to add a new markdown cell.

1. Add the following text to the new markdown cell.

   ```text
   ## Display spend by category in a horizontal bar chart
   ```

1. Select the **check mark** in the cell toolbar or use the keyboard shortcuts `Ctrl+Enter` or `Shift+Enter` to render the markdown cell.

1. Use the **+ Code** button at the top of the notebook to add a new code cell.

1. Add the following code to the new code cell.

   ```python
   with connect(getenv("SQL_CONNECTION_STRING")) as conn: # type: ignore
       data = pd.read_sql_query(SQL_QUERY_SPEND_BY_CATEGORY, conn)
       # Set the style - use print(plt.style.available) to see all options
       plt.style.use('seaborn-v0_8-notebook')
       plt.barh(data['ProductCategory'], data['Spend'])
   ```

1. Use the **Execute Cell** button or `Ctrl+Alt+Enter` to run the cell.

1. Review the results. Make this notebook your own.

## Next step

Visit the `mssql-python` driver GitHub repository for more examples, to contribute ideas or report issues.

> [!div class="nextstepaction"]
> [mssql-python driver on GitHub](https://github.com/microsoft/mssql-python?tab=readme-ov-file#microsoft-python-driver-for-sql-server)
