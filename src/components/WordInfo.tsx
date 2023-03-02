import React, { useState } from 'react';
import { Bars } from 'react-loader-spinner';
import styled from 'styled-components';
import { IResponse } from '../types/types';

const PWord = styled.p`
  color: red;
  font-size: 40px;
  margin-left: 25px;
  margin-right: 20px;
`;

interface IWordInfo {
  data: IResponse[];
}

const WordInfo: React.FC<IWordInfo> = ({ data }) => {
  const [plaing, setPlaing] = useState<boolean>(false);

  const playWordAudio = (audioLink: string) => {
    const audio = new Audio(audioLink);
    audio.play();
    setPlaing(true);
    audio.onended = function () {
      setPlaing(false);
    };
  };

  return (
    <div className='app-wrapper'>
      {data.map((info, index) => (
        <div key={index}>
          <h1>
            Your word: <PWord>{info.word}</PWord>{' '}
            {plaing && (
              <Bars
                height='33'
                width='33'
                color='#4fa94d'
                ariaLabel='bars-loading'
                visible={true}
              />
            )}
          </h1>
          <div>
            {info.phonetics.map((phonetic, index) => {
              if (phonetic.text && phonetic.audio) {
                return (
                  <div className='app-phonetic' key={index}>
                    <h3>{phonetic.text}</h3>
                    <button
                      onClick={() => playWordAudio(phonetic.audio)}
                      className='app-phonetic__audio'>
                      Listen
                    </button>
                  </div>
                );
              }
            })}
          </div>
          <div className='app-meanings'>
            {info.meanings.map((meaning, index) => (
              <div className='app-meaning' key={index}>
                <h3>{meaning.partOfSpeech}: </h3>
                <div>
                  {meaning.definitions.map((definition, index) => (
                    <div key={index}>
                      <h4>{definition.definition}</h4>
                      <p>
                        {definition.example
                          ? `Example: ${definition.example}`
                          : ''}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordInfo;
