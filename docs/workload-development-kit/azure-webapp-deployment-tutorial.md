# Creating and deploying the boilerplate backend web app
To create an Azure web app from the Azure portal:
1. Create a "Web App" resource in the Azure portal.
2. Fill in all the relevant data:
   - Choose "Publish" -> "Code".
   - Select "Runtime stack" -> ".NET 7 (STS)", "Windows".

For general instructions, see [Getting Started with Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/getting-started?pivots=stack-net).

## Map Your Domain to the Web App
1. Navigate to Settings -> Custom domains.
2. Click "Add custom domain" and follow the instructions.

For more information on mapping custom domains, visit [Custom Domain Mapping in Azure](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).

1. Open your backend boilerplate Visual Studio solution.
2. Right-click the boilerplate project and select "Publish".
3. Choose Azure as the target.
4. Sign in with a user who has access to the Azure web app you created.
5. Use the UI to locate the relevant subscription and resource group, then follow the instructions to publish.

## Update CORS
1. In your web app's Azure page, navigate to API -> CORS.
2. Under "Allowed Origins", add your FE web app URL.

# Creating and Deploying the Boilerplate Frontend Web App
To create an Azure web app from the Azure portal:
1. Create a "Web App" resource in the Azure portal.
2. Fill in all the relevant data:
   - Choose "Publish" -> "Code".
   - Select "Runtime stack" -> "Node 18 LTS", "Windows".

For general instructions, see [Quickstart for Node.js in Azure App Service](https://learn.microsoft.com/en-us/azure/app-service/quickstart-nodejs?tabs=windows&pivots=development-environment-azure-portal).

## Map Your Domain to the Web App
1. Navigate to Settings -> Custom domains.
2. Click "Add custom domain" and follow the instructions.

For more information on mapping custom domains, visit [Custom Domain Mapping in Azure](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain?tabs=root%2Cazurecli).

## Publish Your Frontend Boilerplate Web App
1. Build your frontend boilerplate by running `npm run build:test`.
2. Navigate to the `dist` folder at `Microsoft-Fabric-developer-sample\Frontend\tools\dist`.
3. Select all files and the asset folder under `dist` and create a zip file.
4. Open PowerShell.
5. Run `Connect-AzAccount` and sign in with a user who has access to the Azure web app you created.
6. Run `Set-AzContext -Subscription "<subscription_id>"`.
7. Run `Publish-AzWebApp -ResourceGroupName <resource_group_name> -Name <web_app_name> -ArchivePath <zip_file_path>`.