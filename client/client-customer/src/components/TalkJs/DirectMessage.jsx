import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

function Message() {
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));
  }, []);

  const sendMessage = () => {
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

      const conversationId = Talk.oneOnOneId(currentUser, otherUser);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(currentUser);
      conversation.setParticipant(otherUser);

      const chatbox = session.createChatbox(conversation);
      chatbox.mount(chatboxEl.current);
    }
  }

  return (
    <>
      <button type="button" onClick={sendMessage} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Send A Message
      </button>

      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Send A Message</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div ref={chatboxEl} style={{ height: '80vh' }} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close Message</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Message;
