import { noop } from 'lodash';
import { createContext } from 'vm';

const StateRouterContext = createContext({ path: '', onChangePath: noop });

// not needed but may need in the future
type Props = any;
export const StateRouter = ({
  children,
  initialPath,
  path: propsPath,
}: Props) => {
  return StateRouterContext;
};
