import React from 'react';
import { Step } from 'react-joyride';

export const StepIds = {
  MY_REQUEST_TABLE: 'my-request-table',
  BTN_ADD_MY_REQUEST: 'btn-add-my-request'
};

export const MyActivityGuideSteps: Step[] = [
  {
    title: '🧭 My Activity Guide Journey',
    content: (
      <div>
        Welcome! This is your central dashboard to view, manage, and organize
        your requests in the system. Let’s take a quick tour to get you
        familiar.
      </div>
    ),
    placement: 'center',
    target: 'body'
  },
  {
    title: '📊 View your request in the Table',
    content: (
      <div>
        This table shows all requests, including Request Type, Day of week, Time
        of day and Submitted At. You can view your request status at the end of
        a row.
      </div>
    ),
    target: '#my-request-table' // Example: Wrap table in a div with this ID
  },
  {
    title: '🧑‍💻 Add New Request',
    content: (
      <div>
        Click the + Add button to create a new request.
        <ul className="mt-2 list-disc list-inside">
          <li>
            <strong>Working Type:</strong> Choose the type of request:
          </li>
          <li>
            <strong>Late:</strong> If you're arriving late, specify the
            estimated time you'll arrive.
          </li>
          <li>
            <strong>Absence</strong> If you're absent, you can note whether it's
            for the full day or a specific time slot.
          </li>
        </ul>
      </div>
    ),
    target: '#btn-add-my-request' // Add this ID to the Add button
  },
  {
    title: '✅ You’re All Set!',
    content: 'You now know how to manage your request like a pro!',
    placement: 'center',
    target: 'body'
  }
];
