---
title: OneLake Deep Dive ADLS and Blob APIs in Action
description: This explains how developers can use Azure Data Lake Storage (ADLS) and Blob Storage APIs to efficiently connect existing applications to OneLake, especially for streaming Parquet data into Microsoft Fabric’s open mirroring landing zone, without needing to rewrite their apps. It covers practical implementation details, performance tips, and robust testing strategies using the Azurite emulator
ms.reviewer: eloldag
ms.author: tompeplow
author: tpeplow
ms.topic: overview
ms.custom:
ms.date: 10/07/2025
#customer intent: As a developer or data engineer, I want to seamlessly connect my existing Azure Storage-based applications to OneLake and efficiently stream, serialize, and upload data—such as Parquet files—into Fabric’s open mirroring landing zone, so that I can modernize my data pipelines, optimize performance, and enable robust, testable integrations without rewriting my code.
---


# OneLake Deep Dive: ADLS and Blob APIs in Action

If you’re working with an existing application built on Azure Storage (Azure Data Lake Storage or Azure Blobs), and want to connect it to OneLake—good news! You can stick with the APIs you’re already using. Whether it’s [Azure Data Lake Storage (ADLS)](/rest/api/storageservices/data-lake-storage-gen2) or [Blob Storage APIs](/rest/api/storageservices/blob-service-rest-api), [both are fully supported in OneLake](onelake-api-parity.md). No need to rewrite your app—just point it at OneLake and go.

We demonstrate how Blob and ADLS APIs are useful through a real-world mirroring example and share developer insights from OneLake. We explore when and why you might choose one API over another, and how to get the most out of each. All the patterns we cover apply to Azure Storage storage as well.

In this scenario, we cover:
1.	What is [open mirroring](/fabric/database/mirrored-database/open-mirroring-landing-zone-format)
2.	How to use the .NET [Azure Blob Storage](/azure/storage/blobs/storage-blob-dotnet-get-started) and [Distributed File System (DFS)](/azure/storage/blobs/data-lake-storage-directory-file-acl-dotnet) clients to write data into the open mirror landing zone.
3.	How to combine the Blob Storage and DFS clients for uploading data and managing folders in OneLake, especially when performance matters
4.	How to handle scenarios that crop up with block blobs when writing parquet data to blob storage from .NET
5.	How to test everything locally using the [Azurite emulator](/azure/storage/common/storage-use-azurite). (Yes—code you write against OneLake works with the storage emulator too!)

## Streaming Parquet into OneLake with Blob APIs
In this section, we demonstrate how to efficiently stream parquet data into OneLake, particularly the open mirroring landing zone. Open mirroring is a powerful way to bring data from proprietary systems, where shortcuts [shortcuts](onelake-shortcuts.md) can't be used, into Microsoft Fabric. It handles the heavy lifting, converting raw data into [Delta Lake format](https://delta.io/), managing [upserts, delete vectors](https://docs.delta.io/latest/delta-update.html), [optimize](https://delta.io/blog/delta-lake-optimize/), [vacuum](https://docs.delta.io/latest/delta-utility.html#remove-files-no-longer-referenced-by-a-delta-table), and more. All you need to do is upload your data into the landing zone, include a row marker, and mirroring takes it from there.

It's common that teams write custom code to extract data from proprietary systems and output it in an open format. While open mirroring ingests both CSV and Parquet into Delta tables, if you’re already writing code, you might as well go with Parquet, it’s more efficient to upload and process.

[Parquet](https://parquet.apache.org/) is a storage [file format](https://parquet.apache.org/docs/file-format/) designed for analytics. Delta, on the other hand, is a table protocol built on top of Parquet. It adds transactional guarantees, schema enforcement, and support for updates and deletes. When you upload Parquet files to the open mirroring landing zone, those files are ingested into Delta tables—bringing ACID semantics and query performance optimizations without requiring you to manage those complexities yourself. The row marker indicates how each record should be merged into the table, which enables the mirroring process to know when to insert, update, or delete rows.

Let’s walk through a concrete (but fictional) example.

Imagine you’ve got a .NET application that pulls UK house price data from an on-premises Inland Revenue system. (Just to be clear, this is a made-up scenario. The UK Inland Revenue isn’t doing this to my knowledge, but the dataset is [publicly available](https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads) and makes for a good example.) This app runs monthly as an Azure Function, and to keep costs low, it needs to be fast and avoid using local disk. So, the goal is to stream the data directly from the source into the open mirroring landing zone in Parquet format. The Price Paid dataset from the UK Inland Revenue includes a [RecordStatus](https://www.gov.uk/guidance/about-the-price-paid-data#:~:text=Record%20Status%20%2D%20monthly%20file%20only) field, which must be mapped to the row marker required by the open mirroring format.

This scenario aligns well with the Blob Storage API. It supports streaming writes, allowing you to push data directly into OneLake without staging it locally. That makes it simple, efficient, and cost-effective, especially for serverless workloads like Azure Functions. It’s also fast: the Blob API supports parallel block uploads, which can significantly boost throughput when writing large files—and isn’t supported when using the DFS endpoint. 

For this, we’re using the open source [Parquet.NET library](https://www.nuget.org/packages/Parquet.Net), a fully managed .NET assembly that makes it easy to write Parquet data on the fly. Also, working with an object store like Blob Storage introduces a few nuances, especially around streaming and buffering, which gives us an opportunity to explore some nuances when working with blob storage.

This approach keeps your Azure Function lightweight, fast, and cost-efficient, no local disk, no staging, just stream, serialize, and upload.

## Open mirroring landing zone summary

The [open mirroring landing zone](/fabric/database/mirrored-database/open-mirroring-landing-zone-format) acts like an inbox for your mirrored tables, add files then Fabric takes care of the ingestion. But behind that simplicity is a clear protocol your application needs to follow to ensure data is correctly discovered and processed.

### Folder structure

Each mirrored table has a dedicated path in OneLake:

`<workspace>/mirrored-database/Files/LandingZone/<table-name>/`

This is where you’ll write both metadata and data files. You don’t need to explicitly create folders, just write blobs with the appropriate prefix, and the structure is inferred. 

### Step 1: Declare the table keys

Before writing any data, you must create a `_metadata.json` file in the table’s landing zone folder. This file defines the key columns used for upserts and deletes:

```csharp
public async Task CreateTableAsync(OpenMirroredTableId table, params string[] keyColumns)
{
    await using var metadataFile = await OpenWriteAsync(table, "_metadata.json");
    var json = new { keyColumns };
    await JsonSerializer.SerializeAsync(metadataFile, json);
}
```

This metadata file tells Fabric how to uniquely identify rows. Without it, Fabric won’t ingest your data.

### Step 2: Create data files with the correct name

Once the metadata is in place, you can start writing data. Files must be named sequentially using zero-padded numbers like `00000000000000000001.parquet`, `00000000000000000002.parquet`, etc. This ensures deterministic ordering and avoids collisions.

List APIs return blobs alphabetically, so our logic can quickly find the next sequence number by processing the landing zone folder with a flat listing. Open mirroring moves processed files to folders prefixed with _, which are sorted below numeric values. Exiting the loop after seeing all parquet files improves performance when you’re using the [Azure Storage List Blob API](/rest/api/storageservices/list-blobs) – which would enumerate blobs in sub folders as it matches the prefix. If you’re using the [ADLS Path List API](/rest/api/storageservices/datalakestoragegen2/path/list?view=rest-storageservices-datalakestoragegen2-2019-12-12), you can choose to perform a recursive list, which allows control over whether or not to list the contents of sub folders – this is a clear advantage of the hierarchical namespace.

The logic to determine the next file name looks like this:

```csharp
public async Task<MirrorDataFile> CreateNextTableDataFileAsync(OpenMirroredTableId table)
{
    var (containerClient, path) = GetTableLocation(table);
    var listBlobs = containerClient.GetBlobsAsync(prefix: path);
    var tableFound = false;
    BlobItem? lastDataFile = null;
    // Parquet files will be first in the folder because other files and folders all start with an underscore.
    // So we can just take the last Parquet file to get our sequence number.
    await foreach (var blob in listBlobs)
    {
        tableFound = true;
        if (blob.Name.EndsWith(".parquet") && blob.Properties.ContentLength > 0)
        {
            lastDataFile = blob;
        }
        else
        {
            break;
        }
    }
    if (!tableFound)
    {
        throw new ArgumentException($"Table not found.", nameof(table));
    }

    long lastFileNumber = 0;
    
    if (lastDataFile is not null)
    {
        var dataFileName = Path.GetFileName(lastDataFile.Name);
        lastFileNumber = long.Parse(dataFileName.Split('.')[0]);
    }
    
    var stream = await OpenWriteAsync(table, $"{++lastFileNumber:D20}.parquet");
    return new MirrorDataFile(stream)
    {
        FileSequenceNumber = lastFileNumber
    };
}
```
You might be wondering what the MirrorDataFile class is for, we’ll come back to that shortly when we cover how to work reliably with block blobs.

### Step 3: Upload the contents of the file

The actual write is handled by opening a stream to the blob:

```csharp
private async Task<Stream> OpenWriteAsync(OpenMirroredTableId table, string fileName)
{
    var (containerClient, path) = GetTableLocation(table);
    path += fileName;
    var blobClient = containerClient.GetBlobClient(path);
    var stream = await blobClient.OpenWriteAsync(true);
    return stream;
}
```

> [!NOTE]
> Mirrored databases support schemas, so the landing zone can contain an [optional schema folder](../mirroring/open-mirroring-landing-zone-format.md#schema) to denote that the table is within a schema. Also, in OneLake, Fabric [workspaces](../fundamentals/workspaces.md) are mapped to storage [Containers](/azure/storage/blobs/storage-blobs-introduction#containers) and [ADLS Filesystems](/azure/storage/blobs/data-lake-storage-abfs-driver).

```csharp
public record OpenMirroredTableId(string WorkspaceName, string MirroredDatabaseName, string TableName)
{
    public string? Schema { get; init; } = null;

    public string GetTablePath() => Schema == null
            ? $"{MirroredDatabaseName}/Files/LandingZone/{TableName}/"
            : $"{MirroredDatabaseName}/Files/LandingZone/{Schema}.schema/{TableName}/";
}

private (BlobContainerClient ContainerClient, string TablePath) GetTableLocation(OpenMirroredTableId table)
{
    var containerClient = blobServiceClient.GetBlobContainerClient(table.WorkspaceName);
    var path = table.GetTablePath();
    
    return (containerClient, path);
}
```
The business logic that reads Price Paid data from the Inland Revenue system converts each record into Parquet format as it is streamed from the source. Each row is written directly into a Parquet file, which is simultaneously streamed byte-by-byte into Azure Storage using the stream returned by `CreateNextTableDataFileAsync`. This approach avoids local staging and supports efficient, serverless ingestion.

Here’s how the code works:

```csharp
public async Task SeedMirrorAsync(OpenMirroredTableId tableId, CancellationToken cancellationToken = default)
{
    await openMirroringWriter.CreateTableAsync(tableId, PricePaidMirroredDataFormat.KeyColumns);
    var data = pricePaidDataReader.ReadCompleteData(cancellationToken);
    await using var mirrorDataFile = await openMirror.CreateNextTableDataFileAsync(tableId);
    await mirrorDataFile.WriteData(async stream => await data.WriteAsync(stream, Settings.RowsPerRowGroup, cancellationToken));
}
```

The `WriteAsync` method serializes the data into Parquet format, row group by row group:
```csharp
public static async Task WriteAsync(this IAsyncEnumerable<PricePaid> data, Stream resultStream, int rowsPerRowGroup = 10000, CancellationToken cancellationToken = default)
{
    await using var parquetWriter = await ParquetWriter.CreateAsync(
        PricePaidMirroredDataFormat.CreateSchema(), 
        resultStream, 
        cancellationToken: cancellationToken);

    await foreach (var chunk in data
        .Select(PricePaidMirroredDataFormat.Create)
        .ChunkAsync(rowsPerRowGroup, cancellationToken))
    {
        await ParquetSerializer.SerializeRowGroupAsync(parquetWriter, chunk, cancellationToken);
    }
}
```

Each `PricePaid` record is transformed into a `PricePaidMirroredDataFormat` object, which includes the required `__rowMarker__` field:

```csharp
public static PricePaidMirroredDataFormat Create(PricePaid pricePaid)
{
    var recordMarker = pricePaid.RecordStatus.Value switch
    {
        RecordStatus.Added => 0,
        RecordStatus.Changed => 1,
        RecordStatus.Deleted => 2,
        _ => throw new InvalidEnumArgumentException("Unexpected RecordStatus value")
    };

    return new PricePaidMirroredDataFormat
    {
        TransactionId = pricePaid.TransactionId,
        Price = pricePaid.Price,
        ...
        __rowMarker__ = recordMarker
    };
}
```
This protocol is simple and deterministic. It avoids unnecessary API calls, works seamlessly with both batch and streaming pipelines, and integrates smoothly with serverless environments like Azure Functions. Uploading a blob to a prefix automatically creates the parent folders and remains compatible with the storage emulator—more on that in the testing section.

### Step 4: Cleanup after yourself

Once open mirroring has successfully processed your data, it moves the original files into special folders, `_ProcessedFiles` and `_FilesReadyToDelete`, and adds a `_FilesReadyToDelete.json` file. While Fabric will automatically delete these files after seven days, that retention window can lead to significant storage costs if you're mirroring large volumes of data.

To reduce costs, you can proactively delete these folders once you're confident the data has been ingested. This is a great use case for the ADLS API, which supports atomic directory deletion—far more efficient than enumerating and deleting individual blobs and updating the `_FilesReadyToDelete.json` file.

Here’s how to do it:
```csharp
public async Task CleanUpTableAsync(OpenMirroredTableId tableId)
{
    var (fileSystemClient, tablePath) = GetTableLocation(tableId);
    var foldersToDelete = new []
    {
        "_ProcessedFiles",
        "_FilesReadyToDelete"
    };
    await Parallel.ForEachAsync(foldersToDelete, async (path, _) =>
    {
        var fullPath = $"{tablePath}{path}/";
        var directoryClient = fileSystemClient.GetDirectoryClient(fullPath);
        if (await directoryClient.ExistsAsync())
        {
            await directoryClient.DeleteAsync();
        }
    });
}

private (DataLakeFileSystemClient FileSystemClient, string TablePath) GetTableLocation(OpenMirroredTableId table)
{
    var containerClient = dataLakeServiceClient.GetFileSystemClient(table.WorkspaceName);
    var path = $"{table.MirroredDatabaseName}/Files/LandingZone/{table.TableName}/";

    return (containerClient, path);
}
```

## Reliably working with block blobs

I chose this example because it opens the door to talk about some nuances with block blobs. These aren't OneLake specific, but because OneLake is built on Azure Storage, OneLake exposes these nuances too.

One such case: the .NET Storage SDK exposes an `OpenWrite` API that returns a Stream. Super handy. As shown in the example above, that stream fits nicely with the Parquet.NET APIs. It also makes testing a breeze—you can easily substitute the stream in unit tests without needing to build extra abstractions just for testability. 

```csharp
[Test]
public async Task when_writing_price_paid_data_to_parquet()
{
    var row = new PricePaid
    {
        TransactionId = "{34222872-B554-4D2B-E063-4704A8C07853}",
        Price = 375000,
        DateOfTransfer = new DateTime(2004, 4, 27),
        Postcode = "SW13 0NP",
        PropertyType = PropertyType.Detached,
        IsNew = true,
        DurationType = DurationType.Freehold,
        PrimaryAddressableObjectName = "10A",
        SecondaryAddressableObjectName = string.Empty,
        Street = "THE TERRACE",
        Locality = string.Empty,
        TownCity = "LONDON",
        District = "RICHMOND UPON THAMES",
        County = "GREATER LONDON",
        CategoryType = CategoryType.AdditionalPricePaid,
        RecordStatus = RecordStatus.Added
    };

    using var memoryStream = new MemoryStream();
    await new[] { row }.ToAsyncEnumerable().WriteAsync(memoryStream);

    var readData = await PricePaidMirroredDataFormat.Read(memoryStream).SingleAsync();
    Assert.Multiple(() =>
    {
        Assert.That(readData.TransactionId, Is.EqualTo(row.TransactionId));
        Assert.That(readData.Price, Is.EqualTo(row.Price));
        Assert.That(readData.DateOfTransfer, Is.EqualTo(row.DateOfTransfer));
        // more assertions
        Assert.That(readData.__rowMarker__, Is.EqualTo(0)); // RecordStatus.Added
    });
}
```

But here’s the catch: Blob Storage isn’t the same as a local file system.

### Calling flush – commits the blocks
To understand why the `Flush()` call in Parquet.NET matters, we need to take a quick detour into how Parquet files are structured—and how that interacts with the Blob Storage block blob API.

#### Parquet File Basics

Parquet is a columnar storage format designed for efficient analytics. A Parquet file is made up of:
- Row groups: These are the core building blocks. Each row group contains a chunk of rows, organized by column. Row groups are written sequentially and independently.
- Column chunks: Within each row group, data is stored column-by-column.
- Metadata: At the end of the file, Parquet writes a footer that includes schema and offset information for fast reads.
In Parquet.NET, each time a row group is completed, the library calls `Flush()` on the output stream. This is where things get interesting when you're writing to Blob Storage.

#### Block Blob Model

Blob Storage, and therefore OneLake, uses a block blob model, which works like this:
1. You upload blocks: Each block can be up to 4,000 MiB in size (default is 4 MiB). You can upload blocks in parallel to maximize throughput—and the .NET Blob client does this for you automatically, which is great. This is one reason to use the Blob client (not the DFS client) for uploads. The DFS client doesn’t support parallel block uploads, which can be a performance bottleneck. That said, the DFS client can still read the resulting files just fine.
2.	You commit the blocks: Once all blocks are uploaded, you call CommitBlockList() to finalize the blob. You can upload up to 50,000 blocks per blob, which means—if you’re using 4,000-MiB blocks—you could theoretically write a single 190.7-TiB file. (Not that I’d recommend it.) 
If you’d like to learn more, read this article [Understanding block blobs, append blobs, and page blobs](/rest/api/storageservices/understanding-block-blobs--append-blobs--and-page-blobs).

**Here's the catch**

When Parquet.NET calls `Flush()` after each row group, and you're writing to a stream backed by Blob Storage, that flushes triggers a block list commit. As the file grows, each new row group causes the library to recommit all previously uploaded blocks.

Let’s say you’re writing a 1-GB file with 100MB row groups, using 4MB blocks. That gives you 250 blocks in total. On the first flush, you commit 25 blocks. On the second, 50. By the final flush, you’re committing all 250 blocks. Add that up across all 10 row groups, and you’ve committed a total of 1,375 blocks—even though the final file only needs one commit.

This is inefficient, and it introduces two key problems:
1.	**Timeouts and retries.** Large block lists can lead to timeouts. Remember, Blob Storage is built on HTTP. It’s reliable—but not perfect. A timeout might succeed on the server, but your client doesn’t know that, so it retries. That retry can result in a 409 Conflict.
Doing something expensive 250 times instead of once increases the chance of this happening. Fewer commits = fewer retries = fewer headaches.
2.	**Premature blob visibility.** One of the nice things about the Blob API is that the blocks don't become visible until you explicitly commit the block list. This aligns well for scenarios like Parquet, where the file isn’t valid until the footer metadata is written. It means downstream processes won’t accidentally pick up a half-written file. But here’s the twist: because Parquet.NET calls `Flush()` after each row group, and that flush triggers a commit, the blob becomes visible before the file is complete. So even though the Blob API is designed to help you avoid this problem, the way Parquet.NET works with a Stream introduces an issue—unless you take steps to prevent it. 

To bridge the gap between Parquet.NET and the nuances of Blob Storage, don't implement the `Flush()` call in the `BlobFile.BlobStream` implementation. That way, even though Parquet.NET calls Flush after each row group, the underlying stream doesn’t flush to storage.

The storage clients (DFS and Blob) will create an empty file when calling OpenWrite. The open mirroring processor logs an error when encountering a 0-byte file, which is possible if the replicator process interleaves with file creation. To avoid this write a file to another location and move it to the correct path, which the ADLS APIs supports through a [rename operation](/rest/api/storageservices/rename-file), like so:

```csharp
public async Task<BlobFile> CreateFileAsync(string filePath)
{
    if (filePath is null)
    {
        throw new ArgumentNullException(nameof(filePath), "File path cannot be null.");
    }
    var containerClient = client.blobServiceClient.GetBlobContainerClient(containerName);
    var temporaryPath = $"_{filePath}.temp"!;
    var blobClient = containerClient.GetBlobClient(Combine(temporaryPath));
    var blobStream = await blobClient.OpenWriteAsync(overwrite: true);
    return new BlobFile(blobStream, GetChildPath(temporaryPath), Combine(filePath)!);
}
```

### Calling dispose – commits the blocks and move the file
Here’s another subtle but important behavior to be aware of: when you use the Azure Blob stream, calling `.Dispose()` (or letting it be disposed implicitly) will commit all uploaded blocks.

That’s usually what you want—but not always.

Let’s say your source system is streaming data using an `IAsyncEnumerable`, as it does in the example to illustrate the bug. If that source fails partway through, for example, the database connection times out or the network drops, you might only have a partially written Parquet file. But if the stream gets disposed (which it will, due to await using or a using block), those partial blocks get committed.

To avoid this, the example code explicitly commits once only when the entire operation completes successfully. That way, if the producer fails mid-stream, you’re not left with a half-written file.

This is why the example returns a `BlobFile` object from `CreateNextTableDataFileAsync`, to encapsulate the stream to prevent the zero-byte file, and issues described with `Flush` and `Dispose` committing partial parquet files.

```csharp
public class BlobFile(Stream stream, IStoragePath temporaryFilePath, string finalFilePath) : IAsyncDisposable
{
    private readonly BlobStream stream = new(stream, temporaryFilePath, finalFilePath);
    
    public async Task WriteData(Func<Stream, Task> writeOperation)
    {
        try
        {
            await writeOperation(stream);
        }
        catch (Exception)
        {
            stream.Failed();
            throw;
        }
    }
    
    public async ValueTask DisposeAsync()
    {
        await stream.DisposeAsync();
    }
    
    private class BlobStream(Stream innerStream, IStoragePath temporaryFilePath, string finalFilePath) : Stream
    {
        private bool disposed = false;
        private bool success = true;

        public override bool CanRead => innerStream.CanRead;
        public override bool CanSeek => innerStream.CanSeek;
        public override bool CanWrite => innerStream.CanWrite;

        public override long Length => innerStream.Length;

        public override long Position
        {
            get => innerStream.Position;
            set => innerStream.Position = value;
        }

        public override void Flush()
        {
            // no-op
        }

        public override int Read(byte[] buffer, int offset, int count) => innerStream.Read(buffer, offset, count);

        public override long Seek(long offset, SeekOrigin origin) => innerStream.Seek(offset, origin);

        public override void SetLength(long value) => innerStream.SetLength(value);

        public override void Write(byte[] buffer, int offset, int count) => innerStream.Write(buffer, offset, count);
        
        public void Failed()
        {
            success = false;
        }

        public override async ValueTask DisposeAsync()
        {
            if (disposed)
            {
                return;
            }
            if (success)
            {
                await innerStream.DisposeAsync();
                await temporaryFilePath.RenameAsync(finalFilePath);
            }
            disposed = true;
        }
    }
}
```

## Writing tests with OneLake using the Azurite emulator
One of the great things about OneLake is that it’s built on Azure Storage—which means you can test your integration code locally using the Azurite emulator. This makes it easy to write reliable tests, that emulate the behavior of OneLake / Azure Storage, without needing a live Fabric environment or cloud resources.

Azurite emulates the Blob Storage API, which is exactly what OneLake exposes. That means the same code you use in production can run unchanged in your test suite. You can spin up Azurite as a local process or container, point your `BlobServiceClient` at it, and go.

This is especially useful for unit and integration tests. You can:
- Validate that your `_metadata.json` is written correctly.
- Check that your file naming logic produces the expected sequence.
- Simulate partial writes resulting from calling `Flush` and `Dispose` on failure. This allows testing of the nuances described above and that the implementation handles them appropriately.
- Assert that your Parquet serialization round-trips cleanly.

Azurite doesn't support the ADFS APIs. This is why `BlobFile` above uses an `IStoragePath` interface to implement ADFS functionality using the blob APIs so they can work with the emulator under testing. Here’s an example:

```csharp
public async Task RenameAsync(string newPath)
{
    async Task RenameDirectoryAsync(DataLakeServiceClient dataLakeServiceClient)
    {
        var fileSystemClient = dataLakeServiceClient.GetFileSystemClient(containerName);
        var directoryClient = fileSystemClient.GetDirectoryClient(path);
        await directoryClient.RenameAsync(newPath);
    }

    async Task CopyThenDeleteAsync(BlobServiceClient blobServiceClient)
    {
        var sourceBlob = blobServiceClient.GetBlobContainerClient(containerName).GetBlobClient(path);
        var destinationBlob = blobServiceClient.GetBlobContainerClient(containerName).GetBlobClient(newPath);
        
        await destinationBlob.StartCopyFromUriAsync(sourceBlob.Uri);
        await sourceBlob.DeleteIfExistsAsync();
    }

    StorageOperation operation = new()
    {
        WithFlatNamespace = CopyThenDeleteAsync,
        WithHierarchicalNamespace = RenameDirectoryAsync
    };

    await operation.Execute(client);
}
```

### Testing corner cases: flush and dispose
Earlier, we talked about how Parquet.NET’s use of `Flush()` and `Dispose()` can lead to premature or partial blob commits when writing to OneLake. These behaviors are subtle—but testable.

Here are a few tests to validate that the mirroring logic handles these scenarios correctly:

```csharp
[Test]
public async Task it_should_write_data_to_table()
{
    await setup.FabricPricePaidMirror.SeedMirrorAsync(setup.TableId);
    var mirroredData = await GetMirroredBlobItem();

    var mirroredDataClient = setup.WorkspaceContainer.GetBlobClient(mirroredData!.Name);
    var mirroredDataContents = await mirroredDataClient.DownloadContentAsync();

    var readData = await PricePaidMirroredDataFormat.Read(mirroredDataContents.Value.Content.ToStream()).SingleAsync();
    Assert.Multiple(() =>
    {
        Assert.That(mirroredData, Is.Not.Null);
        Assert.That(mirroredData!.Properties.ContentLength, Is.GreaterThan(0));
        Assert.That(readData.TransactionId, Is.EqualTo(setup.PricePaidReader.TransactionId));
        // ... more assertions ...
    });
}
```

This test confirms that a successful write results in a valid, nonempty Parquet file that round-trips correctly.

Now for the failure cases:

```csharp
[Test]
public async Task it_should_not_commit_partially_written_data()
{
    long? lengthDuringWrite = null;
    setup.PricePaidReader.ActionBetweenRowGroups = async () =>
    {
        var mirroredData = await GetMirroredBlobItem();
        lengthDuringWrite = mirroredData!.Properties.ContentLength;
    };
    await setup.FabricPricePaidMirror.SeedMirrorAsync(setup.TableId);
    Assert.That(lengthDuringWrite, Is.EqualTo(0));
}
```

This test simulates a mid-stream exception and verifies that no partial data is visible while the write is in progress because of the no-op `Flush()` override.

And finally, the failure path:
```csharp
[Test]
public async Task after_a_row_group_is_written_it_should_not_leave_a_partially_complete_blob()
{
    setup.PricePaidReader.ThrowsAfterFirstRowGroup = true;

    var previouslyMirroredFile = await GetMirroredBlobItem();

    var threw = true;
    try
    {
        await setup.FabricPricePaidMirror.SeedMirrorAsync(setup.TableId);
    }
    catch (Exception)
    {
        threw = true;
    }

    var mirroredData = await GetMirroredBlobItem();
    var mirroredTemporaryData = await GetMirroredBlobTemporaryItem();

    Assert.Multiple(() =>
    {
        Assert.That(threw, Is.True);
        if (previouslyMirroredFile == null)
        { 
            Assert.That(mirroredData, Is.Null);
        }
        else
        {
            Assert.That(mirroredData!.Name, Is.EqualTo(previouslyMirroredFile.Name));
        }
        Assert.That(mirroredTemporaryData, Is.Not.Null);
        Assert.That(mirroredTemporaryData!.Properties.ContentLength, Is.EqualTo(0));
    });
}
```

This test confirms that even if the stream is disposed due to an exception a new mirrored file isn't partially written.

These tests provide confidence that the mirroring logic is robust, even under failure conditions. They demonstrate how the emulator can be used to simulate real-world behavior without needing a full Fabric (or Azure) environment.

And just to prove compatibility, tweaking the test setup to point at a Fabric workspace, here’s a table full of UK house price data.

```csharp
public class when_using_fabric
{
    public class in_success_cases : when_copying_to_mirror_successfully
    {
        [SetUp]
        public void UseFabric() => setup = TestSetup.UsingFabric();
    }

    public class in_failure_cases : when_copying_to_mirror_fails
    {
        [SetUp]
        public void UseFabric() => setup = TestSetup.UsingFabric();
    }
}
public static TestSetup UsingFabric()
{
    var blobServiceClient = new BlobServiceClient(new Uri("https://onelake.blob.fabric.microsoft.com/"), new DefaultAzureCredential());
    var pricePaidReader = new TestPricePaidReader();
    var tableId = new OpenMirroredTableId($"TestWorkspace", "HousePriceOpenMirror.MountedRelationalDatabase", "PricePaid");
    var workspaceContainer = blobServiceClient.GetBlobContainerClient(tableId.WorkspaceName);
    var fabricPricePaidMirror = new FabricPricePaidMirror(new FabricOpenMirroringWriter(blobServiceClient), pricePaidReader)
    {
        Settings = new FabricPricePaidMirrorSettings { RowsPerRowGroup = 1 }
    };

    return new TestSetup
    {
        BlobServiceClient = blobServiceClient,
        PricePaidReader = pricePaidReader,
        TableId = tableId,
        WorkspaceContainer = workspaceContainer,
        FabricPricePaidMirror = fabricPricePaidMirror
    };
}
```

:::image type="content" source="./media/onelake-open-access-quickstart/onelake-open-mirror-house-price-data.png" lightbox="./media/onelake-open-access-quickstart/onelake-open-mirror-house-price-data.png" alt-text="Screenshot that shows house price data mirrored into an open mirrored table":::

## Wrapping up

If you’re building new pipelines on OneLake, especially for streaming or serverless workloads, the ADLS and Blob storage APIs work as expected. They're fast, flexible, and work seamlessly with open mirroring. By following the landing zone protocol and handling block blob and file system differences, you can build robust, testable integrations that work just as well in production as they do in your local emulator. And best of all—you don’t need to rewrite your app or fight the filesystem. Just stream, serialize, and upload to OneLake.