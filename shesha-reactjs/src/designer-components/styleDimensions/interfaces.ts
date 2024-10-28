import { IConfigurableFormComponent } from "@/providers";

export interface IDimensionsProps extends IConfigurableFormComponent {
    value?: IDimensionsValue;
    onChange?: Function;
}

export interface IInputUnits {
    value: number;
    unit: string;
}

export interface IDimensionsValue {
    width?: IInputUnits;
    height?: IInputUnits;
    minWidth?: IInputUnits;
    minHeight?: IInputUnits;
    maxWidth?: IInputUnits;
    maxHeight?: IInputUnits;
    overflow?: string;
}

export interface IDimensionsType {
    readOnly?: boolean;
    value?: IDimensionsValue;
    noOverflow?: boolean;
}