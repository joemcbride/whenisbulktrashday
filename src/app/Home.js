import React from 'react'
import moment from 'moment'
import Grid from './core/Grid'
import Row from './core/Row'
import Col from './core/Col'
import Hero from './core/Hero'
import appStyles from './App.scss'
import styles from './Home.scss'

const PickupDay = 'Tuesday'
const Area = 'Madeira Canyon'

const Schedule = ({ dates }) => {
  const displayDates = dates.map((day, i) => (<li key={i}>{day.format('MMMM Do YYYY')}</li>))
  return (
    <ul className={styles.dateList}>
      <li className={styles.scheduleTitle}>Next Pickup Dates</li>
      {displayDates}
    </ul>
  )
}
Schedule.propTypes = {
  dates: React.PropTypes.arrayOf(React.PropTypes.object)
}

function equalOrAfterDate(a, b) {
  return a.format('YYYY-MM-DD') === b.format('YYYY-MM-DD') || a.isAfter(b)
}

function getBulkTrashDates(start) {
  let startDay = start
  const today = moment()
  const dates = []

  if (equalOrAfterDate(startDay, today)) {
    dates.push(startDay)
  }

  let count = 6

  while (true && count > 0) {
    const newday = startDay.clone()
    newday.add(14, 'days')
    startDay = newday

    if (equalOrAfterDate(newday, today)) {
      dates.push(newday)
      count -= 1
    }
  }

  return dates
}

function isItBulkTrashDay(dates, start) {
  // console.log('start', start.format('MMMM Do YYYY'))
  const tuesday = start.clone().day(PickupDay)

  // if the current weeks PickupDay is past, get next weeks
  if (tuesday < start) {
    tuesday.add(7, 'days')
  }

  // console.log(PickupDay, tuesday.format('MMMM Do YYYY'))

  return dates.filter(date => date.isSame(tuesday, 'day')).length > 0
}

const Home = () => {
  const cadenceStartDay = moment('2017-07-11T00:00:00')
  // const today = moment('2016-10-10T:00:00:00')
  const today = moment()
  const dates = getBulkTrashDates(cadenceStartDay)
  const isPickupDay = isItBulkTrashDay(dates, today)
  const isPickupDayText = isPickupDay ? 'YES' : 'NO'

  const isTodayTheDayOfWeek = today.day() === today.clone().day(PickupDay).day()

  // console.log('dates', dates)
  // console.log('is today the day?', isTodayTheDayOfWeek)

  const subTitle = isTodayTheDayOfWeek
    ? `Is ${PickupDay} (Today) a bulk trash pickup day in ${Area}?`
    : `Is the coming ${PickupDay} a bulk trash pickup day in ${Area}?`

  const mainBackground = isPickupDay ? styles.yes : styles.no

  return (
    <div className={mainBackground}>
      <Hero title={isPickupDayText} subTitle={subTitle}/>
      <div className={appStyles.content}>
        <Grid>
          <Row>
            <Col col={12}>
              <Schedule dates={dates}/>
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  )
}

export default Home
