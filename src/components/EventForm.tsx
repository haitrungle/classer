import { Button, Checkbox, CheckboxProps, ColorInput, createStyles, DEFAULT_THEME, Group, Paper, Select, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";

const daysOfWeekShort = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su']

const useCheckboxStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
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
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
    padding: 12,
  }
}))

const noIcon: CheckboxProps['icon'] = ({ indeterminate, className }) => null

const timeData = ['8:00', '8:15', '8:30', '8:45', '9:00']

function EventForm() {
  const { classes: checkboxClasses } = useCheckboxStyles()
  const { classes: paperClasses } = usePaperStyle()

  const initialCheckboxStates = Object.fromEntries(daysOfWeekShort.map(day => [day, false]))
  const [checkboxStates, setCheckboxStates] = useState(initialCheckboxStates)
  const toggleCheckbox = (day: string) =>
    setCheckboxStates({ ...checkboxStates, [day]: !checkboxStates[day]})

  const [startTime, setStartTime] = useState(0)

  return (
    <Paper shadow="sm" radius="md" withBorder className={paperClasses.root}>
      <Title order={3}>Add event</Title>
      <TextInput
        placeholder="Event name"
        label="Name"
      />
      
      <div>
        <Text size='sm'>Day</Text>
        <Group spacing="xs">
          {
            daysOfWeekShort.map(
              (day) => (
                <Checkbox
                  key={day}
                  checked={checkboxStates[day]}
                  onChange={() => { toggleCheckbox(day); console.log(checkboxStates) }}
                  icon={noIcon}
                  value={day.toLowerCase()}
                  label={day}
                  classNames={checkboxClasses}
                  styles={{ label: {color: checkboxStates[day] ? 'white' : 'inherit'} }}
                />
              )
            )
          }
        </Group>
      </div>

      <div>
        <Text size='sm'>Time</Text>
        <Group sx={{justifyContent: 'space-between'}}>
          <Select
            aria-label='Start time'
            placeholder='Start time'
            searchable
            data={timeData}
            maxDropdownHeight={200}
            style={{width: 128}}
          />
          <Select
            aria-label='End time'
            placeholder='End time'
            searchable
            data={timeData}
            maxDropdownHeight={200}
            style={{width: 128}}
          />
        </Group>
      </div>

      <TextInput
        placeholder='Location (optional)'
        label='Location'
      />

      <TextInput
        placeholder='Notes (optional)'
        label='Notes'
      />

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

      <Button>
        Add event
      </Button>
    </Paper>
  )
}

export default EventForm