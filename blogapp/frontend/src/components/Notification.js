import { useSelector } from 'react-redux'
import { Toast } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <Toast id='notification' style={style}>
      {notification}
    </Toast>
  )
}

export default Notification