---
title: NotebookUtils session management for Fabric
description: Use NotebookUtils session management to stop interactive sessions and restart the Python interpreter in Fabric notebooks.
ms.reviewer: jingzh
ms.topic: how-to
ms.custom: sfi-image-nochange
ms.date: 03/31/2025
ai-usage: ai-assisted
---

# NotebookUtils session management for Fabric

Use `notebookutils.session` to manage the lifecycle of notebook sessions in Microsoft Fabric. You can stop an interactive session or restart the Python interpreter for cleanup, resource management, and error recovery.

The following table lists the available session management methods:

| Method | Signature | Description |
|---|---|---|
| `stop` | `stop(): void` | Stops the current interactive session asynchronously and releases resources. In PySpark, Scala, and R notebooks, accepts an optional `detach` parameter. |
| `restartPython` | `restartPython(): void` | Restarts the Python interpreter while keeping the Spark context intact. Available in Python and PySpark notebooks only. |

> [!NOTE]
> The `stop()` method is available in Python, PySpark, Scala, and R notebooks. In PySpark, Scala, and R notebooks, `stop()` accepts an optional `detach` parameter: `stop(detach=True)`. When `detach` is `True` (the default), the session detaches from a high-concurrency session instead of stopping it entirely.

> [!NOTE]
> The `restartPython()` method is only available in Python and PySpark notebooks. It isn't available in Scala or R notebooks.

> [!IMPORTANT]
> In pipeline execution mode, sessions automatically stop after code completes. The `session.stop()` API is primarily intended for interactive sessions where you want to stop the session programmatically instead of clicking the stop button.

> [!NOTE]
> The `stop()` method operates asynchronously in the background and releases Spark session resources so they become available to other sessions in the same pool.

## Stop an interactive session

Instead of manually selecting the stop button, you can stop an interactive session by calling an API in your code.

### [Python](#tab/python)

```python
notebookutils.session.stop()
```

### [Scala](#tab/scala)

```scala
notebookutils.session.stop()

// Detach from a high-concurrency session instead of stopping it
notebookutils.session.stop(detach = true)
```

### [R](#tab/r)

```r
notebookutils.session.stop()

# Detach from a high-concurrency session instead of stopping it
notebookutils.session.stop(detach = TRUE)
```

---

The `notebookutils.session.stop()` API stops the current interactive session asynchronously in the background. It also stops the Spark session and releases resources occupied by the session, so they're available to other sessions in the same pool.

> [!NOTE]
> Code after `session.stop()` doesn't execute. All in-memory data and variables are lost after the session stops. Save important data before you call `session.stop()`.

### Return behavior

The `stop()` method doesn't return a value. It initiates an asynchronous shutdown of the session.

## Restart the Python interpreter

Use `notebookutils.session.restartPython()` to restart the Python interpreter.

> [!NOTE]
> In PySpark (Spark) notebooks, `restartPython()` restarts only the Python interpreter while keeping the Spark context intact. In Python notebooks, which don't have a Spark context, `restartPython()` restarts the entire Python process.

```python
notebookutils.session.restartPython()
```

### Return behavior

The `restartPython()` method doesn't return a value. After the restart completes, code execution continues in the next cell.

Keep these considerations in mind:

- In the notebook reference run case, `restartPython()` only restarts the Python interpreter of the current notebook that's being referenced. It doesn't affect the parent notebook.
- In rare cases, the command might fail due to the Spark reflection mechanism. Adding a retry can mitigate the problem.
- After calling `restartPython()`, code execution continues in the next cell. Import newly installed packages in a subsequent cell.

## Usage patterns

### Graceful cleanup before stopping

Use a `try-finally` block to ensure cleanup runs before the session stops:

```python
try:
    print("Starting data processing...")
    # ... processing logic here ...

except Exception as e:
    print(f"Processing failed: {str(e)}")
    raise

finally:
    print("Performing cleanup...")
    try:
        notebookutils.fs.unmount("/mnt/data")
    except:
        pass

    notebookutils.session.stop()
```

### Install packages and restart the interpreter

After installing new packages with `pip`, restart the Python interpreter so the packages are available:

```python
import subprocess
import sys

packages = ["pandas==2.0.0", "numpy==1.24.0"]

print("Installing packages...")
for package in packages:
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

print("Restarting Python interpreter...")
notebookutils.session.restartPython()
```

> [!NOTE]
> After calling `restartPython()`, code execution continues in the next cell. Import the newly installed packages in a subsequent cell.

### Error recovery with interpreter restart

If the Python interpreter reaches a corrupted state, you can attempt recovery by restarting it:

```python
def recover_from_error():
    """Attempt to recover from errors by restarting Python."""

    try:
        test_value = 1 + 1
    except Exception as e:
        print(f"Python interpreter error: {str(e)}")
        print("Restarting Python interpreter...")
        notebookutils.session.restartPython()
        return False

    return True

if not recover_from_error():
    print("Recovery attempted - check next cell")
```

### Resource cleanup before stopping

Clean up mounted paths, temporary files, and caches before terminating the session:

```python
try:
    df = spark.range(0, 1000000)
    df.cache()
    result = df.count()
    print(f"Processing completed: {result}")

except Exception as e:
    print(f"Operation failed: {str(e)}")
    raise

finally:
    spark.catalog.clearCache()
    print("Stopping session to free resources...")
    notebookutils.session.stop()
```

### Conditional stop for interactive mode only

Check the execution context before stopping to avoid unnecessary calls in pipeline mode:

```python
context = notebookutils.runtime.context

if not context['isForPipeline']:
    print("Interactive mode: stopping session...")
    notebookutils.session.stop()
else:
    print("Pipeline mode: session stops automatically after execution")
```

> [!TIP]
> Always save important results—such as writing DataFrames to storage or logging output—before calling `session.stop()` or `session.restartPython()`. Both operations discard all in-memory state.

## Related content

- [NotebookUtils for Fabric](../notebook-utilities.md)
