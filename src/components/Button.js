
const Button = ({ type, color, text, onClick }) => {
    return <button type={type} onClick={onClick} style={{ backgroundColor: color }} className="btn">{text}</button>
}
export default Button