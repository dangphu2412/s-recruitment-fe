import React from 'react';
import { Step } from 'react-joyride';

export const StepIds = {
  USER_TABLE: 'user-table',
  PAGINATION_CONTROLS: 'query-filter-controls',
  SEARCH_BAR: 'search-bar',
  FILTERS_BAR: 'filters-bar',
  BTN_ADD_USER: 'btn-add-user',
  BTN_IMPORT_USER: 'btn-import-user',
  BTN_UPGRADE_USER: 'btn-upgrade-user',
  BTN_UPLOAD_DEVICE_USERS: 'btn-upload-device-users'
};

export const UserManagementGuideSteps: Step[] = [
  {
    title: '🧭 User Guide Journey',
    content: (
      <div>
        Welcome! This is your central dashboard to view, manage, and organize
        users in the system. Let’s take a quick tour to get you familiar.
      </div>
    ),
    placement: 'center',
    target: 'body'
  },
  {
    title: '📊 View Users in the Table',
    content: (
      <div>
        This table shows all users, including their name, roles, payment status,
        and the date they joined. You can also take actions for each user from
        the 3-dot menu.
      </div>
    ),
    target: '#user-table' // Example: Wrap table in a div with this ID
  },
  {
    title: '📍 Navigate Between Pages',
    content:
      'Use the query-filter controls to explore more users. You can refresh the list using the ↻ icon or reset filters anytime.',
    target: '#query-filter-controls' // Add this ID to the query-filter container
  },
  {
    title: '🔍 Search Users',
    content:
      'Quickly find users by typing a username or full name into the search bar. Hit ‘Search’ or press Enter to apply.',
    target: '#search-bar' // Add this ID to the search input
  },
  {
    title: '🎯 Filter by Attributes',
    content: (
      <div>
        Refine your user list using filters:
        <ul className="mt-2 list-disc list-inside">
          <li>
            <strong>Department</strong>: Choose a specific department
          </li>
          <li>
            <strong>Period</strong>: Filter by join date/month
          </li>
          <li>
            <strong>Status</strong>: See debt/active/inactive or official
            members
          </li>
        </ul>
      </div>
    ),
    target: '#filters-bar' // Wrap all filters in a div with this ID
  },
  {
    title: '🧑‍💻 Add New User',
    content: 'Click the + Add button to create a new user manually.',
    target: '#btn-add-user' // Add this ID to the Add button
  },
  {
    title: '📥 Import Users',
    content:
      'Use the Import button to bulk add users by uploading an Excel file. Make sure it matches the required format.',
    target: '#btn-import-user' // Add this ID to the Import button
  },
  {
    title: '🚀 Upgrade to Member',
    content:
      'The Upgrade Member button promotes users from trial to official members.',
    target: '#btn-upgrade-user' // Add this ID to the Upgrade Member button
  },
  {
    title: '🔗 Upload from Device',
    content:
      'Use the Upload Device Users button to sync users from external attendance devices using Excel.',
    target: '#btn-upload-device-users' // Add this ID to the Upload button
  },
  {
    title: '✅ You’re All Set!',
    content:
      'You now know how to manage users like a pro! Feel free to explore and manage your community efficiently.',
    placement: 'center',
    target: 'body'
  }
];
