"use client";

import React, { FC } from 'react';
import { FormIdentifier } from '@/interfaces';
import { DynamicPage } from '@/generic-pages/dynamic';
import { notFound } from 'next/navigation';
import { DataContextProvider } from '@/providers/dataContextProvider';

interface PageProps {
  params: { path: string[] };
  searchParams: NodeJS.Dict<string | string[]>;
}

const DynamicPageInternal: FC<PageProps> = (props) => {
  const { params, searchParams } = props;

  // possible values of path:
  // 1. array with one element: [formName]
  // 2. array with two elements: [moduleName, formName]
  const fullPath = params.path && Array.isArray(params.path)
    ? params.path.length === 1
      ? [null, params.path[0]]
      : params.path.length === 2
        ? [params.path[0], params.path[1]]
        : [null, null]
    : [null, null];
  const moduleName = fullPath[0];
  const formName = fullPath[1];

  if (!formName)
    return notFound();

  const formId: FormIdentifier = {
    module: moduleName, 
    name: formName
  };

  return (
    <DataContextProvider id={'formContext'} name={'formContext'} type={'form'}>
      <DynamicPage {...searchParams} formId={ formId }/>
    </DataContextProvider>            
  );
};

export default DynamicPageInternal;