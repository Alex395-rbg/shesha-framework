import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/lib/form/Form';
import { nanoid } from '@/utils/uuid';
import { IRateProps } from '.';

export const getSettings = (data: IRateProps) => {
  const searchableTabsId = nanoid();
  const commonTabId = nanoid();
  const eventsTabId = nanoid();
  const appearanceTabId = nanoid();
  const securityTabId = nanoid();
  return {
    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: searchableTabsId,
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: 'common',
            title: 'Common',
            id: commonTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addContextPropertyAutocomplete({
                  id: nanoid(),
                  propertyName: 'propertyName',
                  label: 'Property name',
                  parentId: commonTabId,
                  styledLabel: true,
                  validate: { required: true },
                  size: 'small',
                  jsSetting: true
                })
                .addLabelConfigurator({
                  id: nanoid(),
                  propertyName: 'hideLabel',
                  label: 'Label',
                  parentId: commonTabId,
                  hideLabel: true,
                  defaultValue: true,
                })
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: commonTabId,
                  inputs: [
                    {
                      type: 'textArea',
                      id: nanoid(),
                      propertyName: 'description',
                      label: 'Tooltip',
                      jsSetting: true,
                    },
                  ],
                  hidden: { _code: 'return  getSettingValue(data?.hideLabel);', _mode: 'code', _value: false } as any,
                })
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: commonTabId,
                  inputs: [
                    {
                      type: 'numberField',
                      id: nanoid(),
                      propertyName: 'count',
                      label: 'Max Rating',
                      jsSetting: true,
                    },
                    {
                      type: 'iconPicker',
                      id: nanoid(),
                      propertyName: 'icon',
                      label: 'Icon',
                      jsSetting: true,
                    },
                  ],
                })
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: commonTabId,
                  inputs: [
                    {
                      type: 'editModeSelector',
                      id: nanoid(),
                      propertyName: 'editMode',
                      label: 'Edit Mode',
                      size: 'small',
                      defaultValue: 'inherited',
                      jsSetting: true,
                    },
                    {
                      type: 'switch',
                      id: nanoid(),
                      propertyName: 'hidden',
                      label: 'Hide',
                      size: 'small',
                      defaultValue: 'inherit',
                      jsSetting: true,
                    }
                  ]
                })
                .toJson()
            ]
          },
          {
            key: 'events',
            title: 'Events',
            id: eventsTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  inputType: 'codeEditor',
                  propertyName: 'onChangeCustom',
                  label: 'On Change',
                  labelAlign: 'right',
                  tooltip: 'Enter custom eventhandler on changing of event. (form, event) are exposed',
                  parentId: eventsTabId
                })
                .toJson()
            ]
          },
          {
            key: 'appearance',
            title: 'Appearance',
            id: appearanceTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addPropertyRouter({
                  id: 'styleRouter',
                  propertyName: 'propertyRouter1',
                  componentName: 'propertyRouter',
                  label: 'Property router1',
                  labelAlign: 'right',
                  parentId: 'elgrlievlfwehhh848r8hsdnflsdnclurbd',
                  hidden: false,
                  propertyRouteName: {
                    _mode: "code",
                    _code: "    return contexts.canvasContext?.designerDevice || 'desktop';",
                    _value: ""
                  },
                  components: [
                    ...new DesignerToolbarSettings()
                      .addCollapsiblePanel({
                        id: 'customStyleCollapsiblePanel',
                        propertyName: 'customStyle',
                        label: 'Custom Styles',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: 'styleRouter',
                        collapsible: 'header',
                        content: {
                          id: nanoid(),
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInput({
                              id: nanoid(),
                              inputType: 'codeEditor',
                              propertyName: 'style',
                              hideLabel: false,
                              label: 'Style',
                              description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                            })
                            .toJson()
                          ]
                        }
                      })
                      .toJson()
                  ]
                })
                .toJson()
            ]
          },
          {
            key: 'security',
            title: 'Security',
            id: securityTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  inputType: 'permissions',
                  propertyName: 'permissions',
                  label: 'Permissions',
                  size: 'small',
                  parentId: securityTabId,
                })
                .toJson()
            ]
          },
        ]
      })
      .toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  };
};