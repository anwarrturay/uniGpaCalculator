import React, { useMemo, useState, useCallback } from 'react'
import { Eye, EyeOff } from 'lucide-react';
const PasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const passwordToggleButton = useMemo(() => (
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 xs:right-[14px] top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
                {showPassword ? <EyeOff /> : <Eye />}
            </button>
    ), [showPassword, togglePasswordVisibility]);

  return { passwordToggleButton, showPassword };
}

export default PasswordVisibility