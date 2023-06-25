import { useChat } from 'providers/ChatProvider';
import styles from './chat.module.scss';
import { ChatEntry } from './ChatEntry';
import { useLayoutEffect, useRef, useState } from 'react';
import { useFullSheet } from 'providers/CharacterSheetProvider/useFullSheet';
import { ChatType } from 'constants/chat';

export const Chat = () => {
  const chatsRef: { current: any } = useRef();
  const lastResolvedScroll = useRef(-1);
  const lastResolvedScrollHeight = useRef(-1);
  const lastResolvedChatHeight = useRef(-1);
  const { chats, appendChat } = useChat();
  const { name } = useFullSheet();
  const [userChat, setUserChat] = useState('');

  // attempt to set the scroll to the bottom when a new chat is added
  useLayoutEffect(() => {
    const chat: HTMLDivElement = chatsRef.current;

    if (!chat) {
      return;
    }

    const scrolledToBottom =
      Math.abs(
        lastResolvedScrollHeight.current - chat.scrollTop - chat.clientHeight,
      ) < 1;
    const heightChanged = lastResolvedChatHeight.current !== chat.clientHeight;

    if (
      heightChanged ||
      scrolledToBottom ||
      lastResolvedScroll.current === -1
    ) {
      chat.scrollTop = chat.scrollHeight;
    }

    lastResolvedScroll.current = chats.length;
    lastResolvedScrollHeight.current = chat.scrollHeight;
    lastResolvedChatHeight.current = chat.clientHeight;
  }, [chats]);

  return (
    <div className={styles['container']}>
      <h3 className={styles['header']}>Chat</h3>
      <div className={styles['chats']} ref={chatsRef}>
        {chats.map((entry, i) => (
          <ChatEntry key={i} {...entry} />
        ))}
      </div>
      <div className={styles['chat-input-container']}>
        <textarea
          className={styles['chat-input']}
          value={userChat}
          rows={5}
          placeholder="Type here and hit enter to type in chat..."
          onChange={(e) => {
            setUserChat(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && userChat) {
              appendChat({
                playerName: name,
                type: ChatType.CHAT,
                result: userChat,
              });

              setUserChat('');
            }
          }}
        />
      </div>
    </div>
  );
};
