import React, { useEffect, useState } from 'react';
// import { GoogleSpreadsheet } from "google-spreadsheet";
import { getData, sendData } from "./googleSheet";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LanguageIcon from '@material-ui/icons/Language';
import Modal from "react-modal";
import './app.css';
import './register.css';
import './footer.css'
import './nav.css';
import './button.css'
// import img3 from './images/img4.png'
import logo from './images/logo.png'
import './form.css'
require('dotenv').config()

function App() {
  const SPREADSHEET_ID = "1WLX2AA0QmT2lzmZXtlwaB3rFzHxyqglUC11EeGF1cyE";
  const [modal, setModal] = useState(true)
  const [second, setSecond] = useState(1000);
  const [min, setMin] = useState(second * 60);
  const [hour, setHour] = useState(min * 60);
  const [day, setDay] = useState(hour * 24);
  const [btnStatus, setStatus] = useState("Next")

  const [msg, setMsg] = useState()

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [year, setYear] = useState()
  const [link, setLink] = useState()

  const [department, setDepartment] = useState()
  const [roles, setRole] = useState([])
  const [Q1, setQ1] = useState()

  const [yourself, setYourself] = useState()
  const [qualities, setQualities] = useState()
  const [rate1, setRate1] = useState()
  const [rate2, setRate2] = useState()
  const [rate3, setRate3] = useState()
  const [rate4, setRate4] = useState()
  const [rate5, setRate5] = useState()
  const [Q5, setQ5] = useState()
  const [Q6, setQ6] = useState()
  const [Q7, setQ7] = useState()

  const [skill, setSkillRate] = useState(null)
  const [gd, setgd] = useState(null)
  const [gdtech, setgdTech] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [WebD, setWebD] = useState(null)

  const [index, setIndex] = useState(1)



  const send = async () => {
    const first = await getData(SPREADSHEET_ID, 0)
    let string = ""
    for (let i = 0; i < roles.length; i++) {
      const element = roles[i];
      string += element + ","
    }
    // console.log(string)
    const data = {
      Date: new Date().toLocaleString(),
      Name: name,
      Contact_Number: phone,
      Email_ID: email,
      Year: year,
      Social_Link: link,
      Department: department,
      Roles: string,
      Q1: Q1,
      Yourself: yourself,
      Qualities: qualities,
      Rate: `${rate1},${rate2},${rate3},${rate4},${rate5}`,
      Q5: Q5,
      Q6: Q6,
      Q7: Q7,
      GD: gd,
      GD_Tech: gdtech,
      Photographer: photo,
      Webd: WebD,
      Tech_Rating: skill
    }
    const res = await sendData(SPREADSHEET_ID, 0, data);
    const se = await getData(SPREADSHEET_ID, 0)
    // console.log(res, first, se)
    if (se.length - first.length === 1) {
      document.querySelector('.register').classList.add('hide')
      document.querySelector('.containers').classList.remove('hide')
    }
  }

  var time = 'Fri Feb 04 2022 20:24:12'

  let countDown = new Date(time).getTime();

  // console.log(countDown)
  useEffect(() => {
    const x = () => {
      setInterval(function () {
        let now = new Date().getTime(),
          distance = countDown - now;

        if (countDown > now) {
          setDay(Math.floor(distance / day))
          setHour(Math.floor(distance / hour))
          setMin(Math.floor(distance / min))
          setSecond(Math.floor(distance / second))
        } else {
          clearInterval(x)
        }
      }, second);
    }
    x()
  }, [second, hour, min, day, countDown])


  const next = (e) => {
    // console.log(e.target.value, index)
    if (e.target.value === "Submit") {
      e.target.disabled = true
      setStatus("Loading...")
      send()
    }
    if (e.target.value === "Next") {
      // console.log(document.querySelector(`.page${index}`))
      const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
      const phoneNumber = new RegExp('^[0-9]{10}$')
      // console.log(roles)
      if (index === 1) {
        if (name && email && year && phone) {
          if (emailRegex.test(email) && phoneNumber.test(phone)) {
            setIndex(index + 1)
            document.querySelector(`.page${index}`).classList.add('hide')
            document.querySelector(`.page${index + 1}`).classList.remove('hide')
            if (index >= 3) {
              setStatus("Submit")
            } else {
              setStatus("Next")
            }
          } else {
            setMsg("Fill the email and contact number in correct format")
            setTimeout(() => {
              setMsg("")
            }, 2000);
          }
        } else {
          setMsg("First Fill The Form")
          setTimeout(() => {
            setMsg("")
          }, 2000);
        }

      }

      if (index === 2) {
        if (department && roles && Q1) {
          setIndex(index + 1)
          document.querySelector(`.page${index}`).classList.add('hide')
          document.querySelector(`.page${index + 1}`).classList.remove('hide')
          if (index >= 3) {
            setStatus("Submit")
          } else {
            setStatus("Next")
          }
        } else {
          setMsg("First Fill The Form")
          setTimeout(() => {
            setMsg("")
          }, 2000);
        }
      }

      if (index === 3) {
        if (yourself && qualities && rate1 && rate2 && rate3 && rate4 && rate5 && Q5 && Q6 && Q7) {
          setIndex(index + 1)
          document.querySelector(`.page${index}`).classList.add('hide')
          document.querySelector(`.page${index + 1}`).classList.remove('hide')
          if (index >= 3) {
            setStatus("Submit")
          } else {
            setStatus("Next")
          }
        } else {
          setMsg("First Fill The Form")
          setTimeout(() => {
            setMsg("")
          }, 2000);
        }
      }



    }
  }

  const back = (e) => {
    // console.log(e.target.value,index)
    if (e.target.value === "Back") {
      setIndex(index - 1)
      // console.log(document.querySelector(`.page${index}`))
      document.querySelector(`.page${index}`).classList.add('hide')
      document.querySelector(`.page${index - 1}`).classList.remove('hide')
      if (index <= 4) {
        setStatus("Next")
      }
    }
  }



  return (
    <>
      <div className="App">
        <nav>
          <img alt='logo' className='logo' src={logo} />
          <div className="sociallogo">
            <li><a href="https://www.facebook.com/radio.nitroz.nitdgp" without rel="noreferrer" target="_blank"><FacebookIcon style={{ color: "white" }} /></a></li>
            <li><a href="https://instagram.com/radionitroz.nitdgp?igshid=1pu6b8o84z66h" without rel="noreferrer" target="_blank"><InstagramIcon style={{ color: "white" }} /></a></li>
            <li><a href="https://www.youtube.com/channel/UCSENXkh5yNkcGiQez7y1OwA" without rel="noreferrer" target="_blank"><YouTubeIcon style={{ color: "white" }} /></a></li>
          </div>
        </nav>

        <div className='msg'>{msg}</div>

        <div className='register'>
          <div className="container">
            <div className="form">
              <form>
                <h1>Registration</h1>
                {/* page1--------------------------- */}
                <div className={`page1`}>
                  <label>Name <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <input type="text" name="name" placeholder="Your Answer" onChange={(e) => setName(e.target.value)} />

                  <label>Email <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <input type="email" name="email" placeholder="Your Answer" onChange={(e) => setEmail(e.target.value)} />

                  <label>Contact Number <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <input type="text" name='Contact_Number' placeholder='Your Answer' onChange={(e) => setPhone(e.target.value)} />

                  <label>Social Media Link (If Any) </label>
                  <input type="text" name='social_link' placeholder='Your Answer' onChange={(e) => setLink(e.target.value)} />

                  <label>Year of Study <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <div style={{ marginTop: "10px", marginBottom: "25px" }}>
                    <div className='radioLabel'>
                      <input type="radio" name='year' onChange={(e) => setYear(e.target.value)} value={"1st Year"} />
                      <label>1st Year</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='year' onChange={(e) => setYear(e.target.value)} value={"2nd Year"} />
                      <label>2nd Year</label>
                    </div>
                  </div>
                </div>
                {/* page2--------------------------- */}
                <div className={`page2 hide`}>
                  <label>Department <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <div style={{ marginTop: "10px", marginBottom: "25px",overflowX:"auto", whiteSpace: "nowrap" }}>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Biotechnology"} />
                      <label>Biotechnology</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Civil Engineering"} />
                      <label>Civil Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Chemical Engineering"} />
                      <label>Chemical Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Computer Science and Engineering"} />
                      <label>Computer Science and Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Chemistry"} />
                      <label>Chemistry</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Electronics and Communication Engineering"} />
                      <label>Electronics and Communication Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Electrical Engineering"} />
                      <label>Electrical Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Mechanical Engineering"} />
                      <label>Mechanical Engineering</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="radio" name='department' onChange={(e) => setDepartment(e.target.value)} value={"Metallurgical and Materials Engineering"} />
                      <label>Metallurgical and Materials Engineering</label>
                    </div>
                  </div>
                  <label>In which roles do you want to join Radio NITroz? <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <div style={{ marginTop: "10px", marginBottom: "25px" }}>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value;
                        if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }
                      } value={"Event Management"} />
                      <label>Event Management</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"RJ and VJ"} />
                      <label>RJ and VJ</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"Content Writer"} />
                      <label>Content Writer</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"Web Developer"} />
                      <label>Web Developer</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"Video Editor"} />
                      <label>Video Editor</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"Graphic Designer"} />
                      <label>Graphic Designer</label>
                    </div>
                    <div className='radioLabel'>
                      <input type="checkbox" name='roles' onChange={(e) => {
                        const value = e.target.value; if (e.target.checked === false) {
                          const t = roles
                          t.splice(roles.indexOf(value), 1)
                          setRole(t)
                        } else {
                          setRole([...roles, e.target.value])
                        }
                      }} value={"Photographer"} />
                      <label>Photographer</label>
                    </div>
                  </div>
                  <label>Apart from Radio NITroz, what other clubs do you want to join? Have you been inducted into any other club yet?  <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <input type="text" name='Contact_Number' onChange={(e) => { setQ1(e.target.value) }} placeholder='Your Answer' />

                </div>
                {/* page3-------------------------------- */}
                <div className={`page3 hide`}>
                  <label>Write a little about yourself in the most creative way possible (think of this as giving your introduction for your very own radio show). <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <textarea type="text" name="yourself" onChange={(e) => { setYourself(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer" ></textarea>

                  <label>Tabulate your strongest qualities and your weakest qualities. <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <textarea type="text" name="qualities" onChange={(e) => { setQualities(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>Rate yourself out of 10 in the following fields.  <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <div style={{ marginTop: "10px", marginBottom: "25px", overflowX: "auto" }}>
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>0</th>
                          <th>1</th>
                          <th>2</th>
                          <th>3</th>
                          <th>4</th>
                          <th>5</th>
                          <th>6</th>
                          <th>7</th>
                          <th>8</th>
                          <th>9</th>
                          <th>10</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Public Speaking</td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"0"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"1"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"2"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"3"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"4"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"5"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"6"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"7"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"8"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"9"} />
                          </td>
                          <td>
                            <input type="radio" name='publicSpeaking' onChange={(e) => { setRate1(e.target.value) }} value={"10"} />
                          </td>
                        </tr>
                        <tr style={{ padding: "20px", margin: "15px" }}>
                          <td>Creativity with content</td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"0"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"1"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"2"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"3"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"4"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"5"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"6"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"7"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"8"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"9"} />
                          </td>
                          <td>
                            <input type="radio" name='creativityContent' onChange={(e) => { setRate2(e.target.value) }} value={"10"} />
                          </td>
                        </tr>
                        <tr>
                          <td>Management Skill</td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"0"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"1"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"2"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"3"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"4"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"5"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"6"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"7"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"8"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"9"} />
                          </td>
                          <td>
                            <input type="radio" name='ManagementSkill' onChange={(e) => { setRate3(e.target.value) }} value={"10"} />
                          </td>
                        </tr>
                        <tr style={{ padding: "20px", margin: "15px" }}>
                          <td>Hardworking</td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"0"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"1"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"2"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"3"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"4"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"5"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"6"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"7"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"8"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"9"} />
                          </td>
                          <td>
                            <input type="radio" name='hardworking' onChange={(e) => { setRate4(e.target.value) }} value={"10"} />
                          </td>
                        </tr>
                        <tr style={{ padding: "20px", margin: "15px" }}>
                          <td>Sense of Humor</td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"0"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"1"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"2"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"3"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"4"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"5"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"6"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"7"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"8"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"9"} />
                          </td>
                          <td>
                            <input type="radio" name='SenseOfhumor' onChange={(e) => { setRate5(e.target.value) }} value={"10"} />
                          </td>
                        </tr>
                      </tbody>

                    </table>
                  </div>

                  <label>What previous public speaking endeavours have you undertaken? <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <textarea type="text" name="Q5" onChange={(e) => { setQ5(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>If we were to induct you in this club, what significant change would you like to bring about in the clubs functioning? <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <textarea type="text" name="Q6" onChange={(e) => { setQ6(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>With your skill set, what extra feature do you think you can bring to this club? <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <textarea type="text" name="Q7" onChange={(e) => { setQ7(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  {/* <label>Mention one embarrassing story about yourself. <span style={{ color: "red", fontSize: "12px" }}>*</span></label>
                  <input type="text" name="Q8" onChange={(e) => { setQ8(e.target.value) }} placeholder="Your Answer" /> */}

                </div>
                {/* page4----------------------------- */}
                <div className={`page4 hide`}>
                  <label>Have you done any work in Designing or Video Editing? Explain. (*For Video Editor and Graphic Designer) </label>
                  <textarea type="text" name="GD" onChange={(e) => { setgd(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer" ></textarea>

                  <label>Mention the software that you use for your field(s). (*For Video Editor and Graphic Designer) </label>
                  <textarea type="text" name="gdtech" onChange={(e) => { setgdTech(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>How long have you been doing photography? What kind of camera do you use? Explain about your work. (*For Photographer) </label>
                  <textarea type="text" name="photography" onChange={(e) => { setPhoto(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>What have you done so far in Web Development? Explain about your work. (*For Web Developer) </label>
                  <textarea type="text" name="webD" onChange={(e) => { setWebD(e.target.value); e.target.setAttribute("style", "height:" + (e.target.scrollHeight) + "px;overflow-y:hidden;"); }} placeholder="Your Answer"></textarea>

                  <label>Creativity skill rating (Compulsory for Tech Crew) </label>
                  <div style={{ marginTop: "10px", marginBottom: "25px", overflowX: "auto" }}>
                    <table>
                      <tr>
                        <th>0</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>9</th>
                        <th>10</th>
                      </tr>
                      <tr>

                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"0"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"1"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"2"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"3"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"4"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"5"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"6"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"7"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"8"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"9"} />
                        </td>
                        <td>
                          <input type="radio" name='skillRate' onChange={(e) => { setSkillRate(e.target.value) }} value={"10"} />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>


                {
                  index !== 1 ? <div className='button2'>

                    <input type="button" onClick={(e) => back(e, index)} value="Back" />
                    <input type="button" onClick={(e) => next(e, index)} value={btnStatus} />
                  </div> : <div className='button2'>
                    <input type="button" onClick={(e) => next(e, index)} value={btnStatus} />
                  </div>
                }

              </form>
            </div>
          </div>
        </div>

        <div className='containers hide'>
          <div className='thanks'>
            <h1>Thank you. We'll get back to you soon!</h1>
          </div>
        </div>


        <footer className="footer">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
          <ul className="social-icon">
            <li className="social-icon__item"><a className="social-icon__link" href="https://www.facebook.com/radio.nitroz.nitdgp">
              <FacebookIcon style={{ color: "white" }} />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://instagram.com/radionitroz.nitdgp?igshid=1pu6b8o84z66h">
              <InstagramIcon style={{ color: "white" }} />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://www.youtube.com/channel/UCSENXkh5yNkcGiQez7y1OwA">
              <YouTubeIcon style={{ color: "white" }} />
            </a></li>
            <li className="social-icon__item"><a className="social-icon__link" href="https://radionitroz.in/">
              <LanguageIcon style={{ color: "white" }} />
            </a></li>
          </ul>
          <p>Copyright &copy;2022 Radio Nitroz | All Rights Reserved</p>
        </footer>

        <Modal
          style={{ width: "100vw" }}
          closeTimeoutMS={500}
          isOpen={modal}
          onRequestClose={() => setModal(false)}
        >
          <div className="modalheader">
            <h1>Radio NITroz</h1>
          </div>
          <div className='modalFooter'>
            <section id="section03" className="demo">
              <button onClick={() => setModal(false)}><span></span></button>
            </section>
          </div>

        </Modal>
      </div>
    </>
  );
}

export default App;
