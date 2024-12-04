import { nanoid } from '@/utils/uuid';
import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import {
  ALIGN_ITEMS,
  ALIGN_SELF,
  FLEX_DIRECTION,
  FLEX_WRAP,
  JUSTIFY_CONTENT,
  JUSTIFY_ITEMS,
  JUSTIFY_SELF,
  TEXT_JUSTIFY,
} from './data';


import { FormLayout } from 'antd/lib/form/Form';
import { getBorderInputs, getCornerInputs } from '../_settings/utils/border/utils';

export const getSettings = (data) => {

  return {

    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: 'W_m7doMyCpCYwAYDfRh6I',
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: '1',
            title: 'Common',
            id: 's4gmBg31azZC0UjZjpfTm',
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: '5c813b1a-04c5-4658-ac0f-cbcbae6b3bd4',
                propertyName: 'propertyName',
                label: 'Property Name',
                parentId: 's4gmBg31azZC0UjZjpfTm',
                size: 'small',
                validate: {
                  required: true,
                },
                jsSetting: true,
              })
              .addSettingsInputRow({
                id: '12d700d6-ed4d-49d5-9cfd-fe8f0060f3b6',
                parentId: 's4gmBg31azZC0UjZjpfTm',
                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                inputs: [
                  {
                    type: 'editModeSelector',
                    id: 'editMode-s4gmBg31azZC0UjZjpfTm',
                    propertyName: 'editMode',
                    label: 'Edit Mode',
                    size: 'small',
                    jsSetting: true,
                  },
                  {
                    type: 'switch',
                    id: 'hidden-s4gmBg31azZC0UjZjpfTm',
                    propertyName: 'hidden',
                    label: 'Hide',
                    jsSetting: true,
                    layout: 'horizontal',
                  },
                ],
              })
              .toJson()
            ]
          },
          {
            key: '2',
            title: 'Appearance',
            id: 'elgrlievlfwehhh848r8hsdnflsdnclurbd',
            components: [...new DesignerToolbarSettings()
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
                      id: 'displayCollapsiblePanel',
                      propertyName: 'pnlDisplayStyle',
                      label: 'Display',
                      labelAlign: 'right',
                      parentId: 'styleRouter',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'fontStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInput({
                            id: 'display-s4gmBg31azZC0UjZjpfTm',
                            propertyName: 'display',
                            label: 'Display',
                            parentId: 'displayCollapsiblePanel',
                            inputType: 'radio',
                            description: 'The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.',
                            validate: {
                              required: true,
                            },
                            buttonGroupOptions: [
                              { value: 'grid', title: 'Grid', icon: 'AppstoreOutlined' },
                              { value: 'block', title: 'Block', icon: 'BorderOutlined' },
                              { value: 'flex', title: 'Flex', icon: 'flex' },
                              { value: 'inline-grid', title: 'Inline Grid', icon: 'TableOutlined' }
                            ]
                          })
                          .addSettingsInputRow({
                            id: 'try26voxhs-HxJ5k5ngYE',
                            parentId: 'displayCollapsiblePanel',
                            inline: true,
                            hidden: {
                              _code: "return getSettingValue(data?.display) !== 'flex';",
                              _mode: 'code',
                              _value: false,
                            } as any,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'dropdown',
                                id: 'flex-direction-s4gmBg31azZC0UjZjpfTm',
                                label: 'Flex Direction',
                                propertyName: 'flexDirection',
                                hideLabel: true,
                                dropdownOptions: FLEX_DIRECTION,
                                description: 'The flex-direction CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).',

                              },
                              {
                                type: 'dropdown',
                                id: 'flex-wrap-s4gmBg31azZC0UjZjpfTm',
                                label: 'Flex Wrap',
                                propertyName: 'flexWrap',
                                hideLabel: true,
                                dropdownOptions: FLEX_WRAP
                              },
                            ],
                          })
                          .addSettingsInputRow({
                            id: nanoid(),
                            parentId: 'displayCollapsiblePanel',
                            inline: true,
                            hidden: {
                              _code: "return getSettingValue(data?.display) === 'block';",
                              _mode: 'code',
                              _value: false,
                            } as any,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'text',
                                id: 'gap-s4gmBg31azZC0UjZjpfTm',
                                label: 'Gap',
                                propertyName: 'gap',
                                description: 'Examples of a valid gap include: `10` | `10px` | `20px 20px`',
                              },
                              {
                                type: 'dropdown',
                                id: 'align-items-s4gmBg31azZC0UjZjpfTm',
                                label: 'Align Items',
                                propertyName: 'alignItems',
                                dropdownOptions: ALIGN_ITEMS
                              },
                              {
                                type: 'dropdown',
                                id: 'align-self-s4gmBg31azZC0UjZjpfTm',
                                label: 'Align Self',
                                propertyName: 'alignSelf',
                                dropdownOptions: ALIGN_SELF
                              },
                              {
                                type: 'dropdown',
                                id: 'justify-content-s4gmBg31azZC0UjZjpfTm',
                                label: 'Justify Content',
                                propertyName: 'justifyContent',
                                dropdownOptions: JUSTIFY_CONTENT
                              },
                              {
                                type: 'dropdown',
                                id: 'justify-self-s4gmBg31azZC0UjZjpfTm',
                                label: 'Justify Self',
                                propertyName: 'justifySelf',
                                dropdownOptions: JUSTIFY_SELF
                              },
                              {
                                type: 'dropdown',
                                id: 'text-justify-s4gmBg31azZC0UjZjpfTm',
                                label: 'Text Justify',
                                propertyName: 'textJustify',
                                dropdownOptions: TEXT_JUSTIFY
                              }
                            ],
                          })
                          .addSettingsInputRow({
                            id: nanoid(),
                            parentId: 'displayCollapsiblePanel',
                            inline: true,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'dropdown',
                                id: 'justify-items-s4gmBg31azZC0UjZjpfTm',
                                label: 'Justify Items',
                                propertyName: 'justifyItems',
                                dropdownOptions: JUSTIFY_ITEMS
                              },
                              {
                                type: 'dropdown',
                                id: 'overflow-s4gmBg31azZC0UjZjpfTm',
                                label: 'Overflow',
                                propertyName: 'overflow',
                                dropdownOptions: [
                                  {
                                    label: "Auto",
                                    value: "auto",
                                    id: nanoid()
                                  },
                                  {
                                    label: "Hidden",
                                    value: "hidden",
                                    id: nanoid()
                                  },
                                  {
                                    label: "Scroll",
                                    value: "scroll",
                                    id: nanoid()
                                  }
                                ]
                              }
                            ]
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'dimensionsStyleCollapsiblePanel',
                      propertyName: 'pnlDimensions',
                      label: 'Dimensions',
                      parentId: 'styleRouter',
                      labelAlign: 'right',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'dimensionsStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInputRow({
                            id: 'dimensionsStyleRowWidth',
                            parentId: 'dimensionsStylePnl',
                            inline: true,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'text',
                                id: 'width-s4gmBg31azZC0UjZjpfTm',
                                label: "Width",
                                width: 85,
                                propertyName: "dimensions.width",
                                icon: "width",
                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"

                              },
                              {
                                type: 'text',
                                id: 'minWidth-s4gmBg31azZC0UjZjpfTm',
                                label: "Min Width",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.minWidth",
                                icon: "minWidth",
                              },
                              {
                                type: 'text',
                                id: 'maxWidth-s4gmBg31azZC0UjZjpfTm',
                                label: "Max Width",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.maxWidth",
                                icon: "maxWidth",
                              }
                            ]
                          })
                          .addSettingsInputRow({
                            id: 'dimensionsStyleRowHeight',
                            parentId: 'dimensionsStylePnl',
                            inline: true,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'text',
                                id: 'height-s4gmBg31azZC0UjZjpfTm',
                                label: "Height",
                                width: 85,
                                propertyName: "dimensions.height",
                                icon: "height",
                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                              },
                              {
                                type: 'text',
                                id: 'minHeight-s4gmBg31azZC0UjZjpfTm',
                                label: "Min Height",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.minHeight",
                                icon: "minHeight",
                              },
                              {
                                type: 'text',
                                id: 'maxHeight-s4gmBg31azZC0UjZjpfTm',
                                label: "Max Height",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.maxHeight",
                                icon: "maxHeight",
                              }
                            ]
                          })
                          .addSettingsInput({
                            id: 'predefinedSizes',
                            inputType: 'dropdown',
                            propertyName: 'size',
                            label: 'Size',
                            width: '150px',
                            hidden: { _code: 'return  getSettingValue(data?.dimensions?.width) || getSettingValue(data?.dimensions?.height);', _mode: 'code', _value: false } as any,
                            dropdownOptions: [
                              { value: 'small', label: 'Small' },
                              { value: 'medium', label: 'Medium' },
                              { value: 'large', label: 'Large' },
                            ]
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'borderStyleCollapsiblePanel',
                      propertyName: 'pnlBorderStyle',
                      label: 'Border',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'borderStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInputRow({
                            id: `borderStyleRow`,
                            parentId: 'borderStylePnl',
                            hidden: { _code: 'return  !getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.border?.hideBorder);', _mode: 'code', _value: false } as any,
                            readOnly: { _code: 'return getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'button',
                                id: 'borderStyleRow-hideBorder',
                                label: "Border",
                                hideLabel: true,
                                propertyName: "border.hideBorder",
                                icon: "EyeOutlined",
                                iconAlt: "EyeInvisibleOutlined"
                              },
                            ]
                          })
                          .addSettingsInputRow(
                            getBorderInputs()[0] as any
                          )
                          .addSettingsInputRow(
                            getBorderInputs()[1] as any
                          )
                          .addSettingsInputRow(
                            getBorderInputs()[2] as any
                          )
                          .addSettingsInputRow(
                            getBorderInputs()[3] as any
                          )
                          .addSettingsInputRow(
                            getBorderInputs()[4] as any
                          )
                          .addSettingsInputRow(
                            getCornerInputs()[0] as any
                          )
                          .addSettingsInputRow(
                            getCornerInputs()[1] as any
                          )
                          .addSettingsInputRow(
                            getCornerInputs()[2] as any
                          )
                          .addSettingsInputRow(
                            getCornerInputs()[3] as any
                          )
                          .addSettingsInputRow(
                            getCornerInputs()[4] as any
                          )
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'backgroundStyleCollapsiblePanel',
                      propertyName: 'pnlBackgroundStyle',
                      label: 'Background',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'backgroundStylePnl',
                        components: [
                          ...new DesignerToolbarSettings()
                            .addSettingsInput({
                              id: "backgroundStyleRow-selectType",
                              parentId: "backgroundStylePnl",
                              label: "Type",
                              jsSetting: false,
                              propertyName: "background.type",
                              inputType: "radio",
                              tooltip: "Select a type of background",
                              buttonGroupOptions: [
                                {
                                  value: "color",
                                  icon: "FormatPainterOutlined",
                                  title: "Color"
                                },
                                {
                                  value: "gradient",
                                  icon: "BgColorsOutlined",
                                  title: "Gradient"
                                },
                                {
                                  value: "image",
                                  icon: "PictureOutlined",
                                  title: "Image"
                                },
                                {
                                  value: "url",
                                  icon: "LinkOutlined",
                                  title: "URL"
                                },
                                {
                                  value: "storedFile",
                                  icon: "DatabaseOutlined",
                                  title: "Stored File"
                                }
                              ],
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-color",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'color',
                                id: 'backgroundStyleRow-color',
                                label: "Color",
                                propertyName: "background.color",
                                hideLabel: true,
                                jsSetting: false,
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-gradientColors",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'multiColorPicker',
                                id: 'backgroundStyle-gradientColors',
                                propertyName: "background.gradient.colors",
                                label: "Colors",
                                jsSetting: false,
                              }
                              ],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                              hideLabel: true,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-url",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'text',
                                id: 'backgroundStyle-url',
                                propertyName: "background.url",
                                jsSetting: false,
                                label: "URL",
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-image",
                              parentId: 'backgroundStylePnl',
                              inputs: [{
                                type: 'imageUploader',
                                id: 'backgroundStyle-image',
                                propertyName: 'background.uploadFile',
                                label: "Image",
                                jsSetting: false,
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-storedFile",
                              parentId: 'backgroundStylePnl',
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                              inputs: [
                                {
                                  type: 'text',
                                  id: 'backgroundStyle-storedFile',
                                  jsSetting: false,
                                  propertyName: "background.storedFile.id",
                                  label: "File ID"
                                }
                              ]
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-controls",
                              parentId: 'backgroundStyleRow',
                              inline: true,
                              readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                              inputs: [
                                {
                                  type: 'customDropdown',
                                  id: 'backgroundStyleRow-size',
                                  label: "Size",
                                  hideLabel: true,
                                  propertyName: "background.size",
                                  dropdownOptions: [
                                    {
                                      value: "cover",
                                      label: "Cover"
                                    },
                                    {
                                      value: "contain",
                                      label: "Contain"
                                    },
                                    {
                                      value: "auto",
                                      label: "Auto"
                                    }
                                  ],
                                },
                                {
                                  type: 'customDropdown',
                                  id: 'backgroundStyleRow-position',
                                  label: "Position",
                                  hideLabel: true,
                                  propertyName: "background.position",
                                  dropdownOptions: [
                                    {
                                      value: "center",
                                      label: "Center"
                                    },
                                    {
                                      value: "top",
                                      label: "Top"
                                    },
                                    {
                                      value: "left",
                                      label: "Left"
                                    },
                                    {
                                      value: "right",
                                      label: "Right"
                                    },
                                    {
                                      value: "bottom",
                                      label: "Bottom"
                                    },
                                    {
                                      value: "top left",
                                      label: "Top Left"
                                    },
                                    {
                                      value: "top right",
                                      label: "Top Right"
                                    },
                                    {
                                      value: "bottom left",
                                      label: "Bottom Left"
                                    },
                                    {
                                      value: "bottom right",
                                      label: "Bottom Right"
                                    }
                                  ],
                                },
                                {
                                  type: 'dropdown',
                                  id: 'backgroundStyleRow-repeat',
                                  label: "Repeat",
                                  hideLabel: true,
                                  propertyName: "background.repeat",
                                  dropdownOptions: [
                                    {
                                      value: "repeat",
                                      label: "repeat"
                                    },
                                    {
                                      value: "repeat-x",
                                      label: "repeatX"
                                    },
                                    {
                                      value: "repeat-y",
                                      label: "repeatY"
                                    },
                                    {
                                      value: "no-repeat",
                                      label: "noRepeat"
                                    }
                                  ],
                                }
                              ]
                            })
                            .toJson()
                        ],
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'shadowStyleCollapsiblePanel',
                      propertyName: 'pnlShadowStyle',
                      label: 'Shadow',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'shadowStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInputRow({
                            id: 'shadowStyleRow',
                            parentId: 'shadowStylePnl',
                            inline: true,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'number',
                                id: 'shadowStyleRow-offsetX',
                                label: 'Offset X',
                                hideLabel: true,
                                width: 60,
                                icon: "offsetHorizontal",
                                propertyName: 'shadow.offsetX',
                              },
                              {
                                type: 'number',
                                id: 'shadowStyleRow-offsetY',
                                label: 'Offset Y',
                                hideLabel: true,
                                width: 60,
                                icon: 'offsetVertical',
                                propertyName: 'shadow.offsetY',
                              },
                              {
                                type: 'number',
                                id: 'shadowStyleRow-blurRadius',
                                label: 'Blur',
                                hideLabel: true,
                                width: 60,
                                icon: 'blur',
                                propertyName: 'shadow.blurRadius',
                              },
                              {
                                type: 'number',
                                id: 'shadowStyleRow-spreadRadius',
                                label: 'Spread',
                                hideLabel: true,
                                width: 60,
                                icon: 'spread',
                                propertyName: 'shadow.spreadRadius',
                              },
                              {
                                type: 'color',
                                id: 'shadowStyleRow-color',
                                label: 'Color',
                                hideLabel: true,
                                propertyName: 'shadow.color',
                              },
                            ],
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'styleCollapsiblePanel',
                      propertyName: 'stylingBox',
                      label: 'Margin & Padding',
                      labelAlign: 'right',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'stylePnl-M5-911',
                        components: [...new DesignerToolbarSettings()
                          .addStyleBox({
                            id: 'styleBoxPnl',
                            label: 'Margin Padding',
                            hideLabel: true,
                            propertyName: 'stylingBox',
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'customStyleCollapsiblePanel',
                      propertyName: 'customStyle',
                      label: 'Custom Style',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'stylePnl-M500-911MFR',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInput({
                            id: 'custom-class-412c-8461-4c8d55e5c073',
                            inputType: 'text',
                            propertyName: 'customCssClass',
                            label: 'Custom CSS Class',
                          })
                          .addSettingsInput({
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            id: 'custom-wrapper-css-412c-8461-4c8d55e5c073',
                            inputType: 'codeEditor',
                            propertyName: 'wrapperStyle',
                            label: 'Wrapper Style',
                            description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                          })
                          .addSettingsInput({
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            id: 'custom-css-412c-8461-4c8d55e5c073',
                            inputType: 'codeEditor',
                            propertyName: 'style',
                            label: 'Style',
                            description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                          })
                          .toJson()
                        ]
                      }
                    })
                    .toJson()]
              }).toJson()]
          },
          {
            key: '5',
            title: 'Security',
            id: '6Vw9iiDw9d0MD_Rh5cbIn',
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                id: '1adea529-1f0c-4def-bd41-ee166a5dfcd7',
                inputType: 'permissions',
                propertyName: 'permissions',
                label: 'Permissions',
                size: 'small',
                parentId: '6Vw9iiDw9d0MD_Rh5cbIn'
              })
              .toJson()
            ]
          }
        ]
      }).toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  };
};