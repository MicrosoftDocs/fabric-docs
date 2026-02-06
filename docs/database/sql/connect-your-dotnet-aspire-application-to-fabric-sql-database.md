---
title: "Connect Your Application to a SQL Database in Fabric"
description: Learn how to quickly connect a .NET Aspire application to the AdventureWorks sample database in your SQL database.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, drskwier, dlevy
ms.date: 01/15/2026
ms.topic: quickstart
---
# Quickstart: Connect your .NET Aspire application to a SQL database

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, learn how to connect your .NET Aspire application to a [SQL database in Microsoft Fabric](overview.md).

SQL database in Fabric lets you quickly connect your applications. In this article, you'll connect a .NET Aspire application to a SQL database in Fabric using the `AdventureWorksLT` sample schema. This walkthrough uses [Visual Studio Code](https://code.visualstudio.com/), which, when combined with [a Fabric trial capacity](../../fundamentals/fabric-trial.md), lets you complete this entire walkthrough for free.

## Prerequisites

- [Load AdventureWorks sample data in your SQL database](load-adventureworks-sample-data.md).
- Complete the [Quickstart: Build your first .NET Aspire solution](https://aspire.dev/get-started/deploy-first-app/?lang=csharp).
   - Use [Visual Studio Code](https://code.visualstudio.com/) with the [C# Dev Kit: Extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit).
   - Use **AspireSample** for the solution name.
   - Make sure your Aspire Templates are version 9.3.0 or higher. If you need to upgrade, it won't disrupt current development. You can use the following command to upgrade:

      ```bash
      dotnet new install Aspire.ProjectTemplates::9.3.0 --force
      ```

## Add a new page to display the AdventureWorks product details

[Quickstart: Build your first .NET Aspire solution](https://aspire.dev/get-started/deploy-first-app/?lang=csharp) creates a new .NET Aspire solution with an API and a web front end. The solution includes the following projects:

- `AspireSample.ApiService`: A web API project that shows weather forecasts.
- `AspireSample.AppHost`: An orchestrator project that connects and configures the different projects and services of your app. Set the orchestrator as the startup project.
- `AspireSample.ServiceDefaults`: A shared class library that holds reusable configurations across the projects in your solution.
- `AspireSample.Web`: A Blazor app that provides a web user interface for the solution.

## Create the database model and context classes

First, install EF Core in the `AspireSample.ApiService` project.

1. In the **Terminal Window** in Visual Studio Code, go to the `AspireSample.ApiService` project directory, and then run:

   ```bash
   dotnet add package Aspire.Microsoft.EntityFrameworkCore.SqlServer
   ```

1. To represent a product, add a new file named `Product.cs` with the following `Product` model class at the root of the `AspireSample.ApiService` project:

   ```csharp
   using Microsoft.EntityFrameworkCore;
   using System.ComponentModel.DataAnnotations;
   using System.ComponentModel.DataAnnotations.Schema;
   
   namespace AspireSample.ApiService;
   
   [Table("Product", Schema = "SalesLT")]
   public sealed class Product
   {
     public int ProductID { get; set; }
     [Required]
     public string? Name { get; set; }
     public string ProductNumber { get; set; } = string.Empty;
     public string? Color { get; set; }
     [Precision(18, 2)]
     public decimal StandardCost { get; set; } = 0.0m;
     [Precision(18, 2)]
     public decimal ListPrice { get; set; } = 0.0m;
     public string? Size { get; set; }
     [Precision(8, 2)]
     public decimal? Weight { get; set; }
     public int? ProductCategoryID { get; set; }
     public int? ProductModelID { get; set; }
     public DateTime SellStartDate { get; set; } = DateTime.Now;
     public DateTime? SellEndDate { get; set; }
     public DateTime? DiscontinuedDate { get; set; }
     public byte[]? ThumbNailPhoto { get; set; }
     public string? ThumbnailPhotoFileName { get; set; }
     public Guid RowGuid { get; set; } = Guid.NewGuid();
     public DateTime ModifiedDate { get; set; } = DateTime.Now;
   }
   ``` 

1. Add a new file named `AdventureWorksDbContext.cs` with the following `AdventureWorksDbContext` data context class at the root of the `AspireSample.ApiService` project. The class uses `System.Data.Entity.DbContext` to work with EF Core and represent your database.

   ```csharp
   using System.ComponentModel.DataAnnotations.Schema;
   using Microsoft.EntityFrameworkCore;
   using Microsoft.Extensions.Options;
   
   namespace AspireSample.ApiService;
   
   public class AdventureWorksDbContext(DbContextOptions options) : DbContext(options)
   {
     public DbSet<Product> Products => Set<Product>();
   }
   ```

1. Save your changes by selecting **File** > **Save All**.

## Add the Scalar user interface to the API project

Use the Scalar UI to test the `AspireSample.ApiService` project. Let's install and configure it:

1. In the **Terminal Window** in Visual Studio Code, navigate to the `AspireSample.ApiService` project directory, and then run:

   ```bash
   dotnet add package Scalar.AspNetCore
   ```

1. In the `AspireSample.ApiService` project, open the `Program.cs` file.
1. Add the following line of code to the top of the file:

   ```csharp
   using Scalar.AspNetCore;
   ```

1. Locate the following lines of code:

   ```csharp
   if (app.Environment.IsDevelopment())
   {
     app.MapOpenApi();
   }
   ```

1. Modify that code to match the following lines:

   ```csharp
   if (app.Environment.IsDevelopment())
   {
     app.MapOpenApi();
     app.MapScalarApiReference(_ => _.Servers = [ ]);
   }
   ```

1. To save your changes, select **File** > **Save All**.

## Configure a connection string in the app host project

Usually, when you create a cloud-native solution with .NET Aspire, you call the `Aspire.Hosting.SqlServerBuilderExtensions.AddSqlServer` method to initiate a container that runs the SQL Server instance. You pass that resource to other projects in your solution that need access to the database.

In this case, however, you want to work with an existing SQL database in Fabric. There are three differences in the App Host project:

- You don't need to install the `Aspire.Hosting.SqlServer` hosting integration.
- You add a connection string in a configuration file, such as `appsetting.json`.
- You call `Aspire.Hosting.ParameterResourceBuilderExtensions.AddConnectionString` to create a resource that you pass to other projects. Those projects use this resource to connect to the existing database.

Let's implement that configuration:

1. In Visual Studio Code, in the `AspireSample.AppHost` project, open the `appsetting.json` file.
1. Replace the entire contents of the file with the following code:

   ```json
   {
     "ConnectionStrings": {
         "sql": "sql_connection_string"
     },
     "Logging": {
         "LogLevel": {
             "Default": "Information",
             "Microsoft.AspNetCore": "Warning",
             "Aspire.Hosting.Dcp": "Warning"
         }
     }
   }
   ```

1. In your web browser, navigate to your SQL database loaded with the AdventureWorks sample data.
1. Select the settings icon, then select **Connection strings**, and copy the entire **ADO.NET connection string**.
1. Replace the `sql_connection_string` text in the *appsetting.json* file with the ADO.NET connection string that you just copied.
1. In the `AspireSample.AppHost` project, open the `AppHost.cs` file. 
1. Locate the following line of code:

   ```csharp
   var builder = DistributedApplication.CreateBuilder(args);
   ```

1. Immediately after that line, add this line of code, which obtains the connection string from the configuration file:

   ```csharp
   var connectionString = builder.AddConnectionString("sql");
   ```

1. Locate the following line of code, which creates a resource for the `AspireSample.ApiService` project:

   ```csharp
   var apiService = builder.AddProject<Projects.AspireSample_ApiService>("apiservice")
       .WithHttpHealthCheck("/health");
   ```

1. Modify that line to match the following code, which creates the resource and passes the connection string to it:

   ```csharp
   var apiService = builder.AddProject<Projects.AspireSample_ApiService>("apiservice")
       .WithHttpHealthCheck("/health")
       .WithReference(connectionString);
   ```
1. To save your changes, select **File** > **Save All**.

## Use the database in the API project

Returning to the `AspireSample.ApiService` project, you must obtain the connection string resource from the App Host, and then use it to create the database:

1. In the `AspireSample.ApiService` project, open the `Program.cs` file.

1. Add the following line of code to the top of the file:

   ```csharp
   using AspireSample.ApiService;
   ```

1. Locate the following line of code:

   ```csharp
   var builder = WebApplication.CreateBuilder(args);
   ```

1. Immediately after that line, add this line of code:

   ```csharp
   builder.AddSqlServerDbContext<AdventureWorksDbContext>("sql");
   ```

1. Locate the following line of code:

   ```csharp
   app.MapDefaultEndpoints();
   ```

1. Immediately after that line, add these lines of code:

   ```csharp
   app.UseExceptionHandler("/Error", createScopeForErrors: true);
   app.UseHsts();
   ```

1. To save your changes, select **File** > **Save All**.

## Add code to query products from the database

In the .NET Aspire starter solution template, the API creates five random weather forecasts and returns them when another project requests them. Let's add code that queries the database:

1. In the `AspireSample.ApiService` project, open the `Program.cs` file.
1. At the top of the file, add the following lines of code:

    ```csharp
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    ```

1. Locate the following code:

    ```csharp
    string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

    app.MapGet("/weatherforecast", () =>
    {
        var forecast = Enumerable.Range(1, 5).Select(index =>
            new WeatherForecast
            (
                DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Random.Shared.Next(-20, 55),
                summaries[Random.Shared.Next(summaries.Length)]
            ))
            .ToArray();
        return forecast;
    })
    .WithName("GetWeatherForecast");
    ```

1. Immediately after that code, add the following lines:

    ```csharp
    app.MapGet("/productList", async ([FromServices] AdventureWorksDbContext context) =>
    {
        var product = await context.Products.OrderBy(p=>p.ProductID).ToArrayAsync();
        return product;
    })
    .WithName("GetProductList");
    ```

1. To save your changes, select **File** > **Save All**.

## Add code to display products from the database

In the .NET Aspire starter solution template, the web project contains a few sample pages. Let's add another page to display product details from the database:

1. In the `AspireSample.Web` project, open the `AspireSample.Web.csproj` file.

1. Locate the following code:

   ```csharp
   <ItemGroup>
      <ProjectReference Include="..\AspireSample.ServiceDefaults\AspireSample.ServiceDefaults.csproj" />
   </ItemGroup>
   ```

1. Add a project reference for `AspireSample.ApiServer`, for example:

   ```csharp
   <ItemGroup>
      <ProjectReference Include="..\AspireSample.ServiceDefaults\AspireSample.ServiceDefaults.csproj" />
      <ProjectReference Include="..\AspireSample.ApiService\AspireSample.ApiService.csproj" /> 
    </ItemGroup>
   ```

1. To fetch the product records, add a new file named `ProductApiClient.cs` with the following `ProductApiClient` class at the root of the `AspireSample.Web` project:

    ```csharp
    using AspireSample.ApiService;
    
    namespace AspireSample.Web;
    
    public class ProductApiClient(HttpClient httpClient)
    {
        public async Task<Product[]> GetProductAsync(int maxItems = 300, CancellationToken cancellationToken = default)
        {
            List<Product>? products = null;
    
            await foreach (var product in httpClient.GetFromJsonAsAsyncEnumerable<Product>("/productList", cancellationToken))
            {
                if (products?.Count >= maxItems)
                {
                    break;
                }
                if (product is not null)
                {
                    products ??= [];
                    products.Add(product);
                }
            }
    
            return products?.ToArray() ?? [];
        }
    }
    ```

1. In the `AspireSample.Web` project, open the `Program.cs` file.

1. Locate the following code:

   ```csharp
    builder.Services.AddHttpClient<WeatherApiClient>(client =>
    {
        // This URL uses "https+http://" to indicate HTTPS is preferred over HTTP.
        // Learn more about service discovery scheme resolution at https://aka.ms/dotnet/sdschemes.
        client.BaseAddress = new("https+http://apiservice");
    });
   ```

1. Immediately after that code, add the following lines:

   ```csharp
    builder.Services.AddHttpClient<ProductApiClient>(client =>
    {
        // This URL uses "https+http://" to indicate HTTPS is preferred over HTTP.
        // Learn more about service discovery scheme resolution at https://aka.ms/dotnet/sdschemes.
        client.BaseAddress = new("https+http://apiservice");
    });
   ```

1. In the `AspireSample.Web` project, expand the **Components** > **Pages** folder. Create a new file in the **Pages** folder named `Products.razor` and paste the following code into it:

   ```csharp
   @using AspireSample.ApiService;
   @using Microsoft.AspNetCore.Components.Web
   @page "/products"
   @attribute [StreamRendering(true)]
   @attribute [OutputCache(Duration = 5)]
   
   @inject ProductApiClient ProductApi
   
   <PageTitle>Products</PageTitle>
   
   <h1>Products</h1>
   
   <p>This component demonstrates showing data loaded from a backend API service that reads data from a database.</p>
   
   @if (products == null)
   {
     <p><em>Loading...</em></p>
   }
   else
   {
     <table class="table">
         <thead>
             <tr>
                 <th>Thumbnail</th>
                 <th>ProductID</th>
                 <th>Name</th>
                 <th>ProductNumber</th>
                 <th>Color</th>
                 <th>StandardCost</th>
                 <th>ListPrice</th>
                 <th>Size</th>
                 <th>Weight</th>
                 <th>ProductCategoryID</th>
                 <th>ProductModelID</th>
                 <th>SellStartDate</th>
                 <th>SellEndDate</th>
                 <th>DiscontinuedDate</th>
                 <th>ThumbnailPhotoFileName</th>
                 <th>RowGuid</th>
                 <th>ModifiedDate</th>
             </tr>
         </thead>
         <tbody>
             @foreach (var product in products)
             {
                 <tr>
                     <td><img src="@GetImageString(product.ThumbNailPhoto)"/></td>
                     <td>@product.ProductID</td>
                     <td>@product.Name</td>
                     <td>@product.ProductNumber</td>
                     <td>@product.Color</td>
                     <td>@product.StandardCost</td>
                     <td>@product.ListPrice</td>
                     <td>@product.Size</td>
                     <td>@product.Weight</td>
                     <td>@product.ProductCategoryID</td>
                     <td>@product.ProductModelID</td>
                     <td>@product.SellStartDate.ToShortDateString()</td>
                     <td>@(product.SellEndDate?.ToShortDateString() ?? "N/A")</td>
                     <td>@(product.DiscontinuedDate?.ToShortDateString() ?? "N/A")</td>
                     <td>@product.ThumbnailPhotoFileName</td>
                     <td>@product.RowGuid</td>
                     <td>@product.ModifiedDate.ToShortDateString()</td>
                 </tr>
             }
         </tbody>
     </table>
   }
   
   @code {
     
     private Product[]? products;
   
     protected override async Task OnInitializedAsync()
     {
         products = await ProductApi.GetProductAsync();
     }
   
     private string GetImageString(byte[]? imageData)
     {
         if (imageData == null || imageData.Length == 0)
         {
             return "";
         }
         //It is almost always better to store images and files outside of the database.
         return String.Concat("data:image/png;base64,", Convert.ToBase64String(imageData, 0, imageData.Length));
     }
   }
   ```

1. In the `AspireSample.Web` project, expand the **Components** > **Layout** folder. 
1. Open `NavMenu.razor`.
1. Locate the following code:

   ```csharp
   <div class="nav-item px-3">
     <NavLink class="nav-link" href="weather">
         <span class="bi bi-list-nested" aria-hidden="true"></span> Weather
     </NavLink>
   </div>
   ```

1. Immediately after that code, add the following lines:

   ```csharp
   <div class="nav-item px-3">
     <NavLink class="nav-link" href="products">
         <span class="bi bi-list-nested" aria-hidden="true"></span> Products
     </NavLink>
   </div>
   ```

1. To save your changes, select **File** > **Save All**.

## Run and test the app locally

The sample app is ready to test.

1. In Visual Studio Code, press <kbd>F5</kbd> to launch your .NET Aspire project dashboard in the browser.

1. A new tab opens asking you to sign in to Azure. The prompt is to authenticate to your SQL database. To deploy this application, use a service or user-assigned managed identity or a service principal. To change the authentication type, update your connection string:
       
   The passwordless connection string sets a configuration value of `Authentication="Active Directory Default"`, which instructs the `Microsoft.Data.SqlClient` library to connect to Azure SQL Database using a class called [`DefaultAzureCredential`](/dotnet/azure/sdk/authentication#defaultazurecredential). `DefaultAzureCredential` enables passwordless connections to Azure services and is provided by the Azure Identity library on which the SQL client library depends. `DefaultAzureCredential` supports multiple authentication methods and determines which to use at runtime for different environments.
    
   > [!NOTE]
   > Passwordless connection strings are safe to commit to source control, since they don't contain secrets such as usernames, passwords, or access keys.

1. Select the red circle with the number on it next to the state for the **apiservice**. This opens the error log with an entry for each time the database connection timed out while waiting for credentials.

   :::image type="content" source="media/connect-your-dotnet-aspire-application-to-fabric-sql-database/aspire-sample-error-count.png" alt-text="Screenshot of the Aspire application with the red error notification." lightbox="media/connect-your-dotnet-aspire-application-to-fabric-sql-database/aspire-sample-error-count.png":::

1. Select the back button in your browser to get back to the **Resources** tab.

1. Wait for the status of the webfrontend to change to **Running**. Then, select the URL.

1. Select the new **Products** page in the navigation bar.

1. Scroll through the products. Some products have images while others display a "No Image Available" image.

   :::image type="content" source="media/connect-your-dotnet-aspire-application-to-fabric-sql-database/aspire-sample-product-images.png" alt-text="Screenshot of the Aspire application product list with various product images." lightbox="media/connect-your-dotnet-aspire-application-to-fabric-sql-database/aspire-sample-product-images.png":::

## Add features

Keep going!

- Implement data updates using the example from [Tutorial: Connect a .NET Aspire microservice to an existing database](https://aspire.dev/integrations/databases/sql-server/).
- Deploy your application to Azure App Service, Azure Container Apps, Azure Functions, or Azure Kubernetes Service (AKS) using [Service Connector](/azure/service-connector/how-to-integrate-fabric-sql).

## Related content

- [Tutorial: Connect an ASP.NET Core app to SQL Server using .NET Aspire and Entity Framework Core](/dotnet/aspire/database/sql-server-integrations)
- [Tutorial: Connect a .NET Aspire microservice to an existing database](/dotnet/aspire/database/connect-to-existing-database?pivots=sql-server-ef)
- [.NET Aspire deployments](/dotnet/aspire/deployment/overview?source=recommendations)
