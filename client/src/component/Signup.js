import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import './Signup.scss'
import Sample from '../Sample.png'

import axios from "axios";


function Signup({ history }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  //회원가입 실패 alert 창 !
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPW, setWrongPW] = useState(false);


  const onChangeHandler = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value)
    } else if (e.target.name === "name") {
      setName(e.target.value)
    } else if (e.target.name === "password") {
      setPassword(e.target.value)
    } else if (e.target.name === "passwordCheck") {
      setPasswordCheck(e.target.value)
    } else if (e.target.name === "answer") {
      setAnswer(e.target.value)
    }
  }

  const selectOptionHandler = (e) => {
    let questionSelect = document.querySelector('.question');
    console.log(questionSelect.options[questionSelect.selectedIndex].text);
    setQuestion(questionSelect.options[questionSelect.selectedIndex].text);
  }

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }

  const signUpBtnHandler = (e) => {
    console.log("email:", email);
    console.log("name:", name);
    console.log("password:", password);
    console.log("pwCheck:", passwordCheck);
    console.log("question:", question);
    console.log("answer:", answer);
    e.preventDefault();
    if (validate(email) && (password === passwordCheck)) {
      axios.post('https://don-forget-server.com/user/signup', {
        email: email,
        name: name,
        password: password,
        type: question,
        password_answer: answer
      })
        .then(res => console.log(res))
        .then(() => { history.push('/signin') })
    }
    else {
      validate(email) ? setWrongEmail(false) : setWrongEmail(true);
      ((password === passwordCheck) && password !== "") ? setWrongPW(false) : setWrongPW(true);
    }
  }

  return (
    <div className="signup">
      <div className="signup_content">
        <img className="logo_sample" src={Sample} alt="Sample" />
        <h1>Sign up</h1>
        <form className="inputValue">
          <input type="text" name="email" onChange={onChangeHandler} placeholder="Email Address *" label="Email Address" />
          <input type="text" name="name" onChange={onChangeHandler} placeholder="Name *" label="Name *" />
          <input type="password" name="password" placeholder="Password *" label="password" onChange={onChangeHandler} />
          <input type="password" name="passwordCheck" placeholder="PasswordCheck *" label="passwordCheck" onChange={onChangeHandler} />
          <select className="question" onChange={selectOptionHandler}>
            <option value="" disabled selected>Password Hint: *</option>
            <option value="1">가장 기억에 남는 선생님 성함은?</option>
            <option value="2">내가 존경하는 인물은?</option>
            <option value="3">나의 노래방 애창곡은?</option>
          </select>
          <input type="text" name="answer" placeholder="Answer *" label="answer" onChange={onChangeHandler} />
          <input name="agree" type="checkbox"></input>
          <label htmlFor="agree">개인정보 수집 동의</label>
          <div className={wrongEmail ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
                    유효하지 않은 이메일입니다.
                </div>
          <div className={wrongPW ? "alert" : "none"}>
            <strong> ⚠️ &nbsp; Error</strong>
            비밀번호가 일치하지 않습니다
                </div>
          <button onClick={signUpBtnHandler}>회원가입</button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
