import { Card, createStyles, ScrollArea } from '@mantine/core'

interface TableSkeletonProps {
  timeStart: number
  timeEnd: number
  dayEnd: 5 | 6 | 7
}

const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const range = (start: number, stop: number, step: number = 1) => 
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
  },
  table: {
    borderCollapse: 'collapse',
    width: 1100,
  },
  tr: {
    height: theme.other.cellHeight,
  },
  thTime: {
    width: theme.other.cellWidth / 3,
  },
  thDay: {
    width: theme.other.cellWidth,
  },
  tdTime: {
    fontSize: theme.fontSizes.sm,
    textAlign: 'right',
    transform: `translate(-8px, ${-theme.other.cellHeight/2}px)`,
  },
  td: {
    borderTop: '1px dashed black',
  },
  cell: {
    position: 'absolute',
    zIndex: 10,
    width: 200 - 16,
    height: 3 * theme.other.cellHeight - 4,
    top: 2 * theme.other.cellHeight + 2,
    left: theme.other.cellWidth / 3 + 8,
  }
}))

function TableSkeleton({ timeStart, timeEnd, dayEnd }: TableSkeletonProps) {
  const { classes } = useStyles()
  return (
    <ScrollArea>
        <div className={classes.container}>
        <table className={classes.table}>
          <thead>
            <tr className={classes.tr}>
              <th className={classes.thTime}></th>
              {
                weekdayNames.slice(0, dayEnd).map(
                  (day) => <th key={day} className={classes.thDay}>{day}</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              range(timeStart, timeEnd).map(
                (t) => (
                  <tr key={t} className={classes.tr}>
                    <td scope="row" className={classes.tdTime}>
                      {`${t}:00`}
                    </td>
                    <td colSpan={dayEnd} className={classes.td}></td>
                  </tr>
                )
              )
            }
          </tbody>
        </table>
        <Card shadow="xs" withBorder className={classes.cell}>
          Testing
        </Card>
      </div>
    </ScrollArea>
  )
}

export default TableSkeleton