import React from 'react';
import { ActionBar, SyntaxHighlighter } from '@storybook/components';
import copy from 'copy-to-clipboard';
import { Listener } from './register';

interface JSXProps {
  active: boolean;
  ob(listener: Listener): void;
}

const JSX: React.FunctionComponent<JSXProps> = props => {
  const [current, setCurrent] = React.useState<string | undefined>(undefined);
  const [jsx, setJsx] = React.useState<Record<string, string>>({});

  const addJsx = (id: string, newJsx: string) =>
    setJsx({ ...jsx, [id]: newJsx });

  React.useEffect(() => {
    props.ob({
      next: type => (type === 'jsx' ? addJsx : setCurrent)
    });
  }, []);

  const code = current && jsx[current] ? jsx[current] : '';


  const copyJsx = React.useCallback(() => copy(code), [code]);

  return props.active ? (
    <div>
      <SyntaxHighlighter language="jsx" format={false} >{code}</SyntaxHighlighter>
      <ActionBar
        actionItems={[
          {
            title: 'Copy',
            onClick: copyJsx
          }
        ]}
      />
    </div>
  ) : null;
};

export default JSX;
