import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import {useSelector} from "react-redux";
import {
  fetchFacilityDetail,
  fetchParkingSpaceRelation,
  fetchParkingSpacesDetail,
  fetchReviewDetail
} from "../store/actions/index.js";

function App() {
  const relation = useSelector((state) => state.relation.relation);
  const chatboxEl = useRef();

  // wait for TalkJS to load
  const [talkLoaded, markTalkLoaded] = useState(false);
  // useEffect(() => {
  //   dispatch(fetchParkingSpacesDetail(id));
  //   dispatch(fetchReviewDetail(id));
  //   dispatch(fetchFacilityDetail())
  //   dispatch(fetchParkingSpaceRelation(id))
  // }, [dispatch, id]);

  useEffect(() => {
    Talk.ready.then(() => markTalkLoaded(true));

    if (talkLoaded) { // <--- ini si landlord, id dllnya landlord
      const currentUser = new Talk.User({
        id: relation.Landlord.id + 30,
        name: relation.Landlord.username,
        email: relation.Landlord.email,
        photoUrl: 'https://shorturl.at/avJM3',
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
