import logo from '../images/logoMesto.svg';

export default function Header (){
  return (
    <header className="header">
      <img src= {logo} alt="Логотип Место" className="logo" />
    </header>
  )
}
