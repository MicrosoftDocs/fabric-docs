---
title: Author and execute the notebook
description: 
ms.reviewer: snehagunda
ms.author: jingzh
author: JeneZhang
ms.topic: how-to
ms.date: 02/24/2023
---

# Author and execute the notebook

> [!IMPORTANT]
> [!INCLUDE [product-name](../includes/product-name.md)] is currently in PREVIEW. This information relates to a prerelease product that may be substantially modified before it's released. Microsoft makes no warranties, expressed or implied, with respect to the information provided here.

INTRO SENTENCE

## Develop notebooks

Notebooks consist of cells, which are individual blocks of code or text that can be run independently or as a group.

We provide rich operations to develop notebooks:

- [Add a cell](#add-a-cell)
- [Set a primary language](#set-a-primary-language)
- [Use multiple languages](#use-multiple-languages)
- [IDE-style IntelliSense](#ide-style-intellisense)
- [Code snippets](#code-snippets)
- [Drag and drop to insert snippets](#drag-and-drop-to-insert-snippets)
- [Format text cell with toolbar buttons](#format-text-cell-with-toolbar-buttons)
- [Undo or redo cell operation](#undo-or-redo-cell-operation)
- Code cell commenting
- [Move a cell](#move-a-cell)
- [Delete a cell](#delete-a-cell)
- [Collapse a cell input](#collapse-a-cell-input)
- [Collapse a cell output](#collapse-a-cell-output)
- [Notebook outline](#notebook-outline)

### Add a cell

There are multiple ways to add a new cell to your notebook.

1. Hover over the space between two cells and select **Code** or **Markdown**.

1. Use aznb Shortcut keys under command mode. Press **A** to insert a cell above the current cell. Press **B** to insert a cell below the current cell.

#### Set a primary language

[!INCLUDE [product-name](../includes/product-name.md)] notebooks currently support four Apache Spark languages:

- PySpark (Python)
- Spark (Scala)
- Spark SQL
- SparkR

You can set the primary language for new added cells from the dropdown list in the top command bar.

### Use multiple languages

You can use multiple languages in one notebook by specifying the correct language magic command at the beginning of a cell, or switch the cell language from the language picker of a cell. The following table lists the  magic commands to switch cell languages.

![Graphical user interface, text, application  Description automatically generated](media/image1.png)

| **Magic command** | **Language** | **Description** |
|---|---|---|
| **%%pyspark** | Python | Execute a **Python** query against Spark Context. |
| **%%spark** | Scala | Execute a **Scala** query against Spark Context. |
| **%%sql** | SparkSQL | Execute a **SparkSQL** query against Spark Context. |
| **%%html** | Html | Execute a **HTML** query against Spark Context. |
| **%%sparkr** | R | Execute a **R** query against Spark Context. |

The following image is an example of how you can write a PySpark query using the **%%pyspark** magic command in a **Spark(Scala)** notebook. Notice that the primary language for the notebook is set to PySpark.

### IDE-style IntelliSense

[!INCLUDE [product-name](../includes/product-name.md)] notebooks are integrated with the Monaco editor to bring IDE-style IntelliSense to the cell editor. Syntax highlight, error marker, and automatic code completions help you to write code and identify issues quicker.

The IntelliSense features are at different levels of maturity for different languages. Use the following table to see what's supported.

| **Languages** | **Syntax Highlight** | **Syntax Error Marker** | **Syntax Code Completion** | **Variable Code Completion** | **System Function Code Completion** | **User Function Code Completion** | **Smart Indent** | **Code Folding** |
|---|---|---|---|---|---|---|---|---|
| **PySpark (Python)** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **Spark (Scala)** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **SparkSQL** | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes |
| **SparkR** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |

**NOTE:** **An active Spark session is required to benefit the Variable Code Completion.**

### Code snippets

[!INCLUDE [product-name](../includes/product-name.md)] notebooks provide code snippets that make it easier to enter common used code patterns, such as configuring your Spark session, reading data as a Spark DataFrame, or drawing charts with matplotlib etc.

Snippets appear in [Shortcut keys of IDE style IntelliSense](file:///C:\Users\v-pargina\Desktop\Data%20Engineering\Spark%20Developer%20Experience%20Consolidated%20Documentation.docx) mixed with other suggestions. The code snippets contents align with the code cell language. You can see available snippets by typing **Snippet** or any keywords appear in the snippet title in the code cell editor. For example, by typing **read** you can see the list of snippets to read data from various data sources.

![Graphical user interface, text, application  Description automatically generated](media/image2.png)

### Drag and drop to insert snippets

You can use Drag & Drop to read data from LakeHouse explorer conveniently, multiple file types are supported here, you can operate on text files, tables, images, etc, you can either drop to a existing cell or to a new cell, notebook will generate the code snippet accordingly to preview the data.

![Graphical user interface, application  Description automatically generated](media/image3.png)

### Drag and drop to insert images

You can use Drag & Drop to insert images from browser/local computer to a markdown cell very conveniently.

![Graphical user interface, text, application  Description automatically generated](media/image4.png)

### Format text cell with toolbar buttons

You can use the format buttons in the text cells toolbar to do common markdown actions. It includes bolding text, italicizing text, paragraph/headers through a dropdown, inserting code, inserting unordered list, inserting ordered list, inserting hyperlink and inserting image from URL.

![Chart  Description automatically generated with low confidence](media/image5.png)

### Undo or redo cell operation

Select the **Undo** / **Redo** button or press **Z** / **Shift+Z** to revoke the most recent cell operations. Now you can undo/redo up to the latest 10 historical cell operations.

![Graphical user interface, application, Word, PowerPoint  Description automatically generated](media/image6.png)

Supported undo cell operations:

Insert/Delete cell: You could revoke the delete operations by selecting **Undo**, the text content will be kept along with the cell.

Reorder cell.

Toggle parameter.

Convert between Code cell and Markdown cell.

**NOTE:** In-cell text operations and code cell commenting operations are not undoable. Now you can undo/redo up to the latest 10 historical cell operations.

### Move a cell

You can drag from the empty part of a cell and drop it to the desired position, you can also move the selected cell using **Move up** and **Move down** on ribbon.

![Graphical user interface, text, email  Description automatically generated](media/image7.png)

### Delete a cell

To delete a cell, select the delete button at the right hand of the cell.

You can also use[ shortcut keys under command mode](file:///C:\Users\v-pargina\Desktop\Data%20Engineering\Spark%20Developer%20Experience%20Consolidated%20Documentation.docx). Press **Shift+D** to delete the current cell.

### Collapse a cell input

Select the **More commands** ellipses (...) on the cell toolbar and **Hide input** to collapse current cell's input. To expand it, Select the **Show input** while the cell is collapsed.

![Graphical user interface, text, application  Description automatically generated](media/image8.png)

### Collapse a cell output

Select the **More commands** ellipses (...) on the cell toolbar and **Hide output** to collapse current cell's output. To expand it, select the **Show output** while the cell's output is hidden.

![A picture containing text  Description automatically generated](media/image9.png)

### Notebook outline

The Outlines (Table of Contents) presents the first markdown header of any markdown cell in a sidebar window for quick navigation. The Outlines sidebar is resizable and collapsible to fit the screen in the best ways possible. You can select the **Outline** button on the notebook command bar to open or hide sidebar.

![Graphical user interface, text, application  Description automatically generated with medium confidence](media/image10.png)

## Run notebooks

You can run the code cells in your notebook individually or all at once. The status and progress of each cell is represented in the notebook.

### Run a cell

There are several ways to run the code in a cell.

1. Hover on the cell you want to run and select the **Run Cell** button or press **Ctrl+Enter**.

Use [Shortcut keys under command mode](file:///C:\Users\v-pargina\Desktop\Data%20Engineering\Spark%20Developer%20Experience%20Consolidated%20Documentation.docx). Press **Shift+Enter** to run the current cell and select the cell below. Press **Alt+Enter** to run the current cell and insert a new cell below.

### Run all cells

Select the **Run All** button to run all the cells in the current notebook in sequence.

### Run all cells above or below

Expand the dropdown list from **Run all** button, then select **Run cells above** to run all the cells above the current in sequence. Select **Run cells below** to run all the cells below the current in sequence.

![Graphical user interface, text, application  Description automatically generated](media/image11.png)

### Cancel all running cells

Select the **Cancel All** button to cancel the running cells or cells waiting in the queue.

![Graphical user interface, text, application, email  Description automatically generated](media/image12.png)

### Variable explorer

[!INCLUDE [product-name](../includes/product-name.md)] notebook provides a built-in variables explorer for you to see the list of the variables name, type, length, and value in the current Spark session for PySpark (Python) cells. More variables will show up automatically as they are defined in the code cells. Clicking on each column header will sort the variables in the table.

You can select the **Variables** button on the notebook ribbon “View” tab to open or hide the variable explorer.

**NOTE:** Variable explorer only supports python.

### Cell status indicator

A step-by-step cell execution status is displayed beneath the cell to help you see its current progress. Once the cell run is complete, an execution summary with the total duration and end time is shown and kept there for future reference.

![Graphical user interface, text, application  Description automatically generated](media/image13.png)

### Spark progress indicator

The [!INCLUDE [product-name](../includes/product-name.md)] notebook is purely Spark based. Code cells are executed on the serverless Apache Spark pool remotely. A Spark job progress indicator is provided with a real-time progress bar appears to help you understand the job execution status. The number of tasks per each job or stage help you to identify the parallel level of your spark job. You can also drill deeper to the Spark UI of a specific job (or stage) via selecting the link on the job (or stage) name.

![Graphical user interface, text, application, email  Description automatically generated](media/image14.png)

## IPython Widgets

Widgets are eventful python objects that have a representation in the browser, often as a control like a slider, textbox etc. IPython Widgets only works in Python environment, it's not supported in other languages (e.g. Scala, SQL, C#) yet.

### To use IPython Widget

1. You need to import _ipywidgets_ module first to use the Jupyter Widget framework.

```
import ipywidgets as widgets
```

2. You can use top-level _display_ function to render a widget, or leave an expression of **widget** type at the last line of code cell.

```
slider = widgets.IntSlider()
display(slider)
```

- 

```
slider = widgets.IntSlider()
slider
```

3. Run the cell, the widget will display at the output area.

![Graphical user interface, text, application  Description automatically generated](media/image15.png)

4. You can use multiple _display()_ calls to render the same widget instance multiple times, but they will remain in sync with each other.

```
slider = widgets.IntSlider()
display(slider)
display(slider)
```

![Graphical user interface, text, application, email  Description automatically generated](media/image16.png)

5. To render two widgets independent of each other, create two widget instances:

```
slider1 = widgets.IntSlider()
slider2 = widgets.IntSlider()
display(slider1)
display(slider2)
```

### Supported widgets

| **Widgets Type** | **Widgets** |
|---|---|
| **Numeric widgets** | IntSlider, FloatSlider, FloatLogSlider, IntRangeSlider, FloatRangeSlider, IntProgress, FloatProgress, BoundedIntText, BoundedFloatText, IntText, FloatText |
| **Boolean widgets** | ToggleButton, Checkbox, Valid |
| **Selection widgets** | Dropdown, RadioButtons, Select, SelectionSlider, SelectionRangeSlider, ToggleButtons, SelectMultiple |
| **String Widgets** | Text, Text area, Combobox, Password, Label, HTML, HTML Math, Image, Button |
| **Play (Animation) widgets** | Date picker, Color picker, Controller |
| **Container/Layout widgets** | Box, HBox, VBox, GridBox, Accordion, Tabs, Stacked |

### Known limitations

1. The following widgets are not supported yet, you could follow the corresponding workaround as below:

   | | |
   |---|---|
   | | |
   | | |
   | | |

   **Functionality**

   **Workaround**

   ***Output***** widget**

   You can use _print()_ function instead to write text into stdout.

   ***widgets.jslink()***

   You can use _widgets.link()_ function to link two similar widgets.

   ***FileUpload***** widget**

   Not support yet.

1. Global _display_ function provided by [!INCLUDE [product-name](../includes/product-name.md)] does not support displaying multiple widgets in 1 call (i.e. _display(a, b)_), which is different from IPython _display_ function.
1. If you close a notebook that contains IPython Widget, you will not be able to see or interact with it until you execute the corresponding cell again.

## Python logging in Notebook

You can find Python logs and set different log levels and format following the sample code below:

```
import logging

# Customize the logging format for all loggers
FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
formatter = logging.Formatter(fmt=FORMAT)
for handler in logging.getLogger().handlers:
    handler.setFormatter(formatter)

# Customize log level for all loggers
logging.getLogger().setLevel(logging.INFO)

# Customize the log level for a specific logger
customizedLogger = logging.getLogger('customized')
customizedLogger.setLevel(logging.WARNING)

# logger that use the default global log level
defaultLogger = logging.getLogger('default')
defaultLogger.debug("default debug message")
defaultLogger.info("default info message")
defaultLogger.warning("default warning message")
defaultLogger.error("default error message")
defaultLogger.critical("default critical message")

# logger that use the customized log level
customizedLogger.debug("customized debug message")
customizedLogger.info("customized info message")
customizedLogger.warning("customized warning message")
customizedLogger.error("customized error message")
customizedLogger.critical("customized critical message")
```

## Integrate a notebook

### Designate a parameters cell

To parameterize your notebook, select the ellipses (...) to access the **more commands** at the cell toolbar. Then select **Toggle parameter cell** to designate the cell as the parameters cell.

![A picture containing chart  Description automatically generated](media/image17.png)

The parameter cell is useful for integrating notebook in pipeline, pipeline activity looks for the parameters cell and treats this cell as defaults for the parameters passed in at execution time. The execution engine will add a new cell beneath the parameters cell with input parameters in order to overwrite the default values.

## Shortcut keys

Similar to Jupyter Notebooks, [!INCLUDE [product-name](../includes/product-name.md)] notebooks have a modal user interface. The keyboard does different things depending on which mode the notebook cell is in. [!INCLUDE [product-name](../includes/product-name.md)] notebooks support the following two modes for a given code cell: command mode and edit mode.

1. A cell is in command mode when there is no text cursor prompting you to type. When a cell is in Command mode, you can edit the notebook as a whole but not type into individual cells. Enter command mode by pressing ESC or using the mouse to select outside of a cell's editor area.

   ![](media/image18.png)

1. Edit mode is indicated by a text cursor prompting you to type in the editor area. When a cell is in edit mode, you can type into the cell. Enter edit mode by pressing Enter or using the mouse to select on a cell's editor area.

   ![Graphical user interface, application  Description automatically generated](media/image19.png)

### Shortcut keys under command mode

| **Action** | **[!INCLUDE [product-name](../includes/product-name.md)] notebook Shortcuts** |
|---|---|
| **Run the current cell and select below** | Shift+Enter |
| **Run the current cell and insert below** | Alt+Enter |
| **Run current cell** | Ctrl+Enter |
| **Select cell above** | Up |
| **Select cell below** | Down |
| **Select previous cell** | K |
| **Select next cell** | J |
| **Insert cell above** | A |
| **Insert cell below** | B |
| **Delete selected cells** | Shift + D |
| **Switch to edit mode** | Enter |

### Shortcut keys under edit mode

Using the following keystroke shortcuts, you can more easily navigate and run code in [!INCLUDE [product-name](../includes/product-name.md)] notebooks when in Edit mode.

| **Action** | **[!INCLUDE [product-name](../includes/product-name.md)] notebook Shortcuts** |
|---|---|
| **Move cursor up** | Up |
| **Move cursor down** | Down |
| **Undo** | Ctrl + Z |
| **Redo** | Ctrl + Y |
| **Comment/Uncomment** | Ctrl + / |
| **Delete word before** | Ctrl + Backspace |
| **Delete word after** | Ctrl + Delete |
| **Go to cell start** | Ctrl + Home |
| **Go to cell end** | Ctrl + End |
| **Go one word left** | Ctrl + Left |
| **Go one word right** | Ctrl + Right |
| **Select all** | Ctrl + A |
| **Indent** | Ctrl + ] |
| **Dedent** | Ctrl + [ |
| **Switch to command mode** | Esc |
