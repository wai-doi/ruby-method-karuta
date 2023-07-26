import { useState } from 'react';
import { FaRegCircle, FaXmark } from 'react-icons/fa6';
import correctSound from '../sounds/correct.mp3';
import wrongSound from '../sounds/wrong.mp3';

const Card = (props: {
  cardId: String;
  nameText: String;
  onClick: Function;
  getCard: Function;
}) => {
  const [wrong, setWrong] = useState<boolean>(false);
  const [correct, setCorrect] = useState<boolean>(false);

  const handleClick = async () => {
    const clickResult: boolean = props.onClick(props.cardId);
    if (clickResult) {
      setCorrect(true);
      playSound(correctSound);
      await new Promise<void>((resolve) =>
        setTimeout(() => {
          setCorrect(false);
          return resolve();
        }, 1000)
      );

      props.getCard(props.cardId);
    } else {
      setWrong(true);
      playSound(wrongSound);
      setTimeout(() => {
        setWrong(false);
      }, 500);
    }
  };

  const playSound = (sound: string) => {
    const audio = new Audio(sound);
    audio.volume = 0.1;
    audio.play();
  };

  return (
    <div>
      <div
        className="relative m-2 flex h-28 w-48 cursor-pointer items-center border-8 border-red-300 bg-white p-1 shadow-lg transition-transform hover:scale-110"
        onClick={() => handleClick()}
      >
        <span className="text-base font-bold">{props.nameText}</span>
        {correct && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-8xl font-bold text-blue-500">
            <FaRegCircle />
          </div>
        )}
        {wrong && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-9xl font-bold text-red-500">
            <FaXmark />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
