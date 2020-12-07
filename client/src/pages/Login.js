import {Link} from 'react-router-dom';
import {useState, useRef, createRef, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AppContext} from '../context/AppContext';
import '../App.css';
import title from '../title.svg';
import User from '../api/User';
import InputField from '../component/form/InputField';

const Login = () => {
    let history = useHistory()
    const [state, dispatch] = useContext(AppContext);
    console.log(state.isLogin);

    const userDb = User.getData();
    const inputRef = useRef([createRef(), createRef()]);

    const data = {
        "email": "",
        "password":""
    }

    const [userData, setUserData] = useState(data);

    const auth = ()=> {
        return inputRef.current[1].current.auth();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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

        const authLogin = auth();

        if(authLogin){
            dispatch({
                type: "LOGIN"
            });
            history.push('/');
        }
    }

    const handleInputChange = (name, value) => {
        setUserData({
            ...userData,
            [name] : value
        });

    }

    return(
        <div className="landing-container">
            <div className="landing-welcome">
                <img src={title} alt ="title" />
                <Link to="/register" className="link">
                    <button className="button">Sign Up</button>
                </Link>
            </div>

            <div className="landing-form">
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <InputField 
                        type="text" 
                        placeholder="Email" 
                        name="email" 
                        onChange={handleInputChange}
                        autoComplete="off"
                        value={userData.email}
                        ref={inputRef.current[0]}
                        validation={["required", "email", "checkUser"]}
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
                        checkField="email"
                        validUser={userData.email}
                        validation={["required"]}
                        dbValue={userDb}
                        
                    />
                    <button className="button">Sign In</button>
                </form>
            </div>
        </div> 
    )
}

export default Login;