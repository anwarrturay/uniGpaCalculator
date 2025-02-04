import { useState } from 'react';

const PasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return togglePasswordVisibility
}

export default PasswordVisibility;