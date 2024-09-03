import React, { FC, useState } from 'react';
import { ColorPicker as AntdColorPicker } from 'antd';
import { ColorValueType } from 'antd/es/color-picker/interface';
import { Color } from 'antd/es/color-picker/color';
import type { ColorPickerProps } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

type Preset = Required<ColorPickerProps>['presets'][number];
type ColorFormat = ColorPickerProps['format'];

export interface IColorPickerProps {
  value?: ColorValueType;
  onChange?: (color: ColorValueType) => void;
  title?: string;
  presets?: Preset[];
  showText?: boolean;
  allowClear?: boolean;
  disabledAlpha?: boolean;
  readOnly?: boolean;
  size?: SizeType;
}

const formatColor = (color: Color, format: ColorFormat) => {
  if (!color)
    return null;

  switch (format) {
    case 'hex': return color.toHexString();
    case 'hsb': return color.toHsbString();
    case 'rgb': return color.toRgbString();
  }
};

export const ColorPicker: FC<IColorPickerProps> = ({ value, onChange, title, presets, showText, allowClear, disabledAlpha, readOnly, size }) => {
  const [format, setFormat] = useState<ColorFormat>('hex');

  const handleChange = (value: Color) => {
    const formattedValue = formatColor(value, format);
    onChange(formattedValue);
  };

  const handleClear = () => {
    onChange(null);
  };

  const onPanelClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <AntdColorPicker
      format={format}
      onFormatChange={setFormat}
      disabledAlpha={disabledAlpha}
      showText={value && showText}
      allowClear={allowClear}
      disabled={readOnly}
      onClear={handleClear}
      value={value ?? ""}
      onChange={handleChange}
      presets={presets}
      size={size}
      panelRender={(panel) => (
        <div onClick={onPanelClick}>
          {title && (
            <div
              style={{
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.88)',
                lineHeight: '20px',
                marginBottom: 8,
              }}
            >
              {title}
            </div>

          )}
          {panel}
        </div>
      )}
    />
  );
};