import * as React from 'react';
import {
  createContext,
  Reducer,
  useContext,
  useReducer,
  useRef,
  useState
} from 'react';
import { NoLayout } from '@modules/shared/components/NoLayout';
import { NextPageWithLayout } from './_app';
import { ChildrenPropOnly } from '@modules/shared/types/react.types';
import { noop } from '@modules/shared/utils';

type Ctx = {
  first: string;
  last: string;
  dispatch: React.Dispatch<Action>;
};
type Action = {
  type: 'set';
  key: string;
  value: string;
};
function log(message: string, ...params: string[]) {
  // eslint-disable-next-line no-console
  console.log(message, params);
}

const ctx = createContext<Ctx>(null as unknown as Ctx);

const reducer: Reducer<Ctx, Action> = (state, action) => {
  return {
    ...state,
    [action.key]: action.value
  };
};

const Child1 = () => {
  const { first } = useContext(ctx);

  log('render');
  return <>Hello1 {first}</>;
};
const Child2 = () => {
  const [count, setCount] = useState(0);
  const { dispatch } = useContext(ctx);

  function handleClick() {
    dispatch({
      type: 'set',
      key: 'last',
      value: count + ''
    });

    setCount(count + 1);
  }
  log('render 2');
  return (
    <>
      {' '}
      <button onClick={handleClick}>Click {count}</button>
    </>
  );
};

const Child3 = () => {
  const { last } = useContext(ctx);
  log('Render 3');

  return <>{last}</>;
};

function Provider({ children }: ChildrenPropOnly) {
  const [state, dispatch] = useReducer(reducer, {
    first: '',
    last: 'Someth',
    dispatch: noop
  });
  const value = useRef<Ctx>(null);

  if (!value.current) {
    // @ts-ignore
    value.current = { ...state, dispatch };
  }

  if (value.current.last !== state.last) {
    log('Updating last');
    value.current.last = state.last;
  }

  return (
    <>
      <ctx.Provider value={value.current}>{children}</ctx.Provider>
    </>
  );
}

const TestPage: NextPageWithLayout = () => {
  return (
    <Provider>
      <Wrap />
    </Provider>
  );
};

function Wrap() {
  return (
    <>
      <Child1 />
      <br />
      <Child2 />
      <br />
      <Child3 />
    </>
  );
}

TestPage.getLayout = NoLayout;

export default TestPage;
