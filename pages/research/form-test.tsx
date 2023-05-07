/* eslint-disable */
import { NextPageWithLayout } from '../_app';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { createContext, useContext, useRef } from 'react';

interface Observer {
  next(value: string): void;
}

class Subject {
  private readonly observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  publish(value: string): void {
    console.log('Publishing', value);
    console.log(this.observers);
    this.observers.forEach(obs => {
      obs.next(value);
    });
  }
}

type SupaForm = {
  register: (name: string) => void;
  get: (name: string) => string;
  set: (name: string, val: string) => void;
  watch: (name: string) => string;
};

function createForm(): SupaForm {
  const values: Record<string, string> = {};
  const watchers = new Set<string>();
  const subjects = {
    watches: new Map<string, Subject>()
  };

  function register(name: string): void {
    watchers.add(name);
    values[name] = '';
  }

  function get(name: string): string {
    return values[name];
  }

  function set(name: string, value: string): void {
    if (watchers.has(name)) {
      subjects.watches.get(name)?.publish(value);
    }
    values[name] = value;
  }

  function watch(name: string): string {
    const subject = new Subject();
    subject.subscribe({
      next(value: string) {
        values[name] = value;
      }
    });

    subjects.watches.set(name, subject);
    watchers.add(name);

    return values[name];
  }

  return {
    register,
    get,
    set,
    watch
  };
}

function useForm() {
  const formRef = useRef<SupaForm | undefined>();

  if (!formRef.current) {
    formRef.current = createForm();
  }

  return formRef.current;
}

const ctx = createContext<SupaForm>({} as SupaForm);
function useFormCtx() {
  return useContext(ctx);
}

function UserName() {
  console.log('Render username');
  const { register, set, watch } = useFormCtx();
  const value = watch('fullName');

  return (
    <div>
      <label>Username Name</label>
      <input
        name="username"
        onChange={e => {
          console.log(e.target);
          set(e.target.name, e.target.value);
        }}
        ref={node => {
          console.log(node);
          node && register(node?.name);
        }}
      />
      Watching: {value}
    </div>
  );
}

function FullName() {
  console.log('Render FullName');
  const { watch } = useFormCtx();
  const username = watch('username');

  return (
    <div>
      <label>Full Name</label>
      <input />
      Username: {username}
    </div>
  );
}

const HookFormPage: NextPageWithLayout = () => {
  const form = useForm();

  console.log(form);

  return (
    <ctx.Provider value={form}>
      <UserName />

      <br />

      <FullName />
    </ctx.Provider>
  );
};

HookFormPage.getLayout = NoLayout;

export default HookFormPage;
