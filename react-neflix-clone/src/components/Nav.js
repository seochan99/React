
import React,{useState,useEffect} from 'react';
import "./Nav.css"

export default function Nav() {
    const [show,setShow] = useState(false);
    useEffect(() => {
      window.addEventListener("scroll",()=>{
          if(window.scrollY>50){ //스크롤시 함수 확인 
            //스ㅡ롤 와이는 -> 얼마나 내린지 알려준다
              setShow(true); // 쇼가 트룰일때 클래스추가 
          }else{
              setShow(false); 
          }
      })
    
      return () => {
        window.removeEventListener("scroll",()=>{})
      }
    }, [])
    

// 만약 쇼가 트루일때 네브블랙클래스 주기
  return <nav className={`nav ${show && "nav__black"}`}> 
      <img
       alt="Netflix logo"
       src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2880px-Netflix_2015_logo.svg.png"
       className='nav__logo'
       onClick={()=>window.location.reload()}
       />
       <img
       alt="User logged"
       src="https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg"
       className='nav__avater'
       >
       </img>
  </nav>
}
