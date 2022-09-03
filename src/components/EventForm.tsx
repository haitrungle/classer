import {
  Button,
  Checkbox,
  CheckboxProps,
  ColorInput,
  createStyles,
  DEFAULT_THEME,
  Group,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useState } from "react"

import { daysOfWeekShort, timesData } from "@/helpers/time.helpers"

const useCheckboxStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  label: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    fontWeight: 700,
  },
  inner: {
    width: 30,
    height: 30,
  },
  input: {
    width: 30,
    height: 30,
  },
}))

const usePaperStyle = createStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
    padding: 12,
  },
}))

const noIcon: CheckboxProps["icon"] = ({ indeterminate, className }) => null

function EventForm() {
  const { classes: checkboxClasses } = useCheckboxStyles()
  const { classes: paperClasses } = usePaperStyle()

  const [startTime, setStartTime] = useState(0)

  const [checkedDays, setCheckedDays] = useState<string[]>([])

  return (
    <Paper shadow="sm" radius="md" withBorder className={paperClasses.root}>
      <Title order={3}>Add event</Title>
      <TextInput placeholder="Event name" label="Name" />

      <div>
        <Text size="sm">Day</Text>
        <Checkbox.Group
          spacing="xs"
          value={checkedDays}
          onChange={setCheckedDays}
          style={{ paddingTop: 0 }}
        >
          {daysOfWeekShort.map((day) => (
            <Checkbox
              key={day}
              icon={noIcon}
              value={day}
              label={day}
              classNames={checkboxClasses}
              styles={{
                label: {
                  color: checkedDays.includes(day) ? "white" : "inherit",
                },
              }}
            />
          ))}
        </Checkbox.Group>
      </div>

      <div>
        <Text size="sm">Time</Text>
        <Group sx={{ justifyContent: "space-between" }}>
          <Select
            aria-label="Start time"
            placeholder="Start time"
            searchable
            data={timesData}
            maxDropdownHeight={200}
            style={{ width: 128 }}
          />
          <Select
            aria-label="End time"
            placeholder="End time"
            searchable
            data={timesData}
            maxDropdownHeight={200}
            style={{ width: 128 }}
          />
        </Group>
      </div>

      <TextInput placeholder="Location (optional)" label="Location" />

      <TextInput placeholder="Notes (optional)" label="Notes" />

      <ColorInput
        placeholder="Pick color"
        label="Color"
        disallowInput
        withPicker={false}
        swatches={[
          ...DEFAULT_THEME.colors.red,
          ...DEFAULT_THEME.colors.green,
          ...DEFAULT_THEME.colors.blue,
        ]}
      />

      <Button>Add event</Button>
    </Paper>
  )
}

export default EventForm
