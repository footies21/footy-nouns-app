// @ts-nocheck
const LOGGER_LEVEL = 0

export default function(level = 'DEBUG', ...args) {
  const numberLevel = {
    'DEBUG': 0,
    'INFO': 1,
    'WARNING': 2,
    'ERROR': 3
  }

  const numberRequested = numberLevel[level] || 0
  const actualNumber = numberLevel[LOGGER_LEVEL] || 0

  if(numberRequested >= actualNumber) {
    console.log.apply(null, args)
  }
}