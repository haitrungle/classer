import { Group, MantineProvider, Title } from "@mantine/core"
import TableSkeleton from "./components/Table"
import EventForm, { Submission } from "./components/EventForm"
import { useState } from "react"

export default function App() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "IBM Plex Sans, sans-serif",
        other: {
          cellHeight: 60,
          cellWidth: 200,
        },
      }}
    >
      <Title order={1}>Lichoc</Title>
      <Group style={{ alignItems: "flex-start" }}>
        <TableSkeleton
          timeStart={8}
          timeEnd={19}
          dayEnd={5}
          submissions={submissions}
        />
        <EventForm
          onValidSubmission={(data) => setSubmissions([...submissions, data])}
        />
      </Group>
    </MantineProvider>
  )
}
