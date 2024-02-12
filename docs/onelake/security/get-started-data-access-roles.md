# What are OneLake data access roles? 

## Overview 

OneLake data access roles for folders is a new feature that enables you to apply role-based access control (RBAC) to your data stored in OneLake. You can define security roles that grant read access to specific folders within a Fabric item, and assign them to users or groups. The access permissions determine what folders users see when accessing the lake view of the data, either through the lakehouse UX, notebooks, or OneLake APIs.  

Fabric users in the Admin, Member, or Contributor roles can get started by creating OneLake data access roles to grant access to only specific folders in a lakehouse. To grant access to data in a lakehouse, add users to a data access role. Users that are not part of a data access role will see no data in that lakehouse.  

Using data access roles in combination with the other security types in Fabric allows for sophisticated architectures to be built. See the how-to guides for more information.  

## How to opt-in 

All lakehouses in Fabric have the data access roles preview feature disabled by default. The preview feature is configured on a per-lakehouse basis. This allows for a single lakehouse to try the preview without enabling it on any other lakehouses or Fabric items.  

To enable the preview, navigate to a lakehouse and click the “Manage OneLake data access (preview)” button in the ribbon. You must be an Admin, Member, or Contributor in the workspace to enable the preview. After clicking the button, the lakehouse UX will open and the feature will be enabled.  

The preview feature cannot be disabled once it has been configured. See the Create, edit, and delete OneLake data access roles article for more details on how to get started with this. 

To ensure a smooth opt-in experience, all users that had read permission to the lakehouse will continue to have read access. This is done through the creation of a default data access role called “DefaultReader”. Using virtualized role memberships (see here for more details) all users that had the necessary permissions to view data in the lakehouse are included as members of this default role. To start restricting access to those users, ensure that the DefaultReader role is deleted or that the ReadAll permission is removed from the accessing users.  

!!Important!! Make sure that any users that are included in a data access role are not also part of the DefaultReader role. Otherwise they will maintain full access to the data. 

## What types of data can be secured? 

OneLake data access roles can be used to manage OneLake access to folders in a lakehouse. Any folder in a lakehouse can be secured. The security set by data access roles applies exclusively to access against OneLake or lake-specific APIs. This applies across a wide range of apps and services, including: 

- Fabric pipelines 
- Ingesting data into real-time analytics databases 
- Fabric lakehouse UX 
- OneLake file explorer 
- OneLake API calls 

In addition, security configured in other locations in Fabric does not synchronize with the OneLake data access roles. They each operate as their own security model for users that access through that method. For example, if the data access roles grant access to table1, and in the SQL Analytics endpoint a user is granted access to table2, the user would see only table1 in the lakehouse UX but would only see table2 in the SQL endpoint. To avoid mismatches in access, it is recommended to only grant users access to a single access method, or ensure the security definitions in both places are kept in sync manually. See the “best practices with OneLake data access roles” for more details. 

## Known issues 

The external data sharing preview feature (link) is not compatible with the data access roles preview. When you enable the data access roles preview on a lakehouse, any existing external data shares may stop working.

# Create, edit, and delete OneLake folder security roles 

## Overview 

Using OneLake data access roles, you can manage granular access to OneLake folders. In this article, we will look at how to create, edit, delete, and assign members to OneLake data access roles. 

## Prerequisites 

In order to configure security for a lakehouse you must be an Admin, Member, or Contributor for the workspace. Role creation and membership assignment takes effect as soon as the role is saved, so make sure you want to grant access before adding someone to a role.  

Note: OneLake data access roles are only supported for lakehouse items.  

## Create a role 

1. Open the lakehouse where you want to define security. 
1. In the upper left corner of the lakehouse homepage, click on Manage OneLake data access (preview).
<IMage>
1. On the top left of the page, select New Role and type the role name you want.
    1. The role name has certain restrictions: 
    1. The role name can only contain alphanumeric characters. 
    1. The role name must start with a letter. 
    1. Names are case insensitive and must be unique. 
    1. The maximum name length is 128 characters. 

1. Select the All folders if you want to have this role apply to all the folders in this lakehouse. 
    1. This includes any folders that are added in the future. 
1. Select the Selected folders if you want to only have this role apply to selected folders. 
    1. Check the boxes next to the folders you want the role to apply to. 
    1. Roles grant access to folders. To allow a user to access a folder, check the box next to it. If a user shouldn’t see a folder, do not check the box.
    1. In the bottom left, click Save to create your role. 
1. In the top left, click Assign role to add people to the role. 
1. Add as many people, groups, or email addresses for the role. See the “Assign a member or group” section below for additional information. 
1. Click Add once you have all the people you want. The people and groups will then move under the Assigned people and groups. 
1. Click Save and wait for the notification that the roles are successfully published. 

1. Click the X in the top right to exit the pane. 

## Edit a role 

1. Open the lakehouse where you want to define security. 

1. In the ribbon of the lakehouse homepage, click on Manage OneLake data access (preview). 

1. On the right side, hover over the role you want to edit and click it. 

1. You can change which folders are being granted access to by selecting or de-selecting the checkboxes next to each folder. 

1. To change the people, click Assign role. See the “Assign a member or group” section below for additional information. 

1. To add more people, type names in the Add people or groups box and click Add.  

1. To remove people, select their name under Assigned people and groups and click Remove. 

1. Click Save and wait for the notification that the roles are successfully published. 

1. Click the X in the top right to exit the pane. 

## Delete a role 

1. Open the lakehouse where you want to define security. 

1. In the ribbon of the lakehouse homepage, click on Manage OneLake data access (preview). 

1. Check the box next to the roles with keys next to their names and click Delete after selecting. 

1. Confirm deletion by clicking Delete on the confirmation popup and wait for the notification that the roles are successfully deleted. 

1. Click the X in the top right to exit the pane. 

## Assign a member or group 

OneLake data access roles supports two different methods of adding users to a role. The main method is by adding users or groups directly to a role using the Add people or group box on the Assign role page. The second is using virtual memberships with the Automatically add users with these permissions control.  

Adding users directly to a role with the Add people or group box adds the users as explicit members of the role. Those users are part of the role and will have the corresponding access granted by that role unless they are removed from the role or the role is deleted. These users will show up with just their name and picture shown in the Assigned people and groups list.  

The virtual members allows for the membership of the role to be dynamically adjusted based on the Fabric item permissions of the users. By clicking automatically add users with these permissions box and selecting a permission, you are adding as implicit members of the role any user in the Fabric workspace who has all of the selected permissions. For example, if you chose “ReadAll, Write” then any user of the Fabric workspace that has ReadAll AND Write permissions to the lakehouse would be included as a member of the role. You can see which users are being added as virtual members by looking for the “Assigned by workspace permissions” text under their name in the Assigned people and groups list. These members cannot be manually removed and will need to have their corresponding Fabric permission revoked in order to be unassigned.  

Regardless of which membership type, data access roles support adding individual users, Microsoft Entra groups, and security principals.  

### Assigning members 

To get to the assign members page there are two ways: 

#### Method 1

1. Select the name of the role you want to assign members to 

2. At the top of the role details page, click Assign role. 

#### Method 2 

1. From the role list, click the checkbox next to the role you want to assign members to 

2. Click Assign 

#### Assign users directly 

From the assign role page, you can add members or groups by typing their name or email address in the Add people or groups box. Click on the result you want to select that user. You can repeat this step for as many users as you want. Once you are done, click Add to move the selected users to the access list. 

If you selected the wrong users, you can click the “x” next to their entry to remove them from the box, or click Clear to remove all entries. 

To publish the access changes, click Save at the bottom of the pane. The updated assignments will start taking effect immediately.  

#### Assign virtual members 

To add virtual members, use the Automatically add users with these permissions box. Click the box to open the dropdown picker to choose the Fabric permissions to virtualize. Users are virtualized if they have all of the checked permissions.  

The following screenshot shows the list of available permissions that can be used for virtualizing memberships. 

Once a permission has been selected, any virtualized members will show in the Assigned people and groups list. The users will have text beside their name indicating that they were assigned by the workspace permissions. These users cannot be manually removed from the role assignment. Instead, remove the corresponding permissions from the virtualization control or remove the Fabric permission. 

# Related content 

- [Fabric Security overview](Link)

- [OneLake security overview](LINK)

- [Data Access Control Model](LINK)