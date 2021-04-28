import {useState} from react;

const useActive = (initValue)=>{
    const[active,setActive] = useState(initValue);

    const activate = (value) => {
        setActive(value);
    }

    const inactivate = () => {
        setActivate(null);
    }

    return [{active:active},{activate:activate, inactivate:inactivate}];
}

export default useActive;