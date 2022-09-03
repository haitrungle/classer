import { Card, createStyles, ScrollArea, Text } from "@mantine/core"
import { range } from "@/utils"
import { dayIndex, daysOfWeek, timeToNumber } from "@/helpers/time.helpers"
import { Submission } from "./EventForm"

interface TableSkeletonProps {
  timeStart: number
  timeEnd: number
  dayEnd: 5 | 6 | 7
  submissions: Submission[]
}

const useTableStyles = createStyles((theme) => ({
  container: {
    position: "relative",
  },
  table: {
    borderCollapse: "collapse",
    width: "100%",
    minWidth: theme.other.cellWidth * (5 + 1 / 2.5),
  },
  tr: {
    height: theme.other.cellHeight,
  },
  thTime: {
    width: theme.other.cellWidth / 2.5,
  },
  thDay: {
    width: theme.other.cellWidth,
  },
  tdTime: {
    fontSize: theme.fontSizes.sm,
    textAlign: "right",
    transform: `translate(-8px, ${-theme.other.cellHeight / 2}px)`,
  },
  td: {
    borderTop: "1px dashed black",
  },
}))

interface CardParams {
  offsetX: number
  offsetY: number
  height: number
}

const useCardStyles = createStyles(
  (theme, { offsetX, offsetY, height }: CardParams) => ({
    card: {
      position: "absolute",
      zIndex: 10,
      left: (1 / 2.5 + offsetX) * theme.other.cellWidth + 4,
      top: (1 + offsetY) * theme.other.cellHeight + 4,
      width: 200 - 8,
      height: height * theme.other.cellHeight - 8,
    },
  })
)

interface EventCardProps {
  submission: Submission
  cardParams: CardParams
}

function EventCard({ submission, cardParams }: EventCardProps) {
  const { classes } = useCardStyles(cardParams)
  console.log(submission.days)
  console.log(cardParams)
  return (
    <Card
      shadow="xs"
      withBorder
      style={{ textAlign: "center", padding: 8 }}
      className={classes.card}
    >
      <Text weight={700}>{submission.name}</Text>
      <Text>{submission.location}</Text>
      <Text>{submission.note}</Text>
    </Card>
  )
}

function TableSkeleton({
  timeStart: timeStartTable,
  timeEnd: timeEndTable,
  dayEnd,
  submissions,
}: TableSkeletonProps) {
  const { classes } = useTableStyles()

  console.log(submissions)

  return (
    <ScrollArea>
      <div className={classes.container}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tr}>
              <th className={classes.thTime}></th>
              {daysOfWeek.slice(0, dayEnd).map((day) => (
                <th key={day} className={classes.thDay}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {range(timeStartTable, timeEndTable).map((t) => (
              <tr key={t} className={classes.tr}>
                <td scope="row" className={classes.tdTime}>
                  {`${t}:00`}
                </td>
                <td colSpan={dayEnd} className={classes.td}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {submissions
        .map((s) =>
          s.days.map((day) => (
            <EventCard
              key={`${s.name}_${day}_${s.startTime}-${s.endTime}`}
              submission={s}
              cardParams={{
                offsetX: dayIndex(day),
                offsetY: timeToNumber(s.startTime) - timeStartTable,
                height: timeToNumber(s.endTime) - timeToNumber(s.startTime),
              }}
            />
          ))
        )
        .flat()}
    </ScrollArea>
  )
}

export default TableSkeleton
