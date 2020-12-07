import './form.css';

import ErrorInfo from './ErrorInfo';
import {Fragment, useState, forwardRef, useImperativeHandle, useEffect} from 'react';

const TextAreaField = forwardRef((props,ref) => {
    const [isFocus, setFocus] = useState(false);
    const [error, setError] = useState(false);
    const [value, setValue] = useState(props.value);
    
    const handleInputChange = (event) => {
        setValue(event.target.value);
        props.onChange(event.target.name, event.target.value);
        setFocus(true);
    }
    
    const validate = () =>{
        for(let i = 0; i < props.validation.length; i++){
            if(props.validation[i] === "required"){
                if(!value){
                    setError({
                        ...error,
                        status:true,
                        messages: `The ${props.placeholder} field must be filled !`
                    });
        
                    return false;
                } 
            }

            if(props.validation[i] === "email"){
                const mailformat = /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;
                if(!value.match(mailformat)){
                    setError({
                        ...error,
                        status:true,
                        messages: `Not valid email !`
                    });
        
                    return false;
                }
            }

            if(props.validation[i] === "uniq"){
                if(props.dbValue){
                    const filteredVal = props.dbValue.filter(val => value === val[props.name]);
                    console.log(filteredVal);

                    if(filteredVal.length > 0){
                        setError({
                            ...error,
                            status:true,
                            messages: `${props.placeholder} already used !`
                        });
            
                        return false;
                    }

                }
            }
        }

        setError(false)
        return true;
        
    }

    useEffect(() => {
        if(isFocus){
            validate();
        }
    }, [value])

    useImperativeHandle(ref, () => {
        return {
            validate: () => validate()
        }
    })


    return(
        <Fragment>
            <textarea
                placeholder={props.placeholder} 
                name={props.name} 
                onChange={(event) => {handleInputChange(event)}}
                autoComplete={props.autoComplete}
                value={props.value}
            ></textarea>
            {error? <ErrorInfo messages={error.messages}/>:""}
        </Fragment>
    )
})

export default TextAreaField;