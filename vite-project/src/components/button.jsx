const Button = (props) => {
    return (
        <button className="great" onClick={props.click}>{props.name}</button>
    )
}
export default Button       