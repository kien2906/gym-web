

"use clinet"
function InputCommon({props}) {

    const {name, type ,placeholder,classname,value,handChange}= props
  return (
   <input type={type} name={name} 
   placeholder={placeholder}
   className={classname}
   value={value}
   onChange={handChange}
   />
  )
}

export default InputCommon