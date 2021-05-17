import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  text-align: center;
`;

function App() {
  const [userList, setUserList] = useState([]);

  async function load() {
    const result = await axios.get(
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/candidates'
    );
    setUserList(result.data);
  }

  async function vote(id) {
    const result = await axios.get(
      'http://ec2-13-209-5-166.ap-northeast-2.compute.amazonaws.com:8000/api/vote',
      {
        params: { id },
      }
    );
    const newUserList = [...userList];
    for (const user of newUserList) {
      if (user.id == id) {
        user.voteCount++;
      }
    }
    setUserList(newUserList);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <StyledContainer>
      <h1>12기 프론트엔드 개발팀장 투표 ^.^</h1>
      {userList.map((user) => {
        return (
          <p key={user.id}>
            {user.name} ({user.voteCount}){' '}
            <button
              onClick={() => {
                vote(user.id);
              }}
            >
              투표하기
            </button>
          </p>
        );
      })}
    </StyledContainer>
  );
}

export default App;
