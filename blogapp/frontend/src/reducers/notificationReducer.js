import { createSlice } from '@reduxjs/toolkit'

let setTimeoutId

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification(state, action) {
      return (state = action.payload.content)
    },
    removeNotification(state) {
      state = null
      return state
    },
  },
})

export const setNotification = (content, type, timeout) => {
  const newNotification = {
    content: content,
    type: type
  }

  return dispatch => {
    dispatch(addNotification(newNotification))
    if (setTimeoutId) {
      clearTimeout(setTimeoutId)
    }
    setTimeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export const notify = (message, type='info') => {
  return setNotification(message, type, 5000)
}

export const {
  addNotification,
  removeNotification
} = notificationSlice.actions
export default notificationSlice.reducer
