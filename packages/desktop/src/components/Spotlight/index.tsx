import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

const data = [
  'Home',
  'About us',
  'Contacts',
  'Blog',
  'Careers',
  'Terms of service',
];

export const PublishSpotlight = function () {
  const [query, setQuery] = useState('');
  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action key={item} label={item} />);

  return (
    <Spotlight.Root
      shadow={`0px 0px 100vw #B2B2B253`}
      shortcut={['mod + P']}
      query={query}
      onQueryChange={setQuery}
      lockScroll
      withOverlay={false}
      radius="md"
    >
      <Spotlight.Search
        onBlur={() => spotlight.close()}
        placeholder="Search..."
        leftSection={<IconSearch stroke={1.5} />}
      />
      <Spotlight.ActionsList>
        {items.length > 0 ? (
          items
        ) : (
          <Spotlight.Empty>Nothing found...</Spotlight.Empty>
        )}
      </Spotlight.ActionsList>
    </Spotlight.Root>
  );
};
