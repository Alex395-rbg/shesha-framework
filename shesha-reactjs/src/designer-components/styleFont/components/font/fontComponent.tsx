import React, { FC } from 'react';
import { IFontValue } from './interfaces';
import { alignOptions, fontTypes, fontWeights } from './utils';
import { InputRow } from '@/designer-components/_settings/components/utils';

export interface IFontType {
    value?: IFontValue;
    readOnly?: boolean;
    model?: any;
    onChange?: (value: any) => void;
}

const FontComponent: FC<IFontType> = ({ model, onChange }) => {
    const { font: value, readOnly } = model;

    return (
        <>
            <InputRow inputs={[
                { label: 'Size', property: 'font.size', readOnly, value },
                { label: 'Font Weight', property: 'font.weight', type: 'dropdown', dropdownOptions: fontWeights, readOnly, value, onChange }
            ]} />
            <InputRow inputs={[
                { label: 'Color', property: 'font.color', type: 'color', readOnly, value },
                { label: 'Family', property: 'font.type', type: 'dropdown', dropdownOptions: fontTypes, readOnly, value }
            ]} />
            <InputRow inputs={[
                { label: 'Align', property: 'font.align', type: 'radio', buttonGroupOptions: alignOptions, readOnly, value, onChange }
            ]} />
        </>
    );
};

export default FontComponent;