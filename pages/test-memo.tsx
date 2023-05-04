import { useState } from 'react';
import { NoLayout } from '@modules/shared/components/NoLayout';

const EmployeeProfile = function EmployeeProfile({ name }: { name: string }) {
  return (
    <>
      <p>Name:{name}</p>
      <p>Email: {'email'}</p>
    </>
  );
};
function EmployeeRegForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <>
      <label>
        Name: <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Email: <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <hr />

      <EmployeeProfile name={name} />
    </>
  );
}

EmployeeRegForm.getLayout = NoLayout;

export default EmployeeRegForm;
