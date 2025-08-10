---
title: Operation list
description: This article provides a list of all the operations available in Fabric.
author: msmimart
ms.author: mimart
ms.topic: conceptual
ms.date: 05/22/2025
---
# Operation list

The following operations are available in the audit logs.

| Friendly name | Operation name | Notes |
|---|---|---|
| Abort copy blob operation | AbortCopyBlob | OneLake operation. Stops a pending Copy Blob operation, and leaves a destination blob with zero length and full metadata.  |
| Accept an invitation to   external data share | AcceptExternalDataShare | Accept an invitation to external data share |
| Add Admin Personal Workspace Access  |  AddAdminPersonalWorkspaceAccess  |    |
| Add Artifact To Pipeline  |  AddArtifactToPipeline  |    |
| Add Experiment Run  |  AddExperimentRun  |    |
| Add Model Version  |  AddModelVersion  |    |
| Add Tenant Key  |  AddTenantKey  |    |
| Add Tile  |  AddTile  |  Add Tile is dashboard activity, which is generated on adding visuals as tiles to a Power BI Dashboard  |
| Add workload in a tenant or   capacity | ExtensibilityActivationDynamic | Add a workload in a tenant or capacity from Workloads Hub |
| Add workload version in a   tenant | ExtensibilityActivationStatic | Add a specific version of a workload in a tenant |
| Add workspace role | AddWorkspaceRoleViaAdminApi | Add workspace role |
| Added Power BI folder access  |  AddFolderAccess  |  Not currently used  |
| Added Power BI group members  |  AddGroupMembers  |    |
| Added data source to Power BI gateway  |  AddDatasourceToGateway  |    |
| Added external resource  |  AddExternalResource  | Registers or connects an external resource in the Fabric workspace.   |
| Added link to external resource  |  AddLinkToExternalResource  | Links a Fabric item to an external resource for reference or integration.    |
| Added user to Power BI gateway cluster  |  AddUsersToGatewayCluster  |  Not currently used  |
| Added user to Power BI gateway cluster datasource  |  AddUsersToGatewayClusterDatasource  |    |
| Admin Get Artifacts Byuser Id | AdminGetArtifactsByuserId |   |
| Admin attached dataflow storage account to tenant | AdminAttachedDataflowStorageAccountToTenant | Not currently used  |
| Analyze In Excel Dataset | AnalyzeInExcelDataset |   |
| Analyze In Excel Report | AnalyzeInExcelReport |   |
| Analyzed Power BI report | AnalyzeInExcel | Generated when a user selects Analyze in Excel on a report or semantic model in the service and successfully generates an Excel workbook  |
| Analyzed Power BI semantic model | AnalyzedByExternalApplication | Generated when users interact with the service  |
| Append block from URL | AppendBlockFromURL | OneLake operation. Writes a block of data from a URL to the end of an append blob (append blobs only) |
| Append block to blob | AppendBlock | OneLake operation. Writes a block of data to the end of an append blob (append blobs only) |
| Append data to file | AppendDataToFile | OneLake operation. Uploads data to be append to a file (DFS). |
| Applied a change to model in Power BI | ApplyChangeToPowerBIModel | A user makes a change to an existing model. This occurs whenever any edit is made to the model (ex: write a DAX measure, manage relationships, etc.)  |
| Applied sensitivity label to Power BI item | SensitivityLabelApplied |   |
| Assign Workspace To Alm Pipeline | AssignWorkspaceToAlmPipeline |   |
| Assigned a workspace to a deployment pipeline | AssignWorkspaceToPipeline | Not currently used  |
| Attach Notebook Environment | AttachNotebookEnvironment | Attach the environment for Notebook.  |
| Attach source in GraphQL artifact | AttachSourceGraphQL | Attach source in graphql artifact  |
| Attached dataflow storage account | AttachedDataflowStorageAccount |   |
| Auto bind user credentials to   git | AutoBindGitCredentials | Auto bind existing user credentials for a git provider to a   git connection |
| Binded Power BI semantic model to gateway | BindToGateway |   |
| Binded monikers to Power BI datasources | BindMonikersToDatasources |   |
| Branch Out in Git | BranchOutInGit | Branch out in Git is a workspace activity which is generated when a new workspace is created, which is connected to a newly forked git   branch based on the git branch that is connected to the origin workspace. |
| Cancel Datamart Batch | CancelDatamartBatch |   |
| Cancel Dataset Refresh | CancelDatasetRefresh |   |
| Cancel Publish Environment | CancelPublishEnvironment | Cancel publish environment |
| Cancel Running Artifact | CancelRunningArtifact |   |
| Cancel Spark Application | CancelSparkApplication |   |
| Cancel Sql Analytics Endpoint Lakehouse Batch | CancelSqlAnalyticsEndpointLakehouseBatch | Canceled a lakehouse SQL analytics endpoint batch. Previously named *Canceled a default warehouse* (Operation name: *CancelDefaultWarehouseBatch*)  |
| Cancel Warehouse Batch | CancelWarehouseBatch |   |
| Cancel Workspace Upgrades As Admin | CancelWorkspaceUpgradesAsAdmin |   |
| Cancel mounted warehouse batch | CancelMountedWarehouseBatch | Generated when a mounted warehouse batch is canceled  |
| Canceled Power BI dataflow refresh | CancelDataflowRefresh |   |
| Changed Power BI gateway admins | ChangeGatewayAdministrators |   |
| Changed Power BI gateway data source users | ChangeGatewayDatasourceUsers |   |
| Changed Power BI semantic model connections | SetAllConnections |   |
| Changed capacity state | ChangeCapacityState |   |
| Changed capacity user assignment | UpdateCapacityUsersAssignment |   |
| Changed sensitivity label for Power BI item | SensitivityLabelChanged |   |
| Check Scorecard Access | CheckScorecardAccess | Verifies the access permissions for a scorecard |
| Check access to file or blob | CheckAccessFileOrBlob | OneLake operation. Checks if the calling user has permission to perform the specified operation |
| Checkout Branch In Git | CheckoutBranchInGit |   |
| Cleanup unused or corrupted files from dataflows' refreshes | CleanupDataflow | Cleanup unused or corrupted files from dataflows' refreshes  |
| Clone Tile | CloneTile |   |
| Co Author Notebook | CoAuthorNotebook |   |
| Commit Notebook | CommitNotebook |   |
| Commit To Git | CommitToGit | Commit To Git is an artifact activity, which is generated when users commit artifact to Git.  |
| Completed an artifact access request action in Power BI | ArtifactAccessRequest | Tracks the notification sent to approvers when a request is created or denied.   |
| Connect To Git | ConnectToGit | Connect To Git is a workspace activity, which is generated when users connect the workspace to Git.  |
| Connected to Power BI semantic model from external app | ConnectFromExternalApplication |   |
| Connected to a Warehouse or SQL analytics endpoint from an external app | ConnectWarehouseAndSqlAnalyticsEndpointLakehouseFromExternalApp | Previously named *Connected to a warehouse or default warehouse from an external app* (Operation name: *ConnectWarehouseAndDefaultWarehouseFromExternalApp*)  |
| Convert Personal Workspace To Workspace | ConvertPersonalWorkspaceToWorkspace |   |
| Copied Power BI dashboard | CopyDashboard |   |
| Copied Power BI report | CopyReport |   |
| Copilot Interaction (Request Copilot features in Fabric) | CopilotInteraction | Request Copilot features in Fabric |
| Copy Scorecard | CopyScorecard |   |
| Copy blob | CopyBlob | OneLake operation. Copies a source blob to a destination blob in this storage account or in another storage account. |
| Create an SQL query from a Warehouse | CreateSqlQueryFromWarehouse |   |
| Create Artifact | CreateArtifact |   |
| Create Branch In Git | CreateBranchInGit | Create Branch In Git is a git provider activity, which is generated when users create branch in Git.  |
| Create Cloud Datasource From Kind Path | CreateCloudDatasourceFromKindPath | Creates a cloud-based data source using a specific resource and path.  |
| Create Cloud Datasource | CreateCloudDatasource | Establishes a new cloud data connection to external storage or services.  |
| Create Data Sharing | CreateDataSharing | Create a new external data share  |
| Create Datamart | CreateDatamart | Triggered when a new Datamart is created in a Workspace   |
| Create Dataset By Quick Share | CreateDatasetByQuickShare |   |
| Create Directory In Git | CreateDirectoryInGit | Create Directory In Git is a git provider activity, which is generated when users create directory in Git.  |
| Create Environment Resource | CreateEnvironmentResource | Create resources in environment |
| Create Fabric Identity for   Workspace | CreateWorkspaceIdentityViaApi | Create a Fabric identity for a    workspace |
| Create Folder | CreateFolder | Indicates a creation of a new workspace  |
| Create Gateway Cluster User | CreateGatewayClusterUser |   |
| Create Gateway Tenant Key | CreateGatewayTenantKey |   |
| Create Goal Value Categories | CreateGoalValueCategories |   |
| Create Hierarchy Goal Value | CreateHierarchyGoalValue |   |
| Create Hierarchy Note | CreateHierarchyNote |   |
| Create Lakehouse File | CreateLakehouseFile |  |
| Create Lakehouse Folder | CreateLakehouseFolder |  |
| Create Lakehouse Shortcut | CreateLakehouseShortcutLink |  |
| Create Lakehouse Table | CreateLakehouseTable |  |
| Create Link Goals | CreateLinkGoals |   |
| Create Managed Private   Endpoint | CreateManagedPrivateEndpoint | Create a private endpoint within a managed virtual network for   a workspace |
| Create Managed VNet | CreateManagedVNet | Create managed virtual network for a workspace |
| Create MetricSet Metric   Endpoint | CreateMetricSetMetric | Create metric in a metricset endpoint |
| Create Notebook Resource | CreateNotebookResource | Create resources in notebook.  |
| Create Org App | CreateOrgApp |   |
| Create Personal Datasource | CreatePersonalDatasource |   |
| Create Report From Lakehouse | CreateReportFromLakehouse |   |
| Create Scorecard Hierarchy | CreateScorecardHierarchy |   |
| Create Scorecard View | CreateScorecardView |   |
| Create Semantic Metric   Endpoint | CreateSemanticMetric | Create standalone semantic metric endpoint |
| Create Service Principal Profile | CreateServicePrincipalProfile |   |
| Create Template App Package | CreateTemplateAppPackage | Create Template App Package is an app activity, which is generated on creation of a Template App Package  |
| Create Temporary Upload   Location | CreateTemporaryUploadLocation | Generated when a temporary upload URL is created. |
| Created visual query from a Warehouse | CreateVisualQueryFromWarehouse |  |
| Create Warehouse | CreateWarehouse |  |
| Create Workspace | CreateWorkspace |   |
| Create a shortcut | CreateShortcut | OneLake operation. Part of Shortcut Controller |
| Create an external data share | CreateExternalDataShare | Create an external data share |
| Create blob from URL | PutBlobFromURL | OneLake operation. Creates a new blob or replaces an existing one where contents are from a URL. |
| Create blob | PutBlob | OneLake operation. Creates a new blob or replaces an existing one. |
| Create block list | PutBlockList | OneLake operation. Commits a blob by specifying the set of block IDs that comprise the block blob. |
| Create block | PutBlock | OneLake operation. Creates a new block to be committed as part of a block blob. |
| Create container | CreateContainer | OneLake operation. Creates a new workspace in OneLake |
| Create directory | CreateDirectory | OneLake operation. Creates a new directory. |
| Create file system  | CreateFileSystem | OneLake operation. Creates a new workspace. |
| Create file | CreateFile | OneLake operation. Creates a new file. |
| Create gateway cluster data source from kind path JSON | CreateGatewayClusterDatasourceFromKindPath | Create gateway cluster data source from kind path JSON  |
| Create or update data access   roles | CreateOrUpdateDataAccessRoles | Creates or updates data access roles |
| Create subfolder | CreateSubfolder |   |
| Create task flow | CreateTaskFlow |   |
| Create virtual network data   gateway proxy | CreateVirtualNetworkDataGatewayProxy | Create HTTP proxy for virtual network data gateway |
| Created Power BI app | CreateApp |   |
| Created Power BI dashboard | CreateDashboard |   |
| Created Power BI dataflow | CreateDataflow |   |
| Created Power BI email subscription | CreateEmailSubscription |   |
| Created Power BI gateway cluster datasource | CreateGatewayClusterDatasource |   |
| Created Power BI gateway | CreateGateway |   |
| Created Power BI group | CreateGroup |   |
| Created Power BI report | CreateReport |   |
| Created Power BI semantic model from external app | CreateDatasetFromExternalApplication |   |
| Created Power BI semantic model | CreateDataset |   |
| Created a Power BI metric value | CreateGoalValue |   |
| Created a Power BI scorecard metric | CreateGoal |   |
| Created a Power BI scorecard | CreateScorecard |   |
| Created a visual query from an SQL analytics endpoint | CreateVisualQueryFromSqlAnalyticsEndpointLakehouse |   |
| Created a Power BI template or a workspace for a template app | CreateTemplateApp |   |
| Created an install ticket for installing Power BI template app | CreateTemplateAppInstallTicket |   |
| Created an organizational custom visual | InsertOrganizationalGalleryItem |   |
| Created an SQL query from a SQL analytics endpoint | CreateSqlQueryFromSqlAnalyticsEndpointLakehouse |   |
| Created deployment pipeline | CreateAlmPipeline |   |
| Custom visual requested Azure AD access token | GenerateCustomVisualAADAccessToken |   |
| Custom visual requested Office Web Apps access token | CustomVisualWACAccessToken | Not currently used  |
| D L P Info | DLPInfo |   |
| D L P Rule Match | DLPRuleMatch |   |
| D L P Rule Undo | DLPRuleUndo |   |
| Dataflow migrated to external storage account | DataflowMigratedToExternalStorageAccount | Not currently used  |
| Dataflow permissions added | DataflowPermissionsAdded | Not currently used  |
| Dataflow permissions removed | DataflowPermissionsRemoved | Not currently used  |
| Delete Alm Pipeline Access As Admin | DeleteAlmPipelineAccessAsAdmin |   |
| Delete Alm Pipeline Access | DeleteAlmPipelineAccess |   |
| Delete Artifact | DeleteArtifact |   |
| Delete Capacity Delegation settings | DeleteCapacityTenantSettingDelegation | Delete Capacity delegation settings.  |
| Delete Datamart | DeleteDatamart |   |
| Delete Domain | DeleteDataDomainAsAdmin | Delete Domain  |
| Delete Domain's Folder Relation As Folder Owner | DeleteDataDomainFolderRelationsAsFolderOwner | Delete Domain's Folder Relation As Folder Owner  |
| Delete Environment Resource | DeleteEnvironmentResource | Delete resources in environment |
| Delete Experiment Run | DeleteExperimentRun |   |
| Delete Fabric Identity for   Workspace | DeleteWorkspaceIdentityViaApi | Delete  a Fabric   identity for a  workspace |
| Delete Folder | DeleteFolder | Indicated a deletion of a workspace  |
| Delete Goal Current Value Rollup | DeleteGoalCurrentValueRollup |   |
| Delete Goal Status Rules | DeleteGoalStatusRules |   |
| Delete Goal Target Value Connection | DeleteGoalTargetValueConnection |   |
| Delete Goal Target Value Rollup | DeleteGoalTargetValueRollup |   |
| Delete Goal Value Categories | DeleteGoalValueCategories |   |
| Delete Goal Value | DeleteGoalValue |   |
| Delete Goals | DeleteGoals |   |
| Delete Group Workspace | DeleteGroupWorkspace |   |
| Delete Hierarchy Goal Value | DeleteHierarchyGoalValue |   |
| Delete Hierarchy Note | DeleteHierarchyNote |   |
| Delete Lakehouse File | DeleteLakehouseFile |  |
| Delete Lakehouse Folder | DeleteLakehouseFolder |  |
| Delete Lakehouse Table | DeleteLakehouseTable |   |
| Delete Link Goals | DeleteLinkGoals |   |
| Delete Managed Private   Endpoint | DeleteManagedPrivateEndpoint | Delete a private endpoint within a managed virtual network for   a workspace |
| Delete Managed VNet | DeleteManagedVNet | Delete managedvirtual network for a workspace |
| Delete MetricSet Metric   Endpoint | DeleteMetricSetMetric | Delete metric in a metricset endpoint |
| Delete Model Version | DeleteModelVersion | Triggered when a Machine Learning Model version is removed   |
| Delete Notebook Resource | DeleteNotebookResource | Update resources in notebook.  |
| Delete Scorecard Hierarchy | DeleteScorecardHierarchy | Triggered when a [scorecard hierarchy](/power-bi/create-reports/service-metrics-get-started-hierarchies) is deleted. That is, the hierarchy's metadata is deleted, not the values of the goals in it. |
| Delete Scorecard View | DeleteScorecardView | Triggered when a scorecard view ([list](/power-bi/create-reports/service-metrics-view-hierarchies#scorecard-list-view), [heatmap](/power-bi/create-reports/service-metrics-view-hierarchies#heatmap-view) and compact) is deleted. |
| Delete Semantic Metric   Endpoint | DeleteSemanticMetric | Delete standalone semantic metric endpoint |
| Delete Service Principal Profile As Admin | DeleteServicePrincipalProfileAsAdmin |   |
| Delete Service Principal Profile | DeleteServicePrincipalProfile |   |
| Delete Template App Package | DeleteTemplateAppPackage | Delete Template App Package is an app activity, which is generated on deletion of a Template App package  |
| Delete Tile | DeleteTile | Delete Tile is a dashboard activity, which is generated on deletion of tiles from a Power BI Dashboard  |
| Delete Warehouse | DeleteWarehouse |   |
| Delete Workspace Via Admin Api | DeleteWorkspaceViaAdminApi |   |
| Delete a shortcut | DeleteShortcut | OneLake operation. Part of Shortcut Controller |
| Delete admin monitoring folder via lockbox | DeleteAdminMonitoringFolderViaLockbox |   |
| Delete admin usage dashboards via lockbox | DeleteAdminUsageDashboardsViaLockbox |   |
| Delete all Domain's Folders Relations | DeleteAllDataDomainFoldersRelationsAsAdmin | Delete all Domain's Folders Relations  |
| Delete blob | DeleteBlob | OneLake operation. Deletes a folder or file. |
| Delete configured credentials | DeleteGitProviderCredentials | Delete configured git provider credentials for a specific user |
| Delete container | DeleteContainer | OneLake operation. Deletes a workspace. |
| Delete file system | DeleteFileSystem | OneLake operation. Deletes a workspace. |
| Delete file | DeleteFileOrBlob | OneLake operation. Deletes a folder or file. |
| Delete source in GraphQL artifact | DeleteSourceGraphQL | Delete source in graphql artifact  |
| Delete subfolder | DeleteSubfolder |   |
| Delete usage metrics v2 package via lockbox | DeleteUsageMetricsv2PackageViaLockbox |   |
| Delete virtual network data   gateway proxy | DeleteVirtualNetworkDataGatewayProxy | Delete HTTP proxy for virtual network data gateway |
| Delete workload package | ExtensibilityDeletePackage | Delete a workload package |
| Delete workspace role | DeleteWorkspaceRoleViaAdminApi | Delete workspace role |
| DeleteDelete Workspace Delegation settings | DeleteWorkspaceTenantSettingDelegation | Delete Workspace Delegation settings.  |
| Deleted Power BI comment | DeleteComment |   |
| Deleted Power BI dashboard | DeleteDashboard |   |
| Deleted Power BI dataflow | DeleteDataflow |   |
| Deleted Power BI email subscription | DeleteEmailSubscription |   |
| Deleted Power BI folder access | DeleteFolderAccess | Not currently used  |
| Deleted Power BI gateway cluster datasource | DeleteGatewayClusterDatasource |   |
| Deleted Power BI gateway cluster | DeleteGatewayCluster |   |
| Deleted Power BI gateway | DeleteGateway |   |
| Deleted Power BI group | DeleteGroup |   |
| Deleted Power BI metric | DeleteGoal |   |
| Deleted Power BI note | DeleteNote |   |
| Deleted Power BI report | DeleteReport |   |
| Deleted Power BI scorecard | DeleteScorecard |   |
| Deleted Power BI semantic model from external app | DeleteDatasetFromExternalApplication |   |
| Deleted Power BI semantic model rows | DeleteDatasetRows | Indicates that the Push Datasets - Datasets DeleteRows API was called  |
| Deleted Power BI semantic model | DeleteDataset |   |
| Deleted Power BI template app or a workspace for a template app | DeleteTemplateApp |   |
| Deleted Publish to Web Embed Code | DeleteEmbedCode |   |
| Deleted a SQL query from a SQL analytics endpoint | DeleteSqlQueryFromSqlAnalyticsEndpointLakehouse | This audit event covers both deleting SQL and visual queries from the SQL analytics endpoint of the Lakehouse  |
| Deleted SQL query from a Warehouse | DeleteSqlQueryFromWarehouse | Covers both deleting SQL and visual queries from the Warehouse  |
| Deleted an organizational custom visual | DeleteOrganizationalGalleryItem |   |
| Deleted current value connection of Power BI metric | DeleteGoalCurrentValueConnection |   |
| Deleted deployment pipeline | DeleteAlmPipeline |   |
| Deleted link to external resource | DeleteLinkToExternalResource |   |
| Deleted member of Power BI gateway cluster | DeleteGatewayClusterMember |   |
| Deleted organizational Power BI content pack | DeleteOrgApp |   |
| Deleted sensitivity label from Power BI item | SensitivityLabelRemoved |   |
| Deleted snapshot for user in Power BI tenant | DeleteSnapshot | Generated when a user deletes a snapshot that describes a semantic model  |
| Deploy Model Version | DeployModelVersion |   |
| Deploy user application in FunctionSet | DeployUserAppFunctionSet | Deploy user application through FunctionSet artifact  |
| Deployed to a pipeline stage | DeployAlmPipeline |   |
| Detect Customizations For Solution | DetectCustomizationsForSolution |   |
| Determine if the user can share a datasource | DeterminePrincipalCanShareDatasource | Get the policy decision for the user to share a datasource  |
| Disconnect From Git | DisconnectFromGit | Disconnect From Git is a workspace activity, which is generated when users disconnect the workspace from Git.  |
| Discovered Power BI semantic model data sources | GetDatasources |   |
| Downgrade Workspace | DowngradeWorkspace |   |
| Download Environment Resource | DownloadEnvironmentResource | Download resources in environment |
| Download Notebook Resource | DownloadNotebookResource | Delete resources in notebook.  |
| Download Spark App Log | DownloadSparkAppLog |   |
| Downloaded Power BI report | DownloadReport |   |
| Downloaded Exported Power BI artifact file | ExportArtifactDownload | An export of the .pptx or .pdf file is complete |
| Drop Lakehouse File | DropLakehouseFile |  |
| Drop Lakehouse Folder | DropLakehouseFolder |  |
| Drop Lakehouse Table | DropLakehouseTable |  |
| Edit Artifact Endorsement | EditArtifactEndorsement |   |
| Edit Report Description | EditReportDescription |   |
| Edit Sql Analytics Endpoint Lakehouse Endorsement | EditSqlAnalyticsEndpointLakehouseEndorsement | Edited a lakehouse SQL analytics endpoint endorsement  |
| Edit Tile | EditTile | Edit Tile is a dashboard activity, which is generated on changes or edits to settings for tiles in a Power BI Dashboard  |
| Edit Warehouse Endorsement | EditWarehouseEndorsement |   |
| Edit Widget Tile | EditWidgetTile |   |
| Edit mounted warehouse endorsements | EditMountedWarehouseEndorsement | Generated when mounted warehouse endorsements are edited  |
| Edited Power BI app endorsement | EditContentProviderProperties |   |
| Edited Power BI certification permission | EditCertificationPermission | Not currently used  |
| Edited Power BI dashboard | EditDashboard | Not currently used  |
| Edited Power BI dataflow endorsement | EditDataflowProperties |   |
| Edited Power BI report endorsement | EditReportProperties |   |
| Edited Power BI report | EditReport |   |
| Edited Power BI semantic model endorsement | EditDatamartEndorsement |   |
| Edited Power BI semantic model from external app | EditDatasetFromExternalApplication |   |
| Edited Power BI semantic model properties | EditDatasetProperties |   |
| Edited Power BI semantic model | EditDataset |   |
| Enable/Disable   AllowedInUntrustedContexts settings | AllowedInUntrustedContextsViaApi | Enable or disable AllowedInUntrustedContexts settings |
| Encrypted credentials for Power BI gateway datasource | EncryptCredentials |   |
| Encrypted credentials using Power BI gateway cluster | EncryptClusterCredentials |   |
| Evaluate Diagnostics Download | EvaluateDiagnosticsDownload |   |
| Evaluate Diagnostics Query | EvaluateDiagnosticsQuery |   |
| Evaluate chat response based on the data gateway diagnostics data | EvaluateDiagnosticsChat | Evaluate chat response based on the data gateway diagnostics data  |
| Evaluate data sources against   DMTS data policies | EvaluateDataSourcesAgainstTenantDlpPolicies | Evaluate data sources against DMTS data policies |
| Explore Dataset | ExploreDataset |   |
| Export Package For Solution | ExportPackageForSolution |   |
| Export Power BI activity events | ExportActivityEvents |   |
| Export Scorecard | ExportScorecard | Exports a scorecard |
| Exported Power BI dataflow | ExportDataflow |   |
| Exported Power BI item to another file format | ExportArtifact |   |
| Exported Power BI report to another file format or exported report visual data | ExportReport |   |
| Exported Power BI tile data | ExportTile |   |
| Extract Template App Package | ExtractTemplateAppPackage | Extract Template App Package is an app activity, which is generated when users extract an existing Template App into another Power BI Template App Workspace  |
| Fetch a shortcut's metadata | GetShortcut | OneLake operation. Part of Shortcut Controller |
| Finish Publish Environment | FinishPublishEnvironment | Finish publish environment |
| Flush data to file | FlushDataToFile | OneLake operation. Proxy calls |
| Follow Goal | FollowGoal |   |
| Gateway Cluster S S O Test Connection | GatewayClusterSSOTestConnection |   |
| Generate Custom Visual W A C Access Token | GenerateCustomVisualWACAccessToken |   |
| Generate Multi Resource Embed Token | GenerateMultiResourceEmbedToken |   |
| Generate screenshot | GenerateScreenshot |   |
| Generated Power BI Embed Token | GenerateEmbedToken |   |
| Generated Power BI dataflow SAS token | GenerateDataflowSasToken |   |
| Get All Private Link Services For Tenant | GetAllPrivateLinkServicesForTenant |   |
| Get All Scorecards | GetAllScorecards |   |
| Get Alm Pipeline Users As Admin | GetAlmPipelineUsersAsAdmin |   |
| Get Alm Pipelines As Admin | GetAlmPipelinesAsAdmin |   |
| Get Artifact Access By User Id Via Admin Api | GetArtifactAccessByUserIdViaAdminApi |   |
| Get Artifact Link Shared To Whole Org As Admin | GetArtifactLinkSharedToWholeOrgAsAdmin |   |
| Get Artifact Users Via Admin Api | GetArtifactUsersViaAdminApi |   |
| Get Artifacts By Id Via Admin Api | GetArtifactsByIdViaAdminApi |   |
| Get Artifacts Via Admin Api | GetArtifactsViaAdminApi |   |
| Get Batch Lakehouse Table Details | GetBatchLakehouseTableDetails |   |
| Get Cloud Supported Datasources | GetCloudSupportedDatasources |   |
| Get Dashboards In Group As Admin | GetDashboardsInGroupAsAdmin |   |
| Get Dataflow Users As Admin | GetDataflowUsersAsAdmin |   |
| Get Dataflows In Group As Admin | GetDataflowsInGroupAsAdmin |   |
| Get Dataset Info | GetDatasetInfo | Get the info of the dataset  |
| Get Dataset Query Scale-Out Sync Status | GetDatasetQueryScaleOutSyncStatus | Get Dataset Query Scale-Out Sync Status is a dataset activity, which is generated when users request the sync status of a scale out-enabled Power BI dataset.  |
| Get Dataset Users As Admin | GetDatasetUsersAsAdmin |   |
| Get Datasets In Group As Admin | GetDatasetsInGroupAsAdmin |   |
| Get Datasource Details With Credentials Async | GetDatasourceDetailsWithCredentialsAsync |   |
| Get Dax Capabilities | GetDaxCapabilities |   |
| Get Default Scorecard View | GetDefaultScorecardView |   |
| Get Domain Delegation settings | DeleteDomainTenantSettingDelegation | Delete Domain Delegation settings.  |
| Get Fabric Identity Token for   Workspace | GetWorkspaceIdentityTokenViaApi | Get a Fabric identity token for a workspace |
| Get Fabric Identity for   Workspace | GetWorkspaceIdentityViaApi | Get  a Fabric identity   for a  workspace |
| Get Followed Goals | GetFollowedGoals |   |
| Get Gateway Cluster | GetGatewayCluster |   |
| Get Gateway Clusters With Role Options | GetGatewayClustersWithRoleOptions |   |
| Get Gateway Container I P Configuration | GetGatewayContainerIPConfiguration |   |
| Get Gateway Container N S Lookup Details | GetGatewayContainerNSLookupDetails |   |
| Get Gateway Container Test Net Connection Details | GetGatewayContainerTestNetConnectionDetails |   |
| Get Gateway datasource limit   status | GetGatewayDatasourceLimitStatus | Gets the datasource limit status of the gateway or tenant   cloud gateway |
| Get Goal By Hierarchy Item Ids | GetGoalByHierarchyItemIds |   |
| Get Goal Status Rules | GetGoalStatusRules |   |
| Get Goal Value Categories | GetGoalValueCategories |   |
| Get Groups As Admin | GetGroupsAsAdmin | Get Groups as Admin is a workspace activity, which is generated on retrieving list of Power BI workspaces using an API call.  |
| Get Hierarchy Goal Values | GetHierarchyGoalValues |   |
| Get Lakehouse Table Details | GetLakehouseTableDetails |   |
| Get MetricSet Metric Endpoint | GetMetricSetMetric | Read metric in a metricset endpoint |
| Get Model Diagram Layouts | GetPowerBIDataModelDiagramLayouts | Get diagram layouts when open data model in web model view.  |
| Get Model SAS Token via Lockbox | GetModelSASTokenViaLockbox | Gets the SAS Token for a given model in a tenant via Lockbox  |
| Get My Goals | GetMyGoals |   |
| Get Pending Change Status | GetPendingChangeStatus |   |
| Get Power BI group users | GetGroupUsers |   |
| Get Publish To Web Artifacts As Admin | GetPublishToWebArtifactsAsAdmin |   |
| Get Relevant Measures | GetRelevantMeasures |   |
| Get Reports As Admin | GetReportsAsAdmin |   |
| Get Reports In Group As Admin | GetReportsInGroupAsAdmin | Get Reports in Group as Admin is a workspace activity, which is generated on retrieving the reports present inside a Power BI workspace using an API call.  |
| Get Roles For Scorecard | GetRolesForScorecard | Gets the roles for a scorecard |
| Get Scorecard Additional   Properties | GetScorecardAdditionalProperties | Gets the additional properties on a scorecard |
| Get Scorecard By Hierarchy Item Ids | GetScorecardByHierarchyItemIds |   |
| Get Scorecard Hierarchies | GetScorecardHierarchies |   |
| Get Scorecard Hierarchy Items | GetScorecardHierarchyItems |   |
| Get Scorecard Hierarchy | GetScorecardHierarchy |   |
| Get Scorecard View | GetScorecardView |   |
| Get Scorecard Views | GetScorecardViews |   |
| Get Scorecards As Admin | GetScorecardsAsAdmin | Get all the scorecards as an admin |
| Get Semantic Metric Endpoint | GetSemanticMetric | Read standalone semantic metric endpoint |
| Get Service Principal Profile | GetServicePrincipalProfile |   |
| Get Service Principal Profiles As Admin | GetServicePrincipalProfilesAsAdmin |   |
| Get Service Principal Profiles | GetServicePrincipalProfiles |   |
| Get Subscription Users By Dashboard Id As Admin | GetSubscriptionUsersByDashboardIdAsAdmin |   |
| Get Subscription Users By Report Id As Admin | GetSubscriptionUsersByReportIdAsAdmin |   |
| Get Subscriptions For User As Admin | GetSubscriptionsForUserAsAdmin |   |
| Get Tenant Settings Via Admin Api | GetTenantSettingsViaAdminApi |   |
| Get USEC roles for an artifact | GetArtifactRoles | OneLake operation. |
| Get Unused Artifacts | GetUnusedArtifacts |   |
| Get User Datasource Limit Status | GetUserDatasourceLimitStatus |   |
| Get User Datasources By Data Source Reference | GetUserDatasourcesByDataSourceReference |   |
| Get Virtual Network | GetVirtualNetwork |   |
| Get Workspace Users Via Admin Api | GetWorkspaceUsersViaAdminApi |   |
| Get Workspaces By Id Via Admin Api | GetWorkspacesByIdViaAdminApi |   |
| Get Workspaces Via Admin Api | GetWorkspacesViaAdminApi |   |
| Get a task flow | GetTaskFlow |   |
| Get access control list for file | GetAccessControlListForFile | OneLake operation. Returns the permissions list for a file. |
| Get all connections | GetAllConnections | Get all connections |
| Get all metric sets Endpoint | GetAllMetricSets | Get all metric sets endpoint |
| Get blob metadata | GetBlobMetadata | OneLake operation. Retrieves all user-defined metadata of an existing file or folder. |
| Get blob | GetBlob | OneLake operation. Reads or downloads a blob from OneLake, including its user-defined metadata and system properties. |
| Get block list | GetBlockList | OneLake operation. Retrieves the list of blocks that have been uploaded as part of a block blob. |
| Get data artifact table   details | GetDataArtifactTableDetails | Get the details (for example, schema) for a data item table |
| Get datasource share policy | GetDatasourceShareTenantPolicy | Retrieve the datasource share policy set by the tenant  |
| Get delegated capacity tenant setting overrides | GetCapacityDelegatedTenantSettingOverridesViaAdminApi | Get capacity delegated tenant setting overrides  |
| Get delegated domain tenant   setting overrides | GetDomainDelegatedTenantSettingOverridesViaAdminApi | Get domain delegated tenant setting overrides |
| Get delegated workspace tenant   setting overrides | GetWorkspaceDelegatedTenantSettingOverridesViaAdminApi | Get workspace delegated tenant setting overrides |
| Get file or blob properties | GetFileOrBlobProperties | OneLake operation. Returns all system properties and user-defined metadata on the file or folder.. |
| Get list of users part of the datasource share policy | GetDatasourceSharePrincipalsPolicy | Retrieve the datasource share principals that are part of policy set by the tenant  |
| Get path status | GetPathStatus | OneLake operation. Returns all system defined properties for a path. |
| Get properties | GetProperties | OneLake operation. Returns all system and user defined properties for a path |
| Get query text from secured   telemetry store via Lockbox | GetQueryTextTelemetryViaLockbox | Retrieved query text from secured telemetry store via Azure   Lockbox |
| Get refresh history via lockbox | GetRefreshHistoryViaLockbox |   |
| Get single connection by ID | GetConnection | Get single connection by ID |
| Get the Details of a Moniker | DiscoverSystemDetailsOfMoniker | Get Moniker and related Data Sources information  |
| Get the current set of DLP policies applied on the Tenant | GetTenantDlpPolicies | Get the current set of DLP policies applied on the Tenant  |
| Get virtual network data   gateway proxy | GetVirtualNetworkDataGatewayProxy | Get HTTP proxy info for virtual network data gateway |
| Goals Create Role | GoalsCreateRole |   |
| Goals Delete Role | GoalsDeleteRole |   |
| Goals Get Role | GoalsGetRole |   |
| Goals Update Role | GoalsUpdateRole |   |
| Import Package For Solution | ImportPackageForSolution |   |
| Import file to Power BI ended | ImportArtifactEnd | Generated when importing Power BI Desktop files (.pbix). ImportSource indicates Power BI or OneDriveSharePoint. ImportType tells you if the file is new (Publish) or is being updated (Republish).  |
| Import file to Power BI started | ImportArtifactStart | Generated when importing Power BI Desktop files (.pbix). When ImportSource is PowerBI, the file import originated from a Power BI client or API. When ImportSource is OneDriveSharePoint, the file import originated from OneDrive or a SharePoint document library.  |
| Imported file to Power BI | Import |   |
| Initiate Cloud O Auth Login | InitiateCloudOAuthLogin |   |
| Initiated Power BI gateway cluster authentication process | InitiateGatewayClusterOAuthLogin |   |
| Insert Domain | InsertDataDomainAsAdmin | Insert Domain  |
| Inserted Power BI note | InsertNote |   |
| Inserted or updated current value connection of Power BI metric | UpsertGoalCurrentValueConnection |   |
| Inserted or updated target value connection of Power BI metric | UpsertGoalTargetValueConnection |   |
| Inserted snapshot for user in Power BI tenant | InsertSnapshot | Generated when user uploads a snapshot that describes their semantic model  |
| Install Teams Analytics Report | InstallTeamsAnalyticsReport |   |
| Installed Power BI app | InstallApp |   |
| Installed Power BI template app | InstallTemplateApp |   |
| Instantiate App | InstantiateApp |   |
| Lease blob | LeaseBlob | OneLake operation. Establishes and manages a lock on write and delete operations. |
| Lease container | LeaseContainer | OneLake operation. Establishes and manages a lock on write and delete operations. |
| Lease path | LeasePath | OneLake operation. Establishes and manages a lock on write and delete operations. |
| List Lakehouse Tables | ListLakehouseTables |   |
| List blobs | ListBlob | OneLake operation. List all blobs in a workspace |
| List data access roles | ListDataAccessRoles | Returns a list of data access roles |
| List file paths | ListFilePath | OneLake operation. Lists all files in a path. |
| Load Lakehouse Table | LoadLakehouseTable |   |
| Load Spark App Log | LoadSparkAppLog |   |
| Manage Relationships | ManageRelationships |   |
| Map Upn | MapUpn |   |
| Migrated dataflow storage location | MigratedDataflowStorageLocation | Not currently used  |
| Migrated workspace to a capacity | MigrateWorkspaceIntoCapacity |   |
| Modify Workspace Capacity | ModifyWorkspaceCapacity | Modify Workspace Capacity is a capacity activity, which is generated on assigning a Power BI workspace to a capacity using an API call or the UI.  |
| Move Goals | MoveGoals | Moves goals within a scorecard |
| Move Scorecard | MoveScorecard |   |
| Move items into subfolder | MoveItemsIntoSubfolder |   |
| No Activity | NoActivity |   |
| Opt In For P P U Trial | OptInForPPUTrial |   |
| Override Sjd Spark Settings | OverrideSjdSparkSettings |   |
| Patch Gateway Cluster | PatchGatewayCluster |   |
| Patch Goal Value Categories | PatchGoalValueCategories |   |
| Patch file system | PatchFileSystem | OneLake operation. Sets properties for a workspace. |
| Patched Power BI metric value | PatchGoalValue |   |
| Patched Power BI metric | PatchGoal |   |
| Patched Power BI note | PatchNote |   |
| Patched Power BI scorecard | PatchScorecard |   |
| Permanently delete Workspaces | DeleteWorkspacesPermanentlyAsAdmin | Generated when workspaces are permanently deleted by an admin  |
| Pin Report Get Channels In Team | PinReportGetChannelsInTeam |   |
| Pin Report Get User Joined Teams | PinReportGetUserJoinedTeams |   |
| Pin Report To Teams Channel | PinReportToTeamsChannel |   |
| Pin Tile | PinTile |   |
| Pin Widget Tile | PinWidgetTile |   |
| Post Dataset Rows | PostDatasetRows |   |
| Post Notebook Comment | PostNotebookComment |   |
| Post configure credentials | PostGitProviderCredentials | Configure git provider credentials for a specific user |
| Posted Power BI comment | PostComment |   |
| Preview Lakehouse Table | PreviewLakehouseTable |   |
| Printed Power BI Dashboard | PrintDashboard |   |
| Printed Power BI report page | PrintReport |   |
| Promoted Power BI template app | PromoteTemplateAppPackage |   |
| Provision Scorecard | ProvisionScorecard |   |
| Publish/Unpublish a workload | ExtensibilityUpdatePublishingState | Publish or unpublish a workload, making it available or   unavailable in Workloads Hub |
| PublishDataflow | PublishDataflow | Publish Dataflow  |
| Published Power BI report to web | PublishToWebReport |   |
| Put Table | PutTable |   |
| Query blob contents | QueryBlobContents | OneLake operation. Applies a SQL statement on a blob's contents, only returning the specified subset. |
| Ran Power BI email subscription | RunEmailSubscription |   |
| Re-encrypted credentials using Power gateway cluster | ReencryptCredentials |   |
| Read Artifact | ReadArtifact |   |
| Read Environment Resource | ReadEnvironmentResource | Read resources in environment |
| Read Experiment Run | ReadExperimentRun |   |
| Read file or get blob | ReadFileOrGetBlob | OneLake operation. Reads a file in OneLake. |
| ReadDataflow | ReadDataflow | Read Dataflow  |
| Rebind Report | RebindReport |   |
| Received Power BI dataflow secret from Key Vault | ReceiveDataflowSecretFromKeyVault |   |
| Refresh Datamart | RefreshDatamart |   |
| Refresh Goal Current Value Rollup | RefreshGoalCurrentValueRollup |   |
| Refresh Goal Target Value Rollup | RefreshGoalTargetValueRollup |   |
| Refresh Lakehouse Data | RefreshLakehouseData |   |
| Refresh Sql Analytics Endpoint Lakehouse Metadata | RefreshSqlAnalyticsEndpointLakehouseMetadata | Refreshed metadata for a lakehouse SQL analytics endpoint. Previously named *Refreshed metadata for a default warehouse* (Operation name: *RefreshDefaultWarehouseMetadata*)  |
| Refresh mounted warehouse metadata | RefreshMountedWarehouseMetadata | Generated when mounted warehouse metadata is refreshed  |
| Refreshed current value of Power BI metric | RefreshGoalCurrentValue |   |
| Refreshed target value of Power BI metric | RefreshGoalTargetValue |   |
| Register workload development   instance | ExtensibilityRegisterDevInstance | Register a development instance of a workload |
| Remove Admin Personal Workspace Access | RemoveAdminPersonalWorkspaceAccess |   |
| Remove workload | ExtensibilityDeactivation | Remove a workload from a tenant or capacity |
| Removed Power BI group members | DeleteGroupMembers |   |
| Removed a workspace from a deployment pipeline | UnassignWorkspaceFromPipeline | Not currently used  |
| Removed data source from Power BI gateway | RemoveDatasourceFromGateway |   |
| Removed user from Power BI gateway cluster datasource | RemoveGatewayClusterDatasourceUser |   |
| Removed user from Power BI gateway cluster | RemoveGatewayClusterUser |   |
| Removed workspace from a capacity | RemoveWorkspacesFromCapacity |   |
| Rename Datamart | RenameDatamart |   |
| Rename Lakehouse File | RenameLakehouseFile |  |
| Rename Lakehouse Folder | RenameLakehouseFolder |  |
| Rename Lakehouse Table | RenameLakehouseTable |   |
| Rename Report | RenameReport | Rename Report is a report activity, which is generated on renaming the name of a Power BI Report through its settings  |
| Rename Warehouse | RenameWarehouse |   |
| Rename file or directory | RenameFileOrDirectory | OneLake operation. Renames a file or directory in OneLake. |
| Renamed Power BI dashboard | RenameDashboard |   |
| Request Cognitive Service | RequestCognitiveService | Request Cognitive Service in ML workload.  |
| Request Copilot features in   Fabric | RequestCopilot | Request Copilot features in Fabric |
| Request OpenAI by Spark code   in Fabric | RequestSparkCodeFirst | Request OpenAI by Spark code in Fabric |
| Request OpenAI model | RequestOpenAI | Request OpenAI models in ML workload.  |
| Requested Power BI dataflow refresh | RequestDataflowRefresh | A dataflow refresh starts. The refresh can be scheduled or triggered manually from the portal or an API.  |
| Requested Power BI semantic model refresh from external app | RefreshDatasetFromExternalApplication |   |
| Requested Power BI semantic model refresh | RefreshDataset |   |
| Requested SAS token for Power BI storage | AcquireStorageSASFromExternalApplication |   |
| Requested account key for Power BI storage | AcquireStorageAccountKey |   |
| Restore container | RestoreContainer | OneLake operation. |
| Restore deleted workspace | RestoreWorkspaceViaAdminApi | Restores the deleted workspace |
| Restored Power BI workspace | RestoreWorkspace |   |
| Resume Suspended Datamart | ResumeSuspendedDatamart |   |
| Resume Suspended Sql Analytics Endpoint Lakehouse | ResumeSuspendedSqlAnalyticsEndpointLakehouse | Resumed a suspended lakehouse SQL analytics endpoint. Previously named *Resumed a suspended default warehouse* (Operation name: *ResumeSuspendedDefaultWarehouse*)  |
| Resume Suspended Warehouse | ResumeSuspendedWarehouse |   |
| Resume suspended mounted warehouse | ResumeSuspendedMountedWarehouse | Generated when a suspended mounted warehouse is resumed  |
| Retrieved Power BI app users | GetAppUsersAsAdmin |   |
| Retrieved Power BI apps for user | GetUserAppsAsAdmin | Not currently used  |
| Retrieved Power BI apps | GetAppsAsAdmin |   |
| Retrieved Power BI capacities for user | GetUserCapacitiesAsAdmin | Not currently used  |
| Retrieved Power BI capacity users | GetCapacityUsersAsAdmin |   |
| Retrieved Power BI dashboard tiles | GetDashboardTilesAsAdmin |   |
| Retrieved Power BI dashboard users | GetDashboardUsersAsAdmin |   |
| Retrieved Power BI dashboards for user | GetUserDashboardsAsAdmin | Not currently used  |
| Retrieved Power BI dashboards | GetDashboardsAsAdmin |   |
| Retrieved Power BI data sources for user | GetUserDatasourcesAsAdmin | Not currently used  |
| Retrieved Power BI dataflows for user | GetUserDataflowsAsAdmin | Not currently used  |
| Retrieved Power BI dataflows | GetDataflowsAsAdmin |   |
| Retrieved Power BI gateway cluster datasource | GetGatewayClusterDatasource |   |
| Retrieved Power BI gateway cluster datasources | GetGatewayClusterDatasources |   |
| Retrieved Power BI gateway datasource users | GetDatasourceUsersAsAdmin | Not currently used  |
| Retrieved Power BI gateway tenant key | GetGatewayTenantKeys |   |
| Retrieved Power BI gateway tenant policy | GetGatewayTenantPolicy |   |
| Retrieved Power BI gateway users | GetGatewayUsersAsAdmin | Not currently used  |
| Retrieved Power BI gateways for user | GetUserGatewaysAsAdmin | Not currently used  |
| Retrieved Power BI group users | GetGroupUsersAsAdmin |   |
| Retrieved Power BI groups for user | GetUserGroupsAsAdmin | Not currently used  |
| Retrieved Power BI imports | GetImportsAsAdmin |   |
| Retrieved Power BI metric value | GetGoalValue |   |
| Retrieved Power BI metric | GetGoal |   |
| Retrieved Power BI refresh history | GetRefreshHistory |   |
| Retrieved Power BI refreshable by ID | GetRefreshablesForRefreshIdAsAdmin |   |
| Retrieved Power BI refreshables for capacity | GetRefreshablesForCapacityAsAdmin |   |
| Retrieved Power BI refreshables | GetRefreshablesAsAdmin |   |
| Retrieved Power BI report users | GetReportUsersAsAdmin |   |
| Retrieved Power BI reports for user | GetUserReportsAsAdmin | Not currently used  |
| Retrieved Power BI scorecard by using report ID | GetScorecardByReportId |   |
| Retrieved Power BI scorecard | GetScorecard |   |
| Retrieved Power BI semantic models for user | GetUserDatasetsAsAdmin | Not currently used  |
| Retrieved Power BI semantic models | GetDatasetsAsAdmin |   |
| Retrieved Power BI tenant keys | GetTenantKeysAsAdmin |   |
| Retrieved Power BI workspaces | GetWorkspaces |   |
| Retrieved a model from Power BI | GetPowerBIDataModel | A user opens the Open data model experience or resyncs a data model.  |
| Retrieved all Power BI gateway cluster datasources | GetAllGatewayClusterDatasources |   |
| Retrieved all supported datasources for Power BI gateway cluster | GetGatewayClusterSupportedDatasources |   |
| Retrieved allowed Power BI gateway regions | GetGatewayRegions |   |
| Retrieved authentication details for Power BI gateway cluster datasource | GetGatewayClusterDatasourceOAuthDetails |   |
| Retrieved data sources from Power BI dataflow | GetDataflowDatasourcesAsAdmin |   |
| Retrieved data sources from Power BI semantic model | GetDatasetDatasourcesAsAdmin |   |
| Retrieved links between semantic models and dataflows | GetDatasetToDataflowsLinksAsAdmin |   |
| Retrieved list of Power BI gateway installer principals | GetGatewayInstallerPrincipals |   |
| Retrieved list of datasource users for Power BI gateway cluster | GetGatewayClusterDatasourceUsers |   |
| Retrieved list of modified workspaces in Power BI tenant | GetModifiedWorkspacesAPI |   |
| Retrieved member status of Power BI gateway cluster | GetGatewayClusterMemberStatus |   |
| Retrieved metrics of Power BI scorecard | GetGoalsForScorecard |   |
| Retrieved multiple Power BI gateway clusters | GetGatewayClusters |   |
| Retrieved multiple Power BI metric values | GetGoalValues |   |
| Retrieved multiple Power BI scorecards | GetScorecards |   |
| Retrieved scan result in Power BI tenant | GetWorkspacesInfoResult |   |
| Retrieved snapshots for user in Power BI tenant | GetSnapshots | Generated when user retrieves snapshots that describe a semantic model such as when a user visits the data hub  |
| Retrieved status of Power BI gateway cluster datasource | GetGatewayClusterDatasourceStatus |   |
| Retrieved status of Power BI gateway cluster | GetGatewayClusterStatus |   |
| Retrieved upstream dataflows from Power BI dataflow | GetDataflowUpstreamDataflowsAsAdmin |   |
| Retry lakehouse SQL analytics endpoint creation for a Lakehouse | RetryLakehouseSqlEndpointCreation | Retry SQL endpoint creation for a Lakehouse  |
| Revoke an external data share | RevokeExternalDataShare | Revoke an external data share |
| Rotate Tenant Key | RotateTenantKey |   |
| Rotated Power BI gateway tenant key | RotateTenantKeyEncryptionKey |   |
| Run Artifact | RunArtifact |   |
| Save Model Diagram Layouts | SavePowerBIDataModelDiagramLayouts | Save diagram layouts after update data model in web model view.  |
| Saved an autogenerated report to Power BI | SaveAutogeneratedReport | After exploring an autogenerated Power BI report in an external application, a user saved it to the Power BI service.  |
| Saved an autogenerated semantic model to Power BI | SaveAutogeneratedDataset | After exploring an autogenerated Power BI semantic model in an external application, a user saved it to the Power BI service.  |
| Schedule Artifact | ScheduleArtifact |   |
| Sent a scan request in Power BI tenant | GetWorkspacesInfoAPI |   |
| Set Capacity Tenant Key | SetCapacityTenantKey |   |
| Set D Q Refresh Schedule Of Dataset | SetDQRefreshScheduleOfDataset |   |
| Set DirectQuery Refresh   Schedule Of Dateset | SetDQRefreshScheduleOfDateset |  |
| Set Lakehouse Endorsement | SetLakehouseEndorsement |   |
| Set Lakehouse Sensitivity Label | SetLakehouseSensitivityLabel |   |
| Set Model Refresh Schedule Of   Dateset | SetModelRefreshScheduleOfDateset |  |
| Set Model Refresh Schedule Of Dataset | SetModelRefreshScheduleOfDataset |   |
| Set Notebook Default Lakehouse | SetNotebookDefaultLakehouse | Set default lakehouse for notebook.  |
| Set Sjd Retry Policy | SetSjdRetryPolicy |   |
| Set access control for file | SetAccessControlForFile | OneLake operation. Sets permissions for a file. |
| Set blob expiry | SetBlobExpiry | OneLake operation. Set the expiration time for a blob. |
| Set blob metadata | SetBlobMetadata | OneLake operation. Set user-defined metadata for a blob. |
| Set blob properties | SetBlobProperties | OneLake operation. Set system properties for a blob. |
| Set blob tier | SetBlobTier | OneLake operation. Sets the tier of a blob. |
| Set container ACL | SetContainerAcl | OneLake operation. Sets permissions for a workspace. |
| Set container metadata | SetContainerMetadata | OneLake operation. Sets user-defined metadata for a workspace. |
| Set dataflow storage location for a workspace | SetDataflowStorageLocationForWorkspace |   |
| Set file properties | SetFileProperties | OneLake operation. Set user-defined properties for a file. |
| Set scheduled refresh on Power BI dataflow | SetScheduledRefreshOnDataflow |   |
| Set scheduled refresh on Power BI semantic model | SetScheduledRefresh |   |
| Share Artifact | ShareArtifact |   |
| Share Datamart | ShareDatamart |   |
| Share Lakehouse Table | ShareLakehouseTable |   |
| Share Warehouse | ShareWarehouse |   |
| Shared Power BI dashboard | ShareDashboard |   |
| Shared Power BI report | ShareReport |   |
| Shared Power BI semantic model | ShareDataset |   |
| Start Notebook Session | StartNotebookSession |   |
| Start Publish Environment | StartPublishEnvironment | Start publish environment |
| Started Power BI extended trial | OptInForExtendedProTrial | Not currently used  |
| Started Power BI trial | OptInForProTrial |   |
| Stop Notebook Session | StopNotebookSession |   |
| Switch Branch Git | SwitchBranchInGit | Switch Branch Git is a workspace activity, which is generated when the user changes what git branch is connected to the workspace.  |
| Sync Dataset Query Scale-Out Replicas | SyncDatasetQueryScaleOutReplicas | Sync Dataset Query Scale-Out Replicas is a dataset activity, which is generated when users request a synchronization of the read replicas of a scale out-enabled Power BI dataset with its read/write replica.  |
| Take Over Email Subscription | TakeOverEmailSubscription |   |
| Tested Power BI gateway datasource connection with single sign-on | GatewayClusterDatasourceSSOTestConnection |   |
| Took over Power BI semantic model | TakeOverDataset |   |
| Took over a Power BI datasource | TakeOverDatasource |   |
| Took ownership of Power BI dataflow | TookOverDataflow |   |
| Take over a Fabric item | TakeOverArtifact |   |
| Trial License Extension | TrialLicenseExtension | Extend user trials by user list or tenant  |
| Unassign Workspace From Alm Pipeline | UnassignWorkspaceFromAlmPipeline |   |
| Undelete blob | UndeleteBlob | OneLake operation. Restore a soft deleted blob. |
| Undo Git | UndoGit | Undo Git is an artifact activity, which is generated when users undo changes done to artifact.  |
| Unfollow Goal | UnfollowGoal |   |
| Unpublished Power BI app | UnpublishApp |   |
| Update Alm Pipeline Access As Admin | UpdateAlmPipelineAccessAsAdmin |   |
| Update Alm Pipeline | UpdateAlmPipeline |   |
| Update Artifact | UpdateArtifact |   |
| Update Byo Resource Access | UpdateByoResourceAccess |   |
| Update Capacity Delegation settings | UpdateCapacityTenantSettingDelegation | Update Capacity delegation settings.  |
| Update Data Sharing | UpdateDataSharing | Update an existing external data share  |
| Update Datamart Metadata | UpdateDatamartMetadata |   |
| Update Datamart Settings | UpdateDatamartSettings |   |
| Update Datamart | UpdateDatamart |   |
| Update Dataset Parameters | UpdateDatasetParametersForSolution | Update Dataset Parameters is a dataset activity, which is generated when updates are made to a Power BI Dataset parameters  |
| Update Dataset | UpdateDataset | Update Dataset is a dataset activity, which is generated when users updated the properties of a Power BI dataset.  |
| Update Default Domain | UpdateDefaultDataDomainAsAdmin | Update Default Domain  |
| Update Default Personal Workspace Capacity | UpdateDefaultPersonalWorkspaceCapacity |   |
| Update Domain Access Permissions | UpdateDataDomainAccessAsAdmin | Update Data Domain Access Permissions  |
| Update Domain Branding | UpdateDataDomainBrandingAsAdmin | Update Domain Branding  |
| Update Domain Contributors Scope | UpdateDataDomainContributorsScopeAsAdmin | Update Domain Contributors Scope  |
| Update Domain Delegation settings | UpdateDomainTenantSettingDelegation | Update Domain Delegation settings.  |
| Update Domain | UpdateDataDomainAsAdmin | Update Domain  |
| Update Domain's Folders Relations As Contributor | UpdateDataDomainFoldersRelationsAsContributor | Update Domain's Folders Relations As Contributor  |
| Update Domain's Folders Relations | UpdateDataDomainFoldersRelationsAsAdmin | Update Domain's Folders Relations  |
| Update Environment Resource | UpdateEnvironmentResource | Update resources in environment |
| Update Environment Spark   Settings | UpdateEnvironmentSparkSettings | Update environment spark settings |
| Update Experiment Run | UpdateExperimentRun |   |
| Update Folder Access | UpdateFolderAccess | Indicates an update to workspace access settings   |
| Update Folder | UpdateFolder | Indicates a workspace update   |
| Update From Git | UpdateFromGit | Update From Git is an artifact activity, which is generated when users update artifact from Git.  |
| Update Gateway Cluster Member | UpdateGatewayClusterMember |   |
| Update Gateway Installer Principals | UpdateGatewayInstallerPrincipals |   |
| Update Gateway Tenant Policy | UpdateGatewayTenantPolicy |   |
| Update Goal Connection Settings | UpdateGoalConnectionSettings |   |
| Update Goal Current Value Connection Owner | UpdateGoalCurrentValueConnectionOwner |   |
| Update Goal Target Value Connection Owner | UpdateGoalTargetValueConnectionOwner |   |
| Update Goals | UpdateGoals |   |
| Update Group | UpdateGroup |   |
| Update Hierarchy Goal Value | UpdateHierarchyGoalValue |   |
| Update Hierarchy Note | UpdateHierarchyNote |   |
| Update In Place Sharing Settings | UpdateInPlaceSharingSettings |  |
| Update MetricSet Metric   Endpoint | UpdateMetricSetMetric | Update metric in a metricset endpoint |
| Update Notebook Library | UpdateNotebookLibrary |  |
| Update Notebook Resource | UpdateNotebookResource | Update resources in notebook. |
| Update Notebook Spark Property | UpdateNotebookSparkProperty |  |
| Update Notification Settings | UpdateNotificationSettings | Update user notification settings for Notification Service Platform. |
| Update Publish to Web Embed Code Owner | UpdateEmbedCodeOwner |  |
| Update Report Content | UpdateReportContent |  |
| Update Scorecard Dataset | UpdateScorecardDataset |  |
| Update Scorecard Hierarchy | UpdateScorecardHierarchy |  |
| Update Scorecard View | UpdateScorecardView |  |
| Update Semantic Metric   Endpoint | UpdateSemanticMetric | Update standalone semantic metric endpoint |
| Update Service Principal Profile | UpdateServicePrincipalProfile |  |
| Update Sql Analytics Endpoint Lakehouse Settings | UpdateSqlAnalyticsEndpointLakehouseSettings | Updated settings for a lakehouse SQL analytics endpoint. Previously named *Updated a default warehouse* (Operation name: *UpdateDefaultWarehouse*) |
| Update Sql Analytics Endpoint Lakehouse | UpdateSqlAnalyticsEndpointLakehouse | Updated a lakehouse SQL analytics endpoint |
| Update USEC roles for an artifact | UpdateArtifactRoles | OneLake operation. |
| Update Virtual Network | UpdateVirtualNetwork |  |
| Update Warehouse Metadata | UpdateWarehouseMetadata |  |
| Update Warehouse Settings | UpdateWarehouseSettings |  |
| Update Warehouse | UpdateWarehouse |  |
| Update Workspace Delegation settings | UpdateWorkspaceTenantSettingDelegation | Update Workspace Delegation settings. |
| Update capacity resource governance settings | UpdateCapacityResourceGovernanceSettings | Not currently in Microsoft 365 admin center  |
| Update datasource share policy | UpdateDatasourceShareTenantPolicy | Set the datasource share policy set by the tenant  |
| Update list of users part of the datasource share policy | UpdateDatasourceSharePrincipalsPolicy | Set the datasource share principals that are part of policy set by the tenant |
| Update mounted warehouse settings | UpdateMountedWarehouseSettings | Generated when mounted warehouse settings are updated |
| Update mounted warehouse | UpdateMountedWarehouse | Generated when mounted warehouse is updated |
| Update source in GraphQL artifact | UpdateSourceGraphQL | Update source in GraphQL artifact |
| Update subfolder | UpdateSubfolder |  |
| Update task flow | UpdateTaskFlow |  |
| Update the current set of DLP policies applied on the Tenant | UpdateTenantDlpPolicies | Update the current set of DLP policies applied on the Tenant |
| Update virtual network data   gateway proxy | UpdateVirtualNetworkDataGatewayProxy | Update HTTP proxy for virtual network data gateway |
| Update workspace role | UpdateWorkspaceRoleViaAdminApi | Update workspace role |
| Updated Power BI access request settings | UpdateAccessRequestSettings |  |
| Updated Power BI app | UpdateApp |  |
| Updated Power BI dataflow | UpdateDataflow |  |
| Updated Power BI discoverable model settings | UpdateDiscoverableModelSettings | Generated when a report is set to feature on home |
| Updated Power BI email subscription | UpdateEmailSubscription |  |
| Updated Power BI gateway cluster datasource | UpdateGatewayClusterDatasource |  |
| Updated Power BI gateway data source credentials | UpdateDatasourceCredentials |  |
| Updated Power BI semantic model data sources | UpdateDatasources |  |
| Updated Power BI semantic model parameters | UpdateDatasetParameters |  |
| Updated Power BI workspace access | UpdateWorkspaceAccess |  |
| Updated Power BI workspace | UpdateWorkspace |  |
| Updated an organizational custom visual | UpdateOrganizationalGalleryItem |  |
| Updated capacity admin | UpdateCapacityAdmins |  |
| Updated capacity custom settings | UpdateCapacityCustomSettings |  |
| Updated capacity display name | UpdateCapacityDisplayName |  |
| Updated credentials for Power BI gateway cluster | UpdateGatewayClusterDatasourceCredentials |  |
| Updated dataflow storage assignment permissions | UpdatedDataflowStorageAssignmentPermissions |  |
| Updated deployment pipeline access | UpdateAlmPipelineAccess |  |
| Updated deployment pipeline configuration | SetConfigurationAlmPipeline |  |
| Updated featured tables | UpdateFeaturedTables |  |
| Updated organization's Power BI settings | UpdatedAdminFeatureSwitch |  |
| Updated parameters for installed Power BI template app | UpdateInstalledTemplateAppParameters |  |
| Updated settings for Power BI template app | UpdateTemplateAppSettings |  |
| Updated snapshots for user in Power BI tenant | UpdateSnapshot | Generated when user updates snapshots that describe their semantic models |
| Updated testing permissions for Power BI template app | UpdateTemplateAppTestPackagePermissions |  |
| Updated the Power BI datasource | UpdateDatasource |  |
| Updated the Power BI gateway | UpdateGateway |  |
| Updated workspace Analysis Services settings | SetASSeverPropertyOnWorkspaceFromExternalApplicationDetailedInfo | Not currently used |
| Upgrade Workspace | UpgradeWorkspace |  |
| Upgrade Workspaces As Admin | UpgradeWorkspacesAsAdmin |  |
| Upload workload package | ExtensibilityUploadPackage | Upload a workload package in a tenant |
| Upsert Datamart Parameters | UpsertDatamartParameters |  |
| Upsert Goal Current Value Rollup | UpsertGoalCurrentValueRollup |  |
| Upsert Goal Status Rules | UpsertGoalStatusRules |  |
| Upsert Goal Target Value Rollup | UpsertGoalTargetValueRollup |  |
| Upsert Goal Values | UpsertGoalValues |  |
| Upsert Sql Analytics Endpoint Lakehouse Parameters | UpsertSqlAnalyticsEndpointLakehouseParameters | Upserted parameters for a lakehouse SQL analytics endpoint. Previously named *Updated parameters from a default warehouse* (Operation name: *UpsertDefaultWarehouseParameters*) |
| Upsert Warehouse Parameters | UpsertWarehouseParameters |  |
| Upsert mounted warehouse parameters | UpsertMountedWarehouseParameters | Generated when mounted warehouse parameters are added or updated |
| Used Power BI to explore data in an external application | ExploreDataExternally | Someone used Power BI to explore their data in an external application. |
| View Datamart | ViewDatamart |  |
| View Spark App Input Output | ViewSparkAppInputOutput |  |
| View Spark App Log | ViewSparkAppLog |  |
| View Spark Application | ViewSparkApplication |  |
| View Sql Analytics Endpoint Lakehouse | ViewSqlAnalyticsEndpointLakehouse | Viewed a lakehouse SQL analytics endpoint. Previously named *Viewed a default warehouse* (Operation name: *ViewDefaultWarehouse*) |
| View Warehouse | ViewWarehouse |  |
| View mounted warehouse | ViewMountedWarehouse | Generated when mounted warehouse is fetched for viewing |
| Viewed Power BI dashboard | ViewDashboard | Some fields such as CapacityID and CapacityName, will return null if the report or dashboard is viewed from a Power BI app, rather than a Power BI workspace |
| Viewed Power BI dataflow | ViewDataflow |  |
| Viewed Power BI metadata | ViewMetadata |  |
| Viewed Power BI report | ViewReport | A report is also generated per page when exporting a report. Some fields such as CapacityID and CapacityName, will return null if the report or dashboard is viewed from a Power BI app, rather than a Power BI workspace. |
| Viewed Power BI tile | ViewTile |  |
| Viewed Power BI usage metrics | ViewUsageMetrics |  |
| disable workspace | DisableWorkspaceViaAdminApi | Disables the workspace |

## Considerations and limitations

When capacity ID and capacity name aren't available in the audit logs, you can view them in the [Microsoft Fabric Capacity Metrics app](../enterprise/metrics-app.md).

> [!IMPORTANT]
> **Starting July 7, 2025**, As part of our ongoing efforts to simplify audit logging and ensure consistency across Microsoft Fabric, we're **standardizing redundant artifact operations** into a single set of unified operations. This migration aligns Datamart, Warehouse, and SQL Analytics Endpoint Lakehouse actions under common names used across the Fabric platform.

### What’s Changing?

| Friendly Name | Old Operation Name | New Operation Name |
|---------------|--------------------|---------------------|
| Create Datamart | CreateDatamart | CreateArtifact |
| Create Warehouse | CreateWarehouse | CreateArtifact |
| Delete Datamart | DeleteDatamart | DeleteArtifact |
| Delete Warehouse | DeleteWarehouse | DeleteArtifact |
| Rename Datamart | RenameDatamart | UpdateArtifact |
| Rename Warehouse | RenameWarehouse | UpdateArtifact |
| Share Datamart | ShareDatamart | ShareArtifact |
| Share Warehouse | ShareWarehouse | ShareArtifact |
| Update Datamart | UpdateDatamart | UpdateArtifact |
| Update Datamart Metadata | UpdateDatamartMetadata | UpdateArtifact |
| Update Datamart Settings | UpdateDatamartSettings | UpdateArtifact |
| Update Warehouse | UpdateWarehouse | UpdateArtifact |
| Update Warehouse Metadata | UpdateWarehouseMetadata | UpdateArtifact |
| Update Warehouse Settings | UpdateWarehouseSettings | UpdateArtifact |
| Upsert Datamart Parameters | UpsertDatamartParameters | UpdateArtifact |
| Upsert SQL Analytics Endpoint Lakehouse Parameters | UpsertSqlAnalyticsEndpointLakehouseParameters | UpdateArtifact |
| Upsert Warehouse Parameters | UpsertWarehouseParameters | UpdateArtifact |
| View Datamart | ViewDatamart | ReadArtifact |
| View SQL Analytics Endpoint Lakehouse | ViewSqlAnalyticsEndpointLakehouse | ReadArtifact |
| View Warehouse | ViewWarehouse | ReadArtifact |


## Related content

[Track user activities in Microsoft Fabric](track-user-activities.md)
