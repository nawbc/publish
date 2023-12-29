import type { MantineStyleProps, MantineThemeColors } from '@mantine/core';
import { Accordion, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useMenus } from '~/use-menus';

import { navMenuTile } from './NavMenu.css';

export interface NavMenuTile {
  label: string;
  to?: string;
  replace?: boolean;
  type?: 'node' | 'link';
  icon?: React.ReactNode;
  color?: keyof MantineThemeColors;
  children?: NavMenuTile[];
  access?: string[];
  onClick?: () => Promise<void> | void;
}

const useActiveAccordion = function (menu: NavMenuTile[]) {
  const [value, setValue] = useState<string[]>([]);
  const location = useLocation();

  console.log(value);

  useEffect(() => {
    for (const item of menu) {
      if (Array.isArray(item.children)) {
        const r = item.children.find((e) => location.pathname.includes(e.to!));
        if (r) {
          setValue([...value, item.label]);
          break;
        }
      }
    }
  }, [location.pathname, menu, value]);

  return [value, setValue];
};

interface NavMenuTileProps {
  label: string;
  active: boolean;
}

const NavMenuTile: FC<NavMenuTileProps> = function ({ label, active }) {
  return (
    <UnstyledButton className={navMenuTile[active ? 'active' : 'inactive']}>
      <Text size="sm">{label}</Text>
    </UnstyledButton>
  );
};

interface NavMenuProps extends MantineStyleProps {}

export const NavMenu: FC<NavMenuProps> = function (props) {
  const menus = useMenus();
  const [activeList, setActiveList] = useActiveAccordion(menus);

  return (
    <Accordion
      disableChevronRotation
      chevronPosition="right"
      variant="contained"
      multiple
      mt={0}
      value={activeList as string[]}
      onChange={setActiveList as any}
      styles={(theme) => ({
        item: { borderBottom: 0 },
        contentInner: { padding: 0 },
        itemTitle: { borderRadius: theme.radius.sm, overflow: 'hidden' },
      })}
      {...props}
    >
      {menus.map((node: any) => {
        const children = node?.children;
        return (
          <Accordion.Item
            key={node.label}
            value={node.label}
            style={{
              border: 'none',
              backgroundColor: 'unset',
            }}
          >
            <Accordion.Control
              pl={8}
              onClick={(e) => {
                e.stopPropagation();
              }}
              chevron={children ? null : <span />}
              icon={
                <ThemeIcon color={node.color} variant="light">
                  {node.icon}
                </ThemeIcon>
              }
            >
              <Text w={500}>{node.label}</Text>
            </Accordion.Control>
            {children ? (
              <Accordion.Panel>
                {children?.map((sub: any) => {
                  return (
                    <NavLink
                      style={{ textDecoration: 'none' }}
                      key={sub.label}
                      to={sub.to}
                    >
                      {({ isActive }) => (
                        <NavMenuTile active={isActive} label={sub.label} />
                      )}
                    </NavLink>
                  );
                })}
              </Accordion.Panel>
            ) : null}
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};
