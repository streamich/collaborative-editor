import * as React from 'react';
import {StrBinding} from './StrBinding';
import {InputFacade0, InputFacade1, InputFacade2, InputFacade3, InputFacade4} from './InputFacade';
import type {Meta, StoryObj} from '@storybook/react';
import {model0} from './__tests__/fixtures';

const Demo: React.FC<{textarea: boolean; Facade: any}> = ({textarea, Facade}) => {
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [model, clone] = React.useMemo(() => {
    const model = model0.clone();
    // const model = log3.end.clone();
    return [model, model.clone()];
  }, [1]);
  React.useSyncExternalStore(model.api.subscribe, () => model.tick);
  React.useEffect(() => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const editor = new Facade(input);
    const binding = new StrBinding(model.api.str([]), editor);
    binding.bind(true);
    return () => {
      binding.unbind();
    };
  }, [model]);

  return (
    <div>
      {textarea ? <textarea ref={inputRef as any} /> : <input ref={inputRef as any} type="text" />}
      <div>
        <button
          onClick={() => {
            const input = inputRef.current;
            if (!input) return;
            input.value += '!';
          }}
        >
          Append "!" to input
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            const str = model.api.str([]);
            str.ins(str.view().length, '?');
          }}
        >
          Append "?" to model
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.api.str([]);
              str.ins(str.view().length, '?');
            }, 2000);
          }}
        >
          Append "?" to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              const str = model.api.str([]);
              str.ins(0, '1. ');
            }, 2000);
          }}
        >
          Prepend "1. " to model after 2s
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setTimeout(() => {
              model.reset(clone);
            }, 2000);
          }}
        >
          RESET after 2s
        </button>
      </div>
      <pre style={{fontSize: '10px'}}>
        <code>{model.root + ''}</code>
      </pre>
    </div>
  );
};

const meta: Meta<typeof Text> = {
  title: 'InputFacade',
  component: Demo as any,
  argTypes: {},
};

export default meta;

export const Facade0: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade0,
  } as any,
};

export const Facade0Textarea: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade0,
    textarea: true,
  } as any,
};

export const Facade1: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade1,
  } as any,
};

export const Facade1Textarea: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade1,
    textarea: true,
  } as any,
};

export const Facade2: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade2,
  } as any,
};

export const Facade2Textarea: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade2,
    textarea: true,
  } as any,
};

export const Facade3: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade3,
  } as any,
};

export const Facade3Textarea: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade3,
    textarea: true,
  } as any,
};

export const Facade4: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade4,
  } as any,
};

export const Facade4Textarea: StoryObj<typeof meta> = {
  args: {
    Facade: InputFacade4,
    textarea: true,
  } as any,
};
