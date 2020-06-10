import React, { useState, useEffect, useRef } from 'react'
import { useInterval } from './useInterval'
import TimeSet from './TimeSet'
import Timer from './Timer'
import Controls from './Controls'

import alarm from '../sounds/alarm.mp3'

const App = () => {
  const [breakVal, setBreakVal] = useState(5)
  const [sessionVal, setSessionVal] = useState(25)
  const [mode, setMode] = useState('session')
  const [time, setTime] = useState(sessionVal * 60 * 1000)
  const [active, setActive] = useState(false)
  const beep = useRef()

  
}
