import { useDiceRoller } from 'providers/DiceRollerProvider';
import styles from './chat.module.scss';
import { ChatEntry } from './ChatEntry';
import { useLayoutEffect, useRef, useState } from 'react';
import { useCharacterSheet } from 'providers/CharacterSheetProvider';
import { ChatType } from 'constants/chat';

export const Chat = () => {
  const chatsRef: { current: any } = useRef();
  const lastResolvedScroll = useRef(-1);
  const lastResolvedScrollHeight = useRef(-1);
  const { rolls, appendRoll } = useDiceRoller();
  const { name } = useCharacterSheet();
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

    if (scrolledToBottom || lastResolvedScroll.current === -1) {
      chat.scrollTop = chat.scrollHeight;
    }

    lastResolvedScroll.current = rolls.length;
    lastResolvedScrollHeight.current = chat.scrollHeight;
  }, [rolls]);

  return (
    <div className={styles['container']}>
      <h3>Chat</h3>
      <div className={styles['chats']} ref={chatsRef}>
        {rolls.map((entry, i) => (
          <ChatEntry key={i} {...entry} />
        ))}
      </div>
      <textarea
        className={styles['chat-input']}
        value={userChat}
        rows={5}
        onChange={(e) => {
          setUserChat(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && userChat) {
            appendRoll({
              playerName: name,
              type: ChatType.CHAT,
              result: userChat,
            });

            setUserChat('');
          }
        }}
      />
    </div>
  );
};
