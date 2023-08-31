import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function App() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) {
      const currentUser = new Talk.User({
        id: '4',
        name: 'Benzema',
        email: 'ronaldo@example.com',
        photoUrl: 'https://shorturl.at/avJM3',
        role: 'default',
      });

      const otherUser = new Talk.User({
        id: '3',
        name: 'Lewandowski',
        email: 'messi@example.com',
        photoUrl: 'henry.jpeg',
        role: 'default',
      });

      const session = new Talk.Session({
        appId: 'tgKqA2yS',
        me: currentUser,
      });

      const chatbox = session.createChatbox();
      const inbox = session.createInbox();
      inbox.mount(chatboxEl.current)

      return () => session.destroy();
    }
  }, [talkLoaded]);

  return <div ref={chatboxEl} style={{ height: '100vh' }} />;
}

export default App;
