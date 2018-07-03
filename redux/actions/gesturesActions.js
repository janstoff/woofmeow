export const SWITCH_SCROLLING_OFF = 'SWITCH_SCROLLING_OFF'
export const SWITCH_SCROLLING_ON = 'SWITCH_SCROLLING_ON'


export function switchScrollingOff() {
  return {
    type: SWITCH_SCROLLING_OFF,
  }
}

export function switchScrollingOn() {
  return {
    type: SWITCH_SCROLLING_ON,
  }
}
