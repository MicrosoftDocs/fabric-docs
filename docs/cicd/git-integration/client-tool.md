### Development process using client tool

If the items you're developing are available in other tools, you can work on those items directly in the client tool. Not all items are available in every tool. Items that are only available in Fabric need to be developed in Fabric.

The workflow for developers using a client tool like Power BI Desktop should look something like this:

1. [Clone](/azure/devops/repos/git/clone?) the repo onto a local machine. (You only need to do this step once.)
1. Open the project in Power BI Desktop using the local copy of the *PBIProj*.
1. Make changes and save the updated files locally. [Commit](/azure/devops/repos/git/gitquickstart#commit-your-work) to the local repo.
1. When ready, [push](/azure/devops/repos/git/pushing) the branch and commits to the remote repo.
1. Test the changes against other items or against more data. To test the changes, connect the new branch to a separate workspace, and upload the semantic model and reports using the *update all* button in the source control panel. Do any tests or configuration changes there before merging into the *main* branch.

   If no tests are required in the workspace, the developer can merge changes directly into the *main* branch, without the need for another workspace.

1. Once the changes are merged, the shared team’s workspace is prompted to accept the new commit. The changes are updated into the shared workspace and everyone can see the changes to those semantic models and reports.

:::image type="content" source="./media/manage-branches/branches-using-client-tools.png" alt-text="Diagram showing the workflow of pushing changes from a remote Git repo to the Fabric workspace.":::

For a specific guidance on how to use the new Power BI Desktop file format in git, see [Source code format](./source-code-format.md).
