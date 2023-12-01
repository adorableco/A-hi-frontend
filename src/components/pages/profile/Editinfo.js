/** @format */
// EditInfo.js는 비밀번호 변경 전용 입니다!

import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 라이브러리 추가

function EditInfo({ setEditingPass, userId, passEdit, setRefresh }) {
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 상태 추가

  const onSubmit = async (event) => {
    event.preventDefault();

    // 비밀번호 변경 API 호출
    if (newPassword) {
      try {
        await axios.put(`http://localhost:8080/my-page/password/update`, {
          new_password: newPassword,
        });
        alert("비밀번호 변경이 완료되었습니다.");
      } catch (error) {
        console.error("Error :", error);
      }
    }

    // 상태 초기화
    setEditingPass(false);

    setNewPassword("");

    setRefresh((refresh) => refresh * -1);
  };

  return (
    <div className='editInfo'>
      {/* 폼 부분 */}
      <form onSubmit={onSubmit}>
        <span className='content' style={{ marginTop: "25%" }}>
          <p>비밀번호</p>
          <input
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeholder='변경할 비밀번호를 입력하세요'
            autoFocus
            className='formInput'
          />
        </span>
        <span className='content' style={{ marginLeft: "34%" }}>
          <input type='submit' value='변경' className='formBtn' />
        </span>
      </form>
    </div>
  );
}

export default EditInfo;
