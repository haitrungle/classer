import { createStyles } from '@mantine/core'

interface TableSkeletonProps {
  timeStart: number
  timeEnd: number
  dayEnd: 5 | 6 | 7
}

const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const range = (start: number, stop: number, step: number = 1) => 
  Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

const useStyles = createStyles((theme) => ({
  table: {
    width: '100%',
  },
  tr: {
    height: theme.other.cellHeight,
  },
  tdTime: {
    fontSize: theme.fontSizes.sm,
    width: '6rem',
    textAlign: 'right',
    transform: `translate(-8px, ${-theme.other.cellHeight/2}px)`,
  },
  td: {
    borderTop: '1px dashed black',
  },
}))

function TableSkeleton({ timeStart, timeEnd, dayEnd }: TableSkeletonProps) {
  const { classes } = useStyles()
  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.tr}>
          <th></th>
          {
            weekdayNames.slice(0, dayEnd).map(
              (day) => <th key={day}>{day}</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          range(timeStart, timeEnd).map(
            (t) => (
              <tr className={classes.tr}>
                <td scope="row" key={t} className={classes.tdTime}>
                  {`${t}:00`}
                </td>
                <td colSpan={dayEnd} className={classes.td}></td>
              </tr>
            )
          )
        }
      </tbody>
    </table>
  )
}

export default TableSkeleton