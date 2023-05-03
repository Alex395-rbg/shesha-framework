import React, { FC, MutableRefObject, ReactNode, useEffect, useState } from 'react';
import { ISettingsFormFactory, ISettingsFormInstance, IToolboxComponent } from 'interfaces';
import { Empty } from 'antd';
import { useDebouncedCallback } from 'use-debounce';
import { FormMarkup } from 'providers/form/models';
import GenericSettingsForm from '../genericSettingsForm';
import { IConfigurableFormComponent, useMetadataDispatcher } from 'providers';
import { MetadataContext } from 'providers/metadata/contexts';

export interface IComponentPropertiesEditorProps {
  toolboxComponent: IToolboxComponent;
  componentModel: IConfigurableFormComponent;
  onSave: (settings: IConfigurableFormComponent) => Promise<void>;
  readOnly: boolean;
  autoSave: boolean;
  formRef?: MutableRefObject<ISettingsFormInstance | null>;
}

const getDefaultFactory = (markup: FormMarkup): ISettingsFormFactory => {
  return ({ readOnly: readonly, model, onSave, onCancel, onValuesChange, toolboxComponent, formRef }) => {
    return (
      <GenericSettingsForm
        readonly={readonly}
        model={model}
        onSave={onSave}
        onCancel={onCancel}
        markup={typeof markup === 'function' ? markup(model) : markup}
        onValuesChange={onValuesChange}
        toolboxComponent={toolboxComponent}
        formRef={formRef}
      />
    );
  };
};

export const ComponentPropertiesEditor: FC<IComponentPropertiesEditorProps> = (props) => {
  const { toolboxComponent, componentModel, readOnly, autoSave, formRef } = props;
  // note: we have to memoize the editor to prevent unneeded re-rendering and loosing of the focus
  const [editor, setEditor] = useState<ReactNode>(<></>);

  const { getActiveProvider } = useMetadataDispatcher(false) ?? {};

  const debouncedSave = useDebouncedCallback(
    values => {
      props.onSave(values);
    },
    // delay in ms
    300
  );

  const onCancel = () => {
    //
  };

  const onSave = values => {
    if (!readOnly)
      props.onSave(values);
  };

  const onValuesChange = (_changedValues, values) => {
    if (autoSave && !readOnly)
      debouncedSave(values);
  };

  const wrapEditor = (renderEditor: () => ReactNode) => {
    const metaProvider = getActiveProvider ? getActiveProvider() : null;
    if (!metaProvider) return <>{renderEditor()}</>;

    return (
      <MetadataContext.Provider value={metaProvider}>
        <>{renderEditor()}</>
      </MetadataContext.Provider>
    );
  };

  const getEditor = () => {
    const emptyEditor = null;

    if (!Boolean(toolboxComponent)) return emptyEditor;

    const settingsFormFactory =
      'settingsFormFactory' in toolboxComponent
        ? toolboxComponent.settingsFormFactory
        : 'settingsFormMarkup' in toolboxComponent
          ? getDefaultFactory(toolboxComponent.settingsFormMarkup)
          : null;
    if (!settingsFormFactory) return emptyEditor;

    return wrapEditor(() => (
      <React.Fragment>
        {settingsFormFactory({
          readOnly: readOnly,
          model: componentModel,
          onSave,
          onCancel,
          onValuesChange,
          toolboxComponent,
          formRef: formRef,
        })}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    const currentEditor = getEditor();
    setEditor(currentEditor);
  }, [toolboxComponent, readOnly]);

  return Boolean(toolboxComponent)
    ? <>{editor}</>
    : (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          readOnly ? 'Please select a component to view settings' : 'Please select a component to begin editing'
        }
      />
    );
};