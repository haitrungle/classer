import { MantineProvider, Title } from '@mantine/core';
import TableSkeleton from './components/Table';

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS
      theme={{
        fontFamily: 'IBM Plex Sans, sans-serif',
        fontSizes: {
          xs: 12,
          sm: 16,
          md: 20,
          lg: 24,
          xl: 32,
        },
        other: {
          cellHeight: 48,
        },
      }}
    >
      <Title order={1}>Lichoc</Title>
      <TableSkeleton timeStart={8} timeEnd={18} dayEnd={5} />
    </MantineProvider>
  );
}