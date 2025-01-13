import ComponentsContainer from '@/components/formDesigner/containers/componentsContainer';
import React, { Fragment, useEffect, useState } from 'react';
import ShaIcon from '@/components/shaIcon';
import { FolderOutlined } from '@ant-design/icons';
import { getActualModelWithParent, getLayoutStyle, getStyle, useAvailableConstantsData } from '@/providers/form/utils';
import { IFormComponentContainer } from '@/providers/form/models';
import { ITabsComponentProps } from './models';
import { IToolboxComponent } from '@/interfaces';
import { migrateCustomFunctions, migratePropertyName, migrateReadOnly } from '@/designer-components/_common-migrations/migrateSettings';
import { nanoid } from '@/utils/uuid';
import { ConfigProvider, Tabs, TabsProps } from 'antd';
import { useDeepCompareMemo } from '@/hooks';
import { useFormData, useGlobalState, useSheshaApplication } from '@/providers';
import ParentProvider from '@/providers/parentProvider/index';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { removeComponents } from '../_common-migrations/removeComponents';
import { getSettings } from './settingsForm';
import { getShadowStyle } from '../_settings/utils/shadow/utils';
import { getFontStyle } from '../_settings/utils/font/utils';
import { getBorderStyle } from '../_settings/utils/border/utils';
import { getSizeStyle } from '../_settings/utils/dimensions/utils';
import { initializeStyles, migratePrevStyles } from '../_common-migrations/migrateStyles';
import { defaultCardStyles, defaultStyles } from './utils';
import { getBackgroundImageUrl, getBackgroundStyle } from '../_settings/utils/background/utils';
import { useStyles } from './styles';

type TabItem = TabsProps['items'][number];

const TabsComponent: IToolboxComponent<ITabsComponentProps> = {
  type: 'tabs',
  isInput: false,
  name: 'Tabs',
  icon: <FolderOutlined />,
  Factory: ({ model }) => {
    const { backendUrl, httpHeaders, anyOfPermissionsGranted } = useSheshaApplication();
    const allData = useAvailableConstantsData();
    const { data } = useFormData();
    const { globalState } = useGlobalState();


    const { tabs, defaultActiveKey, tabType = 'card', size, tabPosition = 'top' } = model;

    const actionKey = defaultActiveKey || (tabs?.length && tabs[0]?.key);

    const [finalStyle, setFinalStyle] = useState<React.CSSProperties>({});
    const [cardFinalStyle, setCardFinalStyle] = useState<React.CSSProperties>({});

    const jsStyle = getStyle(model.style);
    const dimensions = model.dimensions;
    const border = model?.border;
    const font = model?.font;
    const shadow = model?.shadow;

    const dimensionsStyles = getSizeStyle(dimensions);
    const borderStyles = getBorderStyle(border, jsStyle);
    const fontStyles = getFontStyle(font);
    const shadowStyles = getShadowStyle(shadow);

    const cardJsStyle = getStyle(model?.card?.style, data);
    const cardDimensions = model?.card?.dimensions;
    const cardBorder = model?.card?.border;
    const cardFont = model?.card?.font;
    const cardShadow = model?.card?.shadow;

    const cardDimensionsStyles = getSizeStyle(cardDimensions);
    const cardBorderStyles = getBorderStyle(cardBorder, cardJsStyle);
    const cardFontStyles = getFontStyle(cardFont);
    const cardShadowStyles = getShadowStyle(cardShadow);

    const style = {
      ...dimensionsStyles,
      ...borderStyles,
      ...fontStyles,
      ...shadowStyles,
      ...jsStyle,
    };

    const cardStyle = {
      ...cardDimensionsStyles,
      ...cardBorderStyles,
      ...cardFontStyles,
      ...cardShadowStyles,
      ...cardJsStyle,
    };

    useEffect(() => {
      const fetchTabStyles = async () => {
        const background = model?.background;
        const cardBackground = model?.card?.background;

        // Fetch background style asynchronously
        const storedImageUrl = await getBackgroundImageUrl(background, backendUrl, httpHeaders);
        const cardStoredImageUrl = await getBackgroundImageUrl(cardBackground, backendUrl, httpHeaders);

        const backgroundStyle = await getBackgroundStyle(background, jsStyle, storedImageUrl);
        const cardBackgroundStyle = await getBackgroundStyle(cardBackground, cardJsStyle, cardStoredImageUrl);

        setCardFinalStyle({ ...cardStyle, ...cardBackgroundStyle });
        setFinalStyle({ ...style, ...backgroundStyle });
      };

      fetchTabStyles();
    }, [model.background, model?.card?.background, backendUrl, httpHeaders, jsStyle]);

    const { styles } = useStyles({ styles: finalStyle, cardStyles: cardFinalStyle, tabPosition });

    const items = useDeepCompareMemo(() => {
      const tabItems: TabItem[] = [];

      (tabs ?? [])?.forEach((item) => {
        const tabModel = getActualModelWithParent({ ...item, type: '' }, allData, { model: { readOnly: item.readOnly } });
        const {
          id,
          key,
          title,
          icon,
          closable,
          className,
          forceRender,
          animated,
          destroyInactiveTabPane,
          closeIcon,
          permissions,
          hidden,
          readOnly,
          selectMode,
          components,
        } = tabModel;

        const granted = anyOfPermissionsGranted(permissions || []);
        if ((!granted || hidden) && allData.form?.formMode !== 'designer') return;

        const tab: TabItem = {
          key: key,
          label: icon ? (
            <Fragment>
              <ShaIcon iconName={icon as any} /> {title}
            </Fragment>
          ) : (
            <Fragment>
              {icon} {title}
            </Fragment>
          ),
          closable: closable,
          className: className,
          forceRender: forceRender,
          animated: animated,
          destroyInactiveTabPane: destroyInactiveTabPane,
          closeIcon: closeIcon ? <ShaIcon iconName={closeIcon as any} /> : null,
          disabled: selectMode === 'readOnly' || selectMode === 'inherited' && readOnly,
          style: getLayoutStyle(tabModel, { data, globalState }),
          children: (
            <ParentProvider model={tabModel}>
              <ComponentsContainer containerId={id} dynamicComponents={model?.isDynamic ? components : []} />
            </ParentProvider>
          ),
        };
        tabItems.push(tab);
      });

      return tabItems;
    }, [tabs, model.readOnly, allData.contexts.lastUpdate, allData.data, allData.form?.formMode, allData.globalState, allData.selectedRow]);

    return model.hidden ? null : (
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardBg: 'none',
              itemColor: finalStyle.color,
              titleFontSize: Number(finalStyle.fontSize),

            }
          },
        }}
      >
        <Tabs defaultActiveKey={actionKey} size={size} type={tabType} tabPosition={tabPosition} items={items} className={styles.content} />
      </ConfigProvider>
    );
  },
  initModel: (model) => {
    const tabsModel: ITabsComponentProps = {
      ...model,
      propertyName: 'custom Name',
      stylingBox: "{\"marginBottom\":\"5\"}",
      tabPosition: "top",
      tabs: [{ id: nanoid(), label: 'Tab 1', title: 'Tab 1', key: 'tab1', components: [], type: '' }],
    };
    return tabsModel;
  },
  migrator: (m) => m
    .add<ITabsComponentProps>(0, (prev) => {
      const newModel = { ...prev };
      newModel['tabs'] = prev['tabs']?.map((item) => migrateCustomFunctions(item as any));
      return migratePropertyName(migrateCustomFunctions(newModel)) as ITabsComponentProps;
    })
    .add<ITabsComponentProps>(1, (prev) => {
      const newModel = { ...prev };
      newModel.tabs = newModel.tabs.map(x => migrateReadOnly(x, 'inherited'));
      return newModel;
    })
    .add<ITabsComponentProps>(2, (prev) => ({ ...migrateFormApi.properties(prev) }))
    .add<ITabsComponentProps>(3, (prev) => removeComponents(prev))
    .add<ITabsComponentProps>(4, (prev) => {
      const newModel = migratePrevStyles(prev, defaultStyles);
      return {
        ...newModel,
        card: { ...initializeStyles(prev.card, defaultCardStyles) },
        desktop: { ...newModel.desktop, card: { ...initializeStyles(prev.card, defaultCardStyles) } },
        tablet: { ...newModel.tablet, card: { ...initializeStyles(prev.card, defaultCardStyles) } },
        mobile: { ...newModel.mobile, card: { ...initializeStyles(prev.card, defaultCardStyles) } }
      };
    }),
  settingsFormMarkup: () => getSettings(),
  customContainerNames: ['tabs'],
  getContainers: (model) => {
    return model.tabs.map<IFormComponentContainer>((t) => ({ id: t.id }));
  },
};

export default TabsComponent;
