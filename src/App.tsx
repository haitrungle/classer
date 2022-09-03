import { Group, MantineProvider, Title } from "@mantine/core"
import TableSkeleton from "./components/Table"
import EventForm from "./components/EventForm"

export default function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "IBM Plex Sans, sans-serif",
        other: {
          cellHeight: 48,
          cellWidth: 200,
        },
      }}
    >
      <Title order={1}>Lichoc</Title>
      <Group style={{ alignItems: "flex-start" }}>
        <TableSkeleton timeStart={8} timeEnd={19} dayEnd={5} />
        <EventForm />
      </Group>
    </MantineProvider>
  )
}
