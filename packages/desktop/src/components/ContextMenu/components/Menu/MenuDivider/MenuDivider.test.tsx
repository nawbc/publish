import { createContextContainer, tests } from '@mantine/tests';

import { Menu } from '../Menu';
import type { MenuDividerProps, MenuDividerStylesNames } from './MenuDivider';
import { MenuDivider } from './MenuDivider';

const TestContainer = createContextContainer(MenuDivider, Menu, {
  opened: true,
});

const defaultProps: MenuDividerProps = {};

describe('@mantine/core/MenuDivider', () => {
  tests.itSupportsSystemProps<MenuDividerProps, MenuDividerStylesNames>({
    component: TestContainer,
    props: defaultProps,
    styleProps: true,
    children: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@mantine/core/MenuDivider',
    stylesApiSelectors: ['divider'],
    stylesApiName: 'Menu',
    compound: true,
    providerStylesApi: false,
  });
});
