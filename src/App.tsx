import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IResponse } from './types/types';
import WordInfo from './components/WordInfo';
import './App.scss';
import styled from 'styled-components';
import randomWords from 'random-words';
import { RotatingLines } from 'react-loader-spinner';

const Input = styled.input`
  min-width: 200px;
  min-height: 25px;
  font-size: 25px;
  line-height: 30px;
`;

const Button = styled.button`
  padding: 7px 10px;
  font-size: 18px;

  margin-left: 10px;
`;

const ErrorTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-self: center;
  margin: 25px 0px 0px 0px;
`;

const App: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [update, setUpdate] = useState<string>('');
  const [data, setData] = useState<IResponse[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (update) {
      setLoading(true);
      axios
        .get<IResponse[]>(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${update}`,
        )
        .then((response) => {
          setData(response.data.slice(0, 1));
          setError('');
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [update]);

  const randomWordFromLib = () => {
    setLoading(true);
    const randomWord = randomWords(1).join('');
    setWord(randomWord);
    setUpdate(randomWord);
    setError('');
  };

  const randomWordFromApi = () => {
    setLoading(true);
    axios
      .get<string[]>(`https://random-word-api.herokuapp.com/word`)
      .then((response) => {
        const randomWord = response.data.join('');
        setWord(randomWord);
        setUpdate(randomWord);
        setError('');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className='App'>
      <form
        className='enter'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <Input
          placeholder={'enter the word'}
          value={word}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWord(e.target.value)
          }
        />
        <Button onClick={() => setUpdate(word)}>Search</Button>
        <Button onClick={randomWordFromLib}>Random Word LIB</Button>
        <Button onClick={randomWordFromApi}>Random Word API</Button>
      </form>
      {loading && (
        <div className='enter'>
          <RotatingLines
            strokeColor='grey'
            strokeWidth='5'
            animationDuration='0.75'
            width='120'
            visible={true}
          />
        </div>
      )}
      {data && !error && !loading && <WordInfo data={data} />}
      {!data && !error && !loading && <h1 className='enter'>Enter the word</h1>}
      {error && !loading && <ErrorTitle>Word not found, try again</ErrorTitle>}
    </div>
  );
};

export default App;
