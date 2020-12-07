import {Link} from 'react-router-dom';
import {useState, useRef, createRef} from 'react';

import '../App.css';
import title from '../title.svg';

import User from '../api/User';
import InputField from '../component/form/InputField';
import TextAreaField from '../component/form/TextAreaField';
import SuccessInfo from '../component/form/SuccessInfo';

const Register = () => {
    const inputRef = useRef([createRef(), createRef(), createRef(), createRef()]);
    const userDb = User.getData();
    const id = userDb ? userDb.length + 1 : 1;
    
    const data = {
        "id" : id,
        "email": "",
        "password":"",
        "name_channel": "",
        "description": ""
    }
    const [userData, setUserData] = useState(data);
    const [isSuccess, setSuccess] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        for(let i = 0; i < inputRef.current.length; i++){
            const valid = inputRef.current[i].current.validate();

            if(!valid){
                isValid = false;
            }
        }

        if(!isValid){
            return;
        }

        setUserData({
            "id" : id,
            "email": "",
            "password":"",
            "name_channel": "",
            "description": ""
        })

        User.add(userData);
        setSuccess(true);
    }


    const handleInputChange = (name, value) => {
        setUserData({
            ...userData,
            [name] : value
        });

        setSuccess(false);
    }

    return(
        <div className="landing-container">
              <div className="landing-welcome">
                  <img src={title} alt ="title" />
                  <Link to="/login" className="link">
                    <button className="button">Sign In</button>
                  </Link>
              </div>

            <div className="landing-form">
                <h1>Sign Up</h1>
                {isSuccess? <SuccessInfo/>:""}
                <form onSubmit={handleSubmit}>
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        onChange={handleInputChange}
                        autoComplete="off"
                        value={userData.email}
                        ref={inputRef.current[0]}
                        validation={["required", "email", "uniq"]}
                        dbValue={userDb}
            
                    />
                    <InputField 
                        type="password" 
                        placeholder="Password"
                        name="password"
                        onChange={handleInputChange}
                        autoComplete="off"
                        value={userData.password}
                        ref={inputRef.current[1]}
                        validation={["required"]}
                        
                    />
                    <InputField 
                        type="text" 
                        placeholder="Name Channel"
                        name="name_channel"
                        onChange={handleInputChange}
                        autoComplete="off"
                        value={userData.name_channel}
                        ref={inputRef.current[2]}
                        validation={["required", "uniq"]}
                        dbValue={userDb}
                    />
        
                    <TextAreaField
                        placeholder="Description Channel"
                        name="description"
                        onChange={handleInputChange}
                        value={userData.description}
                        ref={inputRef.current[3]}
                        validation={["required"]}
                    />
    
                    <button className="button">Sign Up</button>
                </form>
            </div>
        </div>  
    )
}

export default Register;