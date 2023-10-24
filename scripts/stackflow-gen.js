const fs = require('fs');
const path = require('path');

const activitiesFolder = path.resolve(__dirname, '../src/activities');
const allActivities = fs.readdirSync(activitiesFolder);

function generateStackflow() {
  const activitiesHavingMeta = allActivities.filter((activity) => {
    const fileContent = fs.readFileSync(path.resolve(activitiesFolder, activity, 'index.tsx'), 'utf8');
    return /^export const activityMeta.*/m.test(fileContent);
  });
  const metaImports = activitiesHavingMeta.reduce((acc, cur) => {
    acc += `import { activityMeta as ${cur}Meta } from '@/src/activities/${cur}';\n`;
    return acc;
  }, '');

  const activitiesHavingLoader = allActivities.filter((activity) => {
    const fileContent = fs.readFileSync(path.resolve(activitiesFolder, activity, 'index.tsx'), 'utf8');
    return fileContent.includes('export const activityLoader');
  });
  const loaderImports = activitiesHavingLoader.reduce((acc, cur) => {
    acc += `import { activityLoader as ${cur}Loader } from '@/src/activities/${cur}';\n`;
    return acc;
  }, '');

  const { activitiesHavingDynamicRoutes, activitiesHavingRoute } = allActivities.reduce(
    (current, activity) => {
      const fileContent = fs.readFileSync(path.resolve(activitiesFolder, activity, 'index.tsx'), 'utf8');
      const hasActivityUrl = fileContent.includes('export const activityUrl');
      if (!hasActivityUrl) {
        return current;
      }

      const result = /^export const activityUrl = (.*)$/gm.exec(fileContent);
      if (result && /:.+/.test(result[1])) {
        current.activitiesHavingDynamicRoutes.push(activity);
      } else {
        current.activitiesHavingRoute.push(activity);
      }

      return current;
    },
    {
      activitiesHavingRoute: [],
      activitiesHavingDynamicRoutes: [],
    }
  );

  const urlImports = activitiesHavingRoute.reduce((acc, cur) => {
    acc += `import { activityUrl as ${cur}Url } from '@/src/activities/${cur}';\n`;
    return acc;
  }, '');
  const dynamicUrlImports = activitiesHavingDynamicRoutes.reduce((acc, cur) => {
    acc += `import { activityUrl as ${cur}Url } from '@/src/activities/${cur}';\n`;
    return acc;
  }, '');

  return `/* eslint-disable */
/* generated by stackflow-gen.js */
import * as React from 'react';
import type { TypeActivitiesKeys, TypeMeta } from '@/src/stackflow/Stack';
${metaImports}
${loaderImports}
${urlImports}
${dynamicUrlImports}

const activities = {
  ${allActivities.reduce((acc, cur, index) => {
    if (index > 0) acc += '  ';
    acc += `${cur}: React.lazy(() => import('@/src/activities/${cur}')),`;
    if (index < allActivities.length - 1) acc += '\n';
    return acc;
  }, '')}
};

const metas: Partial<Record<TypeActivitiesKeys, TypeMeta<TypeActivitiesKeys>>> = {
  ${activitiesHavingMeta.reduce((acc, cur, index) => {
    if (index > 0) acc += '  ';
    acc += `${cur}: ${cur}Meta,`;
    if (index < activitiesHavingMeta.length - 1) acc += '\n';
    return acc;
  }, '')}
};

const loaders = {
  ${activitiesHavingLoader.reduce((acc, cur, index) => {
    if (index > 0) acc += '  ';
    acc += `${cur}: ${cur}Loader,`;
    if (index < activitiesHavingLoader.length - 1) acc += '\n';
    return acc;
  }, '')}
};

const routes = () => ({
  ${activitiesHavingRoute.reduce((acc, cur, index) => {
    if (index > 0) acc += '  ';
    acc += `${cur}: ${cur}Url,`;
    if (index < activitiesHavingRoute.length - 1) acc += '\n';
    return acc;
  }, '')}
  ${activitiesHavingDynamicRoutes.reduce((acc, cur, index) => {
    if (index > 0) acc += '  ';
    acc += `${cur}: ${cur}Url,`;
    if (index < activitiesHavingDynamicRoutes.length - 1) acc += '\n';
    return acc;
  }, '')}
})


export {
  activities,
  metas,
  loaders,
  routes,
};`;
}

const fileContent = generateStackflow();
fs.writeFileSync(path.resolve(__dirname, '../src/stackflow/_activities.ts'), fileContent);