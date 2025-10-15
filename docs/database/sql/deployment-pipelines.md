---
title: "Get started with SQL database deployment pipelines"
description: Learn how to work with your SQL database with Fabric's deployment pipelines.
author: WilliamDAssafMSFT
ms.author: wiassaf
ms.reviewer: antho, drskwier
ms.date: 11/07/2024
ms.topic: how-to
---
# Get started with deployment pipelines integration with SQL database in Microsoft Fabric

**Applies to:** [!INCLUDE [fabric-sqldb](../includes/applies-to-version/fabric-sqldb.md)]

In this tutorial, you learn how to deploy changes to your SQL database in Fabric using [deployment pipelines](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md) and a multi-workspace environment.

Deployment pipelines in Fabric serve as a mechanism to promote changes between environments such that developers can collaborate on changes and validate a set of changes in one or more objects. Conceptually, the most common stages in a pipeline are:

- Development: The first stage in deployment pipelines where you upload new content with your fellow creators. You can design build, and develop here, or in a different stage.
- Test: After you make all the needed changes to your content, you're ready to enter the test stage. Upload the modified content so it can be moved to a test stage. Here are three examples of what can be done in the test environment:
  - Share content with testers and reviewers
  - Load and run tests with larger volumes of data
  - Test your app to see how it looks for your end users
- Production: After testing the content, use the production stage to share the final version of your content with business users across the organization.

For SQL database in Fabric specifically, the movement of changes between workspaces uses the same mechanisms as updating a workspace from source control. With deployment pipelines your existing data stays in place while the Fabric service calculates the T-SQL needed to update your database to match the desired state (incoming changes). If the changes would require data loss, Fabric requires you to make the changes manually.

## Prerequisites

- You need an existing Fabric capacity. If you don't, [start a Fabric trial](../../fundamentals/fabric-trial.md).
- Create a new workspace or use an existing Fabric workspace.
- Create or use an existing SQL database in Fabric. If you don't have one already, [create a new SQL database in Fabric](create.md).

## Setup

1. Create another workspace in Fabric. This workspace is used as the second stage in the deployment pipeline and a name derivative of the first workspace is suggested. For example, if the first workspace is named `ContosoApp`, the second workspace could be named `ContosoApp-Test`.
1. Create a new deployment pipeline in Fabric. You can find an entrypoint for deployment pipelines at the bottom of the workspace list, then select **Create pipeline** or **+ New pipeline**.
1. In the **Create deployment pipeline** dialog box, enter a name and description for the pipeline, and select **Next**.
1. Set your deployment pipeline's structure by defining the required stages for your deployment pipeline. By default, the pipeline has three stages named *Development*, *Test*, and *Production*. In this tutorial, you can remove the Production stage and keep only Development and Test.
1. Assign your two workspaces to the Development and Test stages by selecting the workspace from the list, then select **Assign**.

## Deploy content from one stage to another

The Fabric deployment pipeline automatically compares the contents of our development and test workspaces. While the comparison is taking place, you'll see a spinning progress icon on the test workspace. Once the comparison completes, if you select the Test pipeline stage you'll see a summary of the differences by Fabric item where the contents of the development workspace are marked as "only in source."

- To deploy from Development to Test, select all the items from the list, then select **Deploy**.
   - Since we're using Fabric deployment pipelines without any source control tracking changes in our testing, it's suggested to use the note field on the deployment to assist the team in knowing which changes are associated.
   - Once you select **Deploy** in the stage deployment dialog, Fabric runs the deployment pipeline in the background.

Once the deployment completes successfully, the test pipeline stage indicates that it's up to date.

## Review the differences between stages

Deployment pipelines can be used to compare the contents of workspaces assigned to the different stages. For SQL database in Fabric, the comparison includes the specific differences between the individual database objects in the development and test workspaces.

1. After completing the pipeline deployment, return to the development workspace and make a change to the database objects. The changes could be a new table, a new column, or a change to an existing stored procedure. 
1. Once you've made the change, return to the deployment pipeline. You'll see that the pipeline detected the change and is ready to deploy it to the test workspace.
1. select the **test** stage such that the list of items in the lower half of the window displays one or more as "different from source." Select an item that has changes (is different from source) and use the **Compare** option to get more in-depth details on the changes.
1. The dialog that opens for a SQL database item is similar to a schema comparison where each SQL database object (table, stored procedure, view, etc.) has specific differences displayed.

Once we've reviewed the pending changes from the development workspace, we can repeat our actions from the previous section to deploy those changes to the test stage. Changes between workspaces can be selected on a per-item basis, so if we don't want to deploy changes in an object (such as a notebook) we can deselect that item before deploying. If we want to make changes to individual SQL database objects, we must return to the development workspace to make those changes in the SQL database.

## Related content

- [Ingest data into SQL database in Fabric via pipelines](load-data-pipelines.md)
- [Introduction to deployment pipelines in Fabric](../../cicd/deployment-pipelines/intro-to-deployment-pipelines.md)
- [Automate Fabric deployment pipelines](../../cicd/deployment-pipelines/pipeline-automation-fabric.md)
- [Tutorial: Lifecycle management in Fabric](../../cicd/cicd-tutorial.md)
- [SQL projects overview](/sql/tools/sql-database-projects/sql-database-projects)
