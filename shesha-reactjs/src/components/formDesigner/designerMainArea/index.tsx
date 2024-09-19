import { ComponentPropertiesTitle } from '../componentPropertiesTitle';
import ParentProvider from '@/providers/parentProvider';
import React, { FC, useEffect, useMemo } from 'react';
import Toolbox from '../toolbox';
import { ConfigurableFormRenderer, SidebarContainer } from '@/components';
import { DebugPanel } from '../debugPanel';
import { MetadataProvider, useCanvasConfig, useForm } from '@/providers';
import { useFormDesignerState } from '@/providers/formDesigner';
import { useStyles } from '../styles/styles';
import { ComponentPropertiesPanel } from '../componentPropertiesPanel';
import ConditionalWrap from '@/components/conditionalWrapper';

export interface IDesignerMainAreaProps {

}

export const DesignerMainArea: FC<IDesignerMainAreaProps> = () => {
    const { isDebug, readOnly } = useFormDesignerState();
    const { form, formMode, formSettings } = useForm();
    const { width, zoom, activeDevice } = useCanvasConfig();
    const { styles } = useStyles();

    const mockWindowWidth = (width: number) => {
        const originalInnerWidth = window.innerWidth;
        const originalInnerHeight = window.innerHeight;
      
        Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
        Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true });
      
        window.dispatchEvent(new Event('resize'));
      
        return () => {
          Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth, configurable: true });
          Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight, configurable: true });
          window.dispatchEvent(new Event('resize'));
        };
      };


      useEffect(()=>{
        if(activeDevice === 'mobile'){
            mockWindowWidth(600);
        }else if(activeDevice === 'tablet'){
            mockWindowWidth(924);
        }else{
            mockWindowWidth(1200);
        }
      },[activeDevice]);

    const magnifiedWidth = useMemo(() => width * (zoom / 100), [width, zoom]);

    const customWidth = useMemo(() => {
        if (activeDevice === 'mobile' || activeDevice === 'tablet') {
            return `${width}px`;
        }
        return `${magnifiedWidth}%`;
    }, [activeDevice, magnifiedWidth]);

    return (
        <div className={styles.mainArea}>
            <SidebarContainer
                leftSidebarProps={
                    readOnly
                        ? null
                        : {
                            title: 'Builder Widgets',
                            content: () => <Toolbox />,
                            placeholder: 'Builder Widgets',
                        }
                }
                rightSidebarProps={{
                    title: () => <ComponentPropertiesTitle />,
                    content: () => <ComponentPropertiesPanel />,
                    placeholder: 'Properties',
                }}
            >
                <div style={{ width: customWidth, zoom: `${zoom}%`, overflow: 'auto', margin: '0 auto' }}>
                    <ConditionalWrap
                        condition={Boolean(formSettings?.modelType)}
                        wrap={(children) => (<MetadataProvider modelType={formSettings?.modelType}>{children}</MetadataProvider>)}
                    >
                        <ParentProvider model={{}} formMode='designer'>
                            <ConfigurableFormRenderer form={form} className={formMode === 'designer' ? styles.designerWorkArea : undefined}  >
                                {isDebug && (
                                    <DebugPanel formData={form.getFieldValue([])} />
                                )}
                            </ConfigurableFormRenderer>
                        </ParentProvider>
                    </ConditionalWrap>

                </div>
            </SidebarContainer>
        </div>
    );
};
