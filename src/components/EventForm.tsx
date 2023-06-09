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
import { useEffect, useState } from "react"

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

export interface Submission {
  id: number
  name: string
  days: string[]
  startTime: string
  endTime: string
  location: string
  note: string
  color: string
}

interface EventFormProps {
  onValidSubmission?: (obj: Submission) => any
}

function EventForm({ onValidSubmission }: EventFormProps) {
  const { classes: checkboxClasses } = useCheckboxStyles()
  const { classes: paperClasses } = usePaperStyle()

  const [name, setName] = useState("")
  const [checkedDays, setCheckedDays] = useState<string[]>([])
  const [startTime, setStartTime] = useState<string | null>(null)
  const [endTime, setEndTime] = useState<string | null>(null)
  const [location, setLocation] = useState("")
  const [note, setNote] = useState("")
  const [color, setColor] = useState("")
  // TODO: consider using Mantine useForm hook
  // See https://mantine.dev/form/validation/
  const [validation, setValidation] = useState({
    name: false,
    day: false,
    time: false,
    submitCount: 0,
  })

  const validate = () => {
    setValidation({
      name: name.length === 0,
      day: checkedDays.length === 0,
      time: (startTime && endTime) === null,
      submitCount: validation.submitCount + 1,
    })
  }

  useEffect(() => {
    if (
      Object.values(validation).includes(true) ||
      validation.submitCount === 0 ||
      onValidSubmission === undefined
    ) {
      return
    } else {
      onValidSubmission({
        id: validation.submitCount,
        name: name,
        days: checkedDays,
        startTime: startTime || "",
        endTime: endTime || "",
        location: location,
        note: note,
        color: color,
      })
    }
  }, [validation])

  return (
    <Paper shadow="sm" radius="md" withBorder className={paperClasses.root}>
      <Title order={3}>Add event</Title>
      <TextInput
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder="Event name"
        label="Name"
        error={validation.name && "Please enter a name"}
      />

      <div>
        <Checkbox.Group
          spacing="xs"
          value={checkedDays}
          onChange={setCheckedDays}
          label="Day"
          offset={0}
          style={{ marginBottom: 5 }}
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
        {validation.day ? (
          <Text color="#ee5250" size="xs">
            Please choose at least one day
          </Text>
        ) : null}
      </div>

      <div>
        <Text size="sm">Time</Text>
        <Group sx={{ justifyContent: "space-between" }}>
          <Select
            value={startTime}
            onChange={setStartTime}
            aria-label="Start time"
            placeholder="Start time"
            searchable
            data={timesData}
            maxDropdownHeight={200}
            style={{ width: 128 }}
          />
          <Select
            value={endTime}
            onChange={setEndTime}
            aria-label="End time"
            placeholder="End time"
            searchable
            data={timesData}
            maxDropdownHeight={200}
            style={{ width: 128 }}
          />
        </Group>
      </div>

      <TextInput
        value={location}
        onChange={(e) => setLocation(e.currentTarget.value)}
        placeholder="Location (optional)"
        label="Location"
      />

      <TextInput
        value={note}
        onChange={(e) => setNote(e.currentTarget.value)}
        placeholder="Note (optional)"
        label="Note"
      />

      <ColorInput
        value={color}
        onChange={setColor}
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

      <Button onClick={validate}>Add event</Button>
    </Paper>
  )
}

export default EventForm
