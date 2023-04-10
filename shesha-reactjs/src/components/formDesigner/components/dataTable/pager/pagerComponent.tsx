import { IToolboxComponent } from '../../../../../interfaces';
import { IConfigurableFormComponent } from '../../../../../providers/form/models';
import { ControlOutlined } from '@ant-design/icons';
import { useForm } from '../../../../../providers/form';
import { getSettings } from './settingsForm';
import { ITablePagerProps, TablePager } from '../../../../../';
import React from 'react';
import { validateConfigurableComponentSettings } from '../../../../../providers/form/utils';

export interface IPagerComponentProps extends ITablePagerProps, IConfigurableFormComponent {}

const PagerComponent: IToolboxComponent<IPagerComponentProps> = {
  type: 'datatable.pager',
  name: 'Table Pager',
  icon: <ControlOutlined />,
  factory: (model: IPagerComponentProps) => {
    const { isComponentHidden } = useForm();

    if (isComponentHidden(model)) return null;

    return <TablePager {...model} />;
  },
  migrator:  m => m
  .add<IPagerComponentProps>(0, prev => {
    return {
      ...prev,
      showSizeChanger: true,
      showTotalItems: true,
      items: [],
    };
  }),
  settingsFormMarkup: context => getSettings(context),
  validateSettings: model => validateConfigurableComponentSettings(getSettings(model), model),
};

export default PagerComponent;
