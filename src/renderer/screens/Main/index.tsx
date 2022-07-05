import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { Container, Heading, Button } from 'renderer/components'
import { useWindowStore } from 'renderer/store'

export function MainScreen() {
  const { App } = window // The "App" comes from the bridge

  const navigate = useNavigate()
  const store = useWindowStore().about

  useEffect(() => {
    App.sayHelloFromBridge()

    App.whenAboutWindowClose(({ message }) => {
      console.log(message)
    })
  }, [])

  function openAboutWindow() {
    App.createNotification({
      content: {
        title: 'About',
        body: 'This is the about window',
        icon: 'https://i.imgur.com/w3duR07.png',
      },
    })
  }

  return (
    <Container>
      <Heading>Hi, {App.username || 'there'}! 👋</Heading>

      <h2>It's time to build something awesome! ✨</h2>

      <nav className="flex gap-2">
        <Button onClick={openAboutWindow}>Open About Window</Button>

        <Button onClick={() => navigate('anotherScreen')}>
          Go to Another screen
        </Button>
      </nav>
    </Container>
  )
}
