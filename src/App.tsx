import { useEffect, useState } from 'react';
import { DiRuby } from 'react-icons/di';
import { FaGear, FaRegCirclePlay, FaGithub } from 'react-icons/fa6';
import { PiTimerBold } from 'react-icons/pi';
import './App.css';
import Card from './components/Card';
import Config from './components/Config';
import ReadingText from './components/ReadingText';
import FinishPopup from './components/FinishPopup';
import GameStartModal from './components/GameStartModal';
import { initializeBoardCards, initializeReadingCards } from './utils/cardList';

const App = () => {
  return (
    <div>
      <Game />
    </div>
  );
};

const Game = () => {
  const [boardCards, setBoardCards] = useState<
    { id: String; nameText: String }[]
  >(initializeBoardCards());
  const [readingCards, setReadingCards] = useState<
    { id: String; explainText: String }[]
  >(initializeReadingCards());
  const [answerCardId, setAnswerCardId] = useState<String | null>(null);
  const [answerCardExplain, setAnswerCardExplain] = useState<String | null>(
    null
  );
  const [answerCount, setAnswerCount] = useState<number>(0);
  const [missCount, setMissCount] = useState<number>(0);
  const [readingSpeed, setReadingSpeed] = useState<number>(1);
  const [status, setStatus] = useState<'Waiting' | 'Playing' | 'Finished'>(
    'Waiting'
  );
  const [time, setTime] = useState<number>(0);
  const [finishTime, setFinishTime] = useState<number>(0);
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [showReadingText, setShowReadingText] = useState<boolean>(false);
  const [showGameModal, setShowGameModal] = useState<boolean>(false);
  const [clearNumber, setClearNumber] = useState<10 | 30 | 50>(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (answerCount === clearNumber) {
      setStatus('Finished');
      setFinishTime(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerCount]);

  const gameStart = (clearNumber: 10 | 30 | 50) => {
    setClearNumber(clearNumber);
    setStatus('Playing');
    setBoardCards(initializeBoardCards());
    setReadingCards(initializeReadingCards());
    setAnswerCardId(null);
    setAnswerCardExplain(null);
    setAnswerCount(0);
    setMissCount(0);
    setTime(0);
    setFinishTime(0);
  };

  const readText = () => {
    setAnswerCardId(readingCards[0].id);
    setAnswerCardExplain(readingCards[0].explainText);

    // ブラウザにWeb Speech API Speech Synthesis機能があるか判定
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      // 発言を設定 (必須)
      const utterance = new SpeechSynthesisUtterance();

      // テキストを設定 (必須)
      utterance.text = String(readingCards[0].explainText);

      // 言語を設定
      utterance.lang = 'ja-JP';

      // 速度を設定
      utterance.rate = readingSpeed;

      // 高さを設定
      utterance.pitch = 1;

      // 音量を設定
      utterance.volume = 1;

      // 発言を再生 (必須)
      window.speechSynthesis.speak(utterance);
    } else {
      (window as any).alert('ブラウザに読み上げ機能がありません');
    }
  };

  const clickCard = (cardId: String) => {
    if (cardId !== answerCardId) {
      setMissCount(missCount + 1);
      return false;
    } else {
      return true;
    }
  };

  const getCard = (cardId: String) => {
    setBoardCards(boardCards.filter((item) => item.id !== cardId));
    setReadingCards(readingCards.slice(1));
    setAnswerCardId(null);
    setAnswerCount(answerCount + 1);
  };

  const handleShowReadingTextCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowReadingText(JSON.parse(e.target.value));
  };

  const handleReadingSpeedSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReadingSpeed(Number(e.target.value));
  };

  return (
    <div>
      <GameStartModal
        show={showGameModal}
        setShow={setShowGameModal}
        gameStart={gameStart}
      />
      <header className="flex h-12 items-center bg-blue-900 p-2 text-white">
        <div className="mr-6 flex items-center gap-x-1 text-xl font-bold">
          <DiRuby className="text-red-500" />
          <span>Ruby メソッドかるた</span>
        </div>
        <div className="flex">
          <div className="mr-6 rounded-md border border-white p-1 hover:border-black hover:bg-yellow-400 hover:text-black">
            <button onClick={() => setShowGameModal(true)}>
              新しいゲームを始める
            </button>
          </div>
        </div>
        {status === 'Playing' && (
          <div className="flex items-center">
            <div className="mr-6 rounded-md border border-white p-1 font-bold hover:border-black hover:bg-yellow-400 hover:text-black">
              <button
                className="flex items-center gap-x-1"
                onClick={() => readText()}
              >
                <FaRegCirclePlay />
                <span>読み札を読み上げる</span>
              </button>
            </div>
            <div className="mr-6">
              <p>
                クリア枚数 {String(answerCount)} / {clearNumber} 枚
              </p>
            </div>
            <div className="mr-6">
              <p>お手つき {String(missCount)} 回</p>
            </div>
            <div className="mr-6 flex items-center gap-x-1">
              <PiTimerBold />
              <span>
                {String(Math.floor(time / 60)).padStart(2, '0')} :{' '}
                {String(time % 60).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}
        <div className="ml-auto mr-6">
          <div
            onMouseEnter={() => setShowConfig(true)}
            onMouseLeave={() => setShowConfig(false)}
          >
            <div className="relative inline-flex cursor-pointer items-center text-3xl hover:border-yellow-400 hover:text-yellow-400">
              <FaGear className="inline-block" />
            </div>
            {showConfig && (
              <Config
                showReadingText={showReadingText}
                handleShowReadingTextCheckBox={handleShowReadingTextCheckBox}
                readingSpeed={readingSpeed}
                handleReadingSpeedSlider={handleReadingSpeedSlider}
              />
            )}
          </div>
        </div>
        <div className="mr-6">
          <a
            className="inline-flex items-center text-3xl"
            href="https://github.com/wai-doi/ruby-method-karuta"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>
      </header>
      {showReadingText && <ReadingText text={answerCardExplain} />}
      <div className="board min-h-screen">
        {status === 'Playing' && (
          <div className="flex flex-wrap">
            {boardCards.map((item, index) => (
              <Card
                key={index}
                cardId={item.id}
                nameText={item.nameText}
                onClick={(cardId: String) => clickCard(cardId)}
                getCard={(cardId: String) => getCard(cardId)}
              />
            ))}
          </div>
        )}
        {status === 'Finished' && (
          <FinishPopup
            answerCount={clearNumber}
            missCount={missCount}
            finishTime={finishTime}
          />
        )}
      </div>
    </div>
  );
};

export default App;
