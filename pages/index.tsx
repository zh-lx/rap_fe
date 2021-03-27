import styles from 'styles/Index.module.scss';
import Head from 'next/head';
import RadioGroup from 'components/radio';
import Loading from 'components/loading';
import Empty from 'components/empty';
import { useEffect, useRef, useState } from 'react';
import { $fetch } from 'utils/request';
import {
  RAP_NUM_DATA,
  RAP_TONE_DATA,
  RAP_WORD_LEN,
  getHotLevel,
} from 'constant/index';
type Rhythm = {
  id: number;
  word: string;
  rate: number;
  length: number;
  initial: string;
  final_with_tone: string;
  final_without_tone: string;
  type_with_tone: string;
  type_without_tone: string;
};
type Result = Rhythm[];

export default function Index() {
  const [word, setWord] = useState<string>(''); // 要查询押韵的韵脚
  const [rapNum, setRapNum] = useState<number>(1); // 押韵数(单押、双押、三押等)
  const [toneType, setToneType] = useState<number>(0); // (音调不限、尾调一致等)
  const [wordLength, setWordLength] = useState<number>(2); // 词长
  const [showLoading, setShowLoading] = useState<boolean>(false); // 显示loading
  const [showEmpty, setShowEmpty] = useState<boolean>(false); // 显示empty
  const [result, setResult] = useState<Result>([]); // 结果
  const isInit = useRef<boolean>(true); // 是否初始化
  // 监听请求韵脚
  useEffect(() => {
    if (isInit.current) {
      isInit.current = false;
      return;
    }
    getRhythms();
  }, [rapNum, toneType, wordLength]);
  // 请求韵脚
  const getRhythms = async () => {
    setShowLoading(true);
    const res = await $fetch.get('/api/words/get_words', {
      data: {
        word,
        rap_num: rapNum,
        tone_type: toneType,
        length: wordLength,
      },
    });
    setShowLoading(false);
    if (res.code === 0) {
      setResult(res.data);
      setShowEmpty(res.data.length === 0);
    }
  };
  // 输入值改变
  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      getRhythms();
    }
  };
  return (
    <div className={styles.home}>
      <Head>
        <title>押韵大师-在线押韵|韵脚查询|说唱神器|freestyle</title>
        <link rel='icon' href='/static/favicon.ico' />
        <link rel='apple-touch-icon' href='/static/logo192.png' />
        <meta
          name='description'
          content='押韵大师,在线押韵,数十万的韵脚在线查询,是一款说唱freestyle的神器。'
        />
        <meta name='keywords' content='押韵,在线押韵,韵脚查询,freestyle,说唱' />
        <meta name='author' content='周立翔' />
      </Head>
      <div className={styles.content}>
        <div className={styles.logo}></div>
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            type='text'
            placeholder='请输入要押韵的韵脚'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setWord(e.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
          <div className={styles.searchButton} onClick={getRhythms}>
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              p-id='909'
              width='20'
              height='20'
            >
              <path
                d='M963.584 905.728l-184.32-184.32c57.856-70.656 92.672-161.28 92.672-259.584 0-226.816-183.808-410.624-410.624-410.624C235.008 51.2 51.2 235.008 51.2 461.824c0 226.816 183.808 410.624 410.624 410.624 98.304 0 188.928-34.816 259.584-92.672l184.32 184.32c11.776 11.776 31.232 11.776 43.52 0l14.848-14.848c11.776-12.288 11.776-31.744-0.512-43.52z m-501.76-115.2c-181.248 0-328.704-146.944-328.704-328.704S280.064 133.12 461.824 133.12c181.248 0 328.704 146.944 328.704 328.704 0 181.248-147.456 328.704-328.704 328.704z'
                fill='#ffffff'
                p-id='910'
              ></path>
            </svg>
          </div>
        </div>
        <RadioGroup
          data={RAP_NUM_DATA}
          style={{ marginTop: '8px', width: '100%' }}
          onChange={(value: number) => {
            setRapNum(value);
          }}
        />
        <RadioGroup
          data={RAP_TONE_DATA}
          style={{ marginTop: '8px', width: '100%' }}
          onChange={(value: number) => {
            setToneType(value);
          }}
        />
        <RadioGroup
          data={RAP_WORD_LEN}
          style={{ marginTop: '8px', width: '100%' }}
          type='tab'
          onChange={(value: number) => {
            setWordLength(value);
          }}
        />
        <div className={styles['rhythms-box']}>
          {result.map((rhythm) => {
            return (
              <span
                className={`${styles.rhythm} ${
                  styles[getHotLevel(rhythm.length, rhythm.rate)]
                }`}
                key={rhythm.word}
              >
                {rhythm.word}
              </span>
            );
          })}
          {/* 占位补充 */}
          {result.length > 0 &&
            Array.from({ length: 10 }).map((item, index) => {
              return (
                <span className={styles['placeholder-rhythm']} key={index}>
                  {'　'.repeat(wordLength)}
                </span>
              );
            })}
        </div>
        {showEmpty && <Empty />}
      </div>
      <Loading show={showLoading} />
    </div>
  );
}
