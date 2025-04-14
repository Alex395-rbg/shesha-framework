import { createStyles } from '@/styles';
import { CSSProperties } from 'react';

export const useStyles = createStyles(({ css, cx }, { style }: { style: CSSProperties }) => {

  const dropdown = cx("sha-dropdown", css`
    --ant-color-text: ${style.color} !important;
    --ant-font-size: ${style.fontSize} !important;
    --ant-font-weight-strong: ${style.fontWeight} !important;

    .ant-select-selection-item {
      font-weight: var(--ant-font-weight) !important;
    }
  `);

  return {
    dropdown
  };
});