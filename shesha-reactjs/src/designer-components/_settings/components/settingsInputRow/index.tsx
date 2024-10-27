import React from 'react';

import { IConfigurableFormComponent, IToolboxComponent } from "@/interfaces";
import { SettingOutlined } from "@ant-design/icons";
import { IInputRowProps, InputRow } from "../utils";

export interface ISettingsInputRowProps extends Omit<IConfigurableFormComponent, 'label' | 'layout' | 'readOnly' | 'style' | 'propertyName'>, IInputRowProps {

}

const SettingsInputRow: IToolboxComponent<ISettingsInputRowProps> = {
    type: 'settingsInputRow',
    isInput: true,
    isOutput: true,
    name: 'SettingsInputRow',
    icon: <SettingOutlined />,
    Factory: ({ model }) => {
        return model.hidden ? null : (
            <InputRow readOnly={model.readOnly} inputs={model.inputs.map(input => {
                const { label, propertyName, inputType, readOnly } = input;
                return { label, propertyName, readOnly, inputType };
            })} />
        );
    }
};

export default SettingsInputRow;
